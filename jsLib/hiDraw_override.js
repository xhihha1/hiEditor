hiDraw.prototype.fabricOverride = (function () {
    var controlOverride = {}


    window.controlOverride = controlOverride;

    function fabricOverride () {
        var strokeWidth = 1,
        strokeColor = 'rgba(51, 51, 51, 1)',
        fillColor = 'rgba(51, 51, 51, 0)';
        if (this.defaultOptions && this.defaultOptions.objectDefault) {
            strokeWidth = this.defaultOptions.objectDefault.strokeWidth;
            strokeColor = this.defaultOptions.objectDefault.strokeColor;
        }
        fabric.Object.prototype.set({
            stroke: strokeColor,
            strokeWidth: strokeWidth,
            fill: fillColor,
            // transparentCorners: false,
            cornerColor: 'rgba(0,0,255,0.5)',
            cornerStyle: 'circle',
            objectCaching: false
        });
        fabric.Object.prototype.set('cornerStyle', 'circle')
        // fabric.Circle.prototype.controls = controlOverride.circle();
        // fabric.Line.prototype.controls = controlOverride.line();
        // fabric.Rect.prototype.controls = controlOverride.rectangle();
    }
    return fabricOverride
})()

hiDraw.prototype.fabricObjDefaultOverride = (function(){
    return function(options){
        if(options){
            fabric.Object.prototype.set(options)
        }
    }
})()