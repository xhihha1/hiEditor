// hiDraw.prototype.MiniMap = (function () {
//     var miniMap = {}

//     // miniMap.canvasView
//     miniMap.init = function(canvasView, id){
//         var that = this;
//         console.log('that',that)
//         that.mainCanvasView = canvasView;
//         that.minimapView = new fabric.Canvas('minimap', {
//             containerClass: 'minimap',
//             selection: false
//         });
//         that.designSize = {
//             width: that.mainCanvasView.width,
//             height: that.mainCanvasView.height
//         };
//         var canvas = that.createCanvasEl();
//         var backgroundImage = new fabric.Image(canvas);
//         backgroundImage.scaleX = 1 / that.mainCanvasView.getRetinaScaling();
//         backgroundImage.scaleY = 1 / that.mainCanvasView.getRetinaScaling();
//         that.minimapView.centerObject(backgroundImage);
//         that.minimapView.backgroundColor = 'white';
//         that.minimapView.backgroundImage = backgroundImage;
//         that.minimapView.requestRenderAll();
//         var minimapRect = new fabric.Rect({
//             top: backgroundImage.top,
//             left: backgroundImage.left,
//             width: backgroundImage.width / that.mainCanvasView.getRetinaScaling(),
//             height: backgroundImage.height / that.mainCanvasView.getRetinaScaling(),
//             fill: 'rgba(0, 0, 255, 0.3)',
//             cornerSize: 6,
//             transparentCorners: false,
//             cornerColor: 'blue',
//             strokeWidth: 0,
//         });
//         minimapRect.controls = {
//             br: fabric.Object.prototype.controls.br,
//         };
//         that.minimapView.add(minimapRect);
//         that.updateMiniMapVP();
//     }

//     miniMap.createCanvasEl = function() {
//         var that = this;
//         var originalVPT = that.mainCanvasView.viewportTransform;
//         // zoom to fit the design in the display canvas
        
//         var designRatio = fabric.util.findScaleToFit(that.designSize, that.mainCanvasView);
//         // zoom to fit the display the design in the minimap.
//         var minimapRatio = fabric.util.findScaleToFit(that.mainCanvasView, that.minimapView);
//         var scaling = that.minimapView.getRetinaScaling();

//         var finalWidth = that.designSize.width * designRatio;
//         var finalHeight = that.designSize.height * designRatio;

//         that.mainCanvasView.viewportTransform = [
//             designRatio, 0, 0, designRatio,
//             (that.mainCanvasView.getWidth() - finalWidth) / 2,
//             (that.mainCanvasView.getHeight() - finalHeight) / 2
//         ];
//         var canvas = that.mainCanvasView.toCanvasElement(minimapRatio * scaling);
//         that.mainCanvasView.viewportTransform = originalVPT;
//         // console.log('canvas', canvas)
//         return canvas;
//     }

//     miniMap.updateMiniMap = function() {
//         var that = this;
//         var canvas = that.createCanvasEl();
//         that.minimapView.backgroundImage._element = canvas;
//         that.minimapView.requestRenderAll();
//     }

//     miniMap.updateMiniMapVP = function() {
//         var that = this;
//         that.designSize = {
//             width: that.mainCanvasView.width,
//             height: that.mainCanvasView.height
//         };
//         var rect = that.minimapView.getObjects()[0];
//         var designRatio = fabric.util.findScaleToFit(that.designSize, that.mainCanvasView);
//         var totalRatio = fabric.util.findScaleToFit(that.designSize, that.minimapView);
//         var finalRatio = designRatio / that.mainCanvasView.getZoom();
//         if(rect){
//             rect.scaleX = finalRatio;
//             rect.scaleY = finalRatio;
//             rect.top = that.minimapView.backgroundImage.top - that.mainCanvasView.viewportTransform[5] * totalRatio / that.mainCanvasView.getZoom();
//             rect.left = that.minimapView.backgroundImage.left - that.mainCanvasView.viewportTransform[4] * totalRatio / that.mainCanvasView.getZoom();
//         }
//         that.minimapView.requestRenderAll();
//     }

