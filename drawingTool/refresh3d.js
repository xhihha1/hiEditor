hi3D.prototype.refreshByFabricJson = function(edit, objOption) {
    
    var fabricJson = edit.canvasView.toJSON(['hiId', 'altitude']);
    if (typeof json == 'string') {
        fabricJson = JSON.parse(fabricJson)
    }
    // 移除 id 不存在的
    var removeNodes = []
    edit.hi3d.scene.traverse(function (node) {
        if ( node instanceof THREE.Mesh ) {
            var nodeIdExist = false
            for (var i = 0; i < fabricJson["objects"].length; i++) {
                var itemId = fabricJson["objects"][i].hiId;
                if (node.hiId === itemId) { nodeIdExist= true }
            }
            if (!nodeIdExist) {removeNodes.push(node)}
        }
        if ( node instanceof THREE.Line ) {
            var nodeIdExist = false
            for (var i = 0; i < fabricJson["objects"].length; i++) {
                var itemId = fabricJson["objects"][i].hiId;
                if (node.hiId === itemId) { nodeIdExist= true }
            }
            if (!nodeIdExist) {removeNodes.push(node)}
        }
    });
    for (var i = removeNodes.length - 1; i >= 0; i--) {
        removeNodes[i].geometry.dispose();
        removeNodes[i].material.dispose();
        edit.hi3d.scene.remove(removeNodes[i]);
    }
    // 添加或修改 id 
    for (var i = 0; i < fabricJson["objects"].length; i++) {
        var item = fabricJson["objects"][i];
        var itemExist = false
        var objNode = null
        // console.log(item.hiId, item["type"])
        edit.hi3d.scene.traverse(function (node) {
            if (item.hiId && item.hiId === node.hiId) {
                itemExist = true
                objNode = node
                // console.log('exist cube id:', node.hiId)
            }
        });
        // if (!objNode) { continue }
        if (item["type"] == "hiCamera") {
            edit.hi3d.camera.position.set(item["left"], item['altitude'], item["top"]);
        }
        if (item["type"] == "hiLookAt") {
            edit.hi3d.camera.lookAt(new THREE.Vector3(item["left"], item['altitude'], item["top"]));
        }
        if (item["type"] == "hiCube") {
            var opt = {
                hiId: item.hiId,
                // color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
                color: edit.rgba2hex(item["fill"]) || edit.rgba2hex(item["stroke"]) || '#FF0000',
                position: [item["left"], item['altitude'], item["top"]],
                size: [item["width"], 1, item["height"]]
            }
            if (itemExist) {
                // console.log('exist cube', objNode, opt)
                edit.hi3d.setCube(objNode, opt)
            } else {
                // console.log('add cube', opt)
                edit.hi3d.addCube(opt)
            }
        }
        if (item["type"] == "hiSphere") {
            var opt = {
                hiId: item.hiId,
                // color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
                color: edit.rgba2hex(item["fill"]) || edit.rgba2hex(item["stroke"]) || '#FF0000',
                position: [item["left"], item['altitude'], item["top"]],
                radius: item["radius"],
                widthSegments: item["width"],
                heightSegments: item["height"]
            }
            if (itemExist) {
                edit.hi3d.setSphere(objNode, opt)
            } else {
                console.log('add Sphere', opt)
                edit.hi3d.addSphere(opt)
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
                color: edit.rgba2hex(item["fill"]) || edit.rgba2hex(item["stroke"]) || '#FF0000',
                points: points
            }
            if (itemExist) {
                // console.log('set hi3DPolyline', opt)
                edit.hi3d.setLine(objNode, opt)
            } else {
                // console.log('add hi3DPolyline', opt)
                edit.hi3d.addLine(opt)
            }
        }
    }
    // edit.hi3d.addLine({points:[ [0,0,0], [5,5,5], [0,5,0] ]})
    edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
}