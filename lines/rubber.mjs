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
    y: y - canvasRect.top * (canvas.height / canvasRect.height)
  }

}
/**
 * 
 * @param {CanvasRenderingContext2D} context 
 */
function saveDrawingSurface(context) {

  return context.getImageData(0, 0, context.canvas.width, context.canvas.height);

}

function restoreDrawingSurface() {

}

function updateRubberBandRectangle() {

}


{

  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  // 清空按钮
  const eraseButton = document.getElementById('eraseButton');
  // 线条选择器
  const strokeSelect = document.getElementById('strokeStyleSelect');
  // 是否开启辅助线
  /** @type {HTMLInputElement} */
  const guideWireCheckbox = document.getElementById('guideWireCheckbox');

  const drawingSurfaceImageData;
  const mouseDown = {};
  const rubberbandRect = {};
  const dragging = false;
  const guideWires = guideWireCheckbox.value;

  canvas.addEventListener('mousedown', (event) => {


  });

  canvas.addEventListener('mousemove', (event) => {

  })

  canvas.addEventListener("mouseup", (event) => {



  })

}