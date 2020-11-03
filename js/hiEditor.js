(function(global){

    
    var elem = document.getElementById('parentCanvas');
    var edit = new hiDraw(
        {
            canvasViewId: 'mainEditor',
            viewJsonTextId: 'hiJsonArea',
            activeJsonTextId: 'hiActiveJsonArea',
            canvasWidth: elem.offsetWidth
        }
    ).createView().viewEvent();

    var objOption = {
        activeJsonTextId: 'hiActiveJsonArea',
        endDraw: function(){
            console.log('**');
            edit.changeCanvasProperty(true, false);
            edit.changeSelectableStatus(true);
            edit.viewEvent();
        },
        onSelected: function(opt){
            // if(opt){
            //     edit.DatGUI.updateOptions({
            //         type: opt.get('type'),
            //         stroke: opt.get('stroke'),
            //         fill: opt.get('fill'),
            //         message: 'hello'
            //     })
            // }
        }
    };

    // const circle = new fabric.Circle({
    //     radius: 30,
    //     fill: 'red', // 填色,
    //     top: 10,
    //     left: 0
    //   })
    // edit.canvasView.add(circle)//加入到canvas中

    $("#circle").click(function() {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var circle = new edit.Circle(edit, objOption);
    });

    $("#squrect").click(function() {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var squrect = new edit.Rectangle(edit, objOption);
    });

    $("#arrow").click(function() {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var arrow = new edit.Arrow(edit, objOption);
    });

    $("#polygon").click(function() {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var polygon = new edit.Polygon(edit, objOption);
    });

    $("#polyline").click(function() {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var polyline = new edit.Polyline(edit, objOption);
    });

    $("#image").click(function() {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var image = new edit.Image(edit, objOption);
    });

    $('#path').click(function() {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, true);
        var path = new edit.Path(edit, objOption);
    });

    $('#line').click(function() {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var line = new edit.Line(edit, objOption);
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

    $("#logEach").click(function() {
        edit.logEachObjects();
    });

    $("#copy").click(function() {
        edit.copy();
    });

    $("#paste").click(function() {
        edit.paste();
    });

    $("#delete").click(function() {
        edit.delete();
    });

    $('#load').click(function(){
        var string = $('#hiLoadJsonArea').val().trim();
        if(string){
            console.log('load')
            edit.canvasView.loadFromJSON(string)
        }
    });

    var gridOn = false;
    $("#grid").click(function() {
        // Set background image (grid)
        if (!gridOn) {
            fabric.Image.fromURL('https://i.imgur.com/iwkpx13.png', function(img) {
                gridOn = true;
                img.set({
                    width: edit.canvasView.width,
                    height: edit.canvasView.height,
                    originX: 'left',
                    originY: 'top'
                });
                edit.canvasView.setBackgroundImage(img, edit.canvasView.renderAll.bind(edit.canvasView));
            });
        } else if (gridOn = true) {
            fabric.Image.fromURL('', function(img) {
                img.set({
                    width: edit.canvasView.width,
                    height: edit.canvasView.height,
                    originX: 'left',
                    originY: 'top'
                });
                edit.canvasView.setBackgroundImage(img, edit.canvasView.renderAll.bind(edit.canvasView));
                gridOn = false;
            });
        }
    });
    

    window.addEventListener('resize', function(){
        
        var elem = document.getElementById('parentCanvas');
        // var elem = document.getElementById(edit.defaultOptions.canvasViewId);
        // console.log('resize',elem.offsetWidth)
        // that.canvasView.setDimensions({width:elem.offsetWidth, height:elem.offsetHeight});
        setTimeout(function(){
            edit.canvasView.setWidth( parseInt(elem.offsetWidth) )
            // edit.canvasView.setHeight( parseInt(elem.offsetHeight) )
            edit.canvasView.renderAll()
        },300)
        // that.canvasView.renderAll()
    });

    document.onkeydown = onKeyDownHandler;
    function onKeyDownHandler(event) {
        //event.preventDefault();
        var key;
        if (window.event) {
            key = window.event.keyCode;
        } else {
            key = event.keyCode;
        }

        switch (key) {
            // Shortcuts
            case 46: // Ctrl+C
                event.preventDefault();
                edit.delete();
                break;
            case 67: // Ctrl+C
                if (event.ctrlKey) {
                    event.preventDefault();
                    edit.copy();
                }
                break;
                // Paste (Ctrl+V)
            case 86: // Ctrl+V
                if (event.ctrlKey) {
                    event.preventDefault();
                    edit.paste();
                }
                break;

            default:
                // TODO
                break;
        }
    }

    
    window.edit = edit;
})(this)
