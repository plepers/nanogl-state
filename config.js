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
        d[0] = t;
        var e = o[0], s = e >> 31 << 5, i = e >> 23 & 255;
        return i = i - 112 & 112 - i >> 4 >> 27, s = (s | i) << 10, s |= e >> 13 & 1023;
    }
    function a() {
        this._dat = new Uint16Array(51), this._set = 0;
    }
    var h = [ 1, 512, 1024, 1024, 2048, 4096, 4096, 4, 8192, 2, 16384, 32768, 256, 65536, 65536, 65536, 262144, 131072, 131072, 131072, 524288, 524288, 524288, 2097152, 1048576, 1048576, 1048576, 128, 4194304, 4194304, 4194304, 4194304, 8, 16, 8388608, 8388608, 32, 64, 16777216, 33554432, 67108864, 67108864, 67108864, 67108864, 134217728, 134217728, 134217728, 134217728, 268435456, 268435456, 536870912 ], c = 935847839, _ = new Uint16Array([ 0, 32774, 0, 1, 0, 0, 0, 0, 513, 0, 1029, 2305, 0, 519, 0, 65535, 65535, 7680, 7680, 7680, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 15, 1, 0, 0, 0, 0, 0, 0, 0, 0, e(0), e(1), e(1) ]), d = new Float32Array(1), o = new Uint32Array(d.buffer), l = function(t, e) {
        return t.getParameter(e);
    };
    a.DAT_MASKS = h, a.encodeHalf = function(t) {
        return n(t);
    }, a.decodeHalf = function(t) {
        return i(t);
    }, a.prototype = {
        toDefault: function() {
            this._dat.set(_), this._set = 0 | c;
        },
        clone: function() {
            var t = new a();
            return t._dat.set(this._dat), t._set = this._set, t;
        },
        patch: function(e, s) {
            for (var i, n = this._dat, a = this._set, c = e._dat, _ = e._set, d = s._dat, o = 0, l = 0; 51 > l; l++) i = h[l], 
            0 !== (a & i) && ((0 === (_ & i) || n[l] !== c[l]) && (o |= i), c[l] = n[l]);
            d.set(c), e._set |= a, s._set = t(o);
        },
        setupGL: function(t) {
            var e, n = this._set, a = this._dat;
            if (1 === (1 & n) && (a[0] ? t.enable(3042) : t.disable(3042)), e = 2560 & n, 0 !== e && (2560 === e ? t.blendEquationSeparate(a[1], a[4]) : t.blendEquation(a[1])), 
            e = 5120 & n, 0 !== e && (5120 === e ? t.blendFuncSeparate(a[3], a[2], a[6], a[5]) : t.blendFunc(a[3], a[2])), 
            4 & n && (a[7] ? t.enable(2929) : t.disable(2929)), 8192 & n && t.depthFunc(a[8]), 
            2 & n && (a[9] ? t.enable(2884) : t.disable(2884)), 16384 & n && t.cullFace(a[10]), 
            32768 & n && t.frontFace(a[11]), 256 & n && (a[12] ? t.enable(2960) : t.disable(2960)), 
            e = 589824 & n, 0 !== e && (589824 === e ? (t.stencilFuncSeparate(1028, a[13], a[14], a[15]), 
            t.stencilFuncSeparate(1029, a[20], a[21], a[22])) : t.stencilFunc(a[13], a[14], a[15])), 
            e = 1179648 & n, 0 !== e && (1179648 === e ? (t.stencilOpSeparate(1028, a[17], a[18], a[19]), 
            t.stencilOpSeparate(1029, a[24], a[25], a[26])) : t.stencilOp(a[17], a[18], a[19])), 
            e = 2359296 & n, 0 !== e && (2359296 === e ? (t.stencilMaskSeparate(1028, a[16]), 
            t.stencilMaskSeparate(1029, a[23])) : t.stencilMask(a[16])), 16777216 & n) {
                var h = a[38];
                t.colorMask(1 === (1 & h), 2 === (2 & h), 4 === (4 & h), 8 === (8 & h));
            }
            33554432 & n && t.depthMask(1 === a[39]), 67108864 & n && t.blendColor(i(a[40]), i(a[41]), i(a[42]), i(a[43])), 
            128 & n && (a[27] ? t.enable(3089) : t.disable(3089)), 4194304 & n && t.scissor(a[28], a[29], a[30], a[31]), 
            134217728 & n && t.viewport(a[44], a[45], a[46], a[47]), 8388608 & n && t.polygonOffset(i(a[34]), i(a[35])), 
            268435456 & n && t.depthRange(s(a[48]), s(a[49]));
        },
        fromGL: function(t) {
            this._set = 0;
            var e = l(t, 3042), s = l(t, 2884), i = l(t, 2929), n = l(t, 3024), a = l(t, 32823), h = l(t, 3089), c = l(t, 2960), _ = l(t, 32969), d = l(t, 32968), o = l(t, 32971), r = l(t, 32970), u = l(t, 32777), f = l(t, 34877), p = l(t, 2962), b = l(t, 2967), S = l(t, 2963), F = l(t, 2968), M = l(t, 2964), v = l(t, 2965), k = l(t, 2966), g = l(t, 34816), O = l(t, 36003), y = l(t, 36004), w = l(t, 36005), m = l(t, 34817), q = l(t, 34818), A = l(t, 34819), D = l(t, 32824), E = l(t, 10752), P = l(t, 3088), C = l(t, 3107), R = l(t, 2930), T = l(t, 32773), U = l(t, 2978), B = l(t, 2928), G = l(t, 2849);
            this.enableBlend(e), _ !== o || d !== r ? this.blendFuncSeparate(_, d, o, r) : this.blendFunc(_, d), 
            u !== f ? this.blendEquationSeparate(u, f) : this.blendEquation(u), this.enableStencil(c), 
            p !== g || b !== O || S !== y ? this.stencilFuncSeparate(p, b, S, g, O, y) : this.stencilFunc(p, b, S), 
            M !== m || v !== q || k !== A ? this.stencilOpSeparate(M, v, k, m, q, A) : this.stencilOp(M, v, k), 
            F !== w ? this.stencilMaskSeparate(F, w) : this.stencilMask(F), this.depthFunc(t.getParameter(2932)), 
            this.enableDepthTest(i), this.cullFace(t.getParameter(2885)), this.enableCullface(s), 
            this.frontFace(t.getParameter(2886)), this.enablePolygonOffset(a), this.polygonOffset(D, E), 
            this.enableScissor(h), this.scissor(P[0], P[1], P[2], P[3]), this.enableDither(n), 
            this.colorMask(C[0], C[1], C[2], C[3]), this.depthMask(R), this.blendColor(T[0], T[1], T[2], T[3]), 
            this.viewport(U[0], U[1], U[2], U[3]), this.depthRange(B[0], B[1]), this.lineWidth(G);
        },
        enableBlend: function(t) {
            this._dat[0] = 0 | t, this._set |= 1;
        },
        blendFunc: function(t, e) {
            this._dat[3] = t, this._dat[2] = e, this._set = -4097 & this._set | 1024;
        },
        blendFuncSeparate: function(t, e, s, i) {
            this._dat[3] = t, this._dat[2] = e, this._dat[6] = s, this._dat[5] = i, this._set |= 5120;
        },
        blendEquation: function(t) {
            this._dat[1] = t, this._set = -2049 & this._set | 512;
        },
        blendEquationSeparate: function(t, e) {
            this._dat[1] = t, this._dat[4] = e, this._set |= 2560;
        },
        blendColor: function(t, e, s, i) {
            this._dat[40] = n(t), this._dat[41] = n(e), this._dat[42] = n(s), this._dat[43] = n(i), 
            this._set |= 67108864;
        },
        depthFunc: function(t) {
            this._dat[8] = t, this._set |= 8192;
        },
        enableDepthTest: function(t) {
            this._dat[7] = 0 | t, this._set |= 4;
        },
        depthRange: function(t, s) {
            this._dat[48] = e(t), this._dat[49] = e(s), this._set |= 268435456;
        },
        lineWidth: function(t) {
            this._dat[50] = e(t), this._set |= 536870912;
        },
        cullFace: function(t) {
            this._dat[10] = t, this._set |= 16384;
        },
        enableCullface: function(t) {
            this._dat[9] = 0 | t, this._set |= 2;
        },
        polygonOffset: function(t, e) {
            this._dat[34] = n(t), this._dat[35] = n(e), this._set |= 8388608;
        },
        enablePolygonOffset: function(t) {
            this._dat[33] = 0 | t, this._set |= 16;
        },
        enableScissor: function(t) {
            this._dat[27] = 0 | t, this._set |= 128;
        },
        scissor: function(t, e, s, i) {
            this._dat[28] = t, this._dat[29] = e, this._dat[30] = s, this._dat[31] = i, this._set |= 4194304;
        },
        viewport: function(t, e, s, i) {
            this._dat[44] = t, this._dat[45] = e, this._dat[46] = s, this._dat[47] = i, this._set |= 134217728;
        },
        enableDither: function(t) {
            this._dat[32] = 0 | t, this._set |= 8;
        },
        depthMask: function(t) {
            this._dat[39] = 0 | t, this._set |= 33554432;
        },
        colorMask: function(t, e, s, i) {
            var n = 0 | t | (0 | e) << 1 | (0 | s) << 2 | (0 | i) << 3;
            this._dat[38] = n, this._set |= 16777216;
        },
        frontFace: function(t) {
            this._dat[11] = t, this._set |= 32768;
        },
        enableStencil: function(t) {
            this._dat[12] = 0 | t, this._set |= 256;
        },
        stencilFunc: function(t, e, s) {
            this._dat[13] = t, this._dat[14] = e, this._dat[15] = s, this._set = -524289 & this._set | 65536;
        },
        stencilOp: function(t, e, s) {
            this._dat[17] = t, this._dat[18] = e, this._dat[19] = s, this._set = -1048577 & this._set | 131072;
        },
        stencilMask: function(t) {
            this._dat[16] = t, this._set = -2097153 & this._set | 262144;
        },
        stencilFuncSeparate: function(t, e, s, i, n, a) {
            var h = this._dat;
            h[13] = t, h[14] = e, h[15] = s, h[20] = i, h[21] = n, h[22] = a, this._set |= 589824;
        },
        stencilOpSeparate: function(t, e, s, i, n, a) {
            var h = this._dat;
            h[17] = t, h[18] = e, h[19] = s, h[24] = i, h[25] = n, h[26] = a, this._set |= 1179648;
        },
        stencilMaskSeparate: function(t, e) {
            this._dat[16] = t, this._dat[23] = e, this._set |= 2359296;
        }
    }, module.exports = a;
}();