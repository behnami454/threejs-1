import './style.css'
import * as THREE from 'three'
import {
	OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js'
import {
	GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'
//gltfloader
const gltfLoader = new GLTFLoader()
// Debug
const gui = new dat.GUI()
// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene();
// Objects
//3d planet
var model;
gltfLoader.load('scene.gltf', (gltf) => {
	gltf.scene.scale.set(33, 33, 32)
	gltf.scene.rotation.set(0, 0, 2)
	gltf.scene.position.set(0, 0.42, 0)
	model = gltf.scene
	scene.add(gltf.scene)
})
// end of 3d planet
// Materials
// Mesh
// Lights
const pointLight = new THREE.PointLight(0xffffff, -10)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
const light = new THREE.AmbientLight(0xffffff, 20); // soft white light
scene.add(light);
/**
 * 
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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableZoom = false;
// controls.enableDamping = true
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
	const elapsedTime = clock.getElapsedTime()
	// Update objects
	// Update Orbital Controls
	// controls.update()
	if (model) {
		model.rotation.y += 0.01;
	}
	// Render
	renderer.render(scene, camera)
	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}
tick()