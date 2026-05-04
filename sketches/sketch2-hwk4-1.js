// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  const CANVAS_SIZE = 800;

  p.setup = function () {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  };

  p.draw = function () {
    p.background(255);

    const TOTAL_PLAYERS = 4;
    const TIME_PER_PLAYER = 30; // seconds
    const totalDuration = TOTAL_PLAYERS * TIME_PER_PLAYER;

    // loop forever
    let elapsed = (p.millis() / 1000) % totalDuration;
    let currentPlayer = Math.floor(elapsed / TIME_PER_PLAYER);
    let playerElapsed = elapsed % TIME_PER_PLAYER;


    // ===== Layout =====
    let startX = 140;
    let gap = 170;
    let baseY = 360;

    for (let i = 0; i < TOTAL_PLAYERS; i++) {
      let x = startX + i * gap;

      let visibleRatio;

      if (i < currentPlayer) {
        visibleRatio = 0;
      } else if (i === currentPlayer) {
        visibleRatio = 1 - playerElapsed / TIME_PER_PLAYER;
      } else {
        visibleRatio = 1;
      }

      // Time label
      let remaining;
      if (i < currentPlayer) {
        remaining = 0;
      } else if (i === currentPlayer) {
        remaining = Math.ceil(TIME_PER_PLAYER - playerElapsed);
      } else {
        remaining = TIME_PER_PLAYER;
      }

      let timeStr = "0:" + (remaining < 10 ? "0" + remaining : remaining);

      p.noStroke();
      p.fill(0);
      p.textSize(22);
      p.textAlign(p.CENTER);
      p.text(timeStr, x, baseY - 135);

      // Avatar clipping area: reveal only lower remaining part
      let avatarTop = baseY - 110;
      let avatarBottom = baseY + 100;
      let avatarHeight = avatarBottom - avatarTop;

      let visibleHeight = avatarHeight * visibleRatio;
      let clipTop = avatarBottom - visibleHeight;
      let avatarColor = p.lerpColor(
        p.color(220, 45, 45),
        p.color(40, 170, 80),
        visibleRatio
      );

      p.push();
      p.drawingContext.save();

      p.drawingContext.beginPath();
      p.drawingContext.rect(
        x - 60,
        clipTop,
        120,
        visibleHeight
      );
      p.drawingContext.clip();

      // Draw avatar
      p.stroke(avatarColor);
      p.strokeWeight(4);
      p.noFill();

      // head
      p.ellipse(x, baseY - 80, 50, 50);

      // body
      p.line(x, baseY - 55, x, baseY + 30);

      // arms
      p.line(x, baseY - 25, x - 35, baseY + 10);
      p.line(x, baseY - 25, x + 35, baseY + 10);

      // legs
      p.line(x, baseY + 30, x - 28, baseY + 85);
      p.line(x, baseY + 30, x + 28, baseY + 85);

      p.drawingContext.restore();
      p.pop();

      if (i < currentPlayer) {
        p.fill(120);
        p.noStroke();
        p.textSize(16);
        p.text("spoken", x, baseY + 130);
      } else if (i === currentPlayer) {
        p.fill(0);
        p.noStroke();
        p.textSize(16);
        p.text("speaking", x, baseY + 130);
      }
    }


    // ===== Frame =====
    p.noFill();
    p.stroke(0);
    p.strokeWeight(1);
    p.rect(0, 0, p.width - 1, p.height - 1);
  };
  p.windowResized = function () { p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE); };
});
