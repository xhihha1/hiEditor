hi3D.prototype.refreshByFabricJson = function (edit, objOption, json, otherSetting) {
  var setting = { needRemove: true }
  if (otherSetting) { setting = this.mergeDeep(setting, otherSetting) }
  // console.log('refresh')
// return false
  var fabricJson = null
  if (edit.canvasView) {
    // fabricJson = edit.canvasView.toJSON(['hiId', 'altitude']);
    fabricJson = edit.toFabricJson()
  }
  if (json) {
    if (typeof json == 'string') {
      fabricJson = JSON.parse(json)
    } else {
      fabricJson = json
    }
  }
  // 移除 id 不存在的
  var removeNodes = []
  this.scene.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      var nodeIdExist = false
      for (var i = 0; i < fabricJson["objects"].length; i++) {
        var itemId = fabricJson["objects"][i].hiId;
        if (node.hiId === itemId) {
          nodeIdExist = true
        }
      }
      if (!nodeIdExist) {
        removeNodes.push(node)
      }
    }
    if (node instanceof THREE.Line ||
      node instanceof THREE.Line2 ||
      node instanceof THREE.SpotLight ||
      node instanceof THREE.PointLight) {
      var nodeIdExist = false
      for (var i = 0; i < fabricJson["objects"].length; i++) {
        var itemId = fabricJson["objects"][i].hiId;
        if (node.hiId === itemId) {
          nodeIdExist = true
        }
      }
      if (!nodeIdExist) {
        removeNodes.push(node)
      }
    }
    if (node instanceof THREE.Group) {
      var nodeIdExist = false
      for (var i = 0; i < fabricJson["objects"].length; i++) {
        var itemId = fabricJson["objects"][i].hiId;
        if (node.hiId === itemId) {
          nodeIdExist = true
        }
      }
      if (!nodeIdExist) {
        removeNodes.push(node)
      }
    }
  }.bind(this));
  // 透過設定決定是否刪除物件  
  if (setting.needRemove) {
    // 先不移除多餘物件
    for (var i = removeNodes.length - 1; i >= 0; i--) {
      if (removeNodes[i] instanceof THREE.SpotLight && removeNodes[i].hiId) {
        this.scene.remove(removeNodes[i]);
      }
      if (removeNodes[i] instanceof THREE.PointLight && removeNodes[i].hiId) {
        // console.log('remove PointLight')
        this.scene.remove(removeNodes[i]);
      }
      if ((removeNodes[i] instanceof THREE.Line ||
        removeNodes[i] instanceof THREE.Mesh) &&
        removeNodes[i].hiId) {
        if (removeNodes[i].geometry) {
          removeNodes[i].geometry.dispose();
        }
        if (removeNodes[i].material) {
          removeNodes[i].material.dispose();
        }
        this.scene.remove(removeNodes[i]);
      }
      if (removeNodes[i] instanceof THREE.Group &&
        removeNodes[i].hiId) {
        removeNodes[i].traverse(function (node) {
          this.scene.remove(node);
        }.bind(this))
      }
    }
  }
  // 設定燈光參數
  if (fabricJson.directionalLight) {
    if (typeof fabricJson.directionalLight === 'string') {
      fabricJson.directionalLight = JSON.parse(fabricJson.directionalLight)
    }
    var opt = this.getItemOption(fabricJson.directionalLight)
    if (this.directionalLight) {
      this.setLight(opt)
    } else {
      this.addLight(opt)
    }
  }
  if (fabricJson.hemisphereLight) {
    if (typeof fabricJson.hemisphereLight === 'string') {
      fabricJson.hemisphereLight = JSON.parse(fabricJson.hemisphereLight)
    }
    var opt = this.getItemOption(fabricJson.hemisphereLight)
    if (this.hemisphereLight) {
      console.log('set', opt)
      this.setHemisphereLight(opt)
    } else {
      console.log('add', opt)
      this.addHemisphereLight(opt)
    }
  }
  if (fabricJson.ambientLight) {
    if (typeof fabricJson.ambientLight === 'string') {
      fabricJson.ambientLight = JSON.parse(fabricJson.ambientLight)
    }
    var opt = this.getItemOption(fabricJson.ambientLight)
    if (this.ambientLight) {
      this.setAmbientLight(opt)
    } else {
      this.addAmbientLight(opt)
    }
  }
  // this.addLight()
  // this.addHemisphereLight()
  // edit.hi3d.addAmbientLight()
  // 添加或修改 id 
  for (var i = 0; i < fabricJson["objects"].length; i++) {
    var item = fabricJson["objects"][i];
    var itemExist = false
    var objNode = null
    // console.log(item.hiId, item["type"])
    this.scene.traverse(function (node) {
      if (item.hiId && item.hiId === node.hiId) {
        itemExist = true
        objNode = node
        // console.log('exist cube id:', node.hiId)
      }
    });
    // if (!objNode) { continue }
    if (item["type"] == "hiCamera") {
      const far = item.camera && item.camera.far ? item.camera.far : 2000
      const near = item.camera && item.camera.near ? item.camera.near : 0.1
      var opt = {
        far: far,
        near: near,
        position: [item["left"], item['altitude'], item["top"]]
      }
      // this.camera.position.set(item["left"], item['altitude'], item["top"]);
      this.setCamera(opt)
    }
    if (item["type"] == "hiLookAt") {
      var opt = {
        targetPoint: [item["left"], item['altitude'], item["top"]]
      }
      // this.camera.lookAt(new THREE.Vector3(item["left"], item['altitude'], item["top"]));
      this.setCamera(opt)
    }
    console.log('item---', item)
    if (item.objects && item.objects.length > 0) {
      this.addGroupObject(edit, item, itemExist, objNode)
    } else {
      this.addSingleObject(edit, item, itemExist, objNode)
    }
  }
  this.scene.traverse(function (node) {
    if (node instanceof THREE.SpotLightHelper) {
      node.update();
    }
    if (node instanceof THREE.CameraHelper) {
      node.update();
    }
  })
  // this.addLine({points:[ [0,0,0], [5,5,5], [0,5,0] ]})
  // this.renderer.render(this.scene, this.camera);
  this.viewRender()
}

