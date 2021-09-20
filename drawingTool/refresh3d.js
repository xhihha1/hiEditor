hi3D.prototype.refreshByFabricJson = function (edit, objOption, json) {

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
    if (node instanceof THREE.Line) {
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
  for (var i = removeNodes.length - 1; i >= 0; i--) {
    if (removeNodes[i] instanceof THREE.Line ||
      removeNodes[i] instanceof THREE.Mesh) {
      if (removeNodes[i].geometry) {
        removeNodes[i].geometry.dispose();
      }
      if (removeNodes[i].material) {
        removeNodes[i].material.dispose();
      }
      this.scene.remove(removeNodes[i]);
    }
    if (removeNodes[i] instanceof THREE.Group) {
      removeNodes[i].traverse(function (node) {
        this.scene.remove(node);
      }.bind(this))
    }

  }
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
      this.camera.position.set(item["left"], item['altitude'], item["top"]);
    }
    if (item["type"] == "hiLookAt") {
      this.camera.lookAt(new THREE.Vector3(item["left"], item['altitude'], item["top"]));
    }
    if (item["type"] == "hiCube") {
      var depth = item["depth"] || 1
      var opt = {
        hiId: item.hiId,
        // color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
        color: this.rgba2hex(item["fill"]) || this.rgba2hex(item["stroke"]) || '#FF0000',
        position: [item["left"], item['altitude'], item["top"]],
        size: [item["width"], depth, item["height"]]
      }
      if (itemExist) {
        // console.log('exist cube', objNode, opt)
        this.setCube(objNode, opt)
      } else {
        // console.log('add cube', opt)
        this.addCube(opt)
      }
    }
    if (item["type"] == "hiSphere") {
      var opt = {
        hiId: item.hiId,
        // color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
        color: this.rgba2hex(item["fill"]) || this.rgba2hex(item["stroke"]) || '#FF0000',
        position: [item["left"], item['altitude'], item["top"]],
        radius: item["radius"],
        widthSegments: item["width"],
        heightSegments: item["height"]
      }
      if (itemExist) {
        this.setSphere(objNode, opt)
      } else {
        console.log('add Sphere', opt)
        this.addSphere(opt)
      }
    }
    if (item["type"] == "hi3DPolyline") {
      var points = []
      for (var j = 0; j < item['points'].length; j++) {
        points.push([item['points'][j].x, 0, item['points'][j].y])
      }
      var opt = {
        hiId: item.hiId,
        // color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
        color: this.rgba2hex(item["fill"]) || this.rgba2hex(item["stroke"]) || '#FF0000',
        points: points
      }
      if (itemExist) {
        // console.log('set hi3DPolyline', opt)
        this.setLine(objNode, opt)
      } else {
        // console.log('add hi3DPolyline', opt)
        this.addLine(opt)
      }
    }
    if (item["type"] == "hiFormatObj") {
      var opt = {
        hiId: item.hiId,
        // color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
        color: this.rgba2hex(item["fill"]) || this.rgba2hex(item["stroke"]) || '#FF0000',
        position: [item["left"], item['altitude'], item["top"]],
        widthSegments: item["width"],
        heightSegments: item["height"],
        source: item.source,
        scale: [item["scaleX"], 1, item["scaleY"]]
      }
      if (itemExist) {
        // console.log('set setObj', opt)
        this.setObj(objNode, opt)
      } else {
        // console.log('add addObj', opt)
        this.addObj(opt)
      }
    }
  }
  // this.addLine({points:[ [0,0,0], [5,5,5], [0,5,0] ]})
  this.renderer.render(this.scene, this.camera);
}