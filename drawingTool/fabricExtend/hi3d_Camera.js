(function(global) {

    // 'use strict';
  
    var fabric = global.fabric || (global.fabric = { });
  
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

    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), { hiId: this.hiId, altitude: this.altitude });
    },

    _render: function (ctx) {
        this.callSuper('_render', ctx);
        // this.perPixelTargetFind = true;
        // do not render if width/height are zeros or object is not visible
        if (this.width === 0 || this.height === 0 || !this.visible) return;

    }
});

fabric.HiCamera.fromObject = function (object, callback) {
    callback && callback(new fabric.HiCamera(object));
};

fabric.HiCamera.async = true;


hiDraw.prototype.HiCamera = (function () {

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
            // selectable: false,
            hasBorders: true,
            hasControls: false,
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