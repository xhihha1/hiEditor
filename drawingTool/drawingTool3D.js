var dataStructure = {
  editor: []
}



function appendProp() {

}

function initCanvas(canvasId, canvasViewId) {
  var elem = document.getElementById(canvasId);
  var edit = new hiDraw({
    canvasViewId: canvasViewId,
    // viewJsonTextId: 'hiJsonArea',
    // activeJsonTextId: 'hiActiveJsonArea',
    canvasWidth: elem.offsetWidth,
    canvasHeight: elem.offsetHeight,
    objectDefault: {
      fillAlpha: 0,
      lineWidth: 1,
      strokeColor: 'rgba(51, 51, 51, 1)'
    },
    event: {
      object_added: function (opt) {
        console.log('object_added')
        if(opt.target.hiId){
          console.log('object_added', opt.target.hiId)
          edit.viewRender()
          showObjPropChange(opt.target);
          edit.hi3d.refreshByFabricJson(edit);
        }
        var listStr = '';
        edit.canvasView.forEachObject(function (obj) {
          if (obj['tempDrawShape']) {} else {
            listStr += '<li>' + obj.get('type') + '/' + obj['name'] + '/' + obj['hiId'] + '</li>'
          }
        })
        $('#objlist').html(listStr)
      },
      object_modified: function (opt) {
        console.log('object_modified')
        if(opt.target.hiId){
          edit.viewRender()
          showObjPropChange(opt.target);
          edit.hi3d.refreshByFabricJson(edit);
        }
        if(opt.target.get('type') === 'activeSelection') {
          var needRefresh3d = false
          opt.target.forEachObject(function(object) {
            if (object.hiId) { needRefresh3d = true}
            console.log('object_modified obj', object.left, object.top, object.width, object.height, object.originX, object.originY)
          });
          if (needRefresh3d) { edit.hi3d.refreshByFabricJson(edit); }
        }
      },
      object_removed: function (opt) {
        console.log('object_removed')
        if(opt.target.hiId){
          if (edit.hiObjectList[opt.target.hiId]) { edit.hiObjectList[opt.target.hiId] = null }
          showObjPropChange(opt.target);
          edit.hi3d.refreshByFabricJson(edit); 
        }
        var listStr = '';
        edit.canvasView.forEachObject(function (obj) {
          if (obj['tempDrawShape']) {} else {
            listStr += '<li>' + obj.get('type') + '/' + obj['name'] + '/' + obj['hiId'] + '</li>'
          }
        })
        $('#objlist').html(listStr)
      },
      after_render: function (opt) {
        // console.log('after_render')
        // var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex', 'hiId', 'altitude', 'source', 'depth']);
        // 暫時不更新 屬性，不然time interval 會造成無法改值
        // var activeObj = edit.canvasView.getActiveObject();
        // if(activeObj &&　activeObj.hiId){
        //   showObjPropChange(activeObj);
        // }
        var fabricJson = edit.toFabricJson()
        fabricJson["objects"] = fabricJson["objects"].filter(function (obj) {
          if (!obj['tempDrawShape']) {
            return true;
          } else {
            return false;
          }
        })
        $('#currentJson').val(JSON.stringify(fabricJson))
        // edit.hi3d.refreshByFabricJson(edit);
      },
      selection_created: function (opt) {
        console.log('selection_created')
        if (opt.target) {
          if (opt.target.hiId) {
            showObjPropChange(opt.target)
            edit.hi3d.scene.traverse(function (node) {
              if ( (node instanceof THREE.Mesh || node instanceof THREE.Group) &&
                node.hiId === opt.target.hiId) {
                edit.hi3d.setTransformControlsMesh(node)
                // edit.hi3d.refreshByFabricJson(edit);
              }
            })
          } else {
            edit.hi3d.setTransformControlsMesh()
          }
        }
      },
      selection_updated: function (opt) {
        console.log('selection_updated')
        if (opt.target.hiId) {
          showObjPropChange(opt.target)
          edit.hi3d.scene.traverse(function (node) {
            if ( node instanceof THREE.Mesh && node.hiId === opt.target.hiId) {
              edit.hi3d.setTransformControlsMesh(node)
              // edit.hi3d.refreshByFabricJson(edit);
            }
          })
        } else {
          edit.hi3d.setTransformControlsMesh()
        }
      },
      selection_cleared: function (opt) {
        edit.hi3d.disposeTransformControlsMesh()
        // edit.hi3d.refreshByFabricJson(edit);
      },
      import_callback: function () {

      }
    }
  }).createView().viewEvent().BgGrid(true);


  var objOption = {
    activeJsonTextId: 'hiActiveJsonArea',
    endDraw: function () {
      edit.changeCanvasProperty(true, false);
      edit.changeSelectableStatus(true);
      edit.viewEvent();
    },
    onSelected: function (opt) {

    }
  };

  edit.canvasOption = objOption

  // 移動 (0, 0) 至中心
  var canvasZoom = edit.canvasView.getZoom();
  var shiftX = edit.canvasView.width/2 / canvasZoom;
  var shiftY = edit.canvasView.height/2 / canvasZoom;
  edit.canvasView.absolutePan({
    x: -1 * shiftX,
    y: -1 * shiftY
  })
  edit.BgGrid(true);
  return edit;
}

