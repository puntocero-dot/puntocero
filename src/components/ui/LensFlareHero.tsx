'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';

interface LensFlareHeroProps {
  className?: string;
}

const LensFlareHero: React.FC<LensFlareHeroProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01, THREE.SRGBColorSpace);
    scene.fog = new THREE.Fog(scene.background, 3500, 15000);

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(40, containerRef.current.clientWidth / containerRef.current.clientHeight, 1, 15000);
    camera.position.z = 250;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.15);
    dirLight.position.set(0, -1, 0).normalize();
    dirLight.color.setHSL(0.1, 0.7, 0.5);
    scene.add(dirLight);

    // --- Textures ---
    const textureLoader = new THREE.TextureLoader();
    const textureFlare0 = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/lensflare/lensflare0.png');
    const textureFlare3 = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/lensflare/lensflare3.png');

    // --- Geometries (Atmosphere) ---
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, shininess: 50 });

    for (let i = 0; i < 2000; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
        mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
        mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        scene.add(mesh);
    }

    // --- Lens Flare Helper ---
    function addLight(h: number, s: number, l: number, x: number, y: number, z: number) {
      const light = new THREE.PointLight(0xffffff, 1.5, 2000, 0);
      light.color.setHSL(h, s, l);
      light.position.set(x, y, z);
      scene.add(light);

      const lensflare = new Lensflare();
      lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, light.color));
      lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
      lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
      lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
      lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
      light.add(lensflare);
    }

    addLight(0.55, 0.9, 0.5, 0, 0, -1000);
    addLight(0.08, 0.8, 0.5, 0, 0, -1000);
    addLight(0.995, 0.5, 0.9, 5000, 5000, -1000);

    // --- Resize handler ---
    const onWindowResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onWindowResize);

    // --- Animation & Mouse interaction ---
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 5;
      mouseY = (event.clientY - window.innerHeight / 2) * 5;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // Dispose materials and geometries to prevent leaks
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full min-h-[500px] overflow-hidden rounded-2xl ${className}`} 
      style={{ background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)' }}
    />
  );
};

export default LensFlareHero;
