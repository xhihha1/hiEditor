function initCanvas3D(edit, objOption) {

  edit.hi3d = new hi3D({
    transformControls: {
      objectChange: function (event) {
        if (event.target) { console.log('target', event.target.object.position.x, 'hiId:', event.target.object.hiId); }
      }.bind(edit.hi3d)
    }
  })
  edit.hi3d.addscene()
  edit.hi3d.setGridHelper()
  edit.hi3d.addAxesHelper()
  edit.hi3d.addCamera()
  edit.hi3d.addLight()
  edit.hi3d.addHemisphereLight()
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
