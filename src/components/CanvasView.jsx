// components/CanvasView.jsx
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const CanvasView = () => {
    const canvasRef = useRef(null);
    const [scene, setScene] = useState(null);
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        // Initialize Three.js Scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

        // Setup Renderer and Camera
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 5;

        // Animate Scene
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Set Scene in State
        setScene(scene);

        return () => renderer.dispose();
    }, []);

    const handleDrop = (event) => {
        event.preventDefault();
        const objectData = JSON.parse(event.dataTransfer.getData('object'));

        // Create a new 3D Object (e.g., Cube for placeholder)
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);

        // Add Object to Scene
        scene.add(cube);
        setObjects([...objects, { id: objectData.id, mesh: cube }]);
    };

    return (
        <canvas
            ref={canvasRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="w-3/4 h-screen bg-black"
        />
    );
};

export default CanvasView;
