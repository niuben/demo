 function Sprite(name, painter, behaviors) {  
    this.x = 0;
    this.y = 0;
    this.width = 10;
    this.height = 10;
    this.vx = 0;
    this.vy = 0;
    this.visible = true;
    this.index = 0;
  
    this.behaviors = behaviors || [];

    this.points = [];

    if(name !== undefined) this.name = name;
    if(painter !== undefined) this.painter = painter;
  
  }
  
  Sprite.prototype = new Shape("#000", "#000");

  Sprite.prototype.addPoints = function(context){
      this.addPoint(new Point(this.x, this.y));
      this.addPoint(new Point(this.x + this.width, this.y));
      this.addPoint(new Point(this.x + this.width, this.y + this.height));
      this.addPoint(new Point(this.x, this.y + this.height));
            
      // context.strokeStyle = "#000";
      // context.beginPath();
      // this.points.map(function(point){
      //     context.lineTo(point.x, point.y);
      // });
      // context.lineTo(this.x, this.y);
      // context.stroke();
  }

  Sprite.prototype.paint = function(context){
    if(this.painter != undefined) {
      this.painter.paint(this, context);
    }
  }
  Sprite.prototype.update = function(context, time){
    for(var i = 0; i < this.behaviors.length; i++){
      if(this.behaviors[i].animating == true){
        this.behaviors[i].execute(this, context, time);
      }
    }
  }
  
