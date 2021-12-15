
/*
 * All following contstants should be inlined by uglify js
 * use  CONST  or  CONTS to force constants evaluation and inline exp by uglifyjs2
 */

const enum Slots {

  BLEND_ENABLE          = 0 ,
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
}

export const DAT_SIZE = Slots.LEN;

const enum SetsBits {

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
  LINE_WIDTH_SET         = 1 << 29,
    
}

const enum GL {
  BLEND                          = 0x0BE2,
  CULL_FACE                      = 0x0B44,
  DEPTH_TEST                     = 0x0B71,
  DITHER                         = 0x0BD0,
  POLYGON_OFFSET_FILL            = 0x8037,
  SCISSOR_TEST                   = 0x0C11,
  STENCIL_TEST                   = 0x0B90,
  BLEND_SRC_RGB                  = 0x80C9,
  BLEND_DST_RGB                  = 0x80C8,
  BLEND_SRC_ALPHA                = 0x80CB,
  BLEND_DST_ALPHA                = 0x80CA,
  BLEND_EQUATION_RGB             = 0x8009,
  BLEND_EQUATION_ALPHA           = 0x883D,
  STENCIL_FUNC                   = 0x0B92,
  STENCIL_REF                    = 0x0B97,
  STENCIL_VALUE_MASK             = 0x0B93,
  STENCIL_WRITEMASK              = 0x0B98,
  STENCIL_FAIL                   = 0x0B94,
  STENCIL_PASS_DEPTH_FAIL        = 0x0B95,
  STENCIL_PASS_DEPTH_PASS        = 0x0B96,
  STENCIL_BACK_FUNC              = 0x8800,
  STENCIL_BACK_REF               = 0x8CA3,
  STENCIL_BACK_VALUE_MASK        = 0x8CA4,
  STENCIL_BACK_WRITEMASK         = 0x8CA5,
  STENCIL_BACK_FAIL              = 0x8801,
  STENCIL_BACK_PASS_DEPTH_FAIL   = 0x8802,
  STENCIL_BACK_PASS_DEPTH_PASS   = 0x8803,
  POLYGON_OFFSET_FACTOR          = 0x8038,
  POLYGON_OFFSET_UNITS           = 0x2A00,
  SCISSOR_BOX                    = 0x0C10,
  COLOR_WRITEMASK                = 0x0C23,
  DEPTH_WRITEMASK                = 0x0B72,
  BLEND_COLOR                    = 0x8005,
  VIEWPORT                       = 0x0BA2,
  DEPTH_RANGE                    = 0x0B70,
  LINE_WIDTH                     = 0x0B21,
  // SAMPLE_ALPHA_TO_COVERAGE       = 0x809E,
  // SAMPLE_COVERAGE                = 0x80A0,
  FRONT                          = 0x0404,
  BACK                           = 0x0405,
  DEPTH_FUNC                     = 0x0B74,
  CULL_FACE_MODE                 = 0x0B45,
  FRONT_FACE                     = 0x0B46,
}


// half float encode/decode
const EHBuffer = new Float32Array( 1 );
const EHIBuffer = new Uint32Array( EHBuffer.buffer );


