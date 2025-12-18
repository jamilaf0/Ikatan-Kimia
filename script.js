
// Shared Scripts for Chemistry Learning App
import * as THREE from 'three';
import * as Tone from 'tone';

// 1. Background Flowers
const FLOWER_EMOJIS = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '💮'];
function initFlowers() {
  const container = document.createElement('div');
  container.className = 'flower-container';
  container.style.position = 'fixed';
  container.style.inset = '0';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '0';
  document.body.prepend(container);

  setInterval(() => {
    const flower = document.createElement('div');
    flower.className = 'floating-flower';
    flower.textContent = FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)];
    flower.style.left = Math.random() * 100 + '%';
    flower.style.fontSize = (Math.random() * 1 + 1) + 'rem';
    flower.style.animationDuration = (Math.random() * 5 + 10) + 's';
    container.appendChild(flower);
    setTimeout(() => flower.remove(), 15000);
  }, 2000);
}

// 2. Navigation Highlighting
function initNav() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === page) {
      link.classList.add('nav-active');
    }
  });
}

// 3. Music Control
let isMusicPlaying = false;
let synth;
async function toggleMusic() {
  if (!isMusicPlaying) {
    await Tone.start();
    Tone.Transport.start();
    if (!synth) {
      synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.volume.value = -25;
      const melody = [
        { time: '0:0', note: 'C4', duration: '4n' },
        { time: '0:1', note: 'E4', duration: '4n' },
        { time: '0:2', note: 'G4', duration: '4n' },
        { time: '0:3', note: 'C5', duration: '4n' },
      ];
      new Tone.Part((time, value) => {
        synth.triggerAttackRelease(value.note, value.duration, time);
      }, melody).start(0);
      Tone.Transport.loop = true;
      Tone.Transport.loopEnd = '1m';
    }
    isMusicPlaying = true;
    document.getElementById('musicToggleBtn').innerHTML = '🔊';
    document.getElementById('musicToggleBtn').classList.add('bg-pink-500', 'text-white');
  } else {
    Tone.Transport.stop();
    isMusicPlaying = false;
    document.getElementById('musicToggleBtn').innerHTML = '🔇';
    document.getElementById('musicToggleBtn').classList.remove('bg-pink-500', 'text-white');
  }
}

// 4. 3D Viewer Helpers
export function createMoleculeViewer(containerId, type, data = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Add Loading indicator
  container.innerHTML = '<div class="flex items-center justify-center h-full text-slate-400 font-medium">⏳ Memuat Visualisasi 3D...</div>';

  const init = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) {
      setTimeout(init, 100); // Retry if container not ready
      return;
    }

    container.innerHTML = ''; // Clear loading
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    if (type === 'co2') {
      const c = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshStandardMaterial({ color: 0x2d2d2d }));
      group.add(c);
      const oGeo = new THREE.SphereGeometry(0.45, 32, 32);
      const oMat = new THREE.MeshStandardMaterial({ color: 0xff4757 });
      const o1 = new THREE.Mesh(oGeo, oMat); o1.position.set(-2, 0, 0);
      const o2 = new THREE.Mesh(oGeo, oMat); o2.position.set(2, 0, 0);
      group.add(o1, o2);
      const bondGeo = new THREE.CylinderGeometry(0.08, 0.08, 4, 16);
      const bondMat = new THREE.MeshStandardMaterial({ color: 0x444444 });
      const b1 = new THREE.Mesh(bondGeo, bondMat); b1.rotation.z = Math.PI / 2; b1.position.y = 0.1;
      const b2 = new THREE.Mesh(bondGeo, bondMat); b2.rotation.z = Math.PI / 2; b2.position.y = -0.1;
      group.add(b1, b2);
    } else if (type === 'ionic') {
      const kColor = 0xffb300; const aColor = 0x4fc3f7;
      const k = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), new THREE.MeshStandardMaterial({ color: kColor }));
      k.position.set(-1.5, 0, 0);
      const a = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), new THREE.MeshStandardMaterial({ color: aColor }));
      a.position.set(1.5, 0, 0);
      const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3, 16), new THREE.MeshStandardMaterial({ color: 0x888888 }));
      bond.rotation.z = Math.PI / 2;
      group.add(k, a, bond);
    } else if (type === 'metallic') {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            const atom = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffd166, metalness: 0.8, roughness: 0.2 }));
            atom.position.set(x * 1.5, y * 1.5, z * 1.5);
            group.add(atom);
          }
        }
      }
    }

    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);
  };

  init();
}

// Run on load
window.addEventListener('load', () => {
  initFlowers();
  initNav();
  const musicBtn = document.getElementById('musicToggleBtn');
  if (musicBtn) musicBtn.onclick = toggleMusic;
});
