fabric.Object.prototype.objectCaching = false;

var design = new fabric.Canvas('design', {
    containerClass: 'design'
});
var minimap = new fabric.Canvas('minimap', {
    containerClass: 'minimap',
    selection: false
});

design.loadFromJSON({
    "version": "3.6.3",
    "objects": [{
        "type": "rect",
        "version": "3.6.3",
        "left": 513,
        "top": 160,
        "width": 50,
        "height": 50,
        "fill": "#8d476b",
        "opacity": 0.8
    }, {
        "type": "circle",
        "version": "3.6.3",
        "left": 174,
        "top": 166,
        "width": 100,
        "height": 100,
        "fill": "#383881",
        "opacity": 0.8,
        "radius": 50,
        "startAngle": 0,
        "endAngle": 6.283185307179586
    }, {
        "type": "triangle",
        "version": "3.6.3",
        "left": 330,
        "top": 242,
        "width": 50,
        "height": 50,
        "fill": "#c8eff0",
        "opacity": 0.8
    }, {
        "type": "line",
        "version": "3.6.3",
        "left": 328,
        "top": 300,
        "width": 150,
        "height": 100,
        "stroke": "#98d727",
        "x1": -75,
        "x2": 75,
        "y1": -50,
        "y2": 50
    }, {
        "type": "polygon",
        "version": "3.6.3",
        "left": 44,
        "top": 257,
        "width": 385,
        "height": 245,
        "fill": "#6aefb4",
        "points": [{
            "x": 185,
            "y": 0
        }, {
            "x": 250,
            "y": 100
        }, {
            "x": 385,
            "y": 170
        }, {
            "x": 0,
            "y": 245
        }]
    }, {
        "type": "textbox",
        "version": "3.6.3",
        "left": 254,
        "top": 195,
        "width": 300,
        "height": 75.03,
        "fill": "#049c82",
        "angle": -9,
        "text": "Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor ",
        "fontSize": 20,
        "fontWeight": "",
        "fontFamily": "helvetica",
        "minWidth": 20,
        "splitByGrapheme": false,
        "styles": {}
    }, {
        "type": "i-text",
        "version": "3.6.3",
        "left": 348,
        "top": 326,
        "width": 598.13,
        "height": 150.06,
        "fill": "#d15803",
        "scaleX": 0.5,
        "scaleY": 0.5,
        "angle": 3,
        "text": "Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt",
        "fontWeight": "",
        "fontFamily": "helvetica",
        "styles": {}
    }, {
        "type": "text",
        "version": "3.6.3",
        "left": 32,
        "top": 438,
        "width": 598.13,
        "height": 254.93,
        "fill": "#69c5c5",
        "scaleX": 0.5,
        "scaleY": 0.5,
        "angle": 4,
        "text": "Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\nUt enim ad mini",
        "fontWeight": "",
        "fontFamily": "helvetica",
        "styles": {}
    }, {
        "type": "rect",
        "version": "3.6.3",
        "left": 175,
        "top": 105,
        "width": 50,
        "height": 50,
        "fill": "#761c05",
        "opacity": 0.8
    }, {
        "type": "circle",
        "version": "3.6.3",
        "left": 187,
        "top": 6,
        "width": 100,
        "height": 100,
        "fill": "#360560",
        "opacity": 0.8,
        "radius": 50,
        "startAngle": 0,
        "endAngle": 6.283185307179586
    }, {
        "type": "triangle",
        "version": "3.6.3",
        "left": 284,
        "top": 390,
        "width": 50,
        "height": 50,
        "fill": "#fe047d",
        "opacity": 0.8
    }, {
        "type": "line",
        "version": "3.6.3",
        "left": 290,
        "top": 434,
        "width": 150,
        "height": 100,
        "stroke": "#ad7cee",
        "x1": -75,
        "x2": 75,
        "y1": -50,
        "y2": 50
    }, {
        "type": "polygon",
        "version": "3.6.3",
        "left": 20,
        "top": 249,
        "width": 385,
        "height": 245,
        "fill": "#3a41a7",
        "scaleX": 0.55,
        "scaleY": 0.55,
        "points": [{
            "x": 185,
            "y": 0
        }, {
            "x": 250,
            "y": 100
        }, {
            "x": 385,
            "y": 170
        }, {
            "x": 0,
            "y": 245
        }]
    }, {
        "type": "textbox",
        "version": "3.6.3",
        "left": 269,
        "top": 27,
        "width": 300,
        "height": 153.68,
        "fill": "#e19e54",
        "angle": -1,
        "text": "Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\nUt enim ad minim veniam,\nquis no",
        "fontSize": 20,
        "fontWeight": "",
        "fontFamily": "helvetica",
        "minWidth": 20,
        "splitByGrapheme": false,
        "styles": {}
    }, {
        "type": "i-text",
        "version": "3.6.3",
        "left": 391,
        "top": 296,
        "width": 493.52,
        "height": 97.63,
        "fill": "#d63098",
        "scaleX": 0.5,
        "scaleY": 0.5,
        "angle": -10,
        "text": "Lorem ipsum dolor sit amet,\nconsectetur ",
        "fontWeight": "",
        "fontFamily": "helvetica",
        "styles": {}
    }, {
        "type": "text",
        "version": "3.6.3",
        "left": 330,
        "top": 544,
        "width": 371.25,
        "height": 45.2,
        "fill": "#4d690c",
        "scaleX": 0.5,
        "scaleY": 0.5,
        "angle": 5,
        "text": "Lorem ipsum dolor si",
        "fontWeight": "",
        "fontFamily": "helvetica",
        "styles": {}
    }, {
        "type": "rect",
        "version": "3.6.3",
        "left": 100,
        "top": 66,
        "width": 50,
        "height": 50,
        "fill": "#1b39bb",
        "opacity": 0.8
    }, {
        "type": "circle",
        "version": "3.6.3",
        "left": 266,
        "top": 98,
        "width": 100,
        "height": 100,
        "fill": "#4f8af4",
        "opacity": 0.8,
        "radius": 50,
        "startAngle": 0,
        "endAngle": 6.283185307179586
    }, {
        "type": "triangle",
        "version": "3.6.3",
        "left": 119,
        "top": 152,
        "width": 50,
        "height": 50,
        "fill": "#6d16e6",
        "opacity": 0.8
    }, {
        "type": "text",
        "version": "3.6.3",
        "left": 365,
        "top": 237,
        "width": 493.52,
        "height": 97.63,
        "fill": "#44c459",
        "scaleX": 0.5,
        "scaleY": 0.5,
        "angle": -2,
        "text": "Lorem ipsum dolor sit amet,\nconsectet",
        "fontWeight": "",
        "fontFamily": "helvetica",
        "styles": {}
    }, {
        "type": "i-text",
        "version": "3.6.3",
        "left": 220.87,
        "top": 288.28,
        "width": 598.13,
        "height": 202.5,
        "fill": "#42cf3f",
        "scaleX": 0.5,
        "scaleY": 0.5,
        "angle": 12.72,
        "text": "Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna al",
        "fontWeight": "",
        "fontFamily": "helvetica",
        "styles": {}
    }, {
        "type": "circle",
        "version": "3.6.3",
        "left": 0,
        "top": 127,
        "width": 100,
        "height": 100,
        "fill": "#9e4b3c",
        "opacity": 0.8,
        "radius": 50,
        "startAngle": 0,
        "endAngle": 6.283185307179586
    }, {
        "type": "rect",
        "version": "3.6.3",
        "left": 530,
        "top": 16,
        "width": 50,
        "height": 50,
        "fill": "#a209e7",
        "opacity": 0.8
    }, {
        "type": "triangle",
        "version": "3.6.3",
        "left": 88,
        "top": 211,
        "width": 50,
        "height": 50,
        "fill": "#20286e",
        "opacity": 0.8
    }, {
        "type": "line",
        "version": "3.6.3",
        "left": 27,
        "top": 237,
        "width": 150,
        "height": 100,
        "stroke": "#5e9fb3",
        "x1": -75,
        "x2": 75,
        "y1": -50,
        "y2": 50
    }, {
        "type": "circle",
        "version": "3.6.3",
        "left": 371,
        "top": 447,
        "width": 100,
        "height": 100,
        "fill": "#5ec5ba",
        "opacity": 0.8,
        "radius": 50,
        "startAngle": 0,
        "endAngle": 6.283185307179586
    }, {
        "type": "i-text",
        "version": "3.6.3",
        "left": 376,
        "top": 444,
        "width": 493.52,
        "height": 150.06,
        "fill": "#ecb2cc",
        "scaleX": 0.5,
        "scaleY": 0.5,
        "angle": -1,
        "text": "Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do ei",
        "fontWeight": "",
        "fontFamily": "helvetica",
        "styles": {}
    }, {
        "type": "rect",
        "version": "3.6.3",
        "left": 492,
        "top": 505,
        "width": 50,
        "height": 50,
        "fill": "#9fa139",
        "opacity": 0.8
    }, {
        "type": "triangle",
        "version": "3.6.3",
        "left": 559,
        "top": 527,
        "width": 50,
        "height": 50,
        "fill": "#d5eb95",
        "opacity": 0.8
    }, {
        "type": "triangle",
        "version": "3.6.3",
        "left": 566,
        "top": 90,
        "width": 50,
        "height": 50,
        "fill": "#d3d188",
        "opacity": 0.8
    }, {
        "type": "polygon",
        "version": "3.6.3",
        "left": 834.66,
        "top": 241.24,
        "width": 385,
        "height": 245,
        "fill": "#9580bf",
        "scaleX": 0.68,
        "scaleY": 0.68,
        "angle": 140,
        "points": [{
            "x": 185,
            "y": 0
        }, {
            "x": 250,
            "y": 100
        }, {
            "x": 385,
            "y": 170
        }, {
            "x": 0,
            "y": 245
        }]
    }, {
        "type": "rect",
        "version": "3.6.3",
        "left": 643,
        "top": 16,
        "width": 50,
        "height": 50,
        "fill": "#c1b138",
        "scaleX": 2.64,
        "scaleY": 2.64,
        "opacity": 0.8
    }, {
        "type": "text",
        "version": "3.6.3",
        "left": 389,
        "top": 360,
        "width": 22.25,
        "height": 45.2,
        "fill": "#d6a02d",
        "scaleX": 0.5,
        "scaleY": 0.5,
        "text": "L",
        "fontWeight": "",
        "fontFamily": "helvetica",
        "styles": {}
    }, {
        "type": "triangle",
        "version": "3.6.3",
        "left": 625,
        "top": 350,
        "width": 50,
        "height": 50,
        "fill": "#908f9f",
        "opacity": 0.8
    }, {
        "type": "circle",
        "version": "3.6.3",
        "left": 603,
        "top": 454,
        "width": 100,
        "height": 100,
        "fill": "#578b25",
        "opacity": 0.8,
        "radius": 50,
        "startAngle": 0,
        "endAngle": 6.283185307179586
    }, {
        "type": "circle",
        "version": "3.6.3",
        "left": 681,
        "top": 388,
        "width": 100,
        "height": 100,
        "fill": "#990621",
        "opacity": 0.8,
        "radius": 50,
        "startAngle": 0,
        "endAngle": 6.283185307179586
    }, {
        "type": "circle",
        "version": "3.6.3",
        "left": 676,
        "top": 491,
        "width": 100,
        "height": 100,
        "fill": "#c2d944",
        "opacity": 0.8,
        "radius": 50,
        "startAngle": 0,
        "endAngle": 6.283185307179586
    }, {
        "type": "circle",
        "version": "3.6.3",
        "left": 644,
        "top": 53,
        "width": 100,
        "height": 100,
        "fill": "#c1532e",
        "opacity": 0.8,
        "radius": 50,
        "startAngle": 0,
        "endAngle": 6.283185307179586
    }, {
        "type": "triangle",
        "version": "3.6.3",
        "left": 601,
        "top": 434,
        "width": 50,
        "height": 50,
        "fill": "#54cd04",
        "opacity": 0.8
    }, {
        "type": "line",
        "version": "3.6.3",
        "left": 435,
        "top": 198,
        "width": 150,
        "height": 100,
        "stroke": "#d08d13",
        "x1": -75,
        "x2": 75,
        "y1": -50,
        "y2": 50
    }, {
        "type": "rect",
        "version": "3.6.3",
        "left": 101,
        "top": 12,
        "width": 50,
        "height": 50,
        "fill": "#7a7d9c",
        "opacity": 0.8
    }, {
        "type": "rect",
        "version": "3.6.3",
        "left": 14,
        "top": 7,
        "width": 50,
        "height": 50,
        "fill": "#16c0ef",
        "opacity": 0.8
    }, {
        "type": "rect",
        "version": "3.6.3",
        "left": 22,
        "top": 74.17,
        "width": 50,
        "height": 50,
        "fill": "#8a4cde",
        "angle": 355.3,
        "opacity": 0.8
    }]
}, function () {
    initMinimap();
    updateMiniMapVP();
});

