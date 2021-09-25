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
        return fabric.util.object.extend(this.callSuper('toObject'), { hiId: this.hiId, altitude: this.altitude, source: this.source });
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
    // var upIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAG9SURBVGhD7ZctTwNBEIaPD4lAIEhAIJFIBAKJRCCQCH4AEolHIPgJSEwTJAbCH8AACQgwfH+FAIIAgfelM8n20sLd3t6x18yTPJltk+7NXNuducQwDMPoVgbgKhz9eVVTWMQe/IKXcBzWjmF4BFnEh0QWMwVrA+/8KWTy9xIvJD7DWhQzCXnnmfSVRPVc4jucg9EyA3nHmax+A2m1SBazCKNjHjI5JtmpCPXOWS/BaGAymti1s/7NJ6iHAI/nf4dJaHKPzjqrnxLXYT+sHF50A7rJ+PomcRNWWgwb3RZ0kyiq7rMNuX/pDEHt1npChVL34/6DsDTcbv0gMbTaQHkdXi847NbaA9zjswy1mBMYdD7jSKEnUrpbl6VeJ9iwOQv/6tZlqb+AwvPZAtRufSixao8lshiOQLlZhulNO3nT5r088vOvkP+9tPqt0NzDJkcOjuFZO/VBm/fymPfzweezFciNQxWyBscy2kKvxFjgIHmW0RZiK8QbKyQ2rJDYsEJiwwqJDSskNrqmkD6JvkyLHPk58N16+gJH4C7cgZXDsTs9khfR+zmjR6IvfJ6faC6D0ID7zaVhGIYRPUnyDe15w+jjPoVKAAAAAElFTkSuQmCC';
    // var imgUp = document.createElement('img');
    // imgUp.src = upIcon;
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