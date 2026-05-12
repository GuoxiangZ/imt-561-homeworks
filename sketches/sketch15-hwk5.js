// Instance-mode sketch for tab 15
registerSketch('sk15', function (p) {
  const CANVAS_SIZE = 800;

  p.setup = function () {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  };

  p.draw = function () {
    p.background(248, 246, 239);

    const data = [
      { short: "Finance", color: p.color(220, 140, 40), salaries: [162.5, 189.6, 216.0, 242.5] },
      { short: "HR", color: p.color(45, 135, 60), salaries: [114.8, 134.6, 154.5, 174.3] },
      { short: "Operations", color: p.color(105, 55, 170), salaries: [172.1, 201.5, 228.2, 252.9] },
      { short: "Technology", color: p.color(35, 91, 180), salaries: [188.1, 218.4, 246.4, 268.8] }
    ];

    const edu = ["HS", "BA", "MA", "PhD"];
    const eduAlpha = [35, 90, 150, 255];

    const minSalary = 100;
    const maxSalary = 300;

    const left = 95;
    const right = 760;
    const top = 265;
    const bottom = 620;
    const chartW = right - left;

    function yMap(salary) {
      return p.map(salary, minSalary, maxSalary, bottom, top);
    }

    function moneyLabel(v) {
      return "$" + v.toFixed(1) + "k";
    }

    function withAlpha(c, a) {
      return p.color(p.red(c), p.green(c), p.blue(c), a);
    }

    // Title
    p.noStroke();
    p.fill(20);
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(36);
    p.textStyle(p.BOLD);
    p.text("Does Higher Education Always Pay Off?", p.width / 2, 32);

    p.textStyle(p.NORMAL);
    p.textSize(16);
    p.fill(70);
    p.text(
      "Average annual salary by education level across selected fields",
      p.width / 2,
      88
    );

    // Narrative box
    p.fill(255, 250, 225);
    p.stroke(230, 190, 70);
    p.strokeWeight(1.5);
    p.rect(120, 125, 560, 58, 8);

    p.noStroke();
    p.fill(35);
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(15);
    p.text(
      "Education raises salary in every selected field,\nbut industry differences still shape earning potential.",
      145,
      154
    );

    // Y-axis label
    p.push();
    p.translate(35, 440);
    p.rotate(-p.HALF_PI);
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(50);
    p.textSize(14);
    p.text("Average Annual Salary (USD, thousands)", 0, 0);
    p.pop();

    // Grid + y labels
    for (let s = 100; s <= 300; s += 50) {
      const y = yMap(s);
      p.stroke(220);
      p.strokeWeight(1);
      p.line(left, y, right, y);

      p.noStroke();
      p.fill(80);
      p.textAlign(p.RIGHT, p.CENTER);
      p.textSize(13);
      p.text("$" + s + "k", left - 12, y);
    }

    // Axis
    p.stroke(60);
    p.strokeWeight(1.5);
    p.line(left, top, left, bottom);
    p.line(left, bottom, right, bottom);

    const panelW = chartW / data.length;

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const panelX = left + i * panelW;
      const innerLeft = panelX + 30;
      const innerRight = panelX + panelW - 30;

      if (i > 0) {
        p.stroke(220);
        p.strokeWeight(1);
        p.line(panelX, top - 35, panelX, bottom + 45);
      }

      // Field label
      p.noStroke();
      p.fill(d.color);
      p.textAlign(p.CENTER, p.BOTTOM);
      p.textSize(18);
      p.textStyle(p.BOLD);
      p.text(d.short, panelX + panelW / 2, top - 18);
      p.textStyle(p.NORMAL);

      const pts = [];
      for (let j = 0; j < edu.length; j++) {
        const x = p.map(j, 0, edu.length - 1, innerLeft, innerRight);
        const y = yMap(d.salaries[j]);
        pts.push({ x, y, salary: d.salaries[j], edu: edu[j] });
      }

      // Line
      p.noFill();
      p.stroke(d.color);
      p.strokeWeight(3);
      p.beginShape();
      for (const pt of pts) {
        p.vertex(pt.x, pt.y);
      }
      p.endShape();

      // Nodes + salary labels
      const labelOffsets = [
        { x: -2, y: -14 },
        { x: -10, y: -16 },
        { x: 10, y: -14 },
        { x: 4, y: -16 }
      ];

      for (let j = 0; j < pts.length; j++) {
        const pt = pts[j];
        const offset = labelOffsets[j];

        p.fill(withAlpha(d.color, eduAlpha[j]));
        p.stroke(d.color);
        p.strokeWeight(2.5);
        p.circle(pt.x, pt.y, 15);

        p.noStroke();
        p.fill(35);
        p.textAlign(p.CENTER, p.BOTTOM);
        p.textSize(11);
        p.text(
          moneyLabel(pt.salary),
          pt.x + offset.x,
          pt.y + offset.y
        );
      }

      // X labels
      p.noStroke();
      p.fill(70);
      p.textAlign(p.CENTER, p.TOP);
      p.textSize(11);

      for (let j = 0; j < edu.length; j++) {
        const x = p.map(j, 0, edu.length - 1, innerLeft, innerRight);
        p.text(edu[j], x, bottom + 12);
      }
    }

    // Real data annotations
    p.noStroke();
    p.textSize(12.5);
    p.textAlign(p.LEFT, p.TOP);

    // HR annotation: above the HR line
    p.fill(45, 135, 60);
    p.text(
      "HR grows steadily,\nbut remains lower overall.",
      310,
      370
    );

    // Technology annotation: below the Technology line
    p.fill(35, 91, 180);
    p.text(
      "Technology stays highest\nat every education level.",
      615,
      520
    );

    // Cross-field comparison annotation
    p.fill(70);
    p.text(
      "An HR PhD average is still\nbelow Technology at HS level.",
      345,
      650
    );

    // Legend
    p.fill(255);
    p.stroke(215);
    p.strokeWeight(1);
    p.rect(90, 700, 620, 48, 8);

    p.noStroke();
    p.fill(50);
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(13);
    p.textStyle(p.NORMAL);
    p.text("Education path:", 115, 724);

    const edu2 = ["High School", "Bachelor", "Master", "PhD"]

    for (let i = 0; i < edu2.length; i++) {
      const x = 230 + i * 95;

      p.fill(60);
      p.noStroke();
      p.textAlign(p.LEFT, p.CENTER);
      p.textSize(13);
      p.textStyle(p.NORMAL);
      p.text(edu2[i], x + 14, 724);

      p.fill(p.color(35, 91, 180, eduAlpha[i]));
      p.stroke(35, 91, 180);
      p.strokeWeight(2);
      p.circle(x, 724, 13);
    }

    // Footer
    p.noStroke();
    p.fill(90);
    p.textSize(10.5);
    p.textAlign(p.LEFT, p.BOTTOM);
    p.textStyle(p.NORMAL);
    p.text(
      "Source: Kaggle Job Market Dataset. Values show average annual salary by field and education level, 2022–2024.",
      70,
      780
    );

    // Frame
    p.noFill();
    p.stroke(30);
    p.strokeWeight(1);
    p.rect(0, 0, p.width - 1, p.height - 1);
  };
  p.windowResized = function () { p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE); };
});
