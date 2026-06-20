import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'

const e = findExport('/hooks/use-book-state/')!

const CODE = `import { Html } from '@react-three/drei'
import {
  useBookState,
  useAutoTurn,
} from '@objectifthunes/react-three-book'

// Rendered inside <Book> — polls the instance each frame and re-renders on change.
function Toolbar() {
  const { isTurning, isAutoTurning, paperCount } = useBookState()
  const { turnNext } = useAutoTurn()

  const busy = isTurning || isAutoTurning

  return (
    <Html>
      <button disabled={busy} onClick={() => turnNext()}>
        Next page
      </button>
      <span>{paperCount} papers</span>
    </Html>
  )
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <Source code={CODE} lang="tsx" />
      <PropTable
        label="RETURNS — BookState"
        cols={['Field', 'Type', '', 'Description']}
        rows={[
          {
            name: 'isBuilt',
            type: 'boolean',
            desc: 'True once book.init() has completed successfully.',
          },
          {
            name: 'isTurning',
            type: 'boolean',
            desc: 'True while the user is dragging a page.',
          },
          {
            name: 'isFalling',
            type: 'boolean',
            desc: 'True while any page is in its falling / settling animation.',
          },
          {
            name: 'isIdle',
            type: 'boolean',
            desc: 'True when nothing is turning, falling, or auto-turning.',
          },
          {
            name: 'isAutoTurning',
            type: 'boolean',
            desc: 'True while an auto-turn is currently playing.',
          },
          {
            name: 'hasPendingAutoTurns',
            type: 'boolean',
            desc: 'True while there are queued auto-turns waiting to start.',
          },
          {
            name: 'paperCount',
            type: 'number',
            desc: 'Total number of papers (covers + pages).',
          },
          {
            name: 'coverPaperCount',
            type: 'number',
            desc: 'Number of cover papers (2 physical sheets = 4 surfaces).',
          },
          {
            name: 'pagePaperCount',
            type: 'number',
            desc: 'Number of interior page papers.',
          },
        ]}
      />
      <Notes>
        <p>
          Call this inside the R3F <code>&lt;Canvas&gt;</code>. With no argument
          it reads the nearest{' '}
          <Link href="/components/book/">&lt;Book&gt;</Link> from context; pass a{' '}
          <code>bookRef</code> from{' '}
          <Link href="/hooks/use-book-ref/">useBookRef</Link> to watch a book
          built without JSX.
        </p>
        <p>
          The snapshot is polled every frame via <code>useFrame</code>, so the
          component re-renders whenever a field <em>changes</em>. A deep-equal
          guard means a steady, idle book triggers no re-renders — but keep the
          consuming component small, since it updates on every transition.
        </p>
        <p>
          Pair it with{' '}
          <Link href="/hooks/use-book-controls/">useBookControls</Link> or{' '}
          <Link href="/hooks/use-auto-turn/">useAutoTurn</Link> to drive a UI:
          read state here, act through those.
        </p>
      </Notes>
    </ExportPage>
  )
}
