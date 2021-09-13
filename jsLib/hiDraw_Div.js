fabric.DivHtml = fabric.util.createClass(fabric.Line, {

  type: 'divHtml',

  initialize: function (element, options) {
    options || (options = {});
    this.callSuper('initialize', element, options);
    // console.log('initialize', element, options)
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'));
  },

  _render: function (ctx) {
    // this.callSuper('_render', ctx);

    // do not render if width/height are zeros or object is not visible
    if (this.width === 0 || this.height === 0 || !this.visible) return;

    // ctx.save();

    // var xDiff = this.x2 - this.x1;
    // var yDiff = this.y2 - this.y1;
    // var angle = Math.atan2(yDiff, xDiff);
    // ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
    // ctx.rotate(angle);
    // ctx.beginPath();
    // //move 10px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
    // ctx.moveTo(10, 0);
    // ctx.lineTo(-20, 15);
    // ctx.lineTo(-20, -15);
    // ctx.closePath();
    // ctx.fillStyle = this.stroke;
    // ctx.fill();

    // ctx.restore();
    // --------------create div 需要在 new object 設定 objectCaching: false，否則不會重新執行render，就無法動態改變 div位置
    if (!this.divId) {
      this.divId = 'A' + Math.round(Math.random() * 500)
    }
    var canvasTemplate
    var divId = this.divId
    if (document.getElementById(divId)) {
      canvasTemplate = document.getElementById(divId)
    } else {
      canvasTemplate = document.createElement('div')
      canvasTemplate.id = divId
      this.canvas.lowerCanvasEl.parentNode.appendChild(canvasTemplate)
    }
    canvasTemplate.style.position = 'absolute'
    canvasTemplate.style.top = (this.top - Math.abs(this.y1 - this.y2) / 2) + 'px'
    canvasTemplate.style.left = (this.left - Math.abs(this.x1 - this.x2) / 2) + 'px'
    canvasTemplate.style.width = this.width + 'px'
    canvasTemplate.style.height = this.height + 'px'
    canvasTemplate.style.background = 'rgba(0,0,0,0.3)'
    canvasTemplate.style.pointerEvents = 'none'
    this.divHtml = canvasTemplate 

    if(!this.hiDrawEvnt){ this.hiDrawEvnt = {} }
    this.hiDrawEvnt.objRemove = function(opt) {
        if(opt.target && opt.target.divHtml) {
            opt.target.divHtml.parentNode.removeChild(opt.target.divHtml)
        }
    }
  }
});

fabric.DivHtml.fromObject = function (object, callback) {
  callback && callback(new fabric.DivHtml([object.x1, object.y1, object.x2, object.y2], object));
};

fabric.DivHtml.async = true;


hiDraw.prototype.DivHtml = (function() {
    function DivHtml(canvasItem, options) {
        this.canvasItem = canvasItem;
        this.canvas = canvasItem.canvasView;
        this.options = options;
        this.className = 'DivHtml';
        this.isDrawing = false;
        this.bindEvents();
    }

    DivHtml.prototype.bindEvents = function() {
        var inst = this;
        inst.canvas.on('mouse:down', function(o) {
            inst.onMouseDown(o);
        });
        inst.canvas.on('mouse:move', function(o) {
            inst.onMouseMove(o);
        });
        inst.canvas.on('mouse:up', function(o) {
            inst.onMouseUp(o);
        });
        inst.canvas.on('object:moving', function(o) {
            inst.disable();
        })
    }

    DivHtml.prototype.unbindEvents = function() {
        var inst = this;
        inst.canvas.off('mouse:down');
        inst.canvas.off('mouse:move');
        inst.canvas.off('mouse:up');
        inst.canvas.off('object:moving');
    }

    DivHtml.prototype.onMouseUp = function(o) {
        var inst = this;
        if (inst.isEnable()) {
            inst.disable();
        }
    };

    DivHtml.prototype.onMouseMove = function(o) {
        var inst = this;
        if (!inst.isEnable()) {
            return;
        }

        var pointer = inst.canvas.getPointer(o.e);
        var activeObj = inst.canvas.getActiveObject();

        activeObj.set({
            x2: pointer.x,
            y2: pointer.y
        });
        activeObj.setCoords();
        inst.canvas.renderAll();
    };

    DivHtml.prototype.onMouseDown = function(o) {
        var inst = this;
        inst.enable();

        var pointer = inst.canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;

        var points = [pointer.x, pointer.y, pointer.x, pointer.y];
        var line = new fabric.DivHtml(points, {
            strokeWidth: 5,
            stroke: 'red',
            fill: 'red',
            originX: 'center',
            originY: 'center',
            selectable: false,
            hasBorders: true,
            hasControls: true,
            strokeUniform: true
        });
        inst.canvas.add(line).setActiveObject(line);
        line.canvasItem = inst.canvasItem;
    };

    DivHtml.prototype.isEnable = function() {
        return this.isDrawing;
    }

    DivHtml.prototype.enable = function() {
        this.isDrawing = true;
    }

    DivHtml.prototype.disable = function() {
        this.isDrawing = false;
        this.unbindEvents();
        if(this.options && this.options.endDraw){
            this.options.endDraw();
        }
    }

    return DivHtml;
}());