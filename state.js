var GLConfig = require( './config' ),
    GLStack = require( './stack' );


var _patch = new GLConfig();

function GLState( gl ){
  this.gl = gl;

  this.cfgStack = new GLStack();
  this.cfgStack.initFromGL( gl );

  this._validCfg = false;
}


GLState.config = function(){
  return new GLConfig();
};


GLState.prototype = {


  push : function( cfg ){
    this.cfgStack.push( cfg );
    this._validCfg = false;
  },


  pop : function() {
    this.cfgStack.pop();
    this._validCfg = false;
  },


  apply : function(){
    if( !this._validCfg ) {
      this.cfgStack.commit( _patch );
      _patch.setupGL( this.gl );
      this._validCfg = true;
    }
  },


  now : function( cfg ){
    this.push( cfg );
    this.apply();
    this.pop();
  },


  config : function() {
    return new LocalConfig( this );
  }


}


/**
 * LocalConfig
 *
 */

function LocalConfig( state ){
  GLConfig.call( this );
  this.state = state;
}

LocalConfig.prototype = Object.create( GLConfig.prototype );
LocalConfig.prototype.constructor = LocalConfig;

LocalConfig.prototype.apply = function(){
  this.state.now( this );
};


module.exports = GLState;
