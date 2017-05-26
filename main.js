//TODO Investigate vector fields
//  https://en.wikipedia.org/wiki/Vector_field
//TODO Investigae particle systems
//  https://software.intel.com/en-us/html5/hub/blogs/build-a-javascript-particle-system-in-200-lines
//TODO Cool stuff about geology and worldbuilding
//  http://cauliflowerlabs.blogspot.nl/2014/09/geovox-geology-simulator-for-game-worlds.html
//  http://cauliflowerlabs.blogspot.nl/2014/09/geovox-broad-strokes-planning-world.html
//  http://cauliflowerlabs.blogspot.nl/2014/10/geology-simulator-plate-tectonics.html
//  http://cauliflowerlabs.blogspot.nl/2014/10/geology-simulator-minerology-and.html
//  http://www-cs-students.stanford.edu/~amitp/game-programming/polygon-map-generation/
//  https://mewo2.com/notes/terrain/
//TODO Investigate Cellular Automata

(function(){
  let w = 50|0;
  let h = 50|0;
  var d = C.new(w, h);
  var field = new Automata.Field(w, h);
  var rules = new Automata.Rules(field);
  console.log(field);

  rules.execute();
  field.draw(d);
})();

(function(){
  let w = 500|0;
  let h = 500|0;
  var d = C.new(w, h);
  let sites = [];
  for(let i=0;i<50;i++) {
    sites.push(Vec2.random([], [w,h]));
  }
  let v = new Voronoi(sites);

  for(var y=0;y<h;y++) {
    for(var x=0;x<w;x++) {
      let site = v.voronoi([x,y]);
      d.set([x,y], [site[0]/w, site[1]/h]);
    }
  }

  d.draw();
})();

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
      //d.set([x,y], [m,m,m]); //Greyscale drawing
      d.setP([x,y], m); // Palettized drawing for some color
    }
  }

  d.draw();
})();
