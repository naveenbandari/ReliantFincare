'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleGlobeProps {
  className?: string;
  isDark?: boolean;
}

export default function ParticleGlobe({ className = '', isDark = false }: ParticleGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width  = mount.clientWidth;
    const height = mount.clientHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 2.6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Color palette: blue (light) ↔ orange (dark) ──────────────────────────
    const lightPalette = [
      new THREE.Color('#1E3A8A'),
      new THREE.Color('#3B82F6'),
      new THREE.Color('#4338CA'),
      new THREE.Color('#10B981'),
      new THREE.Color('#93C5FD'),
    ];
    const darkPalette = [
      new THREE.Color('#F45C0A'),
      new THREE.Color('#FB923C'),
      new THREE.Color('#F97316'),
      new THREE.Color('#FED7AA'),
      new THREE.Color('#FFFFFF'),
    ];
    const palette = isDark ? darkPalette : lightPalette;
    const ringColor = isDark ? 0xF45C0A : 0x3B82F6;

    // ── Particle sphere (Fibonacci distribution) ─────────────────────────────
    const COUNT  = 3000;
    const RADIUS = 1.15;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const phi   = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      positions[i * 3]     = RADIUS * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = RADIUS * Math.cos(phi);
      positions[i * 3 + 2] = RADIUS * Math.sin(phi) * Math.sin(theta);
      const col = palette[Math.floor(Math.random() * palette.length)];
      const b   = 0.45 + Math.random() * 0.55;
      colors[i * 3]     = col.r * b;
      colors[i * 3 + 1] = col.g * b;
      colors[i * 3 + 2] = col.b * b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));

    const mat = new THREE.PointsMaterial({
      size: 0.013,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.9 : 0.75,
      sizeAttenuation: true,
    });

    const globe = new THREE.Points(geo, mat);
    scene.add(globe);

    // ── Latitude rings ────────────────────────────────────────────────────────
    const ringMat = new THREE.LineBasicMaterial({
      color: ringColor,
      transparent: true,
      opacity: isDark ? 0.10 : 0.08,
    });
    for (let r = 0; r < 8; r++) {
      const phi  = (Math.PI / 9) * (r + 1);
      const rR   = RADIUS * Math.sin(phi);
      const y    = RADIUS * Math.cos(phi);
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const a = (j / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(rR * Math.cos(a), y, rR * Math.sin(a)));
      }
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), ringMat));
    }

    // ── Mouse tilt ────────────────────────────────────────────────────────────
    let mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect();
      mx = ((e.clientX - r.left)  / r.width  - 0.5) * 2;
      my = ((e.clientY - r.top)   / r.height - 0.5) * 2;
    };
    mount.addEventListener('mousemove', onMove);

    // ── Animation loop ────────────────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      globe.rotation.y  = t * 0.18;
      globe.rotation.x += (my * 0.25 - globe.rotation.x) * 0.025;
      globe.rotation.y += (mx * 0.25) * 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      mount.removeEventListener('mousemove', onMove);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [isDark]);

  return <div ref={mountRef} className={className} />;
}
