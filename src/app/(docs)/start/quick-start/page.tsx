import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'
import { LiveBook } from '@/components/live/examples'

const e = findExport('/start/quick-start/')!

const INSTALL = `npm install @objectifthunes/react-three-book @react-three/fiber @react-three/drei three`

const CODE = `'use client'

import { useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Book, BookInteraction, StapleBookBinding, Cover, Page, Text } from '@objectifthunes/react-three-book'

export default function MyBook() {
  const orbit = useRef<{ enabled: boolean } | null>(null)
  const binding = useMemo(() => new StapleBookBinding(), [])

  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <directionalLight intensity={1.2} position={[5, 10, 5]} castShadow />
      <OrbitControls ref={orbit} target={[0, 0.5, 0]} enableDamping />

      <Book binding={binding} initialOpenProgress={0.5} castShadows>
        <BookInteraction orbitControlsRef={orbit} />
        <Cover color="#7b3f00" /><Cover color="#7b3f00" />
        <Cover color="#7b3f00" /><Cover color="#7b3f00" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Page key={i} color="#f5efe0">
            <Text x={70} y={120} width={380} fontSize={30} textAlign="center">{\`Page \${i + 1}\`}</Text>
          </Page>
        ))}
      </Book>
    </Canvas>
  )
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <LiveBook />
      <Source code={INSTALL} lang="bash" />
      <Source code={CODE} lang="tsx" />
      <PropTable
        label="THE PIECES"
        cols={['Element', 'From', '', 'Role']}
        rows={[
          { name: '<Canvas>', type: '@react-three/fiber', desc: 'The R3F renderer. Everything below must live inside it.' },
          { name: '<Book>', type: '@objectifthunes/react-three-book', desc: 'Owns the 3D book — its lifecycle, per-frame update and disposal.' },
          { name: '<BookInteraction>', type: '@objectifthunes/react-three-book', desc: 'Pointer-drag page turning; hands OrbitControls back between turns.' },
          { name: '<Cover> / <Page>', type: '@objectifthunes/react-three-book', desc: 'Declarative surfaces. Render nothing; collected into the book content.' },
          { name: 'StapleBookBinding', type: '@objectifthunes/react-three-book', desc: 'A binding instance passed to <Book> — re-exported from the core library.' },
          { name: 'OrbitControls', type: '@react-three/drei', desc: 'Camera orbiting; its ref is wired into <BookInteraction>.' },
        ]}
      />
      <Notes>
        <p>
          There is no manual render loop and no disposal to manage. <code>&lt;Book&gt;</code> creates the
          underlying <code>ThreeBook</code>, drives its <code>update()</code> every frame, and disposes it when the
          component unmounts. You only describe the book.
        </p>
        <p>
          The four <code>&lt;Cover&gt;</code> elements map to the four physical cover surfaces (front-outer,
          front-inner, back-inner, back-outer). See <Link href="/declarative/cover-page-spread/">Cover, Page &amp; Spread</Link>{' '}
          for the full content model, the <Link href="/components/book/">&lt;Book&gt;</Link> page for every prop, and the{' '}
          <Link href="/components/book/">Book page</Link> to try it live.
        </p>
      </Notes>
    </ExportPage>
  )
}
