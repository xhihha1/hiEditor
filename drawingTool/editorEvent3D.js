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

  $('#draw3dPlane').click(function(){
    // edit.removeCanvasEvents();
    // edit.changeSelectableStatus(false);
    // edit.changeCanvasProperty(false, false);
    var elem = document.createElement('canvas')
    elem.id = 'view1'
    elem.width = 500
    elem.height = 500
    var edit = new hiDraw({ canvasViewId: 'view1',
      canvasWidth: 500,
      canvasHeight: 500
    }).createView().viewEvent();
    var fabricJson = JSON.parse(localStorage.getItem('viewJson2D'))
    if (fabricJson) {
      edit.canvasView.loadFromJSON(fabricJson)
    }
    setTimeout(function(){
      var i = edit.canvasView.toDataURL()
      dataStructure.editor[0].hi3d.addPlane({textureSource:{base64:i}})
      console.log('load plane end')
    }, 1000)
  })
  $('#btnGround').click(function(){
    var checked = $(this).prop("checked");
    if(!edit.hi3d.ground) {
      edit.hi3d.addGroundPlane()
    } else {
      edit.hi3d.ground.visible = checked;
    }
    edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  })
  $('#btnGridHelper').click(function(){
    var checked = $(this).prop("checked");
    if(!edit.hi3d.gridHelper) {
      edit.hi3d.setGridHelper()
    } else {
      edit.hi3d.gridHelper.visible = checked;
    }
    edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  })
  $('#btnAxesHelper').click(function(){
    var checked = $(this).prop("checked");
    if(!edit.hi3d.axesHelper) {
      edit.hi3d.addAxesHelper()
    } else {
      edit.hi3d.axesHelper.visible = checked;
    }
    edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  })
  $('#btnLight').click(function(){
    var checked = $(this).prop("checked");
    edit.hi3d.directionalLight.visible = checked;
    edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  })
  $('#btnLightHelper').click(function(){
    var checked = $(this).prop("checked");
    if(!edit.hi3d.dirLightHelper) {
      edit.hi3d.addLightHelper()
    } else {
      edit.hi3d.dirLightHelper.visible = checked;
    }
    edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  })
  
  $('#btnHemisphereLight').click(function(){
    var checked = $(this).prop("checked");
    // edit.hi3d.directionalLight.visible = checked;
    // edit.hi3d.ambientLight.visible = ! edit.hi3d.ambientLight.visible;
    edit.hi3d.hemisphereLight.visible = checked;
    edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  })
  $('#btnHemisphereLightHelper').click(function(){
    var checked = $(this).prop("checked");
    if(!edit.hi3d.hemiLightHelper) {
      edit.hi3d.addHemisphereLightHelper()
    } else {
      edit.hi3d.hemiLightHelper.visible = checked;
    }
    edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  })
  $('#btnAmbientLight').click(function(){
    var checked = $(this).prop("checked");
    edit.hi3d.ambientLight.visible = checked;
    edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  })
  $('#btnSpotLightHelper').click(function(){
    var checked = $(this).prop("checked");
    edit.hi3d.addSpotLightHelper()
    edit.hi3d.scene.traverse(function (node) {
      if (node instanceof THREE.SpotLightHelper) {
        node.visible = checked;
      }
    })
    edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  })
}