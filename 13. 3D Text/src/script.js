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
const scene = new THREE.Scene();

// Axis helper
const axisHelper = new THREE.AxisHelper();
scene.add(axisHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader();
fontLoader.load('/fonts/avenir-regular-pro.json', font => {
  console.log('Font loaded!');

  const textGeometry = new THREE.TextGeometry(
    'Hello Three.js',
    {
      font,
      size: 0.5,
      height: 0.2,
      cuverSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4
    }
  );

  // textGeometry.computeBoundingBox();
  // console.log(textGeometry.boundingBox);

  // textGeometry.translate(
  //   - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //   - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //   - (textGeometry.boundingBox.max.z - 0.03) * 0.5
  // );

  textGeometry.center();
  textGeometry.computeBoundingBox();
  console.log(textGeometry.boundingBox);

  const textMaterial = new THREE.MeshBasicMaterial();
  textMaterial.wireframe = true;
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  scene.add(textMesh);
})

/**
 * Object
 */

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
})

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

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()