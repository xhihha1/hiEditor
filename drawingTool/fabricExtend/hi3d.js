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
      background: '#F0F0F0'
    },
    grid: {
      size: 1000,
      divisions: 100,
      colorCenterLine: '#444444',
      colorGrid: '#888888'
    },
    light: {
      DirectionalLight: {
        visible: true,
        color: 0xffffff,
        position: [20, 10, 5],
        castShadow: true,
        intensity: 1,
        shadow: {
          mapSize: {
            width: 5000,
            height: 5000
          }
        }
      },
      HemisphereLight: {
        visible: true,
        position: [0, 1, 0],
        color: '#FFFFBB',
        skyColor: '#FFFFBB',
        groundColor: '#080820',
        intensity: 1,
        castShadow: false
      },
      AmbientLight: {
        visible: true,
        color: '#0C0C0C',
        intensity: 1,
        castShadow: true
      }
    },
    lights: [{
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
      enable: false,
      minDistance: 0,
      maxDistance: 10000,
      change: function (event) {}
    },
    transformControls: {
      change: function (event) {
        // console.log('transformControls change:', arguments, this, event)
      }.bind(this),
      mouseDown: function (event) {},
      mouseUp: function (event) {},
      objectChange: function (event) {
        // if (event.target) { console.log(event.target.object.position.x); }
        // console.log('transformControls objectChange:', arguments, this, event)
      }.bind(this),
      dragging_changed: function (event) {}
    },
    renderSetting: {
      callback: function (event) {}
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
  scene.background = new THREE.Color(this.defaultOptions.scene.background) // 顏色
  // scene.add( new THREE.AxesHelper(500));
  // scene.add( new THREE.GridHelper( 1000, 10, 0x888888, 0x444444 ) );
  this.scene = scene
  // -----------------------------------------
  // //cubemap
  // const path = '../../assets/SwedishRoyalCastle/';
  // const format = '.jpg';
  // const urls = [
  //   path + 'px' + format, path + 'nx' + format,
  //   path + 'py' + format, path + 'ny' + format,
  //   path + 'pz' + format, path + 'nz' + format
  // ];
  // const reflectionCube = new THREE.CubeTextureLoader().load( urls );
  // scene.background = reflectionCube; // --- 方形
  // const texture = new THREE.TextureLoader().load( '../../assets/SwedishRoyalCastle/px.jpg' );
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // texture.repeat.set( 4, 4 );
  // scene.background = texture; // --- 底圖
  // const loader = new THREE.TextureLoader();
  // const textureEquirectangular = loader.load(
  //   // '../../assets/tears_of_steel_bridge_2k.jpg',
  //   '../../assets/bergsjostolen.jpg',
  //   function() {
  //     const rt = new THREE.WebGLCubeRenderTarget(textureEquirectangular.image.height);
  //     rt.fromEquirectangularTexture(this.renderer, textureEquirectangular);
  //     this.scene.background = rt.texture; // 等距长方体
  //   }.bind(this));
  // -----------------------------------------

  return this
}

hi3D.prototype.setscene = function (option) {
  var objOption = this.defaultOptions.sceneProp || {}
  objOption = this.mergeDeep(objOption, option)
  if (objOption.background && objOption.background.type) {
    var bgType = objOption.background.type
    if (bgType === 'Image') {
      const texture = new THREE.TextureLoader().load( objOption.background.Image.url );
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 1, 1 );
      this.scene.background = texture;
    } else if (bgType === 'CubeTexture') {
      const urls = [
        objOption.background.CubeTexture.px,
        objOption.background.CubeTexture.nx,
        objOption.background.CubeTexture.py,
        objOption.background.CubeTexture.ny,
        objOption.background.CubeTexture.pz,
        objOption.background.CubeTexture.nz
      ];
      const reflectionCube = new THREE.CubeTextureLoader().load( urls );
      this.scene.background = reflectionCube; 
    } else if (bgType === 'Equirectangular') {
      const loader = new THREE.TextureLoader();
      const textureEquirectangular = loader.load(
        objOption.background.Equirectangular.url,
        function() {
          const rt = new THREE.WebGLCubeRenderTarget(textureEquirectangular.image.height);
          rt.fromEquirectangularTexture(this.renderer, textureEquirectangular);
          this.scene.background = rt.texture; // 等距长方体
        }.bind(this)
      );
    } else {
      var color = this.defaultOptions.scene.background
      if (objOption.background.Color && objOption.background.Color.color) {
        color = objOption.background.Color.color
      }
      this.scene.background = new THREE.Color(color)
    }
  }
}

hi3D.prototype.addLight = function (option) {
  var objOption = this.defaultOptions.light.DirectionalLight
  objOption = this.mergeDeep(objOption, option)
  var dirLight = new THREE.DirectionalLight(new THREE.Color(objOption.color)); //光源顏色
  dirLight.visible = objOption.visible
  dirLight.intensity = objOption.intensity
  dirLight.position.set(objOption.position[0], objOption.position[1], objOption.position[2]); //光源位置
  dirLight.castShadow = objOption.castShadow;
  dirLight.shadow.mapSize.width = objOption.shadow.mapSize.width;
  dirLight.shadow.mapSize.height = objOption.shadow.mapSize.height;
  const d = 100;
  dirLight.shadow.camera.left = -d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = -d;

  dirLight.shadow.camera.far = 3500;
  dirLight.shadow.bias = -0.0001;
  this.scene.add(dirLight); //光源新增到場景中
  this.directionalLight = dirLight
  return this
}

hi3D.prototype.setLight = function (option) {
  this.defaultOptions.light.DirectionalLight = this.mergeDeep(this.defaultOptions.light.DirectionalLight, option)
  if (this.directionalLight) {
    if (typeof option.visible === 'boolean') {
      this.directionalLight.visible = option.visible
    }
    if (option.color) {
      this.directionalLight.color = new THREE.Color(option.color)
    }
    if (option.intensity) {
      this.directionalLight.intensity = parseFloat(option.intensity)
    }
    if (option.position) {
      // this.directionalLight.position = new THREE.Vector3(option.position[0], option.position[1], option.position[2])
      if (typeof option.position[0] !== 'undefined') {
        this.directionalLight.position.x = option.position[0];
      }
      if (typeof option.position[1] !== 'undefined') {
        this.directionalLight.position.y = option.position[1];
      }
      if (typeof option.position[2] !== 'undefined') {
        this.directionalLight.position.z = option.position[2];
      }
    }
    if (typeof option.castShadow === 'boolean') {
      this.directionalLight.castShadow = option.castShadow
    }
  }
}

hi3D.prototype.addLightHelper = function () {
  if (!this.directionalLight) {
    this.addLight()
  }
  const dirLightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 10);
  this.scene.add(dirLightHelper);
  this.dirLightHelper = dirLightHelper
  return this
}

hi3D.prototype.addAmbientLight = function (option) {
  var objOption = this.defaultOptions.light.AmbientLight
  objOption = this.mergeDeep(objOption, option)
  //添加环境光
  var ambientLight = new THREE.AmbientLight(new THREE.Color(objOption.color));
  ambientLight.visible = objOption.visible
  ambientLight.intensity = objOption.intensity
  this.scene.add(ambientLight);
  this.ambientLight = ambientLight
  return this
}

hi3D.prototype.setAmbientLight = function (option) {
  this.defaultOptions.light.AmbientLight = this.mergeDeep(this.defaultOptions.light.AmbientLight, option)
  if (this.ambientLight) {
    if (option.color) {
      this.ambientLight.color = new THREE.Color(option.color)
    }
    if (option.intensity) {
      this.ambientLight.intensity = parseFloat(option.intensity)
    }
    if (typeof option.castShadow === 'boolean') {
      this.ambientLight.castShadow = option.castShadow
    }
  }
}

hi3D.prototype.addSpotLight = function (option) {
  var objOption = {
    hiId: hi3D.prototype.uniqueIdGenerater(),
    color: '#FF0000',
    intensity: 1,
    distance: 200,
    angle: Math.PI/2,
    penumbra: 0.1,
    decay: 2,
    position: [0, 0, 0]
  }
  objOption = this.mergeDeep(objOption, option)
  //添加聚光灯光源
  var spotLight = new THREE.SpotLight(
    objOption.color,
    objOption.intensity,
    objOption.distance,
    objOption.angle,
    objOption.penumbra,
    objOption.decay
  );
  spotLight.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  //Set up shadow properties for the light
  spotLight.shadow.mapSize.width = 512; // default
  spotLight.shadow.mapSize.height = 512; // default
  spotLight.shadow.camera.near = 0.5; // default
  spotLight.shadow.camera.far = 500; // default
  spotLight.shadow.focus = 1; // default
  spotLight.castShadow = true;
  spotLight.hiId = objOption.hiId
  this.scene.add(spotLight);

  return this
}

