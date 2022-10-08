
hiDraw.prototype.randomHexColor = function () {
  var color = '#' + Math.floor(Math.random()*16777215).toString(16);
  if (color.length < 7) { color = color + '0' }
  return color;
}