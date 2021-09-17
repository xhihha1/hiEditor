function editor3D (edit, objOption) {

    edit.hi3d = new hi3D()
    edit.hi3d.addscene()
    edit.hi3d.addCamera()
    edit.hi3d.addLight()
    edit.hi3d.setCamera({position: [0, 0, 100]})
    edit.hi3d.addCube()
    edit.hi3d.addCube({position:[5,0,0], color:'#F00'})
    edit.hi3d.addCube({position:[0,5,0], color:'#0F0'})
    edit.hi3d.addCube({position:[0,0,5], color:'#00F'})
    edit.hi3d.addObj()
    // edit.hi3d.animate()

    function animateA(){
        // ---------------
        requestAnimationFrame( animateA );
        var fabricJson = edit.canvasView.toJSON();
        if(typeof json == 'string'){
            fabricJson = JSON.parse(fabricJson)
        }
        // console.log('3D ---', edit.canvasView.toJSON())
        edit.hi3d.removeAllCube()
        // edit.hi3d.addObj()
        for (var i = 0; i < fabricJson["objects"].length; i++) {
            var item = fabricJson["objects"][i];
            if (item["type"] == "hiCamera") {
                edit.hi3d.camera.position.set(item["left"], 0, item["top"]);
            }
            if (item["type"] == "hiLookAt") {
                edit.hi3d.camera.lookAt(new THREE.Vector3(item["left"], 0, item["top"])); 
            }
            if (item["type"] == "hiRect") {
                var opt = {
                    color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
                    position: [item["left"], 0, item["top"]],
                    size: [item["width"], 1, item["height"]]
                }
                edit.hi3d.addCube(opt)
            }
            if (item["type"] == "hiCircle") {
                var opt = {
                    // color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
                    position: [item["left"], 0, item["top"]],
                    radius: item["radius"],
                    widthSegments: item["width"],
                    heightSegments: item["height"]
                }
                edit.hi3d.addSphere(opt)
            }
            if (item["type"] == "hiPolyline") {
                var opt = {
                    // color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
                    position: [item["left"], 0, item["top"]],
                    radius: item["radius"],
                    widthSegments: item["width"],
                    heightSegments: item["height"]
                }
                var points = []
                for(var j = 0; j < item['points'].length; j++) {
                    points.push([item['points'][j].x, 0, item['points'][j].y])
                }
                edit.hi3d.addLine({
                    // color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
                    points: points
                })
            }
        }
        edit.hi3d.renderer.render( edit.hi3d.scene, edit.hi3d.camera );
        // ----------------
    }
    animateA()

    $('#render3D').click(function(){
        var fabricJson = edit.canvasView.toJSON();
        if(typeof json == 'string'){
            fabricJson = JSON.parse(fabricJson)
        }
        console.log('3D ---', edit.canvasView.toJSON())
        edit.hi3d.removeAllCube()
        for (var i = 0; i < fabricJson["objects"].length; i++) {
            var item = fabricJson["objects"][i];
            if (item["type"] == "hiCamera") {
                edit.hi3d.camera.position.set(item["left"], 0, item["top"]);
            }
            if (item["type"] == "hiRect") {
                var opt = {
                    color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
                    position: [item["left"], 0, item["top"]],
                    size: [item["width"], 1, item["height"]]
                }
                edit.hi3d.addCube(opt)
            }
            if (item["type"] == "hiCircle") {
                var opt = {
                    // color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
                    position: [item["left"], 0, item["top"]],
                    radius: item["radius"],
                    widthSegments: item["width"],
                    heightSegments: item["height"]
                }
                edit.hi3d.addSphere(opt)
            }
            if (item["type"] == "hiPolyline") {
                var opt = {
                    // color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
                    position: [item["left"], 0, item["top"]],
                    radius: item["radius"],
                    widthSegments: item["width"],
                    heightSegments: item["height"]
                }
                var points = []
                for(var j = 0; j < item['points'].length; j++) {
                    points.push([item['points'][j].x, 0, item['points'][j].y])
                }
                edit.hi3d.addLine({
                    // color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
                    points: points
                })
            }
        }
        
        // console.log(scene)
        // scene.traverse( function( node ) {

        //     if ( node instanceof THREE.Mesh ) {
        
        //         // insert your code here, for example:
        //         node.material = new THREE.MeshNormalMaterial()
        
        //     }
        
        // } );
    });

    // animate();
}

