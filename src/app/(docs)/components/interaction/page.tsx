import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'

const e = findExport('/components/interaction/')!

const CODE = `import { useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Book, BookInteraction, StapleBookBinding, Cover, Page } from '@objectifthunes/react-three-book'

export default function Scene() {
  // OrbitControls exposes an \`enabled\` boolean — exactly what BookInteraction needs.
  const orbit = useRef<{ enabled: boolean } | null>(null)
  const binding = useMemo(() => new StapleBookBinding(), [])

  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <directionalLight intensity={1.2} position={[5, 10, 5]} castShadow />
      <OrbitControls ref={orbit} target={[0, 0.5, 0]} enableDamping />

      <Book binding={binding} initialOpenProgress={0.5} castShadows>
        {/* Child of <Book>: it picks up the book from context automatically. */}
        <BookInteraction orbitControlsRef={orbit} />
        <Cover color="#7b3f00" /><Cover color="#7b3f00" />
        <Cover color="#7b3f00" /><Cover color="#7b3f00" />
        <Page color="#f5efe0" />
        <Page color="#f5efe0" />
      </Book>
    </Canvas>
  )
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <Source code={CODE} lang="tsx" />
      <PropTable
        rows={[
          { name: 'enabled', type: 'boolean', def: 'true', desc: 'Disable page turning without unmounting (e.g. read-only mode).' },
          { name: 'bookRef', type: 'RefObject<ThreeBook | null>', desc: 'Explicit book ref. Omit to use the nearest <Book> context.' },
          { name: 'orbitControlsRef', type: 'RefObject<{ enabled: boolean } | null>', desc: 'Camera controls ref — disabled mid-drag so a page turn does not also orbit.' },
        ]}
      />
      <Notes>
        <p>
          <code>&lt;BookInteraction&gt;</code> renders nothing — it attaches pointer-drag listeners to the R3F
          canvas. Placed as a child of <code>&lt;Book&gt;</code> it resolves the book from context; outside a{' '}
          <code>&lt;Book&gt;</code> tree, pass an explicit <code>bookRef</code>.
        </p>
        <p>
          The <code>orbitControlsRef</code> hand-off matters: on pointer-down, if a page is grabbed, the controls
          are set <code>enabled = false</code> so the same drag does not orbit the camera; on release they are
          re-enabled. Any controls object exposing a boolean <code>enabled</code> works — drei&apos;s{' '}
          <code>OrbitControls</code> does. Set <code>enabled={'{'}false{'}'}</code> on{' '}
          <code>&lt;BookInteraction&gt;</code> to freeze turning while keeping the component mounted.
        </p>
        <p>
          Need raw control instead of a component? The same wiring is available as the{' '}
          <code>usePageTurning</code> hook — see{' '}
          <Link href="/hooks/use-book-ref/">useBookRef &amp; usePageTurning</Link>. For the book itself, see{' '}
          <Link href="/components/book/">&lt;Book&gt;</Link>.
        </p>
      </Notes>
    </ExportPage>
  )
}
