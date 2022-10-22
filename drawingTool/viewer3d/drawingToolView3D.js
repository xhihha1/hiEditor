var dataStructure = {
  editor: [],
  viewer: []
}


// ------------------------------------------------------------------
function hiViewer (edit, objOption) {
  console.log('???', edit, objOption)
  this.defaultOption = {
    parentId: 'content3D',
    dataRefreshTime: 1000,
    camera: {}
  }
  this.defaultOption = hi3D.prototype.mergeDeep(this.defaultOption, objOption)
  this.edit = edit
  this.fabricJson = JSON.parse(localStorage.getItem('viewJson3D')) 
  this.currentJson = JSON.parse(localStorage.getItem('viewJson3D')) 
  this.currentJson.sceneProp = this.fabricJson.sceneProp ? JSON.parse(this.fabricJson.sceneProp) : {}
  // this.defaultOption.camera = this.currentJson.sceneProp ? this.currentJson.sceneProp.camera : {}
  // this.defaultOption.dataRefreshTime = this.currentJson.sceneProp ? this.currentJson.sceneProp.dataRefreshTime : 1000
  this.edit.hi3d = new hi3D({
    parentId: this.defaultOption.parentId,
    container: {enableDefaultMouse: false}
  })
  this.edit.hi3d.addscene()
  this.edit.hi3d.setscene(this.currentJson.sceneProp)
  this.edit.hi3d.addCamera(this.currentJson.sceneProp.camera)
  // this.edit.hi3d.addCamera()
  // this.edit.hi3d.addLight()
  this.edit.hi3d.keyboradControlInit()
  this.edit.hi3d.addHemisphereLight()
  this.edit.hi3d.addAmbientLight()
  // this.edit.hi3d.setCamera({
  //   position: this.defaultOption.camera.position
  // })
  this.edit.hi3d.nodeEvnetBinding()
  this.edit.hi3d.addOrbitControls()
  return this
}

hiViewer.prototype.importJson = function (objOption) {
  this.defaultOption = hi3D.prototype.mergeDeep(this.defaultOption, objOption)
  var fabricJson = this.currentJson
  if (this.currentJson.sceneProp && this.currentJson.sceneProp.beforeInitial) {
    var beforeInitial = hiDraw.prototype.functionGenerator(fabricJson.sceneProp.beforeInitial);
    beforeInitial()
  }
  if (fabricJson) {
    this.edit.hi3d.refreshByFabricJson(this.edit, this.defaultOption, fabricJson)
    if (this.currentJson.sceneProp && this.currentJson.sceneProp.afterInitial) {
      var afterInitial = hiDraw.prototype.functionGenerator(this.currentJson.sceneProp.afterInitial);
      afterInitial()
    }
  }
  return this
}

hiViewer.prototype.viewerRefresh = function (objOption, fabricJson) {
  if (fabricJson) {
    this.edit.hi3d.refreshByFabricJson(this.edit, objOption, fabricJson)
  }
  return this
}

hiViewer.prototype.getBindingObj = function (updateView, object) {
  if (object.dataBinding) {
    var updateObjProp = {}
    updateObjProp.hiId = object.hiId
    updateObjProp.type = object.type
    var dataBinding = object.dataBinding
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
  } else if (object.objects) {
    for(var i = 0; i < object.objects.length; i++) {
      updateView = this.getBindingObj(updateView, object.objects[i])
    }
  }
  return updateView;
}