hi3D.prototype.setSpotLight = function (spotLight, objOption) {
  if (objOption.color) {
    spotLight.color.set(objOption.color);
  }
  if (objOption.intensity) {
    spotLight.intensity = objOption.intensity;
  }
  if (objOption.distance) {
    spotLight.distance = objOption.distance;
  }
  if (objOption.angle) {
    spotLight.angle = objOption.angle < 0 ? 0 : Math.min(objOption.angle, Math.PI/2);
  }
  if (objOption.penumbra) {
    spotLight.penumbra = objOption.penumbra < 0 ? 0 : Math.min(objOption.penumbra, 1);
  }
  if (objOption.decay) {
    spotLight.decay = objOption.decay;
  }
  if (objOption.position) {
    // spotLight.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    if (typeof objOption.position[0] !== 'undefined') {
      spotLight.position.x = objOption.position[0];
    }
    if (typeof objOption.position[1] !== 'undefined') {
      spotLight.position.y = objOption.position[1];
    }
    if (typeof objOption.position[2] !== 'undefined') {
      spotLight.position.z = objOption.position[2];
    }
  }
}

hi3D.prototype.addSpotLightHelper = function (option) {
  const spotlights = []
  this.scene.traverse(function (child) {
    if (child instanceof THREE.SpotLight) {
      spotlights.push(child)
    }
  })
  for (var i = 0; i < spotlights.length; i++) {
    if (!spotlights[i].helperHiId) {
      const lightHelper = new THREE.SpotLightHelper(spotlights[i]);
      lightHelper.hiId = hi3D.prototype.uniqueIdGenerater()
      spotlights[i].helperHiId = lightHelper.hiId
      this.scene.add(lightHelper);
      lightHelper.update();
    }
  }
}


hi3D.prototype.addPointLight = function (option) {
  var objOption = {
    hiId: hi3D.prototype.uniqueIdGenerater(),
    color: '#FF0000',
    intensity: 1,
    distance: 0,
    decay: 2,
    position: [10, 0, 0]
  }
  objOption = this.mergeDeep(objOption, option)
  //添加聚光灯光源
  var light = new THREE.PointLight(objOption.color, objOption.intensity, objOption.distance, objOption.decay);
  light.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  //Set up shadow properties for the light
  light.shadow.mapSize.width = 512; // default
  light.shadow.mapSize.height = 512; // default
  light.shadow.camera.near = 0.5; // default
  light.shadow.camera.far = 500; // default
  light.shadow.focus = 1; // default
  light.castShadow = true;
  light.hiId = objOption.hiId
  this.scene.add(light);

  return this
}

hi3D.prototype.setPointLight = function (light, objOption) {
  if (objOption.color) {
    light.color.set(objOption.color);
  }
  if (objOption.position) {
    light.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  }
}

hi3D.prototype.addHemisphereLight = function (option) {
  var objOption = this.defaultOptions.light.HemisphereLight
  objOption = this.mergeDeep(objOption, option)
  var skyColor = new THREE.Color(objOption.skyColor)
  var groundColor = new THREE.Color(objOption.groundColor)
  var intensity = objOption.intensity
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  light.visible = objOption.visible
  light.position.set(objOption.position[0], objOption.position[1], objOption.position[2])
  this.scene.add(light);
  this.hemisphereLight = light
  return this
}

hi3D.prototype.setHemisphereLight = function (option) {
  this.defaultOptions.light.HemisphereLight = this.mergeDeep(this.defaultOptions.light.HemisphereLight, option)
  if (this.hemisphereLight) {
    if (typeof option.visible === 'boolean') {
      this.hemisphereLight.visible = option.visible
    }
    if (option.skyColor) {
      this.hemisphereLight.color = new THREE.Color(option.skyColor)
    }
    if (option.groundColor) {
      this.hemisphereLight.groundColor = new THREE.Color(option.groundColor)
    }
    if (option.intensity) {
      this.hemisphereLight.intensity = parseFloat(option.intensity)
    }
    if (option.position) {
      // this.hemisphereLight.position = new THREE.Vector3(option.position[0], option.position[1], option.position[2])
      if (typeof option.position[0] !== 'undefined') {
        this.hemisphereLight.position.x = option.position[0];
      }
      if (typeof option.position[1] !== 'undefined') {
        this.hemisphereLight.position.y = option.position[1];
      }
      if (typeof option.position[2] !== 'undefined') {
        this.hemisphereLight.position.z = option.position[2];
      }
    }
    if (typeof option.castShadow === 'boolean') {
      this.hemisphereLight.castShadow = option.castShadow
    }
  }
}

hi3D.prototype.addHemisphereLightHelper = function () {
  if (!this.hemisphereLight) {
    this.addHemisphereLight()
  }
  const hemiLightHelper = new THREE.HemisphereLightHelper(this.hemisphereLight, 10);
  this.scene.add(hemiLightHelper);
  this.hemiLightHelper = hemiLightHelper
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
  camera.far = parseFloat(cameraOption.far)
  camera.near = parseFloat(cameraOption.near)
  camera.position.set(cameraOption.position[0], cameraOption.position[1], cameraOption.position[2]); // Set position like this
  // camera.position.set.apply(null , cameraOption.position )
  camera.lookAt(new THREE.Vector3(cameraOption.targetPoint[0], cameraOption.targetPoint[1], cameraOption.targetPoint[2])); // Set look at coordinate like this
  camera.updateProjectionMatrix()
  return this
}

hi3D.prototype.addCameraHelper = function (option) {
  const cameraPerspectiveHelper = new THREE.CameraHelper(this.camera);
  this.scene.add(cameraPerspectiveHelper);
  this.cameraHelper = cameraPerspectiveHelper
  return this
}

hi3D.prototype.setRender = function () {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(this.defaultOptions.containWidth, this.defaultOptions.containHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  this.renderer = renderer
  return this
}

hi3D.prototype.setGridHelper = function (opt) {
  var needReset = true
  if (opt) {
    this.defaultOptions.grid = this.mergeDeep(this.defaultOptions.grid, opt)
  }
  var option = this.defaultOptions.grid
  var size = parseInt(option.size)
  var divisions = parseInt(option.divisions)
  var colorCenterLine = new THREE.Color(option.colorCenterLine)
  var colorGrid = new THREE.Color(option.colorGrid)
  if (this.gridHelper) {
    this.gridHelper.geometry.dispose()
    this.scene.remove(this.gridHelper)
  }
  var gHelp = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid)
  this.scene.add(gHelp);
  this.gridHelper = gHelp

  return this
}



