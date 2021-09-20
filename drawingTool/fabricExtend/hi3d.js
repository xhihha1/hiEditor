function hi3D(options) {
  this.defaultOptions = {
    parentId: 'content3D',
    // canvasViewId: 'mainEditor',
    activeJsonTextId: 'hiActiveJsonArea',
    canvasWidth: 500,
    canvasHeight: 500,
    objectDefault: {
      fillColor: 'rgba(0,0,0,1)',
      strokeColor: 'rgba(51,51,51,1)',
      strokeWidth: 3,
      fillAlpha: 0,
      eventCtrl: {
        mouse_wheel_default_behavior: true,
        mouse_move_default_behavior: true,
        zoomMax: 32,
        zoomMin: 0.01
      }
    },
    container: {
      enableDefaultMouse: true
    },
    window: {
      enableDefaultEvent: true
    },
    scene: {
      background: '#FFFF00'
    },
    light: [{
      type: 'DirectionalLight',
      color: 0xffffff,
      position: [20, 10, 5],
      castShadow: true
    }, {
      type: 'AmbientLight',
      color: 0x0c0c0c,
      castShadow: true
    }, {
      type: 'SpotLight',
      color: 0xff0000,
      position: [-40, 60, -10],
      castShadow: true
    }],
    orbitControls: {
      minDistance: 0,
      maxDistance: 10000,
      change: function (event) {}
    },
    transformControls: {
      change: function (event) {},
      mouseDown: function (event) {},
      mouseUp: function (event) {},
      objectChange: function (event) {}
    },
    renderSetting: {

    }
  }
  this.defaultOptions = this.mergeDeep(this.defaultOptions, options)
  var container = document.getElementById(this.defaultOptions.parentId);
  this.defaultOptions.containWidth = container.clientWidth
  this.defaultOptions.containHeight = container.clientHeight
  this.setRender()

  container.appendChild(this.renderer.domElement);
  if (this.defaultOptions.container.enableDefaultMouse) {
    // 透過 mouse down 搭配 THREE.Raycaster 選取物件
    container.addEventListener('mousemove', function (event) {
      event.preventDefault();
      var pointer = new THREE.Vector2();
      pointer.x = ((event.clientX - container.offsetLeft) / container.offsetWidth) * 2 - 1; // bug 重新計算
      pointer.y = -((event.clientY - container.offsetTop) / container.offsetHeight) * 2 + 1; // bug 重新計算
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pointer, this.camera);
      const intersects = raycaster.intersectObjects(this.scene.children, true);
      if (intersects.length > 0 && intersects[0].object.hiId) {
        if (intersects[0].object &&
          intersects[0].object.material &&
          intersects[0].object.material.color) {
          intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
        }
        this.setTransformControlsMesh(intersects[0].object)
      }
    }.bind(this));
  }
  if (this.defaultOptions.window.enableDefaultEvent) {
    window.addEventListener('resize', function () {
      var container = document.getElementById(this.defaultOptions.parentId);
      this.defaultOptions.containWidth = container.clientWidth
      this.defaultOptions.containHeight = container.clientHeight
      this.camera.aspect = this.defaultOptions.containWidth / this.defaultOptions.containHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.defaultOptions.containWidth, this.defaultOptions.containHeight);
    }.bind(this));
  }


  return this
}

hi3D.prototype.addscene = function () {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(this.defaultOptions.scene.background)
  // scene.add( new THREE.AxesHelper(500));
  // scene.add( new THREE.GridHelper( 1000, 10, 0x888888, 0x444444 ) );
  this.scene = scene
  return this
}

hi3D.prototype.addLight = function () {
  var light = new THREE.DirectionalLight(0xffffff); //光源顏色
  light.position.set(20, 10, 5); //光源位置
  this.scene.add(light); //光源新增到場景中

  return this
}

hi3D.prototype.addAmbientLight = function () {
  //添加环境光
  var ambientLight = new THREE.AmbientLight(0x0c0c0c);
  this.scene.add(ambientLight);
  return this
}


hi3D.prototype.addSpotLight = function () {
  //添加聚光灯光源
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  this.scene.add(spotLight);

  return this
}

hi3D.prototype.addHemisphereLight = function () {
  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  this.scene.add(light);
  return this
}


