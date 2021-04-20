import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: 800,
  height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const clock = new THREE.Clock();

// Animations
const tick = () => {
  /*
    The FPS of each computer are different so we need to normalize a value to animate items
    We can't do something like:

    mesh.rotation.y += 1;
  */
  const elapsedTime = clock.getElapsedTime();

  mesh.rotation.y = elapsedTime * 2 * Math.PI;

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick);
};

tick();