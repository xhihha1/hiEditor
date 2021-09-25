hiDraw.prototype.HiFormatControlUtil = (function (global) {
    
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
    
    
    var controls = {}
    controls.scalingEqually = wrapWithFireEvent('scaling', wrapWithFixedAnchor( scaleObject));
    return controls
})(typeof exports !== 'undefined' ? exports : this);