import GLConfig from '../config'
import GLState from '../state'

var expect = require( 'expect.js' ),
    aequal = require( './utils/aequal.js' ),
    sinon  = require( 'sinon' );





var defaultCfg, gl, gl2;

var bin = function( str ){
  return parseInt( str, 2 );
};

function almostEqual( a, b ){
  if( Math.abs( a-b ) > 0.001 ){
    expect( a ).to.be.equal( b );
  }
}

var equalConfig = function( cfgA, cfgB ){
  var f1 = new Uint16Array( cfgA._dat )
  var f2 = new Uint16Array( cfgB._dat )
  f1[44] = f2[44] = 0
  f1[45] = f2[45] = 0
  f1[46] = f2[46] = 0
  f1[47] = f2[47] = 0
  aequal(f1, f2);
  expect( (cfgA._set | (1 << 27)).toString(2) ).to.be.equal( (cfgB._set | (1 << 27)).toString(2) );
};

var compareFromGl = function( cfg, gl ){
  var ref = new GLConfig();
  ref.fromGL( gl )
  equalConfig( cfg, ref );
};

var testNotCalled = function( gl, method ){
  var fn = sinon.spy(gl, method);
  var cfg = new GLConfig();
  cfg.setupGL( gl );
  expect( fn.called ).to.be(false);
  fn.restore()
}

var logState = function( cfg ){
  var a = cfg._dat;
  var str = '\n';
  str += 'sets : '+cfg._set.toString( 2 )+'\n';
  for( var i=0, l=a.length; i<l; i++ ) {
    str += ( GLEnum.getString( a[i] ) || a[i].toString(16) ) + '\n';
  }
  console.log( str );
};


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


function propertyTest( gl, fn, params, getprop, result ){
  var cfg = new GLConfig();
  cfg[fn].apply( cfg, params );
  cfg.setupGL( gl );
  var p = gl.getParameter( getprop )
  if( p.length ){
    for (var i = 0; i < p.length; i++) {
      almostEqual( p[i], result[i] );
    };
  }else{
    almostEqual( p, result );
  }

  stackTest( fn, params, getprop, result )
}

function stackTest( fn, params, getprop, result ){
  var cfg = new GLConfig();
  cfg[fn].apply( cfg, params );

  pState.push( cfg );
  pState.apply()
  pState.pop();
  var p = gl2.getParameter( getprop )
  if( p.length ){
    for (var i = 0; i < p.length; i++) {
      almostEqual( p[i], result[i] );
    };
  }else{
    almostEqual( p, result );
  }

}

gl = createContext()
gl2 = createContext()



var pState = new GLState( gl2 )



