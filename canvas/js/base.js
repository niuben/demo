function windowToCanvas(e) {
    var x = e.x || e.clientX,
        y = e.y || e.clientY,
        bbox = canvas.getBoundingClientRect();

    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
};