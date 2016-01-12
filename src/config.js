(function(){
/*
 * All following contstants should be inlined by uglify js
 * use  0|CONST  or  ~~CONTS to force constants evaluation and inline exp by uglifyjs2
 */
const BLEND_ENABLE          = 0 ,
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
      VIEWPORT_X            = 44,
      VIEWPORT_Y            = 45,
      VIEWPORT_W            = 46,
      VIEWPORT_H            = 47,
      DEPTH_RANGE_NEAR      = 48,
      DEPTH_RANGE_FAR       = 49,
      LINE_WIDTH            = 50,

      LEN = 51,


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
      VIEWPORT_SET           = 1 << 27,
      DEPTH_RANGE_SET        = 1 << 28,
      LINE_WIDTH_SET         = 1 << 29;


const GL_BLEND                          = 0x0BE2,
      GL_CULL_FACE                      = 0x0B44,
      GL_DEPTH_TEST                     = 0x0B71,
      GL_DITHER                         = 0x0BD0,
      GL_POLYGON_OFFSET_FILL            = 0x8037,
      GL_SCISSOR_TEST                   = 0x0C11,
      GL_STENCIL_TEST                   = 0x0B90,
      GL_BLEND_SRC_RGB                  = 0x80C9,
      GL_BLEND_DST_RGB                  = 0x80C8,
      GL_BLEND_SRC_ALPHA                = 0x80CB,
      GL_BLEND_DST_ALPHA                = 0x80CA,
      GL_BLEND_EQUATION_RGB             = 0x8009,
      GL_BLEND_EQUATION_ALPHA           = 0x883D,
      GL_STENCIL_FUNC                   = 0x0B92,
      GL_STENCIL_REF                    = 0x0B97,
      GL_STENCIL_VALUE_MASK             = 0x0B93,
      GL_STENCIL_WRITEMASK              = 0x0B98,
      GL_STENCIL_FAIL                   = 0x0B94,
      GL_STENCIL_PASS_DEPTH_FAIL        = 0x0B95,
      GL_STENCIL_PASS_DEPTH_PASS        = 0x0B96,
      GL_STENCIL_BACK_FUNC              = 0x8800,
      GL_STENCIL_BACK_REF               = 0x8CA3,
      GL_STENCIL_BACK_VALUE_MASK        = 0x8CA4,
      GL_STENCIL_BACK_WRITEMASK         = 0x8CA5,
      GL_STENCIL_BACK_FAIL              = 0x8801,
      GL_STENCIL_BACK_PASS_DEPTH_FAIL   = 0x8802,
      GL_STENCIL_BACK_PASS_DEPTH_PASS   = 0x8803,
      GL_POLYGON_OFFSET_FACTOR          = 0x8038,
      GL_POLYGON_OFFSET_UNITS           = 0x2A00,
      GL_SCISSOR_BOX                    = 0x0C10,
      GL_COLOR_WRITEMASK                = 0x0C23,
      GL_DEPTH_WRITEMASK                = 0x0B72,
      GL_BLEND_COLOR                    = 0x8005,
      GL_VIEWPORT                       = 0x0BA2,
      GL_DEPTH_RANGE                    = 0x0B70,
      GL_LINE_WIDTH                     = 0x0B21,
      // GL_SAMPLE_ALPHA_TO_COVERAGE       = 0x809E,
      // GL_SAMPLE_COVERAGE                = 0x80A0,
      GL_FRONT                          = 0x0404,
      GL_BACK                           = 0x0405,
      GL_DEPTH_FUNC                     = 0x0B74,
      GL_CULL_FACE_MODE                 = 0x0B45,
      GL_FRONT_FACE                     = 0x0B46;


var DAT_MASKS = [
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
      STENCIL_MASK_SET|0,
      STENCIL_OP_SET|0,
      STENCIL_OP_SET|0,
      STENCIL_OP_SET|0,
      STENCIL_B_FUNC_SET|0,
      STENCIL_B_FUNC_SET|0,
      STENCIL_B_FUNC_SET|0,
      STENCIL_B_MASK_SET|0,
      STENCIL_B_OP_SET|0,
      STENCIL_B_OP_SET|0,
      STENCIL_B_OP_SET|0,

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
      BLEND_COLOR_SET|0,

      VIEWPORT_SET|0,
      VIEWPORT_SET|0,
      VIEWPORT_SET|0,
      VIEWPORT_SET|0,

      DEPTH_RANGE_SET|0,
      DEPTH_RANGE_SET|0,

      LINE_WIDTH_SET|0
    ],


    //            <b >< enab  >
    // b 0001111110011000000000
    _DEFAULT_SET = (
      0|BLEND_ENABLE_SET      |
      0|CULL_FACE_ENABLE_SET  |
      0|DEPTH_ENABLE_SET      |
      0|DITHER_ENABLE_SET     |
      0|POLYOFF_ENABLE_SET    |
      0|SCISSOR_ENABLE_SET    |
      0|STENCIL_ENABLE_SET    |
      0|BLEND_EQ_SET          |
      0|BLEND_FUNC_SET        |
      0|DEPTH_FUNC_SET        |
      0|CULL_MODE_SET         |
      0|FACE_DIR_SET          |
      0|STENCIL_FUNC_SET      |
      0|STENCIL_OP_SET        |
      0|STENCIL_MASK_SET      |
      0|SCISSOR_TEST_SET      |
      0|POLYOFF_SET           |
      0|COLOR_MASK_SET        |
      0|DEPTH_MASK_SET        |
      0|BLEND_COLOR_SET       |
      0|DEPTH_RANGE_SET       |
      0|LINE_WIDTH_SET
    ),


    _DEFAULT_STATE = new Uint16Array([
      0,             // BLEND disabled
      32774,         // BLEND_EQ_C            :   FUNC_ADD
      0,             // BLEND_FUNC_C_DST      :   ZERO
      1,             // BLEND_FUNC_C_SRC      :   ONE
      0,             // BLEND_EQ_A            :   --
      0,             // BLEND_FUNC_A_DST      :   --
      0,             // BLEND_FUNC_A_SRC      :   --

      0,             // DEPTH disabled
      513,           // DEPTH_FUNC            :   gl.LESS

      0,             // CULL_FACE disabled
      1029,          // CULL_MODE             :   gl.BACK
      2305,          // FACE_DIR              :   gl.CCW

      0,             // STENCIL disabled
      519,           // STENCIL_FUNC          :   gl.ALWAYS
      0,             // STENCIL_REF           :   0x0
      65535,         // STENCIL_VALUE_MASK    :   0xFFFF
      65535,         // STENCIL_WRITEMASK     :   0xFFFF
      7680,          // STENCIL_OP_FAIL       :   gl.KEEP
      7680,          // STENCIL_OP_ZFAIL      :   gl.KEEP
      7680,          // STENCIL_OP_ZPASS      :   gl.KEEP
      0,             // STENCIL_B_FUNC        :   --
      0,             // STENCIL_B_REF         :   --
      0,             // STENCIL_B_VALUE_MASK  :   --
      0,             // STENCIL_B_WRITEMASK   :   --
      0,             // STENCIL_B_OP_FAIL     :   --
      0,             // STENCIL_B_OP_ZFAIL    :   --
      0,             // STENCIL_B_OP_ZPASS    :   --

      0,             // SCISSOR enabled
      0, 0, 0,  0,   // SCISSOR_TEST          :   h

      1,             // DITHER enabled
      0,             // POLYOFF enabled
      0,             // POLYOFF factor
      0,             // POLYOFF units

      0,             // COVERAGE enabled
      0,             // ACOVERAGE enabled

      15,            // color mask 1111,
      1,             // write to depth

      0, 0, 0, 0,    // blend color

      0, 0, 0, 0,    // viewport

      // depthRange
      encodeClampedFloat(0),
      encodeClampedFloat(1),

      // lineWidth
      encodeClampedFloat(1),

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
  return Math.round(f*0xFFFF)|0;
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


var getP = function( gl, p ){
  return gl.getParameter( p );
};



function GLConfig()
{
  this._dat = new Uint16Array( 0|LEN );
  this._set = 0;
}

GLConfig.DAT_MASKS = DAT_MASKS;


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

    if ( (set & ~~BLEND_ENABLE_SET) !== 0 ) {
      dat[ 0|BLEND_ENABLE ] ? gl.enable( ~~GL_BLEND ) : gl.disable( ~~GL_BLEND );
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

    if ( (set & ~~DEPTH_ENABLE_SET) !== 0 ){
      dat[ 0|DEPTH_ENABLE ] ? gl.enable( ~~GL_DEPTH_TEST ) : gl.disable( ~~GL_DEPTH_TEST );
    }

    if ( (set & ~~DEPTH_FUNC_SET) !== 0 ){
      gl.depthFunc( dat[ 0|DEPTH_FUNC ] );
    }


    // culling mode (front/back/front_and_back)


    if ( (set & ~~CULL_FACE_ENABLE_SET) !== 0 ){
      dat[ 0|CULL_FACE_ENABLE ] ? gl.enable( ~~GL_CULL_FACE ) : gl.disable( ~~GL_CULL_FACE );
    }
    if ( (set & ~~CULL_MODE_SET) !== 0 ){
      gl.cullFace( dat[ 0|CULL_MODE ] );
    }

    // face direction (cw/ccw)
    if ( (set & ~~FACE_DIR_SET) !== 0 ){
      gl.frontFace( dat[ 0|FACE_DIR ] );
    }


    // Stencil enabled

    if ( (set & ~~STENCIL_ENABLE_SET) !== 0 ){
      dat[ 0|STENCIL_ENABLE ] ? gl.enable( ~~GL_STENCIL_TEST ) : gl.disable( ~~GL_STENCIL_TEST );
    }

   // Stencil Function
    i = set & (STENCIL_FUNC_SET|STENCIL_B_FUNC_SET);

    if ( i !== 0 )  {
      if( i === (STENCIL_FUNC_SET|STENCIL_B_FUNC_SET) ){
        gl.stencilFuncSeparate( ~~GL_FRONT, dat[ 0|STENCIL_FUNC ], dat[ 0|STENCIL_REF ], dat[ 0|STENCIL_VALUE_MASK ] );
        gl.stencilFuncSeparate( ~~GL_BACK, dat[ 0|STENCIL_B_FUNC ], dat[ 0|STENCIL_B_REF ], dat[ 0|STENCIL_B_VALUE_MASK ] );
      } else {
        gl.stencilFunc( dat[ 0|STENCIL_FUNC ], dat[ 0|STENCIL_REF ], dat[ 0|STENCIL_VALUE_MASK ] );
      }
    }

    // Stencil Op
    i = set & (STENCIL_OP_SET|STENCIL_B_OP_SET);

    if ( i !== 0 ){
      if( i === (STENCIL_OP_SET|STENCIL_B_OP_SET) ){
        gl.stencilOpSeparate( ~~GL_FRONT, dat[ 0|STENCIL_OP_FAIL ], dat[ 0|STENCIL_OP_ZFAIL ], dat[ 0|STENCIL_OP_ZPASS ] );
        gl.stencilOpSeparate( ~~GL_BACK, dat[ 0|STENCIL_B_OP_FAIL ], dat[ 0|STENCIL_B_OP_ZFAIL ], dat[ 0|STENCIL_B_OP_ZPASS ]  );
      } else {
        gl.stencilOp( dat[ 0|STENCIL_OP_FAIL ], dat[ 0|STENCIL_OP_ZFAIL ], dat[ 0|STENCIL_OP_ZPASS ] );
      }
    }


    // Stencil Op
    i = set & (STENCIL_MASK_SET|STENCIL_B_MASK_SET);

    if ( i !== 0 ){

      if( i === (STENCIL_MASK_SET|STENCIL_B_MASK_SET) ){
        gl.stencilMaskSeparate( ~~GL_FRONT, dat[ 0|STENCIL_WRITEMASK ] );
        gl.stencilMaskSeparate( ~~GL_BACK, dat[ 0|STENCIL_B_WRITEMASK] );
      } else {
        gl.stencilMask( dat[ 0|STENCIL_WRITEMASK ] );
      }
    }

    if ( (set & ~~COLOR_MASK_SET) !== 0 ){
      var flags = dat[ 0|COLOR_MASK ];
      gl.colorMask(
        (flags & 1) === 1,
        (flags & 2) === 2,
        (flags & 4) === 4,
        (flags & 8) === 8
      );
    }

    if ( (set & ~~DEPTH_MASK_SET) !== 0 ){
      gl.depthMask( dat[ 0|DEPTH_MASK ] === 1 );
    }



    if ( (set & ~~BLEND_COLOR_SET) !== 0 ){
      gl.blendColor(
        decodeHalf( dat[ 0|BLEND_COLOR_R ] ),
        decodeHalf( dat[ 0|BLEND_COLOR_G ] ),
        decodeHalf( dat[ 0|BLEND_COLOR_B ] ),
        decodeHalf( dat[ 0|BLEND_COLOR_A ] )
      );
    }

    if ( (set & ~~SCISSOR_ENABLE_SET) !== 0 ){
      dat[ 0|SCISSOR_ENABLE ] ? gl.enable( ~~GL_SCISSOR_TEST ) : gl.disable( ~~GL_SCISSOR_TEST );
    }

    if ( (set & ~~SCISSOR_TEST_SET) !== 0 ){
      gl.scissor(
        dat[ 0|SCISSOR_TEST_X ],
        dat[ 0|SCISSOR_TEST_Y ],
        dat[ 0|SCISSOR_TEST_W ],
        dat[ 0|SCISSOR_TEST_H ]
      );
    }

    if ( (set & ~~VIEWPORT_SET) !== 0 ){
      gl.viewport(
        dat[ 0|VIEWPORT_X ],
        dat[ 0|VIEWPORT_Y ],
        dat[ 0|VIEWPORT_W ],
        dat[ 0|VIEWPORT_H ]
      );
    }


    if ( (set & ~~POLYOFF_SET) !== 0 ){
      gl.polygonOffset(
        decodeHalf( dat[ 0|POLYOFF_FACTOR ] ),
        decodeHalf( dat[ 0|POLYOFF_UNITS ] )
      );
    }


    if ( (set & ~~DEPTH_RANGE_SET) !== 0 ){
      gl.depthRange(
        decodeClampedFloat( dat[ 0|DEPTH_RANGE_NEAR ] ),
        decodeClampedFloat( dat[ 0|DEPTH_RANGE_FAR ] )
      );
    }



  },






  // todo refator -> straight copy to dat and set
  fromGL: function( gl ){
    this._set = 0;

    var enableBlend       = getP( gl, ~~GL_BLEND ),
        enableCullface    = getP( gl, ~~GL_CULL_FACE ),
        enableDepthTest   = getP( gl, ~~GL_DEPTH_TEST ),
        enableDither      = getP( gl, ~~GL_DITHER ),
        enablePolyOffset  = getP( gl, ~~GL_POLYGON_OFFSET_FILL ),
        // enableACoverage   = getP( gl, ~~GL_SAMPLE_ALPHA_TO_COVERAGE ),
        // enableCoverage    = getP( gl, ~~GL_SAMPLE_COVERAGE ),
        enableScissor     = getP( gl, ~~GL_SCISSOR_TEST ),
        enableStencil     = getP( gl, ~~GL_STENCIL_TEST ),

        blendSrcRGB       = getP( gl, ~~GL_BLEND_SRC_RGB ),
        blendDstRGB       = getP( gl, ~~GL_BLEND_DST_RGB ),
        blendSrcAlpha     = getP( gl, ~~GL_BLEND_SRC_ALPHA ),
        blendDstAlpha     = getP( gl, ~~GL_BLEND_DST_ALPHA ),
        blendEqRgb        = getP( gl, ~~GL_BLEND_EQUATION_RGB ),
        blendEqAlpha      = getP( gl, ~~GL_BLEND_EQUATION_ALPHA ),
        stencilFunc       = getP( gl, ~~GL_STENCIL_FUNC ),
        stencilRef        = getP( gl, ~~GL_STENCIL_REF ),
        stencilValueMask  = getP( gl, ~~GL_STENCIL_VALUE_MASK ),
        stencilWriteMask  = getP( gl, ~~GL_STENCIL_WRITEMASK ),
        stencilOpFail     = getP( gl, ~~GL_STENCIL_FAIL ),
        stencilOpZfail    = getP( gl, ~~GL_STENCIL_PASS_DEPTH_FAIL ),
        stencilOpZpass    = getP( gl, ~~GL_STENCIL_PASS_DEPTH_PASS ),
        stencilBFunc      = getP( gl, ~~GL_STENCIL_BACK_FUNC ),
        stencilBRef       = getP( gl, ~~GL_STENCIL_BACK_REF ),
        stencilBValueMask = getP( gl, ~~GL_STENCIL_BACK_VALUE_MASK ),
        stencilBWriteMask = getP( gl, ~~GL_STENCIL_BACK_WRITEMASK ),
        stencilBOpFail    = getP( gl, ~~GL_STENCIL_BACK_FAIL ),
        stencilBOpZfail   = getP( gl, ~~GL_STENCIL_BACK_PASS_DEPTH_FAIL ),
        stencilBOpZpass   = getP( gl, ~~GL_STENCIL_BACK_PASS_DEPTH_PASS ),

        polyOffsetFactor  = getP( gl, ~~GL_POLYGON_OFFSET_FACTOR ),
        polyOffsetUnits   = getP( gl, ~~GL_POLYGON_OFFSET_UNITS ),
        scissorBox        = getP( gl, ~~GL_SCISSOR_BOX ),
        colorMaskArray    = getP( gl, ~~GL_COLOR_WRITEMASK ),
        depthWriteMask    = getP( gl, ~~GL_DEPTH_WRITEMASK ),
        blendColor        = getP( gl, ~~GL_BLEND_COLOR ),
        viewport          = getP( gl, ~~GL_VIEWPORT ),
        depthRange        = getP( gl, ~~GL_DEPTH_RANGE ),
        lineWidth         = getP( gl, ~~GL_LINE_WIDTH );




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
      gl.getParameter( ~~GL_DEPTH_FUNC )
    );

    this.enableDepthTest( enableDepthTest );

    // FACE CULLING
    // ------------
    this.cullFace(
      gl.getParameter( ~~GL_CULL_FACE_MODE )
    );

    this.enableCullface( enableCullface );

    this.frontFace(
      gl.getParameter( ~~GL_FRONT_FACE )
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

    this.viewport(
      viewport[0],
      viewport[1],
      viewport[2],
      viewport[3]
    );

    this.depthRange(
      depthRange[0],
      depthRange[1]
    );

    this.lineWidth( lineWidth );

  },


  enableBlend: function( flag ){
    if( flag === undefined ) flag = true;
    this._dat[ 0|BLEND_ENABLE ] = flag|0;
    this._set |= BLEND_ENABLE_SET|0;
    return this;
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
    return this;
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
    return this;
  },

  blendEquation: function( eq ){
    this._dat[ 0|BLEND_EQ_C ] = eq;
    this._set = this._set & ~BLEND_EQ_A_SET | (~~BLEND_EQ_SET);
    return this;
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
    return this;
  },

  /*
    blendColor
      r g b a  as Float [0.0, 1.0]
  */
  blendColor: function( r, g, b, a ){
    this._dat[ 0|BLEND_COLOR_R ] = encodeHalf( r );
    this._dat[ 0|BLEND_COLOR_G ] = encodeHalf( g );
    this._dat[ 0|BLEND_COLOR_B ] = encodeHalf( b );
    this._dat[ 0|BLEND_COLOR_A ] = encodeHalf( a );
    this._set |= BLEND_COLOR_SET|0;
    return this;
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
    return this;
  },


  enableDepthTest: function( flag ){
    if( flag === undefined ) flag = true;
    this._dat[ 0|DEPTH_ENABLE ] = flag|0;
    this._set |= DEPTH_ENABLE_SET|0;
    return this;
  },

  depthRange : function( near, far ){
    this._dat[ 0|DEPTH_RANGE_NEAR ] = encodeClampedFloat( near );
    this._dat[ 0|DEPTH_RANGE_FAR ]  = encodeClampedFloat( far );
    this._set |= DEPTH_RANGE_SET|0;
    return this;
  },

  lineWidth: function( w ){
    this._dat[ 0|LINE_WIDTH ] = encodeClampedFloat( w );
    this._set |= LINE_WIDTH_SET|0;
    return this;
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
    return this;
  },

  enableCullface: function( flag ){
    if( flag === undefined ) flag = true;
    this._dat[ 0|CULL_FACE_ENABLE ] = flag|0;
    this._set |= CULL_FACE_ENABLE_SET|0;
    return this;
  },



  // polygon offset
  //
  polygonOffset: function( polyOffsetFactor, polyOffsetUnits )
  {
    this._dat[ 0|POLYOFF_FACTOR] = encodeHalf( polyOffsetFactor );
    this._dat[ 0|POLYOFF_UNITS ] = encodeHalf( polyOffsetUnits );
    this._set |= POLYOFF_SET|0;
    return this;
  },

  enablePolygonOffset: function( flag ){
    this._dat[ 0|POLYOFF_ENABLE ] = flag|0;
    this._set |= POLYOFF_ENABLE_SET|0;
    return this;
  },



  // SCISSOR
  // --------

  enableScissor : function  ( flag ){
    if( flag === undefined ) flag = true;
    this._dat[ 0|SCISSOR_ENABLE ] = flag|0;
    this._set |= SCISSOR_ENABLE_SET|0;
    return this;
  },

  scissor: function( x, y, w, h )
  {
    this._dat[ 0|SCISSOR_TEST_X ] = x;
    this._dat[ 0|SCISSOR_TEST_Y ] = y;
    this._dat[ 0|SCISSOR_TEST_W ] = w;
    this._dat[ 0|SCISSOR_TEST_H ] = h;
    this._set |= SCISSOR_TEST_SET|0;
    return this;
  },

  // VIEWPORT
  // --------

  viewport: function( x, y, w, h ){
    this._dat[ 0|VIEWPORT_X ] = x;
    this._dat[ 0|VIEWPORT_Y ] = y;
    this._dat[ 0|VIEWPORT_W ] = w;
    this._dat[ 0|VIEWPORT_H ] = h;
    this._set |= VIEWPORT_SET|0;
    return this;
  },


  enableDither: function( flag ){
    if( flag === undefined ) flag = true;
    this._dat[ 0|DITHER_ENABLE ] = flag|0;
    this._set |= DITHER_ENABLE_SET|0;
    return this;
  },

  depthMask: function( flag ){
    this._dat[ 0|DEPTH_MASK ] = flag|0;
    this._set |= DEPTH_MASK_SET|0;
    return this;
  },

  colorMask: function( r, g, b, a ){
    var mask =
      (r|0) |
      ((g|0)<<1) |
      ((b|0)<<2) |
      ((a|0)<<3);

    this._dat[ 0|COLOR_MASK ] = mask;
    this._set |= COLOR_MASK_SET|0;
    return this;
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
    return this;
  },

  /*
    Stencils
  */

  enableStencil: function( flag ){
    if( flag === undefined ) flag = true;
    this._dat[ 0|STENCIL_ENABLE ] = flag|0;
    this._set |= STENCIL_ENABLE_SET|0;
    return this;
  },

  stencilFunc: function ( func, ref, mask ){
    this._dat[ 0|STENCIL_FUNC       ] = func;
    this._dat[ 0|STENCIL_REF        ] = ref;
    this._dat[ 0|STENCIL_VALUE_MASK ] = mask;
    this._set = this._set & ~STENCIL_B_FUNC_SET | (~~STENCIL_FUNC_SET);
    return this;
  },

  stencilOp : function( sfail, dpfail, dppass ){
    this._dat[ 0|STENCIL_OP_FAIL ] = sfail;
    this._dat[ 0|STENCIL_OP_ZFAIL] = dpfail;
    this._dat[ 0|STENCIL_OP_ZPASS ] = dppass;
    this._set = this._set & ~STENCIL_B_OP_SET | (~~STENCIL_OP_SET);
    return this;
  },

  stencilMask : function( mask ){
    this._dat[ 0|STENCIL_WRITEMASK ] = mask;
    this._set = (this._set & ~STENCIL_B_MASK_SET) | (~~STENCIL_MASK_SET);
    return this;
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
    return this;
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
    return this;
  },

  stencilMaskSeparate: function ( mask, maskback ){
    this._dat[ 0|STENCIL_WRITEMASK   ] = mask;
    this._dat[ 0|STENCIL_B_WRITEMASK ] = maskback;
    this._set |= STENCIL_B_MASK_SET | STENCIL_MASK_SET;
    return this;
  }

};

module.exports = GLConfig;

})();