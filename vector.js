(function(V, M){
  'use strict';

  V.Vector = function() {
    this.length = 0;
    this.push([].concat.apply([],arguments));

    if(this[0] != undefined) Object.defineProperty(this,'x', { get: function(){return this[0];}, set: function(v){ this[0] = v;} });
    if(this[1] != undefined) Object.defineProperty(this,'y', { get: function(){return this[1];}, set: function(v){ this[1] = v;} });
    if(this[2] != undefined) Object.defineProperty(this,'z', { get: function(){return this[2];}, set: function(v){ this[2] = v;} });

    if(this.length >= 2) {
      Object.defineProperty(this, 'xy', {get: function() {
        return V.v(this.x, this.y);
      }});
      Object.defineProperty(this, 'yx', {get: function() {
        return V.v(this.y, this.x);
      }});
    }
  };
  V.Vector.prototype.push = function() {
    for(var v of [].concat.apply([], arguments)) {
      if(v instanceof V.Vector) {
        this.push([].concat.apply([],v));
      } else if(Array.isArray(v)) {
        this.push(v);
      } else if(v != undefined) {
        this[this.length++] = v;
      }
    }
  }

  V.v = function() {
    return new V.Vector(...arguments);
  };

  V.div = function(v1, v2) {
    v1 = V.v(v1);
    v2 = V.v(v2);
    if(v1.length != v2.length && v2.length > 1) throw 'vectors must be same length, or v2 must be singleton';
    if(v2.length > 1) {
      var vec = V.v();
      for(var i=0;i<v1.length;i++) {
        vec.push(v1[i]/v2[i]);
      }
      return vec;
    } else {
      var vec = V.v();
      for(var i=0;i<v1.length;i++) {
        vec.push(v1[i]/v2[0]);
      }
      return vec;
    }
  };

  V.dot = function(v1, v2) {
    if(v1.length != v2.length) throw 'Vectors need to be of the same length';
    var product = 0;
    for(var i=0;i<v1.length;i++) {
      product += v1[i]*v2[i];
    }
    return product;
  }

  V.length = function(v) {
    var squaredLength = 0;
    for(var i=0;i<v.length;i++) {
      squaredLength += v[i]*v[i];
    }
    return M.sqrt(squaredLength);
  }

  V.normalize = function(v) {
    var length = V.length(v);
    var v2 = V.v();
    for(var i=0;i<v.length;i++) {
      v2.push(v[i]/length);
    }
    return v2;
  };

})(window.V = window.V || {}, window.M = window.M || {});