describe( "gl - GLConfig", function(){

  beforeEach(function(){

    defaultCfg = new GLConfig();
    defaultCfg.toDefault();
    defaultCfg.setupGL( gl );

  })

  describe( "toDefault", function(){


    it( "should fullfill a standard default gl context state", function(){

      var cfg = new GLConfig();
      cfg.toDefault();

      expect( gl ).to.be.ok();
      expect( cfg._set ).to.be.equal( bin( '110111110001111110011110011111' ) ); // default set
      // todo check datas

    });

  });

  describe( "setupGL", function(){

    it( "should not call enable/disable if empty", function(){
      var dis = sinon.spy(gl, "disable");
      var ena = sinon.spy(gl, "enable");

      var cfg = new GLConfig();
      cfg.setupGL( gl );

      expect( dis.called ).to.be(false);
      expect( ena.called ).to.be(false);
      dis.restore()
      ena.restore()
    });

    it( "should not call blendEquationSeparate if empty", function(){
        testNotCalled( gl, 'blendEquationSeparate' );
    });
    it( "should not call blendEquation if empty", function(){
        testNotCalled( gl, 'blendEquation' );
    });
    it( "should not call blendFuncSeparate if empty", function(){
        testNotCalled( gl, 'blendFuncSeparate' );
    });
    it( "should not call blendFunc if empty", function(){
        testNotCalled( gl, 'blendFunc' );
    });
    it( "should not call depthFunc if empty", function(){
        testNotCalled( gl, 'depthFunc' );
    });
    it( "should not call cullFace if empty", function(){
        testNotCalled( gl, 'cullFace' );
    });
    it( "should not call frontFace if empty", function(){
        testNotCalled( gl, 'frontFace' );
    });
    it( "should not call stencilFuncSeparate if empty", function(){
        testNotCalled( gl, 'stencilFuncSeparate' );
    });
    it( "should not call stencilFuncSeparate if empty", function(){
        testNotCalled( gl, 'stencilFuncSeparate' );
    });
    it( "should not call stencilFunc if empty", function(){
        testNotCalled( gl, 'stencilFunc' );
    });
    it( "should not call stencilOpSeparate if empty", function(){
       testNotCalled( gl, 'stencilOpSeparate' );
    });
    it( "should not call stencilOpSeparate if empty", function(){
        testNotCalled( gl, 'stencilOpSeparate' );
    });
    it( "should not call stencilOp if empty", function(){
        testNotCalled( gl, 'stencilOp' );
    });
    it( "should not call stencilMaskSeparate if empty", function(){
        testNotCalled( gl, 'stencilMaskSeparate' );
    });
    it( "should not call stencilMaskSeparate if empty", function(){
        testNotCalled( gl, 'stencilMaskSeparate' );
    });
    it( "should not call stencilMask if empty", function(){
        testNotCalled( gl, 'stencilMask' );
    });

  });


  describe( "fromGL", function(){

    it( "should fullfill a default config", function(){

      var cfg = new GLConfig();
      cfg.fromGL( gl );

      expect( gl ).to.be.ok();
      equalConfig( cfg, defaultCfg );

    });

  });


  describe( "clone", function(){


    it( "should copy set and datas", function(){

      var cfg = new GLConfig();
      cfg.toDefault();

      var clone = cfg.clone();

      expect( cfg._set ).to.be.equal( clone._set );
      aequal( cfg._dat, clone._dat );

    });

    it( "should not be affected by referrer modifications", function(){

      var cfg = new GLConfig();
      cfg.toDefault();

      var clone = cfg.clone();

      cfg.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

      expect( clone._dat[2] ).to.be.equal( gl.ZERO );
      expect( clone._dat[3] ).to.be.equal( gl.ONE );

    });

  });

  describe( "patch", function(){

    it( "equal configs should return unset patch", function(){
      var cfg1 = new GLConfig(),
          cfg2 = new GLConfig(),
          patch = new GLConfig();
      cfg1.toDefault();
      cfg2.toDefault();
      cfg1.patch( cfg2 , patch );
      expect( patch._set ).to.be.equal( 0 );
    });

    it( "an unset config just return input", function(){
      var cfg1 = new GLConfig(),
          cfg2 = new GLConfig(),
          patch = new GLConfig();

      cfg2.toDefault();
      cfg2.patch( cfg1 , patch );
      expect( patch._set ).to.be.equal( cfg2._set );
      aequal( patch._dat, cfg2._dat );
    });

    it( "with unset config just return unset patch", function(){
      var cfg1 = new GLConfig(),
          cfg2 = new GLConfig(),
          patch = new GLConfig();

      cfg2.toDefault();
      cfg1.patch( cfg2 , patch );
      expect( patch._set ).to.be.equal( 0 );
    });


    it( "config with different values should have set and correct value", function(){
      var cfg1 = new GLConfig(),
          cfg2 = new GLConfig(),
          patch = new GLConfig();


      cfg1.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      cfg2.blendFunc( gl.SRC_ALPHA, gl.ZERO );


      cfg2.patch( cfg1 , patch );
      expect( patch._set ).to.be.equal( bin( '010000000000' ) );
      expect( patch._dat[2] ).to.be.equal( gl.ZERO );
      expect( patch._dat[3] ).to.be.equal( gl.SRC_ALPHA );
    });

    it( "config with *separate should have consistent set", function(){
      var cfg1 = new GLConfig(),
          cfg2 = new GLConfig(),
          patch = new GLConfig();


      cfg1.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      cfg2.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );


      cfg2.patch( cfg1 , patch );
      expect( patch._set ).to.be.equal( bin( '1010000000000' ) );
      expect( patch._dat[2] ).to.be.equal( gl.ONE_MINUS_SRC_ALPHA );
      expect( patch._dat[3] ).to.be.equal( gl.SRC_ALPHA );
      expect( patch._dat[5] ).to.be.equal( gl.ZERO );
      expect( patch._dat[6] ).to.be.equal( gl.ONE );
    });


  });

  describe( "blendFunc", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      expect( cfg._set ).to.be.equal( bin( '010000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      expect( cfg._dat[2] ).to.be.equal( gl.ONE_MINUS_SRC_ALPHA );
      expect( cfg._dat[3] ).to.be.equal( gl.SRC_ALPHA );
    });

    it( "should unset separate", function(){
      var cfg = new GLConfig();
      cfg.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
      cfg.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      expect( cfg._set ).to.be.equal( bin( '010000000000' ) );
    });

    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });


  describe( "blendFuncSeparate", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
      expect( cfg._set ).to.be.equal( bin( '1010000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
      expect( cfg._dat[2] ).to.be.equal( gl.ONE_MINUS_SRC_ALPHA );
      expect( cfg._dat[3] ).to.be.equal( gl.SRC_ALPHA );
      expect( cfg._dat[5] ).to.be.equal( gl.ZERO );
      expect( cfg._dat[6] ).to.be.equal( gl.ONE );
    });

    it( "should set over not separate", function(){
      var cfg = new GLConfig();
      cfg.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      cfg.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
      expect( cfg._set ).to.be.equal( bin( '1010000000000' ) );
    });

    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });

  describe( "blendEquation", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.blendEquation( gl.FUNC_SUBTRACT );
      expect( cfg._set ).to.be.equal( bin( '001000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.blendEquation( gl.FUNC_SUBTRACT );
      expect( cfg._dat[1] ).to.be.equal( gl.FUNC_SUBTRACT );
    });

    it( "should unset separate", function(){
      var cfg = new GLConfig();
      cfg.blendEquationSeparate( gl.FUNC_SUBTRACT, gl.FUNC_ADD );
      cfg.blendEquation( gl.FUNC_REVERSE_SUBTRACT );

      expect( cfg._set ).to.be.equal( bin( '001000000000' ) );
    });

    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.blendEquation( gl.FUNC_SUBTRACT );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });

  describe( "blendEquationSeparate", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.blendEquationSeparate( gl.FUNC_ADD, gl.FUNC_SUBTRACT );
      expect( cfg._set ).to.be.equal( bin( '101000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.blendEquationSeparate( gl.FUNC_ADD, gl.FUNC_SUBTRACT );
      expect( cfg._dat[1] ).to.be.equal( gl.FUNC_ADD );
      expect( cfg._dat[4] ).to.be.equal( gl.FUNC_SUBTRACT );
    });

    it( "should unset separate", function(){
      var cfg = new GLConfig();
      cfg.blendEquation( gl.FUNC_REVERSE_SUBTRACT );
      cfg.blendEquationSeparate( gl.FUNC_SUBTRACT, gl.FUNC_ADD );
      expect( cfg._set ).to.be.equal( bin( '101000000000' ) );
    });

    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.blendEquationSeparate( gl.FUNC_SUBTRACT, gl.FUNC_ADD );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });


  describe( "depthFunc", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.depthFunc( gl.GREATER );
      expect( cfg._set ).to.be.equal( bin( '10000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.depthFunc( gl.GREATER );
      expect( cfg._dat[8] ).to.be.equal( gl.GREATER );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.depthFunc( gl.GREATER );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );

      cfg.depthFunc( gl.LESS );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });



  describe( "cullFace", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.cullFace( gl.FRONT_AND_BACK );
      expect( cfg._set ).to.be.equal( bin( '100000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.cullFace( gl.FRONT_AND_BACK );
      expect( cfg._dat[10] ).to.be.equal( gl.FRONT_AND_BACK );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.cullFace( gl.FRONT_AND_BACK );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
      cfg.cullFace( gl.BACK );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });


    it( "should not call gl if not set", function(){
      var dis = sinon.spy(gl, "disable");
      var ena = sinon.spy(gl, "enable");

      var cfg = new GLConfig();
      cfg.setupGL( gl );

      expect( dis.called ).to.be(false);
      expect( ena.called ).to.be(false);
      dis.restore()
      ena.restore()
    });

  });




  describe( "frontFace", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.frontFace( gl.CW );
      expect( cfg._set ).to.be.equal( bin( '1000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.frontFace( gl.CW );
      expect( cfg._dat[11] ).to.be.equal( gl.CW );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();

      cfg.frontFace( gl.CW );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );

      cfg.frontFace( gl.CCW );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });

  describe( "stencilFunc", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.stencilFunc( gl.GEQUAL, 0, 5 );
      expect( cfg._set ).to.be.equal( bin( '10000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.stencilFunc( gl.GEQUAL, 10, 5 );
      expect( cfg._dat[13] ).to.be.equal( gl.GEQUAL );
      expect( cfg._dat[14] ).to.be.equal( 10 );
      expect( cfg._dat[15] ).to.be.equal( 5 );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.stencilFunc( gl.GEQUAL, 0, 5 );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });


  describe( "stencilOp", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.stencilOp( gl.DECR_WRAP, gl.REPLACE, gl.INVERT );
      expect( cfg._set ).to.be.equal( bin( '100000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.stencilOp( gl.DECR_WRAP, gl.REPLACE, gl.INVERT );
      expect( cfg._dat[17] ).to.be.equal( gl.DECR_WRAP );
      expect( cfg._dat[18] ).to.be.equal( gl.REPLACE );
      expect( cfg._dat[19] ).to.be.equal( gl.INVERT );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.stencilOp( gl.DECR_WRAP, gl.REPLACE, gl.INVERT );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });


  describe( "stencilMask", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.stencilMask( 8 );
      expect( cfg._set ).to.be.equal( bin( '1000000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.stencilMask( 9 );
      expect( cfg._dat[16] ).to.be.equal( 9 );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.stencilMask( 9 );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });

//===================================== separate

  describe( "stencilFuncSeparate", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.stencilFuncSeparate( gl.GEQUAL, 40, 5, gl.NOTEQUAL, 20, 22 );
      expect( cfg._set ).to.be.equal( bin( '10010000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.stencilFuncSeparate( gl.GEQUAL, 40, 5, gl.NOTEQUAL, 20, 22 );
      expect( cfg._dat[13] ).to.be.equal( gl.GEQUAL );
      expect( cfg._dat[14] ).to.be.equal( 40 );
      expect( cfg._dat[15] ).to.be.equal( 5 );
      expect( cfg._dat[20] ).to.be.equal( gl.NOTEQUAL );
      expect( cfg._dat[21] ).to.be.equal( 20 );
      expect( cfg._dat[22] ).to.be.equal( 22 );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.stencilFuncSeparate( gl.GEQUAL, 0, 5, gl.NOTEQUAL, 0, 22 );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });


  describe( "stencilOpSeparate", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.stencilOpSeparate( gl.DECR_WRAP, gl.REPLACE, gl.INVERT, gl.INVERT, gl.DECR_WRAP, gl.REPLACE );
      expect( cfg._set ).to.be.equal( bin( '100100000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.stencilOpSeparate( gl.DECR_WRAP, gl.REPLACE, gl.INVERT, gl.INVERT, gl.DECR_WRAP, gl.REPLACE );
      expect( cfg._dat[17] ).to.be.equal( gl.DECR_WRAP );
      expect( cfg._dat[18] ).to.be.equal( gl.REPLACE );
      expect( cfg._dat[19] ).to.be.equal( gl.INVERT );
      expect( cfg._dat[24] ).to.be.equal( gl.INVERT );
      expect( cfg._dat[25] ).to.be.equal( gl.DECR_WRAP );
      expect( cfg._dat[26] ).to.be.equal( gl.REPLACE );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.stencilOpSeparate( gl.DECR_WRAP, gl.REPLACE, gl.INVERT, gl.INVERT, gl.DECR_WRAP, gl.REPLACE );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });


  describe( "stencilMaskSeparate", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.stencilMaskSeparate( 8, 16 );
      expect( cfg._set ).to.be.equal( bin( '1001000000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.stencilMaskSeparate( 9, 15 );
      expect( cfg._dat[16] ).to.be.equal( 9 );
      expect( cfg._dat[23] ).to.be.equal( 15 );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.stencilMaskSeparate( 9, 15 );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });




  describe( "colorMask", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.colorMask( true, false, true, false );
      expect( cfg._set ).to.be.equal( bin( '1000000000000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.colorMask( true, false, true, false );
      expect( cfg._dat[38] ).to.be.equal( 5 );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.colorMask( true, false, true, false  );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });



  describe( "depthMask", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.depthMask( false );
      expect( cfg._set ).to.be.equal( bin( '10000000000000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.depthMask( false );
      expect( cfg._dat[39] ).to.be.equal( 0 );
      cfg.depthMask( true );
      expect( cfg._dat[39] ).to.be.equal( 1 );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.depthMask( false  );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });




  describe( "polygonOffset", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.polygonOffset( -.6, .5 );
      expect( cfg._set ).to.be.equal( bin( '100000000000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.polygonOffset( -.5, .6 );
      almostEqual( GLConfig.decodeHalf(cfg._dat[34]), -.5 );
      almostEqual( GLConfig.decodeHalf(cfg._dat[35]),  .6 );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.depthMask( false  );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });





  describe( "scissor", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.scissor( 1, 2, 4, 5 );
      expect( cfg._set ).to.be.equal( bin( '10000000000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.scissor( 1, 2, 4, 5 );
      expect( cfg._dat[28] ).to.be.equal(1);
      expect( cfg._dat[29] ).to.be.equal(2);
      expect( cfg._dat[30] ).to.be.equal(4);
      expect( cfg._dat[31] ).to.be.equal(5);
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.scissor( 1, 2, 4, 5 );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });




  describe( "viewport", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.viewport( 10, 20, 30, 40 );
      expect( cfg._set ).to.be.equal( bin( '1000000000000000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.viewport( 10, 20, 30, 40 );
      expect( cfg._dat[44] ).to.be.equal(10);
      expect( cfg._dat[45] ).to.be.equal(20);
      expect( cfg._dat[46] ).to.be.equal(30);
      expect( cfg._dat[47] ).to.be.equal(40);
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.viewport( 10, 20, 30, 40 );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });



  describe( "depthRange", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.depthRange( .15, .45 );
      expect( cfg._set ).to.be.equal( bin( '10000000000000000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.depthRange( .15, .45 );
      expect( cfg._dat[48] ).to.be.equal( Math.round(.15*0xFFFF) );
      expect( cfg._dat[49] ).to.be.equal( Math.round(.45*0xFFFF) );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.depthRange( .15, .45 );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });



  describe( "lineWidth", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.lineWidth( 3 );
      expect( cfg._set ).to.be.equal( bin( '100000000000000000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.lineWidth( 3 );
      almostEqual( GLConfig.decodeHalf( cfg._dat[50]), 3 );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.depthRange( .15, .45 );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });





  describe( "blendColor", function(){

    it( "should fill correct set", function(){
      var cfg = new GLConfig();
      cfg.blendColor( .1, .2, .3, .4 );
      expect( cfg._set.toString(2) ).to.be.equal( '100000000000000000000000000' );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLConfig();
      cfg.blendColor( .1, .2, .3, .4 );
      almostEqual( GLConfig.decodeHalf( cfg._dat[40]), .1 );
      almostEqual( GLConfig.decodeHalf( cfg._dat[41]), .2 );
      almostEqual( GLConfig.decodeHalf( cfg._dat[42]), .3 );
      almostEqual( GLConfig.decodeHalf( cfg._dat[43]), .4 );
    });


    it( "should setup gl context", function(){
      var cfg = new GLConfig();
      cfg.toDefault();
      cfg.blendColor( false  );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });






  describe( "half float encoding", function(){

    it( " should work", function(){

      var panel = [
       0, 1, -1,
       0.1, 0.2, -0.1,
       1000.5,
       0.015,
       -1000.5
      ]

      for (var i = 0; i < panel.length; i++) {
        var n = panel[i]
        var e = GLConfig.encodeHalf( n );
        var d = GLConfig.decodeHalf( e );

        almostEqual( d, n )
      };
    });



  });




  describe( "get property tests - ", function(){

    it( "blendColor", function(){
      propertyTest( gl,
        'blendColor', [.1, .2, .3, .4],
        gl.BLEND_COLOR, [.1, .2, .3, .4]
      );
    });


    it( 'blendEquation', function(){
      propertyTest( gl,
        'blendEquation', [gl.FUNC_SUBTRACT],
        gl.BLEND_EQUATION_RGB, gl.FUNC_SUBTRACT
      );
    });

    it( 'blendEquation', function(){
      propertyTest( gl,
        'blendEquation', [gl.FUNC_SUBTRACT],
        gl.BLEND_EQUATION_ALPHA, gl.FUNC_SUBTRACT
      );
    });


    it( 'blendEquationSeparate rgb', function(){
      propertyTest( gl,
        'blendEquationSeparate', [gl.FUNC_SUBTRACT, gl.FUNC_REVERSE_SUBTRACT],
        gl.BLEND_EQUATION_RGB, gl.FUNC_SUBTRACT
      );
    });

    it( 'blendEquationSeparate alpha', function(){
      propertyTest( gl,
        'blendEquationSeparate', [gl.FUNC_SUBTRACT, gl.FUNC_REVERSE_SUBTRACT],
        gl.BLEND_EQUATION_ALPHA, gl.FUNC_REVERSE_SUBTRACT
      );
    });

    it( 'blendFunc', function(){
      propertyTest( gl,
        'blendFunc', [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA],
        gl.BLEND_SRC_RGB, gl.SRC_ALPHA
      );
    });

    it( 'blendFunc', function(){
      propertyTest( gl,
        'blendFunc', [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA],
        gl.BLEND_DST_RGB, gl.ONE_MINUS_SRC_ALPHA
      );
    });

    it( 'blendFuncSeparate', function(){
      propertyTest( gl,
        'blendFuncSeparate', [gl.SRC_COLOR, gl.ONE_MINUS_SRC_COLOR, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA],
        gl.BLEND_SRC_RGB, gl.SRC_COLOR
      );
    });
    it( 'blendFuncSeparate', function(){
      propertyTest( gl,
        'blendFuncSeparate', [gl.SRC_COLOR, gl.ONE_MINUS_SRC_COLOR, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA],
        gl.BLEND_DST_RGB, gl.ONE_MINUS_SRC_COLOR
      );
    });
    it( 'blendFuncSeparate', function(){
      propertyTest( gl,
        'blendFuncSeparate', [gl.SRC_COLOR, gl.ONE_MINUS_SRC_COLOR, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA],
        gl.BLEND_SRC_ALPHA, gl.SRC_ALPHA
      );
    });
    it( 'blendFuncSeparate', function(){
      propertyTest( gl,
        'blendFuncSeparate', [gl.SRC_COLOR, gl.ONE_MINUS_SRC_COLOR, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA],
        gl.BLEND_DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA
      );
    });




    it( 'colorMask', function(){
      propertyTest( gl,
        'colorMask', [true, false, true, false],
        gl.COLOR_WRITEMASK, [true, false, true, false]
      );
    });

    it( 'cullFace', function(){
      propertyTest( gl,
        'cullFace', [gl.FRONT_AND_BACK],
        gl.CULL_FACE_MODE, gl.FRONT_AND_BACK
      );
    });

    it( 'depthFunc', function(){
      propertyTest( gl,
        'depthFunc', [gl.NOTEQUAL],
        gl.DEPTH_FUNC, gl.NOTEQUAL
      );
    });

    it( 'depthMask', function(){
      propertyTest( gl,
        'depthMask', [false],
        gl.DEPTH_WRITEMASK, false
      );
    });

    it( 'frontFace', function(){
      propertyTest( gl,
        'frontFace', [gl.CW],
        gl.FRONT_FACE, gl.CW
      );
    });

    it( 'polygonOffset', function(){
      propertyTest( gl,
        'polygonOffset', [-5, 10.5],
        gl.POLYGON_OFFSET_FACTOR, -5
      );
    });
    it( 'polygonOffset', function(){
      propertyTest( gl,
        'polygonOffset', [-5, 10.5],
        gl.POLYGON_OFFSET_UNITS, 10.5
      );
    });

    it( 'enable polygonOffset', function(){
      propertyTest( gl,
        'enablePolygonOffset', [true],
        gl.POLYGON_OFFSET_FILL, true
      );
    });
    it( 'enable polygonOffset default', function(){
      propertyTest( gl,
        'enablePolygonOffset', [],
        gl.POLYGON_OFFSET_FILL, true
      );
    });
    it( 'disable polygonOffset', function(){
      propertyTest( gl,
        'enablePolygonOffset', [false],
        gl.POLYGON_OFFSET_FILL, false
      );
    });

    it( 'scissor', function(){
      propertyTest( gl,
        'scissor', [10, 20, 30, 40],
        gl.SCISSOR_BOX,[10, 20, 30, 40]
      );
    });



    it( 'stencilFunc func', function(){
      propertyTest( gl,
        'stencilFunc', [gl.GREATER, 2, 0x46],
        gl.STENCIL_FUNC, gl.GREATER
      );
    });

    it( 'stencilFunc ref', function(){
      propertyTest( gl,
        'stencilFunc', [gl.GREATER, 2, 0x46],
        gl.STENCIL_REF, 2
      );
    });

    it( 'stencilFunc mask', function(){
      propertyTest( gl,
        'stencilFunc', [gl.GREATER, 2, 0x46],
        gl.STENCIL_VALUE_MASK, 0x46
      );
    });



    it( 'stencilFuncSeparate func', function(){
      propertyTest( gl,
        'stencilFuncSeparate', [gl.GREATER, 2, 0x46, gl.NOTEQUAL, 3, 0x25],
        gl.STENCIL_FUNC, gl.GREATER
      );
    });

    it( 'stencilFuncSeparate ref', function(){
      propertyTest( gl,
        'stencilFuncSeparate', [gl.GREATER, 2, 0x46, gl.NOTEQUAL, 3, 0x25],
        gl.STENCIL_REF, 2
      );
    });

    it( 'stencilFuncSeparate mask', function(){
      propertyTest( gl,
        'stencilFuncSeparate', [gl.GREATER, 2, 0x46, gl.NOTEQUAL, 3, 0x25],
        gl.STENCIL_VALUE_MASK, 0x46
      );
    });

    it( 'stencilFuncSeparate fback unc', function(){
      propertyTest( gl,
        'stencilFuncSeparate', [gl.GREATER, 2, 0x46, gl.NOTEQUAL, 3, 0x25],
        gl.STENCIL_BACK_FUNC, gl.NOTEQUAL
      );
    });

    it( 'stencilFuncSeparate back ref', function(){
      propertyTest( gl,
        'stencilFuncSeparate', [gl.GREATER, 2, 0x46, gl.NOTEQUAL, 3, 0x25],
        gl.STENCIL_BACK_REF, 3
      );
    });

    it( 'stencilFuncSeparate back mask', function(){
      propertyTest( gl,
        'stencilFuncSeparate', [gl.GREATER, 2, 0x46, gl.NOTEQUAL, 3, 0x25],
        gl.STENCIL_BACK_VALUE_MASK, 0x25
      );
    });



    it( 'stencilMask', function(){
      propertyTest( gl,
        'stencilMask', [0x82],
        gl.STENCIL_WRITEMASK, 0x82
      );
    });

    it( 'stencilMaskSeparate', function(){
      propertyTest( gl,
        'stencilMaskSeparate', [0x10, 0x20],
        gl.STENCIL_WRITEMASK, 0x10
      );
    });

    it( 'stencilMaskSeparate back', function(){
      propertyTest( gl,
        'stencilMaskSeparate', [0x10, 0x20],
        gl.STENCIL_BACK_WRITEMASK, 0x20
      );
    });

// -----------------------------------------------------



    it( 'stencilOp sfail', function(){
      propertyTest( gl,
        'stencilOp', [gl.REPLACE, gl.INCR, gl.DECR],
        gl.STENCIL_FAIL, gl.REPLACE
      );
    });

    it( 'stencilOp dpfail', function(){
      propertyTest( gl,
        'stencilOp', [gl.REPLACE, gl.INCR, gl.DECR],
        gl.STENCIL_PASS_DEPTH_FAIL, gl.INCR
      );
    });

    it( 'stencilOp dppass', function(){
      propertyTest( gl,
        'stencilOp', [gl.REPLACE, gl.INCR, gl.DECR],
        gl.STENCIL_PASS_DEPTH_PASS, gl.DECR
      );
    });








    it( 'stencilOpSeparate sfail', function(){
      propertyTest( gl,
        'stencilOpSeparate', [gl.REPLACE, gl.INCR, gl.DECR, gl.INVERT, gl.INCR_WRAP, gl.DECR_WRAP],
        gl.STENCIL_FAIL, gl.REPLACE
      );
    });

    it( 'stencilOpSeparate dpfail', function(){
      propertyTest( gl,
        'stencilOpSeparate', [gl.REPLACE, gl.INCR, gl.DECR, gl.INVERT, gl.INCR_WRAP, gl.DECR_WRAP],
        gl.STENCIL_PASS_DEPTH_FAIL, gl.INCR
      );
    });

    it( 'stencilOpSeparate dppass', function(){
      propertyTest( gl,
        'stencilOpSeparate', [gl.REPLACE, gl.INCR, gl.DECR, gl.INVERT, gl.INCR_WRAP, gl.DECR_WRAP],
        gl.STENCIL_PASS_DEPTH_PASS, gl.DECR
      );
    });

    it( 'stencilOpSeparate fback sfail', function(){
      propertyTest( gl,
        'stencilOpSeparate', [gl.REPLACE, gl.INCR, gl.DECR, gl.INVERT, gl.INCR_WRAP, gl.DECR_WRAP],
        gl.STENCIL_BACK_FAIL, gl.INVERT
      );
    });

    it( 'stencilOpSeparate back dpfail', function(){
      propertyTest( gl,
        'stencilOpSeparate', [gl.REPLACE, gl.INCR, gl.DECR, gl.INVERT, gl.INCR_WRAP, gl.DECR_WRAP],
        gl.STENCIL_BACK_PASS_DEPTH_FAIL, gl.INCR_WRAP
      );
    });

    it( 'stencilOpSeparate back dppass', function(){
      propertyTest( gl,
        'stencilOpSeparate', [gl.REPLACE, gl.INCR, gl.DECR, gl.INVERT, gl.INCR_WRAP, gl.DECR_WRAP],
        gl.STENCIL_BACK_PASS_DEPTH_PASS, gl.DECR_WRAP
      );
    });


// --------------------------------------

    it( 'viewport', function(){

      propertyTest( gl,
        'viewport', [4, 3, 6, 7],
        gl.VIEWPORT, [4, 3, 6, 7]
      );
    });

    it( 'depthRange', function(){
      propertyTest( gl,
        'depthRange', [.1, .9],
        gl.DEPTH_RANGE, [.1, .9]
      );
    });


    // lineWidth fail on directX

    // it( 'lineWidth', function(){
    //   propertyTest( gl,
    //     'lineWidth', [4],
    //     gl.LINE_WIDTH, 4
    //   );
    //   propertyTest( gl,
    //     'lineWidth', [.2],
    //     gl.LINE_WIDTH, .2
    //   );
    // });



  });



});
