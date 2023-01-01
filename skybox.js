import * as THREE from './node_modules/three/build/three.module.js';
import { PointerLockControls } from './node_modules/three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(
   60,
   window.innerWidth / window.innerHeight,
   45,
   300000
);

scene.fog = new THREE.FogExp2(0x888888, 0.0003);

cam.position.set(1000, -4800, 0);

// cam.lookAt(new THREE.Vector3(0, -10000, 100));

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(cam, renderer.domElement);
// const controls = new THREE.FirstPersonControls(cam, renderer.domElement);
// controls.enabled = true;
// controls.activeLook = true;

// controls.lookSpeed = 0.8;
// controls.movementSpeed = 5;
// controls.minDistance = -5000;
// controls.maxDistance = 10000;

// ///////////////////////
// POINTER LOCK CONTROLS
// ///////////////////////
const controls = new PointerLockControls(cam, renderer.domElement);
const clock = new THREE.Clock();

const overlay = document.querySelector('#overlay');

overlay.addEventListener('click', function () {
   controls.lock();
});

controls.addEventListener('lock', function () {
   overlay.style.display = 'none';
});

controls.addEventListener('unlock', function () {
   overlay.style.display = 'flex';
});

const keyboard = [];
addEventListener('keydown', function (e) {
   keyboard[e.key] = true;
});

addEventListener('keyup', function (e) {
   keyboard[e.key] = false;
});

const speed = 10000;
const processKeyboard = function (delta) {
   if (!controls.isLocked) return;

   const actualSpeed = speed * delta;
   if (keyboard['w']) {
      controls.moveForward(actualSpeed);
   }
   if (keyboard['s']) {
      controls.moveForward(-actualSpeed);
   }
   if (keyboard['a']) {
      controls.moveRight(-actualSpeed);
   }
   if (keyboard['d']) {
      controls.moveRight(actualSpeed);
   }
};

//sky
const materialArray = [];
const texture_front = new THREE.TextureLoader().load(
   './assets/world/front.png'
);
const texture_back = new THREE.TextureLoader().load('./assets/world/back.png');
const texture_top = new THREE.TextureLoader().load('./assets/world/top.png');
const texture_bottom = new THREE.TextureLoader().load(
   './assets/world/bottom.jpg'
);
const texture_right = new THREE.TextureLoader().load(
   './assets/world/right.png'
);
const texture_left = new THREE.TextureLoader().load('./assets/world/left.png');

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_front }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_back }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_top }));
materialArray.push(new THREE.MeshPhongMaterial({ map: texture_bottom }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_right }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_left }));

for (let i = 0; i < 6; i++) {
   materialArray[i].side = THREE.BackSide;
}

let skyBoxGeo = new THREE.BoxGeometry(12000, 10600, 12000);
let skyBox = new THREE.Mesh(skyBoxGeo, materialArray);
scene.add(skyBox);

let jelly;
let loader_jelly = new GLTFLoader().load(
   '3dmodel/jelly/scene.gltf',
   function (result) {
      // console.log(result);
      jelly = result.scene.children[0];
      jelly.castShadow = true;
      scene.add(jelly);
      // jelly.scale.set(1, 2, 2);
      jelly.position.set(-1500, -3000, -3000);
   }
);

let squidwards;
let animSquidwards;
let mixerSquidwards;
let loader_squidwards = new GLTFLoader().load(
   // '3dmodel/squidwards/scene.gltf',
   '3dmodel/squidwards/scene.gltf',
   function (result) {
      // console.log(result);
      animSquidwards = result.animations;

      mixerSquidwards = new THREE.AnimationMixer(result.scene);
      let action1 = mixerSquidwards.clipAction(animSquidwards[0]);
      action1.play();

      squidwards = result.scene.children[0];
      squidwards.castShadow = true;

      scene.add(squidwards);
      squidwards.scale.set(1, 1, 1);
      squidwards.position.set(1000, -4950, -1000);
   }
);

