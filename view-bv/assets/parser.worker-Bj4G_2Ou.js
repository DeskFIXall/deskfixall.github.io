async function wn(M={}) {
    var u = M
      , F = !!globalThis.window
      , B = !!globalThis.WorkerGlobalScope;
    globalThis.process?.versions?.node && globalThis.process?.type != "renderer";
    var N = "./this.program"
      , H = import.meta.url
      , L = "";
    function V(r) {
        return u.locateFile ? u.locateFile(r, L) : L + r
    }
    var er, O;
    if (F || B) {
        try {
            L = new URL(".",H).href
        } catch {}
        B && (O = r => {
            var e = new XMLHttpRequest;
            return e.open("GET", r, !1),
            e.responseType = "arraybuffer",
            e.send(null),
            new Uint8Array(e.response)
        }
        ),
        er = async r => {
            var e = await fetch(r, {
                credentials: "same-origin"
            });
            if (e.ok)
                return e.arrayBuffer();
            throw new Error(e.status + " : " + e.url)
        }
    }
    var cr = console.log.bind(console), X = console.error.bind(console), Vr, Dr = !1;
    class m {
    }
    class wr extends m {
        constructor(e) {
            super(),
            this.excPtr = e
        }
    }
    function Kr() {
        return mr.buffer
    }
    function Fr() {
        if (!A?.buffer?.resizable) {
            var r = Kr();
            A = new Int8Array(r),
            tr = new Int16Array(r),
            u.HEAPU8 = nr = new Uint8Array(r),
            z = new Int32Array(r),
            b = new Uint32Array(r),
            x = new BigInt64Array(r),
            new BigUint64Array(r)
        }
    }
    function Yr() {
        var r = u.preRun;
        r && (typeof r == "function" && (r = [r]),
        Tr.push(...r)),
        Ar(Tr)
    }
    function Zr() {
        !u.noFSInit && !o.initialized && o.init(),
        ar.Ka(),
        o.ignorePermissions = !1
    }
    function Jr() {
        var r = u.postRun;
        r && (typeof r == "function" && (r = [r]),
        Mr.push(...r)),
        Ar(Mr)
    }
    function j(r) {
        u.onAbort?.(r),
        r = `Aborted(${r})`,
        X(r),
        Dr = !0,
        r += ". Build with -sASSERTIONS for more info.";
        var e = new WebAssembly.RuntimeError(r);
        throw e
    }
    var Pr;
    function Qr() {
        return u.locateFile ? V("parsers.wasm") : new URL("./parsers-sw5S37th.wasm",import.meta.url).href
    }
    function re(r) {
        if (O)
            return O(r);
        throw "both async and sync fetching of the wasm failed"
    }
    async function ee(r) {
        try {
            var e = await er(r);
            return new Uint8Array(e)
        } catch {}
        return re(r)
    }
    async function te(r, e) {
        try {
            var t = await ee(r)
              , n = await WebAssembly.instantiate(t, e);
            return n
        } catch (i) {
            X(`failed to asynchronously prepare wasm: ${i}`),
            j(i)
        }
    }
    async function ne(r, e, t) {
        try {
            var n = fetch(e, {
                credentials: "same-origin"
            })
              , i = await WebAssembly.instantiateStreaming(n, t);
            return i
        } catch (a) {
            X(`wasm streaming compile failed: ${a}`),
            X("falling back to ArrayBuffer instantiation")
        }
        return te(e, t)
    }
    function oe() {
        var r = {
            a: it
        };
        return r
    }
    async function ie() {
        function r(s) {
            return ar = s.exports,
            ot(ar),
            Fr(),
            ar
        }
        function e(s) {
            return r(s.instance)
        }
        var t = oe()
          , n = u.instantiateWasm;
        if (n)
            return new Promise(s => {
                n(t, f => s(r(f)))
            }
            );
        Pr ??= Qr();
        var i = await ne(Vr, Pr, t)
          , a = e(i);
        return a
    }
    var tr, z, x, A, b, nr, Ar = r => {
        for (; r.length > 0; )
            r.shift()(u)
    }
    , Mr = [], Tr = [], w = r => Or(r), _ = () => Hr(), Nr = globalThis.TextDecoder && new TextDecoder, ae = (r, e, t, n) => {
        var i = e + t;
        if (n)
            return i;
        for (; r[e] && !(e >= i); )
            ++e;
        return e
    }
    , K = (r, e=0, t, n) => {
        var i = ae(r, e, t, n);
        if (i - e > 16 && r.buffer && Nr)
            return Nr.decode(r.subarray(e, i));
        for (var a = ""; e < i; ) {
            var s = r[e++];
            if (!(s & 128)) {
                a += String.fromCharCode(s);
                continue
            }
            var f = r[e++] & 63;
            if ((s & 224) == 192) {
                a += String.fromCharCode((s & 31) << 6 | f);
                continue
            }
            var c = r[e++] & 63;
            if ((s & 240) == 224 ? s = (s & 15) << 12 | f << 6 | c : s = (s & 7) << 18 | f << 12 | c << 6 | r[e++] & 63,
            s < 65536)
                a += String.fromCharCode(s);
            else {
                var l = s - 65536;
                a += String.fromCharCode(55296 | l >> 10, 56320 | l & 1023)
            }
        }
        return a
    }
    , Y = (r, e, t) => r ? K(nr, r, e, t) : "", se = (r, e, t, n) => j(`Assertion failed: ${Y(r)}, at: ` + [e ? Y(e) : "unknown filename", t, n ? Y(n) : "unknown function"]), lr = [], ur = 0, fe = r => {
        var e = new _r(r);
        return e.get_caught() || (e.set_caught(!0),
        ur--),
        e.set_rethrown(!1),
        lr.push(e),
        Xr(r)
    }
    , W = null, ce = () => {
        h(0, 0);
        var r = lr.pop();
        Wr(r.excPtr),
        W = null
    }
    ;
    class _r {
        constructor(e) {
            this.excPtr = e,
            this.ptr = e - 24
        }
        set_type(e) {
            b[this.ptr + 4 >> 2] = e
        }
        get_type() {
            return b[this.ptr + 4 >> 2]
        }
        set_destructor(e) {
            b[this.ptr + 8 >> 2] = e
        }
        get_destructor() {
            return b[this.ptr + 8 >> 2]
        }
        set_caught(e) {
            e = e ? 1 : 0,
            A[this.ptr + 12] = e
        }
        get_caught() {
            return A[this.ptr + 12] != 0
        }
        set_rethrown(e) {
            e = e ? 1 : 0,
            A[this.ptr + 13] = e
        }
        get_rethrown() {
            return A[this.ptr + 13] != 0
        }
        init(e, t) {
            this.set_adjusted_ptr(0),
            this.set_type(e),
            this.set_destructor(t)
        }
        set_adjusted_ptr(e) {
            b[this.ptr + 16 >> 2] = e
        }
        get_adjusted_ptr() {
            return b[this.ptr + 16 >> 2]
        }
    }
    var vr = r => Ur(r)
      , pr = r => {
        var e = W?.excPtr;
        if (!e)
            return vr(0),
            0;
        var t = new _r(e);
        t.set_adjusted_ptr(e);
        var n = t.get_type();
        if (!n)
            return vr(0),
            e;
        for (var i of r) {
            if (i === 0 || i === n)
                break;
            var a = t.ptr + 16;
            if ($r(i, n, a))
                return vr(i),
                e
        }
        return vr(n),
        e
    }
      , le = () => pr([])
      , ue = r => pr([r])
      , ve = (r, e) => pr([r, e])
      , de = () => {
        lr.length || j("no exception to throw");
        var r = lr.at(-1)
          , e = r.excPtr;
        throw r.set_rethrown(!0),
        r.set_caught(!1),
        ur++,
        br(e),
        W = new wr(e),
        W
    }
      , he = (r, e, t) => {
        var n = new _r(r);
        throw n.init(e, t),
        br(r),
        W = new wr(r),
        ur++,
        W
    }
      , me = () => ur
      , we = r => {
        throw W || (W = new wr(r)),
        W
    }
      , dr = () => {
        var r = z[+P.varargs >> 2];
        return P.varargs += 4,
        r
    }
      , Z = dr
      , D = {
        isAbs: r => r.charAt(0) === "/",
        splitPath: r => {
            var e = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
            return e.exec(r).slice(1)
        }
        ,
        normalizeArray: (r, e) => {
            for (var t = 0, n = r.length - 1; n >= 0; n--) {
                var i = r[n];
                i === "." ? r.splice(n, 1) : i === ".." ? (r.splice(n, 1),
                t++) : t && (r.splice(n, 1),
                t--)
            }
            if (e)
                for (; t; t--)
                    r.unshift("..");
            return r
        }
        ,
        normalize: r => {
            var e = D.isAbs(r)
              , t = r.slice(-1) === "/";
            return r = D.normalizeArray(r.split("/").filter(n => !!n), !e).join("/"),
            !r && !e && (r = "."),
            r && t && (r += "/"),
            (e ? "/" : "") + r
        }
        ,
        dirname: r => {
            var e = D.splitPath(r)
              , t = e[0]
              , n = e[1];
            return !t && !n ? "." : (n && (n = n.slice(0, -1)),
            t + n)
        }
        ,
        basename: r => r && r.match(/([^\/]+|\/)\/*$/)[1],
        join: (...r) => D.normalize(r.join("/")),
        join2: (r, e) => D.normalize(r + "/" + e)
    }
      , _e = () => r => (crypto.getRandomValues(r),
    0)
      , Rr = r => (Rr = _e())(r)
      , J = {
        resolve: (...r) => {
            for (var e = "", t = !1, n = r.length - 1; n >= -1 && !t; n--) {
                var i = n >= 0 ? r[n] : o.cwd();
                if (typeof i != "string")
                    throw new TypeError("Arguments to path.resolve must be strings");
                if (!i)
                    return "";
                e = i + "/" + e,
                t = D.isAbs(i)
            }
            return e = D.normalizeArray(e.split("/").filter(a => !!a), !t).join("/"),
            (t ? "/" : "") + e || "."
        }
        ,
        relative: (r, e) => {
            r = J.resolve(r).slice(1),
            e = J.resolve(e).slice(1);
            function t(l) {
                for (var v = 0; v < l.length && l[v] === ""; v++)
                    ;
                for (var y = l.length - 1; y >= 0 && l[y] === ""; y--)
                    ;
                return v > y ? [] : l.slice(v, y - v + 1)
            }
            for (var n = t(r.split("/")), i = t(e.split("/")), a = Math.min(n.length, i.length), s = a, f = 0; f < a; f++)
                if (n[f] !== i[f]) {
                    s = f;
                    break
                }
            for (var c = [], f = s; f < n.length; f++)
                c.push("..");
            return c = c.concat(i.slice(s)),
            c.join("/")
        }
    }
      , yr = []
      , or = r => {
        for (var e = 0, t = 0; t < r.length; ++t) {
            var n = r.charCodeAt(t);
            n <= 127 ? e++ : n <= 2047 ? e += 2 : n >= 55296 && n <= 57343 ? (e += 4,
            ++t) : e += 3
        }
        return e
    }
      , Cr = (r, e, t, n) => {
        if (!(n > 0))
            return 0;
        for (var i = t, a = t + n - 1, s = 0; s < r.length; ++s) {
            var f = r.codePointAt(s);
            if (f <= 127) {
                if (t >= a)
                    break;
                e[t++] = f
            } else if (f <= 2047) {
                if (t + 1 >= a)
                    break;
                e[t++] = 192 | f >> 6,
                e[t++] = 128 | f & 63
            } else if (f <= 65535) {
                if (t + 2 >= a)
                    break;
                e[t++] = 224 | f >> 12,
                e[t++] = 128 | f >> 6 & 63,
                e[t++] = 128 | f & 63
            } else {
                if (t + 3 >= a)
                    break;
                e[t++] = 240 | f >> 18,
                e[t++] = 128 | f >> 12 & 63,
                e[t++] = 128 | f >> 6 & 63,
                e[t++] = 128 | f & 63,
                s++
            }
        }
        return e[t] = 0,
        t - i
    }
      , gr = (r, e, t) => {
        var n = or(r) + 1
          , i = new Array(n)
          , a = Cr(r, i, 0, i.length);
        return i.length = a,
        i
    }
      , pe = () => {
        if (!yr.length) {
            var r = null;
            if (globalThis.window?.prompt && (r = window.prompt("Input: "),
            r !== null && (r += `
`)),
            !r)
                return null;
            yr = gr(r)
        }
        return yr.shift()
    }
      , q = {
        ttys: [],
        init() {},
        shutdown() {},
        register(r, e) {
            q.ttys[r] = {
                input: [],
                output: [],
                ops: e
            },
            o.registerDevice(r, q.stream_ops)
        },
        stream_ops: {
            open(r) {
                var e = q.ttys[r.node.rdev];
                if (!e)
                    throw new o.ErrnoError(43);
                r.tty = e,
                r.seekable = !1
            },
            close(r) {
                r.tty.ops.fsync(r.tty)
            },
            fsync(r) {
                r.tty.ops.fsync(r.tty)
            },
            read(r, e, t, n, i) {
                if (!r.tty || !r.tty.ops.get_char)
                    throw new o.ErrnoError(60);
                for (var a = 0, s = 0; s < n; s++) {
                    var f;
                    try {
                        f = r.tty.ops.get_char(r.tty)
                    } catch {
                        throw new o.ErrnoError(29)
                    }
                    if (f === void 0 && a === 0)
                        throw new o.ErrnoError(6);
                    if (f == null)
                        break;
                    a++,
                    e[t + s] = f
                }
                return a && (r.node.atime = Date.now()),
                a
            },
            write(r, e, t, n, i) {
                if (!r.tty || !r.tty.ops.put_char)
                    throw new o.ErrnoError(60);
                try {
                    for (var a = 0; a < n; a++)
                        r.tty.ops.put_char(r.tty, e[t + a])
                } catch {
                    throw new o.ErrnoError(29)
                }
                return n && (r.node.mtime = r.node.ctime = Date.now()),
                a
            }
        },
        default_tty_ops: {
            get_char(r) {
                return pe()
            },
            put_char(r, e) {
                e === null || e === 10 ? (cr(K(r.output)),
                r.output = []) : e != 0 && r.output.push(e)
            },
            fsync(r) {
                r.output?.length > 0 && (cr(K(r.output)),
                r.output = [])
            },
            ioctl_tcgets(r) {
                return {
                    c_iflag: 25856,
                    c_oflag: 5,
                    c_cflag: 191,
                    c_lflag: 35387,
                    c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            },
            ioctl_tcsets(r, e, t) {
                return 0
            },
            ioctl_tiocgwinsz(r) {
                return [24, 80]
            }
        },
        default_tty1_ops: {
            put_char(r, e) {
                e === null || e === 10 ? (X(K(r.output)),
                r.output = []) : e != 0 && r.output.push(e)
            },
            fsync(r) {
                r.output?.length > 0 && (X(K(r.output)),
                r.output = [])
            }
        }
    }
      , Br = r => {
        j()
    }
      , k = {
        ops_table: null,
        mount(r) {
            return k.createNode(null, "/", 16895, 0)
        },
        createNode(r, e, t, n) {
            if (o.isBlkdev(t) || o.isFIFO(t))
                throw new o.ErrnoError(63);
            k.ops_table ||= {
                dir: {
                    node: {
                        getattr: k.node_ops.getattr,
                        setattr: k.node_ops.setattr,
                        lookup: k.node_ops.lookup,
                        mknod: k.node_ops.mknod,
                        rename: k.node_ops.rename,
                        unlink: k.node_ops.unlink,
                        rmdir: k.node_ops.rmdir,
                        readdir: k.node_ops.readdir,
                        symlink: k.node_ops.symlink
                    },
                    stream: {
                        llseek: k.stream_ops.llseek
                    }
                },
                file: {
                    node: {
                        getattr: k.node_ops.getattr,
                        setattr: k.node_ops.setattr
                    },
                    stream: {
                        llseek: k.stream_ops.llseek,
                        read: k.stream_ops.read,
                        write: k.stream_ops.write,
                        mmap: k.stream_ops.mmap,
                        msync: k.stream_ops.msync
                    }
                },
                link: {
                    node: {
                        getattr: k.node_ops.getattr,
                        setattr: k.node_ops.setattr,
                        readlink: k.node_ops.readlink
                    },
                    stream: {}
                },
                chrdev: {
                    node: {
                        getattr: k.node_ops.getattr,
                        setattr: k.node_ops.setattr
                    },
                    stream: o.chrdev_stream_ops
                }
            };
            var i = o.createNode(r, e, t, n);
            return o.isDir(i.mode) ? (i.node_ops = k.ops_table.dir.node,
            i.stream_ops = k.ops_table.dir.stream,
            i.contents = {}) : o.isFile(i.mode) ? (i.node_ops = k.ops_table.file.node,
            i.stream_ops = k.ops_table.file.stream,
            i.usedBytes = 0,
            i.contents = k.emptyFileContents ??= new Uint8Array(0)) : o.isLink(i.mode) ? (i.node_ops = k.ops_table.link.node,
            i.stream_ops = k.ops_table.link.stream) : o.isChrdev(i.mode) && (i.node_ops = k.ops_table.chrdev.node,
            i.stream_ops = k.ops_table.chrdev.stream),
            i.atime = i.mtime = i.ctime = Date.now(),
            r && (r.contents[e] = i,
            r.atime = r.mtime = r.ctime = i.atime),
            i
        },
        getFileDataAsTypedArray(r) {
            return r.contents.subarray(0, r.usedBytes)
        },
        expandFileStorage(r, e) {
            var t = r.contents.length;
            if (!(t >= e)) {
                var n = 1024 * 1024;
                e = Math.max(e, t * (t < n ? 2 : 1.125) >>> 0),
                t && (e = Math.max(e, 256));
                var i = k.getFileDataAsTypedArray(r);
                r.contents = new Uint8Array(e),
                r.contents.set(i)
            }
        },
        resizeFileStorage(r, e) {
            if (r.usedBytes != e) {
                var t = r.contents;
                r.contents = new Uint8Array(e),
                r.contents.set(t.subarray(0, Math.min(e, r.usedBytes))),
                r.usedBytes = e
            }
        },
        node_ops: {
            getattr(r) {
                var e = {};
                return e.dev = o.isChrdev(r.mode) ? r.id : 1,
                e.ino = r.id,
                e.mode = r.mode,
                e.nlink = 1,
                e.uid = 0,
                e.gid = 0,
                e.rdev = r.rdev,
                o.isDir(r.mode) ? e.size = 4096 : o.isFile(r.mode) ? e.size = r.usedBytes : o.isLink(r.mode) ? e.size = r.link.length : e.size = 0,
                e.atime = new Date(r.atime),
                e.mtime = new Date(r.mtime),
                e.ctime = new Date(r.ctime),
                e.blksize = 4096,
                e.blocks = Math.ceil(e.size / e.blksize),
                e
            },
            setattr(r, e) {
                for (const t of ["mode", "atime", "mtime", "ctime"])
                    e[t] != null && (r[t] = e[t]);
                e.size !== void 0 && k.resizeFileStorage(r, e.size)
            },
            lookup(r, e) {
                throw k.doesNotExistError || (k.doesNotExistError = new o.ErrnoError(44),
                k.doesNotExistError.stack = "<generic error, no stack>"),
                k.doesNotExistError
            },
            mknod(r, e, t, n) {
                return k.createNode(r, e, t, n)
            },
            rename(r, e, t) {
                var n;
                try {
                    n = o.lookupNode(e, t)
                } catch {}
                if (n) {
                    if (o.isDir(r.mode))
                        for (var i in n.contents)
                            throw new o.ErrnoError(55);
                    o.hashRemoveNode(n)
                }
                delete r.parent.contents[r.name],
                e.contents[t] = r,
                r.name = t,
                e.ctime = e.mtime = r.parent.ctime = r.parent.mtime = Date.now()
            },
            unlink(r, e) {
                delete r.contents[e],
                r.ctime = r.mtime = Date.now()
            },
            rmdir(r, e) {
                var t = o.lookupNode(r, e);
                for (var n in t.contents)
                    throw new o.ErrnoError(55);
                delete r.contents[e],
                r.ctime = r.mtime = Date.now()
            },
            readdir(r) {
                return [".", "..", ...Object.keys(r.contents)]
            },
            symlink(r, e, t) {
                var n = k.createNode(r, e, 41471, 0);
                return n.link = t,
                n
            },
            readlink(r) {
                if (!o.isLink(r.mode))
                    throw new o.ErrnoError(28);
                return r.link
            }
        },
        stream_ops: {
            read(r, e, t, n, i) {
                var a = r.node.contents;
                if (i >= r.node.usedBytes)
                    return 0;
                var s = Math.min(r.node.usedBytes - i, n);
                return e.set(a.subarray(i, i + s), t),
                s
            },
            write(r, e, t, n, i, a) {
                if (e.buffer === A.buffer && (a = !1),
                !n)
                    return 0;
                var s = r.node;
                return s.mtime = s.ctime = Date.now(),
                a ? (s.contents = e.subarray(t, t + n),
                s.usedBytes = n) : s.usedBytes === 0 && i === 0 ? (s.contents = e.slice(t, t + n),
                s.usedBytes = n) : (k.expandFileStorage(s, i + n),
                s.contents.set(e.subarray(t, t + n), i),
                s.usedBytes = Math.max(s.usedBytes, i + n)),
                n
            },
            llseek(r, e, t) {
                var n = e;
                if (t === 1 ? n += r.position : t === 2 && o.isFile(r.node.mode) && (n += r.node.usedBytes),
                n < 0)
                    throw new o.ErrnoError(28);
                return n
            },
            mmap(r, e, t, n, i) {
                if (!o.isFile(r.node.mode))
                    throw new o.ErrnoError(43);
                var a, s, f = r.node.contents;
                if (!(i & 2) && f.buffer === A.buffer)
                    s = !1,
                    a = f.byteOffset;
                else {
                    if (s = !0,
                    a = Br(),
                    !a)
                        throw new o.ErrnoError(48);
                    f && ((t > 0 || t + e < f.length) && (f.subarray ? f = f.subarray(t, t + e) : f = Array.prototype.slice.call(f, t, t + e)),
                    A.set(f, a))
                }
                return {
                    ptr: a,
                    allocated: s
                }
            },
            msync(r, e, t, n, i) {
                return k.stream_ops.write(r, e, 0, n, t, !1),
                0
            }
        }
    }
      , ye = r => {
        if (typeof r != "string")
            return r;
        var e = {
            r: 0,
            "r+": 2,
            w: 577,
            "w+": 578,
            a: 1089,
            "a+": 1090
        }
          , t = e[r];
        if (typeof t > "u")
            throw new Error(`Unknown file open mode: ${r}`);
        return t
    }
      , zr = r => (typeof r == "string" && (r = gr(r)),
    r.subarray || (r = new Uint8Array(r)),
    r)
      , kr = (r, e) => {
        var t = 0;
        return r && (t |= 365),
        e && (t |= 146),
        t
    }
      , ge = async r => {
        var e = await er(r);
        return new Uint8Array(e)
    }
      , ke = (...r) => o.createDataFile(...r)
      , hr = null
      , Ee = async () => hr
      , G = 0
      , be = r => {
        G--,
        u.monitorRunDependencies?.(G),
        G || hr.resolve()
    }
      , Se = r => {
        if (!G) {
            var e;
            hr = new Promise(t => e = t),
            hr.resolve = e
        }
        G++,
        u.monitorRunDependencies?.(G)
    }
      , De = []
      , Fe = async (r, e) => {
        typeof Browser < "u" && Browser.init();
        for (var t of De)
            if (t.canHandle(e))
                return t.handle(r, e);
        return r
    }
      , xr = async (r, e, t, n, i, a, s, f) => {
        var c = e ? J.resolve(D.join2(r, e)) : r;
        Se();
        try {
            var l = t;
            typeof t == "string" && (l = await ge(t)),
            l = await Fe(l, c),
            f?.(),
            a || ke(r, e, l, n, i, s)
        } finally {
            be()
        }
    }
      , Pe = (r, e, t, n, i, a, s, f, c, l) => {
        xr(r, e, t, n, i, f, c, l).then(a).catch(s)
    }
      , o = {
        root: null,
        mounts: [],
        devices: {},
        streams: [],
        nextInode: 1,
        nameTable: null,
        currentPath: "/",
        initialized: !1,
        ignorePermissions: !0,
        filesystems: null,
        syncFSRequests: 0,
        ErrnoError: class {
            name = "ErrnoError";
            constructor(r) {
                this.errno = r
            }
        }
        ,
        FSStream: class {
            shared = {};
            get object() {
                return this.node
            }
            set object(r) {
                this.node = r
            }
            get isRead() {
                return (this.flags & 2097155) !== 1
            }
            get isWrite() {
                return (this.flags & 2097155) !== 0
            }
            get isAppend() {
                return this.flags & 1024
            }
            get flags() {
                return this.shared.flags
            }
            set flags(r) {
                this.shared.flags = r
            }
            get position() {
                return this.shared.position
            }
            set position(r) {
                this.shared.position = r
            }
        }
        ,
        FSNode: class {
            node_ops = {};
            stream_ops = {};
            readMode = 365;
            writeMode = 146;
            mounted = null;
            constructor(r, e, t, n) {
                r || (r = this),
                this.parent = r,
                this.mount = r.mount,
                this.id = o.nextInode++,
                this.name = e,
                this.mode = t,
                this.rdev = n,
                this.atime = this.mtime = this.ctime = Date.now()
            }
            get read() {
                return (this.mode & this.readMode) === this.readMode
            }
            set read(r) {
                r ? this.mode |= this.readMode : this.mode &= ~this.readMode
            }
            get write() {
                return (this.mode & this.writeMode) === this.writeMode
            }
            set write(r) {
                r ? this.mode |= this.writeMode : this.mode &= ~this.writeMode
            }
            get isFolder() {
                return o.isDir(this.mode)
            }
            get isDevice() {
                return o.isChrdev(this.mode)
            }
        }
        ,
        lookupPath(r, e={}) {
            if (!r)
                throw new o.ErrnoError(44);
            e.follow_mount ??= !0,
            D.isAbs(r) || (r = o.cwd() + "/" + r);
            r: for (var t = 0; t < 40; t++) {
                for (var n = r.split("/").filter(l => !!l), i = o.root, a = "/", s = 0; s < n.length; s++) {
                    var f = s === n.length - 1;
                    if (f && e.parent)
                        break;
                    if (n[s] !== ".") {
                        if (n[s] === "..") {
                            if (a = D.dirname(a),
                            o.isRoot(i)) {
                                r = a + "/" + n.slice(s + 1).join("/"),
                                t--;
                                continue r
                            } else
                                i = i.parent;
                            continue
                        }
                        a = D.join2(a, n[s]);
                        try {
                            i = o.lookupNode(i, n[s])
                        } catch (l) {
                            if (l?.errno === 44 && f && e.noent_okay)
                                return {
                                    path: a
                                };
                            throw l
                        }
                        if (o.isMountpoint(i) && (!f || e.follow_mount) && (i = i.mounted.root),
                        o.isLink(i.mode) && (!f || e.follow)) {
                            if (!i.node_ops.readlink)
                                throw new o.ErrnoError(52);
                            var c = i.node_ops.readlink(i);
                            D.isAbs(c) || (c = D.dirname(a) + "/" + c),
                            r = c + "/" + n.slice(s + 1).join("/");
                            continue r
                        }
                    }
                }
                return {
                    path: a,
                    node: i
                }
            }
            throw new o.ErrnoError(32)
        },
        getPath(r) {
            for (var e; ; ) {
                if (o.isRoot(r)) {
                    var t = r.mount.mountpoint;
                    return e ? t[t.length - 1] !== "/" ? `${t}/${e}` : t + e : t
                }
                e = e ? `${r.name}/${e}` : r.name,
                r = r.parent
            }
        },
        hashName(r, e) {
            for (var t = 0, n = 0; n < e.length; n++)
                t = (t << 5) - t + e.charCodeAt(n) | 0;
            return (r + t >>> 0) % o.nameTable.length
        },
        hashAddNode(r) {
            var e = o.hashName(r.parent.id, r.name);
            r.name_next = o.nameTable[e],
            o.nameTable[e] = r
        },
        hashRemoveNode(r) {
            var e = o.hashName(r.parent.id, r.name);
            if (o.nameTable[e] === r)
                o.nameTable[e] = r.name_next;
            else
                for (var t = o.nameTable[e]; t; ) {
                    if (t.name_next === r) {
                        t.name_next = r.name_next;
                        break
                    }
                    t = t.name_next
                }
        },
        lookupNode(r, e) {
            var t = o.mayLookup(r);
            if (t)
                throw new o.ErrnoError(t);
            for (var n = o.hashName(r.id, e), i = o.nameTable[n]; i; i = i.name_next) {
                var a = i.name;
                if (i.parent.id === r.id && a === e)
                    return i
            }
            return o.lookup(r, e)
        },
        createNode(r, e, t, n) {
            var i = new o.FSNode(r,e,t,n);
            return o.hashAddNode(i),
            i
        },
        destroyNode(r) {
            o.hashRemoveNode(r)
        },
        isRoot(r) {
            return r === r.parent
        },
        isMountpoint(r) {
            return !!r.mounted
        },
        isFile(r) {
            return (r & 61440) === 32768
        },
        isDir(r) {
            return (r & 61440) === 16384
        },
        isLink(r) {
            return (r & 61440) === 40960
        },
        isChrdev(r) {
            return (r & 61440) === 8192
        },
        isBlkdev(r) {
            return (r & 61440) === 24576
        },
        isFIFO(r) {
            return (r & 61440) === 4096
        },
        isSocket(r) {
            return (r & 49152) === 49152
        },
        flagsToPermissionString(r) {
            var e = ["r", "w", "rw"][r & 3];
            return r & 512 && (e += "w"),
            e
        },
        nodePermissions(r, e) {
            return o.ignorePermissions ? 0 : e.includes("r") && !(r.mode & 292) || e.includes("w") && !(r.mode & 146) || e.includes("x") && !(r.mode & 73) ? 2 : 0
        },
        mayLookup(r) {
            if (!o.isDir(r.mode))
                return 54;
            var e = o.nodePermissions(r, "x");
            return e || (r.node_ops.lookup ? 0 : 2)
        },
        mayCreate(r, e) {
            if (!o.isDir(r.mode))
                return 54;
            try {
                var t = o.lookupNode(r, e);
                return 20
            } catch {}
            return o.nodePermissions(r, "wx")
        },
        mayDelete(r, e, t) {
            var n;
            try {
                n = o.lookupNode(r, e)
            } catch (a) {
                return a.errno
            }
            var i = o.nodePermissions(r, "wx");
            if (i)
                return i;
            if (t) {
                if (!o.isDir(n.mode))
                    return 54;
                if (o.isRoot(n) || o.getPath(n) === o.cwd())
                    return 10
            } else if (o.isDir(n.mode))
                return 31;
            return 0
        },
        mayOpen(r, e) {
            if (!r)
                return 44;
            if (o.isLink(r.mode))
                return 32;
            var t = o.flagsToPermissionString(e);
            return o.isDir(r.mode) && (t !== "r" || e & 576) ? 31 : o.nodePermissions(r, t)
        },
        checkOpExists(r, e) {
            if (!r)
                throw new o.ErrnoError(e);
            return r
        },
        MAX_OPEN_FDS: 4096,
        nextfd() {
            for (var r = 0; r <= o.MAX_OPEN_FDS; r++)
                if (!o.streams[r])
                    return r;
            throw new o.ErrnoError(33)
        },
        getStreamChecked(r) {
            var e = o.getStream(r);
            if (!e)
                throw new o.ErrnoError(8);
            return e
        },
        getStream: r => o.streams[r],
        createStream(r, e=-1) {
            return r = Object.assign(new o.FSStream, r),
            e == -1 && (e = o.nextfd()),
            r.fd = e,
            o.streams[e] = r,
            r
        },
        closeStream(r) {
            o.streams[r] = null
        },
        dupStream(r, e=-1) {
            var t = o.createStream(r, e);
            return t.stream_ops?.dup?.(t),
            t
        },
        doSetAttr(r, e, t) {
            var n = r?.stream_ops.setattr
              , i = n ? r : e;
            n ??= e.node_ops.setattr,
            o.checkOpExists(n, 63);
            try {
                n(i, t)
            } catch (a) {
                throw a instanceof RangeError ? new o.ErrnoError(22) : a
            }
        },
        chrdev_stream_ops: {
            open(r) {
                var e = o.getDevice(r.node.rdev);
                r.stream_ops = e.stream_ops,
                r.stream_ops.open?.(r)
            },
            llseek() {
                throw new o.ErrnoError(70)
            }
        },
        major: r => r >> 8,
        minor: r => r & 255,
        makedev: (r, e) => r << 8 | e,
        registerDevice(r, e) {
            o.devices[r] = {
                stream_ops: e
            }
        },
        getDevice: r => o.devices[r],
        getMounts(r) {
            for (var e = [], t = [r]; t.length; ) {
                var n = t.pop();
                e.push(n),
                t.push(...n.mounts)
            }
            return e
        },
        syncfs(r, e) {
            typeof r == "function" && (e = r,
            r = !1),
            o.syncFSRequests++,
            o.syncFSRequests > 1 && X(`warning: ${o.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
            var t = o.getMounts(o.root.mount)
              , n = 0;
            function i(f) {
                return o.syncFSRequests--,
                e(f)
            }
            function a(f) {
                if (f)
                    return a.errored ? void 0 : (a.errored = !0,
                    i(f));
                ++n >= t.length && i(null)
            }
            for (var s of t)
                s.type.syncfs ? s.type.syncfs(s, r, a) : a(null)
        },
        mount(r, e, t) {
            var n = t === "/", i = !t, a;
            if (n && o.root)
                throw new o.ErrnoError(10);
            if (!n && !i) {
                var s = o.lookupPath(t, {
                    follow_mount: !1
                });
                if (t = s.path,
                a = s.node,
                o.isMountpoint(a))
                    throw new o.ErrnoError(10);
                if (!o.isDir(a.mode))
                    throw new o.ErrnoError(54)
            }
            var f = {
                type: r,
                opts: e,
                mountpoint: t,
                mounts: []
            }
              , c = r.mount(f);
            return c.mount = f,
            f.root = c,
            n ? o.root = c : a && (a.mounted = f,
            a.mount && a.mount.mounts.push(f)),
            c
        },
        unmount(r) {
            var e = o.lookupPath(r, {
                follow_mount: !1
            });
            if (!o.isMountpoint(e.node))
                throw new o.ErrnoError(28);
            var t = e.node
              , n = t.mounted
              , i = o.getMounts(n);
            for (var [a,s] of Object.entries(o.nameTable))
                for (; s; ) {
                    var f = s.name_next;
                    i.includes(s.mount) && o.destroyNode(s),
                    s = f
                }
            t.mounted = null;
            var c = t.mount.mounts.indexOf(n);
            t.mount.mounts.splice(c, 1)
        },
        lookup(r, e) {
            return r.node_ops.lookup(r, e)
        },
        mknod(r, e, t) {
            var n = o.lookupPath(r, {
                parent: !0
            })
              , i = n.node
              , a = D.basename(r);
            if (!a)
                throw new o.ErrnoError(28);
            if (a === "." || a === "..")
                throw new o.ErrnoError(20);
            var s = o.mayCreate(i, a);
            if (s)
                throw new o.ErrnoError(s);
            if (!i.node_ops.mknod)
                throw new o.ErrnoError(63);
            return i.node_ops.mknod(i, a, e, t)
        },
        statfs(r) {
            return o.statfsNode(o.lookupPath(r, {
                follow: !0
            }).node)
        },
        statfsStream(r) {
            return o.statfsNode(r.node)
        },
        statfsNode(r) {
            var e = {
                bsize: 4096,
                frsize: 4096,
                blocks: 1e6,
                bfree: 5e5,
                bavail: 5e5,
                files: o.nextInode,
                ffree: o.nextInode - 1,
                fsid: 42,
                flags: 2,
                namelen: 255
            };
            return r.node_ops.statfs && Object.assign(e, r.node_ops.statfs(r.mount.opts.root)),
            e
        },
        create(r, e=438) {
            return e &= 4095,
            e |= 32768,
            o.mknod(r, e, 0)
        },
        mkdir(r, e=511) {
            return e &= 1023,
            e |= 16384,
            o.mknod(r, e, 0)
        },
        mkdirTree(r, e) {
            var t = r.split("/")
              , n = "";
            for (var i of t)
                if (i) {
                    (n || D.isAbs(r)) && (n += "/"),
                    n += i;
                    try {
                        o.mkdir(n, e)
                    } catch (a) {
                        if (a.errno != 20)
                            throw a
                    }
                }
        },
        mkdev(r, e, t) {
            return typeof t > "u" && (t = e,
            e = 438),
            e |= 8192,
            o.mknod(r, e, t)
        },
        symlink(r, e) {
            if (!J.resolve(r))
                throw new o.ErrnoError(44);
            var t = o.lookupPath(e, {
                parent: !0
            })
              , n = t.node;
            if (!n)
                throw new o.ErrnoError(44);
            var i = D.basename(e)
              , a = o.mayCreate(n, i);
            if (a)
                throw new o.ErrnoError(a);
            if (!n.node_ops.symlink)
                throw new o.ErrnoError(63);
            return n.node_ops.symlink(n, i, r)
        },
        rename(r, e) {
            var t = D.dirname(r), n = D.dirname(e), i = D.basename(r), a = D.basename(e), s, f, c;
            if (s = o.lookupPath(r, {
                parent: !0
            }),
            f = s.node,
            s = o.lookupPath(e, {
                parent: !0
            }),
            c = s.node,
            !f || !c)
                throw new o.ErrnoError(44);
            if (f.mount !== c.mount)
                throw new o.ErrnoError(75);
            var l = o.lookupNode(f, i)
              , v = J.relative(r, n);
            if (v.charAt(0) !== ".")
                throw new o.ErrnoError(28);
            if (v = J.relative(e, t),
            v.charAt(0) !== ".")
                throw new o.ErrnoError(55);
            var y;
            try {
                y = o.lookupNode(c, a)
            } catch {}
            if (l !== y) {
                var d = o.isDir(l.mode)
                  , g = o.mayDelete(f, i, d);
                if (g)
                    throw new o.ErrnoError(g);
                if (g = y ? o.mayDelete(c, a, d) : o.mayCreate(c, a),
                g)
                    throw new o.ErrnoError(g);
                if (!f.node_ops.rename)
                    throw new o.ErrnoError(63);
                if (o.isMountpoint(l) || y && o.isMountpoint(y))
                    throw new o.ErrnoError(10);
                if (c !== f && (g = o.nodePermissions(f, "w"),
                g))
                    throw new o.ErrnoError(g);
                o.hashRemoveNode(l);
                try {
                    f.node_ops.rename(l, c, a),
                    l.parent = c
                } catch (E) {
                    throw E
                } finally {
                    o.hashAddNode(l)
                }
            }
        },
        rmdir(r) {
            var e = o.lookupPath(r, {
                parent: !0
            })
              , t = e.node
              , n = D.basename(r)
              , i = o.lookupNode(t, n)
              , a = o.mayDelete(t, n, !0);
            if (a)
                throw new o.ErrnoError(a);
            if (!t.node_ops.rmdir)
                throw new o.ErrnoError(63);
            if (o.isMountpoint(i))
                throw new o.ErrnoError(10);
            t.node_ops.rmdir(t, n),
            o.destroyNode(i)
        },
        readdir(r) {
            var e = o.lookupPath(r, {
                follow: !0
            })
              , t = e.node
              , n = o.checkOpExists(t.node_ops.readdir, 54);
            return n(t)
        },
        unlink(r) {
            var e = o.lookupPath(r, {
                parent: !0
            })
              , t = e.node;
            if (!t)
                throw new o.ErrnoError(44);
            var n = D.basename(r)
              , i = o.lookupNode(t, n)
              , a = o.mayDelete(t, n, !1);
            if (a)
                throw new o.ErrnoError(a);
            if (!t.node_ops.unlink)
                throw new o.ErrnoError(63);
            if (o.isMountpoint(i))
                throw new o.ErrnoError(10);
            t.node_ops.unlink(t, n),
            o.destroyNode(i)
        },
        readlink(r) {
            var e = o.lookupPath(r)
              , t = e.node;
            if (!t)
                throw new o.ErrnoError(44);
            if (!t.node_ops.readlink)
                throw new o.ErrnoError(28);
            return t.node_ops.readlink(t)
        },
        stat(r, e) {
            var t = o.lookupPath(r, {
                follow: !e
            })
              , n = t.node
              , i = o.checkOpExists(n.node_ops.getattr, 63);
            return i(n)
        },
        fstat(r) {
            var e = o.getStreamChecked(r)
              , t = e.node
              , n = e.stream_ops.getattr
              , i = n ? e : t;
            return n ??= t.node_ops.getattr,
            o.checkOpExists(n, 63),
            n(i)
        },
        lstat(r) {
            return o.stat(r, !0)
        },
        doChmod(r, e, t, n) {
            o.doSetAttr(r, e, {
                mode: t & 4095 | e.mode & -4096,
                ctime: Date.now(),
                dontFollow: n
            })
        },
        chmod(r, e, t) {
            var n;
            if (typeof r == "string") {
                var i = o.lookupPath(r, {
                    follow: !t
                });
                n = i.node
            } else
                n = r;
            o.doChmod(null, n, e, t)
        },
        lchmod(r, e) {
            o.chmod(r, e, !0)
        },
        fchmod(r, e) {
            var t = o.getStreamChecked(r);
            o.doChmod(t, t.node, e, !1)
        },
        doChown(r, e, t) {
            o.doSetAttr(r, e, {
                timestamp: Date.now(),
                dontFollow: t
            })
        },
        chown(r, e, t, n) {
            var i;
            if (typeof r == "string") {
                var a = o.lookupPath(r, {
                    follow: !n
                });
                i = a.node
            } else
                i = r;
            o.doChown(null, i, n)
        },
        lchown(r, e, t) {
            o.chown(r, e, t, !0)
        },
        fchown(r, e, t) {
            var n = o.getStreamChecked(r);
            o.doChown(n, n.node, !1)
        },
        doTruncate(r, e, t) {
            if (o.isDir(e.mode))
                throw new o.ErrnoError(31);
            if (!o.isFile(e.mode))
                throw new o.ErrnoError(28);
            var n = o.nodePermissions(e, "w");
            if (n)
                throw new o.ErrnoError(n);
            o.doSetAttr(r, e, {
                size: t,
                timestamp: Date.now()
            })
        },
        truncate(r, e) {
            if (e < 0)
                throw new o.ErrnoError(28);
            var t;
            if (typeof r == "string") {
                var n = o.lookupPath(r, {
                    follow: !0
                });
                t = n.node
            } else
                t = r;
            o.doTruncate(null, t, e)
        },
        ftruncate(r, e) {
            var t = o.getStreamChecked(r);
            if (e < 0 || (t.flags & 2097155) === 0)
                throw new o.ErrnoError(28);
            o.doTruncate(t, t.node, e)
        },
        utime(r, e, t) {
            var n = o.lookupPath(r, {
                follow: !0
            })
              , i = n.node
              , a = o.checkOpExists(i.node_ops.setattr, 63);
            a(i, {
                atime: e,
                mtime: t
            })
        },
        open(r, e, t=438) {
            if (r === "")
                throw new o.ErrnoError(44);
            e = ye(e),
            e & 64 ? t = t & 4095 | 32768 : t = 0;
            var n, i;
            if (typeof r == "object")
                n = r;
            else {
                i = r.endsWith("/");
                var a = o.lookupPath(r, {
                    follow: !(e & 131072),
                    noent_okay: !0
                });
                n = a.node,
                r = a.path
            }
            var s = !1;
            if (e & 64)
                if (n) {
                    if (e & 128)
                        throw new o.ErrnoError(20)
                } else {
                    if (i)
                        throw new o.ErrnoError(31);
                    n = o.mknod(r, t | 511, 0),
                    s = !0
                }
            if (!n)
                throw new o.ErrnoError(44);
            if (o.isChrdev(n.mode) && (e &= -513),
            e & 65536 && !o.isDir(n.mode))
                throw new o.ErrnoError(54);
            if (!s) {
                var f = o.mayOpen(n, e);
                if (f)
                    throw new o.ErrnoError(f)
            }
            e & 512 && !s && o.truncate(n, 0),
            e &= -131713;
            var c = o.createStream({
                node: n,
                path: o.getPath(n),
                flags: e,
                seekable: !0,
                position: 0,
                stream_ops: n.stream_ops,
                ungotten: [],
                error: !1
            });
            return c.stream_ops.open && c.stream_ops.open(c),
            s && o.chmod(n, t & 511),
            c
        },
        close(r) {
            if (o.isClosed(r))
                throw new o.ErrnoError(8);
            r.getdents && (r.getdents = null);
            try {
                r.stream_ops.close && r.stream_ops.close(r)
            } catch (e) {
                throw e
            } finally {
                o.closeStream(r.fd)
            }
            r.fd = null
        },
        isClosed(r) {
            return r.fd === null
        },
        llseek(r, e, t) {
            if (o.isClosed(r))
                throw new o.ErrnoError(8);
            if (!r.seekable || !r.stream_ops.llseek)
                throw new o.ErrnoError(70);
            if (t != 0 && t != 1 && t != 2)
                throw new o.ErrnoError(28);
            return r.position = r.stream_ops.llseek(r, e, t),
            r.ungotten = [],
            r.position
        },
        read(r, e, t, n, i) {
            if (n < 0 || i < 0)
                throw new o.ErrnoError(28);
            if (o.isClosed(r))
                throw new o.ErrnoError(8);
            if ((r.flags & 2097155) === 1)
                throw new o.ErrnoError(8);
            if (o.isDir(r.node.mode))
                throw new o.ErrnoError(31);
            if (!r.stream_ops.read)
                throw new o.ErrnoError(28);
            var a = typeof i < "u";
            if (!a)
                i = r.position;
            else if (!r.seekable)
                throw new o.ErrnoError(70);
            var s = r.stream_ops.read(r, e, t, n, i);
            return a || (r.position += s),
            s
        },
        write(r, e, t, n, i, a) {
            if (n < 0 || i < 0)
                throw new o.ErrnoError(28);
            if (o.isClosed(r))
                throw new o.ErrnoError(8);
            if ((r.flags & 2097155) === 0)
                throw new o.ErrnoError(8);
            if (o.isDir(r.node.mode))
                throw new o.ErrnoError(31);
            if (!r.stream_ops.write)
                throw new o.ErrnoError(28);
            r.seekable && r.flags & 1024 && o.llseek(r, 0, 2);
            var s = typeof i < "u";
            if (!s)
                i = r.position;
            else if (!r.seekable)
                throw new o.ErrnoError(70);
            var f = r.stream_ops.write(r, e, t, n, i, a);
            return s || (r.position += f),
            f
        },
        mmap(r, e, t, n, i) {
            if ((n & 2) !== 0 && (i & 2) === 0 && (r.flags & 2097155) !== 2)
                throw new o.ErrnoError(2);
            if ((r.flags & 2097155) === 1)
                throw new o.ErrnoError(2);
            if (!r.stream_ops.mmap)
                throw new o.ErrnoError(43);
            if (!e)
                throw new o.ErrnoError(28);
            return r.stream_ops.mmap(r, e, t, n, i)
        },
        msync(r, e, t, n, i) {
            return r.stream_ops.msync ? r.stream_ops.msync(r, e, t, n, i) : 0
        },
        ioctl(r, e, t) {
            if (!r.stream_ops.ioctl)
                throw new o.ErrnoError(59);
            return r.stream_ops.ioctl(r, e, t)
        },
        readFile(r, e={}) {
            e.flags = e.flags ?? 0,
            e.encoding = e.encoding ?? "binary",
            e.encoding !== "utf8" && e.encoding !== "binary" && j(`Invalid encoding type "${e.encoding}"`);
            var t = o.open(r, e.flags)
              , n = o.stat(r)
              , i = n.size
              , a = new Uint8Array(i);
            return o.read(t, a, 0, i, 0),
            e.encoding === "utf8" && (a = K(a)),
            o.close(t),
            a
        },
        writeFile(r, e, t={}) {
            t.flags = t.flags ?? 577;
            var n = o.open(r, t.flags, t.mode);
            e = zr(e),
            o.write(n, e, 0, e.byteLength, void 0, t.canOwn),
            o.close(n)
        },
        cwd: () => o.currentPath,
        chdir(r) {
            var e = o.lookupPath(r, {
                follow: !0
            });
            if (e.node === null)
                throw new o.ErrnoError(44);
            if (!o.isDir(e.node.mode))
                throw new o.ErrnoError(54);
            var t = o.nodePermissions(e.node, "x");
            if (t)
                throw new o.ErrnoError(t);
            o.currentPath = e.path
        },
        createDefaultDirectories() {
            o.mkdir("/tmp"),
            o.mkdir("/home"),
            o.mkdir("/home/web_user")
        },
        createDefaultDevices() {
            o.mkdir("/dev"),
            o.registerDevice(o.makedev(1, 3), {
                read: () => 0,
                write: (n, i, a, s, f) => s,
                llseek: () => 0
            }),
            o.mkdev("/dev/null", o.makedev(1, 3)),
            q.register(o.makedev(5, 0), q.default_tty_ops),
            q.register(o.makedev(6, 0), q.default_tty1_ops),
            o.mkdev("/dev/tty", o.makedev(5, 0)),
            o.mkdev("/dev/tty1", o.makedev(6, 0));
            var r = new Uint8Array(1024)
              , e = 0
              , t = () => (e === 0 && (Rr(r),
            e = r.byteLength),
            r[--e]);
            o.createDevice("/dev", "random", t),
            o.createDevice("/dev", "urandom", t),
            o.mkdir("/dev/shm"),
            o.mkdir("/dev/shm/tmp")
        },
        createSpecialDirectories() {
            o.mkdir("/proc");
            var r = o.mkdir("/proc/self");
            o.mkdir("/proc/self/fd"),
            o.mount({
                mount() {
                    var e = o.createNode(r, "fd", 16895, 73);
                    return e.stream_ops = {
                        llseek: k.stream_ops.llseek
                    },
                    e.node_ops = {
                        lookup(t, n) {
                            var i = +n
                              , a = o.getStreamChecked(i)
                              , s = {
                                parent: null,
                                mount: {
                                    mountpoint: "fake"
                                },
                                node_ops: {
                                    readlink: () => a.path
                                },
                                id: i + 1
                            };
                            return s.parent = s,
                            s
                        },
                        readdir() {
                            return Array.from(o.streams.entries()).filter( ([t,n]) => n).map( ([t,n]) => t.toString())
                        }
                    },
                    e
                }
            }, {}, "/proc/self/fd")
        },
        createStandardStreams(r, e, t) {
            r ? o.createDevice("/dev", "stdin", r) : o.symlink("/dev/tty", "/dev/stdin"),
            e ? o.createDevice("/dev", "stdout", null, e) : o.symlink("/dev/tty", "/dev/stdout"),
            t ? o.createDevice("/dev", "stderr", null, t) : o.symlink("/dev/tty1", "/dev/stderr"),
            o.open("/dev/stdin", 0),
            o.open("/dev/stdout", 1),
            o.open("/dev/stderr", 1)
        },
        staticInit() {
            o.nameTable = new Array(4096),
            o.mount(k, {}, "/"),
            o.createDefaultDirectories(),
            o.createDefaultDevices(),
            o.createSpecialDirectories(),
            o.filesystems = {
                MEMFS: k
            }
        },
        init(r, e, t) {
            o.initialized = !0,
            r ??= u.stdin,
            e ??= u.stdout,
            t ??= u.stderr,
            o.createStandardStreams(r, e, t)
        },
        quit() {
            o.initialized = !1;
            for (var r of o.streams)
                r && o.close(r)
        },
        findObject(r, e) {
            var t = o.analyzePath(r, e);
            return t.exists ? t.object : null
        },
        analyzePath(r, e) {
            try {
                var t = o.lookupPath(r, {
                    follow: !e
                });
                r = t.path
            } catch {}
            var n = {
                isRoot: !1,
                exists: !1,
                error: 0,
                name: null,
                path: null,
                object: null,
                parentExists: !1,
                parentPath: null,
                parentObject: null
            };
            try {
                var t = o.lookupPath(r, {
                    parent: !0
                });
                n.parentExists = !0,
                n.parentPath = t.path,
                n.parentObject = t.node,
                n.name = D.basename(r),
                t = o.lookupPath(r, {
                    follow: !e
                }),
                n.exists = !0,
                n.path = t.path,
                n.object = t.node,
                n.name = t.node.name,
                n.isRoot = t.path === "/"
            } catch (i) {
                n.error = i.errno
            }
            return n
        },
        createPath(r, e, t, n) {
            r = typeof r == "string" ? r : o.getPath(r);
            for (var i = e.split("/").reverse(); i.length; ) {
                var a = i.pop();
                if (a) {
                    var s = D.join2(r, a);
                    try {
                        o.mkdir(s)
                    } catch (f) {
                        if (f.errno != 20)
                            throw f
                    }
                    r = s
                }
            }
            return s
        },
        createFile(r, e, t, n, i) {
            var a = D.join2(typeof r == "string" ? r : o.getPath(r), e)
              , s = kr(n, i);
            return o.create(a, s)
        },
        createDataFile(r, e, t, n, i, a) {
            var s = e;
            r && (r = typeof r == "string" ? r : o.getPath(r),
            s = e ? D.join2(r, e) : r);
            var f = kr(n, i)
              , c = o.create(s, f);
            if (t) {
                t = zr(t),
                o.chmod(c, f | 146);
                var l = o.open(c, 577);
                o.write(l, t, 0, t.length, 0, a),
                o.close(l),
                o.chmod(c, f)
            }
        },
        createDevice(r, e, t, n) {
            var i = D.join2(typeof r == "string" ? r : o.getPath(r), e)
              , a = kr(!!t, !!n);
            o.createDevice.major ??= 64;
            var s = o.makedev(o.createDevice.major++, 0);
            return o.registerDevice(s, {
                open(f) {
                    f.seekable = !1
                },
                close(f) {
                    n?.buffer?.length && n(10)
                },
                read(f, c, l, v, y) {
                    for (var d = 0, g = 0; g < v; g++) {
                        var E;
                        try {
                            E = t()
                        } catch {
                            throw new o.ErrnoError(29)
                        }
                        if (E === void 0 && d === 0)
                            throw new o.ErrnoError(6);
                        if (E == null)
                            break;
                        d++,
                        c[l + g] = E
                    }
                    return d && (f.node.atime = Date.now()),
                    d
                },
                write(f, c, l, v, y) {
                    for (var d = 0; d < v; d++)
                        try {
                            n(c[l + d])
                        } catch {
                            throw new o.ErrnoError(29)
                        }
                    return v && (f.node.mtime = f.node.ctime = Date.now()),
                    d
                }
            }),
            o.mkdev(i, a, s)
        },
        forceLoadFile(r) {
            if (r.isDevice || r.isFolder || r.link || r.contents)
                return !0;
            if (globalThis.XMLHttpRequest)
                j("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
            else
                try {
                    r.contents = O(r.url)
                } catch {
                    throw new o.ErrnoError(29)
                }
        },
        createLazyFile(r, e, t, n, i) {
            class a {
                lengthKnown = !1;
                chunks = [];
                get(d) {
                    if (!(d > this.length - 1 || d < 0)) {
                        var g = d % this.chunkSize
                          , E = d / this.chunkSize | 0;
                        return this.getter(E)[g]
                    }
                }
                setDataGetter(d) {
                    this.getter = d
                }
                cacheLength() {
                    var d = new XMLHttpRequest;
                    d.open("HEAD", t, !1),
                    d.send(null),
                    d.status >= 200 && d.status < 300 || d.status === 304 || j("Couldn't load " + t + ". Status: " + d.status);
                    var g = Number(d.getResponseHeader("Content-length")), E, S = (E = d.getResponseHeader("Accept-Ranges")) && E === "bytes", C = (E = d.getResponseHeader("Content-Encoding")) && E === "gzip", R = 1024 * 1024;
                    S || (R = g);
                    var U = (I, rr) => {
                        I > rr && j(`invalid range (${I}, ${rr}) or no bytes requested!`),
                        rr > g - 1 && j(`only ${g} bytes available! programmer error!`);
                        var T = new XMLHttpRequest;
                        return T.open("GET", t, !1),
                        g !== R && T.setRequestHeader("Range", "bytes=" + I + "-" + rr),
                        T.responseType = "arraybuffer",
                        T.overrideMimeType && T.overrideMimeType("text/plain; charset=x-user-defined"),
                        T.send(null),
                        T.status >= 200 && T.status < 300 || T.status === 304 || j("Couldn't load " + t + ". Status: " + T.status),
                        T.response !== void 0 ? new Uint8Array(T.response || []) : gr(T.responseText ?? "")
                    }
                      , sr = this;
                    sr.setDataGetter(I => {
                        var rr = I * R
                          , T = (I + 1) * R - 1;
                        return T = Math.min(T, g - 1),
                        typeof sr.chunks[I] > "u" && (sr.chunks[I] = U(rr, T)),
                        typeof sr.chunks[I] > "u" && j("doXHR failed!"),
                        sr.chunks[I]
                    }
                    ),
                    (C || !g) && (R = g = 1,
                    g = this.getter(0).length,
                    R = g,
                    cr("LazyFiles on gzip forces download of the whole file when length is accessed")),
                    this._length = g,
                    this._chunkSize = R,
                    this.lengthKnown = !0
                }
                get length() {
                    return this.lengthKnown || this.cacheLength(),
                    this._length
                }
                get chunkSize() {
                    return this.lengthKnown || this.cacheLength(),
                    this._chunkSize
                }
            }
            if (globalThis.XMLHttpRequest) {
                B || j("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
                var s = new a
                  , f = {
                    isDevice: !1,
                    contents: s
                }
            } else
                var f = {
                    isDevice: !1,
                    url: t
                };
            var c = o.createFile(r, e, f, n, i);
            f.contents ? c.contents = f.contents : f.url && (c.contents = null,
            c.url = f.url),
            Object.defineProperties(c, {
                usedBytes: {
                    get: function() {
                        return this.contents.length
                    }
                }
            });
            var l = {};
            for (const [y,d] of Object.entries(c.stream_ops))
                l[y] = (...g) => (o.forceLoadFile(c),
                d(...g));
            function v(y, d, g, E, S) {
                var C = y.node.contents;
                if (S >= C.length)
                    return 0;
                var R = Math.min(C.length - S, E);
                if (C.slice)
                    for (var U = 0; U < R; U++)
                        d[g + U] = C[S + U];
                else
                    for (var U = 0; U < R; U++)
                        d[g + U] = C.get(S + U);
                return R
            }
            return l.read = (y, d, g, E, S) => (o.forceLoadFile(c),
            v(y, d, g, E, S)),
            l.mmap = (y, d, g, E, S) => {
                o.forceLoadFile(c);
                var C = Br();
                if (!C)
                    throw new o.ErrnoError(48);
                return v(y, A, C, d, g),
                {
                    ptr: C,
                    allocated: !0
                }
            }
            ,
            c.stream_ops = l,
            c
        }
    }
      , P = {
        currentUmask: 18,
        calculateAt(r, e, t) {
            if (D.isAbs(e))
                return e;
            var n;
            if (r === -100)
                n = o.cwd();
            else {
                var i = P.getStreamFromFD(r);
                n = i.path
            }
            if (e.length == 0) {
                if (!t)
                    throw new o.ErrnoError(44);
                return n
            }
            return n + "/" + e
        },
        writeStat(r, e) {
            b[r >> 2] = e.dev,
            b[r + 4 >> 2] = e.mode,
            b[r + 8 >> 2] = e.nlink,
            b[r + 12 >> 2] = e.uid,
            b[r + 16 >> 2] = e.gid,
            b[r + 20 >> 2] = e.rdev,
            x[r + 24 >> 3] = BigInt(e.size),
            z[r + 32 >> 2] = 4096,
            z[r + 36 >> 2] = e.blocks;
            var t = e.atime.getTime()
              , n = e.mtime.getTime()
              , i = e.ctime.getTime();
            return x[r + 40 >> 3] = BigInt(Math.floor(t / 1e3)),
            b[r + 48 >> 2] = t % 1e3 * 1e3 * 1e3,
            x[r + 56 >> 3] = BigInt(Math.floor(n / 1e3)),
            b[r + 64 >> 2] = n % 1e3 * 1e3 * 1e3,
            x[r + 72 >> 3] = BigInt(Math.floor(i / 1e3)),
            b[r + 80 >> 2] = i % 1e3 * 1e3 * 1e3,
            x[r + 88 >> 3] = BigInt(e.ino),
            0
        },
        writeStatFs(r, e) {
            b[r + 4 >> 2] = e.bsize,
            b[r + 60 >> 2] = e.bsize,
            x[r + 8 >> 3] = BigInt(e.blocks),
            x[r + 16 >> 3] = BigInt(e.bfree),
            x[r + 24 >> 3] = BigInt(e.bavail),
            x[r + 32 >> 3] = BigInt(e.files),
            x[r + 40 >> 3] = BigInt(e.ffree),
            b[r + 48 >> 2] = e.fsid,
            b[r + 64 >> 2] = e.flags,
            b[r + 56 >> 2] = e.namelen
        },
        doMsync(r, e, t, n, i) {
            if (!o.isFile(e.node.mode))
                throw new o.ErrnoError(43);
            if (n & 2)
                return 0;
            var a = nr.subarray(r, r + t);
            o.msync(e, a, i, t, n)
        },
        getStreamFromFD(r) {
            var e = o.getStreamChecked(r);
            return e
        },
        varargs: void 0,
        getStr(r) {
            var e = Y(r);
            return e
        }
    };
    function Ae(r, e, t) {
        P.varargs = t;
        try {
            var n = P.getStreamFromFD(r);
            switch (e) {
            case 0:
                {
                    var i = dr();
                    if (i < 0)
                        return -28;
                    for (; o.streams[i]; )
                        i++;
                    var a;
                    return a = o.dupStream(n, i),
                    a.fd
                }
            case 1:
            case 2:
                return 0;
            case 3:
                return n.flags;
            case 4:
                {
                    var i = dr()
                      , s = 289792;
                    return n.flags = n.flags & ~s | i & s,
                    0
                }
            case 12:
                {
                    var i = Z()
                      , f = 0;
                    return tr[i + f >> 1] = 2,
                    0
                }
            case 13:
            case 14:
                return 0
            }
            return -28
        } catch (c) {
            if (typeof o > "u" || c.name !== "ErrnoError")
                throw c;
            return -c.errno
        }
    }
    var $ = (r, e, t) => Cr(r, nr, e, t);
    function Me(r, e) {
        try {
            if (e === 0)
                return -28;
            var t = o.cwd()
              , n = or(t) + 1;
            return e < n ? -68 : ($(t, r, e),
            n)
        } catch (i) {
            if (typeof o > "u" || i.name !== "ErrnoError")
                throw i;
            return -i.errno
        }
    }
    function Te(r, e, t) {
        try {
            var n = P.getStreamFromFD(r);
            n.getdents ||= o.readdir(n.path);
            for (var i = 280, a = 0, s = o.llseek(n, 0, 1), f = Math.floor(s / i), c = Math.min(n.getdents.length, f + Math.floor(t / i)), l = f; l < c; l++) {
                var v, y, d = n.getdents[l];
                if (d === ".")
                    v = n.node.id,
                    y = 4;
                else if (d === "..") {
                    var g = o.lookupPath(n.path, {
                        parent: !0
                    });
                    v = g.node.id,
                    y = 4
                } else {
                    var E;
                    try {
                        E = o.lookupNode(n.node, d)
                    } catch (S) {
                        if (S?.errno === 28)
                            continue;
                        throw S
                    }
                    v = E.id,
                    y = o.isChrdev(E.mode) ? 2 : o.isDir(E.mode) ? 4 : o.isLink(E.mode) ? 10 : 8
                }
                x[e + a >> 3] = BigInt(v),
                x[e + a + 8 >> 3] = BigInt((l + 1) * i),
                tr[e + a + 16 >> 1] = 280,
                A[e + a + 18] = y,
                $(d, e + a + 19, 256),
                a += i
            }
            return o.llseek(n, l * i, 0),
            a
        } catch (S) {
            if (typeof o > "u" || S.name !== "ErrnoError")
                throw S;
            return -S.errno
        }
    }
    function Ne(r, e, t) {
        P.varargs = t;
        try {
            var n = P.getStreamFromFD(r);
            switch (e) {
            case 21509:
                return n.tty ? 0 : -59;
            case 21505:
                {
                    if (!n.tty)
                        return -59;
                    if (n.tty.ops.ioctl_tcgets) {
                        var i = n.tty.ops.ioctl_tcgets(n)
                          , a = Z();
                        z[a >> 2] = i.c_iflag || 0,
                        z[a + 4 >> 2] = i.c_oflag || 0,
                        z[a + 8 >> 2] = i.c_cflag || 0,
                        z[a + 12 >> 2] = i.c_lflag || 0;
                        for (var s = 0; s < 32; s++)
                            A[a + s + 17] = i.c_cc[s] || 0;
                        return 0
                    }
                    return 0
                }
            case 21510:
            case 21511:
            case 21512:
                return n.tty ? 0 : -59;
            case 21506:
            case 21507:
            case 21508:
                {
                    if (!n.tty)
                        return -59;
                    if (n.tty.ops.ioctl_tcsets) {
                        for (var a = Z(), f = z[a >> 2], c = z[a + 4 >> 2], l = z[a + 8 >> 2], v = z[a + 12 >> 2], y = [], s = 0; s < 32; s++)
                            y.push(A[a + s + 17]);
                        return n.tty.ops.ioctl_tcsets(n.tty, e, {
                            c_iflag: f,
                            c_oflag: c,
                            c_cflag: l,
                            c_lflag: v,
                            c_cc: y
                        })
                    }
                    return 0
                }
            case 21519:
                {
                    if (!n.tty)
                        return -59;
                    var a = Z();
                    return z[a >> 2] = 0,
                    0
                }
            case 21520:
                return n.tty ? -28 : -59;
            case 21537:
            case 21531:
                {
                    var a = Z();
                    return o.ioctl(n, e, a)
                }
            case 21523:
                {
                    if (!n.tty)
                        return -59;
                    if (n.tty.ops.ioctl_tiocgwinsz) {
                        var d = n.tty.ops.ioctl_tiocgwinsz(n.tty)
                          , a = Z();
                        tr[a >> 1] = d[0],
                        tr[a + 2 >> 1] = d[1]
                    }
                    return 0
                }
            case 21524:
                return n.tty ? 0 : -59;
            case 21515:
                return n.tty ? 0 : -59;
            default:
                return -28
            }
        } catch (g) {
            if (typeof o > "u" || g.name !== "ErrnoError")
                throw g;
            return -g.errno
        }
    }
    function Re(r, e, t, n) {
        P.varargs = n;
        try {
            e = P.getStr(e),
            e = P.calculateAt(r, e);
            var i = n ? dr() : 0;
            return t & 64 && (i &= ~P.currentUmask),
            o.open(e, t, i).fd
        } catch (a) {
            if (typeof o > "u" || a.name !== "ErrnoError")
                throw a;
            return -a.errno
        }
    }
    function Ce(r, e, t, n) {
        try {
            if (e = P.getStr(e),
            e = P.calculateAt(r, e),
            n <= 0)
                return -28;
            var i = o.readlink(e)
              , a = Math.min(n, or(i))
              , s = A[t + a];
            return $(i, t, n + 1),
            A[t + a] = s,
            a
        } catch (f) {
            if (typeof o > "u" || f.name !== "ErrnoError")
                throw f;
            return -f.errno
        }
    }
    function Be(r, e) {
        try {
            return r = P.getStr(r),
            P.writeStat(e, o.stat(r))
        } catch (t) {
            if (typeof o > "u" || t.name !== "ErrnoError")
                throw t;
            return -t.errno
        }
    }
    var ze = () => j("")
      , xe = (r, e, t, n) => {
        var i = new Date().getFullYear()
          , a = new Date(i,0,1)
          , s = new Date(i,6,1)
          , f = a.getTimezoneOffset()
          , c = s.getTimezoneOffset()
          , l = Math.max(f, c);
        b[r >> 2] = l * 60,
        z[e >> 2] = +(f != c);
        var v = g => {
            var E = g >= 0 ? "-" : "+"
              , S = Math.abs(g)
              , C = String(Math.floor(S / 60)).padStart(2, "0")
              , R = String(S % 60).padStart(2, "0");
            return `UTC${E}${C}${R}`
        }
          , y = v(f)
          , d = v(c);
        c < f ? ($(y, t, 17),
        $(d, n, 17)) : ($(y, n, 17),
        $(d, t, 17))
    }
      , je = () => 2147483648
      , Le = (r, e) => Math.ceil(r / e) * e
      , Ue = r => {
        var e = mr.buffer.byteLength
          , t = (r - e + 65535) / 65536 | 0;
        try {
            return mr.grow(t),
            Fr(),
            1
        } catch {}
    }
      , Oe = r => {
        var e = nr.length;
        r >>>= 0;
        var t = je();
        if (r > t)
            return !1;
        for (var n = 1; n <= 4; n *= 2) {
            var i = e * (1 + .2 / n);
            i = Math.min(i, r + 100663296);
            var a = Math.min(t, Le(Math.max(r, i), 65536))
              , s = Ue(a);
            if (s)
                return !0
        }
        return !1
    }
      , Er = {}
      , Ie = () => N
      , ir = () => {
        if (!ir.strings) {
            var r = (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8"
              , e = {
                USER: "web_user",
                LOGNAME: "web_user",
                PATH: "/",
                PWD: "/",
                HOME: "/home/web_user",
                LANG: r,
                _: Ie()
            };
            for (var t in Er)
                Er[t] === void 0 ? delete e[t] : e[t] = Er[t];
            var n = [];
            for (var t in e)
                n.push(`${t}=${e[t]}`);
            ir.strings = n
        }
        return ir.strings
    }
      , He = (r, e) => {
        var t = 0
          , n = 0;
        for (var i of ir()) {
            var a = e + t;
            b[r + n >> 2] = a,
            t += $(i, a, 1 / 0) + 1,
            n += 4
        }
        return 0
    }
      , We = (r, e) => {
        var t = ir();
        b[r >> 2] = t.length;
        var n = 0;
        for (var i of t)
            n += or(i) + 1;
        return b[e >> 2] = n,
        0
    }
    ;
    function $e(r) {
        try {
            var e = P.getStreamFromFD(r);
            return o.close(e),
            0
        } catch (t) {
            if (typeof o > "u" || t.name !== "ErrnoError")
                throw t;
            return t.errno
        }
    }
    var Xe = (r, e, t, n) => {
        for (var i = 0, a = 0; a < t; a++) {
            var s = b[e >> 2]
              , f = b[e + 4 >> 2];
            e += 8;
            var c = o.read(r, A, s, f, n);
            if (c < 0)
                return -1;
            if (i += c,
            c < f)
                break
        }
        return i
    }
    ;
    function qe(r, e, t, n) {
        try {
            var i = P.getStreamFromFD(r)
              , a = Xe(i, e, t);
            return b[n >> 2] = a,
            0
        } catch (s) {
            if (typeof o > "u" || s.name !== "ErrnoError")
                throw s;
            return s.errno
        }
    }
    var Ge = 9007199254740992
      , Ve = -9007199254740992
      , Ke = r => r < Ve || r > Ge ? NaN : Number(r);
    function Ye(r, e, t, n) {
        e = Ke(e);
        try {
            if (isNaN(e))
                return 22;
            var i = P.getStreamFromFD(r);
            return o.llseek(i, e, t),
            x[n >> 3] = BigInt(i.position),
            i.getdents && e === 0 && t === 0 && (i.getdents = null),
            0
        } catch (a) {
            if (typeof o > "u" || a.name !== "ErrnoError")
                throw a;
            return a.errno
        }
    }
    var Ze = (r, e, t, n) => {
        for (var i = 0, a = 0; a < t; a++) {
            var s = b[e >> 2]
              , f = b[e + 4 >> 2];
            e += 8;
            var c = o.write(r, A, s, f, n);
            if (c < 0)
                return -1;
            if (i += c,
            c < f)
                break
        }
        return i
    }
    ;
    function Je(r, e, t, n) {
        try {
            var i = P.getStreamFromFD(r)
              , a = Ze(i, e, t);
            return b[n >> 2] = a,
            0
        } catch (s) {
            if (typeof o > "u" || s.name !== "ErrnoError")
                throw s;
            return s.errno
        }
    }
    var Qe = r => r
      , jr = []
      , p = r => {
        var e = jr[r];
        return e || (jr[r] = e = qr.get(r)),
        e
    }
      , rt = r => {
        var e = u["_" + r];
        return e
    }
      , et = (r, e) => {
        A.set(r, e)
    }
      , Lr = r => Ir(r)
      , tt = r => {
        var e = or(r) + 1
          , t = Lr(e);
        return $(r, t, e),
        t
    }
      , nt = (r, e, t, n, i) => {
        var a = {
            string: E => {
                var S = 0;
                return E != null && E !== 0 && (S = tt(E)),
                S
            }
            ,
            array: E => {
                var S = Lr(E.length);
                return et(E, S),
                S
            }
        };
        function s(E) {
            return e === "string" ? Y(E) : e === "boolean" ? !!E : E
        }
        var f = rt(r)
          , c = []
          , l = 0;
        if (n)
            for (var v = 0; v < n.length; v++) {
                var y = a[t[v]];
                y ? (l === 0 && (l = _()),
                c[v] = y(n[v])) : c[v] = n[v]
            }
        var d = f(...c);
        function g(E) {
            return l !== 0 && w(l),
            s(E)
        }
        return d = g(d),
        d
    }
    ;
    o.createPreloadedFile = Pe,
    o.preloadFile = xr,
    o.staticInit();
    {
        u.noExitRuntime && u.noExitRuntime,
        u.print && (cr = u.print),
        u.printErr && (X = u.printErr),
        u.arguments && u.arguments,
        u.thisProgram && (N = u.thisProgram);
        var Q = u.preInit;
        if (Q)
            for (typeof Q == "function" && (u.preInit = Q = [Q]); Q.length > 0; )
                Q.shift()()
    }
    u.ccall = nt,
    u.UTF8ToString = Y,
    u.FS = o;
    var h, Ur, Or, Ir, Hr, Wr, br, $r, Xr, mr, qr;
    function ot(r) {
        u._get_watermark_text = r.Ma,
        u._parse_board_file = r.Na,
        u._parse_gencad_file = r.Oa,
        u._parse_tvw_file = r.Pa,
        u._looks_like_board_file = r.Qa,
        u._looks_like_gencad_file = r.Ra,
        u._looks_like_tvw_file = r.Sa,
        u._free_string = r.Ta,
        h = r.Ua,
        Ur = r.Va,
        Or = r.Wa,
        Ir = r.Xa,
        Hr = r.Ya,
        Wr = r.Za,
        br = r._a,
        $r = r.$a,
        Xr = r.ab,
        mr = r.Ja,
        qr = r.La
    }
    var it = {
        Ea: se,
        k: fe,
        n: ce,
        a: le,
        i: ue,
        w: ve,
        la: de,
        s: he,
        va: me,
        g: we,
        ba: Ae,
        oa: Me,
        wa: Te,
        ua: Ne,
        da: Re,
        na: Ce,
        ma: Be,
        ya: ze,
        pa: xe,
        xa: Oe,
        qa: He,
        ra: We,
        N: $e,
        sa: qe,
        ta: Ye,
        aa: Je,
        E: xt,
        z: Xt,
        Y: bt,
        _: ln,
        I: Et,
        F: Nt,
        $: cn,
        v: un,
        d: ut,
        b: ct,
        e: st,
        X: jt,
        l: dt,
        t: Pt,
        x: zt,
        J: Jt,
        L: vn,
        W: Lt,
        ia: Wt,
        T: gt,
        m: lt,
        A: kt,
        y: Rt,
        D: St,
        ga: Yt,
        M: fn,
        h: vt,
        Ca: $t,
        p: pt,
        Ba: Vt,
        ka: Bt,
        O: an,
        C: Ct,
        P: on,
        f: ft,
        Aa: rn,
        fa: tn,
        ea: nn,
        za: en,
        c: at,
        ha: Kt,
        Ia: Dt,
        j: ht,
        R: Gt,
        Ha: Mt,
        Da: Ht,
        r: yt,
        V: Qt,
        o: _t,
        Ga: Ut,
        B: At,
        u: Tt,
        G: Ft,
        Z: mt,
        H: dn,
        K: hn,
        ca: sn,
        q: wt,
        S: qt,
        ja: Ot,
        Q: Zt,
        Fa: It,
        U: Qe
    };
    function at(r, e, t, n) {
        var i = _();
        try {
            p(r)(e, t, n)
        } catch (a) {
            if (w(i),
            !(a instanceof m))
                throw a;
            h(1, 0)
        }
    }
    function st(r, e, t, n) {
        var i = _();
        try {
            return p(r)(e, t, n)
        } catch (a) {
            if (w(i),
            !(a instanceof m))
                throw a;
            h(1, 0)
        }
    }
    function ft(r, e, t) {
        var n = _();
        try {
            p(r)(e, t)
        } catch (i) {
            if (w(n),
            !(i instanceof m))
                throw i;
            h(1, 0)
        }
    }
    function ct(r, e, t) {
        var n = _();
        try {
            return p(r)(e, t)
        } catch (i) {
            if (w(n),
            !(i instanceof m))
                throw i;
            h(1, 0)
        }
    }
    function lt(r, e, t, n) {
        var i = _();
        try {
            return p(r)(e, t, n)
        } catch (a) {
            if (w(i),
            !(a instanceof m))
                throw a;
            h(1, 0)
        }
    }
    function ut(r, e) {
        var t = _();
        try {
            return p(r)(e)
        } catch (n) {
            if (w(t),
            !(n instanceof m))
                throw n;
            h(1, 0)
        }
    }
    function vt(r) {
        var e = _();
        try {
            p(r)()
        } catch (t) {
            if (w(e),
            !(t instanceof m))
                throw t;
            h(1, 0)
        }
    }
    function dt(r, e, t, n, i) {
        var a = _();
        try {
            return p(r)(e, t, n, i)
        } catch (s) {
            if (w(a),
            !(s instanceof m))
                throw s;
            h(1, 0)
        }
    }
    function ht(r, e, t, n, i) {
        var a = _();
        try {
            p(r)(e, t, n, i)
        } catch (s) {
            if (w(a),
            !(s instanceof m))
                throw s;
            h(1, 0)
        }
    }
    function mt(r, e, t, n, i, a, s, f, c, l) {
        var v = _();
        try {
            p(r)(e, t, n, i, a, s, f, c, l)
        } catch (y) {
            if (w(v),
            !(y instanceof m))
                throw y;
            h(1, 0)
        }
    }
    function wt(r, e, t) {
        var n = _();
        try {
            p(r)(e, t)
        } catch (i) {
            if (w(n),
            !(i instanceof m))
                throw i;
            h(1, 0)
        }
    }
    function _t(r, e, t, n, i, a, s) {
        var f = _();
        try {
            p(r)(e, t, n, i, a, s)
        } catch (c) {
            if (w(f),
            !(c instanceof m))
                throw c;
            h(1, 0)
        }
    }
    function pt(r, e) {
        var t = _();
        try {
            p(r)(e)
        } catch (n) {
            if (w(t),
            !(n instanceof m))
                throw n;
            h(1, 0)
        }
    }
    function yt(r, e, t, n, i, a) {
        var s = _();
        try {
            p(r)(e, t, n, i, a)
        } catch (f) {
            if (w(s),
            !(f instanceof m))
                throw f;
            h(1, 0)
        }
    }
    function gt(r, e, t) {
        var n = _();
        try {
            return p(r)(e, t)
        } catch (i) {
            if (w(n),
            !(i instanceof m))
                throw i;
            h(1, 0)
        }
    }
    function kt(r, e) {
        var t = _();
        try {
            return p(r)(e)
        } catch (n) {
            if (w(t),
            !(n instanceof m))
                throw n;
            h(1, 0)
        }
    }
    function Et(r, e, t) {
        var n = _();
        try {
            return p(r)(e, t)
        } catch (i) {
            if (w(n),
            !(i instanceof m))
                throw i;
            h(1, 0)
        }
    }
    function bt(r, e, t) {
        var n = _();
        try {
            return p(r)(e, t)
        } catch (i) {
            if (w(n),
            !(i instanceof m))
                throw i;
            h(1, 0)
        }
    }
    function St(r, e, t, n) {
        var i = _();
        try {
            return p(r)(e, t, n)
        } catch (a) {
            if (w(i),
            !(a instanceof m))
                throw a;
            h(1, 0)
        }
    }
    function Dt(r, e, t, n, i, a, s) {
        var f = _();
        try {
            p(r)(e, t, n, i, a, s)
        } catch (c) {
            if (w(f),
            !(c instanceof m))
                throw c;
            h(1, 0)
        }
    }
    function Ft(r, e, t, n, i, a, s, f, c) {
        var l = _();
        try {
            p(r)(e, t, n, i, a, s, f, c)
        } catch (v) {
            if (w(l),
            !(v instanceof m))
                throw v;
            h(1, 0)
        }
    }
    function Pt(r, e, t, n, i, a) {
        var s = _();
        try {
            return p(r)(e, t, n, i, a)
        } catch (f) {
            if (w(s),
            !(f instanceof m))
                throw f;
            h(1, 0)
        }
    }
    function At(r, e, t, n, i, a, s, f, c) {
        var l = _();
        try {
            p(r)(e, t, n, i, a, s, f, c)
        } catch (v) {
            if (w(l),
            !(v instanceof m))
                throw v;
            h(1, 0)
        }
    }
    function Mt(r, e, t, n, i, a, s, f, c) {
        var l = _();
        try {
            p(r)(e, t, n, i, a, s, f, c)
        } catch (v) {
            if (w(l),
            !(v instanceof m))
                throw v;
            h(1, 0)
        }
    }
    function Tt(r, e, t, n, i, a, s, f) {
        var c = _();
        try {
            p(r)(e, t, n, i, a, s, f)
        } catch (l) {
            if (w(c),
            !(l instanceof m))
                throw l;
            h(1, 0)
        }
    }
    function Nt(r, e) {
        var t = _();
        try {
            return p(r)(e)
        } catch (n) {
            if (w(t),
            !(n instanceof m))
                throw n;
            h(1, 0)
        }
    }
    function Rt(r, e, t) {
        var n = _();
        try {
            return p(r)(e, t)
        } catch (i) {
            if (w(n),
            !(i instanceof m))
                throw i;
            h(1, 0)
        }
    }
    function Ct(r, e, t, n, i, a) {
        var s = _();
        try {
            p(r)(e, t, n, i, a)
        } catch (f) {
            if (w(s),
            !(f instanceof m))
                throw f;
            h(1, 0)
        }
    }
    function Bt(r, e, t, n) {
        var i = _();
        try {
            p(r)(e, t, n)
        } catch (a) {
            if (w(i),
            !(a instanceof m))
                throw a;
            h(1, 0)
        }
    }
    function zt(r, e, t, n, i, a, s) {
        var f = _();
        try {
            return p(r)(e, t, n, i, a, s)
        } catch (c) {
            if (w(f),
            !(c instanceof m))
                throw c;
            h(1, 0)
        }
    }
    function xt(r, e) {
        var t = _();
        try {
            return p(r)(e)
        } catch (n) {
            if (w(t),
            !(n instanceof m))
                throw n;
            h(1, 0)
        }
    }
    function jt(r, e, t, n, i, a) {
        var s = _();
        try {
            return p(r)(e, t, n, i, a)
        } catch (f) {
            if (w(s),
            !(f instanceof m))
                throw f;
            h(1, 0)
        }
    }
    function Lt(r, e, t, n, i, a, s, f, c, l, v, y, d, g) {
        var E = _();
        try {
            return p(r)(e, t, n, i, a, s, f, c, l, v, y, d, g)
        } catch (S) {
            if (w(E),
            !(S instanceof m))
                throw S;
            h(1, 0)
        }
    }
    function Ut(r, e, t, n, i, a, s, f, c, l) {
        var v = _();
        try {
            p(r)(e, t, n, i, a, s, f, c, l)
        } catch (y) {
            if (w(v),
            !(y instanceof m))
                throw y;
            h(1, 0)
        }
    }
    function Ot(r, e, t) {
        var n = _();
        try {
            p(r)(e, t)
        } catch (i) {
            if (w(n),
            !(i instanceof m))
                throw i;
            h(1, 0)
        }
    }
    function It(r, e, t, n, i) {
        var a = _();
        try {
            p(r)(e, t, n, i)
        } catch (s) {
            if (w(a),
            !(s instanceof m))
                throw s;
            h(1, 0)
        }
    }
    function Ht(r, e, t, n, i, a, s, f) {
        var c = _();
        try {
            p(r)(e, t, n, i, a, s, f)
        } catch (l) {
            if (w(c),
            !(l instanceof m))
                throw l;
            h(1, 0)
        }
    }
    function Wt(r, e, t, n) {
        var i = _();
        try {
            return p(r)(e, t, n)
        } catch (a) {
            if (w(i),
            !(a instanceof m))
                throw a;
            h(1, 0)
        }
    }
    function $t(r, e, t, n, i, a, s, f, c, l) {
        var v = _();
        try {
            p(r)(e, t, n, i, a, s, f, c, l)
        } catch (y) {
            if (w(v),
            !(y instanceof m))
                throw y;
            h(1, 0)
        }
    }
    function Xt(r, e, t) {
        var n = _();
        try {
            return p(r)(e, t)
        } catch (i) {
            if (w(n),
            !(i instanceof m))
                throw i;
            h(1, 0)
        }
    }
    function qt(r, e, t, n) {
        var i = _();
        try {
            p(r)(e, t, n)
        } catch (a) {
            if (w(i),
            !(a instanceof m))
                throw a;
            h(1, 0)
        }
    }
    function Gt(r, e, t, n, i, a) {
        var s = _();
        try {
            p(r)(e, t, n, i, a)
        } catch (f) {
            if (w(s),
            !(f instanceof m))
                throw f;
            h(1, 0)
        }
    }
    function Vt(r, e, t, n, i) {
        var a = _();
        try {
            p(r)(e, t, n, i)
        } catch (s) {
            if (w(a),
            !(s instanceof m))
                throw s;
            h(1, 0)
        }
    }
    function Kt(r, e, t, n, i, a) {
        var s = _();
        try {
            p(r)(e, t, n, i, a)
        } catch (f) {
            if (w(s),
            !(f instanceof m))
                throw f;
            h(1, 0)
        }
    }
    function Yt(r, e, t, n, i) {
        var a = _();
        try {
            return p(r)(e, t, n, i)
        } catch (s) {
            if (w(a),
            !(s instanceof m))
                throw s;
            h(1, 0)
        }
    }
    function Zt(r, e, t, n) {
        var i = _();
        try {
            p(r)(e, t, n)
        } catch (a) {
            if (w(i),
            !(a instanceof m))
                throw a;
            h(1, 0)
        }
    }
    function Jt(r, e, t, n, i, a, s, f) {
        var c = _();
        try {
            return p(r)(e, t, n, i, a, s, f)
        } catch (l) {
            if (w(c),
            !(l instanceof m))
                throw l;
            h(1, 0)
        }
    }
    function Qt(r, e, t, n, i, a, s, f) {
        var c = _();
        try {
            p(r)(e, t, n, i, a, s, f)
        } catch (l) {
            if (w(c),
            !(l instanceof m))
                throw l;
            h(1, 0)
        }
    }
    function rn(r, e, t, n, i, a, s, f, c, l, v) {
        var y = _();
        try {
            p(r)(e, t, n, i, a, s, f, c, l, v)
        } catch (d) {
            if (w(y),
            !(d instanceof m))
                throw d;
            h(1, 0)
        }
    }
    function en(r, e, t, n, i, a, s, f, c, l) {
        var v = _();
        try {
            p(r)(e, t, n, i, a, s, f, c, l)
        } catch (y) {
            if (w(v),
            !(y instanceof m))
                throw y;
            h(1, 0)
        }
    }
    function tn(r, e, t, n, i, a, s, f, c, l) {
        var v = _();
        try {
            p(r)(e, t, n, i, a, s, f, c, l)
        } catch (y) {
            if (w(v),
            !(y instanceof m))
                throw y;
            h(1, 0)
        }
    }
    function nn(r, e, t, n, i, a, s, f, c) {
        var l = _();
        try {
            p(r)(e, t, n, i, a, s, f, c)
        } catch (v) {
            if (w(l),
            !(v instanceof m))
                throw v;
            h(1, 0)
        }
    }
    function on(r, e, t, n, i, a, s) {
        var f = _();
        try {
            p(r)(e, t, n, i, a, s)
        } catch (c) {
            if (w(f),
            !(c instanceof m))
                throw c;
            h(1, 0)
        }
    }
    function an(r, e, t, n, i) {
        var a = _();
        try {
            p(r)(e, t, n, i)
        } catch (s) {
            if (w(a),
            !(s instanceof m))
                throw s;
            h(1, 0)
        }
    }
    function sn(r, e, t, n, i, a) {
        var s = _();
        try {
            p(r)(e, t, n, i, a)
        } catch (f) {
            if (w(s),
            !(f instanceof m))
                throw f;
            h(1, 0)
        }
    }
    function fn(r, e, t, n, i) {
        var a = _();
        try {
            return p(r)(e, t, n, i)
        } catch (s) {
            if (w(a),
            !(s instanceof m))
                throw s;
            return h(1, 0),
            0n
        }
    }
    function cn(r, e, t, n) {
        var i = _();
        try {
            return p(r)(e, t, n)
        } catch (a) {
            if (w(i),
            !(a instanceof m))
                throw a;
            h(1, 0)
        }
    }
    function ln(r, e, t, n) {
        var i = _();
        try {
            return p(r)(e, t, n)
        } catch (a) {
            if (w(i),
            !(a instanceof m))
                throw a;
            h(1, 0)
        }
    }
    function un(r) {
        var e = _();
        try {
            return p(r)()
        } catch (t) {
            if (w(e),
            !(t instanceof m))
                throw t;
            h(1, 0)
        }
    }
    function vn(r, e, t, n, i, a, s, f, c, l, v, y) {
        var d = _();
        try {
            return p(r)(e, t, n, i, a, s, f, c, l, v, y)
        } catch (g) {
            if (w(d),
            !(g instanceof m))
                throw g;
            h(1, 0)
        }
    }
    function dn(r, e, t, n, i, a, s, f, c, l, v) {
        var y = _();
        try {
            p(r)(e, t, n, i, a, s, f, c, l, v)
        } catch (d) {
            if (w(y),
            !(d instanceof m))
                throw d;
            h(1, 0)
        }
    }
    function hn(r, e, t, n, i, a, s, f, c, l, v, y, d, g, E, S) {
        var C = _();
        try {
            p(r)(e, t, n, i, a, s, f, c, l, v, y, d, g, E, S)
        } catch (R) {
            if (w(C),
            !(R instanceof m))
                throw R;
            h(1, 0)
        }
    }
    async function mn() {
        Yr(),
        G && await Ee();
        var r = u.setStatus;
        r && (r("Running..."),
        await new Promise(e => setTimeout(e, 1)),
        setTimeout(r, 1, "")),
        !Dr && (Zr(),
        u.onRuntimeInitialized?.(),
        Jr())
    }
    var ar;
    return ar = await ie(),
    await mn(),
    u
}
const _n = "0.2";
let Sr = null
  , fr = null;
const pn = new TextDecoder;
function yn() {
    return Sr ??= wn().catch(M => {
        throw console.error("[Board parser worker] Failed to initialize WASM module", M),
        Sr = null,
        M
    }
    ),
    Sr
}
function gn(M) {
    return M.replace(/[^a-zA-Z0-9_.-]+/g, "_").slice(-80) || "board.cad"
}
function Gr(M, u) {
    const F = M.HEAPU8;
    let B = u;
    for (; F[B] !== 0; )
        B += 1;
    const N = new Uint8Array(B - u);
    for (let H = 0; H < N.length; ++H)
        N[H] = F[u + H] ?? 0;
    return {
        text: pn.decode(N),
        byteLength: N.length
    }
}
function kn(M) {
    if (fr !== null)
        return fr;
    const u = M.ccall("get_watermark_text", "number", ["string"], [_n]);
    if (typeof u != "number" || u === 0)
        throw new Error("WASM returned an empty watermark.");
    try {
        fr = Gr(M, u).text
    } finally {
        M.ccall("free_string", null, ["number"], [u])
    }
    if (fr.length === 0)
        throw new Error("WASM returned an invalid watermark.");
    return fr
}
function En(M, u) {
    if (!M.ok)
        return {
            jsonBytes: u
        };
    const F = M.board;
    let B = 0;
    for (const N of F.components)
        B += N.pads.length;
    return {
        jsonBytes: u,
        components: F.components.length,
        pads: B,
        nets: F.nets.length,
        layers: F.layers.length,
        visibleLayers: F.layers.filter(N => N.visible).length,
        graphics: F.graphics.length,
        texts: F.texts.length,
        tracks: F.tracks.length,
        vias: F.vias.length,
        zones: F.zones.length
    }
}
self.onmessage = async M => {
    const u = M.data
      , F = await yn()
      , B = `/work-${u.id}-${gn(u.fileName)}`;
    let N = 0;
    const H = performance.now();
    try {
        console.info("[Board parser worker] Parsing started", {
            parser: "Board auto-detect",
            fileName: u.fileName,
            bytes: u.buffer.byteLength,
            includeLayerData: u.includeLayerData,
            revisionIndex: u.revisionIndex
        }),
        F.FS.writeFile(B, new Uint8Array(u.buffer));
        const L = F.ccall("parse_board_file", "number", ["string", "number", "number"], [B, u.includeLayerData ? 1 : 0, u.revisionIndex]);
        if (typeof L != "number" || L === 0)
            throw new Error("Parser returned an empty result.");
        N = L;
        const {text: V, byteLength: er} = Gr(F, N)
          , O = JSON.parse(V);
        O.ok && (O.watermarkText = kn(F)),
        console.info("[Board parser worker] Parsing finished", {
            parser: "Board auto-detect",
            fileName: u.fileName,
            ms: Math.round(performance.now() - H),
            ok: O.ok,
            ...En(O, er)
        }),
        postMessage({
            id: u.id,
            result: O
        })
    } catch (L) {
        const V = L instanceof Error ? L.message : String(L);
        console.error("[Board parser worker] Parsing failed", {
            parser: "Board auto-detect",
            fileName: u.fileName,
            ms: Math.round(performance.now() - H),
            message: V,
            error: L
        }),
        postMessage({
            id: u.id,
            result: {
                ok: !1,
                error: V
            }
        })
    } finally {
        N !== 0 && F.ccall("free_string", null, ["number"], [N]);
        try {
            F.FS.unlink(B)
        } catch {}
    }
}
;
