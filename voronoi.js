//TODO
//  https://rosettacode.org/wiki/Voronoi_diagram#Version_.232.
//  https://en.wikipedia.org/wiki/Lloyd%27s_algorithm
//  Multiple distance functions
//  What kind of api?
//    sites -> cells(vertices,site)

(function(){
  'use strict';

  window.Voronoi = class {
    constructor(sites) {
      this.sites = sites;
    }

    //TODO stupidly slow way of finding centroids.
    //TODO This needs cleaning up
    //  Used for Lloyd's Argorithm.
    centroids(width, height) {
      let centroids = new Array(this.sites.length);

      for(let y=0;y<height;y++) {
        for(let x=0;x<width;x++) {
          let p = [x,y];
          let siteIndex = this.voronoi(p);
          centroids[siteIndex] = centroids[siteIndex] || {pos: [0,0], count: 0};
          let centroid = centroids[siteIndex];
          Vec2.add(centroid.pos, p, centroid.pos);
          centroid.count++;
        }
      }
      for(let i=0;i<centroids.length;i++) {
        let c = []
        centroids[i] = Vec2.Scalar.divide(c, centroids[i].pos, centroids[i].count);
        centroids[i] = c;
      }
      return centroids;
    }

    //TODO This is not very efficient
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
      return bestSiteIndex;
    }
  };
})();
