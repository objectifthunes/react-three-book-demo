import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'
import { LiveBook } from '@/components/live/examples'

const e = findExport('/start/concepts/')!

const CODE = `import { Canvas, useFrame } from '@react-three/fiber'
import { Book, BookInteraction, Cover, Page, Text, useBookState } from '@objectifthunes/react-three-book'
import type { ThreeBook } from '@objectifthunes/react-three-book'

// <Book> creates a ThreeBook instance, drives book.update(delta) every
// frame, and disposes it on unmount. Declarative children become content.
function Scene() {
  return (
    <Book initialOpenProgress={0.5} castShadows>
      <BookInteraction />
      <Cover color="#7b3f00" /><Cover color="#7b3f00" />
      <Cover color="#7b3f00" /><Cover color="#7b3f00" />
      <Page color="#f5efe0">
        <Text x={70} y={120} fontSize={28}>Chapter One</Text>
      </Page>
    </Book>
  )
}

// Hooks reach the instance imperatively — here, a per-frame state snapshot.
function Status() {
  const state = useBookState()       // reads the nearest <Book> via context
  return null /* state.isTurning, state.isIdle, state.paperCount, ... */
}

export default function App() {
  return (
    <Canvas shadows>   {/* everything book-related must live inside <Canvas> */}
      <Scene />
    </Canvas>
  )
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <LiveBook />
      <Source code={CODE} lang="tsx" />
      <Notes>
        <p>
          The React wrapper is a thin, declarative layer over the core{' '}
          <code>@objectifthunes/three-book</code> engine. The single stateful piece is{' '}
          <code>&lt;Book&gt;</code>: on mount it constructs a <code>ThreeBook</code> instance, calls{' '}
          <code>init()</code>, drives <code>book.update(delta)</code> from R3F&apos;s <code>useFrame</code> every
          frame, and calls <code>book.dispose()</code> on unmount. You never write a render loop.
        </p>
        <p>
          Content is described, not built. <code>&lt;Cover&gt;</code>, <code>&lt;Page&gt;</code>,{' '}
          <code>&lt;Spread&gt;</code> and <code>&lt;Text&gt;</code> render nothing — they are data-only markers
          that <code>&lt;Book&gt;</code> reconciles into a <code>BookContent</code> (covers, pages and managed
          text overlays). Edit a prop and the content rebuilds.
        </p>
        <p>
          The hooks (<code>useBook</code>, <code>useBookControls</code>, <code>useAutoTurn</code>,{' '}
          <code>useBookState</code>) reach the live instance imperatively, either through the nearest{' '}
          <code>&lt;Book&gt;</code> context or via an explicit ref. Because they all rely on{' '}
          <code>useFrame</code> or R3F context, every component and hook here must be rendered inside a{' '}
          <code>&lt;Canvas&gt;</code>.
        </p>
      </Notes>
      <PropTable
        label="THE PIECES"
        cols={['Piece', 'Kind', '', 'Role']}
        rows={[
          { name: '<Book>', type: 'Component', desc: 'Owns a ThreeBook instance; drives its update() / dispose() and provides BookContext.' },
          { name: '<BookInteraction>', type: 'Component', desc: 'Wires pointer-drag page turning; optionally disables OrbitControls mid-drag.' },
          { name: '<Cover> · <Page> · <Spread>', type: 'Declarative', desc: 'Data-only children collected into BookContent (cover surfaces and page sides).' },
          { name: '<Text>', type: 'Declarative', desc: 'A styled text block composited onto its parent surface.' },
          { name: 'useBook / useBookControls / useAutoTurn / useBookState', type: 'Hooks', desc: 'Imperative access to the ThreeBook instance from inside the <Canvas>.' },
          { name: 'Demo kit', type: 'UI kit', desc: 'Plain React form controls (sliders, pickers) for building book editors — no 3D.' },
        ]}
      />
      <Notes>
        <p>
          From here: <Link href="/components/book/">&lt;Book&gt;</Link> documents every prop;{' '}
          <Link href="/components/interaction/">&lt;BookInteraction&gt;</Link> covers pointer turning;{' '}
          <Link href="/declarative/cover-page-spread/">Cover, Page &amp; Spread</Link> and{' '}
          <Link href="/declarative/text/">Text</Link> describe the content model.
        </p>
      </Notes>
    </ExportPage>
  )
}
