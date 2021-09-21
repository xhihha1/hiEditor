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
      object_added: function (opt) { edit.hi3d.refreshByFabricJson(edit); },
      object_modified: function (opt) { edit.hi3d.refreshByFabricJson(edit); },
      object_removed: function (opt) { edit.hi3d.refreshByFabricJson(edit); },
      after_render: function (opt) {
        // var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex', 'hiId', 'altitude', 'source', 'depth']);
        var fabricJson = edit.toFabricJson()
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
        // edit.hi3d.refreshByFabricJson(edit);
      },
      selection_created: function (opt) {
        if (opt.target) {
          $('#objPropType').val(opt.target.get('type'))
          $('#objPropName').val(opt.target.get('name'))
          $('#objPropLabel').val(opt.target.get('label'))
          $('#objPropStroke').val(opt.target.get('stroke'))
          if(opt.target.get('source')){$('#objPropSourceObj').val(opt.target.get('source').obj)}
          $('#newPropStroke').val(opt.target.get('stroke'))
          $('#newPropFill').val(opt.target.get('fill'))
          $('#newPropAltitude').val(parseInt(opt.target.get('altitude')) || 0)
          $('#newPropDepth').val(parseInt(opt.target.get('depth')) || 0)
          if (opt.target.hiId) {
            edit.hi3d.scene.traverse(function (node) {
              if ( node instanceof THREE.Mesh && node.hiId === opt.target.hiId) {
                edit.hi3d.setTransformControlsMesh(node)
                // edit.hi3d.refreshByFabricJson(edit);
              }
            })
          } else {
            edit.hi3d.setTransformControlsMesh()
          }
        }
      },
      selection_updated: function (opt) {
        if (opt.target.hiId) {
          edit.hi3d.scene.traverse(function (node) {
            if ( node instanceof THREE.Mesh && node.hiId === opt.target.hiId) {
              edit.hi3d.setTransformControlsMesh(node)
              // edit.hi3d.refreshByFabricJson(edit);
            }
          })
        } else {
          edit.hi3d.setTransformControlsMesh()
        }
      },
      selection_cleared: function (opt) {
        edit.hi3d.disposeTransformControlsMesh()
        // edit.hi3d.refreshByFabricJson(edit);
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
    edit.hi3d.refreshByFabricJson(edit);
  })
  $('#propChangeFill').click(function () {

    var activeObj = edit.canvasView.getActiveObject();
    activeObj.set({
      fill: $('#newPropFill').val()
    });
    edit.canvasView.renderAll();
    edit.hi3d.refreshByFabricJson(edit);
  })
  $('#propChangeAltitude').click(function () {

    var activeObj = edit.canvasView.getActiveObject();
    if (activeObj) {
      activeObj.set({
        altitude: $('#newPropAltitude').val()
      });
    }
    edit.canvasView.renderAll();
    edit.hi3d.refreshByFabricJson(edit);
  })
  $('#propChangeDepth').click(function () {

    var activeObj = edit.canvasView.getActiveObject();
    if (activeObj) {
      activeObj.set({
        depth: $('#newPropDepth').val()
      });
    }
    edit.canvasView.renderAll();
    edit.hi3d.refreshByFabricJson(edit);
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
  editorEvent3D(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  initCanvas3D(dataStructure.editor[0], dataStructure.editor[0].canvasOption) 
})()