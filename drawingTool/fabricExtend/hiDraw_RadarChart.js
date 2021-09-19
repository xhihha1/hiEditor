fabric.RadarChart = fabric.util.createClass(fabric.Rect, {
  type: "radarChart",
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
    var B = new hichart('Radar', ctx, {
      x: -1 * this.width / 2,
      y: -1 * this.height / 2,
      width: this.width,
      height: this.height
    }, {
      sections: 12,
      Val_max: 130,
      Val_min: 0,
      stepSize: 10,
      xAxis: {
        showGrid: false,
        gridLineWidth: 0
      },
      yAxis: {
        showGrid: false,
        gridLineWidth: 0
      },
      radar: {
        // shape: 'circle',
        name: {
          enable: false,
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [{
            name: 'sales',
            max: 6500
          },
          {
            name: 'Administration',
            max: 16000
          },
          {
            name: 'Information Techology',
            max: 30000
          },
          {
            name: 'Customer Support',
            max: 38000
          },
          {
            name: 'Development',
            max: 52000
          },
          {
            name: 'Marketing',
            max: 25000
          }
        ]
      },
      series: [{
          data: [4300, 10000, 28000, 35000, 50000, 19000],
          color: "#d9406f"
        },
        {
          data: [5000, 14000, 28000, 31000, 42000, 21000],
          color: "#edc214"
        }
      ]
    })
  }
})

  
fabric.RadarChart.fromObject = function (object, callback) {
  // This function is used for deserialize json and convert object json into button object again. (called when we call loadFromJson() fucntion on canvas)
  return fabric.Object._fromObject("RadarChart", object, callback);
};