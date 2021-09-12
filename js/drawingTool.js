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
        var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex']);
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
          $('#objPropType').val(opt.target.get('type'))
          $('#objPropName').val(opt.target.get('name'))
          $('#objPropLabel').val(opt.target.get('label'))
          $('#objPropStroke').val(opt.target.get('stroke'))
        }
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

  return edit;
}


function editorEvent(edit, objOption) {
  $("#drawRect").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var squrect = new edit.Rectangle(edit, objOption);
  });

  $("#drawCircle").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var circle = new edit.Circle(edit, objOption);
  });

  $("#drawPolygon").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var polygon = new edit.Polygon(edit, objOption);
  });

  $('#drawLine').click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var line = new edit.Line(edit, objOption);
  });

  $("#drawPolyline").click(function () {
    edit.removeCanvasEvents();
    edit.changeSelectableStatus(false);
    edit.changeCanvasProperty(false, false);
    var polyline = new edit.Polyline(edit, objOption);
  });

  $("#zoomIn").click(function () {
    var zoom = edit.canvasView.getZoom() * 1.1
    if (zoom > 20) zoom = 20
    // edit.canvasView.setZoom(zoom)
    edit.canvasView.zoomToPoint({
      x: edit.canvasView.width / 2,
      y: edit.canvasView.height / 2
    }, zoom)
  });

  $("#zoomOut").click(function () {
    var zoom = edit.canvasView.getZoom() / 1.1
    if (zoom < 0.01) zoom = 0.01
    // edit.canvasView.setZoom(edit.canvasView.getZoom() / 1.1)
    edit.canvasView.zoomToPoint({
      x: edit.canvasView.width / 2,
      y: edit.canvasView.height / 2
    }, zoom)
  });

  $("#resize").click(function () {
    edit.canvasView.setZoom(1)
    edit.canvasView.absolutePan({
      x: 0,
      y: 0
    })
  });

  $('#goRight').click(function () {
    var units = 10;
    var delta = new fabric.Point(units, 0);
    edit.canvasView.relativePan(delta);
  });

  $('#goLeft').click(function () {
    var units = 10;
    var delta = new fabric.Point(-units, 0);
    edit.canvasView.relativePan(delta);
  });
  $('#goUp').click(function () {
    var units = 10;
    var delta = new fabric.Point(0, -units);
    edit.canvasView.relativePan(delta);
  });

  $('#goDown').click(function () {
    var units = 10;
    var delta = new fabric.Point(0, units);
    edit.canvasView.relativePan(delta);
  });

  $('#export').click(function () {
    var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex']);
    fabricJson["objects"] = fabricJson["objects"].filter(function (obj) {
      if (!obj['tempDrawShape']) {
        return true;
      } else {
        return false;
      }
    })
    // $('#currentJson').val(JSON.stringify(fabricJson))
    var json = edit.export(fabricJson);
    $('#exportJson').val(JSON.stringify(json, null, 2))
  });

  $('#exportFabric').click(function () {
    var fabricJson = edit.canvasView.toJSON(['label', 'uniqueIndex']);
    fabricJson["objects"] = fabricJson["objects"].filter(function (obj) {
      if (!obj['tempDrawShape']) {
        return true;
      } else {
        return false;
      }
    })
    $('#currentJson').val(JSON.stringify(fabricJson, null, 2))
  });

  $('#import').click(function () {
    var json = $('#importJson').val()
    edit.import(json);
    console.log('XX');
    if (json) {
      // edit.import(json);

      // edit.canvasView.forEachObject(function (obj) {
      //     if (obj['type'] == 'image') {
      //         var baseStr64 = edit.defaultOptions.image.imagAry;
      //         // edit.defaultOptions.image.realWidth = json["imageWidth"];
      //         // edit.defaultOptions.image.realHeight = json["imageHeight"];
      //         obj.setSrc("data:image/png;base64," + baseStr64)
      //     }
      // })

      var baseStr64 = edit.defaultOptions.image.imagAry;
      var imgSrc = "data:image/png;base64," + baseStr64;

      const imgEl = document.createElement('img')
      imgEl.crossOrigin = 'Anonymous' // 讓圖片能讓所有人存取
      imgEl.src = imgSrc
      imgEl.onload = () => {
        const image = new fabric.Image(imgEl, {
          tempDrawShape: true,
          selectable: false,
          hasBorders: false,
          hasControls: false,
          top: 0,
          left: 0
        })
        // edit.canvasView.add(image)
        // edit.canvasView.sendToBack(image)
        edit.canvasView.setBackgroundImage(image)
        edit.canvasView.renderAll()
      }
    }
  });

  $('#importFabric').click(function () {
    var json = $('#importfabricJson').val()
    if (json) {
      console.log('xxx')
      edit.canvasView.loadFromJSON(json)
    }
  });

  var showaxis = false
  $('#axis').click(function (e) {
    showaxis = !showaxis
    if (showaxis) {
      var canvasTemplate
      if (document.getElementById('tempaxis')) {
        canvasTemplate = document.getElementById('tempaxis')
      } else {
        canvasTemplate = document.createElement('canvas')
        canvasTemplate.id = 'tempaxis'
        document.getElementById(edit.defaultOptions.canvasViewId).parentNode.appendChild(canvasTemplate)
      }
      canvasTemplate.style.position = 'absolute'
      canvasTemplate.style.top = '0px'
      canvasTemplate.style.left = '0px'
      canvasTemplate.style.zIndex = '-100'
      canvasTemplate.style.pointerEvents = 'none'
      canvasTemplate.width = document.getElementById(edit.defaultOptions.canvasViewId).width
      canvasTemplate.height = document.getElementById(edit.defaultOptions.canvasViewId).height
      var ctx = canvasTemplate.getContext("2d");
      var canvas = edit.canvasView;
      var canvasZoom = canvas.getZoom();
      var lt = fabric.util.transformPoint({
        x: 0,
        y: 0
      }, fabric.util.invertTransform(canvas.viewportTransform))
      var x = 0,
        y = 0;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(200,200,200, 0.9)'
      while (x < canvasTemplate.width) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasTemplate.height);
        ctx.stroke();
        x += (10 * canvasZoom)
      }
      while (y < canvasTemplate.height) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasTemplate.width, y);
        ctx.stroke();
        y += (10 * canvasZoom)
      }
    } else {
      var canvasTemplate = document.getElementById('tempaxis')
      if (canvasTemplate) {
        var ctx = canvasTemplate.getContext("2d");
        ctx.clearRect(0, 0, canvasTemplate.width, canvasTemplate.height);
      }
    }
  })

  $('#objlist').click(function (e) {
    var target = e.target
    var i = 0
    edit.canvasView.forEachObject(function (obj) {
      if (obj['tempDrawShape']) {} else {
        if (i === $(target).prev('li').length) {
          edit.canvasView.setActiveObject(obj);
        }
        i++
      }
    })
  })

  function pointsArrayToObjs(array) {
    var newPoints = []
    for (var i = 0; i < array.length; i++) {
      newPoints.push({
        x: array[i][0],
        y: array[i][1]
      })
    }
    return newPoints;
  }

  function pointsObjsToArray(objsArray) {
    var newPoints = []
    for (var i = 0; i < objsArray.length; i++) {
      newPoints.push([objsArray[i].x, objsArray[i].y])
    }
    return newPoints;
  }

  window.addEventListener('resize', function () {

    var elem = document.getElementById('content');
    // var elem = document.getElementById(edit.defaultOptions.canvasViewId);
    // console.log('resize',elem.offsetWidth)
    // that.canvasView.setDimensions({width:elem.offsetWidth, height:elem.offsetHeight});
    setTimeout(function () {
      edit.canvasView.setWidth(parseInt(elem.offsetWidth) - 200)
      edit.canvasView.setHeight(parseInt(elem.offsetHeight))
      edit.canvasView.renderAll()
    }, 300)
    // that.canvasView.renderAll()
  });
}

