hiDraw.prototype.Polygon = (function () {
    function Polygon(canvas, options) {
        this.canvas = canvas;
        this.options = options;
        this.className = 'Circle';
        this.isDrawing = false;
        this.bindEvents();
    }

    Polygon.prototype.bindEvents = function () {
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
    }

    Polygon.prototype.unbindEvents = function () {
        var inst = this;
        inst.canvas.off('mouse:down');
        inst.canvas.off('mouse:move');
        inst.canvas.off('mouse:up');
        inst.canvas.off('object:moving');
    }


    Polygon.prototype.onMouseUp = function (o) {
        var inst = this;
        // inst.disable();
    };

    Polygon.prototype.onMouseMove = function (o) {
        var inst = this;
        if (!inst.isEnable()) {
            return;
        }

        var pointer = inst.canvas.getPointer(o.e);
        var activeObj = inst.canvas.getActiveObject();

        activeObj.stroke = 'red',
            activeObj.strokeWidth = 5;
        activeObj.fill = 'red';

        if (origX > pointer.x) {
            activeObj.set({
                left: Math.abs(pointer.x)
            });
        }

        if (origY > pointer.y) {
            activeObj.set({
                top: Math.abs(pointer.y)
            });
        }

        activeObj.set({
            rx: Math.abs(origX - pointer.x) / 2
        });
        activeObj.set({
            ry: Math.abs(origY - pointer.y) / 2
        });
        activeObj.setCoords();
        inst.canvas.renderAll();
    };

    Polygon.prototype.onMouseDown = function (o) {
        var inst = this;
        inst.enable();

        var pointer = inst.canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;

        var ellipse = new fabric.Ellipse({
            top: origY,
            left: origX,
            rx: 0,
            ry: 0,
            selectable: false,
            hasBorders: true,
            hasControls: true,
            strokeUniform: true
        });

        ellipse.on('selected', function () {
            console.log('selected a Circle');
            inst.enable();
        });
        ellipse.on('mousedown', function () {
            console.log('mousedown a Circle');
        });

        inst.canvas.add(ellipse).setActiveObject(ellipse);
    };

    Polygon.prototype.isEnable = function () {
        return this.isDrawing;
    }

    Polygon.prototype.enable = function () {
        this.isDrawing = true;
    }

    Polygon.prototype.disable = function () {
        this.isDrawing = false;
        this.unbindEvents();
        if (this.options && this.options.endDraw) {
            this.options.endDraw();
        }
    }


    return Polygon;
})()

// var polygon = canvas.getActiveObject();

// var polygonCenter = polygon.getCenterPoint();

// var translatedPoints = polygon.get('points').map(function(p) {
//   return { 
//     x: polygonCenter.x + p.x, 
//     y: polygonCenter.y + p.y
//   };
// });

// ---

// translatedPoints.forEach(function(p) {
//     canvas.getContext().strokeRect(p.x-5, p.y-5, 10, 10);
//   });