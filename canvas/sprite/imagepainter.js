function ImagePainter(imageUrl){
    
    this.image = new Image();
    this.image.src = imageUrl;
}

ImagePainter.prototype = {    
    paint: function(sprite, context){
        if(this.image.complete){
            context.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height);
        }
    }
}