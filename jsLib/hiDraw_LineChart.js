
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