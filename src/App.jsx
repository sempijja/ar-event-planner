import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

import './App.css';

const App = () => {
  const canvasRef = useRef();
  const [scene, setScene] = useState(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    const arButton = ARButton.createButton(renderer);
    document.body.appendChild(arButton);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    const scene = new THREE.Scene();

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);

    const controller = renderer.xr.getController(0);
    scene.add(controller);

    controller.addEventListener('select', () => {
      if (reticle.visible) {
        const loader = new GLTFLoader();
        loader.load('/models/table.glb', (gltf) => {
          const model = gltf.scene;
          model.position.setFromMatrixPosition(reticle.matrix);
          scene.add(model);
        });
      }
    });

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    setScene(scene);
  }, []);

  return (
    <div className="App">
      <Canvas ref={canvasRef} />
    </div>
  );
};

export default App;