hi3D.prototype.addCamera = function (option) {
  // fov : Number, aspect : Number, near : Number, far : Number
  const cameraOption = {
    fov: 75,
    aspect: this.defaultOptions.containWidth / this.defaultOptions.containHeight,
    near: 0.1,
    far: 2000,
    position: [0, 0, 20],
    targetPoint: [0, 0, 0]
  }
  this.cameraOption = this.mergeDeep(this.cameraOption, option)
  const camera = new THREE.PerspectiveCamera(
    cameraOption.fov,
    cameraOption.aspect,
    cameraOption.near,
    cameraOption.far
  );
  this.camera = camera
  this.cameraOption = cameraOption
  this.setCamera(cameraOption)
  return this
}

hi3D.prototype.setCamera = function (option) {
  this.cameraOption = this.mergeDeep(this.cameraOption, option)
  const cameraOption = this.cameraOption
  const camera = this.camera
  camera.position.set(cameraOption.position[0], cameraOption.position[1], cameraOption.position[2]); // Set position like this
  // camera.position.set.apply(null , cameraOption.position )
  camera.lookAt(new THREE.Vector3(cameraOption.targetPoint[0], cameraOption.targetPoint[1], cameraOption.targetPoint[2])); // Set look at coordinate like this
  return this
}

hi3D.prototype.setRender = function () {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(this.defaultOptions.containWidth, this.defaultOptions.containHeight);
  this.renderer = renderer
  return this
}

hi3D.prototype.setGridHelper = function () {
  var gHelp = new THREE.GridHelper(1000, 300, 0x888888, 0x444444)
  // console.log(gHelp)
  this.scene.add(gHelp);
  console.log(this.scene.children)
  return this
}



