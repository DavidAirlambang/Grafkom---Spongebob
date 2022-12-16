const scene = new THREE.Scene();
// const kanvas = document.querySelector("#mycanvas");

// console.log(kanvas);
const cam = new THREE.PerspectiveCamera(
   45,
   window.innerWidth / window.innerHeight,
   1,
   1000
);
// const cam = new THREE.PerspectiveCamera(45, kanvas.width/kanvas.height,1,1000);

cam.position.z = 20;
cam.position.y = 1;

const renderer = new THREE.WebGLRenderer();
// const renderer = new THREE.WebGLRenderer({canvas:kanvas});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); //menambahkan canvas ke dalam body html saya

//mesh -> sebuah benda 3D
//mesh -> geometry + material
// let geo = new THREE.BoxGeometry(1,1,1);
// let mat = new THREE.MeshBasicMaterial({color:0xff0000 , wireframe : true});
// let cube = new THREE.Mesh(geo,mat);

// cube.position.x =0;
// scene.add(cube);

// const pointlight = new THREE.PointLight(0xff0000, 1, 50);
// pointlight.position.set(0, 3, 2);
// scene.add(pointlight);
// scene.add(new THREE.PointLightHelper(pointlight, 1, 0x00ff00));

const grass_texture = new THREE.TextureLoader().load('./texture/grass.jpg');
const rock_texture = new THREE.TextureLoader().load('./texture/rock.jpg');
const sun_texture = new THREE.TextureLoader().load('./texture/sun.jpg');

const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0xff99ff });
const cube = new THREE.Mesh(geometry1, material1);
// scene.add(cube);

const geometry2 = new THREE.CylinderGeometry(6, 6, 0.5, 32);
const material2 = new THREE.MeshBasicMaterial({
   color: 0x44ff44,
   map: grass_texture,
});
const base = new THREE.Mesh(geometry2, material2);
scene.add(base);

const geometry3 = new THREE.ConeGeometry(3, 2, 32);
const material3 = new THREE.MeshBasicMaterial({
   color: 0x33cc44,
   map: grass_texture,
});
const cone1 = new THREE.Mesh(geometry3, material3);
scene.add(cone1);

const geometry4 = new THREE.ConeGeometry(4, 2, 32);
const material4 = new THREE.MeshBasicMaterial({
   color: 0xffffff,
   map: rock_texture,
});
const cone2 = new THREE.Mesh(geometry4, material4);
scene.add(cone2);

const geometry5 = new THREE.SphereGeometry(1, 32, 16);
const material5 = new THREE.MeshBasicMaterial({
   color: 0xffff00,
   map: sun_texture,
});
const sun = new THREE.Mesh(geometry5, material5);
scene.add(sun);

let jelly;
let loader_jelly = new THREE.GLTFLoader();
loader_jelly.load('3dmodel/jelly/scene.gltf', function (result) {
   jelly = result.scene.children[0];
   jelly.castShadow = true;
   scene.add(jelly);
});

cube.position.y = 3;
// base.position.x = -3;
// base.rotation.x = 0.5;
cone1.position.y = 0.8;
cone1.position.x = 2;
cone1.position.z = -2;
cone2.position.y = 0.8;
cone2.position.x = -2;
cone2.position.z = -1;
sun.position.y = 2;

function draw() {
   // cube.rotation.x += 0.01;
   // base.rotation.x += 0.01;
   // cam.rotation.y += 0.01;
   // cam.rotation.z += 0.01;

   renderer.render(scene, cam);
   requestAnimationFrame(draw);
}

draw();
