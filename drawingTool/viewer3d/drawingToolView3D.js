var dataStructure = {
  editor: [],
  viewer: []
}


function initCanvas3D(edit, objOption) {

  edit.hi3d = new hi3D()
  edit.hi3d.addscene()
  edit.hi3d.addCamera()
  edit.hi3d.addLight()
  edit.hi3d.addHemisphereLight()
  edit.hi3d.setCamera({
    position: [0, 50, 100]
  })

  edit.hi3d.addCube()
  edit.hi3d.addCube({
    position: [5, 0, 0],
    color: '#F00'
  })
  edit.hi3d.addCube({
    position: [0, 5, 0],
    color: '#0F0'
  })
  edit.hi3d.addCube({
    position: [0, 0, 5],
    color: '#00F'
  })
  // edit.hi3d.addObj()
  edit.hi3d.addAxesHelper()
  edit.hi3d.addOrbitControls()
  // edit.hi3d.addTransformControls()
  // edit.hi3d.animate()

  // function animateA() {
  //   // ---------------
  //   var fabricJson = edit.canvasView.toJSON(['hiId', 'altitude', 'source']);
  //   if (typeof json == 'string') {
  //     fabricJson = JSON.parse(fabricJson)
  //   }
  //   // console.log('3D ---', edit.canvasView.toJSON())
  //   // edit.hi3d.removeAllCube()
  //   // edit.hi3d.addObj()
  //   edit.hi3d.refreshByFabricJson(edit, objOption)
  //   edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
  //   // requestAnimationFrame(animateA); // 自動更新 刷新
  //   // ----------------
  // }
  // animateA()



  // animate();
  return edit
}

function importJson(edit, objOption) {
  // var fabricJson = edit.canvasView.toJSON(['hiId', 'altitude', 'source']);
  var fabricJson = JSON.parse(localStorage.getItem('viewJson3D'))
  // console.log(fabricJson)
  if (fabricJson) {
    edit.hi3d.refreshByFabricJson(edit, objOption, fabricJson)
  }
}

function viewerRefresh(edit, objOption, fabricJson) {
  if (fabricJson) {
    edit.hi3d.refreshByFabricJson(edit, objOption, fabricJson)
  }
}


(function () {
  dataStructure.viewer.push({})
  dataStructure.viewer[0] = initCanvas3D(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
  importJson(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
  viewerRefresh(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
  // dataStructure.viewer[0].heatmapInstance = heatmapCreate(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
  // window.requestAnimationFrame(() => {
  //   heatmapSetData(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
  // });


  // importJson(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)

  // // 影片如果要自動撥放需要持續更新
  // fabric.util.requestAnimFrame(function render() {
  //   dataStructure.viewer[0].canvasView.renderAll();
  //   viewerRefresh(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
  //   fabric.util.requestAnimFrame(render);
  // });
  // window.requestAnimationFrame(function render() {
  //   importJson(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
  //   // viewerRefresh(edit, objOption, fabricJson)
  //   window.requestAnimationFrame(render)
  // });
})()