hi3D.prototype.addSphere = function (option) {
  var objOption = {
    hiId: new Date().getTime,
    color: '#F00',
    position: [0, 0, 0],
    radius: 5,
    widthSegments: 5, // Minimum value is 3, and the default is 32
    heightSegments: 5, // Minimum value is 2, and the default is 16
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI
  }
  objOption = this.mergeDeep(objOption, option)

  const geometry = new THREE.SphereGeometry(
    objOption.radius,
    objOption.widthSegments,
    objOption.heightSegments,
    objOption.phiStart,
    objOption.phiLength,
    objOption.thetaStart,
    objOption.thetaLength
  );
  const material = new THREE.MeshBasicMaterial({
    color: objOption.color
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  sphere.hiId = objOption.hiId
  this.scene.add(sphere);
  return this
}

hi3D.prototype.setSphere = function (sphere, objOption) {
  // material
  if (objOption.position) {
    sphere.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  }
  if (objOption.color) {
    sphere.material.color = new THREE.Color(objOption.color)
  }
}

hi3D.prototype.addCube = function (option) {
  var objOption = {
    color: '#F00',
    position: [0, 0, 0],
    size: [1, 1, 1],
    scale: [1, 1, 1]
  }
  objOption = this.mergeDeep(objOption, option)
  const geometry = new THREE.BoxGeometry(objOption.size[0], objOption.size[1], objOption.size[2]);
  const material = new THREE.MeshBasicMaterial({
    color: objOption.color
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  cube.hiId = objOption.hiId
  this.scene.add(cube);
  return this
}

hi3D.prototype.setCube = function (cube, objOption) {
  if (objOption.position) {
    cube.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  }
  if (objOption.color) {
    cube.material.color = new THREE.Color(objOption.color)
  }
  if (objOption.size) {
    let new_geometry = new THREE.BoxGeometry(objOption.size[0], objOption.size[1], objOption.size[2]);
    cube.geometry.dispose();
    cube.geometry = new_geometry;
  }
  if (objOption.scale) {
    cube.scale.x = objOption.scale[0];
    cube.scale.y = objOption.scale[1];
    cube.scale.z = objOption.scale[2];
  }
}

hi3D.prototype.addLine = function (option) {
  var objOption = {
    color: '#F00',
    points: [],
    linewidth: 10
  }
  objOption = this.mergeDeep(objOption, option)

  const material = new THREE.LineBasicMaterial({
    color: objOption.color,
    linewidth: objOption.linewidth
  });
  const points = [];
  for (var i = 0; i < objOption.points.length; i++) {
    points.push(
      new THREE.Vector3(
        objOption.points[i][0],
        objOption.points[i][1],
        objOption.points[i][2]
      )
    );
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  line.hiId = objOption.hiId
  this.scene.add(line);
  return this
}

hi3D.prototype.setLine = function (line, objOption) {
  if (objOption.points) {
    var position = line.geometry.attributes.position
    if (objOption.points.length === position.count) {
      for (var i = 0; i < objOption.points.length; i++) {
        position.set(i, new THREE.Vector3(
          objOption.points[i][0],
          objOption.points[i][1],
          objOption.points[i][2]
        ))
      }
    } else {
      const points = [];
      for (var i = 0; i < objOption.points.length; i++) {
        points.push(
          new THREE.Vector3(
            objOption.points[i][0],
            objOption.points[i][1],
            objOption.points[i][2]
          )
        );
      }
      line.geometry.setFromPoints(points);
    }
  }
  if (objOption.color) {
    line.material.color = new THREE.Color(objOption.color)
  }
  if (objOption.linewidth) {
    line.material.linewidth = objOption.linewidth
  }
}
hi3D.prototype.addLine2 = function (option) {
  var objOption = {
    color: '#F00',
    points: [],
    linewidth: 10
  }
  objOption = this.mergeDeep(objOption, option)
  console.log(objOption.hiId)
  if (!objOption.hiId) {
    return false
  }
  // const material = new THREE.LineBasicMaterial({
  //   color: objOption.color,
  //   linewidth: objOption.linewidth
  // });
  // const points = [];
  // for (var i = 0; i < objOption.points.length; i++) {
  //   points.push(
  //     new THREE.Vector3(
  //       objOption.points[i][0],
  //       objOption.points[i][1],
  //       objOption.points[i][2]
  //     )
  //   );
  // }
  // const geometry = new THREE.BufferGeometry().setFromPoints(points);
  // const line = new THREE.Line(geometry, material);
  // line.hiId = objOption.hiId
  // this.scene.add(line);


  // 顶点坐标构成的数组pointArr
  // var pointArr = [
  //   -10, 0, 0,
  //   -10, 10, 0,
  //   0, 0, 0,
  //   10, 10, 0,
  //   10, 0, 0
  // ]
  // var colorArr = [
  //   1, 0, 0,
  //   0, 1, 0,
  //   0, 0, 1,
  //   0, 1, 0,
  //   1, 0, 0
  // ]

  var pointArr = []
  var colorArr = []
  for (var i = 0; i < objOption.points.length; i++) {
    pointArr.push(
      objOption.points[i][0],
      objOption.points[i][1],
      objOption.points[i][2]
    );
    colorArr.push(1, 0, 0)
  }
  var geometry = new THREE.LineGeometry();
  // 几何体传入顶点坐标
  geometry.setPositions(pointArr);
  // 设定每个顶点对应的颜色值
  geometry.setColors(colorArr);
  // 自定义的材质
  var material = new THREE.LineMaterial({
    color: 0xdd2222,
    // 线宽度
    linewidth: 5,
    // vertexColors: true,
    dashed: false
    // alphaToCoverage: true
  });
  // 把渲染窗口尺寸分辨率传值给材质LineMaterial的resolution属性
  // resolution属性值会在着色器代码中参与计算
  material.resolution.set(this.defaultOptions.containWidth, this.defaultOptions.containHeight);
  var line = new THREE.Line2(geometry, material);
  // line.computeLineDistances();
  line.scale.set(1, 1, 1);
  line.hiId = objOption.hiId
  this.scene.add(line);

  return this
}
hi3D.prototype.setLine2 = function (line, objOption) {
  if (objOption.points) {
    // var position = line.geometry.attributes.position
    var pointArr = []
    var colorArr = []
    for (var i = 0; i < objOption.points.length; i++) {
      pointArr.push(
        objOption.points[i][0],
        objOption.points[i][1],
        objOption.points[i][2]
      );
      colorArr.push(1, 0, 0)
    }
    line.geometry.setPositions(pointArr)
    line.geometry.setColors(colorArr);
  }
  if (objOption.color) {
    line.material.color = new THREE.Color(objOption.color)
  }
  if (objOption.linewidth) {
    line.material.linewidth = objOption.linewidth
  }
}

hi3D.prototype.addObj = function (option) {
  var objOption = {
    color: '#F00',
    position: [0, 0, 0],
    size: [1, 1, 1]
  }
  objOption = this.mergeDeep(objOption, option)
  // const geometry = new THREE.BoxGeometry(objOption.size[0], objOption.size[1], objOption.size[2]);
  // const material = new THREE.MeshBasicMaterial( { color: objOption.color } );
  // const cube = new THREE.Mesh( geometry, material );
  // cube.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  // this.scene.add( cube );

  var loader = new THREE.OBJLoader(); //在init函式中，建立loader變數，用於匯入模型
  loader.load(objOption.source.obj, function (obj) { //第一個表示模型路徑，第二個表示完成匯入後的回撥函式，一般我們需要在這個回撥函式中將匯入的模型新增到場景中
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        // child.material.side = THREE.DoubleSide;
        // child.material.color.setHex(0x00FF00);
        // child.material.ambient.setHex(0xFF0000);
        child.material.color.set(objOption.color);
        // child.material.color.set('blue');
      }
      // console.log(child)
    });
    // console.log('/******************', this)
    // mesh = obj; //儲存到全域性變數中
    let objExist = false
    this.scene.traverse(function (child) {
      if (child.hiId === objOption.hiId) {
        objExist = true
      }
    })
    if (!objExist) {
      obj.hiId = objOption.hiId
      obj.source = {
        obj: objOption.source.obj
      }
      this.scene.add(obj); //將匯入的模型新增到場景中
    }
    this.renderer.render(this.scene, this.camera);
  }.bind(this));
  return this
}

hi3D.prototype.setObj = function (node, objOption) {
  if (objOption.position) {
    node.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  }
  if (objOption.color) {
    // node.material.color = new THREE.Color(objOption.color)
    node.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material.color.set(objOption.color);
      }
      // console.log(child)
    });
  }
  if (objOption.source && objOption.source.obj !== node.source.obj) {
    console.log('--- change obj source ---')
  }
  if (objOption.scale) {
    node.scale.x = objOption.scale[0];
    node.scale.y = objOption.scale[1];
    node.scale.z = objOption.scale[2];
  }
}