//     return miniMap;
// })()


hiDraw.prototype.MiniMap = (function () {
    var miniMap = {}

    // miniMap.canvasView
    miniMap.init = function(canvasView, id){
        var that = this;
        that.mainCanvasView = canvasView;
        that.minimapView = new fabric.Canvas('minimap', {
            containerClass: 'minimap',
            selection: false
        });
        that.designSize = {
            width: that.mainCanvasView.width,
            height: that.mainCanvasView.height
        };
        var canvas = that.createCanvasEl();
        var backgroundImage = new fabric.Image(canvas);
        backgroundImage.scaleX = 1 / that.mainCanvasView.getRetinaScaling();
        backgroundImage.scaleY = 1 / that.mainCanvasView.getRetinaScaling();
        that.minimapView.centerObject(backgroundImage);
        that.minimapView.backgroundColor = 'white';
        that.minimapView.backgroundImage = backgroundImage;
        that.minimapView.requestRenderAll();
        var minimapRect = new fabric.Rect({
            top: backgroundImage.top,
            left: backgroundImage.left,
            width: backgroundImage.width / that.mainCanvasView.getRetinaScaling(),
            height: backgroundImage.height / that.mainCanvasView.getRetinaScaling(),
            fill: 'rgba(0, 0, 255, 0.3)',
            cornerSize: 6,
            transparentCorners: false,
            cornerColor: 'blue',
            strokeWidth: 0,
        });
        minimapRect.controls = {
            br: fabric.Object.prototype.controls.br,
        };
        that.minimapView.add(minimapRect);
        that.updateMiniMapVP();
    }

    miniMap.createCanvasEl = function() {
        var that = this;
        var originalVPT = that.mainCanvasView.viewportTransform;
        // zoom to fit the design in the display canvas
        
        var designRatio = fabric.util.findScaleToFit(that.designSize, that.mainCanvasView);
        // zoom to fit the display the design in the minimap.
        var minimapRatio = fabric.util.findScaleToFit(that.mainCanvasView, that.minimapView);
        var scaling = that.minimapView.getRetinaScaling();

        var finalWidth = that.designSize.width * designRatio;
        var finalHeight = that.designSize.height * designRatio;

        that.mainCanvasView.viewportTransform = [
            designRatio, 0, 0, designRatio,
            (that.mainCanvasView.getWidth() - finalWidth) / 2,
            (that.mainCanvasView.getHeight() - finalHeight) / 2
        ];
        var canvas = that.mainCanvasView.toCanvasElement(minimapRatio * scaling);
        that.mainCanvasView.viewportTransform = originalVPT;
        // console.log('canvas', canvas)
        return canvas;
    }

    miniMap.updateMiniMap = function() {
        var that = this;
        var canvas = that.createCanvasEl();
        that.minimapView.backgroundImage._element = canvas;
        that.minimapView.requestRenderAll();
    }

    miniMap.updateMiniMapVP = function() {
        var that = this;
        that.designSize = {
            width: that.mainCanvasView.width,
            height: that.mainCanvasView.height
        };
        var rect = that.minimapView.getObjects()[0];
        var designRatio = fabric.util.findScaleToFit(that.designSize, that.mainCanvasView);
        var totalRatio = fabric.util.findScaleToFit(that.designSize, that.minimapView);
        var finalRatio = designRatio / that.mainCanvasView.getZoom();
        if(rect){
            rect.scaleX = finalRatio;
            rect.scaleY = finalRatio;
            rect.top = that.minimapView.backgroundImage.top - that.mainCanvasView.viewportTransform[5] * totalRatio / that.mainCanvasView.getZoom();
            rect.left = that.minimapView.backgroundImage.left - that.mainCanvasView.viewportTransform[4] * totalRatio / that.mainCanvasView.getZoom();
        }
        that.minimapView.requestRenderAll();
    }

    return miniMap;
})()