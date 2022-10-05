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
      object_added: function (opt) {},
      object_modified: function (opt) {},
      object_removed: function (opt) {},
      after_render: function (opt) {
        // var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex', 'hiId', 'altitude', 'source']);
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
      },
      selection_created: function (opt) {
        if (opt.target) {
          // $('#objPropType').val(opt.target.get('type'))
          // $('#objPropName').val(opt.target.get('name'))
          // $('#objPropLabel').val(opt.target.get('label'))
          // $('#objPropStroke').val(opt.target.get('stroke'))
          // $('#newPropStroke').val(opt.target.get('stroke'))
          // $('#newPropFill').val(opt.target.get('fill'))
          // $('#newPropAltitude').val(parseInt(opt.target.get('altitude')) || 0)
          showObjPropChange(opt.target)
        }
      },
      selection_updated: function (opt) {
      },
      selection_cleared: function (opt) {
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

  return edit;
}

function showObjPropChange(object) {
  $('#objPropType').val(object.get('type'))
  $('#objPropName').val(object.get('name'))
  $('#newPropStroke').val(hiDraw.prototype.colorToHex(object.get('stroke')))
  $('#newPropFill').val(hiDraw.prototype.colorToHex(object.get('fill')))
  $('#newPropStrokeWidth').val(object.get('strokeWidth'))
  $('#newPropText').val(object.get('text'))
  var dataBinding = object.get('dataBinding') || {
    fill:{
      advanced: 'function (value) {return \'#F00\';}'
    }
  }
  if(typeof dataBinding === 'string') {
    $('#newPropDataBinding').val(dataBinding)
  } else {
    $('#newPropDataBinding').val(JSON.stringify(dataBinding, null, 2))
  }
}

function objectPropertyChange(edit, objOption) {
  $('#displayPropApply').click(function(){
    var opt = {
      width: $('#newPropDisplayWidth').val(),
      height: $('#newPropDisplayHeight').val()
    }
    if (!edit.canvasView.displayProp) {
      edit.canvasView.displayProp = JSON.stringify(opt)
    } else {
      edit.canvasView.displayProp = JSON.stringify(edit.mergeDeep(JSON.parse(edit.canvasView.displayProp), opt))
    }
    edit.defaultOptions.gridAxis.width = opt.width
    edit.defaultOptions.gridAxis.height = opt.height
    edit.BgGrid(true)
  })
  $('#objectPropApply').click(function(){
    var activeObj = edit.canvasView.getActiveObject();
    var bindingStr = hiDraw.prototype.readTextareaFuncStr($('#newPropDataBinding').val())
    var dataBinding = bindingStr
    var newProp = {
      name: $('#objPropName').val(),
      stroke: $('#newPropStroke').val(),
      strokeWidth: parseInt($('#newPropStrokeWidth').val()),
      fill: $('#newPropFill').val(),
      text: $('#newPropText').val(),
      dataBinding: dataBinding
    }
    activeObj.set(newProp);
    edit.viewRender()
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
}


function addImageObj(edit, objOption) {
  var canvas = edit.canvasView;
  $('#imageIconArea').click(function (e) {
    var target = e.target;
    if ($(target).attr('src')) {
      // fabric.Image.fromURL($(target).attr('src'), function (img) {
      //   var oImg = img.set({
      //     left: 0,
      //     top: 0
      //   }).scale(0.25);
      //   canvas.add(oImg);
      // });
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      objOption = { imagePath: $(target).attr('src') }
      var image = new edit.Image(edit, objOption);
    }
  })
  $('#mapIconArea').click(function (e) {
    var target = e.target;
    if ($(target).attr('src')) {
      edit.removeCanvasEvents();
      edit.changeSelectableStatus(false);
      edit.changeCanvasProperty(false, false);
      objOption = { imagePath: $(target).attr('src') }
      var image = new edit.MapTile(edit, objOption);
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
  editorEvent2D(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
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
  // editor3D(dataStructure.editor[0], dataStructure.editor[0].canvasOption) 
})()