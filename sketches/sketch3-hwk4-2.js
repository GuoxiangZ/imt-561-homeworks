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


  };

  p.windowResized = function () { p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE); };
});
