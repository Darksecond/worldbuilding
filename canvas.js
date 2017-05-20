(function(C){
  'use strict';
  function Drawable(el) {
    this.el = el;
    this.ctx = el.getContext('2d');
  };
  Drawable.prototype.size = function(w,h,z) {
    this.el.width = w;
    this.el.height = h;
    if(z) {
      this.el.style.imageRendering = "pixelated";
      this.el.style.width = w*z + "px";
      this.el.style.height = h*z + "px";
    }
  }
  Drawable.prototype.set = function(p, c) {
    var x = p[0];
    var y = p[1];
    var r = (M.clamp(c[0],0,1) * 255) & 255;
    var g = (M.clamp(c[1],0,1) * 255) & 255;
    var b = (M.clamp(c[2],0,1) * 255) & 255;
    this.ctx.fillStyle = "rgb("+r+","+g+","+b+")";
    this.ctx.fillRect(x,y,1,1);
  };

  C.new = function(container){
    container = container || document.body;

    var el = document.createElement('CANVAS');
    container.append(el);
    return new Drawable(el);
  };
})(window.C = window.C || {});
