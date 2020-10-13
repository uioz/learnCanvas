# 知识点

- 当前路径与子路径

在画布建立后存在一个抽象的路径画布被称为 `当前路径` 在画布上绘制的任意含有路径的内容(例如: 线段)被称为 `子路径` 都会被包含在这个路径内, 当调用 `context.stroke()` 以及其他方法的时候实际上会绘制当前路径上的所有内容.

举个例子:
```
conte.moveTo(x0,y0);
context.lineTo(x1,y1);
context.stroke();

context.lineTo(x2,y2);
context.stroke();

context.lineTo(x3,y3);
context.stroke();
```

在这个例子中的 `context.lineTo(x1,y1)` 实际上被绘制了三次, 因为 `context.stroke()` 重新绘制了当前路径三次.

可以使用 `context.beginPath()` 来创建一个新的当前路径, 这个操作会销毁旧的路径, 如果旧的路径中没有调用 `context.stroke()` 或者其他类似的方法, 则即使在新的路径中调用 `context.stroke()` 方法旧的路径中的内容也不会被绘制到画布上.

- 通过使用 arc 方法向当前路径中添加子路径的时候, 新的 arc 的起点与上一个 arc 终点相连.
- 填充的非零环绕规则 即 "路径内一点沿直线向外延路径外延申, 遇到顺时针 -1 逆时针 + 1, 如果结果是 0 则该起点所在的区域剪切(不填充)如果大于零则填充.

# 路径的自动连接

```javascript
  function addTrianglePath(context) {
    context.moveTo(400, 200);
    context.lineTo(250, 115);
    context.lineTo(200, 200);
    context.closePath();
  }
```
上面的例子中, 实际只绘制了两条线, 但是路径会自动闭合, 导致绘制出一个三角形.