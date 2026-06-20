import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'
import { LiveControls } from '@/components/live/examples'

const e = findExport('/hooks/use-book-controls/')!

const CODE = `import { Html } from '@react-three/drei'
import { useBookControls } from '@objectifthunes/react-three-book'

// Rendered inside <Book>, so the hook reads the instance from context.
function JumpButtons() {
  const { setOpenProgress, setOpenProgressByIndex, stopTurning } =
    useBookControls()

  return (
    <Html>
      <button onClick={() => setOpenProgress(0)}>Close</button>
      <button onClick={() => setOpenProgress(1)}>Open fully</button>
      <button onClick={() => setOpenProgressByIndex(4)}>Jump to sheet 4</button>
      <button onClick={() => stopTurning()}>Cancel drag</button>
    </Html>
  )
}`

const REF_CODE = `import { useBookRef, useBookControls } from '@objectifthunes/react-three-book'

// Outside a <Book> tree, pass the ref explicitly.
function Controls() {
  const { bookRef } = useBookRef({ castShadows: true })
  const { setOpenProgress } = useBookControls(bookRef)
  // setOpenProgress(0.5) — snap halfway open
  return null
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <LiveControls />
      <Source code={CODE} lang="tsx" />
      <Source code={REF_CODE} lang="tsx" />
      <PropTable
        label="RETURNS"
        cols={['Member', 'Type', '', 'Description']}
        rows={[
          {
            name: 'setOpenProgress',
            type: '(progress: number) => void',
            desc: 'Snap the book to an open amount in the 0–1 range (0 = closed, 1 = fully open). No animation.',
          },
          {
            name: 'setOpenProgressByIndex',
            type: '(index: number) => void',
            desc: 'Snap to a specific paper-side index instead of a normalised amount.',
          },
          {
            name: 'stopTurning',
            type: '() => void',
            desc: 'Cancel any in-progress interactive drag turn.',
          },
        ]}
      />
      <Notes>
        <p>
          Call this inside the R3F <code>&lt;Canvas&gt;</code>. With no argument
          it reads the nearest{' '}
          <Link href="/components/book/">&lt;Book&gt;</Link> from context; pass a{' '}
          <code>bookRef</code> (e.g. from{' '}
          <Link href="/hooks/use-book-ref/">useBookRef</Link>) to target a book
          built without the JSX wrapper.
        </p>
        <p>
          The returned callbacks are stable (memoised), so they are safe to pass
          to event handlers and effect deps. These setters{' '}
          <em>jump</em> instantly — for animated, eased page turns use{' '}
          <Link href="/hooks/use-auto-turn/">useAutoTurn</Link>. To read whether
          the book is currently turning before acting, see{' '}
          <Link href="/hooks/use-book-state/">useBookState</Link>.
        </p>
      </Notes>
    </ExportPage>
  )
}