hi3D.prototype.addSingleObject = function (edit, item, itemExist, objNode, parentGroup) {
  if (item["type"] == "hiSpotLight") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      // console.log('exist SpotLight', objNode, opt)
      this.setSpotLight(objNode, opt)
    } else {
      // console.log('add SpotLight', opt)
      this.addSpotLight(opt)
    }
  }
  if (item["type"] == "hiPointLight") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      this.setPointLight(objNode, opt)
    } else {
      this.addPointLight(opt)
    }
  }
  if (item["type"] == "hiCube") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      // console.log('exist cube', objNode, opt)
      this.setCube(objNode, opt)
    } else {
      // console.log('add cube', opt)
      this.addCube(opt, parentGroup)
    }
  }
  if (item["type"] == "hiSphere") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      // console.log('set Sphere', opt)
      this.setSphere(objNode, opt)
    } else {
      // console.log('add Sphere', opt)
      this.addSphere(opt, parentGroup)
    }
  }
  if (item["type"] == "hiCylinder") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      // console.log('set Cylinder', opt)
      this.setCylinder(objNode, opt)
    } else {
      // console.log('add Cylinder', opt)
      this.addCylinder(opt, parentGroup)
    }
  }
  if (item["type"] == "hi3DPolyline") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      // console.log('set hi3DPolyline', opt)
      // this.setLine(objNode, opt)
      this.setLine2(objNode, opt)
    } else {
      // console.log('add hi3DPolyline', opt)
      // this.addLine(opt)
      this.addLine2(opt, parentGroup)
    }
  }
  if (item["type"] == "hi3DPolygon") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      // console.log('set hi3DPolygon', opt)
      // this.setLine(objNode, opt)
      this.setClosedCurve(objNode, opt)
    } else {
      // console.log('add hi3DPolygon', opt)
      // this.addLine(opt)
      this.addClosedCurve(opt, parentGroup)
    }
  }
  if (item["type"] == "hiPlane") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      console.log('set hiPlane', opt)
      this.setSphere(objNode, opt)
    } else {
      console.log('add hiPlane', opt)
      this.addGroundPlane(opt, parentGroup)
    }
  }
  if (item["type"] == "hiWall") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      // console.log('exist cube', objNode, opt)
      this.setWall(objNode, opt)
    } else {
      // console.log('add cube', opt)
      this.addWall(opt, parentGroup)
    }
  }
  if (item["type"] == "hiFormatObj") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      // console.log('set setObj', opt)
      this.setObj(objNode, opt)
    } else {
      // console.log('add addObj', opt)
      this.addObj(opt, parentGroup)
    }
  }
  if (item["type"] == "hiFormatCollada") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      // console.log('set setObj', opt)
      this.setCollada(objNode, opt)
    } else {
      // console.log('add addObj', opt)
      this.addCollada(opt, parentGroup)
    }
  }
  if (item["type"] == "hiFormatSTL") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      // console.log('set setObj', opt)
      this.setSTL(objNode, opt)
    } else {
      // console.log('add addObj', opt)
      this.addSTL(opt, parentGroup)
    }
  }
  if (item["type"] == "hiFormat3ds") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      // console.log('set setObj', opt)
      this.set3ds(objNode, opt)
    } else {
      // console.log('add addObj', opt)
      this.add3ds(opt, parentGroup)
    }
  }
  if (item["type"] == "hiFormatGLTF") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      // console.log('set setObj', opt)
      this.setgltf(objNode, opt)
    } else {
      // console.log('add addObj', opt)
      this.addgltf(opt, parentGroup)
    }
  }
  if (item["type"] == "hiFormatFbx") {
    console.log('hiFormatFbx', item)
    var opt = this.getItemOption(item)
    if (itemExist) {
      console.log('set setfbx', opt)
      this.setfbx(objNode, opt)
    } else {
      console.log('add addfbx', opt)
      this.addfbx(opt, parentGroup)
    }
  }
  if (item["type"] == "hiFormatNrrd") {
    var opt = this.getItemOption(item)
    if (itemExist) {
      // console.log('set setObj', opt)
      this.setnrrd(objNode, opt)
    } else {
      // console.log('add addObj', opt)
      this.addnrrd(opt, parentGroup)
    }
  }
}
hi3D.prototype.addGroupObject = function (edit, groupItem, itemExist, objNode, parentGroup) {
  var objOption = {
    position: [0, 0, 0],
    size: [1, 1, 1],
    source: { gltfPath: '', gltf: '' },
    scale: [1, 1, 1],
    angle: 0
  }
  const option = {
    hiId: groupItem.hiId,
    position: [groupItem["left"], groupItem['altitude'], groupItem["top"]],
    scale: [groupItem["scaleX"], groupItem["scaleZ"], groupItem["scaleY"]],
    angle: groupItem['angle']
  }
  objOption = this.mergeDeep(objOption, option)

  let group = null
  if (itemExist) {
    group = objNode
    // set item property
  } else {
    group = new THREE.Group();
    group.hiId = objOption.hiId
    this.scene.add( group );
    // set item property
  }
  // -------------------------
  // group.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  if(typeof objOption.position[0] !== 'undefined') { group.position.x = objOption.position[0]; }
  if(typeof objOption.position[1] !== 'undefined') { group.position.y = objOption.position[1]; }
  if(typeof objOption.position[2] !== 'undefined') { group.position.z = objOption.position[2]; }
  if(typeof objOption.scale[0] !== 'undefined') { group.scale.z = objOption.scale[0]; }
  if(typeof objOption.scale[1] !== 'undefined') { group.scale.z = objOption.scale[1]; }
  if(typeof objOption.scale[2] !== 'undefined') { group.scale.z = objOption.scale[2]; }
  // group.scale.x = objOption.scale[0];
  // group.scale.y = objOption.scale[1];
  // group.scale.z = objOption.scale[2];
  if(typeof objOption.angle !== 'undefined') { group.rotation.y = -1 * objOption.angle / 180 * Math.PI; }
  // group.rotation.y = -1 * objOption.angle / 180 * Math.PI;
  // -------------------------
  if (parentGroup) {
    parentGroup.add( group );
  }
  for (var i = 0; i < groupItem["objects"].length; i++) {
    var item = groupItem["objects"][i];
    var itemExist = false
    var objNode = null
    // console.log(item.hiId, item["type"])
    this.scene.traverse(function (node) {
      if (item.hiId && item.hiId === node.hiId) {
        itemExist = true
        objNode = node
        // console.log('exist cube id:', node.hiId)
      }
    });
    if (item.objects && item.objects.length > 0) {
      this.addGroupObject(edit, item, itemExist, objNode, group)
    } else {
      this.addSingleObject(edit, item, itemExist, objNode, group)
    }
  }
}

