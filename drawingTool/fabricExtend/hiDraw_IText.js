(function (global) {

  // 'use strict';

  var fabric = global.fabric || (global.fabric = {});

  if (fabric.HiText) {
    fabric.warn('fabric.HiText is already defined');
    return;
  }

  // fabric.HiText = fabric.util.createClass(fabric.IText, {
  //   type: 'hiText',

  //   initialize: function (element, options) {
  //     this.callSuper('initialize', element, options);
  //     // this.set('extraProp', options.extraProp);
  //   },

  //   toObject: function () {
  //     return fabric.util.object.extend(this.callSuper('toObject'), {
  //       // extraProp: this.get('extraProp')
  //     });
  //   }
  // });

  // fabric.HiText.fromObject = function (object, callback) {
  //   callback(new fabric.TextAsset(object.text, object));
  // };

  // fabric.HiText.async = true;


  fabric.HiText = fabric.util.createClass(fabric.IText, {
    type: "hiText",
    initialize(text, options) {
      this.callSuper('initialize', text, options);
      this.initBehavior();
    },
    toObject: function (propertiesToInclude) {
      return fabric.util.object.extend(this.callSuper('toObject', ['radius', 'startAngle', 'endAngle'].concat(propertiesToInclude)), {
        // hiId: this.hiId
      });
    },
    _render(ctx) {
      // 先畫出原本的圖形
      this.callSuper('_render', ctx)
    }
  })

  fabric.HiText.fromObject = function (object, callback) {
    // This function is used for deserialize json and convert object json into button object again. (called when we call loadFromJson() fucntion on canvas)
    //  return fabric.Object._fromObject("HiText", object, callback);
    callback && callback(new fabric.HiText(object.text, object));
  };


  hiDraw.prototype.HiText = (function () {

    function Circle(canvasItem, options, otherProps) {
      this.canvasItem = canvasItem;
      this.canvas = canvasItem.canvasView;
      this.options = options;
      this.otherProps = otherProps;
      this.className = 'HiText';
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

      // ellipse = new fabric.IText('hello\nworld', {
      //   left: origX,
      //   top: origY,
      //   originX: 'center',
      //   originY: 'center',
      //   fontFamily: 'Helvetica',
      //   fill: '#000000',
      //   lineHeight: 1.1,
      //   styles: {
      //   }
      // });
      ellipse = new fabric.HiText('hello\nworld', {
        left: origX,
        top: origY,
        originX: 'center',
        originY: 'center',
        fontFamily: 'Helvetica',
        fill: '#000000',
        lineHeight: 1.1,
        styles: {}
      });

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