/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} x
 * @param {number} y
 */
export default function windowToCanvas(canvas, x, y) {
  const { left, top, width, height } = canvas.getBoundingClientRect();

  // x - left 即指针在 canvas 中的 x 轴坐标
  // y - top  即指针在 canvas 中的 y 轴坐标

  // 考虑如下情况
  // 画布为 300*300 大小
  // css 设置为 600*600 大小
  // 如果不做单位转换, 则计算出的坐标值的最大值为 x:600 y:600 比画布的 300*300 要大
  // 我们的坐标基准应该相对于画布大小, 而不是绘制的实际大小

  // 实际绘制偏移 * 画布大小 / 实际绘制宽度 (单位绘制宽度对应多少单位画布大小)
  // 绘制宽度小于画布大小, 输出 nx (n>1) n 为比例 x 为绘制单位
  // 绘制宽度大于画布大小, 输出 nx (0<n<1) n 为比例 x 为绘制单位

  return {
    x: (x - left) * (canvas.width / width),
    y: (y - top) * (canvas.height / height),
  };
}
