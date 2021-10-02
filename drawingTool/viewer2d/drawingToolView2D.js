var dataStructure = {
  editor: [],
  viewer: []
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

  return edit;
}

function importJson(edit, objOption) {
  // var fabricJson = edit.canvasView.toJSON(['hiId', 'altitude', 'source']);
  var fabricJson = JSON.parse(localStorage.getItem('viewJson2D'))
  console.log(fabricJson)
  if (fabricJson) {
    edit.canvasView.loadFromJSON(fabricJson)
  }
}

function viewerRefresh (edit, objOption) {
  // edit.canvasView.forEachObject(function(i){ i.set('fill', 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')')})
}

(function () {
  dataStructure.viewer.push(initCanvas('content', 'mainEditor'))
  dataStructure.viewer[0].heatmapInstance = heatmapCreate(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
  window.requestAnimationFrame(() => {
    heatmapSetData(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
  });

  
  importJson(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)

  // 影片如果要自動撥放需要持續更新
  fabric.util.requestAnimFrame(function render() {
    // dataStructure.viewer[0].canvasView.renderAll();
    dataStructure.viewer[0].viewRender()
    viewerRefresh(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
    fabric.util.requestAnimFrame(render);
  });
})()