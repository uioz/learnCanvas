{
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");

  const context = canvas.getContext("2d");

  function drawRect() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 10;
    context.strokeStyle = "#f00";
    // 居中显示一个一半大小的矩形
    context.strokeRect(
      canvas.width / 4,
      canvas.height / 4,
      canvas.width / 2,
      canvas.height / 2
    );
  }

  function drawShadow(option) {
    if (option.hasOwnProperty("shadowOffsetX")) {
      context.shadowOffsetX = option.shadowOffsetX;
    }
    if (option.hasOwnProperty("shadowOffsetY")) {
      context.shadowOffsetY = option.shadowOffsetY;
    }
    if (option.hasOwnProperty("shadowBlur")) {
      context.shadowBlur = option.shadowBlur;
    }
    if (option.hasOwnProperty("shadowColor")) {
      context.shadowColor = option.shadowColor;
    }
  }

  const radios = {
    shadowOffsetX: document.getElementById("shadowOffsetX"),
    shadowOffsetY: document.getElementById("shadowOffsetY"),
    shadowBlur: document.getElementById("shadowBlur"),
    shadowColor: document.getElementById("shadowColor"),
  };

  for (const [radioId, radioElem] of Object.entries(radios)) {
    radioElem.addEventListener("change", function () {
      drawShadow({
        [radioId]: this.value,
      });
      drawRect();
    });
  }

  context.shadowColor = "rgba(0,0,0,.2)";
  drawRect();
}
