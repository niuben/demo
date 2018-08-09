function Circle (x, y, r) {
  this.x = x
  this.y = y
  this.r = r
  this.isCircle = true
}
Circle.prototype = new Shape()
Circle.prototype.getAxis = function (shape) {
  var axis = []
  if (shape == undefined) {
    return axis
  }

  var x = this.x
  var y = this.y
  var maxIndex = 0
  var maxDistance = 0
  shape.points.map(function (point, index) {
    var distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2))
    if (distance > maxDistance) {
      maxDistance = distance
      maxIndex = index
    }
  })

  var maxPoint = shape.points[maxIndex]
  var vector = new Vector(maxPoint.x - x, maxPoint.y - y)
  axis.push(vector.normal())
  return axis
}

// 获取圆的点积，通过单位向量和圆心点的
Circle.prototype.dotList = function (axis) {
  var vector = new Vector(this.x, this.y)
  var dot = vector.dotProduct(axis)
  var minDot = dot - this.r
  var maxDot = dot + this.r
  return [minDot, maxDot]
}

Circle.prototype.stroke = function (context) {
  context.beginPath()
  context.save()
  context.strokeStyle = circleStrokeStyle
  context.arc(this.x, this.y, this.r, 0, Math.PI * 2)
  context.stroke()
  context.restore()
}

Circle.prototype.fill = function (context) {
  context.beginPath()
  context.save()
  context.fillStyle = circleFillStyle
  context.arc(this.x, this.y, this.r, 0, Math.PI * 2)
  context.fill()
  context.restore()
}
