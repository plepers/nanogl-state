
/*


blend func

depth test

culling

stencil

infos : (<0|foo> or ~~bar) expressions help uglifyjs2 inline constants

*/

var BLEND_ENABLE          = 0 ,
    BLEND_EQ_C            = 1 ,    // BlendingFactorDest
    BLEND_FUNC_C_DST      = 2 ,    // Separate Blend Functions
    BLEND_FUNC_C_SRC      = 3 ,
    BLEND_EQ_A            = 4 ,    // BlendingFactorSrc   //
    BLEND_FUNC_A_DST      = 5 ,
    BLEND_FUNC_A_SRC      = 6 ,
    DEPTH_ENABLE          = 7 ,
    DEPTH_FUNC            = 8 ,    // DepthFunction
    CULL_FACE_ENABLE      = 9 ,
    CULL_MODE             = 10,    // CullFaceMode
    FACE_DIR              = 11,    // FrontFaceDirection
    STENCIL_ENABLE        = 12,
    STENCIL_FUNC          = 13,
    STENCIL_REF           = 14,
    STENCIL_VALUE_MASK    = 15,
    STENCIL_WRITEMASK     = 16,
    STENCIL_OP_FAIL       = 17,
    STENCIL_OP_ZFAIL      = 18,
    STENCIL_OP_ZPASS      = 19,
    STENCIL_B_FUNC        = 20,
    STENCIL_B_REF         = 21,
    STENCIL_B_VALUE_MASK  = 22,
    STENCIL_B_WRITEMASK   = 23,
    STENCIL_B_OP_FAIL     = 24,
    STENCIL_B_OP_ZFAIL    = 25,
    STENCIL_B_OP_ZPASS    = 26,
    SCISSOR_ENABLE        = 27,
    SCISSOR_TEST_X        = 28,    // SCISSOR_TEST
    SCISSOR_TEST_Y        = 29,    // SCISSOR_TEST
    SCISSOR_TEST_W        = 30,    // SCISSOR_TEST
    SCISSOR_TEST_H        = 31,    // SCISSOR_TEST
    DITHER_ENABLE         = 32,    //
    POLYOFF_ENABLE        = 33,
    POLYOFF_FACTOR        = 34,
    POLYOFF_UNITS         = 35,
    // COVERAGE_ENABLE       = 36,
    // ACOVERAGE_ENABLE      = 37,
    COLOR_MASK            = 38,
    DEPTH_MASK            = 39,
    BLEND_COLOR_R         = 40,
    BLEND_COLOR_G         = 41,
    BLEND_COLOR_B         = 42,
    BLEND_COLOR_A         = 43,

    LEN = 44,


    BLEND_ENABLE_SET       = 1 << 0 ,
    CULL_FACE_ENABLE_SET   = 1 << 1 ,
    DEPTH_ENABLE_SET       = 1 << 2 ,
    DITHER_ENABLE_SET      = 1 << 3 ,
    POLYOFF_ENABLE_SET     = 1 << 4 ,
    COVERAGE_ENABLE_SET    = 1 << 5 ,
    ACOVERAGE_ENABLE_SET   = 1 << 6 ,
    SCISSOR_ENABLE_SET     = 1 << 7 ,
    STENCIL_ENABLE_SET     = 1 << 8 ,

    BLEND_EQ_SET           = 1 << 9 ,
    BLEND_FUNC_SET         = 1 << 10,
    BLEND_EQ_A_SET         = 1 << 11,
    BLEND_FUNC_A_SET       = 1 << 12,
    DEPTH_FUNC_SET         = 1 << 13,
    CULL_MODE_SET          = 1 << 14,
    FACE_DIR_SET           = 1 << 15,
    STENCIL_FUNC_SET       = 1 << 16,
    STENCIL_OP_SET         = 1 << 17,
    STENCIL_MASK_SET       = 1 << 18,
    STENCIL_B_FUNC_SET     = 1 << 19,
    STENCIL_B_OP_SET       = 1 << 20,
    STENCIL_B_MASK_SET     = 1 << 21,
    SCISSOR_TEST_SET       = 1 << 22,
    POLYOFF_SET            = 1 << 23,
    COLOR_MASK_SET         = 1 << 24,
    DEPTH_MASK_SET         = 1 << 25,
    BLEND_COLOR_SET        = 1 << 26,


    DAT_MASKS = [
      BLEND_ENABLE_SET|0,
      BLEND_EQ_SET|0,
      BLEND_FUNC_SET|0,
      BLEND_FUNC_SET|0,
      BLEND_EQ_A_SET|0,
      BLEND_FUNC_A_SET|0,
      BLEND_FUNC_A_SET|0,

      DEPTH_ENABLE_SET|0,
      DEPTH_FUNC_SET|0,

      CULL_FACE_ENABLE_SET|0,
      CULL_MODE_SET|0,
      FACE_DIR_SET|0,

      STENCIL_ENABLE_SET|0,
      STENCIL_FUNC_SET|0,
      STENCIL_FUNC_SET|0,
      STENCIL_FUNC_SET|0,
      STENCIL_OP_SET|0,
      STENCIL_OP_SET|0,
      STENCIL_OP_SET|0,
      STENCIL_MASK_SET|0,
      STENCIL_B_FUNC_SET|0,
      STENCIL_B_FUNC_SET|0,
      STENCIL_B_FUNC_SET|0,
      STENCIL_B_OP_SET|0,
      STENCIL_B_OP_SET|0,
      STENCIL_B_OP_SET|0,
      STENCIL_B_MASK_SET|0,

      SCISSOR_ENABLE_SET|0,
      SCISSOR_TEST_SET|0,
      SCISSOR_TEST_SET|0,
      SCISSOR_TEST_SET|0,
      SCISSOR_TEST_SET|0,

      DITHER_ENABLE_SET|0,

      POLYOFF_ENABLE_SET|0,
      POLYOFF_SET|0,
      POLYOFF_SET|0,

      COVERAGE_ENABLE_SET|0,
      ACOVERAGE_ENABLE_SET|0,

      COLOR_MASK_SET|0,
      DEPTH_MASK_SET|0,

      BLEND_COLOR_SET|0,
      BLEND_COLOR_SET|0,
      BLEND_COLOR_SET|0,
      BLEND_COLOR_SET|0
    ],


    //            <b >< enab  >
    // b 0001111110011000000000
    _DEFAULT_SET = parseInt( '111110001111110011110011111', 2 ),

    _DEFAULT_STATE = new Uint16Array([
      0,       // BLEND disabled
      32774,   // BLEND_EQ_C            :   FUNC_ADD
      0,       // BLEND_FUNC_C_DST      :   ZERO
      1,       // BLEND_FUNC_C_SRC      :   ONE
      0,       // BLEND_EQ_A            :   --
      0,       // BLEND_FUNC_A_DST      :   --
      0,       // BLEND_FUNC_A_SRC      :   --

      0,       // DEPTH disabled
      513,     // DEPTH_FUNC            :   gl.LESS

      0,       // CULL_FACE disabled
      1029,    // CULL_MODE             :   gl.BACK
      2305,    // FACE_DIR              :   gl.CCW

      0,       // STENCIL disabled
      519,     // STENCIL_FUNC          :   gl.ALWAYS
      0,       // STENCIL_REF           :   0x0
      65535,   // STENCIL_VALUE_MASK    :   0xFFFF
      65535,   // STENCIL_WRITEMASK     :   0xFFFF
      7680,    // STENCIL_OP_FAIL       :   gl.KEEP
      7680,    // STENCIL_OP_ZFAIL      :   gl.KEEP
      7680,    // STENCIL_OP_ZPASS      :   gl.KEEP
      0,       // STENCIL_B_FUNC        :   --
      0,       // STENCIL_B_REF         :   --
      0,       // STENCIL_B_VALUE_MASK  :   --
      0,       // STENCIL_B_WRITEMASK   :   --
      0,       // STENCIL_B_OP_FAIL     :   --
      0,       // STENCIL_B_OP_ZFAIL    :   --
      0,       // STENCIL_B_OP_ZPASS    :   --
      0,       // SCISSOR enabled
      0,       // SCISSOR_TEST          :   x
      0,       // SCISSOR_TEST          :   y
      0,       // SCISSOR_TEST          :   w
      0,       // SCISSOR_TEST          :   h

      1,       // DITHER enabled
      0,       // POLYOFF enabled
      0,       // POLYOFF factor
      0,       // POLYOFF units

      0,       // COVERAGE enabled
      0,       // ACOVERAGE enabled

      15,      // color mask 1111,
      1,       // write to depth

      0,       // blend color
      0,       // blend color
      0,       // blend color
      0,       // blend color

    ]);




