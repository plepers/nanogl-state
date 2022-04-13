import GLConfig from '../GLConfig';
import GLState from '../GLState'

var expect = require('expect.js');
var sinon = require('sinon');


function assertNoError() {
  expect(gl.getError()).to.equal(0);
}

function createContext() {
  var cvs = document.createElement('canvas');
  cvs.width = cvs.height = 16;
  var gl;
  if (__karma__.config.webgl_version === 2) {
    gl = cvs.getContext('webgl2')
  }
  else
    gl = cvs.getContext('webgl') || cvs.getContext('experimental-webgl');

  gl.scissor(0, 0, 0, 0); // normalize
  return gl;
}


var gl = createContext();

describe("GLState", function () {


  it("should build correctly", function () {

    var state = new GLState(gl);
    assertNoError();

  });


  it(" makeConfig", function () {
    var cfg = new GLConfig();
    assertNoError();
    expect(cfg).to.be.ok()
  });


  it(" push", function () {
    var cfg = new GLConfig();
    var state = new GLState(gl);
    state.push(cfg);
    assertNoError();
  });


  it(" apply", function () {
    var cfg = new GLConfig().enableBlend();
    var state = new GLState(gl);
    state.push(cfg);
    state.apply();
    assertNoError();
  });


  it(" pop", function () {
    var cfg = new GLConfig().enableBlend();
    var state = new GLState(gl);
    state.push(cfg);
    state.pop();
    assertNoError();
  });


  it(" now", function () {
    var cfg = new GLConfig().enableBlend();
    var state = new GLState(gl);
    state.now(cfg);
    assertNoError();
  });



  it(" apply with no changes", function () {
    var state = new GLState(gl);

    var ena = sinon.spy(gl, "enable")
    var depthset = ena.withArgs(gl.DEPTH_TEST);
    var blendset = ena.withArgs(gl.BLEND);

    var cfg1 = state.config()
      .enableDepthTest()

    var cfg2 = state.config()
      .enableDepthTest()

    cfg1.apply()
    cfg2.apply()
    cfg1.apply()
    cfg2.apply()

    expect(depthset.calledOnce).to.be(true)
    expect(blendset.callCount).to.be(0)
  });

});
