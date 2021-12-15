import GLConfig from './GLConfig';
import GLStack from './ConfigStack';
export default class GLState {
    readonly gl: WebGLRenderingContext;
    readonly cfgStack: GLStack;
    private _validCfg;
    private static _instances;
    static get(gl: WebGLRenderingContext): GLState;
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
