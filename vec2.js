//http://media.tojicode.com/sfjs-vectors
//http://glmatrix.net/docs/vec2.js.html

//TODO Move out to first position in arguments
//TODO Use math.fround

//TODO set(out, x, y)
//TODO copy(out, a)
//TODO clone(a)
//TODO multiply
//TODO floor
//TODO ceil
//TODO min
//TODO max
//TODO lerp(out, a, b, t)
//TODO round
//TODO negate(out, a) (-)
//TODO inverse(out, a) (1/a)
//TODO str(a) ( vec2(0, 3) )
//TODO clamp(out, a, min, max)
//TODO random(out, scale)

let Vec2 = {};
Vec2.Scalar = {};

Vec2.create = function(a, b) {
  return new Float32Array([a,b]);
};

Vec2.set = function(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}

Vec2.add = function(a, b, out) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
};

Vec2.subtract = function(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
};

Vec2.divide = function(a, b, out) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
};

Vec2.Scalar.divide = function(out, a, v) {
  out[0] = a[0] / v;
  out[1] = a[1] / v;
};

Vec2.scale = function(a, v, out) {
  out[0] = a[0] * v;
  out[1] = a[1] * v;
};

Vec2.length = function(a) {
  return M.sqrt((a[0]*a[0]) + (a[1]*a[1]));
}

Vec2.normalize = function(a, out) {
  var iLen = 1 / Vec2.length(a);
  out[0] = a[0] * iLen;
  out[1] = a[1] * iLen;
};

Vec2.dot = function(a, b) {
  return a[0]*b[0] + a[1]*b[1];
}

Vec2.distance = function(a,b) {
  //TODO temp1 should be a 'fixed' temp.
  //  Which means we need to wrap this whole thing so we can do that.
  let temp1 = Vec2.subtract([], a, b);
  return Vec2.length(temp1);
}
