export class CoOrd {
  col;
  row;
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
}

export class Player {
  name;
  homeCoords;
  path = [];
  constructor(name) {
    this.name = name;
  }

  // To be overwritten by the sub class
  addToPath(currentLoc, rolledNum) {
    return null;
  }

  getHomeCoOrds() {
    return this.homeCoords;
  }
}

export class Player1 extends Player {
  constructor(name) {
    super(name);
    super.homeCoords = new CoOrd(3, 0);
    this.initializePath();
  }

  getTargetCoord(coord, move) {
    var idx = -1;
    for (let i = 0; i < this.path.length; i++) {
      var c = this.path[i];
      if (coord.col == c.col && coord.row == c.row) {
        idx = i;
        break;
      }
    }
    if (idx > -1) {
      console.log(`Cell is at index : ${idx}, moving it by ${move}`);
      console.log(`New coordiate : `);
      console.log(this.path[idx + move]);
      return this.path[idx + move];
    } else {
      return null;
    }
  }

  initializePath() {
    this.path = [
      // Start from home base - first row
      new CoOrd(3, 0),
      new CoOrd(2, 0),
      new CoOrd(1, 0),
      new CoOrd(0, 0),
      // First column
      new CoOrd(0, 1),
      new CoOrd(0, 2),
      new CoOrd(0, 3),
      new CoOrd(0, 4),
      new CoOrd(0, 5),
      new CoOrd(0, 6),
      // Bottom Row
      new CoOrd(1, 6),
      new CoOrd(2, 6),
      new CoOrd(3, 6),
      new CoOrd(4, 6),
      new CoOrd(5, 6),
      new CoOrd(6, 6),
      // Last column
      new CoOrd(6, 5),
      new CoOrd(6, 4),
      new CoOrd(6, 3),
      new CoOrd(6, 2),
      new CoOrd(6, 1),
      new CoOrd(6, 0),
      // First Row
      new CoOrd(5, 0),
      new CoOrd(4, 0),
      // Enter inside - Last but 1 row
      new CoOrd(5, 1),
      new CoOrd(5, 2),
      new CoOrd(5, 3),
      new CoOrd(5, 4),
      new CoOrd(5, 5),
      // Last but 1 row
      new CoOrd(4, 5),
      new CoOrd(3, 5),
      new CoOrd(2, 5),
      new CoOrd(1, 5),
      // 2nd column
      new CoOrd(1, 4),
      new CoOrd(1, 5),
      new CoOrd(1, 3),
      new CoOrd(1, 2),
      new CoOrd(1, 1),
      // 2nd row
      new CoOrd(2, 1),
      new CoOrd(3, 1),
      new CoOrd(4, 1),
      // Enter inside
      new CoOrd(4, 2),
      new CoOrd(4, 3),
      new CoOrd(4, 4),
      new CoOrd(3, 4),
      new CoOrd(2, 4),
      new CoOrd(2, 3),
      new CoOrd(2, 2),
      new CoOrd(3, 2),
      new CoOrd(3, 3),
    ];
  }
}
