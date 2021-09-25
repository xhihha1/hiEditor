(function(global) {

    // 'use strict';
  
    var fabric = global.fabric || (global.fabric = { });
  
    if (fabric.HiFormatCollada) {
      fabric.warn('fabric.HiFormatCollada is already defined');
      return;
    }

fabric.HiFormatCollada = fabric.util.createClass(fabric.Rect, {

    type: 'hiFormatCollada',

    initialize: function (element, options) {
        // console.log(this) // 屬性都寫在 this 中
        options || (options = {});
        this.callSuper('initialize', element, options);
    },

    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            hiId: this.hiId,
            altitude: this.altitude,
            source: this.source,
            scaleZ: this.scaleZ
        });
    },

    _render: function (ctx) {
        this.callSuper('_render', ctx);
        // this.perPixelTargetFind = true;
        // do not render if width/height are zeros or object is not visible
        if (this.width === 0 || this.height === 0 || !this.visible) return;
        ctx.font = "16px Arial";
        ctx.fillText("Obj", 0, 0);

    }
});

fabric.HiFormatCollada.fromObject = function (object, callback) {
    callback && callback(new fabric.HiFormatCollada(object));
};

fabric.HiFormatCollada.async = true;

// ---------------------------------------
    var upIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAG9SURBVGhD7ZctTwNBEIaPD4lAIEhAIJFIBAKJRCCQCH4AEolHIPgJSEwTJAbCH8AACQgwfH+FAIIAgfelM8n20sLd3t6x18yTPJltk+7NXNuducQwDMPoVgbgKhz9eVVTWMQe/IKXcBzWjmF4BFnEh0QWMwVrA+/8KWTy9xIvJD7DWhQzCXnnmfSVRPVc4jucg9EyA3nHmax+A2m1SBazCKNjHjI5JtmpCPXOWS/BaGAymti1s/7NJ6iHAI/nf4dJaHKPzjqrnxLXYT+sHF50A7rJ+PomcRNWWgwb3RZ0kyiq7rMNuX/pDEHt1npChVL34/6DsDTcbv0gMbTaQHkdXi847NbaA9zjswy1mBMYdD7jSKEnUrpbl6VeJ9iwOQv/6tZlqb+AwvPZAtRufSixao8lshiOQLlZhulNO3nT5r088vOvkP+9tPqt0NzDJkcOjuFZO/VBm/fymPfzweezFciNQxWyBscy2kKvxFjgIHmW0RZiK8QbKyQ2rJDYsEJiwwqJDSskNrqmkD6JvkyLHPk58N16+gJH4C7cgZXDsTs9khfR+zmjR6IvfJ6faC6D0ID7zaVhGIYRPUnyDe15w+jjPoVKAAAAAElFTkSuQmCC';
    var imgUp = document.createElement('img');
    imgUp.src = upIcon;
    fabric.HiFormatCollada.prototype.transparentCorners = false;
    fabric.HiFormatCollada.prototype.controls = {}
    fabric.HiFormatCollada.prototype.controls.upright = new fabric.Control({
        x: 1,
        y: 1,
        offsetX: 2,
        offsetY: 2,
        cursorStyle: 'pointer',
        actionHandler: wrapWithFireEvent('scaling', wrapWithFixedAnchor( scaleObject)),
        render: renderUpIcon,
        cornerSize: 24
      });

      
      fabric.HiFormatCollada.prototype.controls.tl = new fabric.Control({
    x: -0.5,
    y: -0.5,
    // cursorStyleHandler: scaleStyleHandler,
    actionHandler: wrapWithFireEvent('scaling', wrapWithFixedAnchor( scaleObject))
  });

  fabric.HiFormatCollada.prototype.controls.tr = new fabric.Control({
    x: 0.5,
    y: -0.5,
    // cursorStyleHandler: scaleStyleHandler,
    actionHandler: wrapWithFireEvent('scaling', wrapWithFixedAnchor( scaleObject))
  });

  fabric.HiFormatCollada.prototype.controls.bl = new fabric.Control({
    x: -0.5,
    y: 0.5,
    // cursorStyleHandler: scaleStyleHandler,
    actionHandler: wrapWithFireEvent('scaling', wrapWithFixedAnchor( scaleObject))
  });

  fabric.HiFormatCollada.prototype.controls.br = new fabric.Control({
    x: 0.5,
    y: 0.5,
    // cursorStyleHandler: scaleStyleHandler,
    actionHandler: wrapWithFireEvent('scaling', wrapWithFixedAnchor( scaleObject))
  });

  fabric.HiFormatCollada.prototype.controls.mtr = new fabric.Control({
    x: 0,
    y: -0.5,
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
    offsetY: -40,
    withConnection: true,
    actionName: 'rotate',
  });

      var sign = (Math.sign || function(x) { return ((x > 0) - (x < 0)) || +x; });

      function renderUpIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(imgUp, -size / 2, -size / 2, size, size);
        ctx.restore();
      }

      function wrapWithFireEvent(eventName, actionHandler) {
        return function(eventData, transform, x, y) {
          var actionPerformed = actionHandler(eventData, transform, x, y);
        //   if (actionPerformed) {
        //     fireEvent(eventName, commonEventInfo(eventData, transform, x, y));
        //   }
          return actionPerformed;
        };
      }

      function wrapWithFixedAnchor(actionHandler) {
        return function(eventData, transform, x, y) {
          var target = transform.target, centerPoint = target.getCenterPoint(),
              constraint = target.translateToOriginPoint(centerPoint, transform.originX, transform.originY),
              actionPerformed = actionHandler(eventData, transform, x, y);
          target.setPositionByOrigin(constraint, transform.originX, transform.originY);
          return actionPerformed;
        };
      }
      function scaleObject(eventData, transform, x, y, options) {
        options = options || {};
        var target = transform.target,
            lockScalingX = target.lockScalingX, lockScalingY = target.lockScalingY,
            by = options.by, newPoint, scaleX, scaleY, dim,
            scaleProportionally = scaleIsProportional(eventData, target),
            forbidScaling = scalingIsForbidden(target, by, scaleProportionally),
            signX, signY, signZ, gestureScale = transform.gestureScale;
    
        if (forbidScaling) {
          return false;
        }
        if (gestureScale) {
          scaleX = transform.scaleX * gestureScale;
          scaleY = transform.scaleY * gestureScale;
        }
        else {
          newPoint = getLocalPoint(transform, transform.originX, transform.originY, x, y);
          // use of sign: We use sign to detect change of direction of an action. sign usually change when
          // we cross the origin point with the mouse. So a scale flip for example. There is an issue when scaling
          // by center and scaling using one middle control ( default: mr, mt, ml, mb), the mouse movement can easily
          // cross many time the origin point and flip the object. so we need a way to filter out the noise.
          // This ternary here should be ok to filter out X scaling when we want Y only and vice versa.
          signX = by !== 'y' ? sign(newPoint.x) : 1;
          signY = by !== 'x' ? sign(newPoint.y) : 1;
          if (!transform.signX) {
            transform.signX = signX;
          }
          if (!transform.signY) {
            transform.signY = signY;
          }
    
          if (target.lockScalingFlip &&
            (transform.signX !== signX || transform.signY !== signY)
          ) {
            return false;
          }
    
          dim = target._getTransformedDimensions();
          // missing detection of flip and logic to switch the origin
          if (scaleProportionally && !by) {
            // uniform scaling
            var distance = Math.abs(newPoint.x) + Math.abs(newPoint.y),
                original = transform.original,
                originalDistance = Math.abs(dim.x * original.scaleX / target.scaleX) +
                  Math.abs(dim.y * original.scaleY / target.scaleY),
                scale = distance / originalDistance;
            scaleX = original.scaleX * scale;
            scaleY = original.scaleY * scale;
          }
          else {
            scaleX = Math.abs(newPoint.x * target.scaleX / dim.x);
            scaleY = Math.abs(newPoint.y * target.scaleY / dim.y);
          }
          // if we are scaling by center, we need to double the scale
          if (isTransformCentered(transform)) {
            scaleX *= 2;
            scaleY *= 2;
          }
          if (transform.signX !== signX && by !== 'y') {
            transform.originX = opposite[transform.originX];
            scaleX *= -1;
            transform.signX = signX;
          }
          if (transform.signY !== signY && by !== 'x') {
            transform.originY = opposite[transform.originY];
            scaleY *= -1;
            transform.signY = signY;
          }
        }
        // minScale is taken are in the setter.
        var oldScaleX = target.scaleX, oldScaleY = target.scaleY;
        if (!by) {
          !lockScalingX && target.set('scaleX', scaleX);
          !lockScalingY && target.set('scaleY', scaleY);
          !lockScalingX && target.set('scaleZ', scaleX);
          console.log('A-------------------')
        }
        else {
          // forbidden cases already handled on top here.
          by === 'x' && target.set('scaleX', scaleX);
          by === 'y' && target.set('scaleY', scaleY);
          by === 'x' && target.set('scaleZ', scaleX);
          console.log('B-------------------')
        }
        return oldScaleX !== target.scaleX || oldScaleY !== target.scaleY;
      }

      function scaleIsProportional(eventData, fabricObject) {
        var canvas = fabricObject.canvas, uniScaleKey = canvas.uniScaleKey,
            uniformIsToggled = eventData[uniScaleKey];
        return (canvas.uniformScaling && !uniformIsToggled) ||
        (!canvas.uniformScaling && uniformIsToggled);
      }

      function scalingIsForbidden(fabricObject, by, scaleProportionally) {
        var lockX = fabricObject.lockScalingX, lockY = fabricObject.lockScalingY;
        if (lockX && lockY) {
          return true;
        }
        if (!by && (lockX || lockY) && scaleProportionally) {
          return true;
        }
        if (lockX && by === 'x') {
          return true;
        }
        if (lockY && by === 'y') {
          return true;
        }
        return false;
      }

      function getLocalPoint(transform, originX, originY, x, y) {
        var target = transform.target,
            control = target.controls[transform.corner],
            zoom = target.canvas.getZoom(),
            padding = target.padding / zoom,
            localPoint = target.toLocalPoint(new fabric.Point(x, y), originX, originY);
        if (localPoint.x >= padding) {
          localPoint.x -= padding;
        }
        if (localPoint.x <= -padding) {
          localPoint.x += padding;
        }
        if (localPoint.y >= padding) {
          localPoint.y -= padding;
        }
        if (localPoint.y <= padding) {
          localPoint.y += padding;
        }
        localPoint.x -= control.offsetX;
        localPoint.y -= control.offsetY;
        return localPoint;
      }
      function isTransformCentered(transform) {
        return transform.originX === 'center' && transform.originY === 'center';
      }
    
// ---------------------------------------


hiDraw.prototype.HiFormatCollada = (function () {

    function Circle(canvasItem, options, otherProps) {
        this.canvasItem = canvasItem;
        this.canvas = canvasItem.canvasView;
        this.options = options;
        this.otherProps = otherProps;
        this.className = 'HiFormatCollada';
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

        var prop = this.canvasItem.mergeDeep({
            strokeWidth: 2,
            stroke: '#7B7B7B',
            fill: '#7B7B7B',
            opacity: 1,
            width: 100,
            height: 100,
            top: origY,
            left: origX,
            originX: 'center',
            originY: 'center',
            // selectable: false,
            hasBorders: true,
            hasControls: true,
            strokeUniform: true
        }, this.otherProps)
        // this.source = {}  // obj: url
        var ellipse = new fabric.HiFormatCollada(prop)

        // ellipse.on('selected', function () {
        //     console.log('selected a Circle');
        //     // inst.enable();
        // });
        // ellipse.on('mousedown', function () {
        //     console.log('mousedown a Circle');
        // });
        ellipse.altitude = 0
        ellipse.scaleZ = 1
        ellipse.hiId = new Date().getTime()
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