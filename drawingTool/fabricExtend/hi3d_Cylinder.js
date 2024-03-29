(function (global) {

    // 'use strict';
  
    var fabric = global.fabric || (global.fabric = {});
  
    if (fabric.HiCylinder) {
      fabric.warn('fabric.HiCylinder is already defined');
      return;
    }
  
    fabric.HiCylinder = fabric.util.createClass(fabric.Circle, {
  
      type: 'hiCylinder',
  
      initialize: function (element, options) {
        options || (options = {});
        this.callSuper('initialize', element, options);
      },
  
      // toObject: function () {
      //     return fabric.util.object.extend(this.callSuper('toObject'), { hiId: this.hiId, altitude: this.altitude });
      // },
  
      toObject: function (propertiesToInclude) {
        return fabric.util.object.extend(this.callSuper('toObject', ['radius', 'startAngle', 'endAngle'].concat(propertiesToInclude)), {
          hiId: this.hiId,
          altitude: this.altitude,
          source: this.source,
          scaleZ: this.scaleZ
        });
      },
  
      _render: function (ctx) {
        this.callSuper('_render', ctx);
        this.perPixelTargetFind = true;
        // do not render if width/height are zeros or object is not visible
        if (this.width === 0 || this.height === 0 || !this.visible) return;
  
      }
    });
  
    fabric.HiCylinder.fromObject = function (object, callback) {
      callback && callback(new fabric.HiCylinder(object));
    };
  
    fabric.HiCylinder.async = true;

    // ---------------------------------------
    fabric.HiCylinder.prototype.controls = {}
    fabric.HiCylinder.prototype.controls.tl = new fabric.Control({
        x: -0.5,
        y: -0.5,
        // cursorStyleHandler: scaleStyleHandler,
        // actionHandler: wrapWithFireEvent('scaling', wrapWithFixedAnchor( scaleObject))
        actionHandler: hiDraw.prototype.HiFormatControlUtil.scalingEqually
    });

    fabric.HiCylinder.prototype.controls.tr = new fabric.Control({
        x: 0.5,
        y: -0.5,
        // cursorStyleHandler: scaleStyleHandler,
        // actionHandler: wrapWithFireEvent('scaling', wrapWithFixedAnchor( scaleObject))
        actionHandler: hiDraw.prototype.HiFormatControlUtil.scalingEqually
    });

    fabric.HiCylinder.prototype.controls.bl = new fabric.Control({
        x: -0.5,
        y: 0.5,
        // cursorStyleHandler: scaleStyleHandler,
        // actionHandler: wrapWithFireEvent('scaling', wrapWithFixedAnchor( scaleObject))
        actionHandler: hiDraw.prototype.HiFormatControlUtil.scalingEqually
    });

    fabric.HiCylinder.prototype.controls.br = new fabric.Control({
        x: 0.5,
        y: 0.5,
        // cursorStyleHandler: scaleStyleHandler,
        // actionHandler: wrapWithFireEvent('scaling', wrapWithFixedAnchor( scaleObject))
        actionHandler: hiDraw.prototype.HiFormatControlUtil.scalingEqually
    });

    fabric.HiCylinder.prototype.controls.mtr = new fabric.Control({
        x: 0,
        y: -0.5,
        actionHandler: fabric.controlsUtils.rotationWithSnapping,
        cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
        offsetY: -40,
        withConnection: true,
        actionName: 'rotate',
    });
    // ------------------------------------------
  
    // fabric.HiCylinder.prototype.controls = fabric.Object.prototype.controls;
  
    hiDraw.prototype.HiCylinder = (function () {
  
      function Circle(canvasItem, options, otherProps) {
        this.canvasItem = canvasItem;
        this.canvas = canvasItem.canvasView;
        this.options = options;
        this.otherProps = otherProps;
        this.className = 'Circle';
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
        // inst.disable();
      };
  
      Circle.prototype.onMouseMove = function (o) {
        var inst = this;
        if (inst.tempPointsArray.length == 0) {
          return;
        }
  
  
        var pointer = inst.canvas.getPointer(o.e);
        var activeObj = inst.canvas.getActiveObject();
  
        inst.tempPointsArray[1].set('left', pointer.x)
        inst.tempPointsArray[1].set('top', pointer.y)
        // inst.tempPointsArray[1].set('left', (o.e.layerX / inst.canvas.getZoom()))
        // inst.tempPointsArray[1].set('top', (o.e.layerY / inst.canvas.getZoom()))
  
        var radius = Math.sqrt(Math.pow(inst.tempPointsArray[0].get('left') - inst.tempPointsArray[1].get('left'), 2) + Math.pow(inst.tempPointsArray[0].get('top') - inst.tempPointsArray[1].get('top'), 2))
  
        inst.shape.set('left', inst.tempPointsArray[0].get('left') - radius)
        inst.shape.set('top', inst.tempPointsArray[0].get('top') - radius)
        inst.shape.set('radius', radius)
        inst.shape.set('width', radius * 2)
        inst.shape.set('height', radius * 2)
  
        inst.canvas.renderAll();
      };
  
      Circle.prototype.onMouseDown = function (o) {
        var inst = this;
  
        var pointer = inst.canvas.getPointer(o.e);
  
        if (!inst.isDrawing) {
          inst.enable();
          var zoom = inst.canvas.getZoom() || 1;
          // center point
          var centerPoint = new fabric.Circle({
            tempDrawShape: true,
            ignoreZoom: true,
            radius: 5 / zoom,
            fill: '#ff0000',
            stroke: 'rgba(0,0,0,0)',
            strokeWidth: 1 / zoom,
            left: (pointer.x),
            top: (pointer.y),
            // left: (pointer.x / inst.canvas.getZoom()),
            // top: (pointer.y / inst.canvas.getZoom()),
            // left: (o.e.layerX / inst.canvas.getZoom()),
            // top: (o.e.layerY / inst.canvas.getZoom()),
            selectable: false,
            hasBorders: false,
            hasControls: false,
            originX: 'center',
            originY: 'center',
            id: 'first_circle',
            strokeUniform: true,
            objectCaching: false
          });
          inst.tempPointsArray.push(centerPoint);
          inst.canvas.add(centerPoint)
  
          var borderPoint = new fabric.Circle({
            tempDrawShape: true,
            ignoreZoom: true,
            radius: 5 / zoom,
            fill: '#ff0000',
            stroke: 'rgba(0,0,0,0)',
            strokeWidth: 1 / zoom,
            left: (pointer.x),
            top: (pointer.y),
            // left: (pointer.x / inst.canvas.getZoom()),
            // top: (pointer.y / inst.canvas.getZoom()),
            // left: (o.e.layerX / inst.canvas.getZoom()),
            // top: (o.e.layerY / inst.canvas.getZoom()),
            selectable: false,
            hasBorders: false,
            hasControls: false,
            originX: 'center',
            originY: 'center',
            id: 'border_circle',
            strokeUniform: true,
            objectCaching: false
          });
          inst.tempPointsArray.push(borderPoint);
          inst.canvas.add(borderPoint)
  
          var radius = Math.sqrt(Math.pow(inst.tempPointsArray[0].get('left') - inst.tempPointsArray[1].get('left'), 2) + Math.pow(inst.tempPointsArray[0].get('top') - inst.tempPointsArray[1].get('top'), 2))
  
          var ellipse = new fabric.Circle({
            tempDrawShape: true,
            stroke: '#333333',
            strokeWidth: 1 / zoom,
            fill: 'rgba(204,204,204,0.3)',
            opacity: 1,
            radius: radius,
            top: inst.tempPointsArray[0].get('top') - radius,
            left: inst.tempPointsArray[0].get('left') - radius,
            selectable: false,
            hasBorders: true,
            hasControls: true,
            strokeUniform: true,
            objectCaching: false
          })
          inst.shape = ellipse;
          inst.canvas.add(ellipse);
          ellipse.canvasItem = inst.canvasItem;
        } else {
          inst.disable();
          inst.generateCircle();
        }
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
  
      Circle.prototype.generateCircle = function (pointArray) {
        var inst = this;
        var radius = Math.sqrt(Math.pow(inst.tempPointsArray[0].get('left') - inst.tempPointsArray[1].get('left'), 2) + Math.pow(inst.tempPointsArray[0].get('top') - inst.tempPointsArray[1].get('top'), 2))
  
        inst.canvas.remove(inst.shape);
  
        var ellipse = new fabric.HiCylinder({
          // stroke: '#7B7B7B',
          // // strokeWidth: 1,
          // fill: '#7B7B7B',
          opacity: 1,
          radius: radius,
          originX: 'center',
          originY: 'center',
          top: inst.tempPointsArray[0].get('top'),
          left: inst.tempPointsArray[0].get('left'),
          hasBorders: true,
          hasControls: true,
          strokeUniform: true,
          objectCaching: false,
          perPixelTargetFind: true
        })
        ellipse.on('selected', function (opt) {
          // var evt = opt.e;
          // var ellipse = inst.canvas.getActiveObject();
          // if (evt && evt.ctrlKey === true) {
          ellipse.cornerStyle = 'circle';
          ellipse.cornerColor = 'rgba(0,0,255,0.5)';
        });
        for (var prop in inst.otherProps) {
          ellipse[prop] = inst.otherProps[prop];
        }
  
        inst.shape = ellipse;
        ellipse.hiId = hiDraw.prototype.uniqueIdGenerater()
        ellipse.altitude = 5
        ellipse.scaleZ = 1
        ellipse.depth = 10
        ellipse.rotateX = 0
        ellipse.rotateZ = 0
        inst.canvas.add(ellipse).setActiveObject(ellipse);
        ellipse.canvasItem = inst.canvasItem;
  
        var centerX = inst.tempPointsArray[0].get('left');
        var centerY = inst.tempPointsArray[0].get('top');
        var borderX = inst.tempPointsArray[1].get('left');
        var borderY = inst.tempPointsArray[1].get('top');
        var distC = Math.sqrt(Math.pow(borderX - centerX - radius, 2) + Math.pow(borderY - centerY, 2))
        var cosTheta = (2 * Math.pow(radius, 2) - Math.pow(distC, 2)) / (2 * Math.pow(radius, 2))
        if (borderY - centerY > 0) {
          ellipse.borderPointTheta = Math.acos(cosTheta);
        } else {
          ellipse.borderPointTheta = Math.acos(cosTheta) * -1;
        }
  
        inst.tempPointsArray.forEach(function (point) {
          inst.canvas.remove(point);
        })
  
        inst.canvas.renderAll();
      }
  
      return Circle;
    }(this));
  
  
  })(typeof exports !== 'undefined' ? exports : this);