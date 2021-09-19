function addHichartObj(edit, objOption) {
  var canvas = edit.canvasView

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
  $('#addHichartPolar').click(function () {
    var dataSets = [];
    for (var i = 0; i <= 360; i++) {
      var t = i / 180 * Math.PI;
      var r = Math.sin(2 * t) * Math.cos(2 * t);
      dataSets.push([r, i]);
    }
    var area = new fabric.PolarChart({
      top: 50,
      left: 50,
      width: 100,
      height: 100,
      originX: 'center',
      originY: 'center',
    }, dataSets)
    canvas.add(area)
  })
  $('#addHichartRadar').click(function () {
    var area = new fabric.RadarChart({
      top: 50,
      left: 50,
      width: 100,
      height: 100,
      originX: 'center',
      originY: 'center',
    })
    canvas.add(area)
  })
}