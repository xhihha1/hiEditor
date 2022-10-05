function editorEvent2D(edit, objOption) {
  $('#applySampleFile').click(function(){
    const fileName = $('#sampleFileSelected').val()
    var oReq = new XMLHttpRequest();
    oReq.open("GET", fileName, true);
    oReq.responseType = "json";
    oReq.onload = function (oEvent) {
      const result = oReq.response; // Note: not oReq.responseText
      edit.canvasView.loadFromJSON(result)
      if(typeof result.sceneProp === 'string') {
        result.sceneProp = JSON.parse(result.sceneProp)
      }
      if (result.sceneProp &&　result.sceneProp.camera) {
        edit.hi3d.setCamera(result.sceneProp.camera)
      }
    };
    oReq.send(null);
  })
  $('#openSampleDialog').click(function(){
    $('#sampleDialog').show()
  })
  $('#openExportFabricDialog').click(function () {
    $('#exportFabricDialog').show()
  })
  $('#openExportLabelmeDialog').click(function () {
    $('#exportLabelmeDialog').show()
  })
  $('#openImportFabricDialog').click(function () {
    $('#importFabricDialog').show()
  })
  $('#openImportLabelmeDialog').click(function () {
    $('#importLabelmeDialog').show()
  })
  $('#openPanCtrl').click(function(){
    $('#panCtrl').show()
  })
  $('#openObjectListDialog').click(function(){
    $('#objectListDialog').show()
  })
  $('#openHeatmapSettingDialog').click(function(){
    $('#heatmapSettingDialog').show()
  })
  $('#openDisplayPropDialog').click(function(){
    $('#displayPropDialog').show()
  })
  $('#openObjPropDialog').click(function(){
    $('#objPropDialog').show()
  })
  $('#openHichartDialog').click(function(){
    $('#hichartDialog').show()
  })
  $('#openImgObjDialog').click(function(){
    $('#imgObjDialog').show()
  })
  $('#openVideoObjDialog').click(function(){
    $('#videoObjDialog').show()
  })
  $('#openMapObjDialog').click(function(){
    $('#mapObjDialog').show()
  })
  
}