(function(M, V){
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
    p = V.v(p);
    var x = p.x & 255;
    var y = p.y & 255;
    var g =  perm[x+perm[y]];
    var g2 = grad3[g % 12];
    return V.v(g2[0], g2[1]);
  };

  M.perlin = function(p) {
    p = V.v(p);
    var x0 = M.floor(p.x);
    var x1 = x0 + 1;
    var y0 = M.floor(p.y);
    var y1 = y0 + 1;

    var sx = p.x - x0;
    var sy = p.y - y0;

    var n00 = V.dot(M.grad([x0, y0]), [sx  , sy  ]);
    var n10 = V.dot(M.grad([x1, y0]), [sx-1, sy  ]);
    var n01 = V.dot(M.grad([x0, y1]), [sx  , sy-1]);
    var n11 = V.dot(M.grad([x1, y1]), [sx-1, sy-1]);

    return M.mix(
        M.mix(n00, n10, M.fade(sx)),
        M.mix(n01, n11, M.fade(sx)),
        M.fade(sy));
  };
})(window.M = window.M || {}, window.V = window.V || {})
