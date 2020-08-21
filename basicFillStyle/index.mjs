{
  /** @type {HTMLCanvasElement} */
  const canvasWithLinearGradient = document.getElementById(
    "canvasWithLinearGradient"
  );
  const context = canvasWithLinearGradient.getContext("2d");
  // 渐变需要两个坐标点
  const gradient = context.createLinearGradient(
    0,
    0,
    canvasWithLinearGradient.width,
    0
  );

  gradient.addColorStop(0, "blue");
  gradient.addColorStop(0.25, "white");
  gradient.addColorStop(0.5, "purple");
  gradient.addColorStop(0.75, "red");
  gradient.addColorStop(1, "yellow");

  context.fillStyle = gradient;
  context.rect(
    0,
    0,
    canvasWithLinearGradient.width,
    canvasWithLinearGradient.height
  );
  context.fill();
}

{
  /** @type {HTMLCanvasElement} */
  const canvasWithRadialGradient = document.getElementById(
    "canvasWithRadialGradient"
  );

  const context = canvasWithRadialGradient.getContext("2d");
  const gradient = context.createRadialGradient(
    canvasWithRadialGradient.width / 2,
    canvasWithRadialGradient.height,
    10,
    canvasWithRadialGradient.width / 2,
    0,
    100
  );

  gradient.addColorStop(0, "blue");
  gradient.addColorStop(0.25, "white");
  gradient.addColorStop(0.5, "purple");
  gradient.addColorStop(0.75, "red");
  gradient.addColorStop(1, "yellow");

  context.fillStyle = gradient;
  context.fillRect(
    0,
    0,
    canvasWithRadialGradient.width,
    canvasWithRadialGradient.height
  );
}


{
  
}