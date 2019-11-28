"use strict";
const GLConfig = require("./config");
const GLStack = require("./stack");
const _patch = new GLConfig();
class GLState {
    constructor(gl) {
        this.gl = gl;
        this.cfgStack = new GLStack();
        this.cfgStack.initFromGL(gl);
        this._validCfg = false;
    }
    static config() {
        return new GLConfig();
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
            this.cfgStack.commit(_patch);
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
class LocalConfig extends GLConfig {
    constructor(state) {
        super();
        this.state = state;
    }
    apply() {
        this.state.now(this);
    }
    ;
}
module.exports = GLState;
