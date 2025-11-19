import React, { useRef, useLayoutEffect } from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
export function Model(props) {
  const { nodes, materials } = useGLTF('/rtx3090.glb')
  const groupRef = useRef()    
  const fanFrontRef = useRef()  
  const fanBackRef = useRef()  
  const scroll = useScroll()
  useFrame((state, delta) => {
    if (fanFrontRef.current) fanFrontRef.current.rotation.y -= delta * 15
    if (fanBackRef.current) fanBackRef.current.rotation.y += delta * 15
    const r1 = scroll.range(0, 1/3)     
    const r2 = scroll.range(1/3, 1/3)  
    const r3 = scroll.range(2/3, 1/3)  
    if (groupRef.current) {
        groupRef.current.position.y = gsap.utils.interpolate(
            0, 
            gsap.utils.interpolate(0, 0.7, r2), 
            r3 
        )
        groupRef.current.position.x = gsap.utils.interpolate(0, 0.5, r2)
        groupRef.current.rotation.x = gsap.utils.interpolate(
            0.1, 
            gsap.utils.interpolate(0.1, -0.6, r2), 
            r3 
        )
        groupRef.current.rotation.y = gsap.utils.interpolate(
            0, 
            gsap.utils.interpolate(0, Math.PI * 0.4, r2), 
            r3 
        )

        groupRef.current.rotation.z = gsap.utils.interpolate(
            0, 
            gsap.utils.interpolate(0, -0.3, r2), 
            r3 
        )
        groupRef.current.scale.setScalar(
            gsap.utils.interpolate(
                1, 
                gsap.utils.interpolate(1, 1.5, r2), 
                r3 
            )
        )
    }
  })

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group scale={0.01}>
        <group 
            ref={fanFrontRef} 
            position={[127.5, 88.512, 10.288]} 
            rotation={[Math.PI / 2, 0.05, 0]} 
            scale={0.304}
        >
          <mesh castShadow receiveShadow geometry={nodes.Fan_F_Black_Fan_0.geometry} material={materials.Black_Fan} />
          <mesh castShadow receiveShadow geometry={nodes.Fan_F_Slot1_0.geometry} material={materials['Slot.1']} />
        </group>
        <group 
            ref={fanBackRef} 
            position={[-123.897, 88.512, -37.824]} 
            rotation={[Math.PI / 2, -0.05, Math.PI]} 
            scale={0.304}
        >
          <mesh castShadow receiveShadow geometry={nodes.Fan_B_Black_Fan_0.geometry} material={materials.Black_Fan} />
          <mesh castShadow receiveShadow geometry={nodes.Fan_B_Slot1_0.geometry} material={materials['Slot.1']} />
        </group>
        <mesh castShadow receiveShadow geometry={nodes.Metal_Frame_Metal_0.geometry} material={materials.Metal} position={[-0.001, 88.305, -8.473]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh castShadow receiveShadow geometry={nodes.Front_Cover_Black_0.geometry} material={materials.Black} position={[-122.303, 89.693, 12.112]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.836]} />
        <mesh castShadow receiveShadow geometry={nodes.Fan_Circle_Black_Fan_0.geometry} material={materials.Black_Fan} position={[127.5, 88.512, 10.288]} rotation={[Math.PI / 2, 0, 0]} scale={0.794} />
        <mesh castShadow receiveShadow geometry={nodes.Front_Cover_U_Black_0.geometry} material={materials.Black} position={[0.021, 26.082, 14.089]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh castShadow receiveShadow geometry={nodes.Front_Cover_T_Black_0.geometry} material={materials.Black} position={[-4.752, 163.401, 14.089]} rotation={[-Math.PI / 2, 0, -Math.PI]} />
        <mesh castShadow receiveShadow geometry={nodes.Fan_Circle_B_Black_Fan_0.geometry} material={materials.Black_Fan} position={[-124.154, 88.512, -40.178]} rotation={[Math.PI / 2, 0, Math.PI]} scale={0.794} />
        <mesh castShadow receiveShadow geometry={nodes.Grills_U_Metal_Black_0.geometry} material={materials.Metal_Black} position={[-0.119, 3.157, 3.087]} rotation={[Math.PI / 2, -Math.PI / 4, 0]} scale={[0.547, 11.753, 0.547]} />
        <mesh castShadow receiveShadow geometry={nodes.Grills_T_Metal_Black_0.geometry} material={materials.Metal_Black} position={[0.798, 174.492, 3.087]} rotation={[-Math.PI / 2, Math.PI / 4, -Math.PI]} scale={[0.547, 11.753, 0.547]} />
        <mesh castShadow receiveShadow geometry={nodes.Plane010_Black001_0.geometry} material={materials['Black.001']} position={[121.838, 88.416, -34.24]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[1, 1, 0.836]} />
        <mesh castShadow receiveShadow geometry={nodes.Socket_Slot_0.geometry} material={materials.Slot} position={[-149.707, 187.465, -39.009]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1.929, 1]} />
        <mesh castShadow receiveShadow geometry={nodes.Side_Metal_Part_Metal_S_0.geometry} material={materials.Metal_S} position={[-225.871, 118.087, -12.542]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh castShadow receiveShadow geometry={nodes.Grills_F003_Metal_Black_0.geometry} material={materials.Metal_Black} position={[131.494, 88.839, -23.017]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1.023]} />
        <mesh castShadow receiveShadow geometry={nodes.Grills_F002_Metal_Black_0.geometry} material={materials.Metal_Black} position={[-128.175, 88.839, -4.172]} rotation={[Math.PI / 2, 0, Math.PI]} scale={[1, 0.97, 1.023]} />
      </group>
    </group>
  )
}

useGLTF.preload('/rtx3090.glb')