function createCanvasEl() {
    var designSize = {
        width: 800,
        height: 600
    };
    var originalVPT = design.viewportTransform;
    // zoom to fit the design in the display canvas
    var designRatio = fabric.util.findScaleToFit(designSize, design);

    // zoom to fit the display the design in the minimap.
    var minimapRatio = fabric.util.findScaleToFit(design, minimap);

    var scaling = minimap.getRetinaScaling();

    var finalWidth = designSize.width * designRatio;
    var finalHeight = designSize.height * designRatio;

    design.viewportTransform = [
        designRatio, 0, 0, designRatio,
        (design.getWidth() - finalWidth) / 2,
        (design.getHeight() - finalHeight) / 2
    ];
    var canvas = design.toCanvasElement(minimapRatio * scaling);
    design.viewportTransform = originalVPT;
    return canvas;
}

function updateMiniMap() {
    var canvas = createCanvasEl();
    minimap.backgroundImage._element = canvas;
    minimap.requestRenderAll();
}

function updateMiniMapVP() {
    var designSize = {
        width: 800,
        height: 600
    };
    var rect = minimap.getObjects()[0];
    var designRatio = fabric.util.findScaleToFit(designSize, design);
    var totalRatio = fabric.util.findScaleToFit(designSize, minimap);
    var finalRatio = designRatio / design.getZoom();
    rect.scaleX = finalRatio;
    rect.scaleY = finalRatio;
    rect.top = minimap.backgroundImage.top - design.viewportTransform[5] * totalRatio / design.getZoom();
    rect.left = minimap.backgroundImage.left - design.viewportTransform[4] * totalRatio / design.getZoom();
    minimap.requestRenderAll();
}

