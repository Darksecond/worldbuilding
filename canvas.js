//TODO Maybe this should be totally UV based (0-1 for x and y on set)
//  Probably not, at least not the basic set
//TODO Improve color palettes
//  http://www.color-hex.com/color-palettes/?page=5

(function(C){
  'use strict';

  C.palettes = {
    retro: [
      [102, 101,  71],
      [251,  46,   1],
      [111, 203, 159],
      [255, 226, 138],
      [255, 254, 179],
    ],
    pisos: [
      [ 68, 162, 234],
      [204,  85, 255],
      [221,  64,  72],
      [242, 142,  68],
      [231, 191,  53],
    ],
    greyGreen: [
      [ 92,  92,  92],
      [176, 163, 154],
      [204, 204, 204],
      [144, 165, 122],
      [101, 138,  60],
    ],
  };

  function Drawable(el) {
    this.el = el;
    this.palette = C.palettes.retro;
    this.width = el.width;
    this.height = el.height;
    this.ctx = el.getContext('2d');
    this.imageData = this.ctx.createImageData(this.width, this.height);
  };

  // This draws with a chosen palette.
  // pc must a float between 0 and 1.
  // This will lerp between colors in the palette.
  Drawable.prototype.setP = function(p, pc) {
    let index = M.clamp(pc,0,1)*(this.palette.length-1);
    let w = index - M.floor(index);
    let c1 = this.palette[Math.floor(index)];
    let c2 = this.palette[Math.ceil(index)];
    let c = Vec3.lerp([], c1, c2, w);
    c = [c[0]/255, c[1]/255, c[2]/255];
    this.set(p, c);
  }

  Drawable.prototype.set = function(p, c) {
    let x = p[0], y = p[1];
    let r = c[0], g = c[1], b = c[2];
    let index = (x + y * this.width) * 4;

    this.imageData.data[index+0] = r*255;
    this.imageData.data[index+1] = g*255;
    this.imageData.data[index+2] = b*255;
    this.imageData.data[index+3] = 255;
  };

  Drawable.prototype.draw = function() {
    this.ctx.putImageData(this.imageData, 0, 0);
  };

  C.new = function(w, h, container){
    container = container || document.body;

    var el = document.createElement('CANVAS');

    el.width = w;
    el.height = h;
    //TODO This shouldn't be here.
    el.style.imageRendering = "pixelated";
    el.style.width = 500 + "px";
    el.style.height = 500 + "px";

    container.append(el);
    return new Drawable(el);
  };
})(window.C = window.C || {});