hi3D.prototype.addCollada = function (option) {
  var objOption = {
    color: '#F00',
    position: [0, 0, 0],
    size: [1, 1, 1]
  }
  objOption = this.mergeDeep(objOption, option)
  // const geometry = new THREE.BoxGeometry(objOption.size[0], objOption.size[1], objOption.size[2]);
  // const material = new THREE.MeshBasicMaterial( { color: objOption.color } );
  // const cube = new THREE.Mesh( geometry, material );
  // cube.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  // this.scene.add( cube );


  var loader = new THREE.ColladaLoader(); //在init函式中，建立loader變數，用於匯入模型
  loader.load(objOption.source.dae, function (collada) { //第一個表示模型路徑，第二個表示完成匯入後的回撥函式，一般我們需要在這個回撥函式中將匯入的模型新增到場景中
    // collada.traverse(function (child) {
    //   if (child instanceof THREE.Mesh) {
    //     // child.material.side = THREE.DoubleSide;
    //     // child.material.color.setHex(0x00FF00);
    //     // child.material.ambient.setHex(0xFF0000);
    //     child.material.color.set(objOption.color);
    //     // child.material.color.set('blue');
    //   }
    //   // console.log(child)
    // });
    // console.log('/******************', this)
    // mesh = obj; //儲存到全域性變數中
    let objExist = false
    this.scene.traverse(function (child) {
      if (child.hiId === objOption.hiId) {
        objExist = true
      }
    })
    var obj = collada.scene;
    if (!objExist) {
      obj.hiId = objOption.hiId
      obj.source = {
        dae: objOption.source.dae
      }
      this.scene.add(obj); //將匯入的模型新增到場景中
    }
    this.renderer.render(this.scene, this.camera);
  }.bind(this));
  return this
}

hi3D.prototype.setCollada = function (node, objOption) {
  if (objOption.position) {
    node.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  }
  if (objOption.color) {
    // node.material.color = new THREE.Color(objOption.color)
    // node.traverse(function (child) {
    //   if (child instanceof THREE.Mesh) {
    //     child.material.color.set(objOption.color);
    //   }
    //   // console.log(child)
    // });
  }
  if (objOption.source && objOption.source.obj !== node.source.obj) {
    console.log('--- change obj source ---')
  }
  if (objOption.scale) {
    node.scale.x = objOption.scale[0];
    node.scale.y = objOption.scale[1];
    node.scale.z = objOption.scale[2];
  }
}

hi3D.prototype.addAxesHelper = function (option) {
  // new THREE.AxesHelper( 50 )
  // const axesHelper = new THREE.AxesHelper( 500 );
  this.scene.add(new THREE.AxesHelper(500));
  // this.renderer.render(this.scene, this.camera);
  return this
}

