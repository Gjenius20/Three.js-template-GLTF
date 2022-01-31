// declare the scene
let scene = new THREE.Scene();

//set the camera
let cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//make the renderer
let renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true,
});

//change the background color
scene.background = new THREE.Color(0xa9a9a9a);
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

//camera
cam.position.z = 7;
cam.position.y = 3;
document.body.appendChild(renderer.domElement);

//light
let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

let light = new THREE.PointLight(0xffffff, 20, 100);
light.position.set(0, 4, 0);
scene.add(light);
scene.add(new THREE.PointLightHelper(light, 0.1, 0xff0000));


// let directionalLight = new THREE.DirectionalLight({ color: 0xffffff, intensity: 100 });
// directionalLight.position.set(0, 1, 0);
// directionalLight.castShadow = true;
// scene.add(directionalLight);



//grid
let grid = new THREE.GridHelper(100, 100, 0xffffff);
grid.position.set(0, -0.5, 0);
scene.add(grid);

//gui
let campos = new Object();
campos.x = 1;
campos.y = 1;
campos.z = 2;

let gui = new dat.GUI();
gui.add(campos, "x", -20, 20, 0.01);
gui.add(campos, "y", -20, 20, 0.01);
gui.add(campos, "z", -20, 20, 0.01);

//objects
// let bGeo = new THREE.BoxGeometry(1, 1, 1);
// let bMat = new THREE.MeshPhongMaterial({
// 	color: 0x6fa8dc,
// 	wireframe: false,
// 	bumpMap: new THREE.TextureLoader().load("./src/br.jfif"),
// 	bumpScale: 1,
// });
// let cube = new THREE.Mesh(bGeo, bMat);
// cube.position.set(2, 0, 0);
// scene.add(cube);

// let bGeo2 = new THREE.BoxGeometry(1, 1, 1);
// let bMat2 = new THREE.MeshPhongMaterial({
// 	color: 0x00ff00,
// 	wireframe: false,
// });
// let cube2 = new THREE.Mesh(bGeo2, bMat2);
// cube2.position.set(-2, 0, 0);
// scene.add(cube2);

//load gltf model
let loader = new THREE.GLTFLoader();
loader.load("./src/model/scene.gltf", function (gltf) {

	let coffee = gltf.scene.children[0];
	coffee.scale.set(0.5, 0.5, 0.5);

	scene.add(gltf.scene);
	// scene.add(gltf.scene);
});

//animation
// let animate1 = gsap.to(cube2.position, { x: 5, z: 5, y: 3, duration: 7, paused: true });
// let animate2 = gsap.to(cube2.rotation, { z: 5, z: 5, duration: 7, paused: true });

// animate1.play();
// animate2.play();

// let t1 = gsap.timeline({ paused: true });
// t1.to(cube.position, { x: 5, duration: 1 });
// t1.to(cube.position, { y: 5, duration: 1 });
// t1.to(cube.position, { y: 5, duration: 1 });
// t1.to(cube.scale, { x: 5, y: 5, z: 5, duration: 0.7 });

// addEventListener("mousedown", function (e) {
// 	t1.play();
// });
// addEventListener("mouseup", function (e) {
// 	t1.reverse();
// });

//controls

let clock = new THREE.Clock();
let controls = new THREE.OrbitControls(cam, renderer.domElement);
// controls.enableDamping = true;

// let controls = new THREE.FirstPersonControls(cam, renderer.domElement);
// controls.lookSpeed = 0.1;

// let controls = new THREE.TrackballControls(cam, renderer.domElement);

//some functions
function drawScene() {
	light.position.set(campos.x, campos.y, campos.z);

	// cube.rotation.y += 0.01;
	// cube.scale.x += 0.01;
	// controls.update(clock.getDelta());
	renderer.render(scene, cam);
	requestAnimationFrame(drawScene);
}

drawScene();
