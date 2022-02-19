import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'


const gltfLoader = new GLTFLoader();




// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// var fogColor = new THREE.Color(0x484848);
 
// scene.background = fogColor;
// scene.fog = new THREE.Fog(fogColor, 0.0025, 20);



//our object
gltfLoader.load('finalModel1.gltf', (gltf)=>{
    gltf.scene.scale.set(0.4,0.4,0.4)
    // gltf.scene.rotate.y =54;
    scene.add(gltf.scene)
})



const intensity = 1

// Lights

const pointLight = new THREE.PointLight(0xffffff, intensity)  // x +ve
pointLight.position.set(3,0,0)
scene.add(pointLight)

const pointLight1 = new THREE.PointLight(0xffffff, intensity) // x -ve
pointLight1.position.set(-3,0,0)
scene.add(pointLight1)

const pointLight2 = new THREE.PointLight(0xffffff, intensity) //z +ve
pointLight2.position.set(0,0,3)
scene.add(pointLight2)

const pointLight2_1 = new THREE.PointLight(0xffffff, intensity) //z -ve
pointLight2_1.position.set(0,0,-3)
scene.add(pointLight2_1)

const pointLight3 = new THREE.PointLight(0xffffff, intensity) //y +ve
pointLight3.position.set(0,3,0)
scene.add(pointLight3)

const pointLight3_1 = new THREE.PointLight(0xffffff, intensity) //y -ve
pointLight3_1.position.set(0,-3,0)
scene.add(pointLight3_1)


//ambient properties
const AP={
    AmbientIntensity:2,
    blue:0x1829FF,
    purple:0x9330FD,
    pink:0xDB2AFF,

}


const pointLight4 = new THREE.DirectionalLight(AP.blue, AP.AmbientIntensity) 
pointLight4.position.set(3,3,3)
scene.add(pointLight4)

const pointLight5 = new THREE.DirectionalLight(AP.purple, AP.AmbientIntensity) 
pointLight5.position.set(-3,3,3)
scene.add(pointLight5)

const pointLight7 = new THREE.DirectionalLight(AP.blue, AP.AmbientIntensity) 
pointLight7.position.set(-3,3,-3)
scene.add(pointLight7)

const pointLight8 = new THREE.DirectionalLight(AP.purple, AP.AmbientIntensity) 
pointLight8.position.set(3,3,-3)
scene.add(pointLight8)

const pointLight9 = new THREE.DirectionalLight(AP.pink, AP.AmbientIntensity) 
pointLight9.position.set(3,-3,-3)
scene.add(pointLight9)

const pointLight10 = new THREE.DirectionalLight(AP.blue, AP.AmbientIntensity) 
pointLight10.position.set(3,-3,3)
scene.add(pointLight10)

const pointLight11 = new THREE.DirectionalLight(AP.pink, AP.AmbientIntensity) 
pointLight11.position.set(-3,-3,3)
scene.add(pointLight11)

const pointLight6 = new THREE.DirectionalLight(AP.purple, AP.AmbientIntensity) 
pointLight6.position.set(-3,-3,-3)
scene.add(pointLight6)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    camera.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()