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
     
    // Accumulated timer since the sketch starts
    let totalWorkedSeconds = Math.floor(p.millis() / 1000);
    

    let workedHours = Math.floor(totalWorkedSeconds / 3600);
    let workedMinutes = Math.floor((totalWorkedSeconds % 3600) / 60);
    let workedSeconds = totalWorkedSeconds % 60;

    // Full units + partial progress
    let displayHourUnits = Math.min(workedHours, 6);
    let hiddenHourUnits = Math.max(workedHours - 6, 0);
    let hourProgress = workedMinutes / 60;

    let fullMinuteUnits = Math.floor(workedMinutes / 10); 
    let minuteProgress = (workedMinutes % 10) / 10;  // next bill gradually appears

    let fullSecondUnits = Math.floor(workedSeconds / 10);
    let secondProgress = (workedSeconds % 10) / 10;  // next coin gradually appears

    // ===== LEFT PAGE LABELS =====
    p.noStroke();
    p.fill(70);
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(16);
    p.text("Hours", 105, 195);
    p.text("Minutes", 105, 375);
    p.text("Seconds", 105, 525);

    p.textAlign(p.CENTER, p.CENTER);

    // Helper: draw stack
    function drawMoneyStack(x, y, alpha, scaleFactor) {
      p.push();
      p.translate(x, y);
      p.scale(scaleFactor);

      p.fill(65, 145, 80, alpha);
      p.rect(0, 18, 70, 35, 7);

      p.fill(80, 165, 95, alpha);
      p.rect(0, 9, 70, 35, 7);

      p.fill(95, 185, 110, alpha);
      p.rect(0, 0, 70, 35, 7);

      p.fill(255, alpha);
      p.textSize(20);
      p.text("$", 35, 18);

      p.pop();
    }

    // Helper: draw bill
    function drawBill(x, y, alpha, scaleFactor) {
      p.push();
      p.translate(x, y);
      p.scale(scaleFactor);

      p.fill(90, 175, 105, alpha);
      p.rect(0, 0, 52, 30, 6);

      p.fill(255, alpha);
      p.textSize(16);
      p.text("$", 26, 15);

      p.pop();
    }

    // Helper: draw coin
    function drawCoin(x, y, alpha, scaleFactor) {
      p.push();
      p.translate(x, y);
      p.scale(scaleFactor);

      p.fill(205, 170, 55, alpha);
      p.circle(0, 0, 28);

      p.fill(255, alpha);
      p.textSize(13);
      p.text("$", 0, 2);

      p.pop();
    }

    // ===== HOURS AREA =====
    // ===== HOURS AREA =====
    let hourStartX = 115;
    let hourStartY = 225;
    let hourGapX = 90;
    let hourGapY = 70;

    for (let i = 0; i < displayHourUnits; i++) {
      let x = hourStartX + (i % 3) * hourGapX;
      let y = hourStartY + Math.floor(i / 3) * hourGapY;
      drawMoneyStack(x, y, 255, 0.9);
    }

    // partial next hour stack
    if (workedHours < 6 && hourProgress > 0) {
      let i = workedHours;
      let x = hourStartX + (i % 3) * hourGapX;
      let y = hourStartY + Math.floor(i / 3) * hourGapY;
      drawMoneyStack(x, y, 255 * hourProgress, 0.35 + 0.55 * hourProgress);
    }

    // If more than 6 hours, show "+N" instead of overflowing
    if (hiddenHourUnits > 0) {
      p.noStroke();
      p.fill(70);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(22);
      p.text("+" + hiddenHourUnits + " more", 285, 345);
    }

    // ===== MINUTES AREA =====
    let minuteStartX = 115;
    let minuteStartY = 410;
    let minuteGapX = 72;
    let minuteGapY = 45;

    for (let i = 0; i < fullMinuteUnits; i++) {
      if (i >= 8) break; // avoid overlap
      let x = minuteStartX + (i % 4) * minuteGapX;
      let y = minuteStartY + Math.floor(i / 4) * minuteGapY;
      drawBill(x, y, 255, 1);
    }

    // partial next 10-minute bill
    if (fullMinuteUnits < 8 && minuteProgress > 0) {
      let i = fullMinuteUnits;
      let x = minuteStartX + (i % 4) * minuteGapX;
      let y = minuteStartY + Math.floor(i / 4) * minuteGapY;
      drawBill(x, y, 255 * minuteProgress, 0.4 + 0.6 * minuteProgress);
    }

    // ===== SECONDS AREA =====
    let secondStartX = 125;
    let secondStartY = 570;
    let secondGapX = 45;
    let secondGapY = 36;

    for (let i = 0; i < fullSecondUnits; i++) {
      if (i >= 6) break;
      let x = secondStartX + (i % 6) * secondGapX;
      let y = secondStartY + Math.floor(i / 6) * secondGapY;
      drawCoin(x, y, 255, 1);
    }

    // partial next 10-second coin
    if (fullSecondUnits < 6 && secondProgress > 0) {
      let i = fullSecondUnits;
      let x = secondStartX + (i % 6) * secondGapX;
      let y = secondStartY + Math.floor(i / 6) * secondGapY;
      drawCoin(x, y, 255 * secondProgress, 0.4 + 0.6 * secondProgress);
    }
      // ===== RIGHT PAGE: WORKED TIME TEXT =====
      p.noStroke();
      p.fill(35);
      p.textAlign(p.CENTER, p.CENTER);

      p.textSize(58);
      p.text(workedHours + " H", 560, 320);

      p.textSize(44);
      p.text((workedMinutes % 60) + " M", 560, 410);

      p.textSize(44);
      p.text((workedSeconds % 60) + " S", 560, 500);
  };

  p.windowResized = function () { p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE); };
});
