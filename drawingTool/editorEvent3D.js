function editorEvent3D(edit, objOption) {
  $('#render3D').click(function () {
    edit.hi3d.refreshByFabricJson(edit, objOption)
    edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  });

  $("#drawCamera").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var circle = new edit.HiCamera(edit, objOption);
  });
  $("#drawLookAt").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var circle = new edit.HiLookAt(edit, objOption);
  });
  $("#drawSpotLight").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var circle = new edit.HiSpotLight(edit, objOption);
  });
  $("#drawCube").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var circle = new edit.HiCube(edit, objOption);
  });
  $("#drawSphere").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var squrect = new edit.HiSphere(edit, objOption);
  });
  $("#draw3dPolyline").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var polyline = new edit.Hi3DPolyline(edit, objOption);
  });

  $("#draw3dHiFormatObj").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var polyline = new edit.HiFormatObj(edit, objOption, { source: { obj: './assets/male02.obj'}});
  });

  $("#draw3dHiFormatCollada").click(function () {
    console.log('load Collada')
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var polyline = new edit.HiFormatCollada(edit, objOption, { source: { dae: './assets/elf/elf.dae'}});
  });
}