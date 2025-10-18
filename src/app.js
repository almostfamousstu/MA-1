import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const appContainer = document.getElementById('app');

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(appContainer.clientWidth, appContainer.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
appContainer.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(
  50,
  appContainer.clientWidth / appContainer.clientHeight,
  0.1,
  1000
);

camera.position.set(0, 2, 8);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const ambientLight = new THREE.AmbientLight(0xcfd8ff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xaed7ff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

const geometry = new THREE.IcosahedronGeometry(1.5, 2);
const material = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0x89a6ff),
  emissive: new THREE.Color(0x1a2a7a),
  metalness: 0.3,
  roughness: 0.2,
  transparent: true,
  opacity: 0.85,
});

const placeholderOrb = new THREE.Mesh(geometry, material);
placeholderOrb.rotation.set(Math.PI / 5, Math.PI / 9, 0);
scene.add(placeholderOrb);

const resizeRenderer = () => {
  const { clientWidth, clientHeight } = appContainer;
  renderer.setSize(clientWidth, clientHeight);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
};

window.addEventListener('resize', resizeRenderer);

const clock = new THREE.Clock();

const render = () => {
  const elapsed = clock.getElapsedTime();
  placeholderOrb.rotation.y = elapsed * 0.1;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();
