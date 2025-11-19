import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage, ScrollControls, useScroll, Scroll, Loader } from '@react-three/drei'
import { Model } from './Model'

function AnimationScene() {
  const ref = useRef()
  const scroll = useScroll() 

  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.y = scroll.offset * (Math.PI * 2)
        ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group ref={ref}>
      <Stage environment="city" intensity={0.6} adjustCamera={1.2}>
        <Model />
      </Stage>
    </group>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas dpr={[1, 2]} camera={{ fov: 35 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={3} damping={0.2}>
            <AnimationScene />
            <Scroll html style={{ width: '100%' }}>
              <div style={{ height: '100vh', display: 'flex', alignItems: 'center', paddingLeft: '10vw' }}>
                <div>
                  <h1 className="text-8xl font-bold text-white">RTX 3090</h1>
                  <p className="text-2xl text-gray-300">O monstro saiu da jaula.</p>
                </div>
              </div>
              <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10vw' }}>
                <div style={{ textAlign: 'right' }}>
                  <h1 className="text-6xl font-bold text-white">24GB GDDR6X</h1>
                  <p className="text-2xl text-gray-300">Memória para renderizar o impossível.</p>
                </div>
              </div>
              <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <h1 className="text-6xl font-bold text-white">8K Gaming</h1>
                  <p className="text-2xl text-gray-300">Jogue no futuro.</p>
                </div>
              </div>

            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader 
        containerStyles={{ background: 'black' }} 
        innerStyles={{ background: 'white', height: '2px' }} 
        barStyles={{ background: '#00ff00', height: '2px' }} 
        dataStyles={{ color: 'white', fontSize: '1rem' }} 
      />
    </div>
  )
}