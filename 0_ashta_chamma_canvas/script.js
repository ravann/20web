const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");

rulesBtn.addEventListener("click", (e) => {
  rules.classList.add("show");
});

closeBtn.addEventListener("click", (e) => {
  rules.classList.remove("show");
});

function setBoardMessage(msg) {
  messageLbl.innerText = msg;
  messageLbl.className = "message";
}

function setBoardErrorMessage(msg) {
  messageLbl.innerText = msg;
  messageLbl.className = "message err";
}

function setDiceMessage(msg) {
  rollDiceLbl.innerText = msg;
  messageLbl.className = "message";
}

//////// DICE ///////

import { Player1, Player2, Player3, Player4 } from "./player.js";
import { CoOrd } from "./player.js";

class Dice {
  rolls = [];

  constructor() {}

  roll() {
    // Check if we want to give 12
    if (Math.random() * 1000 >= 990) {
      this.rolls.push(12);
      return;
    }
    var roll = Math.round(Math.random() * 10000);
    roll = roll % 6;
    if (roll === 0) {
      roll = 6;
    }
    this.rolls.push(roll);
  }

  clearRolls() {
    this.rolls = [];
    setDiceMessage("Please roll");
  }

  hasMoreRolls() {
    return this.rolls.length > 0;
  }

  getLastRolled() {
    if (this.hasMoreRolls()) {
      return this.rolls[this.rolls.length - 1];
    }
    return 0;
  }

  clearARoll() {
    this.rolls.splice(0, 1);
  }

  getRolledValue() {
    if (this.hasMoreRolls()) {
      const val = this.rolls[0];
      return val;
    }
    return 0;
  }
}

// MAIN
const rollDiceBtn = document.getElementById("roll_dice_btn");
const rollDiceLbl = document.getElementById("roll_dice_lbl");
const d = new Dice();

const messageLbl = document.getElementById("message");

// Event handers

function handleRollDice(e) {
  console.log(e);
  d.roll();
  const lastRoll = d.getLastRolled();
  if (lastRoll == 6 || lastRoll == 12) {
    setDiceMessage(`${lastRoll}!!  Roll Again.`);
  } else {
    setDiceMessage(`You rolled : ${lastRoll}`);
    rollDiceBtn.disabled = true;
  }
}

rollDiceBtn.addEventListener("click", handleRollDice);

///// Handle BOARD

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
  coinRadius = 8;

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
        this.coinRadius,
        0,
        360
      );
      ctx.fillStyle = this.coin.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  isHome() {
    return false;
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
    //    ctx.fillStyle = "#0095dd";
    ctx.fillStyle = "#808080";
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
    var x = this.left + this.coinRadius * 3;
    var y = this.top + this.coinRadius * 3;
    for (let i = 0; i < this.coins.length; i++) {
      var coin = this.coins[i];
      ctx.beginPath();
      ctx.arc(x, y, this.coinRadius, 0, 360);
      ctx.fillStyle = coin.color;
      ctx.fill();
      ctx.closePath();
      x = x + this.coinRadius * 3;
      if (x >= this.left + this.width - this.coinRadius * 2) {
        y = y + this.coinRadius * 3;
        x = this.left + this.coinRadius * 3;
      }
    }
  }

  isHome() {
    return true;
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
    for (let i = 0; i < this.coins.length; i++) {
      if (this.coins[i].player == player) {
        var coin = this.coins[i];
        this.coins.splice(i, 1);
        return coin;
      }
    }
  }
}

class Board {
  totalPlayers = 4;
  coinsPerPlayer = 4;
  ctx;
  players = [];
  cells = [];
  cols;
  rows;
  homeCoords;
  cellHeight;
  cellWidth;
  turnPlayer = 0; // Dictates whose turn it is
  killed = false;

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

    c = "blue";
    p = new Player2(c);
    this.players.push(p);

    c = "green";
    p = new Player3(c);
    this.players.push(p);

    c = "purple";
    p = new Player4(c);
    this.players.push(p);

