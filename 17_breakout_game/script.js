const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");

rulesBtn.addEventListener("click", (e) => {
  rules.classList.add("show");
});

closeBtn.addEventListener("click", (e) => {
  rules.classList.remove("show");
});

// Working with canvas

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create ball properties
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

// draw ball on canvas

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, 360);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// Create paddle properties

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  width: 80,
  height: 10,
  speed: 8,
  dx: 0,
};

// Draw paddle om canvas

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// Draw score on canvas
var score = 0;

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Create bricks

const brickRowCount = 9;
const brickColumnCount = 5;

// Brick props

const brickInfo = {
  w: 50,
  h: 10,
  offsetX: 45,
  offsetY: 60,
  padding: 10,
  visible: true,
};

// Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

function drawBricks() {
  bricks.forEach((col) => {
    col.forEach((b) => {
      ctx.beginPath();
      ctx.rect(b.x, b.y, b.w, b.h);
      ctx.fillStyle = b.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// Move paddle on canvas

function movePaddle() {
  paddle.x += paddle.dx;

  // Wall deltection
  if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall detection
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.width &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  var bricksHit = 0;
  // Brick collision
  bricks.forEach((cols) => {
    cols.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x &&
          ball.x + ball.size < brick.x + brick.w &&
          ball.y + ball.size > brick.y &&
          ball.y - ball.size < brick.y + brick.h
        ) {
          brick.visible = false;
          ball.dy *= -1;
          bricksHit++;
        }
      } else {
        bricksHit++;
      }
    });
  });

  // Handle score
  setScore(bricksHit);

  // Reset if ball doesnt hit paddle
  if (ball.y + ball.size >= canvas.height) {
    showAllBricks();
  }
}

function showAllBricks() {
  score = 0;
  bricks.forEach((cols) => {
    cols.forEach((brick) => {
      brick.visible = true;
    });
  });
}

function setScore(s) {
  score = s;

  if (score == brickRowCount * brickColumnCount) {
    showAllBricks();
  }
}

// Update canvas and animation
function update() {
  // Draw everything
  movePaddle();
  moveBall();

  draw();

  requestAnimationFrame(update);
}

update();

// Keyboard event listener

function keyDown(e) {
  if (e.key === "ArrowRight" || e.key == "Right") {
    paddle.dx = paddle.speed;
  } else if (e.key === "ArrowLeft" || e.key == "Left") {
    paddle.dx = -1 * paddle.speed;
  }
}

function keyUp(e) {
  paddle.dx = 0;
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
