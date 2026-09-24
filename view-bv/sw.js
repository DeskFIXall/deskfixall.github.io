const CACHE_PREFIX = "nexusbv-web";
const CACHE_NAME = `${CACHE_PREFIX}-runtime-v5`;
const SHARE_TARGET_PATH = "/share-target";
const SHARED_BOARDVIEW_PREFIX = "/shared-boardview/";
const CORE_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/pwa/icon-any-black-v5-192.png",
  "/pwa/icon-any-black-v5-512.png",
  "/pwa/icon-maskable-black-v5-192.png",
  "/pwa/icon-maskable-black-v5-512.png",
];
const MAX_RUNTIME_ENTRIES = 60;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names
          .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.method === "POST" && url.pathname === SHARE_TARGET_PATH) {
    event.respondWith(handleShareTarget(request));
    return;
  }

  if (request.method !== "GET") {
    return;
  }

  if (url.pathname.startsWith(SHARED_BOARDVIEW_PREFIX)) {
    event.respondWith(readSharedBoardview(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, "/"));
    return;
  }

  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (
    url.pathname === "/" ||
    url.pathname === "/index.html" ||
    url.pathname === "/manifest.webmanifest" ||
    url.pathname === "/sw.js"
  ) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});

async function handleShareTarget(request) {
  const formData = await request.formData();
  const files = formData.getAll("boardview").filter((item) => item instanceof File);
  const file = files[0];
  if (!file) {
    return Response.redirect("/?share-error=missing-file", 303);
  }

  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  const cache = await caches.open(CACHE_NAME);
  const fileUrl = new URL(`${SHARED_BOARDVIEW_PREFIX}${id}`, self.location.origin);
  await cache.put(fileUrl.href, new Response(file, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": file.type || "application/octet-stream",
      "X-ViewBV-File-Name": encodeURIComponent(file.name || "shared-boardview"),
    },
  }));

  return Response.redirect(`/?shared-boardview=${encodeURIComponent(id)}`, 303);
}

async function readSharedBoardview(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (!cached) {
    return new Response("Shared boardview file was not found.", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  await cache.delete(request);
  return cached;
}

async function networkFirst(request, fallbackUrl) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(request, { cache: "no-store" });
    if (fresh && fresh.ok) {
      await cache.put(request, fresh.clone());
    }
    return fresh;
  } catch (error) {
    return (await cache.match(request)) ||
      (fallbackUrl ? await cache.match(fallbackUrl) : undefined) ||
      Response.error();
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }

  const fresh = await fetch(request);
  if (fresh && fresh.ok) {
    await cache.put(request, fresh.clone());
    await trimCache(cache);
  }
  return fresh;
}

async function trimCache(cache) {
  const keys = await cache.keys();
  if (keys.length <= MAX_RUNTIME_ENTRIES) {
    return;
  }

  await Promise.all(
    keys
      .slice(0, keys.length - MAX_RUNTIME_ENTRIES)
      .map((request) => cache.delete(request)),
  );
}
