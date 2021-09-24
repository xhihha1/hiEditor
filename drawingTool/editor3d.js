function initCanvas3D(edit, objOption) {

  edit.hi3d = new hi3D({
    transformControls: {
      objectChange: function (event) {
        if (event.target) { console.log('target', event.target.object.position.x, 'hiId:', event.target.object.hiId); }
      }.bind(edit.hi3d)
    },
    orbitControls: {
      change: function (event) {
        console.log(edit.hi3d.camera)
        edit.hi3d.camera.position
        edit.canvasView.forEachObject(function(obj2d){
          if (obj2d.hiId === edit.hi3d.camera.hiId) {
            obj2d.left = edit.hi3d.camera.position.x
            obj2d.altitude = edit.hi3d.camera.position.y
            obj2d.top = edit.hi3d.camera.position.z
          }
          if (obj2d.type === 'hiLookAt') {
            var lookAtVector = new THREE.Vector3(edit.hi3d.camera.matrix[8], edit.hi3d.camera.matrix[9], edit.hi3d.camera.matrix[10]);
            obj2d.left = lookAtVector.x
            obj2d.altitude = lookAtVector.y
            obj2d.top = lookAtVector.z
          }
          // var lookAtVector = new THREE.Vector3(cam.matrix[8], cam.matrix[9], cam.matrix[10]);
        })
        edit.canvasView.renderAll();
      }
    },
    renderSetting: {
      callback: function (event) {
        edit.hi3d.scene.traverse(function (node) {
          if (node.hiId) {
            console.log('render', node.position)
            edit.canvasView.forEachObject(function(obj2d){
              if (obj2d.hiId === node.hiId) {
                obj2d.left = node.position.x
                obj2d.altitude = node.position.y
                obj2d.top = node.position.z
              }
            })
            edit.canvasView.renderAll();
          }
        })
      }.bind(edit.hi3d)
    }
  })
  edit.hi3d.addscene()
  edit.hi3d.setGridHelper()
  edit.hi3d.addAxesHelper()
  edit.hi3d.addCamera()
  edit.hi3d.addLight()
  edit.hi3d.addHemisphereLight()
  edit.hi3d.addAmbientLight()
  edit.hi3d.setCamera({
    position: [0, 50, 100]
  })

  // edit.hi3d.addCube()
  // edit.hi3d.addCube({
  //   position: [5, 0, 0],
  //   color: '#F00'
  // })
  // edit.hi3d.addCube({
  //   position: [0, 5, 0],
  //   color: '#0F0'
  // })
  // edit.hi3d.addCube({
  //   position: [0, 0, 5],
  //   color: '#00F'
  // })
  // edit.hi3d.addObj()
  edit.hi3d.addOrbitControls()
  // edit.hi3d.setRender()
  // edit.hi3d.addTransformControls()
  // edit.hi3d.animate()

  function animateA() {
    // ---------------
    // var fabricJson = edit.canvasView.toJSON(['hiId', 'altitude', 'source']);
    var fabricJson = edit.toFabricJson()
    if (typeof json == 'string') {
      fabricJson = JSON.parse(fabricJson)
    }
    // console.log('3D ---', edit.canvasView.toJSON())
    // edit.hi3d.removeAllCube()
    // edit.hi3d.addObj()
    edit.hi3d.refreshByFabricJson(edit, objOption)
    edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    // requestAnimationFrame(animateA); // 自動更新 刷新
    // ----------------
  }
  animateA()
  // animate();
}
