(function(C){
  'use strict';
  function Drawable(el) {
    this.el = el;
    this.width = el.width;
    this.height = el.height;
    this.ctx = el.getContext('2d');
    this.imageData = this.ctx.createImageData(this.width, this.height);
  };

  Drawable.prototype.set = function(p, c) {
    let x = p[0], y = p[1];
    let r = c[0], g = c[1], b = c[2];
    let index = (x + y * w) * 4;

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
