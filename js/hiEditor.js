(function(global){

    

    var edit = new hiDraw(
        {
            canvasViewId: 'mainEditor',
            viewJsonTextId: 'hiJsonArea'
        }
    ).createView().viewEvent();

    var objOption = {
        endDraw: function(){
            console.log('**');
            edit.changeCanvasProperty(true, false);
            edit.changeSelectableStatus(true);
            edit.viewEvent();
        }
    };

    const circle = new fabric.Circle({
        radius: 30,
        fill: 'red', // 填色,
        top: 10,
        left: 0
      })
    edit.canvasView.add(circle)//加入到canvas中

    $("#circle").click(function() {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var circle = new edit.Circle(edit.canvasView, objOption);
    });

    $("#squrect").click(function() {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var squrect = new edit.Rectangle(edit.canvasView, objOption);
    });

    $("#arrow").click(function() {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var arrow = new edit.Arrow(edit.canvasView, objOption);
    });

    $("#select").click(function() {
        // this.isDrawing = false;
        var canvas = edit.canvasView;
        var val = canvas.selection,
            val2 = canvas.isDrawingMode;
        val = !val;
        edit.changeCanvasProperty(val, false);
        edit.removeCanvasEvents();
        if (canvas.selection) {
            edit.changeSelectableStatus(true);
            $("#select").html('Turn Off Selection');
            if (val2) {
                // drawingModeEl.innerHTML = 'Turn On Free Draw';
                canvas.isDrawingMode = false;
                // drawingOptionsEl.style.display = 'none';
            }
        } else {
            // drawingModeEl.innerHTML = 'Turn Off Free Draw';
            edit.changeSelectableStatus(false);
            $("#select").html('Turn On Selection');
            // drawingOptionsEl.style.display = 'none';
        }
    });

    $("#render").click(function() {
        edit.canvasView.renderAll();
    });

    

    
    window.edit = edit;
})(this)
