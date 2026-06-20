import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'

const e = findExport('/hooks/use-auto-turn/')!

const CODE = `import { useEffect } from 'react'
import {
  useAutoTurn,
  AutoTurnDirection,
  AutoTurnSettings,
} from '@objectifthunes/react-three-book'

// Rendered inside <Book> — reads the instance from context.
function AutoAdvance() {
  const { turnNext, turnAll, cancelPendingAutoTurns } = useAutoTurn()

  // Flip one page forward every 2 seconds.
  useEffect(() => {
    const id = setInterval(() => turnNext(), 2000)
    return () => {
      clearInterval(id)
      cancelPendingAutoTurns()
    }
  }, [turnNext, cancelPendingAutoTurns])

  // Flip through the whole book at once, with custom timing.
  const flipToEnd = () =>
    turnAll(AutoTurnDirection.Next, new AutoTurnSettings())

  return null
}`

const QUEUE_CODE = `import { useAutoTurn, AutoTurnDirection } from '@objectifthunes/react-three-book'

function Queue() {
  const { startAutoTurning } = useAutoTurn()

  // Queue 5 forward turns, 300ms apart.
  const run = () =>
    startAutoTurning(
      AutoTurnDirection.Next,
      undefined, // default AutoTurnSettings
      5,         // turnCount
      300,       // delayPerTurn (ms, or an AutoTurnSetting)
    )

  return null
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <Source code={CODE} lang="tsx" />
      <Source code={QUEUE_CODE} lang="tsx" />
      <PropTable
        label="RETURNS"
        cols={['Member', 'Type', '', 'Description']}
        rows={[
          {
            name: 'turnNext',
            type: '(settings?: AutoTurnSettings) => boolean',
            desc: 'Animate one page forward. Returns false if it could not start.',
          },
          {
            name: 'turnPrev',
            type: '(settings?: AutoTurnSettings) => boolean',
            desc: 'Animate one page backward.',
          },
          {
            name: 'turnAll',
            type: '(direction: AutoTurnDirection, settings?: AutoTurnSettings) => boolean',
            desc: 'Turn all remaining pages in the given direction in one call.',
          },
          {
            name: 'startAutoTurning',
            type: '(direction, settings?, turnCount?, delayPerTurn?: number | AutoTurnSetting) => boolean',
            desc: 'Full control: queue turnCount auto-turns, spaced by delayPerTurn (ms or an AutoTurnSetting).',
          },
          {
            name: 'cancelPendingAutoTurns',
            type: '() => void',
            desc: "Remove queued turns that haven't started yet (the active turn finishes).",
          },
        ]}
      />
      <Notes>
        <p>
          Call this inside the R3F <code>&lt;Canvas&gt;</code>. With no argument
          it reads the nearest{' '}
          <Link href="/components/book/">&lt;Book&gt;</Link> from context; pass a{' '}
          <code>bookRef</code> from{' '}
          <Link href="/hooks/use-book-ref/">useBookRef</Link> to target a book
          built without JSX. The callbacks are stable across renders.
        </p>
        <p>
          Direction is the <code>AutoTurnDirection</code> enum (<code>Next</code>{' '}
          / <code>Back</code>) and timing is described by{' '}
          <code>AutoTurnSettings</code>, both re-exported from the core{' '}
          three-book library — see{' '}
          <Link href="/reference/enums/">Enums</Link>. Omitting{' '}
          <code>settings</code> uses a fresh <code>new AutoTurnSettings()</code>.
        </p>
        <p>
          For instant, non-animated jumps to an open state instead, use{' '}
          <Link href="/hooks/use-book-controls/">useBookControls</Link>; to react
          to whether an auto-turn is currently playing, read{' '}
          <Link href="/hooks/use-book-state/">useBookState</Link>.
        </p>
      </Notes>
    </ExportPage>
  )
}
