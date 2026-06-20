'use client'

/** The smallest react-three-book setup: one <Book> with a few declarative pages. */

import { useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Book, BookInteraction, StapleBookBinding, Cover, Page, Text } from '@objectifthunes/react-three-book'

export default function Minimal() {
  const orbitRef = useRef<{ enabled: boolean } | null>(null)
  const binding = useMemo(() => new StapleBookBinding(), [])

  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }} style={{ position: 'fixed', inset: 0 }} gl={{ antialias: true }}>
      <color attach="background" args={[0x1a1a2e]} />
      <ambientLight intensity={0.8} />
      <directionalLight intensity={1.2} position={[5, 10, 5]} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <mesh rotation-x={-Math.PI / 2} position-y={-0.01} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={0x2a2a4a} />
      </mesh>
      <OrbitControls ref={orbitRef as never} enableDamping dampingFactor={0.05} target={[0, 0.5, 0]} />

      <Book
        binding={binding}
        initialOpenProgress={0.5}
        castShadows
        pagePaperSetup={{ width: 2, height: 3, thickness: 0.02, stiffness: 0.2, color: new THREE.Color(1, 1, 1), material: null }}
        coverPaperSetup={{ width: 2.1, height: 3.1, thickness: 0.04, stiffness: 0.5, color: new THREE.Color(1, 1, 1), material: null }}
      >
        <BookInteraction orbitControlsRef={orbitRef} />
        <Cover color="#7b3f00" />
        <Cover color="#7b3f00" />
        <Cover color="#7b3f00" />
        <Cover color="#7b3f00" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Page key={i} color="#f5efe0">
            <Text x={70} y={120} width={380} fontSize={30} color="#222" textAlign="center">{`Page ${i + 1}`}</Text>
          </Page>
        ))}
      </Book>
    </Canvas>
  )
}
