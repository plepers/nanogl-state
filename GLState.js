import GLConfig from './GLConfig';
import GLStack from './ConfigStack';
const _patch = new GLConfig();
const _head = new GLConfig();
export default class GLState {
    static get(gl) {
        let res = this._instances.get(gl);
        if (!res) {
            res = new GLState(gl);
            this._instances.set(gl, res);
        }
        return res;
    }
    constructor(gl) {
        this._state = new GLConfig();
        this.gl = gl;
        this.cfgStack = new GLStack();
        this.cfgStack.initFromGL(gl);
        this.cfgStack.copyConfig(0, this._state);
        this._validCfg = false;
    }
    push(cfg) {
        this.cfgStack.push(cfg);
        this._validCfg = false;
    }
    pop() {
        this.cfgStack.pop();
        this._validCfg = false;
    }
    apply() {
        if (!this._validCfg) {
            this.cfgStack.commit(_head);
            _head.patch(this._state, _patch);
            _patch.setupGL(this.gl);
            this._validCfg = true;
        }
    }
    now(cfg) {
        this.push(cfg);
        this.apply();
        this.pop();
    }
    config() {
        return new LocalConfig(this);
    }
}
GLState._instances = new WeakMap();
export class LocalConfig extends GLConfig {
    constructor(state) {
        super();
        this.state = state;
    }
    apply() {
        this.state.now(this);
    }
}
