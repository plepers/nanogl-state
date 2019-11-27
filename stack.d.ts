import GLConfig = require('./config');
declare const _default: {
    new (): {
        _stack: Uint32Array;
        _sets: Uint32Array;
        _size: number;
        _ptr: number;
        _headPos: number;
        _wcfg: GLConfig;
        initFromGL(gl: WebGLRenderingContext): void;
        push(cfg: GLConfig): void;
        pop(): void;
        flush(): void;
        commit(patch: GLConfig): void;
        patch(cfg: GLConfig, out: GLConfig): void;
        copyConfig(at: number, cfg: GLConfig): void;
        _grow(): void;
    };
};
export = _default;
