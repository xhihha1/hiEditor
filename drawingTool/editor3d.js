function initCanvas3D(edit, objOption) {

  edit.hi3d = new hi3D({
    container: {
      enableDefaultMouse: false
    },
    transformControls: {
      objectChange: function (event) {
        // if (event.target) { console.log('target', event.target.object.position.x, 'hiId:', event.target.object.hiId); }
        if (event.target) {
          var node = event.target.object
          var activeObj = edit.canvasView.getActiveObject();
          if (activeObj) {
            var box1 = new THREE.Box3().setFromObject(node);
            // console.log('boundingBox', box1)
            var width = Math.abs(box1.max.x - box1.min.x)
            var depth = Math.abs(box1.max.y - box1.min.y)
            var height = Math.abs(box1.max.z - box1.min.z)
            activeObj.set({
              rotateX: node.rotation.x * 180 / Math.PI,
              angle: -1 * node.rotation.y * 180 / Math.PI,
              rotateZ: node.rotation.z * 180 / Math.PI,
              left: node.position.x,
              altitude: node.position.y,
              top: node.position.z,
              // width: width,
              // depth: depth,
              // height: height,
              scaleX: node.scale.x,
              scaleY: node.scale.z,
              scaleZ: node.scale.y
            });
            console.log('activeObj', 'set')
          }
          // edit.canvasView.renderAll();
          edit.viewRender()
        }
      }.bind(edit.hi3d)
    },
    orbitControls: {
      change: function (event) {
        // console.log(edit.hi3d.camera)
        // edit.hi3d.camera.position
        if (edit.hi3d && edit.hi3d.camera) {
          edit.canvasView.forEachObject(function (obj2d) {
            if (obj2d.hiId === edit.hi3d.camera.hiId) {
              obj2d.left = edit.hi3d.camera.position.x
              obj2d.altitude = edit.hi3d.camera.position.y
              obj2d.top = edit.hi3d.camera.position.z
            }
            if (obj2d.type === 'hiLookAt') {
              var lookAtVector = new THREE.Vector3(edit.hi3d.camera.matrix[8], edit.hi3d.camera.matrix[9], edit.hi3d.camera.matrix[10]);
              obj2d.left = lookAtVector.x
              obj2d.altitude = lookAtVector.y
              obj2d.top = lookAtVector.z
            }
            // var lookAtVector = new THREE.Vector3(cam.matrix[8], cam.matrix[9], cam.matrix[10]);
          })
        }
        // edit.canvasView.renderAll();
        edit.viewRender()
      }
    },
    renderSetting: {
      callback: function (event) {
        edit.hi3d.scene.traverse(function (node) {
          if (node.hiId) {
            // console.log('render', node.position)
            edit.canvasView.forEachObject(function (obj2d) {
              if (obj2d.hiId === node.hiId) {
                // 這裡校正 left top 會導致 2D group 移動會出錯 (urgent)
                // obj2d.left = node.position.x
                // obj2d.altitude = node.position.y
                // obj2d.top = node.position.z
                if (obj2d.type === 'hiFormatObj' ||
                  obj2d.type === 'hiFormatCollada' ||
                  obj2d.type === 'hiFormat3ds' ||
                  obj2d.type === 'hiFormatGLTF' ||
                  obj2d.type === 'hiFormatNrrd' ||
                  obj2d.type === 'hiFormatSTL') {
                  var box1 = new THREE.Box3().setFromObject(node);
                  // console.log('boundingBox', box1)
                  var width = Math.abs(box1.max.x - box1.min.x)
                  var depth = Math.abs(box1.max.y - box1.min.y)
                  var height = Math.abs(box1.max.z - box1.min.z)
                  obj2d.set('width', width)
                  obj2d.set('depth', depth)
                  obj2d.set('height', height)
                }
              }
            })
            // edit.canvasView.renderAll();
            edit.viewRender()
          }
        })
      }.bind(edit.hi3d)
    }
  })
  edit.hi3d.addscene()
  edit.hi3d.setGridHelper()
  edit.hi3d.addAxesHelper()
  edit.hi3d.addCamera()
  edit.hi3d.addLight()
  edit.hi3d.addHemisphereLight()
  edit.hi3d.addAmbientLight()
  edit.hi3d.setCamera({
    position: [0, 50, 100]
  })

  // edit.hi3d.addCube()
  // edit.hi3d.addCube({
  //   position: [5, 0, 0],
  //   color: '#F00'
  // })
  // edit.hi3d.addCube({
  //   position: [0, 5, 0],
  //   color: '#0F0'
  // })
  // edit.hi3d.addCube({
  //   position: [0, 0, 5],
  //   color: '#00F'
  // })
  // edit.hi3d.addObj()
  edit.hi3d.addOrbitControls()
  // edit.hi3d.setRender()
  // edit.hi3d.addTransformControls()
  // edit.hi3d.animate()

  function animateA() {
    // ---------------
    // var fabricJson = edit.canvasView.toJSON(['hiId', 'altitude', 'source']);
    // var fabricJson = edit.toFabricJson()
    // if (typeof json == 'string') {
    //   fabricJson = JSON.parse(fabricJson)
    // }
    // console.log('3D ---', edit.canvasView.toJSON())
    // edit.hi3d.removeAllCube()
    // edit.hi3d.addObj()
    edit.hi3d.refreshByFabricJson(edit, objOption)
    // edit.hi3d.renderer.render(edit.hi3d.scene, edit.hi3d.camera);
    edit.hi3d.viewRender()
    // requestAnimationFrame(animate); // 自動更新 刷新
    // ------------------------------------------------

    // ------------------------------------------------
  }
  animateA()
  // animate();
  function animate() {
    // 相機巡迴導覽
    // console.log('out')
    requestAnimationFrame(animate);
    if(typeof tubeGeometry === 'undefined') { return false; }
    console.log('in')
    const params = {
      spline: 'GrannyKnot',
      scale: 1,
      extrusionSegments: 100,
      radiusSegments: 3,
      closed: true,
      animationView: false,
      lookAhead: false,
      cameraHelper: false,
    };
    const direction = new THREE.Vector3();
    const binormal = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const position = new THREE.Vector3();
    const lookAt = new THREE.Vector3();
    const time = Date.now();
    const looptime = 20 * 1000;
    const t = (time % looptime) / looptime;

    tubeGeometry.parameters.path.getPointAt(t, position);
    position.multiplyScalar(params.scale);
    // interpolation
    const segments = tubeGeometry.tangents.length;
    const pickt = t * segments;
    const pick = Math.floor(pickt);
    const pickNext = (pick + 1) % segments;
    binormal.subVectors(tubeGeometry.binormals[pickNext], tubeGeometry.binormals[pick]);
    binormal.multiplyScalar(pickt - pick).add(tubeGeometry.binormals[pick]);
    tubeGeometry.parameters.path.getTangentAt(t, direction);
    const offset = 10;
    normal.copy(binormal).cross(direction);
    position.add(normal.clone().multiplyScalar(offset));
    edit.hi3d.camera.position.copy(position);
    // cameraEye.position.copy(position);
    tubeGeometry.parameters.path.getPointAt((t + 30 / tubeGeometry.parameters.path.getLength()) % 1, lookAt);
    lookAt.multiplyScalar(params.scale);
    edit.hi3d.camera.matrix.lookAt(edit.hi3d.camera.position, lookAt, normal);
    edit.hi3d.camera.quaternion.setFromRotationMatrix(edit.hi3d.camera.matrix);
    edit.hi3d.viewRender()
  }
}


/*
        if (event.target) {
          var node = event.target
          var activeObj = edit.canvasView.getActiveObject();
          if (activeObj) {
            var box1 = new THREE.Box3().setFromObject( node );
            // console.log('boundingBox', box1)
            var width = Math.abs(box1.max.x - box1.min.x)
            var depth = Math.abs(box1.max.y - box1.min.y)
            var height = Math.abs(box1.max.z - box1.min.z)
             activeObj.set({
              rotateX: node.rotation.x,
              angle: node.rotation.y,
              rotateZ: node.rotation.z,
              left: node.position.x,
              altitude: node.position.y,
              top: node.position.z,
              // width: width,
              // depth: depth,
              // height: height
            });
          }
          edit.canvasView.renderAll();
        }
*/