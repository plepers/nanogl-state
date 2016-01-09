var GLState = require( '../state' )

var expect = require( 'expect.js' ),
    aequal = require( './utils/aequal.js' ),
    sinon  = require( 'sinon' );


var defaultCfg, gl;


function bin( str ){
  return parseInt( str, 2 );
};


function equalConfig( cfgA, cfgB ){
  aequal( cfgA._dat, cfgB._dat );
  expect( cfgA._set ).to.be.equal( cfgB._set );
};


function getComplexConfig(){
  var cfg = new GLState();

  cfg.blendEquationSeparate(
    gl.FUNC_SUBTRACT,
    gl.FUNC_REVERSE_SUBTRACT
  );

  cfg.blendFuncSeparate(
    gl.SRC_ALPHA,
    gl.ONE_MINUS_SRC_ALPHA,
    gl.SRC_COLOR,
    gl.ONE_MINUS_SRC_COLOR
  );

  cfg.depthFunc( gl.ALWAYS );

  cfg.cullFace( gl.FRONT );
  cfg.frontFace( gl.CW );


  cfg.stencilMaskSeparate( 8, 16 );
  cfg.stencilOpSeparate( gl.DECR_WRAP, gl.REPLACE, gl.INVERT, gl.INVERT, gl.DECR_WRAP, gl.REPLACE );
  cfg.stencilFuncSeparate( gl.GEQUAL, 40, 5, gl.NOTEQUAL, 20, 22 );

  return cfg;
}


function getHead( stack ){
  var head = new GLState();
  stack.copyConfig( stack._ptr, head );
  return head;
}

describe( "gl - GLStateStack", function(){

  beforeEach(function(){

    var cvs = document.createElement( 'canvas' );
    gl = cvs.getContext( 'webgl' ) || cvs.getContext( 'experimental-webgl' );
    gl.scissor( 0, 0, 0, 0 ); // normalize

    stack = GLState.makeStack();
    defaultCfg = new GLState();
    defaultCfg.toDefault();

  })

  describe( "push", function(){


    it( "first config should set head to this config", function(){

      var cfg = getComplexConfig();

      stack.push( cfg );

      var head = getHead( stack );

      equalConfig( head, cfg );

    });

    it( "should setup head datas with diffs", function(){

      stack.push( defaultCfg );

      var cfg = new GLState();
      cfg.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

      stack.push( cfg );

      var head =  getHead( stack );


      expect( head._dat[1] ).to.be.equal( gl.FUNC_ADD );
      expect( head._dat[2] ).to.be.equal( gl.ONE_MINUS_SRC_ALPHA );
      expect( head._dat[3] ).to.be.equal( gl.SRC_ALPHA );

    });

    it( "empty configs should give empty head", function(){

      stack.push( new GLState() );
      stack.push( new GLState() );
      stack.push( new GLState() );
      var head =  getHead( stack );


      expect( head._set ).to.be.equal( 0 );

    });

    it( "should add head set with pushed sets", function(){

      stack.push( defaultCfg );

      var cfg = new GLState();
      cfg.stencilFunc( gl.GEQUAL, 0, 5 );

      stack.push( cfg );

      var head =  getHead( stack );
      expect( head._set ).to.be.equal( bin( '111110001111110011110011111' ) );

    });

  });

  describe( "pop", function(){


    it( "should restore head to previous value (no sep > sep)", function(){

      var cfg = getComplexConfig();

      stack.push( defaultCfg );
      stack.push( cfg );
      stack.pop();

      var head = getHead( stack );

      equalConfig( head, defaultCfg );

    });


    it( "should restore head to previous value (sep > no sep)", function(){

      var cfg = getComplexConfig();

      stack.push( cfg );
      stack.push( defaultCfg );
      stack.pop();

      var head = getHead( stack );

      equalConfig( head, cfg );

    });

  });

  describe( "commit enableBlend ", function(){



    it( "should apply the blend", function(){


      stack.initFromGL( gl );

      var blendCfg = new GLState();
      blendCfg.enableBlend( true );

      stack.push( blendCfg );

      var patch = new GLState();
      stack.commit( patch );

      var ena = sinon.spy(gl, "enable").withArgs( gl.BLEND );

      patch.setupGL( gl );

      expect( ena.calledOnce ).to.be( true )

      stack.pop();

    });


    it( "should restore the blend", function(){

      stack.initFromGL( gl );

      var _patch = new GLState();

      var blendCfg = new GLState();
      blendCfg.enableBlend( true );



      stack.push( blendCfg );
      stack.commit( _patch );
      _patch.setupGL( gl );

      var ena = sinon.spy(gl, "disable").withArgs( gl.BLEND );

      stack.pop();
      stack.commit( _patch );
      _patch.setupGL( gl );


      expect( ena.calledOnce ).to.be( true )

      stack.pop();

    });


  });


});

