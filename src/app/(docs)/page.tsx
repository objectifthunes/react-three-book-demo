import Link from 'next/link'
import { ArrowDownToLine, BookOpen, Code2, PlayCircle } from 'lucide-react'
import { CodeBlock } from '@/components/CodeBlock'
import { Eyebrow } from '@/components/Eyebrow'
import { GROUPS, exportsByGroup, LIB_VERSION, NPM_URL } from '@/components/exports'
import { LiveBook } from '@/components/live/examples'

const INSTALL = `pnpm add @objectifthunes/react-three-book @objectifthunes/three-book \\
  three @react-three/fiber @react-three/drei`

const WIRE_UP = `import { Canvas } from '@react-three/fiber'
import { Book, BookInteraction, Cover, Page, Text } from '@objectifthunes/react-three-book'

export function MyBook() {
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} castShadows />
      <Book initialOpenProgress={0.5}>
        <BookInteraction />
        <Cover color="#7b3f00" />
        <Page color="#f5efe0"><Text x={40} y={60} fontSize={28}>Chapter one</Text></Page>
        <Page color="#f5efe0" />
      </Book>
    </Canvas>
  )
}`

const CATEGORY_BLURB: Record<string, string> = {
  start:       'Install, a one-component quick start, and how the React wrapper maps onto core three-book.',
  components:  'The two components you always reach for: <Book> and <BookInteraction>.',
  declarative: 'Build content as JSX: <Cover>, <Page>, <Spread> and styled <Text> children.',
  hooks:       'Reach the book instance, drive open-progress and auto-turns, and read reactive state.',
  textures:    'loadImage, createPageTexture and the canvas helpers, re-exported for imperative content.',
  demokit:     'React form controls — sliders, colour pickers, image cards — for building book editors.',
  reference:   'Prop shapes, hook return types, and the re-exported enums in one place.',
  live:        'The full declarative studio and a minimal <Book> — both running right here.',
}

export default async function HomePage() {
  return (
    <div className="landing">
      <section className="landing__hero">
        <Eyebrow icon={<BookOpen size={12} strokeWidth={1.75} />}>@OBJECTIFTHUNES/REACT-THREE-BOOK · DEMO</Eyebrow>
        <h1 className="landing__title">A book, declared in JSX.</h1>
        <p className="landing__lede">
          A live, source-paired reference for <code>@objectifthunes/react-three-book</code> — the React Three
          Fiber wrapper around the realistic 3D page-turning book. Declare covers, pages, spreads and text as
          children, or drive everything imperatively with hooks. Every export documented, with working examples.
        </p>
        <div className="landing__hero-actions">
          <Link className="landing__cta landing__cta--primary" href="/start/quick-start/">Quick start ↗</Link>
          <Link className="landing__cta" href="/start/quick-start/">Quick start</Link>
          <a className="landing__cta" href={NPM_URL} target="_blank" rel="noopener noreferrer">npm</a>
        </div>
      </section>

      <section className="landing__block">
        <LiveBook />
      </section>

      <section>
        <div className="landing__grid">
          {GROUPS.map(g => {
            const items = exportsByGroup(g.id)
            if (items.length === 0) return null
            const first = items[0]
            return (
              <Link key={g.id} href={first.href} className="landing__card">
                <div className="landing__card-row">
                  <span className="landing__card-title">{g.label}</span>
                  <span className="landing__card-count">{items.length} {items.length === 1 ? 'page' : 'pages'}</span>
                </div>
                <p className="landing__card-blurb">{CATEGORY_BLURB[g.id]}</p>
                <span className="landing__card-open">Open →</span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="landing__block">
        <Eyebrow icon={<ArrowDownToLine size={12} strokeWidth={1.75} />}>INSTALL</Eyebrow>
        <CodeBlock code={INSTALL} lang="bash" />
        <Eyebrow icon={<Code2 size={12} strokeWidth={1.75} />}>WIRE-UP</Eyebrow>
        <CodeBlock code={WIRE_UP} lang="tsx" />
      </section>

      <section className="landing__skill">
        <div className="landing__skill-header">
          <div>
            <Eyebrow icon={<PlayCircle size={12} strokeWidth={1.75} />}>SEE IT MOVE</Eyebrow>
            <h2 className="landing__skill-title">Live, all the way down.</h2>
          </div>
          <Link className="landing__skill-cta" href="/components/book/">The Book</Link>
        </div>
        <p style={{ color: 'var(--ot-text-secondary)', fontSize: 14 }}>
          The <strong>Interactive editor</strong> is the full React studio — geometry, textures and a WYSIWYG
          page editor, all declarative. The <strong>Minimal book</strong> is a handful of <code>&lt;Page&gt;</code>{' '}
          children inside one <code>&lt;Book&gt;</code>. Drag a page in either to feel the curl.
        </p>
        <ul className="landing__skill-bullets">
          <li>Declarative <code>&lt;Cover&gt;</code> / <code>&lt;Page&gt;</code> / <code>&lt;Spread&gt;</code> / <code>&lt;Text&gt;</code></li>
          <li>Imperative hooks for controls, auto-turn and state</li>
          <li>Drag to turn · right-click / scroll to orbit</li>
          <li>Built on React Three Fiber</li>
          <li>v{LIB_VERSION} · React 18 &amp; 19</li>
          <li>Everything here is on the published package</li>
        </ul>
      </section>
    </div>
  )
}
