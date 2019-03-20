
// var cells = [
//   {top: 0, left: 0, width: 280, height: 385},
//   { top: 0, left: 280, width: 280, height: 385 },
//   { top: 0, left: 560, width: 280, height: 385 },
//   { top: 0, left: 840, width: 280, height: 385 },
//   { top: 0, left: 1120, width: 280, height: 385 },
//   { top: 385, left: 0, width: 280, height: 385 },
//   { top: 385, left: 280, width: 280, height: 385 },
//   { top: 385, left: 560, width: 280, height: 385 },
//   { top: 385, left: 840, width: 280, height: 385 },
//   { top: 385, left: 1120, width: 280, height: 385 },
// ]

var cells = [
  { left: 0,   top: 0, width: 47, height: 64 },
      { left: 55,  top: 0, width: 44, height: 64 },
      { left: 107, top: 0, width: 39, height: 64 },
      { left: 150, top: 0, width: 46, height: 64 },
      { left: 208, top: 0, width: 49, height: 64 },
      { left: 265, top: 0, width: 46, height: 64 },
      { left: 320, top: 0, width: 42, height: 64 },
      { left: 380, top: 0, width: 35, height: 64 },
      { left: 425, top: 0, width: 35, height: 64 },
]

var run = {    
  animating: true,
  lastAdVance: 0,
  INTERVAL: 200,
  execute: function(sprite, context, now){
        
    if(now - this.lastAdVance < this.INTERVAL){
      return;
    }
    sprite.painter.advance();
    this.lastAdVance = now;    
  }
}

var jump = {
  animating: true,
  startTime: null,
  lastAdVance: null,
  INTERVAL: 50,  
  lastY: 0,
  v0: 100,  //初始速度
  startCallback: null,
  endCallback: null,
  execute: function(sprite, context, now){

    //获取起始时间
    if(this.startTime == null){
      this.startTime = now;
      this.lastAdVance = now;
      this.lastY = sprite.y;      
    } 

    //节流
    if (now - this.lastAdVance < this.INTERVAL) {
      return;
    }
    
    var duration = (now - this.startTime) / 1000;
    sprite.vy = this.v0 - (G * PixelsPerMeter * duration);
    sprite.y -= sprite.vy;
    
    if(sprite.y > this.lastY){            
      sprite.y = this.lastY;
      this.stop();      
    }
    this.lastAdVance = now;
  },
  stop: function(){
    this.animating = false;
  },
  start: function(sprite){
    if(this.animating == false){
      this.reset(sprite);
      this.animating = true;
    }
  },
  reset: function(sprite){ //重置
    this.startTime = null;
    this.lastAdVance = null;
    this.lastY = sprite.y;
  }
}

//动作判断
jump.startCallback = function(){
  run.animating = false;
} 
jump.endCallback = function(){
  run.animating = true;
}


var image = new Image();
image.src = "/canvas/shared/images/running-sprite-sheet.png";
person = new Sprite("person", new SpriteSheetPainter(image, cells), [run, jump]);
person.x = 0;
person.y = 300;
person.width = 51;
person.height = 64;
person.jump = function(){
  jump.start.apply(jump, [person]);       
}
person.addPoints();