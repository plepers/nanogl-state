import GLConfig from '../GLConfig'
import GLStack from '../ConfigStack'

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
  var cfg = new GLConfig();

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
  var head = new GLConfig();
  stack.copyConfig( stack._ptr, head );
  return head;
}

describe( "gl - GLConfigStack", function(){

  var stack;

  beforeEach(function(){

    var cvs = document.createElement( 'canvas' );
    
    if( __karma__.config.webgl_version===2 ){
      gl = cvs.getContext( 'webgl2' )
    }
    else
      gl = cvs.getContext( 'webgl') || cvs.getContext( 'experimental-webgl' );
    
    gl.scissor( 0, 0, 0, 0 ); // normalize

    stack = new GLStack();
    defaultCfg = new GLConfig();
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

      var cfg = new GLConfig();
      cfg.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

      stack.push( cfg );

      var head =  getHead( stack );


      expect( head._dat[1] ).to.be.equal( gl.FUNC_ADD );
      expect( head._dat[2] ).to.be.equal( gl.ONE_MINUS_SRC_ALPHA );
      expect( head._dat[3] ).to.be.equal( gl.SRC_ALPHA );

    });

    it( "empty configs should give empty head", function(){

      stack.push( new GLConfig() );
      stack.push( new GLConfig() );
      stack.push( new GLConfig() );
      var head =  getHead( stack );


      expect( head._set ).to.be.equal( 0 );

    });

    it( "should add head set with pushed sets", function(){

      stack.push( defaultCfg );

      var cfg = new GLConfig();
      cfg.stencilFunc( gl.GEQUAL, 0, 5 );

      stack.push( cfg );

      var head =  getHead( stack );
      expect( head._set.toString(2) ).to.be.equal('110111110001111110011110011111' );

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


  describe( "flush", function(){



    it( "should set ptr to 0", function(){

      stack.push( defaultCfg );
      stack.push( defaultCfg );
      stack.flush();
      expect( stack._ptr ).to.be.equal( 0 )
    });

    it( "should restore head to initial value", function(){

      var cfg = getComplexConfig();
      stack.initFromGL( gl )

      var icfg = new GLConfig();
      icfg.fromGL( gl );

      stack.push( defaultCfg );
      stack.push( cfg );
      stack.push( cfg );
      stack.push( cfg );
      stack.flush();

      var head = getHead( stack );


      aequal( head._dat, icfg._dat );

    });

  });

  describe( "commit enableBlend ", function(){



    it( "should apply the blend", function(){


      stack.initFromGL( gl );

      var blendCfg = new GLConfig();
      blendCfg.enableBlend( true );

      stack.push( blendCfg );

      var patch = new GLConfig();
      stack.commit( patch );

      var ena = sinon.spy(gl, "enable").withArgs( gl.BLEND );

      patch.setupGL( gl );

      expect( ena.calledOnce ).to.be( true )

      stack.pop();

    });


    it( "should restore the blend", function(){

      stack.initFromGL( gl );

      var _patch = new GLConfig();

      var blendCfg = new GLConfig();
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

    it( "debugging", function(){

      stack.initFromGL( gl );

      console.log( "a", Array.from(stack._sets).join(',') )
      
      var _patch = new GLConfig();
      
      var blendCfg = new GLConfig();
      blendCfg.enableBlend( true );
      
      var depthCfg = new GLConfig();
      depthCfg.enableDepthTest( true );
      
      
      
      stack.push( blendCfg );
      console.log( "b", Array.from(stack._sets).join(',') )
      
      stack.commit( _patch );
      console.log( "c", Array.from(stack._sets).join(',') )
      
      stack.push( depthCfg );
      console.log( "d", Array.from(stack._sets).join(',') )
      
      stack.commit( _patch );
      console.log( "e", Array.from(stack._sets).join(',') )
      
      stack.pop( );
      stack.pop( );
      console.log( "f", Array.from(stack._sets).join(',') )

      

      stack = new GLStack();

      console.log( "----------------------")

      stack.push( blendCfg );
      console.log( "a", Array.from(stack._sets).join(',') )
      
      stack.commit( _patch );
      console.log( "b", Array.from(stack._sets).join(',') )
      console.log( "-", _patch._set )
      
      stack.pop(  );
      console.log( "c", Array.from(stack._sets).join(',') )
      
      stack.push( blendCfg );
      console.log( "d", Array.from(stack._sets).join(',') )
      
      stack.commit( _patch );
      console.log( "e", Array.from(stack._sets).join(',') )
      console.log( "-", _patch._set )

    });


  });




});

