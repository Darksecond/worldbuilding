//http://media.tojicode.com/sfjs-vectors
//http://glmatrix.net/docs/vec2.js.html

//TODO Move out to first position in arguments
//TODO Move divideS -> Scalar.divide or something
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

let Vec2 = {};

Vec2.create = function(a, b) {
  return new Float32Array([a,b]);
};


Vec2.add = function(a, b, out) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
};

Vec2.subtract = function(a, b, out) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
};

Vec2.divide = function(a, b, out) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
};

Vec2.divideS = function(a, v, out) {
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

Vec2.dotXY = function(a, x, y) {
  return a[0]*x + a[1]*y;
}