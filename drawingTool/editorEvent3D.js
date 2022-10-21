function editorEvent3D(edit, objOption) {
  $('#render3D').click(function () {
    edit.hi3d.viewRender()
  });

  // $("#drawCamera").click(function () {
  //   edit.removeCanvasEvents();
  //   edit.changeSelectableStatus(false);
  //   edit.changeCanvasProperty(false, false);
  //   var circle = new edit.HiCamera(edit, objOption);
  // });
  // $("#drawLookAt").click(function () {
  //   edit.removeCanvasEvents();
  //   edit.changeSelectableStatus(false);
  //   edit.changeCanvasProperty(false, false);
  //   var circle = new edit.HiLookAt(edit, objOption);
  // });
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
  $("#drawCylinder").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var squrect = new edit.HiCylinder(edit, objOption);
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
    var polyline = new edit.HiFormatGLTF(edit, objOption, {
      source: {
        gltf: model
      }
    });
  });

  $("#draw3dHiFormatFbx").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    // var model = './otherAssets/showroom_fbx/source/Store.fbx'
    var model = './assets/fbx/Samba_Dancing.fbx'
    console.log('draw3dHiFormatFbx click')
    var polyline = new edit.HiFormatFbx(edit, objOption, {
      source: {
        fbx: model
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

  $("#draw3dHiFormatMesh").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var mesh = new edit.Hi3dMesh(edit, objOption);
  });

  $('#draw3dPlane').click(function(){
    // edit.removeCanvasEvents();
    // edit.changeSelectableStatus(false);
    // edit.changeCanvasProperty(false, false);
    // var elem = document.createElement('canvas')
    // elem.id = 'view1'
    // elem.width = 500
    // elem.height = 500
    // var edit = new hiDraw({ canvasViewId: 'view1',
    //   canvasWidth: 500,
    //   canvasHeight: 500
    // }).createView().viewEvent();
    // var fabricJson = JSON.parse(localStorage.getItem('viewJson2D'))
    // if (fabricJson) {
    //   edit.canvasView.loadFromJSON(fabricJson)
    // }
    // setTimeout(function(){
    //   var i = edit.canvasView.toDataURL()
    //   dataStructure.editor[0].hi3d.addPlane({textureSource:{base64:i}})
    //   console.log('load plane end')
    // }, 1000)
    dataStructure.editor[0].hi3d.addPlane()
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
  $('#newPropBackgroundType').on('change', function (){
    var value = $(this).val()
    if (value === 'Image') {
      $('#newSceneBgAreaColor').hide()
      $('#newSceneBgAreaImage').show()
      $('#newSceneBgAreaCubeTexture').hide()
      $('#newSceneBgAreaEquirectangular').hide()
    } else if (value === 'CubeTexture') {
      $('#newSceneBgAreaColor').hide()
      $('#newSceneBgAreaImage').hide()
      $('#newSceneBgAreaCubeTexture').show()
      $('#newSceneBgAreaEquirectangular').hide()
    } else if (value === 'Equirectangular') {
      $('#newSceneBgAreaColor').hide()
      $('#newSceneBgAreaImage').hide()
      $('#newSceneBgAreaCubeTexture').hide()
      $('#newSceneBgAreaEquirectangular').show()
    } else {
      $('#newSceneBgAreaColor').show()
      $('#newSceneBgAreaImage').hide()
      $('#newSceneBgAreaCubeTexture').hide()
      $('#newSceneBgAreaEquirectangular').hide()
    }
  })
  $('#newSceneBgAreaColor').show()
  $('#newSceneBgAreaImage').hide()
  $('#newSceneBgAreaCubeTexture').hide()
  $('#newSceneBgAreaEquirectangular').hide()
  $('#submitSceneProp').click(function(){
    saveSceneProperty(edit)
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

  $('#objFilesList').click(function(e){
    var target = e.target
    if ($(target).is('li')) {
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      var model = $(target).html()
      var polyline = new edit.HiFormatObj(edit, objOption, { source: { obj: model}});
    }
  })
  
  $('#gltfFilesList').click(function(e){
    var target = e.target
    if ($(target).is('li')) {
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      var model = $(target).html()
      var polyline = new edit.HiFormatGLTF(edit, objOption, {
        source: {
          gltf: model
        }
      });
    }
  })

  $('#colladaFilesList').click(function(e){
    var target = e.target
    if ($(target).is('li')) {
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      var model = $(target).html()
      var polyline = new edit.HiFormatCollada(edit, objOption, { source: { dae: model}});
    }
  })
    
  $('#fbxFilesList').click(function(e){
    var target = e.target
    if ($(target).is('li')) {
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      var model = $(target).html()
      var polyline = new edit.HiFormatFbx(edit, objOption, {
        source: {
          fbx: model
        }
      });
    }
  })

  $('.prop-content').toggle();
  $('#property').click(function(e){
    const target = e.target
    if($(target).hasClass('prop-title')){
      $(target).next('.prop-content').toggle();
    }
  })

  $('#applySampleFile').click(function(){
    const fileName = $('#sampleFileSelected').val()
    var oReq = new XMLHttpRequest();
    oReq.open("GET", fileName, true);
    oReq.responseType = "json";
    oReq.onload = function (oEvent) {
      const result = oReq.response; // Note: not oReq.responseText
      edit.canvasView.loadFromJSON(result)
    };
    oReq.send(null);
  })

  // $('#menu').scrollbar();
  $('#openSceneDialog').click(function(){
    $('#sceneDialog').show()
  })
  $('#openGridDialog').click(function(){
    $('#gridDialog').show()
  })
  $('#openTranformCtrlDialog').click(function(){
    $('#tranformCtrlDialog').show()
  })
  $('#openExportFabricDialog').click(function(){
    $('#exportFabricDialog').show()
  })
  $('#openExportLabelmeDialog').click(function(){
    $('#exportLabelmeDialog').show()
  })
  $('#openImportFabricDialog').click(function(){
    $('#importFabricDialog').show()
  })
  $('#openImportLabelmeDialog').click(function(){
    $('#importLabelmeDialog').show()
  })
  $('#openDirectionalLightDialog').click(function(){
    $('#directionalLightDialog').show()
  })
  $('#openHemisphereLightDialog').click(function(){
    $('#hemisphereLightDialog').show()
  })
  $('#openAmbientLightDialog').click(function(){
    $('#ambientLightDialog').show()
  })
  $('#openObjectListDialog').click(function(){
    $('#objectListDialog').show()
  })
  $('#openPanCtrl').click(function(){
    $('#panCtrl').show()
  })
  $('#openSceneProp').click(function(){
    $('#scenePropDialog').show()
  })
  $('#openObjProp').click(function(){
    $('#objPropDialog').show()
  })
  $('#openModelSourceDialog').click(function(){
    $('#modelSourceDialog').show()
  })
  $('#openSampleDialog').click(function(){
    $('#sampleDialog').show()
  })
  $('#openGenerateMeshDialog').click(function(){
    var activeObj = edit.canvasView.getActiveObject();
    if (activeObj) {
      $('#generateMeshDialog').show()
      showMeshPropChange(activeObj)
    }
  })

}

function setCameraPropertyUI (edit, cameraOpt) {
  if (typeof cameraOpt.position[0] === 'number') { $('#newPropSceneCameraX').val(cameraOpt.position[0]) }
  if (typeof cameraOpt.position[1] === 'number') { $('#newPropSceneCameraY').val(cameraOpt.position[1]) }
  if (typeof cameraOpt.position[2] === 'number') { $('#newPropSceneCameraZ').val(cameraOpt.position[2]) }
  if (typeof cameraOpt.targetPoint[0] === 'number') { $('#newPropScenelookAtX').val(cameraOpt.targetPoint[0]) }
  if (typeof cameraOpt.targetPoint[1] === 'number') { $('#newPropScenelookAtY').val(cameraOpt.targetPoint[1]) }
  if (typeof cameraOpt.targetPoint[2] === 'number') { $('#newPropScenelookAtZ').val(cameraOpt.targetPoint[2]) }
  var camera = { position: [], targetPoint: [] }
  camera.position[0] = parseFloat($('#newPropSceneCameraX').val())
  camera.position[1] = parseFloat($('#newPropSceneCameraY').val())
  camera.position[2] = parseFloat($('#newPropSceneCameraZ').val())
  camera.targetPoint[0] = parseFloat($('#newPropScenelookAtX').val())
  camera.targetPoint[1] = parseFloat($('#newPropScenelookAtY').val())
  camera.targetPoint[2] = parseFloat($('#newPropScenelookAtZ').val())
  var opt = {
    camera: camera
  }
  if (!edit.canvasView.sceneProp) {
    edit.canvasView.sceneProp = JSON.stringify(opt)
  } else {
    edit.canvasView.sceneProp = JSON.stringify(edit.hi3d.mergeDeep(JSON.parse(edit.canvasView.sceneProp), opt))
  }
}

function saveSceneProperty (edit) {
    // -------------------------------------------------
    var camera = { position: [], targetPoint: [], near: 0.1, far: 2000 }
    camera.position[0] = parseFloat($('#newPropSceneCameraX').val())
    camera.position[1] = parseFloat($('#newPropSceneCameraY').val())
    camera.position[2] = parseFloat($('#newPropSceneCameraZ').val())
    camera.targetPoint[0] = parseFloat($('#newPropScenelookAtX').val())
    camera.targetPoint[1] = parseFloat($('#newPropScenelookAtY').val())
    camera.targetPoint[2] = parseFloat($('#newPropScenelookAtZ').val())
    camera.near = parseFloat($('#cameraNear').val())
    camera.far = parseFloat($('#cameraFar').val())
    // -------------------------------------------------
    var dataRefreshTime = parseInt($('#newPropDataRefreshTime').val())
    var beforeInitialStr = edit.readTextareaFuncStr($('#newPropSceneBefInit').val())
    // beforeInitialStr = beforeInitialStr.trim().replace(/\r\n/g,"").replace(/\n/g,"").trim()
    var afterInitialStr = edit.readTextareaFuncStr($('#newPropSceneAftInit').val())
    // afterInitialStr = afterInitialStr.trim().replace(/\r\n/g,"").replace(/\n/g,"").trim()
    var animationStr = edit.readTextareaFuncStr($('#newPropSceneAnimation').val())
    // animationStr = animationStr.trim().replace(/\r\n/g,"").replace(/\n/g,"").trim()
    var beforeInitial = beforeInitialStr
    var afterInitial = afterInitialStr
    var animation = animationStr
    // --- background ---
    var bgType = $('#newPropBackgroundType').val()
    var bgColor, ImageUrl, bgPx, bgPy, bgPz, bgNx, bgNy, bgNz, bgEquirectangular
    if (bgType === 'Image') {
      ImageUrl = $('#newPropSceneBgImage').val()
    } else if (bgType === 'CubeTexture') {
      bgPx = $('#newPropSceneBgCubePx').val()
      bgPy = $('#newPropSceneBgCubePy').val()
      bgPz = $('#newPropSceneBgCubePz').val()
      bgNx = $('#newPropSceneBgCubeNx').val()
      bgNy = $('#newPropSceneBgCubeNy').val()
      bgNz = $('#newPropSceneBgCubeNz').val()
    } else if (bgType === 'Equirectangular') {
      bgEquirectangular = $('#newPropSceneBgEquirectangularImage').val()
    } else {
      bgColor = hiDraw.prototype.colorToHex($('#newPropSceneBgColor').val())
    }
    var opt = {
      beforeInitial: beforeInitial,
      afterInitial: afterInitial,
      animation: animation,
      background: {
        type: bgType,
        Color: { color: bgColor },
        Image: { url: ImageUrl },
        CubeTexture: {
          px: bgPx,
          py: bgPy,
          pz: bgPz,
          nx: bgNx,
          ny: bgNy,
          nz: bgNz
        },
        Equirectangular: {
          url: bgEquirectangular
        }
      },
      camera: camera,
      dataRefreshTime: dataRefreshTime
    }
    if (!edit.canvasView.sceneProp) {
      edit.canvasView.sceneProp = JSON.stringify(opt)
    } else {
      edit.canvasView.sceneProp = JSON.stringify(edit.hi3d.mergeDeep(JSON.parse(edit.canvasView.sceneProp), opt))
    }
    
    edit.hi3d.setscene(opt)
}
