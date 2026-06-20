import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'
import { LiveAutoTurn } from '@/components/live/examples'

const e = findExport('/reference/enums/')!

const CODE = `import {
  BookDirection,
  AutoTurnDirection,
  AutoTurnMode,
} from '@objectifthunes/react-three-book'

// the reading direction of the book
<Book direction={BookDirection.RightToLeft} />

// drive a programmatic turn forward
controls.turnNext()                       // AutoTurnDirection.Next under the hood
book.startAutoTurning(AutoTurnDirection.Back, settings)`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <LiveAutoTurn />
      <Source code={CODE} lang="tsx" />
      <PropTable
        label="BookDirection"
        cols={['Member', 'Value', '', 'Meaning']}
        rows={[
          { name: 'LeftToRight', type: '0', desc: 'Pages turn from left to right — the default for left-bound (Western) books.' },
          { name: 'RightToLeft', type: '1', desc: 'Pages turn from right to left — right-bound books (e.g. manga).' },
          { name: 'UpToDown', type: '2', desc: 'Pages turn from top to bottom — top-bound flip pads.' },
          { name: 'DownToUp', type: '3', desc: 'Pages turn from bottom to top — bottom-bound flip pads.' },
        ]}
      />
      <PropTable
        label="AutoTurnDirection"
        cols={['Member', 'Value', '', 'Meaning']}
        rows={[
          { name: 'Next', type: '0', desc: 'Turn toward the next page (forward).' },
          { name: 'Back', type: '1', desc: 'Turn toward the previous page (backward).' },
        ]}
      />
      <PropTable
        label="AutoTurnMode"
        cols={['Member', 'Value', '', 'Meaning']}
        rows={[
          { name: 'Surface', type: '0', desc: 'Simulates swiping across the paper surface to turn it.' },
          { name: 'Edge', type: '1', desc: 'Simulates gripping the paper edge and lifting it over.' },
        ]}
      />
      <Notes>
        <p>
          All three enums are numeric and re-exported unchanged from{' '}
          <code>@objectifthunes/three-book</code>. The values above are verified against the core
          source, so it is safe to rely on them.
        </p>
        <p>
          <code>BookDirection</code> sets how the whole book reads — pass it as the{' '}
          <Link href="/components/book/">direction prop on &lt;Book&gt;</Link> (the demo kit&apos;s{' '}
          <code>toBookDirection</code> maps friendly strings onto it).{' '}
          <code>AutoTurnDirection</code> and <code>AutoTurnMode</code> shape programmatic turns; see{' '}
          <Link href="/hooks/use-auto-turn/">useAutoTurn</Link>.
        </p>
      </Notes>
    </ExportPage>
  )
}
