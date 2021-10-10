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
  $("#drawPointLight").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var circle = new edit.HiPointLight(edit, objOption);
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

  $("#draw3dPolygon").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var polyline = new edit.Hi3DPolygon(edit, objOption);
  });

  $("#draw3dPlaneGround").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var HiPlane = new edit.HiPlane(edit, objOption);
  });
  
  $("#draw3dWall").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var HiPlane = new edit.HiWall(edit, objOption);
  });

  $('#add3dObj').click(function (e) {
    edit.hi3d.addObj()
    edit.hi3d.refreshByFabricJson(edit);
  })

  $('#addAxesHelper').click(function (e) {
    edit.hi3d.addAxesHelper()
    edit.hi3d.refreshByFabricJson(edit);
  })

  $("#draw3dHiFormatObj").click(function () {
    console.log('click obj')
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

  
  $("#draw3dHiFormatNRRD").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var model = $('#sourceNrrd').val()
    // assets\gltf\DamagedHelmet
    var polyline = new edit.HiFormatNrrd(edit, objOption, {
      source: {
        nrrd: model
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
  // $('#btnLight').click(function(){
  //   var checked = $(this).prop("checked");
  //   edit.hi3d.directionalLight.visible = checked;
  //   // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  //   edit.hi3d.viewRender()
  // })
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
  
  // $('#btnHemisphereLight').click(function(){
  //   var checked = $(this).prop("checked");
  //   // edit.hi3d.directionalLight.visible = checked;
  //   // edit.hi3d.ambientLight.visible = ! edit.hi3d.ambientLight.visible;
  //   edit.hi3d.hemisphereLight.visible = checked;
  //   // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  //   edit.hi3d.viewRender()
  // })
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
  // $('#btnAmbientLight').click(function(){
  //   var checked = $(this).prop("checked");
  //   edit.hi3d.ambientLight.visible = checked;
  //   // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  //   edit.hi3d.viewRender()
  // })
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
  $('#tc_enable').click(function(){
    var checked = $(this).prop("checked");
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.enabled = checked;
    } else {
      $(this).prop("checked", true);
    }
  })
  $('#tc_translate').click(function(){
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setMode( 'translate' );
    }
  })
  $('#tc_rotate').click(function(){
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setMode( 'rotate' );
    }
  })
  $('#tc_scale').click(function(){
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setMode( 'scale' );
    }
  })
  $('#tc_sizePlus').click(function(){
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setSize( edit.hi3d.transformControls.size + 0.1 );
    }
  })
  $('#tc_sizeMinus').click(function(){
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setSize( Math.max( edit.hi3d.transformControls.size - 0.1, 0.1 ) );
    }
  })
  $('#tc_toggleX').click(function(){
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.showX =! edit.hi3d.transformControls.showX;
    }
  })
  $('#tc_toggleY').click(function(){
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.showY =! edit.hi3d.transformControls.showY;
    }
  })
  $('#tc_toggleZ').click(function(){
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.showZ =! edit.hi3d.transformControls.showZ;
    }
  })
  $('#cameraNear').on('change', function(){
    console.log('cameraNear')
    var near = $(this).val()
    edit.canvasView.forEachObject(function (obj) {
      if (obj.type == 'hiCamera') {
        obj.camera = obj.camera || {}
        obj.camera.near = parseFloat(near)
      }
    })
    edit.hi3d.setCamera({ near: near })
    edit.hi3d.viewRender()
  })
  $('#cameraFar').on('change', function(){
    var far = $(this).val()
    edit.canvasView.forEachObject(function (obj) {
      if (obj.type == 'hiCamera') {
        obj.camera = obj.camera || {}
        obj.camera.far = parseFloat(far)
      }
    })
    edit.hi3d.setCamera({ far: far })
    edit.hi3d.viewRender()
  })
  $('#submitLight').click(function(){
    var visible = $('#btnLight').prop("checked");
    var color = $('#light_color').val()
    var intensity = parseFloat($('#light_intensity').val())
    var shadowEnable = $('#light_castShadow').prop("checked");
    console.log('shadowEnable', shadowEnable)
    if (edit.hi3d.directionalLight) {
      var opt = {
        visible: visible,
        color: color,
        intensity: intensity,
        castShadow: shadowEnable
      }
      edit.canvasView.directionalLight = JSON.stringify(opt)
      edit.hi3d.setLight(opt)
      edit.hi3d.viewRender()
    }
  })
  $('#submitHemisphereLight').click(function(){
    var visible = $('#btnHemisphereLight').prop("checked");
    var color = $('#hemisphereLight_color').val()
    var groundColor = $('#hemisphereLight_groundColor').val()
    var intensity = parseFloat($('#hemisphereLight_intensity').val())
    if (edit.hi3d.hemisphereLight) {
      var opt = {
        visible: visible,
        color: color,
        skyColor: color,
        groundColor: groundColor,
        intensity: intensity
      }
      edit.canvasView.hemisphereLight = JSON.stringify(opt)
      edit.hi3d.setHemisphereLight(opt)
      edit.hi3d.viewRender()
    }
  })
  $('#submitAmbientLight').click(function(){
    var visible = $('#btnAmbientLight').prop("checked");
    var color = $('#ambientLight_color').val()
    var intensity = parseFloat($('#ambientLight_intensity').val())
    if (edit.hi3d.ambientLight) {
      var opt = {
        visible: visible,
        color: color,
        intensity: intensity
      }
      edit.canvasView.ambientLight = JSON.stringify(opt)
      edit.hi3d.setAmbientLight(opt)
      edit.hi3d.viewRender()
    }
  })
  $('#submitSceneProp').click(function(){
    var beforeInitialStr = edit.readTextareaFuncStr($('#newPropSceneBefInit').val())
    // beforeInitialStr = beforeInitialStr.trim().replace(/\r\n/g,"").replace(/\n/g,"").trim()
    var afterInitialStr = edit.readTextareaFuncStr($('#newPropSceneAftInit').val())
    // afterInitialStr = afterInitialStr.trim().replace(/\r\n/g,"").replace(/\n/g,"").trim()
    var animationStr = edit.readTextareaFuncStr($('#newPropSceneAnimation').val())
    // animationStr = animationStr.trim().replace(/\r\n/g,"").replace(/\n/g,"").trim()
    var beforeInitial = beforeInitialStr
    var afterInitial = afterInitialStr
    var animation = animationStr
    var opt = {
      beforeInitial: beforeInitial,
      afterInitial: afterInitial,
      animation: animation
    }
    edit.canvasView.sceneProp = JSON.stringify(opt)
  })
  $('#submitGrid').click(function(){
    var size = parseInt($('#gridSize').val())
    var divisions = parseInt($('#gridDivisions').val())
    var colorCenterLine = $('#grid_colorCenter').val()
    var colorGrid = $('#grid_colorGrid').val()
    if (edit.hi3d.gridHelper) {
      edit.hi3d.setGridHelper({
        size: size,
        divisions: divisions,
        colorCenterLine: colorCenterLine,
        colorGrid: colorGrid
      })
      edit.hi3d.viewRender()
    }
  })
}
