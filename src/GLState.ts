import GLConfig from './GLConfig'
import GLStack  from './ConfigStack'



const _patch = new GLConfig();
const _head = new GLConfig();


export default class GLState {
  
  readonly gl: WebGLRenderingContext;
  readonly cfgStack: GLStack;
  private _validCfg: boolean;
  private readonly _state = new GLConfig();
  
  private static _instances = new WeakMap<WebGLRenderingContext, GLState>()

  static get( gl:WebGLRenderingContext ): GLState {
    let res = this._instances.get( gl )
    if( !res ){
      res = new GLState(gl)
      this._instances.set( gl, res )
    }
    return res
  }


  constructor( gl:WebGLRenderingContext ){
    this.gl = gl;

    this.cfgStack = new GLStack();
    this.cfgStack.initFromGL( gl );
    this.cfgStack.copyConfig( 0, this._state );

    this._validCfg = false;
  }




  push( cfg : GLConfig ){
    this.cfgStack.push( cfg );
    this._validCfg = false;
  }


  pop() {
    this.cfgStack.pop();
    this._validCfg = false;
  }


  apply(){
    if( !this._validCfg ) {
      this.cfgStack.commit( _head );
      _head.patch( this._state, _patch );
      _patch.setupGL( this.gl );
      this._validCfg = true;
    }
  }


  now( cfg : GLConfig ){
    this.push( cfg );
    this.apply();
    this.pop();
  }


  config() {
    return new LocalConfig( this );
  }


}

/**
 * LocalConfig
 *
 */

export class LocalConfig extends GLConfig {

  private readonly state: GLState;

  constructor( state : GLState ){
    super();
    this.state = state;
  }
  
  apply(){
    this.state.now( this );
  }
  
}