// avoid set inconsistency for '*separate' configs
function _fixSet( set ){
  return (set |
      (( set & ~~BLEND_FUNC_A_SET   ) >>> 2 ) |
      (( set & ~~BLEND_EQ_A_SET     ) >>> 2 ) |
      (( set & ~~STENCIL_B_FUNC_SET ) >>> 3 ) |
      (( set & ~~STENCIL_B_OP_SET   ) >>> 3 ) |
      (( set & ~~STENCIL_B_MASK_SET ) >>> 3 )
    );
}



function encodeClampedFloat(f){
  return (f*0xFFFF)|0;
}

function decodeClampedFloat(s){
  return (s/(+0xFFFF));
}


// http://stackoverflow.com/questions/5678432/decompressing-half-precision-floats-in-javascript
//
function decodeHalf (u16) {
    var exponent = (u16 & 0x7C00) >> 10,
        fraction = u16 & 0x03FF;
    return (u16 >> 15 ? -1 : 1) * (
        exponent ?
        (
            exponent === 0x1F ?
            fraction ? NaN : Infinity :
            Math.pow(2, exponent - 15) * (1 + fraction / 0x400)
        ) :
        6.103515625e-5 * (fraction / 0x400)
    );
}




// http://stackoverflow.com/questions/3026441/float32-to-float16
//
var EHBuffer = new Float32Array( 1 );
var EHIBuffer = new Uint32Array( EHBuffer.buffer );