hi3D.prototype.addSphere = function (option, parentGroup) {
  var objOption = {
    hiId: hi3D.prototype.uniqueIdGenerater(),
    color: '#F00',
    transparent: false,
    opacity: 1,
    position: [0, 0, 0],
    radius: 5,
    widthSegments: 5, // Minimum value is 3, and the default is 32
    heightSegments: 5, // Minimum value is 2, and the default is 16
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI,
    scale: [1, 1, 1]
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
  // const material = new THREE.MeshBasicMaterial({
  //   color: objOption.color
  // });
  var map = null
  var needsUpdate = false
  if (objOption.faceMaterial && objOption.faceMaterial.image) {
    map = new THREE.TextureLoader().load(objOption.faceMaterial.image);
    needsUpdate = true;
  }
  const material = new THREE.MeshStandardMaterial({
    map: map,
    color: objOption.color,
    transparent: objOption.transparent,
    opacity: objOption.opacity
  });
  
  const sphere = new THREE.Mesh(geometry, material);
  sphere.material.needsUpdate = needsUpdate;
  sphere.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  sphere.scale.set(objOption.scale[0], objOption.scale[1], objOption.scale[2]);
  sphere.hiId = objOption.hiId
  sphere.dataBinding = objOption.dataBinding
  sphere.eventBinding = objOption.eventBinding
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  if (parentGroup) {
    console.log('add to group')
    parentGroup.add(sphere);
  } else {
    this.scene.add(sphere);
  }
  return sphere
}

hi3D.prototype.setSphere = function (sphere, objOption) {
  // material
  if (objOption.position) {
    // sphere.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    if (typeof objOption.position[0] !== 'undefined') {
      sphere.position.x = objOption.position[0];
    }
    if (typeof objOption.position[1] !== 'undefined') {
      sphere.position.y = objOption.position[1];
    }
    if (typeof objOption.position[2] !== 'undefined') {
      sphere.position.z = objOption.position[2];
    }
  }
  if (objOption.radius) {
    // sphere.radius = objOption.color;
    let new_geometry = new THREE.SphereGeometry(
      objOption.radius,
      objOption.widthSegments,
      objOption.heightSegments,
      objOption.phiStart,
      objOption.phiLength,
      objOption.thetaStart,
      objOption.thetaLength
    );
    sphere.geometry.dispose();
    sphere.geometry = new_geometry;
  }
  if (objOption.color) {
    sphere.material.color = new THREE.Color(objOption.color)
  }
  if (typeof objOption.transparent === 'boolean') {
    sphere.material.transparent = objOption.transparent
  }
  if (typeof objOption.opacity === 'number') {
    sphere.material.opacity = objOption.opacity
  }
  if (objOption.angle) {
    sphere.rotation.y = -1 * objOption.angle / 180 * Math.PI;
  }
  if (objOption.scale) {
    sphere.scale.x = objOption.scale[0];
    sphere.scale.y = objOption.scale[1];
    sphere.scale.z = objOption.scale[2];
  }
  if (objOption.faceMaterial) {
    var map = null
    var needsUpdate = false
    if (objOption.faceMaterial && objOption.faceMaterial.image) {
      map = new THREE.TextureLoader().load(objOption.faceMaterial.image);
      needsUpdate = true;
    }
    sphere.material.map = map;
    sphere.material.needsUpdate = needsUpdate;
  }
  return sphere
}

hi3D.prototype.addCube = function (option, parentGroup) {
  var objOption = {
    color: '#F00',
    transparent: false,
    opacity: 1,
    position: [0, 0, 0],
    size: [1, 1, 1],
    scale: [1, 1, 1]
  }
  objOption = this.mergeDeep(objOption, option)
  const geometry = new THREE.BoxGeometry(objOption.size[0], objOption.size[1], objOption.size[2]);
  // -------------------------
  // const geometry = new THREE.BoxGeometry(50, 50, 50);
  var transparent = objOption.transparent || false
  const material = new THREE.MeshStandardMaterial({
    color: objOption.color,
    transparent: transparent,
    opacity: objOption.opacity
  });
  const faceMaterial = []
  for (let i = 0; i < 6; i++) {
    let map = null
    if (i == 0 && objOption.faceMaterial.pxImg) { const pxImg = new THREE.TextureLoader().load(objOption.faceMaterial.pxImg); map = pxImg;}
    if (i == 1 && objOption.faceMaterial.nxImg) { const nxImg = new THREE.TextureLoader().load(objOption.faceMaterial.nxImg); map = nxImg;}
    if (i == 2 && objOption.faceMaterial.pyImg) { const pyImg = new THREE.TextureLoader().load(objOption.faceMaterial.pyImg); map = pyImg;}
    if (i == 3 && objOption.faceMaterial.nyImg) { const nyImg = new THREE.TextureLoader().load(objOption.faceMaterial.nyImg); map = nyImg;}
    if (i == 4 && objOption.faceMaterial.pzImg) { const pzImg = new THREE.TextureLoader().load(objOption.faceMaterial.pzImg); map = pzImg;}
    if (i == 5 && objOption.faceMaterial.nzImg) { const nzImg = new THREE.TextureLoader().load(objOption.faceMaterial.nzImg); map = nzImg;}
    faceMaterial.push(new THREE.MeshStandardMaterial({
      map: map,
      color: objOption.color ,
      transparent: transparent,
      opacity: objOption.opacity
    }))
  }
  // const material = new THREE.MeshPhongMaterial( {
  //   color: objOption.color,
  //   shininess: 0,
  //   specular: 0x222222
  // } );
  const cube = new THREE.Mesh(geometry, material);
  cube.material = faceMaterial
  cube.material.needsUpdate = true;
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  cube.scale.set(objOption.scale[0], objOption.scale[1], objOption.scale[2])
  cube.hiId = objOption.hiId
  cube.dataBinding = objOption.dataBinding
  cube.eventBinding = objOption.eventBinding
  if (parentGroup) {
    parentGroup.add(cube);
  } else {
    this.scene.add(cube);
  }
  // ----------------------
  // // simple
  // const material = new THREE.MeshStandardMaterial({
  //   color: objOption.color,
  //   transparent: objOption.transparent,
  //   opacity: objOption.opacity
  // });
  // // single image
  // const headMap = new THREE.TextureLoader().load(
  //   'https://dl.dropboxusercontent.com/s/bkqu0tty04epc46/creeper_face.png'
  // )
  // // cube.material.map = headMap // 可延續原本的顏色
  // // cube.material.needsUpdate = true;
  // // multi image
  // const skinMap = new THREE.TextureLoader().load(
  //   'https://dl.dropboxusercontent.com/s/eev6wxdxfmukkt8/creeper_skin.png'
  // )
  // const headMaterials = []
  // for (let i = 0; i < 6; i++) {
  //   let map

  //   if (i === 4) map = '' // 
  //   else map = skinMap

  //   headMaterials.push(new THREE.MeshStandardMaterial({ map: map, color: null }))
  // }
  // cube.material = headMaterials
  // cube.material.needsUpdate = true;
  // ----------------------
  return cube
}

hi3D.prototype.setCube = function (cube, objOption) {
  if (objOption.position) {
    // cube.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    if (typeof objOption.position[0] !== 'undefined') {
      cube.position.x = objOption.position[0];
    }
    if (typeof objOption.position[1] !== 'undefined') {
      cube.position.y = objOption.position[1];
    }
    if (typeof objOption.position[2] !== 'undefined') {
      cube.position.z = objOption.position[2];
    }
  }
  if (objOption.color) {
    cube.material.color = new THREE.Color(objOption.color)
  }
  if (typeof objOption.transparent === 'boolean') {
    cube.material.transparent = objOption.transparent
  }
  if (typeof objOption.opacity === 'number') {
    cube.material.opacity = objOption.opacity
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
  if (objOption.rotateX) {
    cube.rotation.x = objOption.rotateX / 180 * Math.PI ;
  }
  if (objOption.rotateZ) {
    cube.rotation.z = objOption.rotateZ / 180 * Math.PI;
  }
  if (objOption.angle) {
    cube.rotation.y = -1 * objOption.angle / 180 * Math.PI;
  }
  if (objOption.faceMaterial) {
    var transparent = objOption.transparent || false
    var color = new THREE.Color(objOption.color)
    const faceMaterial = []
    for (let i = 0; i < 6; i++) {
      let map = null
      if (i == 0 && objOption.faceMaterial.pxImg) { const pxImg = new THREE.TextureLoader().load(objOption.faceMaterial.pxImg); map = pxImg;}
      if (i == 1 && objOption.faceMaterial.nxImg) { const nxImg = new THREE.TextureLoader().load(objOption.faceMaterial.nxImg); map = nxImg;}
      if (i == 2 && objOption.faceMaterial.pyImg) { const pyImg = new THREE.TextureLoader().load(objOption.faceMaterial.pyImg); map = pyImg;}
      if (i == 3 && objOption.faceMaterial.nyImg) { const nyImg = new THREE.TextureLoader().load(objOption.faceMaterial.nyImg); map = nyImg;}
      if (i == 4 && objOption.faceMaterial.pzImg) { const pzImg = new THREE.TextureLoader().load(objOption.faceMaterial.pzImg); map = pzImg;}
      if (i == 5 && objOption.faceMaterial.nzImg) { const nzImg = new THREE.TextureLoader().load(objOption.faceMaterial.nzImg); map = nzImg;}
      faceMaterial.push(new THREE.MeshStandardMaterial({
        map: map,
        color: color,
        transparent: transparent,
        opacity: objOption.opacity
      }))
    }
    cube.material = faceMaterial
    cube.material.needsUpdate = true;
  }
  
  return cube
}

