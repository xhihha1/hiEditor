function editor3D (edit, objOption) {

    
    
    // var container = document.getElementById( 'content3D' );
    // var containWidth = container.clientWidth
    // var containHeight = container.clientHeight
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera( 75, containWidth / containHeight, 0.1, 1000 );

    // const renderer = new THREE.WebGLRenderer();
    // renderer.setSize( containWidth, containHeight );
    
    // container.appendChild( renderer.domElement );

    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial( { color: '#F00' } );
    // const cube = new THREE.Mesh( geometry, material );
    // cube.position.set(0, 0, 0);
    // scene.add( cube );

    // camera.position.z = 20;

    // const animate = function () {
    //     requestAnimationFrame( animate );

    //     cube.rotation.x += 0.01;
    //     cube.rotation.y += 0.01;

    //     renderer.render( scene, camera );
    // };

    
    // const addCube = function (x, y, z, color) {
    //     const geometry = new THREE.BoxGeometry();
    //     const material = new THREE.MeshBasicMaterial( { color: color } );
    //     const cube = new THREE.Mesh( geometry, material );
    //     cube.position.set(x, y, z);
    //     scene.add( cube );
    // }

    edit.hi3d = new hi3D()
    edit.hi3d.addscene()
    edit.hi3d.addCamera()
    edit.hi3d.setCamera()
    edit.hi3d.addCube()
    edit.hi3d.animate()

    $('#render3D').click(function(){
        var fabricJson = edit.canvasView.toJSON();
        if(typeof json == 'string'){
            fabricJson = JSON.parse(fabricJson)
        }
        console.log('3D ---', edit.canvasView.toJSON())
        edit.hi3d.removeAllCube()
        for (var i = 0; i < fabricJson["objects"].length; i++) {
            var item = fabricJson["objects"][i];
            if (item["type"] == "hiRect") {
                var opt = {
                    color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
                    position: [Math.round(Math.random()*10), Math.round(Math.random()*10), Math.round(Math.random()*10)]
                }
                edit.hi3d.addCube(opt)
            }
        }
        edit.hi3d.addLine({
            color: 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')',
            points: [
                [0, 0, 0],
                [Math.round(Math.random()*10), Math.round(Math.random()*10), Math.round(Math.random()*10)],
                [Math.round(Math.random()*10), Math.round(Math.random()*10), Math.round(Math.random()*10)],
                [Math.round(Math.random()*10), Math.round(Math.random()*10), Math.round(Math.random()*10)],
                [Math.round(Math.random()*10), Math.round(Math.random()*10), Math.round(Math.random()*10)],
                [10, 10, 10]
            ]
        })
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
    this.scene = scene
    return this
}

hi3D.prototype.addCamera = function (option) {
    // fov : Number, aspect : Number, near : Number, far : Number
    const cameraOption = {
        fov: 75,
        aspect: this.defaultOptions.containWidth / this.defaultOptions.containHeight,
        near: 0.1,
        far: 1000,
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

hi3D.prototype.addLine = function (option) {
    var objOption = {
        color: '#F00',
        points: []
    }
    objOption = this.mergeDeep(objOption, option)

    const material = new THREE.LineBasicMaterial({
        color: 0x0000ff
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
    // else { this.theta = (this.theta + 5) % 360 }
    // this.camera.position.set(20 * Math.cos(this.theta * Math.PI / 180), 0, 20 * Math.sin(this.theta * Math.PI / 180))
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