hiDraw.prototype.Path = (function() {
    function Path(canvasItem, options) {
        this.canvasItem = canvasItem;
        this.canvas = canvasItem.canvasView;
        this.options = options;
        this.className = 'Path';
        this.isDrawing = false;
        this.bindEvents();
    }

    Path.prototype.bindEvents = function() {
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
        inst.canvas.on('path:created', function(o){
            var path = o.path;
            // ... do something with your path
            path.canvasItem = inst.canvasItem;
        });
        // inst.canvas.on('mouse:down', inst.onMouseDown);
        // inst.canvas.on('mouse:move', inst.onMouseMove);
        // inst.canvas.on('mouse:up', inst.onMouseUp);
        // inst.canvas.on('object:moving', inst.disable)
    }

    Path.prototype.unbindEvents = function() {
        var inst = this;
        // inst.canvas.off('mouse:down', inst.onMouseDown);
        // inst.canvas.off('mouse:move', inst.onMouseMove);
        // inst.canvas.off('mouse:up', inst.onMouseUp);
        // inst.canvas.off('object:moving', inst.disable)
        inst.canvas.off('mouse:down');
        inst.canvas.off('mouse:move');
        inst.canvas.off('mouse:up');
        inst.canvas.off('object:moving');
    }

    Path.prototype.onMouseUp = function(o) {
        var inst = this;
        inst.disable();
    };

    Path.prototype.onMouseMove = function(o) {
        var inst = this;
        if (!inst.isEnable()) {
            return;
        }

        // var pointer = inst.canvas.getPointer(o.e);
        // var activeObj = inst.canvas.getActiveObject();

        // activeObj.stroke = 'red',
        //     activeObj.strokeWidth = 5;
        // activeObj.fill = 'red';


    };

    Path.prototype.onMouseDown = function(o) {
        var inst = this;
        inst.enable();

        var pointer = inst.canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
    };

    Path.prototype.isEnable = function() {
        return this.isDrawing;
    }

    Path.prototype.enable = function() {
        this.isDrawing = true;
    }

    Path.prototype.disable = function() {
        this.isDrawing = false;
        this.unbindEvents();
        if(this.options && this.options.endDraw){
            this.options.endDraw();
        }
    }

    return Path;
}(this));