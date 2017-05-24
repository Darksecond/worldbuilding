
let Vec3 = {};

Vec3.create = function(x, y, z) {
  return new Float32Array([x,y,z]);
}

Vec3.lerp = function(out, a, b, w) {
  out[0] = M.mix(a[0], b[0], w);
  out[1] = M.mix(a[1], b[1], w);
  out[2] = M.mix(a[2], b[2], w);
  return out;
}