hi3D.prototype.addCylinder = function (option, parentGroup) {
  var objOption = {
    hiId: hi3D.prototype.uniqueIdGenerater(),
    color: '#F00',
    transparent: false,
    opacity: 1,
    position: [0, 0, 0],
    size: [1, 1, 1],
    radius: 5, // radiusTop, radiusBottom
    radialSegments: 16,
    heightSegments: 1,
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI,
    scale: [1, 1, 1],
    openEnded: false,
    thetaStart: 0,
    thetaLength: Math.PI * 2,
  }
  objOption = this.mergeDeep(objOption, option)
  var map = null
  var needsUpdate = false
  if (objOption.faceMaterial && objOption.faceMaterial.image) {
    map = new THREE.TextureLoader().load(objOption.faceMaterial.image);
    needsUpdate = true;
  }
  const geometry = new THREE.CylinderGeometry(
    objOption.radius,
    objOption.radius,
    objOption.size[1],
    objOption.radialSegments,
    objOption.heightSegments,
    objOption.openEnded,
    objOption.thetaStart,
    objOption.thetaLength
  );
  const material = new THREE.MeshStandardMaterial({
    map: map,
    color: objOption.color,
    transparent: objOption.transparent,
    opacity: objOption.opacity
  });
  const node = new THREE.Mesh( geometry, material );
  node.material.needsUpdate = needsUpdate;
  node.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  node.scale.set(objOption.scale[0], objOption.scale[1], objOption.scale[2]);
  node.hiId = objOption.hiId
  node.dataBinding = objOption.dataBinding
  node.eventBinding = objOption.eventBinding
  node.castShadow = true;
  node.receiveShadow = true;
  if (parentGroup) {
    parentGroup.add(node);
  } else {
    this.scene.add(node);
  }
  return node
}
hi3D.prototype.setCylinder = function (node, objOption) {
  if (objOption.position) {
    // node.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    if (typeof objOption.position[0] !== 'undefined') {
      node.position.x = objOption.position[0];
    }
    if (typeof objOption.position[1] !== 'undefined') {
      node.position.y = objOption.position[1];
    }
    if (typeof objOption.position[2] !== 'undefined') {
      node.position.z = objOption.position[2];
    }
  }
  if (objOption.radius) {
    let new_geometry = new THREE.CylinderGeometry(
      objOption.radius,
      objOption.radius,
      objOption.size[1],
      objOption.radialSegments,
      objOption.heightSegments,
      objOption.openEnded,
      objOption.thetaStart,
      objOption.thetaLength
    );
    node.geometry.dispose();
    node.geometry = new_geometry;
  }
  if (objOption.color) {
    node.material.color = new THREE.Color(objOption.color)
  }
  if (typeof objOption.transparent === 'boolean') {
    node.material.transparent = objOption.transparent
  }
  if (typeof objOption.opacity === 'number') {
    node.material.opacity = objOption.opacity
  }
  if (objOption.angle) {
    node.rotation.y = -1 * objOption.angle / 180 * Math.PI;
  }
  if (objOption.scale) {
    node.scale.x = objOption.scale[0];
    node.scale.y = objOption.scale[1];
    node.scale.z = objOption.scale[2];
  }
  if (objOption.faceMaterial) {
    var map = null
    var needsUpdate = false
    if (objOption.faceMaterial && objOption.faceMaterial.image) {
      map = new THREE.TextureLoader().load(objOption.faceMaterial.image);
      needsUpdate = true;
    }
    node.material.map = map;
    node.material.needsUpdate = needsUpdate;
  }
  return node
}


hi3D.prototype.addPlane = function (option, parentGroup) {
  var objOption = {
    color: '#F00',
    position: [0, 0, 0],
    size: [5, 5, 5],
    scale: [1, 1, 1],
    textureSource: {
      imageType: 'base64',
      base64: ''
    }
  }
  objOption = this.mergeDeep(objOption, option)
  // var geometry = new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0 );
  const geometry = new THREE.PlaneBufferGeometry(objOption.size[0], objOption.size[2]);
  if (objOption.textureSource.imageType === 'base64') {
    var image = new Image();
    image.src = objOption.textureSource.base64;
    var texture = new THREE.Texture();
    texture.image = image;
    image.onload = function () {
      texture.needsUpdate = true;
    };
  } else {
    var loader = new THREE.TextureLoader();
    var texture = loader.load(objOption.textureSource.url);
  }
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    opacity: 0.8,
    transparent: true
  });

  const plane = new THREE.Mesh(geometry, material);
  plane.castShadow = true;
  plane.receiveShadow = true;
  plane.visible = true;
  plane.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  plane.hiId = objOption.hiId
  plane.dataBinding = objOption.dataBinding
  plane.eventBinding = objOption.eventBinding
  if (parentGroup) {
    parentGroup.add(plane);
  } else {
    this.scene.add(plane);
  }
  return plane

  // width — Width along the X axis. Default is 1.
  // height — Height along the Y axis. Default is 1.
  // widthSegments — Optional. Default is 1.
  // heightSegments — Optional. Default is 1.
}

