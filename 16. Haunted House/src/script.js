import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * House
 */
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 3, 4),
  new THREE.MeshStandardMaterial({ color: '#ac8e82' })
)
walls.position.y = 3 / 2;
house.add(walls);

// Hall
// const hall = new THREE.Mesh(
//   new THREE.BoxGeometry(2.5, 2.5, 0.75),
//   new THREE.MeshStandardMaterial({ color: '#ac8e82' })
// )
// hall.position.y = 2.5 / 2;
// hall.position.z = 4 / 2 + 0.75 / 2;
// house.add(hall);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 2, 32, 32),
  new THREE.MeshStandardMaterial({ color: '#aa7b7b' })
)
door.position.y = 2 / 2;
door.position.z = 4 / 2 + 0.01;
// door.position.z = 4 / 2 + 0.75 + 0.01;
house.add(door);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({ color: '#b35f45' })
);
roof.position.y = 1.5 / 2 + 3;
roof.rotation.y = Math.PI / 4;
house.add(roof);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 32, 32);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.55, 0.55, 0.55);
bush1.position.set(1.1, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.7, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.9, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial);
bush5.scale.set(0.3, 0.3, 0.3);
bush5.position.set(-1.4, 0.1, 2.1);

house.add(bush1, bush2, bush3, bush4, bush5);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });
const crossVerticalGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
const crossHorizontalGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.3);

// Adds crosses
for (let i = 0; i < 25; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 4 + Math.random() * 5.5;
  const x = Math.sin(angle) * radius;
  const y = 0.3 + Math.random() * 0.2;
  const z = Math.cos(angle) * radius;

  const crossPart1 = new THREE.Mesh(crossVerticalGeometry, graveMaterial);
  const crossPart2 = new THREE.Mesh(crossHorizontalGeometry, graveMaterial);
  crossPart2.position.y = 0.1;

  const cross = new THREE.Group();
  cross.position.set(x, y, z);
  cross.rotation.y = (Math.random() - 0.5) * 0.4;
  cross.rotation.z = (Math.random() - 0.5) * 0.4;
  cross.add(crossPart1, crossPart2);

  graves.add(cross);
}

// Adds graves
for (let i = 0; i < 35; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 4 + Math.random() * 5.5;
  const x = Math.sin(angle) * radius;
  const y = 0.3 + Math.random() * 0.1;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(
    graveGeometry,
    graveMaterial
  );
  grave.position.set(x, y, z);
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;

  graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: '#a9c388' })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.5)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 12;
camera.position.y = 10;
camera.position.z = 15;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
}

tick();