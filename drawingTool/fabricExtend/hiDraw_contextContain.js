hiDraw.prototype.canvasLabel = (function () {
    var canvasLabelFunc = function(){
        var that = this;
        that.canvasView.forEachObject(function (obj) {
            /* Canvas object label */
            that.canvasView.contextContainer.strokeStyle = '#FF0000'
            var bound = obj.getBoundingRect()
            that.canvasView.contextContainer.fillStyle = obj.stroke
            const x = bound.left
            const y = bound.top - 20
            const radius = 5
            const ctx = that.canvasView.contextContainer
            const width = that.canvasView.contextContainer.measureText(obj.id).width + 16
            const height = 20
            ctx.beginPath()
            ctx.moveTo(x + radius, y)
            ctx.arcTo(x + width, y, x + width, y + height, radius)
            ctx.arcTo(x + width, y + height, x, y + height, radius)
            ctx.arcTo(x, y + height, x, y, radius)
            ctx.arcTo(x, y, x + width, y, radius)
            ctx.closePath()
            ctx.fill()
            that.canvasView.contextContainer.textBaseline = 'bottom'
            that.canvasView.contextContainer.fillStyle = '#FFFFFF'
            that.canvasView.contextContainer.font = '16px Arial'
            that.canvasView.contextContainer.fillText('obj.id', bound.left + 8, bound.top - 1)
            // var absCoords = edit.canvasView.getAbsoluteCoords(obj);
        })
    } 
    
    return canvasLabelFunc;
})