hi3D.prototype.addLine = function (option, parentGroup) {
  var objOption = {
    color: '#F00',
    transparent: false,
    opacity: 1,
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
  line.dataBinding = objOption.dataBinding
  line.eventBinding = objOption.eventBinding
  if (parentGroup) {
    parentGroup.add(line);
  } else {
    this.scene.add(line);
  }
  return line
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
  return line
}
hi3D.prototype.addLine2 = function (option, parentGroup) {
  var objOption = {
    color: '#F00',
    transparent: false,
    opacity: 1,
    points: [],
    linewidth: 10,
    position: [0, 0, 0],
    size: [1, 1, 1],
    scale: [1, 1, 1]
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
  geometry.pointsLength = objOption.points.length
  // 几何体传入顶点坐标
  geometry.setPositions(pointArr);
  // 设定每个顶点对应的颜色值
  geometry.setColors(colorArr);
  // 自定义的材质
  var material = new THREE.LineMaterial({
    color: objOption.color,
    transparent: objOption.transparent,
    opacity: objOption.opacity,
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
  // line.scale.set(1, 1, 1);
  // line本身位置會造成座標錯誤
  // line.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  line.scale.set(objOption.scale[0], objOption.scale[1], objOption.scale[2])
  line.hiId = objOption.hiId
  line.dataBinding = objOption.dataBinding
  line.eventBinding = objOption.eventBinding
  line.castShadow = true;
  if (parentGroup) {
    parentGroup.add(line);
  } else {
    this.scene.add(line);
  }

  return line
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
    if (line.geometry.pointsLength !== objOption.points.length) {
      line.geometry.dispose()
      var geometry = new THREE.LineGeometry();
      geometry.pointsLength = objOption.points.length
      geometry.setPositions(pointArr);
      geometry.setColors(colorArr);
      line.geometry = geometry;
    } else {
      line.geometry.setPositions(pointArr)
      line.geometry.setColors(colorArr);
    }
  }
  if (objOption.position) {
    // line本身位置會造成座標錯誤
    // line.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    if (typeof objOption.position[0] !== 'undefined') {
      line.position.x = objOption.position[0];
    }
    if (typeof objOption.position[1] !== 'undefined') {
      line.position.y = objOption.position[1];
    }
    if (typeof objOption.position[2] !== 'undefined') {
      line.position.z = objOption.position[2];
    }
  }
  if (objOption.color) {
    line.material.color = new THREE.Color(objOption.color)
  }
  if (typeof objOption.transparent === 'boolean') {
    line.material.transparent = objOption.transparent
  }
  if (typeof objOption.opacity === 'number') {
    line.material.opacity = objOption.opacity
  }
  if (objOption.rotateX) {
    line.rotation.x = objOption.rotateX / 180 * Math.PI ;
  }
  if (objOption.rotateZ) {
    line.rotation.z = objOption.rotateZ / 180 * Math.PI;
  }
  if (objOption.angle) {
    line.rotation.y = -1 * objOption.angle / 180 * Math.PI;
  }
  if (objOption.linewidth) {
    line.material.linewidth = objOption.linewidth
  }
  return line
}
hi3D.prototype.addClosedCurve = function (option, parentGroup) {
  var objOption = {
    color: '#F00',
    points: [],
    linewidth: 10,
    position: [0, 0, 0],
    size: [1, 1, 1],
    scale: [1, 1, 1]
  }
  objOption = this.mergeDeep(objOption, option)
  // console.log(objOption.hiId)
  if (!objOption.hiId) {
    return false
  }
  var pointArr = []
  for (var i = 0; i < objOption.points.length; i++) {
    pointArr.push(new THREE.Vector3(
      objOption.points[i][0],
      objOption.points[i][1],
      objOption.points[i][2]
    ));
  }
  const params = {
    scale: 4,
    extrusionSegments: 100,
    radiusSegments: 3,
    closed: true
  };
  const material = new THREE.MeshStandardMaterial({
    color: objOption.color
  });
  // const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.3, wireframe: true, transparent: true } );
  const sampleClosedSpline = new THREE.CatmullRomCurve3(pointArr);
  tubeGeometry = new THREE.TubeGeometry(sampleClosedSpline, params.extrusionSegments, 2, params.radiusSegments, params.closed);
  window.tubeGeometry = tubeGeometry
  sampleClosedSpline.curveType = 'centripetal';
  sampleClosedSpline.closed = true;
  var mesh = new THREE.Mesh(tubeGeometry, material);
  // const wireframe = new THREE.Mesh( tubeGeometry, wireframeMaterial );
  // mesh.add( wireframe );
  mesh.scale.set(objOption.scale[0], objOption.scale[1], objOption.scale[2]);
  mesh.hiId = objOption.hiId
  mesh.dataBinding = objOption.dataBinding
  mesh.eventBinding = objOption.eventBinding
  mesh.castShadow = true;
  if (parentGroup) {
    parentGroup.add(mesh);
  } else {
    this.scene.add(mesh);
  }

  return mesh
}
hi3D.prototype.setClosedCurve = function (mesh, objOption) {
  const params = {
    scale: 4,
    extrusionSegments: 100,
    radiusSegments: 3,
    closed: true
  };
  var pointArr = []
  if (objOption.points) {
    var pointArr = []
    for (var i = 0; i < objOption.points.length; i++) {
      pointArr.push(new THREE.Vector3(
        objOption.points[i][0],
        objOption.points[i][1],
        objOption.points[i][2]
      ));
    }
    // mesh.children[0].geometry.setFromPoints(pointArr)
    mesh.geometry.dispose()
    // const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.3, wireframe: true, transparent: true } );
    const sampleClosedSpline = new THREE.CatmullRomCurve3(pointArr);
    tubeGeometry = new THREE.TubeGeometry(sampleClosedSpline, params.extrusionSegments, 2, params.radiusSegments, params.closed);
    sampleClosedSpline.curveType = 'centripetal';
    sampleClosedSpline.closed = true;
    mesh.geometry = tubeGeometry
  }
  if (objOption.position) {
    // line本身位置會造成座標錯誤
    // mesh.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    if (typeof objOption.position[0] !== 'undefined') {
      mesh.position.x = objOption.position[0];
    }
    if (typeof objOption.position[1] !== 'undefined') {
      mesh.position.y = objOption.position[1];
    }
    if (typeof objOption.position[2] !== 'undefined') {
      mesh.position.z = objOption.position[2];
    }
  }
  if (objOption.color) {
    mesh.material.color = new THREE.Color(objOption.color)
  }
  if (objOption.rotateX) {
    mesh.rotation.x = objOption.rotateX / 180 * Math.PI ;
  }
  if (objOption.rotateZ) {
    mesh.rotation.z = objOption.rotateZ / 180 * Math.PI;
  }
  if (objOption.angle) {
    mesh.rotation.y = -1 * objOption.angle / 180 * Math.PI;
  }
  return mesh
}

hi3D.prototype.addObj = function (option, parentGroup) {
  var objOption = {
    color: '#F00',
    transparent: false,
    opacity: 1,
    position: [0, 0, 0],
    size: [1, 1, 1],
    scale: [1, 1, 1],
    source: {
      obj: ''
    },
    angle: 0
  }
  objOption = this.mergeDeep(objOption, option)
  // const geometry = new THREE.BoxGeometry(objOption.size[0], objOption.size[1], objOption.size[2]);
  // const material = new THREE.MeshBasicMaterial( { color: objOption.color } );
  // const cube = new THREE.Mesh( geometry, material );
  // cube.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  // this.scene.add( cube );
  if (!objOption.source || !objOption.source.obj) {
    return false
  }
  var loader = new THREE.OBJLoader(); //在init函式中，建立loader變數，用於匯入模型
  loader.load(objOption.source.obj, function (obj) { //第一個表示模型路徑，第二個表示完成匯入後的回撥函式，一般我們需要在這個回撥函式中將匯入的模型新增到場景中
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        // child.material.side = THREE.DoubleSide;
        // child.material.color.setHex(0x00FF00);
        // child.material.ambient.setHex(0xFF0000);
        child.material.color.set(objOption.color);
        child.material.transparent = objOption.transparent;
        child.material.opacity = objOption.opacity;
        child.castShadow = true;
        child.receiveShadow = true;
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
      obj.dataBinding = objOption.dataBinding
      obj.eventBinding = objOption.eventBinding
      obj.source = {
        obj: objOption.source.obj
      }
      obj.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
      obj.scale.x = objOption.scale[0];
      obj.scale.y = objOption.scale[1];
      obj.scale.z = objOption.scale[2];
      obj.castShadow = true;
      obj.receiveShadow = true;
      if (parentGroup) {
        parentGroup.add(obj);
      } else {
        this.scene.add(obj); //將匯入的模型新增到場景中
      }
    }
    // this.renderer.render(this.scene, this.camera);
    this.viewRender()
  }.bind(this));
  return this
}

hi3D.prototype.setObj = function (node, objOption) {
  if (objOption.position) {
    // node.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    if (typeof objOption.position[0] !== 'undefined') {
      node.position.x = objOption.position[0];
    }
    if (typeof objOption.position[1] !== 'undefined') {
      node.position.y = objOption.position[1];
    }
    if (typeof objOption.position[2] !== 'undefined') {
      node.position.z = objOption.position[2];
    }
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
  if (typeof objOption.transparent === 'boolean') {
    node.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material.transparent = objOption.transparent;
      }
    });
  }
  if (typeof objOption.opacity === 'number') {
    node.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material.opacity = objOption.opacity;
      }
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
  if (objOption.rotateX) {
    node.rotation.x = objOption.rotateX / 180 * Math.PI ;
  }
  if (objOption.rotateZ) {
    node.rotation.z = objOption.rotateZ / 180 * Math.PI;
  }
  if (objOption.angle) {
    node.rotation.y = -1 * objOption.angle / 180 * Math.PI;
  }
}

hi3D.prototype.addCollada = function (option, parentGroup) {
  var objOption = {
    color: '#F00',
    transparent: false,
    opacity: 1,
    position: [0, 0, 0],
    size: [1, 1, 1],
    scale: [1, 1, 1],
    source: {
      dae: ''
    },
    angle: 0
  }
  objOption = this.mergeDeep(objOption, option)
  // const geometry = new THREE.BoxGeometry(objOption.size[0], objOption.size[1], objOption.size[2]);
  // const material = new THREE.MeshBasicMaterial( { color: objOption.color } );
  // const cube = new THREE.Mesh( geometry, material );
  // cube.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  // this.scene.add( cube );

  if (!objOption.source || !objOption.source.dae) {
    return false
  }
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
    obj.traverse( function ( child ) {
      if ( child.isMesh ) {
        // model does not have normals
        child.material.flatShading = true;
        child.material.transparent = objOption.transparent
        child.material.opacity = objOption.opacity
      }
    } );
    obj.updateMatrix();
    if (!objExist) {
      obj.hiId = objOption.hiId
      obj.dataBinding = objOption.dataBinding
      obj.eventBinding = objOption.eventBinding
      obj.source = {
        dae: objOption.source.dae
      }
      obj.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
      obj.scale.x = objOption.scale[0];
      obj.scale.y = objOption.scale[1];
      obj.scale.z = objOption.scale[2];
      // var box = obj.geometry.boundingBox;
      // var box1 = new THREE.Box3().setFromObject( obj );
      // console.log('stl boundingBox', box1)
      if (parentGroup) {
        parentGroup.add(obj);
      } else {
        this.scene.add(obj); //將匯入的模型新增到場景中
      }
    }
    // this.renderer.render(this.scene, this.camera);
    this.viewRender()
  }.bind(this));
  return this
}

hi3D.prototype.setCollada = function (node, objOption) {
  if (objOption.position) {
    // node.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    if (typeof objOption.position[0] !== 'undefined') {
      node.position.x = objOption.position[0];
    }
    if (typeof objOption.position[1] !== 'undefined') {
      node.position.y = objOption.position[1];
    }
    if (typeof objOption.position[2] !== 'undefined') {
      node.position.z = objOption.position[2];
    }
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
  if (objOption.source && objOption.source.dae !== node.source.dae) {
    console.log('--- change dae source ---')
  }
  if (objOption.scale) {
    node.scale.x = objOption.scale[0];
    node.scale.y = objOption.scale[1];
    node.scale.z = objOption.scale[2];
  }
  if (objOption.rotateX) {
    node.rotation.x = objOption.rotateX / 180 * Math.PI ;
  }
  if (objOption.rotateZ) {
    node.rotation.z = objOption.rotateZ / 180 * Math.PI;
  }
  if (objOption.angle) {
    node.rotation.y = -1 * objOption.angle / 180 * Math.PI;
  }
}