function addHichartObj(edit, objOption) {
  var canvas = edit.canvasView

  fabric.BarChart = fabric.util.createClass(fabric.Rect, {
    type: "barChart",
    initialize(options) {
      // 使用原方法匯入屬性
      this.callSuper('initialize', options)
      // this.height = height || 100
      // this.width = width || 100
    },
    getArea() {
      return this.height * this.width
    },
    _render(ctx) {
      // 先畫出原本的圖形
      this.callSuper('_render', ctx)
      var A = new hichart('Bar', ctx, {
        x: -1 * this.width / 2,
        y: -1 * this.height / 2,
        width: this.width,
        height: this.height
      }, {
        series: [{
          data: [14, 7, 4.2, 4, 3.5, 14, 7, 4.2, 4, 3.5, 8, 5.5]
        }]
      })
    }
  })


  fabric.BarChart.fromObject = function (object, callback) {
    // This function is used for deserialize json and convert object json into button object again. (called when we call loadFromJson() fucntion on canvas)
    return fabric.Object._fromObject("Bar", object, callback);
  };

  fabric.LineChart = fabric.util.createClass(fabric.Rect, {
    type: "lineChart",
    initialize(options) {
      // 使用原方法匯入屬性
      this.callSuper('initialize', options)
      // this.height = height || 100
      // this.width = width || 100
    },
    getArea() {
      return this.height * this.width
    },
    _render(ctx) {
      // 先畫出原本的圖形
      this.callSuper('_render', ctx)
      var B = new hichart('Line', ctx, {
        x: -1 * this.width / 2,
        y: -1 * this.height / 2,
        width: this.width,
        height: this.height
      }, {
        sections: 12,
        Val_max: 130,
        Val_min: -40,
        stepSize: 10,
        xAxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
      })
    }
  })

  fabric.LineChart.fromObject = function (object, callback) {
    // This function is used for deserialize json and convert object json into button object again. (called when we call loadFromJson() fucntion on canvas)
    return fabric.Object._fromObject("LineChart", object, callback);
  };


  fabric.AreaChart = fabric.util.createClass(fabric.Rect, {
    type: "areaChart",
    initialize(options) {
      // 使用原方法匯入屬性
      this.callSuper('initialize', options)
      // this.height = height || 100
      // this.width = width || 100
    },
    getArea() {
      return this.height * this.width
    },
    _render(ctx) {
      // 先畫出原本的圖形
      this.callSuper('_render', ctx)
      var B = new hichart('Area', ctx, {
        x: -1 * this.width / 2,
        y: -1 * this.height / 2,
        width: this.width,
        height: this.height
      }, {
        sections: 12,
        Val_max: 130,
        Val_min: -40,
        stepSize: 10,
        xAxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        series: [{
          data: [30, 50, 70, 80, 90, 100, 95, 91, 85, 92, 99, 130],
          color: "#2dc4f6",
          linearGradient: [{
            position: 0,
            color: "rgba(0,0,0,0.2)"
          }, {
            position: 1,
            color: "#2dc4f6"
          }]
        }]
      })
    }
  })

  fabric.AreaChart.fromObject = function (object, callback) {
    // This function is used for deserialize json and convert object json into button object again. (called when we call loadFromJson() fucntion on canvas)
    return fabric.Object._fromObject("AreaChart", object, callback);
  };

  fabric.BasicPie = fabric.util.createClass(fabric.Rect, {
    type: "basicPie",
    initialize(options) {
      // 使用原方法匯入屬性
      this.callSuper('initialize', options)
      // this.height = height || 100
      // this.width = width || 100
    },
    getArea() {
      return this.height * this.width
    },
    _render(ctx) {
      // 先畫出原本的圖形
      this.callSuper('_render', ctx)
      var A = new hichart('BasicPie', ctx, {
        x: -1 * this.width / 2,
        y: -1 * this.height / 2,
        width: this.width,
        height: this.height
      }, {
        sections: 1,
        Val_max: 10,
        Val_min: 0,
        stepSize: 2,
        columnSize: 0,
        rowSize: 0,
        margin: 5,
        xAxis: {
          showGrid: false,
          gridLineWidth: 0
        },
        yAxis: {
          showGrid: false,
          gridLineWidth: 0
        },
        series: [{
          data: [{
              value: 335,
              name: '直接访问'
            },
            {
              value: 310,
              name: '邮件营销'
            },
            {
              value: 234,
              name: '联盟广告'
            },
            {
              value: 135,
              name: '视频广告'
            },
            {
              value: 548,
              name: '搜索引擎'
            }
          ],
          color: "#d9406f",
          linearGradient: [{
            position: 0,
            color: "#000000"
          }, {
            position: 1,
            color: "#d9406f"
          }]
        }]
      })
    }
  })

  fabric.BasicPie.fromObject = function (object, callback) {
    // This function is used for deserialize json and convert object json into button object again. (called when we call loadFromJson() fucntion on canvas)
    return fabric.Object._fromObject("BasicPie", object, callback);
  };

  fabric.Pie = fabric.util.createClass(fabric.Rect, {
    type: "pie",
    initialize(options) {
      // 使用原方法匯入屬性
      this.callSuper('initialize', options)
      // this.height = height || 100
      // this.width = width || 100
    },
    getArea() {
      return this.height * this.width
    },
    _render(ctx) {
      // 先畫出原本的圖形
      this.callSuper('_render', ctx)
      var A = new hichart('Pie', ctx, {
        x: -1 * this.width / 2,
        y: -1 * this.height / 2,
        width: this.width,
        height: this.height
      }, {
        sections: 1,
        Val_max: 10,
        Val_min: 0,
        stepSize: 2,
        columnSize: 0,
        rowSize: 0,
        margin: 5,
        xAxis: {
          showGrid: false,
          gridLineWidth: 0
        },
        yAxis: {
          showGrid: false,
          gridLineWidth: 0
        },
        series: [{
          data: [{
              value: 335,
              name: '直接访问'
            },
            {
              value: 310,
              name: '邮件营销'
            },
            {
              value: 234,
              name: '联盟广告'
            },
            {
              value: 135,
              name: '视频广告'
            },
            {
              value: 548,
              name: '搜索引擎'
            }
          ],
          color: "#d9406f",
          linearGradient: [{
            position: 0,
            color: "#000000"
          }, {
            position: 1,
            color: "#d9406f"
          }]
        }]
      })
    }
  })

  fabric.Pie.fromObject = function (object, callback) {
    // This function is used for deserialize json and convert object json into button object again. (called when we call loadFromJson() fucntion on canvas)
    return fabric.Object._fromObject("Pie", object, callback);
  };

  fabric.DoughnutPie = new fabric.util.createClass(fabric.Rect, {
    type: "doughnutPie",
    initialize(options) {
      // 使用原方法匯入屬性
      this.callSuper('initialize', options)
      // this.height = height || 100
      // this.width = width || 100
    },
    getArea() {
      return this.height * this.width
    },
    _render(ctx) {
      // 先畫出原本的圖形
      this.callSuper('_render', ctx)
      var A = new hichart('DoughnutPie', ctx, {
        x: -1 * this.width / 2,
        y: -1 * this.height / 2,
        width: this.width,
        height: this.height
      }, {
        sections: 1,
        Val_max: 10,
        Val_min: 0,
        stepSize: 2,
        columnSize: 0,
        rowSize: 0,
        margin: 5,
        xAxis: {
          showGrid: false,
          gridLineWidth: 0
        },
        yAxis: {
          showGrid: false,
          gridLineWidth: 0
        },
        series: [{
          data: [{
              value: 335,
              name: '直接访问'
            },
            {
              value: 310,
              name: '邮件营销'
            },
            {
              value: 234,
              name: '联盟广告'
            },
            {
              value: 135,
              name: '视频广告'
            },
            {
              value: 548,
              name: '搜索引擎'
            }
          ],
          color: "#d9406f",
          linearGradient: [{
            position: 0,
            color: "#000000"
          }, {
            position: 1,
            color: "#d9406f"
          }]
        }]
      })
    }
  })

  fabric.DoughnutPie.fromObject = function (object, callback) {
    // This function is used for deserialize json and convert object json into button object again. (called when we call loadFromJson() fucntion on canvas)
    return fabric.Object._fromObject("DoughnutPie", object, callback);
  };


  const MyBar = fabric.BarChart
  const MyLine = fabric.LineChart
  const MyArea = fabric.AreaChart
  const MyBasicPie = fabric.BasicPie
  const MyPie = fabric.Pie
  const MyDoughnutPie = fabric.DoughnutPie

  $('#addHichartArea').click(function () {
    var area = new MyArea({
      top: 50,
      left: 50,
      width: 100,
      height: 100,
      originX: 'center',
      originY: 'center',
    })
    canvas.add(area)
  })
  $('#addHichartBasicPie').click(function () {
    var pie = new MyBasicPie({
      top: 50,
      left: 50,
      width: 100,
      height: 100,
      originX: 'center',
      originY: 'center',
    })
    canvas.add(pie)
  })
  $('#addHichartPie').click(function () {
    var pie = new MyPie({
      top: 50,
      left: 50,
      width: 100,
      height: 100,
      originX: 'center',
      originY: 'center',
    })
    canvas.add(pie)
  })
  $('#addHichartDoughnutPie').click(function () {
    var pie = new MyDoughnutPie({
      top: 50,
      left: 50,
      width: 100,
      height: 100,
      originX: 'center',
      originY: 'center',
    })
    canvas.add(pie)
  })
  $('#addHichartBar').click(function () {
    var bar = new MyBar({
      top: 50,
      left: 50,
      width: 100,
      height: 100,
      originX: 'center',
      originY: 'center',
    })
    canvas.add(bar)
  })
  $('#addHichartLine').click(function () {
    var line = new MyLine({
      top: 50,
      left: 50,
      width: 100,
      height: 100,
      originX: 'center',
      originY: 'center',
    })
    canvas.add(line)
  })
}

