// 向量
function Vector (x, y) {  
    this.x = x
    this.y = y
}

// 向量的斜边
Vector.prototype.hypotenuse = function () {
  return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
}

// 向量的点积
Vector.prototype.dotProduct = function (vector) {
  return this.x * vector.x + this.y * vector.y
}

// 法向量
Vector.prototype.normal = function () {
  var x = this.y
  var y = 0 - this.x
  var hypotenuse = this.hypotenuse()
  x = x / hypotenuse
  y = y / hypotenuse

  var vector = new Vector(x, y)
  return vector
}

Vector.prototype.perpendicular =  function () {
  var v = new Vector();
  v.x = this.y;
  v.y = 0-this.x;
  return v;
};

Vector.prototype.subtract = function (vector) {
  var v = new Vector();
  v.x = this.x - vector.x;
  v.y = this.y - vector.y;
  return v;
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
