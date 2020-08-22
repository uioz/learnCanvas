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
  /** @type {HTMLCanvasElement} */
  const canvasWithPattern = document.getElementById("canvasWithPattern");

  const context = canvasWithPattern.getContext("2d");

  const radios = {
    repeat: document.getElementById("repeat"),
    "repeat-x": document.getElementById("repeat-x"),
    "repeat-y": document.getElementById("repeat-y"),
    "no-repeat": document.getElementById("no-repeat"),
  };

  const image = new Image(60, 30);
  image.width = 60;
  image.height = 30;
  image.src = "circle.png";

  function fillCanvasWithPattern(repeatPatternString) {
    context.clearRect(0, 0, canvasWithPattern.width, canvasWithPattern.height);
    
    const pattern = context.createPattern(image, repeatPatternString);

    context.fillStyle = pattern;

    context.fillRect(0, 0, canvasWithPattern.width, canvasWithPattern.height);
  }

  for (const [key, value] of Object.entries(radios)) {
    value.addEventListener("click", () => fillCanvasWithPattern(key));
    value.addEventListener("click", () => {
      for (const [innerKey, innerValue] of Object.entries(radios)) {
        if (innerKey !== key) {
          innerValue.checked = false;
        }
      }
    });
  }

  image.onload = function () {
    fillCanvasWithPattern("repeat");
  };
}
