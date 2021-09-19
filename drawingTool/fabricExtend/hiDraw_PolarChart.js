fabric.PolarChart = fabric.util.createClass(fabric.Rect, {
  type: "polarChart",
  initialize(options, dataSets) {
    // 使用原方法匯入屬性
    this.callSuper('initialize', options)
    // this.height = height || 100
    // this.width = width || 100
    this.dataSets = dataSets;
  },
  getArea() {
    return this.height * this.width
  },
  _render(ctx) {
    // 先畫出原本的圖形
    this.callSuper('_render', ctx)
    var A = new hichart('Polar', ctx, {
      x: -1 * this.width / 2,
      y: -1 * this.height / 2,
      width: this.width,
      height: this.height
    }, {
      sections: 1,
      Val_max: 0.5,
      Val_min: 0,
      stepSize: 0.1,
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
        data: this.dataSets,
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

fabric.PolarChart.fromObject = function (object, callback) {
  // This function is used for deserialize json and convert object json into button object again. (called when we call loadFromJson() fucntion on canvas)
  return fabric.Object._fromObject("PolarChart", object, callback);
};