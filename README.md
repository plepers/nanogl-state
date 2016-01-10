[![Build Status](https://travis-ci.org/plepers/nanogl-state.svg?branch=master)](https://travis-ci.org/plepers/nanogl-state)


# nanogl-state
Efficient webgl context state configuration. (3Ko gzipped)

Design to efficiently keep track of the actual context state, and reduce api call by skip useless ones.

##### Example

Rendering alpha blended and opaque primitves

```javascript
var GLState = require( 'nanogl-state' );

// create the state machine from a gl context
// glStage will be sync with the actuel gl state
var glState = new GLState( gl );


// create a config to change glCullFace for both opaques and blended
var cfgG = GLState.config()
  .cullFace( gl.FRONT );


// create a configuration to enable DEPTH_TEST
var cfgA = GLState.config()
  .enableDepthTest()
  .enableCullface();

// create another config for alpha blending and depth test

var cfgB = GLState.config()
  .enableBlend()
  .blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_DRC_ALPHA )
  .enableDepthTest()
  .enableCullface()
  .depthMask( false );



// somewhere in your render loop
function render(){
  // context in default state

  // add the cullFace cfg to the stack
  glState.push( cfgG );

  // add cfgA to the stack, apply the complete stack to the context, then pop cfgA
  glState.now( cfgA );
  renderOpaqueStuffs();


  // apply the cfgB, enable DEPTH_TEST and CULL_FACE are skipped since they are already enabled
  glState.now( cfgB );
  renderBlendableStuffs();

  // pop the cullFace config (cfgG)
  glState.pop();

  // sync the glState and the actual gl context
  glState.apply();

  // here we are back to the default state
}

```

##### GLConfig API


  - enableBlend
  - blendFunc
  - blendFuncSeparate
  - blendEquation
  - blendEquationSeparate
  - blendColor
  - depthFunc
  - enableDepthTest
  - depthRange
  - lineWidth
  - cullFace
  - enableCullface
  - polygonOffset
  - enablePolygonOffset
  - enableScissor
  - scissor
  - viewport
  - enableDither
  - depthMask
  - colorMask
  - frontFace
  - enableStencil
  - stencilFunc
  - stencilOp
  - stencilMask
  - stencilFuncSeparate
  - stencilOpSeparate
  - stencilMaskSeparate