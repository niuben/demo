
function SpriteSheetPainter(image, cells) {
  this.image = image;
  this.cells = cells || [];
  this.cellIndex = 0;
}
SpriteSheetPainter.prototype = {
  advance: function () {
    if (this.cellIndex == this.cells.length - 1) {
      this.cellIndex = 0;
    } else {
      this.cellIndex++;
    }
  },
  paint: function (sprite, context) {
    var cell = this.cells[this.cellIndex];
    context.drawImage(this.image, cell.left, cell.top, cell.width, cell.height, sprite.x, sprite.y, sprite.width, sprite.height);
  }
}