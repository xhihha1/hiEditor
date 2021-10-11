var dataStructure = {
  editor: [],
  viewer: []
}


function initCanvas3D(edit, objOption) {
  var fabricJson = JSON.parse(localStorage.getItem('viewJson3D'))
  var sceneProp = JSON.parse(fabricJson.sceneProp)
  edit.hi3d = new hi3D({
    parentId: 'content3D',
    container: {enableDefaultMouse: false}
  })
  edit.hi3d.addscene()
  edit.hi3d.setscene(sceneProp)
  edit.hi3d.addCamera()
  // edit.hi3d.addLight()
  edit.hi3d.keyboradControlInit()
  edit.hi3d.addHemisphereLight()
  edit.hi3d.addAmbientLight()
  edit.hi3d.setCamera({
    position: [0, 50, 100]
  })
  edit.hi3d.nodeEvnetBinding()


  // edit.hi3d.addObj()
  // edit.hi3d.addAxesHelper()
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
  // before init
  
  fabricJson.sceneProp = hiDraw.prototype.parseStrToObj(fabricJson.sceneProp)
  if (fabricJson.sceneProp && fabricJson.sceneProp.beforeInitial) {
    var beforeInitial = hiDraw.prototype.functionGenerator(fabricJson.sceneProp.beforeInitial);
    beforeInitial()
  }
  if (fabricJson) {
    edit.hi3d.refreshByFabricJson(edit, objOption, fabricJson)
  }
  if (fabricJson.sceneProp && fabricJson.sceneProp.afterInitial) {
    var afterInitial = hiDraw.prototype.functionGenerator(fabricJson.sceneProp.afterInitial);
    afterInitial()
  }
  // after init
}

function viewerRefresh(edit, objOption, fabricJson) {
  if (fabricJson) {
    edit.hi3d.refreshByFabricJson(edit, objOption, fabricJson)
  }
}

function dataRefresh (edit, objOption) {
  // urgent 沒有處理 group
  var fabricJson = JSON.parse(localStorage.getItem('viewJson3D'))
  var updateView = { objects: [] }
  for(var i = 0; i < fabricJson.objects.length; i++) {
    if (fabricJson.objects[i].dataBinding) {
      var updateObjProp = {}
      updateObjProp.hiId = fabricJson.objects[i].hiId
      updateObjProp.type = fabricJson.objects[i].type
      var dataBinding = fabricJson.objects[i].dataBinding
      while (dataBinding && typeof dataBinding === 'string') {
        dataBinding = JSON.parse(dataBinding)
      }
      // var dataBinding = hiDraw.prototype.parseStrToObj(dataBinding)
      var needChange = false
      // console.log('dataBinding', dataBinding)
      if (dataBinding) {
        for(var k in dataBinding) {
          if (dataBinding[k].advanced) {
            var advancedFunc = hiDraw.prototype.functionGenerator(dataBinding[k].advanced);
            updateObjProp[k] = advancedFunc()
            needChange = true;
          }
        }
      }
      if (needChange) { updateView.objects.push(updateObjProp) }
    }
  }
  if (updateView) {
    // console.log('updateView', updateView)
    edit.hi3d.refreshByFabricJson(edit, objOption, updateView, { needRemove: false })
  }
  return setTimeout(function(){
    dataRefresh(edit, objOption)
  },1000)
}

function viewerAnimation (edit, objOption) {
  // urgent 沒有處理 group
  var fabricJson = JSON.parse(localStorage.getItem('viewJson3D'))
  if (fabricJson.sceneProp) {
    fabricJson.sceneProp = hiDraw.prototype.parseStrToObj(fabricJson.sceneProp)
    var sceneAnimation = hiDraw.prototype.functionGenerator(fabricJson.sceneProp.animation);
    fabricJson.sceneProp.animation = sceneAnimation
  }
  
  requestAnimationFrame(animation);
  function animation () {
    if (fabricJson.sceneProp && fabricJson.sceneProp.animation) {
      fabricJson.sceneProp.animation()
    }
    for (var i = 0; i < dataStructure.viewer.length; i++) {
      if (dataStructure.viewer[i].hi3d &&
        dataStructure.viewer[i].hi3d.scene) {
          dataStructure.viewer[i].hi3d.scene.traverse(function (node) {
            if (node.hiId) {
              for (var j = 0; j < fabricJson.objects.length; j++) {
                if (node.hiId && node.hiId === fabricJson.objects[j].hiId) {
                  if (fabricJson.objects[j].animation) {
                    var animationFunc = hiDraw.prototype.functionGenerator(fabricJson.objects[j].animation);
                    animationFunc(node, edit);
                  }
                  return true
                }
              }
            } else {
              return false
            }
          });
      }
      dataStructure.viewer[i].hi3d.viewRender()
    }
    edit.hi3d.keyboradControlRender()
    requestAnimationFrame(animation);
  }
}

(function () {
  dataStructure.viewer.push({})
  dataStructure.viewer[0] = initCanvas3D(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
  importJson(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
  dataRefresh (dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
  viewerAnimation(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
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