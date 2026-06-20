import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'
import { LiveBook } from '@/components/live/examples'

const e = findExport('/hooks/use-book/')!

const CODE = `import { Canvas } from '@react-three/fiber'
import { Book, Page, useBook } from '@objectifthunes/react-three-book'

// Any component rendered *inside* <Book> can read the instance from context.
function PageCounter() {
  const book = useBook() // ThreeBook | null — null until built / outside <Book>
  if (book) console.log('paperCount', book.paperCount)
  return null
}

export default function Scene() {
  return (
    <Canvas>
      <Book>
        <Page><img src="/page-1.jpg" /></Page>
        <Page><img src="/page-2.jpg" /></Page>
        <PageCounter />
      </Book>
    </Canvas>
  )
}`

const REQUIRED = `import { useRequiredBook } from '@objectifthunes/react-three-book'

// Same as useBook(), but throws instead of returning null. Use it when the
// component is only ever mounted inside a <Book> and you don't want a null check.
function CoverLogger() {
  const book = useRequiredBook() // ThreeBook — throws outside a <Book> tree
  console.log('covers', book.coverPaperCount)
  return null
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <LiveBook />
      <Source code={CODE} lang="tsx" />
      <Source code={REQUIRED} lang="tsx" />
      <PropTable
        label="HOOKS"
        cols={['Name', 'Returns', '', 'Description']}
        rows={[
          {
            name: 'BookContext',
            type: 'Context<ThreeBook | null>',
            desc: 'The React context that <Book> provides. Defaults to null.',
          },
          {
            name: 'useBook()',
            type: 'ThreeBook | null',
            desc: 'Safe access. Returns the nearest ancestor ThreeBook, or null when called outside a <Book> tree.',
          },
          {
            name: 'useRequiredBook()',
            type: 'ThreeBook',
            desc: 'Strict access. Returns the nearest ancestor ThreeBook, or throws when called outside a <Book> tree.',
          },
        ]}
      />
      <Notes>
        <p>
          Both hooks must be called inside the R3F{' '}
          <code>&lt;Canvas&gt;</code> and inside a{' '}
          <Link href="/components/book/">&lt;Book&gt;</Link> so the context is
          available. The value they return is the underlying{' '}
          <code>ThreeBook</code> instance from the core library.
        </p>
        <p>
          Reach for <code>useBook()</code> when a component might render outside
          a book (and you want a graceful null), and{' '}
          <code>useRequiredBook()</code> when it never should — the throw turns a
          misplacement into an immediate, obvious error.
        </p>
        <p>
          For imperative control without reading raw instance methods, prefer the
          purpose-built hooks:{' '}
          <Link href="/hooks/use-book-controls/">useBookControls</Link>,{' '}
          <Link href="/hooks/use-auto-turn/">useAutoTurn</Link> and{' '}
          <Link href="/hooks/use-book-state/">useBookState</Link>. To build a
          book without the JSX wrapper, see{' '}
          <Link href="/hooks/use-book-ref/">useBookRef</Link>.
        </p>
      </Notes>
    </ExportPage>
  )
}
