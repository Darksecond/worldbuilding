(function(){
  let w = 500|0;
  let h = 500|0;
  var d = C.new(w, h);

  for(var y=0;y<h;y++) {
    for(var x=0;x<w;x++) {
      d.set([x,y], [x/w,y/h,1]);
    }
  }

  d.draw();
})();

(function(){
  let w = 500|0;
  let h = 500|0;
  var d = C.new(w, h);

  let P = new Perlin();

  let p = Vec2.create(0,0);
  let p64 = Vec2.create(0,0);
  let p32 = Vec2.create(0,0);
  let p16 = Vec2.create(0,0);
  let p8 = Vec2.create(0,0);

  for(var y=0;y<h;y++) {
    for(var x=0;x<w;x++) {
      p = Vec2.set(p, x/w*256, y/h*256);
      Vec2.Scalar.divide(p64, p, 64);
      Vec2.Scalar.divide(p32, p, 32);
      Vec2.Scalar.divide(p16, p, 16);
      Vec2.Scalar.divide(p8, p, 8);

      var n = P.perlin(p64)*1 +
        P.perlin(p32)*0.5 +
        P.perlin(p16)*0.25 +
        P.perlin(p8)*0.125;
      var m = n*0.5 + 0.5;
      d.set([x,y], [m,m,m]);
    }
  }

  d.draw();
})();
