function resizeMouseUp (e) {
  window.resizeCover = false
  window.removeEventListener('mousemove', resizeMouseMove)
  window.removeEventListener('mouseup', resizeMouseUp)
}
function resizeMouseMove (e) {
  clearTimeout(window.resizeTimeout)
  const height = parseInt(window.original2DHeight) - (window.originalMouseY - e.pageY)
  window.resizeTimeout = setTimeout(function () {
    const edit = dataStructure.editor[0];
    if (parseInt(height) <= 195) {
      $('.area2D').first().css({ height: 195 + 'px'})
      $('.area3D').first().css({ height: 'calc(100% - 200px)' })
    } else {
      $('.area2D').first().css({ height: (height - 5) + 'px'})
      $('.area3D').first().css({ height: 'calc(100% - ' + height + 'px)' })
    }
    edit.hi3d.resizeView()
    var elem = document.getElementById('content');
    edit.canvasView.setWidth(parseInt(elem.offsetWidth))
    edit.canvasView.setHeight(parseInt(elem.offsetHeight))
    edit.BgGrid(true)
    edit.viewRender()
    edit.hi3d.viewRender()
  }, 0)
}

function editorEvent3D(edit, objOption) {
  $('#updownResizer').on('mousedown', function (e) {
    e.preventDefault()
    window.resizeCover = true
    window.original2DHeight = parseInt($('.area2D').first().height())
    window.originalMouseX = e.pageX
    window.originalMouseY = e.pageY
    window.addEventListener('mousemove', resizeMouseMove)
    window.addEventListener('mouseup', resizeMouseUp)
  });
  
  $('#render3D').on('click touchstart', function () {
    edit.hi3d.viewRender()
  });

  // $("#drawCamera").on('click touchstart', function () {
  //   edit.removeCanvasEvents();
  //   edit.changeSelectableStatus(false);
  //   edit.changeCanvasProperty(false, false);
  //   var circle = new edit.HiCamera(edit, objOption);
  // });
  // $("#drawLookAt").on('click touchstart', function () {
  //   edit.removeCanvasEvents();
  //   edit.changeSelectableStatus(false);
  //   edit.changeCanvasProperty(false, false);
  //   var circle = new edit.HiLookAt(edit, objOption);
  // });
  $("#drawSpotLight").on('click touchstart', function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var circle = new edit.HiSpotLight(edit, objOption);
  });
  $("#drawPointLight").on('click touchstart', function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var circle = new edit.HiPointLight(edit, objOption);
  });
  $("#drawCube").on('click touchstart', function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var circle = new edit.HiCube(edit, objOption);
  });
  $("#drawSphere").on('click touchstart', function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var squrect = new edit.HiSphere(edit, objOption);
  });
  $("#drawCylinder").on('click touchstart', function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var squrect = new edit.HiCylinder(edit, objOption);
  });
  $("#draw3dPolyline").on('click touchstart', function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var polyline = new edit.Hi3DPolyline(edit, objOption);
  });

  $("#draw3dPolygon").on('click touchstart', function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var polyline = new edit.Hi3DPolygon(edit, objOption);
  });

  $("#draw3dPlaneGround").on('click touchstart', function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var HiPlane = new edit.HiPlane(edit, objOption);
  });

  $("#draw3dWall").on('click touchstart', function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var HiPlane = new edit.HiWall(edit, objOption);
  });

  $('#add3dObj').on('click touchstart', function (e) {
    edit.hi3d.addObj()
    edit.hi3d.refreshByFabricJson(edit);
  })

  $('#addAxesHelper').on('click touchstart', function (e) {
    edit.hi3d.addAxesHelper()
    edit.hi3d.refreshByFabricJson(edit);
  })

  $("#draw3dHiFormatObj").on('click touchstart', function () {
    $('#threeDModelDialog').show()
    $('.prevFormat').hide()
    $('.prevFormat_obj').show()
    $('#previewModelType').text('obj')
    var model = $('#sourceObjVal').val()
    preview3DDialog('obj', { 
      url: model
    })
    $('#addPreviewModelToScene').off('click')
    $('#addPreviewModelToScene').one( "click", function() {
      $('#threeDModelDialog').hide();
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      var model = $('#sourceObjVal').val()
      if (model) {
        var polyline = new edit.HiFormatObj(edit, objOption, {
          source: {
            obj: model
          }
        });
      }
    });
  });

  $("#draw3dHiFormatCollada").on('click touchstart', function () {
    $('#threeDModelDialog').show()
    $('.prevFormat').hide()
    $('.prevFormat_dae').show()
    $('#previewModelType').text('collada')
    var model = $('#sourceDaeVal').val()
    preview3DDialog('collada', { 
      url: model
    })
    $('#addPreviewModelToScene').off('click')
    $('#addPreviewModelToScene').one( "click", function() {
      $('#threeDModelDialog').hide();
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      var model = $('#sourceDaeVal').val()
      if (model) {
        var polyline = new edit.HiFormatCollada(edit, objOption, {
          source: {
            dae: model
          }
        });
      }
    });
  });

  $("#draw3dHiFormatSTL").on('click touchstart', function () {
    $('#threeDModelDialog').show()
    $('.prevFormat').hide()
    $('.prevFormat_stl').show()
    $('#previewModelType').text('stl')
    var model = $('#sourceStlVal').val()
    preview3DDialog('stl', { 
      url: model
    })
    $('#addPreviewModelToScene').off('click')
    $('#addPreviewModelToScene').one( "click", function() {
      $('#threeDModelDialog').hide();
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      var model = $('#sourceStlVal').val()
      if (model) {
        var polyline = new edit.HiFormatSTL(edit, objOption, {
          source: {
            stl: model
          }
        });
      }
    });
  });

  $("#draw3dHiFormat3DS").on('click touchstart', function () {
    $('#threeDModelDialog').show()
    $('.prevFormat').hide()
    $('.prevFormat_3ds').show()
    $('#previewModelType').text('3ds')
    var model = $('#source3dsVal').val()
    var textures = $('#source3dsTexturesVal').val()
    var normalMap = $('#source3dsNormalMapVal').val()
    preview3DDialog('3ds', {
      f_3dsNormalMap: normalMap,
      f_3dsTextures: textures,
      f_3ds: model
    })
    $('#addPreviewModelToScene').off('click')
    $('#addPreviewModelToScene').one( "click", function() {
      $('#threeDModelDialog').hide();
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      var model = $('#source3dsVal').val()
      var textures = $('#source3dsTexturesVal').val()
      var normalMap = $('#source3dsNormalMapVal').val()
      if (model) {
        var polyline = new edit.HiFormat3ds(edit, objOption, {
          source: {
            f_3ds: model,
            f_3dsTextures: textures,
            f_3dsNormalMap: normalMap
          }
        });
      }
    });
  });

  $("#draw3dHiFormatGLTF").on('click touchstart', function () {
    $('#threeDModelDialog').show()
    $('.prevFormat').hide()
    $('.prevFormat_gltf').show()
    $('#previewModelType').text('gltf')
    var model = $('#sourceGltf').val()
    preview3DDialog('gltf', { 
      url: model
    })
    $('#addPreviewModelToScene').off('click')
    $('#addPreviewModelToScene').one( "click", function() {
      $('#threeDModelDialog').hide();
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      var model = $('#sourceGltf').val()
      if (model) {
        var polyline = new edit.HiFormatGLTF(edit, objOption, {
          source: {
            gltf: model
          }
        });
      }
    });
  });

  $("#draw3dHiFormatFbx").on('click touchstart', function () {
    $('#threeDModelDialog').show()
    $('.prevFormat').hide()
    $('.prevFormat_fbx').show()
    $('#previewModelType').text('fbx')
    var model = $('#sourceFBXVal').val()
    preview3DDialog('fbx', { 
      url: model
    })
    $('#addPreviewModelToScene').off('click')
    $('#addPreviewModelToScene').one( "click", function() {
      $('#threeDModelDialog').hide();
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      // var model = './otherAssets/showroom_fbx/source/Store.fbx'
      var model = $('#sourceFBXVal').val()
      if (model) {
        var polyline = new edit.HiFormatFbx(edit, objOption, {
          source: {
            fbx: model
          }
        });
      }
    });
  });

  $("#draw3dHiFormatNRRD").on('click touchstart', function () {
    $('#threeDModelDialog').show()
    $('.prevFormat').hide()
    $('.prevFormat_nrrd').show()
    $('#previewModelType').text('nrrd')
    var model = $('#sourceNrrd').val()
    preview3DDialog('nrrd', { 
      url: model
    })
    $('#addPreviewModelToScene').off('click')
    $('#addPreviewModelToScene').one( "click", function() {
      $('#threeDModelDialog').hide();
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      // var model = './otherAssets/showroom_fbx/source/Store.fbx'
      var model = $('#sourceNrrd').val()
      if (model) {
        var polyline = new edit.HiFormatNrrd(edit, objOption, {
          source: {
            nrrd: model
          }
        });
      }
    });
  });

  $("#draw3dHiFormatMesh").on('click touchstart', function () {
    // edit.removeCanvasEvents();
    // edit.changeSelectableStatus(false);
    // edit.changeCanvasProperty(false, false);
    // var mesh = new edit.Hi3dMesh(edit, objOption);
    $('#threeDModelDialog').show()
    $('.prevFormat').hide()
    $('.prevFormat_mesh').show()
    $('#previewModelType').text('mesh')
    var createFunc = 'function (option, parentGroup) {\n    const x = 0, y = 0;\n    const heartShape = new THREE.Shape();\n    heartShape.moveTo( x + 5, y + 5 );\n    heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );\n    heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );\n    heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );\n    heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );\n    heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );\n    heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );\n    let side = THREE.DoubleSide;\n     const geometry = new THREE.ShapeGeometry( heartShape );\n    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: side } );\n    const mesh = new THREE.Mesh( geometry, material ) ;\n    return mesh;\n  }';
    var refreshFunc = 'function (node, objOption) {\n    if (objOption.color) {\n      node.material.color = new THREE.Color(objOption.color)\n    }\n    return node;\n  }';
    $('#newMeshCreateFunc_prev').val(createFunc)
    $('#newMeshSetFunc_prev').val(refreshFunc)
    preview3DDialog('mesh', { 
      created: hiDraw.prototype.readTextareaFuncStr($('#newMeshCreateFunc_prev').val()),
      refresh: hiDraw.prototype.readTextareaFuncStr($('#newMeshSetFunc_prev').val())
    })
    $('#addPreviewModelToScene').off('click')
    $('#addPreviewModelToScene').one( "click", function() {
      $('#threeDModelDialog').hide();
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      var createFuncStr = hiDraw.prototype.readTextareaFuncStr($('#newMeshCreateFunc_prev').val())
      var refreshFuncStr = hiDraw.prototype.readTextareaFuncStr($('#newMeshSetFunc_prev').val())
      var mesh = new edit.Hi3dMesh(edit, objOption, {
        customModelConfig: {
          createFunc: createFuncStr,
          refreshFunc: refreshFuncStr
        }
      });
    });
  });

  $('#draw3dPlane').on('click touchstart', function () {
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
  $('#btnGround').on('click touchstart', function () {
    var checked = $(this).prop("checked");
    if (!edit.hi3d.ground) {
      edit.hi3d.addGroundPlane()
    } else {
      edit.hi3d.ground.visible = checked;
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnGridHelper').on('click touchstart', function () {
    var checked = $(this).prop("checked");
    if (!edit.hi3d.gridHelper) {
      edit.hi3d.setGridHelper()
    } else {
      edit.hi3d.gridHelper.visible = checked;
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnAxesHelper').on('click touchstart', function () {
    var checked = $(this).prop("checked");
    if (!edit.hi3d.axesHelper) {
      edit.hi3d.addAxesHelper()
    } else {
      edit.hi3d.axesHelper.visible = checked;
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  // $('#btnLight').on('click touchstart', function(){
  //   var checked = $(this).prop("checked");
  //   edit.hi3d.directionalLight.visible = checked;
  //   // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  //   edit.hi3d.viewRender()
  // })
  $('#btnLightHelper').on('click touchstart', function () {
    var checked = $(this).prop("checked");
    if (!edit.hi3d.dirLightHelper) {
      edit.hi3d.addLightHelper()
    } else {
      edit.hi3d.dirLightHelper.visible = checked;
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })

  // $('#btnHemisphereLight').on('click touchstart', function(){
  //   var checked = $(this).prop("checked");
  //   // edit.hi3d.directionalLight.visible = checked;
  //   // edit.hi3d.ambientLight.visible = ! edit.hi3d.ambientLight.visible;
  //   edit.hi3d.hemisphereLight.visible = checked;
  //   // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  //   edit.hi3d.viewRender()
  // })
  $('#btnHemisphereLightHelper').on('click touchstart', function () {
    var checked = $(this).prop("checked");
    if (!edit.hi3d.hemiLightHelper) {
      edit.hi3d.addHemisphereLightHelper()
    } else {
      edit.hi3d.hemiLightHelper.visible = checked;
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  // $('#btnAmbientLight').on('click touchstart', function(){
  //   var checked = $(this).prop("checked");
  //   edit.hi3d.ambientLight.visible = checked;
  //   // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  //   edit.hi3d.viewRender()
  // })
  $('#btnSpotLightHelper').on('click touchstart', function () {
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
  $('#btnCameraHelper').on('click touchstart', function () {
    var checked = $(this).prop("checked");
    if (!edit.hi3d.cameraHelper) {
      edit.hi3d.addCameraHelper()
    } else {
      edit.hi3d.cameraHelper.visible = checked;
    }
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
  })
  $('#btnBoxHelper').on('click touchstart', function () {
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
  $('#tc_enable').on('click touchstart', function () {
    var checked = $(this).prop("checked");
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.enabled = checked;
    } else {
      $(this).prop("checked", true);
    }
  })
  $('#tc_translate').on('click touchstart', function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setMode('translate');
    }
  })
  $('#tc_rotate').on('click touchstart', function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setMode('rotate');
    }
  })
  $('#tc_scale').on('click touchstart', function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setMode('scale');
    }
  })
  $('#tc_sizePlus').on('click touchstart', function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setSize(edit.hi3d.transformControls.size + 0.1);
    }
  })
  $('#tc_sizeMinus').on('click touchstart', function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.setSize(Math.max(edit.hi3d.transformControls.size - 0.1, 0.1));
    }
  })
  $('#tc_toggleX').on('click touchstart', function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.showX = !edit.hi3d.transformControls.showX;
    }
  })
  $('#tc_toggleY').on('click touchstart', function () {
    if (edit.hi3d.transformControls) {
      edit.hi3d.transformControls.showY = !edit.hi3d.transformControls.showY;
    }
  })
  $('#tc_toggleZ').on('click touchstart', function () {
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
  $('#submitLight').on('click touchstart', function () {
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
  $('#submitHemisphereLight').on('click touchstart', function () {
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
  $('#submitAmbientLight').on('click touchstart', function () {
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
  $('#submitSceneProp').on('click touchstart', function () {
    saveSceneProperty(edit)
  })
  $('#submitGrid').on('click touchstart', function () {
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

  $('#objFilesList').on('click touchstart', function (e) {
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

  $('#gltfFilesList').on('click touchstart', function (e) {
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

  $('#colladaFilesList').on('click touchstart', function (e) {
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

  $('#fbxFilesList').on('click touchstart', function (e) {
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
  $('#property').on('click touchstart', function (e) {
    const target = e.target
    if ($(target).hasClass('prop-title')) {
      $(target).next('.prop-content').toggle();
    }
  })

  $('#applySampleFile').on('click touchstart', function () {
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
  $('#openSceneDialog').on('click touchstart', function () {
    $('#sceneDialog').show()
  })
  $('#openGridDialog').on('click touchstart', function () {
    $('#gridDialog').show()
  })
  $('#openTranformCtrlDialog').on('click touchstart', function () {
    $('#tranformCtrlDialog').show()
  })
  $('#openExportFabricDialog').on('click touchstart', function () {
    $('#exportFabricDialog').show()
  })
  $('#openExportLabelmeDialog').on('click touchstart', function () {
    $('#exportLabelmeDialog').show()
  })
  $('#openImportFabricDialog').on('click touchstart', function () {
    $('#importFabricDialog').show()
  })
  $('#openImportLabelmeDialog').on('click touchstart', function () {
    $('#importLabelmeDialog').show()
  })
  $('#openDirectionalLightDialog').on('click touchstart', function () {
    $('#directionalLightDialog').show()
  })
  $('#openHemisphereLightDialog').on('click touchstart', function () {
    $('#hemisphereLightDialog').show()
  })
  $('#openAmbientLightDialog').on('click touchstart', function () {
    $('#ambientLightDialog').show()
  })
  $('#openObjectListDialog').on('click touchstart', function () {
    $('#objectListDialog').show()
  })
  $('#openPanCtrl').on('click touchstart', function () {
    $('#panCtrl').show()
  })
  $('#openSceneProp').on('click touchstart', function () {
    $('#scenePropDialog').show()
  })
  $('#openObjProp').on('click touchstart', function () {
    $('#objPropDialog').show()
  })
  $('#openModelSourceDialog').on('click touchstart', function () {
    $('#modelSourceDialog').show()
  })
  $('#openSampleDialog').on('click touchstart', function () {
    $('#sampleDialog').show()
  })
  $('#downloadSceneStl').on('click touchstart', function () {
    edit.hi3d.exportToSTL()
  })
  $('#downloadSceneObj').on('click touchstart', function () {
    edit.hi3d.exportToObj()
  })
  $('#downloadSceneGLTF').on('click touchstart', function () {
    edit.hi3d.exportToGltf()
  })
  $('#downloadSceneGLB').on('click touchstart', function () {
    edit.hi3d.exportToGltf('', { binary: true })
  })
  $('#openGenerateMeshDialog').on('click touchstart', function () {
    var activeObj = edit.canvasView.getActiveObject();
    if (activeObj) {
      $('#generateMeshDialog').show()
      showMeshPropChange(activeObj)
    }
    // $('#threeDModelDialog').show()
  })
  $('#openThreeDModelDialog').on('click touchstart', function () {
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

  $('#previewModelReload').on( "click", function() {
    if ($('#previewModelType').text() === 'collada') {
      var model = $('#sourceDaeVal').val()
      preview3DDialog('collada', { 
        url: model
      })
    } else if ($('#previewModelType').text() === 'obj') {
      var model = $('#sourceObjVal').val()
      preview3DDialog('obj', { 
        url: model
      })
    } else if ($('#previewModelType').text() === '3ds') {
      var model = $('#source3dsVal').val()
      var textures = $('#source3dsTexturesVal').val()
      var normalMap = $('#source3dsNormalMapVal').val()
      preview3DDialog('3ds', {
        f_3dsNormalMap: normalMap,
        f_3dsTextures: textures,
        f_3ds: model
      })
    } else if ($('#previewModelType').text() === 'gltf') {
      var model = $('#sourceGltf').val()
      preview3DDialog('gltf', { 
        url: model
      })
    } else if ($('#previewModelType').text() === 'stl') {
      var model = $('#sourceStlVal').val()
      preview3DDialog('stl', { 
        url: model
      })
    } else if ($('#previewModelType').text() === 'fbx') {
      var model = $('#sourceFBXVal').val()
      preview3DDialog('fbx', { 
        url: model
      })
    } else if ($('#previewModelType').text() === 'nrrd') {
      var model = $('#sourceFBXVal').val()
      preview3DDialog('nrrd', { 
        url: model
      })
    } else if ($('#previewModelType').text() === 'mesh') {
      var createFuncStr = hiDraw.prototype.readTextareaFuncStr($('#newMeshCreateFunc_prev').val())
      var refreshFuncStr = hiDraw.prototype.readTextareaFuncStr($('#newMeshSetFunc_prev').val())
      preview3DDialog('mesh', { 
        created: createFuncStr,
        refresh: refreshFuncStr
      })
    }
  })

  $('#openAddjsDialog').on('click touchstart', function () {
    $('#addjsDialog').show()
    $('#addjsBodyRow').empty()
    if (edit.canvasView.generalPropConfig &&
      edit.canvasView.generalPropConfig.jsList) {
        const jsList = edit.canvasView.generalPropConfig.jsList;
        for(let i = 0; i < jsList.length;i++) {
          $('#addjsBodyRow').append(`
            <div class="commonContentTableRow addjsRow">
              <div class="commonContentTableCell"></div>
              <div class="commonContentTableCell">
                <input type="text" class="addjsPathInput" value="${jsList[i]}" />
              </div>
              <div class="commonContentTableCell">
                <button class="addjsPathRemove"></button>
              </div>
            </div>
          `)
        }
    }
  })
  $('#addjsPathAdd').on('click touchstart', function () {
    $('#addjsBodyRow').append(`
      <div class="commonContentTableRow addjsRow">
        <div class="commonContentTableCell"></div>
        <div class="commonContentTableCell">
          <input type="text" class="addjsPathInput" />
        </div>
        <div class="commonContentTableCell">
          <button class="addjsPathRemove"></button>
        </div>
      </div>
    `)
  })
  $('#addjsBodyRow').on('click touchstart', function (e) {
    console.log(e.target)
    if ($(e.target).hasClass('addjsPathRemove')) {
      $(e.target).parents('.addjsRow').remove()
    }
  })
  $('#applyAddjsList').on('click touchstart', function () {
    const jsList = []
    $('.addjsPathInput').each(function(idx){
      jsList.push($(this).val().trim())
    })
    if(!edit.canvasView.generalPropConfig) {
      edit.canvasView.generalPropConfig = {}
    }
    edit.canvasView.generalPropConfig.jsList = jsList;
  })
  $('#openAddSurfaceDialog').on('click touchstart', function () {
    $('#addSurfaceDialog').show()
    $('#addSurfaceBodyRow').empty()
    if (edit.canvasView.generalPropConfig &&
      edit.canvasView.generalPropConfig.surfaceList) {
        const surfaceList = edit.canvasView.generalPropConfig.surfaceList;
        for(let i = 0; i < surfaceList.length;i++) {
          $('#addSurfaceBodyRow').append(`
          <div class="commonContentTableRow addSurfaceRow">
            <div class="commonContentTableCell"></div>
            <div class="commonContentTableCell">
              <input type="text" class="addSurfaceName" value="${surfaceList[i].name}"/>
            </div>
            <div class="commonContentTableCell">
              <input type="text" class="addSurfaceX" value="${surfaceList[i].x}" />
            </div>
            <div class="commonContentTableCell">
              <input type="text" class="addSurfaceY" value="${surfaceList[i].y}" />
            </div>
            <div class="commonContentTableCell">
              <input type="text" class="addSurfaceZ" value="${surfaceList[i].z}" />
            </div>
            <div class="commonContentTableCell">
              <input type="text" class="addSurfaceConstant" value="${surfaceList[i].constant}" />
            </div>
            <div class="commonContentTableCell">
              <button class="addSurfaceRemove"></button>
            </div>
          </div>
          `)
        }
    }
  })
  $('#addSurfaceAdd').on('click touchstart', function () {
    $('#addSurfaceBodyRow').append(`
    <div class="commonContentTableRow addSurfaceRow">
      <div class="commonContentTableCell"></div>
      <div class="commonContentTableCell">
        <input type="text" class="addSurfaceName" />
      </div>
      <div class="commonContentTableCell">
        <input type="text" class="addSurfaceX" value="1" />
      </div>
      <div class="commonContentTableCell">
        <input type="text" class="addSurfaceY" value="0" />
      </div>
      <div class="commonContentTableCell">
        <input type="text" class="addSurfaceZ" value="0" />
      </div>
      <div class="commonContentTableCell">
        <input type="text" class="addSurfaceConstant" value="0" />
      </div>
      <div class="commonContentTableCell">
        <button class="addSurfaceRemove"></button>
      </div>
    </div>
    `)
  })
  $('#addSurfaceBodyRow').on('click touchstart', function (e) {
    if ($(e.target).hasClass('addSurfaceRemove')) {
      $(e.target).parents('.addSurfaceRow').remove()
    }
  })
  $('#applyAddSurfaceList').on('click touchstart', function () {
    const surfaceList = []
    $('.addSurfaceRow').each(function(idx){
      const planeOpt = {}
      planeOpt.name = $(this).find('.addSurfaceName').val().trim()
      planeOpt.x = parseFloat($(this).find('.addSurfaceX').val().trim())
      planeOpt.y = parseFloat($(this).find('.addSurfaceY').val().trim())
      planeOpt.z = parseFloat($(this).find('.addSurfaceZ').val().trim())
      planeOpt.constant = parseFloat($(this).find('.addSurfaceConstant').val().trim())
      surfaceList.push(planeOpt)
    })
    if(!edit.canvasView.generalPropConfig) {
      edit.canvasView.generalPropConfig = {}
    }
    edit.canvasView.generalPropConfig.surfaceList = surfaceList;
    // new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 0.8 );
    if (!edit.hi3d.surfacePlane) {
      edit.hi3d.surfacePlane = {}
    }
    for (let i = 0; i < surfaceList.length; i++) {
      edit.hi3d.surfacePlane[surfaceList[i].name] = new THREE.Plane( new THREE.Vector3( surfaceList[i].x, surfaceList[i].y, surfaceList[i].z ), surfaceList[i].constant );
    }
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
// function preview3DDialog_new(type, urlObj) {
//   container = document.getElementById('showSelected3DModelDiv');
//   camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 2000);
//   camera.position.set(8, 10, 8);
//   camera.lookAt(0, 3, 0);
//   scene = new THREE.Scene();
//   clock = new THREE.Clock();
//   const loadingManager = new THREE.LoadingManager(function () {

//     scene.add(elf);
//     renderer.render(scene, camera);
//   });
//   const loader = new THREE.ColladaLoader(loadingManager);
//   loader.load('./assets/elf/elf.dae', function (collada) {

//     elf = collada.scene;
    
//   });
//   const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
//   scene.add(ambientLight);

//   const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//   directionalLight.position.set(1, 1, 0).normalize();
//   scene.add(directionalLight);
//   renderer = new THREE.WebGLRenderer();
//   renderer.outputEncoding = THREE.sRGBEncoding;
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(container.offsetWidth, container.offsetHeight);
//   container.appendChild(renderer.domElement);
//   renderer.render(scene, camera);
//   setTimeout(function(){renderer.render(scene, camera);},500) 
//   function animate() {
//     requestAnimationFrame(animate);
//     render();
//   }
//   function render() {
//     const delta = clock.getDelta();
//     if (elf !== undefined) {
//       elf.rotation.z += delta * 0.5;

//     }
//     // renderer.render(scene, camera);
//   }
//   // animate();
// }
function preview3DDialog(type, urlObj) {
  console.log('----', type, urlObj)
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
    show3DModelSample.controls = new THREE.OrbitControls(show3DModelSample.camera, show3DModelSample.renderer.domElement);
    show3DModelSample.controls.minDistance = 1;
    show3DModelSample.controls.maxDistance = 2000;
    show3DModelSample.controls.maxPolarAngle = Math.PI;
    show3DModelSample.controls.addEventListener('change', function (event) {
      window.show3DModelSample.renderer.render(window.show3DModelSample.scene, window.show3DModelSample.camera)
    }.bind(this));
    show3DModelSample.controls.update();
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
  } else if (type === 'stl' && urlObj.url) {
    let obj
    const loadingManager = new THREE.LoadingManager(function () {
      preview3DRender(obj)
    });
    const loader = new THREE.STLLoader(loadingManager);
    loader.load(urlObj.url, function ( geometry ) {
      var material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, specular: 0x111111, shininess: 200 } );
      obj = new THREE.Mesh( geometry, material );
      obj.position.set( 0, 0, 0);
      preview3DRender(obj)
    });
  } else if (type === 'collada' && urlObj.url) {
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
  } else if (type === 'fbx' && urlObj.url) {
    let obj
    const loadingManager = new THREE.LoadingManager(function () {
      preview3DRender(obj)
    });
    const loader = new THREE.FBXLoader(loadingManager);
    loader.load(urlObj.url, function ( object ) {
      // object.traverse( function ( child ) {
      //   if ( child.isMesh ) {
      //     child.castShadow = true;
      //     child.receiveShadow = true;
      //   }
      // });
      obj = object
      preview3DRender(obj)
    })
  } else if (type === 'nrrd' && urlObj.url) {
    let obj
    const loadingManager = new THREE.LoadingManager(function () {
      preview3DRender(obj)
    });
    const loader = new THREE.NRRDLoader(loadingManager);
    loader.load(urlObj.url, function (volume) {
      const geometry = new THREE.BoxBufferGeometry(volume.xLength, volume.yLength, volume.zLength);
      const material = new THREE.MeshBasicMaterial({
        color: 0xdddddd
      });
      obj = new THREE.Mesh(geometry, material);
      preview3DRender(obj)
    })
  } else if (type === 'mesh' && urlObj.created) {
    var createFuncStr = hiDraw.prototype.readTextareaFuncStr(urlObj.created)
    var refreshFuncStr = hiDraw.prototype.readTextareaFuncStr(urlObj.refresh)
    var createFunc = hi3D.prototype.functionGenerator(createFuncStr);
    node = createFunc()
    node.position.set(0,0,0);
    node.castShadow = true;
    node.receiveShadow = true;
    node.rotation.y = Math.PI / 3;
    preview3DRender(node)
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