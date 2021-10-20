
(function (global) {

  // 'use strict';

  var fabric = global.fabric || (global.fabric = {});

  if (fabric.MapTile) {
    fabric.warn('fabric.MapTile is already defined');
    return;
  }

  fabric.MapTile = fabric.util.createClass(fabric.Rect, {
    type: "mapTile",
    initialize(options) {
      // 使用原方法匯入屬性
      this.callSuper('initialize', options)
      // this.height = height || 100
      // this.width = width || 100
    },
    toObject: function (propertiesToInclude) {
      return this.callSuper('toObject', ['radius', 'startAngle', 'endAngle'].concat(propertiesToInclude));
    },
    getArea() {
      return this.height * this.width
    },
    _render(ctx) {
      // 先畫出原本的圖形
      // this.callSuper('_render', ctx)

      // -------------------------------------------------
      var north_edge = 25.032531
      var west_edge = 121.562722
      var south_edge = 25.045498
      var east_edge = 121.614757
      var sliceNum = 14
      var zoomX = foundXZ (sliceNum, west_edge, east_edge)
      var zoomY = foundYZ (sliceNum, south_edge, north_edge)
      var zoom = Math.min(zoomX, zoomY);
      var top_tile = lat2tile(north_edge, zoom); // eg.lat2tile(34.422, 9);
      var left_tile = lon2tile(west_edge, zoom);
      var bottom_tile = lat2tile(south_edge, zoom);
      var right_tile = lon2tile(east_edge, zoom);
      var width = Math.abs(left_tile - right_tile) + 1;
      var height = Math.abs(top_tile - bottom_tile) + 1;
      var canvasWidth = this.width * this.scaleX
      var canvasHeight = this.height * this.scaleY
      var unitWidth = Math.floor(canvasWidth / width)
      var unitHeight = Math.floor(canvasHeight / height)
      var unit = Math.min(unitWidth, unitHeight)
      var b = Math.min(bottom_tile, top_tile)
      var t = Math.max(bottom_tile, top_tile)
      var l = Math.min(left_tile, right_tile)
      var r = Math.max(left_tile, right_tile)
      var numRowCol = Math.max(t - b, r - l)
      var ol = this.left - this.width / 2 * this.scaleX
      var ot = this.top - this.height / 2 * this.scaleY
      for (var j = b; j <= b + numRowCol; j++) {
        for (var i = l; i <= l + numRowCol; i++) {
          //  (imgObj, (i - left_tile) * 50, (j - bottom_tile) * 50 ,50,50);
          drawArea(ctx,
            'https://tile.openstreetmap.org/' + zoom + '/' + i + '/' + j + '.png',
            ol + (i - l) * unit,
            ot + (j - b) * unit,
            unit,
            unit
          )
        }
      }


      // var imgObj = new Image();
      // imgObj.src = 'https://tile.openstreetmap.org/' + 0 + '/' + 0 + '/' + 0 + '.png'
      // imgObj.onload = function () {
      //   ctx.drawImage(imgObj, this.left - this.width / 2 * this.scaleX, this.top - this.height / 2 * this.scaleY, this.width * this.scaleX, this.height * this.scaleY);
      // }.bind(this);
    }
  })

  fabric.MapTile.fromObject = function (object, callback) {
    // This function is used for deserialize json and convert object json into button object again. (called when we call loadFromJson() fucntion on canvas)
    // return fabric.Object._fromObject("MapTile", object, callback);
    callback && callback(new fabric.MapTile(object));
  };

  
  hiDraw.prototype.MapTile = (function () {

    function Circle(canvasItem, options, otherProps) {
      this.canvasItem = canvasItem;
      this.canvas = canvasItem.canvasView;
      this.options = options;
      this.otherProps = otherProps;
      this.className = 'MapTile';
      this.isDrawing = false;
      this.tempPointsArray = new Array();
      this.bindEvents();
    }

    Circle.prototype.bindEvents = function () {
      var inst = this;
      inst.canvas.on('mouse:down', function (o) {
        inst.onMouseDown(o);
      });
      inst.canvas.on('mouse:move', function (o) {
        inst.onMouseMove(o);
      });
      inst.canvas.on('mouse:up', function (o) {
        inst.onMouseUp(o);
      });
      inst.canvas.on('object:moving', function (o) {
        inst.disable();
      })
      // inst.canvas.on('mouse:down', inst.onMouseDown);
      // inst.canvas.on('mouse:move', inst.onMouseMove);
      // inst.canvas.on('mouse:up', inst.onMouseUp);
      // inst.canvas.on('object:moving', inst.disable)
    }

    Circle.prototype.unbindEvents = function () {
      var inst = this;
      // inst.canvas.off('mouse:down', inst.onMouseDown);
      // inst.canvas.off('mouse:move', inst.onMouseMove);
      // inst.canvas.off('mouse:up', inst.onMouseUp);
      // inst.canvas.off('object:moving', inst.disable)
      inst.canvas.off('mouse:down');
      inst.canvas.off('mouse:move');
      inst.canvas.off('mouse:up');
      inst.canvas.off('object:added');
      inst.canvas.off('object:modified');
      inst.canvas.off('object:removed');
      inst.canvas.off('object:moving');
      inst.canvas.off('after:render');
      inst.canvas.off('mouse:wheel');
      inst.canvas.off('selection:created');
      inst.canvas.off('selection:updated');
      inst.canvas.off('selection:cleared');
    }

    Circle.prototype.onMouseUp = function (o) {
      var inst = this;
      inst.disable();
    };

    Circle.prototype.onMouseMove = function (o) {
      var inst = this;

      inst.canvas.renderAll();
    };

    Circle.prototype.onMouseDown = function (o) {
      var inst = this;

      // var pointer = inst.canvas.getPointer(o.e);
      // inst.disable();
      //     inst.generateCircle();


      var pointer = inst.canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;

      var ellipse = new fabric.MapTile({
        // stroke: '#333333',
        // strokeWidth: 2,
        // fill: 'rgba(50,50,50,0.5)',
        // opacity: 1,
        top: origY,
        left: origX,
        width: 100,
        height: 100,
        originX: 'center',
        originY: 'center',
      })

      // ellipse.on('selected', function () {
      //     console.log('selected a Circle');
      //     // inst.enable();
      // });
      // ellipse.on('mousedown', function () {
      //     console.log('mousedown a Circle');
      // });
      ellipse.altitude = 0
      inst.canvas.add(ellipse).setActiveObject(ellipse);
      ellipse.canvasItem = inst.canvasItem;
    };

    Circle.prototype.isEnable = function () {
      return this.isDrawing;
    }

    Circle.prototype.enable = function () {
      this.isDrawing = true;
    }

    Circle.prototype.disable = function () {
      this.isDrawing = false;
      this.unbindEvents();
      if (this.options && this.options.endDraw) {
        this.options.endDraw();
      }
    }


    return Circle;
  }(this));

  function lon2tile(lon, zoom) {
    return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom)));
  }

  function lat2tile(lat, zoom) {
    return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 *
      Math.pow(2, zoom)));
  }

  function tile2long(x, z) {
    return (x / Math.pow(2, z) * 360 - 180);
  }

  function tile2lat(y, z) {
    var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
    return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
  }

  function drawArea(ctx, url, x, y, w, h) {
    var imgObj = new Image();
    imgObj.src = url
    imgObj.onload = function () {
      ctx.drawImage(imgObj, x, y, w, h);
    };
  }

  // -------------------------------------------------------------
  function foundXZ (sliceNum, west_edge, east_edge) {
    for (var z = 20; z > -1; z--) {
      var left_tile = lon2tile(west_edge, z);
      var right_tile = lon2tile(east_edge, z);
      if ((Math.abs(right_tile - left_tile) + 1) <= sliceNum) {
        return z
      }
    }
    return 0
  }
  function foundYZ (sliceNum, south_edge, north_edge) {
    for (var z = 20; z > -1; z--) {
      var bottom_tile = lat2tile(south_edge, z);
      var top_tile = lat2tile(north_edge, z);
      if ((Math.abs(top_tile - bottom_tile) + 1) <= sliceNum) {
        return z
      }
    }
    return 0
  }

})(typeof exports !== 'undefined' ? exports : this);