// Main JavaScript file for the low-poly 3D model viewer.
// Place your downloaded .glb file in the assets folder and update MODEL_PATH below.

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const MODEL_PATH = "./assets/model.glb";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#f4f6f8");

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(3, 2, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.HemisphereLight(0xffffff, 0x667080, 2);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 2);
keyLight.position.set(4, 6, 5);
scene.add(keyLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const loader = new GLTFLoader();
loader.load(
  MODEL_PATH,
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Center the model and set a useful viewing distance.
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    const size = box.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    camera.position.set(maxDimension * 1.8, maxDimension * 1.2, maxDimension * 2.2);
    camera.near = Math.max(maxDimension / 100, 0.01);
    camera.far = maxDimension * 100;
    camera.updateProjectionMatrix();
    controls.target.set(0, 0, 0);
    controls.update();
  },
  undefined,
  (error) => {
    console.error("Model gagal dimuat. Pastikan file tersedia di:", MODEL_PATH, error);
    const message = document.createElement("p");
    message.className = "error-message";
    message.textContent = "Model tidak ditemukan. Letakkan file GLB di assets/model.glb.";
    document.body.appendChild(message);
  }
);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
