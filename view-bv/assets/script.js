(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload"))
        return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]'))
        i(r);
    new MutationObserver(r => {
        for (const o of r)
            if (o.type === "childList")
                for (const s of o.addedNodes)
                    s.tagName === "LINK" && s.rel === "modulepreload" && i(s)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(r) {
        const o = {};
        return r.integrity && (o.integrity = r.integrity),
        r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
        r.crossOrigin === "use-credentials" ? o.credentials = "include" : r.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin",
        o
    }
    function i(r) {
        if (r.ep)
            return;
        r.ep = !0;
        const o = n(r);
        fetch(r.href, o)
    }
}
)();
const Mc = "0.3"
  , ms = `DeskFixAll | ViewBV`
  , Zn = new Set;
let _r = !1;
function Lc(t, e, n=2) {
    const i = e && e.length
      , r = i ? e[0] * n : t.length;
    Zn.size && Zn.clear();
    let o = Ba(t, 0, r, n, !0);
    const s = [];
    if (!o || o.next === o.prev)
        return s;
    let a = 0
      , l = 0
      , c = 0;
    if (i && (o = Fc(t, e, o, n)),
    t.length > 80 * n) {
        a = t[0],
        l = t[1];
        let d = a
          , u = l;
        for (let h = n; h < r; h += n) {
            const f = t[h]
              , p = t[h + 1];
            f < a && (a = f),
            p < l && (l = p),
            f > d && (d = f),
            p > u && (u = p)
        }
        c = Math.max(d - a, u - l),
        c = c !== 0 ? 32767 / c : 0
    }
    return eo(o, s, a, l, c),
    s
}
function Ba(t, e, n, i, r) {
    let o = null;
    if (r === Kc(t, e, n, i) > 0)
        for (let s = e; s < n; s += i)
            o = bs(s / i | 0, t[s], t[s + 1], o);
    else
        for (let s = n - i; s >= e; s -= i)
            o = bs(s / i | 0, t[s], t[s + 1], o);
    return o && qn(o, o.next) && (Qn(o),
    o = o.next),
    o
}
function Ht(t, e=t) {
    const n = e === t;
    let i = t, r;
    do
        r = !1,
        i !== i.next && (Zn.size === 0 || !Zn.has(i)) && (qn(i, i.next) || X(i.prev, i, i.next) === 0) ? ((n || i === e) && (e = i.prev),
        _r = !0,
        Qn(i),
        i = i.prev,
        r = !0) : (n || i !== e) && (i = i.next,
        r = !n);
    while (r || i !== e);
    return e
}
function eo(t, e, n, i, r) {
    r && Dc(t, n, i, r);
    let o = t
      , s = !1;
    for (; t.prev !== t.next; ) {
        const a = t.prev
          , l = t.next;
        if (X(a, t, l) < 0 && (r ? Ic(t, n, i, r) : Tc(t))) {
            e.push(a.i, t.i, l.i),
            Qn(t),
            t = l,
            o = l;
            continue
        }
        if (t = l,
        t === o) {
            if (_r = !1,
            t = Ht(t),
            _r) {
                o = t;
                continue
            }
            if (!s) {
                t = Nc(t, e),
                o = t,
                s = !0;
                continue
            }
            kc(t, e, n, i, r);
            break
        }
    }
}
function Tc(t) {
    const e = t.prev
      , n = t
      , i = t.next
      , r = e.x
      , o = n.x
      , s = i.x
      , a = e.y
      , l = n.y
      , c = i.y
      , d = Math.min(r, o, s)
      , u = Math.min(a, l, c)
      , h = Math.max(r, o, s)
      , f = Math.max(a, l, c);
    let p = i.next;
    for (; p !== e; ) {
        if (p.x >= d && p.x <= h && p.y >= u && p.y <= f && !(r === p.x && a === p.y) && er(r, a, o, l, s, c, p.x, p.y) && X(p.prev, p, p.next) >= 0)
            return !1;
        p = p.next
    }
    return !0
}
function Ic(t, e, n, i) {
    const r = t.prev
      , o = t
      , s = t.next
      , a = r.x
      , l = o.x
      , c = s.x
      , d = r.y
      , u = o.y
      , h = s.y
      , f = Math.min(a, l, c)
      , p = Math.min(d, u, h)
      , m = Math.max(a, l, c)
      , y = Math.max(d, u, h)
      , x = ro(f, p, e, n, i)
      , B = ro(m, y, e, n, i);
    let v = t.prevZ;
    for (; v && v.z >= x; ) {
        if (v.x >= f && v.x <= m && v.y >= p && v.y <= y && v !== s && !(a === v.x && d === v.y) && er(a, d, l, u, c, h, v.x, v.y) && X(v.prev, v, v.next) >= 0)
            return !1;
        v = v.prevZ
    }
    let C = t.nextZ;
    for (; C && C.z <= B; ) {
        if (C.x >= f && C.x <= m && C.y >= p && C.y <= y && C !== s && !(a === C.x && d === C.y) && er(a, d, l, u, c, h, C.x, C.y) && X(C.prev, C, C.next) >= 0)
            return !1;
        C = C.nextZ
    }
    return !0
}
function Nc(t, e) {
    let n = t
      , i = !1;
    do {
        const r = n.prev
          , o = n.next.next;
        La(r, n, n.next, o, !1) && jn(r, o) && jn(o, r) && (e.push(r.i, n.i, o.i),
        Qn(n),
        Qn(n.next),
        n = t = o,
        i = !0),
        n = n.next
    } while (n !== t);
    return i ? Ht(n) : n
}
function kc(t, e, n, i, r) {
    let o = t;
    do {
        let s = o.next.next;
        for (; s !== o.prev; ) {
            if (o.i !== s.i && Yc(o, s)) {
                let a = Ta(o, s);
                o = Ht(o, o.next),
                a = Ht(a, a.next),
                eo(o, e, n, i, r),
                eo(a, e, n, i, r);
                return
            }
            s = s.next
        }
        o = o.next
    } while (o !== t)
}
let to = !1;
function Fc(t, e, n, i) {
    const r = [];
    for (let o = 0, s = e.length; o < s; o++) {
        const a = e[o] * i
          , l = o < s - 1 ? e[o + 1] * i : t.length
          , c = Ba(t, a, l, i, !1);
        c === c.next && Zn.add(c),
        r.push(Hc(c))
    }
    r.sort(Gc),
    Ec(t.length / i, e.length),
    Ma(n, n),
    to = !0;
    for (let o = 0; o < r.length; o++)
        n = Vc(r[o], n);
    return to = !1,
    Ht(n)
}
function Gc(t, e) {
    return t.x - e.x || t.y - e.y || (t.next.y - t.y) / (t.next.x - t.x) - (e.next.y - e.y) / (e.next.x - e.x)
}
function Vc(t, e) {
    const n = Oc(t, e);
    if (!n)
        return e;
    const i = Ta(n, t)
      , r = i.next;
    return Ma(n, r.next),
    Ht(i, i.next),
    Ht(n, n.next)
}
const Aa = 16;
let z = new Float64Array(0)
  , _i = 0;
const no = []
  , io = [];
function Ec(t, e) {
    const n = Math.ceil((t + 2 * e) / Aa) + e + 2;
    z.length < n * 4 && (z = new Float64Array(n * 4)),
    _i = 0
}
function Ma(t, e) {
    let n = t;
    do {
        const i = _i++;
        no[i] = n;
        let r = 1 / 0
          , o = 1 / 0
          , s = -1 / 0
          , a = -1 / 0
          , l = 0;
        do {
            const d = n.next;
            n.z = i,
            n.x < r && (r = n.x),
            n.x > s && (s = n.x),
            n.y < o && (o = n.y),
            n.y > a && (a = n.y),
            d.x < r && (r = d.x),
            d.x > s && (s = d.x),
            d.y < o && (o = d.y),
            d.y > a && (a = d.y),
            n = d
        } while (++l < Aa && n !== e);
        io[i] = n;
        const c = i * 4;
        z[c] = r,
        z[c + 1] = o,
        z[c + 2] = s,
        z[c + 3] = a
    } while (n !== e)
}
function Rc(t, e) {
    const n = t.z * 4;
    e.x < z[n] && (z[n] = e.x),
    e.y < z[n + 1] && (z[n + 1] = e.y),
    e.x > z[n + 2] && (z[n + 2] = e.x),
    e.y > z[n + 3] && (z[n + 3] = e.y)
}
function ys(t) {
    let e = io[t];
    for (; e.prev.next !== e; )
        e = e.next;
    return io[t] = e,
    e
}
function gs(t) {
    let e = no[t];
    for (; e.prev.next !== e; )
        e = e.next;
    return no[t] = e,
    e
}
function Oc(t, e) {
    let n = e;
    const i = t.x
      , r = t.y;
    let o = -1 / 0, s;
    if (qn(t, n))
        return n;
    for (let h = 0, f = 0; h < _i; h++,
    f += 4) {
        if (r < z[f + 1] || r > z[f + 3] || z[f] > i || z[f + 2] <= o)
            continue;
        const p = ys(h);
        n = gs(h);
        do {
            if (n.prev.next === n) {
                if (qn(t, n.next))
                    return n.next;
                if (r <= n.y && r >= n.next.y && n.next.y !== n.y) {
                    const m = n.x + (r - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
                    if (m <= i && m > o && (o = m,
                    s = n.x < n.next.x ? n : n.next,
                    m === i))
                        return s
                }
            }
            n = n.next
        } while (n !== p)
    }
    if (!s)
        return null;
    const a = s.x
      , l = s.y
      , c = Math.min(r, l)
      , d = Math.max(r, l);
    let u = 1 / 0;
    for (let h = 0, f = 0; h < _i; h++,
    f += 4) {
        if (z[f + 2] < a || z[f] > i || z[f + 3] < c || z[f + 1] > d)
            continue;
        const p = ys(h);
        n = gs(h);
        do {
            if (n.prev.next === n && i >= n.x && n.x >= a && i !== n.x && er(r < l ? i : o, r, a, l, r < l ? o : i, r, n.x, n.y)) {
                const m = Math.abs(r - n.y) / (i - n.x);
                (jn(n, t) || n.y === r && n.next.y === r && n.next.x > i) && (m < u || m === u && (n.x > s.x || n.x === s.x && Wc(s, n))) && (s = n,
                u = m)
            }
            n = n.next
        } while (n !== p)
    }
    return s
}
function Wc(t, e) {
    return X(t.prev, t, e.prev) < 0 && X(e.next, t, t.next) < 0
}
const Te = [];
let Fn = []
  , Ft = new Uint32Array(0)
  , Gn = new Uint32Array(0);
const Vn = new Uint32Array(256);
function Dc(t, e, n, i) {
    let r = t
      , o = 0;
    do
        r.z = ro(r.x, r.y, e, n, i),
        Te[o++] = r,
        r = r.next;
    while (r !== t);
    zc(o);
    let s = null;
    for (let a = 0; a < o; a++) {
        const l = Te[a];
        l.prevZ = s,
        s && (s.nextZ = l),
        s = l
    }
    s.nextZ = null
}
function zc(t) {
    if (t <= 32) {
        for (let e = 1; e < t; e++) {
            const n = Te[e]
              , i = n.z;
            let r = e - 1;
            for (; r >= 0 && Te[r].z > i; )
                Te[r + 1] = Te[r],
                r--;
            Te[r + 1] = n
        }
        return
    }
    Ft.length < t && (Ft = new Uint32Array(t),
    Gn = new Uint32Array(t),
    Fn = new Array(t));
    for (let e = 0; e < t; e++)
        Ft[e] = Te[e].z;
    Ai(t, Te, Ft, Fn, Gn, 0),
    Ai(t, Fn, Gn, Te, Ft, 8),
    Ai(t, Te, Ft, Fn, Gn, 16),
    Ai(t, Fn, Gn, Te, Ft, 24)
}
function Ai(t, e, n, i, r, o) {
    Vn.fill(0);
    for (let a = 0; a < t; a++)
        Vn[n[a] >>> o & 255]++;
    let s = 0;
    for (let a = 0; a < 256; a++) {
        const l = Vn[a];
        Vn[a] = s,
        s += l
    }
    for (let a = 0; a < t; a++) {
        const l = n[a]
          , c = Vn[l >>> o & 255]++;
        i[c] = e[a],
        r[c] = l
    }
}
function ro(t, e, n, i, r) {
    return t = (t - n) * r | 0,
    e = (e - i) * r | 0,
    t = (t | t << 8) & 16711935,
    t = (t | t << 4) & 252645135,
    t = (t | t << 2) & 858993459,
    t = (t | t << 1) & 1431655765,
    e = (e | e << 8) & 16711935,
    e = (e | e << 4) & 252645135,
    e = (e | e << 2) & 858993459,
    e = (e | e << 1) & 1431655765,
    t | e << 1
}
function Hc(t) {
    let e = t
      , n = t;
    do
        (e.x < n.x || e.x === n.x && e.y < n.y) && (n = e),
        e = e.next;
    while (e !== t);
    return n
}
function er(t, e, n, i, r, o, s, a) {
    return (r - s) * (e - a) >= (t - s) * (o - a) && (t - s) * (i - a) >= (n - s) * (e - a) && (n - s) * (o - a) >= (r - s) * (i - a)
}
function Yc(t, e) {
    const n = qn(t, e) && X(t.prev, t, t.next) > 0 && X(e.prev, e, e.next) > 0;
    return t.next.i !== e.i && (n || jn(t, e) && jn(e, t) && (X(t.prev, t, e.prev) !== 0 || X(t, e.prev, e) !== 0)) && !Xc(t, e) && (n || Uc(t, e))
}
function X(t, e, n) {
    return (e.y - t.y) * (n.x - e.x) - (e.x - t.x) * (n.y - e.y)
}
function qn(t, e) {
    return t.x === e.x && t.y === e.y
}
function La(t, e, n, i, r=!0) {
    const o = X(t, e, n)
      , s = X(t, e, i)
      , a = X(n, i, t)
      , l = X(n, i, e);
    return (o > 0 && s < 0 || o < 0 && s > 0) && (a > 0 && l < 0 || a < 0 && l > 0) ? !0 : r ? !!(o === 0 && Mi(t, n, e) || s === 0 && Mi(t, i, e) || a === 0 && Mi(n, t, i) || l === 0 && Mi(n, e, i)) : !1
}
function Mi(t, e, n) {
    return e.x <= Math.max(t.x, n.x) && e.x >= Math.min(t.x, n.x) && e.y <= Math.max(t.y, n.y) && e.y >= Math.min(t.y, n.y)
}
function Xc(t, e) {
    const n = Math.min(t.x, e.x)
      , i = Math.max(t.x, e.x)
      , r = Math.min(t.y, e.y)
      , o = Math.max(t.y, e.y);
    let s = t;
    do {
        const a = s.next;
        if (s.x > i && a.x > i || s.x < n && a.x < n || s.y > o && a.y > o || s.y < r && a.y < r) {
            s = a;
            continue
        }
        if (s.i !== t.i && a.i !== t.i && s.i !== e.i && a.i !== e.i && La(s, a, t, e))
            return !0;
        s = a
    } while (s !== t);
    return !1
}
function jn(t, e) {
    return X(t.prev, t, t.next) < 0 ? X(t, e, t.next) >= 0 && X(t, t.prev, e) >= 0 : X(t, e, t.prev) < 0 || X(t, t.next, e) < 0
}
function Uc(t, e) {
    let n = t
      , i = !1;
    const r = (t.x + e.x) / 2
      , o = (t.y + e.y) / 2;
    do {
        const s = n.next;
        n.y > o != s.y > o && r < (s.x - n.x) * (o - n.y) / (s.y - n.y) + n.x && (i = !i),
        n = s
    } while (n !== t);
    return i
}
function Ta(t, e) {
    const n = oo(t.i, t.x, t.y)
      , i = oo(e.i, e.x, e.y)
      , r = t.next
      , o = e.prev;
    return t.next = e,
    e.prev = t,
    n.next = r,
    r.prev = n,
    i.next = n,
    n.prev = i,
    o.next = i,
    i.prev = o,
    i
}
function bs(t, e, n, i) {
    const r = oo(t, e, n);
    return i ? (r.next = i.next,
    r.prev = i,
    i.next.prev = r,
    i.next = r) : (r.prev = r,
    r.next = r),
    r
}
function Qn(t) {
    t.next.prev = t.prev,
    t.prev.next = t.next,
    t.prevZ && (t.prevZ.nextZ = t.nextZ),
    t.nextZ && (t.nextZ.prevZ = t.prevZ),
    to && Rc(t.prev, t.next)
}
function oo(t, e, n) {
    return {
        i: t,
        x: e,
        y: n,
        prev: null,
        next: null,
        z: 0,
        prevZ: null,
        nextZ: null
    }
}
function Kc(t, e, n, i) {
    let r = 0;
    for (let o = e, s = n - i; o < n; o += i)
        r += (t[s] - t[o]) * (t[o + 1] + t[s + 1]),
        s = o;
    return r
}
const _t = 24
  , st = 44
  , Zc = 18
  , qc = 14
  , mt = 4
  , Li = 48
  , jc = 24
  , Ia = 100
  , Qc = 1
  , Jc = 2.5
  , $c = 1
  , _c = 1
  , xs = 3.2
  , ed = 1.1
  , ws = 2.5
  , td = 2.5
  , vs = 1
  , nd = 3
  , Jn = 16
  , Cs = 16 * 1024 * 1024
  , Ss = 512
  , id = 256
  , rd = 6
  , Rr = 32 * 1024 * 1024
  , od = 2
  , Ti = 48 * 1024 * 1024
  , sd = 85e4
  , ad = 45e3
  , Na = .6
  , ld = 1 - Na
  , cd = `
struct Uniforms {
  matrix: mat4x4<f32>,
  viewport: vec4f,
};

struct VertexIn {
  @location(0) position: vec2f,
  @location(1) color: vec4f,
};

struct ScreenLineVertexIn {
  @location(0) a: vec2f,
  @location(1) b: vec2f,
  @location(2) params: vec2f,
  @location(3) color: vec4f,
  @location(4) widthPx: f32,
};

struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

@vertex
fn vsMain(input: VertexIn) -> VertexOut {
  var out: VertexOut;
  out.position = uniforms.matrix * vec4f(input.position, 0.0, 1.0);
  out.color = vec4f(input.color.rgb * uniforms.viewport.z, input.color.a);
  return out;
}

@vertex
fn vsScreenLine(input: ScreenLineVertexIn) -> VertexOut {
  let clipA = uniforms.matrix * vec4f(input.a, 0.0, 1.0);
  let clipB = uniforms.matrix * vec4f(input.b, 0.0, 1.0);
  let ndcA = clipA.xy / clipA.w;
  let ndcB = clipB.xy / clipB.w;
  let size = max(uniforms.viewport.xy, vec2f(1.0, 1.0));
  let screenA = vec2f((ndcA.x * 0.5 + 0.5) * size.x, (0.5 - ndcA.y * 0.5) * size.y);
  let screenB = vec2f((ndcB.x * 0.5 + 0.5) * size.x, (0.5 - ndcB.y * 0.5) * size.y);
  let delta = screenB - screenA;
  let dir = delta / max(length(delta), 0.0001);
  let normal = vec2f(-dir.y, dir.x);
  let screen = screenA + delta * input.params.x + normal * input.params.y * max(input.widthPx, 0.001) * 0.5;
  let ndc = vec2f(screen.x / size.x * 2.0 - 1.0, 1.0 - screen.y / size.y * 2.0);
  var out: VertexOut;
  out.position = vec4f(ndc, 0.0, 1.0);
  out.color = vec4f(input.color.rgb * uniforms.viewport.z, input.color.a);
  return out;
}

@fragment
fn fsMain(input: VertexOut) -> @location(0) vec4f {
  return input.color;
}
`
  , dd = `#version 300 es
precision highp float;

layout(location = 0) in vec2 aPosition;
layout(location = 1) in vec4 aColor;

uniform mat4 uMatrix;
uniform float uColorScale;
out vec4 vColor;

void main() {
  gl_Position = uMatrix * vec4(aPosition, 0.0, 1.0);
  vColor = vec4(aColor.rgb * uColorScale, aColor.a);
}
`
  , ud = `#version 300 es
precision highp float;

layout(location = 0) in vec2 aStart;
layout(location = 1) in vec2 aEnd;
layout(location = 2) in vec2 aParams;
layout(location = 3) in vec4 aColor;
layout(location = 4) in float aWidthPx;

uniform mat4 uMatrix;
uniform vec2 uViewport;
uniform float uColorScale;
out vec4 vColor;

void main() {
  vec4 clipA = uMatrix * vec4(aStart, 0.0, 1.0);
  vec4 clipB = uMatrix * vec4(aEnd, 0.0, 1.0);
  vec2 ndcA = clipA.xy / clipA.w;
  vec2 ndcB = clipB.xy / clipB.w;
  vec2 size = max(uViewport, vec2(1.0));
  vec2 screenA = vec2((ndcA.x * 0.5 + 0.5) * size.x, (0.5 - ndcA.y * 0.5) * size.y);
  vec2 screenB = vec2((ndcB.x * 0.5 + 0.5) * size.x, (0.5 - ndcB.y * 0.5) * size.y);
  vec2 delta = screenB - screenA;
  vec2 direction = delta / max(length(delta), 0.0001);
  vec2 normal = vec2(-direction.y, direction.x);
  vec2 screen = screenA + delta * aParams.x + normal * aParams.y * max(aWidthPx, 0.001) * 0.5;
  vec2 ndc = vec2(screen.x / size.x * 2.0 - 1.0, 1.0 - screen.y / size.y * 2.0);
  gl_Position = vec4(ndc, 0.0, 1.0);
  vColor = vec4(aColor.rgb * uColorScale, aColor.a);
}
`
  , Ps = `#version 300 es
precision mediump float;

in vec4 vColor;
out vec4 outColor;

void main() {
  outColor = vColor;
}
`
  , w = {
    background: U(394758, 1),
    boardFill: U(723981, 1),
    pinsPads: U(4605519, 1),
    componentBox: U(4539726, 1),
    componentText: U(14540253, 182 / 255),
    pinLabelText: U(12303291, 1),
    selectedNet: U(16773171, 218 / 255),
    netwebCurrent: U(16773171, 218 / 255),
    highlightedPart: U(44108, 1),
    selectedPart: U(16722731, 1),
    boardOutline: U(3618615, 1),
    ground: U(3162690, 1),
    netwebOther: U(3381759, 217 / 255),
    noConnect: U(2434348, 1),
    testPin: U(4539726, 1),
    layerTop: U(3779071, 1),
    layerBottom: U(15771978, 1),
    layerOther: U(10135736, 1),
    hole: U(394758, 1)
}
  , Ii = {
    enableBoardFill: !1,
    paintComponentDrills: !1
};
class hd {
    canvas;
    labelCanvas = null;
    labelContext = null;
    adapter = null;
    device = null;
    context = null;
    format = null;
    pipeline = null;
    screenLinePipeline = null;
    uniformBuffer = null;
    bindGroup = null;
    dimmedUniformBuffer = null;
    dimmedBindGroup = null;
    backend = null;
    webGl = null;
    webGlProgram = null;
    webGlScreenLineProgram = null;
    webGlTriangleVao = null;
    webGlScreenLineVao = null;
    webGlMatrixLocation = null;
    webGlColorScaleLocation = null;
    webGlScreenLineMatrixLocation = null;
    webGlScreenLineViewportLocation = null;
    webGlScreenLineColorScaleLocation = null;
    webGlFrameStatusReported = !1;
    vertexBatches = [];
    screenLineVertexBatches = [];
    screenLineVertexCount = 0;
    selectedNetVertexBatches = [];
    selectedNetVertexCount = 0;
    selectedNetScreenLineVertexBatches = [];
    selectedNetScreenLineVertexCount = 0;
    selectedNetGeometry = null;
    selectedNetGeometryBuild = null;
    selectedNetGeometryIsCached = !1;
    selectedNetGeometryCache = new Map;
    skippedSelectedNetGeometryKeys = new Set;
    groundNetGeometryPrewarm = null;
    skippedGroundNetGeometryPrewarmKeys = new Set;
    selectedNetBuildVertices = [];
    selectedNetBuildScreenLineVertices = [];
    highlightedPartNetVertexBatches = [];
    highlightedPartNetVertexCount = 0;
    highlightedPartNetScreenLineVertexBatches = [];
    highlightedPartNetScreenLineVertexCount = 0;
    highlightedPartNetGeometry = null;
    focusDimBuffer = null;
    focusDimWebGlBuffer = null;
    focusDimVertexCount = 0;
    msaaTexture = null;
    msaaWidth = 0;
    msaaHeight = 0;
    vertexCount = 0;
    framePending = !1;
    geometryDirty = !0;
    canvasConfigured = !1;
    lastFrameTimeMs = 0;
    componentFrameCachesByBoard = new WeakMap;
    componentFramePrewarmKeys = new Set;
    outlineBoundsCache = new Map;
    netHighlightCache = new Map;
    netHighlightCacheByBoard = new WeakMap;
    geometryCache = new Map;
    layerViewGeometryCache = new Map;
    visibleGraphicsCache = new Map;
    pickIndexCache = new Map;
    backgroundPadCoverageByBoard = new WeakMap;
    layerGraphicRefsByBoard = new WeakMap;
    layerSideIndependentPhaseCacheByBoard = new WeakMap;
    boardGeometryIds = new WeakMap;
    skippedPrewarmKeys = new Set;
    selectedTraceGraphicsCache = null;
    selectedLayerTraceGraphicsCache = null;
    tracePinsOverlayCache = null;
    nextBoardGeometryId = 1;
    geometryCacheGeneration = 0;
    board = null;
    options = {
        activeSide: "B",
        layerModeEnabled: !1,
        visibleLayerIds: new Set,
        topLayerId: null,
        selectedComponentId: null,
        selectedPad: null,
        selectedNet: "",
        selectedTraceIndex: null,
        selectedLayerTraceId: null,
        showNetWeb: !1,
        showPinNetLabels: !1,
        drawPinPads: !0,
        hollowPinPads: !1,
        highlightedPartIds: new Set,
        highlightedPartNetNames: new Set,
        highlightFullSignalTrace: !1,
        darkenedPartIds: new Set
    };
    zoom = 1;
    offsetX = 0;
    offsetY = 0;
    targetZoom = 1;
    targetOffsetX = 0;
    targetOffsetY = 0;
    smoothCenterActive = !1;
    zoomAnchorScreen = null;
    zoomAnchorWorld = null;
    hoveredComponentId = null;
    hoveredPad = null;
    hoveredBackgroundPad = null;
    viewQuarterTurns = 0;
    flipHorizontal = !1;
    flipVertical = !1;
    sideFlipHorizontal = !1;
    sideFlipVertical = !1;
    watermarkText = "";
    constructor(e, n=null) {
        this.canvas = e,
        this.labelCanvas = n,
        this.labelContext = n?.getContext("2d") ?? null
    }
    async initialize(e={}) {
        if (e.forceWebGl === !0)
            return this.initializeWebGlFallback();
        let n = null;
        if (navigator.gpu)
            try {
                return await this.initializeWebGpu(),
                this.backend = "WebGPU",
                this.backend
            } catch (i) {
                n = i,
                console.warn("[ViewBV Web] WebGPU initialization failed; trying WebGL 2", i)
            }
        else
            n = new Error("WebGPU is not available in this browser.");
        if (e.allowWebGlFallback === !0 && !this.context)
            try {
                return this.initializeWebGlFallback()
            } catch (i) {
                throw new AggregateError([n, i],"Neither WebGPU nor WebGL 2 could be initialized.")
            }
        throw n
    }
    getRendererBackend() {
        return this.backend
    }
    canUseWebGlFallback() {
        if (this.backend === "WebGL 2")
            return !0;
        if (this.context)
            return !1;
        const n = document.createElement("canvas").getContext("webgl2");
        return n?.getExtension("WEBGL_lose_context")?.loseContext(),
        n !== null
    }
    initializeWebGlFallback() {
        if (this.backend)
            return this.backend;
        if (this.context)
            throw new Error("The canvas is already using WebGPU and cannot switch to WebGL 2.");
        return this.initializeWebGl2(),
        this.backend = "WebGL 2",
        this.backend
    }
    async initializeWebGpu() {
        if (!navigator.gpu)
            throw new Error("WebGPU is not available in this browser.");
        if (this.adapter = await navigator.gpu.requestAdapter({
            powerPreference: "high-performance"
        }),
        !this.adapter)
            throw new Error("No WebGPU adapter was found.");
        if (this.device = await this.adapter.requestDevice(),
        this.context = this.canvas.getContext("webgpu"),
        !this.context)
            throw new Error("Could not create a WebGPU canvas context.");
        this.format = navigator.gpu.getPreferredCanvasFormat(),
        this.configureCanvas();
        const e = this.device.createShaderModule({
            code: cd
        })
          , n = this.device.createBindGroupLayout({
            entries: [{
                binding: 0,
                visibility: GPUShaderStage.VERTEX,
                buffer: {
                    type: "uniform"
                }
            }]
        });
        this.pipeline = this.device.createRenderPipeline({
            layout: this.device.createPipelineLayout({
                bindGroupLayouts: [n]
            }),
            vertex: {
                module: e,
                entryPoint: "vsMain",
                buffers: [{
                    arrayStride: _t,
                    attributes: [{
                        shaderLocation: 0,
                        offset: 0,
                        format: "float32x2"
                    }, {
                        shaderLocation: 1,
                        offset: 8,
                        format: "float32x4"
                    }]
                }]
            },
            fragment: {
                module: e,
                entryPoint: "fsMain",
                targets: [{
                    format: this.format,
                    blend: {
                        color: {
                            srcFactor: "src-alpha",
                            dstFactor: "one-minus-src-alpha",
                            operation: "add"
                        },
                        alpha: {
                            srcFactor: "one",
                            dstFactor: "one-minus-src-alpha",
                            operation: "add"
                        }
                    }
                }]
            },
            primitive: {
                topology: "triangle-list"
            },
            multisample: {
                count: 4
            }
        }),
        this.screenLinePipeline = this.device.createRenderPipeline({
            layout: this.device.createPipelineLayout({
                bindGroupLayouts: [n]
            }),
            vertex: {
                module: e,
                entryPoint: "vsScreenLine",
                buffers: [{
                    arrayStride: st,
                    attributes: [{
                        shaderLocation: 0,
                        offset: 0,
                        format: "float32x2"
                    }, {
                        shaderLocation: 1,
                        offset: 8,
                        format: "float32x2"
                    }, {
                        shaderLocation: 2,
                        offset: 16,
                        format: "float32x2"
                    }, {
                        shaderLocation: 3,
                        offset: 24,
                        format: "float32x4"
                    }, {
                        shaderLocation: 4,
                        offset: 40,
                        format: "float32"
                    }]
                }]
            },
            fragment: {
                module: e,
                entryPoint: "fsMain",
                targets: [{
                    format: this.format,
                    blend: {
                        color: {
                            srcFactor: "src-alpha",
                            dstFactor: "one-minus-src-alpha",
                            operation: "add"
                        },
                        alpha: {
                            srcFactor: "one",
                            dstFactor: "one-minus-src-alpha",
                            operation: "add"
                        }
                    }
                }]
            },
            primitive: {
                topology: "triangle-list"
            },
            multisample: {
                count: 4
            }
        }),
        this.uniformBuffer = this.device.createBuffer({
            size: 80,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        }),
        this.dimmedUniformBuffer = this.device.createBuffer({
            size: 80,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        }),
        this.bindGroup = this.device.createBindGroup({
            layout: n,
            entries: [{
                binding: 0,
                resource: {
                    buffer: this.uniformBuffer
                }
            }]
        }),
        this.dimmedBindGroup = this.device.createBindGroup({
            layout: n,
            entries: [{
                binding: 0,
                resource: {
                    buffer: this.dimmedUniformBuffer
                }
            }]
        }),
        this.scheduleFrame()
    }
    initializeWebGl2() {
        const e = this.canvas.getContext("webgl2", {
            alpha: !1,
            antialias: !0,
            depth: !1,
            premultipliedAlpha: !1,
            preserveDrawingBuffer: !1,
            stencil: !1
        });
        if (!e)
            throw new Error("WebGL 2 is not available in this browser.");
        if (this.webGl = e,
        this.webGlProgram = Bs(e, dd, Ps),
        this.webGlScreenLineProgram = Bs(e, ud, Ps),
        this.webGlTriangleVao = e.createVertexArray(),
        this.webGlScreenLineVao = e.createVertexArray(),
        !this.webGlTriangleVao || !this.webGlScreenLineVao)
            throw new Error("Could not create WebGL vertex-array objects.");
        this.webGlMatrixLocation = e.getUniformLocation(this.webGlProgram, "uMatrix"),
        this.webGlColorScaleLocation = e.getUniformLocation(this.webGlProgram, "uColorScale"),
        this.webGlScreenLineMatrixLocation = e.getUniformLocation(this.webGlScreenLineProgram, "uMatrix"),
        this.webGlScreenLineViewportLocation = e.getUniformLocation(this.webGlScreenLineProgram, "uViewport"),
        this.webGlScreenLineColorScaleLocation = e.getUniformLocation(this.webGlScreenLineProgram, "uColorScale"),
        e.disable(e.DEPTH_TEST),
        e.disable(e.CULL_FACE),
        e.enable(e.BLEND),
        e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA),
        this.configureCanvas(),
        this.scheduleFrame()
    }
    setWatermarkText(e) {
        this.watermarkText !== e && (this.watermarkText = e,
        this.scheduleFrame())
    }
    setBoard(e, n={}) {
        this.cancelGroundNetGeometryPrewarm();
        const i = this.board;
        if (this.geometryCacheGeneration += 1,
        n.dropPreviousBoardCaches === !0 && i && i !== e ? this.forgetBoard(i) : n.preserveCaches !== !0 && i === e && this.forgetBoard(e),
        this.destroySelectedNetGeometry(),
        this.destroyHighlightedPartNetGeometry(),
        this.board = e,
        this.outlineBoundsCache.clear(),
        this.options.visibleLayerIds = new Set(e.layers.filter(r => r.visible).map(r => r.id)),
        this.options.topLayerId = null,
        this.options.selectedComponentId = null,
        this.options.selectedPad = null,
        this.options.selectedNet = "",
        this.options.selectedTraceIndex = null,
        this.options.selectedLayerTraceId = null,
        this.options.highlightedPartIds = new Set,
        this.options.highlightedPartNetNames = new Set,
        this.options.highlightFullSignalTrace = !1,
        this.options.darkenedPartIds = new Set,
        n.fitToView !== !1) {
            const r = this.initialLandscapeOrientationBounds()
              , o = Math.max(0, r.maxX - r.minX)
              , s = Math.max(0, r.maxY - r.minY)
              , a = o > 0 && s > o * ed;
            this.viewQuarterTurns = Yn((e.metadata.initialDisplayRotationQuarterTurns ?? 0) + (a ? 1 : 0), 4),
            this.flipHorizontal = !1,
            this.flipVertical = !1,
            this.sideFlipHorizontal = !1,
            this.sideFlipVertical = !1
        }
        this.hoveredComponentId = null,
        this.hoveredPad = null,
        this.hoveredBackgroundPad = null,
        this.selectedTraceGraphicsCache = null,
        this.selectedLayerTraceGraphicsCache = null,
        this.tracePinsOverlayCache = null,
        this.vertexBatches = [],
        this.vertexCount = 0,
        this.screenLineVertexBatches = [],
        this.screenLineVertexCount = 0,
        this.geometryDirty = !0,
        n.preserveCaches !== !0 && this.invalidateComponentFrameCache(),
        this.rebuildNetHighlightCache(),
        n.fitToView === !1 ? (this.targetZoom = this.zoom,
        this.targetOffsetX = this.offsetX,
        this.targetOffsetY = this.offsetY,
        this.smoothCenterActive = !1,
        this.zoomAnchorScreen = null,
        this.zoomAnchorWorld = null,
        this.scheduleFrame()) : this.fitToView(),
        this.scheduleGeometryPrewarm(Ni(this.options.activeSide)),
        this.scheduleGroundNetGeometryPrewarm()
    }
    clearBoard(e={}) {
        this.cancelGroundNetGeometryPrewarm();
        const n = this.board;
        this.geometryCacheGeneration += 1,
        e.preserveCaches !== !0 && n && this.forgetBoard(n),
        this.vertexBatches = [],
        this.vertexCount = 0,
        this.screenLineVertexBatches = [],
        this.screenLineVertexCount = 0,
        this.destroySelectedNetGeometry(),
        this.destroyHighlightedPartNetGeometry(),
        this.destroyFocusDimBuffer(),
        this.board = null,
        this.options.visibleLayerIds.clear(),
        this.options.topLayerId = null,
        this.options.selectedComponentId = null,
        this.options.selectedPad = null,
        this.options.selectedNet = "",
        this.options.selectedTraceIndex = null,
        this.options.selectedLayerTraceId = null,
        this.options.highlightedPartIds = new Set,
        this.options.highlightedPartNetNames = new Set,
        this.options.highlightFullSignalTrace = !1,
        this.options.darkenedPartIds = new Set,
        this.hoveredComponentId = null,
        this.hoveredPad = null,
        this.hoveredBackgroundPad = null,
        this.selectedTraceGraphicsCache = null,
        this.selectedLayerTraceGraphicsCache = null,
        this.tracePinsOverlayCache = null,
        this.geometryDirty = !0,
        this.invalidateComponentFrameCache(),
        this.outlineBoundsCache.clear(),
        this.netHighlightCache = new Map,
        this.scheduleFrame()
    }
    forgetBoard(e) {
        this.groundNetGeometryPrewarm?.board === e && this.cancelGroundNetGeometryPrewarm();
        const n = this.boardGeometryIds.get(e);
        if (n !== void 0) {
            const r = `${n}|`;
            for (const [o,s] of this.geometryCache)
                o.startsWith(r) && (L(s.batches, this.webGl),
                L(s.screenLineBatches, this.webGl),
                this.geometryCache.delete(o));
            en(this.layerViewGeometryCache, r),
            en(this.visibleGraphicsCache, r),
            en(this.pickIndexCache, r),
            En(this.skippedPrewarmKeys, r),
            En(this.skippedSelectedNetGeometryKeys, r),
            En(this.skippedGroundNetGeometryPrewarmKeys, r),
            this.boardGeometryIds.delete(e)
        }
        const i = this.netHighlightCacheByBoard.get(e);
        this.netHighlightCacheByBoard.delete(e),
        this.backgroundPadCoverageByBoard.delete(e),
        this.layerGraphicRefsByBoard.delete(e),
        this.layerSideIndependentPhaseCacheByBoard.delete(e),
        this.componentFrameCachesByBoard.delete(e),
        this.board === e && (this.vertexBatches = [],
        this.vertexCount = 0,
        this.screenLineVertexBatches = [],
        this.screenLineVertexCount = 0,
        this.destroySelectedNetGeometry(),
        this.selectedTraceGraphicsCache = null,
        this.selectedLayerTraceGraphicsCache = null,
        this.tracePinsOverlayCache = null),
        this.destroySelectedNetGeometryCacheForBoard(e),
        i && this.netHighlightCache === i && (this.netHighlightCache = new Map)
    }
    getBoard() {
        return this.board
    }
    getActiveSide() {
        return this.options.activeSide
    }
    captureViewState() {
        return {
            zoom: this.zoom,
            offsetX: this.offsetX,
            offsetY: this.offsetY,
            rotationQuarterTurns: this.viewQuarterTurns,
            flipHorizontal: this.flipHorizontal,
            flipVertical: this.flipVertical,
            sideFlipHorizontal: this.sideFlipHorizontal,
            sideFlipVertical: this.sideFlipVertical
        }
    }
    restoreViewState(e) {
        this.zoom = ee(Number.isFinite(e.zoom) ? e.zoom : 1, .001, 400),
        this.offsetX = Number.isFinite(e.offsetX) ? e.offsetX : 0,
        this.offsetY = Number.isFinite(e.offsetY) ? e.offsetY : 0,
        this.targetZoom = this.zoom,
        this.targetOffsetX = this.offsetX,
        this.targetOffsetY = this.offsetY,
        this.viewQuarterTurns = Yn(e.rotationQuarterTurns, 4),
        this.flipHorizontal = e.flipHorizontal,
        this.flipVertical = e.flipVertical,
        this.sideFlipHorizontal = e.sideFlipHorizontal,
        this.sideFlipVertical = e.sideFlipVertical,
        this.smoothCenterActive = !1,
        this.zoomAnchorScreen = null,
        this.zoomAnchorWorld = null,
        this.scheduleFrame()
    }
    setActiveSide(e) {
        if (this.options.activeSide === e)
            return;
        this.cancelGroundNetGeometryPrewarm();
        const n = this.screenToWorld(this.cssWidth() / 2, this.cssHeight() / 2);
        this.options.activeSide = e;
        const i = this.worldToDisplay(n.x, n.y);
        this.offsetX = this.cssWidth() / 2 - i.x * this.zoom,
        this.offsetY = this.cssHeight() / 2 - i.y * this.zoom,
        this.targetOffsetX = this.offsetX,
        this.targetOffsetY = this.offsetY,
        this.smoothCenterActive = !1,
        this.targetZoom = this.zoom,
        this.zoomAnchorScreen = null,
        this.zoomAnchorWorld = null,
        this.geometryDirty = !0,
        this.scheduleFrame(),
        this.scheduleGeometryPrewarm(Ni(e)),
        this.scheduleGroundNetGeometryPrewarm()
    }
    rotateView(e) {
        const n = this.screenToWorld(this.cssWidth() / 2, this.cssHeight() / 2);
        this.viewQuarterTurns = Yn(this.viewQuarterTurns + (e ? 1 : -1), 4);
        const i = this.worldToDisplay(n.x, n.y);
        this.offsetX = this.cssWidth() / 2 - i.x * this.zoom,
        this.offsetY = this.cssHeight() / 2 - i.y * this.zoom,
        this.targetOffsetX = this.offsetX,
        this.targetOffsetY = this.offsetY,
        this.smoothCenterActive = !1,
        this.targetZoom = this.zoom,
        this.zoomAnchorScreen = null,
        this.zoomAnchorWorld = null,
        this.scheduleFrame()
    }
    toggleFlipHorizontal() {
        this.setViewFlip(!this.flipHorizontal, this.flipVertical)
    }
    toggleFlipVertical() {
        this.setViewFlip(this.flipHorizontal, !this.flipVertical)
    }
    isFlipHorizontalEnabled() {
        return this.flipHorizontal
    }
    isFlipVerticalEnabled() {
        return this.flipVertical
    }
    setViewFlip(e, n) {
        this.flipHorizontal === e && this.flipVertical === n || this.setViewFlipInternal(e, n, this.sideFlipHorizontal, this.sideFlipVertical)
    }
    applySideFlipModeCompensation(e, n, i) {
        if (e === n || this.shouldMirrorSide(e) === this.shouldMirrorSide(n))
            return;
        let r = this.sideFlipHorizontal
          , o = this.sideFlipVertical
          , s = !1;
        const a = i.forceOverXAxis === !0 || i.overXAxis;
        (i.withoutMirroring || a) && (this.viewQuarterTurns & 1 ? o = !o : r = !r,
        s = !0),
        a && (this.viewQuarterTurns & 1 ? r = !r : o = !o,
        s = !0),
        s && this.setViewFlipInternal(this.flipHorizontal, this.flipVertical, r, o)
    }
    resetSideFlipModeCompensation() {
        !this.sideFlipHorizontal && !this.sideFlipVertical || this.setViewFlipInternal(this.flipHorizontal, this.flipVertical, !1, !1)
    }
    setViewFlipInternal(e, n, i, r) {
        if (this.flipHorizontal === e && this.flipVertical === n && this.sideFlipHorizontal === i && this.sideFlipVertical === r)
            return;
        const o = this.screenToWorld(this.cssWidth() / 2, this.cssHeight() / 2);
        this.flipHorizontal = e,
        this.flipVertical = n,
        this.sideFlipHorizontal = i,
        this.sideFlipVertical = r;
        const s = this.worldToDisplay(o.x, o.y);
        this.offsetX = this.cssWidth() / 2 - s.x * this.zoom,
        this.offsetY = this.cssHeight() / 2 - s.y * this.zoom,
        this.targetOffsetX = this.offsetX,
        this.targetOffsetY = this.offsetY,
        this.smoothCenterActive = !1,
        this.targetZoom = this.zoom,
        this.zoomAnchorScreen = null,
        this.zoomAnchorWorld = null,
        this.scheduleFrame()
    }
    setLayerVisible(e, n) {
        const i = this.layerVisible(e);
        n ? this.options.visibleLayerIds.add(e) : this.options.visibleLayerIds.delete(e);
        const r = this.layerById(e);
        r && (r.visible = n),
        i !== n && this.invalidateLayerGeometry()
    }
    setLayerModeEnabled(e) {
        this.options.layerModeEnabled !== e && (this.options.layerModeEnabled = e,
        this.invalidateLayerGeometry())
    }
    isLayerVisible(e) {
        return this.layerVisible(e)
    }
    getTopLayerId() {
        return this.options.topLayerId
    }
    setTopLayerId(e) {
        const n = e !== null && this.layerById(e) ? e : null;
        if (this.options.topLayerId !== n) {
            if (this.cancelGroundNetGeometryPrewarm(),
            this.options.topLayerId = n,
            this.layerStylingActive()) {
                this.vertexBatches = [],
                this.vertexCount = 0,
                this.screenLineVertexBatches = [],
                this.screenLineVertexCount = 0,
                this.geometryDirty = !0,
                this.scheduleFrame(),
                this.scheduleGroundNetGeometryPrewarm();
                return
            }
            this.invalidateLayerGeometry()
        }
    }
    invalidateLayerGeometry() {
        if (this.cancelGroundNetGeometryPrewarm(),
        this.geometryCacheGeneration += 1,
        this.vertexBatches = [],
        this.vertexCount = 0,
        this.screenLineVertexBatches = [],
        this.screenLineVertexCount = 0,
        this.destroySelectedNetGeometry(),
        this.destroyHighlightedPartNetGeometry(),
        this.selectedTraceGraphicsCache = null,
        this.selectedLayerTraceGraphicsCache = null,
        this.tracePinsOverlayCache = null,
        this.board) {
            const e = `${this.currentBoardGeometryId()}|`;
            en(this.layerViewGeometryCache, e),
            en(this.visibleGraphicsCache, e),
            en(this.pickIndexCache, e),
            En(this.skippedPrewarmKeys, e),
            En(this.skippedGroundNetGeometryPrewarmKeys, e)
        }
        this.geometryDirty = !0,
        this.outlineBoundsCache.clear(),
        this.scheduleFrame(),
        this.scheduleGeometryPrewarm(Ni(this.options.activeSide)),
        this.scheduleGroundNetGeometryPrewarm()
    }
    selectComponent(e, n=!1) {
        n || this.destroySelectedNetGeometry(),
        this.options.selectedComponentId = e,
        this.options.selectedPad = null,
        n || (this.options.selectedNet = ""),
        this.options.selectedTraceIndex = null,
        this.options.selectedLayerTraceId = null,
        this.scheduleFrame(),
        this.scheduleGroundNetGeometryPrewarm()
    }
    selectPad(e, n) {
        this.options.selectedComponentId = e,
        this.options.selectedPad = {
            componentId: e,
            padIndex: n
        };
        const r = this.board?.components.find(o => o.id === e)?.pads[n]?.net ?? "";
        r !== this.options.selectedNet && this.destroySelectedNetGeometry(),
        this.options.selectedNet = r,
        this.options.selectedTraceIndex = null,
        this.options.selectedLayerTraceId = null,
        this.scheduleFrame()
    }
    selectNet(e, n=!1) {
        (e === "" || e !== this.options.selectedNet) && this.destroySelectedNetGeometry(),
        n || (this.options.selectedComponentId = null),
        this.options.selectedPad = null,
        this.options.selectedNet = e,
        this.options.selectedTraceIndex = null,
        this.options.selectedLayerTraceId = null,
        this.scheduleFrame(),
        e === "" && this.scheduleGroundNetGeometryPrewarm()
    }
    selectTrace(e) {
        if (e === null || !this.board || e < 0 || e >= this.board.graphics.length) {
            this.options.selectedTraceIndex = null,
            this.selectedTraceGraphicsCache = null,
            this.tracePinsOverlayCache = null,
            this.scheduleFrame();
            return
        }
        const n = this.board.graphics[e];
        if (!n || !this.isSelectableTraceGraphic(n, !1, !0)) {
            this.destroySelectedNetGeometry(),
            this.options.selectedTraceIndex = null,
            this.selectedTraceGraphicsCache = null,
            this.tracePinsOverlayCache = null,
            this.scheduleFrame();
            return
        }
        n.net === this.options.selectedNet && he(n.net) || this.destroySelectedNetGeometry(),
        this.options.selectedComponentId = null,
        this.options.selectedPad = null,
        this.options.selectedNet = n.net,
        this.options.selectedTraceIndex = e,
        this.options.selectedLayerTraceId = null,
        this.selectedTraceGraphicsCache = null,
        this.selectedLayerTraceGraphicsCache = null,
        this.tracePinsOverlayCache = null,
        this.scheduleFrame()
    }
    selectLayerTraceFocus(e) {
        const n = e !== null && this.layerById(e) ? e : null;
        this.options.selectedLayerTraceId !== n && (this.options.selectedLayerTraceId = n,
        this.selectedLayerTraceGraphicsCache = null,
        this.scheduleFrame())
    }
    setHighlightFullSignalTrace(e) {
        this.options.highlightFullSignalTrace !== e && (this.options.highlightFullSignalTrace = e,
        this.scheduleFrame())
    }
    findTraceGraphicIndexForLayerSelection(e, n) {
        if (e < 0 || n.trim() === "")
            return null;
        const i = this.netHighlightCache.get(n);
        if (!i)
            return null;
        let r = null;
        for (let o = 0; o < i.graphics.length; o += 1) {
            const s = i.graphics[o];
            if (!s || s.sourceNegative || s.layer === "edge-cuts" || s.layerId !== e)
                continue;
            const a = i.graphicIndices[o];
            if (a !== void 0) {
                if (s.type === "line" || s.type === "arc")
                    return a;
                r ??= a
            }
        }
        return r
    }
    setShowNetWeb(e) {
        this.options.showNetWeb !== e && (this.options.showNetWeb = e,
        this.scheduleFrame())
    }
    setShowPinNetLabels(e) {
        this.options.showPinNetLabels !== e && (this.options.showPinNetLabels = e,
        this.scheduleFrame())
    }
    setDrawPinPads(e) {
        this.options.drawPinPads === e && (e || !this.options.hollowPinPads) || (this.options.drawPinPads = e,
        e || (this.options.hollowPinPads = !1),
        this.invalidatePadDisplayGeometry())
    }
    setHollowPinPads(e) {
        const n = this.options.drawPinPads && e;
        this.options.hollowPinPads !== n && (this.options.hollowPinPads = n,
        this.invalidatePadDisplayGeometry())
    }
    setHighlightedPartIds(e) {
        Hs(this.options.highlightedPartIds, e) || (this.options.highlightedPartIds = new Set(e),
        this.scheduleFrame())
    }
    setHighlightedPartNetNames(e) {
        qd(this.options.highlightedPartNetNames, e) || (this.cancelGroundNetGeometryPrewarm(),
        this.options.highlightedPartNetNames = new Set(e),
        this.destroyHighlightedPartNetGeometry(),
        this.scheduleFrame(),
        this.scheduleGroundNetGeometryPrewarm())
    }
    setDarkenedPartIds(e) {
        Hs(this.options.darkenedPartIds, e) || (this.options.darkenedPartIds = new Set(e),
        this.scheduleFrame())
    }
    setHoveredPad(e, n, i=null, r=null) {
        const o = e
          , s = e === null || n === null || n < 0 ? null : {
            componentId: e,
            padIndex: n
        }
          , a = i === null || r === null || r < 0 ? null : {
            componentId: i,
            padIndex: r
        };
        o === this.hoveredComponentId && Ys(s, this.hoveredPad) && Ys(a, this.hoveredBackgroundPad) || (this.hoveredComponentId = o,
        this.hoveredPad = s,
        this.hoveredBackgroundPad = a,
        this.scheduleFrame())
    }
    pan(e, n) {
        this.offsetX += e,
        this.offsetY += n,
        this.targetOffsetX = this.offsetX,
        this.targetOffsetY = this.offsetY,
        this.smoothCenterActive = !1,
        this.zoomAnchorScreen && (this.zoomAnchorScreen.x += e,
        this.zoomAnchorScreen.y += n),
        this.scheduleFrame()
    }
    zoomAt(e, n, i) {
        this.zoomByFactorAt(e, n, Math.exp(-i * .0024), !0)
    }
    zoomByFactorAt(e, n, i, r=!0) {
        !Number.isFinite(i) || i <= 0 || (this.zoomAnchorScreen = {
            x: e,
            y: n
        },
        this.zoomAnchorWorld = this.screenToWorld(e, n),
        this.smoothCenterActive = !1,
        this.targetZoom = ee(this.targetZoom * i, .001, 400),
        r || (this.zoom = this.targetZoom,
        this.applyZoomAnchor(),
        this.zoomAnchorScreen = null,
        this.zoomAnchorWorld = null),
        this.scheduleFrame())
    }
    fitToView() {
        if (!this.board)
            return;
        const e = Math.max(1, this.cssWidth())
          , n = Math.max(1, this.cssHeight())
          , i = this.displayBounds(this.preferredFitBounds())
          , r = Math.max(1, i.maxX - i.minX)
          , o = Math.max(1, i.maxY - i.minY)
          , s = Math.min(e / r, n / o) * .96;
        this.zoom = ee(s, .001, 400),
        this.targetZoom = this.zoom,
        this.zoomAnchorScreen = null,
        this.zoomAnchorWorld = null,
        this.offsetX = (e - r * this.zoom) * .5 - i.minX * this.zoom,
        this.offsetY = (n - o * this.zoom) * .5 - i.minY * this.zoom,
        this.targetOffsetX = this.offsetX,
        this.targetOffsetY = this.offsetY,
        this.smoothCenterActive = !1,
        this.scheduleFrame()
    }
    focusComponent(e, n=!0) {
        const i = this.componentDisplayFrame(e);
        if (!i.obb && !i.bounds.valid)
            return;
        const r = i.obb ? i.obb.cx : (i.bounds.minX + i.bounds.maxX) * .5
          , o = i.obb ? i.obb.cy : (i.bounds.minY + i.bounds.maxY) * .5;
        this.centerOnWorld(r, o, n)
    }
    focusPad(e, n, i=!0) {
        const r = this.padVisualCenterWorld(e, n);
        this.centerOnWorld(r.x, r.y, i)
    }
    centerOnWorld(e, n, i=!0) {
        const r = this.worldToDisplay(e, n)
          , o = this.cssWidth() * .5 - r.x * this.zoom
          , s = this.cssHeight() * .5 - r.y * this.zoom;
        this.targetOffsetX = o,
        this.targetOffsetY = s,
        this.smoothCenterActive = i,
        i || (this.offsetX = o,
        this.offsetY = s),
        this.targetZoom = this.zoom,
        this.zoomAnchorScreen = null,
        this.zoomAnchorWorld = null,
        this.scheduleFrame()
    }
    pickComponent(e, n) {
        return this.pick(e, n)?.component ?? null
    }
    pick(e, n) {
        if (!this.board)
            return null;
        const i = this.screenToWorld(e, n)
          , r = Math.min(2.5, 4 / Math.max(this.zoom, .001))
          , o = this.pickSpatialIndex();
        if (o) {
            const a = this.queryPickPads(o, i, r)
              , l = this.queryPickComponents(o, i, r);
            return this.pickPadOrUnderlyingComponent(a, l, i, r)
        }
        for (let a = this.board.components.length - 1; a >= 0; --a) {
            const l = this.board.components[a];
            if (!(!l || !this.componentHasVisiblePadsOnSide(l)))
                for (let c = l.pads.length - 1; c >= 0; --c) {
                    const d = l.pads[c];
                    if (!(!d || !this.padVisible(d) || d.suppressVisual) && this.padHitTest(l, d, i, r))
                        return {
                            component: l,
                            pad: d,
                            padIndex: c
                        }
                }
        }
        let s = null;
        for (let a = this.board.components.length - 1; a >= 0; --a) {
            const l = this.board.components[a];
            if (!l || !this.componentVisibleOnSide(l))
                continue;
            const c = this.componentHitCandidate(l, a, i, r);
            c && this.componentHitCandidateIsBetter(c, s) && (s = c)
        }
        return s ? {
            component: s.component,
            pad: null,
            padIndex: -1
        } : null
    }
    pickPadOrUnderlyingComponent(e, n, i, r) {
        const o = [];
        for (const d of e) {
            const u = this.padHitScore(d.component, d.pad, i, r);
            u !== null && o.push({
                candidate: d,
                score: u
            })
        }
        o.sort( (d, u) => d.score - u.score);
        const s = o.map(d => d.candidate)
          , a = s.reduce( (d, u) => this.isStandaloneBackgroundPadCandidate(u) && (!d || je(u.bounds) > je(d.bounds)) ? u : d, void 0)
          , l = d => a && a.component.id !== d ? {
            component: a.component,
            pad: a.pad,
            padIndex: a.padIndex
        } : void 0;
        for (const d of s) {
            const u = {
                component: d.component,
                pad: d.pad,
                padIndex: d.padIndex,
                backgroundPad: l(d.component.id)
            }
              , h = this.isBroadPadBodyStealCandidate(d)
              , f = d.component.pads.length === 1 && d.pad.type === "smd";
            if (!h && !f)
                return u;
            const p = this.bestComponentHit(n.filter(m => m.component.id !== d.component.id), i, r);
            if (!p)
                return u;
            if (!h) {
                const m = this.componentHitCandidate(d.component, d.componentOrder, i, r);
                if (!m || p.area <= 0 || p.area * 1.5 >= m.area)
                    return u
            }
            for (const m of s)
                if (m.component.id === p.component.id)
                    return {
                        component: m.component,
                        pad: m.pad,
                        padIndex: m.padIndex,
                        backgroundPad: l(m.component.id)
                    };
            return {
                component: p.component,
                pad: null,
                padIndex: -1,
                backgroundPad: l(p.component.id)
            }
        }
        const c = this.bestComponentHit(n, i, r);
        return c ? {
            component: c.component,
            pad: null,
            padIndex: -1
        } : null
    }
    isBroadPadBodyStealCandidate(e) {
        return this.isBroadPadBoundsStealCandidate(e.bounds)
    }
    isBroadPadBoundsStealCandidate(e) {
        if (!this.board || !e.valid)
            return !1;
        const n = Math.max(0, this.board.bounds.maxX - this.board.bounds.minX)
          , i = Math.max(0, this.board.bounds.maxY - this.board.bounds.minY)
          , r = n * i
          , o = Math.max(0, e.maxX - e.minX)
          , s = Math.max(0, e.maxY - e.minY);
        return r > 0 && je(e) >= r * .001 || Math.max(n, i) > 0 && Math.max(o, s) >= Math.max(n, i) * .03
    }
    isStandaloneBackgroundPadCandidate(e) {
        return this.isStandaloneBackgroundPad(e.component, e.pad)
    }
    isStandaloneBackgroundPad(e, n) {
        return e.pads.length === 1 && (n.type === "through-hole" || n.type === "smd")
    }
    isBroadStandaloneBackgroundPadComponent(e) {
        const n = e.pads[0];
        return !!(n && e.pads.length === 1 && (n.type === "through-hole" || n.type === "smd" && this.isBroadPadBoundsStealCandidate(this.padVisualBounds(e, n))))
    }
    maxCoveredBodyAreaForBackgroundPad(e, n) {
        return e.type === "smd" && !this.isBroadPadBoundsStealCandidate(n) ? je(n) / 1.5 : Number.POSITIVE_INFINITY
    }
    bestComponentHit(e, n, i) {
        let r = null;
        for (const o of e) {
            const s = this.componentHitCandidate(o.component, o.componentOrder, n, i);
            s && this.componentHitCandidateIsBetter(s, r) && (r = s)
        }
        return r
    }
    componentHitCandidate(e, n, i, r) {
        const o = this.componentDisplayFrame(e);
        if (!o.bounds.valid)
            return null;
        let s, a, l;
        if (o.obb) {
            if (!Xd(i.x, i.y, o.obb, r))
                return null;
            s = o.obb.cx,
            a = o.obb.cy,
            l = o.obb.hw * o.obb.hh * 4
        } else {
            if (!Gt(i.x, i.y, o.bounds, r))
                return null;
            s = (o.bounds.minX + o.bounds.maxX) * .5,
            a = (o.bounds.minY + o.bounds.maxY) * .5,
            l = Math.max(0, o.bounds.maxX - o.bounds.minX) * Math.max(0, o.bounds.maxY - o.bounds.minY)
        }
        return {
            component: e,
            componentOrder: n,
            area: Math.max(1e-6, l),
            distance: Rs(i.x, i.y, s, a)
        }
    }
    componentHitCandidateIsBetter(e, n) {
        if (!n)
            return !0;
        const i = Math.min(e.area, n.area)
          , r = Math.max(e.area, n.area);
        return i > 0 && r > i * 1.5 && Math.abs(e.area - n.area) > 1e-6 ? e.area < n.area : Math.abs(e.distance - n.distance) > 1e-6 ? e.distance < n.distance : e.componentOrder > n.componentOrder
    }
    pickTrace(e, n, i={}) {
        const r = this.pickTraceMatching(e, n, i);
        return r || !this.isManualTopLayerActiveForCurrentView() ? r : this.pickTraceMatching(e, n, i, void 0, {
            ignoreManualTopLayer: !0
        })
    }
    pickNetTrace(e, n, i, r={}) {
        const o = i.trim();
        return o === "" ? null : this.pickTraceMatching(e, n, r, s => s.graphic.net === o, {
            allowConnectedTraceException: !0
        })
    }
    pickSelectedTrace(e, n, i={}) {
        const r = this.selectedTraceGraphic();
        if (!r)
            return null;
        const o = new Set(this.selectedTraceGraphics(r));
        return o.size === 0 ? null : this.pickTraceMatching(e, n, i, s => o.has(s.graphic), {
            allowConnectedTraceException: !0
        })
    }
    pickTraceMatching(e, n, i={}, r, o={}) {
        if (!this.board || !this.hasLayerData())
            return null;
        const s = this.screenToWorld(e, n)
          , a = Math.max(.001, 2.5 / Math.max(this.zoom, .001))
          , l = Math.max(.001, 1.25 / Math.max(this.zoom, .001))
          , c = this.pickSpatialIndex()
          , u = (c ? this.queryPickTraces(c, s, a) : this.board.graphics.map( (m, y) => ({
            graphic: m,
            graphicIndex: y,
            bounds: rn(m)
        })).filter(m => m.bounds.valid)).filter(m => this.isSelectableTraceGraphic(m.graphic, o.allowConnectedTraceException === !0, o.ignoreManualTopLayer === !0))
          , h = r ? u.filter(r) : u
          , p = this.bestTracePickCandidate(h, s, l, i, !0) ?? this.bestTracePickCandidate(h, s, a, i, !1);
        return p ? {
            graphic: p.ref.graphic,
            graphicIndex: p.ref.graphicIndex,
            layerId: p.ref.graphic.layerId,
            net: p.ref.graphic.net,
            hitKind: p.hitKind
        } : null
    }
    bestTracePickCandidate(e, n, i, r, o) {
        let s = null;
        for (const a of e) {
            const l = this.traceHitTest(a.graphic, n, i);
            l && (r.requireComponentIntent && !this.traceGraphicIsComponentIntent(a.graphic, r.componentContext ?? null, l.hitKind) || this.tracePickCandidateBetter(a, l, s, o) && (s = {
                ref: a,
                score: l.score,
                hitKind: l.hitKind,
                directHit: l.directHit
            }))
        }
        return s
    }
    tracePickCandidateBetter(e, n, i, r) {
        if (!i)
            return !0;
        if (n.directHit !== i.directHit)
            return n.directHit;
        const o = this.tracePickDrawOrder(e)
          , s = this.tracePickDrawOrder(i.ref);
        if (r && n.directHit && i.directHit && o !== s)
            return o > s;
        const a = n.hitKind === "stroke" ? 1 : 0
          , l = i.hitKind === "stroke" ? 1 : 0;
        return a !== l ? a > l : Math.abs(n.score - i.score) > 1e-6 ? n.score < i.score : r && o !== s || o !== s ? o > s : e.graphicIndex > i.ref.graphicIndex
    }
    tracePickDrawOrder(e) {
        const n = e.graphic
          , i = this.shouldUseScreenLineStroke(n) ? 1 : 0
          , r = this.itemOnTopLayer(n.layerId, n.layer) ? 1 : 0
          , o = n.filled ? 0 : 1
          , s = this.geometryLayerId(n.layerId, n.layer)
          , a = Math.max(0, (this.board?.layers.findIndex(u => u.id === s) ?? -1) + 1)
          , l = (this.board?.layers.length ?? 0) + 2
          , c = (this.board?.graphics.length ?? 0) + 1
          , d = r * 2 + o;
        return ((i * 4 + d) * l + a) * c + e.graphicIndex
    }
    screenToWorld(e, n) {
        const i = (e - this.offsetX) / this.zoom
          , r = (n - this.offsetY) / this.zoom;
        return this.displayToWorld(i, r)
    }
    getStats() {
        return {
            vertices: this.vertexCount,
            triangles: Math.floor(this.vertexCount / 3)
        }
    }
    scheduleFrame() {
        this.framePending || (this.framePending = !0,
        requestAnimationFrame(e => {
            this.framePending = !1,
            this.render(e)
        }
        ))
    }
    render(e) {
        if (this.backend === "WebGL 2") {
            this.renderWebGl2(e);
            return
        }
        if (!this.device || !this.context || !this.pipeline || !this.screenLinePipeline || !this.uniformBuffer || !this.bindGroup || !this.dimmedUniformBuffer || !this.dimmedBindGroup)
            return;
        this.configureCanvas();
        const n = this.takeFrameElapsedMs(e)
          , i = this.stepSmoothZoom(n)
          , r = this.stepSmoothCenter(n);
        this.geometryDirty && this.rebuildGeometry(),
        this.updateUniforms();
        const o = this.ensureSelectedNetGeometry()
          , s = this.ensureHighlightedPartNetGeometry()
          , a = this.updateFocusDimGeometry();
        this.updateOverlay();
        const l = this.context.getCurrentTexture().createView()
          , c = this.getMsaaTextureView() ?? l
          , d = this.device.createCommandEncoder()
          , u = d.beginRenderPass({
            colorAttachments: [{
                view: c,
                resolveTarget: c === l ? void 0 : l,
                clearValue: {
                    r: w.background[0],
                    g: w.background[1],
                    b: w.background[2],
                    a: w.background[3]
                },
                loadOp: "clear",
                storeOp: "store"
            }]
        });
        if (this.vertexBatches.length > 0 && this.vertexCount > 0 && (u.setPipeline(this.pipeline),
        this.drawWebGpuBatches(u, this.vertexBatches)),
        this.screenLineVertexBatches.length > 0 && this.screenLineVertexCount > 0 && (u.setPipeline(this.screenLinePipeline),
        this.drawWebGpuBatches(u, this.screenLineVertexBatches)),
        a && this.focusDimBuffer && this.focusDimVertexCount > 0 && (u.setPipeline(this.pipeline),
        u.setBindGroup(0, this.bindGroup),
        u.setVertexBuffer(0, this.focusDimBuffer),
        u.draw(this.focusDimVertexCount)),
        o && this.selectedNetScreenLineVertexBatches.length > 0 && this.selectedNetScreenLineVertexCount > 0) {
            u.setPipeline(this.screenLinePipeline),
            u.setBindGroup(0, this.bindGroup);
            for (const h of this.selectedNetScreenLineVertexBatches)
                h.buffer && (u.setVertexBuffer(0, h.buffer),
                u.draw(h.vertexCount))
        }
        if (s && this.highlightedPartNetScreenLineVertexBatches.length > 0 && this.highlightedPartNetScreenLineVertexCount > 0) {
            u.setPipeline(this.screenLinePipeline),
            u.setBindGroup(0, this.bindGroup);
            for (const h of this.highlightedPartNetScreenLineVertexBatches)
                h.buffer && (u.setVertexBuffer(0, h.buffer),
                u.draw(h.vertexCount))
        }
        if (o && this.selectedNetVertexBatches.length > 0 && this.selectedNetVertexCount > 0) {
            u.setPipeline(this.pipeline),
            u.setBindGroup(0, this.bindGroup);
            for (const h of this.selectedNetVertexBatches)
                h.buffer && (u.setVertexBuffer(0, h.buffer),
                u.draw(h.vertexCount))
        }
        if (s && this.highlightedPartNetVertexBatches.length > 0 && this.highlightedPartNetVertexCount > 0) {
            u.setPipeline(this.pipeline),
            u.setBindGroup(0, this.bindGroup);
            for (const h of this.highlightedPartNetVertexBatches)
                h.buffer && (u.setVertexBuffer(0, h.buffer),
                u.draw(h.vertexCount))
        }
        u.end(),
        this.device.queue.submit([d.finish()]),
        (i || r) && this.scheduleFrame()
    }
    drawWebGpuBatches(e, n) {
        let i = null;
        for (const r of n) {
            if (!r.buffer || r.vertexCount <= 0)
                continue;
            const o = this.geometryBatchColorScale(r) < 1;
            o !== i && (e.setBindGroup(0, o ? this.dimmedBindGroup : this.bindGroup),
            i = o),
            e.setVertexBuffer(0, r.buffer),
            e.draw(r.vertexCount)
        }
    }
    renderWebGl2(e) {
        const n = this.webGl;
        if (!n || !this.webGlProgram || !this.webGlScreenLineProgram)
            return;
        this.configureCanvas();
        const i = this.takeFrameElapsedMs(e)
          , r = this.stepSmoothZoom(i)
          , o = this.stepSmoothCenter(i);
        this.geometryDirty && this.rebuildGeometry();
        const s = this.ensureSelectedNetGeometry()
          , a = this.ensureHighlightedPartNetGeometry()
          , l = this.updateFocusDimGeometry();
        this.updateOverlay();
        const c = this.viewMatrix().subarray(0, 16);
        if (n.viewport(0, 0, Math.max(1, this.canvas.width), Math.max(1, this.canvas.height)),
        n.clearColor(w.background[0], w.background[1], w.background[2], w.background[3]),
        n.clear(n.COLOR_BUFFER_BIT),
        this.drawWebGlTriangleBatches(this.vertexBatches, c),
        this.drawWebGlScreenLineBatches(this.screenLineVertexBatches, c),
        l && this.focusDimWebGlBuffer && this.focusDimVertexCount > 0 && this.drawWebGlTriangleBuffer(this.focusDimWebGlBuffer, this.focusDimVertexCount, c),
        s && this.drawWebGlScreenLineBatches(this.selectedNetScreenLineVertexBatches, c),
        a && this.drawWebGlScreenLineBatches(this.highlightedPartNetScreenLineVertexBatches, c),
        s && this.drawWebGlTriangleBatches(this.selectedNetVertexBatches, c),
        a && this.drawWebGlTriangleBatches(this.highlightedPartNetVertexBatches, c),
        n.bindVertexArray(null),
        n.bindBuffer(n.ARRAY_BUFFER, null),
        n.flush(),
        !this.webGlFrameStatusReported && this.vertexCount > 0) {
            this.webGlFrameStatusReported = !0;
            const d = n.getError();
            d === n.NO_ERROR ? console.info("[ViewBV Web] WebGL 2 frame rendered", {
                vertices: this.vertexCount,
                screenLineVertices: this.screenLineVertexCount
            }) : console.error("[ViewBV Web] WebGL 2 rendering error", {
                error: d
            })
        }
        (r || o) && this.scheduleFrame()
    }
    drawWebGlTriangleBatches(e, n) {
        for (const i of e)
            i.webGlBuffer && this.drawWebGlTriangleBuffer(i.webGlBuffer, i.vertexCount, n, this.geometryBatchColorScale(i))
    }
    drawWebGlTriangleBuffer(e, n, i, r=1) {
        const o = this.webGl;
        !o || !this.webGlProgram || !this.webGlTriangleVao || n <= 0 || (o.bindVertexArray(this.webGlTriangleVao),
        o.useProgram(this.webGlProgram),
        o.uniformMatrix4fv(this.webGlMatrixLocation, !1, i),
        o.uniform1f(this.webGlColorScaleLocation, r),
        o.bindBuffer(o.ARRAY_BUFFER, e),
        o.enableVertexAttribArray(0),
        o.vertexAttribPointer(0, 2, o.FLOAT, !1, _t, 0),
        o.enableVertexAttribArray(1),
        o.vertexAttribPointer(1, 4, o.FLOAT, !1, _t, 8),
        o.drawArrays(o.TRIANGLES, 0, n))
    }
    drawWebGlScreenLineBatches(e, n) {
        const i = this.webGl;
        if (!(!i || !this.webGlScreenLineProgram || !this.webGlScreenLineVao || e.length === 0)) {
            i.bindVertexArray(this.webGlScreenLineVao),
            i.useProgram(this.webGlScreenLineProgram),
            i.uniformMatrix4fv(this.webGlScreenLineMatrixLocation, !1, n),
            i.uniform2f(this.webGlScreenLineViewportLocation, Math.max(1, this.cssWidth()), Math.max(1, this.cssHeight()));
            for (const r of e)
                !r.webGlBuffer || r.vertexCount <= 0 || (i.uniform1f(this.webGlScreenLineColorScaleLocation, this.geometryBatchColorScale(r)),
                i.bindBuffer(i.ARRAY_BUFFER, r.webGlBuffer),
                i.enableVertexAttribArray(0),
                i.vertexAttribPointer(0, 2, i.FLOAT, !1, st, 0),
                i.enableVertexAttribArray(1),
                i.vertexAttribPointer(1, 2, i.FLOAT, !1, st, 8),
                i.enableVertexAttribArray(2),
                i.vertexAttribPointer(2, 2, i.FLOAT, !1, st, 16),
                i.enableVertexAttribArray(3),
                i.vertexAttribPointer(3, 4, i.FLOAT, !1, st, 24),
                i.enableVertexAttribArray(4),
                i.vertexAttribPointer(4, 1, i.FLOAT, !1, st, 40),
                i.drawArrays(i.TRIANGLES, 0, r.vertexCount))
        }
    }
    getMsaaTextureView() {
        if (!this.device || !this.format)
            return null;
        const e = Math.max(1, this.canvas.width)
          , n = Math.max(1, this.canvas.height);
        return (!this.msaaTexture || this.msaaWidth !== e || this.msaaHeight !== n) && (this.msaaTexture?.destroy(),
        this.msaaTexture = this.device.createTexture({
            size: {
                width: e,
                height: n
            },
            format: this.format,
            sampleCount: 4,
            usage: GPUTextureUsage.RENDER_ATTACHMENT
        }),
        this.msaaWidth = e,
        this.msaaHeight = n),
        this.msaaTexture.createView()
    }
    takeFrameElapsedMs(e) {
        const n = this.lastFrameTimeMs > 0 ? Math.min(50, Math.max(1, e - this.lastFrameTimeMs)) : 16.67;
        return this.lastFrameTimeMs = e,
        n
    }
    stepSmoothZoom(e) {
        const n = this.targetZoom - this.zoom
          , i = Math.max(this.zoom * 5e-4, 1e-6);
        if (Math.abs(n) <= i)
            return this.zoom !== this.targetZoom && (this.zoom = this.targetZoom,
            this.applyZoomAnchor()),
            !1;
        const r = 1 - Math.exp(-(e / 1e3) * Zc);
        return this.zoom += n * r,
        this.applyZoomAnchor(),
        !0
    }
    stepSmoothCenter(e) {
        if (!this.smoothCenterActive)
            return !1;
        const n = this.targetOffsetX - this.offsetX
          , i = this.targetOffsetY - this.offsetY;
        if (Math.hypot(n, i) <= .35)
            return this.offsetX = this.targetOffsetX,
            this.offsetY = this.targetOffsetY,
            this.smoothCenterActive = !1,
            !1;
        const r = 1 - Math.exp(-(e / 1e3) * qc);
        return this.offsetX += n * r,
        this.offsetY += i * r,
        !0
    }
    applyZoomAnchor() {
        if (!this.zoomAnchorScreen || !this.zoomAnchorWorld)
            return;
        const e = this.worldToDisplay(this.zoomAnchorWorld.x, this.zoomAnchorWorld.y);
        this.offsetX = this.zoomAnchorScreen.x - e.x * this.zoom,
        this.offsetY = this.zoomAnchorScreen.y - e.y * this.zoom
    }
    updateOverlay() {
        !this.labelCanvas || !this.labelContext || this.renderOverlay()
    }
    renderOverlay() {
        const e = this.labelContext;
        if (!e)
            return;
        const n = this.cssWidth()
          , i = this.cssHeight();
        if (e.clearRect(0, 0, n, i),
        !this.board)
            return;
        e.save(),
        e.lineJoin = "miter",
        e.textAlign = "center",
        e.textBaseline = "middle";
        const r = this.selectedLayerTraceFocusActive()
          , o = this.selectedTraceFocusActive();
        this.netFocusDimActive() && !this.selectedNetUsesLayerColorFocus() && this.drawTraceFocusDimOverlay(e, n, i),
        this.drawBoardOutlineOverlay(e, n, i),
        this.drawBoardTexts(e, n, i),
        this.drawFullSignalTraceOverlay(e, n, i),
        r ? this.drawSelectedLayerTraceOverlay(e, n, i) : o && this.drawSelectedTraceOverlay(e, n, i),
        this.drawSelectedNetHighlight(e, n, i);
        const s = this.activeStandaloneBackgroundPadOverlays()
          , a = new Set(s.map(y => y.component.id));
        for (const y of s)
            this.drawActiveStandaloneBackgroundPadOverlay(e, y, n, i);
        const l = this.backgroundPadCoverageByComponent()
          , c = new Set(s.map(y => `${y.component.id}:${y.padIndex}`))
          , d = new Set;
        for (const [y,x] of l)
            for (const B of x)
                if (!c.has(B)) {
                    d.add(y);
                    break
                }
        const u = new Map
          , h = new Set
          , f = []
          , p = [];
        for (const y of this.board.components) {
            if (a.has(y.id))
                continue;
            const x = this.componentVisibleOnSide(y);
            if (!x && !this.componentHasVisiblePadsOnSide(y))
                continue;
            const B = this.componentDisplayFrame(y);
            if (!B.bounds.valid)
                continue;
            const v = this.screenFrameForComponentFrame(B);
            Os(v.boundsRect, n, i) && (u.set(y.id, v),
            this.drawCoveredComponentPads(e, y, B.bounds, s),
            x && (h.add(y.id),
            this.drawComponentDarkenOverlay(e, v, y),
            this.shouldDeferComponentBox(y) ? p.push(y) : this.drawComponentBox(e, v, y, d.has(y.id))),
            f.push(y))
        }
        for (const y of f) {
            const x = u.get(y.id);
            x && h.has(y.id) && this.drawComponentLabel(e, y, x)
        }
        this.drawHoveredPadOverlay(e);
        for (const y of f) {
            const x = u.get(y.id);
            this.drawPinLabels(e, y, x ?? null, n, i)
        }
        const m = this.selectedComponent();
        m && !a.has(m.id) && this.drawSelectionOverlay(e, m),
        this.drawSelectedNetWeb(e),
        r ? this.drawSelectedLayerTracePinsOverlay(e, n, i) : o && this.drawSelectedTracePinsOverlay(e, n, i);
        for (const y of p) {
            const x = u.get(y.id);
            x && this.drawComponentBox(e, x, y, d.has(y.id))
        }
        this.drawWatermark(e, n, i),
        e.restore()
    }
    drawWatermark(e, n, i) {
        if (this.watermarkText.length === 0)
            return;
        const r = 11
          , o = 6
          , s = 3
          , a = 2;
        e.save(),
        e.font = xt(r),
        e.textAlign = "left",
        e.textBaseline = "middle";
        const c = Math.ceil(e.measureText(this.watermarkText).width) + o * 2
          , d = r + s * 2
          , u = Math.max(0, Math.floor(n - a - c))
          , h = Math.max(0, Math.floor(i - a - d));
        e.fillStyle = "rgba(0 0 0 / 0.1)",
        e.fillRect(u, h, c, d),
        e.fillStyle = "rgba(227 227 227 / 0.1)",
        e.fillText(this.watermarkText, u + o, h + d * .5),
        e.restore()
    }
    drawBoardOutlineOverlay(e, n, i) {
        if (this.board) {
            e.save(),
            e.lineCap = "round",
            e.lineJoin = "round";
            for (const r of this.visibleGraphicsForCurrentView().outlines) {
                const o = this.boardOutlineStrokeWidthPx(r);
                switch (e.strokeStyle = F(this.colorForBoardOutlineStroke(r)),
                r.type) {
                case "line":
                    this.drawWorldLine(e, r.x1, r.y1, r.x2, r.y2, o);
                    break;
                case "arc":
                    this.drawWorldPolyline(e, dt(r), o, !1, n, i);
                    break;
                case "circle":
                    {
                        const s = this.worldToScreen(r.cx, r.cy)
                          , a = Math.abs(r.radius * this.zoom);
                        if (a <= 0 || !Rn(s, a + o, n, i))
                            break;
                        e.beginPath(),
                        e.lineWidth = o,
                        e.arc(s.x, s.y, a, 0, Math.PI * 2),
                        e.stroke();
                        break
                    }
                case "polygon":
                    this.drawWorldPolyline(e, r.points, o, !0, n, i);
                    for (const s of r.holes)
                        this.drawWorldPolyline(e, s, o, !0, n, i);
                    break
                }
            }
            e.restore()
        }
    }
    shouldDrawBoardOutlineStroke(e) {
        return e.layer !== "edge-cuts" || this.hasLayerData() && !this.layerVisible(e.layerId) || !this.graphicBelongsToSideForOutline(e, this.options.activeSide) ? !1 : e.type === "line" || e.type === "arc" ? !0 : !e.filled || e.lineWidth > 0
    }
    boardOutlineStrokeWidthPx(e) {
        if (e.lineWidth > 0)
            return Math.max(1, e.lineWidth * this.zoom);
        switch (this.board?.metadata.sourceFormat) {
        case "GENCAD":
            return Math.max(1, ws * this.zoom);
        case "FABMASTER":
            return Math.max(1, vs * this.zoom);
        default:
            return Qc
        }
    }
    colorForBoardOutlineStroke(e) {
        const n = this.layerById(e.layerId);
        if (n?.hasExplicitColors) {
            const i = n.lineColor !== 0 || n.padColor === 0 ? n.lineColor : n.padColor;
            if (i !== 0) {
                const r = this.applyManualTopLayerDim(on(gt(i, 1), e.layer, !1), e.layerId, e.layer);
                return this.dimOverlayColorForNetFocus(r)
            }
        }
        return this.dimOverlayColorForNetFocus(w.boardOutline)
    }
    drawComponentBox(e, n, i, r=!1) {
        if (this.shouldSuppressComponentBBox(i))
            return;
        const o = this.options.selectedComponentId === i.id
          , s = !o && this.componentMatchesSelectedNet(i)
          , a = !o && this.options.highlightedPartNetNames.size > 0 && i.pads.some(m => this.options.highlightedPartNetNames.has(m.net.trim()))
          , l = this.options.highlightedPartIds.has(i.id)
          , c = this.hoveredComponentId === i.id
          , d = c && this.hoveredBackgroundPad !== null
          , u = this.layerStylingActive() ? zn(fe(w.componentBox, 1.34)) : w.componentBox
          , h = r ? zn(fe(u, 1.22)) : u;
        let f = c || o ? d ? se(fe(w.selectedPart, .85), 1) : w.selectedPart : s || a ? w.selectedNet : l ? w.highlightedPart : h;
        if (this.componentFocusVisible(i) || (f = se(lt(f, w.background, .17), f[3] * .9)),
        e.strokeStyle = F(this.darkenComponentColor(i, f)),
        e.lineWidth = c || o || s || a ? 1.5 : l ? 2 : 1,
        n.obb) {
            Vs(e, n.obb);
            return
        }
        const p = n.boundsRect;
        e.strokeRect(p.left, p.top, p.width, p.height)
    }
    drawComponentLabel(e, n, i) {
        if (!n.name)
            return;
        if (i.obb) {
            const d = i.obb.width - mt * 2
              , u = i.obb.height - mt * 2
              , h = Math.min(Li, Math.min(i.obb.width, i.obb.height) * .3)
              , f = Vt(e, n.name, h, d, u);
            if (f < 2)
                return;
            e.save(),
            e.translate(i.obb.center.x, i.obb.center.y);
            const p = i.obb.width / Math.max(i.obb.height, .001);
            e.rotate(p <= 1.1 ? 0 : Rd(i.obb.angle)),
            e.fillStyle = F(this.darkenComponentColor(n, this.componentTextColor(n))),
            e.font = xt(f),
            e.fillText(n.name, 0, 0, d),
            e.restore();
            return
        }
        const r = i.boundsRect;
        let o = r.width - mt * 2
          , s = r.height - mt * 2;
        if (o <= 0 || s <= 0)
            return;
        const a = r.height > r.width * 1.15;
        a && ([o,s] = [s, o]);
        const l = Math.min(Li, Math.min(r.width, r.height) * .3)
          , c = Vt(e, n.name, l, o, s);
        c < 2 || (e.save(),
        e.translate(r.left + r.width * .5, r.top + r.height * .5),
        a && e.rotate(-Math.PI * .5),
        e.fillStyle = F(this.darkenComponentColor(n, this.componentTextColor(n))),
        e.font = xt(c),
        e.fillText(n.name, 0, 0, o),
        e.restore())
    }
    componentLabelFontSize(e, n, i) {
        if (!n.name || !i)
            return 0;
        if (i.obb) {
            const l = i.obb.width - mt * 2
              , c = i.obb.height - mt * 2
              , d = Math.min(Li, Math.min(i.obb.width, i.obb.height) * .3);
            return Vt(e, n.name, d, l, c)
        }
        const r = i.boundsRect;
        let o = r.width - mt * 2
          , s = r.height - mt * 2;
        if (o <= 0 || s <= 0)
            return 0;
        r.height > r.width * 1.15 && ([o,s] = [s, o]);
        const a = Math.min(Li, Math.min(r.width, r.height) * .3);
        return Vt(e, n.name, a, o, s)
    }
    drawComponentDarkenOverlay(e, n, i) {
        if (this.componentIsDarkened(i)) {
            if (e.save(),
            e.fillStyle = F([0, 0, 0, ld]),
            n.obb)
                Gd(e, n.obb);
            else {
                const r = n.boundsRect;
                e.fillRect(r.left, r.top, r.width, r.height)
            }
            e.restore()
        }
    }
    drawBoardTexts(e, n, i) {
        if (!(!this.board || this.board.texts.length === 0)) {
            e.save(),
            e.textAlign = "center",
            e.textBaseline = "middle";
            for (const r of this.board.texts) {
                if (!this.textVisible(r))
                    continue;
                const o = r.size * this.zoom;
                if (o < 2)
                    continue;
                const s = this.worldToScreen(r.x, r.y)
                  , a = Math.max(1, Math.abs(o * r.text.length * .72));
                s.x + a < 0 || s.y + o < 0 || s.x - a > n || s.y - o > i || (e.save(),
                e.translate(s.x, s.y),
                e.rotate(this.displayTextAngle(r) * Math.PI / 180),
                e.fillStyle = F(this.colorForText(r)),
                e.font = xt(Math.min(96, Math.max(2, o))),
                e.fillText(r.text, 0, 0),
                e.restore())
            }
            e.restore()
        }
    }
    drawPinLabels(e, n, i, r, o) {
        const s = n.pads.some(a => a?.type === "through-hole") ? this.componentLabelFontSize(e, n, i) : 0;
        for (let a = 0; a < n.pads.length; ++a) {
            const l = n.pads[a];
            if (!l || !l.name || l.suppressVisual || !this.padVisible(l))
                continue;
            const c = this.padVisualScreenRect(n, l);
            if (!c || !Os(c, r, o))
                continue;
            const d = Math.min(c.width, c.height);
            if (d < 12)
                continue;
            const u = this.pinLabelStartFont(e, n, l, d, s)
              , h = this.options.showPinNetLabels ? Fi(c, u) : c
              , f = Vt(e, l.name, u, h.width, h.height);
            if (f < 2)
                continue;
            const p = this.darkenComponentColor(n, this.pinLabelColor(n, l, a));
            this.drawPinTextBlock(e, l, c, f, p, this.options.showPinNetLabels, !0)
        }
    }
    pinLabelStartFont(e, n, i, r, o=0) {
        let s = Math.min(jc, r * (this.shouldDisplayPadOutline(i) && i.outline.length >= 3 ? .4 : .6));
        if (i.type !== "through-hole")
            return s;
        let a = o;
        if (a < 2) {
            const l = this.componentDisplayFrame(n);
            a = l.bounds.valid ? this.componentLabelFontSize(e, n, this.screenFrameForComponentFrame(l)) : 0
        }
        return a >= 2 ? Math.min(s, a) : s
    }
    drawPinTextBlock(e, n, i, r, o, s, a, l=!1) {
        if (!n.name)
            return;
        const c = s && a ? Fi(i, r) : i
          , d = l ? o : fe(o, .86)
          , u = s && c.height >= 26 && c.width >= 20 && r >= 8;
        if (e.textAlign = "center",
        e.textBaseline = "alphabetic",
        !u) {
            e.fillStyle = F(o),
            e.font = xt(r),
            Xr(e, n.name, i.left + i.width * .5, i.top + i.height * .5, i.width);
            return
        }
        const h = Math.max(6, r * .8)
          , f = Math.max(5, Math.min(h * .62, c.height * .22))
          , p = h + f
          , m = c.top + Math.max(0, (c.height - p) * .5)
          , y = c.left + c.width * .5
          , x = m + h * .5
          , B = m + h + f * .5
          , v = Math.max(4, Math.floor(c.width / Math.max(f * .58, 1)))
          , C = Ud(Ws(n.net), v);
        e.fillStyle = F(o),
        e.font = xt(h),
        Xr(e, n.name, y, x, c.width),
        e.fillStyle = F(d),
        e.font = xt(f),
        Xr(e, C, y, B, c.width)
    }
    drawSelectedNetHighlight(e, n, i) {
        if (!this.board || this.options.selectedNet === "" || this.selectedNetUsesGpuHighlight() && !this.shouldDrawDeferredSimpleGroundNetHighlight() || this.options.selectedTraceIndex !== null)
            return;
        const r = this.netHighlightCache.get(this.options.selectedNet);
        if (r) {
            e.save(),
            e.fillStyle = F(w.selectedNet),
            e.strokeStyle = F(w.selectedNet),
            e.lineCap = "round",
            e.lineJoin = "round";
            for (const o of r.zones)
                this.layerNameVisible(o.layer) && this.drawWorldPolygon(e, o.outline, !0, n, i);
            for (const o of r.graphics)
                this.graphicVisible(o) && this.drawHighlightedGraphic(e, o, n, i);
            for (const o of r.tracks)
                this.layerNameVisible(o.layer) && this.drawWorldLine(e, o.x1, o.y1, o.x2, o.y2, Math.max(o.width, this.defaultStroke()) * this.zoom);
            if (this.shouldDrawStandaloneViaHighlights())
                for (const o of r.vias)
                    this.drawHighlightedVia(e, o);
            for (const o of r.pads)
                !this.padVisible(o.pad) || o.pad.suppressVisual || this.drawHighlightedPad(e, o.component, o.pad, n, i);
            e.restore()
        }
    }
    drawSelectedTraceOverlay(e, n, i) {
        const r = this.selectedTraceGraphic();
        if (!r || !this.graphicVisible(r))
            return;
        const o = this.selectedTraceGraphics(r);
        if (o.length === 0)
            return;
        const s = this.selectedTraceOutlineGraphics(r);
        e.save(),
        e.lineCap = "round",
        e.lineJoin = "round",
        this.selectedNetUsesGpuHighlight() || this.drawTraceGraphicsOverlayByTraceColor(e, o, n, i, !0);
        const a = this.isFabmasterBoard() ? 2 : 1;
        this.drawTraceGraphicsOverlay(e, s, [1, 1, 1, 1], a, n, i, !1),
        this.drawTraceGraphicsOverlayByTraceColor(e, s, n, i, !1, !0),
        e.restore()
    }
    drawSelectedLayerTraceOverlay(e, n, i) {
        const r = this.selectedLayerTraceGraphics();
        if (r.length === 0)
            return;
        const o = this.selectedLayerTraceOutlineGraphics();
        e.save(),
        e.lineCap = "round",
        e.lineJoin = "round",
        this.drawTraceGraphicsOverlayByTraceColor(e, r, n, i, !0);
        const s = this.isFabmasterBoard() ? 2 : 1;
        this.drawTraceGraphicsOverlay(e, o, [1, 1, 1, 1], s, n, i, !1),
        this.drawTraceGraphicsOverlayByTraceColor(e, o, n, i, !1, !0),
        e.restore()
    }
    drawFullSignalTraceOverlay(e, n, i) {
        if (!this.options.highlightFullSignalTrace || !this.layerStylingActive())
            return;
        const r = new Set(this.options.highlightedPartNetNames);
        if (this.options.selectedNet.trim() !== "" && r.add(this.options.selectedNet),
        r.size === 0)
            return;
        const o = 8
          , s = pe();
        for (const [d,u] of [[-o, -o], [n + o, -o], [n + o, i + o], [-o, i + o]]) {
            const h = this.screenToWorld(d, u);
            Ce(s, h.x, h.y, h.x, h.y)
        }
        const a = new Set
          , l = [];
        for (const d of r) {
            const u = this.netHighlightCache.get(d);
            if (u)
                for (const h of u.graphics)
                    a.has(h) || !this.isTraceFocusGraphic(h) || !On(s, rn(h)) || (a.add(h),
                    l.push(h))
        }
        if (l.length === 0)
            return;
        l.sort( (d, u) => _(d) - _(u)),
        e.save(),
        e.lineCap = "round",
        e.lineJoin = "round";
        const c = this.isFabmasterBoard() ? 2 : 1;
        for (const d of l)
            this.drawTraceGraphicOverlay(e, d, [1, 1, 1, 1], c, n, i, !1, !1);
        for (const d of l)
            this.drawTraceGraphicOverlay(e, d, this.selectedTraceBodyColor(d), 0, n, i, !0, !1);
        e.restore()
    }
    selectedLayerTraceGraphics() {
        if (!this.board || this.options.selectedLayerTraceId === null || this.options.selectedNet.trim() === "")
            return [];
        const e = `${this.geometryCacheKeyForSide(this.options.activeSide)}|layer-trace:${this.options.selectedLayerTraceId}|net:${this.options.selectedNet}`;
        if (this.selectedLayerTraceGraphicsCache?.key === e)
            return this.selectedLayerTraceGraphicsCache.graphics;
        const i = this.netHighlightCache.get(this.options.selectedNet)?.graphics ?? this.board.graphics
          , r = i.filter(s => s.layerId === this.options.selectedLayerTraceId && s.net === this.options.selectedNet && this.isTraceFocusGraphic(s))
          , o = this.selectedNetUsesGpuHighlight() ? [...r] : i.filter(s => s.net === this.options.selectedNet && this.isTraceFocusGraphic(s));
        return o.sort( (s, a) => _(s) - _(a)),
        r.sort( (s, a) => _(s) - _(a)),
        this.selectedLayerTraceGraphicsCache = {
            key: e,
            graphics: o,
            outlineGraphics: r
        },
        o
    }
    selectedLayerTraceOutlineGraphics() {
        return this.selectedLayerTraceGraphics(),
        this.selectedLayerTraceGraphicsCache?.outlineGraphics ?? []
    }
    selectedTraceGraphics(e) {
        if (!this.board)
            return [];
        const n = this.selectedTraceCacheKey();
        if (this.selectedTraceGraphicsCache?.key === n)
            return this.selectedTraceGraphicsCache.graphics;
        const i = this.selectedTraceExactGraphics(e);
        if (he(e.net))
            return i.sort( (l, c) => _(l) - _(c)),
            this.selectedTraceGraphicsCache = {
                key: n,
                graphics: i,
                exactGraphics: i
            },
            i;
        const o = this.netHighlightCache.get(e.net)?.graphics ?? this.board.graphics
          , s = this.layerStylingActive()
          , a = o.filter(l => (s || l.layerId === e.layerId) && l.net === e.net && this.isTraceFocusGraphic(l));
        return a.length === 0 && a.push(...i),
        a.sort( (l, c) => _(l) - _(c)),
        i.sort( (l, c) => _(l) - _(c)),
        this.selectedTraceGraphicsCache = {
            key: n,
            graphics: a,
            exactGraphics: i
        },
        a
    }
    selectedTraceCacheKey() {
        return `${this.geometryCacheKeyForSide(this.options.activeSide)}|trace:${this.options.selectedTraceIndex ?? -1}`
    }
    selectedTraceExactGraphics(e) {
        if (!this.board)
            return [];
        if (he(e.net))
            return this.selectedTraceBranchGraphics(e);
        if (this.isFabmasterPathSegmentGraphic(e)) {
            const n = this.selectedSourceGroupTraceGraphics(e);
            if (n.length > 0)
                return n
        }
        return this.selectedTraceBranchGraphics(e)
    }
    selectedTraceOutlineGraphics(e) {
        if (!this.board)
            return [e];
        const n = this.selectedTraceCacheKey();
        if (this.selectedTraceGraphicsCache?.key === n) {
            const r = this.selectedTraceGraphicsCache.exactGraphics;
            return r.length > 0 ? r : [e]
        }
        const i = this.selectedTraceExactGraphics(e);
        return i.sort( (r, o) => _(r) - _(o)),
        i.length > 0 ? i : [e]
    }
    selectedSourceGroupTraceGraphics(e) {
        if (!this.board)
            return [];
        const i = (this.netHighlightCache.get(e.net)?.graphics ?? this.board.graphics).filter(r => r.sourceGroupId === e.sourceGroupId && r.sourceGroupSubseq === e.sourceGroupSubseq && r.layerId === e.layerId && r.layer === e.layer && r.side === e.side && r.net === e.net && r.sourceNegative === e.sourceNegative && Math.abs(r.lineWidth - e.lineWidth) <= 1e-4 && this.isFabmasterPathSegmentGraphic(r) && this.isTraceFocusGraphic(r));
        return i.sort( (r, o) => r.sourceGroupSeq - o.sourceGroupSeq || _(r) - _(o)),
        i
    }
    isFabmasterPathSegmentGraphic(e) {
        return this.isFabmasterBoard() && e.sourceGroupId >= 0 && !e.filled && (e.type === "line" || e.type === "arc")
    }
    isTraceFocusGraphic(e) {
        if (e.sourceNegative || e.net.trim() === "" || e.layer === "edge-cuts" || !this.graphicVisible(e))
            return !1;
        const n = this.layerById(e.layerId);
        return n ? n.class === "logic" || n.class === "through" : e.layer === "front-copper" || e.layer === "back-copper"
    }
    selectedTraceBranchGraphics(e) {
        const n = this.options.selectedTraceIndex;
        if (!this.board || n === null)
            return [];
        if (!ve(e))
            return [e];
        const r = ee(e.lineWidth * .25, .05, .5)
          , o = [];
        let s = -1;
        const a = this.netHighlightCache.get(e.net)
          , l = a?.graphics ?? this.board.graphics
          , c = a?.graphicIndices;
        for (let y = 0; y < l.length; y += 1) {
            const x = l[y]
              , B = c?.[y] ?? y;
            if (!x || x.layerId !== e.layerId || x.net !== e.net || !this.isTraceFocusGraphic(x))
                continue;
            const v = ve(x);
            v && (B === n && (s = o.length),
            o.push({
                graphic: x,
                index: B,
                start: v.start,
                end: v.end
            }))
        }
        if (s < 0)
            return [e];
        const d = new Map;
        for (let y = 0; y < o.length; y += 1) {
            const x = o[y];
            Us(d, Kr(x.start, r), y),
            Us(d, Kr(x.end, r), y)
        }
        const u = new Uint8Array(o.length)
          , h = []
          , f = []
          , p = y => {
            y < 0 || y >= o.length || u[y] || (u[y] = 1,
            h.push(y),
            f.push(o[y].graphic))
        }
          , m = y => {
            for (let x = -1; x <= 1; x += 1)
                for (let B = -1; B <= 1; B += 1) {
                    const v = d.get(Kr(y, r, B, x));
                    if (v)
                        for (const C of v) {
                            const T = o[C];
                            (Ct(y, T.start, r) || Ct(y, T.end, r)) && p(C)
                        }
                }
        }
        ;
        p(s);
        for (let y = 0; y < h.length; y += 1) {
            const x = o[h[y]];
            m(x.start),
            m(x.end)
        }
        return f.length > 0 ? f : [e]
    }
    drawTraceGraphicOverlay(e, n, i, r, o, s, a, l) {
        e.fillStyle = F(i),
        e.strokeStyle = F(i);
        const d = !a && !l && n.filled && n.lineWidth <= 0 ? 0 : Math.max(xs, this.graphicStrokeWorld(n) * this.zoom)
          , u = Math.max(1, d + r * 2);
        switch (e.lineWidth = u,
        n.type) {
        case "line":
            this.drawWorldLine(e, n.x1, n.y1, n.x2, n.y2, u);
            break;
        case "arc":
            this.drawWorldPolyline(e, dt(n), u, !1, o, s);
            break;
        case "circle":
            {
                const h = this.worldToScreen(n.cx, n.cy)
                  , f = Math.max(1, Math.abs(n.radius * this.zoom));
                if (!Rn(h, f + u, o, s))
                    return;
                e.beginPath(),
                e.arc(h.x, h.y, f, 0, Math.PI * 2),
                a && n.filled && !l ? e.fill() : e.stroke();
                break
            }
        case "polygon":
            if (a && n.filled && !l)
                this.drawWorldCompoundPolygon(e, n.points, n.holes, o, s);
            else {
                this.drawWorldPolyline(e, n.points, u, !0, o, s);
                for (const h of n.holes)
                    this.drawWorldPolyline(e, h, u, !0, o, s)
            }
            break
        }
    }
    drawTraceGraphicsOverlay(e, n, i, r, o, s, a, l=!1) {
        const c = []
          , d = [];
        for (const u of n)
            (u.type === "line" || u.type === "arc") && ve(u) ? c.push(u) : d.push(u);
        e.fillStyle = F(i),
        e.strokeStyle = F(i);
        for (const u of this.traceStrokeChains(c))
            this.drawTraceStrokeChainOverlay(e, u, r, o, s);
        for (const u of d)
            this.drawTraceGraphicOverlay(e, u, i, r, o, s, a, l)
    }
    drawTraceGraphicsOverlayByTraceColor(e, n, i, r, o=!1, s=!1) {
        const a = new Map;
        for (const l of n) {
            const c = s ? this.selectedTraceExactBodyColor(l) : o ? this.selectedTraceBumpColor(l) : this.selectedTraceBodyColor(l)
              , d = Zd(c);
            let u = a.get(d);
            u || (u = {
                color: c,
                graphics: []
            },
            a.set(d, u)),
            u.graphics.push(l)
        }
        for (const l of a.values())
            this.drawTraceGraphicsOverlay(e, l.graphics, l.color, 0, i, r, !0, o && this.isFabmasterBoard())
    }
    traceStrokeChains(e) {
        const n = []
          , i = new Set
          , r = ee(Math.max(this.defaultStroke(), ...e.map(s => s.lineWidth)) * .25, .05, .5)
          , o = Math.max(.001, this.defaultStroke() * .02);
        for (let s = 0; s < e.length; s += 1) {
            if (i.has(s))
                continue;
            const a = e[s]
              , l = a ? ve(a) : null;
            if (!a || !l)
                continue;
            i.add(s);
            const c = [{
                graphic: a,
                reverse: !1
            }]
              , d = this.graphicStrokeWorld(a);
            let u = l.start
              , h = l.end
              , f = !0;
            for (; f; ) {
                f = !1;
                const p = this.findTraceChainNeighbor(e, i, h, r, d, o);
                p && (i.add(p.index),
                c.push({
                    graphic: p.graphic,
                    reverse: p.reverseForAppend
                }),
                h = p.nextEndForAppend,
                f = !0);
                const m = this.findTraceChainNeighbor(e, i, u, r, d, o);
                m && (i.add(m.index),
                c.unshift({
                    graphic: m.graphic,
                    reverse: m.reverseForPrepend
                }),
                u = m.nextEndForPrepend,
                f = !0)
            }
            n.push(c)
        }
        return n
    }
    findTraceChainNeighbor(e, n, i, r, o, s) {
        let a = null;
        const l = r * r;
        for (let d = 0; d < e.length; d += 1) {
            if (n.has(d))
                continue;
            const u = e[d]
              , h = u ? ve(u) : null;
            if (!u || !h || Math.abs(this.graphicStrokeWorld(u) - o) > s)
                continue;
            const f = Ge(i, h.start)
              , p = Ge(i, h.end);
            if (f > l && p > l)
                continue;
            const m = Math.min(f, p)
              , y = a ? Math.min(a.startDistSq, a.endDistSq) : Number.POSITIVE_INFINITY;
            (!a || m < y) && (a = {
                index: d,
                graphic: u,
                endpoints: h,
                startDistSq: f,
                endDistSq: p
            })
        }
        if (!a)
            return null;
        const c = a.startDistSq <= a.endDistSq;
        return {
            index: a.index,
            graphic: a.graphic,
            reverseForAppend: !c,
            reverseForPrepend: c,
            nextEndForAppend: c ? a.endpoints.end : a.endpoints.start,
            nextEndForPrepend: c ? a.endpoints.end : a.endpoints.start
        }
    }
    drawTraceStrokeChainOverlay(e, n, i, r, o) {
        if (n.length === 0)
            return;
        const s = wd(n);
        if (s.length < 2 || !this.worldPointsMayIntersectViewport(s, r, o))
            return;
        const a = this.graphicStrokeWorld(n[0].graphic)
          , l = Math.max(xs, a * this.zoom);
        e.lineWidth = Math.max(1, l + i * 2),
        e.beginPath();
        for (let c = 0; c < s.length; c += 1) {
            const d = s[c];
            if (!d)
                continue;
            const u = this.worldToScreen(d[0], d[1]);
            c === 0 ? e.moveTo(u.x, u.y) : e.lineTo(u.x, u.y)
        }
        e.stroke()
    }
    selectedTraceBodyColor(e) {
        const n = this.layerById(e.layerId)
          , i = this.colorForGraphic(e, n, !1);
        return this.layerStylingActive() ? Wn(i, e.filled) : w.selectedNet
    }
    selectedTraceBumpColor(e) {
        return this.useDistinctSelectedNetColor() && e.net === this.options.selectedNet ? w.highlightedPart : se(lt(this.selectedTraceBodyColor(e), [1, 1, 1, 1], .1), 1)
    }
    selectedTraceExactBodyColor(e) {
        return this.useDistinctSelectedNetColor() && e.net === this.options.selectedNet ? w.highlightedPart : this.isFabmasterBoard() ? this.colorForGraphic(e, this.layerById(e.layerId)) : this.selectedTraceBodyColor(e)
    }
    selectedTraceFocusActive() {
        const e = this.selectedTraceGraphic();
        return !!(e && this.graphicVisible(e))
    }
    selectedLayerTraceFocusActive() {
        return this.selectedLayerTraceOutlineGraphics().length > 0
    }
    selectedNetUsesGpuHighlight() {
        return !!(this.board && this.options.selectedNet !== "" && (this.options.selectedTraceIndex === null || he(this.options.selectedNet)))
    }
    shouldDrawDeferredSimpleGroundNetHighlight() {
        return this.layerStylingActive() || !he(this.options.selectedNet) || !this.selectedNetUsesGpuHighlight() ? !1 : this.selectedNetGeometry?.key !== this.selectedNetGeometryKey()
    }
    useDistinctSelectedNetColor() {
        return this.options.selectedNet !== "" && this.options.highlightedPartNetNames.has(this.options.selectedNet)
    }
    selectedNetUsesLayerColorFocus() {
        return this.selectedNetUsesGpuHighlight() && this.layerStylingActive()
    }
    shouldDrawStandaloneViaHighlights() {
        return !this.layerStylingActive()
    }
    drawTraceFocusDimOverlay(e, n, i) {
        e.save(),
        e.fillStyle = F(se(w.background, .16)),
        e.fillRect(0, 0, n, i),
        e.restore()
    }
    drawSelectedTracePinsOverlay(e, n, i) {
        const r = this.selectedTraceGraphic();
        if (!r || r.net.trim() === "")
            return;
        const o = this.selectedTraceGraphics(r)
          , s = `${this.geometryCacheKeyForSide(this.options.activeSide)}|trace-pins:${this.options.selectedTraceIndex ?? -1}`;
        this.drawTracePinsOverlay(e, r.net, o, n, i, s, !he(r.net))
    }
    drawSelectedLayerTracePinsOverlay(e, n, i) {
        const r = this.selectedLayerTraceGraphics()
          , o = `${this.geometryCacheKeyForSide(this.options.activeSide)}|layer-trace-pins:${this.options.selectedLayerTraceId ?? ""}|net:${this.options.selectedNet}`;
        this.drawTracePinsOverlay(e, this.options.selectedNet, r, n, i, o)
    }
    drawTracePinsOverlay(e, n, i, r, o, s, a=!1) {
        if (n.trim() === "" || i.length === 0)
            return;
        const l = this.tracePinsOverlayRefs(n, i, s, a);
        if (l) {
            e.save();
            for (const c of l.vias)
                this.drawHighlightedViaWithColor(e, c, w.selectedNet);
            for (const c of l.pads)
                this.drawTraceHighlightedPadWithColor(e, c.component, c.pad, w.selectedNet, r, o),
                this.drawTracePinLabel(e, c.component, c.pad);
            e.restore()
        }
    }
    tracePinsOverlayRefs(e, n, i, r) {
        if (this.tracePinsOverlayCache?.key === i)
            return this.tracePinsOverlayCache;
        const o = this.netHighlightCache.get(e);
        if (!o)
            return this.tracePinsOverlayCache = null,
            null;
        const s = r ? o.pads.filter(l => this.padVisible(l.pad) && !l.pad.suppressVisual) : this.connectedTracePadRefs(o, n)
          , a = this.shouldDrawStandaloneViaHighlights() ? this.connectedTraceVias(o, n) : [];
        return this.tracePinsOverlayCache = {
            key: i,
            pads: s,
            vias: a
        },
        this.tracePinsOverlayCache
    }
    connectedTracePadRefs(e, n) {
        if (n.length === 0)
            return [];
        const i = n.map(r => ({
            graphic: r,
            bounds: rn(r)
        }));
        return e.pads.filter(r => {
            if (!this.padVisible(r.pad) || r.pad.suppressVisual)
                return !1;
            const o = Ld(r.pad);
            if (!o.valid)
                return !1;
            const s = this.tracePadConnectionTolerance(r.pad);
            return i.some( ({graphic: a, bounds: l}) => On(o, l, s) && this.traceGraphicTouchesPad(r.component, r.pad, a, s))
        }
        )
    }
    connectedTraceVias(e, n) {
        return n.length === 0 ? [] : e.vias.filter(i => {
            const r = Math.max(i.outerDiameter * .5, this.defaultStroke() * 2)
              , o = Pd(i.x, i.y, r)
              , s = Math.max(r * .25, .5);
            return n.some(a => On(o, rn(a), s) && Ks(a, [i.x, i.y], r + s, this.defaultStroke()))
        }
        )
    }
    tracePadConnectionTolerance(e) {
        const n = ft(e);
        return ee(Math.max(this.defaultStroke() * .35, n * .08, .35), .35, 2.5)
    }
    traceGraphicTouchesPad(e, n, i, r) {
        const o = Math.max(Ga(i, this.defaultStroke()) * .5, r)
          , s = this.padConnectionPolygon(e, n);
        if (s)
            return ou(i, s, o);
        const a = this.padConnectionCircleRadius(n);
        return a > 0 ? su(i, [n.x, n.y], a + o) : Ks(i, [n.x, n.y], o, this.defaultStroke())
    }
    padConnectionPolygon(e, n) {
        const i = this.displayedFallbackPadPoints(e, n);
        if (i)
            return i;
        if (this.shouldDisplayPadOutline(n))
            return n.outline;
        const r = this.displayedRectanglePadPoints(n);
        return r || null
    }
    padConnectionCircleRadius(e) {
        const n = this.displayedPadOverlayCircleRadius(e);
        return n > 0 ? n : e.width > 0 || e.height > 0 ? Math.max(e.width, e.height) * .5 : 0
    }
    drawTracePinLabel(e, n, i) {
        if (!i.name)
            return;
        const r = this.padVisualScreenRect(n, i);
        if (!r)
            return;
        const o = Math.min(r.width, r.height);
        if (o < 8)
            return;
        const s = this.pinLabelStartFont(e, n, i, o)
          , a = this.options.showPinNetLabels
          , l = a ? Fi(r, s) : r
          , c = Vt(e, i.name, s, l.width, l.height);
        c < 2 || (e.save(),
        this.drawPinTextBlock(e, i, r, c, [1, 1, 1, 1], a, !0, !0),
        e.restore())
    }
    drawHighlightedViaWithColor(e, n, i) {
        if (!this.layerVisible(-1))
            return;
        const r = this.worldToScreen(n.x, n.y)
          , o = Math.max(1, Math.max(n.outerDiameter * .5, this.defaultStroke() * 2) * this.zoom);
        e.fillStyle = F(i),
        e.beginPath(),
        e.arc(r.x, r.y, o, 0, Math.PI * 2),
        e.fill()
    }
    drawTraceHighlightedPadWithColor(e, n, i, r, o, s) {
        e.fillStyle = F(r);
        const a = this.displayedFallbackPadPoints(n, i);
        if (a) {
            this.drawWorldPolygon(e, a, !0, o, s);
            return
        }
        if (this.shouldDisplayPadOutline(i)) {
            this.drawWorldPolygon(e, i.outline, !i.outlineOnly, o, s),
            i.outlineOnly && (e.strokeStyle = F(r),
            this.drawWorldPolyline(e, i.outline, Math.max(1, this.defaultStroke() * this.zoom), !0, o, s));
            return
        }
        const l = this.displayedRectanglePadPoints(i);
        if (l) {
            this.drawWorldPolygon(e, l, !0, o, s);
            return
        }
        const c = this.worldToScreen(i.x, i.y)
          , u = this.displayedPadOverlayCircleRadius(i) * this.zoom;
        u <= 0 || Rn(c, u, o, s) && (e.beginPath(),
        e.arc(c.x, c.y, u, 0, Math.PI * 2),
        e.fill())
    }
    destroySelectedNetGeometry() {
        this.selectedNetGeometry && !this.selectedNetGeometryIsCached && (L(this.selectedNetGeometry.batches, this.webGl),
        L(this.selectedNetGeometry.screenLineBatches, this.webGl)),
        this.selectedNetGeometryBuild && (L(this.selectedNetGeometryBuild.batches, this.webGl),
        L(this.selectedNetGeometryBuild.screenLineBatches, this.webGl)),
        this.selectedNetGeometry = null,
        this.selectedNetGeometryBuild = null,
        this.selectedNetGeometryIsCached = !1,
        this.selectedNetVertexBatches = [],
        this.selectedNetVertexCount = 0,
        this.selectedNetScreenLineVertexBatches = [],
        this.selectedNetScreenLineVertexCount = 0
    }
    selectedNetGeometryBytes(e) {
        return e.vertexCount * _t + e.screenLineVertexCount * st
    }
    cacheSelectedNetGeometry(e, n=this.options.selectedNet) {
        if (!this.board || !he(n))
            return !1;
        const i = this.selectedNetGeometryBytes(e);
        if (i <= 0 || i > Rr)
            return !1;
        const r = this.selectedNetGeometryCache.get(e.key);
        r && r.entry !== e && (L(r.entry.batches, this.webGl),
        L(r.entry.screenLineBatches, this.webGl),
        this.selectedNetGeometryCache.delete(e.key));
        let o = 0;
        for (const s of this.selectedNetGeometryCache.values())
            o += s.bytes;
        for (; this.selectedNetGeometryCache.size >= od || o + i > Rr; ) {
            const s = this.selectedNetGeometryCache.entries().next().value;
            if (!s)
                break;
            const [a,l] = s;
            this.selectedNetGeometryCache.delete(a),
            o -= l.bytes,
            L(l.entry.batches, this.webGl),
            L(l.entry.screenLineBatches, this.webGl)
        }
        return this.selectedNetGeometryCache.set(e.key, {
            board: this.board,
            entry: e,
            bytes: i
        }),
        !0
    }
    destroySelectedNetGeometryCacheForBoard(e) {
        for (const [n,i] of this.selectedNetGeometryCache)
            i.board === e && (this.selectedNetGeometryCache.delete(n),
            L(i.entry.batches, this.webGl),
            L(i.entry.screenLineBatches, this.webGl))
    }
    cancelGroundNetGeometryPrewarm(e=!0) {
        const n = this.groundNetGeometryPrewarm;
        return n ? (n.timeoutId !== null && window.clearTimeout(n.timeoutId),
        this.groundNetGeometryPrewarm = null,
        e && (L(n.build.batches, this.webGl),
        L(n.build.screenLineBatches, this.webGl)),
        n.build) : null
    }
    takeGroundNetGeometryPrewarm(e) {
        const n = this.groundNetGeometryPrewarm;
        return n ? n.build.key !== e || n.board !== this.board ? (this.cancelGroundNetGeometryPrewarm(),
        null) : this.cancelGroundNetGeometryPrewarm(!1) : null
    }
    scheduleGroundNetGeometryPrewarm() {
        if (!this.board || !this.hasRenderBackend() || !this.layerStylingActive() || this.options.selectedNet !== "") {
            this.cancelGroundNetGeometryPrewarm();
            return
        }
        const e = this.preferredGroundNetForPrewarm();
        if (!e) {
            this.cancelGroundNetGeometryPrewarm();
            return
        }
        const n = this.options.highlightedPartNetNames.has(e)
          , i = this.selectedNetGeometryKeyFor(e, n);
        if (this.selectedNetGeometryCache.has(i) || this.skippedSelectedNetGeometryKeys.has(i) || this.skippedGroundNetGeometryPrewarmKeys.has(i)) {
            this.cancelGroundNetGeometryPrewarm();
            return
        }
        const r = this.groundNetGeometryPrewarm;
        if (r?.board === this.board && r.generation === this.geometryCacheGeneration && r.build.key === i)
            return;
        this.cancelGroundNetGeometryPrewarm();
        const o = this.netHighlightCache.get(e);
        if (!o)
            return;
        const s = !n
          , a = this.selectedNetUsesCanonicalLayerGraphics(o)
          , l = {
            key: i,
            net: e,
            refs: o,
            useLayerColors: s,
            canonicalGraphicsOnly: a,
            highlight: n ? w.highlightedPart : w.selectedNet,
            stage: a ? "graphic-fills" : "zones",
            cursor: 0,
            batches: [],
            vertexCount: 0,
            screenLineBatches: [],
            screenLineVertexCount: 0
        }
          , c = {
            board: this.board,
            generation: this.geometryCacheGeneration,
            build: l,
            timeoutId: null
        };
        this.groundNetGeometryPrewarm = c;
        const d = () => {
            if (this.groundNetGeometryPrewarm !== c)
                return;
            if (c.timeoutId = null,
            this.board !== c.board || c.generation !== this.geometryCacheGeneration || !this.layerStylingActive()) {
                this.cancelGroundNetGeometryPrewarm();
                return
            }
            if (this.options.selectedNet !== "") {
                if (this.options.selectedNet === e && this.selectedNetGeometryKey() === i) {
                    const h = this.cancelGroundNetGeometryPrewarm(!1);
                    h && (this.selectedNetGeometryBuild = h,
                    this.scheduleFrame())
                } else
                    this.cancelGroundNetGeometryPrewarm();
                return
            }
            if (this.geometryDirty || this.framePending) {
                c.timeoutId = window.setTimeout(d, 16);
                return
            }
            const u = this.appendSelectedNetGeometryBuildChunk(l);
            if (this.skippedSelectedNetGeometryKeys.has(i)) {
                this.skippedGroundNetGeometryPrewarmKeys.add(i),
                this.cancelGroundNetGeometryPrewarm();
                return
            }
            if (this.selectedNetGeometryBytes(l) > Rr) {
                this.skippedGroundNetGeometryPrewarmKeys.add(i),
                this.cancelGroundNetGeometryPrewarm();
                return
            }
            if (u) {
                const h = {
                    key: l.key,
                    batches: l.batches,
                    vertexCount: l.vertexCount,
                    screenLineBatches: l.screenLineBatches,
                    screenLineVertexCount: l.screenLineVertexCount
                };
                this.groundNetGeometryPrewarm = null,
                this.cacheSelectedNetGeometry(h, e) || (L(h.batches, this.webGl),
                L(h.screenLineBatches, this.webGl));
                return
            }
            c.timeoutId = window.setTimeout(d, 0)
        }
        ;
        c.timeoutId = window.setTimeout(d, 50)
    }
    preferredGroundNetForPrewarm() {
        const e = Array.from(this.netHighlightCache.keys()).filter(he);
        return e.sort( (n, i) => {
            const r = n.trim().toUpperCase()
              , o = i.trim().toUpperCase();
            return (r === "GND" || r === "DGND" ? 0 : 1) - (o === "GND" || o === "DGND" ? 0 : 1) || n.length - i.length || r.localeCompare(o)
        }
        ),
        e[0] ?? null
    }
    destroyHighlightedPartNetGeometry() {
        this.highlightedPartNetGeometry && (L(this.highlightedPartNetGeometry.batches, this.webGl),
        L(this.highlightedPartNetGeometry.screenLineBatches, this.webGl)),
        this.highlightedPartNetGeometry = null,
        this.highlightedPartNetVertexBatches = [],
        this.highlightedPartNetVertexCount = 0,
        this.highlightedPartNetScreenLineVertexBatches = [],
        this.highlightedPartNetScreenLineVertexCount = 0
    }
    destroyFocusDimBuffer() {
        this.focusDimBuffer?.destroy(),
        this.focusDimBuffer = null,
        this.focusDimWebGlBuffer && this.webGl && this.webGl.deleteBuffer(this.focusDimWebGlBuffer),
        this.focusDimWebGlBuffer = null,
        this.focusDimVertexCount = 0
    }
    drawHighlightedGraphic(e, n, i, r) {
        const o = Math.max(1, this.graphicStrokeWorld(n) * this.zoom);
        switch (n.type) {
        case "line":
            this.drawWorldLine(e, n.x1, n.y1, n.x2, n.y2, o);
            break;
        case "circle":
            {
                const s = this.worldToScreen(n.cx, n.cy)
                  , a = Math.max(1, Math.abs(n.radius * this.zoom));
                if (!Rn(s, a + o, i, r))
                    return;
                e.beginPath(),
                e.lineWidth = o,
                e.arc(s.x, s.y, a, 0, Math.PI * 2),
                n.filled ? e.fill() : e.stroke();
                break
            }
        case "arc":
            {
                const s = dt(n);
                this.drawWorldPolyline(e, s, o, !1, i, r);
                break
            }
        case "polygon":
            this.drawWorldPolygon(e, n.points, n.filled, i, r);
            break
        }
    }
    drawHighlightedVia(e, n) {
        if (!this.layerVisible(-1))
            return;
        const i = this.worldToScreen(n.x, n.y)
          , r = Math.max(1, Math.max(n.outerDiameter * .5, this.defaultStroke() * 2) * this.zoom);
        e.beginPath(),
        e.arc(i.x, i.y, r, 0, Math.PI * 2),
        e.fill()
    }
    drawHighlightedPad(e, n, i, r, o) {
        const s = this.displayedFallbackPadPoints(n, i);
        if (s) {
            this.drawWorldPolygon(e, s, !0, r, o);
            return
        }
        if (this.shouldDisplayPadOutline(i)) {
            this.drawWorldPolygon(e, i.outline, !i.outlineOnly, r, o),
            i.outlineOnly && this.drawWorldPolyline(e, i.outline, Math.max(1, this.defaultStroke() * this.zoom), !0, r, o);
            return
        }
        const a = this.displayedRectanglePadPoints(i);
        if (a) {
            this.drawWorldPolygon(e, a, !0, r, o);
            return
        }
        const l = this.worldToScreen(i.x, i.y)
          , d = this.displayedPadOverlayCircleRadius(i) * this.zoom;
        d <= 0 || !Rn(l, d, r, o) || (e.beginPath(),
        e.arc(l.x, l.y, d, 0, Math.PI * 2),
        e.fill())
    }
    drawWorldLine(e, n, i, r, o, s) {
        const a = this.worldToScreen(n, i)
          , l = this.worldToScreen(r, o);
        e.beginPath(),
        e.lineWidth = Math.max(1, s),
        e.moveTo(a.x, a.y),
        e.lineTo(l.x, l.y),
        e.stroke()
    }
    drawWorldPolyline(e, n, i, r, o, s) {
        if (!(n.length < 2 || !this.worldPointsMayIntersectViewport(n, o, s))) {
            e.beginPath(),
            e.lineWidth = Math.max(1, i);
            for (let a = 0; a < n.length; a += 1) {
                const l = n[a];
                if (!l)
                    continue;
                const c = this.worldToScreen(l[0], l[1]);
                a === 0 ? e.moveTo(c.x, c.y) : e.lineTo(c.x, c.y)
            }
            r && e.closePath(),
            e.stroke()
        }
    }
    drawWorldPolygon(e, n, i, r, o) {
        if (!(n.length < 3 || !this.worldPointsMayIntersectViewport(n, r, o))) {
            e.beginPath();
            for (let s = 0; s < n.length; s += 1) {
                const a = n[s];
                if (!a)
                    continue;
                const l = this.worldToScreen(a[0], a[1]);
                s === 0 ? e.moveTo(l.x, l.y) : e.lineTo(l.x, l.y)
            }
            e.closePath(),
            i ? e.fill() : e.stroke()
        }
    }
    drawWorldCompoundPolygon(e, n, i, r, o) {
        if (!(n.length < 3 || !this.worldPointsMayIntersectViewport(n, r, o))) {
            e.beginPath(),
            this.appendWorldPolygonPath(e, n);
            for (const s of i)
                s.length >= 3 && this.appendWorldPolygonPath(e, s);
            e.fill("evenodd")
        }
    }
    appendWorldPolygonPath(e, n) {
        for (let i = 0; i < n.length; i += 1) {
            const r = n[i];
            if (!r)
                continue;
            const o = this.worldToScreen(r[0], r[1]);
            i === 0 ? e.moveTo(o.x, o.y) : e.lineTo(o.x, o.y)
        }
        e.closePath()
    }
    worldPointsMayIntersectViewport(e, n, i) {
        let r = Number.POSITIVE_INFINITY
          , o = Number.POSITIVE_INFINITY
          , s = Number.NEGATIVE_INFINITY
          , a = Number.NEGATIVE_INFINITY;
        for (const l of e) {
            const c = this.worldToScreen(l[0], l[1]);
            r = Math.min(r, c.x),
            o = Math.min(o, c.y),
            s = Math.max(s, c.x),
            a = Math.max(a, c.y)
        }
        return s >= 0 && a >= 0 && r <= n && o <= i
    }
    drawSelectionOverlay(e, n) {
        const i = this.componentVisibleOnSide(n)
          , r = this.selectedPadIndex(n)
          , o = r !== null ? n.pads[r] : null
          , s = !!(o && o.type === "through-hole" && !o.suppressVisual && this.padVisible(o));
        if (!i && !s)
            return;
        const a = i && this.componentHasPadsOnSide(n) ? this.componentDisplayFrame(n) : null;
        if (o && this.padVisible(o) && !o.suppressVisual) {
            const l = this.useDistinctSelectedNetColor() && o.net === this.options.selectedNet ? w.highlightedPart : w.selectedPart;
            this.drawPadOverlay(e, n, o, this.darkenComponentColor(n, l), 1.5),
            this.drawSelectedPadLabel(e, n, o)
        }
        if (a?.bounds.valid && !this.shouldSuppressComponentBBox(n)) {
            const l = this.screenFrameForComponentFrame(a);
            if (e.strokeStyle = F(this.darkenComponentColor(n, w.selectedPart)),
            e.lineWidth = 1.5,
            l.obb)
                Vs(e, l.obb);
            else {
                const c = l.boundsRect;
                e.strokeRect(c.left, c.top, c.width, c.height)
            }
        }
    }
    backgroundPadCoverageByComponent() {
        if (!this.board)
            return new Map;
        const e = `${this.geometryCacheKeyForSide(this.options.activeSide)}|background-pad-coverage`;
        let n = this.backgroundPadCoverageByBoard.get(this.board);
        n || (n = new Map,
        this.backgroundPadCoverageByBoard.set(this.board, n));
        const i = n.get(e);
        if (i)
            return i;
        const r = this.pickIndexCellSize()
          , o = new Map
          , s = []
          , a = [];
        for (let d = 0; d < this.board.components.length; d += 1) {
            const u = this.board.components[d]
              , h = u?.pads[0];
            if (!u || !h || h.suppressVisual || !this.padVisible(h) || !this.isStandaloneBackgroundPad(u, h))
                continue;
            const f = this.padVisualBounds(u, h);
            if (!f.valid)
                continue;
            const p = {
                component: u,
                pad: h,
                padIndex: 0,
                componentOrder: d,
                bounds: f
            };
            a.push(p),
            this.addPickRefToCells(o, f, p, r) || s.push(p)
        }
        const l = new Map
          , c = (d, u, h) => {
            const f = je(u);
            for (const p of h) {
                if (p.component.id === d || f >= this.maxCoveredBodyAreaForBackgroundPad(p.pad, p.bounds) || !On(u, p.bounds))
                    continue;
                let m = l.get(d);
                m || (m = new Set,
                l.set(d, m)),
                m.add(`${p.component.id}:${p.padIndex}`)
            }
        }
        ;
        for (const d of this.board.components) {
            if (!d || !this.componentVisibleOnSide(d))
                continue;
            const u = this.componentDisplayFrame(d);
            if (!u.bounds.valid)
                continue;
            c(d.id, u.bounds, s);
            const h = Math.floor(u.bounds.minX / r)
              , f = Math.floor(u.bounds.maxX / r)
              , p = Math.floor(u.bounds.minY / r)
              , m = Math.floor(u.bounds.maxY / r);
            if ((f - h + 1) * (m - p + 1) > 2048) {
                c(d.id, u.bounds, a);
                continue
            }
            for (let x = p; x <= m; x += 1)
                for (let B = h; B <= f; B += 1) {
                    const v = o.get(Or(B, x));
                    v && c(d.id, u.bounds, v)
                }
        }
        return n.set(e, l),
        l
    }
    selectedEnclosingBackgroundPad() {
        const e = this.options.selectedPad
          , n = this.options.selectedNet.trim();
        if (!this.board || !e || n === "" && this.options.highlightedPartNetNames.size === 0)
            return null;
        const i = this.board.components.find(d => d.id === e.componentId)
          , r = i?.pads[e.padIndex];
        if (!i || !r || !this.padVisible(r))
            return null;
        const o = this.padVisualBounds(i, r)
          , s = this.pickSpatialIndex();
        if (!o.valid || !s)
            return null;
        const a = this.padVisualCenterWorld(i, r);
        let l = je(o) * 1.5
          , c = null;
        for (const d of this.queryPickPads(s, a, 0)) {
            if (d.component.id === i.id || !this.isStandaloneBackgroundPadCandidate(d))
                continue;
            const u = d.pad.net.trim();
            if (!(u !== "" && (u === n || this.options.highlightedPartNetNames.has(u))))
                continue;
            const f = je(d.bounds);
            f > l && this.padHitTest(d.component, d.pad, a, 0) && (l = f,
            c = {
                componentId: d.component.id,
                padIndex: d.padIndex
            })
        }
        return c
    }
    activeStandaloneBackgroundPadOverlays() {
        if (!this.board)
            return [];
        const e = new Map
          , n = (i, r, o) => {
            if (!i)
                return;
            const s = this.board?.components.find(u => u.id === i.componentId)
              , a = s?.pads[i.padIndex];
            if (!s || !a || !this.isStandaloneBackgroundPad(s, a) || a.suppressVisual || !this.padVisible(a))
                return;
            const l = this.padVisualBounds(s, a);
            if (!l.valid)
                return;
            const c = `${s.id}:${i.padIndex}`
              , d = e.get(c);
            if (d) {
                d.selected ||= r,
                d.hovered ||= o;
                return
            }
            e.set(c, {
                component: s,
                pad: a,
                padIndex: i.padIndex,
                bounds: l,
                maxCoveredBodyArea: this.maxCoveredBodyAreaForBackgroundPad(a, l),
                selected: r,
                hovered: o
            })
        }
        ;
        return n(this.options.selectedPad, !0, !1),
        n(this.selectedEnclosingBackgroundPad(), !1, !1),
        n(this.hoveredPad, !1, !0),
        n(this.hoveredBackgroundPad, !1, !0),
        [...e.values()].sort( (i, r) => je(r.bounds) - je(i.bounds))
    }
    drawActiveStandaloneBackgroundPadOverlay(e, n, i, r) {
        e.save(),
        this.drawBasePadOverlay(e, n.component, n.pad),
        n.hovered && !n.selected && this.drawPadOverlay(e, n.component, n.pad, this.hoveredPadColor(n.pad), 1);
        const o = this.componentVisibleOnSide(n.component) ? this.componentDisplayFrame(n.component) : null;
        if (this.drawPinLabels(e, n.component, o?.bounds.valid ? this.screenFrameForComponentFrame(o) : null, i, r),
        n.selected) {
            const s = this.useDistinctSelectedNetColor() && n.pad.net === this.options.selectedNet ? w.highlightedPart : w.selectedPart;
            this.drawPadOverlay(e, n.component, n.pad, this.darkenComponentColor(n.component, s), 1.5),
            this.drawSelectedPadLabel(e, n.component, n.pad)
        }
        e.restore()
    }
    drawCoveredComponentPads(e, n, i, r) {
        const o = je(i)
          , s = r.filter(a => o < a.maxCoveredBodyArea && On(i, a.bounds));
        if (s.length !== 0)
            for (const a of n.pads) {
                if (!a || a.suppressVisual || !this.padVisible(a))
                    continue;
                const l = this.padVisualBounds(n, a);
                s.some(c => this.renderedPadsOverlap(n, a, l, c)) && this.drawBasePadOverlay(e, n, a)
            }
    }
    renderedPadsOverlap(e, n, i, r) {
        const o = r.bounds;
        if (!i.valid || !o.valid || i.minX >= o.maxX || i.maxX <= o.minX || i.minY >= o.maxY || i.maxY <= o.minY)
            return !1;
        if (!this.isRenderedPadRound(r.component, r.pad))
            return !0;
        const s = this.displayedPadCircleRadius(r.pad);
        if (s <= 0)
            return !0;
        if (this.isRenderedPadRound(e, n)) {
            const u = this.displayedPadCircleRadius(n)
              , h = n.x - r.pad.x
              , f = n.y - r.pad.y
              , p = Math.max(0, u) + s;
            return h * h + f * f < p * p
        }
        const a = ee(r.pad.x, i.minX, i.maxX)
          , l = ee(r.pad.y, i.minY, i.maxY)
          , c = a - r.pad.x
          , d = l - r.pad.y;
        return c * c + d * d < s * s
    }
    isRenderedPadRound(e, n) {
        return !this.displayedFallbackPadPoints(e, n) && !this.shouldDisplayPadOutline(n) && !this.displayedRectanglePadPoints(n)
    }
    drawBasePadOverlay(e, n, i) {
        let r = this.colorForPad(i);
        i.net !== "" && i.net === this.options.selectedNet && (r = this.useDistinctSelectedNetColor() ? w.highlightedPart : this.selectedNetUsesLayerColorFocus() ? r : w.selectedNet),
        r = this.darkenComponentColor(n, r),
        e.save(),
        e.fillStyle = F(r),
        e.strokeStyle = F(r),
        e.lineWidth = 1;
        const o = (a, l, c=[]) => {
            if (a.length < 3)
                return;
            e.beginPath();
            const d = u => {
                for (let h = 0; h < u.length; h += 1) {
                    const f = u[h];
                    if (!f)
                        continue;
                    const p = this.worldToScreen(f[0], f[1]);
                    h === 0 ? e.moveTo(p.x, p.y) : e.lineTo(p.x, p.y)
                }
                e.closePath()
            }
            ;
            d(a);
            for (const u of c)
                d(u);
            l ? e.fill("evenodd") : e.stroke()
        }
          , s = this.displayedFallbackPadPoints(n, i);
        if (s)
            o(s, !this.options.hollowPinPads);
        else if (this.shouldDisplayPadOutline(i))
            o(i.outline, !this.options.hollowPinPads && !i.outlineOnly, !this.options.hollowPinPads && !i.outlineOnly ? i.outlineHoles : []);
        else {
            const a = this.displayedRectanglePadPoints(i);
            if (a)
                o(a, !this.options.hollowPinPads);
            else {
                const l = this.displayedPadCircleRadius(i);
                if (l > 0) {
                    const c = this.worldToScreen(i.x, i.y)
                      , d = l * this.zoom;
                    e.beginPath(),
                    e.arc(c.x, c.y, d, 0, Math.PI * 2),
                    this.options.hollowPinPads || !this.options.drawPinPads || i.outlineOnly ? e.stroke() : e.fill()
                }
            }
        }
        if (!this.options.hollowPinPads && i.type === "through-hole" && i.drillDiameter > 0 && !this.isComponentThroughHoleDrill(n, i)) {
            const a = this.worldToScreen(i.x, i.y);
            e.fillStyle = F(w.hole),
            e.beginPath(),
            e.arc(a.x, a.y, i.drillDiameter * .5 * this.zoom, 0, Math.PI * 2),
            e.fill()
        }
        e.restore()
    }
    drawHoveredPadOverlay(e) {
        const n = this.hoveredPad;
        if (!n || !this.board)
            return;
        const i = this.board.components.find(o => o.id === n.componentId)
          , r = i?.pads[n.padIndex];
        !i || !r || r.suppressVisual || !this.padVisible(r) || this.isStandaloneBackgroundPad(i, r) || this.options.selectedPad?.componentId === n.componentId && this.options.selectedPad.padIndex === n.padIndex || r.net && r.net === this.options.selectedNet || this.drawPadOverlay(e, i, r, this.hoveredPadColor(r), 1)
    }
    hoveredPadColor(e) {
        const n = this.colorForPad(e);
        return se(lt(n, [1, 1, 1, 1], .15), 1)
    }
    netFocusDimActive() {
        return this.layerStylingActive() && this.options.selectedNet.trim() !== ""
    }
    componentMatchesSelectedNet(e) {
        return this.options.selectedNet !== "" && this.netHighlightCache.get(this.options.selectedNet)?.componentIds.has(e.id) === !0
    }
    componentFocusVisible(e) {
        return this.netFocusDimActive() ? this.componentMatchesSelectedNet(e) || this.options.selectedComponentId === e.id || this.hoveredComponentId === e.id || this.options.highlightedPartIds.has(e.id) || e.pads.some(n => this.options.highlightedPartNetNames.has(n.net.trim())) : !0
    }
    shouldDeferComponentBox(e) {
        return this.hoveredComponentId === e.id || this.componentMatchesSelectedNet(e) && this.options.selectedComponentId !== e.id
    }
    componentTextColor(e) {
        let n = this.layerStylingActive() ? se(zn(fe(w.componentText, 1.08)), Math.min(1, w.componentText[3] * 1.1)) : w.componentText;
        return this.componentFocusVisible(e) || (n = se(lt(n, w.background, .13), n[3] * .94)),
        n
    }
    pinLabelColor(e, n, i) {
        if (this.options.selectedPad?.componentId === e.id && this.options.selectedPad.padIndex === i)
            return [1, 1, 1, 1];
        let o = this.layerStylingActive() ? se(zn(fe(w.pinLabelText, 1.08)), Math.min(1, w.pinLabelText[3] * 1.1)) : w.pinLabelText;
        return !this.netFocusDimActive() || n.net.trim() !== "" && n.net === this.options.selectedNet || (o = se(lt(o, w.background, .13), o[3] * .94)),
        o
    }
    dimOverlayColorForNetFocus(e) {
        return this.netFocusDimActive() ? lt(e, w.background, .16) : e
    }
    componentIsDarkened(e) {
        return this.options.darkenedPartIds.has(e.id)
    }
    darkenComponentColor(e, n) {
        return this.componentIsDarkened(e) ? fe(n, Na) : n
    }
    drawPadOverlay(e, n, i, r, o) {
        e.save(),
        e.fillStyle = F(r),
        e.strokeStyle = F(r),
        e.lineWidth = o;
        const s = this.displayedFallbackPadPoints(n, i);
        if (s) {
            e.beginPath();
            for (let u = 0; u < s.length; ++u) {
                const h = s[u];
                if (!h)
                    continue;
                const f = this.worldToScreen(h[0], h[1]);
                u === 0 ? e.moveTo(f.x, f.y) : e.lineTo(f.x, f.y)
            }
            e.closePath(),
            e.fill(),
            e.stroke(),
            e.restore();
            return
        }
        if (this.shouldDisplayPadOutline(i)) {
            e.beginPath();
            for (let u = 0; u < i.outline.length; ++u) {
                const h = i.outline[u];
                if (!h)
                    continue;
                const f = this.worldToScreen(h[0], h[1]);
                u === 0 ? e.moveTo(f.x, f.y) : e.lineTo(f.x, f.y)
            }
            e.closePath(),
            e.fill(),
            e.stroke(),
            e.restore();
            return
        }
        const a = this.displayedRectanglePadPoints(i);
        if (a) {
            e.beginPath();
            for (let u = 0; u < a.length; ++u) {
                const h = a[u];
                if (!h)
                    continue;
                const f = this.worldToScreen(h[0], h[1]);
                u === 0 ? e.moveTo(f.x, f.y) : e.lineTo(f.x, f.y)
            }
            e.closePath(),
            e.fill(),
            e.stroke(),
            e.restore();
            return
        }
        const l = this.displayedPadOverlayCircleRadius(i);
        if (l <= 0) {
            e.restore();
            return
        }
        const c = this.worldToScreen(i.x, i.y)
          , d = l * this.zoom;
        if (d <= 0) {
            e.restore();
            return
        }
        e.beginPath(),
        e.arc(c.x, c.y, d, 0, Math.PI * 2),
        e.fill(),
        e.stroke(),
        e.restore()
    }
    drawSelectedPadLabel(e, n, i) {
        if (!i.name)
            return;
        const r = this.padVisualScreenRect(n, i);
        if (!r)
            return;
        const o = Math.min(r.width, r.height);
        if (o < 8)
            return;
        const s = this.pinLabelStartFont(e, n, i, o)
          , a = this.options.showPinNetLabels
          , l = a ? Fi(r, s) : r
          , c = Vt(e, i.name, s, l.width, l.height);
        c < 2 || (e.save(),
        this.drawPinTextBlock(e, i, r, c, [1, 1, 1, 1], a, !0, !0),
        e.restore())
    }
    drawSelectedNetWeb(e) {
        if (!this.options.showNetWeb || !this.board || !this.options.selectedNet || Ls(this.options.selectedNet))
            return;
        const n = this.netHighlightCache.get(this.options.selectedNet);
        if (!n)
            return;
        const i = [];
        let r = null
          , o = 0
          , s = 0;
        for (const l of n.pads) {
            const c = l.pad;
            if (c.suppressVisual || !this.layerVisible(c.layerId))
                continue;
            const d = this.worldToScreen(c.x, c.y);
            i.push({
                x: d.x,
                y: d.y,
                side: c.side
            }),
            o += d.x,
            s += d.y;
            const u = this.options.selectedPad;
            u && u.componentId === l.component.id && u.padIndex === l.padIndex && (r = d)
        }
        if (i.length < 2)
            return;
        r ??= {
            x: o / i.length,
            y: s / i.length
        },
        e.save(),
        e.lineCap = "round",
        e.lineWidth = 1;
        const a = this.useDistinctSelectedNetColor() ? w.highlightedPart : w.netwebCurrent;
        for (const l of i)
            Ns(l, r) || (e.strokeStyle = F(l.side === this.options.activeSide ? a : w.netwebOther),
            e.beginPath(),
            e.moveTo(r.x, r.y),
            e.lineTo(l.x, l.y),
            e.stroke());
        for (const l of i)
            r && Ns(l, r) || (e.fillStyle = F(l.side === this.options.activeSide ? a : w.netwebOther),
            e.beginPath(),
            e.arc(l.x, l.y, 4, 0, Math.PI * 2),
            e.fill());
        e.restore()
    }
    padVisualCenterWorld(e, n) {
        const i = this.padVisualBounds(e, n);
        return i.valid ? {
            x: (i.minX + i.maxX) * .5,
            y: (i.minY + i.maxY) * .5
        } : {
            x: n.x,
            y: n.y
        }
    }
    configureCanvas() {
        if ((!this.device || !this.context || !this.format) && !this.webGl)
            return;
        const e = Math.max(1, window.devicePixelRatio || 1)
          , n = Math.max(1, Math.floor(this.cssWidth() * e))
          , i = Math.max(1, Math.floor(this.cssHeight() * e));
        (this.canvas.width !== n || this.canvas.height !== i) && (this.canvas.width = n,
        this.canvas.height = i),
        !this.canvasConfigured && this.device && this.context && this.format && (this.context.configure({
            device: this.device,
            format: this.format,
            alphaMode: "opaque"
        }),
        this.canvasConfigured = !0),
        this.configureLabelCanvas(n, i, e)
    }
    configureLabelCanvas(e, n, i) {
        this.labelCanvas && ((this.labelCanvas.width !== e || this.labelCanvas.height !== n) && (this.labelCanvas.width = e,
        this.labelCanvas.height = n),
        this.labelContext && this.labelContext.setTransform(i, 0, 0, i, 0, 0))
    }
    updateUniforms() {
        if (!this.device || !this.uniformBuffer || !this.dimmedUniformBuffer)
            return;
        const e = this.viewMatrix(1)
          , n = e.slice();
        n[18] = .5,
        this.device.queue.writeBuffer(this.uniformBuffer, 0, e),
        this.device.queue.writeBuffer(this.dimmedUniformBuffer, 0, n)
    }
    viewMatrix(e=1) {
        const n = Math.max(1, this.cssWidth())
          , i = Math.max(1, this.cssHeight())
          , r = this.displayTransformCoefficients()
          , o = 2 * this.zoom * r.ax / n
          , s = 2 * this.zoom * r.bx / n
          , a = 2 * (this.offsetX + this.zoom * r.cx) / n - 1
          , l = -2 * this.zoom * r.ay / i
          , c = -2 * this.zoom * r.by / i
          , d = 1 - 2 * (this.offsetY + this.zoom * r.cy) / i;
        return new Float32Array([o, l, 0, 0, s, c, 0, 0, 0, 0, 1, 0, a, d, 0, 1, n, i, e, 0])
    }
    geometryBatchColorScale(e) {
        return !this.isManualTopLayerActiveForCurrentView() || e.layerId === null || e.layerId === this.options.topLayerId ? 1 : .5
    }
    rebuildGeometry() {
        if (!this.hasRenderBackend())
            return;
        if (this.layerStylingActive()) {
            this.rebuildLayerGeometry(),
            this.geometryDirty = !1;
            return
        }
        const e = this.geometryCacheKeyForSide(this.options.activeSide)
          , n = this.geometryCache.get(e);
        if (n) {
            this.vertexBatches = n.batches,
            this.vertexCount = n.vertexCount,
            this.screenLineVertexBatches = n.screenLineBatches,
            this.screenLineVertexCount = n.screenLineVertexCount,
            this.geometryDirty = !1;
            return
        }
        const i = this.buildGeometryCacheEntry(this.options.activeSide);
        i ? (this.geometryCache.set(e, i),
        this.vertexBatches = i.batches,
        this.vertexCount = i.vertexCount,
        this.screenLineVertexBatches = i.screenLineBatches,
        this.screenLineVertexCount = i.screenLineVertexCount) : (this.vertexBatches = [],
        this.vertexCount = 0,
        this.screenLineVertexBatches = [],
        this.screenLineVertexCount = 0),
        this.geometryDirty = !1
    }
    rebuildLayerGeometry() {
        const e = this.ensureLayerViewGeometry(this.options.activeSide);
        if (!e) {
            this.vertexBatches = [],
            this.vertexCount = 0,
            this.screenLineVertexBatches = [],
            this.screenLineVertexCount = 0;
            return
        }
        this.vertexBatches = e.batches,
        this.vertexCount = e.vertexCount,
        this.screenLineVertexBatches = e.screenLineBatches,
        this.screenLineVertexCount = e.screenLineVertexCount
    }
    ensureLayerViewGeometry(e) {
        const n = this.layerViewGeometryCacheKey(e)
          , i = this.layerViewGeometryCache.get(n);
        if (i)
            return i;
        const r = this.layerGeometryEntriesForSide(e);
        if (!r)
            return null;
        const o = {
            batches: r.flatMap(s => s.batches),
            vertexCount: r.reduce( (s, a) => s + a.vertexCount, 0),
            screenLineBatches: r.flatMap(s => s.screenLineBatches),
            screenLineVertexCount: r.reduce( (s, a) => s + a.screenLineVertexCount, 0)
        };
        return this.layerViewGeometryCache.set(n, o),
        o
    }
    layerViewGeometryCacheKey(e) {
        return `${this.geometryCacheKeyForSide(e)}|layer-view|top:${this.options.topLayerId ?? "none"}`
    }
    layerGeometryEntriesForSide(e) {
        if (!this.board)
            return null;
        const n = []
          , i = h => h ? (n.push(h),
        !0) : !1;
        if (!i(this.getOrBuildLayerGeometryEntry(e, null, "base")))
            return null;
        const r = [-1, ...this.board.layers.filter(h => this.options.visibleLayerIds.has(h.id)).map(h => h.id)]
          , o = this.isManualTopLayerActiveForCurrentView() ? this.options.topLayerId : null
          , s = o === null ? r : r.filter(h => h !== o)
          , a = o === null ? [] : [o]
          , l = [...s, ...a]
          , c = this.componentPadLayerIdsForSide(e)
          , d = o !== null && c.includes(o) ? [...c.filter(h => h !== o), o] : c
          , u = (h, f) => {
            for (const p of h)
                if (!i(this.getOrBuildLayerGeometryEntry(e, p, f)))
                    return !1;
            return !0
        }
        ;
        if (!u(s, "zones") || !i(this.getOrBuildLayerGeometryEntry(e, null, "vias")))
            return null;
        for (const h of ["filled", "strokes", "tracks"])
            if (!u(s, h))
                return null;
        if (!u(a, "zones"))
            return null;
        for (const h of ["filled", "strokes", "tracks"])
            if (!u(a, h))
                return null;
        return !u(d, "pads") || !i(this.getOrBuildLayerGeometryEntry(e, null, "background-pads")) || !u(d, "pad-holes") || this.sideViaCopperLayerVisible(e) && !i(this.getOrBuildLayerGeometryEntry(e, null, "via-holes")) || !u(l, "negative") ? null : n
    }
    componentPadLayerIdsForSide(e) {
        if (!this.board)
            return [];
        const n = new Set;
        for (const r of this.board.components)
            for (const o of r.pads)
                !o || o.suppressVisual || !this.padBelongsToSide(o, e) || n.add(o.layerId >= 0 && this.layerById(o.layerId) ? o.layerId : -1);
        const i = [];
        n.has(-1) && i.push(-1);
        for (const r of this.board.layers)
            n.has(r.id) && i.push(r.id);
        return i
    }
    getOrBuildLayerGeometryEntry(e, n, i) {
        const r = this.layerGeometryCacheKey(e, n, i)
          , o = this.geometryCache.get(r);
        if (o)
            return o;
        const s = this.buildLayerGeometryEntry(e, n, i);
        return s && this.geometryCache.set(r, s),
        s
    }
    buildLayerGeometryEntry(e, n, i) {
        if (!this.board)
            return null;
        const r = this.options.activeSide
          , o = this.options.topLayerId
          , s = []
          , a = []
          , l = performance.now();
        try {
            switch (this.options.activeSide = e,
            this.options.topLayerId = null,
            i) {
            case "base":
                this.appendSyntheticBoardFill(s, this.board);
                break;
            case "vias":
                for (const h of this.board.vias)
                    this.appendVia(s, h);
                break;
            case "zones":
            case "filled":
            case "strokes":
            case "tracks":
            case "pads":
                n !== null && this.appendBoardLayerGeometry(s, a, this.board, n, i);
                break;
            case "background-pads":
                this.appendStandaloneBackgroundPads(s, a, this.board);
                break;
            case "pad-holes":
            case "negative":
                n !== null && this.appendBoardLayerHoleGeometry(s, a, this.board, n, i);
                break;
            case "via-holes":
                this.appendViaDrillHoles(s, this.board, !1);
                break
            }
        } finally {
            this.options.activeSide = r,
            this.options.topLayerId = o
        }
        const c = performance.now() - l;
        (c >= 250 || s.length >= 2e6 || a.length >= 5e5) && console.info("[ViewBV Web] Layer geometry build", {
            side: e,
            layerId: n,
            phase: i,
            ms: Math.round(c),
            triangleVertices: Math.floor(s.length / 6),
            screenLineVertices: Math.floor(a.length / 11)
        });
        const u = (i === "zones" || i === "filled" || i === "strokes" || i === "tracks") && n !== null && n >= 0 && this.layerById(n)?.role !== "edge-cuts" ? n : null;
        return this.createGeometryBuffer(s, a, u)
    }
    layerGeometryCacheKey(e, n, i) {
        const r = this.currentBoardGeometryId()
          , o = this.layerGeometryIsSideIndependent(n, i) ? "shared" : e
          , s = this.options.drawPinPads ? this.options.hollowPinPads ? "hollow" : "detailed" : "simple";
        return `${r}|layer-unit|${o}|${i}:${n ?? "global"}|pads:${s}`
    }
    layerGeometryIsSideIndependent(e, n) {
        if (n === "vias" || n === "via-holes")
            return !0;
        if (!this.board || e === null || n === "base" || n === "pads" || n === "pad-holes")
            return !1;
        const i = this.layerById(e);
        if (!i || i.side !== "")
            return !1;
        if (n === "zones" || n === "tracks")
            return !0;
        let r = this.layerSideIndependentPhaseCacheByBoard.get(this.board);
        r || (r = new Map,
        this.layerSideIndependentPhaseCacheByBoard.set(this.board, r));
        const o = `${e}:${n}`
          , s = r.get(o);
        if (s !== void 0)
            return s;
        const a = this.layerGraphicRefs(this.board, e)
          , c = (n === "filled" ? a.filled : n === "strokes" ? a.strokes : a.negative).every(d => d.side === "");
        return r.set(o, c),
        c
    }
    ensureSelectedNetGeometry() {
        if (!this.selectedNetUsesGpuHighlight() || !this.hasRenderBackend() || !this.board)
            return this.selectedNetVertexBatches = [],
            this.selectedNetVertexCount = 0,
            this.selectedNetScreenLineVertexBatches = [],
            this.selectedNetScreenLineVertexCount = 0,
            null;
        const e = this.selectedNetGeometryKey();
        if (this.selectedNetGeometry?.key === e)
            return this.selectedNetVertexBatches = this.selectedNetGeometry.batches,
            this.selectedNetVertexCount = this.selectedNetGeometry.vertexCount,
            this.selectedNetScreenLineVertexBatches = this.selectedNetGeometry.screenLineBatches,
            this.selectedNetScreenLineVertexCount = this.selectedNetGeometry.screenLineVertexCount,
            this.selectedNetGeometry;
        (this.selectedNetGeometry || this.selectedNetGeometryBuild && this.selectedNetGeometryBuild.key !== e) && this.destroySelectedNetGeometry();
        const n = this.selectedNetGeometryCache.get(e);
        if (n)
            return this.selectedNetGeometryCache.delete(e),
            this.selectedNetGeometryCache.set(e, n),
            this.selectedNetGeometry = n.entry,
            this.selectedNetGeometryIsCached = !0,
            this.selectedNetVertexBatches = n.entry.batches,
            this.selectedNetVertexCount = n.entry.vertexCount,
            this.selectedNetScreenLineVertexBatches = n.entry.screenLineBatches,
            this.selectedNetScreenLineVertexCount = n.entry.screenLineVertexCount,
            n.entry;
        const i = this.takeGroundNetGeometryPrewarm(e);
        if (i && (this.selectedNetGeometryBuild = i),
        this.skippedSelectedNetGeometryKeys.has(e))
            return null;
        const r = this.netHighlightCache.get(this.options.selectedNet);
        if (!r)
            return null;
        const o = this.useDistinctSelectedNetColor()
          , s = this.selectedNetUsesLayerColorFocus() && !o
          , a = this.selectedNetUsesCanonicalLayerGraphics(r)
          , l = o ? w.highlightedPart : w.selectedNet;
        if ((a ? r.graphics.length * 2 + r.pads.length : r.zones.length + r.graphics.length * 2 + r.tracks.length + r.vias.length + r.pads.length) <= Ss && !this.selectedNetGeometryBuild) {
            const u = []
              , h = [];
            this.appendSelectedNetGeometry(u, h, r, s, l);
            const f = this.createGeometryBuffer(u, h);
            if (!f)
                return null;
            if (f.vertexCount * _t + f.screenLineVertexCount * st > Ti)
                return L(f.batches, this.webGl),
                L(f.screenLineBatches, this.webGl),
                this.skippedSelectedNetGeometryKeys.add(e),
                console.warn("[ViewBV Web] Selected-net GPU geometry exceeded the memory budget; using trace-only focus", {
                    net: this.options.selectedNet,
                    budgetMiB: Ti / (1024 * 1024)
                }),
                null;
            this.selectedNetGeometry = {
                ...f,
                key: e
            },
            this.selectedNetGeometryIsCached = this.cacheSelectedNetGeometry(this.selectedNetGeometry)
        } else {
            this.selectedNetGeometryBuild ??= {
                key: e,
                net: this.options.selectedNet,
                refs: r,
                useLayerColors: s,
                canonicalGraphicsOnly: a,
                highlight: l,
                stage: a ? "graphic-fills" : "zones",
                cursor: 0,
                batches: [],
                vertexCount: 0,
                screenLineBatches: [],
                screenLineVertexCount: 0
            };
            const u = this.appendSelectedNetGeometryBuildChunk(this.selectedNetGeometryBuild);
            if (this.skippedSelectedNetGeometryKeys.has(e))
                return this.selectedNetGeometryBuild = null,
                this.selectedNetVertexBatches = [],
                this.selectedNetVertexCount = 0,
                this.selectedNetScreenLineVertexBatches = [],
                this.selectedNetScreenLineVertexCount = 0,
                null;
            if (u) {
                const h = this.selectedNetGeometryBuild;
                this.selectedNetGeometry = {
                    key: h.key,
                    batches: h.batches,
                    vertexCount: h.vertexCount,
                    screenLineBatches: h.screenLineBatches,
                    screenLineVertexCount: h.screenLineVertexCount
                },
                this.selectedNetGeometryBuild = null,
                this.selectedNetGeometryIsCached = this.cacheSelectedNetGeometry(this.selectedNetGeometry)
            } else
                return this.selectedNetVertexBatches = [],
                this.selectedNetVertexCount = 0,
                this.selectedNetScreenLineVertexBatches = [],
                this.selectedNetScreenLineVertexCount = 0,
                this.scheduleFrame(),
                null
        }
        const d = this.selectedNetGeometry ?? this.selectedNetGeometryBuild;
        return d ? (this.selectedNetVertexBatches = d.batches,
        this.selectedNetVertexCount = d.vertexCount,
        this.selectedNetScreenLineVertexBatches = d.screenLineBatches,
        this.selectedNetScreenLineVertexCount = d.screenLineVertexCount,
        d) : null
    }
    appendSelectedNetGeometryBuildChunk(e) {
        const n = this.selectedNetBuildVertices
          , i = this.selectedNetBuildScreenLineVertices;
        n.length = 0,
        i.length = 0;
        const r = performance.now() + rd;
        let o = !1
          , s = 0;
        const a = () => {
            switch (e.cursor = 0,
            e.stage) {
            case "zones":
                return e.stage = "graphic-fills",
                !1;
            case "graphic-fills":
                return e.stage = "graphic-strokes",
                !1;
            case "graphic-strokes":
                return e.stage = e.canonicalGraphicsOnly ? "pads" : "tracks",
                !1;
            case "tracks":
                return e.stage = "vias",
                !1;
            case "vias":
                return e.stage = "pads",
                !1;
            case "pads":
                return !0
            }
        }
        ;
        for (; !o && s === 0; ) {
            const l = e.stage === "pads" || e.stage === "vias" ? id : Ss;
            switch (e.stage) {
            case "zones":
                {
                    for (; e.cursor < e.refs.zones.length && s < l && (s === 0 || performance.now() < r); ) {
                        const c = e.refs.zones[e.cursor++];
                        if (s += 1,
                        !this.layerNameVisible(c.layer))
                            continue;
                        const d = e.useLayerColors ? Wn(this.colorForLayerName(c.layer, !0, !1), !0) : e.highlight;
                        at(n, c.outline, d)
                    }
                    e.cursor >= e.refs.zones.length && (o = a());
                    break
                }
            case "graphic-fills":
            case "graphic-strokes":
                {
                    const c = e.stage === "graphic-fills" ? "fill" : "stroke";
                    for (; e.cursor < e.refs.graphics.length && s < l && (s === 0 || performance.now() < r); ) {
                        const d = e.refs.graphics[e.cursor++];
                        if (s += 1,
                        d.sourceNegative || !this.graphicVisible(d) || this.selectedNetGraphicDrawPhase(d) !== c)
                            continue;
                        const u = e.useLayerColors ? this.selectedTraceBodyColor(d) : e.highlight;
                        this.appendSelectedNetGraphic(n, i, d, u)
                    }
                    e.cursor >= e.refs.graphics.length && (o = a());
                    break
                }
            case "tracks":
                {
                    for (; e.cursor < e.refs.tracks.length && s < l && (s === 0 || performance.now() < r); ) {
                        const c = e.refs.tracks[e.cursor++];
                        if (s += 1,
                        !this.layerNameVisible(c.layer))
                            continue;
                        const d = e.useLayerColors ? Wn(this.colorForLayerName(c.layer, !1, !1), !1) : e.highlight;
                        vt(n, c.x1, c.y1, c.x2, c.y2, Math.max(c.width, this.defaultStroke()), d)
                    }
                    e.cursor >= e.refs.tracks.length && (o = a());
                    break
                }
            case "vias":
                {
                    for (this.shouldDrawStandaloneViaHighlights() || (e.cursor = e.refs.vias.length); e.cursor < e.refs.vias.length && s < l && (s === 0 || performance.now() < r); )
                        this.appendHighlightedViaGeometry(n, e.refs.vias[e.cursor++], e.highlight),
                        s += 1;
                    e.cursor >= e.refs.vias.length && (o = a());
                    break
                }
            case "pads":
                {
                    for (; e.cursor < e.refs.pads.length && s < l && (s === 0 || performance.now() < r); ) {
                        const c = e.refs.pads[e.cursor++];
                        s += 1,
                        !(!this.padVisible(c.pad) || c.pad.suppressVisual) && this.appendHighlightedPadGeometry(n, c.component, c.pad, e.highlight)
                    }
                    e.cursor >= e.refs.pads.length && (o = a());
                    break
                }
            }
        }
        if (n.length > 0 || i.length > 0) {
            const l = this.createGeometryBuffer(n, i);
            l && ((e.vertexCount + l.vertexCount) * _t + (e.screenLineVertexCount + l.screenLineVertexCount) * st > Ti ? (L(l.batches, this.webGl),
            L(l.screenLineBatches, this.webGl),
            L(e.batches, this.webGl),
            L(e.screenLineBatches, this.webGl),
            e.batches = [],
            e.vertexCount = 0,
            e.screenLineBatches = [],
            e.screenLineVertexCount = 0,
            this.skippedSelectedNetGeometryKeys.add(e.key),
            console.warn("[ViewBV Web] Selected-net GPU geometry exceeded the memory budget; using trace-only focus", {
                net: e.net,
                budgetMiB: Ti / (1024 * 1024)
            })) : (e.batches.push(...l.batches),
            e.vertexCount += l.vertexCount,
            e.screenLineBatches.push(...l.screenLineBatches),
            e.screenLineVertexCount += l.screenLineVertexCount))
        }
        return n.length = 0,
        i.length = 0,
        o
    }
    ensureHighlightedPartNetGeometry() {
        if (!this.hasRenderBackend() || !this.board || this.options.highlightedPartNetNames.size === 0)
            return this.highlightedPartNetVertexBatches = [],
            this.highlightedPartNetVertexCount = 0,
            this.highlightedPartNetScreenLineVertexBatches = [],
            this.highlightedPartNetScreenLineVertexCount = 0,
            null;
        const e = this.highlightedPartNetGeometryKey();
        if (this.highlightedPartNetGeometry?.key === e)
            return this.highlightedPartNetVertexBatches = this.highlightedPartNetGeometry.batches,
            this.highlightedPartNetVertexCount = this.highlightedPartNetGeometry.vertexCount,
            this.highlightedPartNetScreenLineVertexBatches = this.highlightedPartNetGeometry.screenLineBatches,
            this.highlightedPartNetScreenLineVertexCount = this.highlightedPartNetGeometry.screenLineVertexCount,
            this.highlightedPartNetGeometry;
        this.destroyHighlightedPartNetGeometry();
        const n = []
          , i = [];
        for (const o of this.options.highlightedPartNetNames) {
            if (Ls(o))
                continue;
            const s = this.netHighlightCache.get(o);
            if (!s)
                continue;
            const a = o === this.options.selectedNet ? w.highlightedPart : w.selectedNet;
            this.appendSelectedNetGeometry(n, i, s, !1, a)
        }
        const r = this.createGeometryBuffer(n, i);
        return r ? (this.highlightedPartNetGeometry = {
            ...r,
            key: e
        },
        this.highlightedPartNetVertexBatches = r.batches,
        this.highlightedPartNetVertexCount = r.vertexCount,
        this.highlightedPartNetScreenLineVertexBatches = r.screenLineBatches,
        this.highlightedPartNetScreenLineVertexCount = r.screenLineVertexCount,
        this.highlightedPartNetGeometry) : null
    }
    updateFocusDimGeometry() {
        if (!this.hasRenderBackend() || !this.selectedNetUsesLayerColorFocus() || this.selectedNetGeometry?.key !== this.selectedNetGeometryKey())
            return this.focusDimVertexCount = 0,
            !1;
        const e = []
          , n = this.screenToWorld(0, 0)
          , i = this.screenToWorld(this.cssWidth(), 0)
          , r = this.screenToWorld(this.cssWidth(), this.cssHeight())
          , o = this.screenToWorld(0, this.cssHeight());
        Fa(e, [[n.x, n.y], [i.x, i.y], [r.x, r.y], [o.x, o.y]], se(w.background, this.options.selectedPad ? .21 : .16));
        const s = new Float32Array(e);
        if (this.device)
            (!this.focusDimBuffer || this.focusDimBuffer.size < Math.max(4, s.byteLength)) && (this.focusDimBuffer?.destroy(),
            this.focusDimBuffer = this.device.createBuffer({
                size: Math.max(4, s.byteLength),
                usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
            })),
            s.byteLength > 0 && this.device.queue.writeBuffer(this.focusDimBuffer, 0, s);
        else if (this.webGl) {
            if (this.focusDimWebGlBuffer ??= this.webGl.createBuffer(),
            !this.focusDimWebGlBuffer)
                return this.focusDimVertexCount = 0,
                !1;
            this.webGl.bindBuffer(this.webGl.ARRAY_BUFFER, this.focusDimWebGlBuffer),
            this.webGl.bufferData(this.webGl.ARRAY_BUFFER, s, this.webGl.DYNAMIC_DRAW)
        }
        return this.focusDimVertexCount = s.length / 6,
        this.focusDimVertexCount > 0
    }
    buildGeometryCacheEntry(e) {
        if (!this.hasRenderBackend() || !this.board)
            return null;
        const n = this.options.activeSide
          , i = []
          , r = []
          , o = performance.now();
        try {
            this.options.activeSide = e,
            this.appendBoardGeometry(i, r, this.board)
        } finally {
            this.options.activeSide = n
        }
        const s = performance.now() - o;
        return (s >= 250 || i.length >= 2e6 || r.length >= 5e5) && console.info("[ViewBV Web] Geometry build", {
            side: e,
            ms: Math.round(s),
            triangleVertices: Math.floor(i.length / 6),
            screenLineVertices: Math.floor(r.length / 11),
            visibleLayers: this.options.visibleLayerIds.size,
            layerMode: this.options.layerModeEnabled
        }),
        this.createGeometryBuffer(i, r)
    }
    createGeometryBuffer(e, n=[], i=null) {
        if (!this.hasRenderBackend())
            return null;
        const r = []
          , o = [];
        try {
            r.push(...this.createTriangleListBufferBatches(e, 6, i)),
            o.push(...this.createTriangleListBufferBatches(n, 11, i))
        } catch (s) {
            return L(r, this.webGl),
            L(o, this.webGl),
            console.error("[ViewBV Web] Failed to create geometry buffers", {
                vertices: e.length / 6,
                screenLineVertices: n.length / 11,
                error: s
            }),
            null
        }
        return {
            batches: r,
            vertexCount: e.length / 6,
            screenLineBatches: o,
            screenLineVertexCount: n.length / 11
        }
    }
    createTriangleListBufferBatches(e, n, i) {
        if (!this.hasRenderBackend() || e.length === 0)
            return [];
        const r = 3
          , o = n * 4
          , s = this.device?.limits.maxBufferSize || Cs
          , a = Math.min(Cs, Math.max(o * r, Math.floor(s * .75)));
        let l = Math.max(r, Math.floor(a / o));
        l -= l % r;
        const c = l * n
          , d = [];
        for (let u = 0; u < e.length; u += c) {
            const h = Math.min(e.length, u + c)
              , f = new Float32Array(h - u);
            for (let y = u, x = 0; y < h; y += 1,
            x += 1)
                f[x] = e[y] ?? 0;
            if (f.length === 0)
                continue;
            let p = null
              , m = null;
            if (this.device)
                p = this.device.createBuffer({
                    size: f.byteLength,
                    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
                }),
                this.device.queue.writeBuffer(p, 0, f);
            else if (this.webGl) {
                if (m = this.webGl.createBuffer(),
                !m)
                    throw new Error("Could not create a WebGL geometry buffer.");
                this.webGl.bindBuffer(this.webGl.ARRAY_BUFFER, m),
                this.webGl.bufferData(this.webGl.ARRAY_BUFFER, f, this.webGl.STATIC_DRAW)
            }
            d.push({
                buffer: p,
                webGlBuffer: m,
                vertexCount: f.length / n,
                layerId: i
            })
        }
        return d
    }
    geometryCacheKeyForSide(e) {
        const n = this.currentBoardGeometryId()
          , i = this.options.layerModeEnabled ? "layer" : "compact"
          , r = Array.from(this.options.visibleLayerIds).sort( (s, a) => s - a).join(",")
          , o = this.options.drawPinPads ? this.options.hollowPinPads ? "hollow" : "detailed" : "simple";
        return `${n}|${i}|${e}|${r}|pads:${o}`
    }
    selectedNetGeometryKey() {
        return this.selectedNetGeometryKeyFor(this.options.selectedNet, this.useDistinctSelectedNetColor())
    }
    selectedNetGeometryKeyFor(e, n) {
        return `${this.geometryCacheKeyForSide(this.options.activeSide)}|net:${e}|mode:${this.layerStylingActive() ? "layer" : "highlight"}|top:${this.options.topLayerId ?? "none"}|distinct:${n ? 1 : 0}`
    }
    highlightedPartNetGeometryKey() {
        const e = Array.from(this.options.highlightedPartNetNames).sort().join("");
        return `${this.geometryCacheKeyForSide(this.options.activeSide)}|part-nets:${e}|selected:${this.options.selectedNet}`
    }
    currentBoardGeometryId() {
        if (!this.board)
            return 0;
        let e = this.boardGeometryIds.get(this.board);
        return e === void 0 && (e = this.nextBoardGeometryId,
        this.nextBoardGeometryId += 1,
        this.boardGeometryIds.set(this.board, e)),
        e
    }
    scheduleGeometryPrewarm(e) {
        if (!this.board || !this.hasRenderBackend())
            return;
        const n = this.geometryCacheKeyForSide(e)
          , i = this.geometryCacheGeneration;
        this.scheduleComponentFramePrewarm(e, i),
        !(!this.layerStylingActive() && this.geometryCache.has(n)) && window.setTimeout( () => {
            if (!this.board || !this.hasRenderBackend() || i !== this.geometryCacheGeneration)
                return;
            if (this.prewarmSideLookupCaches(e),
            this.layerStylingActive()) {
                if (!this.shouldPrewarmGeometry(e, n))
                    return;
                this.ensureLayerViewGeometry(e);
                return
            }
            if (this.geometryCache.has(n))
                return;
            const r = this.buildGeometryCacheEntry(e);
            r && i === this.geometryCacheGeneration ? this.geometryCache.set(n, r) : r && (L(r.batches, this.webGl),
            L(r.screenLineBatches, this.webGl))
        }
        , 0)
    }
    scheduleComponentFramePrewarm(e, n) {
        const i = this.board;
        if (!i)
            return;
        const r = this.componentFrameCacheForSide(e);
        if (!r || r.size >= i.components.length)
            return;
        const o = `${this.currentBoardGeometryId()}|frames|${e}|generation:${n}`;
        if (this.componentFramePrewarmKeys.has(o))
            return;
        this.componentFramePrewarmKeys.add(o);
        let s = 0;
        const a = () => {
            if (this.board !== i || n !== this.geometryCacheGeneration) {
                this.componentFramePrewarmKeys.delete(o);
                return
            }
            const l = performance.now() + 5
              , c = this.options.activeSide;
            try {
                for (this.options.activeSide = e; s < i.components.length && (s === 0 || performance.now() < l); ) {
                    const d = i.components[s++];
                    r.has(d.id) || r.set(d.id, this.computeComponentDisplayFrame(d)),
                    this.prewarmComponentTextWidths(d)
                }
            } finally {
                this.options.activeSide = c
            }
            s < i.components.length ? window.setTimeout(a, 0) : this.componentFramePrewarmKeys.delete(o)
        }
        ;
        window.setTimeout(a, 0)
    }
    prewarmComponentTextWidths(e) {
        const n = this.labelContext;
        if (n) {
            e.name && this.componentVisibleOnSide(e) && Dn(n, e.name);
            for (const i of e.pads)
                !i || i.suppressVisual || !this.padVisible(i) || (i.name && Dn(n, i.name),
                this.options.showPinNetLabels && i.net.trim() !== "" && Dn(n, Ws(i.net)))
        }
    }
    prewarmSideLookupCaches(e) {
        const n = this.options.activeSide;
        try {
            if (this.options.activeSide = e,
            this.visibleGraphicsForCurrentView(),
            this.outlineBoundsForSide(e),
            this.labelContext && this.board)
                for (const i of this.board.texts)
                    i.text && this.textVisible(i) && Dn(this.labelContext, i.text)
        } finally {
            this.options.activeSide = n
        }
    }
    shouldPrewarmGeometry(e, n) {
        if (!this.board || !this.options.layerModeEnabled || !this.hasLayerData() || !this.shouldLimitLayerPrewarmForDevice())
            return !0;
        const i = this.estimateLayerGeometryCost(e);
        return i.items <= ad && i.cost <= sd ? !0 : (this.skippedPrewarmKeys.has(n) || (this.skippedPrewarmKeys.add(n),
        console.info("[ViewBV Web] Skipping heavy layer prewarm on a constrained device", {
            side: e,
            items: i.items,
            cost: i.cost,
            visibleLayers: this.options.visibleLayerIds.size
        })),
        !1)
    }
    shouldLimitLayerPrewarmForDevice() {
        const e = navigator.deviceMemory;
        return typeof e == "number" && e > 0 && e <= 4 ? !0 : window.matchMedia("(hover: none) and (pointer: coarse)").matches && Math.min(window.innerWidth, window.innerHeight) <= 900
    }
    estimateLayerGeometryCost(e) {
        if (!this.board)
            return {
                items: 0,
                cost: 0
            };
        let n = 0
          , i = 0;
        for (const r of this.board.graphics) {
            if (!this.graphicVisibleOnSide(r, e))
                continue;
            const o = r.sourceNegative ? "negative" : r.filled ? "filled" : "strokes"
              , s = this.geometryLayerId(r.layerId, r.layer);
            this.geometryCache.has(this.layerGeometryCacheKey(e, s, o)) || (n += 1,
            i += Cd(r))
        }
        for (const r of this.board.tracks) {
            if (!this.layerNameVisibleOnSide(r.layer, e))
                continue;
            const o = this.geometryLayerId(-1, r.layer);
            this.geometryCache.has(this.layerGeometryCacheKey(e, o, "tracks")) || (n += 1,
            i += 70)
        }
        for (const r of this.board.zones) {
            if (!this.layerNameVisibleOnSide(r.layer, e))
                continue;
            const o = this.geometryLayerId(-1, r.layer);
            this.geometryCache.has(this.layerGeometryCacheKey(e, o, "zones")) || (n += 1,
            i += Math.max(12, r.outline.length * 6))
        }
        this.board.vias.length > 0 && !this.geometryCache.has(this.layerGeometryCacheKey(e, null, "vias")) && (n += this.board.vias.length,
        i += this.board.vias.length * 48);
        for (const r of this.board.components)
            for (const o of r.pads) {
                if (!o || o.suppressVisual || !this.padVisibleOnSide(o, e))
                    continue;
                const s = this.geometryCache.has(this.layerGeometryCacheKey(e, o.layerId, "pads"))
                  , a = this.geometryCache.has(this.layerGeometryCacheKey(e, o.layerId, "pad-holes"));
                s && a || (n += 1,
                i += Sd(o))
            }
        return {
            items: n,
            cost: i
        }
    }
    visibleGraphicsForCurrentView() {
        if (!this.board)
            return {
                positive: [],
                negative: [],
                outlines: []
            };
        const e = `${this.geometryCacheKeyForSide(this.options.activeSide)}|visible-graphics`
          , n = this.visibleGraphicsCache.get(e);
        if (n)
            return n;
        const i = {
            positive: [],
            negative: [],
            outlines: []
        };
        for (const r of this.board.graphics)
            this.graphicVisible(r) && (this.shouldDrawBoardOutlineStroke(r) && i.outlines.push(r),
            r.sourceNegative ? i.negative.push(r) : i.positive.push(r));
        return this.visibleGraphicsCache.set(e, i),
        i
    }
    appendBoardGeometry(e, n, i) {
        this.appendSyntheticBoardFill(e, i),
        this.appendBoardLayerPass(e, n, i, !1),
        this.appendBoardLayerPass(e, n, i, !0),
        this.appendStandaloneBoardDrillHoles(e, i),
        this.appendViaDrillHoles(e, i),
        this.appendBoardHoleGraphics(e, n)
    }
    appendBoardLayerPass(e, n, i, r) {
        if (r && !this.isManualTopLayerActiveForCurrentView())
            return;
        for (const s of i.zones)
            !this.layerNameVisible(s.layer) || this.itemOnTopLayer(-1, s.layer) !== r || at(e, s.outline, se(this.colorForLayerName(s.layer, !0), .34));
        if (!r)
            for (const s of i.vias)
                this.appendVia(e, s);
        const o = this.visibleGraphicsForCurrentView().positive;
        for (const s of o)
            this.itemOnTopLayer(s.layerId, s.layer) !== r || !s.filled || this.appendGraphic(e, n, s, this.colorForGraphic(s, this.layerById(s.layerId)));
        for (const s of o)
            this.itemOnTopLayer(s.layerId, s.layer) !== r || s.filled || this.appendGraphic(e, n, s, this.colorForGraphic(s, this.layerById(s.layerId)));
        for (const s of i.tracks)
            !this.layerNameVisible(s.layer) || this.itemOnTopLayer(-1, s.layer) !== r || vt(e, s.x1, s.y1, s.x2, s.y2, Math.max(s.width, this.defaultStroke()), this.colorForLayerName(s.layer, !1));
        this.appendComponentPadsInBackgroundOrder(e, n, i, s => this.itemOnTopLayer(s.layerId) === r)
    }
    appendBoardLayerGeometry(e, n, i, r, o) {
        if (o === "zones") {
            for (const a of i.zones)
                this.geometryLayerId(-1, a.layer) !== r || !this.layerNameVisible(a.layer) || at(e, a.outline, se(this.colorForLayerName(a.layer, !0), .34));
            return
        }
        const s = this.layerGraphicRefs(i, r);
        if (o === "filled" || o === "strokes") {
            const a = o === "filled" ? s.filled : s.strokes;
            for (const l of a)
                this.graphicVisible(l) && this.appendGraphic(e, n, l, this.colorForGraphic(l, this.layerById(r)));
            return
        }
        if (o === "tracks") {
            for (const a of i.tracks)
                this.geometryLayerId(-1, a.layer) !== r || !this.layerNameVisible(a.layer) || vt(e, a.x1, a.y1, a.x2, a.y2, Math.max(a.width, this.defaultStroke()), this.colorForLayerName(a.layer, !1));
            return
        }
        for (const a of i.components)
            this.isBroadStandaloneBackgroundPadComponent(a) || this.appendPads(e, n, a, l => l.layerId === r)
    }
    appendComponentPadsInBackgroundOrder(e, n, i, r) {
        for (const o of [!1, !0])
            for (const s of i.components)
                this.isBroadStandaloneBackgroundPadComponent(s) === o && this.appendPads(e, n, s, r)
    }
    appendStandaloneBackgroundPads(e, n, i) {
        for (const r of i.components)
            this.isBroadStandaloneBackgroundPadComponent(r) && this.appendPads(e, n, r, () => !0)
    }
    appendBoardLayerHoleGeometry(e, n, i, r, o) {
        if (o === "pad-holes") {
            this.appendStandaloneBoardDrillHoles(e, i, s => s.layerId === r);
            return
        }
        for (const s of this.layerGraphicRefs(i, r).negative)
            this.graphicVisible(s) && this.appendNegativeGraphic(e, n, s)
    }
    geometryLayerId(e, n) {
        return e >= 0 && this.layerById(e) ? e : this.layerByNameOrRole(n)?.id ?? -1
    }
    layerGraphicRefs(e, n) {
        let i = this.layerGraphicRefsByBoard.get(e);
        if (!i) {
            i = new Map;
            for (const r of e.graphics) {
                const o = this.geometryLayerId(r.layerId, r.layer);
                let s = i.get(o);
                s || (s = {
                    filled: [],
                    strokes: [],
                    negative: []
                },
                i.set(o, s)),
                r.sourceNegative ? s.negative.push(r) : r.filled ? s.filled.push(r) : s.strokes.push(r)
            }
            this.layerGraphicRefsByBoard.set(e, i)
        }
        return i.get(n) ?? {
            filled: [],
            strokes: [],
            negative: []
        }
    }
    appendBoardHoleGraphics(e, n) {
        for (const i of this.visibleGraphicsForCurrentView().negative)
            this.appendNegativeGraphic(e, n, i)
    }
    appendNegativeGraphic(e, n, i) {
        if (this.shouldUseScreenLineStroke(i)) {
            this.appendScreenLineGraphic(n, i, w.hole);
            return
        }
        const r = this.graphicStrokeWorld(i);
        switch (i.type) {
        case "line":
            vt(e, i.x1, i.y1, i.x2, i.y2, r, w.hole);
            break;
        case "circle":
            me(e, i.cx, i.cy, i.radius, w.hole, Ie(360));
            break;
        case "arc":
            Dr(e, i.cx, i.cy, i.radius, i.startAngle, i.endAngle, r, w.hole);
            break;
        case "polygon":
            md(e, i.points, w.hole);
            break
        }
    }
    appendSelectedNetGeometry(e, n, i, r, o=w.selectedNet) {
        const s = this.selectedNetUsesCanonicalLayerGraphics(i);
        if (!s)
            for (const a of i.zones) {
                if (!this.layerNameVisible(a.layer))
                    continue;
                const l = r ? Wn(this.colorForLayerName(a.layer, !0, !1), !0) : o;
                at(e, a.outline, l)
            }
        for (const a of ["fill", "stroke"])
            for (const l of i.graphics) {
                if (l.sourceNegative || !this.graphicVisible(l) || this.selectedNetGraphicDrawPhase(l) !== a)
                    continue;
                const c = r ? this.selectedTraceBodyColor(l) : o;
                this.appendSelectedNetGraphic(e, n, l, c)
            }
        if (!s) {
            for (const a of i.tracks) {
                if (!this.layerNameVisible(a.layer))
                    continue;
                const l = r ? Wn(this.colorForLayerName(a.layer, !1, !1), !1) : o;
                vt(e, a.x1, a.y1, a.x2, a.y2, Math.max(a.width, this.defaultStroke()), l)
            }
            if (this.shouldDrawStandaloneViaHighlights())
                for (const a of i.vias)
                    this.appendHighlightedViaGeometry(e, a, o)
        }
        for (const a of i.pads)
            !this.padVisible(a.pad) || a.pad.suppressVisual || this.appendHighlightedPadGeometry(e, a.component, a.pad, o)
    }
    selectedNetUsesCanonicalLayerGraphics(e) {
        return this.layerStylingActive() && e.graphics.length > 0
    }
    selectedNetGraphicDrawPhase(e) {
        return e.filled && (e.type === "circle" || e.type === "polygon") && !this.shouldHighlightGraphicAsStrokeOnly(e) ? "fill" : "stroke"
    }
    appendSelectedNetGraphic(e, n, i, r) {
        if (!this.shouldHighlightGraphicAsStrokeOnly(i)) {
            this.appendGraphic(e, n, i, r);
            return
        }
        const o = this.graphicStrokeWorld(i);
        if (i.type === "circle") {
            As(e, i.cx, i.cy, i.radius, o, r, 64);
            return
        }
        if (i.type === "polygon") {
            nn(e, i.points, o, r, !0);
            for (const s of i.holes)
                nn(e, s, o, r, !0)
        }
    }
    shouldHighlightGraphicAsStrokeOnly(e) {
        return this.isFabmasterBoard() && this.layerStylingActive() && e.filled && (e.type === "polygon" || e.type === "circle") && this.isTraceFocusGraphic(e)
    }
    appendHighlightedViaGeometry(e, n, i) {
        if (!this.layerVisible(-1))
            return;
        const r = Math.max(n.outerDiameter * .5, this.defaultStroke() * 2);
        me(e, n.x, n.y, r, i, 32)
    }
    appendHighlightedPadGeometry(e, n, i, r) {
        const o = this.displayedFallbackPadPoints(n, i);
        if (o) {
            at(e, o, r);
            return
        }
        if (this.shouldDisplayPadOutline(i)) {
            i.outlineOnly ? nn(e, i.outline, this.defaultStroke(), r, !0) : Ms(e, i.outline, r);
            return
        }
        const s = this.displayedRectanglePadPoints(i);
        if (s) {
            at(e, s, r);
            return
        }
        me(e, i.x, i.y, this.displayedPadOverlayCircleRadius(i), r, 48)
    }
    appendSyntheticBoardFill(e, n) {}
    buildSyntheticBoardFillLoops(e) {
        const n = []
          , i = []
          , r = jd(e);
        for (const s of e.graphics)
            if (!(s.layer !== "edge-cuts" || !this.graphicBelongsToSideForOutline(s, this.options.activeSide))) {
                if (s.type === "polygon" && s.points.length >= 3) {
                    n.push(Pt(s.points));
                    for (const a of s.holes)
                        a.length >= 3 && n.push(Pt(a));
                    continue
                }
                if (s.type === "circle" && s.radius > 0) {
                    n.push(Rt(s.cx, s.cy, s.radius, co(360)));
                    continue
                }
                if (s.type === "arc" && mn(s)) {
                    n.push(Rt(s.cx, s.cy, s.radius, co(360)));
                    continue
                }
                (s.type === "line" || s.type === "arc") && ve(s) && (i.some(l => Qd(l.graphic, s, r)) || i.push({
                    graphic: s
                }))
            }
        const o = new Set;
        for (let s = 0; s < i.length; ++s) {
            if (o.has(s))
                continue;
            const a = ve(i[s].graphic);
            if (!a)
                continue;
            const l = a.start;
            let c = a.end;
            const d = [{
                graphic: i[s].graphic,
                reverse: !1
            }];
            o.add(s);
            let u = !1;
            for (; ; ) {
                if (d.length > 1 && Ct(c, l, r)) {
                    u = !0;
                    break
                }
                let p = -1
                  , m = !1
                  , y = Number.POSITIVE_INFINITY;
                for (let v = 0; v < i.length; ++v) {
                    if (o.has(v))
                        continue;
                    const C = ve(i[v].graphic);
                    if (!C)
                        continue;
                    const T = Ge(C.start, c);
                    T <= r * r && T < y && (p = v,
                    m = !1,
                    y = T);
                    const S = Ge(C.end, c);
                    S <= r * r && S < y && (p = v,
                    m = !0,
                    y = S)
                }
                if (p < 0)
                    break;
                const x = i[p].graphic
                  , B = ve(x);
                if (!B)
                    break;
                o.add(p),
                d.push({
                    graphic: x,
                    reverse: m
                }),
                c = m ? B.start : B.end
            }
            const h = Pt(Jd(l, d))
              , f = Ea(h);
            !u && !this.shouldCloseOpenXzzBoardFillChain(e, d.length, f) || h.length >= 3 && f.valid && f.areaAbs > 1 && n.push(h)
        }
        return iu(n, r)
    }
    shouldCloseOpenXzzBoardFillChain(e, n, i) {
        if (e.metadata.sourceFormat !== "XZZPCB" || !e.metadata.xzzVerticalDualLayout || n < 8 || !i.valid)
            return !1;
        const r = this.outlineBoundsForSide(this.options.activeSide);
        if (!r)
            return !1;
        const o = Math.max(0, r.maxX - r.minX)
          , s = Math.max(0, r.maxY - r.minY);
        if (o <= 1 || s <= 1)
            return !1;
        const a = Math.max(0, i.maxX - i.minX)
          , l = Math.max(0, i.maxY - i.minY);
        return a >= o * .7 && l >= s * .7
    }
    shouldUseScreenLineStroke(e) {
        return e.lineWidth <= 0 && !e.filled && e.layer !== "edge-cuts" && this.usesScreenFixedZeroWidthGraphicStrokes()
    }
    appendScreenLineGraphic(e, n, i) {
        const r = this.zeroWidthGraphicStrokeScreenPx(n.layer);
        switch (n.type) {
        case "line":
            so(e, [n.x1, n.y1], [n.x2, n.y2], i, r);
            break;
        case "circle":
            yt(e, Rt(n.cx, n.cy, n.radius, Ie(360)), i, r, !0);
            break;
        case "arc":
            yt(e, dt(n), i, r, mn(n));
            break;
        case "polygon":
            yt(e, n.points, i, r, !0);
            for (const o of n.holes)
                yt(e, o, i, r, !0);
            break
        }
    }
    appendGraphic(e, n, i, r) {
        if (i.layer === "edge-cuts")
            return;
        if (this.shouldUseScreenLineStroke(i)) {
            this.appendScreenLineGraphic(n, i, r);
            return
        }
        const o = this.graphicStrokeWorld(i)
          , s = i.filled && (i.layer !== "edge-cuts" || Ii.enableBoardFill)
          , a = !i.filled || i.lineWidth > 0;
        switch (i.type) {
        case "line":
            vt(e, i.x1, i.y1, i.x2, i.y2, o, r);
            break;
        case "circle":
            s && me(e, i.cx, i.cy, i.radius, r, Ie(360)),
            a && As(e, i.cx, i.cy, i.radius, o, r, 64);
            break;
        case "arc":
            Dr(e, i.cx, i.cy, i.radius, i.startAngle, i.endAngle, o, r);
            break;
        case "polygon":
            if (s && tr(e, i.points, i.holes, r),
            a) {
                nn(e, i.points, o, r, !0);
                for (const l of i.holes)
                    nn(e, l, o, r, !0)
            }
            break
        }
    }
    appendVia(e, n) {
        if (!this.shouldDrawNeutralViaBodies())
            return;
        const i = Math.max(n.outerDiameter * .5, this.defaultStroke() * 2);
        me(e, n.x, n.y, i, w.pinsPads, 32)
    }
    appendViaDrillHoles(e, n, i=!0) {
        if (!(this.options.hollowPinPads || !n.metadata.renderViaDrillHoles || i && !this.activeSideViaCopperLayerVisible()))
            for (const r of n.vias)
                r.drillDiameter <= 0 || me(e, r.x, r.y, r.drillDiameter * .5, w.hole, Ie(360))
    }
    appendStandaloneBoardDrillHoles(e, n, i=null) {
        if (!this.options.hollowPinPads)
            for (const r of n.components)
                for (const o of r.pads)
                    !o || i && !i(o) || o.type !== "through-hole" || o.drillDiameter <= 0 || !this.padVisible(o) || this.isComponentThroughHoleDrill(r, o) || me(e, o.x, o.y, o.drillDiameter * .5, w.hole, Ie(360))
    }
    isComponentThroughHoleDrill(e, n) {
        return !(n.type !== "through-hole" || this.shouldSuppressComponentBBox(e) || e.pads.filter(r => r && r.type === "through-hole" && !r.suppressVisual && (r.side === this.options.activeSide || r.type === "through-hole")).length <= 1 && e.pads.length <= 1)
    }
    shouldDrawNeutralViaBodies() {
        const e = this.board?.metadata.sourceFormat;
        return this.layerStylingActive() && (e === "ALLEGRO" || e === "XZZPCB") ? !1 : !this.hasLayerData() || e !== "GENCAD"
    }
    activeSideViaCopperLayerVisible() {
        return this.sideViaCopperLayerVisible(this.options.activeSide)
    }
    sideViaCopperLayerVisible(e) {
        const n = this.sideCopperLayer(e);
        return !n || this.layerVisible(n.id)
    }
    activeSideCopperLayer() {
        return this.sideCopperLayer(this.options.activeSide)
    }
    sideCopperLayer(e) {
        if (!this.board)
            return;
        const n = e === "T" ? "front-copper" : "back-copper";
        return this.board.layers.find(i => i.role === n && (i.side === "" || i.side === e))
    }
    appendPads(e, n, i, r) {
        for (const o of i.pads) {
            if (!this.padVisible(o) || o.suppressVisual || !r(o))
                continue;
            const s = this.colorForPad(o)
              , a = ao(i, o, this.options.activeSide, this.options.drawPinPads, this.board?.metadata.sourceFormat ?? "");
            if (a) {
                this.options.hollowPinPads ? yt(n, a, s, 1, !0) : at(e, a, s),
                !this.options.hollowPinPads && Ii.paintComponentDrills;
                continue
            }
            if (lo(o, this.options.drawPinPads)) {
                !o.outlineOnly && !this.options.hollowPinPads ? Ms(e, o.outline, s) : this.options.hollowPinPads ? yt(n, o.outline, s, 1, !0) : nn(e, o.outline, this.defaultStroke(), s, !0);
                continue
            }
            const l = Gs(o, this.options.drawPinPads, this.board?.metadata.sourceFormat ?? "");
            if (l) {
                this.options.hollowPinPads ? yt(n, l, s, 1, !0) : at(e, l, s),
                !this.options.hollowPinPads && Ii.paintComponentDrills;
                continue
            }
            const c = ft(o, this.options.drawPinPads, this.board?.metadata.sourceFormat ?? "")
              , d = this.board?.metadata.sourceFormat === "GENCAD" && o.outlineOnly && o.type === "through-hole" && o.drillDiameter <= 0
              , u = this.options.hollowPinPads || !this.options.drawPinPads || o.outlineOnly && o.type === "through-hole";
            if (d) {
                const h = c * .55
                  , f = (c + h) * .5;
                Dr(e, o.x, o.y, f, 0, 360, c - h, s)
            } else
                u ? yt(n, Rt(o.x, o.y, c, 48), s, 1, !0) : me(e, o.x, o.y, c, s, 48);
            !this.options.hollowPinPads && Ii.paintComponentDrills
        }
    }
    colorForGraphic(e, n, i=!0) {
        const r = (o, s, a) => i ? this.applyManualTopLayerDim(o, s, a) : o;
        if (e.layer === "edge-cuts")
            return e.filled ? w.boardFill : w.boardOutline;
        if (this.layerStylingActive()) {
            if (n?.hasExplicitColors) {
                const s = e.filled ? n.padColor !== 0 ? n.padColor : n.lineColor : n.lineColor !== 0 ? n.lineColor : n.padColor;
                if (s !== 0)
                    return r(on(gt(s, 1), n.role, e.filled), e.layerId, n.role)
            }
            if (n?.hasExplicitColors && n.lineColor !== 0)
                return r(on(gt(n.lineColor, 1), e.layer, e.filled), e.layerId, e.layer);
            const o = this.generatedLayerColorForLayer(n, e.filled) ?? this.generatedLayerColor(e, e.filled);
            if (o)
                return r(o, e.layerId, e.layer)
        }
        return r(e.filled ? w.pinsPads : w.pinLabelText, e.layerId, e.layer)
    }
    colorForText(e) {
        const n = this.layerById(e.layerId);
        if (this.layerStylingActive() && n?.hasExplicitColors) {
            const r = n.lineColor !== 0 || n.padColor === 0 ? n.lineColor : n.padColor;
            if (r !== 0) {
                const o = this.applyManualTopLayerDim(on(gt(r, 1), e.layer, !1), e.layerId, e.layer);
                return this.dimOverlayColorForNetFocus(o)
            }
        }
        if (e.layer === "edge-cuts")
            return this.dimOverlayColorForNetFocus(w.boardOutline);
        const i = this.layerStylingActive() ? on(w.pinLabelText, e.layer, !1) : w.pinLabelText;
        return this.dimOverlayColorForNetFocus(this.applyManualTopLayerDim(i, e.layerId, e.layer))
    }
    colorForLayerName(e, n, i=!0) {
        const r = (a, l, c) => i ? this.applyManualTopLayerDim(a, l, c) : a
          , o = this.layerByNameOrRole(e);
        if (this.layerStylingActive() && o?.hasExplicitColors) {
            const a = n ? o.padColor !== 0 ? o.padColor : o.lineColor : o.lineColor !== 0 ? o.lineColor : o.padColor;
            if (a !== 0) {
                const l = on(gt(a, 1), o.role, n);
                return r(l, o.id, o.role)
            }
        }
        const s = this.layerStylingActive() ? this.generatedLayerColorForLayer(o, n) : null;
        return r(s || (n ? w.pinsPads : w.pinLabelText), o?.id ?? -1, e)
    }
    colorForPad(e, n=!0) {
        let i = w.pinsPads;
        if (this.layerStylingActive() && this.board) {
            const o = this.layerById(e.layerId);
            if (o?.hasExplicitColors && o.padColor !== 0)
                i = gt(o.padColor, 1);
            else {
                const s = this.generatedLayerColorForLayer(o, !0);
                s && (i = s)
            }
        }
        i = Ur(i, this.layerRoleForId(e.layerId));
        let r = null;
        if (e.testPinColorCandidate ? r = this.specialPadColorForActiveSide(w.testPin, !1) : e.renderClass === "ground" || he(e.net) ? r = this.specialPadColorForActiveSide(w.ground, !0) : e.renderClass === "no-connect" && (r = this.specialPadColorForActiveSide(w.noConnect, !0)),
        r)
            return n ? this.applyManualTopLayerDim(r.color, r.layerId, r.role) : r.color;
        if (e.type === "through-hole" && e.side !== this.options.activeSide) {
            const o = fe(i, .72);
            return n ? this.applyManualTopLayerDim(o, e.layerId, this.layerRoleForId(e.layerId)) : o
        }
        return n ? this.applyManualTopLayerDim(i, e.layerId, this.layerRoleForId(e.layerId)) : i
    }
    specialPadColorForActiveSide(e, n) {
        const i = this.options.activeSide === "T" ? "front-copper" : "back-copper"
          , r = this.activeSideCopperLayer();
        let o = Ur(e, i);
        if (n && this.layerStylingActive() && r?.hasExplicitColors && r.padColor !== 0) {
            const s = Ur(gt(r.padColor, 1), i);
            o = se(lt(s, o, .22), e[3])
        }
        return {
            color: o,
            layerId: r?.id ?? -1,
            role: i
        }
    }
    componentDisplayFrame(e) {
        const n = this.componentFrameCacheForSide(this.options.activeSide)
          , i = n?.get(e.id);
        if (i)
            return i;
        const r = this.computeComponentDisplayFrame(e);
        return n?.set(e.id, r),
        r
    }
    componentFrameCacheForSide(e) {
        if (!this.board)
            return null;
        let n = this.componentFrameCachesByBoard.get(this.board);
        return n || (n = {
            B: new Map,
            T: new Map
        },
        this.componentFrameCachesByBoard.set(this.board, n)),
        n[e]
    }
    computeComponentDisplayFrame(e) {
        if (e.bodyBoundsOk && (this.isTvwMechanicalHoleComponent(e) || this.isTvwBodyDecalComponent(e)))
            return {
                bounds: {
                    minX: e.bodyMinX,
                    minY: e.bodyMinY,
                    maxX: e.bodyMaxX,
                    maxY: e.bodyMaxY,
                    valid: !0
                },
                obb: null
            };
        const n = pe();
        for (const i of e.pads) {
            if (!i || i.suppressVisual || !this.padBelongsToSide(i, this.options.activeSide))
                continue;
            const r = Td(e, i, this.options.activeSide, this.options.drawPinPads, this.board?.metadata.sourceFormat ?? "");
            r.valid && Ce(n, r.minX, r.minY, r.maxX, r.maxY)
        }
        return !n.valid && e.visualCenterOk && Ce(n, e.visualCenterX - 5, e.visualCenterY - 5, e.visualCenterX + 5, e.visualCenterY + 5),
        {
            bounds: n,
            obb: this.shouldForceAxisAlignedFzCaeBBox(e) ? null : this.computeComponentObb(e)
        }
    }
    shouldForceAxisAlignedFzCaeBBox(e) {
        if (!this.isFzCaeBoard())
            return !1;
        const n = Math.PI * .5
          , i = Math.abs(e.angle) * Math.PI / 180 % n;
        if (i > .001 && Math.abs(i - n) > .001)
            return !1;
        if (this.hasSparseFzCaeUnconnectedMountingPads(e))
            return !0;
        let r = 0
          , o = Number.POSITIVE_INFINITY
          , s = 0;
        for (const a of e.pads) {
            if (!a || !this.padBelongsToSide(a, this.options.activeSide))
                continue;
            if (a.type !== "smd" || !he(a.net))
                return !1;
            r += 1;
            const l = Math.max(a.radius, .5);
            o = Math.min(o, l),
            s = Math.max(s, l)
        }
        return r >= 16 && r <= 64 && Number.isFinite(o) && s <= o * 1.15
    }
    hasSparseFzCaeUnconnectedMountingPads(e) {
        const n = [];
        let i = 0;
        for (const a of e.pads)
            if (this.padBelongsToSide(a, this.options.activeSide)) {
                if (n.length === 6 || a.net !== "" || a.outline.length !== 0 || a.radius <= 0 || a.type !== "smd" && a.type !== "through-hole")
                    return !1;
                n.push(a),
                i = Math.max(i, a.radius * 2, a.width, a.height)
            }
        if (n.length < 2)
            return !1;
        const r = (i * 6) ** 2
          , o = (i * 8) ** 2;
        let s = 0;
        for (let a = 0; a < n.length; a += 1) {
            const l = n[a];
            for (let c = a + 1; c < n.length; c += 1) {
                const d = n[c]
                  , u = l.x - d.x
                  , h = l.y - d.y
                  , f = u * u + h * h;
                if (f < r)
                    return !1;
                s = Math.max(s, f)
            }
        }
        return s >= o
    }
    computeComponentObb(e) {
        const n = this.componentFramePoints(e);
        if (n.length === 0)
            return null;
        const i = this.isTvwBoard()
          , r = this.isTopTestBoard()
          , o = this.isBvBoard()
          , s = this.isBvRawBoard()
          , a = e.pads.filter(I => I && !I.suppressVisual && this.padBelongsToSide(I, this.options.activeSide));
        if (this.hasSparseGenCadUnconnectedMountingPads(e))
            return null;
        const l = Se(e.angle * Math.PI / 180)
          , c = Yr(l)
          , d = this.board?.metadata.sourceFormat === "XZZPCB" ? Nd(a) : null
          , u = kd(a);
        if (c && this.hasSparseGenCadMountingPattern(e, a, u))
            return null;
        const h = Id(e, u, d);
        let f = null
          , p = null
          , m = Number.POSITIVE_INFINITY
          , y = Number.POSITIVE_INFINITY
          , x = Number.POSITIVE_INFINITY;
        for (const I of h) {
            const D = Hr(n, I);
            if (!D)
                continue;
            const Me = D.hw * D.hh * 4
              , qe = Se(I);
            Math.abs(qe) < 1e-4 && (x = Me),
            Yr(qe) && Me < y && (y = Me,
            p = D),
            Me < m && (m = Me,
            f = D)
        }
        if (!f)
            return null;
        const B = m;
        let v = !1
          , C = Yr(f.angle);
        if (!C && this.shouldForceAxisAlignedGenCadConnectorBBox(e))
            return null;
        if (i && (!C && p && m > y * .92 && (f = p,
        m = y,
        C = !0),
        a.length > 0 && a.length <= 6 && a.every(D => D.type === "through-hole") && c)) {
            const D = Hr(n, l);
            D && (f = D,
            m = D.hw * D.hh * 4,
            C = !0)
        }
        r && c && !C && p && m > y * .7 && this.hasTopTestCardinalBodyPadEnvelope(e, a) && (f = p,
        m = y,
        C = !0);
        const T = r ? this.topTestDensePadRowAngle(e, a) : null;
        if (T !== null && Math.abs(T - Math.round(T / (Math.PI * .5)) * (Math.PI * .5)) > Math.PI / 720 && p) {
            const I = Hr(n, T);
            if (I) {
                const D = I.hw * I.hh * 4;
                D <= y * 1.08 && D <= B * 1.08 && (f = I,
                m = D,
                C = !1,
                v = !0)
            }
        }
        if (this.isGenCadBoard() && c && !C && p && m > y * .7 && (this.hasStrongCardinalSmdPadRun(a) || this.hasCompactCardinalSmdPadRowsOnBothAxes(a)) && (f = p,
        m = y,
        C = !0),
        (o || s) && c && !C && p && (m > y * .7 && (this.hasStrongCardinalSmdPadRun(a) || this.hasSparseBvThroughHoleCardinalSignalRun(a)) || o && this.hasLegacyBvSparseConnectorCardinalPadRun(e, a)) && (f = p,
        m = y,
        C = !0),
        this.isAllegroBoard() && c && !C && p) {
            const I = Math.max(.001, Math.min(f.hw, f.hh));
            Math.max(f.hw, f.hh) / I <= 1.2 && (f = p,
            m = y,
            C = !0)
        }
        const S = Se(f.angle);
        return Math.abs(S) < 1e-4 || Math.abs(S - Math.PI * .5) < 1e-4 || !v && Number.isFinite(x) && m > x * .95 ? null : (f.hw < f.hh && (f = {
            cx: f.cx,
            cy: f.cy,
            hw: f.hh,
            hh: f.hw,
            angle: Se(f.angle + Math.PI * .5)
        }),
        f)
    }
    shouldForceAxisAlignedGenCadConnectorBBox(e) {
        if (!this.isGenCadBoard() || e.bodyBoundsOk || !Es(e.angle))
            return !1;
        const n = []
          , i = [];
        let r = 0
          , o = 0;
        for (const a of e.pads)
            if (this.padBelongsToSide(a, this.options.activeSide)) {
                if (a.type !== "smd" || a.outline.length !== 0)
                    return !1;
                if (a.renderClass === "no-connect") {
                    if (r += 1,
                    r > 2)
                        return !1;
                    continue
                }
                if (a.renderClass === "normal" && (o += 1),
                n.push(a.x),
                i.push(a.y),
                n.length > 12)
                    return !1
            }
        if (r === 0 || o < 2 || n.length < 6)
            return !1;
        const s = a => {
            const l = a.slice().sort( (d, u) => d - u);
            let c = 0;
            for (let d = 0; d < l.length; ) {
                let u = d + 1;
                for (; u < l.length && l[u] - l[d] <= 2; )
                    u += 1;
                if (c += 1,
                u - d < 3 || c > 2)
                    return !1;
                d = u
            }
            return c === 2
        }
        ;
        return s(n) || s(i)
    }
    hasSparseGenCadUnconnectedMountingPads(e) {
        if (!this.isGenCadBoard() || e.bodyBoundsOk || !Es(e.angle) || e.pads.length < 2 || e.pads.length > 6)
            return !1;
        let n = 0;
        for (const a of e.pads) {
            if (a.net !== "" || a.outline.length !== 0 || a.radius <= 0)
                return !1;
            n = Math.max(n, a.radius * 2, a.width, a.height)
        }
        const i = n * 6
          , r = i * i
          , o = n * 8 * (n * 8);
        let s = 0;
        for (let a = 0; a < e.pads.length; ++a) {
            const l = e.pads[a];
            for (let c = a + 1; c < e.pads.length; ++c) {
                const d = e.pads[c]
                  , u = l.x - d.x
                  , h = l.y - d.y
                  , f = u * u + h * h;
                if (f < r)
                    return !1;
                s = Math.max(s, f)
            }
        }
        return s >= o
    }
    hasSparseGenCadMountingPattern(e, n, i) {
        if (!this.isGenCadBoard() || e.bodyBoundsOk || n.length < 2 || n.length > 6 || !n.every(f => f.type === "through-hole"))
            return !1;
        let r = !1
          , o = !1
          , s = 0;
        for (const f of n) {
            if (f.outline.length !== 0 || f.renderClass === "normal")
                return !1;
            r ||= f.renderClass === "ground",
            o ||= f.renderClass === "no-connect",
            s = Math.max(s, f.radius * 2, f.width, f.height)
        }
        if (!r)
            return !0;
        if (!o || n.length < 3 || s <= 0)
            return !1;
        const a = Math.cos(i)
          , l = Math.sin(i);
        let c = Number.POSITIVE_INFINITY
          , d = Number.NEGATIVE_INFINITY
          , u = Number.POSITIVE_INFINITY
          , h = Number.NEGATIVE_INFINITY;
        for (const f of n) {
            const p = f.x * a + f.y * l
              , m = -f.x * l + f.y * a;
            c = Math.min(c, p),
            d = Math.max(d, p),
            u = Math.min(u, m),
            h = Math.max(h, m)
        }
        return Math.max(d - c, h - u) >= s * 8 && Math.min(d - c, h - u) >= s
    }
    componentFramePoints(e) {
        const n = [];
        for (const i of e.pads) {
            if (!i || i.suppressVisual || !this.padBelongsToSide(i, this.options.activeSide))
                continue;
            const r = Va(e, i, this.options.activeSide, this.options.drawPinPads, this.board?.metadata.sourceFormat ?? "");
            n.push(...r)
        }
        return n
    }
    hasTopTestCardinalBodyPadEnvelope(e, n) {
        if (!this.isTopTestBoard() || !e.bodyBoundsOk)
            return !1;
        let i = Number.POSITIVE_INFINITY
          , r = Number.POSITIVE_INFINITY
          , o = Number.NEGATIVE_INFINITY
          , s = Number.NEGATIVE_INFINITY;
        for (const v of n)
            i = Math.min(i, v.x),
            r = Math.min(r, v.y),
            o = Math.max(o, v.x),
            s = Math.max(s, v.y);
        if (n.length < 4 || !Number.isFinite(i))
            return !1;
        const a = Math.max(0, o - i)
          , l = Math.max(0, s - r)
          , c = Math.max(0, e.bodyMaxX - e.bodyMinX)
          , d = Math.max(0, e.bodyMaxY - e.bodyMinY);
        if (a <= 0 || l <= 0 || c <= 0 || d <= 0)
            return !1;
        const u = (i + o) * .5
          , h = (r + s) * .5
          , f = (e.bodyMinX + e.bodyMaxX) * .5
          , p = (e.bodyMinY + e.bodyMaxY) * .5
          , m = Math.max(8, c * .08)
          , y = Math.max(8, d * .08);
        if (Math.abs(u - f) > m || Math.abs(h - p) > y)
            return !1;
        const x = Math.max(8, c * .12)
          , B = Math.max(8, d * .12);
        return Math.abs(a - c) <= x && Math.abs(l - d) <= B
    }
    topTestDensePadRowAngle(e, n) {
        if (e.pads.length < 16)
            return null;
        const i = n.filter(S => S.type === "smd").map(S => ({
            x: S.x,
            y: S.y,
            u: 0,
            v: 0,
            radius: Math.max(S.radius, .5)
        }));
        if (i.length < 16)
            return null;
        let r = 0
          , o = 0;
        for (const S of i)
            r += S.x,
            o += S.y;
        r /= i.length,
        o /= i.length;
        let s = 0
          , a = 0
          , l = 0;
        for (const S of i) {
            const k = S.x - r
              , I = S.y - o;
            s += k * k,
            a += k * I,
            l += I * I
        }
        const c = .5 * Math.atan2(2 * a, s - l)
          , d = Math.cos(c)
          , u = Math.sin(c);
        let h = Number.POSITIVE_INFINITY
          , f = Number.NEGATIVE_INFINITY
          , p = Number.POSITIVE_INFINITY
          , m = Number.NEGATIVE_INFINITY;
        for (const S of i)
            S.u = (S.x - r) * d + (S.y - o) * u,
            S.v = -(S.x - r) * u + (S.y - o) * d,
            h = Math.min(h, S.u),
            f = Math.max(f, S.u),
            p = Math.min(p, S.v),
            m = Math.max(m, S.v);
        if (f - h < Math.max(1, m - p) * 3)
            return null;
        const y = i.map(S => S.radius).sort( (S, k) => S - k)
          , x = y[Math.floor(y.length / 2)]
          , B = Math.max(.5, x * .75);
        i.sort( (S, k) => S.v - k.v);
        const v = [];
        let C = 0;
        for (let S = 0; S < i.length; ) {
            let k = S + 1;
            for (; k < i.length && i[k].v - i[S].v <= B; )
                k += 1;
            if (k - S >= 8) {
                let I = 0
                  , D = 0
                  , Me = Number.POSITIVE_INFINITY
                  , qe = Number.NEGATIVE_INFINITY;
                for (let ot = S; ot < k; ot += 1) {
                    const Le = i[ot];
                    I += Le.x,
                    D += Le.y,
                    Me = Math.min(Me, Le.u),
                    qe = Math.max(qe, Le.u)
                }
                if (qe - Me >= x * 16) {
                    I /= k - S,
                    D /= k - S,
                    s = 0,
                    a = 0,
                    l = 0;
                    for (let Le = S; Le < k; Le += 1) {
                        const $t = i[Le]
                          , Vr = $t.x - I
                          , Er = $t.y - D;
                        s += Vr * Vr,
                        a += Vr * Er,
                        l += Er * Er
                    }
                    const ot = .5 * Math.atan2(2 * a, s - l);
                    v.push({
                        angle: Ed(ot - c),
                        padCount: k - S
                    }),
                    C += k - S
                }
            }
            S = k
        }
        if (C * 5 < i.length * 4)
            return null;
        v.sort( (S, k) => S.angle - k.angle || S.padCount - k.padCount);
        let T = 0;
        for (const S of v)
            if (T += S.padCount,
            T * 2 >= C)
                return c + S.angle;
        return null
    }
    hasCompactCardinalSmdPadRowsOnBothAxes(e) {
        if (e.length < 8 || e.length > 80 || e.some(m => m.type !== "smd"))
            return !1;
        let n = Number.POSITIVE_INFINITY
          , i = Number.POSITIVE_INFINITY
          , r = Number.NEGATIVE_INFINITY
          , o = Number.NEGATIVE_INFINITY;
        for (const m of e)
            n = Math.min(n, m.x),
            i = Math.min(i, m.y),
            r = Math.max(r, m.x),
            o = Math.max(o, m.y);
        const s = r - n
          , a = o - i;
        if (s <= 0 || a <= 0 || Math.max(s, a) / Math.max(.001, Math.min(s, a)) > 1.6)
            return !1;
        const l = [];
        for (let m = 0; m < e.length; m += 1) {
            const y = e[m];
            let x = Number.POSITIVE_INFINITY;
            for (let B = 0; B < e.length; B += 1) {
                if (m === B)
                    continue;
                const v = e[B]
                  , C = y.x - v.x
                  , T = y.y - v.y
                  , S = C * C + T * T;
                S > 1e-8 && (x = Math.min(x, S))
            }
            Number.isFinite(x) && l.push(Math.sqrt(x))
        }
        if (l.length === 0)
            return !1;
        l.sort( (m, y) => m - y);
        const c = l[Math.floor(l.length / 2)]
          , d = Math.min(4, Math.max(.5, c * .12));
        let u = 3;
        if (e.length <= 9) {
            const m = this.dominantElongatedSmdPadOutlineAngle(e)
              , y = Math.PI * .5;
            m !== null && Math.abs(m - Math.round(m / y) * y) <= Math.PI / 60 && (u = 2)
        }
        const h = m => {
            const y = m.slice().sort( (C, T) => C - T);
            let x = 0
              , B = 0
              , v = 0;
            for (let C = 1; C <= y.length; C += 1) {
                if (C < y.length && Math.abs(y[C] - y[v]) <= d)
                    continue;
                const T = C - v;
                T >= u && (x += 1,
                B += T),
                v = C
            }
            return {
                rows: x,
                grouped: B
            }
        }
          , f = h(e.map(m => m.x))
          , p = h(e.map(m => m.y));
        return f.rows >= 2 && p.rows >= 2 && f.grouped >= 6 && p.grouped >= 6 && f.grouped + p.grouped >= e.length
    }
    dominantElongatedSmdPadOutlineAngle(e) {
        const r = new Float64Array(180);
        let o = 0;
        for (const h of e) {
            if (h.type !== "smd" || h.outline.length < 4)
                continue;
            let f = 0
              , p = 0;
            for (const [qe,ot] of h.outline)
                f += qe,
                p += ot;
            const m = 1 / h.outline.length;
            f *= m,
            p *= m;
            let y = 0
              , x = 0
              , B = 0;
            for (const [qe,ot] of h.outline) {
                const Le = qe - f
                  , $t = ot - p;
                y += Le * Le,
                x += Le * $t,
                B += $t * $t
            }
            y *= m,
            x *= m,
            B *= m;
            const v = y + B
              , C = y - B
              , T = Math.sqrt(Math.max(0, C * C + 4 * x * x))
              , S = (v + T) * .5
              , k = (v - T) * .5;
            if (S <= 1e-6)
                continue;
            const I = Math.sqrt(S / Math.max(k, 1e-6));
            if (I < 1.6)
                continue;
            const D = Se(.5 * Math.atan2(2 * x, C))
              , Me = Math.min(179, Math.max(0, Math.round(D * 180 / Math.PI) % 180));
            r[Me] = (r[Me] ?? 0) + I * Math.sqrt(S),
            o += 1
        }
        if (o < 4)
            return null;
        const s = h => {
            let f = 0;
            for (let p = -3; p <= 3; p += 1)
                f += r[(h + p + 180) % 180] ?? 0;
            return f
        }
        ;
        let a = 0
          , l = s(0);
        for (let h = 1; h < 180; h += 1) {
            const f = s(h);
            f > l && (l = f,
            a = h)
        }
        if (l <= 0)
            return null;
        let c = 0
          , d = 0
          , u = 0;
        for (let h = -3; h <= 3; h += 1) {
            const f = (a + h + 180) % 180
              , p = r[f] ?? 0;
            if (p <= 0)
                continue;
            const m = f * Math.PI / 180;
            c += p * Math.cos(2 * m),
            d += p * Math.sin(2 * m),
            u += p
        }
        return u <= 0 ? null : Se(.5 * Math.atan2(d, c))
    }
    hasStrongCardinalSmdPadRun(e) {
        let n = e.filter(s => s.type === "smd").map(s => ({
            x: s.x,
            y: s.y,
            radius: s.radius > 0 ? s.radius : Math.max(s.width, s.height) * .5
        }));
        if (n.length >= 8) {
            const s = n.map(a => a.radius).filter(a => a > 0).sort( (a, l) => a - l);
            if (s.length > 0) {
                const a = s[Math.floor(s.length / 2)]
                  , l = Math.max(a * 2.5, a + 4)
                  , c = n.filter(d => d.radius <= 0 || d.radius <= l);
                c.length >= 6 && (n = c)
            }
        }
        if (n.length < 8)
            return !1;
        const i = ki(n.map(s => s.x), 2, 4)
          , r = ki(n.map(s => s.y), 2, 4)
          , o = Math.max(6, Math.floor((n.length + 1) / 2));
        return Math.max(i, r) >= o
    }
    hasLegacyBvSparseConnectorCardinalPadRun(e, n) {
        if (!e.name.trim().toLocaleUpperCase().startsWith("J"))
            return !1;
        const i = []
          , r = [];
        let o = 0;
        for (const d of n) {
            if (d.type !== "smd")
                return !1;
            i.push(d.x),
            r.push(d.y),
            (d.net.trim() === "" || he(d.net) || this.isNoConnectNetName(d.net)) && (o += 1)
        }
        const s = i.length;
        if (s < 6 || s > 32 || o < 2)
            return !1;
        const a = ki(i, 2, 3)
          , l = ki(r, 2, 3)
          , c = Math.max(6, Math.floor((s + 1) / 2));
        return Math.max(a, l) >= c
    }
    hasSparseBvThroughHoleCardinalSignalRun(e) {
        const n = []
          , i = [];
        let r = 0;
        for (const o of e) {
            if (o.type !== "through-hole")
                return !1;
            o.net.trim() === "" || he(o.net) || this.isNoConnectNetName(o.net) ? r += 1 : (n.push(o.x),
            i.push(o.y))
        }
        return e.length < 6 || e.length > 20 || r < 2 || n.length < 4 ? !1 : Math.max(Ts(n, 2), Ts(i, 2)) >= 4
    }
    screenFrameForComponentFrame(e) {
        return {
            boundsRect: this.screenRectForBounds(e.bounds),
            obb: e.obb ? this.screenObbForWorldObb(e.obb) : null
        }
    }
    screenObbForWorldObb(e) {
        const n = Fd(e).map(h => this.worldToScreen(h[0], h[1]))
          , [i,r,o] = n
          , s = this.worldToScreen(e.cx, e.cy)
          , a = Math.hypot(i.x - r.x, i.y - r.y)
          , l = Math.hypot(r.x - o.x, r.y - o.y)
          , c = Math.max(a, l)
          , d = Math.min(a, l)
          , u = a >= l ? Math.atan2(r.y - i.y, r.x - i.x) : Math.atan2(o.y - r.y, o.x - r.x);
        return {
            corners: n,
            center: s,
            width: c,
            height: d,
            angle: u
        }
    }
    padVisualScreenRect(e, n) {
        const i = this.padVisualBounds(e, n);
        return i.valid ? this.screenRectForBounds(i) : null
    }
    padVisualBounds(e, n) {
        const i = pe()
          , r = e ? this.displayedFallbackPadPoints(e, n) : null;
        if (r)
            return $n(i, r),
            i;
        if (this.shouldDisplayPadOutline(n)) {
            for (const a of n.outline)
                Pe(i, a[0], a[1]);
            for (const a of n.outlineHoles)
                for (const l of a)
                    Pe(i, l[0], l[1]);
            return i
        }
        const o = this.displayedRectanglePadPoints(n);
        if (o)
            return $n(i, o),
            i;
        const s = this.displayedPadCircleRadius(n);
        return s <= 0 || Ce(i, n.x - s, n.y - s, n.x + s, n.y + s),
        i
    }
    screenRectForBounds(e) {
        const n = this.worldToScreen(e.minX, e.minY)
          , i = this.worldToScreen(e.maxX, e.maxY)
          , r = Math.min(n.x, i.x)
          , o = Math.max(n.x, i.x)
          , s = Math.min(n.y, i.y)
          , a = Math.max(n.y, i.y);
        return {
            left: r,
            top: s,
            right: o,
            bottom: a,
            width: Math.max(0, o - r),
            height: Math.max(0, a - s)
        }
    }
    worldToScreen(e, n) {
        const i = this.worldToDisplay(e, n);
        return {
            x: this.offsetX + i.x * this.zoom,
            y: this.offsetY + i.y * this.zoom
        }
    }
    displayTextAngle(e) {
        const n = (e.mirrored ? -e.angle : e.angle) * (Math.PI / 180)
          , i = this.worldToDisplay(0, 0)
          , r = this.worldToDisplay(Math.cos(n), Math.sin(n))
          , o = r.x - i.x
          , s = r.y - i.y;
        return Math.abs(o) <= 1e-6 && Math.abs(s) <= 1e-6 ? zs(e.angle) : zs(Math.atan2(s, o) * (180 / Math.PI))
    }
    graphicVisible(e) {
        return this.graphicVisibleOnSide(e, this.options.activeSide)
    }
    graphicVisibleOnSide(e, n) {
        return this.layerVisible(e.layerId) ? e.side !== "" ? e.side === n : this.layerVisibleOnSide(e.layerId, n) : !1
    }
    textVisible(e) {
        return this.textVisibleOnSide(e, this.options.activeSide)
    }
    textVisibleOnSide(e, n) {
        return this.layerVisible(e.layerId) ? e.side !== "" ? e.side === n : this.layerVisibleOnSide(e.layerId, n) : !1
    }
    padVisible(e) {
        return this.padVisibleOnSide(e, this.options.activeSide)
    }
    padVisibleOnSide(e, n) {
        return this.padBelongsToSide(e, n)
    }
    padBelongsToSide(e, n) {
        return e.side === n || e.type === "through-hole"
    }
    componentVisibleOnSide(e) {
        return e.showBodyOnBothSides ? e.pads.some(n => n.side === this.options.activeSide && n.type !== "through-hole") : e.side === this.options.activeSide
    }
    componentHasVisiblePadsOnSide(e) {
        return e.pads.some(n => n && !n.suppressVisual && this.padVisible(n))
    }
    componentHasPadsOnSide(e) {
        return e.pads.some(n => n && !n.suppressVisual && this.padBelongsToSide(n, this.options.activeSide))
    }
    shouldSuppressComponentBBox(e) {
        if (this.isTvwMechanicalHoleComponent(e) && e.hasCircularBodyDecal)
            return !0;
        if (this.isTvwMecComponent(e) || this.isTvwBodyDecalComponent(e))
            return !1;
        const i = e.name.toLocaleUpperCase();
        if (i.includes("HOLE") || /^H\d+$/.test(i) || i.startsWith("MH"))
            return !0;
        let r = 0;
        for (const o of e.pads)
            !o.suppressVisual && this.padBelongsToSide(o, this.options.activeSide) && (r += 1);
        return r <= 1
    }
    padHitTest(e, n, i, r) {
        const o = this.displayedFallbackPadPoints(e, n);
        if (o)
            return Je(i.x, i.y, o) ? !0 : He(i.x, i.y, o, !0) <= r;
        if (this.shouldDisplayPadOutline(n))
            return Je(i.x, i.y, n.outline) ? !0 : He(i.x, i.y, n.outline, !0) <= r;
        const s = this.displayedRectanglePadPoints(n);
        if (s)
            return Je(i.x, i.y, s) ? !0 : He(i.x, i.y, s, !0) <= r;
        const a = Math.max(this.displayedPadCircleRadius(n), r);
        if (a <= 0)
            return !1;
        const l = i.x - n.x
          , c = i.y - n.y;
        return l * l + c * c <= a * a
    }
    padHitScore(e, n, i, r) {
        if (!this.padHitTest(e, n, i, r))
            return null;
        const o = this.displayedFallbackPadPoints(e, n) ? this.padVisualCenterWorld(e, n) : n;
        return Rs(i.x, i.y, o.x, o.y)
    }
    shouldDisplayPadOutline(e) {
        return lo(e, this.options.drawPinPads)
    }
    displayedFallbackPadPoints(e, n) {
        return ao(e, n, this.options.activeSide, this.options.drawPinPads, this.board?.metadata.sourceFormat ?? "")
    }
    displayedRectanglePadPoints(e) {
        return Gs(e, this.options.drawPinPads, this.board?.metadata.sourceFormat ?? "")
    }
    displayedPadCircleRadius(e) {
        return ft(e, this.options.drawPinPads, this.board?.metadata.sourceFormat ?? "")
    }
    displayedPadOverlayCircleRadius(e) {
        return Wd(e, this.options.drawPinPads, this.board?.metadata.sourceFormat ?? "", !0)
    }
    isSelectableTraceGraphic(e, n=!1, i=!1) {
        if (e.sourceNegative || e.net.trim() === "" || e.layer === "edge-cuts" || !this.graphicVisible(e) || !i && !n && this.isManualTopLayerActiveForCurrentView() && !this.itemOnTopLayer(e.layerId, e.layer))
            return !1;
        const r = this.layerById(e.layerId);
        return r ? r.class === "logic" || r.class === "through" : e.layer === "front-copper" || e.layer === "back-copper"
    }
    traceHitTest(e, n, i) {
        const r = this.graphicStrokeWorld(e)
          , o = Math.max(1e-4, r * .5)
          , s = i + r * .5
          , a = r * .25
          , l = 64
          , c = 4096;
        switch (e.type) {
        case "line":
            {
                const d = Ye(n.x, n.y, [e.x1, e.y1], [e.x2, e.y2]);
                return d <= s ? {
                    score: d * d + a,
                    hitKind: "stroke",
                    directHit: d <= o
                } : null
            }
        case "arc":
            {
                const d = dt(e)
                  , u = He(n.x, n.y, d, !1);
                return u <= s ? {
                    score: u * u + a,
                    hitKind: "stroke",
                    directHit: u <= o
                } : null
            }
        case "circle":
            {
                if (e.radius <= 0)
                    return null;
                const d = Math.hypot(n.x - e.cx, n.y - e.cy)
                  , u = Math.abs(d - e.radius);
                return u <= s ? {
                    score: u * u + l + a,
                    hitKind: "stroke",
                    directHit: u <= o
                } : e.filled && d <= e.radius + i ? {
                    score: c + u * u,
                    hitKind: "fill",
                    directHit: d <= e.radius
                } : null
            }
        case "polygon":
            {
                const d = He(n.x, n.y, e.points, !0);
                return d <= s ? {
                    score: d * d + l + a,
                    hitKind: "stroke",
                    directHit: d <= o
                } : !e.filled || !Je(n.x, n.y, e.points) || e.holes.some(h => Je(n.x, n.y, h)) ? null : {
                    score: c + d * d,
                    hitKind: "fill",
                    directHit: !0
                }
            }
        }
        return null
    }
    traceGraphicIsComponentIntent(e, n, i) {
        if (i === "stroke" || !n)
            return !0;
        const r = this.componentDisplayFrame(n).bounds;
        if (!r.valid)
            return !1;
        const o = rn(e);
        if (!o.valid)
            return !1;
        const s = 2 / Math.max(this.zoom, .001);
        if (o.minX >= r.minX - s && o.minY >= r.minY - s && o.maxX <= r.maxX + s && o.maxY <= r.maxY + s)
            return !0;
        const a = Math.max(0, r.maxX - r.minX)
          , l = Math.max(0, r.maxY - r.minY);
        if (a <= 0 || l <= 0)
            return !1;
        const c = Math.max(0, Math.min(o.maxX, r.maxX) - Math.max(o.minX, r.minX))
          , d = Math.max(0, Math.min(o.maxY, r.maxY) - Math.max(o.minY, r.minY));
        if (c <= 0 || d <= 0)
            return !1;
        const u = c * d / (a * l)
          , h = Math.min(c / a, d / l)
          , f = Math.max(c, d) / Math.max(Math.min(c, d), 1e-4);
        return u <= .55 || h <= .6 && u <= .85 || f >= 3 && u <= .9
    }
    layerVisible(e) {
        if (!this.hasLayerData() || e < 0)
            return !0;
        const n = this.layerById(e);
        return !n || this.options.visibleLayerIds.has(n.id)
    }
    layerVisibleOnSide(e, n=this.options.activeSide) {
        if (!this.layerVisible(e))
            return !1;
        const i = this.layerById(e);
        return !i || i.side === "" || i.side === n
    }
    layerNameVisible(e) {
        return this.layerNameVisibleOnSide(e, this.options.activeSide)
    }
    layerNameVisibleOnSide(e, n) {
        const i = this.layerByNameOrRole(e);
        return !i || this.layerVisibleOnSide(i.id, n)
    }
    graphicBelongsToSideForOutline(e, n) {
        const i = this.layerById(e.layerId);
        return this.board?.metadata.sourceFormat !== "XZZPCB" ? !i || i.side === "" || i.side === n : e.side === "T" || e.side === "B" ? e.side === n : !i || i.side === "" || i.side === n
    }
    itemOnTopLayer(e, n="") {
        if (!this.isManualTopLayerActiveForCurrentView())
            return !1;
        if (e >= 0)
            return e === this.options.topLayerId;
        const i = this.layerByNameOrRole(n);
        return !!(i && i.id === this.options.topLayerId)
    }
    isManualTopLayerActiveForCurrentView() {
        if (this.options.topLayerId === null || !this.board)
            return !1;
        const e = this.layerById(this.options.topLayerId);
        if (!e || !this.layerVisible(e.id))
            return !1;
        if (this.board.metadata.sourceFormat === "A3P_GENCAM")
            return !0;
        const n = xd(e.role);
        return n ? n === this.options.activeSide : e.side === "T" || e.side === "B" ? e.side === this.options.activeSide : this.layerVisibleOnSide(e.id)
    }
    applyManualTopLayerDim(e, n, i="") {
        return !this.isManualTopLayerActiveForCurrentView() || i === "edge-cuts" || this.layerById(n)?.role === "edge-cuts" || this.itemOnTopLayer(n, i) ? e : fe(e, .5)
    }
    hasLayerData() {
        return (this.board?.layers.length ?? 0) > 0
    }
    hasRenderBackend() {
        return this.device !== null || this.webGl !== null
    }
    isTvwBoard() {
        const e = this.board?.metadata;
        return e ? e.sourceFormat.toUpperCase() === "TVW" || e.displaySourceFormat.toUpperCase() === "TVW" : !1
    }
    isFabmasterBoard() {
        const e = this.board?.metadata;
        return e ? e.sourceFormat.toUpperCase() === "FABMASTER" || e.displaySourceFormat.toUpperCase() === "FABMASTER" : !1
    }
    isFzCaeBoard() {
        const e = this.board?.metadata;
        if (!e)
            return !1;
        const n = e.sourceFormat.toUpperCase()
          , i = e.displaySourceFormat.toUpperCase();
        return n === "FZ" || n === "CAE" || i === "FZ" || i === "CAE"
    }
    isTvwMechanicalHoleComponent(e) {
        return this.isTvwBoard() && e.tvwMechanicalHoleLike
    }
    isTvwMecComponent(e) {
        return this.isTvwBoard() && e.bodyBoundsOk && e.name.startsWith("MEC")
    }
    isTvwBodyDecalComponent(e) {
        return this.isTvwBoard() && e.bodyBoundsOk && e.tvwBodyDecalLike
    }
    isTopTestBoard() {
        const e = this.board?.metadata;
        if (!e)
            return !1;
        const n = e.sourceFormat.toUpperCase()
          , i = e.displaySourceFormat.toUpperCase();
        return n === "TOPTEST_BRD" || n === "TOPTEST_BRD2" || i === "TOPTEST_BRD" || i === "TOPTEST_BRD2"
    }
    isGenCadBoard() {
        const e = this.board?.metadata;
        return e ? e.sourceFormat.toUpperCase() === "GENCAD" || e.displaySourceFormat.toUpperCase() === "GENCAD" : !1
    }
    isXzzBoard() {
        const e = this.board?.metadata;
        return e ? e.sourceFormat.toUpperCase() === "XZZPCB" || e.displaySourceFormat.toUpperCase() === "XZZPCB" : !1
    }
    isAllegroBoard() {
        const e = this.board?.metadata;
        return e ? e.sourceFormat.toUpperCase() === "ALLEGRO" || e.displaySourceFormat.toUpperCase() === "ALLEGRO" : !1
    }
    isBvBoard() {
        const e = this.board?.metadata;
        return e ? e.sourceFormat.toUpperCase() === "BV" || e.displaySourceFormat.toUpperCase() === "BV" : !1
    }
    isBvRawBoard() {
        const e = this.board?.metadata;
        return e ? e.sourceFormat.toUpperCase() === "BVRAW" || e.displaySourceFormat.toUpperCase() === "BVRAW" : !1
    }
    isNoConnectNetName(e) {
        const n = e.trim();
        return n === "" ? !0 : he(n) ? !1 : !!this.board?.nets.some(i => i.name === n && i.noConnect)
    }
    layerStylingActive() {
        return this.options.layerModeEnabled && this.hasLayerData()
    }
    layerRoleForId(e) {
        return this.layerById(e)?.role ?? ""
    }
    layerById(e) {
        if (!(!this.board || e < 0))
            return this.board.layers.find(n => n.id === e)
    }
    layerByNameOrRole(e) {
        if (!this.board || e.trim() === "")
            return;
        const n = zr(e);
        return this.board.layers.find(i => zr(i.name) === n || zr(i.role) === n)
    }
    rebuildNetHighlightCache() {
        if (!this.board) {
            this.netHighlightCache = new Map;
            return
        }
        const e = this.netHighlightCacheByBoard.get(this.board);
        if (e) {
            this.netHighlightCache = e;
            return
        }
        this.netHighlightCache = new Map;
        for (const n of this.board.components)
            for (let i = 0; i < n.pads.length; i += 1) {
                const r = n.pads[i];
                if (!r || r.net.trim() === "")
                    continue;
                const o = this.netRefsFor(r.net);
                o.pads.push({
                    component: n,
                    pad: r,
                    padIndex: i
                }),
                o.componentIds.add(n.id)
            }
        for (const n of this.board.tracks)
            n.net.trim() !== "" && this.netRefsFor(n.net).tracks.push(n);
        for (const n of this.board.vias)
            n.net.trim() !== "" && this.netRefsFor(n.net).vias.push(n);
        for (const n of this.board.zones)
            n.net.trim() !== "" && this.netRefsFor(n.net).zones.push(n);
        for (let n = 0; n < this.board.graphics.length; n += 1) {
            const i = this.board.graphics[n];
            if (i.net.trim() !== "" && !i.sourceNegative) {
                const r = this.netRefsFor(i.net);
                r.graphics.push(i),
                r.graphicIndices.push(n)
            }
        }
        this.netHighlightCacheByBoard.set(this.board, this.netHighlightCache)
    }
    netRefsFor(e) {
        let n = this.netHighlightCache.get(e);
        return n || (n = {
            pads: [],
            componentIds: new Set,
            tracks: [],
            vias: [],
            zones: [],
            graphics: [],
            graphicIndices: []
        },
        this.netHighlightCache.set(e, n)),
        n
    }
    pickSpatialIndex() {
        if (!this.board)
            return null;
        const e = this.pickIndexKeyForActiveSide()
          , n = this.pickIndexCache.get(e);
        if (n)
            return n;
        const i = this.buildPickSpatialIndex(e);
        return this.pickIndexCache.set(e, i),
        i
    }
    buildPickSpatialIndex(e) {
        const n = {
            key: e,
            cellSize: this.pickIndexCellSize(),
            padCells: new Map,
            componentCells: new Map,
            traceCells: new Map,
            largePads: [],
            largeComponents: [],
            largeTraces: []
        };
        if (!this.board)
            return n;
        for (let i = 0; i < this.board.components.length; i += 1) {
            const r = this.board.components[i];
            if (!r)
                continue;
            if (this.componentHasVisiblePadsOnSide(r))
                for (let a = 0; a < r.pads.length; a += 1) {
                    const l = r.pads[a];
                    if (!l || !this.padVisible(l) || l.suppressVisual)
                        continue;
                    const c = this.padVisualBounds(r, l);
                    if (!c.valid)
                        continue;
                    const d = {
                        component: r,
                        pad: l,
                        padIndex: a,
                        componentOrder: i,
                        bounds: c
                    };
                    this.addPickRefToCells(n.padCells, c, d, n.cellSize) || n.largePads.push(d)
                }
            if (!this.componentVisibleOnSide(r))
                continue;
            const o = this.componentDisplayFrame(r);
            if (!o.bounds.valid)
                continue;
            const s = {
                component: r,
                componentOrder: i,
                bounds: o.bounds
            };
            this.addPickRefToCells(n.componentCells, o.bounds, s, n.cellSize) || n.largeComponents.push(s)
        }
        for (let i = 0; i < this.board.graphics.length; i += 1) {
            const r = this.board.graphics[i];
            if (!r || !this.isSelectableTraceGraphic(r, !1, !0))
                continue;
            const o = rn(r);
            if (!o.valid)
                continue;
            const s = {
                graphic: r,
                graphicIndex: i,
                bounds: o
            };
            this.addPickRefToCells(n.traceCells, o, s, n.cellSize) || n.largeTraces.push(s)
        }
        return n
    }
    queryPickPads(e, n, i) {
        const r = new Set
          , o = [];
        this.collectPickRefsFromCells(e.padCells, e.cellSize, n, i, o, s => {
            const a = `${s.component.id}:${s.padIndex}`;
            return r.has(a) || !Gt(n.x, n.y, s.bounds, i) ? !1 : (r.add(a),
            !0)
        }
        );
        for (const s of e.largePads) {
            const a = `${s.component.id}:${s.padIndex}`;
            !r.has(a) && Gt(n.x, n.y, s.bounds, i) && (r.add(a),
            o.push(s))
        }
        return o.sort( (s, a) => Number(this.itemOnTopLayer(a.pad.layerId)) - Number(this.itemOnTopLayer(s.pad.layerId)) || a.componentOrder - s.componentOrder || a.padIndex - s.padIndex),
        o
    }
    queryPickComponents(e, n, i) {
        const r = new Set
          , o = [];
        this.collectPickRefsFromCells(e.componentCells, e.cellSize, n, i, o, s => r.has(s.component.id) || !Gt(n.x, n.y, s.bounds, i) ? !1 : (r.add(s.component.id),
        !0));
        for (const s of e.largeComponents)
            !r.has(s.component.id) && Gt(n.x, n.y, s.bounds, i) && (r.add(s.component.id),
            o.push(s));
        return o.sort( (s, a) => a.componentOrder - s.componentOrder),
        o
    }
    queryPickTraces(e, n, i) {
        const r = new Set
          , o = [];
        this.collectPickRefsFromCells(e.traceCells, e.cellSize, n, i, o, s => r.has(s.graphicIndex) || !Gt(n.x, n.y, s.bounds, i) ? !1 : (r.add(s.graphicIndex),
        !0));
        for (const s of e.largeTraces)
            !r.has(s.graphicIndex) && Gt(n.x, n.y, s.bounds, i) && (r.add(s.graphicIndex),
            o.push(s));
        return o.sort( (s, a) => Number(this.itemOnTopLayer(a.graphic.layerId)) - Number(this.itemOnTopLayer(s.graphic.layerId)) || a.graphic.layerId - s.graphic.layerId || a.graphicIndex - s.graphicIndex),
        o
    }
    collectPickRefsFromCells(e, n, i, r, o, s) {
        const a = Math.floor((i.x - r) / n)
          , l = Math.floor((i.x + r) / n)
          , c = Math.floor((i.y - r) / n)
          , d = Math.floor((i.y + r) / n);
        for (let u = c; u <= d; u += 1)
            for (let h = a; h <= l; h += 1) {
                const f = e.get(Or(h, u));
                if (f)
                    for (const p of f)
                        s(p) && o.push(p)
            }
    }
    addPickRefToCells(e, n, i, r) {
        const o = Math.floor(n.minX / r)
          , s = Math.floor(n.maxX / r)
          , a = Math.floor(n.minY / r)
          , l = Math.floor(n.maxY / r);
        if ((s - o + 1) * (l - a + 1) > 2048)
            return !1;
        for (let d = a; d <= l; d += 1)
            for (let u = o; u <= s; u += 1) {
                const h = Or(u, d)
                  , f = e.get(h);
                f ? f.push(i) : e.set(h, [i])
            }
        return !0
    }
    pickIndexKeyForActiveSide() {
        const e = this.currentBoardGeometryId()
          , n = this.options.layerModeEnabled ? "layer" : "compact"
          , i = [...this.options.visibleLayerIds].sort( (r, o) => r - o).join(",");
        return `${e}|${n}|${this.options.activeSide}|${i}`
    }
    pickIndexCellSize() {
        const e = this.preferredFitBounds()
          , n = Math.max(1, e.maxX - e.minX)
          , i = Math.max(1, e.maxY - e.minY);
        return ee(Math.max(n, i) / 96, 20, 220)
    }
    preferredFitBounds() {
        if (!this.board)
            return {
                minX: 0,
                minY: 0,
                maxX: 1,
                maxY: 1
            };
        const e = this.outlineBoundsForSide(this.options.activeSide)
          , n = this.visibleBoundsForSide(this.options.activeSide);
        if (e) {
            if (n && (this.isBvBoard() || this.isXzzBoard())) {
                const i = Math.max(0, e.maxX - e.minX)
                  , r = Math.max(0, e.maxY - e.minY)
                  , o = this.isXzzBoard() ? 1 : 25
                  , s = Math.max(o, i * .05)
                  , a = Math.max(o, r * .05);
                if (n.minX < e.minX - s || n.maxX > e.maxX + s || n.minY < e.minY - a || n.maxY > e.maxY + a)
                    return {
                        minX: Math.min(e.minX, n.minX),
                        minY: Math.min(e.minY, n.minY),
                        maxX: Math.max(e.maxX, n.maxX),
                        maxY: Math.max(e.maxY, n.maxY)
                    }
            }
            return e
        }
        return n ?? this.board.bounds
    }
    initialLandscapeOrientationBounds() {
        if (!this.board)
            return {
                minX: 0,
                minY: 0,
                maxX: 1,
                maxY: 1
            };
        const e = pe()
          , n = pe()
          , i = pe()
          , r = this.board.metadata.sourceFormat === "TVW";
        for (const s of this.board.components)
            for (const a of s.pads)
                a?.bboxOk && (Ce(e, a.bboxMinX, a.bboxMinY, a.bboxMaxX, a.bboxMaxY),
                r && Ce(i, a.bboxMinX, a.bboxMinY, a.bboxMaxX, a.bboxMaxY));
        for (const s of this.board.graphics) {
            sn(e, s),
            s.layer === "edge-cuts" && sn(n, s);
            const a = this.layerById(s.layerId);
            r && (s.layer === "edge-cuts" || a?.side === "T" || a?.side === "B") && sn(i, s)
        }
        let o = n.valid ? n : r && i.valid ? i : e;
        if (!n.valid && !(r && i.valid)) {
            const s = pe();
            for (const a of this.board.components)
                for (const l of a.pads)
                    !l?.bboxOk || !this.padVisibleOnSide(l, this.options.activeSide) || Ce(s, l.bboxMinX, l.bboxMinY, l.bboxMaxX, l.bboxMaxY);
            s.valid && (o = s)
        }
        return o.valid ? {
            minX: o.minX,
            minY: o.minY,
            maxX: o.maxX,
            maxY: o.maxY
        } : this.board.bounds
    }
    visibleBoundsForSide(e) {
        if (!this.board)
            return null;
        const n = pe();
        for (const i of this.board.components)
            for (const r of i.pads)
                !r || r.suppressVisual || !this.padVisibleOnSide(r, e) || !r.bboxOk || Ce(n, r.bboxMinX, r.bboxMinY, r.bboxMaxX, r.bboxMaxY);
        for (const i of this.board.graphics)
            this.graphicVisibleOnSide(i, e) && sn(n, i);
        return n.valid ? {
            minX: n.minX,
            minY: n.minY,
            maxX: n.maxX,
            maxY: n.maxY
        } : null
    }
    outlineBoundsForSide(e) {
        if (!this.board)
            return null;
        if (this.outlineBoundsCache.has(e))
            return this.outlineBoundsCache.get(e) ?? null;
        const n = pe();
        for (const r of this.board.graphics)
            r.layer === "edge-cuts" && this.graphicBelongsToSideForOutline(r, e) && sn(n, r);
        const i = n.valid ? {
            minX: n.minX,
            minY: n.minY,
            maxX: n.maxX,
            maxY: n.maxY
        } : null;
        return this.outlineBoundsCache.set(e, i),
        i
    }
    generatedLayerColor(e, n) {
        if (e.layer === "edge-cuts")
            return null;
        let i = w.layerOther;
        return e.layer.includes("front") || e.side === "T" ? i = w.layerTop : (e.layer.includes("back") || e.side === "B") && (i = w.layerBottom),
        fe(i, n ? .58 : .82)
    }
    generatedLayerColorForLayer(e, n) {
        if (!e || e.role === "edge-cuts")
            return null;
        const i = e.name.trim().toLocaleUpperCase();
        let r;
        if (i === "TOP" || i.endsWith("_TOP") || i.endsWith(" TOP") || e.side === "T")
            r = 3779071;
        else if (i === "BOTTOM" || i.endsWith("_BOTTOM") || i.endsWith(" BOTTOM") || e.side === "B")
            r = 15771978;
        else {
            const o = [4706700, 14255871, 16740193, 5294296, 13161562, 8169471, 16748349, 10148007];
            r = o[Math.abs(e.id) % o.length] ?? 10135736
        }
        return fe(gt(r, 1), n ? .58 : .82)
    }
    selectedComponent() {
        return !this.board || this.options.selectedComponentId === null ? null : this.board.components.find(e => e.id === this.options.selectedComponentId) ?? null
    }
    selectedPadIndex(e) {
        const n = this.options.selectedPad;
        return !n || n.componentId !== e.id ? null : n.padIndex >= 0 && n.padIndex < e.pads.length ? n.padIndex : null
    }
    selectedTraceGraphic() {
        if (!this.board || this.options.selectedTraceIndex === null)
            return null;
        const e = this.board.graphics[this.options.selectedTraceIndex];
        return !e || e.net !== this.options.selectedNet || !this.isSelectableTraceGraphic(e, !1, !0) ? null : e
    }
    cssWidth() {
        return this.canvas.clientWidth || this.canvas.width || 1
    }
    cssHeight() {
        return this.canvas.clientHeight || this.canvas.height || 1
    }
    mirrorSumX() {
        if (!this.board)
            return 0;
        const e = this.outlineBoundsForSide(this.options.activeSide) ?? this.board.bounds;
        return e.minX + e.maxX
    }
    mirrorSumY() {
        if (!this.board)
            return 0;
        const e = this.outlineBoundsForSide(this.options.activeSide) ?? this.board.bounds;
        return e.minY + e.maxY
    }
    shouldMirrorActiveSide() {
        return this.shouldMirrorSide(this.options.activeSide)
    }
    shouldMirrorSide(e) {
        switch (this.board?.metadata.sourceFormat) {
        case "GENCAD":
        case "A3P_GENCAM":
        case "FABMASTER":
        case "MENTORCAD":
        case "XZZPCB":
        case "ALLEGRO":
        case "TOPTEST_BRD":
        case "TOPTEST_BRD2":
            return e === "B";
        default:
            return e === "T"
        }
    }
    effectiveFlipHorizontal() {
        return this.flipHorizontal !== this.sideFlipHorizontal
    }
    effectiveFlipVertical() {
        return this.flipVertical !== this.sideFlipVertical
    }
    shouldMirrorWholeBoardX() {
        return (this.viewQuarterTurns & 1) !== 0 ? this.effectiveFlipVertical() : this.effectiveFlipHorizontal()
    }
    shouldMirrorWholeBoardY() {
        return (this.viewQuarterTurns & 1) !== 0 ? this.effectiveFlipHorizontal() : this.effectiveFlipVertical()
    }
    worldToView(e, n) {
        const i = this.shouldMirrorWholeBoardX()
          , r = this.shouldMirrorWholeBoardY();
        return {
            x: i ? this.mirrorSumX() - e : e,
            y: r ? this.mirrorSumY() - n : n
        }
    }
    viewToWorld(e, n) {
        const i = this.shouldMirrorWholeBoardX()
          , r = this.shouldMirrorWholeBoardY();
        return {
            x: i ? this.mirrorSumX() - e : e,
            y: r ? this.mirrorSumY() - n : n
        }
    }
    worldToDisplay(e, n) {
        const i = this.worldToView(e, n)
          , r = this.mirrorSumX() * .5
          , o = this.mirrorSumY() * .5
          , s = fd(i.x - r, i.y - o, this.viewQuarterTurns)
          , a = r + s.x;
        return {
            x: this.shouldMirrorActiveSide() ? this.mirrorSumX() - a : a,
            y: o + s.y
        }
    }
    displayToWorld(e, n) {
        const i = this.mirrorSumX() * .5
          , r = this.mirrorSumY() * .5
          , o = this.shouldMirrorActiveSide() ? this.mirrorSumX() - e : e
          , s = pd(o - i, n - r, this.viewQuarterTurns);
        return this.viewToWorld(i + s.x, r + s.y)
    }
    displayBounds(e) {
        const n = [this.worldToDisplay(e.minX, e.minY), this.worldToDisplay(e.maxX, e.minY), this.worldToDisplay(e.maxX, e.maxY), this.worldToDisplay(e.minX, e.maxY)];
        let i = Number.POSITIVE_INFINITY
          , r = Number.POSITIVE_INFINITY
          , o = Number.NEGATIVE_INFINITY
          , s = Number.NEGATIVE_INFINITY;
        for (const a of n)
            i = Math.min(i, a.x),
            r = Math.min(r, a.y),
            o = Math.max(o, a.x),
            s = Math.max(s, a.y);
        return {
            minX: i,
            minY: r,
            maxX: o,
            maxY: s
        }
    }
    displayTransformCoefficients() {
        const e = this.worldToDisplay(0, 0)
          , n = this.worldToDisplay(1, 0)
          , i = this.worldToDisplay(0, 1);
        return {
            ax: n.x - e.x,
            bx: i.x - e.x,
            cx: e.x,
            ay: n.y - e.y,
            by: i.y - e.y,
            cy: e.y
        }
    }
    defaultStroke() {
        return 2.5
    }
    graphicStrokeWorld(e) {
        if (e.lineWidth > 0)
            return e.lineWidth;
        const n = this.board?.metadata.sourceFormat ?? "";
        return n === "GENCAD" ? ws : n === "FABMASTER" ? e.layer === "edge-cuts" || Is(e.layer) ? vs : td : this.usesScreenFixedZeroWidthGraphicStrokes() ? Math.max(1e-4, this.zeroWidthGraphicStrokeScreenPx(e.layer) / Math.max(Math.abs(this.zoom), 1e-4)) : this.defaultStroke()
    }
    zeroWidthGraphicStrokeScreenPx(e) {
        return e === "edge-cuts" || Is(e) ? $c : this.board?.metadata.sourceFormat === "FZCAE" ? _c : Jc
    }
    usesScreenFixedZeroWidthGraphicStrokes() {
        const e = this.board?.metadata.sourceFormat ?? "";
        return this.hasLayerData() && e !== "GENCAD" && e !== "FABMASTER"
    }
    invalidateComponentFrameCache() {
        this.board && (this.componentFrameCachesByBoard.delete(this.board),
        this.backgroundPadCoverageByBoard.delete(this.board)),
        this.componentFramePrewarmKeys.clear()
    }
    invalidatePadDisplayGeometry() {
        this.cancelGroundNetGeometryPrewarm(),
        this.geometryCacheGeneration += 1;
        for (const e of this.geometryCache.values())
            L(e.batches, this.webGl),
            L(e.screenLineBatches, this.webGl);
        this.geometryCache.clear(),
        this.layerViewGeometryCache.clear(),
        this.pickIndexCache.clear(),
        this.skippedPrewarmKeys.clear(),
        this.vertexBatches = [],
        this.vertexCount = 0,
        this.screenLineVertexBatches = [],
        this.screenLineVertexCount = 0,
        this.destroySelectedNetGeometry(),
        this.destroyHighlightedPartNetGeometry(),
        this.selectedTraceGraphicsCache = null,
        this.selectedLayerTraceGraphicsCache = null,
        this.tracePinsOverlayCache = null,
        this.geometryDirty = !0,
        this.invalidateComponentFrameCache(),
        this.scheduleFrame(),
        this.scheduleGeometryPrewarm(Ni(this.options.activeSide)),
        this.scheduleGroundNetGeometryPrewarm()
    }
}
function fd(t, e, n) {
    switch (Yn(n, 4)) {
    case 1:
        return {
            x: -e,
            y: t
        };
    case 2:
        return {
            x: -t,
            y: -e
        };
    case 3:
        return {
            x: e,
            y: -t
        };
    default:
        return {
            x: t,
            y: e
        }
    }
}
function pd(t, e, n) {
    switch (Yn(n, 4)) {
    case 1:
        return {
            x: e,
            y: -t
        };
    case 2:
        return {
            x: -t,
            y: -e
        };
    case 3:
        return {
            x: -e,
            y: t
        };
    default:
        return {
            x: t,
            y: e
        }
    }
}
function Yn(t, e) {
    return (t % e + e) % e
}
function Ni(t) {
    return t === "T" ? "B" : "T"
}
function Or(t, e) {
    return `${t}:${e}`
}
function Wr(t, e, n, i) {
    t.push(e, n, i[0], i[1], i[2], i[3])
}
function Bs(t, e, n) {
    const i = (a, l) => {
        const c = t.createShader(a);
        if (!c)
            throw new Error("Could not create a WebGL shader.");
        if (t.shaderSource(c, l),
        t.compileShader(c),
        !t.getShaderParameter(c, t.COMPILE_STATUS)) {
            const d = t.getShaderInfoLog(c) || "Unknown shader compilation error.";
            throw t.deleteShader(c),
            new Error(d)
        }
        return c
    }
      , r = i(t.VERTEX_SHADER, e)
      , o = i(t.FRAGMENT_SHADER, n)
      , s = t.createProgram();
    if (!s)
        throw t.deleteShader(r),
        t.deleteShader(o),
        new Error("Could not create a WebGL program.");
    if (t.attachShader(s, r),
    t.attachShader(s, o),
    t.linkProgram(s),
    t.deleteShader(r),
    t.deleteShader(o),
    !t.getProgramParameter(s, t.LINK_STATUS)) {
        const a = t.getProgramInfoLog(s) || "Unknown WebGL program link error.";
        throw t.deleteProgram(s),
        new Error(a)
    }
    return s
}
function L(t, e) {
    for (const n of t)
        n.buffer?.destroy(),
        n.webGlBuffer && e && e.deleteBuffer(n.webGlBuffer)
}
function en(t, e) {
    for (const n of t.keys())
        n.startsWith(e) && t.delete(n)
}
function En(t, e) {
    for (const n of t)
        n.startsWith(e) && t.delete(n)
}
function tn(t, e, n, i, r, o, s) {
    t.push(e[0], e[1], n[0], n[1], i, r, o[0], o[1], o[2], o[3], s)
}
function so(t, e, n, i, r) {
    Ge(e, n) <= 1e-6 || (tn(t, e, n, 0, -1, i, r),
    tn(t, e, n, 1, -1, i, r),
    tn(t, e, n, 1, 1, i, r),
    tn(t, e, n, 0, -1, i, r),
    tn(t, e, n, 1, 1, i, r),
    tn(t, e, n, 0, 1, i, r))
}
function yt(t, e, n, i, r) {
    if (!(e.length < 2)) {
        for (let o = 1; o < e.length; o += 1) {
            const s = e[o - 1]
              , a = e[o];
            s && a && so(t, s, a, n, i)
        }
        if (r && e.length > 2) {
            const o = e[0]
              , s = e[e.length - 1];
            o && s && so(t, s, o, n, i)
        }
    }
}
function Wt(t, e, n, i, r) {
    Wr(t, e[0], e[1], r),
    Wr(t, n[0], n[1], r),
    Wr(t, i[0], i[1], r)
}
function vt(t, e, n, i, r, o, s, a=!0) {
    const l = i - e
      , c = r - n
      , d = Math.hypot(l, c);
    if (d <= 1e-6)
        return;
    const u = Math.max(o, .001) * .5
      , h = -c / d * u
      , f = l / d * u;
    Wt(t, [e + h, n + f], [i + h, r + f], [i - h, r - f], s),
    Wt(t, [e + h, n + f], [i - h, r - f], [e - h, n - f], s),
    a && (me(t, e, n, u, s, Jn),
    me(t, i, r, u, s, Jn))
}
function ka(t, e, n, i, r, o=!0) {
    if (e.length < 2)
        return;
    const s = Math.max(n, .001) * .5;
    for (let c = 1; c < e.length; ++c) {
        const d = e[c - 1]
          , u = e[c];
        d && u && vt(t, d[0], d[1], u[0], u[1], n, i, !1)
    }
    if (e.length > 2) {
        const c = e[0]
          , d = e[e.length - 1];
        c && d && vt(t, d[0], d[1], c[0], c[1], n, i, !1)
    }
    const a = 0
      , l = e.length - 1;
    for (let c = a; c <= l; ++c) {
        const d = e[c];
        d && me(t, d[0], d[1], s, i, Jn)
    }
}
function me(t, e, n, i, r, o) {
    if (i <= 0)
        return;
    const s = [e, n];
    for (let a = 0; a < o; ++a) {
        const l = Math.PI * 2 * a / o
          , c = Math.PI * 2 * (a + 1) / o;
        Wt(t, s, [e + Math.cos(l) * i, n + Math.sin(l) * i], [e + Math.cos(c) * i, n + Math.sin(c) * i], r)
    }
}
function As(t, e, n, i, r, o, s) {
    i <= 0 || ka(t, Rt(e, n, i, s), r, o, !0, !1)
}
function Dr(t, e, n, i, r, o, s, a) {
    if (i <= 0)
        return;
    const l = o - r
      , c = Ie(l)
      , d = Math.max(s, .001) * .5
      , u = i + d
      , h = Math.max(0, i - d)
      , f = [e, n];
    for (let p = 0; p < c; ++p) {
        const m = (r + l * p / c) * Math.PI / 180
          , y = (r + l * (p + 1) / c) * Math.PI / 180
          , x = [e + Math.cos(m) * u, n + Math.sin(m) * u]
          , B = [e + Math.cos(y) * u, n + Math.sin(y) * u];
        if (h <= 1e-6) {
            Wt(t, f, x, B, a);
            continue
        }
        const v = [e + Math.cos(m) * h, n + Math.sin(m) * h]
          , C = [e + Math.cos(y) * h, n + Math.sin(y) * h];
        Wt(t, x, B, C, a),
        Wt(t, x, C, v, a)
    }
    Math.abs(l) < 359.999 && (me(t, e + Math.cos(r * Math.PI / 180) * i, n + Math.sin(r * Math.PI / 180) * i, d, a, Jn),
    me(t, e + Math.cos(o * Math.PI / 180) * i, n + Math.sin(o * Math.PI / 180) * i, d, a, Jn))
}
function at(t, e, n, i) {
    e.length < 3 || Fa(t, e, n)
}
function md(t, e, n) {
    const i = $d(e);
    if (i) {
        me(t, i.cx, i.cy, i.radius, n, Ie(360));
        return
    }
    at(t, e, n)
}
function Fa(t, e, n) {
    tr(t, e, [], n)
}
function Ms(t, e, n) {
    const i = _d(e)
      , r = yd(i);
    if (r) {
        for (const o of r)
            tr(t, o, [], n);
        return
    }
    tr(t, i, [], n)
}
function yd(t) {
    if (t.length !== 4)
        return null;
    const e = [[0, 2], [1, 3]];
    for (const [n,i] of e) {
        const r = gd(t[n], t[(n + 1) % 4], t[i], t[(i + 1) % 4]);
        if (r)
            return [[r, t[(n + 1) % 4], t[i]], [r, t[(i + 1) % 4], t[n]]]
    }
    return null
}
function gd(t, e, n, i) {
    const r = e[0] - t[0]
      , o = e[1] - t[1]
      , s = i[0] - n[0]
      , a = i[1] - n[1]
      , l = r * a - o * s;
    if (Math.abs(l) <= 1e-6)
        return null;
    const c = n[0] - t[0]
      , d = n[1] - t[1]
      , u = (c * a - d * s) / l
      , h = (c * o - d * r) / l
      , f = 1e-6;
    return u <= f || u >= 1 - f || h <= f || h >= 1 - f ? null : [t[0] + r * u, t[1] + o * u]
}
function tr(t, e, n, i) {
    const r = Pt(e);
    if (r.length < 3 || Math.abs(_n(r)) <= 1e-6)
        return;
    const o = n.map(d => Pt(d)).filter(d => d.length >= 3 && Math.abs(_n(d)) > 1e-6)
      , {coordinates: s, holeIndices: a, pointsByIndex: l} = bd(r, o)
      , c = Lc(s, a, 2);
    if (c.length !== 0)
        for (let d = 0; d + 2 < c.length; d += 3) {
            const u = l[c[d]]
              , h = l[c[d + 1]]
              , f = l[c[d + 2]];
            u && h && f && Wt(t, u, h, f, i)
        }
}
function bd(t, e) {
    const n = []
      , i = []
      , r = []
      , o = s => {
        for (const a of s)
            n.push(a[0], a[1]),
            r.push(a)
    }
    ;
    o(t);
    for (const s of e)
        i.push(r.length),
        o(s);
    return {
        coordinates: n,
        holeIndices: i,
        pointsByIndex: r
    }
}
function nn(t, e, n, i, r) {
    ka(t, e, n, i, r, !r)
}
function pe() {
    return {
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0,
        valid: !1
    }
}
function je(t) {
    return t.valid ? Math.max(0, t.maxX - t.minX) * Math.max(0, t.maxY - t.minY) : 0
}
function Pe(t, e, n) {
    if (!(!Number.isFinite(e) || !Number.isFinite(n))) {
        if (!t.valid) {
            t.minX = e,
            t.maxX = e,
            t.minY = n,
            t.maxY = n,
            t.valid = !0;
            return
        }
        t.minX = Math.min(t.minX, e),
        t.minY = Math.min(t.minY, n),
        t.maxX = Math.max(t.maxX, e),
        t.maxY = Math.max(t.maxY, n)
    }
}
function Ls(t) {
    const e = t.trim().toLocaleUpperCase();
    return e === "" || he(e) || e === "NC"
}
function he(t) {
    const e = t.trim().toLocaleUpperCase();
    return e.startsWith("GND") || e.startsWith("DGND") || e.startsWith("GROUND")
}
function ki(t, e, n) {
    if (t.length === 0)
        return 0;
    const i = t.slice().sort( (s, a) => s - a);
    let r = 0
      , o = 0;
    for (let s = 1; s <= i.length; s += 1) {
        if (s < i.length && Math.abs(i[s] - i[o]) <= e)
            continue;
        const a = s - o;
        a >= n && (r += a),
        o = s
    }
    return r
}
function Ts(t, e) {
    if (t.length === 0)
        return 0;
    const n = t.slice().sort( (o, s) => o - s);
    let i = 1
      , r = 0;
    for (let o = 1; o <= n.length; o += 1)
        o < n.length && Math.abs(n[o] - n[r]) <= e || (i = Math.max(i, o - r),
        r = o);
    return i
}
function zr(t) {
    return t.trim().toLocaleLowerCase().replace(/\s+/g, " ")
}
function xd(t) {
    const e = t.trim().toLocaleLowerCase();
    return e.startsWith("front-") ? "T" : e.startsWith("back-") ? "B" : null
}
function Is(t) {
    const e = t.trim().toLocaleLowerCase();
    return e === "front-courtyard" || e === "back-courtyard"
}
function _(t) {
    return t.type === "line" || t.type === "arc" ? 1 : 0
}
function Ga(t, e) {
    return Math.max(t.lineWidth, e)
}
function wd(t) {
    const e = [];
    for (const n of t) {
        const i = vd(n.graphic, n.reverse);
        for (const r of i) {
            const o = e[e.length - 1];
            (!o || Ge(o, r) > 1e-6) && e.push(r)
        }
    }
    return e
}
function vd(t, e) {
    let n;
    return t.type === "line" ? n = [[t.x1, t.y1], [t.x2, t.y2]] : t.type === "arc" ? n = dt(t) : n = [],
    e ? n.slice().reverse() : n
}
function Ns(t, e) {
    return Math.abs(t.x - e.x) < .5 && Math.abs(t.y - e.y) < .5
}
function Rn(t, e, n, i) {
    return t.x + e >= 0 && t.y + e >= 0 && t.x - e <= n && t.y - e <= i
}
function Ce(t, e, n, i, r) {
    Pe(t, Math.min(e, i), Math.min(n, r)),
    Pe(t, Math.max(e, i), Math.max(n, r))
}
function $n(t, e) {
    for (const n of e)
        Pe(t, n[0], n[1])
}
function sn(t, e) {
    switch (e.type) {
    case "line":
        Pe(t, e.x1, e.y1),
        Pe(t, e.x2, e.y2);
        break;
    case "circle":
        e.radius > 0 && Ce(t, e.cx - e.radius, e.cy - e.radius, e.cx + e.radius, e.cy + e.radius);
        break;
    case "arc":
        Ad(t, e);
        break;
    case "polygon":
        $n(t, e.points);
        for (const n of e.holes)
            $n(t, n);
        break
    }
}
function rn(t) {
    const e = pe();
    return sn(e, t),
    e.valid && Bd(e, Math.max(t.lineWidth, 2.5) * .5 + 2.5),
    e
}
function Cd(t) {
    switch (t.type) {
    case "line":
        return 70;
    case "circle":
        return Math.max(24, Ie(360) * 3);
    case "arc":
        {
            const e = Math.abs(t.endAngle - t.startAngle);
            return Math.max(24, Ie(e) * 6)
        }
    case "polygon":
        {
            const e = t.holes.reduce( (n, i) => n + i.length, 0);
            return Math.max(18, (t.points.length + e) * (t.filled ? 9 : 8))
        }
    }
}
function Sd(t) {
    return t.width > 0 && t.height > 0 && Math.abs(t.width - t.height) > 1e-4 ? t.drillDiameter > 0 ? 42 : 18 : t.radius > 0 || t.width > 0 || t.height > 0 ? t.drillDiameter > 0 ? 120 : 96 : 24
}
function Pd(t, e, n) {
    const i = pe();
    return Ce(i, t - n, e - n, t + n, e + n),
    i
}
function On(t, e, n=0) {
    return !t.valid || !e.valid ? !1 : !(t.maxX < e.minX - n || t.minX > e.maxX + n || t.maxY < e.minY - n || t.minY > e.maxY + n)
}
function Bd(t, e) {
    !t.valid || e <= 0 || (t.minX -= e,
    t.minY -= e,
    t.maxX += e,
    t.maxY += e)
}
function Ad(t, e) {
    if (e.radius <= 0)
        return;
    if (mn(e)) {
        Ce(t, e.cx - e.radius, e.cy - e.radius, e.cx + e.radius, e.cy + e.radius);
        return
    }
    const n = ve(e);
    n && (Pe(t, n.start[0], n.start[1]),
    Pe(t, n.end[0], n.end[1]));
    for (const i of [0, 90, 180, 270])
        if (Md(i, e.startAngle, e.endAngle)) {
            const r = ir(e, i);
            Pe(t, r[0], r[1])
        }
}
function Md(t, e, n) {
    const i = n - e;
    return Math.abs(i) >= 359.999 ? !0 : i >= 0 ? ks(t - e) <= i + 1e-4 : ks(e - t) <= -i + 1e-4
}
function ks(t) {
    let e = t % 360;
    return e < 0 && (e += 360),
    e
}
function Ld(t) {
    const e = pe();
    if (t.bboxOk)
        return Ce(e, t.bboxMinX, t.bboxMinY, t.bboxMaxX, t.bboxMaxY),
        e;
    if (t.outline.length >= 3) {
        for (const o of t.outline)
            Pe(e, o[0], o[1]);
        for (const o of t.outlineHoles)
            for (const s of o)
                Pe(e, s[0], s[1]);
        return e
    }
    const n = ft(t)
      , i = t.width > 0 ? t.width : n * 2
      , r = t.height > 0 ? t.height : n * 2;
    return Ce(e, t.x - i * .5, t.y - r * .5, t.x + i * .5, t.y + r * .5),
    e
}
function Td(t, e, n, i=!0, r="") {
    const o = pe();
    return $n(o, Va(t, e, n, i, r)),
    o
}
function Va(t, e, n, i=!0, r="") {
    const o = ao(t, e, n, i, r);
    if (o)
        return o;
    let s = ft(e, i, r);
    if (lo(e, i))
        return e.outline;
    if (i && (e.width > 0 || e.height > 0) && !vo(e, r)) {
        const a = e.width > 0 ? e.width : Math.max(s * 2, 1)
          , l = e.height > 0 ? e.height : Math.max(s * 2, 1);
        return nr(e.x, e.y, a * .5, l * .5, 0)
    }
    return s > 0 && (s += Hd(s, i, r)),
    s <= 0 && (s = 10),
    nr(e.x, e.y, s, s, 0)
}
function ao(t, e, n, i=!0, r="") {
    if (!Fs(t, e, n, i))
        return null;
    const o = t.pads.find(x => x !== e);
    if (!o || o.suppressVisual || !Fs(t, o, n, i))
        return null;
    const s = o.x - e.x
      , a = o.y - e.y
      , l = Math.hypot(s, a);
    if (l <= 1e-4)
        return null;
    let c = ft(e, i, r);
    c <= 0 && (c = 5);
    const d = c + Math.min(c * .1, 1.2)
      , u = d
      , h = d
      , f = -a / l
      , p = s / l
      , m = h
      , y = Math.min(h * .65, l * .3);
    return [[e.x + u * f - m * p, e.y + u * p + m * f], [e.x - u * f - m * p, e.y - u * p + m * f], [e.x - u * f + y * p, e.y - u * p - y * f], [e.x + u * f + y * p, e.y + u * p - y * f]]
}
function Fs(t, e, n, i=!0) {
    return !i || t.pads.length !== 2 || e.type !== "smd" && e.type !== "through-hole" ? !1 : n === "T" ? e.forceRectanglePadCandidateTop : e.forceRectanglePadCandidateBottom
}
function Id(t, e, n=null) {
    const i = [0, Math.PI * .25, Math.PI * .5, Math.PI * .75, e];
    return n !== null ? i.push(n) : Math.abs(t.angle) > .001 && i.push(t.angle * Math.PI / 180),
    Vd(i.map(Se))
}
function Nd(t) {
    const e = t.filter(p => p.type === "smd")
      , n = e.length;
    if (n < 16)
        return null;
    const i = new Float64Array(n);
    i.fill(Number.POSITIVE_INFINITY);
    for (let p = 0; p < n; ++p) {
        const m = e[p];
        for (let y = p + 1; y < n; ++y) {
            const x = e[y]
              , B = x.x - m.x
              , v = x.y - m.y
              , C = B * B + v * v;
            C <= 1e-8 || (i[p] = Math.min(i[p], C),
            i[y] = Math.min(i[y], C))
        }
    }
    const r = 180
      , o = 4
      , s = new Float64Array(r);
    let a = 0;
    for (let p = 0; p < n; ++p) {
        const m = i[p];
        if (!Number.isFinite(m))
            continue;
        const y = e[p];
        for (let x = p + 1; x < n; ++x) {
            const B = Math.min(m, i[x]);
            if (!Number.isFinite(B))
                continue;
            const v = e[x]
              , C = v.x - y.x
              , T = v.y - y.y
              , S = C * C + T * T;
            if (S <= 1e-8 || S > B * 1.45)
                continue;
            const k = Se(Math.atan2(T, C))
              , I = ee(Math.round(k * 180 / Math.PI) % r, 0, r - 1);
            s[I] = s[I] + 1 / Math.max(S, 1e-6),
            a += 1
        }
    }
    if (a < n)
        return null;
    const l = p => {
        let m = 0;
        for (let y = -o; y <= o; ++y)
            m += s[(p + y + r) % r];
        return m
    }
    ;
    let c = 0
      , d = l(0);
    for (let p = 1; p < r; ++p) {
        const m = l(p);
        m > d && (d = m,
        c = p)
    }
    if (d <= 0 || l((c + 90) % r) < d * .2)
        return null;
    let u = 0
      , h = 0
      , f = 0;
    for (let p = -o; p <= o; ++p) {
        const m = (c + p + r) % r
          , y = s[m];
        if (y <= 0)
            continue;
        const x = m * Math.PI / 180;
        u += y * Math.cos(2 * x),
        h += y * Math.sin(2 * x),
        f += y
    }
    return f <= 0 ? null : Se(.5 * Math.atan2(h, u))
}
function kd(t) {
    if (t.length < 2)
        return 0;
    let e = 0
      , n = 0;
    for (const s of t)
        e += s.x,
        n += s.y;
    e /= t.length,
    n /= t.length;
    let i = 0
      , r = 0
      , o = 0;
    for (const s of t) {
        const a = s.x - e
          , l = s.y - n
          , c = Math.max(0, s.radius);
        i += c * a * a,
        r += c * a * l,
        o += c * l * l
    }
    return Se(.5 * Math.atan2(2 * r, i - o))
}
function Hr(t, e) {
    if (t.length === 0)
        return null;
    const n = Se(e)
      , i = Math.cos(n)
      , r = Math.sin(n);
    let o = Number.POSITIVE_INFINITY
      , s = Number.NEGATIVE_INFINITY
      , a = Number.POSITIVE_INFINITY
      , l = Number.NEGATIVE_INFINITY;
    for (const u of t) {
        const h = u[0] * i + u[1] * r
          , f = -u[0] * r + u[1] * i;
        o = Math.min(o, h),
        s = Math.max(s, h),
        a = Math.min(a, f),
        l = Math.max(l, f)
    }
    if (!Number.isFinite(o) || !Number.isFinite(a))
        return null;
    const c = (o + s) * .5
      , d = (a + l) * .5;
    return {
        cx: c * i - d * r,
        cy: c * r + d * i,
        hw: Math.max(0, (s - o) * .5),
        hh: Math.max(0, (l - a) * .5),
        angle: n
    }
}
function Fd(t) {
    return nr(t.cx, t.cy, t.hw, t.hh, t.angle)
}
function Gs(t, e=!0, n="") {
    if (!e || t.width <= 0 && t.height <= 0 || vo(t, n))
        return null;
    const i = ft(t, e, n)
      , r = t.width > 0 ? t.width : Math.max(i * 2, 1)
      , o = t.height > 0 ? t.height : Math.max(i * 2, 1);
    return r <= 0 || o <= 0 || Math.abs(r - o) <= Math.max(1, Math.max(r, o) * .12) ? null : nr(t.x, t.y, r * .5, o * .5, 0)
}
function vo(t, e) {
    return e === "TVW" && t.outline.length === 0
}
function nr(t, e, n, i, r) {
    const o = Math.cos(r)
      , s = Math.sin(r);
    return [[t + n * o - i * s, e + n * s + i * o], [t - n * o - i * s, e - n * s + i * o], [t - n * o + i * s, e - n * s - i * o], [t + n * o + i * s, e + n * s - i * o]]
}
function Vs(t, e) {
    if (e.corners.length !== 4)
        return;
    const [n,...i] = e.corners;
    t.beginPath(),
    t.moveTo(n.x, n.y);
    for (const r of i)
        t.lineTo(r.x, r.y);
    t.closePath(),
    t.stroke()
}
function Gd(t, e) {
    if (e.corners.length !== 4)
        return;
    const [n,...i] = e.corners;
    t.beginPath(),
    t.moveTo(n.x, n.y);
    for (const r of i)
        t.lineTo(r.x, r.y);
    t.closePath(),
    t.fill()
}
function Vd(t) {
    const e = [];
    for (const n of t)
        e.some(i => Math.abs(Se(i - n)) < 1e-4) || e.push(n);
    return e
}
function Se(t) {
    let e = t % Math.PI;
    return e < 0 && (e += Math.PI),
    e
}
function Ed(t) {
    let e = t % Math.PI;
    return e > Math.PI * .5 ? e -= Math.PI : e < -Math.PI * .5 && (e += Math.PI),
    e
}
function Yr(t) {
    const e = Se(t);
    return Math.abs(e) < 1e-4 || Math.abs(e - Math.PI * .5) < 1e-4
}
function Es(t) {
    let n = Math.abs(t) % 180;
    n < 0 && (n += 180);
    const i = Math.min(n, 180 - n)
      , r = Math.abs(n - 90);
    return Math.min(i, r) <= 1
}
function Rd(t) {
    let e = t;
    for (; e > Math.PI * .5; )
        e -= Math.PI;
    for (; e < -Math.PI * .5; )
        e += Math.PI;
    return e
}
function ft(t, e=!0, n="") {
    if ((e || t.outlineOnly) && t.type === "through-hole") {
        const i = Yd(t);
        if (i > 0)
            return i
    }
    return e ? t.radius : Dd(t, n)
}
function Od(t, e=!0, n="") {
    return ft(t, e, n)
}
function Wd(t, e=!0, n="", i=!1) {
    let r = i ? Od(t, e, n) : ft(t, e, n);
    const o = [];
    if (vo(t, n) || (t.width > 0 && o.push(t.width * .5),
    t.height > 0 && o.push(t.height * .5)),
    t.bboxOk) {
        const a = t.bboxMaxX - t.bboxMinX
          , l = t.bboxMaxY - t.bboxMinY;
        a > 0 && o.push(a * .5),
        l > 0 && o.push(l * .5)
    }
    const s = o.filter(a => a > 0).reduce( (a, l) => Math.min(a, l), Number.POSITIVE_INFINITY);
    return Number.isFinite(s) ? r > 0 ? Math.min(r, s) : s : r
}
function Dd(t, e) {
    const n = e === "XZZPCB" ? .07619999999999999 : e === "ALLEGRO" ? .1397 : 5.5
      , i = e === "GENCAD" ? zd(t) : t.outlineShortR;
    let r = t.outline.length > 0 ? i * .75 : t.radius;
    if (r = Math.max(r, n),
    e === "XZZPCB") {
        let o = 0;
        t.outline.length > 0 && t.outlineShortR > 0 ? o = t.outlineShortR : t.radius > 0 ? o = t.radius : t.width > 0 && t.height > 0 ? o = Math.min(t.width, t.height) * .5 : (t.width > 0 || t.height > 0) && (o = Math.max(t.width, t.height) * .5),
        o > 0 && (r = Math.min(r, o))
    }
    return r
}
function zd(t) {
    const e = t.outlineShortR;
    if (t.type !== "smd" || t.outlineOnly || t.syntheticFallbackShape || t.outlineHoles.length > 0 || e <= 0)
        return e;
    let n = t.outline.length;
    if (n > 1) {
        const a = t.outline[0]
          , l = t.outline[n - 1];
        a[0] === l[0] && a[1] === l[1] && (n -= 1)
    }
    if (n < 5)
        return e;
    let i = !1
      , r = !1
      , o = !1
      , s = Number.POSITIVE_INFINITY;
    for (let a = 0; a < n; a += 1) {
        const l = t.outline[a]
          , c = t.outline[(a + 1) % n]
          , d = t.outline[(a + 2) % n]
          , u = (c[0] - l[0]) * (d[1] - c[1]) - (c[1] - l[1]) * (d[0] - c[0]);
        i ||= u > 1e-4,
        r ||= u < -1e-4,
        l[1] > t.y != c[1] > t.y && t.x < l[0] + (c[0] - l[0]) * (t.y - l[1]) / (c[1] - l[1]) && (o = !o),
        s = Math.min(s, Ye(t.x, t.y, l, c))
    }
    return i && r && o && s > .001 && s < e * .75 ? s : e
}
function lo(t, e=!0) {
    return (e || t.outlineOnly && t.type === "through-hole") && t.outline.length >= 2
}
function Hd(t, e, n) {
    return e ? Math.min(t * .1, 1.2) : Math.min(t * .2, n === "ALLEGRO" ? 2.4 * .0254 : 2.4)
}
function Yd(t) {
    return t.radius > 0 ? t.radius : t.width > 0 || t.height > 0 ? Math.max(t.width, t.height) * .5 : t.drillDiameter > 0 ? t.drillDiameter * .5 : 0
}
function Gt(t, e, n, i) {
    return t >= n.minX - i && t <= n.maxX + i && e >= n.minY - i && e <= n.maxY + i
}
function Xd(t, e, n, i) {
    const r = Math.cos(n.angle)
      , o = Math.sin(n.angle)
      , s = t - n.cx
      , a = e - n.cy
      , l = s * r + a * o
      , c = -s * o + a * r;
    return Math.abs(l) <= n.hw + i && Math.abs(c) <= n.hh + i
}
function Rs(t, e, n, i) {
    const r = t - n
      , o = e - i;
    return r * r + o * o
}
function Os(t, e, n) {
    return t.right >= 0 && t.bottom >= 0 && t.left <= e && t.top <= n
}
function xt(t) {
    return `${Math.max(1, t)}px "Segoe UI", Arial, sans-serif`
}
function Xr(t, e, n, i, r) {
    const o = t.measureText(e)
      , s = o.actualBoundingBoxAscent
      , a = o.actualBoundingBoxDescent;
    if (Number.isFinite(s) && Number.isFinite(a) && s + a > 0) {
        t.fillText(e, n, i + (s - a) * .5, r);
        return
    }
    t.textBaseline = "middle",
    t.fillText(e, n, i, r),
    t.textBaseline = "alphabetic"
}
function Fi(t, e) {
    const n = Math.max(2, e * .18)
      , i = Math.max(1, e * .1)
      , r = Math.max(4, e * .55);
    return {
        left: t.left - n,
        top: t.top - i,
        right: t.right + n,
        bottom: t.bottom + r,
        width: t.width + n * 2,
        height: t.height + i + r
    }
}
function Ws(t) {
    return t.trim() || "NC"
}
function Ud(t, e) {
    return e < 4 || t.length <= e ? t : `${t.slice(0, e - 3)}...`
}
const Ds = new Map;
function Vt(t, e, n, i, r) {
    if (!e || n < 2 || i <= 0 || r <= 0)
        return 0;
    const o = Dn(t, e);
    if (o <= 0)
        return 0;
    const s = i * Ia / o
      , a = r / 1.15
      , l = Math.floor(Math.min(n, s, a));
    return l >= 2 ? l : 0
}
function Dn(t, e) {
    const n = Ds.get(e);
    if (n !== void 0)
        return n;
    t.font = xt(Ia);
    const i = t.measureText(e).width;
    return Ds.set(e, i),
    i
}
function zs(t) {
    let e = t % 360;
    return e > 180 ? e -= 360 : e < -180 && (e += 360),
    e > 90 ? e -= 180 : e < -90 && (e += 180),
    e
}
function Kd(t, e, n, i) {
    const r = i * Math.PI / 180;
    return [t + Math.cos(r) * n, e + Math.sin(r) * n]
}
function dt(t) {
    if (t.radius <= 0)
        return [];
    if (mn(t))
        return Rt(t.cx, t.cy, t.radius, Ie(360));
    const e = t.endAngle - t.startAngle
      , n = Ie(e)
      , i = [];
    for (let r = 0; r <= n; r += 1)
        i.push(Kd(t.cx, t.cy, t.radius, t.startAngle + e * r / n));
    return i
}
function U(t, e) {
    return [(t >> 16 & 255) / 255, (t >> 8 & 255) / 255, (t & 255) / 255, e]
}
function gt(t, e) {
    return [(t >> 16 & 255) / 255, (t >> 8 & 255) / 255, (t & 255) / 255, e]
}
function se(t, e) {
    return [t[0], t[1], t[2], e]
}
function F(t) {
    return `rgba(${Math.round(t[0] * 255)} ${Math.round(t[1] * 255)} ${Math.round(t[2] * 255)} / ${t[3]})`
}
function Zd(t) {
    return `${t[0].toFixed(4)},${t[1].toFixed(4)},${t[2].toFixed(4)},${t[3].toFixed(4)}`
}
function Hs(t, e) {
    if (t.size !== e.size)
        return !1;
    for (const n of t)
        if (!e.has(n))
            return !1;
    return !0
}
function Ys(t, e) {
    return t === e || !!(t && e && t.componentId === e.componentId && t.padIndex === e.padIndex)
}
function qd(t, e) {
    if (t.size !== e.size)
        return !1;
    for (const n of t)
        if (!e.has(n))
            return !1;
    return !0
}
function fe(t, e) {
    return [t[0] * e, t[1] * e, t[2] * e, t[3]]
}
function zn(t) {
    return [ee(t[0], 0, 1), ee(t[1], 0, 1), ee(t[2], 0, 1), ee(t[3], 0, 1)]
}
function lt(t, e, n) {
    const i = 1 - n;
    return [t[0] * i + e[0] * n, t[1] * i + e[1] * n, t[2] * i + e[2] * n, t[3] * i + e[3] * n]
}
function Wn(t, e) {
    const n = e ? 1.95 : 2.15
      , i = e ? .18 : .24;
    return se(zn(lt(fe(t, n), [1, 1, 1, 1], i)), 1)
}
function on(t, e, n) {
    return !e || e === "edge-cuts" ? t : fe(t, n ? .35 : .43)
}
function Ur(t, e) {
    return !e || e === "edge-cuts" ? [t[0], t[1], t[2], 1] : se(lt(fe(t, .68), [1, 1, 1, 1], .1), 1)
}
function jd(t) {
    if (t.metadata.sourceFormat === "FZ" || t.metadata.sourceFormat === "CAE") {
        const e = Math.max(0, t.bounds.maxX - t.bounds.minX)
          , n = Math.max(0, t.bounds.maxY - t.bounds.minY)
          , i = Math.max(e, n);
        if (i > 0)
            return ee(i * 1e-4, .1, 1)
    }
    return .1
}
function co(t) {
    return Math.max(8, Math.floor(Math.abs(t) / 12))
}
function Ie(t) {
    return Math.max(8, Math.ceil(Math.abs(t) / nd))
}
function mn(t) {
    return t.type === "arc" && t.radius > 0 && Math.abs(t.endAngle - t.startAngle) >= 359.999
}
function ir(t, e) {
    const n = e * Math.PI / 180;
    return [t.cx + Math.cos(n) * t.radius, t.cy + Math.sin(n) * t.radius]
}
function ve(t) {
    if (t.type === "line")
        return {
            start: [t.x1, t.y1],
            end: [t.x2, t.y2]
        };
    if (t.type !== "arc" || t.radius <= 0 || mn(t))
        return null;
    const e = [t.x1, t.y1]
      , n = [t.x2, t.y2];
    return rr(e) && rr(n) && Ge(e, n) > 1e-6 ? {
        start: e,
        end: n
    } : {
        start: ir(t, t.startAngle),
        end: ir(t, t.endAngle)
    }
}
function Qd(t, e, n) {
    if (t.type !== e.type)
        return !1;
    const i = ve(t)
      , r = ve(e);
    if (!i || !r)
        return !1;
    const o = Ct(i.start, r.start, n) && Ct(i.end, r.end, n)
      , s = Ct(i.start, r.end, n) && Ct(i.end, r.start, n);
    return !o && !s ? !1 : t.type === "arc" ? Math.abs(t.cx - e.cx) <= n && Math.abs(t.cy - e.cy) <= n && Math.abs(t.radius - e.radius) <= n && Math.abs(Math.abs(t.endAngle - t.startAngle) - Math.abs(e.endAngle - e.startAngle)) <= .1 : !0
}
function Jd(t, e) {
    const n = [t];
    for (const i of e) {
        if (i.graphic.type === "arc" && !mn(i.graphic)) {
            const o = i.reverse ? i.graphic.endAngle : i.graphic.startAngle
              , a = (i.reverse ? i.graphic.startAngle : i.graphic.endAngle) - o
              , l = co(a);
            for (let c = 1; c <= l; ++c) {
                const d = c / l;
                n.push(ir(i.graphic, o + a * d))
            }
            continue
        }
        const r = ve(i.graphic);
        r && n.push(i.reverse ? r.start : r.end)
    }
    return n
}
function Rt(t, e, n, i) {
    const r = []
      , o = Math.max(8, i);
    for (let s = 0; s < o; ++s) {
        const a = Math.PI * 2 * s / o;
        r.push([t + Math.cos(a) * n, e + Math.sin(a) * n])
    }
    return r
}
function Pt(t) {
    const e = [];
    for (const n of t) {
        if (!rr(n))
            continue;
        const i = e[e.length - 1];
        (!i || Ge(i, n) > 1e-6) && e.push([n[0], n[1]])
    }
    for (; e.length > 2 && Ge(e[0], e[e.length - 1]) <= 1e-6; )
        e.pop();
    return e
}
function $d(t) {
    const e = Pt(t);
    if (e.length < 12 || Math.abs(_n(e)) <= 1e-6)
        return null;
    let n = Number.POSITIVE_INFINITY
      , i = Number.POSITIVE_INFINITY
      , r = Number.NEGATIVE_INFINITY
      , o = Number.NEGATIVE_INFINITY;
    for (const [m,y] of e)
        n = Math.min(n, m),
        i = Math.min(i, y),
        r = Math.max(r, m),
        o = Math.max(o, y);
    const s = r - n
      , a = o - i
      , l = Math.max(s, a);
    if (!Number.isFinite(l) || l <= 0)
        return null;
    const c = Math.max(.02, l * .04);
    if (Math.abs(s - a) > c)
        return null;
    const d = (n + r) * .5
      , u = (i + o) * .5;
    let h = 0;
    for (const [m,y] of e)
        h += Math.hypot(m - d, y - u);
    const f = h / e.length;
    if (!Number.isFinite(f) || f <= 0)
        return null;
    const p = Math.max(.015, f * .06);
    for (const [m,y] of e)
        if (Math.abs(Math.hypot(m - d, y - u) - f) > p)
            return null;
    return {
        cx: d,
        cy: u,
        radius: f
    }
}
function _d(t) {
    const e = Pt(t);
    if (e.length < 3 || !eu(e, .001))
        return e;
    const n = tu(e, .001);
    return n.length >= 3 && Math.abs(_n(n)) > 1e-6 ? n : e
}
function eu(t, e) {
    for (let n = 0; n < t.length; n += 1)
        for (let i = n + 2; i < t.length; i += 1)
            if (!(n === 0 && i === t.length - 1) && Ct(t[n], t[i], e))
                return !0;
    return !1
}
function tu(t, e) {
    const n = nu(t, e);
    if (n.length < 3)
        return n;
    const i = [];
    for (const o of n) {
        for (; i.length >= 2 && Xs(i[i.length - 2], i[i.length - 1], o) <= 0; )
            i.pop();
        i.push(o)
    }
    const r = [];
    for (let o = n.length - 1; o >= 0; o -= 1) {
        const s = n[o];
        for (; r.length >= 2 && Xs(r[r.length - 2], r[r.length - 1], s) <= 0; )
            r.pop();
        r.push(s)
    }
    return i.pop(),
    r.pop(),
    i.concat(r)
}
function nu(t, e) {
    const n = t.filter(rr).map(r => [r[0], r[1]]).sort( (r, o) => r[0] - o[0] || r[1] - o[1])
      , i = [];
    for (const r of n) {
        const o = i[i.length - 1];
        (!o || Math.abs(o[0] - r[0]) > e || Math.abs(o[1] - r[1]) > e) && i.push(r)
    }
    return i
}
function Xs(t, e, n) {
    return (e[0] - t[0]) * (n[1] - t[1]) - (e[1] - t[1]) * (n[0] - t[0])
}
function iu(t, e) {
    const n = []
      , i = [];
    for (const r of t) {
        const o = Pt(r);
        if (o.length < 3)
            continue;
        const s = Ea(o);
        !s.valid || s.areaAbs <= 1 || i.some(a => ru(a, s, e)) || (i.push(s),
        n.push(o))
    }
    return n
}
function Ea(t) {
    const e = pe();
    for (const i of t)
        Pe(e, i[0], i[1]);
    const n = Math.abs(_n(t));
    return {
        minX: e.minX,
        minY: e.minY,
        maxX: e.maxX,
        maxY: e.maxY,
        areaAbs: n,
        valid: e.valid && e.maxX > e.minX && e.maxY > e.minY
    }
}
function ru(t, e, n) {
    if (!t.valid || !e.valid || Math.abs(t.minX - e.minX) > n || Math.abs(t.minY - e.minY) > n || Math.abs(t.maxX - e.maxX) > n || Math.abs(t.maxY - e.maxY) > n)
        return !1;
    const i = Math.max(.25, Math.max(t.areaAbs, e.areaAbs) * 1e-4);
    return Math.abs(t.areaAbs - e.areaAbs) <= i
}
function _n(t) {
    let e = 0;
    for (let n = 0; n < t.length; ++n) {
        const i = t[n]
          , r = t[(n + 1) % t.length];
        e += i[0] * r[1] - r[0] * i[1]
    }
    return e * .5
}
function rr(t) {
    return Number.isFinite(t[0]) && Number.isFinite(t[1])
}
function Ge(t, e) {
    const n = t[0] - e[0]
      , i = t[1] - e[1];
    return n * n + i * i
}
function Ct(t, e, n) {
    return Ge(t, e) <= n * n
}
function Kr(t, e, n=0, i=0) {
    const r = Math.round(t[0] / e) + n
      , o = Math.round(t[1] / e) + i;
    return `${r}:${o}`
}
function Us(t, e, n) {
    const i = t.get(e);
    i ? i.push(n) : t.set(e, [n])
}
function Je(t, e, n) {
    let i = !1;
    for (let r = 0, o = n.length - 1; r < n.length; o = r++) {
        const s = n[r]
          , a = n[o];
        if (!s || !a)
            continue;
        s[1] > e != a[1] > e && t < (a[0] - s[0]) * (e - s[1]) / (a[1] - s[1]) + s[0] && (i = !i)
    }
    return i
}
function He(t, e, n, i) {
    let r = Number.POSITIVE_INFINITY;
    for (let o = 1; o < n.length; ++o) {
        const s = n[o - 1]
          , a = n[o];
        s && a && (r = Math.min(r, Ye(t, e, s, a)))
    }
    if (i && n.length > 2) {
        const o = n[0]
          , s = n[n.length - 1];
        o && s && (r = Math.min(r, Ye(t, e, s, o)))
    }
    return r
}
function Ye(t, e, n, i) {
    const r = i[0] - n[0]
      , o = i[1] - n[1]
      , s = r * r + o * o;
    if (s <= 1e-6)
        return Math.hypot(t - n[0], e - n[1]);
    const a = ee(((t - n[0]) * r + (e - n[1]) * o) / s, 0, 1);
    return Math.hypot(t - (n[0] + r * a), e - (n[1] + o * a))
}
function ou(t, e, n) {
    if (e.length < 3)
        return !1;
    if (Oa(t, e[0], n))
        return !0;
    for (const i of Ra(t))
        if (au(i[0], i[1], e, n))
            return !0;
    return !1
}
function su(t, e, n) {
    if (Oa(t, e, n))
        return !0;
    for (const i of Ra(t))
        if (Ye(e[0], e[1], i[0], i[1]) <= n)
            return !0;
    return !1
}
function au(t, e, n, i) {
    if (Je(t[0], t[1], n) || Je(e[0], e[1], n) || He(t[0], t[1], n, !0) <= i || He(e[0], e[1], n, !0) <= i)
        return !0;
    for (let r = 0; r < n.length; r += 1) {
        const o = n[r]
          , s = n[(r + 1) % n.length];
        if (Wa(t, e, o, s) || lu(t, e, o, s) <= i)
            return !0
    }
    return !1
}
function Ra(t) {
    switch (t.type) {
    case "line":
        return [[[t.x1, t.y1], [t.x2, t.y2]]];
    case "arc":
        return Zr(dt(t), !1);
    case "circle":
        return Zr(Rt(t.cx, t.cy, t.radius, Ie(360)), !0);
    case "polygon":
        return Zr(t.points, !0)
    }
}
function Zr(t, e) {
    const n = [];
    for (let i = 1; i < t.length; i += 1) {
        const r = t[i - 1]
          , o = t[i];
        r && o && Ge(r, o) > 1e-6 && n.push([r, o])
    }
    if (e && t.length > 2) {
        const i = t[0]
          , r = t[t.length - 1];
        i && r && Ge(i, r) > 1e-6 && n.push([r, i])
    }
    return n
}
function Oa(t, e, n) {
    switch (t.type) {
    case "line":
        return Ye(e[0], e[1], [t.x1, t.y1], [t.x2, t.y2]) <= n;
    case "arc":
        return He(e[0], e[1], dt(t), !1) <= n;
    case "circle":
        {
            const i = Math.hypot(e[0] - t.cx, e[1] - t.cy);
            return t.filled ? i <= t.radius + n : Math.abs(i - t.radius) <= n
        }
    case "polygon":
        return t.filled && Je(e[0], e[1], t.points) ? !t.holes.some(i => Je(e[0], e[1], i)) : He(e[0], e[1], t.points, !0) <= n
    }
}
function Wa(t, e, n, i) {
    const r = Gi(t, e, n)
      , o = Gi(t, e, i)
      , s = Gi(n, i, t)
      , a = Gi(n, i, e);
    return Math.abs(r) <= 1e-6 && Vi(n, t, e) || Math.abs(o) <= 1e-6 && Vi(i, t, e) || Math.abs(s) <= 1e-6 && Vi(t, n, i) || Math.abs(a) <= 1e-6 && Vi(e, n, i) ? !0 : r > 0 != o > 0 && s > 0 != a > 0
}
function lu(t, e, n, i) {
    return Wa(t, e, n, i) ? 0 : Math.min(Ye(t[0], t[1], n, i), Ye(e[0], e[1], n, i), Ye(n[0], n[1], t, e), Ye(i[0], i[1], t, e))
}
function Gi(t, e, n) {
    return (e[0] - t[0]) * (n[1] - t[1]) - (e[1] - t[1]) * (n[0] - t[0])
}
function Vi(t, e, n) {
    return t[0] >= Math.min(e[0], n[0]) - 1e-6 && t[0] <= Math.max(e[0], n[0]) + 1e-6 && t[1] >= Math.min(e[1], n[1]) - 1e-6 && t[1] <= Math.max(e[1], n[1]) + 1e-6
}
function Ks(t, e, n, i) {
    const o = Math.max(Ga(t, i), i) * .5 + n;
    switch (t.type) {
    case "line":
        return Ye(e[0], e[1], [t.x1, t.y1], [t.x2, t.y2]) <= o;
    case "arc":
        return He(e[0], e[1], dt(t), !1) <= o;
    case "circle":
        {
            const s = Math.hypot(e[0] - t.cx, e[1] - t.cy);
            return t.filled && s <= t.radius + n ? !0 : Math.abs(s - t.radius) <= o
        }
    case "polygon":
        return t.filled && Je(e[0], e[1], t.points) ? !0 : He(e[0], e[1], t.points, !0) <= o
    }
}
function ee(t, e, n) {
    return Math.min(n, Math.max(e, t))
}
const bt = new URL("./logo.png",import.meta.url).href
  , cu = new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAQAAABNTyozAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQflCgURCQLVG9sgAAAHdUlEQVR42u2dW2xURRzGv21BApReJFxauQhCwRcpN7EmUIUoRSQmGhOhUDFGQiIJxhQTJSXoi8CDiaAPRp9ECBBMCCAKRSEx0YpAuGp3iQpUoEDk1m0D7W4/H5BCZ87Zs7Nn58yhzu9ttmfn/823c2bmzJyZAhaLxWKxWCwWi8VisVgsFovFYrFYLJZuQMRseOZiGEZjFIaiCL3RB4UArqIFLYijETFE0Rjh/9AgDsY0TMNUjEEvj0tbEUU99mF/5LIJpb4NYgHewgRcxdeRHWldX4a5eAFj1APhOOqwMXLYgEs+7HmUZ3mHL5jSbg7jCv5GvxznO3zIdLnTtSfCA13Ez3O9cjw3sN23OXdIcAvLTJc+HYPGC8J3Ol5Vwb1Zs+YuHdzBctMOeBk0WxB9VLpiJLdqMOcuOzhSbxlzsvrtLm0Q8/ghTuIlrfqfxwnW0qsn9EEPXRnzCazHqLQuvYYYYjiPFrTiBoB89EUeBqMUpSj0/HZvfIAFXBTZr8+kzE2YI1T4Y/993oPvezbJ7aznKlZyQMoIA1nJVfyFCY/cElxBf3dDcAaxhPUe1uxiFfspRSrgPH7rYdNeDjbtSBoGsYyNKQpxhm9zUMbxilnD0ylyv8Appj3xMIiVvO4q/xSX+m9O2ZPV/N01RpyzTLuSyqBW15vgAhdkr41gDqt5wSVSG6tM++JukFub8xELsh67gGtdfo4OLjHtjIpBUU7UFn8ioy4WhaMWpWHQl8zTqiCPX7ncaGFoizwMauNrgahYxFuOzfXjpv1JbVBzcL8hpzv2nU0s9p+3rwkzzsF2lz+1YCG6Tm3dxMVIUptFk/EN5DH5XsyMdOiKmZZBafVid7jMd/U9DnAsLznErDVoj7JBJPmxRjWT2SzFS7Di/jIoyUc06nnGobmO+hu9B/0EnIOp+jKP1EEeIpZiWcBlvAunKdcgcr5mTRukiK0cYcqg3ryiaM8t3SsS7Ocwut7uP99M5VSzQ8mg5QFomujwjGZuGoSzWe84khVp51EuCEjTuhDVoTDCfJ4TDOrgBNOqQgWrpTq02bSmUMFcqalOZtY9hG8lICtEklgtlXSuaVWhgj35l1CHTpjWFDJYI7VD40xrChUskcZDq/3n2q3gbsGgQ6YVhQxWST1Zf9OaQgULpZvsRdU8umk3f5vINRwRPnpaNY9ubRCAH4T0kwHFZQHzTZc9LZ2zhFusmbpffGYOX+cfJJPcyRLTBniqLZbGQkN0h/zsnmDH+IBpCzz1iitmM/SGKxfCvWLaAE/FBwTFb6p9X7WRfk5Ih3+WJSakFZsFVYMGmi6vMpeEtNKrf+oGie9qxE2X35NmjxJ4oGpQXyF9/xmkuQb1EdLWIAGjm9tMoGqQWGO0vj+WFcQa06z2dVWDfFZYAwRskFiDrEEe2Yd/XCQqVOxWVA06L6RLTZffE3F37Dm1r6sa1OARPnyIP2FDRrmkC4dJ0wehvskcpjsU11dVa1AjWoRPxps2ISVlQjouNRIeKBoUofR0rDzLGyiiuqjqOQ7qc9L1HhLCxXQh/bP2iHxZuKcTLDTtgqvWLCz7qAcdIL10F9q3JjhfWjh8MIiwx4Swu0wb4ap0j/+l50zWxfYI6WezsWlEgz0lUgtUF0zgCdLYosa0GY46l0k6HwsqtHiTnQ3f8g97Svujj2SST2ZLzxuE9FDMyygfnVRjuPDJ+sBiO7yadIq5ph3pojBrL3FmKmCLdH9Xmzali75XJX2bghUwThoNNYVnwMh8nhfUdQTWQHeK2Cn9RmtNG9Op7VNJ27bgRZRLIhL6dsgrKZvksJnFxA5o7pBkRNXOdNGiqh9jIag/AMDhbJGkGN8R4XDQgMENdbWUWWTUnsUOit4zJ6cXGyQ5baw0pmcGb0p6YjpPOPOW9JRDg9jMyUa0OG0Lb6fGTcTpyVrhUKkvcWzgOpwPFghgC6iXsBxp1oUk/wn2EEhO4kUHFd+H4gGIA6VxK0nGg2uLOIM3HBQ0hebQN05h3EHgrWB6NC5mm0P0Zk4y7cu9Ip36D5Lcmv3DubrE7ceNjnHbONO0J6LUKpcd9DqP6JrkMGomySTDNz8FcImLRQmu03DIWyE/cTnkLan6LnRwFlU5tgYkeYHV2etRmMuFbHKJdCuUtadTunN/cps/s3bQZINrjHAdNOlYgCmuR0CS5GnWZL4FhiVcxjMpcj8Xqp7LtRiDWMdUJPgdq1iklGcR53O3x2G3u8P9Ks69xclhbRoHHP/KNZyVetGRxZzFNTzomVs7l+s5H03b9jJW4HOMTuvSG4ghiouII47rAAqQ13ngdnrb9qJ4I/KjrpJogz251OH5Otu0cqXRCQ2fJo3gdq32bOPDpsvo36QyblE8pyo96kJ2vLYvk8Zxs2dDmz4Jbgp8nSsAk4q5lAd9m3OSKzncv5rQwnFczcNMKhuT5CGuCr7emPr3Wf1RgekoR6nnfqE4YvgJ+7A/csWEUsP/gA3gUJRiDIYgD3nIQxGAq4gjjjj+RhSxSKNphRaLxWKxWCwWi8VisVgsFovFYrFYLJZuwL+WTSug4479xwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0wNVQxNzowOTowMiswMDowMI98Oa8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAtMDVUMTc6MDk6MDIrMDA6MDD+IYETAAAAAElFTkSuQmCC",import.meta.url).href
  , du = new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAQAAABNTyozAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQflCgURCQLVG9sgAAAHfUlEQVR42u2dW2wVRRjHv+0RaeiFVkNLy00CHngwtkABSyRQLmJRY0KCEWiLCWiIQngANIEg8KAgiYl4feDFKAoUH/BSFFAxkIDEQoRAPD1VuQm0oFLaQ/W0p/37oJR2ZvfsmbNndqZ1fm9zzu58//nv7O7s7O63RAaDwWAwGAwGg8FgMBgMBoPBYDAYDIY+gKU2PCwaTkEaQ0MpkzIog3KJqIlaqZWa6BLVUz1dtDr/hwZhEE2nMiqlIA1wWTRKITpCh+mw1ahCqe8GYQItpNn0QBKRQ/Qp7bROJRRlDi2gXDpJ71nX/G5h8tYMwYs4A6+cxXoMd4m0rWvpRjyout2JmTMOe9Dh2ZzbtGEHih1jzeux7GkoPs66mzMFNehMmTl3OICptvH2McsVqXYgnjmjUCPBmjtU4z4u5ilmmce8tCBNojnp2EBnaK7ULTCffsIryOjxG7tLeWrjXbKUo4y206iEFm2iMIWpgSJ0i5qJKJsyaAAVUpCClOO6djqtpfmotI7LaokMcwLYhJjLzhHDcWzGHOTFrSkP5diC42h3qa0dG/DfxsZp5r8nVPvBNqoA37pYsw8LkC1UZzYq8KWL6UdR0AsMQika4zTiHFb924yk6h6MVbgQp/aLKNLcIMxCs6P8X7AS/T1H6IcqnHWM0YInNTYIlWhzEH4FFUjZGRNpWIwGxx24VVODsMJhOBjDNgxMebSBeMP10K2TQah0sCeE8dJilqC+lxiEWYjaituT+r7TI24WPugFBqEUt2yERbHUl+hLHY98ehiEfFyxkRXBo74pmImbsgzyfKmBAO0kfmRzneZatdIMCVA+pXf74RwtofcpI+kKZYJNNtvsGsZKi2dhOa4ndPbSYRdDmc00WDNKJEZ8VcgctQYh3eY0G8UsiRFHJzj2SZlB3ka3L9Fo7rfnra/lGURT5U3QpByMwl/c1vpQcswq4f4DPKzKIH4yNYRMyTGHuox5eH5Huve4yUidwkmJybuo6BZ3vZA9nahQYo9t/9nmU+TFOO06XwkAURxDuSp7irlL06vIUSRGR7CH216qurKOoJDr4qHUTYfpRXLNqqQA88tmtQ+paAY363sBd6vWpBGYwB1/VqnWpBV4nbGnPfkbOX0SbgerUa1IKzCIGwE9rVqTVuAp7gIjR7UmmYif5suYcq3VpLoRMhE36CGmfEh1E7QCFneDZ45qTQnpzpZ7f+5OoOHcGChfdeNdNQ9BDToA/Iwl0i+IMJux54bq5rsqTsPJbnrflR1uBWPQ96oNcFXMnnUni60v2uUKmXJYtQGuTGLKj4utLmoQO+es/4P+7CyD4DFT1KAsptyiuv2u3GLKbi/PMPR9gyJMWfAOvtddLCK4vv+wm1CyQb0P9rl7wZlPUYPYHiP5RmEK8HhQEDWIrT5LcH3/8dkgtgcZg1yqzxNc339YhYKnFVGDrjDloOr2uzKGKV8WW13UoJBLeP1gN2EoqVoSxWa6Q+udDAWc3iFiNYj2oEvc0H2cahPiUsyUI9xBwgVBgyxw1+9lYjX4DKuuzoJYBeIjaXYGSG+DZjDlY9IjYn7vue2DHO4plHnyg/I3DheoNsJRawWjtAP3+BGWvfW8T7URjkoPMEpPiNeRzNX8Aab8iJ4PL6CQOwId9CfweG5ssVq1GbY613A6/Up0wu1kF/V7gAr9cJ5R+WMy9SQ3YfYRUx5GC1UbwlFFI5hfJL8F0A2bhzjrEfBebwoVBlDHncEELzK8Cajm9u8q1ab00LeY07fLXwFF3GioQZ8BI7K5l0Q7fc9EhS+4bfSmamO6tL3Dadvrv4hSTkQME1RbQ0SEEps3OSZ5r1dcyOecjDoon6NGFsIa9B8iIoyweVt+t3KDdnCaWjFSlRi7d7eeU2rPMhtFa9XJ6Y8QJ6fNv4QCnJ6Z+JvTE/aekseLpOk2B8QWTFSiZSJaOC3t9qkE/ZT1sk2nlphYwFHHWFyzUbJOsT1ESONmXQDgD5T6qqLENjHYN1pcACFPg+QmdonBGjBYtTe3BU5GxEZg1J8zGpbZvireIjNBhrhIu/MHAHwiPcHSx7Zx27R7wB2LHFJ01cm7AEGJzagZADqg3/wUEZY7Jnl7S0KStxy87fD2fAdeUO2Fk+hFjokjrqIqdWcUBPCMY5rAqJa9p0v6zDiJJn9NWaLJkGOMiLJcCwk3YDKuwpnzWI3CpOsuxJq4qUova3XmcmxGPg4iHjF8hUXIFaozFxXY75KxY7/ej+J0b04a1ieQLvkHbEV5/JuOKEA5tqLWtbZ2rJPzqpO0hPiYRtvp/oQWbaYw1VEjRShCN4loIGVSJg2mIAUpsaTKdfSsdURWS6SBflhpc32dalqxUemEhkeTRuIzqfbs5ZP+9zpQjGopn404KPpynMagCLsTyhqVGDHs6iVfXBEyqQArUevZnLPYiBHe1WgLivAaTibxGZsOnMAW//uNqs9n3UvTaAaVUtD1faEIhekoHaLvrD9VKFX+YSAM6/oAWyZlUi4R3aAIRShCv1Edha1LqhUaDAaDwWAwGAwGg8FgMBgMBoPBYDAY+gD/ADZgJmteO14wAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTEwLTA1VDE3OjA5OjAyKzAwOjAwj3w5rwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0xMC0wNVQxNzowOTowMiswMDowMP4hgRMAAAAASUVORK5CYII=",import.meta.url).href
  , uu = new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAQAAABNTyozAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQflCgURCQOiHOu2AAAFEElEQVR42u3dwU8UVxwH8N9spI0E0mqBBRI3vXgQm9JGa7QxHknjml56bPGoF70bW5u0eNFjk17E/gMSLkUNngs2qb1XTMRGmtaLwYAiZjd8PbAFltl5b/bNb+b3Zuf3Pc6wj9/7JMzOvHnvQaTRaDQajUaj0Wg0Go1nCaQL2A4COkVHiOhP+i2AdDXeBRX8jv9zHxXpejwLevEIO7OAHumavAouY3cuSdfkVXA/BDQnXdNmStIFNFIOHRmSLmkzvgCVYhzxpDBNUxTIEgWyRIEsUSBLFMgSBbJEgSxRIEv2ZPnL0EcHaYX+CjYcP1+iEeqlR8HzLKvOKBjENOoAgCV8Ezr7JPSw+iT0M2fxDwCgjikMSveHm2cAi03dn2gXCBNNZxfRL90nXqBfQgBX2wHC1dD5Sek+cfJ0YRUwEZmBWvAAK8j0+pku0DBaZ4vIBNSSBwA8GTHiAOpGzUwUDRTJU8Ne6X5xEs0CJqIooEge4K50n3iBRrFmImoNZOB5hY+l+8RNdBrr0UStgAw86zgt3Z80iKoGoo0YR7Z5qtJ9SYvoC7xG0rzBl9L98Jmos3kSE3U+TyKiYvA4ExWHx4moWDxtExWPpy2iYvLEJiouTyyiTuDBOxhGt/OnTQ8gCR4q0I1hdEnbEPpxEy8B1DCLUWYiZx58gnuoA1jFpOjYNQabhuLXnDvUisidp9o0tLIo+AYE04ydWk+pJWBKiqev8Z6Lp2NjWN5qZRljbDxAHftlgI4zXzkG8B1m8Cu+db1uRF7NjssAHeb/7klUT/T34YgMUAlL/hAZeJ5CaooGxgE/iIx3U18L8RCF3pgLERl5JpK3n6y4HyJLy+gxwfi4ck2YR57Iex5ZolzwEBHhRwkiI891aRNxolzxZE+UO55sibLjsax6Ri9dpCrFHzD4MHJi8Rv6KrjDxFOlaXo34uQG/R27oWd0h34KXroXUtm11DZZ1l2f0XdVNWa4LWw/CzjgWkiwY6E2T5ZRdixmu6oyXjBXNQ/D35HpMe4UcQ8TvE/nErdxnt5jrupzOhl90gR0lLkQIqJjiVv4LIWqDG1mPRCQuy0nTEAPUvh9f3jQAlebCFos9096kR5I2heUd4xd82QOrlu8oIIFxkL8/Jp/aP6at90o9tAFOtPGLgj5ulH8l27TzwluFNsuvAMfNXLJk0siHe7wjCdXRDI8uSGS48kFkSyP90T64tBc2FkfeKxE41I8pcY6dnEeC9GS0OQFfOQPj4VIaPoL9wSqMr7HDGZwxfWZ37cJVB8wT8HbHmvujCl4RJhi40lzEuctIZ7QNOBXXk4Dfpz8TUoSon5MYhVADXddF2qnMJF8FLOoAVjBDfQJ8jTK6cKQ+y4IqS1F2IshD5YiJE0hFrOkyFNsIl1Qx8NTTCJd1MvLUywi3VggHZ5iEOnmJunydDaRbrBk5tEtuow8nzJv8rbmugjd0+Ceicdpm8BZ6T5x8uhGkxYg3arUAqSb3VqJJk08Ttsl35DuEy9QP/OG2489GGtmJhrEVOM92tPwQu1YW7aPN9bp13FL9E1Fikj7cQKHWr0pjwNEhBJGcAL7pPshkHhAEtH/q2GJAlmiQJYokCUKZIkCWaJAliiQJQpkiS9AGzGOiMQXoGehI/9Jl7QZX4Buh47MSJfkVdC7a/nwQ/RI1+RZUMH8Fs+c84Yj7HFdMZ5CENBJOkpED2g+yN0ODRqNRqPRaDQajUaj0WSWt2+76u1/jcSoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTEwLTA1VDE3OjA5OjAzKzAwOjAwKQsyGwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0xMC0wNVQxNzowOTowMyswMDowMFhWiqcAAAAASUVORK5CYII=",import.meta.url).href
  , hu = new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAQAAABNTyozAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQflCgURChOUhqgRAAAFQElEQVR42u2bbWiWVRjH/8e55WrTLF1izpdWWvSipWiUkVH0ZqYRYVGpvSm9UGw6Zk6cU9xymyQUCPUhpKIyiOiLUBEEBX6osBJMGhVFzZA2w5c02f59sNae8zzp85xzXecmuH6fHv7nOde5zp9re+5z3/cFGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGMb/Fpft8pyFRajCbrzhjnsjI3AvZuAQ3nWfZ5tjhrCV/TzJXtbmjEzkN3+P9LMl6zyzsmcRh/JhzthHOWOLss41C3sq2M1cpgyO1Xkj3azIKs9hmTm0AnWeMnXw04XeSB1WZJZnNrCa++kzf3B0ft7YAY7KJtOsKmg1zivp+2PQmFGmWcDxPEyWVEHkUU7IItdsKqgVZ5U8pxLrskg1A4M4DcuCJj7MS9Nnm0UFdWB40LwybEqfbHKDeDUWBE9eyLmp801fQV1R578uJj49JjaId+PaqABzcFfajJMaxOHYGB2kneUpc05bQY/hkugYU/FIypQTGsQqoSuZVlanyzplBa3EOJE4NahPl3QygzgWDWLBGiljdRGkq6D1GCkWqwprU6WdyCBegEcjpvfihKcs50VpMk9VQR2IuSfYg5c8pRxtiTJPAWdzgKfnv2937OFY/p73/WtS5J6mgp6LfbzkDmBLgagJSGAQF+AGgTBb0OMp1/EO/ezVDWIZ2iXiuCPYkCd2MuzGSQnoV9AySN3mehl7PeViLNFOX9kgVkLsuajrL3D1s5Fn6u5Au4LqURsf5B/cO/jUk8bjGd0NqBrE0VglHHIV6ClNHKO5B90KasFo2YBuF97zpFFoVt2DHpzMY0VcHhZ1oTgk6jSe8EaPsy4kv+LQrKA2nCEf1O3DK55UUeACQAw1gzgdi5VCt+CIp9zHmVr70KugLq3YrgdbfQldWttQ2gRvwU1aKQPYjF89ZR5v1llKxSAO070Z4Q4ViN9Jlb3oVNADuEol7r9sQ7enXIH7NRZSMIgjNH9VTuJOFDh2tLFSfiWNCnoKkxSi+uzALk+ZgCfklxE3iGdjtZIlOTgWWKeZ50ivI19Ba3CujiU+7mPs9KTRaJJeRdggno8nFT3xaUK/pzzNibJLSFfQJijfnxmK+xqvetIItMquIWoQL8eDyp74rMVRT1nCKyUXkK2gjtTvG7mf8WLejkRf1BPcEK/HrQk88WnHb55yG2+UCy9mEBUPjKfCHSzw1KRL7tghV0GLMSuNJXm8gO88ZQbukQouZBDLBV6uC8T9ifV5YjuFbtZJVdDjeR06KXkdX3jKFCyXCS1iEKuxJrElObgBPJsnrpPpD5KpoFJ7d8Rx7+MDTxLqDxIwiOoP74qiEQOe0iDRHyRRQSG9O+K4L/GmJ4n0B0UbFNy7I08zvNZyif6g+AoK7d0Rx/2AbZ4k0B8UaRDn4s4MPfHZgF5PWch5cSFjKyjJa3DF4vrQmZ9hXH9QlEHRvTvybMVPnhLZHxRhkEjvjjDuWMFjR0R/UEwFSfTuyLMdezwlqj8o+BdIrHenGEaylNP5J7jMU1r4mjsctnT4T7RU704x1GJH1PxxaAh9mBn4J8YarFQ2RZZVrAmbGPo/6CEkbGoToBpLwyaGGjRdYRMs8EmOwIxDDepT2MIvg5/2K0TvDZsWatBb4hvYh68GP+/Gt+Lx3xaPeGq4uaQ3WE9HH2fnRJ/Dg6Lxg/tFIs4pvB1LMRll0V7/gc/wvPvRiz4J9ZiJ+Dd++vE9trud0XEMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwwDwF7xyx2h0ACL/AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTEwLTA1VDE3OjEwOjE5KzAwOjAwfEqZwQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0xMC0wNVQxNzoxMDoxOSswMDowMA0XIX0AAAAASUVORK5CYII=",import.meta.url).href
  , fu = new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAQAAABNTyozAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQflCgURChOUhqgRAAAEgElEQVR42u2dTWxUVRTH/wcqVmlEjIAxiqljUolQsMSghoSEtJqYmIjJ4M7oZnCnrqYLQsCN08QNbkxZ4kbahSYSN6DEjxiRAFU0sRqiJUYkQG0tYIHSvysNZTrvvum9b877OL/1e+ee85v23ffufXMGMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAwvRDsBP7gSr6IbEzggX2jnkjrYwV2c4n8MaOeTKtjG13iWc3lOO6vUwBf5E+s5oJ1XKuBmfs35+UY7N3XYxSHOshHfauenK2cF9/I6oyiuIHawyr/popiCeBsr/NMpp5iCKCzzl1hyiiiIT/Or2HKKJojr+IlDxw98r6CC+AAHORMp53dWuJjlAgrictZ4JVLOFHfzDgAonCAuYYXnIuVc4yBX/n98kQRRWObpSDmzHGJpzjnFEcRennBckg+xp+6sYgjiWh50zlflec/MvyCu5iBvRMo5wwoXNzg734J4D2v8J1LORVbZHhEhv4J4J6v8K1LOVe7l3Y4o+RTERSzz10g5NzjEzhiR8iiIvRxxzlcbYsbKmyA+wSMOOce4tYl4eRLEh7g/YrGUJMdY4aKmYuZFEO9ljdORci6wytubjpsHQVzKKicj5VxmjcsWFDvrgtjGCv9wzFf7ef+C42dbEHt5yjlfdXuNkF1BfJKfO+Qc5RbvUbIpyLG5R5KjLDPAWyUZFBRjc+88q1wSaLRsCYqxuXeJNd4VcMTsCIqxuXeNg7wv8KgtEdQWINEX8A5KjoPGsREHGTb35UkIuRVvQdyDXTEOW4VVrSgnPE09/dTDjdipXUKyeArCNu8IKce3vA7tAm5iOomgvoJOKohoxPEkgnre0bIdJ/Goho06JrBezoQP6/kXJNN4Bp/qGJnDKJ5NQk+gN+3ZiU7Vi/UFfC+ziuMbhmEkRJiL9MPoVP1i1ThGUnuR5mp+Rn1+5qZk6vO/URxBV+s/lnmYxHoZCx/W9+7lpZToAZbhzSTC+gp6XEFFI3r8Q9TjK+iSgohGtPuHqMdX0IdI6+wRCN+H1eN4S7uEZPF+xJQ92IbT2mUkR4BncPkIa7AD57RLSYYgixRyXfahhH5MaZcTnmCrOHJZBlDCu5jRLiksQZe55Ly8jrUYRuAdQk2CrwPKqGzHU8hNJ41EFkrlqGxBH05pFxeCxFaS5TB6sANntQv0JcGldpmRfXgE/ZjULtKHhPci5IoMoIQBXNUudKG0YLNGLko/uvB+Nue2Fu1myZi8jE04ol1u87Rwu0+OyVb04Tvtkpujxfuhchg92I7ftMuOT8s3jGVWhtGFNzChXXrKifGVzGZJ71uuC5b0oLMJRbEFAQAf48dpFqT+hqH8KM+jDye080g5MVpTFPVf7CZJ7uYmxRYEAOzgbkd7nGILAmI1WCq2IADgGg6ZIJcka/LmVGRtAmNIskaTMSQttValbknW7DaGJGuX7MYabsegQcv2D7TzShHW9D8Gt/xsxNvJjJL9Hx55Bd0Yx7B8qZ2LYRiGYRiGYRiGYRiGYRiGYRiGYRiGYczLv+uBSl/JwU6tAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTEwLTA1VDE3OjEwOjE5KzAwOjAwfEqZwQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0xMC0wNVQxNzoxMDoxOSswMDowMA0XIX0AAAAASUVORK5CYII=",import.meta.url).href
  , pu = new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAQAAABNTyozAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQflCgURChbk7FyeAAAHb0lEQVR42u2dWWxVRRzG/6WttGwiqyCJFBTBFgkhEcqiEmNAEyJrpJEgiUlNwEhATRWeCJJWSDCEpxJ8IRATAlGCiUQWY0BAQMMisosJyKZsZatI+/OhpfS0M3PuPb1n5rad75HM8s13fp05Z+aci4iXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5dXC1CGawM1IksKpVCeky4ick2Oy17Zk/HAtas0Ed35nIs01AXK6Obam3ORyTxuoNN15pHp2qPLePrzI2HayyDXPt2E04ZibofGA3CPklbHUULstFaOkmCnNXKUNDutiSMy+Yh72uHf5itKmM86Q5l7fNxiOWIgewx0rKV7XclerDWU3MNA12NJfTjmeecSkxvVeIPzrWY+Cpl31qvvmOlMeSuYj5JnJ1C7pXMUjZ1ACy2Xo6axE2ipJXLUdHYCrbUsjlLHTqDVlsJRatkJtNz8OYqHnUAPzZmj+NgJ9NI8OYqfnUBvzY0jO+wEemw+HNllJ9Bzc+DIPjuB3tObI3fsBFykK0f0Ddnf6WLNSVfWGZzsoa+LePK4rLV0kTet+5moOHx8qMvk2Q9oezqwE3Bk4mibbTOD3M47Wl/6+WiAXSMzlCZiXrMScqZb16ZHa69NRB+qt0Kq5bzcdR2Q3Je7QoKO4xMvaEA+yWiX6TCakxpn+bat7NUYqWI57ZyE044vqNK42m3fTgEV2jXDAUcGduCmdX5ERBjMMa0lqxwZ2YFjDHYQj4gIOZTxQGvsDK9YcVHIccOFKqe9o3hq7Q3nd6296rjtkWu8RKd5yWk4tSadcZTm7ASsWueoWbATMGyVo7Rnhyzlv44IWddyU9J32Jo1QlnL7q4QX1OC4jElfo6isEMGxayzGU8GFcB29S5LfBxFZCePHcBlmwE9XmvpFrNRPASSw1IDRycZFalX073yA5aRo6iTwWxu1ZbpaC+gXvWs7bDBEe1YHpkd7AfUNmAvdo6azE7NRclJtL9URHSmgc3YOCI3BewAHLEYjwirG1mNhSNGpYCdGpXbDWiM0vJOnlWWjnSfHe1emb5sU5YvtBqQCDuVNlLGUQrZAfjecjwi5FOpsR91PqpbZWifonnnoSp43npAIrylHUQ0jq6ygnd4l5VcSiE7UMVUB/GIiFDEHe1QonAUpuTZgdtMdBSPiAhDOKy1Fo2jVLIDhxniMB4REbIp4b7W4K4I65pKya5ZAP9RRlvH8dTafNEw3DuRnvvry/SMrj9ZOc0Y17kkPtymcBSFnWrK3ZzNmUMazSmtZf18VKq9XYBKSjXzzhzDvHPK7elujcURqj1F2rGSaq1x3bqWx5eK4d5itba8fs2qZqWKHbLU6198AR1in/q0krGcTZYjEToymWVsYhe72MRSJtFBWc7MzlnGKmsVcIC9NuPJogqo5FMlRx0pT56jhPo1s1Ou2vEhi4VUApVk2wuoZ50tHUfjOJc8R8Y+zeycY5yyVgEH6sp0shdQl3rW7lOmujZ0Mr6gq1nXtD2a1ixYr3rpjyxKAguAxR3FNvwbMLhfw9EELhg4mpMYRyHsXGCCslZ9dgAqrB788FMDmzqOOjeVo1B2FC/9NWIHYKvFeERYqDCr42gKVwwcfaA+hBQRIZP3DexcYYqyVkN2avSJ3YCebPBHVqNKFijXtR5sMFBwlOmNn5nI5m3DgzBsoIeip4drVkNVWH81mVKNcR1HRVw1DPdv1vIerzGUYYxlDmu5Zih9lSJlHwXs19RYYjkeEXI5qDGj46gXm0mFNtNL0bqOHYDdPGY9IBF6Nzr8CedoluEHuRLRDWYp29WzA8d4ykE8IiJ0M3yQoOOoD1six7OFPooWTezAVp5wFI9I7Z6Mftv1IEOVtWYa9nF0usNc5X5APvu0ddLjozr6a46AQH9/9LSBPZV28YyiFdX9ziP9nDafZYYYVXJEBsWGe5z6uqvZkzSxo7kwLkPKV96ePbKrWEfI44fQeHarvtMJuSSH1X/ariPKZpFh+34/BYo6bZhruOO5xlwlO6Y16z6L0oydgPVhHNFa161rXVnCX41Kn+czuipKZ7HAwM4RhrnOICyitpQatu+VHImQyUg+ZBUb2cgq5jNSvfoY2XlAaZoc84SGNNxweqqZjxJo1TzvpNcxT+hgzMdAh5KfRI1rVuyfPMQTUiEnUsNRCDt/2PloJo6IcikzvMaSIEeh7HRIpJW0lfE4MZSjEHb+5FXX40tFRJ1YZTgG+pWXtTVH8YuBnVUWzyliD2m84fc1YDtFwcHSienGu+zzjLfj3NrH0nSWFTLTUKBKDskZuSLZ0lEGSb6Y7obXyNyMG7acWxSvGzlKTJeY5HoccUZkPgYKVxr8tkP8IU01HAOZdI0Zrr3bish8DKTWt/R27dtuSNP4J+FwrlPs2q+LiHryTULxfKfaqm8lYprxOBFuUpz8qzItSnRjhea5v4o1qiPCVij6sZij9R5rq/iNxfRz7Uskbf77LBEROssA6SoiV+VExk3Xbry8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLzq9D+77FW8vjS8sQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0wNVQxNzoxMDoyMiswMDowMPDCytgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAtMDVUMTc6MTA6MjIrMDA6MDCBn3JkAAAAAElFTkSuQmCC",import.meta.url).href
  , mu = new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAQAAABNTyozAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQflCgURChl0U0EPAAACX0lEQVR42u3YT0tUURzG8eeK0KjURlNDrZa6zDa1cFrVpkBpVUvrBQi+B/+8BcF9UWYqtalF5aZB6B0oqJMFpZtCKRSfFhI4MnPOHe7odfH9bOd8h3N+XO7lXgkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgHMnadxf+boe6pau6K/Keq83ya+66k6NqKg+SWUtayH5UVd9SQ90V326oO8qaT5ZP4vh1bPBDs/6wMfteNxNKesWT3uvot7ztFtS1k0e905FfeBZd+Q9k+NbHPCaq1lyW4q62ytV6xV3p6jbvFS1XvNA3nP5v8WOGuOx7fnYVeSCSzXrL26N1Imf16w33JX3bI42OeeQp5F6KlhPReonwXou79lI8qAPg5v86uZA3Xni3nPSXugqcLPLwfrQN7OeL+VtNOBx5EnYo6HAryMK34pbNBz4dUi9wTrRo/wHVIyuuHNO61SyD6g3uqInU917anUq2QfkTCvyrFPJPqCt6IpvmeqtU6tTyT6gj5lWfDrl+kPm82XlG5HHfDnymN+NPOY7A3WzNyOP+cG85yPJL4KbHI3Uk8F6MlKPBuuXec/maJPtgVeNV458L3DBn2vWaV41ntWs10NX39mOqN+rVbe4EDugJLmrxttYKc27lFu9ULVedX/eczm+zXbPeL9ig9seS/25o+CJE/eiXU+4kLJu8pi3K+p9z7i9MSdr5AezaxrRbfXoj8p6p7fJ77rqyxpWUVclbWpZi8nPuuqLuq976lNBWyrpdbLRuHMBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHDu/AMPCoKOmUpbYAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0wNVQxNzoxMDoyNSswMDowMDVl9FYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAtMDVUMTc6MTA6MjUrMDA6MDBEOEzqAAAAAElFTkSuQmCC",import.meta.url).href
  , yu = new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAQAAABNTyozAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQflCgURCiVbPD2IAAAEmUlEQVR42u2cz28VVRTHz+WRVqHihmoMASoJCUQMhEDZU5YaCnupibFBwPiv4EIhIIuyqibAwmVpIjslcSUlQvwRJCSiLrRo2sZHvy5sy5z7fswMc+ee6cz3s3ozc+fc7z25c+fe77vviRBCCCGEEEIIIYQQQgghhBBCCCGEGOKsBSTBBnlDRObcsrWSSoI9mAMAzGGPtZYKghbuYJU5bLTWUzlwAklOWuupHLipEjRrradiYC+WoXnTWtP/bLAWsMLZjvfpaWtJFQIv4S/4PMHL1rpEqtKDJmRLx7khOWUtqzLgO3TjPio1jTUDx9CLY9baKgFu9EzQDWttFQA78G8iJb/jceKojZ3W+uwH6dOSXFZcls8SR63Gv+wx6PWYEWz3etQL1hptEzShxpzrIiK4ps5NWGu0TdBtlYwxEREcVee+tdZomZ6DKhV3V+c93rzoiKVG20H6I3X0qcPKp4vq/FlTjXZgKxYS/WQea8sNDOHPxJUlvGqn0rIHTUryDTXl5lc/ur/lauLKgLxnqNIKtPCzGmn2qau7lT/0SwMtWM9inem4PqOuN8+C9SzW8Y7r4+p60yxYz2J90PkIoYWfej+C8bAapLXFetG1/QLuqVxSJ5q0KvMs1kW80rWUngYYWbA2PUhbrNPut26F3B/yeeKwSRast5Q43LOcXoo0xYL1LNa+i1F8o8o2w4L1LNa+Dw5OqbJNsGCxA+1Ek1MMMQzi10TpNl6PrTf+IP2BtBJHl9xiv8JuSa4kDlsyGV1vXDot1tQ7mmXBdrNYU++5ru6ptwXbzWJNvWcs+1svPFFtBIxKcs6zIIdxKMNtThbkxbWjgxh1t2OqjgiuIgRTMTVHnJtiqzyUEEPskux0j2OpjvmanwySHpHBmBZstB6ElvwgI4GCPZRdnQZJOcTrQceDpUdku7wdTXcsMBtkgF7lpnV7QqfHt1hbuSMYWbCxHjFtsV5wT/MGqLUFm81iTY3iW7BbnidKXuL0oHezWKxp1NiCTfxMBehjsabGqacF61msXxeKVUcL1rNY3ykUq34WbD6LNTWab8GOlK2//EE6l8WaRu0s2PwWa2rEelmwnsV6LUjMOlmwnsV6NEhMUws2bHqOqKbcDTVv8b66Hi2zDeUO0np/6idru1iLUo9dsBjutYu1cGR/bVfiLtgye9D7vXaxFsU9Ubtgo1qwwei/i7Vw9L3rfhcsTqr0zBSP6MXXm0BPWLc3fwO0xToePL7eRrzeLNjiFmtqDaU+ws8oa5A+V9RiTWNdW7AYwLx6DQ+XUsswFtU0YsC63dmlH1Cdv7Tv0jGl6tlv3e7swrcp4c9tsabWoy3Y16zbnUf6F2FX8D3rmV6rZ9q6zfmEb8LHeIRHOI/NpdazGedX6tlk3WZCCCGEEEIIIaRqwOEc7nX8Je36Yxnf40wJm/fwoXXLgnIma7szZxL3ZXekzhqDey7j38Jn/1ajFOPdjMw7tbMn6JZ1m4LyVdaC2R+xEZmVXdbtCsSPMuYeZCuaYzTHkLwl++L+yrUE2nJHvnT/WMsghBBCCCGEEEIIIYQQQgghhJD68B/dU6utQMyavQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0wNVQxNzoxMDozNyswMDowMG5Q5eEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAtMDVUMTc6MTA6MzcrMDA6MDAfDV1dAAAAAElFTkSuQmCC",import.meta.url).href
  , gu = ".bv,.bvr,.f2b,.bdv,.cst,.tvw,.gr,.brd,.con,.pcb,.cad,.fil,.faz,.fz,.cae,.asc,.a3p,.nbv"
  , bu = /\.(bv|bvr|f2b|bdv|cst|tvw|gr|brd|con|pcb|cad|fil|faz|fz|cae|asc|a3p|nbv)$/i
  , Co = "Viewbv-web:view-settings:v1"
  , So = "Viewbv-web:webgl-fallback-notice:v1"
  , Po = "Viewbv-web:renderer-preference:v1"
  , Zs = 1.3
  , Ei = 56
  , Da = [{
    command: "zoomIn",
    key: "plus",
    ignoreShift: !0
}, {
    command: "zoomOut",
    key: "minus",
    ignoreShift: !0
}, {
    command: "panUp",
    key: "w",
    ignoreShift: !0
}, {
    command: "panUp",
    key: "numpad8"
}, {
    command: "panDown",
    key: "s",
    ignoreShift: !0
}, {
    command: "panDown",
    key: "numpad2"
}, {
    command: "panLeft",
    key: "a",
    ignoreShift: !0
}, {
    command: "panLeft",
    key: "numpad4"
}, {
    command: "panRight",
    key: "d",
    ignoreShift: !0
}, {
    command: "panRight",
    key: "numpad6"
}, {
    command: "rotateClockwise",
    key: "r",
    ignoreShift: !0
}, {
    command: "rotateCounterclockwise",
    key: "comma",
    ignoreShift: !0
}, {
    command: "flipBoardSideOverXAxis",
    key: "space",
    ctrl: !0
}, {
    command: "flipBoardSide",
    key: "space",
    ignoreShift: !0
}, {
    command: "toggleNetweb",
    key: "modifiersOnly",
    ctrl: !0,
    alt: !0
}, {
    command: "mirrorBoardHorizontally",
    key: "m",
    ignoreShift: !0
}, {
    command: "mirrorBoardVertically",
    key: "h",
    ignoreShift: !0
}, {
    command: "clearAllSelections",
    key: "escape"
}]
  , xu = {
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    panUp: "Pan up",
    panDown: "Pan down",
    panLeft: "Pan left",
    panRight: "Pan right",
    rotateClockwise: "Rotate clockwise",
    rotateCounterclockwise: "Rotate counterclockwise",
    flipBoardSide: "Flip board side",
    flipBoardSideOverXAxis: "Flip board side over x-axis",
    toggleNetweb: "Toggle netweb",
    mirrorBoardHorizontally: "Mirror the board horizontally",
    mirrorBoardVertically: "Mirror the board vertically",
    clearAllSelections: "Clear all selections"
}
  , wu = {
    plus: "+",
    minus: "-",
    comma: ",",
    space: "Space",
    escape: "Esc",
    modifiersOnly: "",
    w: "W",
    a: "A",
    s: "S",
    d: "D",
    r: "R",
    m: "M",
    h: "H",
    numpad2: "Numpad 2",
    numpad4: "Numpad 4",
    numpad6: "Numpad 6",
    numpad8: "Numpad 8"
}
  , vu = Da.filter( (t, e, n) => n.findIndex(i => i.command === t.command) === e)
  , Cu = vu.map(t => `
      <tr>
        <td>${xu[t.command]}</td>
        <td><kbd>${Su(t)}</kbd></td>
      </tr>`).join("");
function Su(t) {
    const e = [];
    t.ctrl && e.push("Ctrl"),
    t.alt && e.push("Alt"),
    t.shift && e.push("Shift");
    const n = wu[t.key];
    return n && e.push(n),
    e.join(" + ")
}
const Pu = 180
  , za = 28
  , qs = 10
  , Bu = 220
  , Ha = 28
  , js = 10
  , Au = 220
  , Ya = 28
  , Qs = 10
  , Mu = 32
  , Lu = 26
  , Js = 10
  , Xa = 200
  , Tu = 1e3
  , Bo = window.matchMedia("(max-width: 640px)")
  , hr = window.matchMedia("(max-width: 900px)")
  , Ao = window.matchMedia("(max-width: 900px), (hover: none), (pointer: coarse)")
  , Iu = navigator.maxTouchPoints > 0 && window.matchMedia("(pointer: coarse)").matches
  , Qt = /(?:Firefox|FxiOS)\//i.test(navigator.userAgent) && navigator.maxTouchPoints > 0 && window.matchMedia("(pointer: coarse)").matches
  , Ua = {
    key: "pin",
    direction: "asc",
    userSelected: !1
}
  , Ka = {
    key: "refdes",
    direction: "asc",
    userSelected: !1
}
  , Za = {
    key: "refdes",
    direction: "asc",
    userSelected: !1
}
  , qa = document.querySelector("#app");
if (!qa)
    throw new Error("App root is missing.");
window.addEventListener("error", t => {
    console.error("[ViewBV Web] Unhandled error", t.error ?? t.message)
}
);
window.addEventListener("unhandledrejection", t => {
    console.error("[ViewBV Web] Unhandled promise rejection", t.reason)
}
);
Up();
qa.innerHTML = `
  <div class="shell">
    <input id="fileInput" class="hidden-file-input" type="file" accept="${gu}" />

    <header class="app-toolbar">
      <div class="menu-row">
        <nav class="menu-bar" aria-label="Application menu">
          <div class="menu-root">
            <button id="fileMenuButton" class="menu-button" type="button" aria-haspopup="menu" aria-expanded="false">File</button>
            <div id="fileMenu" class="menu-popover" role="menu" hidden>
              <button id="menuOpenButton" class="menu-item" type="button" role="menuitem">Open...</button>
            </div>
          </div>
          <div class="menu-root">
            <button id="viewMenuButton" class="menu-button" type="button" aria-haspopup="menu" aria-expanded="false">View</button>
            <div id="viewMenu" class="menu-popover menu-popover-wide" role="menu" hidden>
              <button id="flipWithoutMirroringMenuButton" class="menu-item menu-check-item" type="button" role="menuitemcheckbox" aria-checked="false">Flip the board without mirroring</button>
              <button id="flipOverXAxisMenuButton" class="menu-item menu-check-item" type="button" role="menuitemcheckbox" aria-checked="false">Flip the board over X-axis</button>
            </div>
          </div>
          <div class="menu-root">
            <button id="optionsMenuButton" class="menu-button" type="button" aria-haspopup="menu" aria-expanded="false">Options</button>
            <div id="optionsMenu" class="menu-popover menu-popover-wide" role="menu" hidden>
              <button id="drawPinPadsMenuButton" class="menu-item menu-check-item" type="button" role="menuitemcheckbox" aria-checked="true">Draw pin pads</button>
              <button id="hollowPinPadsMenuButton" class="menu-item menu-check-item" type="button" role="menuitemcheckbox" aria-checked="false">Hollow pin pads</button>
              <button id="showNetwebMenuButton" class="menu-item menu-check-item" type="button" role="menuitemcheckbox" aria-checked="false">Show netweb</button>
              <button id="showPinNetLabelsMenuButton" class="menu-item menu-check-item" type="button" role="menuitemcheckbox" aria-checked="false">Show net name under pin label</button>
              <div class="menu-separator" role="separator"></div>
              <button id="renderUsingWebGpuMenuButton" class="menu-item menu-check-item" type="button" role="menuitemradio" aria-checked="false">Render using WebGPU</button>
              <button id="renderUsingWebGlMenuButton" class="menu-item menu-check-item" type="button" role="menuitemradio" aria-checked="false">Render using WebGL2</button>
              <div class="menu-separator" role="separator"></div>
              <button id="resetSettingsMenuButton" class="menu-item menu-check-item" type="button" role="menuitem">Reset settings</button>
            </div>
          </div>
          <div class="menu-root">
            <a class="menu-button" type="button" href="./../store.html">Go to Store</a>
          </div>
          <div class="menu-root">
            <button id="helpMenuButton" class="menu-button" type="button" aria-haspopup="menu" aria-expanded="false">Help</button>
            <div id="helpMenu" class="menu-popover" role="menu" hidden>
              <button id="keyboardShortcutsMenuButton" class="menu-item" type="button" role="menuitem">Keyboard shortcuts</button>
            </div>
          </div>
        </nav>
      </div>

      <div class="toolbar-row">
        <div class="view-controls" role="group" aria-label="View controls">
          <button id="rotateCcwButton" class="icon-button" type="button" title="Rotate counterclockwise" aria-label="Rotate counterclockwise">
            <img src="${cu}" alt="" aria-hidden="true" />
          </button>
          <button id="rotateCwButton" class="icon-button" type="button" title="Rotate clockwise" aria-label="Rotate clockwise">
            <img src="${du}" alt="" aria-hidden="true" />
          </button>
          <button id="fitButton" class="icon-button" type="button" title="Fit to screen" aria-label="Fit to screen">
            <img src="${uu}" alt="" aria-hidden="true" />
          </button>
        </div>

        <div class="side-switch" role="group" aria-label="Board side">
          <button id="topSideButton" type="button">Top</button>
          <button id="bottomSideButton" class="active" type="button">Bottom</button>
        </div>

        <div class="toolbar-combos">
          <div class="search-field">
            <label for="componentSearchInput">Parts:</label>
            <div class="combo-shell">
              <input id="componentSearchInput" class="combo-value" type="text" autocomplete="off" spellcheck="false" />
              <button id="componentDropdownButton" class="combo-trigger" type="button" aria-label="Show parts"></button>
              <div id="componentDropdown" class="combo-menu" role="listbox"></div>
            </div>
          </div>

          <div class="search-field">
            <label for="netSearchInput">Nets:</label>
            <div class="combo-shell">
              <input id="netSearchInput" class="combo-value" type="text" autocomplete="off" spellcheck="false" />
              <button id="netDropdownButton" class="combo-trigger" type="button" aria-label="Show nets"></button>
              <div id="netDropdown" class="combo-menu" role="listbox"></div>
            </div>
          </div>
        </div>

        <div class="toolbar-separator flip-separator" aria-hidden="true"></div>

        <div class="flip-controls" role="group" aria-label="Flip board">
          <button id="flipHorizontalButton" class="icon-button toggle-button" type="button" title="Flip horizontal" aria-label="Flip horizontal" aria-pressed="false">
            <img src="${hu}" alt="" aria-hidden="true" />
          </button>
          <button id="flipVerticalButton" class="icon-button toggle-button" type="button" title="Flip vertical" aria-label="Flip vertical" aria-pressed="false">
            <img src="${fu}" alt="" aria-hidden="true" />
          </button>
        </div>

        <div class="toolbar-separator layer-separator" aria-hidden="true"></div>

        <div class="layer-tools" role="group" aria-label="Layer tools">
          <input id="layerModeInput" class="hidden-toggle-input" type="checkbox" />
          <button id="layerModeButton" class="icon-button toggle-button" type="button" title="Layer mode" aria-label="Layer mode" aria-pressed="false">
            <img src="${pu}" alt="" aria-hidden="true" />
          </button>
          <div class="menu-root toolbar-more-root">
            <button id="moreToolsButton" class="icon-button toggle-button" type="button" title="More..." aria-label="More..." aria-haspopup="menu" aria-expanded="false" aria-pressed="false">
              <img src="${mu}" alt="" aria-hidden="true" />
            </button>
            <div id="moreToolsMenu" class="menu-popover menu-popover-wide toolbar-more-menu" role="menu" hidden>
              <button id="highlightSamePartsButton" class="menu-item menu-check-item" type="button" role="menuitemcheckbox" aria-checked="false">Highlight same parts</button>
              <button id="highlightSelectedPartNetsButton" class="menu-item menu-check-item" type="button" role="menuitemcheckbox" aria-checked="false">Highlight part nets</button>
              <button id="darkenPartsWithoutInfoButton" class="menu-item menu-check-item" type="button" role="menuitemcheckbox" aria-checked="false">Darken parts without info</button>
            </div>
          </div>
        </div>
      </div>

      <div class="tab-row">
        <div id="documentTabs" class="document-tabs" role="tablist" aria-label="Board tabs"></div>
      </div>
    </header>

    <div id="workspace" class="workspace">
      <main class="viewer">
        <canvas id="boardCanvas"></canvas>
        <canvas id="labelCanvas"></canvas>
        <div id="boardTooltip" class="board-tooltip" hidden></div>
        <div id="boardLoadingIndicator" class="board-loading-indicator" role="status" aria-live="polite" hidden>Loading boardview...</div>
        <div id="homePane" class="home-pane">
          <img class="home-logo" src="${bt}" alt="ViewBV" />
          <div class="home-version">${ms}</div>
          <div class="home-open-text">You can open a boardview from File -> Open... menu or drag &amp; drop it here</div>
        </div>
      </main>

      <div id="sidebarResizeHandle" class="sidebar-resize-handle" role="separator" aria-label="Resize sidebar" tabindex="0"></div>

      <aside id="sidebar" class="sidebar">
        <div class="right-tabs" role="tablist">
          <button id="partTabButton" class="active" type="button">Part</button>
          <button id="netTabButton" type="button">Net</button>
          <button id="findTabButton" type="button">Find parts</button>
          <button id="layersTabButton" type="button" hidden>Layers</button>
          <button id="subBoardsTabButton" type="button" hidden>Sub-boards</button>
        </div>

        <div id="partPane" class="sidebar-pane part-panel">
          <section class="panel-section pins-section">
            <div id="partDetails" class="part-details" hidden>
              <button id="partRefdesLine" class="part-refdes" type="button"></button>
              <div id="partPinsLine" class="part-pins-line"></div>
              <input id="partInfoEdit" class="part-info-edit" type="text" readonly spellcheck="false" />
            </div>
            <div id="pinList" class="pin-list part-list-no-selection">
              <div class="pin-row pin-row-header"><span>Pin</span><span>Net</span></div>
            </div>
          </section>
        </div>

        <div id="netPane" class="sidebar-pane net-panel" hidden>
          <section class="panel-section net-section">
            <div id="netNameLine" class="section-title">Net</div>
            <div id="netList" class="net-list">
              <div class="net-row net-row-header"><span>RefDes</span><span></span><span>Pin</span><span>Info</span></div>
            </div>
          </section>
        </div>

        <div id="findPane" class="sidebar-pane find-panel" hidden>
          <section class="panel-section find-section">
            <div class="find-search-row">
              <input id="findPartsInput" class="find-input" type="search" autocomplete="off" spellcheck="false" placeholder="Search by the info or number of pins..." />
              <button id="findWholeWordButton" class="find-word-button" type="button" aria-label="Search for whole word" aria-pressed="false" title="Search for whole word">
                <img src="${yu}" alt="" aria-hidden="true" />
              </button>
            </div>
            <div class="find-filter-row" role="group" aria-label="Filter by">
              <span class="find-filter-label">Filter by:</span>
              <label class="find-filter-choice" title="Filter by the number of pins">
                <input id="findFilterPinsInput" type="radio" name="findFilter" value="pins" />
                <span>Pins</span>
              </label>
              <label class="find-filter-choice" title="Filter by the info">
                <input id="findFilterInfoInput" type="radio" name="findFilter" value="info" checked />
                <span>Info</span>
              </label>
              <label class="find-filter-choice find-highlight-choice">
                <input id="findHighlightMatchesInput" type="checkbox" />
                <span>Highlight matches</span>
              </label>
            </div>
            <div id="findPartsList" class="find-list">
              <div class="find-row find-row-header"><span>RefDes</span><span></span><span>Pins</span><span>Info</span></div>
            </div>
          </section>
        </div>

        <div id="layersPane" class="sidebar-pane layers-panel" hidden>
          <section class="panel-section layers-section">
            <input id="layerInfoEdit" class="layer-info-edit" type="text" readonly autocomplete="off" spellcheck="false" />
            <label class="layer-full-signal-choice">
              <input id="layerFullSignalTraceInput" type="checkbox" />
              <span>Highlight full signal trace</span>
            </label>
            <div id="layerList" class="layer-list empty-list"></div>
          </section>
        </div>

        <div id="subBoardsPane" class="sidebar-pane subboards-panel" hidden>
          <section class="panel-section subboards-section">
            <div id="subBoardList" class="subboard-list empty-list"></div>
          </section>
        </div>
      </aside>
    </div>
    <div id="listTooltip" class="list-tooltip" hidden></div>
    <div id="aboutWindowBackdrop" class="about-window-backdrop" hidden>
      <section class="about-window" role="dialog" aria-modal="true" aria-labelledby="aboutTitle">
        <div class="about-titlebar">
          <div id="aboutTitle" class="about-title">About ViewBV Web</div>
          <button id="aboutCloseButton" class="about-close-button" type="button" aria-label="Close">X</button>
        </div>
        <div class="about-content">
          <img class="about-logo" src="${bt}" alt="ViewBV" />
          <div>
            <div class="about-name">${ms}</div>
            <div class="about-text">The boardviewer is fully client-side.</div>
          </div>
        </div>
        <div class="about-actions">
          <button id="aboutOkButton" class="about-ok-button" type="button">Close</button>
        </div>
      </section>
    </div>
    <div id="keyboardShortcutsWindowBackdrop" class="about-window-backdrop" hidden>
      <section class="about-window keyboard-shortcuts-window" role="dialog" aria-modal="true" aria-labelledby="keyboardShortcutsTitle">
        <div class="about-titlebar">
          <div id="keyboardShortcutsTitle" class="about-title">Keyboard shortcuts</div>
          <button id="keyboardShortcutsCloseButton" class="about-close-button" type="button" aria-label="Close">X</button>
        </div>
        <div class="keyboard-shortcuts-content">
          <table class="keyboard-shortcuts-table">
            <thead>
              <tr>
                <th scope="col">Action</th>
                <th scope="col">Shortcut</th>
              </tr>
            </thead>
            <tbody>${Cu}</tbody>
          </table>
        </div>
        <div class="about-actions keyboard-shortcuts-actions">
          <button id="keyboardShortcutsOkButton" class="about-ok-button" type="button">Close</button>
        </div>
      </section>
    </div>
    <div id="resetSettingsWindowBackdrop" class="about-window-backdrop" hidden>
      <section class="about-window message-window" role="dialog" aria-modal="true" aria-labelledby="resetSettingsTitle">
        <div class="about-titlebar">
          <div id="resetSettingsTitle" class="about-title">Reset settings</div>
          <button id="resetSettingsCloseButton" class="about-close-button" type="button" aria-label="Close">X</button>
        </div>
        <div class="about-content message-content">
          <img class="about-logo" src="${bt}" alt="ViewBV" />
          <div>
            <div class="about-name">Reset all settings?</div>
            <div class="about-text message-text">The settings will be reset to their defaults.</div>
          </div>
        </div>
        <div class="about-actions reset-settings-actions">
          <button id="resetSettingsConfirmButton" class="about-ok-button" type="button">Reset</button>
          <button id="resetSettingsCancelButton" class="about-ok-button" type="button">Cancel</button>
        </div>
      </section>
    </div>
    <div id="rendererSwitchWindowBackdrop" class="about-window-backdrop" hidden>
      <section class="about-window message-window" role="dialog" aria-modal="true" aria-labelledby="rendererSwitchTitle">
        <div class="about-titlebar">
          <div id="rendererSwitchTitle" class="about-title">Change renderer</div>
          <button id="rendererSwitchCloseButton" class="about-close-button" type="button" aria-label="Close">X</button>
        </div>
        <div class="about-content message-content">
          <img class="about-logo" src="${bt}" alt="ViewBV" />
          <div>
            <div class="about-name">Restart boardviewer?</div>
            <div id="rendererSwitchText" class="about-text message-text"></div>
          </div>
        </div>
        <div class="about-actions reset-settings-actions">
          <button id="rendererSwitchConfirmButton" class="about-ok-button" type="button">OK</button>
          <button id="rendererSwitchCancelButton" class="about-ok-button" type="button">Cancel</button>
        </div>
      </section>
    </div>
    
    <div id="webGlFallbackWindowBackdrop" class="about-window-backdrop" hidden>
      <section class="about-window message-window" role="dialog" aria-modal="true" aria-labelledby="webGlFallbackTitle">
        <div class="about-titlebar">
          <div id="webGlFallbackTitle" class="about-title">WebGPU Required</div>
          <button id="webGlFallbackCloseButton" class="about-close-button" type="button" aria-label="Close">X</button>
        </div>
        <div class="about-content message-content">
          <img class="about-logo" src="${bt}" alt="ViewBV" />
          <div>
            <div class="about-name">WebGPU is not available</div>
            <div class="about-text webgpu-help-text">
              WebGPU is not available. You can enable it and reload the app, or continue with WebGL 2. WebGL rendering may be slower on large or layer-heavy boards.
              <a href="https://enablegpu.com/" target="_blank" rel="noreferrer">WebGPU enablement guide</a>
            </div>
          </div>
        </div>
        <div class="about-actions reset-settings-actions">
          <button id="webGlFallbackOkButton" class="about-ok-button" type="button">Use WebGL 2</button>
          <button id="webGlFallbackCancelButton" class="about-ok-button" type="button">Close</button>
        </div>
      </section>
    </div>
    <div id="webgpuWindowBackdrop" class="about-window-backdrop" hidden>
      <section class="about-window webgpu-window" role="dialog" aria-modal="true" aria-labelledby="webgpuTitle">
        <div class="about-titlebar">
          <div id="webgpuTitle" class="about-title">Renderer Unavailable</div>
          <button id="webgpuCloseButton" class="about-close-button" type="button" aria-label="Close">X</button>
        </div>
        <div class="about-content webgpu-content">
          <img class="about-logo" src="${bt}" alt="ViewBV" />
          <div>
            <div class="about-name">No supported renderer is available</div>
            <div class="about-text webgpu-help-text">
              ViewBV Web needs WebGPU or WebGL 2 to render the board.
              <a href="https://enablegpu.com/" target="_blank" rel="noreferrer">WebGPU enablement guide</a>
            </div>
          </div>
        </div>
        <div class="about-actions">
          <button id="webgpuOkButton" class="about-ok-button" type="button">Close</button>
        </div>
      </section>
    </div>
    <div id="openErrorWindowBackdrop" class="about-window-backdrop" hidden>
      <section class="about-window message-window" role="dialog" aria-modal="true" aria-labelledby="openErrorTitle">
        <div class="about-titlebar">
          <div id="openErrorTitle" class="about-title">Open Failed</div>
          <button id="openErrorCloseButton" class="about-close-button" type="button" aria-label="Close">X</button>
        </div>
        <div class="about-content message-content">
          <img class="about-logo" src="${bt}" alt="ViewBV" />
          <div>
            <div id="openErrorFileName" class="about-name message-name">Could not open boardview</div>
            <div id="openErrorText" class="about-text message-text"></div>
          </div>
        </div>
        <div class="about-actions">
          <button id="openErrorOkButton" class="about-ok-button" type="button">Close</button>
        </div>
      </section>
    </div>
  </div>
`;
function b(t) {
    const e = document.getElementById(t);
    if (!e)
        throw new Error(`Missing element #${t}`);
    return e
}
const O = b("boardCanvas")
  , Nu = b("labelCanvas")
  , Ee = b("boardTooltip")
  , or = b("boardLoadingIndicator")
  , ku = b("homePane")
  , an = b("listTooltip")
  , Yi = b("fileInput")
  , Mo = b("fileMenuButton")
  , Lo = b("fileMenu")
  , Fu = b("menuOpenButton")
  , To = b("viewMenuButton")
  , Io = b("viewMenu")
  , gi = b("optionsMenuButton")
  , No = b("optionsMenu")
  , ja = b("showNetwebMenuButton")
  , Qa = b("showPinNetLabelsMenuButton")
  , Ja = b("drawPinPadsMenuButton")
  , Xi = b("hollowPinPadsMenuButton")
  , $a = b("renderUsingWebGpuMenuButton")
  , _a = b("renderUsingWebGlMenuButton")
  , Gu = b("resetSettingsMenuButton")
  , el = b("flipWithoutMirroringMenuButton")
  , tl = b("flipOverXAxisMenuButton")
  , bi = b("helpMenuButton")
  , ko = b("helpMenu")
  , Vu = b("keyboardShortcutsMenuButton")
  , ei = b("aboutWindowBackdrop")
  , il = b("aboutCloseButton")
  , Ru = b("aboutOkButton")
  , ti = b("keyboardShortcutsWindowBackdrop")
  , rl = b("keyboardShortcutsCloseButton")
  , Ou = b("keyboardShortcutsOkButton")
  , ni = b("resetSettingsWindowBackdrop")
  , Wu = b("resetSettingsCloseButton")
  , Du = b("resetSettingsConfirmButton")
  , ol = b("resetSettingsCancelButton")
  , ii = b("rendererSwitchWindowBackdrop")
  , zu = b("rendererSwitchCloseButton")
  , Hu = b("rendererSwitchConfirmButton")
  , sl = b("rendererSwitchCancelButton")
  , Yu = b("rendererSwitchText")
  , oi = b("webGlFallbackWindowBackdrop")
  , Uu = b("webGlFallbackCloseButton")
  , ll = b("webGlFallbackOkButton")
  , Ku = b("webGlFallbackCancelButton")
  , si = b("webgpuWindowBackdrop")
  , Zu = b("webgpuCloseButton")
  , cl = b("webgpuOkButton")
  , ai = b("openErrorWindowBackdrop")
  , qu = b("openErrorCloseButton")
  , dl = b("openErrorOkButton")
  , ju = b("openErrorFileName")
  , Qu = b("openErrorText")
  , Ui = b("documentTabs")
  , St = b("workspace")
  , li = b("sidebar")
  , G = b("sidebarResizeHandle")
  , Z = b("layerModeInput")
  , Ki = b("layerModeButton")
  , fr = b("moreToolsButton")
  , Fo = b("moreToolsMenu")
  , ul = b("highlightSamePartsButton")
  , hl = b("highlightSelectedPartNetsButton")
  , fl = b("darkenPartsWithoutInfoButton")
  , Ue = b("componentSearchInput")
  , Ju = b("componentDropdownButton")
  , de = b("componentDropdown")
  , Ke = b("netSearchInput")
  , $u = b("netDropdownButton")
  , Be = b("netDropdown")
  , wt = b("layerList")
  , Ri = b("subBoardList")
  , _u = b("partDetails")
  , uo = b("partRefdesLine")
  , Oi = b("partInfoEdit")
  , $s = b("partPinsLine")
  , _s = b("layerInfoEdit")
  , ci = b("layerFullSignalTraceInput")
  , M = b("pinList")
  , pl = b("partTabButton")
  , Go = b("netTabButton")
  , Vo = b("findTabButton")
  , Dt = b("layersTabButton")
  , sr = b("subBoardsTabButton")
  , Eo = b("partPane")
  , Ro = b("netPane")
  , ml = b("findPane")
  , yl = b("layersPane")
  , gl = b("subBoardsPane")
  , eh = b("netNameLine")
  , N = b("netList")
  , Yt = b("findPartsInput")
  , ho = b("findWholeWordButton")
  , fo = b("findFilterPinsInput")
  , po = b("findFilterInfoInput")
  , mo = b("findHighlightMatchesInput")
  , V = b("findPartsList")
  , bl = b("bottomSideButton")
  , xl = b("topSideButton")
  , th = b("rotateCcwButton")
  , nh = b("rotateCwButton")
  , ih = b("fitButton")
  , wl = b("flipHorizontalButton")
  , vl = b("flipVerticalButton")
  , g = new hd(O,Nu)
  , rh = Xp();
let P = null
  , E = null
  , R = null
  , A = ""
  , q = null
  , ne = null
  , J = null
  , cn = null
  , H = !1
  , $e = []
  , Re = null
  , oh = 1
  , pr = []
  , yn = []
  , di = []
  , mr = new Map
  , ui = new Map
  , ye = null
  , yr = null
  , ge = null
  , gr = ""
  , ct = null
  , Qe = {
    ...Ua
}
  , $ = {
    ...Ka
}
  , K = {
    ...Za
}
  , Ze = !1
  , We = "info"
  , pt = !1
  , Oo = new Set
  , xi = !1
  , br = !1
  , zt = !0
  , Xt = !1
  , gn = !1
  , bn = !1
  , nt = !1
  , it = !1
  , Ut = !1
  , rt = !1
  , j = "part"
  , ar = null
  , be = -1
  , xn = null
  , At = null
  , Ot = 0
  , Zi = null
  , dn = 0
  , Et = ""
  , wn = null
  , Xn = null
  , Un = 0
  , vn = null
  , Cn = null
  , Sn = null
  , et = null
  , un = null
  , hi = !1
  , qr = 0
  , Hn = 0
  , lr = null
  , Wo = null;
const sh = Fl()
  , Cl = qh()
  , ah = new URLSearchParams(window.location.search).get("renderer")?.toLowerCase() === "webgl"
  , qi = ah || Cl === "webgl2"
  , ea = Cl !== "webgpu" && sh
  , Sl = g.initialize({
    allowWebGlFallback: ea,
    forceWebGl: qi
}).then(t => {
    lr = t,
    zo(),
    console.info("[ViewBV Web] Renderer ready", {
        backend: t
    }),
    t === "WebGL 2" && !qi && !Fl() && ra()
}
).catch(t => {
    console.error("[ViewBV Web] Renderer initialization failed", t),
    !qi && !ea && g.canUseWebGlFallback() ? ra() : Gl()
}
);
Ch();
wh();
const lh = new ResizeObserver( () => {
    $l(),
    g.scheduleFrame()
}
);
lh.observe(O);
Bo.addEventListener("change", $l);
hr.addEventListener("change", xr);
Ao.addEventListener("change", Pc);
window.addEventListener("resize", xr);
G.addEventListener("pointerdown", Th);
G.addEventListener("pointerenter", Ih);
G.addEventListener("pointerleave", Nh);
G.addEventListener("pointermove", kh);
G.addEventListener("pointerup", Uo);
G.addEventListener("pointercancel", Uo);
G.addEventListener("lostpointercapture", Uo);
G.addEventListener("keydown", Fh);
Yi.addEventListener("change", async () => {
    const t = Yi.files?.[0];
    t && (await In(t, !1),
    Yi.value = "")
}
);
Mo.addEventListener("pointerdown", t => {
    t.preventDefault(),
    wi("file")
}
);
To.addEventListener("pointerdown", t => {
    t.preventDefault(),
    wi("view")
}
);
gi.addEventListener("pointerdown", t => {
    t.preventDefault(),
    wi("options")
}
);
bi.addEventListener("pointerdown", t => {
    t.preventDefault(),
    wi("help")
}
);
fr.addEventListener("pointerdown", t => {
    t.preventDefault(),
    wi("more")
}
);
Fu.addEventListener("click", () => {
    Y(),
    Yi.click()
}
);
Vu.addEventListener("click", () => {
    Y(),
    Xh()
}
);
ja.addEventListener("click", () => {
    wr(!xi),
    Y()
}
);
Qa.addEventListener("click", () => {
    Ko(!br),
    Y()
}
);
Ja.addEventListener("click", () => {
    Zo(!zt),
    Y()
}
);
Xi.addEventListener("click", () => {
    qo(!Xt),
    Y()
}
);
$a.addEventListener("click", () => {
    Y(),
    Nl("webgpu")
}
);
_a.addEventListener("click", () => {
    Y(),
    Nl("webgl2")
}
);
Gu.addEventListener("click", () => {
    Y(),
    Uh()
}
);
el.addEventListener("click", () => {
    jo(!gn),
    Y()
}
);
tl.addEventListener("click", () => {
    Qo(!bn),
    Y()
}
);
ul.addEventListener("click", () => {
    Ph(!nt),
    Y()
}
);
hl.addEventListener("click", () => {
    Bh(!it),
    Y()
}
);
fl.addEventListener("click", () => {
    Ah(!rt),
    Y()
}
);
il.addEventListener("click", vr);
Ru.addEventListener("click", vr);
ei.addEventListener("pointerdown", t => {
    t.target === ei && vr()
}
);
rl.addEventListener("click", Cr);
Ou.addEventListener("click", Cr);
ti.addEventListener("pointerdown", t => {
    t.target === ti && Cr()
}
);
Wu.addEventListener("click", vi);
ol.addEventListener("click", vi);
Du.addEventListener("click", () => {
    Zh(),
    vi()
}
);
ni.addEventListener("pointerdown", t => {
    t.target === ni && vi()
}
);
zu.addEventListener("click", Ci);
sl.addEventListener("click", Ci);
Hu.addEventListener("click", Kh);
ii.addEventListener("pointerdown", t => {
    t.target === ii && Ci()
}
);


Uu.addEventListener("click", An);
ll.addEventListener("click", Qh);
Ku.addEventListener("click", An);
oi.addEventListener("pointerdown", t => {
    t.target === oi && An()
}
);
Zu.addEventListener("click", Pr);
cl.addEventListener("click", Pr);
si.addEventListener("pointerdown", t => {
    t.target === si && Pr()
}
);
qu.addEventListener("click", Br);
dl.addEventListener("click", Br);
ai.addEventListener("pointerdown", t => {
    t.target === ai && Br()
}
);
document.addEventListener("keydown", Vh);
Ui.addEventListener("click", t => {
    const e = t.target
      , n = e.closest(".document-tab-close");
    if (n) {
        const o = n.closest(".document-tab")
          , s = Number(o?.dataset.tabId);
        Number.isFinite(s) && _h(s);
        return
    }
    const i = e.closest(".document-tab");
    if (!i)
        return;
    if (i.dataset.home === "true") {
        El();
        return
    }
    const r = Number(i.dataset.tabId);
    Number.isFinite(r) && Vl(r)
}
);
Z.addEventListener("change", async () => {
    if (Z.disabled) {
        Z.checked = !1,
        Zt();
        return
    }
    H = Z.checked;
    const t = H;
    if (Zt(),
    De(),
    cn) {
        const e = cn
          , n = P
          , i = W();
        await In(e, H, {
            replaceActiveTab: !0,
            preserveViewport: !0,
            revisionIndex: i?.revisionIndex ?? -1,
            showLoadingIndicator: H,
            loadingMessage: "Loading layers..."
        });
        const r = P;
        t && H && Z.checked && r !== null && r !== n && r.layers.length > 0 && cn === e && re("layers")
    }
}
);
Ki.addEventListener("click", () => {
    Z.disabled || (Z.checked = !Z.checked,
    Z.dispatchEvent(new Event("change",{
        bubbles: !0
    })))
}
);
ci.addEventListener("change", () => {
    pf(ci.checked)
}
);
bl.addEventListener("click", () => pi("B"));
xl.addEventListener("click", () => pi("T"));
th.addEventListener("click", () => g.rotateView(!1));
nh.addEventListener("click", () => g.rotateView(!0));
ih.addEventListener("click", () => g.fitToView());
wl.addEventListener("click", () => {
    g.toggleFlipHorizontal(),
    Kt()
}
);
vl.addEventListener("click", () => {
    g.toggleFlipVertical(),
    Kt()
}
);
pl.addEventListener("click", () => re("part"));
Go.addEventListener("click", () => re("net"));
Vo.addEventListener("click", () => re("find"));
Dt.addEventListener("click", () => re("layers"));
sr.addEventListener("click", () => re("subboards"));
Yt.addEventListener("input", () => {
    const t = W();
    t && (t.findQuery = Yt.value),
    jt()
}
);
ho.addEventListener("click", () => Uf(!Ze));
fo.addEventListener("change", () => {
    fo.checked && lc("pins")
}
);
po.addEventListener("change", () => {
    po.checked && lc("info")
}
);
mo.addEventListener("change", () => {
    Kf(mo.checked)
}
);
uo.addEventListener("click", () => {
    E && (Fr(E.side),
    g.focusComponent(E))
}
);
Ue.addEventListener("input", () => {
    Ue.classList.remove("empty"),
    Tr("parts", !0)
}
);
Ue.addEventListener("keydown", t => Kl("parts", t));
Ju.addEventListener("pointerdown", t => {
    t.preventDefault(),
    Xl("parts", t.pointerType === "mouse")
}
);
Ke.addEventListener("input", () => {
    Ke.classList.remove("empty"),
    Tr("nets", !0)
}
);
Ke.addEventListener("keydown", t => Kl("nets", t));
$u.addEventListener("pointerdown", t => {
    t.preventDefault(),
    Xl("nets", t.pointerType === "mouse")
}
);
de.addEventListener("mousedown", t => {
    const e = t.target.closest(".combo-option");
    e && (t.preventDefault(),
    ns(de, e))
}
);
de.addEventListener("scroll", () => Jt(de));
Be.addEventListener("mousedown", t => {
    const e = t.target.closest(".combo-option");
    e && (t.preventDefault(),
    ns(Be, e))
}
);
Be.addEventListener("scroll", () => Jt(Be));
Hl(de);
Hl(Be);
document.addEventListener("pointerdown", t => {
    const e = t.target;
    e?.closest(".search-field") || ue({
        blurInputs: !0
    }),
    e?.closest(".menu-root") || Y()
}
);
document.querySelector(".app-toolbar")?.addEventListener("pointerdown", t => {
    const e = t.target;
    e?.closest(".combo-shell") || ue({
        blurInputs: !0
    }),
    e?.closest(".menu-root") || Y()
}
);
window.addEventListener("blur", () => {
    It(),
    ue({
        blurInputs: !0
    })
}
);
document.addEventListener("visibilitychange", () => {
    document.hidden && (It(),
    ue({
        blurInputs: !0
    }))
}
);
document.addEventListener("dragenter", t => {
    Mr(t) && (t.preventDefault(),
    Un += 1,
    document.body.classList.add("dragging-file"))
}
);
document.addEventListener("dragover", t => {
    Mr(t) && (t.preventDefault(),
    t.dataTransfer.dropEffect = "copy")
}
);
document.addEventListener("dragleave", t => {
    Mr(t) && (Un = Math.max(0, Un - 1),
    Un === 0 && document.body.classList.remove("dragging-file"))
}
);
document.addEventListener("drop", async t => {
    if (!Mr(t))
        return;
    t.preventDefault(),
    Un = 0,
    document.body.classList.remove("dragging-file");
    const e = tf(t.dataTransfer?.files);
    if (e.length === 0) {
        console.warn("[ViewBV Web] Drop ignored: no supported board files");
        return
    }
    for (const n of e)
        await In(n, !1)
}
);
N.addEventListener("mousemove", Ac);
V.addEventListener("mousemove", Ac);
N.addEventListener("mouseleave", tt);
V.addEventListener("mouseleave", tt);
N.addEventListener("scroll", tt);
V.addEventListener("scroll", tt);
M.addEventListener("scroll", Pi);
N.addEventListener("scroll", Bi);
V.addEventListener("scroll", as);
V.addEventListener("pointerdown", jf);
V.addEventListener("pointermove", Qf);
V.addEventListener("pointerup", t => cc(t, !0));
V.addEventListener("pointercancel", t => cc(t, !1));
V.addEventListener("click", Jf, !0);
Lr();
Kt();
Lh();
Pl();
Si();
Ar();
De();
let ie = !1
  , we = !1
  , Mt = 0
  , Lt = 0
  , Ln = 0
  , Tn = 0
  , Ve = null
  , Xe = !1
  , Pn = !1
  , ut = 0
  , Bt = {
    x: 0,
    y: 0
}
  , fi = 0
  , Bn = 0
  , Ne = 0
  , ke = 0
  , Kn = 0
  , ji = 0;
const Fe = new Map
  , ch = .22
  , dh = .62
  , uh = 2.7
  , ta = .42
  , Wi = 4.2
  , na = .035
  , hh = 5.8
  , fh = .12
  , ph = .4
  , mh = 2.1
  , yh = 420
  , gh = 10;
let Oe = null;
O.addEventListener("pointerdown", t => {
    if (!(Qt && t.pointerType === "touch")) {
        if (t.preventDefault(),
        t.button === 1) {
            g.fitToView();
            return
        }
        if (It(),
        Fe.set(t.pointerId, pc(t)),
        O.setPointerCapture(t.pointerId),
        Fe.size >= 2) {
            ps();
            return
        }
        ie = !0,
        we = !1,
        Ve = t.pointerId,
        Mt = t.clientX,
        Lt = t.clientY,
        Ln = t.clientX,
        Tn = t.clientY,
        Bn = t.timeStamp,
        Ne = 0,
        ke = 0
    }
}
);
O.addEventListener("auxclick", t => {
    t.button === 1 && t.preventDefault()
}
);
O.addEventListener("pointermove", t => {
    if (Qt && t.pointerType === "touch")
        return;
    if (Fe.has(t.pointerId) && Fe.set(t.pointerId, pc(t)),
    Fe.size >= 2) {
        t.preventDefault(),
        Ip();
        return
    }
    if (!ie || t.pointerId !== Ve) {
        t.pointerType !== "touch" && wo(t);
        return
    }
    if (t.preventDefault(),
    !ie) {
        wo(t);
        return
    }
    if (!we && Math.hypot(t.clientX - Ln, t.clientY - Tn) <= 3)
        return;
    we || (we = !0,
    Oe = null,
    oe(!0));
    const e = t.clientX - Mt
      , n = t.clientY - Lt;
    t.pointerType === "touch" ? gc(e, n, t.timeStamp) : g.pan(e, n),
    Mt = t.clientX,
    Lt = t.clientY
}
);
O.addEventListener("pointerup", t => {
    if (Qt && t.pointerType === "touch")
        return;
    const e = !Pp(t.clientX, t.clientY);
    Cc(t, !0),
    e && oe()
}
);
O.addEventListener("pointercancel", t => {
    Qt && t.pointerType === "touch" || (Cc(t, !1),
    oe())
}
);
O.addEventListener("touchstart", Ap, {
    passive: !1
});
O.addEventListener("touchmove", Mp, {
    passive: !1
});
O.addEventListener("touchend", t => yc(t, !0), {
    passive: !1
});
O.addEventListener("touchcancel", t => yc(t, !1), {
    passive: !1
});
O.addEventListener("pointerleave", () => oe(ie));
O.addEventListener("wheel", t => {
    t.preventDefault();
    const e = hs(t);
    g.zoomAt(e.x, e.y, t.deltaY),
    wo(t)
}
, {
    passive: !1
});
async function In(t, e=!1, n={}) {
    const i = n.showLoadingIndicator !== !1;
    i && bh(n.loadingMessage ?? "Loading boardview...");
    const r = n.preserveViewport === !0
      , o = r ? g.getActiveSide() : null
      , s = W();
    es();
    const a = n.revisionIndex ?? (n.replaceActiveTab === !0 ? s?.revisionIndex ?? -1 : -1);
    cn = t,
    H = e,
    Z.checked = H,
    Zt(),
    E = null,
    R = null,
    A = "",
    q = null,
    ne = null,
    J = null,
    oe(),
    qt(),
    console.info("[ViewBV Web] Opening board file", {
        name: t.name,
        size: t.size,
        type: t.type,
        includeLayerData: e
    });
    try {
        const l = await t.arrayBuffer()
          , c = await rh.parse({
            fileName: t.name,
            buffer: l,
            includeLayerData: e,
            revisionIndex: a
        });
        if (!c.ok)
            throw new Error(c.error);
        e || ef(c.board),
        P = c.board,
        Ut = !1,
        g.setWatermarkText(c.watermarkText);
        const d = Rl(c.board);
        H = e && d && c.board.layers.length > 0,
        Z.checked = H,
        Zt(),
        console.info("[ViewBV Web] Board loaded", {
            title: c.board.metadata.title,
            components: c.board.components.length,
            nets: c.board.nets.length,
            graphics: c.board.graphics.length,
            vias: c.board.vias.length,
            layers: c.board.layers.length,
            layerMode: H
        });
        const u = o ?? zl(c.board)
          , h = mi(c.board, a);
        $h(t, c.board, H, n.replaceActiveTab === !0, {
            activeSide: u,
            revisionIndex: h
        });
        const f = W();
        f && (f.activeSide = u),
        g.setLayerModeEnabled(H),
        g.setActiveSide(u),
        g.setBoard(c.board, {
            fitToView: !r,
            dropPreviousBoardCaches: n.replaceActiveTab === !0
        }),
        r || requestAnimationFrame( () => g.fitToView()),
        Kt(),
        Lr(),
        De(),
        Dl(),
        Ae(),
        qt(),
        Do()
    } catch (l) {
        const c = l instanceof Error ? l.message : String(l);
        console.error("[ViewBV Web] Open failed", {
            fileName: t.name,
            includeLayerData: e,
            message: c,
            error: l
        }),
        $o(t.name, c)
    } finally {
        i && xh()
    }
}
function bh(t) {
    Hn += 1,
    or.textContent = t,
    or.hidden = !1
}
function xh() {
    Hn = Math.max(0, Hn - 1),
    or.hidden = Hn === 0,
    Hn === 0 && (or.textContent = "Loading boardview...")
}
async function wh() {
    const t = new URL(window.location.href)
      , e = t.searchParams.get("shared-boardview");
    if (e) {
        t.searchParams.delete("shared-boardview"),
        window.history.replaceState(null, "", `${t.pathname}${t.search}${t.hash}`);
        try {
            await Sl;
            const n = await fetch(`/shared-boardview/${encodeURIComponent(e)}`, {
                cache: "no-store"
            });
            if (!n.ok)
                throw new Error(`Could not read shared boardview file (${n.status}).`);
            const i = n.headers.get("X-ViewBV-File-Name") ?? ""
              , r = vh(i)
              , o = await n.blob();
            await In(new File([o],r,{
                type: o.type || "application/octet-stream"
            }), !1)
        } catch (n) {
            const i = n instanceof Error ? n.message : String(n);
            console.error("[ViewBV Web] Shared file open failed", n),
            $o("shared boardview", i)
        }
    }
}
function vh(t) {
    if (!t)
        return "shared-boardview";
    try {
        return decodeURIComponent(t)
    } catch {
        return t
    }
}
function Ch() {
    const t = window.launchQueue;
    t && t.setConsumer(e => {
        const n = e.files ?? [];
        for (const i of n)
            Sh(i)
    }
    )
}
async function Sh(t) {
    try {
        await Sl,
        await In(await t.getFile(), !1)
    } catch (e) {
        const n = e instanceof Error ? e.message : String(e);
        console.error("[ViewBV Web] File launch failed", e),
        $o("launched boardview", n)
    }
}
function pi(t, e={}) {
    const n = g.getActiveSide();
    oe(),
    g.setActiveSide(t),
    g.applySideFlipModeCompensation(n, t, {
        withoutMirroring: gn,
        overXAxis: bn,
        forceOverXAxis: e.forceOverXAxis
    });
    const i = W();
    i && (i.activeSide = t),
    Do()
}
function Do() {
    const t = g.getActiveSide();
    bl.classList.toggle("active", t === "B"),
    xl.classList.toggle("active", t === "T")
}
function cr(t, e) {
    t.classList.toggle("active", e),
    t.setAttribute("aria-pressed", e ? "true" : "false")
}
function Kt() {
    cr(wl, g.isFlipHorizontalEnabled()),
    cr(vl, g.isFlipVerticalEnabled())
}
function ze(t, e) {
    t.classList.toggle("checked", e),
    t.setAttribute("aria-checked", e ? "true" : "false")
}
function Nt() {
    ze(ja, xi),
    ze(Qa, br),
    ze(Ja, zt),
    ze(Xi, Xt),
    Xi.disabled = !zt,
    Xi.setAttribute("aria-disabled", zt ? "false" : "true"),
    ze(el, gn),
    ze(tl, bn),
    zo()
}
function zo() {
    const t = lr ? lr === "WebGPU" ? "webgpu" : "webgl2" : qi ? "webgl2" : "webgpu";
    ze($a, t === "webgpu"),
    ze(_a, t === "webgl2")
}
function Pl() {
    ze(ul, nt),
    ze(hl, it),
    ze(fl, rt),
    cr(fr, nt || it || rt)
}
function Ae() {
    const t = nt ? fp(E) : new Set;
    if (pt)
        for (const i of Oo)
            t.add(i);
    const e = it ? pp(E) : new Set
      , n = rt ? mp(P) : new Set;
    g.setHighlightedPartIds(t),
    g.setHighlightedPartNetNames(e),
    g.setDarkenedPartIds(n),
    Pl()
}
function Ph(t) {
    if (nt === t)
        return;
    nt = t;
    const e = W();
    e && (e.highlightSameParts = t),
    Ae()
}
function Bh(t) {
    if (it === t)
        return;
    it = t;
    const e = W();
    e && (e.highlightSelectedPartNets = t),
    Ae()
}
function Ah(t) {
    if (rt === t)
        return;
    rt = t;
    const e = W();
    e && (e.darkenPartsWithoutInfo = t),
    Ae()
}
function Mh() {
    try {
        const t = window.localStorage.getItem(Co);
        if (!t)
            return {};
        const e = JSON.parse(t);
        if (!e || typeof e != "object")
            return {};
        const n = e;
        return {
            showNetWeb: typeof n.showNetWeb == "boolean" ? n.showNetWeb : void 0,
            showPinNetLabels: typeof n.showPinNetLabels == "boolean" ? n.showPinNetLabels : void 0,
            drawPinPads: typeof n.drawPinPads == "boolean" ? n.drawPinPads : void 0,
            hollowPinPads: typeof n.hollowPinPads == "boolean" ? n.hollowPinPads : void 0,
            flipBoardWithoutMirroring: typeof n.flipBoardWithoutMirroring == "boolean" ? n.flipBoardWithoutMirroring : void 0,
            flipBoardOverXAxis: typeof n.flipBoardOverXAxis == "boolean" ? n.flipBoardOverXAxis : void 0,
            sidebarWidth: ia(n.sidebarWidth),
            sidebarHeight: ia(n.sidebarHeight)
        }
    } catch (t) {
        return console.warn("[ViewBV Web] Could not read View settings from localStorage", t),
        {}
    }
}
function kt() {
    try {
        const t = {
            showNetWeb: xi,
            showPinNetLabels: br,
            drawPinPads: zt,
            hollowPinPads: Xt,
            flipBoardWithoutMirroring: gn,
            flipBoardOverXAxis: bn,
            sidebarWidth: vn ?? void 0,
            sidebarHeight: Cn ?? void 0
        };
        window.localStorage.setItem(Co, JSON.stringify(t))
    } catch (t) {
        console.warn("[ViewBV Web] Could not save View settings to localStorage", t)
    }
}
function Lh() {
    const t = Mh();
    wr(t.showNetWeb === !0, !1),
    Ko(t.showPinNetLabels === !0, !1),
    Zo(t.drawPinPads !== !1, !1),
    qo(t.hollowPinPads === !0, !1),
    jo(t.flipBoardWithoutMirroring === !0, !1),
    Qo(t.flipBoardOverXAxis === !0, !1),
    vn = t.sidebarWidth ?? null,
    Cn = t.sidebarHeight ?? null,
    xr(),
    Nt()
}
function ia(t) {
    return typeof t == "number" && Number.isFinite(t) && t >= 80 && t <= 1e4 ? Math.round(t) : void 0
}
function Ho() {
    return {
        min: 220,
        max: Math.max(220, St.clientWidth - 160)
    }
}
function Yo() {
    const t = Math.max(80, St.clientHeight - 56);
    return {
        min: Math.min(120, t),
        max: t
    }
}
function xr() {
    if (vn === null)
        St.style.removeProperty("--sidebar-width");
    else {
        const t = Ho();
        St.style.setProperty("--sidebar-width", `${Math.round(Tt(vn, t.min, t.max))}px`)
    }
    if (Cn === null)
        St.style.removeProperty("--sidebar-height");
    else {
        const t = Yo();
        St.style.setProperty("--sidebar-height", `${Math.round(Tt(Cn, t.min, t.max))}px`)
    }
    Bl(),
    kr()
}
function Bl() {
    const t = hr.matches
      , e = t ? Yo() : Ho()
      , n = t ? li.getBoundingClientRect().height : li.getBoundingClientRect().width;
    G.setAttribute("aria-orientation", t ? "horizontal" : "vertical"),
    G.setAttribute("aria-valuemin", String(Math.round(e.min))),
    G.setAttribute("aria-valuemax", String(Math.round(e.max))),
    G.setAttribute("aria-valuenow", String(Math.round(n)))
}
function Th(t) {
    if (t.pointerType === "mouse" && t.button !== 0)
        return;
    t.preventDefault(),
    Pc(),
    ue({
        blurInputs: !0
    }),
    Y();
    const e = hr.matches;
    et = {
        pointerId: t.pointerId,
        compact: e,
        latestPointer: e ? t.clientY : t.clientX
    },
    G.classList.remove("resize-touch-released"),
    G.setPointerCapture(t.pointerId),
    t.pointerType === "mouse" ? G.focus({
        preventScroll: !0
    }) : G.classList.add("resize-pending"),
    hi ? Ml() : Xo(t.pointerType === "mouse" ? Xa : Tu)
}
function Ih(t) {
    t.pointerType === "mouse" && !Sn && !et && Xo()
}
function Nh() {
    !Sn && !et && Al()
}
function Xo(t=Xa) {
    hi || un !== null || (un = window.setTimeout( () => {
        un = null,
        hi = !0,
        G.classList.remove("resize-pending"),
        G.classList.add("resize-ready"),
        Ml()
    }
    , t))
}
function Al() {
    un !== null && (window.clearTimeout(un),
    un = null),
    hi = !1,
    G.classList.remove("resize-pending"),
    G.classList.remove("resize-ready")
}
function Ml() {
    const t = et;
    if (!t || !hi)
        return;
    const e = li.getBoundingClientRect();
    et = null,
    Sn = {
        pointerId: t.pointerId,
        compact: t.compact,
        startPointer: t.latestPointer,
        startSize: t.compact ? e.height : e.width
    },
    document.body.classList.add(t.compact ? "resizing-sidebar-height" : "resizing-sidebar-width")
}
function kh(t) {
    if (et?.pointerId === t.pointerId) {
        t.preventDefault(),
        et.latestPointer = et.compact ? t.clientY : t.clientX;
        return
    }
    const e = Sn;
    if (!e || e.pointerId !== t.pointerId)
        return;
    t.preventDefault();
    const n = e.compact ? t.clientY : t.clientX;
    Ll(e.compact, e.startSize - (n - e.startPointer))
}
function Uo(t) {
    const e = Sn
      , n = et;
    if (e?.pointerId !== t.pointerId && n?.pointerId !== t.pointerId)
        return;
    const i = e?.pointerId === t.pointerId;
    Sn = null,
    et = null,
    document.body.classList.remove("resizing-sidebar-width", "resizing-sidebar-height"),
    G.hasPointerCapture(t.pointerId) && G.releasePointerCapture(t.pointerId),
    Al(),
    i && kt(),
    t.pointerType !== "mouse" && (G.classList.add("resize-touch-released"),
    G.blur()),
    t.pointerType === "mouse" && G.matches(":hover") && Xo()
}
function Fh(t) {
    const e = hr.matches;
    let n = 0;
    if (e && t.key === "ArrowUp")
        n = 16;
    else if (e && t.key === "ArrowDown")
        n = -16;
    else if (!e && t.key === "ArrowLeft")
        n = 16;
    else if (!e && t.key === "ArrowRight")
        n = -16;
    else
        return;
    t.preventDefault();
    const i = e ? li.getBoundingClientRect().height : li.getBoundingClientRect().width;
    Ll(e, i + n),
    kt()
}
function Ll(t, e) {
    const n = t ? Yo() : Ho()
      , i = Math.round(Tt(e, n.min, n.max));
    t ? (Cn = i,
    St.style.setProperty("--sidebar-height", `${i}px`)) : (vn = i,
    St.style.setProperty("--sidebar-width", `${i}px`)),
    G.setAttribute("aria-valuenow", String(i)),
    g.scheduleFrame(),
    Gh()
}
function Gh() {
    qr === 0 && (qr = requestAnimationFrame( () => {
        qr = 0,
        Bl(),
        kr()
    }
    ))
}
function wr(t, e=!0) {
    xi = t,
    g.setShowNetWeb(t),
    Nt(),
    e && kt()
}
function Ko(t, e=!0) {
    br = t,
    g.setShowPinNetLabels(t),
    Nt(),
    e && kt()
}
function Zo(t, e=!0) {
    zt = t,
    t || (Xt = !1),
    g.setDrawPinPads(t),
    g.setHollowPinPads(Xt),
    Nt(),
    e && kt()
}
function qo(t, e=!0) {
    Xt = zt && t,
    g.setHollowPinPads(Xt),
    Nt(),
    e && kt()
}
function jo(t, e=!0) {
    gn !== t && (gn = t,
    t || g.resetSideFlipModeCompensation(),
    Nt(),
    e && kt())
}
function Qo(t, e=!0) {
    bn !== t && (bn = t,
    t || g.resetSideFlipModeCompensation(),
    Nt(),
    e && kt())
}
function Zt() {
    cr(Ki, Z.checked),
    Ki.disabled = Z.disabled,
    Ki.classList.toggle("disabled", Z.disabled)
}
function Jo(t=!0) {
    E = null,
    R = null,
    A = "",
    J = null,
    q = null,
    ne = null,
    g.selectComponent(null),
    g.selectNet(""),
    g.selectTrace(null),
    g.selectLayerTraceFocus(null);
    const e = W();
    e && (e.selectedLayerId = null,
    e.selectedLayerTraceFocusId = null,
    e.selectedTraceIndex = null),
    t && (ae(""),
    le("")),
    oe(),
    Ae(),
    qt()
}
function wi(t) {
    const e = t === "file" ? Lo : t === "view" ? Io : t === "options" ? No : t === "help" ? ko : Fo
      , n = t === "file" ? Mo : t === "view" ? To : t === "options" ? gi : t === "help" ? bi : fr
      , i = !e.hidden;
    Y(),
    i || (e.hidden = !1,
    n.setAttribute("aria-expanded", "true"))
}
function Y() {
    Lo.hidden = !0,
    Io.hidden = !0,
    No.hidden = !0,
    ko.hidden = !0,
    Fo.hidden = !0,
    Mo.setAttribute("aria-expanded", "false"),
    To.setAttribute("aria-expanded", "false"),
    gi.setAttribute("aria-expanded", "false"),
    bi.setAttribute("aria-expanded", "false"),
    fr.setAttribute("aria-expanded", "false")
}
function Vh(t) {
    if (Eh(t))
        return;
    if (t.key === "Escape" && Rh()) {
        t.preventDefault();
        return
    }
    if (Tl() || Il() || Oh(t.target))
        return;
    const e = Wh(t);
    !e || !Hh(e, t.repeat) || (t.preventDefault(),
    t.stopPropagation())
}
function Eh(t) {
    return t.key !== "Escape" ? !1 : ai.hidden ? si.hidden ? oi.hidden ? ii.hidden ? ni.hidden ? ti.hidden ? ei.hidden ? !1 : (t.preventDefault(),
    Sr(),
    !0) : (t.preventDefault(),
    vr(),
    !0) : (t.preventDefault(),
    Cr(),
    !0) : (t.preventDefault(),
    vi(),
    !0) : (t.preventDefault(),
    Ci(),
    !0) : (t.preventDefault(),
    An(),
    !0) : (t.preventDefault(),
    
    Br(),
    !0)
}
function Rh() {
    const t = Il()
      , e = Tl();
    return t && ue({
        blurInputs: !0
    }),
    e && Y(),
    t || e
}
function Tl() {
    return !Lo.hidden || !Io.hidden || !No.hidden || !ko.hidden || !Fo.hidden
}
function Il() {
    return de.classList.contains("open") || Be.classList.contains("open")
}
function Oh(t) {
    return t instanceof Element ? t.closest("input, textarea, select, [contenteditable=''], [contenteditable='true']") !== null : !1
}
function Wh(t) {
    for (const e of Da)
        if (Dh(t, e))
            return e.command;
    return null
}
function Dh(t, e) {
    return t.metaKey || t.ctrlKey !== (e.ctrl === !0) || t.altKey !== (e.alt === !0) || !e.ignoreShift && t.shiftKey !== (e.shift === !0) ? !1 : zh(t, e.key)
}
function zh(t, e) {
    const n = t.key.toLocaleLowerCase();
    switch (e) {
    case "plus":
        return t.code === "Equal" || t.code === "NumpadAdd" || n === "+" || n === "=";
    case "minus":
        return t.code === "Minus" || t.code === "NumpadSubtract" || n === "-" || n === "_";
    case "comma":
        return t.code === "Comma" || n === "," || n === "<";
    case "space":
        return t.code === "Space" || n === " ";
    case "escape":
        return n === "escape" || n === "esc";
    case "modifiersOnly":
        return n === "alt" || n === "control";
    case "numpad2":
        return t.code === "Numpad2";
    case "numpad4":
        return t.code === "Numpad4";
    case "numpad6":
        return t.code === "Numpad6";
    case "numpad8":
        return t.code === "Numpad8";
    default:
        return t.code === `Key${e.toLocaleUpperCase()}` || n === e
    }
}
function Hh(t, e) {
    if (!P)
        return !1;
    const n = O.clientWidth * .5
      , i = O.clientHeight * .5;
    switch (t) {
    case "zoomIn":
        return g.zoomByFactorAt(n, i, Zs, !0),
        !0;
    case "zoomOut":
        return g.zoomByFactorAt(n, i, 1 / Zs, !0),
        !0;
    case "panUp":
        return g.pan(0, Ei),
        !0;
    case "panDown":
        return g.pan(0, -Ei),
        !0;
    case "panLeft":
        return g.pan(Ei, 0),
        !0;
    case "panRight":
        return g.pan(-Ei, 0),
        !0;
    case "rotateClockwise":
        return e || g.rotateView(!0),
        !0;
    case "rotateCounterclockwise":
        return e || g.rotateView(!1),
        !0;
    case "flipBoardSide":
        return e || pi(g.getActiveSide() === "T" ? "B" : "T"),
        !0;
    case "flipBoardSideOverXAxis":
        return e || pi(g.getActiveSide() === "T" ? "B" : "T", {
            forceOverXAxis: !0
        }),
        !0;
    case "toggleNetweb":
        return e || wr(!xi),
        !0;
    case "mirrorBoardHorizontally":
        return e || (g.toggleFlipHorizontal(),
        Kt()),
        !0;
    case "mirrorBoardVertically":
        return e || (g.toggleFlipVertical(),
        Kt()),
        !0;
    case "clearAllSelections":
        return e || Jo(),
        !0
    }
    return !1
}
function Yh() {
    ei.hidden = !1,
    il.focus({
        preventScroll: !0
    })
}
function vr() {
    ei.hidden = !0,
    bi.focus({
        preventScroll: !0
    })
}
function Xh() {
    ti.hidden = !1,
    rl.focus({
        preventScroll: !0
    })
}
function Cr() {
    ti.hidden = !0,
    bi.focus({
        preventScroll: !0
    })
}
function Uh() {
    ni.hidden = !1,
    ol.focus({
        preventScroll: !0
    })
}
function vi() {
    ni.hidden = !0,
    gi.focus({
        preventScroll: !0
    })
}
function Nl(t) {
    Wo = t;
    const e = t === "webgpu" ? "WebGPU" : "WebGL2";
    Yu.textContent = `To enable ${e} the boardviewer will restart.`,
    ii.hidden = !1,
    sl.focus({
        preventScroll: !0
    })
}
function Ci() {
    ii.hidden = !0,
    Wo = null,
    gi.focus({
        preventScroll: !0
    })
}
function Kh() {
    const t = Wo;
    if (!t) {
        Ci();
        return
    }
    kl(t);
    const e = new URL(window.location.href);
    e.searchParams.delete("renderer"),
    window.location.replace(e.href)
}
function Zh() {
    wr(!1, !1),
    Ko(!1, !1),
    Zo(!0, !1),
    qo(!1, !1),
    jo(!1, !1),
    Qo(!1, !1),
    vn = null,
    Cn = null,
    xr(),
    Nt();
    try {
        window.localStorage.removeItem(Co),
        window.localStorage.removeItem(So),
        window.localStorage.removeItem(Po)
    } catch (t) {
        console.warn("[ViewBV Web] Could not clear settings from localStorage", t)
    }
}
function qh() {
    try {
        const t = window.localStorage.getItem(Po);
        return t === "webgpu" || t === "webgl2" ? t : null
    } catch (t) {
        return console.warn("[ViewBV Web] Could not read the renderer preference", t),
        null
    }
}
function kl(t) {
    try {
        window.localStorage.setItem(Po, t)
    } catch (e) {
        console.warn("[ViewBV Web] Could not save the renderer preference", e)
    }
}
function Fl() {
    try {
        return window.localStorage.getItem(So) === "1"
    } catch (t) {
        return console.warn("[ViewBV Web] Could not read the WebGL fallback notice setting", t),
        !1
    }
}
function jh() {
    try {
        window.localStorage.setItem(So, "1")
    } catch (t) {
        console.warn("[ViewBV Web] Could not save the WebGL fallback notice setting", t)
    }
}
function ra() {
    oi.hidden = !1,
    ll.focus({
        preventScroll: !0
    })
}
function An() {
    oi.hidden = !0
}
function Qh() {
    try {
        const t = g.initializeWebGlFallback();
        lr = t,
        zo(),
        kl("webgl2"),
        jh(),
        An(),
        g.scheduleFrame(),
        console.info("[ViewBV Web] Renderer ready", {
            backend: t
        })
    } catch (t) {
        console.error("[ViewBV Web] WebGL 2 initialization failed", t),
        An(),
        Gl()
    }
}

function Gl() {
    si.hidden = !1,
    cl.focus({
        preventScroll: !0
    })
}
function Pr() {
    si.hidden = !0
}
function $o(t, e) {
    ju.textContent = t ? `Could not open ${t}` : "Could not open boardview",
    Qu.textContent = e || "The selected file is not a supported boardview or could not be parsed.",
    ai.hidden = !1,
    dl.focus({
        preventScroll: !0
    })
}
function Br() {
    ai.hidden = !0
}
function $h(t, e, n, i, r={}) {
    let o = i && Re !== null ? $e.find(a => a.id === Re) ?? null : null;
    const s = r.activeSide ?? zl(e);
    o ? (o.name = t.name,
    o.file = t,
    o.board = e,
    o.includeLayerData = n,
    o.revisionIndex = r.revisionIndex ?? mi(e, o.revisionIndex),
    o.activeSide = s,
    o.selectedComponentId = null,
    o.selectedPadIndex = null,
    o.selectedNetName = "",
    o.manualTopLayerId = null,
    o.selectedLayerId = null,
    o.selectedLayerTraceFocusId = null,
    o.selectedTraceIndex = null,
    o.highlightSameParts = nt,
    o.highlightSelectedPartNets = it,
    o.highlightFullSignalTrace = !1,
    o.darkenPartsWithoutInfo = rt,
    o.findQuery = Yt.value,
    o.findFilterMode = We,
    o.findWholeWord = Ze,
    o.findHighlightMatches = pt,
    o.searchState = void 0) : (o = {
        id: oh++,
        name: t.name,
        file: t,
        board: e,
        includeLayerData: n,
        revisionIndex: r.revisionIndex ?? mi(e, -1),
        activeSide: s,
        viewState: null,
        selectedComponentId: null,
        selectedPadIndex: null,
        selectedNetName: "",
        manualTopLayerId: null,
        selectedLayerId: null,
        selectedLayerTraceFocusId: null,
        selectedTraceIndex: null,
        sidebarPane: j,
        highlightSameParts: nt,
        highlightSelectedPartNets: it,
        highlightFullSignalTrace: !1,
        darkenPartsWithoutInfo: rt,
        findQuery: "",
        findFilterMode: "info",
        findWholeWord: !1,
        findHighlightMatches: !1,
        searchState: void 0
    },
    $e.push(o)),
    Re = o.id,
    We = o.findFilterMode,
    Ze = o.findWholeWord,
    pt = o.findHighlightMatches,
    kn(),
    Si(),
    Ar()
}
function Vl(t) {
    const e = $e.find(n => n.id === t);
    !e || Re === e.id || (es(),
    Re = e.id,
    P = e.board,
    cn = e.file,
    H = e.includeLayerData,
    Z.checked = H,
    Zt(),
    E = null,
    R = null,
    A = "",
    q = e.selectedLayerId,
    ne = e.selectedLayerTraceFocusId,
    J = e.selectedTraceIndex,
    nt = e.highlightSameParts,
    it = e.highlightSelectedPartNets,
    Ut = e.highlightFullSignalTrace,
    rt = e.darkenPartsWithoutInfo,
    We = e.findFilterMode,
    Ze = e.findWholeWord,
    pt = e.findHighlightMatches,
    kn(),
    oe(),
    g.setLayerModeEnabled(H),
    g.setActiveSide(e.activeSide),
    g.setBoard(e.board, {
        preserveCaches: !0,
        fitToView: e.viewState === null
    }),
    g.setHighlightFullSignalTrace(Ut),
    g.setTopLayerId(e.manualTopLayerId),
    e.viewState && g.restoreViewState(e.viewState),
    Kt(),
    g.selectLayerTraceFocus(ne),
    ae(""),
    le(""),
    Si(),
    Ar(),
    Lr(),
    De(),
    Dl(),
    yf(e),
    Ae(),
    re(e.sidebarPane),
    Do())
}
function El() {
    es(),
    Re = null,
    P = null,
    cn = null,
    H = !1,
    Z.checked = !1,
    Zt(),
    E = null,
    R = null,
    A = "",
    q = null,
    ne = null,
    J = null,
    nt = !1,
    it = !1,
    Ut = !1,
    rt = !1,
    We = "info",
    Ze = !1,
    pt = !1,
    Oo = new Set,
    kn(),
    pr = [],
    yn = [],
    di = [],
    mr = new Map,
    ui = new Map,
    hn(),
    yi(),
    oe(),
    ue(),
    g.setLayerModeEnabled(!1),
    g.clearBoard({
        preserveCaches: !0
    }),
    Ae(),
    ae(""),
    le(""),
    Yt.value = "",
    Si(),
    Ar(),
    Lr(),
    De(),
    qt()
}
function _h(t) {
    const e = $e.findIndex(o => o.id === t);
    if (e < 0)
        return;
    const n = Re === t
      , i = $e[e];
    if ($e.splice(e, 1),
    i && g.forgetBoard(i.board),
    !n) {
        Si();
        return
    }
    const r = $e[Math.min(e, $e.length - 1)] ?? null;
    r ? Vl(r.id) : El()
}
function Si() {
    Ui.replaceChildren();
    const t = document.createElement("button");
    t.className = "document-tab document-tab-home",
    t.type = "button",
    t.role = "tab",
    t.dataset.home = "true",
    t.classList.toggle("active", Re === null),
    t.textContent = "Home",
    Ui.append(t);
    for (const e of $e) {
        const n = document.createElement("div");
        n.className = "document-tab",
        n.role = "tab",
        n.dataset.tabId = String(e.id),
        n.classList.toggle("active", e.id === Re),
        n.title = e.name;
        const i = document.createElement("span");
        i.className = "document-tab-label",
        i.textContent = e.name;
        const r = document.createElement("button");
        r.className = "document-tab-close",
        r.type = "button",
        r.title = `Close ${e.name}`,
        r.setAttribute("aria-label", `Close ${e.name}`),
        r.textContent = "X",
        n.append(i, r),
        Ui.append(n)
    }
}
function Ar() {
    ku.hidden = Re !== null
}
function Rl(t) {
    return t.layers.length > 0 || t.metadata.layerDataAvailable
}
function ef(t) {
    (t.metadata.layerDataAvailable || t.layers.length > 0 || t.graphics.some(n => n.layer !== "edge-cuts") || t.tracks.length > 0 || t.vias.length > 0 || t.zones.length > 0 || t.texts.length > 0) && (t.metadata.layerDataAvailable = !0,
    t.layers = [],
    t.graphics = t.graphics.filter(n => n.layer === "edge-cuts"),
    t.tracks = [],
    t.vias = [],
    t.zones = [],
    t.texts = [])
}
function Mr(t) {
    return Array.from(t.dataTransfer?.types ?? []).includes("Files")
}
function tf(t) {
    return Array.from(t ?? []).filter(nf)
}
function nf(t) {
    return bu.test(t.name)
}
function Lr() {
    const t = P ? Rl(P) : !1;
    Z.disabled = !t,
    t || (H = !1,
    Z.checked = !1),
    Zt()
}
function De() {
    wt.replaceChildren(),
    _s.value = cf(),
    _s.scrollLeft = 0;
    const t = !!(P && H && P.layers.length > 0);
    if (ci.checked = Ut,
    ci.disabled = !t,
    Dt.hidden = !t,
    yl.hidden = !t || !Dt.classList.contains("active"),
    !t && Dt.classList.contains("active") && re("part"),
    wt.classList.toggle("empty-list", !t),
    !P || !H) {
        wt.textContent = "";
        return
    }
    if (P.layers.length === 0) {
        wt.textContent = "None";
        return
    }
    if (q !== null && !P.layers.some(s => s.id === q)) {
        q = null,
        ne = null,
        g.selectLayerTraceFocus(null);
        const s = W();
        s && (s.selectedLayerId = null,
        s.selectedLayerTraceFocusId = null)
    }
    const e = g.getTopLayerId();
    if (e !== null && !P.layers.some(s => s.id === e)) {
        g.setTopLayerId(null);
        const s = W();
        s && (s.manualTopLayerId = null)
    }
    const n = document.createElement("div");
    n.className = "layer-row layer-row-header";
    const i = document.createElement("span");
    i.textContent = "Layer";
    const r = document.createElement("span");
    r.textContent = "Top",
    n.append(i, r),
    wt.append(n),
    Nr(n, wt, "layer", [90, 28]);
    const o = lf();
    for (const s of P.layers) {
        const a = document.createElement("div");
        a.className = "layer-row";
        const l = q === s.id || J !== null && q === s.id;
        a.classList.toggle("selected", l),
        a.classList.toggle("associated", o.has(s.id)),
        a.tabIndex = 0,
        a.dataset.layerId = String(s.id),
        a.addEventListener("click", () => sa(s.id)),
        a.addEventListener("keydown", m => {
            (m.key === "Enter" || m.key === " ") && (m.preventDefault(),
            sa(s.id))
        }
        );
        const c = document.createElement("input");
        c.type = "checkbox",
        c.checked = g.isLayerVisible(s.id),
        c.title = "Visible",
        c.addEventListener("click", m => m.stopPropagation()),
        c.addEventListener("change", () => {
            g.setLayerVisible(s.id, c.checked),
            De()
        }
        );
        const d = document.createElement("span");
        d.className = "layer-swatch",
        d.style.background = Dp(s);
        const u = document.createElement("span");
        u.className = "layer-name",
        u.textContent = s.name || s.role;
        const h = document.createElement("span");
        h.className = "layer-cell",
        h.append(c, d, u);
        const f = document.createElement("input");
        f.type = "radio",
        f.name = "topLayer",
        f.checked = g.getTopLayerId() === s.id,
        f.title = "Top",
        f.addEventListener("click", m => m.stopPropagation()),
        f.addEventListener("pointerdown", m => {
            m.preventDefault(),
            m.stopPropagation(),
            aa(g.getTopLayerId() === s.id ? null : s.id)
        }
        ),
        f.addEventListener("keydown", m => {
            m.key !== "Enter" && m.key !== " " || (m.preventDefault(),
            m.stopPropagation(),
            aa(g.getTopLayerId() === s.id ? null : s.id))
        }
        );
        const p = document.createElement("span");
        p.className = "layer-top-cell",
        p.append(f),
        a.append(h, p),
        wt.append(a),
        l && requestAnimationFrame( () => a.scrollIntoView({
            block: "nearest"
        }))
    }
}
function Ol() {
    const t = of(P);
    if (sr.hidden = !t,
    !t && j === "subboards") {
        re("part");
        return
    }
    gl.hidden = !t || j !== "subboards"
}
function rf() {
    Ol(),
    Ri.replaceChildren();
    const t = _o(P)
      , e = t.length > 1;
    if (Ri.classList.toggle("empty-list", !e),
    !P || !e)
        return;
    const n = document.createElement("div");
    n.className = "subboard-row subboard-row-header";
    const i = document.createElement("span");
    i.textContent = "Board",
    n.append(i),
    Ri.append(n);
    const r = mi(P, 0);
    for (let o = 0; o < t.length; o += 1) {
        const s = document.createElement("button");
        s.type = "button",
        s.className = "subboard-row",
        s.classList.toggle("selected", o === r),
        s.addEventListener("click", () => {
            af(o)
        }
        );
        const a = document.createElement("span");
        a.textContent = sf(t[o] ?? "", o),
        s.append(a),
        Ri.append(s)
    }
}
function of(t) {
    return _o(t).length > 1
}
function _o(t) {
    return t && Array.isArray(t.metadata.subBoardNames) ? t.metadata.subBoardNames : []
}
function sf(t, e) {
    const n = t.trim();
    return e === 0 ? "Main" : n || `Sub-board ${e}`
}
async function af(t) {
    const e = W();
    !P || !e || t === mi(P, e.revisionIndex) || (await In(e.file, e.includeLayerData, {
        replaceActiveTab: !0,
        revisionIndex: t
    }),
    re("subboards"))
}
function lf() {
    return !P || A.trim() === "" ? new Set : Wl(A)
}
function cf() {
    if (!P)
        return "";
    const t = A.trim();
    if (t === "")
        return "";
    const e = df(t).map(hf);
    return e.length > 0 ? `${t} (${e.join(", ")})` : t
}
function df(t) {
    if (!P)
        return [];
    const e = Wl(t);
    return P.layers.filter(n => e.has(n.id))
}
function Wl(t) {
    const e = new Set;
    if (!P)
        return e;
    const n = t.trim();
    if (n === "")
        return e;
    for (const i of P.graphics)
        i.net === n && !i.sourceNegative && i.layerId >= 0 && e.add(i.layerId);
    for (const i of [...P.tracks, ...P.zones]) {
        if (i.net !== n)
            continue;
        const r = ff(i.layer);
        r && e.add(r.id)
    }
    for (const i of P.components)
        for (const r of i.pads)
            r.net === n && (r.layerId >= 0 && e.add(r.layerId),
            r.type === "through-hole" && r.drillDiameter > 0 && oa(e));
    return P.vias.some(i => i.net === n) && oa(e),
    e
}
function oa(t) {
    if (P)
        for (const e of P.layers)
            (e.class === "through" || uf(e)) && t.add(e.id)
}
function uf(t) {
    const e = `${t.name} ${t.role}`.trim().toLocaleLowerCase();
    return e.includes("drl") || e.includes("drill") || e.includes("via")
}
function hf(t) {
    return t.name.trim() || t.role.trim() || `Layer ${t.id}`
}
function ff(t) {
    if (!P || t.trim() === "")
        return null;
    const e = t.trim().toLocaleLowerCase();
    return P.layers.find(n => n.name.trim().toLocaleLowerCase() === e || n.role.trim().toLocaleLowerCase() === e) ?? null
}
function sa(t) {
    q = t,
    ne = t,
    J = g.findTraceGraphicIndexForLayerSelection(t, A);
    const e = W();
    e && (e.selectedLayerId = t,
    e.selectedLayerTraceFocusId = t,
    e.selectedTraceIndex = J),
    g.selectTrace(J),
    g.selectLayerTraceFocus(t),
    De()
}
function aa(t) {
    g.setTopLayerId(t);
    const e = W();
    e && (e.manualTopLayerId = t),
    De()
}
function pf(t) {
    Ut = t,
    ci.checked = t;
    const e = W();
    e && (e.highlightFullSignalTrace = t),
    g.setHighlightFullSignalTrace(t)
}
function Dl() {
    hn(),
    yi(),
    ue(),
    ae(""),
    le("");
    const t = W();
    if (Yt.value = t?.findQuery ?? "",
    !P) {
        pr = [],
        yn = [],
        di = [],
        mr = new Map,
        ui = new Map,
        jt();
        return
    }
    const e = t?.board === P ? t.searchState ??= la(P) : la(P);
    mf(e),
    jt()
}
function la(t) {
    const e = []
      , n = []
      , i = []
      , r = [...t.components].sort( (o, s) => Mn(Q(o), Q(s)));
    for (const o of r) {
        const s = Q(o);
        if (!s)
            continue;
        e.push({
            value: s,
            label: [o.value, o.footprint].filter(Boolean).join(" | "),
            valueLower: s.toLocaleLowerCase(),
            searchText: `${s} ${o.value} ${o.footprint}`.toLocaleLowerCase()
        });
        const a = String(hc(o))
          , l = xe(o);
        i.push({
            component: o,
            refdes: s,
            side: o.side === "T" ? "T" : "B",
            pins: a,
            info: l,
            infoLower: l.toLocaleLowerCase()
        })
    }
    for (const o of Cp(t)) {
        const s = t.nets.find(a => a.name === o);
        n.push({
            value: o,
            label: s?.noConnect ? "NC" : "",
            valueLower: o.toLocaleLowerCase(),
            searchText: `${o} ${s?.noConnect ? "NC" : ""}`.toLocaleLowerCase()
        })
    }
    return {
        componentChoices: e,
        netChoices: n,
        findPartRows: i,
        netPinRefCache: Ef(t),
        orderedPadEntriesCache: new Map
    }
}
function mf(t) {
    pr = t.componentChoices,
    yn = t.netChoices,
    di = t.findPartRows,
    mr = t.netPinRefCache,
    ui = t.orderedPadEntriesCache
}
function W() {
    return Re === null ? null : $e.find(t => t.id === Re) ?? null
}
function es() {
    const t = W();
    if (!t || !P || t.board !== P || g.getBoard() !== P)
        return;
    t.activeSide = g.getActiveSide(),
    t.viewState = g.captureViewState(),
    t.selectedComponentId = E?.id ?? null;
    const e = R;
    t.selectedPadIndex = e && e.component.id === E?.id ? e.padIndex : null,
    t.selectedNetName = A,
    t.selectedLayerId = q,
    t.selectedLayerTraceFocusId = ne,
    t.selectedTraceIndex = J,
    t.sidebarPane = j,
    t.highlightFullSignalTrace = Ut,
    t.findQuery = Yt.value,
    t.findFilterMode = We,
    t.findWholeWord = Ze,
    t.findHighlightMatches = pt
}
function mi(t, e) {
    const n = _o(t);
    return n.length > 0 ? Tt(t.metadata.activeSubBoardIndex, 0, n.length - 1) : t.metadata.revisionNames.length > 0 && t.metadata.activeRevisionIndex >= 0 ? Tt(t.metadata.activeRevisionIndex, 0, t.metadata.revisionNames.length - 1) : e
}
function zl(t) {
    const n = {
        highPinSmdSum: 0,
        smdPads: 0,
        sideTaggedPads: 0
    }
      , i = {
        highPinSmdSum: 0,
        smdPads: 0,
        sideTaggedPads: 0
    }
      , r = (o, s, a) => {
        o.smdPads += s,
        o.sideTaggedPads += a,
        s >= 100 && (o.highPinSmdSum += s)
    }
    ;
    for (const o of t.components) {
        let s = 0
          , a = 0
          , l = 0
          , c = 0;
        for (const d of o.pads)
            d.side === "T" ? (l += 1,
            d.type === "smd" && (s += 1)) : d.side === "B" && (c += 1,
            d.type === "smd" && (a += 1));
        r(n, s, l),
        r(i, a, c)
    }
    return n.highPinSmdSum !== i.highPinSmdSum ? n.highPinSmdSum > i.highPinSmdSum ? "T" : "B" : n.smdPads !== i.smdPads ? n.smdPads > i.smdPads ? "T" : "B" : n.sideTaggedPads !== i.sideTaggedPads && n.sideTaggedPads > i.sideTaggedPads ? "T" : "B"
}
function yf(t) {
    E = null,
    R = null,
    A = "";
    const e = t.selectedTraceIndex
      , n = e !== null ? t.board.graphics[e] : void 0;
    if (n && n.net.trim() !== "" && n.layer !== "edge-cuts") {
        J = e,
        ne = t.selectedLayerTraceFocusId === n.layerId ? t.selectedLayerTraceFocusId : null,
        A = n.net,
        q = n.layerId >= 0 ? n.layerId : null,
        t.selectedLayerId = q,
        t.selectedLayerTraceFocusId = ne,
        ae(""),
        le(n.net),
        g.selectTrace(e),
        g.selectLayerTraceFocus(ne),
        De();
        return
    }
    J = null,
    t.selectedTraceIndex = null;
    const i = t.selectedComponentId === null ? null : t.board.components.find(r => r.id === t.selectedComponentId) ?? null;
    if (i) {
        E = i;
        const r = t.selectedPadIndex
          , o = r !== null ? i.pads[r] : void 0;
        o && r !== null ? (R = {
            component: i,
            pad: o,
            padIndex: r
        },
        A = o.net,
        ae(Q(i)),
        le(o.net),
        g.selectPad(i.id, r)) : (t.selectedPadIndex = null,
        A = t.selectedNetName,
        ae(Q(i)),
        le(A),
        g.selectComponent(i.id),
        A.trim() !== "" && g.selectNet(A, !0))
    } else
        t.selectedNetName.trim() !== "" ? (t.selectedComponentId = null,
        t.selectedPadIndex = null,
        A = t.selectedNetName,
        ae(""),
        le(A),
        g.selectNet(A)) : (t.selectedComponentId = null,
        t.selectedPadIndex = null,
        t.selectedNetName = "",
        ae(""),
        le(""),
        g.selectComponent(null));
    g.selectLayerTraceFocus(ne),
    De()
}
function Hl(t) {
    Iu && (t.classList.add("manual-touch-scroll"),
    t.addEventListener("pointerdown", e => gf(t, e)),
    t.addEventListener("pointermove", bf),
    t.addEventListener("pointerup", e => ca(e, !0)),
    t.addEventListener("pointercancel", e => ca(e, !1)),
    t.addEventListener("lostpointercapture", e => {
        At?.pointerId === e.pointerId && (At = null)
    }
    ))
}
function gf(t, e) {
    e.pointerType === "mouse" || e.button !== 0 || !t.classList.contains("open") || (e.preventDefault(),
    ts(),
    Yl(),
    At = {
        pointerId: e.pointerId,
        menu: t,
        startClientY: e.clientY,
        startScrollTop: t.scrollTop,
        lastClientY: e.clientY,
        lastTime: e.timeStamp,
        velocity: 0,
        dragging: !1
    },
    t.setPointerCapture(e.pointerId))
}
function bf(t) {
    const e = At;
    if (!e || e.pointerId !== t.pointerId)
        return;
    t.preventDefault();
    const n = e.startClientY - t.clientY;
    if (!e.dragging && Math.abs(n) <= 3)
        return;
    e.dragging = !0;
    const i = Math.max(1, Math.min(50, t.timeStamp - e.lastTime))
      , r = (e.lastClientY - t.clientY) / i;
    e.velocity = e.velocity * .58 + r * .42,
    e.lastClientY = t.clientY,
    e.lastTime = t.timeStamp,
    e.menu.scrollTop = e.startScrollTop + n,
    Jt(e.menu)
}
function ca(t, e) {
    const n = At;
    if (!n || n.pointerId !== t.pointerId || (t.preventDefault(),
    At = null,
    n.menu.hasPointerCapture(t.pointerId) && n.menu.releasePointerCapture(t.pointerId),
    !e))
        return;
    if (n.dragging) {
        xf(n.menu, n.velocity);
        return
    }
    const r = document.elementFromPoint(t.clientX, t.clientY)?.closest(".combo-option");
    r && n.menu.contains(r) && ns(n.menu, r)
}
function Yl() {
    const t = At;
    At = null,
    t?.menu.hasPointerCapture(t.pointerId) && t.menu.releasePointerCapture(t.pointerId)
}
function xf(t, e) {
    if (ts(),
    Math.abs(e) < .025)
        return;
    let n = e
      , i = performance.now();
    const r = o => {
        if (!t.classList.contains("open")) {
            Ot = 0;
            return
        }
        const s = Math.max(1, Math.min(34, o - i));
        i = o;
        const a = t.scrollTop;
        if (t.scrollTop += n * s,
        Jt(t),
        n *= Math.exp(-5.2 * s / 1e3),
        Math.abs(n) < .025 || t.scrollTop === a) {
            Ot = 0;
            return
        }
        Ot = requestAnimationFrame(r)
    }
    ;
    Ot = requestAnimationFrame(r)
}
function ts() {
    Ot !== 0 && (cancelAnimationFrame(Ot),
    Ot = 0)
}
function ns(t, e) {
    const n = e.dataset.value ?? "";
    t === de ? (ae(n),
    ue(),
    is(Ue.value)) : (le(n),
    ue(),
    rs(Ke.value))
}
function Tr(t, e=!1) {
    const n = t === "parts" ? de : Be
      , i = t === "parts" ? pr : yn
      , r = t === "parts" ? Ue.value : Ke.value;
    (t === "parts" ? Be : de).classList.remove("open"),
    ar = t,
    Pf(n, i, r, e);
    const s = xn?.menu === n && xn.matches.length > 0;
    n.classList.toggle("open", s),
    s ? (wf(n),
    Zl(n),
    Jt(n, !0)) : be = -1
}
function Xl(t, e=!0) {
    const n = t === "parts" ? de : Be
      , i = t === "parts" ? Ue : Ke;
    if (n.classList.contains("open")) {
        ue({
            blurInputs: !e
        });
        return
    }
    e ? i.focus({
        preventScroll: !0
    }) : Ul(),
    Tr(t, !1)
}
function ue(t={}) {
    ts(),
    Yl(),
    de.classList.remove("open"),
    Be.classList.remove("open"),
    ar = null,
    be = -1,
    xn = null,
    t.blurInputs && Ul()
}
function Ul() {
    document.activeElement === Ue && Ue.blur(),
    document.activeElement === Ke && Ke.blur()
}
function Kl(t, e) {
    const n = t === "parts" ? de : Be;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault(),
        n.classList.contains("open") ? vf(t, e.key === "ArrowDown" ? 1 : -1) : Tr(t, !1);
        return
    }
    if (e.key === "Enter") {
        if (e.preventDefault(),
        n.classList.contains("open") && Cf(t))
            return;
        t === "parts" ? is(Ue.value) : rs(Ke.value),
        ue();
        return
    }
    e.key === "Escape" && (e.preventDefault(),
    ue())
}
function wf(t) {
    const e = Nn(t);
    if (!e) {
        be = -1;
        return
    }
    const n = e.matches.findIndex(i => dr(i) === e.selectedNeedle);
    be = n >= 0 ? n : e.matches.length > 0 ? 0 : -1
}
function vf(t, e) {
    const n = t === "parts" ? de : Be
      , r = Nn(n)?.matches.length ?? 0;
    if (r === 0) {
        be = -1;
        return
    }
    ar !== t || be < 0 ? (ar = t,
    be = 0) : be = (be + e + r) % r,
    Zl(n),
    Jt(n, !0)
}
function Cf(t) {
    const i = Nn(t === "parts" ? de : Be)?.matches[be];
    if (!i)
        return !1;
    const r = i.value;
    return t === "parts" ? (ae(r),
    ue(),
    is(Ue.value)) : (le(r),
    ue(),
    rs(Ke.value)),
    !0
}
function Nn(t) {
    return xn?.menu === t ? xn : null
}
function Sf(t) {
    Nn(t) && t.querySelectorAll(".combo-option").forEach(n => {
        const i = Number(n.dataset.index)
          , r = n.classList.contains("selected");
        n.classList.toggle("active", i === be),
        n.setAttribute("aria-selected", r ? "true" : "false")
    }
    )
}
function Zl(t) {
    if (!t.classList.contains("open"))
        return;
    const e = Nn(t);
    if (!e || be < 0)
        return;
    const n = window.getComputedStyle(t)
      , i = Number.parseFloat(n.paddingTop) || 0
      , r = Number.parseFloat(n.paddingBottom) || 0
      , o = i + be * e.rowHeight
      , s = o + e.rowHeight
      , a = t.scrollTop + i
      , l = t.scrollTop + t.clientHeight - r;
    o < a ? t.scrollTop = Math.max(0, o - i) : s > l && (t.scrollTop = Math.max(0, s - t.clientHeight + r))
}
function ae(t) {
    ql(Ue, t, "")
}
function le(t) {
    ql(Ke, t, "")
}
function ql(t, e, n) {
    t.value = e,
    t.placeholder = n,
    t.classList.toggle("empty", e === "")
}
function Pf(t, e, n, i) {
    const r = n.trim().toLocaleLowerCase()
      , o = i && r ? e.filter(l => Bf(l, r)) : e;
    if (r && !o.some(l => dr(l) === r)) {
        const l = e.find(c => dr(c) === r);
        l && o.unshift(l)
    }
    const s = document.createElement("div");
    s.className = "combo-virtual-spacer";
    const a = Bo.matches ? Lu : Mu;
    s.style.height = `${o.length * a}px`,
    t.replaceChildren(s),
    xn = {
        kind: t === de ? "parts" : "nets",
        menu: t,
        choices: e,
        matches: o,
        selectedNeedle: r,
        spacer: s,
        rowHeight: a,
        start: -1,
        end: -1
    },
    t.scrollTop = 0,
    Jt(t, !0)
}
function Jt(t, e=!1) {
    const n = Nn(t);
    if (!n)
        return;
    const i = Math.max(0, t.scrollTop)
      , r = Math.max(i, t.scrollTop + t.clientHeight)
      , o = Math.max(0, Math.floor(i / n.rowHeight) - Js)
      , s = Math.min(n.matches.length, Math.ceil(r / n.rowHeight) + Js);
    if (!e && n.start === o && n.end === s) {
        Sf(t);
        return
    }
    n.start = o,
    n.end = s;
    const a = document.createDocumentFragment();
    for (let l = o; l < s; l += 1) {
        const c = n.matches[l];
        if (!c)
            continue;
        const d = document.createElement("div");
        d.className = "combo-option",
        d.classList.toggle("selected", n.selectedNeedle !== "" && dr(c) === n.selectedNeedle),
        d.classList.toggle("active", l === be),
        d.setAttribute("role", "option"),
        d.setAttribute("aria-selected", d.classList.contains("selected") ? "true" : "false"),
        d.dataset.value = c.value,
        d.dataset.index = String(l),
        d.style.top = `${l * n.rowHeight}px`;
        const u = document.createElement("span");
        u.className = "combo-option-value",
        u.textContent = c.value,
        d.append(u),
        a.append(d)
    }
    n.spacer.replaceChildren(a)
}
function Bf(t, e) {
    return Af(t).includes(e)
}
function dr(t) {
    return t.valueLower ?? t.value.toLocaleLowerCase()
}
function Af(t) {
    return t.searchText ?? `${t.value} ${t.label ?? ""}`.toLocaleLowerCase()
}
function is(t) {
    if (!P)
        return;
    const e = Mf(t);
    e && os(e, !0)
}
function rs(t) {
    if (!P)
        return;
    const e = Lf(t);
    if (!e)
        return;
    R = null,
    A = e,
    J = null,
    q = null,
    ne = null,
    ae(E ? Q(E) : ""),
    le(e),
    g.selectNet(e, !0);
    const n = W();
    n && (n.selectedLayerId = null,
    n.selectedLayerTraceFocusId = null,
    n.selectedTraceIndex = null),
    Ae(),
    re("net")
}
function Mf(t) {
    if (!P)
        return null;
    const e = t.trim().toLocaleLowerCase();
    return e ? P.components.find(n => Q(n).toLocaleLowerCase() === e) ?? P.components.find(n => `${Q(n)} ${n.value} ${n.footprint} ${n.displayInfo}`.toLocaleLowerCase().includes(e)) ?? null : null
}
function Lf(t) {
    if (!P)
        return null;
    const e = t.trim().toLocaleLowerCase();
    return e ? yn.find(n => n.value.toLocaleLowerCase() === e)?.value ?? yn.find(n => n.value.toLocaleLowerCase().includes(e))?.value ?? null : null
}
function da(t) {
    if (!t) {
        Jo();
        return
    }
    if (t.pad) {
        ss(t.component, t.pad, t.padIndex, {
            showPartPane: j === "part",
            ensureVisible: j === "part"
        });
        return
    }
    os(t.component, !1, j === "part", !1)
}
function yo(t, e={}) {
    if (!t) {
        Jo();
        return
    }
    if (E = null,
    R = null,
    A = t.net,
    J = t.graphicIndex,
    q = t.layerId >= 0 ? t.layerId : null,
    ne = null,
    e.switchSide) {
        const i = hp(t.graphic);
        i && Fr(i)
    }
    ae(""),
    le(t.net),
    g.selectTrace(t.graphicIndex);
    const n = W();
    n && (n.selectedTraceIndex = t.graphicIndex,
    n.selectedLayerId = q,
    n.selectedLayerTraceFocusId = null),
    Ae(),
    De(),
    e.showNetPane === !0 ? re("net") : Dt.hidden ? qt() : re("layers")
}
function os(t, e, n=!0, i=!0) {
    const r = !n && j === "find";
    E = t,
    R = null,
    i || (A = ""),
    J = null,
    q = null,
    ne = null,
    t && e && Fr(t.side),
    g.selectComponent(t?.id ?? null, i);
    const o = W();
    o && (o.selectedLayerId = null,
    o.selectedLayerTraceFocusId = null,
    o.selectedTraceIndex = null),
    t && e && g.focusComponent(t),
    ae(t ? Q(t) : ""),
    le(A),
    Ae(),
    n && re("part"),
    qt(r)
}
function re(t) {
    t === "layers" && Dt.hidden && (t = "part"),
    t === "subboards" && sr.hidden && (t = "part"),
    j = t,
    pl.classList.toggle("active", t === "part"),
    Go.classList.toggle("active", t === "net"),
    Vo.classList.toggle("active", t === "find"),
    Dt.classList.toggle("active", t === "layers"),
    sr.classList.toggle("active", t === "subboards"),
    Eo.hidden = t !== "part",
    Ro.hidden = t !== "net",
    ml.hidden = t !== "find",
    yl.hidden = t !== "layers",
    gl.hidden = t !== "subboards",
    jl(),
    t === "part" && requestAnimationFrame(ur)
}
function qt(t=!1) {
    if (Ol(),
    Ir(!1),
    t && j === "find") {
        Wf(),
        requestAnimationFrame(kr);
        return
    }
    jl()
}
function jl() {
    j === "part" ? Ql() : j === "net" ? Ir(!0) : j === "find" ? jt() : j === "layers" ? De() : j === "subboards" && rf(),
    requestAnimationFrame(kr)
}
function Ql() {
    if (_u.hidden = !E,
    uo.textContent = "",
    Oi.value = "",
    Oi.scrollLeft = 0,
    $s.textContent = "",
    M.hidden = !1,
    M.classList.remove("empty-list"),
    M.classList.toggle("part-list-no-selection", !E),
    !E) {
        hn(),
        M.replaceChildren(jr()),
        M.scrollTop = 0;
        return
    }
    const t = E;
    uo.textContent = fc(t),
    Oi.value = xe(t),
    Oi.scrollLeft = 0,
    $s.textContent = `Pins: ${hc(t)}`;
    const e = np(t);
    if (e.length === 0) {
        hn(),
        M.replaceChildren(jr()),
        M.scrollTop = 0;
        return
    }
    if (yr === t.id) {
        ye?.componentId === t.id ? Pi() : Nf(),
        ur();
        return
    }
    hn(),
    M.replaceChildren(),
    M.scrollTop = 0,
    M.append(jr()),
    e.length >= Pu ? If(t, e) : Tf(t, e),
    ur()
}
function jr() {
    const t = document.createElement("div");
    return t.className = "pin-row pin-row-header",
    t.append(_e("Pin", "Pin", Qe.key === "pin" && Qe.userSelected, Qe.direction, () => ma("pin")), _e("Net", "Net", Qe.key === "net" && Qe.userSelected, Qe.direction, () => ma("net"))),
    Nr(t, M, "pin", [40, 64]),
    t
}
function Tf(t, e) {
    const n = document.createDocumentFragment();
    for (const {pad: i, index: r} of e)
        n.append(Jl(t, i, r));
    M.append(n),
    yr = t.id
}
function If(t, e) {
    const n = document.createElement("div")
      , i = fn(za);
    n.className = "pin-virtual-spacer",
    n.style.height = `${e.length * i}px`;
    const r = new Map;
    e.forEach( (o, s) => r.set(o.index, s)),
    ye = {
        componentId: t.id,
        component: t,
        entries: e,
        spacer: n,
        rowHeight: i,
        orderByPadIndex: r
    },
    yr = t.id,
    M.append(n),
    Pi()
}
function Pi() {
    const t = ye;
    if (!t || Eo.hidden || M.hidden)
        return;
    const e = _l()
      , n = Math.max(0, M.scrollTop - e)
      , i = Math.max(n, M.scrollTop + M.clientHeight - e)
      , r = Math.max(0, Math.floor(n / t.rowHeight) - qs)
      , o = Math.min(t.entries.length, Math.ceil(i / t.rowHeight) + qs)
      , s = document.createDocumentFragment();
    for (let a = r; a < o; a += 1) {
        const l = t.entries[a];
        if (!l)
            continue;
        const c = Jl(t.component, l.pad, l.index);
        c.style.top = `${a * t.rowHeight}px`,
        s.append(c)
    }
    t.spacer.replaceChildren(s)
}
function Jl(t, e, n) {
    const i = document.createElement("button");
    return i.className = "pin-row",
    i.type = "button",
    i.classList.toggle("selected", R?.component.id === t.id && R?.padIndex === n),
    i.dataset.padIndex = String(n),
    i.addEventListener("click", () => ss(t, e, n, {
        switchSide: !0
    })),
    i.append(ua(ce(e, n)), ua(ht(e.net))),
    i
}
function Nf() {
    M.querySelectorAll(".pin-row.selected").forEach(t => t.classList.remove("selected")),
    !(!R || R.component.id !== E?.id) && M.querySelector(`.pin-row[data-pad-index="${R.padIndex}"]`)?.classList.add("selected")
}
function hn() {
    ye = null,
    yr = null
}
function fn(t) {
    return Bo.matches ? 24 : t
}
function $l() {
    const t = fn(za);
    if (ye && ye.rowHeight !== t) {
        const i = t / ye.rowHeight;
        ye.rowHeight = t,
        ye.spacer.style.height = `${ye.entries.length * t}px`,
        M.scrollTop *= i,
        Pi()
    }
    const e = fn(Ha);
    if (ge && ge.rowHeight !== e) {
        const i = e / ge.rowHeight;
        ge.rowHeight = e,
        ge.spacer.style.height = `${ge.refs.length * e}px`,
        N.scrollTop *= i,
        Bi()
    }
    const n = fn(Ya);
    if (ct && ct.rowHeight !== n) {
        const i = n / ct.rowHeight;
        ct.rowHeight = n,
        ct.spacer.style.height = `${ct.rows.length * n}px`,
        V.scrollTop *= i,
        as()
    }
}
function _l() {
    return M.querySelector(".pin-row-header")?.offsetHeight ?? 0
}
function ur() {
    if (!R || Eo.hidden)
        return;
    if (ye?.componentId === R.component.id) {
        const a = ye.orderByPadIndex.get(R.padIndex);
        if (a === void 0)
            return;
        const l = _l()
          , c = l + a * ye.rowHeight
          , d = c + ye.rowHeight
          , u = M.scrollTop + l
          , h = M.scrollTop + M.clientHeight;
        c < u ? M.scrollTop = Math.max(0, c - l) : d > h && (M.scrollTop = Math.max(0, d - M.clientHeight)),
        Pi();
        return
    }
    const t = M.querySelector(`.pin-row.selected[data-pad-index="${R.padIndex}"]`) ?? M.querySelector(".pin-row.selected");
    if (!t)
        return;
    const n = M.querySelector(".pin-row-header")?.offsetHeight ?? 0
      , i = M.getBoundingClientRect()
      , r = t.getBoundingClientRect()
      , o = i.top + n
      , s = i.bottom;
    r.top < o ? M.scrollTop -= o - r.top : r.bottom > s && (M.scrollTop += r.bottom - s)
}
function ua(t) {
    const e = document.createElement("span");
    return e.textContent = t,
    e
}
function ss(t, e, n, i={}) {
    E = t,
    R = {
        component: t,
        pad: e,
        padIndex: n
    },
    A = e.net,
    J = null,
    q = null,
    ne = null,
    i.switchSide && Fr(e.side),
    ae(Q(t)),
    le(e.net),
    g.selectPad(t.id, n),
    i.focus && g.focusPad(t, e);
    const r = W();
    r && (r.selectedLayerId = null,
    r.selectedLayerTraceFocusId = null,
    r.selectedTraceIndex = null),
    Ae(),
    i.showPartPane ? (Ir(!1),
    re("part")) : qt(),
    i.ensureVisible && requestAnimationFrame(ur)
}
function Ir(t=j === "net") {
    const e = A ? rc(A) : [];
    if (Go.textContent = e.length > 0 ? `Net (${e.length})` : "Net",
    eh.textContent = A || "Net",
    !t)
        return;
    if (N.classList.remove("empty-list"),
    e.length === 0) {
        yi(),
        N.replaceChildren(ha()),
        N.scrollTop = 0;
        return
    }
    if (gr === A) {
        ge?.netName === A ? Bi() : Gf(),
        fa();
        return
    }
    const n = op(A);
    yi(),
    N.replaceChildren(),
    N.scrollTop = 0,
    N.append(ha()),
    n.length >= Bu ? Ff(A, n) : kf(A, n),
    fa()
}
function ha() {
    const t = document.createElement("div");
    return t.className = "net-row net-row-header",
    t.append(_e("RefDes", "RefDes", $.key === "refdes" && $.userSelected, $.direction, () => zi("refdes")), _e("", "Side", $.key === "side" && $.userSelected, $.direction, () => zi("side")), _e("Pin", "Pin", $.key === "pin" && $.userSelected, $.direction, () => zi("pin")), _e("Info", "Info", $.key === "info" && $.userSelected, $.direction, () => zi("info"))),
    Nr(t, N, "net", [58, 20, 34, 72]),
    t
}
function kf(t, e) {
    const n = document.createDocumentFragment();
    for (const i of e)
        n.append(ec(i));
    N.append(n),
    gr = t
}
function Ff(t, e) {
    const n = document.createElement("div")
      , i = fn(Ha);
    n.className = "net-virtual-spacer",
    n.style.height = `${e.length * i}px`;
    const r = new Map;
    e.forEach( (o, s) => r.set(nc(o), s)),
    ge = {
        netName: t,
        refs: e,
        spacer: n,
        rowHeight: i,
        orderByRefKey: r
    },
    gr = t,
    N.append(n),
    Bi()
}
function Bi() {
    const t = ge;
    if (!t || Ro.hidden || N.hidden)
        return;
    const e = ic()
      , n = Math.max(0, N.scrollTop - e)
      , i = Math.max(n, N.scrollTop + N.clientHeight - e)
      , r = Math.max(0, Math.floor(n / t.rowHeight) - js)
      , o = Math.min(t.refs.length, Math.ceil(i / t.rowHeight) + js)
      , s = document.createDocumentFragment();
    for (let a = r; a < o; a += 1) {
        const l = t.refs[a];
        if (!l)
            continue;
        const c = ec(l);
        c.style.top = `${a * t.rowHeight}px`,
        s.append(c)
    }
    t.spacer.replaceChildren(s)
}
function ec(t) {
    const e = document.createElement("button");
    return e.className = "net-row",
    e.type = "button",
    e.dataset.refKey = nc(t),
    e.classList.toggle("selected", R?.component.id === t.component.id && R?.padIndex === t.padIndex),
    e.addEventListener("click", () => {
        ss(t.component, t.pad, t.padIndex, {
            switchSide: !0,
            focus: !0
        }),
        j !== "net" && re("net")
    }
    ),
    e.append(Di(Q(t.component)), Di(t.pad.side === "T" ? "T" : "B"), Di(t.pad.name || String(t.padIndex + 1)), Di(xe(t.component))),
    e
}
function Gf() {
    N.querySelectorAll(".net-row.selected").forEach(e => e.classList.remove("selected"));
    const t = tc();
    t && N.querySelector(`.net-row[data-ref-key="${t}"]`)?.classList.add("selected")
}
function fa() {
    const t = tc();
    if (!t || !ge || Ro.hidden)
        return;
    const e = ge.orderByRefKey.get(t);
    if (e === void 0)
        return;
    const n = ic()
      , i = n + e * ge.rowHeight
      , r = i + ge.rowHeight
      , o = N.scrollTop + n
      , s = N.scrollTop + N.clientHeight;
    i < o ? N.scrollTop = Math.max(0, i - n) : r > s && (N.scrollTop = Math.max(0, r - N.clientHeight)),
    Bi()
}
function yi() {
    ge = null,
    gr = ""
}
function tc() {
    return R ? `${R.component.id}:${R.padIndex}` : ""
}
function nc(t) {
    return `${t.component.id}:${t.padIndex}`
}
function ic() {
    return N.querySelector(".net-row-header")?.offsetHeight ?? 0
}
function rc(t) {
    return mr.get(t) ?? []
}
function Vf(t) {
    return !t.suppressVisual && t.net.trim() !== ""
}
function Ef(t) {
    const e = new Map;
    for (const n of t.components)
        n.pads.forEach( (i, r) => {
            if (!Vf(i))
                return;
            const o = e.get(i.net);
            o ? o.push({
                component: n,
                pad: i,
                padIndex: r
            }) : e.set(i.net, [{
                component: n,
                pad: i,
                padIndex: r
            }])
        }
        );
    for (const n of e.values())
        n.sort(sp);
    return e
}
function Di(t) {
    const e = document.createElement("span");
    return e.textContent = t,
    e
}
function jt(t=j === "find") {
    const e = $f(Yt.value)
      , n = e.length > 0 ? di.filter(r => Zf(r, e)) : di
      , i = cp(n);
    if (Oo = new Set(n.map(r => r.component.id)),
    Ae(),
    Vo.textContent = e.length > 0 && i.length > 0 ? `Find parts (${i.length})` : "Find parts",
    !t) {
        pa();
        return
    }
    if (pa(),
    V.replaceChildren(),
    V.scrollTop = 0,
    V.classList.remove("empty-list"),
    V.append(Df()),
    i.length === 0) {
        V.scrollTop = 0;
        return
    }
    i.length >= Au ? Of(i, e) : Rf(i, e)
}
function Rf(t, e) {
    const n = document.createDocumentFragment();
    for (const i of t)
        n.append(oc(i, e));
    V.append(n)
}
function Of(t, e) {
    const n = document.createElement("div")
      , i = fn(Ya);
    n.className = "find-virtual-spacer",
    n.style.height = `${t.length * i}px`,
    ct = {
        rows: t,
        terms: e,
        spacer: n,
        rowHeight: i
    },
    V.append(n),
    as()
}
function as() {
    const t = ct;
    if (!t || ml.hidden || V.hidden)
        return;
    const e = zf()
      , n = Math.max(0, V.scrollTop - e)
      , i = Math.max(n, V.scrollTop + V.clientHeight - e)
      , r = Math.max(0, Math.floor(n / t.rowHeight) - Qs)
      , o = Math.min(t.rows.length, Math.ceil(i / t.rowHeight) + Qs)
      , s = document.createDocumentFragment();
    for (let a = r; a < o; a += 1) {
        const l = t.rows[a];
        if (!l)
            continue;
        const c = oc(l, t.terms);
        c.style.top = `${a * t.rowHeight}px`,
        s.append(c)
    }
    t.spacer.replaceChildren(s)
}
function oc(t, e) {
    const n = document.createElement("button");
    return n.className = "find-row",
    n.type = "button",
    n.dataset.componentId = String(t.component.id),
    n.classList.toggle("selected", E?.id === t.component.id),
    n.addEventListener("click", () => {
        os(t.component, !0, !1)
    }
    ),
    n.append(Qi(t.refdes), Qi(t.side), Qi(t.pins, We === "pins" ? e : []), qf(t.info, We === "info" ? e : [])),
    n
}
function Wf() {
    const t = E?.id;
    V.querySelectorAll(".find-row[data-component-id]").forEach(e => {
        e.classList.toggle("selected", t !== void 0 && e.dataset.componentId === String(t))
    }
    )
}
function Df() {
    const t = document.createElement("div");
    return t.className = "find-row find-row-header",
    t.append(_e("RefDes", "RefDes", K.key === "refdes" && K.userSelected, K.direction, () => Hi("refdes")), _e("", "Side", K.key === "side" && K.userSelected, K.direction, () => Hi("side")), _e("Pins", "Pins", K.key === "pins" && K.userSelected, K.direction, () => Hi("pins")), _e("Info", "Info", K.key === "info" && K.userSelected, K.direction, () => Hi("info"))),
    Nr(t, V, "find", [58, 20, 32, 72]),
    t
}
function pa() {
    ct = null
}
function zf() {
    return V.querySelector(".find-row-header")?.offsetHeight ?? 0
}
function _e(t, e, n, i, r) {
    const o = document.createElement("span");
    o.className = "sortable-header-cell";
    const s = document.createElement("button");
    s.type = "button",
    s.className = "list-sort-button",
    s.classList.toggle("active", n);
    const a = i === "asc" ? "▲" : "▼";
    return s.textContent = n ? t ? `${t} ${a}` : a : t,
    s.title = `Sort by ${e}`,
    s.addEventListener("click", r),
    o.append(s),
    o
}
function Nr(t, e, n, i) {
    const r = Array.from(t.children);
    for (let o = 0; o < r.length - 1; o += 1) {
        const s = document.createElement("span");
        s.className = "column-resize-handle",
        s.setAttribute("aria-hidden", "true"),
        s.addEventListener("click", a => {
            a.preventDefault(),
            a.stopPropagation()
        }
        ),
        s.addEventListener("pointerdown", a => {
            a.preventDefault(),
            a.stopPropagation(),
            Hf(a, t, e, n, i, o)
        }
        ),
        r[o]?.append(s)
    }
    requestAnimationFrame( () => ls(t, e, n))
}
function Hf(t, e, n, i, r, o) {
    const s = Array.from(e.children);
    if (o < 0 || o >= s.length - 1)
        return;
    const a = t.clientX
      , l = sc(s);
    if (l.some(u => u <= 0))
        return;
    document.body.classList.add("resizing-column");
    const c = u => {
        u.preventDefault();
        const h = [...l]
          , f = r[o] ?? 24
          , p = r[o + 1] ?? 24
          , m = l[o] + l[o + 1]
          , y = Math.max(f, m - p)
          , x = Tt(l[o] + u.clientX - a, f, y);
        h[o] = x,
        h[o + 1] = m - x,
        Yf(n, i, h)
    }
      , d = () => {
        document.body.classList.remove("resizing-column"),
        window.removeEventListener("pointermove", c),
        window.removeEventListener("pointerup", d),
        window.removeEventListener("pointercancel", d),
        ls(e, n, i)
    }
    ;
    window.addEventListener("pointermove", c),
    window.addEventListener("pointerup", d),
    window.addEventListener("pointercancel", d)
}
function sc(t) {
    return t.map(e => e.getBoundingClientRect().width)
}
function Yf(t, e, n) {
    const i = n.reduce( (r, o) => r + Math.max(0, o), 0);
    i <= 0 || (n.forEach( (r, o) => {
        t.style.setProperty(`--${e}-col-${o + 1}`, `${Math.max(1, r) / i * 100}%`)
    }
    ),
    ac(t, e, n))
}
function kr() {
    const t = [{
        list: M,
        headerSelector: ".pin-row-header",
        cssPrefix: "pin"
    }, {
        list: N,
        headerSelector: ".net-row-header",
        cssPrefix: "net"
    }, {
        list: V,
        headerSelector: ".find-row-header",
        cssPrefix: "find"
    }, {
        list: wt,
        headerSelector: ".layer-row-header",
        cssPrefix: "layer"
    }];
    for (const e of t) {
        if (e.list.getClientRects().length === 0)
            continue;
        const n = e.list.querySelector(e.headerSelector);
        n && ls(n, e.list, e.cssPrefix)
    }
}
function ls(t, e, n) {
    const i = Array.from(t.children)
      , r = sc(i);
    r.every(o => o > 0) && ac(e, n, r)
}
function ac(t, e, n) {
    const i = n.reduce( (o, s) => o + Math.max(0, s), 0);
    if (i <= 0)
        return;
    let r = 0;
    for (let o = 0; o < n.length - 1; o += 1)
        r += n[o] ?? 0,
        t.style.setProperty(`--${e}-divider-${o + 1}`, `${Math.max(0, r) / i * 100}%`);
    Xf(t)
}
function Xf(t) {
    t.style.removeProperty("--column-divider-height");
    const e = Math.max(t.clientHeight, t.scrollHeight);
    e > 0 && t.style.setProperty("--column-divider-height", `${e}px`)
}
function Tt(t, e, n) {
    return Math.min(n, Math.max(e, t))
}
function ma(t) {
    Qe = cs(Qe, t),
    hn(),
    Ql()
}
function zi(t) {
    $ = cs($, t),
    yi(),
    Ir(!0)
}
function Hi(t) {
    K = cs(K, t),
    jt()
}
function Uf(t) {
    Ze = t;
    const e = W();
    e && (e.findWholeWord = t),
    kn(),
    jt()
}
function lc(t) {
    if (We === t)
        return;
    We = t;
    const e = W();
    e && (e.findFilterMode = t),
    kn(),
    jt()
}
function Kf(t) {
    if (pt === t)
        return;
    pt = t;
    const e = W();
    e && (e.findHighlightMatches = t),
    kn(),
    Ae()
}
function kn() {
    ho.classList.toggle("active", Ze),
    ho.setAttribute("aria-pressed", String(Ze)),
    fo.checked = We === "pins",
    po.checked = We === "info",
    mo.checked = pt
}
function Zf(t, e) {
    if (We === "pins") {
        const n = t.pins.toLocaleLowerCase();
        return e.some(i => n === i.value)
    }
    return e.length === 1 ? ya(t.infoLower, e[0]) : e.some(n => ya(t.infoLower, n))
}
function cs(t, e) {
    return t.userSelected && t.key === e ? t.direction === "asc" ? {
        key: e,
        direction: "desc",
        userSelected: !0
    } : {
        key: e,
        direction: "asc",
        userSelected: !1
    } : {
        key: e,
        direction: "asc",
        userSelected: !0
    }
}
function Qi(t, e=[]) {
    const n = document.createElement("span");
    return ep(n, t, e),
    n
}
function qf(t, e) {
    const n = Qi(t, e);
    return n.classList.add("find-info-cell"),
    n
}
function jf(t) {
    if (!Ao.matches || !t.isPrimary || t.pointerType === "mouse" && t.button !== 0)
        return;
    const n = (t.target instanceof Element ? t.target : null)?.closest(".find-info-cell") ?? null;
    if (!n || n.scrollWidth <= n.clientWidth + 1) {
        wn = null;
        return
    }
    wn = {
        pointerId: t.pointerId,
        cell: n,
        startClientX: t.clientX,
        startClientY: t.clientY,
        startScrollLeft: n.scrollLeft,
        dragging: !1
    }
}
function Qf(t) {
    const e = wn;
    if (!e || e.pointerId !== t.pointerId)
        return;
    const n = t.clientX - e.startClientX
      , i = t.clientY - e.startClientY;
    if (!e.dragging) {
        if (Math.hypot(n, i) < 4)
            return;
        if (Math.abs(i) > Math.abs(n)) {
            wn = null;
            return
        }
        e.dragging = !0,
        e.cell.classList.add("panning"),
        e.cell.setPointerCapture(t.pointerId),
        tt()
    }
    t.preventDefault(),
    e.cell.scrollLeft = e.startScrollLeft - n
}
function cc(t, e) {
    const n = wn;
    !n || n.pointerId !== t.pointerId || (n.cell.hasPointerCapture(t.pointerId) && n.cell.releasePointerCapture(t.pointerId),
    n.cell.classList.remove("panning"),
    wn = null,
    !(!n.dragging || !e) && (t.preventDefault(),
    Xn = n.cell,
    window.setTimeout( () => {
        Xn === n.cell && (Xn = null)
    }
    , 0)))
}
function Jf(t) {
    const e = Xn;
    !e || !(t.target instanceof Node) || !e.contains(t.target) || (Xn = null,
    t.preventDefault(),
    t.stopPropagation())
}
function $f(t) {
    const e = t.toLocaleLowerCase()
      , n = [];
    let i = 0;
    for (; i < e.length; ) {
        for (; i < e.length && /\s/.test(e[i] ?? ""); )
            i += 1;
        if (i >= e.length)
            break;
        let r = ""
          , o = !1;
        if (e[i] === '"')
            for (o = !0,
            i += 1; i < e.length; ) {
                const s = e[i] ?? "";
                if (i += 1,
                s === '"') {
                    if (e[i] === '"') {
                        r += '"',
                        i += 1;
                        continue
                    }
                    break
                }
                r += s
            }
        else
            for (; i < e.length && !/\s/.test(e[i] ?? ""); )
                r += e[i] ?? "",
                i += 1;
        r !== "" && !n.some(s => s.value === r && s.exact === o) && n.push({
            value: r,
            exact: o
        })
    }
    return n
}
function ya(t, e) {
    return Ze || e.exact ? _f(t, e.value) : t.includes(e.value)
}
function _f(t, e) {
    if (e === "")
        return !0;
    let n = t.indexOf(e);
    for (; n !== -1; ) {
        const i = n + e.length;
        if (dc(t, n, i))
            return !0;
        n = t.indexOf(e, n + Math.max(1, e.length))
    }
    return !1
}
function ep(t, e, n) {
    if (n.length === 0 || e === "") {
        t.textContent = e;
        return
    }
    const i = tp(e, n);
    if (i.length === 0) {
        t.textContent = e;
        return
    }
    let r = 0;
    for (const o of i) {
        o.start > r && t.append(document.createTextNode(e.slice(r, o.start)));
        const s = document.createElement("mark");
        s.className = "find-highlight",
        s.textContent = e.slice(o.start, o.end),
        t.append(s),
        r = o.end
    }
    r < e.length && t.append(document.createTextNode(e.slice(r)))
}
function tp(t, e) {
    const n = t.toLocaleLowerCase()
      , i = [];
    for (const o of e) {
        let s = n.indexOf(o.value);
        for (; s !== -1; ) {
            const a = s + o.value.length;
            (!(Ze || o.exact) || dc(n, s, a)) && i.push({
                start: s,
                end: a
            }),
            s = n.indexOf(o.value, s + Math.max(1, o.value.length))
        }
    }
    i.sort( (o, s) => o.start - s.start || s.end - o.end);
    const r = [];
    for (const o of i) {
        const s = r[r.length - 1];
        s && o.start <= s.end ? s.end = Math.max(s.end, o.end) : r.push({
            ...o
        })
    }
    return r
}
function dc(t, e, n) {
    const i = e > 0 && t[e - 1] === "." && Qr(t[e] ?? "")
      , r = n + 1 < t.length && t[n] === "." && Qr(t[n - 1] ?? "") && Qr(t[n + 1] ?? "")
      , o = !i && (e <= 0 || !ga(t[e - 1] ?? ""))
      , s = !r && (n >= t.length || !ga(t[n] ?? ""));
    return o && s
}
function Qr(t) {
    return t >= "0" && t <= "9"
}
function ga(t) {
    return t === "_" || /[0-9A-Za-z]/.test(t) || t.toLocaleLowerCase() !== t.toLocaleUpperCase()
}
function uc(t) {
    const e = ui.get(t.id);
    if (e)
        return e;
    const n = t.pads.map( (i, r) => ({
        pad: i,
        index: r
    })).sort( (i, r) => {
        const o = ce(i.pad, i.index).localeCompare(ce(r.pad, r.index), void 0, {
            numeric: !0
        });
        return o !== 0 ? o : ht(i.pad.net).localeCompare(ht(r.pad.net), void 0, {
            numeric: !0
        }) || i.index - r.index
    }
    );
    return ui.set(t.id, n),
    n
}
function np(t) {
    return [...uc(t)].sort(ip)
}
function ip(t, e) {
    const n = rp();
    let i = 0;
    return n.key === "pin" ? i = te(ce(t.pad, t.index), ce(e.pad, e.index)) : i = bo(ht(t.pad.net), ht(e.pad.net)),
    i !== 0 ? ds(i, n.direction) : te(ce(t.pad, t.index), ce(e.pad, e.index)) || bo(ht(t.pad.net), ht(e.pad.net)) || t.index - e.index
}
function rp() {
    return Qe.userSelected ? Qe : Ua
}
function op(t) {
    const e = rc(t);
    return $.userSelected ? [...e].sort(ap) : e
}
function sp(t, e) {
    return Mn(Q(t.component), Q(e.component)) || te(ln(t), ln(e)) || te(ce(t.pad, t.padIndex), ce(e.pad, e.padIndex)) || te(xe(t.component), xe(e.component)) || t.padIndex - e.padIndex
}
function ap(t, e) {
    const n = lp();
    let i = 0;
    return n.key === "refdes" ? i = Mn(Q(t.component), Q(e.component)) : n.key === "side" ? i = te(ln(t), ln(e)) : n.key === "pin" ? i = te(ce(t.pad, t.padIndex), ce(e.pad, e.padIndex)) : i = te(xe(t.component), xe(e.component)),
    i !== 0 ? ds(i, n.direction) : Mn(Q(t.component), Q(e.component)) || te(ln(t), ln(e)) || te(ce(t.pad, t.padIndex), ce(e.pad, e.padIndex)) || te(xe(t.component), xe(e.component)) || t.padIndex - e.padIndex
}
function lp() {
    return $.userSelected ? $ : Ka
}
function ln(t) {
    return t.pad.side === "T" ? "T" : "B"
}
function cp(t) {
    return !K.userSelected && K.key === "refdes" && K.direction === "asc" ? t : [...t].sort(dp)
}
function dp(t, e) {
    const n = up();
    let i = 0;
    return n.key === "refdes" ? i = Mn(t.refdes, e.refdes) : n.key === "side" ? i = te(t.side, e.side) : n.key === "pins" ? i = Number(t.pins) - Number(e.pins) : i = te(t.info, e.info),
    i !== 0 ? ds(i, n.direction) : Mn(t.refdes, e.refdes) || te(t.side, e.side) || Number(t.pins) - Number(e.pins) || te(t.info, e.info)
}
function up() {
    return K.userSelected ? K : Za
}
function ds(t, e) {
    return e === "asc" ? t : -t
}
function hc(t) {
    return t.logicalPinCount > 0 ? t.logicalPinCount : t.pads.filter(e => !e.suppressVisual).length
}
function fc(t) {
    return Q(t) || "(unnamed part)"
}
function ce(t, e) {
    return t.name || String(e + 1)
}
function ht(t) {
    return t.trim() || "NC"
}
function ba(t) {
    return t === "T" ? "Top" : "Bottom"
}
function Fr(t) {
    g.getActiveSide() !== t && pi(t)
}
function hp(t) {
    if (t.side === "T" || t.side === "B")
        return t.side;
    const e = P?.layers.find(n => n.id === t.layerId);
    return e?.side === "T" || e?.side === "B" ? e.side : null
}
function xe(t) {
    if (us(t.displayInfo, t.name))
        return t.displayInfo.trim();
    const e = [];
    return Jr(e, t.value, t.name),
    $i(t.mfgCode, t.value) || Jr(e, t.mfgCode, t.name),
    !$i(t.footprint, t.value) && !$i(t.footprint, t.mfgCode) && Jr(e, t.footprint, t.name),
    e.join(" ")
}
function fp(t) {
    const e = new Set;
    if (!P || !t)
        return e;
    const n = xe(t).trim().toLocaleLowerCase()
      , i = yp(t);
    for (const r of P.components)
        gp(r, i, n) && e.add(r.id);
    return e
}
function pp(t) {
    const e = new Set;
    if (!P || !t)
        return e;
    for (const n of t.pads) {
        const i = n.net.trim();
        i === "" || n.suppressVisual || xp(i) || wp(i) || e.add(i)
    }
    return e
}
function mp(t) {
    const e = new Set;
    if (!t)
        return e;
    for (const n of t.components)
        n.pads.length >= 2 && xe(n).trim() === "" && e.add(n.id);
    return e
}
function yp(t) {
    const e = pn(t.value, t.name)
      , n = pn(t.mfgCode, t.name)
      , i = pn(t.footprint, t.name);
    return {
        pinCount: t.pads.length,
        valueKey: e,
        mfgKey: n,
        footprintKey: i,
        hasSpecificKey: Ji(e) || Ji(n) || Ji(i)
    }
}
function gp(t, e, n) {
    const i = xe(t).trim().toLocaleLowerCase();
    if (n !== "" && i === n)
        return !0;
    if (!e.hasSpecificKey || e.pinCount <= 0 || t.pads.length !== e.pinCount)
        return !1;
    const r = [pn(t.value, t.name), pn(t.mfgCode, t.name), pn(t.footprint, t.name)];
    return [e.valueKey, e.mfgKey, e.footprintKey].some(s => r.some(a => bp(a, s)))
}
function pn(t, e) {
    if (!us(t, e))
        return "";
    const n = go(t.trim());
    let i = "";
    for (const r of n)
        /[a-z0-9]/i.test(r) && (i += r.toLocaleUpperCase());
    return i
}
function Ji(t) {
    return t.length >= 12 && /[a-z]/i.test(t) && /\d/.test(t)
}
function bp(t, e) {
    return t !== "" && t === e && Ji(e)
}
function xp(t) {
    const e = t.trim().toLocaleUpperCase();
    return e.startsWith("GND") || e.startsWith("DGND") || e.startsWith("GROUND")
}
function wp(t) {
    const e = t.trim();
    return e === "" || e.toLocaleUpperCase() === "NC" ? !0 : !!P?.nets.some(n => n.name === e && n.noConnect)
}
function Jr(t, e, n) {
    us(e, n) && t.push(e.trim())
}
function us(t, e) {
    return t !== "" && !vp(t) && !$i(t, e)
}
function vp(t) {
    const e = t.trim();
    return e.length === 1 && (e === "*" || e === "?")
}
function $i(t, e) {
    const n = go(t)
      , i = go(e);
    return n !== "" && n === i
}
function go(t) {
    const e = t.trim();
    if (e.length > 2) {
        const n = e.charAt(e.length - 2)
          , i = e.charAt(e.length - 1).toLocaleUpperCase();
        if ((n === "_" || n === "-") && (i === "B" || i === "T"))
            return e.slice(0, -2)
    }
    return e
}
function Q(t) {
    return t.name.trim()
}
function Mn(t, e) {
    return te(t, e)
}
function bo(t, e) {
    return t === e ? 0 : t < e ? -1 : 1
}
function Cp(t) {
    const e = new Set;
    if (t.nets.length > 0)
        for (const n of t.nets)
            xa(e, n.name);
    else
        for (const n of t.components)
            for (const i of n.pads)
                xa(e, i.net);
    return Array.from(e).sort(bo)
}
function xa(t, e) {
    const n = e.trim();
    n && t.add(n)
}
function te(t, e) {
    let n = 0
      , i = 0;
    for (; n < t.length && i < e.length; ) {
        const r = t.charCodeAt(n)
          , o = e.charCodeAt(i);
        if (xo(r) && xo(o)) {
            const d = Sp(t, n, e, i);
            if (d.result !== 0)
                return d.result;
            n = d.nextA,
            i = d.nextB;
            continue
        }
        const s = t.charAt(n).toLocaleLowerCase()
          , a = e.charAt(i).toLocaleLowerCase();
        if (s !== a)
            return s < a ? -1 : 1;
        const l = t.charAt(n)
          , c = e.charAt(i);
        if (l !== c)
            return l < c ? -1 : 1;
        n += 1,
        i += 1
    }
    return t.length - n - (e.length - i)
}
function Sp(t, e, n, i) {
    const r = wa(t, e)
      , o = wa(n, i)
      , s = va(t, e, r)
      , a = va(n, i, o)
      , l = r - s
      , c = o - a;
    if (l !== c)
        return {
            result: l < c ? -1 : 1,
            nextA: r,
            nextB: o
        };
    for (let h = 0; h < l; h += 1) {
        const f = t.charCodeAt(s + h)
          , p = n.charCodeAt(a + h);
        if (f !== p)
            return {
                result: f < p ? -1 : 1,
                nextA: r,
                nextB: o
            }
    }
    const d = r - e
      , u = o - i;
    return d !== u ? {
        result: d < u ? -1 : 1,
        nextA: r,
        nextB: o
    } : {
        result: 0,
        nextA: r,
        nextB: o
    }
}
function wa(t, e) {
    let n = e;
    for (; n < t.length && xo(t.charCodeAt(n)); )
        n += 1;
    return n
}
function va(t, e, n) {
    let i = e;
    for (; i < n - 1 && t.charCodeAt(i) === 48; )
        i += 1;
    return i
}
function xo(t) {
    return t >= 48 && t <= 57
}
function hs(t) {
    const e = O.getBoundingClientRect();
    return {
        x: t.clientX - e.left,
        y: t.clientY - e.top
    }
}
function Pp(t, e) {
    const n = O.getBoundingClientRect();
    return t >= n.left && t <= n.right && e >= n.top && e <= n.bottom
}
function pc(t) {
    return {
        clientX: t.clientX,
        clientY: t.clientY,
        timeStamp: t.timeStamp
    }
}
function Bp(t) {
    const e = O.getBoundingClientRect();
    return {
        x: t.clientX - e.left,
        y: t.clientY - e.top
    }
}
function Ap(t) {
    if (!Qt)
        return;
    if (t.preventDefault(),
    It(),
    t.touches.length >= 2) {
        fs(t);
        return
    }
    const e = t.touches.item(0);
    e && (ie = !0,
    we = !1,
    Ve = null,
    Mt = e.clientX,
    Lt = e.clientY,
    Ln = e.clientX,
    Tn = e.clientY,
    Bn = t.timeStamp,
    Ne = 0,
    ke = 0)
}
function Mp(t) {
    if (!Qt)
        return;
    if (t.preventDefault(),
    t.touches.length >= 2) {
        Lp(t);
        return
    }
    const e = t.touches.item(0);
    if (!e || !ie || Xe || !we && Math.hypot(e.clientX - Ln, e.clientY - Tn) <= 3)
        return;
    we || (we = !0,
    Oe = null,
    oe());
    const n = e.clientX - Mt
      , i = e.clientY - Lt;
    gc(n, i, t.timeStamp),
    Mt = e.clientX,
    Lt = e.clientY
}
function fs(t) {
    const e = mc(t);
    e && (It(),
    Oe = null,
    Xe = !0,
    Pn = !0,
    ie = !1,
    we = !0,
    Ve = null,
    ut = e.distance,
    Bt = e.center,
    fi = t.timeStamp,
    oe())
}
function Lp(t) {
    const e = mc(t);
    if (!e)
        return;
    if (!Xe) {
        fs(t);
        return
    }
    const n = e.center.x - Bt.x
      , i = e.center.y - Bt.y;
    if ((n !== 0 || i !== 0) && g.pan(n, i),
    ut > 0 && e.distance > 0) {
        const r = Math.min(4, Math.max(.25, e.distance / ut));
        Math.abs(r - 1) > .002 && g.zoomByFactorAt(e.center.x, e.center.y, r, !1)
    }
    ut = e.distance,
    Bt = e.center,
    fi = t.timeStamp
}
function mc(t) {
    const e = t.touches.item(0)
      , n = t.touches.item(1);
    if (!e || !n)
        return null;
    const i = O.getBoundingClientRect()
      , r = n.clientX - e.clientX
      , o = n.clientY - e.clientY;
    return {
        center: {
            x: (e.clientX + n.clientX) * .5 - i.left,
            y: (e.clientY + n.clientY) * .5 - i.top
        },
        distance: Math.hypot(r, o)
    }
}
function yc(t, e) {
    if (!Qt)
        return;
    if (t.preventDefault(),
    Xe || Pn) {
        if (t.touches.length >= 2) {
            fs(t);
            return
        }
        const r = t.touches.item(0);
        if (r) {
            Ve = null,
            ie = !0,
            we = !0,
            Mt = r.clientX,
            Lt = r.clientY,
            Ln = r.clientX,
            Tn = r.clientY,
            Bn = t.timeStamp,
            Ne = 0,
            ke = 0,
            Xe = !1;
            return
        }
        Xe = !1,
        Pn = !1,
        ie = !1,
        Ve = null;
        return
    }
    if (!ie || t.touches.length > 0)
        return;
    ie = !1,
    Ve = null;
    const i = t.changedTouches.item(0);
    e && !we && i ? Sc("touch", Bp(i)) : (e && xc(),
    Oe = null)
}
function gc(t, e, n) {
    const i = wc(n, Bn)
      , r = bc(t, e, i)
      , o = t * r
      , s = e * r;
    g.pan(o, s),
    Tp(o, s, i),
    Bn = n
}
function bc(t, e, n) {
    const i = Math.hypot(t, e) / Math.max(1, n)
      , r = Math.max(0, i - ch) * dh;
    return Math.min(uh, 1 + r)
}
function Tp(t, e, n) {
    const i = 1 / Math.max(1, n)
      , r = Tt(t * i, -Wi, Wi)
      , o = Tt(e * i, -Wi, Wi);
    Ne += (r - Ne) * ta,
    ke += (o - ke) * ta
}
function xc() {
    if (It(!1),
    Math.hypot(Ne, ke) < na) {
        Ne = 0,
        ke = 0;
        return
    }
    ji = performance.now();
    const t = e => {
        const n = Math.min(34, Math.max(1, e - ji));
        ji = e;
        const i = Math.exp(-(n / 1e3) * hh);
        if (Ne *= i,
        ke *= i,
        Math.hypot(Ne, ke) < na) {
            It();
            return
        }
        g.pan(Ne * n, ke * n),
        Kn = requestAnimationFrame(t)
    }
    ;
    Kn = requestAnimationFrame(t)
}
function It(t=!0) {
    Kn !== 0 && (cancelAnimationFrame(Kn),
    Kn = 0),
    ji = 0,
    t && (Ne = 0,
    ke = 0)
}
function wc(t, e) {
    return !Number.isFinite(t) || !Number.isFinite(e) || e <= 0 ? 16 : Math.min(48, Math.max(1, t - e))
}
function ps() {
    const t = vc();
    t && (It(),
    Oe = null,
    Xe = !0,
    Pn = !0,
    ie = !1,
    we = !0,
    Ve = null,
    ut = t.distance,
    Bt = t.center,
    fi = t.timeStamp,
    oe())
}
function Ip() {
    const t = vc();
    if (!t)
        return;
    if (!Xe) {
        ps();
        return
    }
    const e = wc(t.timeStamp, fi)
      , n = t.center.x - Bt.x
      , i = t.center.y - Bt.y;
    if (n !== 0 || i !== 0) {
        const r = bc(n, i, e);
        g.pan(n * r, i * r)
    }
    if (ut > 0 && t.distance > 0) {
        const r = Math.min(4, Math.max(.25, t.distance / ut));
        Math.abs(r - 1) > .002 && g.zoomByFactorAt(t.center.x, t.center.y, Np(r, t.distance - ut, e), !0)
    }
    ut = t.distance,
    Bt = t.center,
    fi = t.timeStamp
}
function Np(t, e, n) {
    const i = Math.abs(e) / Math.max(1, n)
      , r = Math.max(0, i - fh) * ph
      , o = Math.min(mh, 1 + r);
    return Math.exp(Math.log(t) * o)
}
function vc() {
    if (Fe.size < 2)
        return null;
    const [t,e] = Array.from(Fe.values());
    if (!t || !e)
        return null;
    const n = (t.clientX + e.clientX) * .5
      , i = (t.clientY + e.clientY) * .5
      , r = e.clientX - t.clientX
      , o = e.clientY - t.clientY
      , s = O.getBoundingClientRect();
    return {
        center: {
            x: n - s.left,
            y: i - s.top
        },
        distance: Math.hypot(r, o),
        timeStamp: Math.max(t.timeStamp, e.timeStamp)
    }
}
function Cc(t, e) {
    const n = t.pointerId === Ve
      , i = Xe || Pn || Fe.size >= 2;
    if (Fe.delete(t.pointerId),
    O.hasPointerCapture(t.pointerId) && O.releasePointerCapture(t.pointerId),
    i) {
        if (Fe.size >= 2) {
            ps();
            return
        }
        if (Fe.size === 1) {
            const [r] = Fe.entries();
            r && (Ve = r[0],
            ie = !0,
            we = !0,
            Mt = r[1].clientX,
            Lt = r[1].clientY,
            Ln = r[1].clientX,
            Tn = r[1].clientY,
            Bn = r[1].timeStamp,
            Ne = 0,
            ke = 0),
            Xe = !1;
            return
        }
        Xe = !1,
        Pn = !1,
        ie = !1,
        Ve = null;
        return
    }
    if (!(!ie || !n))
        if (ie = !1,
        Ve = null,
        e && !we) {
            const r = hs(t);
            Sc(t.pointerType, r)
        } else
            e && t.pointerType === "touch" && xc(),
            Oe = null
}
function Sc(t, e) {
    const n = g.pick(e.x, e.y);
    if (H && n?.pad && J !== null) {
        const r = Ca(e, n);
        if (r) {
            Oe = null,
            yo(r);
            return
        }
    }
    if (n?.pad) {
        Oe = null,
        da(n);
        return
    }
    const i = Ca(e, n);
    if (i) {
        Oe = null,
        yo(i);
        return
    }
    kp(t, e, n) || da(n)
}
function Ca(t, e) {
    const n = {
        componentContext: e?.component ?? null,
        requireComponentIntent: !!e
    };
    return J !== null ? g.pickSelectedTrace(t.x, t.y, n) : A.trim() !== "" ? g.pickNetTrace(t.x, t.y, A, n) : null
}
function kp(t, e, n) {
    const i = performance.now()
      , r = Oe
      , o = !!(r && r.pointerType === t && i - r.timeMs <= yh && Math.hypot(e.x - r.x, e.y - r.y) <= gh);
    if (Oe = {
        timeMs: i,
        x: e.x,
        y: e.y,
        pointerType: t
    },
    !o)
        return !1;
    const s = g.pickTrace(e.x, e.y, {
        componentContext: n?.component ?? null,
        requireComponentIntent: !!n
    });
    return s ? (Oe = null,
    yo(s),
    !0) : !1
}
function wo(t) {
    if (!Gr()) {
        oe();
        return
    }
    const e = hs(t);
    Zi = {
        clientX: t.clientX,
        clientY: t.clientY,
        canvasX: e.x,
        canvasY: e.y
    },
    dn === 0 && (dn = requestAnimationFrame( () => {
        dn = 0;
        const n = Zi;
        Zi = null,
        n && Fp(n)
    }
    ))
}
function Fp(t) {
    if (!Gr()) {
        oe();
        return
    }
    const e = g.pick(t.canvasX, t.canvasY)
      , n = Gp(t, e);
    if (n && (H || !e?.pad)) {
        g.setHoveredPad(null, null, e?.backgroundPad?.component.id ?? null, e?.backgroundPad?.padIndex ?? null);
        const r = `trace:${n.graphicIndex}:${n.layerId}:${n.net}`;
        (r !== Et || Ee.hidden) && (Et = r,
        Vp(n)),
        $r(t);
        return
    }
    if (e?.pad) {
        g.setHoveredPad(e.component.id, e.padIndex, e.backgroundPad?.component.id ?? null, e.backgroundPad?.padIndex ?? null);
        const r = `part:${e.component.id}:${e.padIndex}`;
        (r !== Et || Ee.hidden) && (Et = r,
        Sa(e)),
        $r(t);
        return
    }
    if (!e) {
        oe();
        return
    }
    g.setHoveredPad(e.component.id, null, e.backgroundPad?.component.id ?? null, e.backgroundPad?.padIndex ?? null);
    const i = `part:${e.component.id}:${e.padIndex}`;
    (i !== Et || Ee.hidden) && (Et = i,
    Sa(e)),
    $r(t)
}
function Gp(t, e) {
    const n = {
        componentContext: e?.component ?? null,
        requireComponentIntent: !!e
    };
    return H ? J !== null ? g.pickSelectedTrace(t.canvasX, t.canvasY, n) : A.trim() !== "" ? g.pickNetTrace(t.canvasX, t.canvasY, A, n) : null : g.pickTrace(t.canvasX, t.canvasY, n)
}
function oe(t=!1) {
    Zi = null,
    dn !== 0 && (cancelAnimationFrame(dn),
    dn = 0),
    Et = "",
    Ee.hidden = !0,
    t || g.setHoveredPad(null, null)
}
function Gr() {
    return !Ao.matches
}
function Pc() {
    oe(),
    tt()
}
function Sa(t) {
    Ee.replaceChildren();
    for (const e of Ep(t))
        Ee.append(Bc(e));
    Ee.hidden = !1
}
function Vp(t) {
    Ee.replaceChildren();
    for (const e of Rp(t))
        Ee.append(Bc(e));
    Ee.hidden = !1
}
function Ep(t) {
    const e = t.component
      , n = [{
        kind: "title",
        text: fc(e)
    }];
    t.pad ? (n.push({
        kind: "field",
        label: "Pin:",
        value: ce(t.pad, t.padIndex),
        tone: "pin"
    }),
    n.push({
        kind: "field",
        label: "Net:",
        value: ht(t.pad.net),
        tone: "net"
    }),
    n.push({
        kind: "field",
        label: "Side:",
        value: ba(t.pad.side)
    }),
    n.push({
        kind: "field",
        label: "Info:",
        value: xe(e)
    })) : (n.push({
        kind: "field",
        label: "Info:",
        value: xe(e)
    }),
    n.push({
        kind: "field",
        label: "Side:",
        value: ba(e.side)
    }));
    const i = e.note.replace(/[\r\n\t]+/g, " ").trim();
    if (i && n.push({
        kind: "field",
        label: "Note:",
        value: i
    }),
    e.pads.length > 0 && e.pads.length <= 8) {
        n.push({
            kind: "divider"
        });
        for (const r of uc(e))
            n.push({
                kind: "pin-net",
                pin: ce(r.pad, r.index),
                net: ht(r.pad.net),
                selected: t.padIndex === r.index
            })
    }
    return n
}
function Rp(t) {
    return [{
        kind: "field",
        label: "Layer:",
        value: Op(t)
    }, {
        kind: "field",
        label: "Net:",
        value: t.net.trim() || "(no net)",
        tone: "net"
    }]
}
function Op(t) {
    return P?.layers.find(n => n.id === t.layerId)?.name.trim() || "(unnamed layer)"
}
function Bc(t) {
    const e = document.createElement("div");
    if (e.className = `board-tooltip-line ${t.kind}`,
    t.kind === "divider")
        return e;
    if (t.kind === "title")
        return e.textContent = t.text,
        e;
    if (t.kind === "pin-net") {
        e.classList.toggle("selected", t.selected);
        const r = document.createElement("span");
        r.className = "tooltip-pin-marker";
        const o = document.createElement("span");
        o.textContent = t.pin;
        const s = document.createElement("span");
        s.textContent = ": ";
        const a = document.createElement("span");
        return a.className = "tooltip-net-value",
        a.textContent = t.net,
        e.append(r, o, s, a),
        e
    }
    const n = document.createElement("strong");
    n.textContent = `${t.label} `;
    const i = document.createElement("span");
    return i.textContent = t.value,
    t.tone && (i.className = `tooltip-${t.tone}-value`),
    e.append(n, i),
    e
}
function $r(t) {
    const e = O.parentElement;
    if (!e)
        return;
    const n = e.getBoundingClientRect()
      , i = Ee.getBoundingClientRect()
      , r = 14
      , o = 8;
    let s = t.clientX - n.left + r
      , a = t.clientY - n.top + r;
    s + i.width > n.width - o && (s = t.clientX - n.left - i.width - r),
    a + i.height > n.height - o && (a = t.clientY - n.top - i.height - r),
    s = Math.max(o, Math.min(s, Math.max(o, n.width - i.width - o))),
    a = Math.max(o, Math.min(a, Math.max(o, n.height - i.height - o))),
    Ee.style.transform = `translate(${s}px, ${a}px)`
}
function Ac(t) {
    if (!Gr()) {
        tt();
        return
    }
    const n = t.target?.closest(".net-row:not(.net-row-header) span, .find-row:not(.find-row-header) span");
    if (!n || !t.currentTarget.contains(n)) {
        tt();
        return
    }
    const i = n.textContent?.trim() ?? "";
    if (!i) {
        tt();
        return
    }
    Wp(i, t)
}
function Wp(t, e) {
    if (!Gr()) {
        tt();
        return
    }
    an.textContent !== t && (an.textContent = t),
    an.hidden = !1;
    const n = an.getBoundingClientRect()
      , i = 14
      , r = 8;
    let o = e.clientX + i
      , s = e.clientY + i;
    o + n.width > window.innerWidth - r && (o = e.clientX - n.width - i),
    s + n.height > window.innerHeight - r && (s = e.clientY - n.height - i),
    o = Math.max(r, Math.min(o, Math.max(r, window.innerWidth - n.width - r))),
    s = Math.max(r, Math.min(s, Math.max(r, window.innerHeight - n.height - r))),
    an.style.transform = `translate(${o}px, ${s}px)`
}
function tt() {
    an.hidden = !0
}
function Dp(t) {
    const e = Pa(t, !0)
      , n = Pa(t, !1);
    return e === n ? e : `linear-gradient(90deg, ${e} 0 50%, ${n} 50% 100%)`
}
function Pa(t, e) {
    const n = e ? t.padColor !== 0 ? t.padColor : t.lineColor : t.lineColor !== 0 ? t.lineColor : t.padColor;
    return t.hasExplicitColors && n !== 0 ? Yp(n) : Hp(zp(t), e ? .58 : .82)
}
function zp(t) {
    const e = t.role.toLocaleLowerCase();
    if (e === "edge-cuts")
        return 3618615;
    const n = t.name.trim().toLocaleUpperCase();
    if (n === "TOP" || n.endsWith("_TOP") || n.endsWith(" TOP") || t.side === "T" || e.includes("front"))
        return 3779071;
    if (n === "BOTTOM" || n.endsWith("_BOTTOM") || n.endsWith(" BOTTOM") || t.side === "B" || e.includes("back"))
        return 15771978;
    const i = [4706700, 14255871, 16740193, 5294296, 13161562, 8169471, 16748349, 10148007];
    return i[Math.abs(t.id) % i.length] ?? 10135736
}
function Hp(t, e) {
    const n = Math.round((t >> 16 & 255) * e)
      , i = Math.round((t >> 8 & 255) * e)
      , r = Math.round((t & 255) * e);
    return `rgb(${n} ${i} ${r})`
}
function Yp(t) {
    const e = t >> 16 & 255
      , n = t >> 8 & 255
      , i = t & 255;
    return `rgb(${e} ${n} ${i})`
}
function Xp() {
    const t = new Worker(new URL("./parser.worker.js",import.meta.url),{
        type: "module"
    });
    let e = 1;
    const n = new Map;
    return t.onmessage = i => {
        const r = n.get(i.data.id);
        r && (n.delete(i.data.id),
        r(i.data.result))
    }
    ,
    t.onerror = i => {
        console.error("[ViewBV Web] Parser worker error", {
            message: i.message,
            filename: i.filename,
            line: i.lineno,
            column: i.colno,
            error: i.error
        })
    }
    ,
    t.onmessageerror = i => {
        console.error("[ViewBV Web] Parser worker message error", i)
    }
    ,
    {
        parse(i) {
            const r = e++;
            return new Promise(o => {
                n.set(r, o);
                const s = {
                    id: r,
                    ...i
                };
                t.postMessage(s, [i.buffer])
            }
            )
        }
    }
}
function Up() {
    !("serviceWorker"in navigator) || !window.isSecureContext || location.hostname === "127.0.0.1" || location.hostname === "localhost" || window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").then(t => {
            console.info("[ViewBV Web] Service worker registered"),
            t.update(),
            window.setInterval( () => {
                t.update()
            }
            , 1800 * 1e3)
        }
        ).catch(t => {
            console.warn("[ViewBV Web] Service worker registration failed", t)
        }
        )
    }
    )
}
