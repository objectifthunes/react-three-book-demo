import { BookOpen } from 'lucide-react'
import { ExportPage } from '@/components/ExportPage'
import { FullScreenPreview } from '@/components/Preview'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { findExport } from '@/components/exports'

const e = findExport('/live/editor/')!

const CODE = `// The studio is the library's own React demo: a <Canvas> with the declarative
// <Book> tree plus state-driven panels for geometry, textures and text.
<Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
  <BookScene params={params} coverSlots={coverSlots} pageSlots={pageSlots} … />
</Canvas>`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <FullScreenPreview href="/full/editor/" illustration={<BookOpen size={40} strokeWidth={1.25} />} />
      <Source code={CODE} lang="tsx" />
      <Notes>
        <p>
          The editor is the library&apos;s full Vite demo, ported verbatim and mounted into a route. Three tabs —
          <strong> Book</strong> (paper geometry), <strong>Textures</strong> (cover/page images with fit modes),
          and <strong>Editor</strong> (a WYSIWYG text placer) — drive the declarative{' '}
          <code>&lt;Book&gt;</code> / <code>&lt;Cover&gt;</code> / <code>&lt;Page&gt;</code> /{' '}
          <code>&lt;Spread&gt;</code> / <code>&lt;Text&gt;</code> tree.
        </p>
        <p>
          It runs entirely client-side (loaded with <code>next/dynamic</code>, <code>ssr: false</code>) and uses
          React Three Fiber under the hood. Drag a page to turn it.
        </p>
      </Notes>
    </ExportPage>
  )
}