function encodeHalf(f32){
  EHBuffer[0] = f32;
  var fltInt32 = EHIBuffer[0];

  var fltInt16 = (fltInt32 >> 31) << 5;
  var tmp = (fltInt32 >> 23) & 0xff;
  tmp = (tmp - 0x70) & (( (0x70 - tmp) >> 4) >> 27);
  fltInt16 = (fltInt16 | tmp) << 10;
  fltInt16 |= (fltInt32 >> 13) & 0x3ff;
  return fltInt16;
}


//  ╔═╗╔╦╗╔═╗╔═╗╦╔═
//  ╚═╗ ║ ╠═╣║  ╠╩╗
//  ╚═╝ ╩ ╩ ╩╚═╝╩ ╩

var MIN_ALLOC = 32;


//   A, B, C, D, E, F, ?   -- initial config
//   1, 1, 1, 1, 1, 1, 0
//
//   ?, ?, X, D, ?, ?, ?   -- push config
//   0, 0, 1, 1, 0, 0, 0   -- cfg set
//   1, 1, 1, 1, 1, 1, 0   -- new set
//   0, 0, 0, 1, 0, 0, 0   -- diffs
//
//
//
//
//
//
//
//
//
//
//



function ConfigStack(){
  this._stack = new Uint32Array( (LEN * MIN_ALLOC)|0 );
  this._sets = new Uint32Array( MIN_ALLOC|0 );
  this._size = MIN_ALLOC|0;
  this._ptr = 0;

  this._headPos = 0;
  this._wcfg = new GLConfig();
  this._tmpDat = new Uint32Array( LEN|0 );
}

ConfigStack.prototype = {


  initFromGL : function( gl )
  {
    this._ptr = 0;
    this._wcfg.fromGL( gl );
    this._sets[0] = 0;
    this._stack.set( this._wcfg._dat );
  },


  push : function( cfg ){
    var ptr = this._ptr,
        sset = this._sets[ptr++],
        lset=  cfg._set,
        sptr, sdat, ldat, hdat, i, sbit, val;

    if( ptr == this._size ){
      this._grow();
    }

    sset |= lset;
    this._sets[ptr] = sset;
    this._ptr = ptr;
    sptr = ptr*(0|LEN);

    sdat = this._stack;
    ldat = cfg._dat;
    hdat = this._tmpDat;


    for( i = 0; i < (LEN|0); i++ )
    {
      sbit = DAT_MASKS[ i ];
      if( 0 !== ( lset & sbit ) ) {
        val = ldat[ i ];
      }
      else {
        val = sdat[ sptr+i-(0|LEN) ];
      }
      hdat[ i ] = val;
    }

    sdat.set( hdat, sptr );

  },


  pop : function() {
    var ptr = --this._ptr;

    if( this._headPos > ptr ){

      this._sets[ptr] |= this._sets[ptr+1];
      this._headPos = ptr;
    }


  },


  commit : function( patch ){
    var ptr = this._ptr;

    this.copyConfig( ptr, patch );

    this._headPos = ptr;
    this._sets[ ptr-1 ] |= this._sets[ ptr ];
    this._sets[ ptr ] = 0;

  },


  patch : function( cfg, out ){
    this.copyConfig( this._ptr, this._wcfg );
    this._wcfg.patch( cfg, out );
  },


  copyConfig : function( at, cfg )
  {
    var range = new Uint32Array( this._stack.buffer, at*(0|LEN) * 4,  (0|LEN));
    cfg._dat.set( range );
    cfg._set = this._sets[at];
  },


  _grow : function(){
    var s      = this._size << 1,
        stack  = new Uint32Array( s * (0|LEN) ),
        sets   = new Uint32Array( s );

    stack.set(  this._stack, 0 );
    sets.set(  this._sets, 0 );

    this._stack = stack;
    this._sets = sets;
    this._size = s;
  }

};


//  ╔═╗╔═╗╔╗╔╔═╗╦╔═╗
//  ║  ║ ║║║║╠╣ ║║ ╦
//  ╚═╝╚═╝╝╚╝╚  ╩╚═╝