function showObjPropChange (object) { // opt.target
  $('#newPropHiId').val(object.get('hiId'))
  $('#newPropType').val(object.get('type'))
  $('#newPropName').val(object.get('name'))
  $('#newPropDepth').val(parseInt(object.get('depth')) || 0)
  $('#newRotateX').val(parseInt(object.get('rotateX')) || 0)
  $('#newRotateY').val(parseInt(object.get('angle')) || 0)
  $('#newRotateZ').val(parseInt(object.get('rotateZ')) || 0)
  $('#newpositionX').val(parseInt(object.get('left')) || 0)
  $('#newpositionY').val(parseInt(object.get('altitude')) || 0)
  $('#newpositionZ').val(parseInt(object.get('top')) || 0)
  $('#newsizeX').val(parseFloat(object.get('width')) || 1)
  $('#newsizeY').val(parseFloat(object.get('depth')) || 1)
  $('#newsizeZ').val(parseFloat(object.get('height')) || 1)
  $('#newscaleX').val(parseFloat(object.get('scaleX')) || 1)
  $('#newscaleY').val(parseFloat(object.get('scaleY')) || 1)
  $('#newscaleZ').val(parseFloat(object.get('scaleZ')) || 1)
  
  var dataBinding = object.get('dataBinding') || {
    fill:{
      advanced: 'function (value) {return hi3D.prototype.randomHexColor();}'
    }
  }
  // $('#newPropDataBinding').val(JSON.stringify(dataBinding, null, 2))
  if(typeof dataBinding === 'string') {
    $('#newPropDataBinding').val(dataBinding)
  } else {
    $('#newPropDataBinding').val(JSON.stringify(dataBinding, null, 2))
    // $('#newPropDataBinding').val(JSON.stringify(dataBinding))
  }
  var eventBinding = object.get('eventBinding') || {
    click: 'function (value) { console.log("123456");}'
  }
  // $('#newPropEventBinding').val(JSON.stringify(eventBinding, null, 2))
  // $('#newPropEventBinding').val(eventBinding)
  if(typeof eventBinding === 'string') {
    $('#newPropEventBinding').val(eventBinding)
  } else {
    $('#newPropEventBinding').val(JSON.stringify(eventBinding, null, 2))
    // $('#newPropEventBinding').val(JSON.stringify(eventBinding))
  }
  $('#newPropAnimation').val(object.get('animation'))
  // $('#newPropAfterAddFunc').val(object.get('afteraddFunc'))
  // -------- Material ----------
  $('#newPropStroke').val(hiDraw.prototype.colorToHex(object.get('stroke')))
  $('#newPropFill').val(hiDraw.prototype.colorToHex(object.get('fill')))
  $('#newPropTransparent').prop("checked", Boolean(object.get('transparent')));
  $('#newOpacity').val(object.get('opacity') || 1)
  var faceMaterial = object.get('faceMaterial') || {}
  if(typeof faceMaterial === 'string') {
    faceMaterial = JSON.parse(faceMaterial)
  }
  $('#newPropObjFaceImage').val(faceMaterial.image || '')
  $('#newPropObjFacePx').val(faceMaterial.pxImg || '')
  $('#newPropObjFaceNx').val(faceMaterial.nxImg || '')
  $('#newPropObjFacePy').val(faceMaterial.pyImg || '')
  $('#newPropObjFaceNy').val(faceMaterial.nyImg || '')
  $('#newPropObjFacePz').val(faceMaterial.pzImg || '')
  $('#newPropObjFaceNz').val(faceMaterial.nzImg || '')
  $('#newPropHidraw').val(faceMaterial.hiDraw)
  // -------- spotLight ---------
  $('#newSpotIntensity').val(parseFloat(object.get('intensity')) || 1)
  $('#newSpotDistance').val(parseFloat(object.get('distance')) || 200)
  $('#newSpotAngle').val(parseFloat(object.get('angle')) || 1.05)
  $('#newSpotPenumbra').val(parseFloat(object.get('penumbra')) || 0.1)
  $('#newSpotDecay').val(parseFloat(object.get('decay')) || 2)
}