hi3D.prototype.addSTL = function (option, parentGroup) {
  var objOption = {
    color: '#F00',
    transparent: false,
    opacity: 1,
    position: [0, 0, 0],
    size: [1, 1, 1],
    scale: [1, 1, 1],
    source: {
      stl: ''
    },
    angle: 0
  }
  objOption = this.mergeDeep(objOption, option)
  if (!objOption.source || !objOption.source.stl) {
    return false
  }
  const loader = new THREE.STLLoader();
  loader.load(objOption.source.stl, function (geometry) {

    // const material = new THREE.MeshPhongMaterial({
    //   color: 0xff5533,
    //   specular: 0x111111,
    //   shininess: 200
    // });
    const material = new THREE.MeshStandardMaterial({
      color: objOption.color,
      transparent: objOption.transparent,
      opacity: objOption.opacity
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    // mesh.rotation.set( 0, - Math.PI / 2, 0 );
    // mesh.scale.set( 0.5, 0.5, 0.5 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    let objExist = false
    this.scene.traverse(function (child) {
      if (child.hiId === objOption.hiId) {
        objExist = true
      }
    })
    if (!objExist) {
      mesh.hiId = objOption.hiId
      mesh.dataBinding = objOption.dataBinding
      mesh.eventBinding = objOption.eventBinding
      mesh.source = {
        stl: objOption.source.stl
      }
      mesh.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
      mesh.scale.x = objOption.scale[0];
      mesh.scale.y = objOption.scale[1];
      mesh.scale.z = objOption.scale[2];
      if (objOption.rotateX) {
        mesh.rotation.x = objOption.rotateX ;
      }
      if (objOption.rotateZ) {
        mesh.rotation.z = objOption.rotateZ;
      }
      if (objOption.angle) {
        mesh.rotation.y = -1 * objOption.angle / 180 * Math.PI;
      }
      // var box = geometry.boundingBox;
      // var box1 = new THREE.Box3().setFromObject( mesh );
      // console.log('stl boundingBox', box, box1)
      if (parentGroup) {
        parentGroup.add(mesh);
      } else {
        this.scene.add(mesh); //將匯入的模型新增到場景中
      }
    }
    // this.renderer.render(this.scene, this.camera);
    this.viewRender()
  }.bind(this));
  return this
}

hi3D.prototype.setSTL = function (node, objOption) {
  if (objOption.position) {
    // node.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    if (typeof objOption.position[0] !== 'undefined') {
      node.position.x = objOption.position[0];
    }
    if (typeof objOption.position[1] !== 'undefined') {
      node.position.y = objOption.position[1];
    }
    if (typeof objOption.position[2] !== 'undefined') {
      node.position.z = objOption.position[2];
    }
  }
  if (objOption.color) {
    node.material.color = new THREE.Color(objOption.color)
    // node.traverse(function (child) {
    //   if (child instanceof THREE.Mesh) {
    //     child.material.color.set(objOption.color);
    //   }
    //   // console.log(child)
    // });
  }
  if (typeof objOption.transparent === 'boolean') {
    node.material.transparent = objOption.transparent
  }
  if (typeof objOption.opacity === 'number') {
    node.material.opacity = objOption.opacity
  }
  if (objOption.source && objOption.source.stl !== node.source.stl) {
    console.log('--- change stl source ---')
  }
  if (objOption.scale) {
    node.scale.x = objOption.scale[0];
    node.scale.y = objOption.scale[1];
    node.scale.z = objOption.scale[2];
  }
  if (objOption.rotateX) {
    node.rotation.x = objOption.rotateX / 180 * Math.PI ;
  }
  if (objOption.rotateZ) {
    node.rotation.z = objOption.rotateZ / 180 * Math.PI;
  }
  if (objOption.angle) {
    node.rotation.y = -1 * objOption.angle / 180 * Math.PI;
  }
}

hi3D.prototype.add3ds = function (option, parentGroup) {
  var objOption = {
    color: '#F00',
    transparent: false,
    opacity: 1,
    position: [0, 0, 0],
    size: [1, 1, 1],
    source: {
      f_3ds: '',
      f_3dsTextures: '',
      f_3dsNormalMap: ''
    },
    scale: [1, 1, 1],
    angle: 0
  }
  objOption = this.mergeDeep(objOption, option)
  //3ds files dont store normal maps
  if (!objOption.source || !objOption.source.f_3ds) {
    return false
  }
  let normal
  if (objOption.source.f_3dsNormalMap) {
    normal = new THREE.TextureLoader().load(objOption.source.f_3dsNormalMap);
  }
  const loader = new THREE.TDSLoader();
  loader.setResourcePath(objOption.source.f_3dsTextures);
  loader.load(objOption.source.f_3ds, function (object) {
    object.traverse(function (child) {
      if (child.isMesh) {
        // child.material.specular.setScalar( 0.1 );
        if (normal) {
          child.material.normalMap = normal;
        }
      }
    });
    object.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    object.castShadow = true;
    object.receiveShadow = true;
    // this.scene.add( object );


    let objExist = false
    this.scene.traverse(function (child) {
      if (child.hiId === objOption.hiId) {
        objExist = true
      }
    })
    if (!objExist) {
      object.hiId = objOption.hiId
      object.dataBinding = objOption.dataBinding
      object.eventBinding = objOption.eventBinding
      object.source = {
        f_3ds: objOption.source.f_3ds
      }
      object.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
      object.scale.x = objOption.scale[0];
      object.scale.y = objOption.scale[1];
      object.scale.z = objOption.scale[2];
      if (parentGroup) {
        parentGroup.add(object);
      } else {
        this.scene.add(object); //將匯入的模型新增到場景中
      }
    }
    // this.renderer.render(this.scene, this.camera);
    this.viewRender()
  }.bind(this));
  return this
}

hi3D.prototype.set3ds = function (node, objOption) {
  if (objOption.position) {
    // node.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    if (typeof objOption.position[0] !== 'undefined') {
      node.position.x = objOption.position[0];
    }
    if (typeof objOption.position[1] !== 'undefined') {
      node.position.y = objOption.position[1];
    }
    if (typeof objOption.position[2] !== 'undefined') {
      node.position.z = objOption.position[2];
    }
  }
  if (objOption.color) {}
  if (objOption.source && objOption.source.f_3ds !== node.source.f_3ds) {
    console.log('--- change f_3ds source ---')
  }
  if (objOption.scale) {
    node.scale.x = objOption.scale[0];
    node.scale.y = objOption.scale[1];
    node.scale.z = objOption.scale[2];
    // node.traverse( function ( child ) {
    //   if ( child.isMesh ) {
    //     child.material.specular.setScalar( objOption.scale[0] );
    //   }
    // } );
  }
  if (objOption.rotateX) {
    node.rotation.x = objOption.rotateX / 180 * Math.PI ;
  }
  if (objOption.rotateZ) {
    node.rotation.z = objOption.rotateZ / 180 * Math.PI;
  }
  if (objOption.angle) {
    node.rotation.y = -1 * objOption.angle / 180 * Math.PI;
  }
}

hi3D.prototype.addgltf = function (option, parentGroup) {
  var objOption = {
    color: '#F00',
    transparent: false,
    opacity: 1,
    position: [0, 0, 0],
    size: [1, 1, 1],
    source: {
      gltfPath: '',
      gltf: ''
    },
    scale: [1, 1, 1],
    angle: 0
  }
  objOption = this.mergeDeep(objOption, option)
  if (!objOption.source || !objOption.source.gltf) {
    return false
  }
  // const loader = new THREE.TDSLoader();
  // loader.setResourcePath( objOption.source.f_3dsTextures );
  // loader.load( objOption.source.f_3ds, function ( object ) {
  const loader = new THREE.GLTFLoader().setPath(objOption.source.gltfPath);
  loader.load(objOption.source.gltf, function (object) {
    // object.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    var mesh = object.scene
    let objExist = false
    this.scene.traverse(function (child) {
      if (child.hiId === objOption.hiId) {
        objExist = true
      }
    })
    if (!objExist) {
      mesh.hiId = objOption.hiId
      mesh.dataBinding = objOption.dataBinding
      mesh.eventBinding = objOption.eventBinding
      mesh.source = {
        gltfPath: objOption.source.gltfPath,
        gltf: objOption.source.gltf
      }
      // console.log('object--', mesh)
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.scale.x = objOption.scale[0];
      mesh.scale.y = objOption.scale[1];
      mesh.scale.z = objOption.scale[2];
      mesh.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
      if (parentGroup) {
        parentGroup.add(mesh);
      } else {
        this.scene.add(mesh); //將匯入的模型新增到場景中
      }
    }
    // this.renderer.render(this.scene, this.camera);
    this.viewRender()
  }.bind(this));
  return this
}

