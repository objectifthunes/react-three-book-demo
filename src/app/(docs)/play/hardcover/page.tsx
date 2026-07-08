import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Notes } from '@/components/Notes'
import { findExport } from '@/components/exports'
import { Playground } from '@/components/live/playground'

const e = findExport('/play/hardcover/')!

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <Playground kind="glued" />
      <Notes>
        <p>
          The full <code>GluedBookBinding</code> surface, live and declarative: rigid boards, hinge
          and gutter flex, spine colour — and two WYSIWYG fields. The <strong>headline</strong> is a{' '}
          <code>&lt;Text&gt;</code> child of page 1 re-rendering as you type; the{' '}
          <strong>spine title</strong> becomes a canvas texture on{' '}
          <code>binding.setup.spineTexture</code>.
        </p>
        <p>
          The magazine twin lives in the <Link href="/play/staple/">Staple playground</Link>. For
          the API behind each control, every docs page links back here.
        </p>
      </Notes>
    </ExportPage>
  )
}
