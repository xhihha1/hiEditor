
(function (global) {

  // 'use strict';

  var fabric = global.fabric || (global.fabric = {});

  if (fabric.PolarChart) {
    fabric.warn('fabric.PolarChart is already defined');
    return;
  }

fabric.PolarChart = fabric.util.createClass(fabric.Rect, {
  type: "polarChart",
  initialize(options, dataSets) {
    // 使用原方法匯入屬性
    this.callSuper('initialize', options)
    // this.height = height || 100
    // this.width = width || 100
    this.dataSets = dataSets;
  },
  toObject: function (propertiesToInclude) {
    return this.callSuper('toObject', ['radius', 'startAngle', 'endAngle'].concat(propertiesToInclude));
  },
  getArea() {
    return this.height * this.width
  },
  _render(ctx) {
    // 先畫出原本的圖形
    this.callSuper('_render', ctx)
    var A = new hichart('Polar', ctx, {
      x: -1 * this.width / 2,
      y: -1 * this.height / 2,
      width: this.width,
      height: this.height
    }, {
      sections: 1,
      Val_max: 0.5,
      Val_min: 0,
      stepSize: 0.1,
      columnSize: 0,
      rowSize: 0,
      margin: 5,
      xAxis: {
        showGrid: false,
        gridLineWidth: 0
      },
      yAxis: {
        showGrid: false,
        gridLineWidth: 0
      },
      series: [{
        data: this.dataSets,
        color: "#d9406f",
        linearGradient: [{
          position: 0,
          color: "#000000"
        }, {
          position: 1,
          color: "#d9406f"
        }]
      }]
    })
  }
})

fabric.PolarChart.fromObject = function (object, callback) {
  // This function is used for deserialize json and convert object json into button object again. (called when we call loadFromJson() fucntion on canvas)
  return fabric.Object._fromObject("PolarChart", object, callback);
};


  
hiDraw.prototype.PolarChart = (function () {

  function Circle(canvasItem, options, otherProps) {
    this.canvasItem = canvasItem;
    this.canvas = canvasItem.canvasView;
    this.options = options;
    this.otherProps = otherProps;
    this.dataSets = otherProps.dataSets;
    this.className = 'PolarChart';
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

    // var ellipse = new fabric.Ellipse({
    //     top: origY,
    //     left: origX,
    //     rx: 0,
    //     ry: 0,
    //     stroke: '#333333',
    //     strokeWidth: 2,
    //     fill: 'rgba(0,0,0,0)',
    //     opacity: 1,
    //     selectable: false,
    //     hasBorders: true,
    //     hasControls: true,
    //     strokeUniform: true
    // });
    var ellipse = new fabric.PolarChart({
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
    }, this.dataSets)

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

})(typeof exports !== 'undefined' ? exports : this);