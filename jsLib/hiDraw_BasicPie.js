
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