(function (global) {

  // 'use strict';

  var fabric = global.fabric || (global.fabric = {});

  if (fabric.HiGroup) {
    fabric.warn('fabric.HiGroup is already defined');
    return;
  }

  fabric.HiGroup = fabric.util.createClass(fabric.Group, {
    type: 'hiGroup',
    initialize: function (element, options) {
      // console.log(this) // 屬性都寫在 this 中
      options || (options = {});
      this.callSuper('initialize', element, options);
    },
    toObject: function (propertiesToInclude) {
      // return fabric.util.object.extend(this.callSuper('toObject', propertiesToInclude), {
      //   hiId: this.hiId,
      //   altitude: this.altitude,
      //   scaleZ: this.scaleZ
      // });
      var _includeDefaultValues = this.includeDefaultValues;
      var objsToObject = this._objects
      console.log('objsToObject ---', objsToObject)
      var obj = fabric.Object.prototype.toObject.call(this, propertiesToInclude);
      obj.objects = objsToObject;
      return obj;
    },
    _render: function (ctx) {
      this.callSuper('_render', ctx);
    }
  });

  fabric.HiGroup.fromObject = function (object, callback) {
    // callback && callback(new fabric.HiGroup(object));
    var objects = object.objects,
        options = fabric.util.object.clone(object, true);
    delete options.objects;
    if (typeof objects === 'string') {
      // it has to be an url or something went wrong.
      fabric.loadSVGFromURL(objects, function (elements) {
        var group = fabric.util.groupSVGElements(elements, object, objects);
        group.set(options);
        callback && callback(group);
      });
      return;
    }
    fabric.util.enlivenObjects(objects, function(enlivenedObjects) {
      fabric.util.enlivenObjects([object.clipPath], function(enlivedClipPath) {
        var options = fabric.util.object.clone(object, true);
        options.clipPath = enlivedClipPath[0];
        delete options.objects;
        callback && callback(new fabric.HiGroup(enlivenedObjects, options, true));
      });
    });
  };

  fabric.HiGroup.async = true;

})(typeof exports !== 'undefined' ? exports : this);