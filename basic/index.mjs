function getCanvas2DContextById(id) {
  return document.getElementById(id).getContext("2d");
}

/**
 *
 * @param {CanvasRenderingContext2D} contextWith2d
 */
function process(contextWith2d) {
  contextWith2d.font = "10px Arial";
  contextWith2d.fillStyle = "cornflowerbule";
  contextWith2d.strokeStyle = "blue";
}

/**
 *
 * @param {CanvasRenderingContext2D} contextWith2d
 */
function draw(contextWith2d) {
  const canvas = contextWith2d.canvas;
  const halfCanvasWidth = canvas.width / 2 - 150;
  const halfCanvasHeight = canvas.height / 2 - 15;

  contextWith2d.fillText("hello canvas", halfCanvasWidth, halfCanvasHeight);
  contextWith2d.strokeText("hello canvas", halfCanvasWidth, halfCanvasHeight);
}

function main() {
  const context = getCanvas2DContextById("canvas");
  process(context);
  draw(context);
}

main();
