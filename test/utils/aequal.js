
expect = require( 'expect.js' );


var EPSILON = 0.00001;

var equal = function( a, b ) {
  if (a.length != b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (isNaN(a[i]) !== isNaN(b[i]))
        return false;
      if (Math.abs(a[i] - b[i]) >= EPSILON)
        return false;
    }
    return true;
};

module.exports =  function(a,b) {
  //console.log( equal(a,b) );
  var eq = equal( a, b );
  if( !eq ){
    console.log(
      '   '+[].join.call( a, ',' ) + '\n' +
      '   should be \n' +
      '   '+[].join.call( b, ',' )
    );
  }
  expect( eq ).to.be.ok();
}
