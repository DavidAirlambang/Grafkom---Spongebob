const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
   45,
   window.innerWidth / window.innerHeight,
   1,
   1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const controls = new THREE.OrbitControls(camera, renderer.domElement);
const clock = new THREE.Clock();
const controls = new THREE.FirstPersonControls(camera, renderer.domElement);
controls.lookSpeed = 0.2;
controls.movementSpeed = 1;

camera.position.z = 20;
camera.position.y = 10;
// camera.position.set(0, 100, 100);
// controls.update();

let jelly;
let loader_jelly = new THREE.GLTFLoader().load(
   '3dmodel/jelly/scene.gltf',
   function (result) {
      jelly = result.scene.children[0];
      jelly.castShadow = true;
      scene.add(jelly);
      jelly.scale.set(0.02, 0.02, 0.02);
      jelly.position.set(1, 12, 2);
   }
);

// let patrick_house;
// let loader_patrick_house = new THREE.GLTFLoader().load(
//    '3dmodel/patrick_house/scene.gltf',
//    function (result) {
//       patrick_house = result.scene.children[0];
//       patrick_house.castShadow = true;
//       scene.add(patrick_house);
//       patrick_house.scale.set(0.02, 0.02, 0.02);
//       patrick_house.position.set(1, 10, 1);
//    }
// );

let patty;
let loader_patty = new THREE.GLTFLoader().load(
   '3dmodel/patty/scene.gltf',
   function (result) {
      patty = result.scene.children[0];
      patty.castShadow = true;
      scene.add(patty);
      patty.scale.set(0.02, 0.02, 0.02);
      patty.position.set(-3, 5, 2);
   }
);

let spongebob;
let loader_spongebob = new THREE.GLTFLoader().load(
   '3dmodel/spongebob/scene.gltf',
   function (result) {
      spongebob = result.scene.children[0];
      spongebob.castShadow = true;
      scene.add(spongebob);
      spongebob.scale.set(0.02, 0.02, 0.02);
      spongebob.position.set(1, 10, 1);
   }
);

let squidward;
let loader_squidward = new THREE.GLTFLoader().load(
   '3dmodel/squidward/scene.gltf',
   function (result) {
      squidward = result.scene.children[0];
      squidward.castShadow = true;
      scene.add(squidward);
      squidward.scale.set(0.02, 0.02, 0.02);
      squidward.position.set(5, 11, 3);
   }
);

// let spongebob_house;
// let loader_spongebob_house = new THREE.GLTFLoader().load(
//    '3dmodel/spongebob_house/scene.gltf',
//    function (result) {
//       spongebob_house = result.scene.children[0];
//       spongebob_house.castShadow = true;
//       scene.add(spongebob_house);
//       spongebob_house.scale.set(0.02, 0.02, 0.02);
//       spongebob_house.position.set(-10, 2, 1);
//    }
// );

let squidwards_house;
let loader_squidwards_house = new THREE.GLTFLoader().load(
   '3dmodel/squidwards_house/scene.gltf',
   function (result) {
      squidwards_house = result.scene.children[0];
      squidwards_house.castShadow = true;
      scene.add(squidwards_house);
      squidwards_house.scale.set(0.08, 0.08, 0.1);
      squidwards_house.position.set(1, 0, -8);
   }
);

const geometry2 = new THREE.CylinderGeometry(20, 20, 1, 32);
const material2 = new THREE.MeshBasicMaterial({
   color: 0x44ff44,
   // map: grass_texture,
});
const base = new THREE.Mesh(geometry2, material2);
scene.add(base);

// Tambahkan light ke dalam scene
const light = new THREE.PointLight(0xffffff, 10, 100);
light.position.set(0, 50, 50);
scene.add(light);

// Tambahkan camera ke dalam scene
camera.position.z = 100;
scene.add(camera);

// Render scene
function draw() {
   // if (jelly) {
   //    jelly.rotation.y += 0.01;
   // }

   controls.update(clock.getDelta());
   requestAnimationFrame(draw);
   renderer.render(scene, camera);
}
draw();