function setObjPropChange () {
  // $('#newPropHiId').val()
  // $('#newPropType').val()
  var name = $('#newPropName').val()
  var stroke = $('#newPropStroke').val()
  var fill = $('#newPropFill').val()
  var transparent = Boolean($('#newPropTransparent').prop("checked"));
  var opacity = parseFloat($('#newOpacity').val())
  var rotateX = parseInt($('#newRotateX').val())
  var angle = parseInt($('#newRotateY').val())
  var rotateZ = parseInt($('#newRotateZ').val())
  var left = parseInt($('#newpositionX').val())
  var altitude = parseInt($('#newpositionY').val())
  var top = parseInt($('#newpositionZ').val())
  var width = parseFloat($('#newsizeX').val())
  var depth = parseFloat($('#newsizeY').val())
  var height = parseFloat($('#newsizeZ').val())
  var scaleX = parseFloat($('#newscaleX').val())
  var scaleY = parseFloat($('#newscaleY').val())
  var scaleZ = parseFloat($('#newscaleZ').val())
  var bindingStr = hiDraw.prototype.readTextareaFuncStr($('#newPropDataBinding').val())
  var dataBinding = bindingStr
  var eventbindingStr = hiDraw.prototype.readTextareaFuncStr($('#newPropEventBinding').val())
  var eventBinding = eventbindingStr
  var intensity = parseFloat($('#newSpotIntensity').val())
  var distance = parseFloat($('#newSpotDistance').val())
  var penumbra = parseFloat($('#newSpotPenumbra').val())
  var decay = parseFloat($('#newSpotDecay').val())
  var animationStr = $('#newPropAnimation').val()
  animationStr = animationStr.trim()
  animationStr = animationStr.replace(/\r\n/g,"")
  animationStr = animationStr.replace(/\n/g,"")
  animationStr = animationStr.trim()
  var animation = animationStr
  // var afteraddFuncStr = $('#newPropAfterAddFunc').val()
  // afteraddFuncStr = afteraddFuncStr.trim()
  // afteraddFuncStr = afteraddFuncStr.replace(/\r\n/g,"")
  // afteraddFuncStr = afteraddFuncStr.replace(/\n/g,"")
  // afteraddFuncStr = afteraddFuncStr.trim()
  // var afteraddFunc = afteraddFuncStr
  // -------- Material ----------
  var faceMaterial = {}
  faceMaterial.image = $('#newPropObjFaceImage').val().trim()
  faceMaterial.pxImg = $('#newPropObjFacePx').val().trim()
  faceMaterial.nxImg = $('#newPropObjFaceNx').val().trim()
  faceMaterial.pyImg = $('#newPropObjFacePy').val().trim()
  faceMaterial.nyImg = $('#newPropObjFaceNy').val().trim()
  faceMaterial.pzImg = $('#newPropObjFacePz').val().trim()
  faceMaterial.nzImg = $('#newPropObjFaceNz').val().trim()
  faceMaterial.hiDraw = $('#newPropHidraw').val()
  console.log('faceMaterial.hiDraw', faceMaterial.hiDraw)
  var faceMaterialStr = JSON.stringify(faceMaterial)
  return {
    name: name,
    stroke: hiDraw.prototype.colorToHex(stroke),
    fill: hiDraw.prototype.colorToHex(fill),
    transparent: transparent,
    opacity: opacity < 0 ? 0 : opacity > 1 ? 1 : opacity,
    rotateX: rotateX,
    angle: angle,
    rotateZ: rotateZ,
    left: left,
    altitude: altitude,
    top: top,
    width: width,
    depth: depth,
    height: height,
    scaleX: scaleX,
    scaleY: scaleY,
    scaleZ: scaleZ,
    dataBinding: dataBinding,
    eventBinding: eventBinding,
    intensity: intensity,
    distance: distance,
    penumbra: penumbra,
    decay: decay,
    animation: animation,
    // afteraddFunc: afteraddFunc,
    faceMaterial: faceMaterialStr
  }
}

