hiDraw.prototype.fabricOverride = (function () {
    var controlOverride = {}

    controlOverride.polygon = function (polygon) {

        var polygonPositionHandler = function (dim, finalMatrix, fabricObject) {
            var x = (fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x),
                y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
            return fabric.util.transformPoint({
                x: x,
                y: y
            },
                fabric.util.multiplyTransformMatrices(
                    fabricObject.canvas.viewportTransform,
                    fabricObject.calcTransformMatrix()
                )
            );
        }

        var actionHandler = function (eventData, transform, x, y) {
            var polygon = transform.target,
                currentControl = polygon.controls[polygon.__corner],
                mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
                polygonBaseSize = polygon._getNonTransformedDimensions(),
                size = polygon._getTransformedDimensions(0, 0),
                finalPointPosition = {
                    x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
                    y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
                };
            polygon.points[currentControl.pointIndex] = finalPointPosition;
            return true;
        }

        var anchorWrapper = function (anchorIndex, fn) {
            return function (eventData, transform, x, y) {
                var fabricObject = transform.target,
                    absolutePoint = fabric.util.transformPoint({
                        x: (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x),
                        y: (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y),
                    }, fabricObject.calcTransformMatrix()),
                    actionPerformed = fn(eventData, transform, x, y),
                    newDim = fabricObject._setPositionDimensions({}),
                    polygonBaseSize = fabricObject._getNonTransformedDimensions(),
                    newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x,
                    newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
                fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
                return actionPerformed;
            }
        }

        var lastControl = polygon.points.length - 1;

        return polygon.points.reduce(function (acc, point, index) {
            acc['p' + index] = new fabric.Control({
                positionHandler: polygonPositionHandler,
                actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
                actionName: 'modifyPolygon',
                pointIndex: index
            });
            return acc;
        }, {});
    }

    controlOverride.polygonAddPoints = function (polygon) {
        // custom control

        polygon.editShape = true;
        polygon.hasControls = false;
        polygon.hasBorders = false;
        polygon.selectable = false;
        polygon.canvas.discardActiveObject();
        drawEdge(polygon.canvas, polygon)
        drawPoints(polygon.canvas, polygon)
        polygon.canvas.forEachObject(function (obj) {
            if (obj['tempDrawShape']) {
                polygon.canvas.bringToFront(obj);
            }
        })

        function newPoints(canvas, polygon) {
            if (!polygon) {
                return;
            }
            var matrix = polygon.calcTransformMatrix();
            var transformedPoints = polygon.get("points")
                .map(function (p) {
                    var a = new fabric.Point(
                        p.x - polygon.pathOffset.x,
                        p.y - polygon.pathOffset.y);
                    return a
                })
                .map(function (p) {
                    var b = fabric.util.transformPoint(p, matrix);
                    return b
                });
            return transformedPoints;
        }

        // function minXY(canvas, polygon) {
        //     if (!polygon) {
        //         return;
        //     }
        //     var tempPoints = polygon.tempPoints;
        //     var points = newPoints(canvas, polygon);
        //     points = tempPoints;
        //     var minX, minY, maxX, maxY;
        //     points.forEach(function (point, index) {
        //         if (index == 0) {
        //             // minX = point.x;
        //             // minY = point.y;
        //             minX = point.getCenterPoint().x;
        //             minY = point.getCenterPoint().y;
        //             maxX = point.getCenterPoint().x;
        //             maxY = point.getCenterPoint().y;
        //         } else {
        //             // minX = Math.min(minX, point.x)
        //             // minY = Math.min(minY, point.y)
        //             minX = Math.min(minX, point.getCenterPoint().x)
        //             minY = Math.min(minY, point.getCenterPoint().y)
        //             maxX = Math.max(maxX, point.getCenterPoint().x)
        //             maxY = Math.max(maxY, point.getCenterPoint().y)
        //         }
        //     });
        //     return {
        //         x: minX,
        //         y: minY,
        //         width: (maxX - minX),
        //         height: (maxY - minY)
        //     }
        // }

        function drawPoints(canvas, polygon) {
            if (!polygon) {
                return;
            }
            var tempPoints = polygon.tempPoints || [];
            tempPoints.forEach(function (circle, index) {
                canvas.remove(circle);
            })
            tempPoints = [];
            var points = polygon.points;
            var zoom = canvas.getZoom() || 1;
            points = newPoints(canvas, polygon)
            points.forEach(function (point, index) {
                var circle = new fabric.Circle({
                    tempDrawShape: true,
                    radius: 5 / zoom,
                    fill: 'green',
                    left: point.x,
                    top: point.y,
                    originX: 'center',
                    originY: 'center',
                    selectable: true,
                    hasBorders: false,
                    hasControls: false,
                    strokeUniform: true,
                    strokeWidth: 1 / zoom,
                    name: 'P' + index,
                    tempPoints: true
                });
                canvas.add(circle);
                circle.controls = fabric.Object.prototype.controls;
                canvas.bringToFront(circle);
                circle.on('mousedown', function (opt) {
                    var p = opt.target;
                    p.startOriginalPoint = {
                        x: p.getCenterPoint().x,
                        y: p.getCenterPoint().y
                    }
                    if (opt.e.shiftKey) {
                        // delete point
                        deletePoint(canvas, polygon, p)
                    }
                })
                circle.on('moving', function (opt) {
                    var p = opt.target;
                    absolutePoint = circle.startOriginalPoint
                    //------------
                    var mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(circle.getCenterPoint().x, circle.getCenterPoint().y), 'center', 'center')
                    var polygonBaseSize = polygon._getNonTransformedDimensions();
                    var size = polygon._getTransformedDimensions(0, 0);
                    var idx = parseInt(circle.name.replace('P', ''))
                    polygon.points[idx] = {
                        x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
                        y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
                    }
                })
                circle.on('moved', function (opt) {
                    drawEdge(canvas, polygon)
                    drawPoints(canvas, polygon)
                    // var min = minXY(canvas, polygon);
                    // newDim = polygon._setPositionDimensions({
                    //     left: min.x,
                    //     top: min.y,
                    //     width: min.width,
                    //     height: min.height
                    // })
                    // polygon.set('left', min.x)
                    // polygon.set('top', min.y)
                    // polygon.set('width', min.width)
                    // polygon.set('height', min.height)
                })
                tempPoints.push(circle)
            });
            polygon.tempPoints = tempPoints;
        }

        function deletePoint(canvas, polygon, point) {
            var idx = parseInt(point.name.replace('P', ''))
            polygon.points.splice(idx, 1);
            canvas.renderAll()
            drawEdge(canvas, polygon)
            drawPoints(canvas, polygon)
        }

        function drawEdge(canvas, polygon) {
            if (!polygon) {
                return;
            }
            var tempLines = polygon.tempLines || [];
            tempLines.forEach(function (line, index) {
                canvas.remove(line);
            })
            tempLines = [];
            var points = polygon.points;
            points = newPoints(canvas, polygon)
            points.forEach(function (point, index) {
                var lineX1 = point.x,
                    lineY1 = point.y,
                    lineX2, lineY2, pointsLength = points.length;
                if (index == 0) {
                    lineX2 = points[pointsLength - 1].x;
                    lineY2 = points[pointsLength - 1].y;
                } else {
                    lineX2 = points[index - 1].x;
                    lineY2 = points[index - 1].y;
                }
                var line = new fabric.Line([lineX1, lineY1, lineX2, lineY2], {
                    tempDrawShape: true,
                    strokeWidth: 2,
                    fill: '#999999',
                    stroke: '#999999',
                    originX: 'center',
                    originY: 'center',
                    selectable: false,
                    hasBorders: false,
                    hasControls: false,
                    strokeUniform: true,
                    lockMovementX: true,
                    lockMovementY: true,
                    name: 'L' + index,
                    ll: '/' + lineX1 + '/' + lineY1 + '/' + lineX2 + '/' + lineY2,
                    tempLines: true
                });
                canvas.add(line);
                line.controls = fabric.Object.prototype.controls;
                canvas.bringToFront(line);
                // line.sendToBack();
                line.on('mousedown', function (opt) {
                    var idx = parseInt(opt.target.name.replace('L', ''))
                    mouseCoords = {
                        x: canvas.getPointer(opt.e).x,
                        y: canvas.getPointer(opt.e).y
                    }
                    var x1 = opt.target.x1,
                        x2 = opt.target.x2,
                        y1 = opt.target.y1,
                        y2 = opt.target.y2;
                    var a = (y1 - y2)
                    var b = (x2 - x1)
                    var c = (x1 - x2) * y2 - (y1 - y2) * x2;
                    var x0 = mouseCoords.x,
                        y0 = mouseCoords.y;
                    var dist = Math.abs(a * x0 + b * y0 + c) / Math.sqrt(a * a + b * b);
                    var mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(mouseCoords.x, mouseCoords.y), 'center', 'center')
                    var polygonBaseSize = polygon._getNonTransformedDimensions();
                    var size = polygon._getTransformedDimensions(0, 0);
                    var newPoint = {
                        x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
                        y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
                    }
                    if (dist <= 3) {
                        polygon.points.splice(idx, 0, newPoint);
                        canvas.renderAll()
                        drawEdge(canvas, polygon)
                        drawPoints(canvas, polygon)
                    }
                })
                tempLines.push(line)
            });
            polygon.tempLines = tempLines;
        }
    }

    controlOverride.polyline = function (polyline) {

        var polylinePositionHandler = function (dim, finalMatrix, fabricObject) {
            var x = (fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x),
                y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
            return fabric.util.transformPoint({
                x: x,
                y: y
            },
                fabric.util.multiplyTransformMatrices(
                    fabricObject.canvas.viewportTransform,
                    fabricObject.calcTransformMatrix()
                )
            );
        }

        var actionHandler = function (eventData, transform, x, y) {
            var polyline = transform.target,
                currentControl = polyline.controls[polyline.__corner],
                mouseLocalPosition = polyline.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
                polylineBaseSize = polyline._getNonTransformedDimensions(),
                size = polyline._getTransformedDimensions(0, 0),
                finalPointPosition = {
                    x: mouseLocalPosition.x * polylineBaseSize.x / size.x + polyline.pathOffset.x,
                    y: mouseLocalPosition.y * polylineBaseSize.y / size.y + polyline.pathOffset.y
                };
            polyline.points[currentControl.pointIndex] = finalPointPosition;
            return true;
        }

        var anchorWrapper = function (anchorIndex, fn) {
            return function (eventData, transform, x, y) {
                var fabricObject = transform.target,
                    absolutePoint = fabric.util.transformPoint({
                        x: (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x),
                        y: (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y),
                    }, fabricObject.calcTransformMatrix()),
                    actionPerformed = fn(eventData, transform, x, y),
                    newDim = fabricObject._setPositionDimensions({}),
                    polylineBaseSize = fabricObject._getNonTransformedDimensions(),
                    newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polylineBaseSize.x,
                    newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polylineBaseSize.y;
                fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
                return actionPerformed;
            }
        }

        var mouseDownHandler = function (eventData, target) {
            if (eventData.altKey) {
            } else {
            }
        }

        var lastControl = polyline.points.length - 1;

        return polyline.points.reduce(function (acc, point, index) {
            acc['p' + index] = new fabric.Control({
                mouseUpHandler: mouseDownHandler,
                positionHandler: polylinePositionHandler,
                actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
                actionName: 'modifyPolyline',
                pointIndex: index
            });
            return acc;
        }, {});
    }

    controlOverride.polylineAddPoints = function (polyline) {
        // custom control

        polyline.editShape = true;
        polyline.hasControls = false;
        polyline.hasBorders = false;
        polyline.selectable = false;
        polyline.canvas.discardActiveObject();
        drawEdge(polyline.canvas, polyline)
        drawPoints(polyline.canvas, polyline)
        polyline.canvas.forEachObject(function (obj) {
            if (obj['tempDrawShape']) {
                polyline.canvas.bringToFront(obj);
            }
        })

        function newPoints(canvas, polyline) {
            if (!polyline) {
                return;
            }
            var matrix = polyline.calcTransformMatrix();
            var transformedPoints = polyline.get("points")
                .map(function (p) {
                    var a = new fabric.Point(
                        p.x - polyline.pathOffset.x,
                        p.y - polyline.pathOffset.y);
                    return a
                })
                .map(function (p) {
                    var b = fabric.util.transformPoint(p, matrix);
                    return b
                });
            return transformedPoints;
        }

        // function minXY(canvas, polyline) {
        //     if (!polyline) {
        //         return;
        //     }
        //     var tempPoints = polyline.tempPoints;
        //     var points = newPoints(canvas, polyline);
        //     points = tempPoints;
        //     var minX, minY, maxX, maxY;
        //     points.forEach(function (point, index) {
        //         if (index == 0) {
        //             // minX = point.x;
        //             // minY = point.y;
        //             // minX = point.getCenterPoint().x;
        //             // minY = point.getCenterPoint().y;
        //             // maxX = point.getCenterPoint().x;
        //             // maxY = point.getCenterPoint().y;
        //             minX = point.left;
        //             minY = point.top;
        //             maxX = point.left;
        //             maxY = point.top;
        //         } else {
        //             // minX = Math.min(minX, point.x)
        //             // minY = Math.min(minY, point.y)
        //             // minX = Math.min(minX, point.getCenterPoint().x)
        //             // minY = Math.min(minY, point.getCenterPoint().y)
        //             // maxX = Math.max(maxX, point.getCenterPoint().x)
        //             // maxY = Math.max(maxY, point.getCenterPoint().y)
        //             minX = Math.min(minX, point.left)
        //             minY = Math.min(minY, point.top)
        //             maxX = Math.max(maxX, point.left)
        //             maxY = Math.max(maxY, point.top)
        //         }
        //     });
        //     return {
        //         x: minX,
        //         y: minY,
        //         width: (maxX - minX),
        //         height: (maxY - minY)
        //     }
        // }

        function drawPoints(canvas, polyline) {
            if (!polyline) {
                return;
            }
            var tempPoints = polyline.tempPoints || [];
            tempPoints.forEach(function (circle, index) {
                canvas.remove(circle);
            })
            tempPoints = [];
            var points = polyline.points;
            points = newPoints(canvas, polyline)
            points.forEach(function (point, index) {
                var circle = new fabric.Circle({
                    tempDrawShape: true,
                    radius: 5,
                    fill: 'green',
                    left: point.x,
                    top: point.y,
                    originX: 'center',
                    originY: 'center',
                    selectable: true,
                    hasBorders: false,
                    hasControls: false,
                    strokeUniform: true,
                    name: 'P' + index,
                    tempPoints: true
                });
                canvas.add(circle);
                circle.controls = fabric.Object.prototype.controls;
                canvas.bringToFront(circle);
                circle.on('mousedown', function (opt) {
                    var p = opt.target;
                    // p.startOriginalPoint = {
                    //     x: p.getCenterPoint().x,
                    //     y: p.getCenterPoint().y
                    // }
                    p.startOriginalPoint = {
                        x: p.left,
                        y: p.top
                    }
                    if (opt.e.shiftKey) {
                        // delete point
                        deletePoint(canvas, polyline, p)
                    }
                })
                circle.on('moving', function (opt) {
                    var p = opt.target;
                    absolutePoint = circle.startOriginalPoint
                    //------------
                    var mouseLocalPosition = polyline.toLocalPoint(new fabric.Point(circle.getCenterPoint().x, circle.getCenterPoint().y), 'center', 'center')
                    var polylineBaseSize = polyline._getNonTransformedDimensions();
                    var size = polyline._getTransformedDimensions(0, 0);
                    var idx = parseInt(circle.name.replace('P', ''))
                    polyline.points[idx] = {
                        x: mouseLocalPosition.x * polylineBaseSize.x / size.x + polyline.pathOffset.x,
                        y: mouseLocalPosition.y * polylineBaseSize.y / size.y + polyline.pathOffset.y
                    }
                })
                circle.on('moved', function (opt) {
                    drawEdge(canvas, polyline)
                    drawPoints(canvas, polyline)
                    // var min = minXY(canvas, polyline);
                    // newDim = polyline._setPositionDimensions({
                    //     left: min.x - 0.5,
                    //     top: min.y - 0.5,
                    //     width: min.width,
                    //     height: min.height
                    // })
                    // polyline.set('left', min.x - 0.5)
                    // polyline.set('top', min.y - 0.5)
                    // polyline.set('width', min.width + 0.5)
                    // polyline.set('height', min.height + 0.5)
                })
                tempPoints.push(circle)
            });
            polyline.tempPoints = tempPoints;
        }

        function deletePoint(canvas, polyline, point) {
            var idx = parseInt(point.name.replace('P', ''))
            polyline.points.splice(idx, 1);
            canvas.renderAll()
            drawEdge(canvas, polyline)
            drawPoints(canvas, polyline)
        }

        function drawEdge(canvas, polyline) {
            if (!polyline) {
                return;
            }
            var tempLines = polyline.tempLines || [];
            tempLines.forEach(function (line, index) {
                canvas.remove(line);
            })
            tempLines = [];
            var points = polyline.points;
            points = newPoints(canvas, polyline)
            points.forEach(function (point, index) {
                var lineX1 = point.x,
                    lineY1 = point.y,
                    lineX2, lineY2, pointsLength = points.length;
                if (index == 0) {
                    return false;
                } else {
                    lineX2 = points[index - 1].x;
                    lineY2 = points[index - 1].y;
                }
                var line = new fabric.Line([lineX1, lineY1, lineX2, lineY2], {
                    tempDrawShape: true,
                    strokeWidth: 2,
                    fill: '#999999',
                    stroke: '#999999',
                    originX: 'center',
                    originY: 'center',
                    selectable: false,
                    hasBorders: false,
                    hasControls: false,
                    strokeUniform: true,
                    lockMovementX: true,
                    lockMovementY: true,
                    name: 'L' + index,
                    ll: '/' + lineX1 + '/' + lineY1 + '/' + lineX2 + '/' + lineY2,
                    tempLines: true
                });
                canvas.add(line);
                line.controls = fabric.Object.prototype.controls;
                canvas.bringToFront(line);
                // line.sendToBack();
                line.on('mousedown', function (opt) {
                    var idx = parseInt(opt.target.name.replace('L', ''))
                    mouseCoords = {
                        x: canvas.getPointer(opt.e).x,
                        y: canvas.getPointer(opt.e).y
                    }
                    var x1 = opt.target.x1,
                        x2 = opt.target.x2,
                        y1 = opt.target.y1,
                        y2 = opt.target.y2;
                    var a = (y1 - y2)
                    var b = (x2 - x1)
                    var c = (x1 - x2) * y2 - (y1 - y2) * x2;
                    var x0 = mouseCoords.x,
                        y0 = mouseCoords.y;
                    var dist = Math.abs(a * x0 + b * y0 + c) / Math.sqrt(a * a + b * b);
                    var mouseLocalPosition = polyline.toLocalPoint(new fabric.Point(mouseCoords.x, mouseCoords.y), 'center', 'center')
                    var polylineBaseSize = polyline._getNonTransformedDimensions();
                    var size = polyline._getTransformedDimensions(0, 0);
                    var newPoint = {
                        x: mouseLocalPosition.x * polylineBaseSize.x / size.x + polyline.pathOffset.x,
                        y: mouseLocalPosition.y * polylineBaseSize.y / size.y + polyline.pathOffset.y
                    }
                    if (dist <= 3) {
                        polyline.points.splice(idx, 0, newPoint);
                        canvas.renderAll()
                        drawEdge(canvas, polyline)
                        drawPoints(canvas, polyline)
                    }
                })
                tempLines.push(line)
            });
            polyline.tempLines = tempLines;
        }
    }

    window.controlOverride = controlOverride;

    function fabricOverride () {
        var strokeWidth = 1,
        strokeColor = 'rgba(51, 51, 51, 1)',
        fillColor = 'rgba(51, 51, 51, 0)';
        if (this.defaultOptions && this.defaultOptions.objectDefault) {
            strokeWidth = this.defaultOptions.objectDefault.strokeWidth;
            strokeColor = this.defaultOptions.objectDefault.strokeColor;
        }
        fabric.Object.prototype.set({
            stroke: strokeColor,
            strokeWidth: strokeWidth,
            fill: fillColor,
            // transparentCorners: false,
            cornerColor: 'rgba(0,0,255,0.5)',
            cornerStyle: 'circle',
            objectCaching: false
        });
        fabric.Object.prototype.set('cornerStyle', 'circle')
        // fabric.Circle.prototype.controls = controlOverride.circle();
        // fabric.Line.prototype.controls = controlOverride.line();
        // fabric.Rect.prototype.controls = controlOverride.rectangle();
    }
    return fabricOverride
})()

hiDraw.prototype.fabricObjDefaultOverride = (function(){
    return function(options){
        if(options){
            fabric.Object.prototype.set(options)
        }
    }
})()