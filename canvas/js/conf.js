// 多边形坐标
var WIDTH = 800
var HEIGHT = 400
var polygonPoints = [
  [ new Point(320, 120), new Point(300, 170),
    new Point(350, 250)],
  [new Point(100, 100), new Point(100, 150),
    new Point(150, 150), new Point(150, 100)]
]

//
var velocity_x = -5
var velocity_y = -10
var polygonStrokeStyles = ['blue', 'yellow', 'red']
var polygonFillStyles = ['rgba(255,255,0,0.7)', 'rgba(100,140,230,0.6)', 'rgba(255,255,255,0.8)']

var circlePoints = [[new Point(200, 100), 40]]
var circleStrokeStyle = 'yellow'
var circleFillStyle = 'rgba(255,0,255,0.8)'

var shapes = [],
  mousedown = { x: 0, y: 0 },
  lastdrag = { x: 0, y: 0 }
var shapeBeingDragged

function Point (x, y) {
  this.x = x
  this.y = y
}
