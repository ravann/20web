const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");

rulesBtn.addEventListener("click", (e) => {
  rules.classList.add("show");
});

closeBtn.addEventListener("click", (e) => {
  rules.classList.remove("show");
});

//////// DICE ///////

import { Player } from "./player.js";
import { Player1 } from "./player.js";
import { CoOrd } from "./player.js";

class Dice {
  rolledValue = 0;
  constructor() {}

  roll() {
    // Check if we want to give 12
    if (Math.random() * 1000 <= 10) {
      return 12;
    }
    var roll = Math.round(Math.random() * 10000);
    roll = roll % 6;
    if (roll === 0) {
      roll = 6;
    }
    this.rolledValue = roll;
  }

  getRolledValue() {
    return this.rolledValue;
  }
}

/// Handle canvas

class HomeCoOrds {
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

// Coin class
class Coin {
  player;
  color;
  constructor(p, c) {
    this.player = p;
    this.color = c;
  }
}

class BoardCell {
  ctx;
  left;
  top;
  height;
  width;
  coin;
  coord;

  constructor(ctx, left, top, height, width) {
    this.ctx = ctx;
    this.left = left;
    this.top = top;
    this.height = height;
    this.width = width;
  }

  setCoord(c) {
    this.coord = c;
  }

  getCoord() {
    return this.coord;
  }

  render() {
    ctx.beginPath();
    ctx.rect(this.left + 1, this.top + 1, this.width - 2, this.height - 2);
    ctx.fillStyle = "#fdf5e5";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "#f00";
    ctx.strokeRect(this.left, this.top, this.width, this.height);
    ctx.fill();
    ctx.closePath();
    this.renderCoins();
  }

  // TODO: Fox the logic to show multiple coins
  renderCoins() {
    if (this.coin != null || this.coin != undefined) {
      ctx.beginPath();
      ctx.arc(
        this.left + this.width / 2,
        this.top + this.height / 2,
        8,
        0,
        360
      );
      ctx.fillStyle = this.coin.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  addCoin(c) {
    if (this.coin != null || this.coin != undefined) {
      // Return this coin to players home base
      // If the new coin belongs to the same player as existing coin, refuse movement
    }
    this.coin = c;
  }

  hasCoin() {
    if (this.coin === undefined || this.coin === null) {
      return false;
    }
    return true;
  }

  removeCoin(player) {
    if (this.hasCoin) {
      var coin = this.coin;
      this.coin = null;
      return coin;
    }
  }
}

class BoardHomeCell extends BoardCell {
  coins = [];

  constructor(ctx, left, top, height, width) {
    super(ctx, left, top, height, width);
  }

  render() {
    ctx.beginPath();
    ctx.rect(this.left + 1, this.top + 1, this.width - 2, this.height - 2);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "#f00";
    ctx.strokeRect(this.left, this.top, this.width, this.height);
    ctx.fill();
    ctx.closePath();
    this.renderCoins();
  }

  // TODO: Fox the logic to show multiple coins
  renderCoins() {
    for (let i = 0; i < this.coins.length; i++) {
      var coin = this.coins[0];
      ctx.beginPath();
      ctx.arc(
        this.left + this.width / 2,
        this.top + this.height / 2,
        8,
        0,
        360
      );
      ctx.fillStyle = coin.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  addCoin(c) {
    this.coins.push(c);
  }

  hasCoin() {
    if (this.coins.length == 0) {
      return false;
    }
    return true;
  }

  removeCoin(player) {
    if (this.hasCoin()) {
      var coin = this.coins.pop();
      return coin;
    }
  }
}

class Board {
  totalPlayers = 4;
  cointsPerPlayer = 4;
  ctx;
  players = [];
  cells = [];
  cols;
  rows;
  homeCoords;
  cellHeight;
  cellWidth;

  constructor(ctx, cols, rows, height, width) {
    this.ctx = ctx;
    this.cols = cols;
    this.rows = rows;
    this.cellHeight = height;
    this.cellWidth = width;
    this.homeCoords = new HomeCoOrds();
    this.initializeCells();
    this.initializePlayers();
  }

  initializeCells() {
    for (let i = 0; i < this.cols; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.rows; j++) {
        var left = i * this.cellWidth;
        var top = j * this.cellHeight;
        if (this.homeCoords.isHome(i, j)) {
          this.cells[i][j] = new BoardHomeCell(
            ctx,
            left,
            top,
            this.cellHeight,
            this.cellWidth
          );
        } else {
          this.cells[i][j] = new BoardCell(
            ctx,
            left,
            top,
            this.cellHeight,
            this.cellWidth
          );
        }
        var coord = new CoOrd(i, j);
        this.cells[i][j].setCoord(coord);
      }
    }
  }

  initializePlayers() {
    var c = "red";
    var p = new Player1(c);
    this.players.push(p);
    this.initializeCoinsForPlayer(p, c);
  }

  initializeCoinsForPlayer(p, c) {
    c = new Coin(p, c);
    var coord = p.getHomeCoOrds();
    this.cells[coord.col][coord.row].addCoin(c);
  }

  render() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        var cell = this.cells[i][j];
        cell.render();
      }
    }
  }

  getCellAtCoordinate(x, y) {
    var col = Math.floor(x / this.cellWidth);
    var row = Math.floor(y / this.cellHeight);
    return this.cells[col][row];
  }

  moveCoinFromCellBy(player, cell, move) {
    var coord = player.getTargetCoord(cell.getCoord(), move);
    if (coord != null) {
      var tcell = this.getCellAtCoordinate(
        coord.col * 90 + 2,
        coord.row * 90 + 2
      );
      var coin = cell.removeCoin(player);
      tcell.addCoin(coin);
      console.log(`target cell is: `);
      console.log(tcell);
    } else {
      // TODO: Cant move coin
    }
  }
}

// MAIN

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var board = new Board(ctx, 7, 7, 90, 90);
board.render();

console.log("Control is at the end!!!");

var d = new Dice();
function handleUserAction(e) {
  d.roll();

  var cell = board.getCellAtCoordinate(e.offsetX, e.offsetY);
  if (cell.hasCoin()) {
    board.moveCoinFromCellBy(board.players[0], cell, d.getRolledValue());
  }
  board.render();
}

canvas.addEventListener("click", handleUserAction);

/*
TODO: 
1. Try move the coin over the path
2. Fix render coins to render multiple coins
3. Add 4 players
4. Teach to kill coin
*/
