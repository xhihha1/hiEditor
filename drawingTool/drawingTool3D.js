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
        if(opt.target.hiId){
          showObjPropChange(opt);
          edit.hi3d.refreshByFabricJson(edit);
        }
      },
      object_modified: function (opt) {
        if(opt.target.hiId){
          showObjPropChange(opt);
          edit.hi3d.refreshByFabricJson(edit);
        }
      },
      object_removed: function (opt) {
        if(opt.target.hiId){
          showObjPropChange(opt);
          edit.hi3d.refreshByFabricJson(edit); 
        }
      },
      after_render: function (opt) {
        // var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex', 'hiId', 'altitude', 'source', 'depth']);
        var fabricJson = edit.toFabricJson()
        fabricJson["objects"] = fabricJson["objects"].filter(function (obj) {
          if (!obj['tempDrawShape']) {
            return true;
          } else {
            return false;
          }
        })
        $('#currentJson').val(JSON.stringify(fabricJson))

        var listStr = '';
        edit.canvasView.forEachObject(function (obj) {
          if (obj['tempDrawShape']) {} else {
            listStr += '<li>' + obj.get('type') + '/' + obj['name'] + '/' + obj['label'] + '</li>'
          }
        })
        $('#objlist').html(listStr)
        // edit.hi3d.refreshByFabricJson(edit);
      },
      selection_created: function (opt) {
        if (opt.target) {
          $('#objPropType').val(opt.target.get('type'))
          $('#objPropName').val(opt.target.get('name'))
          $('#objPropLabel').val(opt.target.get('label'))
          $('#objPropStroke').val(opt.target.get('stroke'))
          if (opt.target.hiId) {
            showObjPropChange(opt)
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
        if (opt.target.hiId) {
          showObjPropChange(opt)
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
  }).createView().viewEvent();


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

  return edit;
}

function showObjPropChange (opt) {
  $('#newPropHiId').val(opt.target.get('hiId'))
  $('#newPropType').val(opt.target.get('type'))
  $('#newPropStroke').val(hiDraw.prototype.colorToHex(opt.target.get('stroke')))
  $('#newPropFill').val(hiDraw.prototype.colorToHex(opt.target.get('fill')))
  $('#newPropDepth').val(parseInt(opt.target.get('depth')) || 0)
  $('#newRotateX').val(parseInt(opt.target.get('rotateX')) || 0)
  $('#newRotateY').val(parseInt(opt.target.get('angle')) || 0)
  $('#newRotateZ').val(parseInt(opt.target.get('rotateZ')) || 0)
  $('#newpositionX').val(parseInt(opt.target.get('left')) || 0)
  $('#newpositionY').val(parseInt(opt.target.get('altitude')) || 0)
  $('#newpositionZ').val(parseInt(opt.target.get('top')) || 0)
  $('#newsizeX').val(parseFloat(opt.target.get('width')) || 1)
  $('#newsizeY').val(parseFloat(opt.target.get('depth')) || 1)
  $('#newsizeZ').val(parseFloat(opt.target.get('height')) || 1)
  $('#newscaleX').val(parseFloat(opt.target.get('scaleX')) || 1)
  $('#newscaleY').val(parseFloat(opt.target.get('scaleY')) || 1)
  $('#newscaleZ').val(parseFloat(opt.target.get('scaleZ')) || 1)
  
  var dataBinding = opt.target.get('dataBinding') || {
    fill:{
      advanced: 'function (value) {return hi3D.prototype.randomHexColor();}'
    }
  }
  $('#newPropDataBinding').val(JSON.stringify(dataBinding, null, 2))
  // $('#newPropDataBinding').val(JSON.stringify(dataBinding))
  var eventBinding = opt.target.get('eventBinding') || {
    click: 'function (value) { console.log("123456");}'
  }
  $('#newPropEventBinding').val(JSON.stringify(eventBinding, null, 2))
}

function setObjPropChange () {
  // $('#newPropHiId').val()
  // $('#newPropType').val()
  var stroke = $('#newPropStroke').val()
  var fill = $('#newPropFill').val()
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
  var bindingStr = $('#newPropDataBinding').val()
  bindingStr = bindingStr.replace(/\r\n/g,"")
  bindingStr = bindingStr.replace(/\n/g,"")
  var dataBinding = JSON.stringify(bindingStr)
  var eventbindingStr = $('#newPropEventBinding').val()
  eventbindingStr = eventbindingStr.replace(/\r\n/g,"")
  eventbindingStr = eventbindingStr.replace(/\n/g,"")
  var eventBinding = JSON.stringify(eventbindingStr)
  return {
    stroke: hiDraw.prototype.colorToHex(stroke),
    fill: hiDraw.prototype.colorToHex(fill),
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
    eventBinding: eventBinding
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
  $('#newRotateX').get(0).min = $('#newRotateY').get(0).min = $('#newRotateZ').get(0).min = 0
  $('#newRotateX').get(0).max = $('#newRotateY').get(0).max = $('#newRotateZ').get(0).max = 360
  $('#newRotateX').get(0).step = $('#newRotateY').get(0).step = $('#newRotateZ').get(0).step = 0.1
  $('#newRotateX').val(0)
  $('#newRotateY').val(0)
  $('#newRotateZ').val(0)

  // ------------ data binding 
  $('#openDataBinding').click(function () {
    $('#dataBindingDialog').css('display', 'block')
    var bindingStr = $('#newPropDataBinding').val()
    //替换所有的换行符
    bindingStr = bindingStr.replace(/\r\n/g,"")
    bindingStr = bindingStr.replace(/\n/g,"");
    var dataBinding = JSON.parse(bindingStr)
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
    var eventBinding = JSON.parse(eventFuncStr)
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