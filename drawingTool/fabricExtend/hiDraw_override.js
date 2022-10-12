hiDraw.prototype.fabricOverride = (function () {
    var controlOverride = {}


    window.controlOverride = controlOverride;

    function fabricOverride() {
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

        
        // fabric.HiGroup = fabric.util.createClass(fabric.Group, {
        //     type: 'hiGroup',
        //     initialize: function (element, options) {
        //         // console.log(this) // 屬性都寫在 this 中
        //         options || (options = {});
        //         this.callSuper('initialize', element, options);
        //     },
        //     toObject: function (propertiesToInclude) {
        //         return fabric.util.object.extend(this.callSuper('toObject', propertiesToInclude), {
        //             hiId: this.hiId,
        //             altitude: this.altitude,
        //             scaleZ: this.scaleZ
        //         });
        //     },
        //     _render: function (ctx) {
        //         this.callSuper('_render', ctx);
        //     }
        // });
        fabric.ActiveSelection.prototype.toHiGroup = function () {
            var canvas = this.canvas;
            var originalActiveObject = canvas._activeObject
            var objects = this._objects.concat();
            this._objects = [];
            var options = fabric.Object.prototype.toObject.call(this);
            var newGroup = new fabric.HiGroup([], {
                originX: 'center', 
                originY: 'center'
            });
            delete options.type;
            newGroup.set(options);
            newGroup.hiId = hiDraw.prototype.uniqueIdGenerater()
            newGroup.scaleZ = 1
            newGroup.altitude = 0
            newGroup.originX = 'center'
            newGroup.originY = 'center'
            objects.forEach(function (object) {
                object.canvas.remove(object);
                object.group = newGroup;
            });
            newGroup._objects = objects;
            if (!this.canvas) {
                return newGroup;
            }
            if (originalActiveObject.originX === 'left' && originalActiveObject.originY === 'top') {
                newGroup.top += newGroup.height / 2;
                newGroup.left += newGroup.width / 2;
            }
            canvas.add(newGroup);
            canvas._activeObject = newGroup;
            newGroup.setCoords(true);
            return newGroup;
        }
        fabric.Group.prototype.toHiActiveSelection = function () {
            if (!this.canvas) {
                return;
            }
            var objects = this._objects, canvas = this.canvas;
            this._objects = [];
            var options = this.toObject();
            delete options.objects;
            canvas.remove(this);
            objects.forEach(function(object) {
                // object.group = activeSelection;
                object.top += this.top;
                object.left += this.left;
                object.dirty = true;
                canvas.add(object);
            }.bind(this));
             var activeSelection = new fabric.ActiveSelection(objects);
            activeSelection.set(options);
            activeSelection.type = 'activeSelection';
            activeSelection.canvas = canvas;
            activeSelection._objects = objects;
            canvas._activeObject = activeSelection;
            activeSelection.setCoords();
            return activeSelection;
        }
    }
    return fabricOverride
})()

hiDraw.prototype.fabricObjDefaultOverride = (function () {
    return function (options) {
        if (options) {
            fabric.Object.prototype.set(options)
        }
    }
})()