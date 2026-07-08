import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Notes } from '@/components/Notes'
import { findExport } from '@/components/exports'
import { Playground } from '@/components/live/playground'

const e = findExport('/play/staple/')!

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <Playground kind="staple" />
      <Notes>
        <p>
          Everything on this canvas is declarative <code>react-three-book</code> —{' '}
          <code>&lt;Book binding=&#123;new StapleBookBinding()&#125;&gt;</code> with{' '}
          <code>&lt;Cover&gt;</code>/<code>&lt;Page&gt;</code> children wired to the controls. Type
          in the <strong>headline</strong> field and watch it land on page 1: that is a{' '}
          <code>&lt;Text&gt;</code> child re-rendering, the same mechanism you would use for a
          WYSIWYG editor.
        </p>
        <p>
          The hardcover twin lives in the <Link href="/play/hardcover/">Hardcover playground</Link>.
          For the API behind each control, every docs page links back here.
        </p>
      </Notes>
    </ExportPage>
  )
}