// 相機軌道控制
hi3D.prototype.addOrbitControls = function () {
  const controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
  controls.minDistance = this.defaultOptions.orbitControls.minDistance;
  controls.maxDistance = this.defaultOptions.orbitControls.maxDistance;
  controls.maxPolarAngle = Math.PI / 2;
  controls.update();
  // controls.addEventListener( 'change', render );
  controls.addEventListener('change', function (event) {
    if (this.defaultOptions.orbitControls && this.defaultOptions.orbitControls['change']) {
      this.defaultOptions.orbitControls['change'](event)
    }
    this.renderer.render(this.scene, this.camera);
  }.bind(this));
  this.orbitControls = controls
  return this
}

hi3D.prototype.addTransformControls = function (mesh) {
  if (!mesh) {
    return false
  }
  const control = new THREE.TransformControls(this.camera, this.renderer.domElement);
  control.addEventListener('change', function (event) {
    this.renderer.render(this.scene, this.camera);
    if (this.defaultOptions.transformControls && this.defaultOptions.transformControls['change']) {
      this.defaultOptions.transformControls['change'](event)
    }
  }.bind(this));
  control.addEventListener('mouseDown', function (event) {
    if (this.defaultOptions.transformControls && this.defaultOptions.transformControls['mouseDown']) {
      this.defaultOptions.transformControls['mouseDown'](event)
    }
    this.renderer.render(this.scene, this.camera);
  }.bind(this));
  control.addEventListener('mouseUp', function (event) {
    if (this.defaultOptions.transformControls && this.defaultOptions.transformControls['mouseUp']) {
      this.defaultOptions.transformControls['mouseUp'](event)
    }
    this.renderer.render(this.scene, this.camera);
  }.bind(this));
  control.addEventListener('objectChange', function (event) {
    if (this.defaultOptions.transformControls && this.defaultOptions.transformControls['objectChange']) {
      this.defaultOptions.transformControls['objectChange'](event)
    }
    this.renderer.render(this.scene, this.camera);
  }.bind(this));
  control.attach(mesh);
  this.scene.add(control);
  this.transformControls = control
  return this
}
hi3D.prototype.setTransformControlsMesh = function (mesh) {
  if (!mesh) {
    return false
  }
  if (!this.transformControls) {
    this.addTransformControls(mesh)
  }
  this.transformControls.attach(mesh);
  this.renderer.render(this.scene, this.camera);
}
hi3D.prototype.disposeTransformControlsMesh = function (mesh) {
  if (this.transformControls) {
    this.transformControls.detach()
    this.transformControls.dispose()
    this.transformControls = null
  }
}


hi3D.prototype.removeAllCube = function (option) {
  if (this.scene && this.scene.traverse) {
    var nodes = []
    this.scene.traverse(function (node) {
      if (node instanceof THREE.Mesh) {
        nodes.push(node)
      }
      if (node instanceof THREE.Line) {
        nodes.push(node)
      }
    }.bind(this));
    for (var i = nodes.length - 1; i >= 0; i--) {
      nodes[i].geometry.dispose();
      nodes[i].material.dispose();
      this.scene.remove(nodes[i]);
    }
  }
}


hi3D.prototype.animate = function () {
  // console.log(typeof this.animate, '-----------', this)
  const that = this
  requestAnimationFrame(that.animate.bind(that));
  this.scene.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      // insert your code here, for example:
      // node.material = new THREE.MeshNormalMaterial()
      node.rotation.x += 0.01;
      node.rotation.y += 0.01;
    }
  });
  // if(typeof this.theta === 'undefined') { this.theta = 0 }
  // else { this.theta = (this.theta + 1) % 360 }
  // this.camera.position.set(100 * Math.cos(this.theta * Math.PI / 180), 50, 100 * Math.sin(this.theta * Math.PI / 180))
  this.renderer.render(this.scene, this.camera);
};

hi3D.prototype.mergeDeep = function (target, source) {
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

// https://threejs.org/docs/#api/en/geometries/TubeGeometry
// https://threejs.org/docs/#api/en/extras/curves/SplineCurve
// https://threejs.org/docs/#api/en/objects/Line
// 讀取obj mtl
// https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/227973/

// 物件bounding box THREE.BoxHelper

// 控制物件  https://threejs.org/examples/#misc_controls_transform