function objectPropertyChange(edit, objOption) {
  $('#propChange').click(function () {

    var activeObj = edit.canvasView.getActiveObject();
    activeObj.set({
      stroke: $('#newPropStroke').val()
    });
    edit.canvasView.renderAll();
  })
}

function heatmapCreate(edit, objOption) {
  var heatmapMax = 100
  var canvasTemplate
  if (document.getElementById('tempHeatmap')) {
    canvasTemplate = document.getElementById('tempHeatmap')
  } else {
    canvasTemplate = document.createElement('div')
    canvasTemplate.id = 'tempHeatmap'
    document.getElementById(edit.defaultOptions.canvasViewId).parentNode.appendChild(canvasTemplate)
  }
  canvasTemplate.style.position = 'absolute'
  canvasTemplate.style.top = '0px'
  canvasTemplate.style.left = '0px'
  canvasTemplate.style.zIndex = '-50'
  canvasTemplate.style.pointerEvents = 'none'
  canvasTemplate.style.width = document.getElementById(edit.defaultOptions.canvasViewId).width + 'px'
  canvasTemplate.style.height = document.getElementById(edit.defaultOptions.canvasViewId).height + 'px'
  // canvasTemplate.style.background = '#F00'
  // minimal heatmap instance configuration
  var heatmapInstance = h337.create({
    container: canvasTemplate
    // container: document.querySelector('.heatmap')
    // container: document.querySelector('#tempHeatmap')
  });

  var canvas = edit.canvasView

  fabric.HeatmapPoint = fabric.util.createClass(fabric.Ellipse, {
    type: "heatmapPoint",
    initialize(options) {
      // 使用原方法匯入屬性
      this.callSuper('initialize', options)
      // this.height = height || 100
      // this.width = width || 100
    },
    getArea() {
      return this.height * this.width
    },
    _render(ctx) {
      // 先畫出原本的圖形
      this.callSuper('_render', ctx)
      // ctx.beginPath();
    }
  })

  fabric.HeatmapPoint.fromObject = function (object, callback) {
    // This function is used for deserialize json and convert object json into button object again. (called when we call loadFromJson() fucntion on canvas)
    return fabric.Object._fromObject("HeatmapPoint", object, callback);
  };

  $('#drawHeatmapPoint').click(function () {
    var pie = new fabric.HeatmapPoint({
      heatVal: Math.floor(Math.random() * heatmapMax),
      top: 50,
      left: 50,
      width: 100,
      height: 100,
      rx: 5,
      ry: 5,
      originX: 'center',
      originY: 'center',
    })
    console.log('heatmapMax', heatmapMax)
    pie.heatVal = Math.floor(Math.random() * heatmapMax)
    canvas.add(pie)
    heatmapSetData(edit, objOption)
  })
  $('#propheatmapChange').click(function () {
    heatmapMax = parseInt($('#newheatmapmax').val())
    var heatmapradius = parseInt($('#newheatmapradius').val())
    var nuConfig = {
      radius: heatmapradius
    };
    console.log(nuConfig)
    heatmapInstance.configure(nuConfig);
  })
  return heatmapInstance
}