hi3D.prototype.setgltf = function (node, objOption) {
  if (objOption.position) {
    // node.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    if (typeof objOption.position[0] !== 'undefined') {
      node.position.x = objOption.position[0];
    }
    if (typeof objOption.position[1] !== 'undefined') {
      node.position.y = objOption.position[1];
    }
    if (typeof objOption.position[2] !== 'undefined') {
      node.position.z = objOption.position[2];
    }
  }
  if (objOption.color) {}
  if (objOption.source && objOption.source.gltf !== node.source.gltf) {}
  if (objOption.scale) {
    node.scale.x = objOption.scale[0];
    node.scale.y = objOption.scale[1];
    node.scale.z = objOption.scale[2];
    // node.traverse( function ( child ) {
    //   if ( child.isMesh ) {
    //     child.material.specular.setScalar( objOption.scale[0] );
    //   }
    // } );
  }
  if (objOption.rotateX) {
    node.rotation.x = objOption.rotateX / 180 * Math.PI ;
  }
  if (objOption.rotateZ) {
    node.rotation.z = objOption.rotateZ / 180 * Math.PI;
  }
  if (objOption.angle) {
    node.rotation.y = -1 * objOption.angle / 180 * Math.PI;
  }
}

hi3D.prototype.addnrrd = function (option, parentGroup) {
  var objOption = {
    color: '#F00',
    transparent: false,
    opacity: 1,
    position: [0, 0, 0],
    size: [1, 1, 1],
    source: {
      nrrd: ''
    },
    scale: [1, 1, 1],
    angle: 0
  }
  objOption = this.mergeDeep(objOption, option)
  if (!objOption.source || !objOption.source.nrrd) {
    return false
  }
  // const loader = new THREE.TDSLoader();
  // loader.setResourcePath( objOption.source.f_3dsTextures );
  // loader.load( objOption.source.f_3ds, function ( object ) {

  const loader = new THREE.NRRDLoader();
  loader.load(objOption.source.nrrd, function (volume) {
    const geometry = new THREE.BoxBufferGeometry(volume.xLength, volume.yLength, volume.zLength);
    const material = new THREE.MeshBasicMaterial({
      color: objOption.color
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.visible = false;
    let objExist = false
    this.scene.traverse(function (child) {
      if (child.hiId === objOption.hiId) {
        objExist = true
      }
    })
    if (!objExist) {
      let nrrdGroup = new THREE.Group();
      nrrdGroup.hiId = objOption.hiId
      nrrdGroup.dataBinding = objOption.dataBinding
      nrrdGroup.eventBinding = objOption.eventBinding
      nrrdGroup.source = {
        nrrd: objOption.source.nrrd
      }

      nrrdGroup.scale.x = objOption.scale[0];
      nrrdGroup.scale.y = objOption.scale[1];
      nrrdGroup.scale.z = objOption.scale[2];
      nrrdGroup.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);

      //z plane
      const sliceZ = volume.extractSlice('z', Math.floor(volume.RASDimensions[2] / 4));
      // sliceZ.mesh.hiId = objOption.hiId + '_z'
      // sliceZ.mesh.scale.x = objOption.scale[0];
      // sliceZ.mesh.scale.y = objOption.scale[1];
      // sliceZ.mesh.scale.z = objOption.scale[2];
      // sliceZ.mesh.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);

      //y plane
      const sliceY = volume.extractSlice('y', Math.floor(volume.RASDimensions[1] / 2));
      // sliceY.mesh.hiId = objOption.hiId + '_y'
      // mesh.scale.x = objOption.scale[0];
      // mesh.scale.y = objOption.scale[1];
      // mesh.scale.z = objOption.scale[2];
      // mesh.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);

      //x plane
      const sliceX = volume.extractSlice('x', Math.floor(volume.RASDimensions[0] / 2));
      // sliceX.mesh.hiId = objOption.hiId + '_x'
      // sliceX.mesh.scale.x = objOption.scale[0];
      // sliceX.mesh.scale.y = objOption.scale[1];
      // sliceX.mesh.scale.z = objOption.scale[2];
      // sliceX.mesh.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);

      nrrdGroup.add(mesh);
      nrrdGroup.add(sliceZ.mesh);
      nrrdGroup.add(sliceY.mesh);
      nrrdGroup.add(sliceX.mesh);
      if (parentGroup) {
        parentGroup.add(nrrdGroup);
        // parentGroup.add( mesh );
        // parentGroup.add( sliceZ.mesh );
        // parentGroup.add( sliceY.mesh );
        // parentGroup.add( sliceX.mesh );
      } else {
        this.scene.add(nrrdGroup);
        // this.scene.add(mesh); //將匯入的模型新增到場景中
        // this.scene.add( sliceZ.mesh );
        // this.scene.add( sliceY.mesh );
        // this.scene.add( sliceX.mesh );
      }
      this.viewRender()
    }
  }.bind(this))
  return this
}

hi3D.prototype.setnrrd = function (node, objOption) {
  if (objOption.position) {
    // node.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    if (typeof objOption.position[0] !== 'undefined') {
      node.position.x = objOption.position[0];
    }
    if (typeof objOption.position[1] !== 'undefined') {
      node.position.y = objOption.position[1];
    }
    if (typeof objOption.position[2] !== 'undefined') {
      node.position.z = objOption.position[2];
    }
  }
  if (objOption.color) {}
  if (objOption.source && objOption.source.gltf !== node.source.gltf) {}
  if (objOption.scale) {
    node.scale.x = objOption.scale[0];
    node.scale.y = objOption.scale[1];
    node.scale.z = objOption.scale[2];
    // node.traverse( function ( child ) {
    //   if ( child.isMesh ) {
    //     child.material.specular.setScalar( objOption.scale[0] );
    //   }
    // } );
  }
  if (objOption.rotateX) {
    node.rotation.x = objOption.rotateX / 180 * Math.PI ;
  }
  if (objOption.rotateZ) {
    node.rotation.z = objOption.rotateZ / 180 * Math.PI;
  }
  if (objOption.angle) {
    node.rotation.y = -1 * objOption.angle / 180 * Math.PI;
  }
}

