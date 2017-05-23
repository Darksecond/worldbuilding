(function(M){
  'use strict';

  M.mix = function(a, b, w) {
    return (1.0 - w) * a + w*b;
  };

  M.clamp = function(v, lower, upper) {
    if(v < lower) return lower;
    if(v > upper) return upper;
    return v;
  };

  M.smoothstep = function(e0, e1, v) {
    v = M.clamp( (v-e0)/(e1-e0), 0, 1);
    return x*x*(3-2*x);
  };

  M.floor = Math.floor;
  M.sqrt = Math.sqrt;

  M.fade = function(t) {
    return t*t*t*(t*(t*6.0 - 15.0) + 10.0);
  }

  var seed = Math.random();
  M.seed = function(v) {
    if(v) {
      seed = v;
    } else {
      seed = Math.random();
    }
  }
  M.random = function() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
})(window.M = window.M || {})
