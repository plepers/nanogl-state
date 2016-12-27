!function() {
    function t(t) {
        return t | (4096 & t) >>> 2 | (2048 & t) >>> 2 | (524288 & t) >>> 3 | (1048576 & t) >>> 3 | (2097152 & t) >>> 3;
    }
    function e(t) {
        return 0 | Math.round(65535 * t);
    }
    function s(t) {
        return t / 65535;
    }
    function i(t) {
        var e = (31744 & t) >> 10, s = 1023 & t;
        return (t >> 15 ? -1 : 1) * (e ? 31 === e ? s ? NaN : 1 / 0 : Math.pow(2, e - 15) * (1 + s / 1024) : 6103515625e-14 * (s / 1024));
    }
    function n(t) {
        h[0] = t;
        var e = r[0], s = e >> 31 << 5, i = e >> 23 & 255;
        return i = i - 112 & 112 - i >> 4 >> 27, s = (s | i) << 10, s |= e >> 13 & 1023;
    }
    function a() {
        this._dat = new Uint16Array(51), this._set = 0;
    }
    var h = new Float32Array(1), r = new Uint32Array(h.buffer), u = [ 1, 512, 1024, 1024, 2048, 4096, 4096, 4, 8192, 2, 16384, 32768, 256, 65536, 65536, 65536, 262144, 131072, 131072, 131072, 524288, 524288, 524288, 2097152, 1048576, 1048576, 1048576, 128, 4194304, 4194304, 4194304, 4194304, 8, 16, 8388608, 8388608, 32, 64, 16777216, 33554432, 67108864, 67108864, 67108864, 67108864, 134217728, 134217728, 134217728, 134217728, 268435456, 268435456, 536870912 ], c = 935847839, d = new Uint16Array([ 0, 32774, 0, 1, 0, 0, 0, 0, 513, 0, 1029, 2305, 0, 519, 0, 65535, 65535, 7680, 7680, 7680, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 15, 1, 0, 0, 0, 0, 0, 0, 0, 0, e(0), e(1), n(1) ]), o = function(t, e) {
        return t.getParameter(e);
    };
    a.DAT_MASKS = u, a.encodeHalf = function(t) {
        return n(t);
    }, a.decodeHalf = function(t) {
        return i(t);
    }, a.prototype = {
        toDefault: function() {
            this._dat.set(d), this._set = 0 | c;
        },
        clone: function() {
            var t = new a();
            return t._dat.set(this._dat), t._set = this._set, t;
        },
        patch: function(e, s) {
            for (var i, n = this._dat, a = this._set, h = e._dat, r = e._set, c = s._dat, d = 0, o = 0; o < 51; o++) i = u[o], 
            0 !== (a & i) && (0 !== (r & i) && n[o] === h[o] || (d |= i), h[o] = n[o]);
            c.set(h), e._set |= a, s._set = t(d);
        },
        setupGL: function(t) {
            var e, n = this._set, a = this._dat;
            if (0 !== (1 & n) && (a[0] ? t.enable(3042) : t.disable(3042)), e = 2560 & n, 0 !== e && (2560 === e ? t.blendEquationSeparate(a[1], a[4]) : t.blendEquation(a[1])), 
            e = 5120 & n, 0 !== e && (5120 === e ? t.blendFuncSeparate(a[3], a[2], a[6], a[5]) : t.blendFunc(a[3], a[2])), 
            0 !== (4 & n) && (a[7] ? t.enable(2929) : t.disable(2929)), 0 !== (8192 & n) && t.depthFunc(a[8]), 
            0 !== (2 & n) && (a[9] ? t.enable(2884) : t.disable(2884)), 0 !== (16384 & n) && t.cullFace(a[10]), 
            0 !== (32768 & n) && t.frontFace(a[11]), 0 !== (536870912 & n) && t.lineWidth(i(a[50])), 
            0 !== (256 & n) && (a[12] ? t.enable(2960) : t.disable(2960)), e = 589824 & n, 0 !== e && (589824 === e ? (t.stencilFuncSeparate(1028, a[13], a[14], a[15]), 
            t.stencilFuncSeparate(1029, a[20], a[21], a[22])) : t.stencilFunc(a[13], a[14], a[15])), 
            e = 1179648 & n, 0 !== e && (1179648 === e ? (t.stencilOpSeparate(1028, a[17], a[18], a[19]), 
            t.stencilOpSeparate(1029, a[24], a[25], a[26])) : t.stencilOp(a[17], a[18], a[19])), 
            e = 2359296 & n, 0 !== e && (2359296 === e ? (t.stencilMaskSeparate(1028, a[16]), 
            t.stencilMaskSeparate(1029, a[23])) : t.stencilMask(a[16])), 0 !== (16777216 & n)) {
                var h = a[38];
                t.colorMask(1 === (1 & h), 2 === (2 & h), 4 === (4 & h), 8 === (8 & h));
            }
            0 !== (33554432 & n) && t.depthMask(1 === a[39]), 0 !== (67108864 & n) && t.blendColor(i(a[40]), i(a[41]), i(a[42]), i(a[43])), 
            0 !== (128 & n) && (a[27] ? t.enable(3089) : t.disable(3089)), 0 !== (4194304 & n) && t.scissor(a[28], a[29], a[30], a[31]), 
            0 !== (134217728 & n) && t.viewport(a[44], a[45], a[46], a[47]), 0 !== (16 & n) && (a[33] ? t.enable(32823) : t.disable(32823)), 
            0 !== (8388608 & n) && t.polygonOffset(i(a[34]), i(a[35])), 0 !== (268435456 & n) && t.depthRange(s(a[48]), s(a[49]));
        },
        fromGL: function(t) {
            this._set = 0;
            var e = o(t, 3042), s = o(t, 2884), i = o(t, 2929), n = o(t, 3024), a = o(t, 32823), h = o(t, 3089), r = o(t, 2960), u = o(t, 32969), c = o(t, 32968), d = o(t, 32971), _ = o(t, 32970), l = o(t, 32777), f = o(t, 34877), p = o(t, 2962), b = o(t, 2967), S = o(t, 2963), F = o(t, 2968), v = o(t, 2964), M = o(t, 2965), k = o(t, 2966), g = o(t, 34816), O = o(t, 36003), y = o(t, 36004), w = o(t, 36005), m = o(t, 34817), q = o(t, 34818), A = o(t, 34819), D = o(t, 32824), E = o(t, 10752), P = o(t, 3088), C = o(t, 3107), R = o(t, 2930), T = o(t, 32773), U = o(t, 2978), W = o(t, 2928), B = o(t, 2849);
            this.enableBlend(e), u !== d || c !== _ ? this.blendFuncSeparate(u, c, d, _) : this.blendFunc(u, c), 
            l !== f ? this.blendEquationSeparate(l, f) : this.blendEquation(l), this.enableStencil(r), 
            p !== g || b !== O || S !== y ? this.stencilFuncSeparate(p, b, S, g, O, y) : this.stencilFunc(p, b, S), 
            v !== m || M !== q || k !== A ? this.stencilOpSeparate(v, M, k, m, q, A) : this.stencilOp(v, M, k), 
            F !== w ? this.stencilMaskSeparate(F, w) : this.stencilMask(F), this.depthFunc(t.getParameter(2932)), 
            this.enableDepthTest(i), this.cullFace(t.getParameter(2885)), this.enableCullface(s), 
            this.frontFace(t.getParameter(2886)), this.enablePolygonOffset(a), this.polygonOffset(D, E), 
            this.enableScissor(h), this.scissor(P[0], P[1], P[2], P[3]), this.enableDither(n), 
            this.colorMask(C[0], C[1], C[2], C[3]), this.depthMask(R), this.blendColor(T[0], T[1], T[2], T[3]), 
            this.viewport(U[0], U[1], U[2], U[3]), this.depthRange(W[0], W[1]), this.lineWidth(B);
        },
        enableBlend: function(t) {
            return void 0 === t && (t = !0), this._dat[0] = 0 | t, this._set |= 1, this;
        },
        blendFunc: function(t, e) {
            return this._dat[3] = t, this._dat[2] = e, this._set = this._set & -4097 | 1024, 
            this;
        },
        blendFuncSeparate: function(t, e, s, i) {
            return this._dat[3] = t, this._dat[2] = e, this._dat[6] = s, this._dat[5] = i, this._set |= 5120, 
            this;
        },
        blendEquation: function(t) {
            return this._dat[1] = t, this._set = this._set & -2049 | 512, this;
        },
        blendEquationSeparate: function(t, e) {
            return this._dat[1] = t, this._dat[4] = e, this._set |= 2560, this;
        },
        blendColor: function(t, e, s, i) {
            return this._dat[40] = n(t), this._dat[41] = n(e), this._dat[42] = n(s), this._dat[43] = n(i), 
            this._set |= 67108864, this;
        },
        depthFunc: function(t) {
            return this._dat[8] = t, this._set |= 8192, this;
        },
        enableDepthTest: function(t) {
            return void 0 === t && (t = !0), this._dat[7] = 0 | t, this._set |= 4, this;
        },
        depthRange: function(t, s) {
            return this._dat[48] = e(t), this._dat[49] = e(s), this._set |= 268435456, this;
        },
        lineWidth: function(t) {
            return this._dat[50] = n(t), this._set |= 536870912, this;
        },
        cullFace: function(t) {
            return this._dat[10] = t, this._set |= 16384, this;
        },
        enableCullface: function(t) {
            return void 0 === t && (t = !0), this._dat[9] = 0 | t, this._set |= 2, this;
        },
        polygonOffset: function(t, e) {
            return this._dat[34] = n(t), this._dat[35] = n(e), this._set |= 8388608, this;
        },
        enablePolygonOffset: function(t) {
            return void 0 === t && (t = !0), this._dat[33] = 0 | t, this._set |= 16, this;
        },
        enableScissor: function(t) {
            return void 0 === t && (t = !0), this._dat[27] = 0 | t, this._set |= 128, this;
        },
        scissor: function(t, e, s, i) {
            return this._dat[28] = t, this._dat[29] = e, this._dat[30] = s, this._dat[31] = i, 
            this._set |= 4194304, this;
        },
        viewport: function(t, e, s, i) {
            return this._dat[44] = t, this._dat[45] = e, this._dat[46] = s, this._dat[47] = i, 
            this._set |= 134217728, this;
        },
        enableDither: function(t) {
            return void 0 === t && (t = !0), this._dat[32] = 0 | t, this._set |= 8, this;
        },
        depthMask: function(t) {
            return this._dat[39] = 0 | t, this._set |= 33554432, this;
        },
        colorMask: function(t, e, s, i) {
            var n = 0 | t | (0 | e) << 1 | (0 | s) << 2 | (0 | i) << 3;
            return this._dat[38] = n, this._set |= 16777216, this;
        },
        frontFace: function(t) {
            return this._dat[11] = t, this._set |= 32768, this;
        },
        enableStencil: function(t) {
            return void 0 === t && (t = !0), this._dat[12] = 0 | t, this._set |= 256, this;
        },
        stencilFunc: function(t, e, s) {
            return this._dat[13] = t, this._dat[14] = e, this._dat[15] = s, this._set = this._set & -524289 | 65536, 
            this;
        },
        stencilOp: function(t, e, s) {
            return this._dat[17] = t, this._dat[18] = e, this._dat[19] = s, this._set = this._set & -1048577 | 131072, 
            this;
        },
        stencilMask: function(t) {
            return this._dat[16] = t, this._set = this._set & -2097153 | 262144, this;
        },
        stencilFuncSeparate: function(t, e, s, i, n, a) {
            var h = this._dat;
            return h[13] = t, h[14] = e, h[15] = s, h[20] = i, h[21] = n, h[22] = a, this._set |= 589824, 
            this;
        },
        stencilOpSeparate: function(t, e, s, i, n, a) {
            var h = this._dat;
            return h[17] = t, h[18] = e, h[19] = s, h[24] = i, h[25] = n, h[26] = a, this._set |= 1179648, 
            this;
        },
        stencilMaskSeparate: function(t, e) {
            return this._dat[16] = t, this._dat[23] = e, this._set |= 2359296, this;
        }
    }, module.exports = a;
}();