hi3D.prototype.addGroundPlane = function (option, parentGroup) {
  var objOption = {
    color: '#F00',
    transparent: false,
    opacity: 1,
    position: [0, 0, 0],
    size: [2000, 1, 2000]
  }
  objOption = this.mergeDeep(objOption, option)
  const groundGeo = new THREE.PlaneGeometry(objOption.size[0], objOption.size[2]);
  const groundMat = new THREE.MeshStandardMaterial({
    color: objOption.color,
    transparent: objOption.transparent,
    opacity: objOption.opacity
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.x = objOption.position[0];
  ground.position.y = objOption.position[1];
  ground.position.z = objOption.position[2];
  // ground.rotation.x = 0;
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  ground.hiId = objOption.hiId
  ground.dataBinding = objOption.dataBinding
  ground.eventBinding = objOption.eventBinding
  if (parentGroup) {
    parentGroup.add(ground);
  } else {
    this.scene.add(ground);
  }
  // -------------
  const headMap = new THREE.TextureLoader().load(
    'https://dl.dropboxusercontent.com/s/bkqu0tty04epc46/creeper_face.png'
  )
  ground.material.map = headMap // 可延續原本的顏色
  ground.material.needsUpdate = true;
  ground.material.side = THREE.DoubleSide;
  // -------------
  return this
}

hi3D.prototype.setGroundPlane = function (node, objOption) {
  if (objOption.position) {
    // node.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    if (typeof objOption.position[0] !== 'undefined') {
      node.position.x = objOption.position[0];
    }
    if (typeof objOption.position[1] !== 'undefined') {
      node.position.y = objOption.position[1];
    }
    if (typeof objOption.position[2] !== 'undefined') {
      node.position.z = objOption.position[2];
    }
  }
  if (objOption.color) {
    node.material.color = new THREE.Color(objOption.color)
  }
  if (typeof objOption.transparent === 'boolean') {
    node.material.transparent = objOption.transparent
  }
  if (typeof objOption.opacity === 'number') {
    node.material.opacity = objOption.opacity
  }
  if (objOption.size) {
    let new_geometry = new THREE.PlaneGeometry(objOption.size[0], objOption.size[2]);
    node.geometry.dispose();
    node.geometry = new_geometry;
  }
  if (objOption.scale) {
    node.scale.x = objOption.scale[0];
    node.scale.y = objOption.scale[1];
    node.scale.z = objOption.scale[2];
  }
  if (objOption.rotateX) {
    node.rotation.x = objOption.rotateX / 180 * Math.PI ;
  }
  if (objOption.rotateZ) {
    node.rotation.z = objOption.rotateZ / 180 * Math.PI;
  }
  if (objOption.angle) {
    node.rotation.y = -1 * objOption.angle / 180 * Math.PI;
  }
}


hi3D.prototype.addWall = function (option, parentGroup) {
  var objOption = {
    color: '#F00',
    transparent: false,
    opacity: 1,
    position: [0, 50, 0],
    size: [1, 100, 1],
    scale: [1, 1, 1]
  }
  objOption = this.mergeDeep(objOption, option)
  const geometry = new THREE.BoxGeometry(objOption.size[0], objOption.size[1], objOption.size[2]);
  const material = new THREE.MeshStandardMaterial({
    color: objOption.color,
    transparent: objOption.transparent,
    opacity: objOption.opacity
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
  cube.scale.set(objOption.scale[0], objOption.scale[1], objOption.scale[2])
  cube.hiId = objOption.hiId
  cube.dataBinding = objOption.dataBinding
  cube.eventBinding = objOption.eventBinding
  if (parentGroup) {
    parentGroup.add(cube);
  } else {
    this.scene.add(cube);
  }
  return cube
}

hi3D.prototype.setWall = function (cube, objOption) {
  if (objOption.position) {
    // cube.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    if (typeof objOption.position[0] !== 'undefined') {
      cube.position.x = objOption.position[0];
    }
    if (typeof objOption.position[1] !== 'undefined') {
      cube.position.y = objOption.position[1];
    }
    if (typeof objOption.position[2] !== 'undefined') {
      cube.position.z = objOption.position[2];
    }
  }
  if (objOption.color) {
    cube.material.color = new THREE.Color(objOption.color)
  }
  if (typeof objOption.transparent === 'boolean') {
    cube.material.transparent = objOption.transparent
  }
  if (typeof objOption.opacity === 'number') {
    cube.material.opacity = objOption.opacity
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
  if (objOption.rotateX) {
    cube.rotation.x = objOption.rotateX / 180 * Math.PI ;
  }
  if (objOption.rotateZ) {
    cube.rotation.z = objOption.rotateZ / 180 * Math.PI;
  }
  if (objOption.angle) {
    cube.rotation.y = -1 * objOption.angle / 180 * Math.PI;
  }
  return cube
}

hi3D.prototype.addAxesHelper = function (option) {
  // new THREE.AxesHelper( 50 )
  const axesHelper = new THREE.AxesHelper(500);
  this.scene.add(axesHelper);
  this.axesHelper = axesHelper
  // this.renderer.render(this.scene, this.camera);
  return this
}

// 相機軌道控制
hi3D.prototype.addOrbitControls = function () {
  if (!THREE.OrbitControls) { return false; }
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
    // this.renderer.render(this.scene, this.camera);
    this.viewRender()
  }.bind(this));
  this.orbitControls = controls
  return this
}

hi3D.prototype.addTransformControls = function (mesh) {
  if (!mesh || !THREE.TransformControls) {
    return false
  }
  const control = new THREE.TransformControls(this.camera, this.renderer.domElement);
  control.addEventListener('change', function (event) {
    // this.renderer.render(this.scene, this.camera);
    this.viewRender()
    if (this.defaultOptions.transformControls && this.defaultOptions.transformControls['change']) {
      this.defaultOptions.transformControls['change'](event)
    }
  }.bind(this));
  control.addEventListener('mouseDown', function (event) {
    if (this.defaultOptions.transformControls && this.defaultOptions.transformControls['mouseDown']) {
      this.defaultOptions.transformControls['mouseDown'](event)
    }
    // this.renderer.render(this.scene, this.camera);
    this.viewRender()
  }.bind(this));
  control.addEventListener('mouseUp', function (event) {
    if (this.defaultOptions.transformControls && this.defaultOptions.transformControls['mouseUp']) {
      this.defaultOptions.transformControls['mouseUp'](event)
    }
    // this.renderer.render(this.scene, this.camera);
    this.viewRender()
  }.bind(this));
  control.addEventListener('objectChange', function (event) {
    if (this.defaultOptions.transformControls && this.defaultOptions.transformControls['objectChange']) {
      this.defaultOptions.transformControls['objectChange'](event)
    }
    // this.renderer.render(this.scene, this.camera);
    this.viewRender()
  }.bind(this));
  control.addEventListener('dragging-changed', function (event) {
    if (this.orbitControls) {
      this.orbitControls.enabled = !event.value;
    }
    if (this.defaultOptions.transformControls && this.defaultOptions.transformControls['dragging_changed']) {
      this.defaultOptions.transformControls['dragging_changed'](event)
    }
    // this.renderer.render(this.scene, this.camera);
    this.viewRender()
  }.bind(this));
  control.addEventListener('worldPosition-changed', function (event) {}.bind(this));
  control.addEventListener('translationSnap-changed', function (event) {}.bind(this));
  control.addEventListener('rotationSnap-changed', function (event) {}.bind(this));
  control.addEventListener('scaleSnap-changed', function (event) {}.bind(this));

  control.attach(mesh);
  this.scene.add(control);
  this.transformControls = control
  return this
}
hi3D.prototype.setTransformControlsMesh = function (mesh) {
  if (!mesh) {
    if (this.transformControls) {
      this.transformControls.detach()
    }
    return false
  }
  if (!this.transformControls) {
    this.addTransformControls(mesh)
  }
  this.transformControls.attach(mesh);
  // this.renderer.render(this.scene, this.camera);
  this.viewRender()
}

hi3D.prototype.disposeTransformControlsMesh = function (mesh) {
  if (this.transformControls) {
    this.transformControls.detach()
    this.transformControls.dispose()
    this.scene.remove(this.transformControls)
    this.transformControls = null
    this.viewRender()
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


hi3D.prototype.addBoxHelper = function () {
  this.scene.traverse(function (node) {
    if (node.geometry) {
      const box = new THREE.BoxHelper(node, 0xffff00);
      this.scene.add(box);
    }
  }.bind(this));
}

hi3D.prototype.viewRender = function () {
  this.renderer.render(this.scene, this.camera);
  if (typeof this.defaultOptions.renderSetting.callback === 'function') {
    this.defaultOptions.renderSetting.callback.call(this)
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
  // this.renderer.render(this.scene, this.camera);
  this.viewRender()
};

// reverse string to functionn
hi3D.prototype.functionGenerator = function (func) {
  return new Function("return " + func)();
  // var C = new Function("return " + B)()
}

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

hi3D.prototype.uniqueIdGenerater = function (action) {
  if (hiMathUtil) {
    return hiMathUtil.generateUUID()
  } else {
    var u = '',
      m = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
      i = 0,
      rb = Math.random() * 0xffffffff | 0;
    while (i++ < 36) {
      var c = m[i - 1],
        r = rb & 0xf,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      u += (c == '-' || c == '4') ? c : v.toString(16);
      rb = i % 8 == 0 ? Math.random() * 0xffffffff | 0 : rb >> 4
    }
    return u
  }
}

// https://threejs.org/docs/#api/en/geometries/TubeGeometry
// https://threejs.org/docs/#api/en/extras/curves/SplineCurve
// https://threejs.org/docs/#api/en/objects/Line
// 讀取obj mtl
// https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/227973/

// 物件bounding box THREE.BoxHelper

// 控制物件  https://threejs.org/examples/#misc_controls_transform

// 回設 3d模型 size
// https://stackoverflow.com/questions/20864931/three-js-how-can-i-return-the-size-of-an-object