function initMinimap() {
    var canvas = createCanvasEl();
    var backgroundImage = new fabric.Image(canvas);
    backgroundImage.scaleX = 1 / design.getRetinaScaling();
    backgroundImage.scaleY = 1 / design.getRetinaScaling();
    minimap.centerObject(backgroundImage);
    minimap.backgroundColor = 'white';
    minimap.backgroundImage = backgroundImage;
    minimap.requestRenderAll();
    var minimapView = new fabric.Rect({
        top: backgroundImage.top,
        left: backgroundImage.left,
        width: backgroundImage.width / design.getRetinaScaling(),
        height: backgroundImage.height / design.getRetinaScaling(),
        fill: 'rgba(0, 0, 255, 0.3)',
        cornerSize: 6,
        transparentCorners: false,
        cornerColor: 'blue',
        strokeWidth: 0,
    });
    minimapView.controls = {
        br: fabric.Object.prototype.controls.br,
    };
    minimap.add(minimapView);
}

var debouncedMiniMap = _.debounce(updateMiniMap, 250);

design.on('object:modified', function () {
    updateMiniMap();
})

// hook up the pan and zoom
design.on('mouse:wheel', function (opt) {
    var delta = opt.e.deltaY;
    var zoom = design.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    this.setZoom(zoom);
    updateMiniMapVP();
    opt.e.preventDefault();
    opt.e.stopPropagation();
});
design.on('mouse:down', function (opt) {
    var evt = opt.e;
    if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
    }
});
design.on('mouse:move', function (opt) {
    if (this.isDragging) {
        var e = opt.e;
        var vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        updateMiniMapVP();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
    }
});
design.on('mouse:up', function (opt) {
    this.isDragging = false;
    this.selection = true;
});


