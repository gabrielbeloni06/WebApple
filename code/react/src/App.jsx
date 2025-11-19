import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stage, ScrollControls, useScroll, Scroll, Image as DreiImage } from '@react-three/drei'
import { Model } from './Model'
function Backgrounds() {
  const scroll = useScroll()
  const bgGreenRef = useRef()
  const bgGreyRef = useRef()
  useFrame((state, delta) => {
    if (bgGreenRef.current) {
      const opacity = 1 - scroll.range(0, 1/3) * 3
      bgGreenRef.current.material.opacity = opacity
      bgGreenRef.current.position.y = scroll.offset * -5
    }
    if (bgGreyRef.current) {
        const isVisible = scroll.visible(2/3, 1/3)
        bgGreyRef.current.material.opacity = scroll.range(2/3, 1/3) * 1.5
    }
  })

  return (
    <>
      <DreiImage
        ref={bgGreenRef}
        url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
        transparent
        scale={[20, 12, 1]} 
        position={[0, 0, -5]} 
        color="#76b900" 
      />
      <mesh ref={bgGreyRef} position={[0, -2, -4]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial color="#333333" transparent opacity={0} />
      </mesh>
    </>
  )
}
function AnimationScene() {
  const ref = useRef()
  const scroll = useScroll()

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y = scroll.offset * (Math.PI * 2)
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <group ref={ref}>
      <Stage environment="city" intensity={0.6} adjustCamera={1.2} shadows={false}>
        <Model />
      </Stage>
    </group>
  )
}
const SectionTitle = ({ children, align = "left" }) => (
  <h1 className={`text-5xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-[0.9] drop-shadow-xl ${align === "right" ? "text-right" : "text-left"}`}>
    {children}
  </h1>
)

const HighlightText = ({ children }) => (
  <span className="text-[#76b900]">{children}</span>
)

const TechButton = ({ text, filled = true }) => (
  <button className={`
    relative mt-6 px-8 py-3 font-bold text-lg uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1
    ${filled 
      ? "bg-[#76b900] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(118,185,0,0.6)]" 
      : "border border-white text-white hover:border-[#76b900] hover:text-[#76b900]"
    }
  `}>
    {text}
  </button>
)

const StatBox = ({ label, value }) => (
  <div className="flex flex-col border-t border-gray-700 pt-4">
    <span className="text-3xl font-mono font-bold text-white">{value}</span>
    <span className="text-xs text-[#76b900] uppercase tracking-widest mt-1">{label}</span>
  </div>
)

export default function App() {
  return (
    <div className="w-screen h-screen bg-black overflow-hidden selection:bg-[#76b900] selection:text-black">
      <nav className="fixed top-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-[2px]">
        <div className="flex items-center gap-3 cursor-pointer group">
          <img 
            src="src/assets/nvidia.png" 
            alt="NVIDIA" 
            className="h-6 md:h-8 object-contain brightness-200 group-hover:brightness-100 transition-all" 
          />
          <div className="h-6 w-[1px] bg-gray-600 mx-2"></div>
          <span className="text-white font-bold italic tracking-tighter text-xl group-hover:text-[#76b900] transition-colors">RTX ON</span>
        </div>

        <div className="hidden md:flex gap-10 text-xs font-bold tracking-[0.2em] uppercase text-gray-300">
          {['GPU', 'Jogos', 'Drivers', 'Suporte'].map((item) => (
            <a key={item} href="#" className="hover:text-[#76b900] transition-all hover:scale-110 relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#76b900] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        <button className="bg-[#76b900] text-black px-5 py-2 text-xs font-bold uppercase hover:bg-white transition-colors">
          Comprar
        </button>
      </nav>

      <Canvas dpr={[1, 2]} camera={{ fov: 30 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={3} damping={0.2}>
            <Backgrounds />
            
            <AnimationScene />

            <Scroll html style={{ width: '100%' }}>
              <div className="h-screen w-full flex items-center px-10 md:px-20">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-[#76b900] text-black text-xs font-bold px-2 py-1 uppercase">Novo</span>
                    <span className="text-[#76b900] tracking-[0.3em] text-xs font-bold uppercase">Arquitetura Ampere</span>
                  </div>
                  <SectionTitle>
                    O Futuro <br/> <HighlightText>Chegou</HighlightText>
                  </SectionTitle>
                  <p className="text-gray-300 mt-6 max-w-md text-lg font-light leading-relaxed border-l-4 border-[#76b900] pl-6">
                    A GeForce RTX™ 3090 é uma BFGPU (Big Ferocious GPU) com desempenho de classe TITAN.
                  </p>
                  <div className="flex gap-4">
                    <TechButton text="Ver Trailer" />
                    <TechButton text="Specs" filled={false} />
                  </div>
                </div>
              </div>
              <div className="h-screen w-full flex items-center justify-end px-10 md:px-20">
                <div className="w-full md:w-1/3">
                  <SectionTitle align="right">
                    Poder <HighlightText>Bruto</HighlightText>
                  </SectionTitle>
                  <p className="text-gray-400 text-right mt-4 mb-10 text-sm uppercase tracking-widest">
                    Especificações Técnicas
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <StatBox value="24 GB" label="GDDR6X Memory" />
                    <StatBox value="10496" label="NVIDIA CUDA Cores" />
                    <StatBox value="1.70 GHz" label="Boost Clock" />
                    <StatBox value="8K HDR" label="Gaming Ready" />
                  </div>
                </div>
              </div>
              <div className="h-screen w-full flex flex-col items-center justify-center px-10">
                <div className="text-center mb-10">
                  <h2 className="text-white text-3xl font-bold italic mb-4">PRONTO PARA JOGAR?</h2>
                  <p className="text-gray-400 max-w-lg mx-auto mb-8">
                    Adquira a sua RTX 3090 hoje e experimente os maiores blockbusters com a fidelidade do Ray Tracing.
                  </p>
                  <div className="scale-125">
                    <TechButton text="Comprar Agora" />
                  </div>
                </div>
                <div className="absolute bottom-10 flex gap-8 text-gray-500 text-xs uppercase tracking-widest">
                  <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
                  <a href="#" className="hover:text-white transition-colors">Legal</a>
                  <a href="#" className="hover:text-white transition-colors">Contato</a>
                </div>
              </div>

            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}