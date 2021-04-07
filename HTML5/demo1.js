function init() {
    var stats = initStats();

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);

    var control = new THREE.OrbitControls(camera);
    control.enabled=true;
    control.target.set( 0, 0, 0 );
    control.update();

    var backgroundcolor="#00dfff";
    var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(backgroundcolor));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.Enabled = true;

    camera.position.set(130,40,50)
    camera.lookAt(scene.position);
    scene.add(camera);

    var spotLight = new THREE.DirectionalLight(0xffffff);
    spotLight.position.set(30, 40, 50);
    spotLight.intensity = 1;
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    var outMesh;
    //var meshcolor="#9C3A21";
    var controls = new function () {
        this.backgroundcolor=backgroundcolor;
        //this.meshcolor=meshcolor;
        this.scaleAll=0.3;
        this.x=0;
        this.y=0;
        this.z=0;
        this.able=true;
        //this.reload
        //this.color=new THREE.Mesh
    };

    var gui = new dat.GUI();
    gui.addColor(controls,"backgroundcolor").onChange(function(e){
        webGLRenderer.setClearColor(new THREE.Color(e));
    })
    /*gui.addColor(controls,"meshcolor").onChange(function(e){
        meshcolor=e;
        outMesh.children.forEach(function(child){
            child.material=new THREE.MeshLambertMaterial({color:meshcolor});
        });
    });*/
    gui.add(controls,"scaleAll",0,0.5).onChange(function(e){
        outMesh.scale.set(e,e,e);
    });
    gui.add(controls,"x",-3,3).onChange(function(e){
        outMesh.position.x+=e;
    });
    gui.add(controls,"y",-3,3).onChange(function(e){
        outMesh.position.y+=e;
    });
    gui.add(controls,"z",-3,3).onChange(function(e){
        outMesh.position.z+=e;
    });
    gui.add(controls,"able").onChange(function(e){
        control.enabled=e;
    });

    var texture=THREE.ImageUtils.loadTexture("floor-wood.jpg")
    var mat=new THREE.MeshPhongMaterial({map:texture});
    var cube=new THREE.Mesh(new THREE.BoxGeometry(50,50,50),mat)
    cube.position.set(-50,0,50);
    scene.add(cube);

    var loader=new THREE.FBXLoader();
    loader.load("demo1.fbx",function(object){
        //object.computeVertexNormals();
        var texture=THREE.ImageUtils.loadTexture("floor-wood.jpg")
        var mat=new THREE.MeshPhongMaterial({map:texture});
        object.traverse(function(child){
            child.material=mat;
        })

        object.scale.multiplyScalar(0.3);
        outMesh=object;
        scene.add(outMesh);
    })

    render();

    function render() {
        stats.update();

        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);
    }

    function initStats() {
        var stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.getElementById("Stats-output").appendChild(stats.domElement);
        return stats;
    }
}
window.onload = init;
