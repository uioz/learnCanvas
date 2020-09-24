/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param  {number}  x1
 * @param  {number}  y1
 * @param  {number}  x2
 * @param  {number}  y2
 * @param  {number} dashLength
 */
function drawDashedLine(context, x1, y1, x2, y2, dashLength) {
  dashLength = dashLength === undefined ? 5 : dashLength;

  const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  // 勾股定理: 斜边的长度等于两个直角边的平方在开方
  const numberOfDashes = Math.floor(
    Math.sqrt(deltaX ** 2 + deltaY ** 2) / dashLength
  );

  for (let index = 0; index < numberOfDashes; index++) {
    if (index % 2 == 0) {
      context.moveTo(
        x1 + (deltaX / numberOfDashes) * index,
        y1 + (deltaY / numberOfDashes) * index
      );
    } else {
      context.lineTo(
        x1 + (deltaX / numberOfDashes) * index,
        y1 + (deltaY / numberOfDashes) * index
      );
    }
    context.stroke();
  }
}

{
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");

  const context = canvas.getContext("2d");

  context.lineWidth = 3;
  context.strokeStyle = "blue";

  drawDashedLine(context, 20, 20, context.canvas.width - 20, 20);
  drawDashedLine(
    context,
    context.canvas.width - 20,
    20,
    context.canvas.width - 20,
    context.canvas.height - 20,
    10
  );
  drawDashedLine(
    context,
    context.canvas.width - 20,
    context.canvas.height - 20,
    20,
    context.canvas.height - 20,
    15
  );
  drawDashedLine(context, 20, context.canvas.height - 20, 20, 20, 2);
}
