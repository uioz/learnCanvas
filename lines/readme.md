# 线段

线段也受到当前路径影响.

```javascript
// 线段1
context.moveTo(50, 10);
context.lineTo(450, 10);
context.stroke();
// 线段二
context.moveTo(50.5, 50.5);
context.lineTo(450.5, 50.5);
context.stroke();
```

线段1实际上被绘制了两次, 如果给线段一个含有透明的颜色你可以看到线段1会被线段2颜色更深一些, 因为线段1实际上在每次调用 `stroke` 的过程中都被绘制了一次.

因为线段1和线段2同在一个路径中.

```javascript
// 线段1
context.moveTo(50, 10);
context.lineTo(450, 10);
// 线段二
context.moveTo(50.5, 50.5);
context.lineTo(450.5, 50.5);
context.stroke();
```

只调用一次 `stroke` 方法不会绘制两次线段1. 或者干脆些调用 `beginPath` 来创建新的子路径.

```javascript
context.moveTo(50, 10);
context.lineTo(450, 10);
context.stroke();

context.beginPath();
context.moveTo(50.5, 50.5);
context.lineTo(450.5, 50.5);
context.stroke();
```

# 线段与像素边界

如果你在某个2个像素的边界处绘制一条1像素宽的线段, 则该线段实际上会占据两个像素.

而浏览器则会降低颜色的明度(可能是采用抗锯齿所导致的)来尽可能的在视觉上和一像素的看起来一样.

