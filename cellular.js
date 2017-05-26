//TODO Cellular Automata
//  This is supposed to be 'the most simplest' form.
//  Which means a cell has a single (u8) state.
//
//TODO Field, wrapping mode, getCell, getNeighbours, getExtendedNeighbours, setCell, flip
//TODO Rules, execute(field)

(function(Automata){
  Automata.Field = class {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.boardFront = new Uint8Array(width*height);
      this.boardBack = new Uint8Array(width*height);

      //TODO Do not hardcode
      this.states = 4;

      //TODO Do not hardcode
      this.random();
    }

    random() {
      for(var y=0;y<this.height;y++) {
        for(var x=0;x<this.width;x++) {
          this.set([x,y], M.floor(M.random() * this.states));
        }
      }
      this.flip();
    }

    flip() {
      let b1 = this.boardFront;
      let b2 = this.boardBack;
      this.boardFront = b2;
      this.boardBack = b1;
    }

    draw(drawable) {
      for(var y=0;y<this.height;y++) {
        for(var x=0;x<this.width;x++) {
          let cell = this.get([x,y]);
          drawable.setP([x,y], cell/this.states);
        }
      }
      drawable.draw();
    }

    //TODO Allow for other types of wraparound
    get(p) {
      let x = (this.width + p[0]) % this.width;
      let y = (this.height + p[1]) % this.height;
      let cell = this.boardFront[y*this.width+x];
      return cell;
    }

    //TODO Allow for other types of wraparound
    set(p, v) {
      let x = (this.width + p[0]) % this.width;
      let y = (this.height + p[1]) % this.height;
      this.boardBack[y*this.width+x] = v;
    }

    forEach(callback) {
      for(var y=0;y<this.height;y++) {
        for(var x=0;x<this.width;x++) {
          callback([x,y]);
        }
      }
    }

    neighbourCount(p, state) {
      let x = p[0], y = p[1];
      let count = 0;
      if(this.get([x-1, y-1]) == state) count++;
      if(this.get([x-1, y  ]) == state) count++;
      if(this.get([x-1, y+1]) == state) count++;
      if(this.get([x  , y-1]) == state) count++;
      if(this.get([x  , y+1]) == state) count++;
      if(this.get([x+1, y-1]) == state) count++;
      if(this.get([x+1, y  ]) == state) count++;
      if(this.get([x+1, y+1]) == state) count++;
      return count;
    }
  };

  //TODO Do not hardcode rules
  Automata.Rules = class {
    constructor(field) {
      this.field = field;
    }

    execute() {
      this.field.forEach((p)=>{
        //This doens't work
        switch(this.field.get(p)) {
          case 0:
            this.field.set(p, 0);
            break;
          case 1:
            this.field.set(p, 2);
            break;
          case 2:
            this.field.set(p, 3);
            break;
          case 3:
            var count = this.field.neighbourCount(p, 1);
            if(count == 1 || count == 2) {
              this.field.set(p, 1);
            } else {
              this.field.set(p, 3);
            }
            break;
        }
      });
      this.field.flip();
    }
  };
})(window.Automata = window.Automata || {});
