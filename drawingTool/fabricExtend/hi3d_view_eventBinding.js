(function (global) {
  hi3D.prototype.nodeEvnetBinding = function () {
    var parentId = this.defaultOptions.parentId
    document.getElementById(parentId).addEventListener('mousedown', onPointerDown.bind(this));
    document.getElementById(parentId).addEventListener('mousemove', onPointerMove.bind(this));
    document.getElementById(parentId).addEventListener('mouseup', onPointerUp.bind(this));
  }

  function onPointerDown(event) {
    // console.log(this, event)
    event.preventDefault();
    var container = document.getElementById(this.defaultOptions.parentId)
    var pointer = new THREE.Vector2();
    // pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    // pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    pointer.x = (event.clientX / container.offsetWidth) * 2 - 1;
    pointer.y = -(event.clientY / container.offsetHeight) * 2 + 1;
    // pointer.x = ((event.clientX - container.offsetLeft) / container.offsetWidth) * 2 - 1; // bug 重新計算
    // pointer.y = -((event.clientY - container.offsetTop) / container.offsetHeight) * 2 + 1; // bug 重新計算
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, this.camera);
    const intersects = raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length > 0 && intersects[0].object.hiId) {
      if (intersects[0].object.eventBinding) {
        var eventBinding = intersects[0].object.eventBinding
        while (eventBinding && typeof eventBinding === 'string') {
          eventBinding = JSON.parse(eventBinding)
        }
        if (eventBinding && eventBinding.click) {
          var clickFunc = hi3D.prototype.functionGenerator(eventBinding.click);
          clickFunc()
        }
        if (eventBinding && eventBinding.mousedown) {
          var mousedownFunc = hi3D.prototype.functionGenerator(eventBinding.mousedown);
          mousedownFunc()
        }
      }
    }
  }

  function onPointerMove(event) {
    // console.log(this, event)
    event.preventDefault();
    var container = document.getElementById(this.defaultOptions.parentId)
    var pointer = new THREE.Vector2();
    pointer.x = (event.clientX / container.offsetWidth) * 2 - 1;
    pointer.y = -(event.clientY / container.offsetHeight) * 2 + 1;
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, this.camera);
    const intersects = raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length > 0 && intersects[0].object.hiId) {
      if (intersects[0].object.eventBinding) {
        var eventBinding = intersects[0].object.eventBinding
        while (eventBinding && typeof eventBinding === 'string') {
          eventBinding = JSON.parse(eventBinding)
        }
        if (eventBinding && eventBinding.mousemove) {
          var mousemoveFunc = hi3D.prototype.functionGenerator(eventBinding.mousemove);
          mousemoveFunc()
        }
      }
    }
  }

  function onPointerUp(event) {
    // console.log(this, event)
    event.preventDefault();
    var container = document.getElementById(this.defaultOptions.parentId)
    var pointer = new THREE.Vector2();
    pointer.x = (event.clientX / container.offsetWidth) * 2 - 1;
    pointer.y = -(event.clientY / container.offsetHeight) * 2 + 1;
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, this.camera);
    const intersects = raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length > 0 && intersects[0].object.hiId) {
      if (intersects[0].object.eventBinding) {
        var eventBinding = intersects[0].object.eventBinding
        while (eventBinding && typeof eventBinding === 'string') {
          eventBinding = JSON.parse(eventBinding)
        }
        if (eventBinding && eventBinding.mouseup) {
          var mouseupFunc = hi3D.prototype.functionGenerator(eventBinding.mouseup);
          mouseupFunc()
        }
      }
    }
  }


})()