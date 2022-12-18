const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 45, 300000);

cam.position.set(0, -10000, 8000);

// cam.lookAt(new THREE.Vector3(0, -10000, 100));

const renderer = new THREE.WebGLRenderer({ antialias: true });

const controls = new THREE.OrbitControls(cam, renderer.domElement);
// controls.minDistance = -5000;
// controls.maxDistance = 10000;
controls.update();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

//sky
let materialArray = [];
let texture_front = new THREE.TextureLoader().load("./assets/world/front.png");
let texture_back = new THREE.TextureLoader().load("./assets/world/back.png");
let texture_top = new THREE.TextureLoader().load("./assets/world/top.png");
let texture_bottom = new THREE.TextureLoader().load("./assets/world/bottom.jpg");
let texture_right = new THREE.TextureLoader().load("./assets/world/right.png");
let texture_left = new THREE.TextureLoader().load("./assets/world/left.png");

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_front }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_back }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_top }));
materialArray.push(new THREE.MeshPhongMaterial({ map: texture_bottom }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_right }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_left }));

for (let i = 0; i < 6; i++) {
    materialArray[i].side = THREE.BackSide;
}

let skyBoxGeo = new THREE.BoxGeometry(12000, 12000, 12000);
let skyBox = new THREE.Mesh(skyBoxGeo, materialArray);
scene.add(skyBox);

// let jelly;
// let loader_jelly = new THREE.GLTFLoader().load(
//     '3dmodel/jelly/scene.gltf',
//     function (result) {
//         jelly = result.scene.children[0];
//         jelly.castShadow = true;
//         scene.add(jelly);
//         jelly.scale.set(2, 2, 2);
//         jelly.position.set(1000, 1000, 1000);
//     }
// );

let squidward;
let loader_squidward = new THREE.GLTFLoader().load(
    '3dmodel/squidward/scene.gltf',
    function (result) {
        squidward = result.scene.children[0];
        squidward.castShadow = true;
        scene.add(squidward);
        squidward.scale.set(1, 1, 1);
        squidward.position.set(1000, -4800, -1000);
    }
);

let komvlex;
let loader_komvlex = new THREE.GLTFLoader().load(
    '3dmodel/spongebob_environment/scene.gltf',
    function (result) {
        komvlex = result.scene.children[0];
        komvlex.castShadow = true;
        scene.add(komvlex);
        komvlex.scale.set(1800, 1800, 2000);
        komvlex.position.set(500, -5500, -1000);
    }
);



let light1 = new THREE.PointLight();
light1.intensity = 2;
light1.position.set(000, -1500, -1000);
const helper1 = new THREE.PointLightHelper(light1, 0.04, 0xffff00);
// scene.add(helper1);
scene.add(light1);

var light = new THREE.PointLight(0xffffff, 10, 100);
var helper = new THREE.PointLightHelper(light, 100, 0xffff00);
light.position.set(1500, 1000, 1000);
light.intensity = 4;
// scene.add(light);
// scene.add(helper);

const light2 = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
light2.intensity = 1;
// scene.add(light2);

function draw() {
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
    controls.update();
}

draw();