function hi3D (options) {
    this.defaultOptions = {
        parentId: 'content3D',
        // canvasViewId: 'mainEditor',
        activeJsonTextId: 'hiActiveJsonArea',
        canvasWidth: 500,
        canvasHeight: 500,
        objectDefault: {
            fillColor: 'rgba(0,0,0,0)',
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
        scene: {
            background: '#FF0000'
        },
        renderSetting: {

        }
    }
    var container = document.getElementById( this.defaultOptions.parentId );
    this.defaultOptions.containWidth = container.clientWidth
    this.defaultOptions.containHeight = container.clientHeight
    this.setRender()
    container.appendChild( this.renderer.domElement );
    return this
}

hi3D.prototype.addscene = function () {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(this.defaultOptions.scene.background)
    this.scene = scene
    return this
}

hi3D.prototype.addLight = function () {
    var light = new THREE.DirectionalLight(0xffffff);//光源顏色
    light.position.set(20, 10, 5);//光源位置
    this.scene.add(light);//光源新增到場景中

    //添加环境光
    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    this.scene.add(ambientLight);

    //添加聚光灯光源
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    this.scene.add(spotLight);

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
    renderer.setSize( this.defaultOptions.containWidth, this.defaultOptions.containHeight );
    this.renderer = renderer
    return this
}

hi3D.prototype.addCube = function (option) {
    var objOption = {
        color: '#F00',
        position: [0, 0, 0]
    }
    objOption = this.mergeDeep(objOption, option)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: objOption.color } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    this.scene.add( cube );
    return this
}

hi3D.prototype.addSphere = function (option) {
    var objOption = {
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
    const material = new THREE.MeshBasicMaterial( { color: objOption.color } );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    this.scene.add( sphere );

    // SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
    // radius — sphere radius. Default is 1.
    // widthSegments — number of horizontal segments. Minimum value is 3, and the default is 32.
    // heightSegments — number of vertical segments. Minimum value is 2, and the default is 16.
    // phiStart — specify horizontal starting angle. Default is 0.
    // phiLength — specify horizontal sweep angle size. Default is Math.PI * 2.
    // thetaStart — specify vertical starting angle. Default is 0.
    // thetaLength — specify vertical sweep angle size. Default is Math.PI.

    return this
}

hi3D.prototype.addCube = function (option) {
    var objOption = {
        color: '#F00',
        position: [0, 0, 0],
        size: [1 ,1 ,1]
    }
    objOption = this.mergeDeep(objOption, option)
    const geometry = new THREE.BoxGeometry(objOption.size[0], objOption.size[1], objOption.size[2]);
    const material = new THREE.MeshBasicMaterial( { color: objOption.color } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    this.scene.add( cube );
    return this
}

hi3D.prototype.addLine = function (option) {
    var objOption = {
        color: '#F00',
        points: []
    }
    objOption = this.mergeDeep(objOption, option)

    const material = new THREE.LineBasicMaterial({
        color: objOption.color
    });
    const points = [];
    for (var i = 0; i < objOption.points.length; i++) {
        points.push(
            new THREE.Vector3(
                objOption.points[i][0],
                objOption.points[i][1],
                objOption.points[i][0]
            )
        );
    }
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );

    this.scene.add( line );
    return this
}

hi3D.prototype.addObj = function (option) {
    var objOption = {
        color: '#F00',
        position: [0, 0, 0],
        size: [1 ,1 ,1]
    }
    objOption = this.mergeDeep(objOption, option)
    // const geometry = new THREE.BoxGeometry(objOption.size[0], objOption.size[1], objOption.size[2]);
    // const material = new THREE.MeshBasicMaterial( { color: objOption.color } );
    // const cube = new THREE.Mesh( geometry, material );
    // cube.position.set(objOption.position[0], objOption.position[1], objOption.position[2]);
    // this.scene.add( cube );

    var loader = new THREE.OBJLoader(); //在init函式中，建立loader變數，用於匯入模型
    loader.load('./assets/male02.obj', function (obj) { //第一個表示模型路徑，第二個表示完成匯入後的回撥函式，一般我們需要在這個回撥函式中將匯入的模型新增到場景中
        obj.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                // child.material.side = THREE.DoubleSide;
                // child.material.color.setHex(0x00FF00);
                // child.material.ambient.setHex(0xFF0000);
                child.material.color.setHex(0x00FF00);
                // child.material.color.set('blue');
            }
            console.log(child)
        });
        console.log('/******************', this)
        // mesh = obj; //儲存到全域性變數中
        this.scene.add(obj); //將匯入的模型新增到場景中
    }.bind(this));

    

    return this
}

hi3D.prototype.removeAllCube = function (option) {
    if (this.scene && this.scene.traverse) {
        var nodes = []
        this.scene.traverse(function( node ) {
            if ( node instanceof THREE.Mesh ) {
                nodes.push(node)
            }
            if ( node instanceof THREE.Line ) {
                nodes.push(node)
            }
        }.bind(this) );
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
    requestAnimationFrame( that.animate.bind(that) );
    this.scene.traverse( function( node ) {
        if ( node instanceof THREE.Mesh ) {
            // insert your code here, for example:
            // node.material = new THREE.MeshNormalMaterial()
            node.rotation.x += 0.01;
            node.rotation.y += 0.01;
        }
    } );
    // if(typeof this.theta === 'undefined') { this.theta = 0 }
    // else { this.theta = (this.theta + 1) % 360 }
    // this.camera.position.set(100 * Math.cos(this.theta * Math.PI / 180), 50, 100 * Math.sin(this.theta * Math.PI / 180))
    this.renderer.render( this.scene, this.camera );
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

// 控制物件 THREE.BoxHelper