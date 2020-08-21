/**
 *
 * @param {CanvasRenderingContext2D} context
 */
function main(context) {
  const canvas = context.canvas;
  const FONT_HEIGHT = 15;
  const MARGIN = 35;
  // 分针
  const HAND_TRUNCATION = canvas.width / 25;
  // 时针
  const HOUR_HAND_TRUNCATION = canvas.width / 10;
  const NUMERAL_SPACING = 20;
  // 半径等于画布宽度的一半减去边距
  const RADIUS = canvas.width / 2 - MARGIN;
  // 指针半径
  const HAND_RADIUS = RADIUS + NUMERAL_SPACING;

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  function drawCircle(context) {

    context.beginPath();
    context.arc(
      canvas.width / 2, // 原点坐标
      canvas.height / 2, // 原点坐标
      RADIUS, // 半径
      0,// 起始角度(弧度值)
      Math.PI * 2, // 终止角度(弧度值)
      true // 逆时针绘制
    );

    context.stroke();

  }

  /**
   * 
   * @param {CanvasRenderingContext2D} context 
   */
  function drawNumerals(context) {
  
    

  }
}

main(document.getElementById("canvas").getContext("2d"));