// patrick ada 3 animasi
let patrick;
let animGangnam;
let mixerPatrick;
let loader_patrick = new GLTFLoader().load(
   '3dmodel/patrick.gltf',
   function (result) {
      // console.log(result);
      animGangnam = result.animations;

      mixerPatrick = new THREE.AnimationMixer(result.scene);
      let action2 = mixerPatrick.clipAction(animGangnam[1]);
      action2.play();

      patrick = result.scene.children[0];
      patrick.castShadow = true;

      scene.add(patrick);
      patrick.scale.set(600, 600, 600);
      patrick.position.set(-3300, -5200, -1000);
   }
);

// // fbx spongebob
// let mixer;
// const loader = new FBXLoader();
// loader.load('3dmodel/spongebob_models/spongbob_waving.fbx', function (object) {

//    console.log(object);
//    mixer = new THREE.AnimationMixer(object);

//    const action = mixer.clipAction(object.animations[0]);
//    action.play();

//    object.traverse(function (child) {

//       if (child.isMesh) {

//          child.castShadow = true;
//          child.receiveShadow = true;

//       }

//    });
//    scene.add(object);
//    object.scale.set(1000, 1000, 1000);
//    object.position.set(1000, -4950, -1000);
// });

// spongbob ada 4 animasi
let spongebob;
let animSpongebob;
let mixerSpongebob;
let loader_spongebob = new GLTFLoader().load(
   '3dmodel/spongebob.gltf',
   function (result) {
      animSpongebob = result.animations;

      mixerSpongebob = new THREE.AnimationMixer(result.scene);
      let action = mixerSpongebob.clipAction(animSpongebob[2]);
      action.play();

      spongebob = result.scene.children[0];
      spongebob.castShadow = true;
      scene.add(spongebob);
      spongebob.scale.set(400, 400, 400);
      spongebob.position.set(3000, -4700, -1000);
   }
);

let pattycar;
let loader_pattycar = new GLTFLoader().load(
   '3dmodel/patty_car/scene.gltf',
   function (result) {
      pattycar = result.scene.children[0];
      // scene.add(result.scene.children[0]);
      pattycar.castShadow = true;
      scene.add(pattycar);
      pattycar.scale.set(500, 500, 500);
      pattycar.position.set(3000, -4700, -1000);
   }
);

let komvlex;
let loader_komvlex = new GLTFLoader().load(
   '3dmodel/spongebob_environment/scene.gltf',
   function (result) {
      // console.log(result);
      komvlex = result.scene.children[0];
      komvlex.castShadow = true;
      komvlex.receiveShadow = true;
      scene.add(komvlex);
      komvlex.scale.set(1800, 1800, 2000);
      komvlex.position.set(500, -5500, -1000);
   }
);

let light1 = new THREE.PointLight();
light1.intensity = 2;
light1.position.set(0, -1500, -1000);
// light1.position.set(1000, -4800, -1000);
const helper1 = new THREE.PointLightHelper(light1, 0.04, 0xffff00);
// scene.add(helper1);
scene.add(light1);

const light = new THREE.PointLight(0xffffff, 10, 100);
const helper = new THREE.PointLightHelper(light, 100, 0xffff00);
light.position.set(1500, 1000, 1000);
light.intensity = 3;
// scene.add(light);
// scene.add(helper);
const light3 = new THREE.AmbientLight(0xffffff); // soft white light
light3.intensity = 1;
scene.add(light3);

const light2 = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
light2.intensity = 0.5;
// scene.add(light2);

function draw() {
   if (mixerPatrick) {
      mixerPatrick.update(clock.getDelta());
   }
   // if (mixerSpongebob) {
   //    mixerSpongebob.update(clock.getDelta());
   // }
   // if (mixerSquidwards) {
   //    mixerSquidwards.update(clock.getDelta());
   // }

   // if (mixer) {
   //    mixer.update(clock.getDelta());
   // }

   requestAnimationFrame(draw);
   renderer.render(scene, cam);
   processKeyboard(clock.getDelta());
}

draw();

addEventListener('resize', () => {
   cam.aspect = innerWidth / innerHeight;
   cam.updateProjectionMatrix();
   renderer.setSize(innerWidth, innerHeight);
});
