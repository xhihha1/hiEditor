
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