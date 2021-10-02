hi3D.prototype.rgba2hex = function (orig) {
    var a, isPercent,
      rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
      alpha = (rgb && rgb[4] || "").trim(),
      hex = rgb ? 
      (rgb[1] | 1 << 8).toString(16).slice(1) +
      (rgb[2] | 1 << 8).toString(16).slice(1) +
      (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
        if (alpha !== "") {
          a = alpha;
        } else {
          a = 01;
        }

        a = Math.round(a * 100) / 100;
          var alpha = Math.round(a * 255);
          var hexAlpha = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
          hex = hex + hexAlpha;

    return (hex).substring(0,7);
}


hi3D.prototype.randomHexColor = function () {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}