
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Simpan model di public/assets/model.glb
const MODEL_PATH = "/assets/model.glb";

// Membuat scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#f4f6f8");

// Kamera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
camera.position.set(3, 2, 4);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor("#f4f6f8");

document.body.appendChild(renderer.domElement);

// Pencahayaan
scene.add(new THREE.HemisphereLight(0xffffff, 0x667080, 2));

const keyLight = new THREE.DirectionalLight(0xffffff, 2);
keyLight.position.set(4, 6, 5);
scene.add(keyLight);

// Kontrol kamera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0);

// Pesan status
const message = document.createElement("div");
message.style.cssText = `
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  padding: 12px 18px;
  background: white;
  color: #333;
  border-radius: 8px;
  font: 14px Arial, sans-serif;
  box-shadow: 0 2px 10px #0002;
  max-width: 85%;
  text-align: center;
`;
message.textContent = "Memuat model 3D...";
document.body.appendChild(message);

// Memuat model GLB
const loader = new GLTFLoader();

loader.load(
  MODEL_PATH,

  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Menghitung ukuran dan titik tengah model
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    model.position.sub(center);

    // Mengatur kamera berdasarkan ukuran model
    const maxDimension = Math.max(size.x, size.y, size.z);

    if (maxDimension > 0) {
      const distance =
        (maxDimension / 2) /
        Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));

      camera.position.set(
        distance * 1.3,
        distance * 0.8,
        distance * 1.5
      );

      camera.near = Math.max(maxDimension / 1000, 0.001);
      camera.far = maxDimension * 100;
      camera.updateProjectionMatrix();
    }

    controls.target.set(0, 0, 0);
    controls.update();

    message.textContent = "Model berhasil dimuat";
    message.style.color = "#16803c";

    setTimeout(() => message.remove(), 2000);

    console.log("Model berhasil dimuat:", MODEL_PATH);
  },

  (event) => {
    if (event.total > 0) {
      const progress = Math.round(
        (event.loaded / event.total) * 100
      );
      message.textContent = `Memuat model 3D... ${progress}%`;
    }
  },

  (error) => {
    console.error("Gagal memuat model:", MODEL_PATH, error);

    message.textContent =
      "Model gagal dimuat. Periksa file public/assets/model.glb.";
    message.style.color = "#dc2626";
  }
);

// Responsif saat ukuran layar berubah
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animasi
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
