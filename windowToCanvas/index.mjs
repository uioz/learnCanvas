import windowToCanvas from "./windowToCanvas.mjs";

const canvas = document.getElementById("canvas");

canvas.addEventListener("mousemove", (event) => {

  // clientX 指针相对于屏幕左上角的 x 轴坐标
  // clientY 指针相对于屏幕左上角的 y 轴坐标

  // 我们需要获取在画布元素内相对于左上角的 x y 坐标
  // 所以我们需要减去画布元素相对于屏幕左上角的偏移

  const local = windowToCanvas(canvas, event.clientX, event.clientY);
  console.log(`x ${local.x} y ${local.y}`);
});
