hiDraw.prototype.Path = (function() {
    function Path(canvasItem, options, otherProps) {
        this.canvasItem = canvasItem;
        this.canvas = canvasItem.canvasView;
        this.options = options;
        this.otherProps = otherProps;
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

    Path.prototype.onMouseUp = function(o) {
        var inst = this;
        // var my_array = inst.canvas.getObjects();
        // var last_element = my_array[my_array.length - 1];
        // // console.log('polygon', last_element, last_element.get('type'))
        // if (last_element.get('type') === 'path') {
        //     if (typeof(inst.options.tag) != 'undefined') {
        //         last_element.tag = inst.options.tag
        //     }
        // }
        inst.generatePath()
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

    Path.prototype.generatePath = function (pointArray) {
        var inst = this;
        var my_array = inst.canvas.getObjects();
        var last_element = my_array[my_array.length - 1];
        // console.log('polygon', last_element, last_element.get('type'))
        if (last_element.get('type') === 'path') {
            if (typeof(inst.options.tag) != 'undefined') {
                last_element.tag = inst.options.tag
            }
            for (var prop in inst.otherProps) {
                last_element[prop] = inst.otherProps[prop];
            }
        }
        inst.canvas.renderAll();
    }

    return Path;
}(this));

hiDraw.prototype.getPathPoints = function(pathObj) {
    var points = []
    for (var i = 0 ;i < pathObj.path.length; i++) {
        if (pathObj.path[i][0] === 'Q') {
            // Bézier curve
            points.push([pathObj.path[i][3], pathObj.path[i][4]])
        } else if (pathObj.path[i][0] === 'C') {
            // cubic Bézier curve
            points.push([pathObj.path[i][5], pathObj.path[i][6]])
        } else if (pathObj.path[i][0] === 'M') {
            points.push([pathObj.path[i][1], pathObj.path[i][2]])
        } else if (pathObj.path[i][0] === 'L') {
            points.push([pathObj.path[i][1], pathObj.path[i][2]])
        }
    }
    return points
};

hiDraw.prototype.getPathPointsInt = function(pathObj) {
    var points = []
    for (var i = 0 ;i < pathObj.path.length; i++) {
        if (pathObj.path[i][0] === 'Q') {
            // Bézier curve
            points.push([parseInt(pathObj.path[i][3]), parseInt(pathObj.path[i][4])])
        } else if (pathObj.path[i][0] === 'C') {
            // cubic Bézier curve
            points.push([parseInt(pathObj.path[i][5]), parseInt(pathObj.path[i][6])])
        } else if (pathObj.path[i][0] === 'M') {
            points.push([parseInt(pathObj.path[i][1]), parseInt(pathObj.path[i][2])])
        } else if (pathObj.path[i][0] === 'L') {
            points.push([parseInt(pathObj.path[i][1]), parseInt(pathObj.path[i][2])])
        }
    }
    return points
};