//------------------------------------------------
var roof = null;
var roofPoints = [];
var lines = [];
var lineCounter = 0;
var drawingObject = {};
drawingObject.type = "";
drawingObject.background = "";
drawingObject.border = "";

function Point(x, y) {
    this.x = x;
    this.y = y;
}


$("#poly").click(function () {
    if (drawingObject.type == "roof") {
        drawingObject.type = "";
        lines.forEach(function(value, index, ar){
             canvas.remove(value);
        });
        //canvas.remove(lines[lineCounter - 1]);
        roof = makeRoof(roofPoints);
        canvas.add(roof);
        canvas.renderAll();
    } else {
        drawingObject.type = "roof"; // roof type
    }
});


// canvas Drawing
var canvas = new fabric.Canvas('canvas-tools');
var x = 0;
var y = 0;

fabric.util.addListener(window,'dblclick', function(){ 
        drawingObject.type = "";
        lines.forEach(function(value, index, ar){
             canvas.remove(value);
        });
        //canvas.remove(lines[lineCounter - 1]);
        roof = makeRoof(roofPoints);
        canvas.add(roof);
        canvas.renderAll();
  
    console.log("double click");
    //clear arrays
     roofPoints = [];
     lines = [];
     lineCounter = 0;
    
});

canvas.on('mouse:down', function (options) {
    if (drawingObject.type == "roof") {
        canvas.selection = false;
        setStartingPoint(options); // set x,y
        roofPoints.push(new Point(x, y));
        var points = [x, y, x, y];
        lines.push(new fabric.Line(points, {
            strokeWidth: 3,
            selectable: false,
            stroke: 'red'
        }).setOriginX(x).setOriginY(y));
        canvas.add(lines[lineCounter]);
        lineCounter++;
        canvas.on('mouse:up', function (options) {
            canvas.selection = true;
        });
    }
});
canvas.on('mouse:move', function (options) {
    if (lines[0] !== null && lines[0] !== undefined && drawingObject.type == "roof") {
        setStartingPoint(options);
        lines[lineCounter - 1].set({
            x2: x,
            y2: y
        });
        canvas.renderAll();
    }
});

function setStartingPoint(options) {
    var offset = $('#canvas-tools').offset();
    x = options.e.pageX - offset.left;
    y = options.e.pageY - offset.top;
}

function makeRoof(roofPoints) {

    var left = findLeftPaddingForRoof(roofPoints);
    var top = findTopPaddingForRoof(roofPoints);
    roofPoints.push(new Point(roofPoints[0].x,roofPoints[0].y))
    var roof = new fabric.Polyline(roofPoints, {
    fill: 'rgba(0,0,0,0)',
    stroke:'#58c'
    });
    roof.set({
        
        left: left,
        top: top,
       
    });


    return roof;
}

function findTopPaddingForRoof(roofPoints) {
    var result = 999999;
    for (var f = 0; f < lineCounter; f++) {
        if (roofPoints[f].y < result) {
            result = roofPoints[f].y;
        }
    }
    return Math.abs(result);
}

function findLeftPaddingForRoof(roofPoints) {
    var result = 999999;
    for (var i = 0; i < lineCounter; i++) {
        if (roofPoints[i].x < result) {
            result = roofPoints[i].x;
        }
    }
    return Math.abs(result);
}