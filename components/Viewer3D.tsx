
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ATOM_COLORS } from '../constants';

interface Viewer3DProps {
  type: 'co2' | 'ionic' | 'covalent' | 'metallic' | 'compound';
  data?: any;
  autoRotate?: boolean;
}

const Viewer3D: React.FC<Viewer3DProps> = ({ type, data, autoRotate = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    // Setup logic based on type
    if (type === 'co2') {
      const cGeo = new THREE.SphereGeometry(0.5, 32, 32);
      const cMat = new THREE.MeshStandardMaterial({ color: ATOM_COLORS.C });
      const cAtom = new THREE.Mesh(cGeo, cMat);
      moleculeGroup.add(cAtom);

      const oGeo = new THREE.SphereGeometry(0.45, 32, 32);
      const oMat = new THREE.MeshStandardMaterial({ color: ATOM_COLORS.O });
      
      const o1 = new THREE.Mesh(oGeo, oMat);
      o1.position.set(-2, 0, 0);
      moleculeGroup.add(o1);

      const o2 = new THREE.Mesh(oGeo, oMat);
      o2.position.set(2, 0, 0);
      moleculeGroup.add(o2);

      // Bonds
      const createCOBond = (y: number) => {
        const bondGeo = new THREE.CylinderGeometry(0.08, 0.08, 4, 16);
        const bondMat = new THREE.MeshStandardMaterial({ color: 0x444444 });
        const bond = new THREE.Mesh(bondGeo, bondMat);
        bond.rotation.z = Math.PI / 2;
        bond.position.y = y;
        return bond;
      };
      moleculeGroup.add(createCOBond(0.12));
      moleculeGroup.add(createCOBond(-0.12));
    } else if (type === 'ionic' && data) {
      // Binary Ionic visualization
      const { kation, anion } = data;
      const kColor = (ATOM_COLORS as any)[kation] || 0xcccccc;
      const aColor = (ATOM_COLORS as any)[anion] || 0xcccccc;

      const kAtom = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), new THREE.MeshStandardMaterial({ color: kColor }));
      kAtom.position.set(-1.5, 0, 0);
      moleculeGroup.add(kAtom);

      const aAtom = new THREE.Mesh(new THREE.SphereGeometry(0.65, 32, 32), new THREE.MeshStandardMaterial({ color: aColor }));
      aAtom.position.set(1.5, 0, 0);
      moleculeGroup.add(aAtom);

      const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3, 16), new THREE.MeshStandardMaterial({ color: 0x888888 }));
      bond.rotation.z = Math.PI / 2;
      moleculeGroup.add(bond);
    } else if (type === 'metallic') {
      // Lattice of spheres
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            const atom = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffd166, metalness: 0.8, roughness: 0.2 }));
            atom.position.set(x * 1.5, y * 1.5, z * 1.5);
            moleculeGroup.add(atom);
          }
        }
      }
      // Floating electrons
      const electronGeo = new THREE.BufferGeometry();
      const electronCount = 200;
      const positions = new Float32Array(electronCount * 3);
      for(let i=0; i < electronCount; i++) {
        positions[i*3] = (Math.random() - 0.5) * 6;
        positions[i*3+1] = (Math.random() - 0.5) * 6;
        positions[i*3+2] = (Math.random() - 0.5) * 6;
      }
      electronGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const electronMat = new THREE.PointsMaterial({ color: 0x4a90e2, size: 0.05 });
      const electrons = new THREE.Points(electronGeo, electronMat);
      moleculeGroup.add(electrons);
    } else if (type === 'covalent' && data) {
      // Dynamic rendering of covalent molecules
      if (data === 'H2O') {
        const o = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshStandardMaterial({ color: ATOM_COLORS.O }));
        moleculeGroup.add(o);
        const h1 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), new THREE.MeshStandardMaterial({ color: ATOM_COLORS.H }));
        h1.position.set(-0.9, 0.6, 0);
        moleculeGroup.add(h1);
        const h2 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), new THREE.MeshStandardMaterial({ color: ATOM_COLORS.H }));
        h2.position.set(0.9, 0.6, 0);
        moleculeGroup.add(h2);
      } else if (data === 'NH3') {
        const n = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshStandardMaterial({ color: ATOM_COLORS.N }));
        moleculeGroup.add(n);
        const hPos = [[1, 0, 0], [-0.5, 0.86, 0], [-0.5, -0.86, 0]];
        hPos.forEach(p => {
          const h = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), new THREE.MeshStandardMaterial({ color: ATOM_COLORS.H }));
          h.position.set(p[0] * 0.8, p[1] * 0.8, -0.5);
          moleculeGroup.add(h);
        });
      }
    }

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (autoRotate) {
        moleculeGroup.rotation.y += 0.01;
        moleculeGroup.rotation.x += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [type, data, autoRotate]);

  return <div ref={containerRef} className="w-full h-80 lg:h-96 rounded-2xl bg-slate-100 shadow-inner overflow-hidden cursor-grab active:cursor-grabbing" />;
};

export default Viewer3D;
