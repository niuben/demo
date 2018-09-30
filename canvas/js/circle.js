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
  var minIndex = 0;
  var minDistance = BIG_NUMBER;
  shape.points.map(function (point, index) {    
    var distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2))
    if (distance < minDistance) {
      minDistance = distance
      minIndex = index
    }
  })

  var minPoint = shape.points[minIndex];
  var vector = new Vector(minPoint.x - x, minPoint.y - y);
  axis.push(vector.normal())
  console.log("shape", axis);
  return axis;

  // var v1 = new Vector(this.points[length -1].x, this.points[length -1].y);
  // var v2 = new Vector(this.points[0].x, this.points[0].y);

  // surfaceVector = v2.subtract(v1);
  // axes.push(surfaceVector.perpendicular().normal());
  // return axis;

}

//判断一个向量和一个多边形是否重合
Circle.prototype.project = function (axis) {
  var scalars = [];

  
  scalars.push(new Vector(this.x, this.y).dotProduct(axis));  

  return new Projection(Math.min.apply(Math, scalars),
                        Math.max.apply(Math, scalars));
};


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
  context.beginPath();
  context.save();
  context.fillStyle = circleFillStyle;
  context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

Circle.prototype.move = function(x, y){
  this.x += x;
  this.y += y;
}

Circle.prototype.getBounding = function(){
  var minx = this.x - this.r,
       miny = this.y - this.r,
       maxx = this.x + this.r,
       maxy = this.y + this.r;

  return new BoundingBox(minx, miny,
    parseFloat(maxx - minx),
    parseFloat(maxy - miny)); 
}