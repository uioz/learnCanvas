{
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");
  /** @type {HTMLInputElement} */
  const directionCheckbox = document.getElementById("directionCheckbox");
  /** @type {HTMLInputElement} */
  const annotationCheckbox = document.getElementById("annotationCheckbox");
  const context = canvas.getContext("2d");

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param color
   * @param stepx
   * @param stepy
   */
  function drawGrid(context, color = "#000", stepx = 10, stepy = 10) {
    context.save();

    const canvasWidth = context.canvas.width,
      canvasHeight = context.canvas.height;

    context.strokeStyle = color;
    context.lineWidth = 0.5;

    // 绘制白色背景
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    let stepxPlusLineWidth = stepx + context.lineWidth;
    let stepxGap = 0;
    while ((stepxGap += stepxPlusLineWidth) < canvasWidth) {
      context.beginPath();
      context.moveTo(stepxGap, 0);
      context.lineTo(stepxGap, canvasHeight);
      context.stroke();
    }

    let stepyPlusLineWidth = stepy + context.lineWidth;
    let stepyGap = 0;
    while ((stepyGap += stepyPlusLineWidth) < canvasHeight) {
      context.beginPath();
      context.moveTo(0, stepyGap);
      context.lineTo(canvasWidth, stepyGap);
      context.stroke();
    }

    context.restore();
  }

  /**
   * @param {CanvasRenderingContext2D} context
   * @param {boolean} sameDirection
   */
  function drawTwoArcs(context, sameDirection) {
    context.save();

    context.shadowColor = "rgba(0, 0, 0, 0.8)";
    context.shadowOffsetX = 12;
    context.shadowOffsetY = 12;
    context.shadowBlur = 15;

    context.beginPath();
    // 外圆逆时针
    context.arc(300, 170, 150, 0, Math.PI * 2, false);
    context.arc(300, 170, 100, 0, Math.PI * 2, !sameDirection);

    context.fill();
    context.strokeStyle = "#000";
    context.stroke();
    context.restore();
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  function drawText(context) {
    context.save();

    context.font = "18px Arial";
    context.fillStyle = "rgb(0,0,200)";
    context.fillText("两个圆， 同一个路径", 10, 30);

    context.font = "16px Lucida Sans";
    context.fillStyle = "navy";
    context.fillText(
      "context.arc(300, 200, 150, 0, Math.PI*2, false)",
      10,
      360
    );
    context.fillText(
      "context.arc(300, 200, 100, 0, Math.PI*2, !sameDirection)",
      10,
      380
    );
    context.restore();
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param sameDirection
   */
  function drawInnerCircleAnnotations(context, sameDirection) {
    context.save();

    context.beginPath();
    context.moveTo(300, 175);
    context.lineTo(100, 250);
    context.stroke();

    context.beginPath();
    context.arc(100, 250, 3, 0, Math.PI * 2, false);
    context.fillStyle = "navy";
    context.fill();

    context.font = "16px Lucida Sans";
    context.fillText("+1", 125, 225);
    context.fillText(sameDirection ? "+1" : "-1", 215, 185);
    context.fillText(sameDirection ? "2" : "0", 75, 255);
    context.restore();
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param sameDirection
   */
  function drawOuterCircleAnnotations(context, sameDirection) {
    context.save();
    context.beginPath();
    context.moveTo(410, 210);
    context.lineTo(500, 250);
    context.stroke();

    context.beginPath();
    context.arc(500, 250, 3, 0, Math.PI * 2, false);
    context.fillStyle = "navy";
    context.fill();

    context.font = "16px Lucida Sans";
    context.fillText(sameDirection ? "+1" : "-1", 455, 255);
    context.fillText(sameDirection ? "1" : "-1", 515, 255);
    context.restore();
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {boolean} sameDirection
   */
  function drawArcAnnotations(context, sameDirection) {
    context.save();
    context.font = "16px Lucida Sans";
    context.fillStyle = "blue";
    context.fillText("CW", 345, 145);
    context.fillText(sameDirection ? "CW" : "CWW", 425, 75);
    context.restore();
  }

  function drawAnnotations(context, sameDirection) {
    context.save();
    context.strokeStyle = "blue";
    drawInnerCircleAnnotations(context, sameDirection);
    drawOuterCircleAnnotations(context, sameDirection);
    drawArcAnnotations(context, sameDirection);
    context.restore();
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  function draw(context, sameDirection, annotationChecked) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawGrid(context, "lightgray");
    drawTwoArcs(context, sameDirection);
    drawText(context);

    if (annotationChecked) {
      drawAnnotations(context, sameDirection);
    }
  }

  context.fillStyle = "rgba(100, 140, 230, 0.5)";
  context.strokeStyle = context.fillStyle; //'rgba(20, 60, 150, 0.5)';

  draw(context, directionCheckbox.checked);

  annotationCheckbox.addEventListener("click", () => {
    draw(context, directionCheckbox.checked, annotationCheckbox.checked);
  });

  directionCheckbox.addEventListener("click", () => {
    draw(context, directionCheckbox.checked, annotationCheckbox.checked);
  });
}

{
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("cutouts");
  const context = canvas.getContext("2d");

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  function drawGrid(context, color, stepX, stepY) {
    context.save();

    context.strokeStyle = color;
    context.fillStyle = "#fff";
    context.lineWidth = 0.5;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    for (
      let index = stepX + 0.5;
      index < context.canvas.width;
      index += stepX
    ) {
      context.beginPath();
      context.moveTo(index, 0);
      context.lineTo(index, context.canvas.height);
      context.stroke();
    }

    for (
      let index = stepY + 0.5;
      index < context.canvas.height;
      index += stepY
    ) {
      context.beginPath();
      context.moveTo(0, index);
      context.lineTo(context.canvas.width, index);
      context.stroke();
    }

    context.restore();
  }

  function addOuterRectanglePath(context) {
    context.rect(110, 25, 370, 335);
  }

  function addCirclePath(context) {
    context.arc(300, 300, 40, 0, Math.PI * 2, true);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {boolean} direction
   */
  function rect(context, x = 0, y = 0, w = 0, h = 0, ccw = false) {

    if (ccw) {
      context.moveTo(x, y);
      context.lineTo(x, y, h);
      context.lineTo(x + w, y + h);
      context.lineTo(x + w, y);
    } else {
      context.moveTo(x, y);
      context.lineTo(x + w, y);
      context.lineTo(x + w, y + h);
      context.lineTo(x, y + h);
    }
    context.closePath();
  }

  function addRectanglePath(context) {
    rect(context, 310, 55, 75, 35, true);
  }

  function addTrianglePath(context) {
    context.moveTo(400, 200);
    context.lineTo(250, 115);
    context.lineTo(200, 200);
    context.closePath();
  }

  function drawCutOuts(context) {
    context.beginPath();
    addOuterRectanglePath(context); // 顺时针

    addCirclePath(context); // 逆时针
    addRectanglePath(context); // 逆时针
    addTrianglePath(context); // 逆时针

    context.fill();
  }

  function strokeCutoutShapes(context) {
    context.save();
    context.strokeStyle = 'rgba(0,0,0,.0.7)';
    
    context.beginPath();
    addOuterRectanglePath(context); // cw
    context.stroke();

    context.beginPath();
    addCirclePath(context);
    addRectanglePath(context);
    addTrianglePath(context);
    context.stroke();

    contexte.restore();
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  function draw(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    drawGrid(context, "lightgray", 10, 10);

    context.shadowColor = "rgba(200,200,0,0.5)";
    context.shadowOffsetX = context.shadowOffsetY = 12;
    context.shadowBlur = 15;

    drawCutOuts(context);
    strokeCutoutShapes(context);
    
  }

  context.fillStyle = "goldenrod";
  draw(context);
}
