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
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xcfd8ff, 0.55);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xaed7ff, 0.9);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

const orbGeometry = new THREE.IcosahedronGeometry(1.5, 2);
const orbMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0x7b8bff),
  emissive: new THREE.Color(0x1a2a7a),
  metalness: 0.35,
  roughness: 0.25,
  transparent: true,
  opacity: 0.9,
});
const placeholderOrb = new THREE.Mesh(orbGeometry, orbMaterial);
placeholderOrb.rotation.set(Math.PI / 5, Math.PI / 9, 0);
scene.add(placeholderOrb);

const quarterData = [
  {
    name: 'North Rise',
    color: 0x7ac4ff,
    accent: '#d8f1ff',
    description: 'Discovery initiatives and exploratory research.',
    panels: [
      { title: 'Deep Research', body: 'Embed teams into unknown territories to surface opportunities.' },
      { title: 'Signals', body: 'Instrument our systems to capture emergent market and tech signals.' },
      { title: 'Foresight', body: 'Model future states to guide long-horizon planning.' },
      { title: 'Allies', body: 'Forge partnerships with frontier organizations to co-create.' },
    ],
  },
  {
    name: 'East Pulse',
    color: 0x7a9fff,
    accent: '#e2e8ff',
    description: 'Growth acceleration and ecosystem pulse.',
    panels: [
      { title: 'Growth Labs', body: 'Launch experiments that can scale to new customer cohorts.' },
      { title: 'Ecosystem', body: 'Nurture developer and partner network to expand reach.' },
      { title: 'Narrative', body: 'Broadcast our momentum through crafted storytelling.' },
      { title: 'Momentum', body: 'Operationalize learnings for sustained velocity.' },
    ],
  },
  {
    name: 'South Forge',
    color: 0x9c7aff,
    accent: '#f1d9ff',
    description: 'Execution, delivery, and platform stability.',
    panels: [
      { title: 'Reliability', body: 'Elevate platform rigor through resilient architectures.' },
      { title: 'Release', body: 'Deliver quarterly drops with clear value articulation.' },
      { title: 'Craft', body: 'Polish the experience with obsessive care to detail.' },
      { title: 'Enablement', body: 'Equip teams with tooling for shipping confidently.' },
    ],
  },
  {
    name: 'West Flow',
    color: 0x7affdd,
    accent: '#d7fff3',
    description: 'Systems, rituals, and team thriving.',
    panels: [
      { title: 'Rhythms', body: 'Curate ceremonies that keep teams aligned and inspired.' },
      { title: 'Capability', body: 'Invest in learning tracks that deepen craft mastery.' },
      { title: 'Wellbeing', body: 'Design practices that sustain the energy of the crew.' },
      { title: 'Intelligence', body: 'Continuously sense feedback loops to refine our path.' },
    ],
  },
];

const quarterGroup = new THREE.Group();
scene.add(quarterGroup);

const quarterMeshes = [];
const baseRadius = 3.2;
const wedgeThickness = 0.35;

quarterData.forEach((quarter, index) => {
  const thetaStart = index * (Math.PI / 2);
  const geometry = new THREE.CylinderGeometry(
    baseRadius,
    baseRadius,
    wedgeThickness,
    48,
    1,
    true,
    thetaStart,
    Math.PI / 2
  );

  const material = new THREE.MeshStandardMaterial({
    color: quarter.color,
    emissive: new THREE.Color(quarter.color).multiplyScalar(0.1),
    metalness: 0.4,
    roughness: 0.3,
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide,
  });
  material.emissiveIntensity = 1;

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI / 2;
  mesh.position.y = -0.2;
  mesh.userData = { index };
  quarterGroup.add(mesh);
  quarterMeshes.push(mesh);
});

const resizeRenderer = () => {
  const { clientWidth, clientHeight } = appContainer;
  renderer.setSize(clientWidth, clientHeight);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
};

window.addEventListener('resize', resizeRenderer);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

let hoveredQuarter = null;
let activeQuarterIndex = null;

const uiGroup = new THREE.Group();
uiGroup.position.set(0, 0, -4.5);
camera.add(uiGroup);

const carouselGroup = new THREE.Group();
uiGroup.add(carouselGroup);
carouselGroup.visible = false;

const titleCanvas = document.createElement('canvas');
titleCanvas.width = 1024;
titleCanvas.height = 256;
const titleContext = titleCanvas.getContext('2d');

