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
  // Clock
  const elapsedTime = clock.getElapsedTime();

  // Update position 1
  // mesh.rotation.y = elapsedTime * 2 * Math.PI;

  // Update position 2
  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.x = Math.cos(elapsedTime);

  // Update position 3
  // camera.position.y = Math.sin(elapsedTime);
  // camera.position.x = Math.cos(elapsedTime);
  // camera.lookAt(mesh.position);

  // Render
  renderer.render(scene, camera)

  // Next call
  window.requestAnimationFrame(tick);
};

tick();