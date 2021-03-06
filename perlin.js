//TODO use Math.trunc instead of M.floor
//TODO use Math.fround

(function(){
  'use strict';

  let grad3 = [
    Vec3.create(1,1,0),Vec3.create(-1,1,0),Vec3.create(1,-1,0),Vec3.create(-1,-1,0), 
    Vec3.create(1,0,1),Vec3.create(-1,0,1),Vec3.create(1,0,-1),Vec3.create(-1,0,-1), 
    Vec3.create(0,1,1),Vec3.create(0,-1,1),Vec3.create(0,1,-1),Vec3.create(0,-1,-1)
  ];
  
  let temp1 = Vec2.create(0,0);

  window.Perlin = class {
    constructor() {
      this.perm = new Array(512);
      this.init();
    }

    init() {
      var p = new Array(256);
      for(var i=0;i<256;i++) {
        p[i] = M.floor(M.random()*256)|0;
      }
      for(var i=0;i<512;i++) {
        this.perm[i] = p[i&255];
      }
    }

    grad(x,y) {
      let g = this.perm[x+this.perm[y]];
      return grad3[g % 12];
    }

    perlin(p) {
      let x0 = M.floor(p[0]);
      let y0 = M.floor(p[1]);

      let sx0 = p[0] - x0;
      let sy0 = p[1] - y0;

      x0 = x0 & 255;
      y0 = y0 & 255

      let x1 = x0 + 1;
      let y1 = y0 + 1;
      let sx1 = sx0 - 1;
      let sy1 = sy0 - 1;

      let n00 = Vec2.dot(this.grad(x0, y0), Vec2.set(temp1, sx0, sy0));
      let n10 = Vec2.dot(this.grad(x1, y0), Vec2.set(temp1, sx1, sy0));
      let n01 = Vec2.dot(this.grad(x0, y1), Vec2.set(temp1, sx0, sy1));
      let n11 = Vec2.dot(this.grad(x1, y1), Vec2.set(temp1, sx1, sy1));

      let fx = M.fade(sx0);
      let fy = M.fade(sy0);

      return M.mix(
        M.mix(n00, n10, fx),
        M.mix(n01, n11, fx),
        fy);
    }
  };
})();
