import GLConfig from './GLConfig';
declare class ConfigStack {
    private _stack;
    private _sets;
    private _size;
    private _ptr;
    private _headPos;
    private readonly _wcfg;
    constructor();
    initFromGL(gl: WebGLRenderingContext): void;
    push(cfg: GLConfig): void;
    pop(): void;
    flush(): void;
    commit(patch: GLConfig): void;
    patch(cfg: GLConfig, out: GLConfig): void;
    copyConfig(at: number, cfg: GLConfig): void;
    private _grow;
}
export default ConfigStack;
