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
    var polyline = new edit.HiFormatObj(edit, objOption, {
      source: {
        obj: model
      }
    });
  });

  $("#draw3dHiFormatCollada").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var model = $('#sourceDaeVal').val()
    var polyline = new edit.HiFormatCollada(edit, objOption, {
      source: {
        dae: model
      }
    });
  });

  $("#draw3dHiFormatSTL").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var model = $('#sourceStlVal').val()
    var polyline = new edit.HiFormatSTL(edit, objOption, {
      source: {
        stl: model
      }
    });
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

  $('#draw3dPlane').click(function () {
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
  $('#btnGround').click(function () {
    var checked = $(this).prop("checked");
    if (!edit.hi3d.ground) {
      edit.hi3d.addGroundPlane()
    } else {
      edit.hi3d.ground.visible = checked;
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnGridHelper').click(function () {
    var checked = $(this).prop("checked");
    if (!edit.hi3d.gridHelper) {
      edit.hi3d.setGridHelper()
    } else {
      edit.hi3d.gridHelper.visible = checked;
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnAxesHelper').click(function () {
    var checked = $(this).prop("checked");
    if (!edit.hi3d.axesHelper) {
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
  $('#btnLightHelper').click(function () {
    var checked = $(this).prop("checked");
    if (!edit.hi3d.dirLightHelper) {
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
  $('#btnHemisphereLightHelper').click(function () {
    var checked = $(this).prop("checked");
    if (!edit.hi3d.hemiLightHelper) {
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
  $('#btnSpotLightHelper').click(function () {
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
  $('#btnCameraHelper').click(function () {
    var checked = $(this).prop("checked");
    if (!edit.hi3d.cameraHelper) {
      edit.hi3d.addCameraHelper()
    } else {
      edit.hi3d.cameraHelper.visible = checked;
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnBoxHelper').click(function () {
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
    if (checked) {
      edit.hi3d.addBoxHelper()
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#tc_enable').click(function () {
    var checked = $(this).prop("checked");
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.enabled = checked;
    } else {
      $(this).prop("checked", true);
    }
  })
  $('#tc_translate').click(function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setMode('translate');
    }
  })
  $('#tc_rotate').click(function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setMode('rotate');
    }
  })
  $('#tc_scale').click(function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setMode('scale');
    }
  })
  $('#tc_sizePlus').click(function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setSize(edit.hi3d.transformControls.size + 0.1);
    }
  })
  $('#tc_sizeMinus').click(function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setSize(Math.max(edit.hi3d.transformControls.size - 0.1, 0.1));
    }
  })
  $('#tc_toggleX').click(function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.showX = !edit.hi3d.transformControls.showX;
    }
  })
  $('#tc_toggleY').click(function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.showY = !edit.hi3d.transformControls.showY;
    }
  })
  $('#tc_toggleZ').click(function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.showZ = !edit.hi3d.transformControls.showZ;
    }
  })
  $('#cameraNear').on('change', function () {
    console.log('cameraNear')
    var near = $(this).val()
    edit.canvasView.forEachObject(function (obj) {
      if (obj.type == 'hiCamera') {
        obj.camera = obj.camera || {}
        obj.camera.near = parseFloat(near)
      }
    })
    edit.hi3d.setCamera({
      near: near
    })
    edit.hi3d.viewRender()
  })
  $('#cameraFar').on('change', function () {
    var far = $(this).val()
    edit.canvasView.forEachObject(function (obj) {
      if (obj.type == 'hiCamera') {
        obj.camera = obj.camera || {}
        obj.camera.far = parseFloat(far)
      }
    })
    edit.hi3d.setCamera({
      far: far
    })
    edit.hi3d.viewRender()
  })
  $('#submitLight').click(function () {
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
  $('#submitHemisphereLight').click(function () {
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
  $('#submitAmbientLight').click(function () {
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
  $('#newPropBackgroundType').on('change', function () {
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
  $('#submitSceneProp').click(function () {
    saveSceneProperty(edit)
  })
  $('#submitGrid').click(function () {
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

  $('#objFilesList').click(function (e) {
    var target = e.target
    if ($(target).is('li')) {
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      var model = $(target).html()
      var polyline = new edit.HiFormatObj(edit, objOption, {
        source: {
          obj: model
        }
      });
    }
  })

  $('#gltfFilesList').click(function (e) {
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

  $('#colladaFilesList').click(function (e) {
    var target = e.target
    if ($(target).is('li')) {
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      var model = $(target).html()
      var polyline = new edit.HiFormatCollada(edit, objOption, {
        source: {
          dae: model
        }
      });
    }
  })

  $('#fbxFilesList').click(function (e) {
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
  $('#property').click(function (e) {
    const target = e.target
    if ($(target).hasClass('prop-title')) {
      $(target).next('.prop-content').toggle();
    }
  })

  $('#applySampleFile').click(function () {
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
  $('#openSceneDialog').click(function () {
    $('#sceneDialog').show()
  })
  $('#openGridDialog').click(function () {
    $('#gridDialog').show()
  })
  $('#openTranformCtrlDialog').click(function () {
    $('#tranformCtrlDialog').show()
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
  $('#openDirectionalLightDialog').click(function () {
    $('#directionalLightDialog').show()
  })
  $('#openHemisphereLightDialog').click(function () {
    $('#hemisphereLightDialog').show()
  })
  $('#openAmbientLightDialog').click(function () {
    $('#ambientLightDialog').show()
  })
  $('#openObjectListDialog').click(function () {
    $('#objectListDialog').show()
  })
  $('#openPanCtrl').click(function () {
    $('#panCtrl').show()
  })
  $('#openSceneProp').click(function () {
    $('#scenePropDialog').show()
  })
  $('#openObjProp').click(function () {
    $('#objPropDialog').show()
  })
  $('#openModelSourceDialog').click(function () {
    $('#modelSourceDialog').show()
  })
  $('#openSampleDialog').click(function () {
    $('#sampleDialog').show()
  })
  $('#openGenerateMeshDialog').click(function () {
    var activeObj = edit.canvasView.getActiveObject();
    if (activeObj) {
      $('#generateMeshDialog').show()
      showMeshPropChange(activeObj)
    }
  })
  $('#openThreeDModelDialog').click(function () {
    $('#threeDModelDialog').show()
    preview3DDialog('3ds', {
      f_3dsNormalMap: './assets/3ds/portalgun/textures/normal.jpg',
      f_3dsTextures: './assets/3ds/portalgun/textures/',
      f_3ds: './assets/3ds/portalgun/portalgun.3ds'
    })
    // preview3DDialog('')
    // preview3DDialog('gltf', { 
    //   url: './assets/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf'
    // })
    // preview3DDialog('obj', { // ./assets/male02.obj ./assets/obj/tree.obj
    //   url: './assets/male02.obj'
    // })
    // preview3DDialog('obj', { 
    //   url: './assets/obj/walt/WaltHead.obj',
    //   mtl: './assets/obj/walt/WaltHead.mtl'
    // })
    // preview3DDialog('collada', { 
    //   url: './assets/elf/elf.dae'
    // })
    // preview3DDialog_new()
  })

}

function setCameraPropertyUI(edit, cameraOpt) {
  if (typeof cameraOpt.position[0] === 'number') {
    $('#newPropSceneCameraX').val(cameraOpt.position[0])
  }
  if (typeof cameraOpt.position[1] === 'number') {
    $('#newPropSceneCameraY').val(cameraOpt.position[1])
  }
  if (typeof cameraOpt.position[2] === 'number') {
    $('#newPropSceneCameraZ').val(cameraOpt.position[2])
  }
  if (typeof cameraOpt.targetPoint[0] === 'number') {
    $('#newPropScenelookAtX').val(cameraOpt.targetPoint[0])
  }
  if (typeof cameraOpt.targetPoint[1] === 'number') {
    $('#newPropScenelookAtY').val(cameraOpt.targetPoint[1])
  }
  if (typeof cameraOpt.targetPoint[2] === 'number') {
    $('#newPropScenelookAtZ').val(cameraOpt.targetPoint[2])
  }
  var camera = {
    position: [],
    targetPoint: []
  }
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

function saveSceneProperty(edit) {
  // -------------------------------------------------
  var camera = {
    position: [],
    targetPoint: [],
    near: 0.1,
    far: 2000
  }
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
      Color: {
        color: bgColor
      },
      Image: {
        url: ImageUrl
      },
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
function preview3DDialog_new(type, urlObj) {
  container = document.getElementById('showSelected3DModelDiv');
  camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 2000);
  camera.position.set(8, 10, 8);
  camera.lookAt(0, 3, 0);
  scene = new THREE.Scene();
  clock = new THREE.Clock();
  const loadingManager = new THREE.LoadingManager(function () {

    scene.add(elf);
    renderer.render(scene, camera);
  });
  const loader = new THREE.ColladaLoader(loadingManager);
  loader.load('./assets/elf/elf.dae', function (collada) {

    elf = collada.scene;
    
  });
  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 0).normalize();
  scene.add(directionalLight);
  renderer = new THREE.WebGLRenderer();
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);
  renderer.render(scene, camera);
  setTimeout(function(){renderer.render(scene, camera);},500) 
  function animate() {
    requestAnimationFrame(animate);
    render();
  }
  function render() {
    const delta = clock.getDelta();
    if (elf !== undefined) {
      elf.rotation.z += delta * 0.5;

    }
    // renderer.render(scene, camera);
  }
  // animate();
}
function preview3DDialog(type, urlObj) {
  let node
  if (!window.show3DModelSample) {
    const show3DModelSample = {}
    show3DModelSample.container = document.getElementById('showSelected3DModelDiv');
    show3DModelSample.scene = new THREE.Scene()
    show3DModelSample.renderer = new THREE.WebGLRenderer()
    show3DModelSample.renderer.outputEncoding = THREE.sRGBEncoding;
    show3DModelSample.renderer.setPixelRatio( window.devicePixelRatio );
    show3DModelSample.renderer.setSize(show3DModelSample.container.offsetWidth, show3DModelSample.container.offsetHeight) // 場景大小
    // show3DModelSample.renderer.setClearColor(0xeeeeee, 1.0) // 預設背景顏色
    // show3DModelSample.renderer.shadowMap.enable = true // 陰影效果
    show3DModelSample.container.appendChild(show3DModelSample.renderer.domElement);
    show3DModelSample.camera = new THREE.PerspectiveCamera(
      45,
      show3DModelSample.container.offsetWidth / show3DModelSample.container.offsetHeight,
      0.1,
      2000
    )
    show3DModelSample.camera.position.set(10, 10, 10)
    show3DModelSample.camera.lookAt(show3DModelSample.scene.position)
    // const light = new THREE.HemisphereLight(new THREE.Color('#FFFFBB'), new THREE.Color('#080820'), 1);
    // light.position.set(0,1,0)
    // show3DModelSample.scene.add(light);
    // const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
		// show3DModelSample.scene.add( ambientLight );
    // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    // directionalLight.position.set( 1, 1, 0 ).normalize();
    // show3DModelSample.scene.add( directionalLight );
    // let pointLight = new THREE.PointLight(0xffffff)
    // pointLight.position.set(10, 10, -10)
    // show3DModelSample.scene.add(pointLight)
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    show3DModelSample.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 0).normalize();
    show3DModelSample.scene.add(directionalLight);
    show3DModelSample.renderer.render(show3DModelSample.scene, show3DModelSample.camera);
    window.show3DModelSample = show3DModelSample;
  }
  if (window.show3DModelSample.scene.getObjectByName('preview3DModel')) {
    window.show3DModelSample.scene.remove(window.show3DModelSample.scene.getObjectByName('preview3DModel'));
  }
  if (type === '3ds' && urlObj.f_3ds) {
    let mesh
    const loadingManager = new THREE.LoadingManager(function () {
      preview3DRender(mesh)
    });
    const normal = new THREE.TextureLoader().load(urlObj.f_3dsNormalMap);
    const loader = new THREE.TDSLoader(loadingManager);
    loader.setResourcePath(urlObj.f_3dsTextures);
    loader.load(urlObj.f_3ds, function (node) {
      mesh = node;
      mesh.traverse(function (child) {
        if (child.isMesh) {
          if (normal) {
            child.material.normalMap = normal;
          }
        }
      });
      mesh.position.set(0,0,0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      preview3DRender(mesh)
    }.bind(this));
  } else if (type === 'gltf' && urlObj.url) {
    let mesh
    const loadingManager = new THREE.LoadingManager(function () {
      preview3DRender(mesh)
    });
    const loader = new THREE.GLTFLoader(loadingManager)
    if (urlObj.gltfPath) {loader.setPath(urlObj.gltfPath); }
    loader.load(urlObj.url, function (object) {
      mesh = object.scene
      mesh.animations = object.animations;
      mesh.position.set(0,0,0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      preview3DRender(mesh)
    })
  } else if (type === 'obj' && urlObj.url) {
    if (urlObj.mtl) {
      var mtlLoader = new THREE.MTLLoader();
      // mtlLoader.setPath( "https://threejs.org/examples/models/obj/walt/" );
      mtlLoader.load( urlObj.mtl, function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.load( urlObj.url, function ( object ) {
          object.position.set(0,0,0);
          preview3DRender(object)
        } );
      } );
    } else {
      let mesh
      const loadingManager = new THREE.LoadingManager(function () {
        preview3DRender(mesh)
      });
      var loader = new THREE.OBJLoader(loadingManager);
      loader.load(urlObj.url, function (obj) {
        mesh = obj;
        mesh.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            // child.material.side = THREE.DoubleSide;
            child.material.color.setHex(0x00FF00);
            // child.material.ambient.setHex(0xFF0000);
            child.material.transparent = true;
            // child.material.opacity = 0.7;
            child.castShadow = true;
            child.receiveShadow = true;
            // child.material.color.set('blue');
          }
        });
        mesh.position.set(0,0,0);
        preview3DRender(mesh)
      })
    }
  } else if (type === 'stl' && urlObj) {

  } else if (type === 'collada' && urlObj) {
    let obj
    const loadingManager = new THREE.LoadingManager(function () {
      preview3DRender(obj)
    });
    var loader = new THREE.ColladaLoader(loadingManager);
    loader.load(urlObj.url, function (collada) {
      obj = collada.scene;
      obj.kinematics = collada.kinematics;
      obj.traverse( function ( child ) {
        if ( child.isMesh ) {
          // model does not have normals
          child.material.flatShading = true;
          child.material.transparent = false;
          child.material.opacity = 1
        }
      } );
      obj.updateMatrix();
      obj.position.set(0,0,0);
      obj.castShadow = true;
      obj.receiveShadow = true;
      preview3DRender(obj)
    })
    // window.show3DModelSample.camera.position.set(8, 10, 8);
    // window.show3DModelSample.camera.lookAt(0, 3, 0);
    // let elf
    // const loadingManager = new THREE.LoadingManager(function () {
    //   preview3DRender(elf)
    // });
    // const loader = new THREE.ColladaLoader(loadingManager);
    // loader.load('./assets/elf/elf.dae', function (collada) {
    //   elf = collada.scene;
    // });
  } else if (type === 'fdx' && urlObj) {

  } else if (type === 'nrrd' && urlObj) {

  } else {
    const geometry = new THREE.BoxGeometry(1, 1, 1) // 幾何體
    const material = new THREE.MeshPhongMaterial({
      color: 0x0000ff
    }) // 材質
    node = new THREE.Mesh(geometry, material) // 建立網格物件
    node.position.set(0, 0, 0)
    // const geometry = new THREE.SphereGeometry( 5, 32, 16 );
    // const wireframe = new THREE.WireframeGeometry( geometry );
    // node = new THREE.LineSegments( wireframe );
    // node.material.depthTest = false;
    // node.material.transparent = true;
    // node.position.set(0, 0, 0)
    preview3DRender(node)
  }

  
  // window.show3DModelSample.camera.position.set( 3*box1.max.x, 1.5*box1.max.y, box1.max.z );
  // window.show3DModelSample.renderer.render( window.show3DModelSample.scene, window.show3DModelSample.camera );
}
function preview3DRender(node){
  window.show3DModelSample.scene.add(node);
  node.name = "preview3DModel";
  var box1 = new THREE.Box3().setFromObject(node);
  var width = Math.abs(box1.max.x - box1.min.x)
  var depth = Math.abs(box1.max.y - box1.min.y)
  var height = Math.abs(box1.max.z - box1.min.z)
  window.show3DModelSample.camera.position.set(4 * width, 3 * depth, 4 * height);
  // window.show3DModelSample.camera.lookAt(window.show3DModelSample.scene.position)
  window.show3DModelSample.camera.lookAt(0,0,0)
  window.show3DModelSample.renderer.render(window.show3DModelSample.scene, window.show3DModelSample.camera)
}