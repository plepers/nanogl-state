import GLConfig from './GLConfig'
import GLStack  from './ConfigStack'



const _patch = new GLConfig();
const _head = new GLConfig();

/**
 * This class manages the webgl state.
 *
 * It is used to manage a stack of GLConfigs and apply the current state to the webgl context.
 */
export default class GLState {
  /** The webgl context this GLState belongs to */
  readonly gl: WebGLRenderingContext;
  /** The config stack managing all GLConfigs */
  readonly cfgStack: GLStack;
  /** Whether the config stack has been changed or not */
  private _validCfg: boolean;
  /** The current config */
  private readonly _state = new GLConfig();

  /** The list of every GLState instance created, indexed by the corresponding webgl context */
  private static _instances = new WeakMap<WebGLRenderingContext, GLState>()

  /**
   * Create a GLState instance or return the existing one for given webgl context.
   * @param {WebGLRenderingContext} gl  The webgl context
   */
  static get( gl:WebGLRenderingContext ): GLState {
    let res = this._instances.get( gl )
    if( !res ){
      res = new GLState(gl)
      this._instances.set( gl, res )
    }
    return res
  }

  /**
   * @param {WebGLRenderingContext} gl The webgl context this GLState belongs to
   */
  constructor( gl:WebGLRenderingContext ){
    this.gl = gl;

    this.cfgStack = new GLStack();
    this.cfgStack.initFromGL( gl );
    this.cfgStack.copyConfig( 0, this._state );

    this._validCfg = false;
  }



  /**
   * Push a config to the stack.
   * @param {GLConfig} cfg The config to push
   */
  push( cfg : GLConfig ){
    this.cfgStack.push( cfg );
    this._validCfg = false;
  }

  /**
   * Remove the last config from the stack.
   */
  pop() {
    this.cfgStack.pop();
    this._validCfg = false;
  }

  /**
   * Apply the current stack state to the webgl context.
   */
  apply(){
    if( !this._validCfg ) {
      this.cfgStack.commit( _head );
      _head.patch( this._state, _patch );
      _patch.setupGL( this.gl );
      this._validCfg = true;
    }
  }

  /**
   * Apply a config to the webgl context immediatly.
   * @param {GLConfig} cfg The config to apply
   */
  now( cfg : GLConfig ){
    this.push( cfg );
    this.apply();
    this.pop();
  }

  /**
   * Create a LocalConfig from this GLState.
   */
  config() {
    return new LocalConfig( this );
  }


}

/**
 * This class manages local configs.
 *
 * It can be used for configs that will be applied directly,
 * and not pushed to the stack.
 */

export class LocalConfig extends GLConfig {
  /** The GLState for the webgl context this config belongs to */
  private readonly state: GLState;

  /**
   * @param {GLState} state The GLState for the webgl context this config belongs to
   */
  constructor( state : GLState ){
    super();
    this.state = state;
  }

  apply(){
    this.state.now( this );
  }

}
