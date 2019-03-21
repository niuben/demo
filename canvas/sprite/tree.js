function createTree(name, x, y){
    var imageUrl = "/canvas/shared/images/tree.png";
    var tree = new Sprite(name, new ImagePainter(imageUrl), {
        
    });
    tree.sx = x; //初始位置
    tree.x = x; //100;
    tree.y = y; //300;
    tree.width = 187 / 2;
    tree.height = 221 / 2;
    
    tree.addPoints();
    return tree;
}