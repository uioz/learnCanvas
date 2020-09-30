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

// 下面这个例子允许绘制虚线的方法可以配合 moveTo 使用
// 就像先使用 moveTo 在使用 lineTo 那样
// 先使用 moveTo 在使用 drawDashedLine

{
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("example2");
  const context = canvas.getContext("2d");

  const moveToFun = CanvasRenderingContext2D.prototype.moveTo;
  CanvasRenderingContext2D.prototype.lastMoveToLocation = {};

  CanvasRenderingContext2D.prototype.moveTo = function (x, y) {
    moveToFun.call(context, x, y);
    this.lastMoveToLocation.x = x;
    this.lastMoveToLocation.y = y;
  };

  CanvasRenderingContext2D.prototype.dashedLineTo = function drawDashedLine(
    x2,
    y2,
    dashLength
  ) {
    dashLength = dashLength === undefined ? 5 : dashLength;

    const startX = this.lastMoveToLocation.x;
    const startY = this.lastMoveToLocation.y;
    const deltaX = x2 - startX;
    const deltaY = y2 - startY;

    // 勾股定理: 斜边的长度等于两个直角边的平方在开方
    const numberOfDashes = Math.floor(
      Math.sqrt(deltaX ** 2 + deltaY ** 2) / dashLength
    );

    for (let index = 0; index < numberOfDashes; index++) {
      if (index % 2 == 0) {
        this.moveTo(
          startX + (deltaX / numberOfDashes) * index,
          startY + (deltaY / numberOfDashes) * index
        );
      } else {
        this.lineTo(
          startX + (deltaX / numberOfDashes) * index,
          startY + (deltaY / numberOfDashes) * index
        );
      }
    }
    // 注意: 还要移动指针到指定位置
    this.moveTo(x2, y2);
  };

  context.lineWidth = 3;
  context.strokeStyle = "blue";

  context.moveTo(20, 20);
  context.dashedLineTo(context.canvas.width - 20, 20);
  context.dashedLineTo(context.canvas.width - 20, context.canvas.height - 20);
  context.dashedLineTo(20, context.canvas.height - 20);
  context.dashedLineTo(20, 20);
  context.dashedLineTo(context.canvas.width - 20, context.canvas.height - 20);

  context.stroke();
}