export const DAT_MASKS : readonly SetsBits[] = [
      SetsBits.BLEND_ENABLE_SET,
      SetsBits.BLEND_EQ_SET,
      SetsBits.BLEND_FUNC_SET,
      SetsBits.BLEND_FUNC_SET,
      SetsBits.BLEND_EQ_A_SET,
      SetsBits.BLEND_FUNC_A_SET,
      SetsBits.BLEND_FUNC_A_SET,

      SetsBits.DEPTH_ENABLE_SET,
      SetsBits.DEPTH_FUNC_SET,

      SetsBits.CULL_FACE_ENABLE_SET,
      SetsBits.CULL_MODE_SET,
      SetsBits.FACE_DIR_SET,

      SetsBits.STENCIL_ENABLE_SET,
      SetsBits.STENCIL_FUNC_SET,
      SetsBits.STENCIL_FUNC_SET,
      SetsBits.STENCIL_FUNC_SET,
      SetsBits.STENCIL_MASK_SET,
      SetsBits.STENCIL_OP_SET,
      SetsBits.STENCIL_OP_SET,
      SetsBits.STENCIL_OP_SET,
      SetsBits.STENCIL_B_FUNC_SET,
      SetsBits.STENCIL_B_FUNC_SET,
      SetsBits.STENCIL_B_FUNC_SET,
      SetsBits.STENCIL_B_MASK_SET,
      SetsBits.STENCIL_B_OP_SET,
      SetsBits.STENCIL_B_OP_SET,
      SetsBits.STENCIL_B_OP_SET,

      SetsBits.SCISSOR_ENABLE_SET,
      SetsBits.SCISSOR_TEST_SET,
      SetsBits.SCISSOR_TEST_SET,
      SetsBits.SCISSOR_TEST_SET,
      SetsBits.SCISSOR_TEST_SET,

      SetsBits.DITHER_ENABLE_SET,

      SetsBits.POLYOFF_ENABLE_SET,
      SetsBits.POLYOFF_SET,
      SetsBits.POLYOFF_SET,

      SetsBits.COVERAGE_ENABLE_SET,
      SetsBits.ACOVERAGE_ENABLE_SET,

      SetsBits.COLOR_MASK_SET,
      SetsBits.DEPTH_MASK_SET,

      SetsBits.BLEND_COLOR_SET,
      SetsBits.BLEND_COLOR_SET,
      SetsBits.BLEND_COLOR_SET,
      SetsBits.BLEND_COLOR_SET,

      SetsBits.VIEWPORT_SET,
      SetsBits.VIEWPORT_SET,
      SetsBits.VIEWPORT_SET,
      SetsBits.VIEWPORT_SET,

      SetsBits.DEPTH_RANGE_SET,
      SetsBits.DEPTH_RANGE_SET,

      SetsBits.LINE_WIDTH_SET
    ] as const,


    //            <b >< enab  >
    // b 0001111110011000000000
    _DEFAULT_SET : number = (
      SetsBits.BLEND_ENABLE_SET      |
      SetsBits.CULL_FACE_ENABLE_SET  |
      SetsBits.DEPTH_ENABLE_SET      |
      SetsBits.DITHER_ENABLE_SET     |
      SetsBits.POLYOFF_ENABLE_SET    |
      SetsBits.SCISSOR_ENABLE_SET    |
      SetsBits.STENCIL_ENABLE_SET    |
      SetsBits.BLEND_EQ_SET          |
      SetsBits.BLEND_FUNC_SET        |
      SetsBits.DEPTH_FUNC_SET        |
      SetsBits.CULL_MODE_SET         |
      SetsBits.FACE_DIR_SET          |
      SetsBits.STENCIL_FUNC_SET      |
      SetsBits.STENCIL_OP_SET        |
      SetsBits.STENCIL_MASK_SET      |
      SetsBits.SCISSOR_TEST_SET      |
      SetsBits.POLYOFF_SET           |
      SetsBits.COLOR_MASK_SET        |
      SetsBits.DEPTH_MASK_SET        |
      SetsBits.BLEND_COLOR_SET       |
      SetsBits.DEPTH_RANGE_SET       |
      SetsBits.LINE_WIDTH_SET
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
      encodeHalf(1),

    ]);




// avoid set inconsistency for '*separate' configs
function _fixSet( set:number ):number{
  return (set |
      (( set & SetsBits.BLEND_FUNC_A_SET   ) >>> 2 ) |
      (( set & SetsBits.BLEND_EQ_A_SET     ) >>> 2 ) |
      (( set & SetsBits.STENCIL_B_FUNC_SET ) >>> 3 ) |
      (( set & SetsBits.STENCIL_B_OP_SET   ) >>> 3 ) |
      (( set & SetsBits.STENCIL_B_MASK_SET ) >>> 3 )
    );
}



function encodeClampedFloat(f:number):number{
  return Math.round(f*0xFFFF)|0;
}

function decodeClampedFloat(s:number):number{
  return (s/(+0xFFFF));
}