function objectPropertyChange(edit, objOption) {
  $('#propApply').click(function () {
    var activeObj = edit.canvasView.getActiveObject();
    if (activeObj) {
      activeObj.set(setObjPropChange ());
      edit.viewRender()
      edit.hi3d.refreshByFabricJson(edit);
    }
  })

  // ------------ data binding 
  $('#openDataBinding').click(function () {
    $('#dataBindingDialog').css('display', 'block')
    var bindingStr = $('#newPropDataBinding').val()
    //替换所有的换行符
    bindingStr = bindingStr.replace(/\r\n/g,"")
    bindingStr = bindingStr.replace(/\n/g,"");
    // var dataBinding = JSON.parse(bindingStr)
    while (typeof bindingStr === 'string') {
      bindingStr = JSON.parse(bindingStr)
    }
    var dataBinding = bindingStr
    $('.dbPropCard').remove()
    var str = ''
    for(var key in dataBinding) {
      str += '<div class="dataBindingDialogCard dbPropCard">'
      str += '  <div><span>property name:</span><button class="removeDbPropName">remove</button></div>'
      str += '  <div><input type="text" value="'+key+'" class="dbPropName" /></div>'
      str += '  <div><textarea class="dbPropFunc">'+dataBinding[key].advanced+'</textarea></div>'
      str += '</div>'
    }
    $('#dataBindingDialogContent').append(str)
  })
  $('#dataBindingDialogClose').click(function () {
    $('#dataBindingDialog').css('display', 'none')
    var dataBinding = {}
    $('.dbPropCard').each(function(){
      var key = $(this).find('.dbPropName').val()
      var advanced = $(this).find('.dbPropFunc').val()
      dataBinding[key] = {}
      dataBinding[key].advanced = advanced
    })
    $('#newPropDataBinding').val(JSON.stringify(dataBinding, null, 2))
    // $('#newPropDataBinding').val(JSON.stringify(dataBinding))
  })
  $('#dataBindingDialogContent').click(function (e) {
    var target = e.target
    if ($(target).attr('id') === 'addDbPropName') {
      var key = $(target).parents('#dataBindingDialogCardNew').find('.dbPropName').val()
      var advanced = $(target).parents('#dataBindingDialogCardNew').find('.dbPropFunc').val()
      var str = ''
      str += '<div class="dataBindingDialogCard dbPropCard">'
      str += '  <div><span>property name:</span><button class="removeDbPropName">remove</button></div>'
      str += '  <div><input type="text" value="' + key + '" class="dbPropName" /></div>'
      str += '  <div><textarea class="dbPropFunc">' + advanced + '</textarea></div>'
      str += '</div>'
      $(target).parents('#dataBindingDialogCardNew').after(str)
    }
    if ($(target).hasClass('removeDbPropName')) {
      $(target).parents('.dbPropCard').remove()
    }
  })

  // ------------ event binding 
  $('#openEventBinding').click(function () {
    $('#eventBindingDialog').css('display', 'block')
    var eventFuncStr = $('#newPropEventBinding').val()
    //替换所有的换行符
    eventFuncStr = eventFuncStr.replace(/\r\n/g,"")
    eventFuncStr = eventFuncStr.replace(/\n/g,"");
    while (typeof eventFuncStr === 'string') {
      eventFuncStr = JSON.parse(eventFuncStr)
    }
    var eventBinding = eventFuncStr
    if (typeof eventBinding === 'string') {eventBinding = JSON.parse(eventBinding)}
    $('.dbPropCard').remove()
    var str = ''
    for(var key in eventBinding) {
      str += '<div class="eventBindingDialogCard dbPropCard">'
      str += '  <div><span>event name:</span><button class="removeDbPropName">remove</button></div>'
      str += '  <div><input type="text" value="'+key+'" class="dbPropName" /></div>'
      str += '  <div><textarea class="dbPropFunc">'+eventBinding[key]+'</textarea></div>'
      str += '</div>'
    }
    $('#eventBindingDialogContent').append(str)
  })
  $('#eventBindingDialogClose').click(function () {
    $('#eventBindingDialog').css('display', 'none')
    var eventBinding = {}
    $('.dbPropCard').each(function(){
      var key = $(this).find('.dbPropName').val()
      var eventFuncStr = $(this).find('.dbPropFunc').val()
      eventFuncStr = eventFuncStr.replace(/\r\n/g,"")
      eventFuncStr = eventFuncStr.replace(/\n/g,"");
      eventBinding[key] = eventFuncStr
    })
    $('#newPropEventBinding').val(JSON.stringify(eventBinding, null, 2))
  })
  $('#eventBindingDialogContent').click(function (e) {
    var target = e.target
    if ($(target).attr('id') === 'addDbPropName') {
      var key = $(target).parents('#eventBindingDialogCardNew').find('.dbPropName').val()
      var eventFuncStr = $(target).parents('#eventBindingDialogCardNew').find('.dbPropFunc').val()
      var str = ''
      str += '<div class="eventBindingDialogCard dbPropCard">'
      str += '  <div><span>event name:</span><button class="removeDbPropName">remove</button></div>'
      str += '  <div><input type="text" value="' + key + '" class="dbPropName" /></div>'
      str += '  <div><textarea class="dbPropFunc">' + eventFuncStr + '</textarea></div>'
      str += '</div>'
      $(target).parents('#eventBindingDialogCardNew').after(str)
    }
    if ($(target).hasClass('removeDbPropName')) {
      $(target).parents('.dbPropCard').remove()
    }
  })
  
}


