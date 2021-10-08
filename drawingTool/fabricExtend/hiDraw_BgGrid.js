(function (global) {

  // 'use strict';
  hiDraw.prototype.BgGrid = function (show) {
    if (show) {
      this.defaultOptions.showGridAxis = show
    } else {
      if (typeof this.defaultOptions.showGridAxis !== 'undefined') {
        this.defaultOptions.showGridAxis = !this.defaultOptions.showGridAxis
      } else {
        this.defaultOptions.showGridAxis = true
      }
    }
    showaxis = this.defaultOptions.showGridAxis
    const tempCanvasId = this.defaultOptions.gridAxis.canvasId || 'tempaxis'
    if (showaxis) {
      var canvasTemplate
      if (document.getElementById(tempCanvasId)) {
        canvasTemplate = document.getElementById(tempCanvasId)
      } else {
        canvasTemplate = document.createElement('canvas')
        canvasTemplate.id = tempCanvasId
        document.getElementById(this.defaultOptions.canvasViewId).parentNode.appendChild(canvasTemplate)
      }
      canvasTemplate.style.position = 'absolute'
      canvasTemplate.style.top = '0px'
      canvasTemplate.style.left = '0px'
      canvasTemplate.style.zIndex = '-10'
      canvasTemplate.style.pointerEvents = 'none'
      canvasTemplate.width = document.getElementById(this.defaultOptions.canvasViewId).width
      canvasTemplate.height = document.getElementById(this.defaultOptions.canvasViewId).height
      var ctx = canvasTemplate.getContext("2d");
      var canvas = this.canvasView;
      var canvasZoom = canvas.getZoom();
      var lt = fabric.util.transformPoint({
        x: 0,
        y: 0
      }, fabric.util.invertTransform(canvas.viewportTransform))
      var unitWidth = canvasZoom
      var shiftUnitX = (lt.x % 10) < 0 ? Math.abs(lt.x % 10) : -1 * Math.abs(lt.x % 10);
      var shiftPixelX = shiftUnitX * unitWidth
      var shiftUnitY = (lt.y % 10) < 0 ? Math.abs(lt.y % 10) : -1 * Math.abs(lt.y % 10);
      var shiftPixelY = shiftUnitY * unitWidth
      var x = shiftPixelX,
        y = shiftPixelY;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(200,200,200, 0.9)'
      while (x < canvasTemplate.width) {
        var p = fabric.util.transformPoint({
          x: x,
          y: 0
        }, fabric.util.invertTransform(canvas.viewportTransform))
        if (p.x < unitWidth / 2 && p.x > -1 * (unitWidth / 2) ) {
          ctx.lineWidth = 2;
        } else {
          ctx.lineWidth = 1;
        }
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasTemplate.height);
        ctx.stroke();
        x += (10 * canvasZoom)
      }
      while (y < canvasTemplate.height) {
        var p = fabric.util.transformPoint({
          x: 0,
          y: y
        }, fabric.util.invertTransform(canvas.viewportTransform))
        if (p.y < unitWidth / 2 && p.y > -1 * (unitWidth / 2) ) {
          ctx.lineWidth = 2;
        } else {
          ctx.lineWidth = 1;
        }
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasTemplate.width, y);
        ctx.stroke();
        y += (10 * canvasZoom)
      }
    } else {
      var canvasTemplate = document.getElementById(tempCanvasId)
      if (canvasTemplate) {
        var ctx = canvasTemplate.getContext("2d");
        ctx.clearRect(0, 0, canvasTemplate.width, canvasTemplate.height);
      }
    }
    return this;
  }

})(typeof exports !== 'undefined' ? exports : this);