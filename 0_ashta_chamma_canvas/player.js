export class CoOrd {
  col;
  row;
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
}

export class HomeCoOrds {
  homes = [];
  constructor() {
    this.homes.push(new CoOrd(3, 0));
    this.homes.push(new CoOrd(1, 1));
    this.homes.push(new CoOrd(5, 1));
    this.homes.push(new CoOrd(0, 3));
    this.homes.push(new CoOrd(6, 3));
    this.homes.push(new CoOrd(1, 5));
    this.homes.push(new CoOrd(5, 5));
    this.homes.push(new CoOrd(3, 6));
    this.homes.push(new CoOrd(3, 3));
    console.log(this.homes);
  }

  isHome(col, row) {
    for (let i = 0; i < this.homes.length; i++) {
      if (this.homes[i].col === col && this.homes[i].row === row) {
        return true;
      }
    }
    return false;
  }
}

export class Player {
  kill = false;
  restrctedPoint = 24;
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

  markKill() {
    this.kill = true;
  }

  hasKill() {
    return this.kill;
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
    if (idx == -1) {
      return null;
    }
    var newPoint = idx + move;
    if (!this.hasKill() && newPoint >= this.restrctedPoint) {
      return null;
    }
    return this.path[newPoint];
  }
}

export class Player1 extends Player {
  constructor(name) {
    super(name);
    super.homeCoords = new CoOrd(3, 0);
    this.initializePath();
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

export class Player2 extends Player {
  constructor(name) {
    super(name);
    super.homeCoords = new CoOrd(0, 3);
    this.initializePath();
  }

  initializePath() {
    this.path = [
      // Start from home base - first column
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
      new CoOrd(3, 0),
      new CoOrd(2, 0),
      new CoOrd(1, 0),
      new CoOrd(0, 0),
      // first col again
      new CoOrd(0, 1),
      new CoOrd(0, 2),
      // Enter Inside - first row
      new CoOrd(1, 1),
      new CoOrd(2, 1),
      new CoOrd(3, 1),
      new CoOrd(4, 1),
      new CoOrd(5, 1),
      // Inside - last col
      new CoOrd(5, 2),
      new CoOrd(5, 3),
      new CoOrd(5, 4),
      new CoOrd(5, 5),
      // Inside - bottom row
      new CoOrd(4, 5),
      new CoOrd(3, 5),
      new CoOrd(2, 5),
      new CoOrd(1, 5),
      // Inside - first col
      new CoOrd(1, 4),
      new CoOrd(1, 3),
      new CoOrd(1, 2),
      // Innser circle
      new CoOrd(2, 2),
      new CoOrd(3, 2),
      new CoOrd(4, 2),
      new CoOrd(4, 3),
      new CoOrd(4, 4),
      new CoOrd(3, 4),
      new CoOrd(2, 4),
      new CoOrd(2, 3),
      new CoOrd(3, 3),
    ];
  }
}

export class Player3 extends Player {
  constructor(name) {
    super(name);
    super.homeCoords = new CoOrd(3, 6);
    this.initializePath();
  }

  initializePath() {
    this.path = [
      // Start from home base - bottom row
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
      new CoOrd(3, 0),
      new CoOrd(2, 0),
      new CoOrd(1, 0),
      new CoOrd(0, 0),
      // First col
      new CoOrd(0, 1),
      new CoOrd(0, 2),
      new CoOrd(0, 3),
      new CoOrd(0, 4),
      new CoOrd(0, 5),
      new CoOrd(0, 6),
      // Bottom row
      new CoOrd(1, 6),
      new CoOrd(2, 6),
      // Enter Inside
      new CoOrd(1, 5),
      new CoOrd(1, 4),
      new CoOrd(1, 3),
      new CoOrd(1, 2),
      new CoOrd(1, 1),
      // Inside - top row
      new CoOrd(2, 1),
      new CoOrd(3, 1),
      new CoOrd(4, 1),
      new CoOrd(5, 1),
      // Inside - last col
      new CoOrd(5, 2),
      new CoOrd(5, 3),
      new CoOrd(5, 4),
      new CoOrd(5, 5),
      // Inside last row
      new CoOrd(4, 5),
      new CoOrd(3, 5),
      new CoOrd(2, 5),
      // Inner circle
      new CoOrd(2, 4),
      new CoOrd(2, 3),
      new CoOrd(2, 2),
      new CoOrd(3, 2),
      new CoOrd(4, 2),
      new CoOrd(4, 3),
      new CoOrd(4, 4),
      new CoOrd(3, 4),
      new CoOrd(3, 3),
    ];
  }
}

export class Player4 extends Player {
  constructor(name) {
    super(name);
    super.homeCoords = new CoOrd(6, 3);
    this.initializePath();
  }

  initializePath() {
    this.path = [
      // Start from home base - last col
      new CoOrd(6, 3),
      new CoOrd(6, 2),
      new CoOrd(6, 1),
      new CoOrd(6, 0),
      // First Row
      new CoOrd(5, 0),
      new CoOrd(4, 0),
      new CoOrd(3, 0),
      new CoOrd(2, 0),
      new CoOrd(1, 0),
      new CoOrd(0, 0),
      // First col
      new CoOrd(0, 1),
      new CoOrd(0, 2),
      new CoOrd(0, 3),
      new CoOrd(0, 4),
      new CoOrd(0, 5),
      new CoOrd(0, 6),
      // Last row
      new CoOrd(1, 6),
      new CoOrd(2, 6),
      new CoOrd(3, 6),
      new CoOrd(4, 6),
      new CoOrd(5, 6),
      new CoOrd(6, 6),
      // last col
      new CoOrd(6, 5),
      new CoOrd(6, 4),
      // Enter inside - bottom row
      new CoOrd(5, 5),
      new CoOrd(4, 5),
      new CoOrd(3, 5),
      new CoOrd(2, 5),
      new CoOrd(1, 5),
      // Inside - first col
      new CoOrd(1, 4),
      new CoOrd(1, 3),
      new CoOrd(1, 2),
      new CoOrd(1, 1),
      // Inside - top row
      new CoOrd(2, 1),
      new CoOrd(3, 1),
      new CoOrd(4, 1),
      new CoOrd(5, 1),
      // Inside - last col
      new CoOrd(5, 2),
      new CoOrd(5, 3),
      new CoOrd(5, 4),
      // Inner circle
      new CoOrd(4, 4),
      new CoOrd(3, 4),
      new CoOrd(2, 4),
      new CoOrd(2, 3),
      new CoOrd(2, 2),
      new CoOrd(3, 2),
      new CoOrd(4, 2),
      new CoOrd(4, 3),
      new CoOrd(3, 3),
    ];
  }
}