// http://stackoverflow.com/questions/5678432/decompressing-half-precision-floats-in-javascript
//
function decodeHalf (u16:number):number {
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


function encodeHalf(f32:number){
  EHBuffer[0] = f32;
  const fltInt32 = EHIBuffer[0];

  let fltInt16 = (fltInt32 >> 31) << 5;
  let tmp = (fltInt32 >> 23) & 0xff;
  tmp = (tmp - 0x70) & (( (0x70 - tmp) >> 4) >> 27);
  fltInt16 = (fltInt16 | tmp) << 10;
  fltInt16 |= (fltInt32 >> 13) & 0x3ff;
  return fltInt16;
}


function getGlParameter( gl:WebGLRenderingContext, p:GLenum ){
  return gl.getParameter( p );
};



export default class GLConfig {

  static encodeHalf(f32:number) : number{
    return encodeHalf(f32);
  }
  
  static decodeHalf(u16:number) : number{
    return decodeHalf(u16);
  }


  readonly _dat: Uint16Array;
  _set: number;

  constructor(){
    this._dat = new Uint16Array( Slots.LEN );
    this._set = 0;
  }
  
  
  
    
  toDefault(){
    this._dat.set( _DEFAULT_STATE );
    this._set = _DEFAULT_SET|0;
  }


  clone() : GLConfig {
    const res = new GLConfig();
    res._dat.set( this._dat );
    res._set = this._set;
    return res;
  }

  /*
  patch
  ============
  Apply this config on top of cfg input.
  */
  patch( cfg:GLConfig, out:GLConfig ){
    var ldat = this._dat,
        lset = this._set,
        sdat = cfg._dat,
        sset = cfg._set,
        odat = out._dat,
        oset = 0,
        sbit;

    for( var i = 0; i < (Slots.LEN|0); i++ )
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
  }


  setupGL( gl:WebGLRenderingContext ){
    const set = this._set,
          dat = this._dat;
    let i : number;


    // blend enabled

    if ( (set & SetsBits.BLEND_ENABLE_SET) !== 0 ) {
      dat[ Slots.BLEND_ENABLE ] ? gl.enable( GL.BLEND ) : gl.disable( GL.BLEND );
    }


    // Blend Equation

    i = set & (SetsBits.BLEND_EQ_SET|SetsBits.BLEND_EQ_A_SET);

    if ( i !== 0 ) {
      if( i === (SetsBits.BLEND_EQ_SET|SetsBits.BLEND_EQ_A_SET) )
        gl.blendEquationSeparate( dat[ Slots.BLEND_EQ_C ], dat[ Slots.BLEND_EQ_A ] );
      else
        gl.blendEquation( dat[ Slots.BLEND_EQ_C ] );
    }


    // Blend Function


    i = set & (SetsBits.BLEND_FUNC_SET|SetsBits.BLEND_FUNC_A_SET);

    if ( i !== 0 ){
      if( i === (SetsBits.BLEND_FUNC_SET|SetsBits.BLEND_FUNC_A_SET) )
        gl.blendFuncSeparate( dat[ Slots.BLEND_FUNC_C_SRC ], dat[ Slots.BLEND_FUNC_C_DST ], dat[ Slots.BLEND_FUNC_A_SRC ], dat[ Slots.BLEND_FUNC_A_DST ] );
      else
        gl.blendFunc( dat[ Slots.BLEND_FUNC_C_SRC ], dat[ Slots.BLEND_FUNC_C_DST ] );
    }


    // depth Function

    if ( (set & SetsBits.DEPTH_ENABLE_SET) !== 0 ){
      dat[ Slots.DEPTH_ENABLE ] ? gl.enable( GL.DEPTH_TEST ) : gl.disable( GL.DEPTH_TEST );
    }

    if ( (set & SetsBits.DEPTH_FUNC_SET) !== 0 ){
      gl.depthFunc( dat[ Slots.DEPTH_FUNC ] );
    }


    // culling mode (front/back/front_and_back)


    if ( (set & SetsBits.CULL_FACE_ENABLE_SET) !== 0 ){
      dat[ Slots.CULL_FACE_ENABLE ] ? gl.enable( GL.CULL_FACE ) : gl.disable( GL.CULL_FACE );
    }
    if ( (set & SetsBits.CULL_MODE_SET) !== 0 ){
      gl.cullFace( dat[ Slots.CULL_MODE ] );
    }

    // face direction (cw/ccw)
    if ( (set & SetsBits.FACE_DIR_SET) !== 0 ){
      gl.frontFace( dat[ Slots.FACE_DIR ] );
    }

        // face direction (cw/ccw)
    if ( (set & SetsBits.LINE_WIDTH_SET) !== 0 ){
      gl.lineWidth( decodeHalf( dat[ Slots.LINE_WIDTH ] ) );
    }


    // Stencil enabled

    if ( (set & SetsBits.STENCIL_ENABLE_SET) !== 0 ){
      dat[ Slots.STENCIL_ENABLE ] ? gl.enable( GL.STENCIL_TEST ) : gl.disable( GL.STENCIL_TEST );
    }

   // Stencil Function
    i = set & (SetsBits.STENCIL_FUNC_SET|SetsBits.STENCIL_B_FUNC_SET);

    if ( i !== 0 )  {
      if( i === (SetsBits.STENCIL_FUNC_SET|SetsBits.STENCIL_B_FUNC_SET) ){
        gl.stencilFuncSeparate( GL.FRONT, dat[ Slots.STENCIL_FUNC ], dat[ Slots.STENCIL_REF ], dat[ Slots.STENCIL_VALUE_MASK ] );
        gl.stencilFuncSeparate( GL.BACK, dat[ Slots.STENCIL_B_FUNC ], dat[ Slots.STENCIL_B_REF ], dat[ Slots.STENCIL_B_VALUE_MASK ] );
      } else {
        gl.stencilFunc( dat[ Slots.STENCIL_FUNC ], dat[ Slots.STENCIL_REF ], dat[ Slots.STENCIL_VALUE_MASK ] );
      }
    }

    // Stencil Op
    i = set & (SetsBits.STENCIL_OP_SET|SetsBits.STENCIL_B_OP_SET);

    if ( i !== 0 ){
      if( i === (SetsBits.STENCIL_OP_SET|SetsBits.STENCIL_B_OP_SET) ){
        gl.stencilOpSeparate( GL.FRONT, dat[ Slots.STENCIL_OP_FAIL ], dat[ Slots.STENCIL_OP_ZFAIL ], dat[ Slots.STENCIL_OP_ZPASS ] );
        gl.stencilOpSeparate( GL.BACK, dat[ Slots.STENCIL_B_OP_FAIL ], dat[ Slots.STENCIL_B_OP_ZFAIL ], dat[ Slots.STENCIL_B_OP_ZPASS ]  );
      } else {
        gl.stencilOp( dat[ Slots.STENCIL_OP_FAIL ], dat[ Slots.STENCIL_OP_ZFAIL ], dat[ Slots.STENCIL_OP_ZPASS ] );
      }
    }


    // Stencil Op
    i = set & (SetsBits.STENCIL_MASK_SET|SetsBits.STENCIL_B_MASK_SET);

    if ( i !== 0 ){

      if( i === (SetsBits.STENCIL_MASK_SET|SetsBits.STENCIL_B_MASK_SET) ){
        gl.stencilMaskSeparate( GL.FRONT, dat[ Slots.STENCIL_WRITEMASK ] );
        gl.stencilMaskSeparate( GL.BACK, dat[ Slots.STENCIL_B_WRITEMASK] );
      } else {
        gl.stencilMask( dat[ Slots.STENCIL_WRITEMASK ] );
      }
    }

    if ( (set & SetsBits.COLOR_MASK_SET) !== 0 ){
      var flags = dat[ Slots.COLOR_MASK ];
      gl.colorMask(
        (flags & 1) === 1,
        (flags & 2) === 2,
        (flags & 4) === 4,
        (flags & 8) === 8
      );
    }

    if ( (set & SetsBits.DEPTH_MASK_SET) !== 0 ){
      gl.depthMask( dat[ Slots.DEPTH_MASK ] === 1 );
    }



    if ( (set & SetsBits.BLEND_COLOR_SET) !== 0 ){
      gl.blendColor(
        decodeHalf( dat[ Slots.BLEND_COLOR_R ] ),
        decodeHalf( dat[ Slots.BLEND_COLOR_G ] ),
        decodeHalf( dat[ Slots.BLEND_COLOR_B ] ),
        decodeHalf( dat[ Slots.BLEND_COLOR_A ] )
      );
    }

    if ( (set & SetsBits.SCISSOR_ENABLE_SET) !== 0 ){
      dat[ Slots.SCISSOR_ENABLE ] ? gl.enable( GL.SCISSOR_TEST ) : gl.disable( GL.SCISSOR_TEST );
    }

    if ( (set & SetsBits.SCISSOR_TEST_SET) !== 0 ){
      gl.scissor(
        dat[ Slots.SCISSOR_TEST_X ],
        dat[ Slots.SCISSOR_TEST_Y ],
        dat[ Slots.SCISSOR_TEST_W ],
        dat[ Slots.SCISSOR_TEST_H ]
      );
    }

    if ( (set & SetsBits.VIEWPORT_SET) !== 0 ){
      gl.viewport(
        dat[ Slots.VIEWPORT_X ],
        dat[ Slots.VIEWPORT_Y ],
        dat[ Slots.VIEWPORT_W ],
        dat[ Slots.VIEWPORT_H ]
      );
    }


    if ( (set & SetsBits.POLYOFF_ENABLE_SET) !== 0 ){
      dat[ Slots.POLYOFF_ENABLE ] ? gl.enable( GL.POLYGON_OFFSET_FILL ) : gl.disable( GL.POLYGON_OFFSET_FILL );
    }

    if ( (set & SetsBits.POLYOFF_SET) !== 0 ){
      gl.polygonOffset(
        decodeHalf( dat[ Slots.POLYOFF_FACTOR ] ),
        decodeHalf( dat[ Slots.POLYOFF_UNITS ] )
      );
    }


    if ( (set & SetsBits.DEPTH_RANGE_SET) !== 0 ){
      gl.depthRange(
        decodeClampedFloat( dat[ Slots.DEPTH_RANGE_NEAR ] ),
        decodeClampedFloat( dat[ Slots.DEPTH_RANGE_FAR ] )
      );
    }



  }






  // todo refator -> straight copy to dat and set
  fromGL( gl : WebGLRenderingContext ){
    this._set = 0;

    const enableBlend       = getGlParameter( gl, GL.BLEND ),
          enableCullface    = getGlParameter( gl, GL.CULL_FACE ),
          enableDepthTest   = getGlParameter( gl, GL.DEPTH_TEST ),
          enableDither      = getGlParameter( gl, GL.DITHER ),
          enablePolyOffset  = getGlParameter( gl, GL.POLYGON_OFFSET_FILL ),
          // enableACoverage   = getP( gl, GL.SAMPLE_ALPHA_TO_COVERAGE ),
          // enableCoverage    = getP( gl, GL.SAMPLE_COVERAGE ),
          enableScissor     = getGlParameter( gl, GL.SCISSOR_TEST ),
          enableStencil     = getGlParameter( gl, GL.STENCIL_TEST ),

          blendSrcRGB       = getGlParameter( gl, GL.BLEND_SRC_RGB ),
          blendDstRGB       = getGlParameter( gl, GL.BLEND_DST_RGB ),
          blendSrcAlpha     = getGlParameter( gl, GL.BLEND_SRC_ALPHA ),
          blendDstAlpha     = getGlParameter( gl, GL.BLEND_DST_ALPHA ),
          blendEqRgb        = getGlParameter( gl, GL.BLEND_EQUATION_RGB ),
          blendEqAlpha      = getGlParameter( gl, GL.BLEND_EQUATION_ALPHA ),
          stencilFunc       = getGlParameter( gl, GL.STENCIL_FUNC ),
          stencilRef        = getGlParameter( gl, GL.STENCIL_REF ),
          stencilValueMask  = getGlParameter( gl, GL.STENCIL_VALUE_MASK ),
          stencilWriteMask  = getGlParameter( gl, GL.STENCIL_WRITEMASK ),
          stencilOpFail     = getGlParameter( gl, GL.STENCIL_FAIL ),
          stencilOpZfail    = getGlParameter( gl, GL.STENCIL_PASS_DEPTH_FAIL ),
          stencilOpZpass    = getGlParameter( gl, GL.STENCIL_PASS_DEPTH_PASS ),
          stencilBFunc      = getGlParameter( gl, GL.STENCIL_BACK_FUNC ),
          stencilBRef       = getGlParameter( gl, GL.STENCIL_BACK_REF ),
          stencilBValueMask = getGlParameter( gl, GL.STENCIL_BACK_VALUE_MASK ),
          stencilBWriteMask = getGlParameter( gl, GL.STENCIL_BACK_WRITEMASK ),
          stencilBOpFail    = getGlParameter( gl, GL.STENCIL_BACK_FAIL ),
          stencilBOpZfail   = getGlParameter( gl, GL.STENCIL_BACK_PASS_DEPTH_FAIL ),
          stencilBOpZpass   = getGlParameter( gl, GL.STENCIL_BACK_PASS_DEPTH_PASS ),

          polyOffsetFactor  = getGlParameter( gl, GL.POLYGON_OFFSET_FACTOR ),
          polyOffsetUnits   = getGlParameter( gl, GL.POLYGON_OFFSET_UNITS ),
          scissorBox        = getGlParameter( gl, GL.SCISSOR_BOX ),
          colorMaskArray    = getGlParameter( gl, GL.COLOR_WRITEMASK ),
          depthWriteMask    = getGlParameter( gl, GL.DEPTH_WRITEMASK ),
          blendColor        = getGlParameter( gl, GL.BLEND_COLOR ),
          viewport          = getGlParameter( gl, GL.VIEWPORT ),
          depthRange        = getGlParameter( gl, GL.DEPTH_RANGE ),
          lineWidth         = getGlParameter( gl, GL.LINE_WIDTH );




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
      gl.getParameter( GL.DEPTH_FUNC )
    );

    this.enableDepthTest( enableDepthTest );

    // FACE CULLING
    // ------------
    this.cullFace(
      gl.getParameter( GL.CULL_FACE_MODE )
    );

    this.enableCullface( enableCullface );

    this.frontFace(
      gl.getParameter( GL.FRONT_FACE )
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

  }


  enableBlend( flag : boolean = true ): this {
    this._dat[ Slots.BLEND_ENABLE ] = +flag;
    this._set |= SetsBits.BLEND_ENABLE_SET|0;
    return this;
  }

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
  blendFunc( src:GLenum, dst:GLenum ) : this {
    this._dat[ Slots.BLEND_FUNC_C_SRC ] = src;
    this._dat[ Slots.BLEND_FUNC_C_DST ] = dst;
    this._set = this._set & ~SetsBits.BLEND_FUNC_A_SET | (SetsBits.BLEND_FUNC_SET);
    return this;
  }

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
  blendFuncSeparate( srcRgb : GLenum, dstRgb : GLenum, srcAlpha : GLenum, dstAlpha : GLenum ) : this {
    this._dat[ Slots.BLEND_FUNC_C_SRC ] = srcRgb;
    this._dat[ Slots.BLEND_FUNC_C_DST ] = dstRgb;
    this._dat[ Slots.BLEND_FUNC_A_SRC ] = srcAlpha;
    this._dat[ Slots.BLEND_FUNC_A_DST ] = dstAlpha;
    this._set |= SetsBits.BLEND_FUNC_SET | SetsBits.BLEND_FUNC_A_SET;
    return this;
  }

  blendEquation( eq : GLenum ) : this {
    this._dat[ Slots.BLEND_EQ_C ] = eq;
    this._set = this._set & ~SetsBits.BLEND_EQ_A_SET | (SetsBits.BLEND_EQ_SET);
    return this;
  }

  /*
    enums
      FUNC_ADD
      FUNC_SUBTRACT
      FUNC_REVERSE_SUBTRACT
  */
  blendEquationSeparate ( rgbEq : GLenum, alphaEq : GLenum ) : this {
    this._dat[ Slots.BLEND_EQ_C] = rgbEq;
    this._dat[ Slots.BLEND_EQ_A ] = alphaEq;
    this._set |= SetsBits.BLEND_EQ_SET | SetsBits.BLEND_EQ_A_SET;
    return this;
  }

  /*
    blendColor
      r g b a  as Float [0.0, 1.0]
  */
  blendColor( r:number, g:number, b:number, a:number ) : this {
    this._dat[ Slots.BLEND_COLOR_R ] = encodeHalf( r );
    this._dat[ Slots.BLEND_COLOR_G ] = encodeHalf( g );
    this._dat[ Slots.BLEND_COLOR_B ] = encodeHalf( b );
    this._dat[ Slots.BLEND_COLOR_A ] = encodeHalf( a );
    this._set |= SetsBits.BLEND_COLOR_SET|0;
    return this;
  }



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
  depthFunc( func : GLenum ) : this {
    this._dat[ Slots.DEPTH_FUNC ] = func;
    this._set |= SetsBits.DEPTH_FUNC_SET|0;
    return this;
  }


  enableDepthTest( flag : boolean = true ) : this {
    this._dat[ Slots.DEPTH_ENABLE ] = +flag;
    this._set |= SetsBits.DEPTH_ENABLE_SET|0;
    return this;
  }

  depthRange ( near : number, far : number ) : this {
    this._dat[ Slots.DEPTH_RANGE_NEAR ] = encodeClampedFloat( near );
    this._dat[ Slots.DEPTH_RANGE_FAR ]  = encodeClampedFloat( far );
    this._set |= SetsBits.DEPTH_RANGE_SET|0;
    return this;
  }

  lineWidth( w : number ) : this {
    this._dat[ Slots.LINE_WIDTH ] = encodeHalf( w );
    this._set |= SetsBits.LINE_WIDTH_SET|0;
    return this;
  }



  /*
    enums
      FRONT
      BACK
      FRONT_AND_BACK
  */
  cullFace ( mode : GLenum ) : this {
    this._dat[ Slots.CULL_MODE ] = mode;
    this._set |= SetsBits.CULL_MODE_SET|0;
    return this;
  }

  enableCullface( flag : boolean ) : this {
    if( flag === undefined ) flag = true;
    this._dat[ Slots.CULL_FACE_ENABLE ] = +flag;
    this._set |= SetsBits.CULL_FACE_ENABLE_SET|0;
    return this;
  }



  // polygon offset
  //
  polygonOffset( polyOffsetFactor : number, polyOffsetUnits : number ) : this {
    this._dat[ Slots.POLYOFF_FACTOR] = encodeHalf( polyOffsetFactor );
    this._dat[ Slots.POLYOFF_UNITS ] = encodeHalf( polyOffsetUnits );
    this._set |= SetsBits.POLYOFF_SET|0;
    return this;
  }

  enablePolygonOffset( flag : boolean = true ) : this {
    this._dat[ Slots.POLYOFF_ENABLE ] = +flag;
    this._set |= SetsBits.POLYOFF_ENABLE_SET|0;
    return this;
  }



  // SCISSOR
  // --------

  enableScissor   ( flag : boolean = true ) : this {
    this._dat[ Slots.SCISSOR_ENABLE ] = +flag;
    this._set |= SetsBits.SCISSOR_ENABLE_SET|0;
    return this;
  }

  scissor( x : number, y : number, w : number, h : number ) : this {
    this._dat[ Slots.SCISSOR_TEST_X ] = x;
    this._dat[ Slots.SCISSOR_TEST_Y ] = y;
    this._dat[ Slots.SCISSOR_TEST_W ] = w;
    this._dat[ Slots.SCISSOR_TEST_H ] = h;
    this._set |= SetsBits.SCISSOR_TEST_SET|0;
    return this;
  }

  // VIEWPORT
  // --------

  viewport( x : number, y : number, w : number, h : number ) : this {
    this._dat[ Slots.VIEWPORT_X ] = x;
    this._dat[ Slots.VIEWPORT_Y ] = y;
    this._dat[ Slots.VIEWPORT_W ] = w;
    this._dat[ Slots.VIEWPORT_H ] = h;
    this._set |= SetsBits.VIEWPORT_SET|0;
    return this;
  }


  enableDither( flag : boolean = true ) : this {
    this._dat[ Slots.DITHER_ENABLE ] = +flag;
    this._set |= SetsBits.DITHER_ENABLE_SET|0;
    return this;
  }

  depthMask( flag : boolean ) : this {
    this._dat[ Slots.DEPTH_MASK ] = +flag;
    this._set |= SetsBits.DEPTH_MASK_SET|0;
    return this;
  }

  colorMask( r : boolean, g : boolean, b : boolean, a : boolean ) : this {
    const mask =
      ((r?1:0)   ) |
      ((g?1:0)<<1) |
      ((b?1:0)<<2) |
      ((a?1:0)<<3);

    this._dat[ Slots.COLOR_MASK ] = mask;
    this._set |= SetsBits.COLOR_MASK_SET|0;
    return this;
  }


  // enableACoverage ( flag ){
  //   this._dat[ ACOVERAGE_ENABLE ] = flag|0;
  //   this._set |= ACOVERAGE_ENABLE_SET|0;
  // }

  // enableCoverage  ( flag ){
  //   this._dat[ COVERAGE_ENABLE ] = flag|0;
  //   this._set |= COVERAGE_ENABLE_SET|0;
  // }






  /*
    enums
      CW
      CCW
  */
  frontFace ( dir : GLenum ) : this {
    this._dat[ Slots.FACE_DIR ] = dir;
    this._set |= SetsBits.FACE_DIR_SET|0;
    return this;
  }

  /*
    Stencils
  */

  enableStencil( flag : boolean = true ) : this {
    this._dat[ Slots.STENCIL_ENABLE ] = +flag;
    this._set |= SetsBits.STENCIL_ENABLE_SET|0;
    return this;
  }

  stencilFunc ( func : GLenum, ref : number, mask : number ) : this {
    this._dat[ Slots.STENCIL_FUNC       ] = func;
    this._dat[ Slots.STENCIL_REF        ] = ref;
    this._dat[ Slots.STENCIL_VALUE_MASK ] = mask;
    this._set = this._set & ~SetsBits.STENCIL_B_FUNC_SET | (SetsBits.STENCIL_FUNC_SET);
    return this;
  }

  stencilOp ( sfail : GLenum, dpfail : GLenum, dppass : GLenum ) : this {
    this._dat[ Slots.STENCIL_OP_FAIL ] = sfail;
    this._dat[ Slots.STENCIL_OP_ZFAIL] = dpfail;
    this._dat[ Slots.STENCIL_OP_ZPASS ] = dppass;
    this._set = this._set & ~SetsBits.STENCIL_B_OP_SET | (SetsBits.STENCIL_OP_SET);
    return this;
  }

  stencilMask ( mask : number ) : this {
    this._dat[ Slots.STENCIL_WRITEMASK ] = mask;
    this._set = (this._set & ~SetsBits.STENCIL_B_MASK_SET) | (SetsBits.STENCIL_MASK_SET);
    return this;
  }



  stencilFuncSeparate ( func : GLenum, ref : number, mask : number, funcback : GLenum, refback : number, maskback : number ) : this {
    const dat = this._dat;
    dat[ Slots.STENCIL_FUNC         ] = func;
    dat[ Slots.STENCIL_REF          ] = ref;
    dat[ Slots.STENCIL_VALUE_MASK   ] = mask;
    dat[ Slots.STENCIL_B_FUNC       ] = funcback;
    dat[ Slots.STENCIL_B_REF        ] = refback;
    dat[ Slots.STENCIL_B_VALUE_MASK ] = maskback;
    this._set |= SetsBits.STENCIL_B_FUNC_SET | SetsBits.STENCIL_FUNC_SET;
    return this;
  }

  stencilOpSeparate ( sfail : GLenum, dpfail : GLenum, dppass : GLenum, sfailback : GLenum, dpfailback : GLenum, dppassback : GLenum ) : this {
    const dat = this._dat;
    dat[ Slots.STENCIL_OP_FAIL    ] = sfail;
    dat[ Slots.STENCIL_OP_ZFAIL   ] = dpfail;
    dat[ Slots.STENCIL_OP_ZPASS   ] = dppass;
    dat[ Slots.STENCIL_B_OP_FAIL  ] = sfailback;
    dat[ Slots.STENCIL_B_OP_ZFAIL ] = dpfailback;
    dat[ Slots.STENCIL_B_OP_ZPASS ] = dppassback;
    this._set |= SetsBits.STENCIL_B_OP_SET | SetsBits.STENCIL_OP_SET;
    return this;
  }

  stencilMaskSeparate ( mask : number, maskback : number ) : this {
    this._dat[ Slots.STENCIL_WRITEMASK   ] = mask;
    this._dat[ Slots.STENCIL_B_WRITEMASK ] = maskback;
    this._set |= SetsBits.STENCIL_B_MASK_SET | SetsBits.STENCIL_MASK_SET;
    return this;
  }

}
