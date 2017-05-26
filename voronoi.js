//TODO
//  https://rosettacode.org/wiki/Voronoi_diagram#Version_.232.
//  https://en.wikipedia.org/wiki/Lloyd%27s_algorithm
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

    //TODO do we want to return the site here, or the index?
    //  The index might be nice, as then you can use that for other arrays, like color.
    voronoi(p) {
      let bestSite = this.sites[0];
      let bestSiteLength = Vec2.distance(p, bestSite);
      let bestSiteIndex = 0;

      for(let i=0; i<this.sites.length; i++) {
        let site = this.sites[i];
        let l = Vec2.distance(p, site);
        if(l < bestSiteLength) {
          bestSite = site;
          bestSiteLength = l;
          bestSiteIndex = i;
        }
      }
      //TODO return bestSiteIndex;
      return bestSite;
    }
  };
})();
