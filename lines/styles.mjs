{
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  context.lineWidth = 10;
  context.strokeStyle = "black";

  // lineCap butt
  context.moveTo(40, 40);
  context.lineTo(460, 40);
  context.stroke();

  // lineCap round
  context.beginPath();
  context.moveTo(40, 40 + 50);
  context.lineCap = "round";
  context.lineTo(460, 40 + 50);
  context.stroke();
  context.closePath();

  // lineCap square
  context.beginPath();
  context.moveTo(40, 40 + 50 * 2);
  context.lineCap = "square";
  context.lineTo(460, 40 + 50 * 2);
  context.stroke();
  context.closePath();
}
