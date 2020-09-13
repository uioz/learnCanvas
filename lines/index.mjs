{
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");

  const context = canvas.getContext("2d");

  context.lineWidth = 1;

  // context.beginPath();

  context.moveTo(50, 10);
  context.lineTo(450, 10);
  context.stroke();

  context.beginPath();
  context.moveTo(50.5, 50.5);
  context.lineTo(450.5, 50.5);
  context.stroke();
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param color
 * @param stepx
 * @param stepy
 */
function drawGrid(context, color, stepx, stepy) {
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = 0.5;

  for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
    context.moveTo(i, 0);
    context.lineTo(i, context.canvas.height);
  }

  for (var i = stepy + 0.5; i < context.canvas.width; i += stepy) {
    context.moveTo(0, i);
    context.lineTo(context.canvas.width, i);
  }

  context.stroke();
}

{
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("grid");
  const context = canvas.getContext("2d");

  drawGrid(context, "lightgray", 10, 10);
}

{
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("axis");
  const context = canvas.getContext("2d");

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {object} origin
   * @param {number} [origin.x]
   * @param {number} [origin.y]
   * @param {number} right
   */
  function drawHorizontalAxis(context, origin, right) {
    context.beginPath();
    context.moveTo(origin.x, origin.y);
    context.lineTo(right, origin.y);
    context.stroke();
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {object} origin
   * @param {number} origin.x
   * @param {number} origin.y
   * @param {number} top
   */
  function drawVerticalAxis(context, origin, top) {
    context.beginPath();
    context.moveTo(origin.x, origin.y);
    context.lineTo(origin.x, top);
    context.stroke();
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {number} ticksOnHorizontal
   * @param {number} tickWidth
   * @param {number} tickSpacingOnHorizontal
   */
  function drawHorizontalTicks(
    context,
    ticksOnHorizontal,
    tickWidth,
    tickSpacingOnHorizontal,
    origin
  ) {
    context.beginPath();

    let deltaY;

    for (let i = 1; i < ticksOnHorizontal; i++) {
      if (i % 5 == 0) {
        deltaY = tickWidth;
      } else {
        deltaY = tickWidth / 2;
      }

      // deltaY 指的是 (0,y) 的 y 向上和向下延申的长度
      // 每到 5 的整数被时候纵向tick的高度就是默认高度反之是一半大小
      context.moveTo(origin.x + i * tickSpacingOnHorizontal, origin.y - deltaY);
      context.lineTo(origin.x + i * tickSpacingOnHorizontal, origin.y + deltaY);
    }

    context.stroke();
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {number} ticksOnVertical
   * @param {number} tickWidth
   * @param {number} tickSpacingOnVertical
   */
  function drawVerticalTicks(
    context,
    ticksOnVertical,
    tickWidth,
    tickSpacingOnVertical,
    origin
  ) {
    context.beginPath();

    let deltaX;

    for (let i = 1; i < ticksOnVertical; i++) {
      if (i % 5 == 0) {
        deltaX = tickWidth;
      } else {
        deltaX = tickWidth / 2;
      }

      // 注意这里的 origin.y - i * tickSpacingOnVertical 是减法
      // 因为坐标轴的原点不是常见的在中心而是在左上角(0,0)的位置
      // 我们绘制相对的原点坐标为(40,360)
      // 要向上话则需要减去间隔而不是加上间隔
      context.moveTo(origin.x - deltaX, origin.y - i * tickSpacingOnVertical);
      context.lineTo(origin.x + deltaX, origin.y - i * tickSpacingOnVertical);
    }

    context.stroke();
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  function init(context) {
    const AXIS_MARGIN = 40;
    const AXIS_ORIGIN = { x: AXIS_MARGIN, y: canvas.height - AXIS_MARGIN };
    const AXIS_TOP = AXIS_MARGIN;
    const AXIS_RIGHT = canvas.width - AXIS_MARGIN;

    const HORIZONTAL_TICK_SPACING = 10;
    const VERTICAL_TICK_SPACING = 10;

    const AXIS_WIDTH = AXIS_RIGHT - AXIS_ORIGIN.x;
    const AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP;

    const NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING;
    const NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING;

    const TICK_WIDTH = 10;
    const TICKS_LINEWIDTH = 0.5;
    const TICKS_COLOR = "navy";

    const AXIS_LINEWIDTH = 1.0;
    const AXIS_COLOR = "blue";

    context.save();
    drawGrid(context, "lightgray", 10, 10);
    context.restore();

    context.save();
    context.strokeStyle = AXIS_COLOR;
    context.lineWidth = AXIS_LINEWIDTH;

    drawHorizontalAxis(context, AXIS_ORIGIN, AXIS_RIGHT);
    drawVerticalAxis(context, AXIS_ORIGIN, AXIS_TOP);
    context.restore();

    context.save();

    context.lineWidth = 0.5;
    context.lineWidth = TICKS_LINEWIDTH;
    context.strokeStyle = TICKS_COLOR;

    drawVerticalTicks(
      context,
      NUM_VERTICAL_TICKS,
      TICK_WIDTH,
      VERTICAL_TICK_SPACING,
      AXIS_ORIGIN
    );

    drawHorizontalTicks(
      context,
      NUM_HORIZONTAL_TICKS,
      TICK_WIDTH,
      HORIZONTAL_TICK_SPACING,
      AXIS_ORIGIN
    );

    context.restore();
  }

  init(context);
}
