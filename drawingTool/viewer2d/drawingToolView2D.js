window.dataStructure = {
  editor: [],
  viewer: []
}

function hi2dViewer(canvasId, canvasViewId) {
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
      after_render: function (opt) {},
      selection_created: function (opt) {
        if (opt.target) {}
      },
      selection_updated: function (opt) {},
      selection_cleared: function (opt) {},
      import_callback: function () {}
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
  this.edit = edit

  return this;
}

hi2dViewer.prototype.importJson = function (objOption) {
  this.edit.mergeDeep(this.edit.defaultOptions, objOption)
  // var fabricJson = edit.canvasView.toJSON(['hiId', 'altitude', 'source']);
  this.fabricJson = JSON.parse(localStorage.getItem('viewJson2D'))
  if (this.fabricJson) {
    this.edit.canvasView.loadFromJSON(this.fabricJson)
  }
}

hi2dViewer.prototype.viewerRefresh = function (objOption) {
  // this.edit.canvasView.forEachObject(function(i){ i.set('fill', 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')')})
  setTimeout(function(){
    this.viewerRefresh(objOption)
  }.bind(this), 1000)
}

// (function () {
  dataStructure.viewer.push(new hi2dViewer('content', 'mainEditor'))
  dataStructure.viewer[0].edit.heatmapInstance = heatmapCreate(dataStructure.viewer[0].edit, dataStructure.viewer[0].edit.canvasOption)
  window.requestAnimationFrame(() => {
    heatmapSetData(dataStructure.viewer[0].edit, dataStructure.viewer[0].edit.canvasOption)
  });

  dataStructure.viewer[0].importJson(dataStructure.viewer[0].edit.canvasOption)
  dataStructure.viewer[0].edit.renderDataBinding()

  // 影片如果要自動撥放需要持續更新
  // fabric.util.requestAnimFrame(function render() {
  //   // dataStructure.viewer[0].edit.canvasView.renderAll();
  //   dataStructure.viewer[0].edit.viewRender()
  //   viewerRefresh(dataStructure.viewer[0].edit.canvasOption)
  //   fabric.util.requestAnimFrame(render);
  // });
// })()
