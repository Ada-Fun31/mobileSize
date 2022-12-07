
import * as THREE from "../threejs-page/modules/three.module.js";

import { FontLoader } from "../threejs-page/modules/FontLoader.js";
import { TextGeometry } from "../threejs-page/modules/TextGeometry.js";
import { GLTFLoader } from "../threejs-page/modules/GLTFLoader.js";
import { RGBELoader } from "../threejs-page/modules/RGBELoader.js";

import { OrbitControls } from "./modules/OrbitControls.js";

/*-------------------- Window Resize --------------------*/
window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight * 0.95)
}

/*-------------------- Boiler plate --------------------*/

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight * 0.95);


renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.5;
renderer.outputEncoding = THREE.sRGBEncoding;
// blurry effect
// renderer.setPixelRatio(0.1);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
)
camera.position.set(0, 34, 170);
// camera.lookAt(0, 0, 0);

renderer.shadowMap.enabled = true;
const controls = new OrbitControls(camera, renderer.domElement);

//* ----- control update
function ControlUpdate() {
    controls.update();
    requestAnimationFrame(ControlUpdate);
    // renderer.render(scene, camera);
}
ControlUpdate();


let canvas3D = document.getElementById('3Dspace');
canvas3D.appendChild(renderer.domElement);

//* ----- environment map
new RGBELoader()
    .load('assets/env/large_corridor_1k.hdr', function (env) {
        env.mapping = THREE.EquirectangularReflectionMapping;
        // scene.background = new THREE.Color('#000000');
        scene.background = new THREE.Color('#000000');
        scene.environment = env;
    });

/*-------------------- Import GLTF models--------------------*/
let heart;

const Cubeloader1 = new GLTFLoader();
Cubeloader1.load('assets/models/skin2/skin2.gltf', function (gltf) {
    console.log(gltf);
    const SkinCube1 = gltf.scene;
    SkinCube1.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(SkinCube1);
    SkinCube1.scale.set(25, 25, 25);
    SkinCube1.position.set(0, -23, -10);
});

const Objloader = new GLTFLoader();
Objloader.load('assets/models/heart/scene.gltf', function (gltf) {
    console.log(gltf);
    heart = gltf.scene;
    heart.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(heart);
    Hanimate();
    heart.scale.set(1200, 1200, 1200);
    heart.position.set(0, 50, -10);
});


