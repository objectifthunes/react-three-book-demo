import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { FullScreenPreview } from '@/components/Preview'
import { findExport } from '@/components/exports'

const e = findExport('/components/book/')!

const CODE = `import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Book, BookInteraction, StapleBookBinding, Cover, Page } from '@objectifthunes/react-three-book'
import type { ThreeBook } from '@objectifthunes/react-three-book'

function Scene() {
  const bookRef = useRef<ThreeBook | null>(null)
  const binding = useMemo(() => new StapleBookBinding(), [])

  return (
    <Book
      ref={bookRef}                 // forwards to the ThreeBook instance
      binding={binding}
      initialOpenProgress={0.5}
      castShadows
      alignToGround={false}
      hideBinder={false}
      pagePaperSetup={{
        width: 2, height: 3,
        thickness: 0.02, stiffness: 0.2,
        color: new THREE.Color(1, 1, 1), material: null,
      }}
      coverPaperSetup={{
        width: 2.1, height: 3.1,
        thickness: 0.04, stiffness: 0.5,
        color: new THREE.Color(1, 1, 1), material: null,
      }}
      onBuilt={(book) => console.log('built', book.paperCount, 'papers')}
      onError={(err) => console.error(err)}
    >
      <BookInteraction />
      <Cover color="#7b3f00" /><Cover color="#7b3f00" />
      <Cover color="#7b3f00" /><Cover color="#7b3f00" />
      <Page color="#f5efe0" />
      <Page color="#f5efe0" />
    </Book>
  )
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <Source code={CODE} lang="tsx" />
      <PropTable
        rows={[
          { name: 'content', type: 'BookContent', desc: 'Imperative content. Omit when using <Cover>/<Page>/<Spread> children.' },
          { name: 'binding', type: 'BookBinding', def: 'null', desc: 'How the papers are bound — e.g. new StapleBookBinding().' },
          { name: 'direction', type: 'BookDirection', def: 'LeftToRight', desc: 'Reading direction for declarative content.' },
          { name: 'initialOpenProgress', type: 'number', def: '0', desc: 'Initial open state, 0 (closed) to 1 (fully open).' },
          { name: 'castShadows', type: 'boolean', def: 'true', desc: 'Whether the book casts shadows.' },
          { name: 'alignToGround', type: 'boolean', def: 'false', desc: 'Rest the closed book flat on the ground plane.' },
          { name: 'hideBinder', type: 'boolean', def: 'false', desc: 'Hide the spine/binder mesh.' },
          { name: 'reduceShadows', type: 'boolean', def: 'false', desc: 'Cheaper shadow pass for lower-end devices.' },
          { name: 'reduceSubMeshes', type: 'boolean', def: 'false', desc: 'Fewer sub-meshes per paper — lighter, slightly coarser bending.' },
          { name: 'reduceOverdraw', type: 'boolean', def: 'false', desc: 'Trim overdraw for fill-rate-bound scenes.' },
          { name: 'pagePaperSetup', type: 'Partial<PaperSetupInit>', desc: 'Interior page geometry & material (see table below).' },
          { name: 'coverPaperSetup', type: 'Partial<PaperSetupInit>', desc: 'Cover geometry & material (see table below).' },
          { name: 'onBuilt', type: '(book: ThreeBook) => void', desc: 'Called after init() succeeds, with the live instance.' },
          { name: 'onError', type: '(err: Error) => void', desc: 'Called if init() throws (e.g. BookHeightException).' },
          { name: 'children', type: 'ReactNode', desc: 'Declarative <Cover>/<Page>/<Spread> content and <BookInteraction>.' },
        ]}
      />
      <PropTable
        label="PAPERSETUPINIT"
        cols={['Field', 'Type', 'Page / Cover', 'Description']}
        rows={[
          { name: 'width', type: 'number', def: '2 / 2.1', desc: 'Paper width in world units.' },
          { name: 'height', type: 'number', def: '3 / 3.1', desc: 'Paper height in world units.' },
          { name: 'thickness', type: 'number', def: '0.02 / 0.04', desc: 'Sheet thickness — covers are thicker than pages.' },
          { name: 'stiffness', type: 'number', def: '0.2 / 0.5', desc: 'Bend resistance; higher = stiffer (covers stiffer than pages).' },
          { name: 'color', type: 'THREE.Color', def: 'Color(1,1,1)', desc: 'Base paper tint multiplied into the surface texture.' },
          { name: 'material', type: 'THREE.Material | null', def: 'null', desc: 'Override material; null uses the default paper material.' },
        ]}
      />
      <Notes>
        <p>
          <code>&lt;Book&gt;</code> extends <code>BookOptions</code> from the core library and adds{' '}
          <code>direction</code>, <code>onBuilt</code>, <code>onError</code> and <code>children</code>. It
          forwards its ref to the underlying <code>ThreeBook</code> instance, so{' '}
          <code>ref.current</code> exposes the full imperative API (<code>setOpenProgress</code>,{' '}
          <code>startAutoTurning</code>, <code>paperCount</code>, …) — the same instance the hooks reach.
        </p>
        <p>
          Provide content one of two ways: pass a prebuilt <code>content</code> prop, or nest{' '}
          <Link href="/declarative/cover-page-spread/">&lt;Cover&gt;, &lt;Page&gt; and &lt;Spread&gt;</Link>{' '}
          children. If <code>init()</code> fails — typically a <code>BookHeightException</code> when the stack
          is too tall for the paper dimensions — <code>onError</code> receives it instead of throwing. Reach the
          instance reactively with <Link href="/hooks/use-book/">useBook</Link>, or see the{' '}
          <Link href="/reference/types/">types index</Link>.
        </p>
      </Notes>
      <FullScreenPreview href="/full/editor/" illustration={null} />
    </ExportPage>
  )
}