hiViewer.prototype.dataRefresh = function (objOption) {
  this.defaultOption = hi3D.prototype.mergeDeep(this.defaultOption, objOption)
  // urgent 沒有處理 group
  var fabricJson = this.currentJson
  var updateView = { objects: [] }
  for(var i = 0; i < fabricJson.objects.length; i++) {
    updateView = this.getBindingObj(updateView, fabricJson.objects[i])
    // if (fabricJson.objects[i].dataBinding) {
    //   var updateObjProp = {}
    //   updateObjProp.hiId = fabricJson.objects[i].hiId
    //   updateObjProp.type = fabricJson.objects[i].type
    //   var dataBinding = fabricJson.objects[i].dataBinding
    //   while (dataBinding && typeof dataBinding === 'string') {
    //     dataBinding = JSON.parse(dataBinding)
    //   }
    //   // var dataBinding = hiDraw.prototype.parseStrToObj(dataBinding)
    //   var needChange = false
    //   // console.log('dataBinding', dataBinding)
    //   if (dataBinding) {
    //     for(var k in dataBinding) {
    //       if (dataBinding[k].advanced) {
    //         var advancedFunc = hiDraw.prototype.functionGenerator(dataBinding[k].advanced);
    //         updateObjProp[k] = advancedFunc()
    //         needChange = true;
    //       }
    //     }
    //   }
    //   if (needChange) { updateView.objects.push(updateObjProp) }
    // }
  }
  if (updateView) {
    this.edit.hi3d.refreshByFabricJson(this.edit, this.defaultOption, updateView, { needRemove: false })
  }
  // console.log('dataRefreshTime', this.defaultOption.dataRefreshTime)
  this.defaultOption.dataRefreshTimeoutIdx = setTimeout(function(){
    this.dataRefresh(this.defaultOption)
  }.bind(this), this.defaultOption.dataRefreshTime)
  return this
}

hiViewer.prototype.viewerAnimation = function () {
  // urgent 沒有處理 group
  var fabricJson = this.currentJson
  if (this.currentJson.sceneProp) {
    this.currentJson.sceneProp = hiDraw.prototype.parseStrToObj(this.currentJson.sceneProp)
    var sceneAnimation = hiDraw.prototype.functionGenerator(this.currentJson.sceneProp.animation);
    this.currentJson.sceneProp.animation = sceneAnimation
  }
  requestAnimationFrame(this.animationCallback.bind(this));
  return this
}

hiViewer.prototype.animationCallback = function () {
  if (this.currentJson.sceneProp && this.currentJson.sceneProp.animation) {
    this.currentJson.sceneProp.animation()
  }
  for (var i = 0; i < dataStructure.viewer.length; i++) {
    if (dataStructure.viewer[i].edit.hi3d &&
      dataStructure.viewer[i].edit.hi3d.scene) {
        dataStructure.viewer[i].edit.hi3d.scene.traverse(function (node) {
          if (node.hiId) {
            for (var j = 0;this.currentJson && j < this.currentJson.objects.length; j++) {
              if (node.hiId && node.hiId === this.currentJson.objects[j].hiId) {
                if (this.currentJson.objects[j].animation) {
                  var animationFunc = hiDraw.prototype.functionGenerator(this.currentJson.objects[j].animation);
                  animationFunc(node, this.edit);
                }
                return true
              }
            }
          } else {
            return false
          }
        }.bind(this));
    }
    dataStructure.viewer[i].edit.hi3d.viewRender()
  }
  this.edit.hi3d.keyboradControlRender()
  requestAnimationFrame(this.animationCallback.bind(this));
  return this
}


  dataStructure.viewer.push(new hiViewer({}, undefined))
  console.log('----------', dataStructure.viewer[0])
  // var viewer = new hiViewer(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
  dataStructure.viewer[0].dsConfig = new datasourceOp(dataStructure.viewer[0].currentJson.datasourceConfig)
  dataStructure.viewer[0].importJson(dataStructure.viewer[0].edit.canvasOption)
  if (typeof datasourceOp !== 'undefined') {
    window.dsConfig = new datasourceOp(dataStructure.viewer[0].fabricJson.datasourceConfig)
  }
  dataStructure.viewer[0].dataRefresh (dataStructure.viewer[0].edit.canvasOption)
  dataStructure.viewer[0].viewerAnimation(dataStructure.viewer[0].edit.canvasOption)

  
// (function () {

//   // // 影片如果要自動撥放需要持續更新
//   // fabric.util.requestAnimFrame(function render() {
//   //   dataStructure.viewer[0].canvasView.renderAll();
//   //   viewerRefresh(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
//   //   fabric.util.requestAnimFrame(render);
//   // });
//   // window.requestAnimationFrame(function render() {
//   //   importJson(dataStructure.viewer[0], dataStructure.viewer[0].canvasOption)
//   //   // viewerRefresh(edit, objOption, fabricJson)
//   //   window.requestAnimationFrame(render)
//   // });
// })()