// 多边形
function Shape (strokStyle, fillStyle) {
  this.points = []
  this.vectors = []
  this.strokStyle = strokStyle
  this.fillStyle = fillStyle
  this.vx = velocity_x
  this.vy = velocity_y

  this.isPause = false
}

// 增加点
Shape.prototype.addPoint = function (point) {
  this.points.push(point)
}

// 移动
Shape.prototype.move = function (x, y) {
  if (this.isPause == true) {
    return
  }

  var vx = x == undefined ? this.vx : x; 
  var vy = y == undefined ? this.vy : y;
  var _this = this

  this.points = this.points.map(function (point) {
    point.x += vx
    point.y += vy

    if (point.x >= WIDTH || point.x <= 0) {
      _this.vx = -vx
    }

    if (point.y >= HEIGHT || point.y <= 0) {
      _this.vy = -vy
    }

    return point
  })
}

Shape.prototype.pause = function () {
  this.isPause = true
}

Shape.prototype.start = function () {
  this.isPause = false
}

// 画线
Shape.prototype.drawLine = function (context) {
  context.beginPath()
  this.points.map(function (point) {
    context.lineTo(point.x, point.y)
  })
  var firstPoint = this.points[0]
  context.lineTo(firstPoint.x, firstPoint.y)
}

Shape.prototype.stroke = function (context) {
  context.save()
  context.strokeStyle = this.strokeStyle
  this.drawLine(context)
  context.stroke()
  context.restore()
}

Shape.prototype.fill = function (context) {
  context.save()
  context.fillStyle = this.fillStyle
  this.drawLine(context)
  context.fill()
  context.restore()
}

// 得到法向量
Shape.prototype.getAxis = function () {
  var axis = []
  var vectors = this.toVector()

  vectors.map(function (vector) {
    var normalVector = vector.normal()
    normalVector.draw()
    axis.push(normalVector)
  })
  return axis
}

// 将点转化为向量
Shape.prototype.toVector = function () {
  this.vectors = []

  // 头尾相连
  var points = this.points.concat([this.points[0]])
  for (var i = 0; i < points.length - 1; i++) {
    var point = points[i]
    var point1 = points[i + 1]
    this.vectors.push(new Vector(point1.x - point.x, point1.y - point.y))
  }
  return this.vectors
}

// 获取多边形在一条投影轴的点积列表
Shape.prototype.dotList = function (axis) {
  var dot = []
  this.points.map(function (point) {
    var vector = new Vector(point.x, point.y)
    dot.push(vector.dotProduct(axis))
  })
  return dot
}

Shape.prototype.cover = function (shape) {
  var isCover = true
  var _this = this
  var minVector = new Vector()
  var minDot

  // 如果被检测的形状是圆型，则对需要把当前形状传入  
  var axis = shape.isCircle == true ? this.getAxis(shape) : this.getAxis()
  axis = shape.isCircle == true ? axis.concat(shape.getAxis(this)) : axis.concat(shape.getAxis())


  axis.map(function (oneAxis) {
    var dot = _this.dotList(oneAxis)
    var dot1 = shape.dotList(oneAxis)

    var coverNum = checkCover(dot, dot1)
    if (coverNum == false) {
      isCover = false
    }else {
      if (minDot == undefined || minDot > coverNum) {
        minDot = coverNum
      }
    }
  })

  return {
    isCover: isCover,
    minDot: Math.ceil(minDot)
  }
}
Shape.prototype.isPointInPath = function (context, x, y) {
  this.drawLine(context)
  return context.isPointInPath(x, y)
}