function addImageObj(edit, objOption) {
  var canvas = edit.canvasView;
  $('#imageIconArea').click(function (e) {
    var target = e.target;
    if ($(target).attr('src')) {
      fabric.Image.fromURL($(target).attr('src'), function (img) {
        var oImg = img.set({
          left: 0,
          top: 0
        }).scale(0.25);
        canvas.add(oImg);
      });
    }
  })
  // var activeObject = canvas.getActiveObject();
  //  activeObject.setSrc(data.url);
}

function addVideoObj(edit, objOption) {
  var canvas = edit.canvasView;
  $('#video').click(function (e) {
    var target = e.target;
    var canvasTemplate
    if (document.getElementById('tempVideo')) {
      canvasTemplate = document.getElementById('tempVideo')
    } else {
      canvasTemplate = document.createElement('video')
      canvasTemplate.id = 'tempVideo'
      document.getElementById(edit.defaultOptions.canvasViewId).parentNode.appendChild(canvasTemplate)
    }
    canvasTemplate.width = 300
    canvasTemplate.height = 200
    canvasTemplate.style.display = 'none'
    canvasTemplate.innerHTML = '<source src="http://html5demos.com/assets/dizzy.mp4">'
    var video1El = canvasTemplate;
    var video1 = new fabric.Image(video1El, {
      left: 0,
      top: 0,
      angle: 0,
      originX: 'left',
      originY: 'top',
      objectCaching: false,
    });
    canvas.add(video1);
    video1.getElement().play();
  })
}


(function () {
  dataStructure.editor.push(initCanvas('content', 'mainEditor'))
  editorEvent(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  addHichartObj(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  objectPropertyChange(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  dataStructure.editor[0].heatmapInstance = heatmapCreate(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  window.requestAnimationFrame(() => {
    heatmapSetData(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  });
  addImageObj(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  addVideoObj(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  basicDraw(dataStructure.editor[0], dataStructure.editor[0].canvasOption)

  // 影片如果要自動撥放需要持續更新
  // fabric.util.requestAnimFrame(function render() {
  //   dataStructure.editor[0].canvasView.renderAll();
  //   fabric.util.requestAnimFrame(render);
  // });
  editorEvent3D(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  initCanvas3D(dataStructure.editor[0], dataStructure.editor[0].canvasOption) 
})()