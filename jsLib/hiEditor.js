(function (global) {


    var elem = document.getElementById('parentCanvas');
    var edit = new hiDraw({
        canvasViewId: 'mainEditor',
        viewJsonTextId: 'hiJsonArea',
        activeJsonTextId: 'hiActiveJsonArea',
        canvasWidth: elem.offsetWidth
    }).createView().viewEvent();

    var objOption = {
        activeJsonTextId: 'hiActiveJsonArea',
        endDraw: function () {
            console.log('**');
            edit.changeCanvasProperty(true, false);
            edit.changeSelectableStatus(true);
            edit.viewEvent();
        },
        onSelected: function (opt) {

        }
    };

    // const circle = new fabric.Circle({
    //     radius: 50,
    //     fill: 'red', // 填色,
    //     top: 0,
    //     left: 0
    //   })
    // edit.canvasView.add(circle)//加入到canvas中

    // const imgEl = document.createElement('img')
    // imgEl.crossOrigin = 'Anonymous' // 讓圖片能讓所有人存取
    // imgEl.src = './labelmeJSON/circle.png'
    // imgEl.onload = () => {
    //     const image = new fabric.Image(imgEl, {
    //         // scaleX: 0.5,
    //         // scaleY: 0.5,
    //         // angle: 15,
    //         top: 0,
    //         left: 0
    //     })
    //     edit.canvasView.add(image)
    // }
    

    $("#circle").click(function () {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var circle = new edit.Circle(edit, objOption);
    });

    $("#squrect").click(function () {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var squrect = new edit.Rectangle(edit, objOption);
    });

    $("#arrow").click(function () {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var arrow = new edit.Arrow(edit, objOption);
    });

    $("#polygon").click(function () {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var polygon = new edit.Polygon(edit, objOption);
    });

    $("#polyline").click(function () {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var polyline = new edit.Polyline(edit, objOption);
    });

    $("#image").click(function () {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var image = new edit.Image(edit, objOption);
    });

    $('#path').click(function () {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, true);
        var path = new edit.Path(edit, objOption);
    });

    $('#line').click(function () {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var line = new edit.Line(edit, objOption);
    });

    $("#select").click(function () {
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

    $("#render").click(function () {
        edit.canvasView.renderAll();
    });

    $("#logEach").click(function () {
        edit.logEachObjects();
    });

    $("#copy").click(function () {
        edit.copy();
    });

    $("#paste").click(function () {
        edit.paste();
    });

    $("#delete").click(function () {
        edit.delete();
    });

    $('#load').click(function () {
        var string = $('#hiLoadJsonArea').val().trim();
        if (string) {
            console.log('load')
            edit.canvasView.loadFromJSON(string)
        }
    });

    var gridOn = false;
    $("#grid").click(function () {
        // Set background image (grid)
        if (!gridOn) {
            fabric.Image.fromURL('https://i.imgur.com/iwkpx13.png', function (img) {
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
            fabric.Image.fromURL('', function (img) {
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

    $("#currentJson").click(function () {
        $('#hiCurrentJsonArea').val(JSON.stringify(edit.canvasView.toJSON(['uniqueIndex'])))
    })

    // -------------- Drawing Option Start ----------------
    if (fabric.PatternBrush) {
        var vLinePatternBrush = new fabric.PatternBrush(edit.canvasView);
        vLinePatternBrush.getPatternSrc = function () {
            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext('2d');

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.lineTo(10, 5);
            ctx.closePath();
            ctx.stroke();

            return patternCanvas;
        };

        var hLinePatternBrush = new fabric.PatternBrush(edit.canvasView);
        hLinePatternBrush.getPatternSrc = function () {

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext('2d');

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(5, 0);
            ctx.lineTo(5, 10);
            ctx.closePath();
            ctx.stroke();

            return patternCanvas;
        };

        var squarePatternBrush = new fabric.PatternBrush(edit.canvasView);
        squarePatternBrush.getPatternSrc = function () {

            var squareWidth = 10,
                squareDistance = 2;

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
            var ctx = patternCanvas.getContext('2d');

            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, squareWidth, squareWidth);

            return patternCanvas;
        };

        var diamondPatternBrush = new fabric.PatternBrush(edit.canvasView);
        diamondPatternBrush.getPatternSrc = function () {

            var squareWidth = 10,
                squareDistance = 5;
            var patternCanvas = fabric.document.createElement('canvas');
            var rect = new fabric.Rect({
                width: squareWidth,
                height: squareWidth,
                angle: 45,
                fill: this.color
            });

            var canvasWidth = rect.getBoundingRect().width;

            patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
            rect.set({
                left: canvasWidth / 2,
                top: canvasWidth / 2
            });

            var ctx = patternCanvas.getContext('2d');
            rect.render(ctx);

            return patternCanvas;
        };

        var img = new Image();
        img.src = './assets/iwkpx13.png';

        var texturePatternBrush = new fabric.PatternBrush(edit.canvasView);
        texturePatternBrush.source = img;
    }
    $('#drawing-color').on('change', function () {
        var brush = edit.canvasView.freeDrawingBrush;
        brush.color = this.value;
        if (brush.getPatternSrc) {
            brush.source = brush.getPatternSrc.call(brush);
        }
    });
    $('#drawing-mode-selector').on('change', function () {
        if ($(this).val() === 'hline') {
            edit.canvasView.freeDrawingBrush = vLinePatternBrush;
        } else if ($(this).val() === 'vline') {
            edit.canvasView.freeDrawingBrush = hLinePatternBrush;
        } else if ($(this).val() === 'square') {
            edit.canvasView.freeDrawingBrush = squarePatternBrush;
        } else if ($(this).val() === 'diamond') {
            edit.canvasView.freeDrawingBrush = diamondPatternBrush;
        } else if ($(this).val() === 'texture') {
            edit.canvasView.freeDrawingBrush = texturePatternBrush;
        } else {
            edit.canvasView.freeDrawingBrush = new fabric[$(this).val() + 'Brush'](edit.canvasView);
            // edit.canvasView.freeDrawingBrush = new fabric['PencilBrush'](canvas);
        }

        if (edit.canvasView.freeDrawingBrush) {
            var brush = edit.canvasView.freeDrawingBrush;
            brush.color = $('#drawing-color').val();
            if (brush.getPatternSrc) {
                brush.source = brush.getPatternSrc.call(brush);
            }
            brush.width = parseInt($('#drawing-line-width').val(), 10) || 1;
            brush.shadow = new fabric.Shadow({
                blur: parseInt($('#drawing-shadow-width').val(), 10) || 0,
                offsetX: 0,
                offsetY: 0,
                affectStroke: true,
                color: $('#drawing-shadow-color').val()
            });
        }
    });
    $('#drawing-line-width').on('change', function () {
        edit.canvasView.freeDrawingBrush.width = parseInt($(this).val(), 10) || 1;
        $(this).prev('.info').html($(this).val());
    });
    $('#drawing-color').on('change', function () {
        var brush = edit.canvasView.freeDrawingBrush;
        brush.color = $(this).val();
        if (brush.getPatternSrc) {
            brush.source = brush.getPatternSrc.call(brush);
        }
    });
    $('#drawing-shadow-color').on('change', function () {
        edit.canvasView.freeDrawingBrush.shadow.color = $(this).val();
    });
    $('#drawing-shadow-width').on('change', function () {
        edit.canvasView.freeDrawingBrush.width = parseInt($(this).val(), 10) || 1;
        $(this).prev('.info').html($(this).val());
    });
    $('#drawing-shadow-offset').on('change', function () {
        edit.canvasView.freeDrawingBrush.shadow.offsetX = parseInt($(this).val(), 10) || 0;
        edit.canvasView.freeDrawingBrush.shadow.offsetY = parseInt($(this).val(), 10) || 0;
        $(this).prev('.info').html($(this).val());
    });

    if (edit.canvasView.freeDrawingBrush) {
        edit.canvasView.freeDrawingBrush.color = $('#drawing-color').val();
        edit.canvasView.freeDrawingBrush.width = parseInt($('#drawing-line-width').val(), 10) || 1;
        if(edit.canvasView.freeDrawingBrush.getPatternSrc){
            edit.canvasView.freeDrawingBrush.source = edit.canvasView.freeDrawingBrush.getPatternSrc.call(this);
        }
        edit.canvasView.freeDrawingBrush.shadowBlur = parseInt($('#drawing-shadow-width').val(), 10) || 0;

        edit.canvasView.freeDrawingBrush.shadow = new fabric.Shadow({
            blur: parseInt($('#drawing-shadow-width').val(), 10) || 0,
            offsetX: 0,
            offsetY: 0,
            affectStroke: true,
            color: $('#drawing-shadow-color').val(),
        });
    }

    // -------------- Drawing Option End ------------------


    window.addEventListener('resize', function () {

        var elem = document.getElementById('parentCanvas');
        // var elem = document.getElementById(edit.defaultOptions.canvasViewId);
        // console.log('resize',elem.offsetWidth)
        // that.canvasView.setDimensions({width:elem.offsetWidth, height:elem.offsetHeight});
        setTimeout(function () {
            edit.canvasView.setWidth(parseInt(elem.offsetWidth))
            // edit.canvasView.setHeight( parseInt(elem.offsetHeight) )
            edit.canvasView.renderAll()
        }, 300)
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
            case 27: // Ctrl+V
                if (event.ctrlKey) {
                    event.preventDefault();
                    edit.paste();
                }
                break;
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