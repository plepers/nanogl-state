var GLState = require( '../state' )

var expect = require( 'expect.js' ),
    aequal = require( './utils/aequal.js' ),
    sinon  = require( 'sinon' );





var defaultCfg, gl;

var bin = function( str ){
  return parseInt( str, 2 );
};



var equalConfig = function( cfgA, cfgB ){
  aequal( cfgA._dat, cfgB._dat );
  expect( cfgA._set ).to.be.equal( cfgB._set );
};

var compareFromGl = function( cfg, gl ){
  var ref = new GLState();
  ref.fromGL( gl )
  equalConfig( cfg, ref );
};

var testNotCalled = function( gl, method ){
  var fn = sinon.spy(gl, method);
  var cfg = new GLState();
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
  cvs.width = cvs.height = 2;
  gl = cvs.getContext( 'webgl' ) || cvs.getContext( 'experimental-webgl' );
  gl.scissor( 0, 0, 0, 0 ); // normalize
  return gl;
}

gl = createContext()

describe( "gl - GLState", function(){

  beforeEach(function(){

    defaultCfg = new GLState();
    defaultCfg.toDefault();
    defaultCfg.setupGL( gl );

  })

  describe( "toDefault", function(){


    it( "should fullfill a standard default gl context state", function(){

      var cfg = new GLState();
      cfg.toDefault();

      expect( gl ).to.be.ok();
      expect( cfg._set ).to.be.equal( bin( '111110001111110011110011111' ) ); // default set
      // todo check datas

    });

  });

  describe( "setupGl", function(){

    it( "should not call enable/disable if empty", function(){
      var dis = sinon.spy(gl, "disable");
      var ena = sinon.spy(gl, "enable");

      var cfg = new GLState();
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

      var cfg = new GLState();
      cfg.fromGL( gl );

      expect( gl ).to.be.ok();
      expect( cfg._set ).to.be.equal( defaultCfg._set );
      aequal( cfg._dat, defaultCfg._dat );

    });

  });


  describe( "clone", function(){


    it( "should copy set and datas", function(){

      var cfg = new GLState();
      cfg.toDefault();

      var clone = cfg.clone();

      expect( cfg._set ).to.be.equal( clone._set );
      aequal( cfg._dat, clone._dat );

    });

    it( "should not be affected by referrer modifications", function(){

      var cfg = new GLState();
      cfg.toDefault();

      var clone = cfg.clone();

      cfg.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

      expect( clone._dat[2] ).to.be.equal( gl.ZERO );
      expect( clone._dat[3] ).to.be.equal( gl.ONE );

    });

  });

  describe( "patch", function(){

    it( "equal configs should return unset patch", function(){
      var cfg1 = new GLState(),
          cfg2 = new GLState(),
          patch = new GLState();
      cfg1.toDefault();
      cfg2.toDefault();
      cfg1.patch( cfg2 , patch );
      expect( patch._set ).to.be.equal( 0 );
    });

    it( "an unset config just return input", function(){
      var cfg1 = new GLState(),
          cfg2 = new GLState(),
          patch = new GLState();

      cfg2.toDefault();
      cfg2.patch( cfg1 , patch );
      expect( patch._set ).to.be.equal( cfg2._set );
      aequal( patch._dat, cfg2._dat );
    });

    it( "with unset config just return unset patch", function(){
      var cfg1 = new GLState(),
          cfg2 = new GLState(),
          patch = new GLState();

      cfg2.toDefault();
      cfg1.patch( cfg2 , patch );
      expect( patch._set ).to.be.equal( 0 );
    });


    it( "config with different values should have set and correct value", function(){
      var cfg1 = new GLState(),
          cfg2 = new GLState(),
          patch = new GLState();


      cfg1.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      cfg2.blendFunc( gl.SRC_ALPHA, gl.ZERO );


      cfg2.patch( cfg1 , patch );
      expect( patch._set ).to.be.equal( bin( '010000000000' ) );
      expect( patch._dat[2] ).to.be.equal( gl.ZERO );
      expect( patch._dat[3] ).to.be.equal( gl.SRC_ALPHA );
    });

    it( "config with *separate should have consistent set", function(){
      var cfg1 = new GLState(),
          cfg2 = new GLState(),
          patch = new GLState();


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
      var cfg = new GLState();
      cfg.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      expect( cfg._set ).to.be.equal( bin( '010000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLState();
      cfg.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      expect( cfg._dat[2] ).to.be.equal( gl.ONE_MINUS_SRC_ALPHA );
      expect( cfg._dat[3] ).to.be.equal( gl.SRC_ALPHA );
    });

    it( "should unset separate", function(){
      var cfg = new GLState();
      cfg.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
      cfg.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      expect( cfg._set ).to.be.equal( bin( '010000000000' ) );
    });

    it( "should setup gl context", function(){
      var cfg = new GLState();
      cfg.toDefault();
      cfg.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });


  describe( "blendFuncSeparate", function(){

    it( "should fill correct set", function(){
      var cfg = new GLState();
      cfg.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
      expect( cfg._set ).to.be.equal( bin( '1010000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLState();
      cfg.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
      expect( cfg._dat[2] ).to.be.equal( gl.ONE_MINUS_SRC_ALPHA );
      expect( cfg._dat[3] ).to.be.equal( gl.SRC_ALPHA );
      expect( cfg._dat[5] ).to.be.equal( gl.ZERO );
      expect( cfg._dat[6] ).to.be.equal( gl.ONE );
    });

    it( "should set over not separate", function(){
      var cfg = new GLState();
      cfg.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      cfg.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
      expect( cfg._set ).to.be.equal( bin( '1010000000000' ) );
    });

    it( "should setup gl context", function(){
      var cfg = new GLState();
      cfg.toDefault();
      cfg.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });

  describe( "blendEquation", function(){

    it( "should fill correct set", function(){
      var cfg = new GLState();
      cfg.blendEquation( gl.FUNC_SUBTRACT );
      expect( cfg._set ).to.be.equal( bin( '001000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLState();
      cfg.blendEquation( gl.FUNC_SUBTRACT );
      expect( cfg._dat[1] ).to.be.equal( gl.FUNC_SUBTRACT );
    });

    it( "should unset separate", function(){
      var cfg = new GLState();
      cfg.blendEquationSeparate( gl.FUNC_SUBTRACT, gl.FUNC_ADD );
      cfg.blendEquation( gl.FUNC_REVERSE_SUBTRACT );

      expect( cfg._set ).to.be.equal( bin( '001000000000' ) );
    });

    it( "should setup gl context", function(){
      var cfg = new GLState();
      cfg.toDefault();
      cfg.blendEquation( gl.FUNC_SUBTRACT );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });

  describe( "blendEquationSeparate", function(){

    it( "should fill correct set", function(){
      var cfg = new GLState();
      cfg.blendEquationSeparate( gl.FUNC_ADD, gl.FUNC_SUBTRACT );
      expect( cfg._set ).to.be.equal( bin( '101000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLState();
      cfg.blendEquationSeparate( gl.FUNC_ADD, gl.FUNC_SUBTRACT );
      expect( cfg._dat[1] ).to.be.equal( gl.FUNC_ADD );
      expect( cfg._dat[4] ).to.be.equal( gl.FUNC_SUBTRACT );
    });

    it( "should unset separate", function(){
      var cfg = new GLState();
      cfg.blendEquation( gl.FUNC_REVERSE_SUBTRACT );
      cfg.blendEquationSeparate( gl.FUNC_SUBTRACT, gl.FUNC_ADD );
      expect( cfg._set ).to.be.equal( bin( '101000000000' ) );
    });

    it( "should setup gl context", function(){
      var cfg = new GLState();
      cfg.toDefault();
      cfg.blendEquationSeparate( gl.FUNC_SUBTRACT, gl.FUNC_ADD );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });


  describe( "depthFunc", function(){

    it( "should fill correct set", function(){
      var cfg = new GLState();
      cfg.depthFunc( gl.GREATER );
      expect( cfg._set ).to.be.equal( bin( '10000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLState();
      cfg.depthFunc( gl.GREATER );
      expect( cfg._dat[8] ).to.be.equal( gl.GREATER );
    });


    it( "should setup gl context", function(){
      var cfg = new GLState();
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
      var cfg = new GLState();
      cfg.cullFace( gl.FRONT_AND_BACK );
      expect( cfg._set ).to.be.equal( bin( '100000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLState();
      cfg.cullFace( gl.FRONT_AND_BACK );
      expect( cfg._dat[10] ).to.be.equal( gl.FRONT_AND_BACK );
    });


    it( "should setup gl context", function(){
      var cfg = new GLState();
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

      var cfg = new GLState();
      cfg.setupGL( gl );

      expect( dis.called ).to.be(false);
      expect( ena.called ).to.be(false);
      dis.restore()
      ena.restore()
    });

  });




  describe( "frontFace", function(){

    it( "should fill correct set", function(){
      var cfg = new GLState();
      cfg.frontFace( gl.CW );
      expect( cfg._set ).to.be.equal( bin( '1000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLState();
      cfg.frontFace( gl.CW );
      expect( cfg._dat[11] ).to.be.equal( gl.CW );
    });


    it( "should setup gl context", function(){
      var cfg = new GLState();
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
      var cfg = new GLState();
      cfg.stencilFunc( gl.GEQUAL, 0, 5 );
      expect( cfg._set ).to.be.equal( bin( '10000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLState();
      cfg.stencilFunc( gl.GEQUAL, 10, 5 );
      expect( cfg._dat[13] ).to.be.equal( gl.GEQUAL );
      expect( cfg._dat[14] ).to.be.equal( 10 );
      expect( cfg._dat[15] ).to.be.equal( 5 );
    });


    it( "should setup gl context", function(){
      var cfg = new GLState();
      cfg.toDefault();
      cfg.stencilFunc( gl.GEQUAL, 0, 5 );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });


  describe( "stencilOp", function(){

    it( "should fill correct set", function(){
      var cfg = new GLState();
      cfg.stencilOp( gl.DECR_WRAP, gl.REPLACE, gl.INVERT );
      expect( cfg._set ).to.be.equal( bin( '100000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLState();
      cfg.stencilOp( gl.DECR_WRAP, gl.REPLACE, gl.INVERT );
      expect( cfg._dat[17] ).to.be.equal( gl.DECR_WRAP );
      expect( cfg._dat[18] ).to.be.equal( gl.REPLACE );
      expect( cfg._dat[19] ).to.be.equal( gl.INVERT );
    });


    it( "should setup gl context", function(){
      var cfg = new GLState();
      cfg.toDefault();
      cfg.stencilOp( gl.DECR_WRAP, gl.REPLACE, gl.INVERT );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });


  describe( "stencilMask", function(){

    it( "should fill correct set", function(){
      var cfg = new GLState();
      cfg.stencilMask( 8 );
      expect( cfg._set ).to.be.equal( bin( '1000000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLState();
      cfg.stencilMask( 9 );
      expect( cfg._dat[16] ).to.be.equal( 9 );
    });


    it( "should setup gl context", function(){
      var cfg = new GLState();
      cfg.toDefault();
      cfg.stencilMask( 9 );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });

//===================================== separate

  describe( "stencilFuncSeparate", function(){

    it( "should fill correct set", function(){
      var cfg = new GLState();
      cfg.stencilFuncSeparate( gl.GEQUAL, 40, 5, gl.NOTEQUAL, 20, 22 );
      expect( cfg._set ).to.be.equal( bin( '10010000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLState();
      cfg.stencilFuncSeparate( gl.GEQUAL, 40, 5, gl.NOTEQUAL, 20, 22 );
      expect( cfg._dat[13] ).to.be.equal( gl.GEQUAL );
      expect( cfg._dat[14] ).to.be.equal( 40 );
      expect( cfg._dat[15] ).to.be.equal( 5 );
      expect( cfg._dat[20] ).to.be.equal( gl.NOTEQUAL );
      expect( cfg._dat[21] ).to.be.equal( 20 );
      expect( cfg._dat[22] ).to.be.equal( 22 );
    });


    it( "should setup gl context", function(){
      var cfg = new GLState();
      cfg.toDefault();
      cfg.stencilFuncSeparate( gl.GEQUAL, 0, 5, gl.NOTEQUAL, 0, 22 );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });


  describe( "stencilOpSeparate", function(){

    it( "should fill correct set", function(){
      var cfg = new GLState();
      cfg.stencilOpSeparate( gl.DECR_WRAP, gl.REPLACE, gl.INVERT, gl.INVERT, gl.DECR_WRAP, gl.REPLACE );
      expect( cfg._set ).to.be.equal( bin( '100100000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLState();
      cfg.stencilOpSeparate( gl.DECR_WRAP, gl.REPLACE, gl.INVERT, gl.INVERT, gl.DECR_WRAP, gl.REPLACE );
      expect( cfg._dat[17] ).to.be.equal( gl.DECR_WRAP );
      expect( cfg._dat[18] ).to.be.equal( gl.REPLACE );
      expect( cfg._dat[19] ).to.be.equal( gl.INVERT );
      expect( cfg._dat[24] ).to.be.equal( gl.INVERT );
      expect( cfg._dat[25] ).to.be.equal( gl.DECR_WRAP );
      expect( cfg._dat[26] ).to.be.equal( gl.REPLACE );
    });


    it( "should setup gl context", function(){
      var cfg = new GLState();
      cfg.toDefault();
      cfg.stencilOpSeparate( gl.DECR_WRAP, gl.REPLACE, gl.INVERT, gl.INVERT, gl.DECR_WRAP, gl.REPLACE );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });


  describe( "stencilMaskSeparate", function(){

    it( "should fill correct set", function(){
      var cfg = new GLState();
      cfg.stencilMaskSeparate( 8, 16 );
      expect( cfg._set ).to.be.equal( bin( '1001000000000000000000' ) );
    });


    it( "should fill correct cfg", function(){
      var cfg = new GLState();
      cfg.stencilMaskSeparate( 9, 15 );
      expect( cfg._dat[16] ).to.be.equal( 9 );
      expect( cfg._dat[23] ).to.be.equal( 15 );
    });


    it( "should setup gl context", function(){
      var cfg = new GLState();
      cfg.toDefault();
      cfg.stencilMaskSeparate( 9, 15 );
      cfg.setupGL( gl );
      compareFromGl( cfg, gl );
    });

  });



});
