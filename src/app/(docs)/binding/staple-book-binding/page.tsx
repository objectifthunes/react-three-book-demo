import Link from 'next/link'
import { PlaygroundCta } from '@/components/PlaygroundCta'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'

const e = findExport('/binding/staple-book-binding/')!

const CODE = `import { useMemo, useRef } from 'react'
import { Book, BookInteraction, StapleBookBinding, Cover, Page } from '@objectifthunes/react-three-book'
import type { ThreeBook } from '@objectifthunes/react-three-book'

function Scene() {
  const bookRef = useRef<ThreeBook | null>(null)
  const binding = useMemo(() => new StapleBookBinding(), [])

  return (
    <Book ref={bookRef} binding={binding} castShadows>
      <BookInteraction />
      <Cover color="#7b3f00" /><Cover color="#7b3f00" />
      <Cover color="#7b3f00" /><Cover color="#7b3f00" />
      <Page color="#f5efe0" /><Page color="#f5efe0" />
    </Book>
  )
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <PlaygroundCta />
      <Source code={CODE} lang="tsx" />
      <PropTable
        label="STAPLESETUP (binding.setup)"
        cols={['Prop', 'Type', 'Default', 'Role']}
        rows={[
          { name: 'count', type: 'number', def: '4', desc: 'How many staples run down the fold (clamped 2…10).' },
          { name: 'thickness', type: 'number', def: '0.05', desc: 'Wire thickness of each staple.' },
          { name: 'crown', type: 'number', def: '0.2', desc: 'Length of the exposed staple crown across the fold.' },
          { name: 'margin', type: 'number', def: '0.1', desc: 'Inset of the staple run from the head/tail edges (0…1).' },
          { name: 'color', type: 'THREE.Color', def: 'white', desc: 'Staple metal colour.' },
          { name: 'material', type: 'THREE.Material | null', def: 'null', desc: 'Override the staple material, or null for the default metal.' },
        ]}
      />
      <Notes>
        <p>
          <code>StapleBookBinding</code> is one of the two built-in spines — the magazine one.
          Pass <code>new StapleBookBinding()</code> as the <code>&lt;Book&gt;</code>{' '}
          <code>binding</code> prop; it needs no configuration.
        </p>
        <p>
          For a glued spine with the same adjustable cover softness, see{' '}
          <Link href="/binding/glued-book-binding/">GluedBookBinding</Link> and compare it in the{' '}
          <Link href="/play/glued-spine/">Glued spine playground</Link>.
        </p>
      </Notes>
    </ExportPage>
  )
}
