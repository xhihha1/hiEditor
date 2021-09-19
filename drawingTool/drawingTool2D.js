var dataStructure = {
  editor: []
}



function appendProp() {

}

function initCanvas(canvasId, canvasViewId) {
  var elem = document.getElementById(canvasId);
  var edit = new hiDraw({
    canvasViewId: canvasViewId,
    // viewJsonTextId: 'hiJsonArea',
    // activeJsonTextId: 'hiActiveJsonArea',
    canvasWidth: elem.offsetWidth,
    canvasHeight: elem.offsetHeight,
    objectDefault: {
      fillAlpha: 0,
      lineWidth: 1,
      strokeColor: 'rgba(51, 51, 51, 1)'
    },
    event: {
      object_added: function (opt) {},
      object_modified: function (opt) {},
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
          if (obj['tempDrawShape']) {} else {
            listStr += '<li>' + obj.get('type') + '/' + obj['name'] + '/' + obj['label'] + '</li>'
          }
        })
        $('#objlist').html(listStr)
      },
      selection_created: function (opt) {
        if (opt.target) {
          $('#objPropType').val(opt.target.get('type'))
          $('#objPropName').val(opt.target.get('name'))
          $('#objPropLabel').val(opt.target.get('label'))
          $('#objPropStroke').val(opt.target.get('stroke'))
          $('#newPropStroke').val(opt.target.get('stroke'))
          $('#newPropFill').val(opt.target.get('fill'))
          $('#newPropAltitude').val(parseInt(opt.target.get('altitude')) || 0)
        }
      },
      selection_updated: function (opt) {
      },
      selection_cleared: function (opt) {
      },
      import_callback: function () {

      }
    }
  }).createView().viewEvent();


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

  edit.canvasOption = objOption

  return edit;
}

function objectPropertyChange(edit, objOption) {
  $('#propChange').click(function () {

    var activeObj = edit.canvasView.getActiveObject();
    activeObj.set({
      stroke: $('#newPropStroke').val()
    });
    edit.canvasView.renderAll();
  })
  $('#propChangeFill').click(function () {

    var activeObj = edit.canvasView.getActiveObject();
    activeObj.set({
      fill: $('#newPropFill').val()
    });
    edit.canvasView.renderAll();
  })
  $('#propChangeAltitude').click(function () {

    var activeObj = edit.canvasView.getActiveObject();
    if (activeObj) {
      activeObj.set({
        altitude: $('#newPropAltitude').val()
      });
    }
    edit.canvasView.renderAll();
  })
}


function addImageObj(edit, objOption) {
  var canvas = edit.canvasView;
  $('#imageIconArea').click(function (e) {
    var target = e.target;
    if ($(target).attr('src')) {
      fabric.Image.fromURL($(target).attr('src'), function (img) {
        var oImg = img.set({
          left: 0,
          top: 0
        }).scale(0.25);
        canvas.add(oImg);
      });
    }
  })
  // var activeObject = canvas.getActiveObject();
  //  activeObject.setSrc(data.url);
}

function addVideoObj(edit, objOption) {
  var canvas = edit.canvasView;
  $('#video').click(function (e) {
    var target = e.target;
    var canvasTemplate
    if (document.getElementById('tempVideo')) {
      canvasTemplate = document.getElementById('tempVideo')
    } else {
      canvasTemplate = document.createElement('video')
      canvasTemplate.id = 'tempVideo'
      document.getElementById(edit.defaultOptions.canvasViewId).parentNode.appendChild(canvasTemplate)
    }
    canvasTemplate.width = 300
    canvasTemplate.height = 200
    canvasTemplate.style.display = 'none'
    canvasTemplate.innerHTML = '<source src="http://html5demos.com/assets/dizzy.mp4">'
    var video1El = canvasTemplate;
    var video1 = new fabric.Image(video1El, {
      left: 0,
      top: 0,
      angle: 0,
      originX: 'left',
      originY: 'top',
      objectCaching: false,
    });
    canvas.add(video1);
    video1.getElement().play();
  })
}


(function () {
  dataStructure.editor.push(initCanvas('content', 'mainEditor'))
  editorEvent(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  addHichartObj(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  objectPropertyChange(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  dataStructure.editor[0].heatmapInstance = heatmapCreate(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  window.requestAnimationFrame(() => {
    heatmapSetData(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  });
  addImageObj(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  addVideoObj(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  basicDraw(dataStructure.editor[0], dataStructure.editor[0].canvasOption)

  // 影片如果要自動撥放需要持續更新
  // fabric.util.requestAnimFrame(function render() {
  //   dataStructure.editor[0].canvasView.renderAll();
  //   fabric.util.requestAnimFrame(render);
  // });
  // editor3D(dataStructure.editor[0], dataStructure.editor[0].canvasOption) 
})()