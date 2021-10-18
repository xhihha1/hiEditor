var dataStructure = {
  editor: []
}

function hiEditor3d(canvasId, canvasViewId) {
  this.defaultEditorOption = {
    default2Doption: {
      canvasId: canvasId,
      canvasViewId: canvasViewId
    },
    default3Doption: {

    }
  }
  this.initCanvas2d()
  return this
}

hiEditor3d.prototype.initCanvas2d = function () {
  var elem = document.getElementById(this.defaultEditorOption.default2Doption.canvasId);
  var edit = new hiDraw({
    canvasViewId: this.defaultEditorOption.default2Doption.canvasViewId,
    canvasWidth: elem.offsetWidth,
    canvasHeight: elem.offsetHeight,
    objectDefault: {
      fillAlpha: 0,
      lineWidth: 1,
      strokeColor: 'rgba(51, 51, 51, 1)'
    },
    event: {
      object_added: function (opt) {
        console.log('object_added')
        if (opt.target.hiId) {
          edit.viewRender()
          showObjPropChange(opt.target);
          edit.hi3d.refreshByFabricJson(edit);
        }
        var listStr = '';
        edit.canvasView.forEachObject(function (obj) {
          if (obj['tempDrawShape']) {} else {
            listStr += '<li>' + obj.get('type') + '/' + obj['name'] + '/' + obj['hiId'] + '</li>'
          }
        })
        $('#objlist').html(listStr)
      },
      object_modified: function (opt) {
        console.log('object_modified')
        if (opt.target.hiId) {
          edit.viewRender()
          showObjPropChange(opt.target);
          edit.hi3d.refreshByFabricJson(edit);
        }
        if (opt.target.get('type') === 'activeSelection') {
          var needRefresh3d = false
          opt.target.forEachObject(function (object) {
            if (object.hiId) {
              needRefresh3d = true
            }
          });
          if (needRefresh3d) {
            edit.hi3d.refreshByFabricJson(edit);
          }
        }
      },
      object_removed: function (opt) {
        console.log('object_removed')
        if (opt.target.hiId) {
          if (edit.hiObjectList[opt.target.hiId]) {
            edit.hiObjectList[opt.target.hiId] = null
          }
          showObjPropChange(opt.target);
          edit.hi3d.refreshByFabricJson(edit);
        }
        var listStr = '';
        edit.canvasView.forEachObject(function (obj) {
          if (obj['tempDrawShape']) {} else {
            listStr += '<li>' + obj.get('type') + '/' + obj['name'] + '/' + obj['hiId'] + '</li>'
          }
        })
        $('#objlist').html(listStr)
      },
      after_render: function (opt) {
        // console.log('after_render')
        // var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex', 'hiId', 'altitude', 'source', 'depth']);
        // 暫時不更新 屬性，不然time interval 會造成無法改值
        // var activeObj = edit.canvasView.getActiveObject();
        // if(activeObj &&　activeObj.hiId){
        //   showObjPropChange(activeObj);
        // }
        var fabricJson = edit.toFabricJson()
        fabricJson["objects"] = fabricJson["objects"].filter(function (obj) {
          if (!obj['tempDrawShape']) {
            return true;
          } else {
            return false;
          }
        })
        $('#currentJson').val(JSON.stringify(fabricJson))
        // edit.hi3d.refreshByFabricJson(edit);
      },
      selection_created: function (opt) {
        if (opt.target) {
          if (opt.target.hiId) {
            showObjPropChange(opt.target)
            edit.hi3d.scene.traverse(function (node) {
              if ((node instanceof THREE.Mesh || node instanceof THREE.Group) &&
                node.hiId === opt.target.hiId) {
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
          showObjPropChange(opt.target)
          edit.hi3d.scene.traverse(function (node) {
            if (node instanceof THREE.Mesh && node.hiId === opt.target.hiId) {
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
  }).createView().viewEvent().BgGrid(true);

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

  // 移動 (0, 0) 至中心
  var canvasZoom = edit.canvasView.getZoom();
  var shiftX = edit.canvasView.width / 2 / canvasZoom;
  var shiftY = edit.canvasView.height / 2 / canvasZoom;
  edit.canvasView.absolutePan({
    x: -1 * shiftX,
    y: -1 * shiftY
  })
  edit.BgGrid(true);

  this.edit = edit
  return this
}