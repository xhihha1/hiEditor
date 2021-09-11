var dataStructure = {
  editor: []
}

function appendProp() {

}

function initCanvas(canvasId, canvasViewId) {
  var elem = document.getElementById('content');
  var edit = new hiDraw({
    canvasViewId: 'mainEditor',
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
      import_callback: function () {

      }
    }
  }).createView().viewEvent();
  return edit;
}

(function () {

})()