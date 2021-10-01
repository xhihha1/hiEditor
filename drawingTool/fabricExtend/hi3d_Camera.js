(function (global) {

  // 'use strict';

  var fabric = global.fabric || (global.fabric = {});

  if (fabric.HiCamera) {
    fabric.warn('fabric.HiCamera is already defined');
    return;
  }

  fabric.HiCamera = fabric.util.createClass(fabric.Circle, {

    type: 'hiCamera',

    initialize: function (element, options) {
      options || (options = {});
      this.callSuper('initialize', element, options);
    },

    toObject: function (propertiesToInclude) {
      return fabric.util.object.extend(this.callSuper('toObject', ['radius', 'startAngle', 'endAngle'].concat(propertiesToInclude)), {
        camera: this.camera,
        altitude: this.altitude
      });
    },

    _render: function (ctx) {
      this.callSuper('_render', ctx);
      // this.perPixelTargetFind = true;
      // do not render if width/height are zeros or object is not visible
      if (this.width === 0 || this.height === 0 || !this.visible) return;
      ctx.font = "16px Arial";
      ctx.fillText("Camera", 0, 0);

    }
  });

  fabric.HiCamera.fromObject = function (object, callback) {
    callback && callback(new fabric.HiCamera(object));
  };

  fabric.HiCamera.async = true;


  // -----------------------------------------------------
  var upIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAG9SURBVGhD7ZctTwNBEIaPD4lAIEhAIJFIBAKJRCCQCH4AEolHIPgJSEwTJAbCH8AACQgwfH+FAIIAgfelM8n20sLd3t6x18yTPJltk+7NXNuducQwDMPoVgbgKhz9eVVTWMQe/IKXcBzWjmF4BFnEh0QWMwVrA+/8KWTy9xIvJD7DWhQzCXnnmfSVRPVc4jucg9EyA3nHmax+A2m1SBazCKNjHjI5JtmpCPXOWS/BaGAymti1s/7NJ6iHAI/nf4dJaHKPzjqrnxLXYT+sHF50A7rJ+PomcRNWWgwb3RZ0kyiq7rMNuX/pDEHt1npChVL34/6DsDTcbv0gMbTaQHkdXi847NbaA9zjswy1mBMYdD7jSKEnUrpbl6VeJ9iwOQv/6tZlqb+AwvPZAtRufSixao8lshiOQLlZhulNO3nT5r088vOvkP+9tPqt0NzDJkcOjuFZO/VBm/fymPfzweezFciNQxWyBscy2kKvxFjgIHmW0RZiK8QbKyQ2rJDYsEJiwwqJDSskNrqmkD6JvkyLHPk58N16+gJH4C7cgZXDsTs9khfR+zmjR6IvfJ6faC6D0ID7zaVhGIYRPUnyDe15w+jjPoVKAAAAAElFTkSuQmCC';
  var downIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHASURBVGhD7Zg9LwRRFIaXKCUUCoVCqVSJwg9QKhRKhR+g1KFWKPwEpUaiVOpUGiQUKp/xEUEhCO9r75tMNhM7c+fOnbtynuTJmd2Yc+bMmL1npmUYhmE0QZ+LvszByfZmEHbhUXszLpvwO6DL0IuqV2QNrsJDOMgvPHmFU3AdMmd0WJRn8thFX7W/dxP9LvY81khqWCOpYY2khjWSGtZIalgjNTEExwtaCD4XXMAn2Dmp5hlq+i1qqeeWFZiXJM+7nO/KyP3f4H2O11B/9wHnYWkWIXdmkhMXY3vm4guchd7wuZxJmOzKxVjqarD+DKwMk+h+uXGxblWHzUzAYDCZzhD/d7NFQ/vg4jkM2oQYhaeQRR5dDK2aYB3Wq40ReABZTPdOKJWP+Ydh7fDVzx5k0XcXq6o8+7DKq6XSDMBtyOJfLvqqJnYg8zbCBtQBFZ0EsuokbMHGmhAcGXRgt5ntv3yGn26bJyMZFqCmgG4LZ/bn2/t9b51whOg2BWgtYtNLMFmmoQ62cwq4dNF7+IsNV2M+BvCgtcDpCgWbm2KRnQJ0U/NK9VQTggubpoDgw19s2Ax/Xsd+PxmGYRj/h1brB3aWrHtcxtm1AAAAAElFTkSuQmCC'
  var imgUp = document.createElement('img');
  imgUp.src = upIcon;
  var imgDown = document.createElement('img');
  imgDown.src = downIcon;

  fabric.HiCamera.prototype.transparentCorners = false;
  // fabric.HiCamera.prototype.cornerColor = 'blue';
  // fabric.HiCamera.prototype.cornerStyle = 'circle';

  fabric.HiCamera.prototype.controls = {}
  fabric.HiCamera.prototype.controls.upControl = new fabric.Control({
    x: 1,
    y: -1,
    offsetX: 10,
    offsetY: 10,
    cursorStyle: 'pointer',
    mouseUpHandler: upObject,
    render: renderUpIcon,
    cornerSize: 24
  });
  fabric.HiCamera.prototype.controls.downControl = new fabric.Control({
    x: 1,
    y: 0,
    offsetX: 10,
    offsetY: 10,
    cursorStyle: 'pointer',
    mouseUpHandler: downObject,
    render: renderDownIcon,
    cornerSize: 24
  });


  function upObject(eventData, transform) {
    transform.altitude += 10
    var canvas = transform.canvas;
    canvas.requestRenderAll();
  }

  function renderUpIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(imgUp, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  function downObject(eventData, transform) {
    transform.altitude -= 10
    var canvas = transform.canvas;
    console.log('canvas', canvas)
    canvas.requestRenderAll();
  }

  function renderDownIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(imgDown, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  // -----------------------------------------------------


  hiDraw.prototype.HiCamera = (function () {

    function Circle(canvasItem, options, otherProps) {
      this.canvasItem = canvasItem;
      this.canvas = canvasItem.canvasView;
      this.options = options;
      this.otherProps = otherProps;
      this.className = 'HiCamera';
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
      var ellipse = new fabric.HiCamera({
        stroke: '#333333',
        strokeWidth: 2,
        fill: 'rgba(50,50,50,0.5)',
        opacity: 1,
        radius: 10,
        top: origY,
        left: origX,
        originX: 'center',
        originY: 'center',
        // selectable: false,
        hasBorders: false,
        hasControls: true,
        strokeUniform: true
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


})(typeof exports !== 'undefined' ? exports : this);