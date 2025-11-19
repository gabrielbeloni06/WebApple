import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Model } from './Model'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden' }}>
      <Canvas dpr={[1, 2]} camera={{ fov: 35, position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6} adjustCamera={1.2}>
             <Model scale={1} /> 
          </Stage>

        </Suspense>
        <OrbitControls autoRotate enableZoom={true} />
      </Canvas>
      
      <div style={{ position: 'absolute', top: 40, left: 40, color: 'white', pointerEvents: 'none' }}>
        <h1 style={{ fontSize: '4rem', margin: 0 }}>RTX 3090</h1>
        <p style={{ color: '#aaa' }}>Ultimate Performance</p>
      </div>
    </div>
  )
}