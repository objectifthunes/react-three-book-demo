import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'

const e = findExport('/reference/types/')!

const CODE = `import type {
  // component props
  BookProps,
  CoverProps,
  PageProps,
  SpreadProps,
  TextProps,
  // hook return / control types
  BookControls,
  AutoTurnControls,
  BookState,
  UseBookRefResult,
  // re-exported core types
  BookOptions,
  BookContent,
  ImageFitMode,
  ImageRect,
} from '@objectifthunes/react-three-book'`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <Source code={CODE} lang="ts" />
      <PropTable
        label="TYPES"
        cols={['Type', 'Kind', '', 'Home page']}
        rows={[
          { name: 'BookProps', type: 'interface', desc: 'Props for the <Book> R3F component (extends BookOptions). Documented under Book.' },
          { name: 'CoverProps', type: 'interface', desc: 'Props for a declarative <Cover>. See Cover, Page & Spread.' },
          { name: 'PageProps', type: 'interface', desc: 'Props for a declarative <Page>. See Cover, Page & Spread.' },
          { name: 'SpreadProps', type: 'interface', desc: 'Props for a double-page <Spread>. See Cover, Page & Spread.' },
          { name: 'TextProps', type: 'interface', desc: 'Props for a styled <Text> block on a page. See Text.' },
          { name: 'BookControls', type: 'interface', desc: 'Imperative controls returned by useBookControls (setOpenProgress, …).' },
          { name: 'AutoTurnControls', type: 'interface', desc: 'Page-turn controls returned by useAutoTurn (turnNext, turnPrev, …).' },
          { name: 'BookState', type: 'interface', desc: 'Reactive snapshot returned by useBookState (isBuilt, isTurning, …).' },
          { name: 'UseBookRefResult', type: 'interface', desc: 'The { bookRef, ready } returned by useBookRef.' },
          { name: 'BookOptions', type: 'interface (core)', desc: 'Construction options for the underlying Book. Re-exported from three-book; BookProps extends it.' },
          { name: 'BookContent', type: 'class (core)', desc: 'The page/cover content model. Re-exported from three-book.' },
          { name: 'ImageFitMode', type: 'union (core)', desc: "'contain' | 'cover' | 'fill'. Used by the texture utilities and demo kit." },
          { name: 'ImageRect', type: 'interface (core)', desc: 'Explicit { x, y, width, height } image placement in canvas pixels.' },
        ]}
      />
      <Notes>
        <p>
          This page is a map, not a spec. Each type is documented where it is used — the component
          prop shapes live with their components (<Link href="/components/book/">Book</Link>,{' '}
          <Link href="/declarative/cover-page-spread/">Cover, Page &amp; Spread</Link>,{' '}
          <Link href="/declarative/text/">Text</Link>), and the hook return types with their hooks
          (<Link href="/hooks/use-book-controls/">useBookControls</Link>,{' '}
          <Link href="/hooks/use-auto-turn/">useAutoTurn</Link>,{' '}
          <Link href="/hooks/use-book-state/">useBookState</Link>,{' '}
          <Link href="/hooks/use-book-ref/">useBookRef</Link>).
        </p>
        <p>
          <code>BookOptions</code>, <code>BookContent</code>, <code>ImageFitMode</code> and{' '}
          <code>ImageRect</code> come straight from{' '}
          <code>@objectifthunes/three-book</code> and are re-exported for convenience. The{' '}
          <code>ImageFitMode</code> / <code>ImageRect</code> pair is most relevant on the{' '}
          <Link href="/textures/texture-utilities/">texture utilities</Link> page.
        </p>
      </Notes>
    </ExportPage>
  )
}