hi3D.prototype.getItemOption = function (item) {
  var points = []
  for (var j = 0;item['points'] && j < item['points'].length; j++) {
    var pointZ = item['points'][j].z || 0
    points.push([item['points'][j].x, pointZ, item['points'][j].y])
  }
  var name = item["name"];
  var color = item["fill"] || item["stroke"];
  var transparent = item["transparent"];
  var opacity = item["opacity"];
  // var position = typeof item["left"] !== 'undefined' ? [item["left"], item['altitude'], item["top"]] : undefined
  var position = [item["left"], item['altitude'], item["top"]]
  var radius = typeof item["radius"] !== 'undefined' ? item["radius"] : undefined
  var widthSegments = typeof item["width"] !== 'undefined' ? item["width"] : undefined
  var heightSegments = typeof item["height"] !== 'undefined' ? item["height"] : undefined
  var angle = typeof item["angle"] !== 'undefined' ? item["angle"] : undefined
  var rotateX = typeof item["rotateX"] !== 'undefined' ? item["rotateX"] : undefined
  var rotateZ = typeof item["rotateZ"] !== 'undefined' ? item["rotateZ"] : undefined
  var scale = typeof item["scaleX"] !== 'undefined' ? [item["scaleX"], item["scaleZ"], item["scaleY"]] : undefined
  var depth = item["depth"] || 1
  // console.log('depth', item.hiId, item["depth"])
  var size = typeof item["width"] !== 'undefined' ? [item["width"], depth, item["height"]] : undefined
  var source = typeof item.source !== 'undefined' ? item.source : undefined
  var dataBinding = typeof item.dataBinding !== 'undefined' ? item.dataBinding : undefined
  var eventBinding = typeof item.eventBinding !== 'undefined' ? item.eventBinding : undefined
  var intensity = typeof item.intensity !== 'undefined' ? item.intensity : 1
  var distance = typeof item.distance !== 'undefined' ? item.distance : 200
  var penumbra = typeof item.penumbra !== 'undefined' ? item.penumbra : 0.1
  var decay = typeof item.decay !== 'undefined' ? item.decay : 2
  var visible = typeof item.visible === 'boolean' ? item.visible : true
  var skyColor = typeof item.skyColor !== 'undefined' ? item.skyColor : color
  var groundColor = typeof item.groundColor !== 'undefined' ? item.groundColor : color
  var faceMaterial = item.faceMaterial? JSON.parse(item.faceMaterial) : {}
  return {
    hiId: item.hiId,
    name: name,
    visible: visible,
    color: this.colorToHex(color),
    transparent: transparent,
    opacity: opacity,
    points: points,
    position: position,
    source: source,
    radius: radius,
    widthSegments: widthSegments,
    heightSegments: heightSegments,
    size: size,
    rotateX: rotateX,
    rotateZ: rotateZ,
    angle: angle,
    scale: scale,
    dataBinding: dataBinding,
    eventBinding: eventBinding,
    intensity: intensity,
    distance: distance,
    penumbra: penumbra,
    decay: decay,
    skyColor: this.colorToHex(skyColor),
    groundColor: this.colorToHex(groundColor),
    faceMaterial: faceMaterial
  }
}