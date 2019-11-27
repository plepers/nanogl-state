import GLConfig from "./config";
import GLStack from "./stack";



const _patch = new GLConfig();


export default class GLState {
  
  gl: WebGLRenderingContext;
  cfgStack: GLStack;
  _validCfg: boolean;


  static config(){
    return new GLConfig();
  }


  constructor( gl:WebGLRenderingContext ){
    this.gl = gl;

    this.cfgStack = new GLStack();
    this.cfgStack.initFromGL( gl );

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
      this.cfgStack.commit( _patch );
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

class LocalConfig extends GLConfig {

  state: GLState;

  constructor( state : GLState ){
    super();
    this.state = state;
  }
  
  apply(){
    this.state.now( this );
  };
  
}



