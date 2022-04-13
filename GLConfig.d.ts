declare const enum Slots {
    BLEND_ENABLE = 0,
    BLEND_EQ_C = 1,
    BLEND_FUNC_C_DST = 2,
    BLEND_FUNC_C_SRC = 3,
    BLEND_EQ_A = 4,
    BLEND_FUNC_A_DST = 5,
    BLEND_FUNC_A_SRC = 6,
    DEPTH_ENABLE = 7,
    DEPTH_FUNC = 8,
    CULL_FACE_ENABLE = 9,
    CULL_MODE = 10,
    FACE_DIR = 11,
    STENCIL_ENABLE = 12,
    STENCIL_FUNC = 13,
    STENCIL_REF = 14,
    STENCIL_VALUE_MASK = 15,
    STENCIL_WRITEMASK = 16,
    STENCIL_OP_FAIL = 17,
    STENCIL_OP_ZFAIL = 18,
    STENCIL_OP_ZPASS = 19,
    STENCIL_B_FUNC = 20,
    STENCIL_B_REF = 21,
    STENCIL_B_VALUE_MASK = 22,
    STENCIL_B_WRITEMASK = 23,
    STENCIL_B_OP_FAIL = 24,
    STENCIL_B_OP_ZFAIL = 25,
    STENCIL_B_OP_ZPASS = 26,
    SCISSOR_ENABLE = 27,
    SCISSOR_TEST_X = 28,
    SCISSOR_TEST_Y = 29,
    SCISSOR_TEST_W = 30,
    SCISSOR_TEST_H = 31,
    DITHER_ENABLE = 32,
    POLYOFF_ENABLE = 33,
    POLYOFF_FACTOR = 34,
    POLYOFF_UNITS = 35,
    COLOR_MASK = 38,
    DEPTH_MASK = 39,
    BLEND_COLOR_R = 40,
    BLEND_COLOR_G = 41,
    BLEND_COLOR_B = 42,
    BLEND_COLOR_A = 43,
    VIEWPORT_X = 44,
    VIEWPORT_Y = 45,
    VIEWPORT_W = 46,
    VIEWPORT_H = 47,
    DEPTH_RANGE_NEAR = 48,
    DEPTH_RANGE_FAR = 49,
    LINE_WIDTH = 50,
    LEN = 51
}
export declare const DAT_SIZE = Slots.LEN;
declare const enum SetsBits {
    BLEND_ENABLE_SET = 1,
    CULL_FACE_ENABLE_SET = 2,
    DEPTH_ENABLE_SET = 4,
    DITHER_ENABLE_SET = 8,
    POLYOFF_ENABLE_SET = 16,
    COVERAGE_ENABLE_SET = 32,
    ACOVERAGE_ENABLE_SET = 64,
    SCISSOR_ENABLE_SET = 128,
    STENCIL_ENABLE_SET = 256,
    BLEND_EQ_SET = 512,
    BLEND_FUNC_SET = 1024,
    BLEND_EQ_A_SET = 2048,
    BLEND_FUNC_A_SET = 4096,
    DEPTH_FUNC_SET = 8192,
    CULL_MODE_SET = 16384,
    FACE_DIR_SET = 32768,
    STENCIL_FUNC_SET = 65536,
    STENCIL_OP_SET = 131072,
    STENCIL_MASK_SET = 262144,
    STENCIL_B_FUNC_SET = 524288,
    STENCIL_B_OP_SET = 1048576,
    STENCIL_B_MASK_SET = 2097152,
    SCISSOR_TEST_SET = 4194304,
    POLYOFF_SET = 8388608,
    COLOR_MASK_SET = 16777216,
    DEPTH_MASK_SET = 33554432,
    BLEND_COLOR_SET = 67108864,
    VIEWPORT_SET = 134217728,
    DEPTH_RANGE_SET = 268435456,
    LINE_WIDTH_SET = 536870912
}
export declare const DAT_MASKS: readonly SetsBits[], _DEFAULT_SET: number, _DEFAULT_STATE: Uint16Array;
export default class GLConfig {
    static encodeHalf(f32: number): number;
    static decodeHalf(u16: number): number;
    readonly _dat: Uint16Array;
    _set: number;
    constructor();
    toDefault(): void;
    clone(): GLConfig;
    patch(cfg: GLConfig, out: GLConfig): void;
    setupGL(gl: WebGLRenderingContext): void;
    fromGL(gl: WebGLRenderingContext): void;
    enableBlend(flag?: boolean): this;
    blendFunc(src: GLenum, dst: GLenum): this;
    blendFuncSeparate(srcRgb: GLenum, dstRgb: GLenum, srcAlpha: GLenum, dstAlpha: GLenum): this;
    blendEquation(eq: GLenum): this;
    blendEquationSeparate(rgbEq: GLenum, alphaEq: GLenum): this;
    blendColor(r: number, g: number, b: number, a: number): this;
    depthFunc(func: GLenum): this;
    enableDepthTest(flag?: boolean): this;
    depthRange(near: number, far: number): this;
    lineWidth(w: number): this;
    cullFace(mode: GLenum): this;
    enableCullface(flag?: boolean): this;
    polygonOffset(polyOffsetFactor: number, polyOffsetUnits: number): this;
    enablePolygonOffset(flag?: boolean): this;
    enableScissor(flag?: boolean): this;
    scissor(x: number, y: number, w: number, h: number): this;
    viewport(x: number, y: number, w: number, h: number): this;
    enableDither(flag?: boolean): this;
    depthMask(flag: boolean): this;
    colorMask(r: boolean, g: boolean, b: boolean, a: boolean): this;
    frontFace(dir: GLenum): this;
    enableStencil(flag?: boolean): this;
    stencilFunc(func: GLenum, ref: number, mask: number): this;
    stencilOp(sfail: GLenum, dpfail: GLenum, dppass: GLenum): this;
    stencilMask(mask: number): this;
    stencilFuncSeparate(func: GLenum, ref: number, mask: number, funcback: GLenum, refback: number, maskback: number): this;
    stencilOpSeparate(sfail: GLenum, dpfail: GLenum, dppass: GLenum, sfailback: GLenum, dpfailback: GLenum, dppassback: GLenum): this;
    stencilMaskSeparate(mask: number, maskback: number): this;
}
export {};
