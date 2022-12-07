let scene, camera, renderer, directionalLight, hLight, geomtry, material, cube;
let controls;

/*---------- Set-up ----------*/
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.
    innerHeight, 0.1, 1000);
renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 1.4;
camera.position.y = -0.25;
controls = new THREE.OrbitControls(camera, renderer.domElement);

/*---------- Light ----------*/
directionalLight = new THREE.DirectionalLight("white", 2);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

hLight = new THREE.AmbientLight("white", 1.5);
scene.add(hLight);

/*---------- Loader ----------*/
init();



function init() {
    /*---------- GLTFLOader Loading models ----------*/
    let modelXi;
    let loader = new THREE.GLTFLoader();
    loader.load('model/scene.gltf', function (gltf) {
        console.log(gltf);
        // modelXi = gltf.scene.children[0];

        scene.add(gltf.scene);
        gltf.scene.position.x = -0.025;
        renderer.render(scene, camera);
    });

    /*---------- orbitControl updates ----------*/
    var animate = function () {
        controls.update();

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    animate();
}