var getP = function( gl, p ){
  return gl.getParameter( p );
};



function GLConfig()
{
  this._dat = new Uint16Array( 0|LEN );
  this._set = 0;
}


GLConfig.makeStack = function(){
  return new ConfigStack();
};

GLConfig.encodeHalf = function(f32){
  return encodeHalf(f32);
};

GLConfig.decodeHalf = function(u16){
  return decodeHalf(u16);
};


GLConfig.prototype = {


  toDefault: function(){
    this._dat.set( _DEFAULT_STATE );
    this._set = _DEFAULT_SET|0;
  },


  clone: function(){
    var res = new GLConfig();
    res._dat.set( this._dat );
    res._set = this._set;
    return res;
  },

  /*
  patch
  ============
  Apply this config on top of cfg input.
  */
  patch: function( cfg, out ){
    var ldat = this._dat,
        lset = this._set,
        sdat = cfg._dat,
        sset = cfg._set,
        odat = out._dat,
        oset = 0,
        sbit;

    for( var i = 0; i < (LEN|0); i++ )
    {
      sbit = DAT_MASKS[ i ];
      // data is marked as set
      if( 0 !== ( lset & sbit ) )
      {
        if( (0 === ( sset & sbit )) || (ldat[ i ] !== sdat[ i ]) ) {
          oset |= sbit;
        }
        sdat[ i ] = ldat[ i ];
      }
    }
    odat.set( sdat );
    cfg._set |= lset;
    out._set = _fixSet( oset );
  },


  setupGL: function( gl ){
    var set = this._set,
        dat = this._dat,
        i;


    // blend enabled

    if ( (set & BLEND_ENABLE_SET) === BLEND_ENABLE_SET ){
      dat[ 0|BLEND_ENABLE ] ? gl.enable( gl.BLEND ) : gl.disable( gl.BLEND );
    }


    // Blend Equation

    i = set & (BLEND_EQ_SET|BLEND_EQ_A_SET);

    if ( i !== 0 ) {
      if( i === (BLEND_EQ_SET|BLEND_EQ_A_SET) )
        gl.blendEquationSeparate( dat[ 0|BLEND_EQ_C ], dat[ 0|BLEND_EQ_A ] );
      else
        gl.blendEquation( dat[ 0|BLEND_EQ_C ] );

    }


    // Blend Function


    i = set & (BLEND_FUNC_SET|BLEND_FUNC_A_SET);

    if ( i !== 0 ){
      if( i === (BLEND_FUNC_SET|BLEND_FUNC_A_SET) )
        gl.blendFuncSeparate( dat[ 0|BLEND_FUNC_C_SRC ], dat[ 0|BLEND_FUNC_C_DST ], dat[ 0|BLEND_FUNC_A_SRC ], dat[ 0|BLEND_FUNC_A_DST ] );
      else
        gl.blendFunc( dat[ 0|BLEND_FUNC_C_SRC ], dat[ 0|BLEND_FUNC_C_DST ] );
    }


    // depth Function

    if ( (set & DEPTH_ENABLE_SET) === DEPTH_ENABLE_SET ){
      dat[ 0|DEPTH_ENABLE ] ? gl.enable( gl.DEPTH_TEST ) : gl.disable( gl.DEPTH_TEST );
    }

    if ( (set & DEPTH_FUNC_SET) === DEPTH_FUNC_SET ){
      gl.depthFunc( dat[ 0|DEPTH_FUNC ] );
    }


    // culling mode (front/back/front_and_back)


    if ( (set & CULL_FACE_ENABLE_SET) === CULL_FACE_ENABLE_SET ){
      dat[ 0|CULL_FACE_ENABLE ] ? gl.enable( gl.CULL_FACE ) : gl.disable( gl.CULL_FACE );
    }
    if ( (set & CULL_MODE_SET) === CULL_MODE_SET ){
      gl.cullFace( dat[ 0|CULL_MODE ] );
    }

    // face direction (cw/ccw)
    if ( (set & FACE_DIR_SET) === FACE_DIR_SET ){
      gl.frontFace( dat[ 0|FACE_DIR ] );
    }


    // Stencil enabled

    if ( (set & STENCIL_ENABLE_SET) === STENCIL_ENABLE_SET ){
      dat[ 0|STENCIL_ENABLE ] ? gl.enable( gl.STENCIL_TEST ) : gl.disable( gl.STENCIL_TEST );
    }

   // Stencil Function
    i = set & (STENCIL_FUNC_SET|STENCIL_B_FUNC_SET);

    if ( i !== 0 )  {
      if( i === (STENCIL_FUNC_SET|STENCIL_B_FUNC_SET) ){
        gl.stencilFuncSeparate( gl.FRONT, dat[ 0|STENCIL_FUNC ], dat[ 0|STENCIL_REF ], dat[ 0|STENCIL_VALUE_MASK ] );
        gl.stencilFuncSeparate( gl.BACK, dat[ 0|STENCIL_B_FUNC ], dat[ 0|STENCIL_B_REF ], dat[ 0|STENCIL_B_VALUE_MASK ] );
      } else {
        gl.stencilFunc( dat[ 0|STENCIL_FUNC ], dat[ 0|STENCIL_REF ], dat[ 0|STENCIL_VALUE_MASK ] );
      }
    }

    // Stencil Op
    i = set & (STENCIL_OP_SET|STENCIL_B_OP_SET);

    if ( i !== 0 ){
      if( i === (STENCIL_OP_SET|STENCIL_B_OP_SET) ){
        gl.stencilOpSeparate( gl.FRONT, dat[ 0|STENCIL_OP_FAIL ], dat[ 0|STENCIL_OP_ZFAIL ], dat[ 0|STENCIL_OP_ZPASS ] );
        gl.stencilOpSeparate( gl.BACK, dat[ 0|STENCIL_B_OP_FAIL ], dat[ 0|STENCIL_B_OP_ZFAIL ], dat[ 0|STENCIL_B_OP_ZPASS ]  );
      } else {
        gl.stencilOp( dat[ 0|STENCIL_OP_FAIL ], dat[ 0|STENCIL_OP_ZFAIL ], dat[ 0|STENCIL_OP_ZPASS ] );
      }
    }


    // Stencil Op
    i = set & (STENCIL_MASK_SET|STENCIL_B_MASK_SET);

    if ( i !== 0 ){

      if( i === (STENCIL_MASK_SET|STENCIL_B_MASK_SET) ){
        gl.stencilMaskSeparate( gl.FRONT, dat[ 0|STENCIL_WRITEMASK ] );
        gl.stencilMaskSeparate( gl.BACK, dat[ 0|STENCIL_B_WRITEMASK] );
      } else {
        gl.stencilMask( dat[ 0|STENCIL_WRITEMASK ] );
      }
    }

    if ( (set & COLOR_MASK_SET) === COLOR_MASK_SET ){
      var flags = dat[ 0|COLOR_MASK ];
      gl.colorMask(
        (flags & 1) === 1,
        (flags & 2) === 2,
        (flags & 4) === 4,
        (flags & 8) === 8
      );
    }

    if ( (set & DEPTH_MASK_SET) === DEPTH_MASK_SET ){
      gl.depthMask( dat[ 0|DEPTH_MASK ] === 1 );
    }



    if ( set & (BLEND_COLOR_SET) ){
      gl.blendColor(
        decodeClampedFloat( dat[ 0|BLEND_COLOR_R ] ),
        decodeClampedFloat( dat[ 0|BLEND_COLOR_G ] ),
        decodeClampedFloat( dat[ 0|BLEND_COLOR_B ] ),
        decodeClampedFloat( dat[ 0|BLEND_COLOR_A ] )
      );
    }


    if ( (set & POLYOFF_SET) === POLYOFF_SET ){
      gl.polygonOffset(
        decodeHalf( dat[ 0|POLYOFF_FACTOR ] ),
        decodeHalf( dat[ 0|POLYOFF_UNITS ] )
      );
    }


  },






  // todo refator -> straight copy to dat and set
  fromGL: function( gl ){
    this._set = 0;

    var enableBlend       = getP( gl, gl.BLEND ),
        enableCullface    = getP( gl, gl.CULL_FACE ),
        enableDepthTest   = getP( gl, gl.DEPTH_TEST ),
        enableDither      = getP( gl, gl.DITHER ),
        enablePolyOffset  = getP( gl, gl.POLYGON_OFFSET_FILL ),
        // enableACoverage   = getP( gl, gl.SAMPLE_ALPHA_TO_COVERAGE ),
        // enableCoverage    = getP( gl, gl.SAMPLE_COVERAGE ),
        enableScissor     = getP( gl, gl.SCISSOR_TEST ),
        enableStencil     = getP( gl, gl.STENCIL_TEST ),

        blendSrcRGB       = getP( gl, gl.BLEND_SRC_RGB ),
        blendDstRGB       = getP( gl, gl.BLEND_DST_RGB ),
        blendSrcAlpha     = getP( gl, gl.BLEND_SRC_ALPHA ),
        blendDstAlpha     = getP( gl, gl.BLEND_DST_ALPHA ),
        blendEqRgb        = getP( gl, gl.BLEND_EQUATION_RGB ),
        blendEqAlpha      = getP( gl, gl.BLEND_EQUATION_ALPHA ),
        stencilFunc       = getP( gl, gl.STENCIL_FUNC ),
        stencilRef        = getP( gl, gl.STENCIL_REF ),
        stencilValueMask  = getP( gl, gl.STENCIL_VALUE_MASK ),
        stencilWriteMask  = getP( gl, gl.STENCIL_WRITEMASK ),
        stencilOpFail     = getP( gl, gl.STENCIL_FAIL ),
        stencilOpZfail    = getP( gl, gl.STENCIL_PASS_DEPTH_FAIL ),
        stencilOpZpass    = getP( gl, gl.STENCIL_PASS_DEPTH_PASS ),
        stencilBFunc      = getP( gl, gl.STENCIL_BACK_FUNC ),
        stencilBRef       = getP( gl, gl.STENCIL_BACK_REF ),
        stencilBValueMask = getP( gl, gl.STENCIL_BACK_VALUE_MASK ),
        stencilBWriteMask = getP( gl, gl.STENCIL_BACK_WRITEMASK ),
        stencilBOpFail    = getP( gl, gl.STENCIL_BACK_FAIL ),
        stencilBOpZfail   = getP( gl, gl.STENCIL_BACK_PASS_DEPTH_FAIL ),
        stencilBOpZpass   = getP( gl, gl.STENCIL_BACK_PASS_DEPTH_PASS ),

        polyOffsetFactor  = getP( gl, gl.POLYGON_OFFSET_FACTOR ),
        polyOffsetUnits   = getP( gl, gl.POLYGON_OFFSET_UNITS ),
        scissorBox        = getP( gl, gl.SCISSOR_BOX ),
        colorMaskArray    = getP( gl, gl.COLOR_WRITEMASK ),
        depthWriteMask    = getP( gl, gl.DEPTH_WRITEMASK ),
        blendColor        = getP( gl, gl.BLEND_COLOR );




    this.enableBlend( enableBlend );

    if( blendSrcRGB !== blendSrcAlpha || blendDstRGB !== blendDstAlpha ) {
      this.blendFuncSeparate(
        blendSrcRGB,
        blendDstRGB,
        blendSrcAlpha,
        blendDstAlpha
      );
    } else {
      this.blendFunc(
        blendSrcRGB,
        blendDstRGB
      );
    }

    if( blendEqRgb !== blendEqAlpha ) {
      this.blendEquationSeparate(
        blendEqRgb,
        blendEqAlpha
      );
    } else {
      this.blendEquation(
        blendEqRgb
      );
    }



    this.enableStencil( enableStencil );
    if( stencilFunc      !== stencilBFunc     ||
        stencilRef       !== stencilBRef      ||
        stencilValueMask !== stencilBValueMask ) {
      this.stencilFuncSeparate(
        stencilFunc,
        stencilRef,
        stencilValueMask,
        stencilBFunc,
        stencilBRef,
        stencilBValueMask
      );
    } else {
      this.stencilFunc(
        stencilFunc,
        stencilRef,
        stencilValueMask
      );

    }

    if( stencilOpFail  !== stencilBOpFail   ||
        stencilOpZfail !== stencilBOpZfail  ||
        stencilOpZpass !== stencilBOpZpass ) {
      this.stencilOpSeparate(
        stencilOpFail,
        stencilOpZfail,
        stencilOpZpass,
        stencilBOpFail,
        stencilBOpZfail,
        stencilBOpZpass
      );
    } else {
      this.stencilOp(
        stencilOpFail,
        stencilOpZfail,
        stencilOpZpass
      );
    }

    if( stencilWriteMask !== stencilBWriteMask ){
      this.stencilMaskSeparate( stencilWriteMask, stencilBWriteMask );
    } else {
      this.stencilMask( stencilWriteMask );
    }


    // DEPTH
    // -----

    this.depthFunc(
      gl.getParameter( gl.DEPTH_FUNC )
    );

    this.enableDepthTest( enableDepthTest );

    // FACE CULLING
    // ------------
    this.cullFace(
      gl.getParameter( gl.CULL_FACE_MODE )
    );

    this.enableCullface( enableCullface );

    this.frontFace(
      gl.getParameter( gl.FRONT_FACE )
    );


    // POLYGON_OFFSET

    this.enablePolygonOffset( enablePolyOffset  );

    this.polygonOffset( polyOffsetFactor, polyOffsetUnits );

    // SCISSOR

    this.enableScissor   ( enableScissor     );
    this.scissor(
      scissorBox[0],
      scissorBox[1],
      scissorBox[2],
      scissorBox[3]
    );
    // DITHER
    // ------

    this.enableDither    ( enableDither      );

    this.colorMask( colorMaskArray[0], colorMaskArray[1], colorMaskArray[2], colorMaskArray[3] );

    this.depthMask( depthWriteMask );
    //this.enableACoverage ( enableACoverage   );
    //this.enableCoverage  ( enableCoverage    );

    this.blendColor(
      blendColor[0],
      blendColor[1],
      blendColor[2],
      blendColor[3]
    );

  },


  enableBlend: function( flag ){
    this._dat[ 0|BLEND_ENABLE ] = flag|0;
    this._set |= BLEND_ENABLE_SET|0;
  },

  /*
    enums
      ZERO
      ONE
      SRC_COLOR
      ONE_MINUS_SRC_COLOR
      SRC_ALPHA
      ONE_MINUS_SRC_ALPHA
      DST_ALPHA
      ONE_MINUS_DST_ALPHA
      DST_COLOR
      ONE_MINUS_DST_COLOR
      SRC_ALPHA_SATURATE
  */
  blendFunc: function( src, dst ){
    this._dat[ 0|BLEND_FUNC_C_SRC ] = src;
    this._dat[ 0|BLEND_FUNC_C_DST ] = dst;
    this._set = this._set & ~BLEND_FUNC_A_SET | (~~BLEND_FUNC_SET);
  },

  /*
    enums
      ZERO
      ONE
      SRC_COLOR
      ONE_MINUS_SRC_COLOR
      SRC_ALPHA
      ONE_MINUS_SRC_ALPHA
      DST_ALPHA
      ONE_MINUS_DST_ALPHA
      DST_COLOR
      ONE_MINUS_DST_COLOR
      SRC_ALPHA_SATURATE
  */
  blendFuncSeparate: function( srcRgb, dstRgb, srcAlpha, dstAlpha ){
    this._dat[ 0|BLEND_FUNC_C_SRC ] = srcRgb;
    this._dat[ 0|BLEND_FUNC_C_DST ] = dstRgb;
    this._dat[ 0|BLEND_FUNC_A_SRC ] = srcAlpha;
    this._dat[ 0|BLEND_FUNC_A_DST ] = dstAlpha;
    this._set |= BLEND_FUNC_SET | BLEND_FUNC_A_SET;
  },

  blendEquation: function( eq ){
    this._dat[ 0|BLEND_EQ_C ] = eq;
    this._set = this._set & ~BLEND_EQ_A_SET | (~~BLEND_EQ_SET);
  },

  /*
    enums
      FUNC_ADD
      FUNC_SUBTRACT
      FUNC_REVERSE_SUBTRACT
  */
  blendEquationSeparate : function( rgbEq, alphaEq ){
    this._dat[ 0|BLEND_EQ_C] = rgbEq;
    this._dat[ 0|BLEND_EQ_A ] = alphaEq;
    this._set |= BLEND_EQ_SET | BLEND_EQ_A_SET;
  },

  /*
    blendColor
      r g b a  as Float [0.0, 1.0]
  */
  blendColor: function( r, g, b, a ){
    this._dat[ 0|BLEND_COLOR_R ] = encodeClampedFloat( r );
    this._dat[ 0|BLEND_COLOR_G ] = encodeClampedFloat( g );
    this._dat[ 0|BLEND_COLOR_B ] = encodeClampedFloat( b );
    this._dat[ 0|BLEND_COLOR_A ] = encodeClampedFloat( a );
    this._set |= BLEND_COLOR_SET;
  },



  /*
    enums
      NEVER
      LESS
      EQUAL
      LEQUAL
      GREATER
      NOTEQUAL
      GEQUAL
      ALWAYS

  */
  depthFunc: function( func ){
    this._dat[ 0|DEPTH_FUNC ] = func;
    this._set |= DEPTH_FUNC_SET|0;
  },


  enableDepthTest: function( flag ){
    this._dat[ 0|DEPTH_ENABLE ] = flag|0;
    this._set |= DEPTH_ENABLE_SET|0;
  },



  /*
    enums
      FRONT
      BACK
      FRONT_AND_BACK
  */
  cullFace : function( mode ){
    this._dat[ 0|CULL_MODE ] = mode;
    this._set |= CULL_MODE_SET|0;
  },

  enableCullface: function( flag ){
    this._dat[ 0|CULL_FACE_ENABLE ] = flag|0;
    this._set |= CULL_FACE_ENABLE_SET|0;
  },



  // polygon offset
  //
  polygonOffset: function( polyOffsetFactor, polyOffsetUnits )
  {
    this._dat[ 0|POLYOFF_FACTOR] = encodeHalf( polyOffsetFactor );
    this._dat[ 0|POLYOFF_UNITS ] = encodeHalf( polyOffsetUnits );
    this._set |= POLYOFF_SET;
  },

  enablePolygonOffset: function( flag ){
    this._dat[ 0|POLYOFF_ENABLE ] = flag|0;
    this._set |= POLYOFF_ENABLE_SET|0;
  },



  // SCISSOR
  // --------

  enableScissor : function  ( flag ){
    this._dat[ 0|SCISSOR_ENABLE ] = flag|0;
    this._set |= SCISSOR_ENABLE_SET|0;
  },

  scissor: function( x, y, w, h )
  {
    this._dat[ 0|SCISSOR_TEST_X ] = x;
    this._dat[ 0|SCISSOR_TEST_Y ] = y;
    this._dat[ 0|SCISSOR_TEST_W ] = w;
    this._dat[ 0|SCISSOR_TEST_H ] = h;
    this._set |= SCISSOR_TEST_SET;
  },



  enableDither: function( flag ){
    this._dat[ 0|DITHER_ENABLE ] = flag|0;
    this._set |= DITHER_ENABLE_SET|0;
  },

  depthMask: function( flag ){
    this._dat[ 0|DEPTH_MASK ] = flag|0;
    this._set |= DEPTH_MASK_SET|0;
  },

  colorMask: function( r, g, b, a ){
    var mask =
      (r|0) |
      ((g|0)<<1) |
      ((b|0)<<2) |
      ((a|0)<<3);

    this._dat[ 0|COLOR_MASK ] = mask;
    this._set |= COLOR_MASK_SET|0;
  },


  // enableACoverage: function ( flag ){
  //   this._dat[ 0|ACOVERAGE_ENABLE ] = flag|0;
  //   this._set |= ACOVERAGE_ENABLE_SET|0;
  // },

  // enableCoverage  : function( flag ){
  //   this._dat[ 0|COVERAGE_ENABLE ] = flag|0;
  //   this._set |= COVERAGE_ENABLE_SET|0;
  // },






  /*
    enums
      CW
      CCW
  */
  frontFace : function( dir ){
    this._dat[ 0|FACE_DIR ] = dir;
    this._set |= FACE_DIR_SET|0;
  },

  /*
    Stencils
  */

  enableStencil: function( flag ){
    this._dat[ 0|STENCIL_ENABLE ] = flag|0;
    this._set |= STENCIL_ENABLE_SET|0;
  },

  stencilFunc: function ( func, ref, mask ){
    this._dat[ 0|STENCIL_FUNC       ] = func;
    this._dat[ 0|STENCIL_REF        ] = ref;
    this._dat[ 0|STENCIL_VALUE_MASK ] = mask;
    this._set = this._set & ~STENCIL_B_FUNC_SET | (~~STENCIL_FUNC_SET);
  },

  stencilOp : function( sfail, dpfail, dppass ){
    this._dat[ 0|STENCIL_OP_FAIL ] = sfail;
    this._dat[ 0|STENCIL_OP_ZFAIL] = dpfail;
    this._dat[ 0|STENCIL_OP_ZPASS ] = dppass;
    this._set = this._set & ~STENCIL_B_OP_SET | (~~STENCIL_OP_SET);
  },

  stencilMask : function( mask ){
    this._dat[ 0|STENCIL_WRITEMASK ] = mask;
    this._set = (this._set & ~STENCIL_B_MASK_SET) | (~~STENCIL_MASK_SET);
  },



  stencilFuncSeparate: function ( func, ref, mask, funcback, refback, maskback ){
    var dat = this._dat;
    dat[ 0|STENCIL_FUNC         ] = func;
    dat[ 0|STENCIL_REF          ] = ref;
    dat[ 0|STENCIL_VALUE_MASK   ] = mask;
    dat[ 0|STENCIL_B_FUNC       ] = funcback;
    dat[ 0|STENCIL_B_REF        ] = refback;
    dat[ 0|STENCIL_B_VALUE_MASK ] = maskback;
    this._set |= STENCIL_B_FUNC_SET | STENCIL_FUNC_SET;
  },

  stencilOpSeparate: function ( sfail, dpfail, dppass, sfailback, dpfailback, dppassback ){
    var dat = this._dat;
    dat[ 0|STENCIL_OP_FAIL    ] = sfail;
    dat[ 0|STENCIL_OP_ZFAIL   ] = dpfail;
    dat[ 0|STENCIL_OP_ZPASS   ] = dppass;
    dat[ 0|STENCIL_B_OP_FAIL  ] = sfailback;
    dat[ 0|STENCIL_B_OP_ZFAIL ] = dpfailback;
    dat[ 0|STENCIL_B_OP_ZPASS ] = dppassback;
    this._set |= STENCIL_B_OP_SET | STENCIL_OP_SET;
  },

  stencilMaskSeparate: function ( mask, maskback ){
    this._dat[ 0|STENCIL_WRITEMASK   ] = mask;
    this._dat[ 0|STENCIL_B_WRITEMASK ] = maskback;
    this._set |= STENCIL_B_MASK_SET | STENCIL_MASK_SET;
  }

};

module.exports = GLConfig;