import GLState from '../state'

var expect  = require( 'expect.js' );


function assertNoError(){
  expect( gl.getError() ).to.equal( 0 );
}

function createContext() {
  var cvs = document.createElement( 'canvas' );
  cvs.width = cvs.height = 16;
  var gl;
  if( __karma__.config.webgl_version===2 ){
    gl = cvs.getContext( 'webgl2' )
  }
  else
    gl = cvs.getContext( 'webgl') || cvs.getContext( 'experimental-webgl' );
  
  gl.scissor( 0, 0, 0, 0 ); // normalize
  return gl;
}


var gl = createContext();

describe( "GLState", function(){


  it( "should build correctly", function(){

    var state = new GLState( gl );
    assertNoError();

  });


  it( " makeConfig", function(){
    var cfg = GLState.config();
    assertNoError();
    expect( cfg ).to.be.ok()
  });

  it( " push", function(){
    var cfg = GLState.config();
    var state = new GLState( gl );
    state.push( cfg );
    assertNoError();
  });


  it( " apply", function(){
    var cfg = GLState.config().enableBlend();
    var state = new GLState( gl );
    state.push( cfg );
    state.apply();
    assertNoError();
  });


  it( " pop", function(){
    var cfg = GLState.config().enableBlend();
    var state = new GLState( gl );
    state.push( cfg );
    state.pop();
    assertNoError();
  });

  it( " now", function(){
    var cfg = GLState.config().enableBlend();
    var state = new GLState( gl );
    state.now( cfg );
    assertNoError();
  });

});
