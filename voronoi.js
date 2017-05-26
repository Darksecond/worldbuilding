//TODO
//  https://rosettacode.org/wiki/Voronoi_diagram#Version_.232.
//  Multiple distance functions
//  Simplest implementation first
//  What kind of api?
//    point+sites -> closest site?
//    or sites -> [w*h]
//    or sites -> cells(vertices,site)

(function(){
  'use strict';
  window.Voronoi = class {
    constructor(sites, width, height) {
      this.sites = sites;
      this.width = width;
      this.height = height;
    }

    voronoi(p) {
      let bestSite = this.sites[0];
      let bestSiteLength = Vec2.distance(p, bestSite);

      for(let i=0; i<this.sites.length; i++) {
        let site = this.sites[i];
        let l = Vec2.distance(p, site);
        if(l < bestSiteLength) {
          bestSite = site;
          bestSiteLength = l;
        }
      }
      return bestSite;
    }
  };
})();
