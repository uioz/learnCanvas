{
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");

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
   *
   * @param {boolean} sameDirection
   */
  function drawTwoArcs(context,sameDirection) {
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
    context.stroke();
    context.restore();
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} context 
   */
  function drawText(context) {
    context.save();

    context.font = '18px Arial';
    context.fillStyle = 'rgb(0,0,200)'
    context.fillText('两个圆， 同一个路径',10,30);

    context.font = '16px Lucida Sans';
    context.fillStyle = 'navy';
    context.fillText('context.arc(300, 200, 150, 0, Math.PI*2, false)', 10, 360);
    context.fillText('context.arc(300, 200, 100, 0, Math.PI*2, !sameDirection)', 10, 380);
    context.restore();

  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  function draw(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawGrid(context, "lightgray");
    drawTwoArcs(context,false);
    drawText(context);
  }

  context.fillStyle = "rgba(100, 140, 230, 0.5)";
  context.strokeStyle = context.fillStyle; //'rgba(20, 60, 150, 0.5)';

  draw(context);
}
