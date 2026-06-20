import { BookOpen } from 'lucide-react'
import { ExportPage } from '@/components/ExportPage'
import { FullScreenPreview } from '@/components/Preview'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { findExport } from '@/components/exports'

const e = findExport('/live/minimal/')!

const CODE = `import { useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Book, BookInteraction, StapleBookBinding, Cover, Page, Text } from '@objectifthunes/react-three-book'

export default function Minimal() {
  const orbit = useRef(null)
  const binding = useMemo(() => new StapleBookBinding(), [])
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }} style={{ position: 'fixed', inset: 0 }}>
      <ambientLight intensity={0.8} />
      <directionalLight intensity={1.2} position={[5, 10, 5]} castShadow />
      <OrbitControls ref={orbit} target={[0, 0.5, 0]} />
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
      <FullScreenPreview href="/full/minimal/" illustration={<BookOpen size={40} strokeWidth={1.25} />} />
      <Source code={CODE} lang="tsx" />
      <Notes>
        <p>
          One <code>&lt;Book&gt;</code>, four <code>&lt;Cover&gt;</code>s and eight <code>&lt;Page&gt;</code>s,
          each carrying a centred <code>&lt;Text&gt;</code>. <code>&lt;BookInteraction&gt;</code> wires pointer
          dragging and hands control back to OrbitControls between turns.
        </p>
        <p>
          No render loop to manage and no manual disposal — the React wrapper drives{' '}
          <code>update()</code> and cleans up the underlying book when the component unmounts.
        </p>
      </Notes>
    </ExportPage>
  )
}
