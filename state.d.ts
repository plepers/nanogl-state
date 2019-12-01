import GLConfig from './config';
import GLStack from './stack';
export default class GLState {
    gl: WebGLRenderingContext;
    cfgStack: GLStack;
    _validCfg: boolean;
    static config(): GLConfig;
    constructor(gl: WebGLRenderingContext);
    push(cfg: GLConfig): void;
    pop(): void;
    apply(): void;
    now(cfg: GLConfig): void;
    config(): LocalConfig;
}
export declare class LocalConfig extends GLConfig {
    state: GLState;
    constructor(state: GLState);
    apply(): void;
}
