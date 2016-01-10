[![Build Status](https://travis-ci.org/plepers/nanogl-state.svg?branch=master)](https://travis-ci.org/plepers/nanogl-state)


# nanogl-state
Efficient webgl context state configuration. (3Ko gzipped)

Design to efficiently keep track of the actual context state, and reduce api call by skip useless ones.

##### Example

```javascript
var GLState = require( 'nanogl-state' );

// create the state machine from a gl context
var glState = new GLState( gl );


// create a configuration to enable DEPTH_TEST
var cfgA = GLState.config();
cfgA.enableDepthTest();

// create another config for alpha blending and depth test

var cfgB = GLState.config();
cfgB.enableBlend();
cfgB.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_DRC_ALPHA );
cfgB.enableDepthTest();
cfgB.depthMask( false );


// somewhere in your render loop
function render(){

  glState.push( cfgA );
  glState.apply();
  // renderOpaqueStuffs();
  glState.pop();


  glState.push( cfgB );
  glState.apply();
  // renderBlendableStuffs();
  glState.pop();
}

```