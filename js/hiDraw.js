function hiDraw(options) {
    if (!fabric) {
        console.log('lib fabric not exist');
        return false;
    }
    this.defaultOptions = {
        canvasViewId: 'mainEditor',
        viewJsonTextId: 'hiJsonArea',
        activeJsonTextId: 'hiActiveJsonArea',
        canvasWidth: 500,
        canvasHeight: 500
    }
    if (options) {
        this.defaultOptions = this.mergeDeep(this.defaultOptions, options);
    }

    var that = this;
    if (typeof (this.DatGUI) !== 'undefined') {
        this.DatGUI = new this.DatGUI()
        this.DatGUI.updateSetting({
            onFinishChange: function (propertyName, value) {
                console.log(propertyName, value)
                if (that.canvasView.getActiveObject()) {
                    that.canvasView.getActiveObject().set(propertyName, value)
                    that.canvasView.renderAll()
                }
            }
        })
    }

    return this;
}

hiDraw.prototype.mergeDeep = function (target, source) {
    if (typeof target !== 'object' || typeof source !== 'object') return target;
    for (var prop in source) {
        if (!source.hasOwnProperty(prop)) continue;
        if (prop in target) {
            if (typeof target[prop] !== 'object') {
                target[prop] = source[prop];
            } else {
                if (typeof source[prop] !== 'object') {
                    target[prop] = source[prop];
                } else {
                    // if(target[prop].concat && source[prop].concat) {
                    //   target[prop] = target[prop].concat(source[prop]);
                    // } else {
                    //   target[prop] = this.mergeDeep(target[prop], source[prop]); 
                    // } 
                    target[prop] = this.mergeDeep(target[prop], source[prop]);
                }
            }
        } else {
            target[prop] = source[prop];
        }
    }
    return target;
}


hiDraw.prototype.createView = function () {
    var that = this;
    var elem = document.getElementById(this.defaultOptions.canvasViewId);
    this.canvasView = new fabric.Canvas(this.defaultOptions.canvasViewId, {
        // height: window.innerHeight - 50, // 讓畫布同視窗大小
        // width: window.innerWidth - 50, // 讓畫布同視窗大小
        // height: elem.offsetHeight, // 讓畫布同視窗大小
        // width: elem.offsetWidth, // 讓畫布同視窗大小
        height: that.defaultOptions.canvasHeight, // 讓畫布同視窗大小
        width: that.defaultOptions.canvasWidth, // 讓畫布同視窗大小
        isDrawingMode: false, // 設置成 true 一秒變身小畫家
        hoverCursor: 'pointer', // 移動時鼠標顯示
        freeDrawingCursor: 'all-scroll', // 畫畫模式時鼠標模式
        //backgroundColor: 'rgb(255,255,255)' // 背景色,
    }); //声明画布

    //this.canvasView.setDimensions({width:800, height:200});

    return this;
}

hiDraw.prototype.viewEvent = function () {
    // object:modified
    var that = this;
    this.canvasView.on('object:modified', function (opt) {
        // console.log('***', opt, opt.target, opt.target.get('type'))
        // that.canvasView.toJSON(['uniqueIndex']) // 添加客製屬性置JSON中
        document.getElementById(that.defaultOptions.viewJsonTextId).value = JSON.stringify(that.canvasView.toJSON(['uniqueIndex']));
        if (that.DatGUI) {
            that.DatGUI.updateOptions({
                type: opt.target.get('type'),
                stroke: opt.target.get('stroke'),
                fill: opt.target.get('fill'),
                message: 'hello'
            })
        }

        // that.canvasView.loadFromJSON()
    });
    // this.canvasView.on('selection:updated', function (event) {
    //     //activeObject = canvas.getActiveObject()
    // });
    this.canvasView.on('mouse:wheel', function (opt) {
        var delta = opt.e.deltaY;
        var zoom = that.canvasView.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        // this.setZoom(zoom);
        this.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        // updateMiniMapVP();
        opt.e.preventDefault();
        opt.e.stopPropagation();
    });


    this.canvasView.on('mouse:down', function (opt) {
        var evt = opt.e;
        if (evt.altKey === true) {
            this.isDragging = true;
            this.selection = false;
            this.lastPosX = evt.clientX;
            this.lastPosY = evt.clientY;
        }
    });
    this.canvasView.on('mouse:move', function (opt) {
        if (this.isDragging) {
            var e = opt.e;
            var vpt = this.viewportTransform;
            vpt[4] += e.clientX - this.lastPosX;
            vpt[5] += e.clientY - this.lastPosY;
            this.requestRenderAll();
            // updateMiniMapVP();
            this.lastPosX = e.clientX;
            this.lastPosY = e.clientY;
        }
    });
    this.canvasView.on('mouse:up', function (opt) {
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
    });
    this.canvasView.on('selection:created', function (opt) {
        // console.log('selection:created',opt.target? opt.target.get('type'): opt)
        if (that.DatGUI) {
            that.DatGUI.updateOptions({
                type: opt.target.get('type'),
                stroke: opt.target.get('stroke'),
                fill: opt.target.get('fill'),
                message: 'hello'
            })
        }
    });
    this.canvasView.on('selection:updated', function (opt) {

    });
    this.canvasView.on('selection:cleared', function (opt) {

    });


    return this;
}

