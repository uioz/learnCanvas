/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param color
 * @param stepx
 * @param stepy
 */
function drawGrid(context, color, stepx, stepy) {
  context.save();

  context.strokeStyle = color;
  context.lineWidth = 0.5;
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  context.beginPath();

  for (let i = 0; i < context.canvas.height; i += stepy) {
    context.moveTo(0, i);
    context.lineTo(context.canvas.width, i);
  }

  for (let i = 0; i < context.canvas.width; i += stepx) {
    context.moveTo(i, 0);
    context.lineTo(i, context.canvas.height);
  }

  context.stroke();
  context.restore();
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} x 鼠标在canvas上移动的 x 坐标
 * @param {number} y 鼠标在canvas上移动的 y 坐标
 */
function windowToCanvas(context, x, y) {
  const canvas = context.canvas;
  const canvasRect = canvas.getBoundingClientRect();

  return {
    // canvas.width / canvasRect.width 是画布的缩放比例
    x: x - canvasRect.left * (canvas.width / canvasRect.width),
    y: y - canvasRect.top * (canvas.height / canvasRect.height),
  };
}
/**
 *
 * @param {CanvasRenderingContext2D} context
 */
function saveDrawingSurface(context) {
  return context.getImageData(
    0,
    0,
    context.canvas.width,
    context.canvas.height
  );
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param imageData
 */
function restoreDrawingSurface(context, imageData) {
  context.putImageData(imageData, 0, 0);
}

function updateRubberBandRectangle(context, mouseDown, location) {
  const rubberbandRect = {
    width: Math.abs(location.x - mouseDown.x),
    height: Math.abs(location.y - mouseDown.y),
  };

  if (location.x > mouseDown.x) {
    rubberbandRect.left = mouseDown.x;
  } else {
    rubberbandRect.left = location.x;
  }

  if (location.y > mouseDown.y) {
    rubberbandRect.top = mouseDown.y;
  } else {
    rubberbandRect.top = location.y;
  }

  return rubberbandRect;
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param location
 */
function drawRubberbandShape(context, mouseDown, location) {
  context.beginPath();
  context.moveTo(mouseDown.x, mouseDown.y);
  context.lineTo(location.x, location.y);
  context.stroke();
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param location
 */
function updateRubberband(context, mouseDown, location) {
  const rect = updateRubberBandRectangle(context, mouseDown, location);
  drawRubberbandShape(context, mouseDown, location);
  return rect;
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param x
 */
function drawVerticalLine(context, x) {
  context.beginPath();
  context.moveTo(x + 0.5, 0);
  context.lineTo(x + 0.5, context.canvas.height);
  context.stroke();
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param y
 */
function drawHorizontalLine(context, y) {
  context.beginPath();
  context.moveTo(0, y + 0.5);
  context.lineTo(context.canvas.width, y + 0.5);
  context.stroke();
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param x
 * @param y
 */
function drawGuidewires(context, x, y) {
  context.save();
  context.strokeStyle = "rgba(0,0,230,0.4)";
  context.lineWidth = 0.5;
  drawVerticalLine(context, x);
  drawHorizontalLine(context, y);
  context.restore();
}

{
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  // 清空按钮
  const eraseButton = document.getElementById("eraseButton");
  // 线条选择器
  const strokeSelect = document.getElementById("strokeStyleSelect");
  // 是否开启辅助线
  /** @type {HTMLInputElement} */
  const guideWireCheckbox = document.getElementById("guidewireCheckbox");

  let drawingSurfaceImageData;
  let mouseDown = {};
  let dragging = false;
  let rubberbandRect = {};
  let guideWires = guideWireCheckbox.value;

  drawGrid(context, "light");

  canvas.addEventListener("mousedown", (event) => {
    event.preventDefault();
    mouseDown = windowToCanvas(context, event.clientX, event.clientY);
    drawingSurfaceImageData = saveDrawingSurface(context);
    dragging = true;
  });

  canvas.addEventListener("mousemove", (event) => {
    if (dragging) {
      event.preventDefault();
      const location = windowToCanvas(context, event.clientX, event.clientY);
      restoreDrawingSurface(context, drawingSurfaceImageData);
      rubberbandRect = updateRubberband(context, mouseDown, location);

      if (guideWires) {
        drawGuidewires(context, location.x, location.y);
      }
    }
  });

  canvas.addEventListener("mouseup", (event) => {
    const location = windowToCanvas(context, event.clientX, event.clientY);

    restoreDrawingSurface(context, drawingSurfaceImageData);
    updateRubberband(context, mouseDown, location);
    dragging = false;
  });

  guideWireCheckbox.addEventListener(
    "change",
    ({ currentTarget: { checked } }) => {
      guideWires = checked;
    }
  );

  strokeSelect.addEventListener("change", ({ currentTarget: { value } }) => {
    context.strokeStyle = value;
  });

  context.strokeStyle = strokeStyleSelect.value;
  drawGrid(context, "lightgray", 10, 10);
}
