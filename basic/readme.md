# 知识点

1. canvas 通过 css 和 HTML属性设置宽高的异同
  - HTML属性设置的是 canvas 的绘制区域大小
  - css 在画布大小无法满足 css 中指定的大小的时候对其进行缩放
2. canvas 所对应的 JavaScript [接口](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)提供的能力
  - 属性
    - width
    - height
  - 方法
    - captureStream()
    - getContext()
    - toDataURL()
    - toBlob()
    - transferControlToOffscreen() 
  - 事件
    - webglcontextcreationerror
    - webglcontextlost
    - webglcontextrestored