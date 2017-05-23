let w = 500;
let h = 500;
var d = C.new(w, h);

let P = new Perlin();

let p64 = Vec2.create(0,0);
let p32 = Vec2.create(0,0);
let p16 = Vec2.create(0,0);
let p8 = Vec2.create(0,0);

for(var y=0;y<h;y++) {
  for(var x=0;x<w;x++) {
    let p = [x/w*256, y/h*256];
    Vec2.divideS(p, 64, p64);
    Vec2.divideS(p, 32, p32);
    Vec2.divideS(p, 16, p16);
    Vec2.divideS(p, 8, p8);

    var n = P.perlin(p64)*1 +
      P.perlin(p32)*0.5 +
      P.perlin(p16)*0.25 +
      P.perlin(p8)*0.125;
    var m = n*0.5 + 0.5;
    d.set([x,y], [m,m,m]);
  }
}

d.draw();
