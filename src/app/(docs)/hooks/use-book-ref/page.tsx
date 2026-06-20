import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'
import { LiveBook } from '@/components/live/examples'

const e = findExport('/hooks/use-book-ref/')!

const CODE = `import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import {
  useBookRef,
  usePageTurning,
  type ThreeBook,
} from '@objectifthunes/react-three-book'

// The imperative path: build the book yourself, no <Book> JSX, no context.
function ImperativeBook() {
  const orbitRef = useRef<{ enabled: boolean } | null>(null)

  // Creates a ThreeBook, calls init(), drives update() each frame,
  // and disposes it on unmount. bookRef.current is null until ready.
  const { bookRef, ready } = useBookRef(
    { castShadows: true, alignToGround: true },
    (book) => console.log('built', book.paperCount), // onBuilt
    (err) => console.error(err),                     // onError
  )

  // Wire pointer-drag turning by hand (what <BookInteraction> does for you).
  usePageTurning(bookRef, { enabled: ready, orbitControlsRef: orbitRef })

  return <OrbitControls ref={orbitRef} />
}

export default function Scene() {
  return (
    <Canvas shadows>
      <ImperativeBook />
    </Canvas>
  )
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <LiveBook />
      <Source code={CODE} lang="tsx" />
      <PropTable
        label="useBookRef(options, onBuilt?, onError?)"
        cols={['Parameter', 'Type', '', 'Description']}
        rows={[
          {
            name: 'options',
            type: 'BookOptions',
            desc: 'Passed straight to new Book(options). Property changes are re-applied during render via guarded setters.',
          },
          {
            name: 'onBuilt',
            type: '(book: ThreeBook) => void',
            desc: 'Optional. Called once after book.init() succeeds.',
          },
          {
            name: 'onError',
            type: '(err: Error) => void',
            desc: 'Optional. Called if book.init() throws. Defaults to console.error.',
          },
          {
            name: '→ returns',
            type: 'UseBookRefResult',
            desc: '{ bookRef: RefObject<ThreeBook | null>; ready: boolean } — ready flips true once init() succeeds.',
          },
        ]}
      />
      <PropTable
        label="usePageTurning(bookRef, options?)"
        cols={['Parameter', 'Type', '', 'Description']}
        rows={[
          {
            name: 'bookRef',
            type: 'RefObject<ThreeBook | null>',
            desc: 'The book to drag-turn — usually the bookRef from useBookRef.',
          },
          {
            name: 'options.enabled',
            type: 'boolean',
            desc: 'Disable pointer events without unmounting. Default true.',
          },
          {
            name: 'options.orbitControlsRef',
            type: 'RefObject<{ enabled: boolean } | null>',
            desc: 'OrbitControls ref — disabled during a drag, re-enabled on release.',
          },
          {
            name: '→ returns',
            type: 'void',
            desc: 'Attaches pointerdown / pointermove / pointerup on the canvas; cleans up on unmount.',
          },
        ]}
      />
      <Notes>
        <p>
          Both hooks must run inside the R3F{' '}
          <code>&lt;Canvas&gt;</code>. <code>useBookRef</code> is the engine
          under <Link href="/components/book/">&lt;Book&gt;</Link>; reach for it
          directly when you need the raw instance, custom lifecycle wiring, or to
          avoid React context entirely. For the common, declarative case the{' '}
          <code>&lt;Book&gt;</code> component is simpler.
        </p>
        <p>
          <code>usePageTurning</code> is the imperative form of{' '}
          <Link href="/components/interaction/">&lt;BookInteraction&gt;</Link>.
          Prefer the component unless you want raw control over which book is
          turned or how OrbitControls hands off.
        </p>
      </Notes>
    </ExportPage>
  )
}
