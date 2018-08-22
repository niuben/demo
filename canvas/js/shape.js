// 多边形
function Shape (strokStyle, fillStyle) {
  this.points = []
  this.vectors = []
  this.strokStyle = strokStyle
  this.fillStyle = fillStyle
  // this.vx = velocity.x
  // this.vy = velocity.y

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

  // var vx = x == undefined ? velocity.x : x; 
  // var vy = y == undefined ? velocity.y : y;
  // var _this = this;

  this.points = this.points.map(function (point) {
    point.x += x;
    point.y += y;

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
  var v1, v2, surfaceVector, axes = [], pushAxis = true;

  var length = this.points.length;
      
   for (var i=0; i < length-1; i++) {
      v1 = new Vector(this.points[i].x, this.points[i].y);
      v2 = new Vector(this.points[i+1].x, this.points[i+1].y);

      surfaceVector = v2.subtract(v1);
      axes.push(surfaceVector.perpendicular().normal());
   }


    v1 = new Vector(this.points[length -1].x, this.points[length -1].y);
    v2 = new Vector(this.points[0].x, this.points[0].y);

    surfaceVector = v2.subtract(v1);
    axes.push(surfaceVector.perpendicular().normal());

   return axes;
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
    
  var minimumOverlap = BIG_NUMBER,
       overlap,
       axisWithSmallestOverlap,
       mtv;

  // 如果被检测的形状是圆型，则对需要把当前形状传入  
  var axis = shape.isCircle == true ? this.getAxis(shape) : this.getAxis();
  axis = shape.isCircle == true ? axis.concat(shape.getAxis(this)) : axis.concat(shape.getAxis());

  for(var i = 0; i < axis.length; i++){
      var index = i;
      var oneAxis = axis[i];

      projection1 = this.project(oneAxis);
      projection2 = shape.project(oneAxis);
      overlap = projection1.getOverlap(projection2);

      if (overlap === 0) {
         return new MinimumTranslationVector(undefined, 0);
      }
      else {
         if (overlap < minimumOverlap) {
            minimumOverlap = overlap;
            axisWithSmallestOverlap = oneAxis;    
         }
      }
   }
   mtv = new MinimumTranslationVector(axisWithSmallestOverlap,
                                     minimumOverlap);
   return mtv;        
}


Shape.prototype.cover1 = function (shape) {
  
  var isCover = true
  var _this = this
  var minVector = new Vector()
  var minDot, minIndex;

  // 如果被检测的形状是圆型，则对需要把当前形状传入  
  var axis = shape.isCircle == true ? this.getAxis(shape) : this.getAxis();
  axis = shape.isCircle == true ? axis.concat(shape.getAxis(this)) : axis.concat(shape.getAxis());

  for(var i = 0; i < axis.length; i++){
      var index = i;
      var oneAxis = axis[i];

      var dot = _this.dotList(oneAxis);
      var dot1 = shape.dotList(oneAxis);
      
      var coverNum = checkCover(dot, dot1)
      if (coverNum == false) {
        isCover = false;
        break;
      }            
      
      if (minDot == undefined || minDot > coverNum) {
        minDot = coverNum;
        minIndex = index;
      }    
    }

  return {
    isCover: isCover,
    minDot: Math.ceil(minDot),
    normalAxis: axis[minIndex]
  }
}

Shape.prototype.isPointInPath = function (context, x, y) {
  this.drawLine(context)
  return context.isPointInPath(x, y)
}

/*
* 获取反射向量
* 公式  R = 2 * (V * l) /(l * l)l - V;
*  V：前进的速度向量;
*  L: 边缘向量的法向量;
*/
Shape.prototype.reflect = function(normalAxis, context){
  
  // var vx = velocity.x;
  // var vy = velocity.y;  

  var vector = new Vector(velocity.x, velocity.y);
  var unitVector = vector.normal();
    
  var hypotenuse = vector.hypotenuse(velocity.x, velocity.y);
  
  // var vUnitAxis = new Vector(unitVX, unitVY);    
  var dot = unitVector.dotProduct(normalAxis);
  var dot1 = normalAxis.dotProduct(normalAxis);
  var dotRatio = dot / dot1;

  var unitVX = 2 * dotRatio * normalAxis.x - unitVector.x;  
  var unitVY = 2 * dotRatio * normalAxis.y - unitVector.y;

  velocity.x = unitVX * hypotenuse;
  velocity.y = unitVY * hypotenuse;  
}

/*
* 获取形状的边界
*/
Shape.prototype.getBounding = function(){
  var minx = BIG_NUMBER,
       miny = BIG_NUMBER,
       maxx = -BIG_NUMBER,
       maxy = -BIG_NUMBER,
       point;

   for (var i=0; i < this.points.length; ++i) {
      point = this.points[i];
      minx = Math.min(minx,point.x);
      miny = Math.min(miny,point.y);
      maxx = Math.max(maxx,point.x);
      maxy = Math.max(maxy,point.y);
   }

   return new BoundingBox(minx, miny,
            parseFloat(maxx - minx),
            parseFloat(maxy - miny)); 

}
/*
* 
*/
Shape.prototype.centroid = function () {
  var pointSum = new Point(0,0);
  
  for (var i=0, point; i < this.points.length; ++i) {
     point = this.points[i];
     pointSum.x += point.x;
     pointSum.y += point.y;
  }
  return new Point(pointSum.x / this.points.length,
                   pointSum.y / this.points.length);
}

Shape.prototype.project = function (axis) {
  var scalars = [];

  this.points.forEach( function (point) {
     scalars.push(new Vector(point.x, point.y).dotProduct(axis));
  });

  return new Projection(Math.min.apply(Math, scalars),
                        Math.max.apply(Math, scalars));
};




function BoundingBox(left, top, width, height){
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;
}


// Projections...................................................

var Projection = function (min, max) {
  this.min = min;
  this.max = max;
};

Projection.prototype = {
  overlaps: function (projection) {
     return this.max > projection.min && projection.max > this.min;
  },

  getOverlap: function (projection) {
     var overlap;

     if (!this.overlaps(projection))
        return 0;
     
     if (this.max > projection.max) {
        overlap = projection.max - this.min;
     }
     else {
       overlap = this.max - projection.min;
     }
     return overlap;
  }
};

var MinimumTranslationVector = function (axis, overlap) {
  this.axis = axis;
  this.overlap = overlap;
};