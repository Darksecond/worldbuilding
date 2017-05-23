(function(){
  'use strict';

  let grad3 = [
    [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0], 
    [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1], 
    [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
  ];

  window.Perlin = class {
    constructor() {
      this.perm = new Array(512);
      this.init();
    }

    init() {
      var p = new Array(256);
      for(var i=0;i<256;i++) {
        p[i] = M.floor(M.random()*256);
      }
      for(var i=0;i<512;i++) {
        this.perm[i] = p[i&255];
      }
    }

    grad(x,y) {
      x = x & 255;
      y = y & 255;
      let g =  this.perm[x+this.perm[y]];
      let g2 = grad3[g % 12];
      return g2;
    }

    perlin(p) {
      let x0 = M.floor(p[0]);
      let x1 = x0 + 1;
      let y0 = M.floor(p[1]);
      let y1 = y0 + 1;

      let sx0 = p[0] - x0;
      let sy0 = p[1] - y0;
      let sx1 = sx0 - 1;
      let sy1 = sy0 - 1;

      let n00 = Vec2.dotXY(this.grad(x0, y0), sx0, sy0);
      let n10 = Vec2.dotXY(this.grad(x1, y0), sx1, sy0);
      let n01 = Vec2.dotXY(this.grad(x0, y1), sx0, sy1);
      let n11 = Vec2.dotXY(this.grad(x1, y1), sx1, sy1);

      let fx = M.fade(sx0);
      let fy = M.fade(sy0);

      return M.mix(
        M.mix(n00, n10, fx),
        M.mix(n01, n11, fx),
        fy);
    }
  };
})();
