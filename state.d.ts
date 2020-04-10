import GLConfig from './config';
import GLStack from './stack';
export default class GLState {
    readonly gl: WebGLRenderingContext;
    readonly cfgStack: GLStack;
    private _validCfg;
    static config(): GLConfig;
    constructor(gl: WebGLRenderingContext);
    push(cfg: GLConfig): void;
    pop(): void;
    apply(): void;
    now(cfg: GLConfig): void;
    config(): LocalConfig;
}
export declare class LocalConfig extends GLConfig {
    private readonly state;
    constructor(state: GLState);
    apply(): void;
}
