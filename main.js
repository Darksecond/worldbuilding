var d = C.new();
let w = 150;
let h = 150;
d.size(w,h,5);
for(var y=0;y<h;y++) {
  for(var x=0;x<w;x++) {
    var n = M.perlin([x/64,y/64])*1 +
      M.perlin([x/32,y/32])*0.5 +
      M.perlin([x/16,y/16])*0.25 +
      M.perlin([x/8,y/8])*0.125;
    var m = n*0.5 + 0.5;
    d.set([x,y], [m,m,m]);
  }
}
