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
    var model = $('#sourceObjVal').val()
    var polyline = new edit.HiFormatObj(edit, objOption, { source: { obj: model}});
  });

  $("#draw3dHiFormatCollada").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var model = $('#sourceDaeVal').val()
    var polyline = new edit.HiFormatCollada(edit, objOption, { source: { dae: model}});
  });

  $("#draw3dHiFormatSTL").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var model = $('#sourceStlVal').val()
    var polyline = new edit.HiFormatSTL(edit, objOption, { source: { stl: model}});
  });

  $("#draw3dHiFormat3DS").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var model = $('#source3dsVal').val()
    var textures = $('#source3dsTexturesVal').val()
    var normalMap = $('#source3dsNormalMapVal').val()
    var polyline = new edit.HiFormat3ds(edit, objOption, {
      source: {
        f_3ds: model,
        f_3dsTextures: textures,
        f_3dsNormalMap: normalMap
      }
    });
  });

  $("#draw3dHiFormatGLTF").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var model = $('#sourceGltf').val()
    var path = $('#sourceGltfPath').val()
    // assets\gltf\DamagedHelmet
    var polyline = new edit.HiFormatGLTF(edit, objOption, {
      source: {
        gltfPath: path,
        gltf: model
      }
    });
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
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnGridHelper').click(function(){
    var checked = $(this).prop("checked");
    if(!edit.hi3d.gridHelper) {
      edit.hi3d.setGridHelper()
    } else {
      edit.hi3d.gridHelper.visible = checked;
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnAxesHelper').click(function(){
    var checked = $(this).prop("checked");
    if(!edit.hi3d.axesHelper) {
      edit.hi3d.addAxesHelper()
    } else {
      edit.hi3d.axesHelper.visible = checked;
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnLight').click(function(){
    var checked = $(this).prop("checked");
    edit.hi3d.directionalLight.visible = checked;
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnLightHelper').click(function(){
    var checked = $(this).prop("checked");
    if(!edit.hi3d.dirLightHelper) {
      edit.hi3d.addLightHelper()
    } else {
      edit.hi3d.dirLightHelper.visible = checked;
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  
  $('#btnHemisphereLight').click(function(){
    var checked = $(this).prop("checked");
    // edit.hi3d.directionalLight.visible = checked;
    // edit.hi3d.ambientLight.visible = ! edit.hi3d.ambientLight.visible;
    edit.hi3d.hemisphereLight.visible = checked;
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnHemisphereLightHelper').click(function(){
    var checked = $(this).prop("checked");
    if(!edit.hi3d.hemiLightHelper) {
      edit.hi3d.addHemisphereLightHelper()
    } else {
      edit.hi3d.hemiLightHelper.visible = checked;
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnAmbientLight').click(function(){
    var checked = $(this).prop("checked");
    edit.hi3d.ambientLight.visible = checked;
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnSpotLightHelper').click(function(){
    var checked = $(this).prop("checked");
    edit.hi3d.addSpotLightHelper()
    edit.hi3d.scene.traverse(function (node) {
      if (node instanceof THREE.SpotLightHelper) {
        node.visible = checked;
      }
    })
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnCameraHelper').click(function(){
    var checked = $(this).prop("checked");
    if(!edit.hi3d.cameraHelper) {
      edit.hi3d.addCameraHelper()
    } else {
      edit.hi3d.cameraHelper.visible = checked;
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnBoxHelper').click(function(){
    var checked = $(this).prop("checked");
    var boxs = []
    edit.hi3d.scene.traverse(function (node) {
      if (node instanceof THREE.BoxHelper) {
        boxs.push(node)
      }
    });
    for (let i = 0; i < boxs.length; i++) {
      edit.hi3d.scene.remove(boxs[i]);
    }
    if(checked) {
      edit.hi3d.addBoxHelper()
    } 
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
}