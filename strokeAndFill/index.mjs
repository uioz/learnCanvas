{
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");

  const context = canvas.getContext("2d");

  // 绘制用属性
  context.font = "48pt Helvetica";
  context.strokeStyle = "blue";
  context.fillStyle = "red";
  context.lineWidth = "2";

  // 文本
  context.strokeText("Stroke", 60, 100);
  context.fillText("Fill", 440, 100);
  context.strokeText("Stroke & Fill", 650, 100);
  context.fillText("Stroke & Fill", 650, 100);

  // 矩形
  context.lineWidth = 5;

  // 矩形 + 描边
  context.beginPath();
  context.rect(80, 150, 150, 100);
  context.stroke();

  // 矩形 + 填充
  context.beginPath();
  context.rect(400, 150, 150, 100);
  context.fill();

  // 矩形 + 描边 + 加填充
  context.beginPath();
  context.rect(750, 150, 150, 100);
  context.stroke();
  context.fill();

  // 开放弧 + 描边
  context.beginPath();
  /**
   * 半径 60
   * 起始角度 0 (弧度)
   * 结束角度 3/2 Π (弧度) = 315°
   */
  context.arc(150, 370, 60, 0, (Math.PI * 3) / 2);
  context.stroke();

  // 开放弧 + 填充
  context.beginPath();
  context.arc(475, 370, 60, 0, (Math.PI * 3) / 2);
  context.fill();

  // 开放弧 + 描边 + 填充
  context.beginPath();
  context.arc(820, 370, 60, 0, (Math.PI * 3) / 2);
  context.stroke();
  context.fill();

  // 封闭弧
  context.beginPath();
  context.arc(150, 550, 60, 0, (Math.PI * 3) / 2);
  context.closePath();
  context.stroke();

  context.beginPath();
  context.arc(475, 550, 60, 0, (Math.PI * 3) / 2);
  context.closePath();
  context.fill();

  context.beginPath();
  context.arc(820, 550, 60, 0, (Math.PI * 3) / 2);
  context.closePath();
  context.stroke();
  context.fill();
}
