// 向量
function Vector (x, y) {
  this.x = x
  this.y = y
}

// 向量的斜边
Vector.prototype.hypotenuse = function (x, y) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

// 向量的点积
Vector.prototype.dotProduct = function (vector) {
  return this.x * vector.x + this.y * vector.y
}

// 法向量
Vector.prototype.normal = function () {
  var x = this.y
  var y = 0 - this.x
  var hypotenuse = this.hypotenuse(x, y)
  x = x / hypotenuse
  y = y / hypotenuse

  var vector = new Vector(x, y)
  return vector
}

//
Vector.prototype.draw = function () {
  context.save()
  context.beginPath()
  context.moveTo(0, 0)
  context.strokeStyle = '#000'
  context.lineTo(this.x, this.y)
  context.stroke()
  context.restore()
}
