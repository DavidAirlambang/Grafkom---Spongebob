const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 45, 30000);

cam.position.set(-15000, -15000, -15000);

const renderer = new THREE.WebGLRenderer({ antialias: true });

const controls = new THREE.OrbitControls(cam, renderer.domElement);
controls.minDistance = -5000;
controls.maxDistance = 10000;
controls.update();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//sky
let materialArray = [];
let texture_front = new THREE.TextureLoader().load("./assets/world/front.png");
let texture_back = new THREE.TextureLoader().load("./assets/world/back.png");
let texture_top = new THREE.TextureLoader().load("./assets/world/top.png");
let texture_bottom = new THREE.TextureLoader().load("./assets/world/bottom.png");
let texture_right = new THREE.TextureLoader().load("./assets/world/right.png");
let texture_left = new THREE.TextureLoader().load("./assets/world/left.png");

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_front }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_back }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_top }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bottom }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_right }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_left }));

for (let i = 0; i < 6; i++) {
    materialArray[i].side = THREE.BackSide;
}

let skyBoxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
let skyBox = new THREE.Mesh(skyBoxGeo, materialArray);
scene.add(skyBox);

let jelly;
let loader_jelly = new THREE.GLTFLoader().load(
    '3dmodel/jelly/scene.gltf',
    function (result) {
        jelly = result.scene.children[0];
        jelly.castShadow = true;
        scene.add(jelly);
        jelly.scale.set(2, 2, 2);
        jelly.position.set(1000, 1000, 1000);
    }
);

let squidward;
let loader_squidward = new THREE.GLTFLoader().load(
    '3dmodel/squidward/scene.gltf',
    function (result) {
        squidward = result.scene.children[0];
        squidward.castShadow = true;
        scene.add(squidward);
        squidward.scale.set(2, 2, 2);
        squidward.position.set(1000, -3000, 1000);
    }
);

var light = new THREE.PointLight(0xffffff, 10, 100);
var helper = new THREE.PointLightHelper(light);
light.position.set(1000, 1000, 1000);
scene.add(light);
scene.add(helper);

function draw() {
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
    controls.update();
}

draw();