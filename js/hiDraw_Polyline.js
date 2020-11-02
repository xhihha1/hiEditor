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
        inst.canvas.off('object:moving');
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
        var random = Math.floor(Math.random() * (inst.max - inst.min + 1)) + inst.min;
        var id = new Date().getTime() + random;
        var circle = new fabric.Circle({
            radius: 5,
            fill: '#ffffff',
            stroke: '#333333',
            strokeWidth: 0.5,
            left: (options.e.layerX/inst.canvas.getZoom()),
            top: (options.e.layerY/inst.canvas.getZoom()),
            selectable: false,
            hasBorders: false,
            hasControls: false,
            originX:'center',
            originY:'center',
            id:id,
            objectCaching:false
        });
        if(inst.pointArray.length == 0){
            circle.set({
                fill:'red'
            })
        }
        var points = [(options.e.layerX/inst.canvas.getZoom()),(options.e.layerY/inst.canvas.getZoom()),(options.e.layerX/inst.canvas.getZoom()),(options.e.layerY/inst.canvas.getZoom())];
        var line = new fabric.Line(points, {
            strokeWidth: 2,
            fill: '#999999',
            stroke: '#999999',
            class:'line',
            originX:'center',
            originY:'center',
            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false,
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
                stroke:'#333333',
                strokeWidth:1,
                fill: 'transparent',
                opacity: 0.3,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
                objectCaching:false
            });
            inst.canvas.remove(inst.activeShape);
            inst.canvas.add(Polyline);
            // inst.tempPolylineArray.push(Polyline);
            inst.activeShape = Polyline;
            inst.canvas.renderAll();
        }
        else{
            var polyPoint = [{x:(options.e.layerX/inst.canvas.getZoom()),y:(options.e.layerY/inst.canvas.getZoom())}];
            var Polyline = new fabric.Polyline(polyPoint,{
                stroke:'#333333',
                strokeWidth:1,
                fill: 'transparent',
                opacity: 0.3,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
                objectCaching:false
            });
            inst.activeShape = Polyline;
            inst.canvas.add(Polyline);
            // inst.tempPolylineArray.push(Polyline);
        }
        inst.activeLine = line;

        inst.pointArray.push(circle);
        inst.lineArray.push(line);

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
            console.log('point',point)
            inst.canvas.remove(point);
        })

        inst.lineArray.forEach(function(line){
            console.log('line',line)
            inst.canvas.remove(line);
        })
        console.log('///', inst.canvas.getActiveObject())
        console.log('activeShape',inst.activeShape, inst.activeLine)
        inst.canvas.remove(inst.activeShape).remove(inst.activeLine);
        var Polyline = new fabric.Polyline(points,{
            stroke:'#333333',
            strokeWidth:0.5,
            fill: 'transparent',
            opacity: 1,
            hasBorders: true,
            hasControls: true
        });
        inst.canvas.add(Polyline).setActiveObject(Polyline);
        Polyline.canvasItem = inst.canvasItem;

        inst.activeLine = null;
        inst.activeShape = null;
        inst.PolylineMode = false;
        inst.disable();
    }
    


    return Polyline;
})()

// var Polyline = canvas.getActiveObject();

// var PolylineCenter = Polyline.getCenterPoint();

// var translatedPoints = Polyline.get('points').map(function(p) {
//   return { 
//     x: PolylineCenter.x + p.x, 
//     y: PolylineCenter.y + p.y
//   };
// });

// ---

// translatedPoints.forEach(function(p) {
//     canvas.getContext().strokeRect(p.x-5, p.y-5, 10, 10);
//   });