hiDraw.prototype.changeCanvasProperty = function (selValue, drawingVal) {
    this.canvasView.selection = selValue;
    this.canvasView.isDrawingMode = drawingVal;
}

hiDraw.prototype.changeSelectableStatus = function (val) {
    this.canvasView.forEachObject(function (obj) {
        obj.selectable = val;
    })
    this.canvasView.renderAll();
}

hiDraw.prototype.removeCanvasEvents = function () {
    this.canvasView.off('mouse:down');
    this.canvasView.off('mouse:move');
    this.canvasView.off('mouse:up');
    this.canvasView.off('object:moving');
}

hiDraw.prototype.logEachObjects = function () {
    var i = 0;
    this.canvasView.forEachObject(function (obj) {
        console.log(obj)
        obj.set('uniqueIndex', i)
        i++;
    })
}

hiDraw.prototype.copyCloneTempObjs = new Array();
hiDraw.prototype.copy = function () {
    this.copyCloneTempObjs = new Array();
    if (this.canvasView.getActiveObject()) {
        var object = fabric.util.object.clone(this.canvasView.getActiveObject());
        this.copiedObject = object;
        this.copyCloneTempObjs = new Array();
    }
}

hiDraw.prototype.paste = function () {
    if (this.copyCloneTempObjs.length > 0) {
        for (var i in this.copyCloneTempObjs) {
            this.copyCloneTempObjs[i] = fabric.util.object.clone(this.copyCloneTempObjs[i]);

            this.copyCloneTempObjs[i].set("top", this.copyCloneTempObjs[i].top + 100);
            this.copyCloneTempObjs[i].set("left", this.copyCloneTempObjs[i].left + 100);

            this.canvasView.add(this.copyCloneTempObjs[i]);
            this.canvasView.item(this.canvasView.size() - 1).hasControls = true;
        }
        this.canvasView.renderAll();
    } else if (this.copiedObject) {
        // this.copiedObject = fabric.util.object.clone(this.copiedObject);
        // if (this.copiedObject.get('type') == 'activeSelection') {
        //     console.log(this.copiedObject.get("top"), this.copiedObject.get("left"))
        //     this.copiedObject.set("top", this.copiedObject.get("top") + 10);
        //     this.copiedObject.set("left", this.copiedObject.get("left") + 10);
        //     this.canvasView.add(this.copiedObject);
        //     this.canvasView.item(this.canvasView.size() - 1).hasControls = true;
        // } else {
        //     this.copiedObject.set("top", this.copiedObject.get("top") + 10);
        //     this.copiedObject.set("left", this.copiedObject.get("left") + 10);
        //     this.canvasView.add(this.copiedObject);
        //     this.canvasView.item(this.canvasView.size() - 1).hasControls = true;
        // }
        // this.canvasView.renderAll();
        var that = this;
        this.copiedObject.clone(function (clonedObj) {
            that.canvasView.discardActiveObject();
            clonedObj.set({
                left: clonedObj.left + 10,
                top: clonedObj.top + 10,
                evented: true,
            });
            if (clonedObj.type === 'activeSelection') {
                // active selection needs a reference to the canvas.
                clonedObj.canvas = that.canvasView;
                clonedObj.forEachObject(function (obj) {
                    that.canvasView.add(obj);
                });
                // this should solve the unselectability
                clonedObj.setCoords();
            } else {
                that.canvasView.add(clonedObj);
            }
            that.copiedObject.top += 10;
            that.copiedObject.left += 10;
            that.canvasView.setActiveObject(clonedObj);
            that.canvasView.requestRenderAll();
        });
    }

}

hiDraw.prototype.delete = function () {
    var that = this;
    var activeObject = this.canvasView.getActiveObject();
    if (activeObject.type === 'activeSelection') {
        this.canvasView.discardActiveObject();
        activeObject.forEachObject(function (obj) {
            that.canvasView.remove(obj);
        });
    } else {
        this.canvasView.discardActiveObject();
        this.canvasView.remove(activeObject);
        // this.canvasView.remove(Line);
        // this.canvasView.remove(Circle);
        // this.canvasView.remove(Rectangle);
        // this.canvasView.remove(Arrow);
    }
    // //-----------------------------
    // var that = this;
    // var activeObject = this.canvasView.getActiveObject(),
    //     activeGroup = this.canvasView.getActiveGroup();
    // if (activeObject) {
    //     // if (confirm('Are you sure?')) {
    //     // }
    //     this.canvasView.remove(activeObject);

    // } else if (activeGroup) {
    //     // if (confirm('Are you sure?')) {}
    //     var objectsInGroup = activeGroup.getObjects();
    //     this.canvasView.discardActiveGroup();
    //     objectsInGroup.forEach(function (object) {
    //         that.canvasView.remove(object);
    //     });

    // }
}