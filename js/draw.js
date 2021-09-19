(function () {



    var infoAreaWidth = 200;
    var elem = document.getElementById('content');
    var edit = new hiDraw({
        canvasViewId: 'mainEditor',
        // viewJsonTextId: 'hiJsonArea',
        // activeJsonTextId: 'hiActiveJsonArea',
        canvasWidth: elem.offsetWidth - infoAreaWidth,
        canvasHeight: elem.offsetHeight,
        objectDefault: {
            fillAlpha: 0,
            lineWidth: 1,
            strokeColor: 'rgba(51, 51, 51, 1)'
        },
        event: {
            object_added: function (opt) { 
            },
            object_modified: function (opt) {
            },
            object_removed: function (opt) {},
            after_render: function (opt) {
                var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex']);
                fabricJson["objects"] = fabricJson["objects"].filter(function (obj) {
                    if (!obj['tempDrawShape']) {
                        return true;
                    } else {
                        return false;
                    }
                })
                $('#currentJson').val(JSON.stringify(fabricJson))

                var listStr = '';
                edit.canvasView.forEachObject(function (obj) {
                    if (obj['tempDrawShape']) {
                    } else {
                        listStr += '<li>' + obj.get('type') + '/' + obj['name'] + '/' + obj['label'] + '</li>'
                    }
                })
                $('#objlist').html(listStr)
            },
            import_callback: function () {

            }
        }
    }).createView().viewEvent();

    edit.MiniMap.init(edit.canvasView, 'minimap');
    setTimeout(function(){edit.MiniMap.updateMiniMap()},250);

    var objOption = {
        activeJsonTextId: 'hiActiveJsonArea',
        endDraw: function () {
            edit.changeCanvasProperty(true, false);
            edit.changeSelectableStatus(true);
            edit.viewEvent();
        },
        onSelected: function (opt) {

        }
    };

    // const circle = new fabric.Circle({
    //     radius: 50,
    //     stroke: 'green',
    //     strokeWidth: 4,
    //     fill: 'red', // 填色,
    //     objectCaching: false,
    //     top: 0,
    //     left: 0
    // })
    // edit.canvasView.add(circle) //加入到canvas中

    // // load image 1
    // var myImg = document.querySelector("#image");
    // // var realWidth = myImg.naturalWidth;
    // // var realHeight = myImg.naturalHeight;
    // // var imgElem = document.getElementById('image')
    // // const image = new fabric.Image(imgElem, {
    // // selectable: false,
    // //         hasBorders: false,
    // //         hasControls: false,
    // //     top: 0,
    // //     left: 0
    // // })
    // var c = document.createElement('canvas');
    // c.height = myImg.naturalHeight;
    // c.width = myImg.naturalWidth;
    // var ctx = c.getContext('2d');
    // ctx.drawImage(myImg, 0, 0, c.width, c.height);
    // var base64String = c.toDataURL();
    // var imagAry = base64String.split(',')[1];

    // edit.defaultOptions.image = {}
    // edit.defaultOptions.image.imagAry = imagAry;
    // edit.defaultOptions.image.realWidth = myImg.naturalWidth;
    // edit.defaultOptions.image.realHeight = myImg.naturalHeight;


    // // load image 2
    const imgEl = document.createElement('img')
    imgEl.crossOrigin = 'Anonymous' // 讓圖片能讓所有人存取
    imgEl.src = 'image.png'
    imgEl.onload = () => {
        var c = document.createElement('canvas');
        c.height = imgEl.naturalHeight;
        c.width = imgEl.naturalWidth;
        var ctx = c.getContext('2d');
        ctx.drawImage(imgEl, 0, 0, c.width, c.height);
        var base64String = c.toDataURL();

        var imagAry = base64String.split(',')[1];
        // console.log(imagAry)

        edit.defaultOptions.image = {}
        edit.defaultOptions.image.imagAry = imagAry;
        edit.defaultOptions.image.realWidth = imgEl.naturalWidth;
        edit.defaultOptions.image.realHeight = imgEl.naturalHeight;
        const image = new fabric.Image(imgEl, {
            tempDrawShape: true,
            selectable: false,
            hasBorders: false,
            hasControls: false,
            top: 0,
            left: 0
        })
        edit.canvasView.setBackgroundImage(image)
        edit.canvasView.renderAll()
        // edit.canvasView.add(image)
    }

    $("#drawRect").click(function () {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var squrect = new edit.Rectangle(edit, objOption);
    });

    $("#drawCircle").click(function () {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var circle = new edit.Circle(edit, objOption);
    });

    $("#drawPolygon").click(function () {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var polygon = new edit.Polygon(edit, objOption);
    });

    $('#drawLine').click(function () {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var line = new edit.Line(edit, objOption);
    });

    $("#drawPolyline").click(function () {
        edit.removeCanvasEvents();
        edit.changeSelectableStatus(false);
        edit.changeCanvasProperty(false, false);
        var polyline = new edit.Polyline(edit, objOption);
    });

    $("#zoomIn").click(function () {
        var zoom = edit.canvasView.getZoom() * 1.1
        if (zoom > 20) zoom = 20
        edit.canvasView.setZoom(zoom)
    });

    $("#zoomOut").click(function () {
        var zoom = edit.canvasView.getZoom() / 1.1
        if (zoom < 0.01) zoom = 0.01
        edit.canvasView.setZoom(edit.canvasView.getZoom() / 1.1)
    });

    $('#goRight').click(function(){
        var units = 10 ;
        var delta = new fabric.Point(units,0) ;
        edit.canvasView.relativePan(delta) ;
    }) ;
    
    $('#goLeft').click(function(){
        var units = 10 ;
        var delta = new fabric.Point(-units,0) ;
        edit.canvasView.relativePan(delta) ;
    }) ;
    $('#goUp').click(function(){
        var units = 10 ;
        var delta = new fabric.Point(0,-units) ;
        edit.canvasView.relativePan(delta) ;
    }) ;
    
    $('#goDown').click(function(){
        var units = 10 ;
        var delta = new fabric.Point(0,units) ;
        edit.canvasView.relativePan(delta) ;
    }) ;

    $('#export').click(function () {
        var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex']);
        fabricJson["objects"] = fabricJson["objects"].filter(function (obj) {
            if (!obj['tempDrawShape']) {
                return true;
            } else {
                return false;
            }
        })
        // $('#currentJson').val(JSON.stringify(fabricJson))
        var json = edit.export(fabricJson);
        $('#exportJson').val(JSON.stringify(json))
    });

    $('#exportFabric').click(function () {
        var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex']);
        fabricJson["objects"] = fabricJson["objects"].filter(function (obj) {
            if (!obj['tempDrawShape']) {
                return true;
            } else {
                return false;
            }
        })
        $('#currentJson').val(JSON.stringify(fabricJson))
    });

    $('#import').click(function () {
        var json = $('#importJson').val()
        edit.import(json);
        console.log('XX');
        if (json) {
            // edit.import(json);

            // edit.canvasView.forEachObject(function (obj) {
            //     if (obj['type'] == 'image') {
            //         var baseStr64 = edit.defaultOptions.image.imagAry;
            //         // edit.defaultOptions.image.realWidth = json["imageWidth"];
            //         // edit.defaultOptions.image.realHeight = json["imageHeight"];
            //         obj.setSrc("data:image/png;base64," + baseStr64)
            //     }
            // })

            var baseStr64 = edit.defaultOptions.image.imagAry;
            var imgSrc = "data:image/png;base64," + baseStr64;

            const imgEl = document.createElement('img')
            imgEl.crossOrigin = 'Anonymous' // 讓圖片能讓所有人存取
            imgEl.src = imgSrc
            imgEl.onload = () => {
                const image = new fabric.Image(imgEl, {
                    tempDrawShape: true,
                    selectable: false,
                    hasBorders: false,
                    hasControls: false,
                    top: 0,
                    left: 0
                })
                // edit.canvasView.add(image)
                // edit.canvasView.sendToBack(image)
                edit.canvasView.setBackgroundImage(image)
                edit.canvasView.renderAll()
            }
        }
    });

    $('#importFabric').click(function () {
        var json = $('#importfabricJson').val()
        if (json) {
            console.log('xxx')
            edit.canvasView.loadFromJSON(json)
        }
    });

    function pointsArrayToObjs(array){
        var newPoints = []
        for(var i = 0 ; i < array.length; i++) {
            newPoints.push({x:array[i][0], y:array[i][1]})
        }
        return newPoints;
    }
    function pointsObjsToArray(objsArray){
        var newPoints = []
        for(var i = 0 ; i < objsArray.length; i++) {
            newPoints.push([ objsArray[i].x, objsArray[i].y])
        }
        return newPoints;
    }
    window.onOpenCvReady = function(){
        
    }

    $('#simple').click(function () {
        var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex']);
        fabricJson["objects"] = fabricJson["objects"].filter(function (obj) {
            if (!obj['tempDrawShape']) {
                return true;
            } else {
                return false;
            }
        })
        // $('#currentJson').val(JSON.stringify(fabricJson))
        var json = edit.export(fabricJson);
        // json
        if(json.shapes){
            for(var i = 0 ; i < json.shapes.length; i++) {
                if (json.shapes[i]["shape_type"] == "polygon") {
                    console.log('count_in',json.shapes[i]["points"])
                    var newPointObjs = pointsArrayToObjs(json.shapes[i]["points"])
                    newPointObjs = simplify(newPointObjs, 1, false);
                    json.shapes[i]["points"] = pointsObjsToArray(newPointObjs)
                    console.log('count_out',json.shapes[i]["points"])
                }
            }
        }

        edit.import(json);
        var baseStr64 = edit.defaultOptions.image.imagAry;
        var imgSrc = "data:image/png;base64," + baseStr64;

        const imgEl = document.createElement('img')
        imgEl.crossOrigin = 'Anonymous' // 讓圖片能讓所有人存取
        imgEl.src = imgSrc
        imgEl.onload = () => {
            const image = new fabric.Image(imgEl, {
                tempDrawShape: true,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                top: 0,
                left: 0
            })
            edit.canvasView.setBackgroundImage(image)
            edit.canvasView.renderAll()
        }
    }); // ----

    $('#opCV').click(function () {
        var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex']);
        fabricJson["objects"] = fabricJson["objects"].filter(function (obj) {
            if (!obj['tempDrawShape']) {
                return true;
            } else {
                return false;
            }
        })
        // $('#currentJson').val(JSON.stringify(fabricJson))
        var json = edit.export(fabricJson);
    });

    $('#updateMap').click(function () {
        console.log('XXX')
        edit.MiniMap.updateMiniMap();
        edit.MiniMap.updateMiniMapVP();
    })

    window.addEventListener('resize', function () {

        var elem = document.getElementById('content');
        // var elem = document.getElementById(edit.defaultOptions.canvasViewId);
        // console.log('resize',elem.offsetWidth)
        // that.canvasView.setDimensions({width:elem.offsetWidth, height:elem.offsetHeight});
        setTimeout(function () {
            edit.canvasView.setWidth(parseInt(elem.offsetWidth) - 200)
            edit.canvasView.setHeight(parseInt(elem.offsetHeight))
            edit.canvasView.renderAll()
        }, 300)
        // that.canvasView.renderAll()
    });

    window.edit = edit;
})()