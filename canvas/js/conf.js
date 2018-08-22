// 多边形坐标
var WIDTH = 800;
var HEIGHT = 400;
var BIG_NUMBER = 1000000;
var polygonPoints = [
  [ new Point(250, 150), new Point(250, 200),
    new Point(300, 200) ],

  [ new Point(150, 100), new Point(150, 150),
    new Point(200, 150) ],

  [ new Point(150, 250), new Point(150, 200),
    new Point(200, 200) ],

  [ new Point(100, 75), new Point(100, 100),
    new Point(125, 100), new Point(125, 75) ],

  [ new Point(300, 75), new Point(280, 125),
    new Point(350, 125) ]
]

//
var velocity = {
  x: 350,
  y: 190
};
var polygonStrokeStyles = ['blue', 'yellow', 'red', 'red', 'black']
var polygonFillStyles = ['rgba(255,255,0,0.7)',
'rgba(100,140,230,0.6)',
'rgba(255,255,255,0.6)',
'aqua',
'rgba(255,0,255,0.8)']
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
