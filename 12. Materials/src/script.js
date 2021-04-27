import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.add('/textures/color.jpg');
const alphaColorTexture = textureLoader.add('/textures/alpha.jpg');
const ambientOcclusionColorTexture = textureLoader.add('/textures/ambientOcclusion.jpg');
const heightColorTexture = textureLoader.add('/textures/height.jpg');
const normalColorTexture = textureLoader.add('/textures/normal.jpg');
const metalnessColorTexture = textureLoader.add('/textures/metalness.jpg');
const roughnessColorTexture = textureLoader.add('/textures/roughness.jpg');
const matcapTexture = textureLoader.add('/textures/matcaps/1.png');
const gradientTexture = textureLoader.add('/textures/gradients/3.png');

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const material = new THREE.MeshBasicMaterial();

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material
);

sphere.position.x = -1.5;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  material
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.2, 16, 32),
  material
);

torus.position.x = 1.5;

scene.add(sphere, plane, torus);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Animate objects
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.2 * elapsedTime;
  plane.rotation.x = 0.2 * elapsedTime;
  torus.rotation.x = 0.2 * elapsedTime;

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()