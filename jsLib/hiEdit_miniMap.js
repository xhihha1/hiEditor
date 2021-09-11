hiDraw.prototype.MiniMap = function(){}
hiDraw.prototype.MiniMap1 = (function () {
    function MiniMap() {
        return 'test'
    }

    // miniMap.canvasView
    MiniMap.prototype.init = function(id){
        var that = this;
        that.miniMap.canvasView = new fabric.Canvas('minimap', {
            containerClass: 'minimap',
            selection: false
        });
        that.miniMap.designSize = {
            width: 800,
            height: 600
        };
        var canvas = that.miniMap.createCanvasEl();
        var backgroundImage = new fabric.Image(canvas);
        backgroundImage.scaleX = 1 / that.canvasView.getRetinaScaling();
        backgroundImage.scaleY = 1 / that.canvasView.getRetinaScaling();
        that.miniMap.canvasView.centerObject(backgroundImage);
        that.miniMap.canvasView.backgroundColor = 'white';
        that.miniMap.canvasView.backgroundImage = backgroundImage;
        that.miniMap.canvasView.requestRenderAll();
        var minimapView = new fabric.Rect({
            top: backgroundImage.top,
            left: backgroundImage.left,
            width: backgroundImage.width / that.canvasView.getRetinaScaling(),
            height: backgroundImage.height / that.canvasView.getRetinaScaling(),
            fill: 'rgba(0, 0, 255, 0.3)',
            cornerSize: 6,
            transparentCorners: false,
            cornerColor: 'blue',
            strokeWidth: 0,
        });
        minimapView.controls = {
            br: fabric.Object.prototype.controls.br,
        };
        that.miniMap.canvasView.add(minimapView);
    }

    function initMinimap() {
        var canvas = that.miniMap.createCanvasEl();
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


    MiniMap.createCanvasEl = function() {
        var that = this;
        
        var originalVPT = that.canvasView.viewportTransform;
        // zoom to fit the design in the display canvas
        var designRatio = fabric.util.findScaleToFit(that.miniMap.designSize, that.canvasView);
        // zoom to fit the display the design in the minimap.
        var minimapRatio = fabric.util.findScaleToFit(that.canvasView, that.miniMap.canvasView);
        var scaling = that.miniMap.canvasView.getRetinaScaling();

        var finalWidth = that.miniMap.designSize.width * designRatio;
        var finalHeight = that.miniMap.designSize.height * designRatio;

        that.canvasView.viewportTransform = [
            designRatio, 0, 0, designRatio,
            (that.canvasView.getWidth() - finalWidth) / 2,
            (that.canvasView.getHeight() - finalHeight) / 2
        ];
        var canvas = that.canvasView.toCanvasElement(minimapRatio * scaling);
        that.canvasView.viewportTransform = originalVPT;
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

    return MiniMap;
})()