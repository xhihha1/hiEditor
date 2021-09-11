hiDraw.prototype.Polyline = (function () {
    function Polyline(canvasItem, options) {
        this.canvasItem = canvasItem;
        this.canvas = canvasItem.canvasView;
        this.options = options;
        this.className = 'Circle';
        this.isDrawing = false;
        this.bindEvents();

        this.min = 99;
        this.max = 999999;
        this.PolylineMode = true;
        this.pointArray = new Array();
        this.lineArray = new Array();
        this.tempPolylineArray = new Array();
        this.activeLine;
        this.activeShape = false;
    }

    Polyline.prototype.bindEvents = function () {
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

    Polyline.prototype.unbindEvents = function () {
        var inst = this;
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


    Polyline.prototype.onMouseUp = function (o) {
        var inst = this;
        // inst.disable();
    };

    Polyline.prototype.onMouseMove = function (options) {
        var inst = this;
        if (!inst.isEnable()) {
            return;
        }


        if(inst.activeLine && inst.activeLine.class == "line"){
            var pointer = inst.canvas.getPointer(options.e);
            inst.activeLine.set({ x2: pointer.x, y2: pointer.y });

            var points = inst.activeShape.get("points");
            points[inst.pointArray.length] = {
                x:pointer.x,
                y:pointer.y
            }
            inst.activeShape.set({
                points: points
            });
            inst.canvas.renderAll();
        }
        inst.canvas.renderAll();
    };

    Polyline.prototype.onMouseDown = function (o) {
        var inst = this;
        inst.enable();
        var lastIdx = inst.pointArray.length - 1;
        if(lastIdx > 0 && o.target && o.target.id == inst.pointArray[lastIdx].id){
            inst.generatePolyline(inst.pointArray);
        }
        if(inst.PolylineMode){
            inst.addPoint(o);
        }
    };

    Polyline.prototype.isEnable = function () {
        return this.isDrawing;
    }

    Polyline.prototype.enable = function () {
        this.isDrawing = true;
    }

    Polyline.prototype.disable = function () {
        this.isDrawing = false;
        this.unbindEvents();
        if (this.options && this.options.endDraw) {
            this.options.endDraw();
        }
    }

    Polyline.prototype.addPoint = function(options) {
        var inst = this;
        var pointer = inst.canvas.getPointer(options.e);
        var random = Math.floor(Math.random() * (inst.max - inst.min + 1)) + inst.min;
        var id = new Date().getTime() + random;
        var zoom = inst.canvas.getZoom() || 1;
        var circle = new fabric.Circle({
            tempDrawShape: true,
            radius: 5 / zoom,
            fill: '#ffffff',
            stroke: 'rgba(0,0,0,0)',
            strokeWidth: 1 / zoom,
            left: (pointer.x),
            top: (pointer.y),
            // left: (options.e.layerX/inst.canvas.getZoom()),
            // top: (options.e.layerY/inst.canvas.getZoom()),
            selectable: false,
            hasBorders: false,
            hasControls: false,
            originX:'center',
            originY:'center',
            id:id,
            strokeUniform: true,
            objectCaching:false
        });
        if(inst.pointArray.length == 0){
            circle.set({
                fill:'red'
            })
        }
        // var points = [
        //     (options.e.layerX/inst.canvas.getZoom()),
        //     (options.e.layerY/inst.canvas.getZoom()),
        //     (options.e.layerX/inst.canvas.getZoom()),
        //     (options.e.layerY/inst.canvas.getZoom())
        // ];
        var points = [
            (pointer.x), 
            (pointer.y), 
            (pointer.x), 
            (pointer.y)
        ];
        var line = new fabric.Line(points, {
            tempDrawShape: true,
            strokeWidth: 2 / zoom,
            fill: '#999999',
            stroke: '#999999',
            class:'line',
            originX:'center',
            originY:'center',
            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false,
            strokeUniform: true,
            objectCaching:false
        });
        

        if(inst.activeShape){
            var pos = inst.canvas.getPointer(options.e);
            var points = inst.activeShape.get("points");
            points.push({
                x: pos.x,
                y: pos.y
            });
            var Polyline = new fabric.Polyline(points,{
                tempDrawShape: true,
                stroke:'#333333',
                strokeWidth:1 / zoom,
                fill: 'transparent',
                opacity: 0.3,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
                strokeUniform: true,
                objectCaching:false
            });
            inst.canvas.remove(inst.activeShape);
            inst.canvas.add(Polyline);
            // inst.tempPolylineArray.push(Polyline);
            inst.activeShape = Polyline;
            inst.canvas.renderAll();
        }
        else{
            // var polyPoint = [{
            //     x:(options.e.layerX/inst.canvas.getZoom()),
            //     y:(options.e.layerY/inst.canvas.getZoom())
            // }];
            var polyPoint = [{
                x: (pointer.x),
                y: (pointer.y)
            }];
            var Polyline = new fabric.Polyline(polyPoint,{
                tempDrawShape: true,
                stroke:'#333333',
                strokeWidth:1 / zoom,
                fill: 'transparent',
                opacity: 0.3,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
                strokeUniform: true,
                objectCaching:false
            });
            inst.activeShape = Polyline;
            inst.canvas.add(Polyline);
            // inst.tempPolylineArray.push(Polyline);
        }
        inst.activeLine = line;

        
        inst.pointArray.push(circle);
        inst.lineArray.push(line);

        inst.pointArray.forEach(function (point, index) {
            if (index == inst.pointArray.length - 1){
                point.set({
                    fill:'red'
                })
            } else {
                point.set({
                    fill:'transparent'
                })
            }
        })

        inst.canvas.add(line);
        inst.canvas.add(circle);
    }

    Polyline.prototype.generatePolyline = function (pointArray) {
        var inst = this;
        
        var points = new Array();
        pointArray.forEach(function(point){
            points.push({
                x:point.left,
                y:point.top
            });
            // console.log('point',point)
            inst.canvas.remove(point);
        })

        inst.lineArray.forEach(function(line){
            // console.log('line',line)
            inst.canvas.remove(line);
        })
        // console.log('///', inst.canvas.getActiveObject())
        // console.log('activeShape',inst.activeShape, inst.activeLine)
        inst.canvas.remove(inst.activeShape).remove(inst.activeLine);
        var Polyline = new fabric.Polyline(points,{
            // stroke: '#333333',
            // strokeWidth: 1,
            fill: 'rgba(0,0,0,0)',
            opacity: 1,
            hasBorders: true,
            hasControls: true,
            objectCaching: false
        });
        Polyline.on('selected', function (opt) {
            var evt = opt.e;
            var Polyline = inst.canvas.getActiveObject();
            // if (evt && evt.ctrlKey === true) {
            //     Polyline.cornerStyle = 'circle';
            //     Polyline.cornerColor = 'rgba(0,0,255,0.5)';
            //     Polyline.controls = inst.customControl(Polyline)
            // } else {
            //     Polyline.cornerColor = 'rgb(178,204,255)';
            //     Polyline.cornerStyle = 'rect';
            //     Polyline.controls = fabric.Object.prototype.controls;
            // }
            if (evt && evt.shiftKey === true) {
                Polyline.editShape = true;
                Polyline.hasControls = false;
                Polyline.hasBorders = false;
                Polyline.selectable = false;
                controlOverride.polylineAddPoints(Polyline)
                // drawEdge(inst.canvas, polygon)
                // drawPoints(inst.canvas, polygon)
            } 
        });
        inst.canvas.add(Polyline).setActiveObject(Polyline);
        Polyline.canvasItem = inst.canvasItem;

        inst.activeLine = null;
        inst.activeShape = null;
        inst.PolylineMode = false;
        inst.disable();
    }
    
    Polyline.prototype.customControl = function (Polyline) {
        var lastControl = Polyline.points.length - 1;
        return Polyline.points.reduce(function (acc, point, index) {
            acc['p' + index] = new fabric.Control({
                mouseDownHandler: mouseDownHandler,
                positionHandler: polygonPositionHandler,
                actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
                actionName: 'modifyPolygon',
                pointIndex: index
            });
            return acc;
        }, {});
    }

    // define a function that can locate the controls.
    // this function will be used both for drawing and for interaction.
    function polygonPositionHandler(dim, finalMatrix, fabricObject) {
        var x = (fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x),
            y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
        return fabric.util.transformPoint({
                x: x,
                y: y
            },
            fabric.util.multiplyTransformMatrices(
                fabricObject.canvas.viewportTransform,
                fabricObject.calcTransformMatrix()
            )
        );
    }

    // define a function that will define what the control does
    // this function will be called on every mouse move after a control has been
    // clicked and is being dragged.
    // The function receive as argument the mouse event, the current trasnform object
    // and the current position in canvas coordinate
    // transform.target is a reference to the current object being transformed,
    function actionHandler(eventData, transform, x, y) {
        var polygon = transform.target,
            currentControl = polygon.controls[polygon.__corner],
            mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
            polygonBaseSize = polygon._getNonTransformedDimensions(),
            size = polygon._getTransformedDimensions(0, 0),
            finalPointPosition = {
                x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
                y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
            };
        polygon.points[currentControl.pointIndex] = finalPointPosition;
        return true;
    }

    // define a function that can keep the polygon in the same position when we change its
    // width/height/top/left.
    function anchorWrapper(anchorIndex, fn) {
        return function (eventData, transform, x, y) {
            var fabricObject = transform.target,
                absolutePoint = fabric.util.transformPoint({
                    x: (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x),
                    y: (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y),
                }, fabricObject.calcTransformMatrix()),
                actionPerformed = fn(eventData, transform, x, y),
                newDim = fabricObject._setPositionDimensions({}),
                polygonBaseSize = fabricObject._getNonTransformedDimensions(),
                newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x,
                newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
            // console.log('absolutePoint', absolutePoint)
            fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
            return actionPerformed;
        }
    }

    function mouseDownHandler(eventData, target) {
        if (eventData.altKey) {
        } else {
        }
    }

    return Polyline;
})()
