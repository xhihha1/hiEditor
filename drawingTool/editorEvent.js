
function editorEvent(edit, objOption) {  
  // 2D --------------------------------------------------
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

  $("#drawPath").click(function () {
    var val = edit.canvasView.isDrawingMode;
    val = !val;
    if (val) {
        edit.removeCanvasEvents()
        edit.changeStatus({ panCanvas: false })
        edit.changeSelectableStatus(false)
        edit.changeCanvasProperty(false, true)
        // var polyline = new edit.Polyline(edit, objOption);
        var path = new edit.Path(edit, this.objOption, {
        className: 'xxx',
        label: 'xxx'
        })
    } else {
        edit.removeCanvasEvents()
        edit.changeCanvasProperty(false, false)
    }
    
  });

  $('#drawDiv').click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var line = new edit.DivHtml(edit, objOption);
  });

  $('#panCanvas').click(function(){
    const panCanvas = !edit.defaultOptions.panCanvas
    edit.changeSelectableStatus(!panCanvas)
    edit.changeStatus({ panCanvas: panCanvas })
  })

  $("#zoomIn").click(function () {
    var zoom = edit.canvasView.getZoom() * 1.1
    if (zoom > 20) zoom = 20
    // edit.canvasView.setZoom(zoom)
    edit.canvasView.zoomToPoint({
      x: edit.canvasView.width / 2,
      y: edit.canvasView.height / 2
    }, zoom)
    edit.BgGrid(true)
  });

  $("#zoomOut").click(function () {
    var zoom = edit.canvasView.getZoom() / 1.1
    if (zoom < 0.01) zoom = 0.01
    // edit.canvasView.setZoom(edit.canvasView.getZoom() / 1.1)
    edit.canvasView.zoomToPoint({
      x: edit.canvasView.width / 2,
      y: edit.canvasView.height / 2
    }, zoom)
    edit.BgGrid(true)
  });

  $("#resize").click(function () {
    edit.canvasView.setZoom(1)
    edit.canvasView.absolutePan({
      x: 0,
      y: 0
    })
  });

  $('#goRight').click(function () {
    var units = 10;
    var delta = new fabric.Point(units, 0);
    edit.canvasView.relativePan(delta);
  });

  $('#goLeft').click(function () {
    var units = 10;
    var delta = new fabric.Point(-units, 0);
    edit.canvasView.relativePan(delta);
  });
  $('#goUp').click(function () {
    var units = 10;
    var delta = new fabric.Point(0, -units);
    edit.canvasView.relativePan(delta);
  });

  $('#goDown').click(function () {
    var units = 10;
    var delta = new fabric.Point(0, units);
    edit.canvasView.relativePan(delta);
  });

  $('#export').click(function () {
    // var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex', 'hiId', 'altitude', 'source']);
    var fabricJson = edit.toFabricJson()
    fabricJson["objects"] = fabricJson["objects"].filter(function (obj) {
      if (!obj['tempDrawShape']) {
        return true;
      } else {
        return false;
      }
    })
    // $('#currentJson').val(JSON.stringify(fabricJson))
    var json = edit.export(fabricJson);
    $('#exportJson').val(JSON.stringify(json, null, 2))
  });

  $('#exportFabric').click(function () {
    // var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex', 'hiId', 'altitude', 'source']);
    var fabricJson = edit.toFabricJson()
    fabricJson["objects"] = fabricJson["objects"].filter(function (obj) {
      if (!obj['tempDrawShape']) {
        return true;
      } else {
        return false;
      }
    })
    $('#currentJson').val(JSON.stringify(fabricJson, null, 2))
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
        // edit.canvasView.renderAll()
        edit.viewRender()
      }
    }
  });

  $('#importFabric').click(function () {
    var json = $('#importfabricJson').val()
    if (json) {
      console.log('xxx')
      edit.canvasView.loadFromJSON(json)
      var result = JSON.parse(json)
      if(typeof result.sceneProp === 'string') {
        result.sceneProp = JSON.parse(result.sceneProp)
      }
      edit.hi3d.setCamera(result.sceneProp.camera)
    }
  });
  
  $('#downloadJson').click(function () {
    var filename = 'hiEditor_' + new Date().getTime()
    edit.downloadObjectAsJson(edit.toFabricJson(), filename)
  });
    
  $('#uploadJson').on('change', function (e) {
    var file = e.target.files[0];
    if (file) {
      var fileName = file.name;
      var fileType = file.type;
      if (fileType.match('application/json')) {
        var reader = new FileReader();
        reader.onload = function() {
          var result = JSON.parse(this.result)
          edit.canvasView.loadFromJSON(this.result)
          if(typeof result.sceneProp === 'string') {
            result.sceneProp = JSON.parse(result.sceneProp)
          }
          if (result.sceneProp &&　result.sceneProp.camera) {
            edit.hi3d.setCamera(result.sceneProp.camera)
          }
        }
        reader.readAsText(file);
      }
    }
  });

  $('#saveFabricImage2D').click(function() {
    let data = edit.canvasView.toDataURL();
    let w = window.open('about:blank');
    let image = new Image();
    image.src = data;
    setTimeout(function(){
      w.document.write(image.outerHTML);
    }, 0);
  });

  $('#saveFabricLocalStorage2D').click(function(){
    console.log('view 2d')
    // var fabricJson = edit.canvasView.toJSON(['hiId', 'altitude', 'source']);
    var fabricJson = edit.toFabricJson()
    localStorage.setItem('viewJson2D', JSON.stringify(fabricJson))
    window.open('drawingToolView2D.html', '_blank').focus();
  })

  $('#saveFabricLocalStorage3D').click(function(){
    // var fabricJson = edit.canvasView.toJSON(['hiId', 'altitude', 'source']);
    var fabricJson = edit.toFabricJson()
    localStorage.setItem('viewJson3D', JSON.stringify(fabricJson))
    window.open('drawingToolView3D.html', '_blank').focus();
  })

  var showaxis = false
  $('#axis').click(function (e) {
    console.log('A click')
    edit.BgGrid()

    // showaxis = !showaxis
    // if (showaxis) {
    //   var canvasTemplate
    //   if (document.getElementById('tempaxis')) {
    //     canvasTemplate = document.getElementById('tempaxis')
    //   } else {
    //     canvasTemplate = document.createElement('canvas')
    //     canvasTemplate.id = 'tempaxis'
    //     document.getElementById(edit.defaultOptions.canvasViewId).parentNode.appendChild(canvasTemplate)
    //   }
    //   canvasTemplate.style.position = 'absolute'
    //   canvasTemplate.style.top = '0px'
    //   canvasTemplate.style.left = '0px'
    //   canvasTemplate.style.zIndex = '-100'
    //   canvasTemplate.style.pointerEvents = 'none'
    //   canvasTemplate.width = document.getElementById(edit.defaultOptions.canvasViewId).width
    //   canvasTemplate.height = document.getElementById(edit.defaultOptions.canvasViewId).height
    //   var ctx = canvasTemplate.getContext("2d");
    //   var canvas = edit.canvasView;
    //   var canvasZoom = canvas.getZoom();
    //   var lt = fabric.util.transformPoint({
    //     x: 0,
    //     y: 0
    //   }, fabric.util.invertTransform(canvas.viewportTransform))
    //   var unitWidth = canvasZoom
    //   var shiftUnitX = (lt.x % 10) < 0 ? Math.abs(lt.x % 10) : -1 * Math.abs(lt.x % 10);
    //   var shiftPixelX = shiftUnitX * unitWidth
    //   var shiftUnitY = (lt.y % 10) < 0 ? Math.abs(lt.y % 10) : -1 * Math.abs(lt.y % 10);
    //   var shiftPixelY = shiftUnitY * unitWidth
    //   var x = shiftPixelX,
    //     y = shiftPixelY;
    //   ctx.lineWidth = 1;
    //   ctx.strokeStyle = 'rgba(200,200,200, 0.9)'
    //   while (x < canvasTemplate.width) {
    //     var p = fabric.util.transformPoint({
    //       x: x,
    //       y: 0
    //     }, fabric.util.invertTransform(canvas.viewportTransform))
    //     if (p.x === 0) { ctx.lineWidth = 2; }
    //     else { ctx.lineWidth = 1; }
    //     ctx.beginPath();
    //     ctx.moveTo(x, 0);
    //     ctx.lineTo(x, canvasTemplate.height);
    //     ctx.stroke();
    //     x += (10 * canvasZoom)
    //   }
    //   while (y < canvasTemplate.height) {
    //     var p = fabric.util.transformPoint({
    //       x: 0,
    //       y: y
    //     }, fabric.util.invertTransform(canvas.viewportTransform))
    //     if (p.y === 0) { ctx.lineWidth = 2; }
    //     else { ctx.lineWidth = 1; }
    //     ctx.beginPath();
    //     ctx.moveTo(0, y);
    //     ctx.lineTo(canvasTemplate.width, y);
    //     ctx.stroke();
    //     y += (10 * canvasZoom)
    //   }
    // } else {
    //   var canvasTemplate = document.getElementById('tempaxis')
    //   if (canvasTemplate) {
    //     var ctx = canvasTemplate.getContext("2d");
    //     ctx.clearRect(0, 0, canvasTemplate.width, canvasTemplate.height);
    //   }
    // }
  })

  var oX, endX, oXo, endXo
  var oY, endY, oYo, endYo
  var oW, oH, oWo, oHo
  var startDrawing = false
  function startSelectMagnifyArea(e) {
    var o
      if (document.getElementById('selectView')) {
        const canvasSelectTemplate = document.getElementById('selectView')
        const ctx = canvasSelectTemplate.getContext('2d')
        if (!startDrawing) {
          startDrawing = true
          oX = e.offsetX
          oY = e.offsetY
          o = fabric.util.transformPoint({
            x: oX,
            y: oY
          }, fabric.util.invertTransform(edit.canvasView.viewportTransform))
          oXo = o.x
          oYo = o.y
        } else {
          startDrawing = false
          var zoom = edit.canvasView.getZoom()
          var zoomRateW = edit.canvasView.width / oW
          var zoomRateH = edit.canvasView.height / oH
          var zoomRate = Math.min(zoomRateW, zoomRateH)
          o = fabric.util.transformPoint({
            x: endX,
            y: endY
          }, fabric.util.invertTransform(edit.canvasView.viewportTransform))
          endXo = o.x
          endYo = o.y
          var ary = new Array(6)
          ary = edit.canvasView.viewportTransform
          var pointer = fabric.util.transformPoint({
            x: edit.canvasView.width / 2,
            y: edit.canvasView.height / 2
          }, fabric.util.invertTransform(edit.canvasView.viewportTransform))
          var center = { x: (oXo + endXo) / 2, y: (oYo + endYo) / 2 }
          var centerMoveMatirx = [1, 0, 0, 1, pointer.x - center.x, pointer.y - center.y]

          var delta = new fabric.Point(pointer.x - center.x, pointer.y - center.y);
          edit.canvasView.relativePan(delta);
          let zoomF = Math.floor(zoom * zoomRate)
          edit.canvasView.zoomToPoint({
            x: edit.canvasView.width / 2,
            y: edit.canvasView.height / 2
          }, zoomF)
          edit.canvasView.renderAll()
          ctx.clearRect(0, 0, canvasSelectTemplate.width, canvasSelectTemplate.height)
          canvasSelectTemplate.parentNode.removeChild(canvasSelectTemplate)
        }
      }
  }
  function moveSelectMagnifyArea (e) {
    if (document.getElementById('selectView')) {
      const canvasSelectTemplate = document.getElementById('selectView')
      const ctx = canvasSelectTemplate.getContext('2d')
      if (startDrawing) {
        endX = e.offsetX
        endY = e.offsetY
        ctx.clearRect(0, 0, canvasSelectTemplate.width, canvasSelectTemplate.height)
        ctx.strokeStyle = '#FFFFFF'
        ctx.fillStyle = 'rgba(255,255,255,0.2)'
        ctx.lineWidth = 2
        oW = Math.abs(endX - oX)
        oH = Math.abs(endY - oY)
        ctx.beginPath()
        ctx.setLineDash([2, 2])
        ctx.rect(
          Math.min(oX, endX),
          Math.min(oY, endY),
          Math.abs(endX - oX),
          Math.abs(endY - oY)
        )
        ctx.stroke()
        ctx.fill()
        // line arrow
        if (Math.abs(oX - endX) > 10 && Math.abs(oY - endY) > 10) {
          ctx.beginPath()
          ctx.moveTo((oX - endX) > 0? oX - 10: oX + 10, (oY - endY) > 0? oY - 10: oY + 10)
          ctx.lineTo((oX - endX) > 0? endX + 10: endX - 10, (oY - endY) > 0? endY + 10: endY - 10)
          ctx.stroke()
          ctx.setLineDash([])
          ctx.fillStyle = 'rgba(255,255,255,1)'
          ctx.beginPath()
          var end = {
            x: (oX - endX) > 0? endX + 10: endX - 10,
            y: (oY - endY) > 0? endY + 10: endY - 10
          }
          ctx.moveTo(end.x, end.y)
          var xDiff = endX - oX;
          var yDiff = endY - oY;
          var angle = Math.atan2(yDiff, xDiff);
          var a1 = fabric.util.rotatePoint(new fabric.Point(10,0),new fabric.Point(0,0), angle + 165 * Math.PI / 180)
          var a2 = fabric.util.rotatePoint(new fabric.Point(10,0),new fabric.Point(0,0), angle - 165 * Math.PI / 180)
          ctx.lineTo(end.x + a1.x, end.y + a1.y)
          ctx.lineTo(end.x + a2.x, end.y + a2.y)
          ctx.closePath()
          ctx.stroke()
          ctx.fill()
        }
      }
    }
  }

  var showSelect = false
  $('#selectArea').click(function (e) {
    showaxis = !showaxis
    if (showaxis) {
      var canvasTemplate
      if (document.getElementById('selectView')) {
        canvasTemplate = document.getElementById('selectView')
      } else {
        canvasTemplate = document.createElement('canvas')
        canvasTemplate.id = 'selectView'
        document.getElementById(edit.defaultOptions.canvasViewId).parentNode.appendChild(canvasTemplate)
      }
      canvasTemplate.style.position = 'absolute'
      canvasTemplate.style.top = '0px'
      canvasTemplate.style.left = '0px'
      canvasTemplate.style.zIndex = '100'
      canvasTemplate.style.background = 'rgba(0,0,0,0.3)'
      // canvasTemplate.style.pointerEvents = 'none'
      canvasTemplate.width = edit.canvasView.width
      canvasTemplate.height = edit.canvasView.height
      canvasTemplate.addEventListener('mousedown', startSelectMagnifyArea, false)
      canvasTemplate.addEventListener('mousemove', moveSelectMagnifyArea, false)
    } else {
      if (document.getElementById('selectView')) {
        var elem = document.getElementById('selectView')
        elem.parentNode.removeChild(elem)
      }
    }
  })

  $('#objlistParent').click(function (e) {
    var target = e.target
    if ($(target).is('li')) {
      var hiId = $(target).html().split('/')[2]
      edit.canvasView.forEachObject(function (obj) {
        if (obj.hiId === hiId) {
          edit.canvasView.setActiveObject(obj);
        }
      })
    }
  })

  $('#drawGroup').click(function (e) {
    edit.addGroupSelection()
  })

  $('#drawUngroup').click(function (e) {
    edit.unGroupSelection()
  })


  function pointsArrayToObjs(array) {
    var newPoints = []
    for (var i = 0; i < array.length; i++) {
      newPoints.push({
        x: array[i][0],
        y: array[i][1]
      })
    }
    return newPoints;
  }

  function pointsObjsToArray(objsArray) {
    var newPoints = []
    for (var i = 0; i < objsArray.length; i++) {
      newPoints.push([objsArray[i].x, objsArray[i].y])
    }
    return newPoints;
  }

  window.addEventListener('resize', function () {

    var elem = document.getElementById('content');
    // var elem = document.getElementById(edit.defaultOptions.canvasViewId);
    // console.log('resize',elem.offsetWidth)
    // that.canvasView.setDimensions({width:elem.offsetWidth, height:elem.offsetHeight});
    setTimeout(function () {
      edit.canvasView.setWidth(parseInt(elem.offsetWidth))
      edit.canvasView.setHeight(parseInt(elem.offsetHeight))
      edit.BgGrid(true)
      edit.viewRender()
    }, 300)
    // that.canvasView.renderAll()
  });
}