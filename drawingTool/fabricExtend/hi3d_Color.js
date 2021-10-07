hi3D.prototype.colorToHex = function (color) {
  let r
  let g
  let b
  if (color.indexOf('#') === 0) {
    return color
  } else if (color.indexOf('rgba(') === 0) {
    color = color.substr(5).split(')')[0].split(',');
    r = (+color[0]).toString(16),
    g = (+color[1]).toString(16),
    b = (+color[2]).toString(16);
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    
    return "#" + r + g + b;
  } else if (color.indexOf('rgb(') === 0) {
    color = color.substr(4).split(')')[0].split(',');
    r = (+color[0]).toString(16),
    g = (+color[1]).toString(16),
    b = (+color[2]).toString(16);
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    
    return "#" + r + g + b;
  } else {
    color
  }
}


hi3D.prototype.randomHexColor = function () {
  var color = '#' + Math.floor(Math.random()*16777215).toString(16);
  if (color.length < 7) { color = color + '0' }
  return color;
}