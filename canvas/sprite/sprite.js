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
  
    if(name !== undefined) this.name = name;
    if(painter !== undefined) this.painter = painter;
  
    
  }
  
  Sprite.prototype.paint = function(context){
    if(this.painter != undefined) {
      this.painter.paint(this, context);
    }
  }
  Sprite.prototype.update = function(context, time){
    for(var i = 0; i < this.behaviors.length; i++){
      this.behaviors[i].execute(this, context, time);
    }
  }