function heatmapSetData(edit, objOption) {
  var heatmapInstance = edit.heatmapInstance
  // now generate some random data
  // var points = [];
  var max = 0;
  var pointers = []
  var points = []
  edit.canvasView.forEachObject(function (obj) {
    if (obj.get('type') === 'heatmapPoint') {
      // console.log(obj)
      pointers.push(obj)
    }
  })
  var canvas = edit.canvasView;
  var canvasZoom = canvas.getZoom();
  var lt = fabric.util.transformPoint({
    x: 0,
    y: 0
  }, fabric.util.invertTransform(canvas.viewportTransform))
  for (var i = 0; i < pointers.length; i++) {
    // console.log(pointers[0])
    var val = pointers[i].heatVal;
    max = Math.max(max, val);
    var point = {
      x: parseInt((pointers[i].left - lt.x) * canvasZoom),
      y: parseInt((pointers[i].top - lt.y) * canvasZoom),
      value: pointers[i].heatVal
    }
    points.push(point);
  }
  var data = {
    max: max,
    data: points
  };
  heatmapInstance.setData(data);

  window.requestAnimationFrame(() => {
    heatmapSetData(dataStructure.editor[0], dataStructure.editor[0].canvasOption)
  });
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


  fabric.util.requestAnimFrame(function render() {
    dataStructure.editor[0].canvasView.renderAll();
    fabric.util.requestAnimFrame(render);
  });
})()