const createTextTexture = (title, subtitle, accent) => {
  titleContext.clearRect(0, 0, titleCanvas.width, titleCanvas.height);
  const gradient = titleContext.createLinearGradient(0, 0, titleCanvas.width, titleCanvas.height);
  gradient.addColorStop(0, 'rgba(15, 24, 54, 0.8)');
  gradient.addColorStop(1, 'rgba(4, 9, 26, 0.95)');
  titleContext.fillStyle = gradient;
  titleContext.fillRect(0, 0, titleCanvas.width, titleCanvas.height);

  titleContext.fillStyle = accent;
  titleContext.font = '600 72px Montserrat';
  titleContext.textBaseline = 'top';
  titleContext.fillText(title, 60, 60);

  titleContext.fillStyle = '#d2dcff';
  titleContext.font = '300 34px Montserrat';
  const lines = wrapText(subtitle, 70);
  lines.forEach((line, i) => {
    titleContext.fillText(line, 60, 150 + i * 42);
  });

  const texture = new THREE.CanvasTexture(titleCanvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const wrapText = (text, maxCharsPerLine) => {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  words.forEach((word) => {
    const testLine = currentLine.length ? `${currentLine} ${word}` : word;
    if (testLine.length > maxCharsPerLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
};

const panelGeometry = new THREE.PlaneGeometry(1.5, 2.1, 32, 32);
const panelMeshes = [];
const panelShaderRefs = [null, null, null, null];

const panelGroup = new THREE.Group();
carouselGroup.add(panelGroup);
const panelScrollBound = 2.4;

const panelCanvas = document.createElement('canvas');
panelCanvas.width = 768;
panelCanvas.height = 1024;
const panelContext = panelCanvas.getContext('2d');

const createPanelTexture = (panel, accent) => {
  panelContext.clearRect(0, 0, panelCanvas.width, panelCanvas.height);
  const gradient = panelContext.createLinearGradient(0, 0, panelCanvas.width, panelCanvas.height);
  gradient.addColorStop(0, 'rgba(12, 18, 40, 0.95)');
  gradient.addColorStop(1, 'rgba(7, 11, 25, 0.98)');
  panelContext.fillStyle = gradient;
  panelContext.fillRect(0, 0, panelCanvas.width, panelCanvas.height);

  panelContext.fillStyle = accent;
  panelContext.fillRect(60, 100, 120, 6);

  panelContext.fillStyle = '#eff4ff';
  panelContext.font = '600 60px Montserrat';
  panelContext.textBaseline = 'top';
  panelContext.fillText(panel.title, 60, 140);

  panelContext.fillStyle = '#c5d0ff';
  panelContext.font = '300 36px Montserrat';
  const lines = wrapText(panel.body, 32);
  lines.forEach((line, i) => {
    panelContext.fillText(line, 60, 260 + i * 48);
  });

  const texture = new THREE.CanvasTexture(panelCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
};

const createPanelMaterial = (texture) => {
  const uniforms = {
    uTime: { value: 0 },
    uTexture: { value: texture },
    uHover: { value: 0 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform float uHover;
      varying vec2 vUv;

      void main() {
        vec2 center = vec2(0.5);
        vec2 dir = vUv - center;
        float dist = length(dir);
        float ripple = sin(dist * 18.0 - uTime * 2.5);
        float strength = 0.006 + uHover * 0.01;
        vec2 rippleUv = vUv + normalize(dir + 0.0001) * ripple * strength;
        vec4 baseColor = texture2D(uTexture, rippleUv);
        float vignette = smoothstep(0.9, 0.25, dist);
        vec3 glow = mix(baseColor.rgb, baseColor.rgb * 1.2, uHover);
        gl_FragColor = vec4(glow * vignette, baseColor.a);
      }
    `,
    transparent: true,
  });
  return { material, uniforms };
};

const createHeaderMaterial = (texture) => {
  const uniforms = {
    uTime: { value: 0 },
    uTexture: { value: texture },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        vec2 center = vec2(0.5, 0.6);
        vec2 dir = vUv - center;
        float dist = length(dir);
        float ripple = sin(dist * 12.0 - uTime * 2.0);
        vec2 rippleUv = vUv + normalize(dir + 0.0001) * ripple * 0.004;
        vec4 base = texture2D(uTexture, rippleUv);
        float sheen = 0.15 * sin((vUv.x + vUv.y) * 12.0 + uTime * 1.5);
        gl_FragColor = vec4(base.rgb + sheen, base.a);
      }
    `,
    transparent: true,
  });
  headerUniforms = uniforms;
  return material;
};

for (let i = 0; i < 4; i += 1) {
  const mesh = new THREE.Mesh(panelGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff }));
  mesh.position.set((i - 1.5) * 1.8, 0, 0);
  mesh.userData = { type: 'panel', index: i };
  panelGroup.add(mesh);
  panelMeshes.push(mesh);
}

const buttonGeometry = new THREE.PlaneGeometry(0.9, 0.9, 32, 32);
const buttonMeshes = [];
const buttonUniforms = [];

const buttonCanvas = document.createElement('canvas');
buttonCanvas.width = 512;
buttonCanvas.height = 512;
const buttonContext = buttonCanvas.getContext('2d');

const createButtonTexture = (label) => {
  buttonContext.clearRect(0, 0, buttonCanvas.width, buttonCanvas.height);
  const gradient = buttonContext.createRadialGradient(256, 256, 60, 256, 256, 256);
  gradient.addColorStop(0, 'rgba(16, 28, 58, 0.95)');
  gradient.addColorStop(1, 'rgba(5, 12, 26, 0.98)');
  buttonContext.fillStyle = gradient;
  buttonContext.beginPath();
  buttonContext.arc(256, 256, 240, 0, Math.PI * 2);
  buttonContext.fill();

  buttonContext.fillStyle = '#e7edff';
  buttonContext.font = '600 120px Montserrat';
  buttonContext.textAlign = 'center';
  buttonContext.textBaseline = 'middle';
  buttonContext.fillText(label, 256, 256);

  const texture = new THREE.CanvasTexture(buttonCanvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const createButtonMaterial = (texture) => {
  const uniforms = {
    uTime: { value: 0 },
    uTexture: { value: texture },
    uHover: { value: 0 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform float uHover;
      varying vec2 vUv;

      void main() {
        vec2 center = vec2(0.5);
        vec2 dir = vUv - center;
        float dist = length(dir);
        float ripple = sin(14.0 * dist - uTime * 3.0);
        float strength = 0.004 + uHover * 0.012;
        vec2 rippleUv = vUv + normalize(dir + 0.0001) * ripple * strength;
        vec4 color = texture2D(uTexture, rippleUv);
        float edge = smoothstep(0.48, 0.35, dist);
        color.rgb += vec3(0.12) * edge;
        color.rgb = mix(color.rgb, color.rgb * 1.25, uHover);
        gl_FragColor = vec4(color.rgb, color.a * edge);
      }
    `,
    transparent: true,
  });
  const index = buttonUniforms.push(uniforms) - 1;
  return { material, index };
};

const backButtonMaterial = createButtonMaterial(createButtonTexture('<'));
const backButton = new THREE.Mesh(buttonGeometry, backButtonMaterial.material);
backButton.position.set(-2.6, -1.6, 0);
backButton.userData = { type: 'button', action: 'prev', uniformIndex: backButtonMaterial.index };
carouselGroup.add(backButton);
buttonMeshes.push(backButton);

const nextButtonMaterial = createButtonMaterial(createButtonTexture('>'));
const nextButton = new THREE.Mesh(buttonGeometry, nextButtonMaterial.material);
nextButton.position.set(2.6, -1.6, 0);
nextButton.userData = { type: 'button', action: 'next', uniformIndex: nextButtonMaterial.index };
carouselGroup.add(nextButton);
buttonMeshes.push(nextButton);

const headerGeometry = new THREE.PlaneGeometry(3.2, 1.0, 32, 32);
const headerMesh = new THREE.Mesh(headerGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff }));
headerMesh.position.set(0, 1.95, 0);
carouselGroup.add(headerMesh);

let headerUniforms = null;

let isDragging = false;
let dragStartX = 0;
let dragStartGroupX = 0;

const onPointerMove = (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const intersectables = carouselGroup.visible
    ? [...panelMeshes, ...buttonMeshes, headerMesh]
    : quarterMeshes;

  const intersects = raycaster.intersectObjects(intersectables, false);

  if (carouselGroup.visible) {
    panelShaderRefs.forEach((ref) => {
      if (ref) {
        ref.uniforms.uHover.value = 0;
      }
    });
    buttonUniforms.forEach((uniform) => {
      uniform.uHover.value = 0;
    });
  }

  if (intersects.length > 0) {
    const first = intersects[0].object;
    if (carouselGroup.visible) {
      if (first.userData.type === 'panel') {
        const ref = panelShaderRefs[first.userData.index];
        if (ref) {
          ref.uniforms.uHover.value = 1;
        }
      }
      if (first.userData.type === 'button') {
        const uniform = buttonUniforms[first.userData.uniformIndex];
        if (uniform) {
          uniform.uHover.value = 1;
        }
      }
    } else {
      const mesh = first;
      if (hoveredQuarter && hoveredQuarter !== mesh) {
        hoveredQuarter.material.emissiveIntensity = 1;
        hoveredQuarter.material.opacity = 0.75;
      }
      hoveredQuarter = mesh;
      hoveredQuarter.material.emissiveIntensity = 2;
      hoveredQuarter.material.opacity = 0.95;
    }
  } else if (!carouselGroup.visible) {
    if (hoveredQuarter) {
      hoveredQuarter.material.emissiveIntensity = 1;
      hoveredQuarter.material.opacity = 0.75;
      hoveredQuarter = null;
    }
  }

  if (isDragging) {
    const deltaX = ((event.clientX - dragStartX) / appContainer.clientWidth) * 8;
    panelGroup.position.x = THREE.MathUtils.clamp(
      dragStartGroupX + deltaX,
      -panelScrollBound,
      panelScrollBound
    );
  }
};

const onPointerDown = (event) => {
  if (!carouselGroup.visible) {
    return;
  }
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(panelMeshes, false);
  if (!intersects.length) {
    return;
  }
  isDragging = true;
  dragStartX = event.clientX;
  dragStartGroupX = panelGroup.position.x;
};

const onPointerUp = () => {
  isDragging = false;
};

const selectQuarter = (index) => {
  activeQuarterIndex = index;
  quarterMeshes.forEach((mesh, idx) => {
    mesh.material.emissiveIntensity = idx === index ? 2.5 : 1;
    mesh.material.opacity = idx === index ? 0.95 : 0.7;
  });

  const quarter = quarterData[index];
  const headerTexture = createTextTexture(quarter.name, quarter.description, quarter.accent);
  if (headerUniforms && headerUniforms.uTexture.value) {
    headerUniforms.uTexture.value.dispose();
  }
  headerMesh.material.dispose();
  headerMesh.material = createHeaderMaterial(headerTexture);

  quarter.panels.forEach((panel, i) => {
    const texture = createPanelTexture(panel, quarter.accent);
    const existing = panelShaderRefs[i];
    if (!existing) {
      const { material, uniforms } = createPanelMaterial(texture);
      panelMeshes[i].material.dispose();
      panelMeshes[i].material = material;
      uniforms.uHover.value = 0;
      panelShaderRefs[i] = { material, uniforms };
    } else {
      const prevTexture = existing.uniforms.uTexture.value;
      if (prevTexture && prevTexture.dispose) {
        prevTexture.dispose();
      }
      existing.uniforms.uTexture.value = texture;
      existing.uniforms.uHover.value = 0;
    }
  });

  panelGroup.position.x = 0;
  buttonUniforms.forEach((uniform) => {
    uniform.uHover.value = 0;
  });
  isDragging = false;
};

const showCarouselForQuarter = (index) => {
  if (!carouselGroup.visible) {
    carouselGroup.visible = true;
  }
  if (hoveredQuarter) {
    hoveredQuarter.material.emissiveIntensity = 1;
    hoveredQuarter.material.opacity = 0.75;
    hoveredQuarter = null;
  }
  selectQuarter(index);
};

const onClick = (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  const intersectables = carouselGroup.visible
    ? [...panelMeshes, ...buttonMeshes, headerMesh]
    : quarterMeshes;

  const intersects = raycaster.intersectObjects(intersectables, false);
  if (!intersects.length) {
    return;
  }
  const first = intersects[0].object;

  if (!carouselGroup.visible) {
    const index = first.userData.index;
    showCarouselForQuarter(index);
  } else if (first.userData.type === 'button') {
    if (first.userData.action === 'prev') {
      const newIndex = (activeQuarterIndex + quarterData.length - 1) % quarterData.length;
      selectQuarter(newIndex);
    } else if (first.userData.action === 'next') {
      const newIndex = (activeQuarterIndex + 1) % quarterData.length;
      selectQuarter(newIndex);
    }
  }
};

renderer.domElement.addEventListener('pointermove', onPointerMove);
renderer.domElement.addEventListener('pointerdown', onPointerDown);
window.addEventListener('pointerup', onPointerUp);
renderer.domElement.addEventListener('click', onClick);

const clock = new THREE.Clock();

const render = () => {
  const elapsed = clock.getElapsedTime();
  placeholderOrb.rotation.y = elapsed * 0.12;

  panelShaderRefs.forEach((ref) => {
    if (ref) {
      ref.uniforms.uTime.value = elapsed;
    }
  });
  if (headerUniforms) {
    headerUniforms.uTime.value = elapsed;
  }
  buttonUniforms.forEach((uniform) => {
    uniform.uTime.value = elapsed;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();
