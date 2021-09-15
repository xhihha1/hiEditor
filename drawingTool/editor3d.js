function editor3D (edit, objOption) {

    
    
    var container = document.getElementById( 'content3D' );
    var containWidth = container.clientWidth
    var containHeight = container.clientHeight
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, containWidth / containHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( containWidth, containHeight );
    
    container.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: '#F00' } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(0, 0, 0);
    scene.add( cube );

    camera.position.z = 20;

    const animate = function () {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render( scene, camera );
    };

    
    const addCube = function (x, y, z, color) {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: color } );
        const cube = new THREE.Mesh( geometry, material );
        cube.position.set(x, y, z);
        scene.add( cube );
    }
    

    $('#render3D').click(function(){
        var fabricJson = edit.canvasView.toJSON();
        if(typeof json == 'string'){
            fabricJson = JSON.parse(fabricJson)
        }
        console.log('3D ---', edit.canvasView.toJSON())
        for (var i = 0; i < fabricJson["objects"].length; i++) {
            var item = fabricJson["objects"][i];
            if (item["type"] == "hiRect") {
                console.log('3D ---')
                addCube(Math.round(Math.random()*10), Math.round(Math.random()*10), Math.round(Math.random()*10),
                'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')')
            }
        }
        console.log(scene)
        // scene.traverse( function( node ) {

        //     if ( node instanceof THREE.Mesh ) {
        
        //         // insert your code here, for example:
        //         node.material = new THREE.MeshNormalMaterial()
        
        //     }
        
        // } );
    });

    animate();
}