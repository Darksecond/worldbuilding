(function(M){
  'use strict';

  M.mix = function(a, b, w) {
    return (1.0 - w) * a + w*b;
  };

  M.dot = function(v1, v2) {
    if(v1.length != v2.length) throw 'Vectors need to be of the same length';
    var product = 0;
    for(var i=0;i<v1.length;i++) {
      product += v1[i]*v2[i];
    }
    return product;
  }

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

  M.length = function(v) {
    var squaredLength = 0;
    for(var i=0;i<v.length;i++) {
      squaredLength += v[i]*v[i];
    }
    return M.sqrt(squaredLength);
  }

  M.normalize = function(v) {
    var length = M.length(v);
    var v2 = [];
    for(var i=0;i<v.length;i++) {
      v2[i] = v[i]/length;
    }
    return v2;
  };

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

  //TODO stuff this in a function
  var p = [];
  for(var i=0;i<256;i++) {
    p[i] = M.floor(M.random()*256);
  }
  var grad3 = [
    [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0], 
    [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1], 
    [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
  ];
  var perm = [];
  for(var i=0;i<512;i++) {
    perm[i] = p[i&255];
  }

  M.grad = function(p) {
    var x = p[0] & 255;
    var y = p[1] & 255;
    var g =  perm[x+perm[y]];
    var g2 = grad3[g % 12];
    return [ g2[0], g2[1] ];
  };

  M.perlin = function(p) {
    var x = p[0];
    var y = p[1];
    var x0 = M.floor(x);
    var x1 = x0 + 1;
    var y0 = M.floor(y);
    var y1 = y0 + 1;

    var sx = p[0] - x0;
    var sy = p[1] - y0;

    var n00 = M.dot(M.grad([x0, y0]), [sx  , sy  ]);
    var n10 = M.dot(M.grad([x1, y0]), [sx-1, sy  ]);
    var n01 = M.dot(M.grad([x0, y1]), [sx  , sy-1]);
    var n11 = M.dot(M.grad([x1, y1]), [sx-1, sy-1]);

    return M.mix(
        M.mix(n00, n10, M.fade(sx)),
        M.mix(n01, n11, M.fade(sx)),
        M.fade(sy));
  };
})(window.M = window.M || {})
