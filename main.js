var d = C.new();
let w = 050;
let h = 050;
d.size(w,h,5);
for(var y=0;y<h;y++) {
  for(var x=0;x<w;x++) {
    let p = V.v(x/w*256,y/h*256);
    var n = M.perlin(V.div(p,64))*1 +
      M.perlin(V.div(p,32))*0.5 +
      M.perlin(V.div(p,16))*0.25 +
      M.perlin(V.div(p,8))*0.125;
    var m = n*0.5 + 0.5;
    d.set([x,y], V.v(m,m,m));
  }
}