    this.initializeCoinsForPlayers();
  }

  initializeCoinsForPlayers() {
    this.players.forEach((p) => {
      for (let i = 0; i < this.coinsPerPlayer; i++) {
        var c = new Coin(p, p.name);
        var coord = p.getHomeCoOrds();
        this.cells[coord.col][coord.row].addCoin(c);
      }
    });
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

  hasKill() {
    return this.killed;
  }

  clearKill() {
    this.killed = false;
  }

  killCoin(cell) {
    var coords = cell.coin.player.getHomeCoOrds();
    console.log("Killing coin.  Moving it to");
    console.log(this.cells[coords.col][coords.row]);
    var coin = cell.removeCoin();
    this.cells[coords.col][coords.row].addCoin(coin);
    this.killed = true;
  }

  doesPlayerCoinExists(cell) {
    if (cell.isHome()) {
      for (let i = 0; i < cell.coins.length; i++) {
        if (cell.coins[i].player == this.players[this.turnPlayer]) {
          return true;
        }
      }
    } else {
      if (cell.coin.player == this.players[this.turnPlayer]) {
        return true;
      }
    }
    return false;
  }

  changeTurn() {
    this.turnPlayer++;
    if (this.turnPlayer == 4) {
      this.turnPlayer = 0;
    }
    const name = this.players[this.turnPlayer].name;
    setBoardMessage(`Its ${name} players turn`);
  }

  moveCoinFromCell(cell, move) {
    var coord = this.players[this.turnPlayer].getTargetCoord(
      cell.getCoord(),
      move
    );
    if (coord == null) {
      setBoardErrorMessage("Cant move the coin!!!");
      return false;
    }
    var tcell = this.getCellAtCoordinate(
      coord.col * 90 + 2,
      coord.row * 90 + 2
    );
    console.log(`target cell is: `);
    console.log(tcell);

    // Target cell is home cell, just add this
    if (tcell.isHome()) {
      var coin = cell.removeCoin(this.players[this.turnPlayer]);
      tcell.addCoin(coin);
      return true;
    }
    // Target cell is not home cell and does have a coin.
    // Kill the coin if it belongs to other player
    // If its same player, refuse to move
    if (tcell.hasCoin()) {
      if (tcell.coin.player.name == this.players[this.turnPlayer].name) {
        setBoardErrorMessage("You cannot kill your own coin!!!");
        return false;
      } else {
        this.killCoin(tcell);
        var coin = cell.removeCoin(this.players[this.turnPlayer]);
        console.log("Adding new coin to cell");
        console.log(coin);
        tcell.addCoin(coin);
        return true;
      }
    }
    // Target cell is not home and doesnt have a coin
    var coin = cell.removeCoin(this.players[this.turnPlayer]);
    tcell.addCoin(coin);
    return true;
  }
}

// MAIN

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var board = new Board(ctx, 7, 7, 90, 90);
board.render();

console.log("Control is at the end!!!");

// EVENT HANDLERS
function handleUserAction(e) {
  if (rollDiceBtn.disabled == false) {
    return;
  }

  var cell = board.getCellAtCoordinate(e.offsetX, e.offsetY);

  if (cell.hasCoin() && board.doesPlayerCoinExists(cell)) {
    var out = board.moveCoinFromCell(cell, d.getRolledValue());
    if (out == false) {
      return;
    }
    // If roll is successful ...
    d.clearARoll();
    board.render();

    if (board.hasKill()) {
      board.clearKill();
      rollDiceBtn.disabled = false;
      setBoardMessage(`${board.players[board.turnPlayer].name} roll again`);
      return;
    }

    // If there are more to place, ask player to continue placing coins
    if (d.hasMoreRolls()) {
      return;
    }

    board.changeTurn();
    d.clearRolls();
    rollDiceBtn.disabled = false;
  } else if (cell.hasCoin()) {
    setBoardErrorMessage("You can only move your coin");
  }
}

canvas.addEventListener("click", handleUserAction);

/*
TODO: 
1. Fix: When coin cant move any further, game is struck
4. host the solution on cloud
5. Allow entry to inner circle only if the player has a kill

----- 

If consequtive 3x6 or 3x12 - pass the turn


*/
