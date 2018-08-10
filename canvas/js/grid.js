function drawGrid (color, stepx, stepy) {
  context.save()

  context.shadowColor = undefined
  context.shadowBlur = 0
  context.shadowOffsetX = 0
  context.shadowOffsetY = 0

  context.strokeStyle = color
  context.fillStyle = '#ffffff'
  context.lineWidth = 0.5
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)

  for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
    context.beginPath()
    context.moveTo(i, 0)
    context.lineTo(i, context.canvas.height)
    if (Math.floor(i) % 50 == 0) { context.strokeText(Math.floor(i - 0.5), i - 10 / 2, 10); }
    context.stroke()
  }

  for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
    context.beginPath()
    context.moveTo(0, i)
    context.lineTo(context.canvas.width, i)
    if (Math.floor(i) % 50 == 0) { context.strokeText(Math.floor(i - 0.5), 0, i); }
    context.stroke()
  }

  context.restore()
}
