
function basicDraw(edit, objOption){
    function circle (x,y,r, color){
      if(!r){ r = 1 }
      if(!color){ color = 'red' }
      var ellipse = new fabric.Ellipse({
        strokeWidth: 14,
        fill: color,
        stroke: color,
        originX: 'center',
        originY: 'center',
        top: y,
        left: x,
        rx: r,
        ry: r,
        selectable: true,
        hasBorders: true,
        hasControls: true,
        strokeUniform: true
      });
      edit.canvasView.add(ellipse)
    }
    function Line (color){
      if(!color){ color = 'red' }
      var ellipse = new fabric.Line([50,50,100,100], {
        strokeWidth: 14,
        fill: color,
        stroke: color,
        originX: 'center',
        originY: 'center',
        selectable: true,
        hasBorders: true,
        hasControls: true,
        strokeUniform: true
      });
      edit.canvasView.add(ellipse)
    }
    function Rect (left, top, color){
      if(!color){ color = 'red' }
      if(!left) {
        left = 0
      }
      if(!top) {
        top = 0
      }
      var ellipse = new fabric.Rect({
        left: left,
        top: top,
        strokeWidth: 14,
        fill: color,
        stroke: color,
        width: 100,
        height: 100,
        originX: 'center',
        originY: 'center',
        selectable: true,
        hasBorders: true,
        hasControls: true,
        strokeUniform: true
      });
      edit.canvasView.add(ellipse)
    }
    window.circle1 = circle
    window.line1 = Line
    window.rect1 = Rect
  }