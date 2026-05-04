// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  const CANVAS_SIZE = 800;

  p.setup = function () {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  };

  p.draw = function () {
     p.background(245, 238, 220);

    // Title
    p.noStroke();
    p.fill(35);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(34);
    p.text("You have worked:", 330, 65);

    // Wallet / open book outer container
    p.noFill();
    p.stroke(35);
    p.strokeWeight(5);

    // Outer wallet shape
    p.beginShape();
    p.vertex(80, 130);
    p.vertex(360, 130);
    p.vertex(400, 165);
    p.vertex(440, 130);
    p.vertex(720, 130);
    p.vertex(735, 260);
    p.vertex(735, 520);
    p.vertex(720, 650);
    p.vertex(440, 650);
    p.vertex(400, 685);
    p.vertex(360, 650);
    p.vertex(80, 650);
    p.vertex(65, 520);
    p.vertex(65, 260);
    p.endShape(p.CLOSE);

    // Inner border
    p.strokeWeight(3);
    p.beginShape();
    p.vertex(105, 160);
    p.vertex(350, 160);
    p.vertex(400, 195);
    p.vertex(450, 160);
    p.vertex(695, 160);
    p.vertex(710, 270);
    p.vertex(710, 510);
    p.vertex(695, 620);
    p.vertex(450, 620);
    p.vertex(400, 655);
    p.vertex(350, 620);
    p.vertex(105, 620);
    p.vertex(90, 510);
    p.vertex(90, 270);
    p.endShape(p.CLOSE);

    // Middle fold
    p.strokeWeight(4);
    p.line(400, 195, 400, 655);

    // Right side wallet flap
    p.fill(245, 238, 220);
    p.strokeWeight(4);
    p.beginShape();
    p.vertex(670, 260);
    p.vertex(755, 290);
    p.vertex(755, 430);
    p.vertex(670, 400);
    p.endShape(p.CLOSE);

    // ===== WORK TIME DATA =====
    // For now, use current time as a demo of accumulated work time.
    // Later we can change this to a custom work-start timer.
    let workedHours = p.hour() % 8;
    let workedMinutes = p.minute();
    let workedSeconds = p.second();

    let hourUnits = workedHours;                 // 1 stack = 1 hour
    let minuteUnits = Math.floor(workedMinutes / 10); // 1 bill = 10 minutes
    let secondUnits = Math.floor(workedSeconds / 10); // 1 coin = 10 seconds

    // ===== DRAW MONEY UNITS INSIDE LEFT PAGE =====
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);

    // ---- HOURS: money stacks, each stack = 1 hour ----
    for (let i = 0; i < hourUnits; i++) {
      let x = 150 + (i % 3) * 85;
      let y = 230 + Math.floor(i / 3) * 65;

      // stack layers
      p.fill(65, 145, 80);
      p.rect(x, y + 10, 60, 35, 6);
      p.fill(80, 165, 95);
      p.rect(x, y + 5, 60, 35, 6);
      p.fill(95, 185, 110);
      p.rect(x, y, 60, 35, 6);

      p.fill(255);
      p.textSize(18);
      p.text("$", x + 30, y + 18);
    }

    // ---- MINUTES: bills, each bill = 10 minutes ----
    for (let i = 0; i < minuteUnits; i++) {
      let x = 145 + (i % 4) * 65;
      let y = 405 + Math.floor(i / 4) * 45;

      p.fill(90, 175, 105);
      p.rect(x, y, 48, 28, 5);

      p.fill(255);
      p.textSize(15);
      p.text("$", x + 24, y + 14);
    }

    // ---- SECONDS: coins, each coin = 10 seconds ----
    for (let i = 0; i < secondUnits; i++) {
      let x = 155 + (i % 5) * 45;
      let y = 535 + Math.floor(i / 5) * 38;

      p.fill(205, 170, 55);
      p.circle(x, y, 26);

      p.fill(255);
      p.textSize(13);
      p.text("$", x, y + 2);
    }


  };

  p.windowResized = function () { p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE); };
});
