{
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  context.lineJoin = "round";
  context.lineWidth = 30;

  context.font = "24px";
  context.fillText("点击任意位置清空图像", 175, 40);

  context.strokeRect(75, 100, 200, 200);
  context.fillRect(325, 100, 200, 200);

  canvas.addEventListener("click", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  });
}

{
  /** @type {HTMLCanvasElement} */
  const canvasWithColor = document.getElementById("canvasWithColor");
  const context = canvasWithColor.getContext("2d");

  context.lineJoin = "round";
  context.lineWidth = 30;

  context.font = "24px";
  context.fillText("点击任意位置清空图像", 250, 200);

  // notice: 注意差别
  context.strokeStyle = "aqua";
  context.fillStyle = "rgba(0,0,255,.5)";

  context.strokeRect(75, 100, 200, 200);
  context.fillRect(325, 100, 200, 200);

  canvasWithColor.addEventListener("click", () =>
    context.clearRect(0, 0, canvasWithColor.width, canvasWithColor.height)
  );
}

