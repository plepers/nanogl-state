"use strict";
var _a;
const EHBuffer = new Float32Array(1);
const EHIBuffer = new Uint32Array(EHBuffer.buffer);
const DAT_MASKS = [
    1,
    512,
    1024,
    1024,
    2048,
    4096,
    4096,
    4,
    8192,
    2,
    16384,
    32768,
    256,
    65536,
    65536,
    65536,
    262144,
    131072,
    131072,
    131072,
    524288,
    524288,
    524288,
    2097152,
    1048576,
    1048576,
    1048576,
    128,
    4194304,
    4194304,
    4194304,
    4194304,
    8,
    16,
    8388608,
    8388608,
    32,
    64,
    16777216,
    33554432,
    67108864,
    67108864,
    67108864,
    67108864,
    134217728,
    134217728,
    134217728,
    134217728,
    268435456,
    268435456,
    536870912
], _DEFAULT_SET = (1 |
    2 |
    4 |
    8 |
    16 |
    128 |
    256 |
    512 |
    1024 |
    8192 |
    16384 |
    32768 |
    65536 |
    131072 |
    262144 |
    4194304 |
    8388608 |
    16777216 |
    33554432 |
    67108864 |
    268435456 |
    536870912), _DEFAULT_STATE = new Uint16Array([
    0,
    32774,
    0,
    1,
    0,
    0,
    0,
    0,
    513,
    0,
    1029,
    2305,
    0,
    519,
    0,
    65535,
    65535,
    7680,
    7680,
    7680,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0, 0, 0, 0,
    1,
    0,
    0,
    0,
    0,
    0,
    15,
    1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    encodeClampedFloat(0),
    encodeClampedFloat(1),
    encodeHalf(1),
]);
function _fixSet(set) {
    return (set |
        ((set & 4096) >>> 2) |
        ((set & 2048) >>> 2) |
        ((set & 524288) >>> 3) |
        ((set & 1048576) >>> 3) |
        ((set & 2097152) >>> 3));
}
function encodeClampedFloat(f) {
    return Math.round(f * 0xFFFF) | 0;
}
function decodeClampedFloat(s) {
    return (s / (+0xFFFF));
}
function decodeHalf(u16) {
    var exponent = (u16 & 0x7C00) >> 10, fraction = u16 & 0x03FF;
    return (u16 >> 15 ? -1 : 1) * (exponent ?
        (exponent === 0x1F ?
            fraction ? NaN : Infinity :
            Math.pow(2, exponent - 15) * (1 + fraction / 0x400)) :
        6.103515625e-5 * (fraction / 0x400));
}
function encodeHalf(f32) {
    EHBuffer[0] = f32;
    var fltInt32 = EHIBuffer[0];
    var fltInt16 = (fltInt32 >> 31) << 5;
    var tmp = (fltInt32 >> 23) & 0xff;
    tmp = (tmp - 0x70) & (((0x70 - tmp) >> 4) >> 27);
    fltInt16 = (fltInt16 | tmp) << 10;
    fltInt16 |= (fltInt32 >> 13) & 0x3ff;
    return fltInt16;
}
var getP = function (gl, p) {
    return gl.getParameter(p);
};
module.exports = (_a = class GLConfig {
        constructor() {
            this._dat = new Uint16Array(51);
            this._set = 0;
        }
        static encodeHalf(f32) {
            return encodeHalf(f32);
        }
        static decodeHalf(u16) {
            return decodeHalf(u16);
        }
        toDefault() {
            this._dat.set(_DEFAULT_STATE);
            this._set = _DEFAULT_SET | 0;
        }
        clone() {
            var res = new GLConfig();
            res._dat.set(this._dat);
            res._set = this._set;
            return res;
        }
        patch(cfg, out) {
            var ldat = this._dat, lset = this._set, sdat = cfg._dat, sset = cfg._set, odat = out._dat, oset = 0, sbit;
            for (var i = 0; i < (51 | 0); i++) {
                sbit = DAT_MASKS[i];
                if (0 !== (lset & sbit)) {
                    if ((0 === (sset & sbit)) || (ldat[i] !== sdat[i])) {
                        oset |= sbit;
                    }
                    sdat[i] = ldat[i];
                }
            }
            odat.set(sdat);
            cfg._set |= lset;
            out._set = _fixSet(oset);
        }
        setupGL(gl) {
            const set = this._set, dat = this._dat;
            let i;
            if ((set & 1) !== 0) {
                dat[0] ? gl.enable(3042) : gl.disable(3042);
            }
            i = set & (512 | 2048);
            if (i !== 0) {
                if (i === (512 | 2048))
                    gl.blendEquationSeparate(dat[1], dat[4]);
                else
                    gl.blendEquation(dat[1]);
            }
            i = set & (1024 | 4096);
            if (i !== 0) {
                if (i === (1024 | 4096))
                    gl.blendFuncSeparate(dat[3], dat[2], dat[6], dat[5]);
                else
                    gl.blendFunc(dat[3], dat[2]);
            }
            if ((set & 4) !== 0) {
                dat[7] ? gl.enable(2929) : gl.disable(2929);
            }
            if ((set & 8192) !== 0) {
                gl.depthFunc(dat[8]);
            }
            if ((set & 2) !== 0) {
                dat[9] ? gl.enable(2884) : gl.disable(2884);
            }
            if ((set & 16384) !== 0) {
                gl.cullFace(dat[10]);
            }
            if ((set & 32768) !== 0) {
                gl.frontFace(dat[11]);
            }
            if ((set & 536870912) !== 0) {
                gl.lineWidth(decodeHalf(dat[50]));
            }
            if ((set & 256) !== 0) {
                dat[12] ? gl.enable(2960) : gl.disable(2960);
            }
            i = set & (65536 | 524288);
            if (i !== 0) {
                if (i === (65536 | 524288)) {
                    gl.stencilFuncSeparate(1028, dat[13], dat[14], dat[15]);
                    gl.stencilFuncSeparate(1029, dat[20], dat[21], dat[22]);
                }
                else {
                    gl.stencilFunc(dat[13], dat[14], dat[15]);
                }
            }
            i = set & (131072 | 1048576);
            if (i !== 0) {
                if (i === (131072 | 1048576)) {
                    gl.stencilOpSeparate(1028, dat[17], dat[18], dat[19]);
                    gl.stencilOpSeparate(1029, dat[24], dat[25], dat[26]);
                }
                else {
                    gl.stencilOp(dat[17], dat[18], dat[19]);
                }
            }
            i = set & (262144 | 2097152);
            if (i !== 0) {
                if (i === (262144 | 2097152)) {
                    gl.stencilMaskSeparate(1028, dat[16]);
                    gl.stencilMaskSeparate(1029, dat[23]);
                }
                else {
                    gl.stencilMask(dat[16]);
                }
            }
            if ((set & 16777216) !== 0) {
                var flags = dat[38];
                gl.colorMask((flags & 1) === 1, (flags & 2) === 2, (flags & 4) === 4, (flags & 8) === 8);
            }
            if ((set & 33554432) !== 0) {
                gl.depthMask(dat[39] === 1);
            }
            if ((set & 67108864) !== 0) {
                gl.blendColor(decodeHalf(dat[40]), decodeHalf(dat[41]), decodeHalf(dat[42]), decodeHalf(dat[43]));
            }
            if ((set & 128) !== 0) {
                dat[27] ? gl.enable(3089) : gl.disable(3089);
            }
            if ((set & 4194304) !== 0) {
                gl.scissor(dat[28], dat[29], dat[30], dat[31]);
            }
            if ((set & 134217728) !== 0) {
                gl.viewport(dat[44], dat[45], dat[46], dat[47]);
            }
            if ((set & 16) !== 0) {
                dat[33] ? gl.enable(32823) : gl.disable(32823);
            }
            if ((set & 8388608) !== 0) {
                gl.polygonOffset(decodeHalf(dat[34]), decodeHalf(dat[35]));
            }
            if ((set & 268435456) !== 0) {
                gl.depthRange(decodeClampedFloat(dat[48]), decodeClampedFloat(dat[49]));
            }
        }
        fromGL(gl) {
            this._set = 0;
            const enableBlend = getP(gl, 3042), enableCullface = getP(gl, 2884), enableDepthTest = getP(gl, 2929), enableDither = getP(gl, 3024), enablePolyOffset = getP(gl, 32823), enableScissor = getP(gl, 3089), enableStencil = getP(gl, 2960), blendSrcRGB = getP(gl, 32969), blendDstRGB = getP(gl, 32968), blendSrcAlpha = getP(gl, 32971), blendDstAlpha = getP(gl, 32970), blendEqRgb = getP(gl, 32777), blendEqAlpha = getP(gl, 34877), stencilFunc = getP(gl, 2962), stencilRef = getP(gl, 2967), stencilValueMask = getP(gl, 2963), stencilWriteMask = getP(gl, 2968), stencilOpFail = getP(gl, 2964), stencilOpZfail = getP(gl, 2965), stencilOpZpass = getP(gl, 2966), stencilBFunc = getP(gl, 34816), stencilBRef = getP(gl, 36003), stencilBValueMask = getP(gl, 36004), stencilBWriteMask = getP(gl, 36005), stencilBOpFail = getP(gl, 34817), stencilBOpZfail = getP(gl, 34818), stencilBOpZpass = getP(gl, 34819), polyOffsetFactor = getP(gl, 32824), polyOffsetUnits = getP(gl, 10752), scissorBox = getP(gl, 3088), colorMaskArray = getP(gl, 3107), depthWriteMask = getP(gl, 2930), blendColor = getP(gl, 32773), viewport = getP(gl, 2978), depthRange = getP(gl, 2928), lineWidth = getP(gl, 2849);
            this.enableBlend(enableBlend);
            if (blendSrcRGB !== blendSrcAlpha || blendDstRGB !== blendDstAlpha) {
                this.blendFuncSeparate(blendSrcRGB, blendDstRGB, blendSrcAlpha, blendDstAlpha);
            }
            else {
                this.blendFunc(blendSrcRGB, blendDstRGB);
            }
            if (blendEqRgb !== blendEqAlpha) {
                this.blendEquationSeparate(blendEqRgb, blendEqAlpha);
            }
            else {
                this.blendEquation(blendEqRgb);
            }
            this.enableStencil(enableStencil);
            if (stencilFunc !== stencilBFunc ||
                stencilRef !== stencilBRef ||
                stencilValueMask !== stencilBValueMask) {
                this.stencilFuncSeparate(stencilFunc, stencilRef, stencilValueMask, stencilBFunc, stencilBRef, stencilBValueMask);
            }
            else {
                this.stencilFunc(stencilFunc, stencilRef, stencilValueMask);
            }
            if (stencilOpFail !== stencilBOpFail ||
                stencilOpZfail !== stencilBOpZfail ||
                stencilOpZpass !== stencilBOpZpass) {
                this.stencilOpSeparate(stencilOpFail, stencilOpZfail, stencilOpZpass, stencilBOpFail, stencilBOpZfail, stencilBOpZpass);
            }
            else {
                this.stencilOp(stencilOpFail, stencilOpZfail, stencilOpZpass);
            }
            if (stencilWriteMask !== stencilBWriteMask) {
                this.stencilMaskSeparate(stencilWriteMask, stencilBWriteMask);
            }
            else {
                this.stencilMask(stencilWriteMask);
            }
            this.depthFunc(gl.getParameter(2932));
            this.enableDepthTest(enableDepthTest);
            this.cullFace(gl.getParameter(2885));
            this.enableCullface(enableCullface);
            this.frontFace(gl.getParameter(2886));
            this.enablePolygonOffset(enablePolyOffset);
            this.polygonOffset(polyOffsetFactor, polyOffsetUnits);
            this.enableScissor(enableScissor);
            this.scissor(scissorBox[0], scissorBox[1], scissorBox[2], scissorBox[3]);
            this.enableDither(enableDither);
            this.colorMask(colorMaskArray[0], colorMaskArray[1], colorMaskArray[2], colorMaskArray[3]);
            this.depthMask(depthWriteMask);
            this.blendColor(blendColor[0], blendColor[1], blendColor[2], blendColor[3]);
            this.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
            this.depthRange(depthRange[0], depthRange[1]);
            this.lineWidth(lineWidth);
        }
        enableBlend(flag = true) {
            this._dat[0] = +flag;
            this._set |= 1 | 0;
            return this;
        }
        blendFunc(src, dst) {
            this._dat[3] = src;
            this._dat[2] = dst;
            this._set = this._set & ~4096 | (1024);
            return this;
        }
        blendFuncSeparate(srcRgb, dstRgb, srcAlpha, dstAlpha) {
            this._dat[3] = srcRgb;
            this._dat[2] = dstRgb;
            this._dat[6] = srcAlpha;
            this._dat[5] = dstAlpha;
            this._set |= 1024 | 4096;
            return this;
        }
        blendEquation(eq) {
            this._dat[1] = eq;
            this._set = this._set & ~2048 | (512);
            return this;
        }
        blendEquationSeparate(rgbEq, alphaEq) {
            this._dat[1] = rgbEq;
            this._dat[4] = alphaEq;
            this._set |= 512 | 2048;
            return this;
        }
        blendColor(r, g, b, a) {
            this._dat[40] = encodeHalf(r);
            this._dat[41] = encodeHalf(g);
            this._dat[42] = encodeHalf(b);
            this._dat[43] = encodeHalf(a);
            this._set |= 67108864 | 0;
            return this;
        }
        depthFunc(func) {
            this._dat[8] = func;
            this._set |= 8192 | 0;
            return this;
        }
        enableDepthTest(flag = true) {
            this._dat[7] = +flag;
            this._set |= 4 | 0;
            return this;
        }
        depthRange(near, far) {
            this._dat[48] = encodeClampedFloat(near);
            this._dat[49] = encodeClampedFloat(far);
            this._set |= 268435456 | 0;
            return this;
        }
        lineWidth(w) {
            this._dat[50] = encodeHalf(w);
            this._set |= 536870912 | 0;
            return this;
        }
        cullFace(mode) {
            this._dat[10] = mode;
            this._set |= 16384 | 0;
            return this;
        }
        enableCullface(flag) {
            if (flag === undefined)
                flag = true;
            this._dat[9] = +flag;
            this._set |= 2 | 0;
            return this;
        }
        polygonOffset(polyOffsetFactor, polyOffsetUnits) {
            this._dat[34] = encodeHalf(polyOffsetFactor);
            this._dat[35] = encodeHalf(polyOffsetUnits);
            this._set |= 8388608 | 0;
            return this;
        }
        enablePolygonOffset(flag = true) {
            this._dat[33] = +flag;
            this._set |= 16 | 0;
            return this;
        }
        enableScissor(flag = true) {
            this._dat[27] = +flag;
            this._set |= 128 | 0;
            return this;
        }
        scissor(x, y, w, h) {
            this._dat[28] = x;
            this._dat[29] = y;
            this._dat[30] = w;
            this._dat[31] = h;
            this._set |= 4194304 | 0;
            return this;
        }
        viewport(x, y, w, h) {
            this._dat[44] = x;
            this._dat[45] = y;
            this._dat[46] = w;
            this._dat[47] = h;
            this._set |= 134217728 | 0;
            return this;
        }
        enableDither(flag = true) {
            this._dat[32] = +flag;
            this._set |= 8 | 0;
            return this;
        }
        depthMask(flag) {
            this._dat[39] = +flag;
            this._set |= 33554432 | 0;
            return this;
        }
        colorMask(r, g, b, a) {
            var mask = (r | 0) |
                ((g | 0) << 1) |
                ((b | 0) << 2) |
                ((a | 0) << 3);
            this._dat[38] = mask;
            this._set |= 16777216 | 0;
            return this;
        }
        frontFace(dir) {
            this._dat[11] = dir;
            this._set |= 32768 | 0;
            return this;
        }
        enableStencil(flag = true) {
            this._dat[12] = +flag;
            this._set |= 256 | 0;
            return this;
        }
        stencilFunc(func, ref, mask) {
            this._dat[13] = func;
            this._dat[14] = ref;
            this._dat[15] = mask;
            this._set = this._set & ~524288 | (65536);
            return this;
        }
        stencilOp(sfail, dpfail, dppass) {
            this._dat[17] = sfail;
            this._dat[18] = dpfail;
            this._dat[19] = dppass;
            this._set = this._set & ~1048576 | (131072);
            return this;
        }
        stencilMask(mask) {
            this._dat[16] = mask;
            this._set = (this._set & ~2097152) | (262144);
            return this;
        }
        stencilFuncSeparate(func, ref, mask, funcback, refback, maskback) {
            var dat = this._dat;
            dat[13] = func;
            dat[14] = ref;
            dat[15] = mask;
            dat[20] = funcback;
            dat[21] = refback;
            dat[22] = maskback;
            this._set |= 524288 | 65536;
            return this;
        }
        stencilOpSeparate(sfail, dpfail, dppass, sfailback, dpfailback, dppassback) {
            var dat = this._dat;
            dat[17] = sfail;
            dat[18] = dpfail;
            dat[19] = dppass;
            dat[24] = sfailback;
            dat[25] = dpfailback;
            dat[26] = dppassback;
            this._set |= 1048576 | 131072;
            return this;
        }
        stencilMaskSeparate(mask, maskback) {
            this._dat[16] = mask;
            this._dat[23] = maskback;
            this._set |= 2097152 | 262144;
            return this;
        }
    },
    _a.DAT_MASKS = DAT_MASKS,
    _a);
