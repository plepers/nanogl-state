!function() {
    function t(t) {
        return t | (4096 & t) >>> 2 | (2048 & t) >>> 2 | (524288 & t) >>> 3 | (1048576 & t) >>> 3 | (2097152 & t) >>> 3;
    }
    function s(t) {
        return 0 | Math.round(65535 * t);
    }
    function i(t) {
        return t / 65535;
    }
    function e(t) {
        var s = (31744 & t) >> 10, i = 1023 & t;
        return (t >> 15 ? -1 : 1) * (s ? 31 === s ? i ? NaN : 1 / 0 : Math.pow(2, s - 15) * (1 + i / 1024) : 6103515625e-14 * (i / 1024));
    }
    function n(t) {
        r[0] = t;
        var s = d[0], i = s >> 31 << 5, e = s >> 23 & 255;
        return e = e - 112 & 112 - e >> 4 >> 27, i = (i | e) << 10, i |= s >> 13 & 1023;
    }
    function a() {
        this._stack = new Uint32Array(51 * u | 0), this._sets = new Uint32Array(0 | u), 
        this._size = 0 | u, this._ptr = 0, this._headPos = 0, this._wcfg = new h(), this._tmpDat = new Uint32Array(51);
    }
    function h() {
        this._dat = new Uint16Array(51), this._set = 0;
    }
    var _ = [ 1, 512, 1024, 1024, 2048, 4096, 4096, 4, 8192, 2, 16384, 32768, 256, 65536, 65536, 65536, 131072, 131072, 131072, 262144, 524288, 524288, 524288, 1048576, 1048576, 1048576, 2097152, 128, 4194304, 4194304, 4194304, 4194304, 8, 16, 8388608, 8388608, 32, 64, 16777216, 33554432, 67108864, 67108864, 67108864, 67108864, 134217728, 134217728, 134217728, 134217728, 268435456, 268435456, 536870912 ], c = 935847839, o = new Uint16Array([ 0, 32774, 0, 1, 0, 0, 0, 0, 513, 0, 1029, 2305, 0, 519, 0, 65535, 65535, 7680, 7680, 7680, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 15, 1, 0, 0, 0, 0, 0, 0, 0, 0, s(0), s(1), s(1) ]), r = new Float32Array(1), d = new Uint32Array(r.buffer), u = 32;
    a.prototype = {
        initFromGL: function(t) {
            this._ptr = 0, this._wcfg.fromGL(t), this._sets[0] = 0, this._stack.set(this._wcfg._dat);
        },
        push: function(t) {
            var s, i, e, n, a, h, c, o = this._ptr, r = this._sets[o++], d = t._set;
            for (o == this._size && this._grow(), r |= d, this._sets[o] = r, this._ptr = o, 
            s = 51 * o, i = this._stack, e = t._dat, n = this._tmpDat, a = 0; 51 > a; a++) h = _[a], 
            c = 0 !== (d & h) ? e[a] : i[s + a - 51], n[a] = c;
            i.set(n, s);
        },
        pop: function() {
            var t = --this._ptr;
            this._headPos > t && (this._sets[t] |= this._sets[t + 1], this._headPos = t);
        },
        commit: function(t) {
            var s = this._ptr;
            this.copyConfig(s, t), this._headPos = s, this._sets[s - 1] |= this._sets[s], this._sets[s] = 0;
        },
        patch: function(t, s) {
            this.copyConfig(this._ptr, this._wcfg), this._wcfg.patch(t, s);
        },
        copyConfig: function(t, s) {
            var i = new Uint32Array(this._stack.buffer, 51 * t * 4, 51);
            s._dat.set(i), s._set = this._sets[t];
        },
        _grow: function() {
            var t = this._size << 1, s = new Uint32Array(51 * t), i = new Uint32Array(t);
            s.set(this._stack, 0), i.set(this._sets, 0), this._stack = s, this._sets = i, this._size = t;
        }
    };
    var l = function(t, s) {
        return t.getParameter(s);
    };
    h.makeStack = function() {
        return new a();
    }, h.encodeHalf = function(t) {
        return n(t);
    }, h.decodeHalf = function(t) {
        return e(t);
    }, h.prototype = {
        toDefault: function() {
            this._dat.set(o), this._set = 0 | c;
        },
        clone: function() {
            var t = new h();
            return t._dat.set(this._dat), t._set = this._set, t;
        },
        patch: function(s, i) {
            for (var e, n = this._dat, a = this._set, h = s._dat, c = s._set, o = i._dat, r = 0, d = 0; 51 > d; d++) e = _[d], 
            0 !== (a & e) && ((0 === (c & e) || n[d] !== h[d]) && (r |= e), h[d] = n[d]);
            o.set(h), s._set |= a, i._set = t(r);
        },
        setupGL: function(t) {
            var s, n = this._set, a = this._dat;
            if (1 === (1 & n) && (a[0] ? t.enable(3042) : t.disable(3042)), s = 2560 & n, 0 !== s && (2560 === s ? t.blendEquationSeparate(a[1], a[4]) : t.blendEquation(a[1])), 
            s = 5120 & n, 0 !== s && (5120 === s ? t.blendFuncSeparate(a[3], a[2], a[6], a[5]) : t.blendFunc(a[3], a[2])), 
            4 & n && (a[7] ? t.enable(2929) : t.disable(2929)), 8192 & n && t.depthFunc(a[8]), 
            2 & n && (a[9] ? t.enable(2884) : t.disable(2884)), 16384 & n && t.cullFace(a[10]), 
            32768 & n && t.frontFace(a[11]), 256 & n && (a[12] ? t.enable(2960) : t.disable(2960)), 
            s = 589824 & n, 0 !== s && (589824 === s ? (t.stencilFuncSeparate(1028, a[13], a[14], a[15]), 
            t.stencilFuncSeparate(1029, a[20], a[21], a[22])) : t.stencilFunc(a[13], a[14], a[15])), 
            s = 1179648 & n, 0 !== s && (1179648 === s ? (t.stencilOpSeparate(1028, a[17], a[18], a[19]), 
            t.stencilOpSeparate(1029, a[24], a[25], a[26])) : t.stencilOp(a[17], a[18], a[19])), 
            s = 2359296 & n, 0 !== s && (2359296 === s ? (t.stencilMaskSeparate(1028, a[16]), 
            t.stencilMaskSeparate(1029, a[23])) : t.stencilMask(a[16])), 16777216 & n) {
                var h = a[38];
                t.colorMask(1 === (1 & h), 2 === (2 & h), 4 === (4 & h), 8 === (8 & h));
            }
            33554432 & n && t.depthMask(1 === a[39]), 67108864 & n && t.blendColor(e(a[40]), e(a[41]), e(a[42]), e(a[43])), 
            128 & n && (a[27] ? t.enable(3089) : t.disable(3089)), 4194304 & n && t.scissor(a[28], a[29], a[30], a[31]), 
            134217728 & n && t.viewport(a[44], a[45], a[46], a[47]), 8388608 & n && t.polygonOffset(e(a[34]), e(a[35])), 
            268435456 & n && t.depthRange(i(a[48]), i(a[49]));
        },
        fromGL: function(t) {
            this._set = 0;
            var s = l(t, 3042), i = l(t, 2884), e = l(t, 2929), n = l(t, 3024), a = l(t, 32823), h = l(t, 3089), _ = l(t, 2960), c = l(t, 32969), o = l(t, 32968), r = l(t, 32971), d = l(t, 32970), u = l(t, 32777), f = l(t, 34877), p = l(t, 2962), b = l(t, 2967), w = l(t, 2963), F = l(t, 2968), S = l(t, 2964), g = l(t, 2965), k = l(t, 2966), v = l(t, 34816), y = l(t, 36003), M = l(t, 36004), m = l(t, 36005), O = l(t, 34817), A = l(t, 34818), P = l(t, 34819), U = l(t, 32824), C = l(t, 10752), D = l(t, 3088), q = l(t, 3107), E = l(t, 2930), z = l(t, 32773), G = l(t, 2978), L = l(t, 2928), R = l(t, 2849);
            this.enableBlend(s), c !== r || o !== d ? this.blendFuncSeparate(c, o, r, d) : this.blendFunc(c, o), 
            u !== f ? this.blendEquationSeparate(u, f) : this.blendEquation(u), this.enableStencil(_), 
            p !== v || b !== y || w !== M ? this.stencilFuncSeparate(p, b, w, v, y, M) : this.stencilFunc(p, b, w), 
            S !== O || g !== A || k !== P ? this.stencilOpSeparate(S, g, k, O, A, P) : this.stencilOp(S, g, k), 
            F !== m ? this.stencilMaskSeparate(F, m) : this.stencilMask(F), this.depthFunc(t.getParameter(2932)), 
            this.enableDepthTest(e), this.cullFace(t.getParameter(2885)), this.enableCullface(i), 
            this.frontFace(t.getParameter(2886)), this.enablePolygonOffset(a), this.polygonOffset(U, C), 
            this.enableScissor(h), this.scissor(D[0], D[1], D[2], D[3]), this.enableDither(n), 
            this.colorMask(q[0], q[1], q[2], q[3]), this.depthMask(E), this.blendColor(z[0], z[1], z[2], z[3]), 
            this.viewport(G[0], G[1], G[2], G[3]), this.depthRange(L[0], L[1]), this.lineWidth(R);
        },
        enableBlend: function(t) {
            this._dat[0] = 0 | t, this._set |= 1;
        },
        blendFunc: function(t, s) {
            this._dat[3] = t, this._dat[2] = s, this._set = -4097 & this._set | 1024;
        },
        blendFuncSeparate: function(t, s, i, e) {
            this._dat[3] = t, this._dat[2] = s, this._dat[6] = i, this._dat[5] = e, this._set |= 5120;
        },
        blendEquation: function(t) {
            this._dat[1] = t, this._set = -2049 & this._set | 512;
        },
        blendEquationSeparate: function(t, s) {
            this._dat[1] = t, this._dat[4] = s, this._set |= 2560;
        },
        blendColor: function(t, s, i, e) {
            this._dat[40] = n(t), this._dat[41] = n(s), this._dat[42] = n(i), this._dat[43] = n(e), 
            this._set |= 67108864;
        },
        depthFunc: function(t) {
            this._dat[8] = t, this._set |= 8192;
        },
        enableDepthTest: function(t) {
            this._dat[7] = 0 | t, this._set |= 4;
        },
        depthRange: function(t, i) {
            this._dat[48] = s(t), this._dat[49] = s(i), this._set |= 268435456;
        },
        lineWidth: function(t) {
            this._dat[50] = s(t), this._set |= 536870912;
        },
        cullFace: function(t) {
            this._dat[10] = t, this._set |= 16384;
        },
        enableCullface: function(t) {
            this._dat[9] = 0 | t, this._set |= 2;
        },
        polygonOffset: function(t, s) {
            this._dat[34] = n(t), this._dat[35] = n(s), this._set |= 8388608;
        },
        enablePolygonOffset: function(t) {
            this._dat[33] = 0 | t, this._set |= 16;
        },
        enableScissor: function(t) {
            this._dat[27] = 0 | t, this._set |= 128;
        },
        scissor: function(t, s, i, e) {
            this._dat[28] = t, this._dat[29] = s, this._dat[30] = i, this._dat[31] = e, this._set |= 4194304;
        },
        viewport: function(t, s, i, e) {
            this._dat[44] = t, this._dat[45] = s, this._dat[46] = i, this._dat[47] = e, this._set |= 134217728;
        },
        enableDither: function(t) {
            this._dat[32] = 0 | t, this._set |= 8;
        },
        depthMask: function(t) {
            this._dat[39] = 0 | t, this._set |= 33554432;
        },
        colorMask: function(t, s, i, e) {
            var n = 0 | t | (0 | s) << 1 | (0 | i) << 2 | (0 | e) << 3;
            this._dat[38] = n, this._set |= 16777216;
        },
        frontFace: function(t) {
            this._dat[11] = t, this._set |= 32768;
        },
        enableStencil: function(t) {
            this._dat[12] = 0 | t, this._set |= 256;
        },
        stencilFunc: function(t, s, i) {
            this._dat[13] = t, this._dat[14] = s, this._dat[15] = i, this._set = -524289 & this._set | 65536;
        },
        stencilOp: function(t, s, i) {
            this._dat[17] = t, this._dat[18] = s, this._dat[19] = i, this._set = -1048577 & this._set | 131072;
        },
        stencilMask: function(t) {
            this._dat[16] = t, this._set = -2097153 & this._set | 262144;
        },
        stencilFuncSeparate: function(t, s, i, e, n, a) {
            var h = this._dat;
            h[13] = t, h[14] = s, h[15] = i, h[20] = e, h[21] = n, h[22] = a, this._set |= 589824;
        },
        stencilOpSeparate: function(t, s, i, e, n, a) {
            var h = this._dat;
            h[17] = t, h[18] = s, h[19] = i, h[24] = e, h[25] = n, h[26] = a, this._set |= 1179648;
        },
        stencilMaskSeparate: function(t, s) {
            this._dat[16] = t, this._dat[23] = s, this._set |= 2359296;
        }
    }, module.exports = h;
}();