function Hanimate() {
    var t = clock.getElapsedTime();

    let reminder = t % 2;
    let change;

    if (reminder <= 1) {
        heart.scale.x -= 5;
        heart.scale.y -= 5;
        heart.scale.z -= 5;
    } else {
        heart.scale.x += 5;
        heart.scale.y += 5;
        heart.scale.z += 5;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(Hanimate);
};



/*-------------------- Generate Text Model --------------------*/

//*----- generate TEXT MODEL
const objects = [];

function addText(x, y, obj, s) {
    let maxNum = 12;
    let minNum = -12;
    let maxNumy = 120;
    let minNumy = -15;
    let maxNumz = 5;
    let minNumz = -20;

    obj.position.x = Math.random() * (maxNum - minNum) + minNum;
    obj.position.y = Math.random() * (maxNumy - minNumy) + minNumy;
    obj.position.z = Math.random() * (maxNumz - minNumz) + minNumz;
    console.log(obj.position);
    obj.scale.set(s, s, s);
    // obj.rotation.x = Math.random() * 2;

    scene.add(obj);
    objects.push(obj);
    console.log(objects);
}

function randomMaterial() {
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide, wireframe: true
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
}

function addTextGeometry(x, y, geometry, s) {
    const mesh = new THREE.Mesh(geometry, randomMaterial());
    addText(x, y, mesh, s);

    var animate = function () {
        mesh.rotation.y += 0.01;
        requestAnimationFrame(animate);
    };
    animate();

    mesh.castShadow = true;
}

/*----- threejs socket connection -----*/
let socket = io("/threejs-page");

//*----- INPUT TEXT
// let Inputext;
let textGeometry;
let question, anwser
let questionAsked = document.getElementById("question");
let UploadButton = document.getElementById("upload-button");

//listen for confirmation of connection
socket.on('connect', () => {
    console.log("connected");
    socket.on('randomQ', (data) => {
        let getNumber = data.combo.length;
        let randomNum = randomNumber(getNumber);

        let randomCombo = data.combo[randomNum];
        console.log(randomCombo);

        question = randomCombo.question;
        anwser = randomCombo.anwser;
        console.log("anwser", anwser);

        questionAsked.innerText = question;

        let pixel = 1;
        UploadButton.addEventListener('click', function () {
            let Inputext = document.getElementById("input-text").value;

            // compare anwser, if wrong upload
            console.log(pixel);

            let result = anwser.includes(Inputext);
            if (!result) {
                if (pixel > 0.15) {
                    pixel = pixel - 0.1;
                    renderer.setPixelRatio(pixel);
                } else {
                    pixel = 0.1;
                    renderer.setPixelRatio(pixel); 
                };
                UploadText(Inputext);
                console.log("WRONG");
            } else {
                // lofi
                console.log("TRUE");
                if (pixel < 1) {
                    pixel = pixel + 0.1;
                    renderer.setPixelRatio(pixel);
                } else {
                    pixel = 1;
                    renderer.setPixelRatio(pixel);
                }
                // change question;
                let getNumber = data.combo.length;
                let randomNum = randomNumber(getNumber);

                let randomCombo = data.combo[randomNum];
                console.log("new", randomCombo);

                question = randomCombo.question;
                anwser = randomCombo.anwser;

                questionAsked.innerText = question;
                // socket.emit('update', { msg: "idk" });
            }
        })
    });

});



function randomNumber(test) {
    let random = Math.floor(Math.random() * test);
    // console.log('test',random);
    return random;
}


// let pixel = 1;
// let UploadButton = document.getElementById("upload-button");
// UploadButton.addEventListener('click', function () {
//     Inputext = document.getElementById("input-text").value;
//     // compare anwser, if wrong upload
//     console.log(anwser);
//     console.log(pixel);
//     let result = anwser.includes(Inputext);
//     if (!result) {
//         if (pixel > 0.15) {
//             pixel = pixel - 0.1;
//             renderer.setPixelRatio(pixel);
//         }else{
//             pixel = 0.1;
//             renderer.setPixelRatio(pixel);
//         };
//         UploadText(Inputext);
//         console.log("WRONG!!!");

//     } else {
//         // lofi
//         console.log("TRUE!!!");
//         if (pixel < 1) {
//             pixel = pixel + 0.1;
//             renderer.setPixelRatio(pixel);
//         } else {
//             pixel = 1;
//             renderer.setPixelRatio(pixel);
//         }
//         // change question
//         socket.emit('newQuestion',{msg:"new"})
//     }
// })


function UploadText(text) {
    const TFloader = new FontLoader();
    TFloader.load("../threejs-page/fonts/Source Code Pro ExtraLight_Italic.json", function (font) {

        textGeometry = new TextGeometry(text, {
            font: font,
            size: 40,
            height: 2,

            curveSegments: 2,

            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        });
        addTextGeometry(-12, -10, textGeometry, 0.15);
    })
}



/*-------------------- SCENE & LIGHT --------------------*/

const loader = new THREE.TextureLoader();
const clock = new THREE.Clock();

SceneInit();

function SceneInit() {
    SceneLighting();
    HeartLighting();
    SceneElement();

    sceneRenderAnimation();
}

function SceneLighting() {
    const hLight = new THREE.AmbientLight("#fcfafa", 0.4);
    scene.add(hLight);

    /*-----*/
    const sphere = new THREE.SphereGeometry(2, 12, 8);

    // Light - cast shadows
    const TopLight = new THREE.PointLight(0xffffff, 2, 1200);
    TopLight.add(
        new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff }))
    )
    TopLight.position.set(0, 400, -10)
    scene.add(TopLight);
    // TopLight.castShadow = true;

    const FrontLight = new THREE.PointLight(0xffffff, 1, 1000);
    FrontLight.add(
        new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff }))
    )
    FrontLight.position.set(200, 20, 200)
    scene.add(FrontLight);
    FrontLight.castShadow = true;

    const BackLight = new THREE.PointLight(0xffffff, 0.5, 1000);
    BackLight.add(
        new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff }))
    )
    BackLight.position.set(-200, 0, -200)
    scene.add(BackLight);
    // BackLight.castShadow = true;
}

function HeartLighting() {
    // // Heart OBJ
    // const material = new THREE.MeshStandardMaterial({
    //     color: '#ffe4c4',
    //     emissive: '#ff00d0',
    //     emissiveIntensity: 0.3,
    //     wireframe: true
    // });

    // /*----- extrude 3D model -----*/
    // const shape = new THREE.Shape();
    // const x = -2.5;
    // const y = -5;
    // shape.moveTo(x + 2.5, y + 2.5);
    // shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    // shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    // shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    // shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    // shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    // shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    // const extrudeSettings = {
    //     steps: 5,  // ui: steps
    //     depth: 1,  // ui: depth
    //     /*---bevel on the edge---*/
    //     bevelEnabled: true,  // ui: bevelEnabled
    //     bevelThickness: 1,  // ui: bevelThickness
    //     bevelSize: 1,  // ui: bevelSize
    //     bevelSegments: 3,  // ui: bevelSegments
    // };

    // const heartGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // heartMesh = new THREE.Mesh(heartGeometry, material);
    // heartMesh.scale.set(1.5, 1.5, 2)
    // heartMesh.castShadow = true; // cast shadow on ground
    // // heartMesh.receiveShadow = true; //receive shadow from other obj

    // const shadowLight = new THREE.PointLight('#ffa1ba', 0.5, 120);
    // shadowLight.add(heartMesh)
    // shadowLight.position.set(0, 30, -10);

    // scene.add(shadowLight);
    // shadowLight.castShadow = true;
}

function SceneElement() {
}

function sceneRenderAnimation() {
    requestAnimationFrame(sceneRenderAnimation);
    renderer.render(scene, camera);
};
