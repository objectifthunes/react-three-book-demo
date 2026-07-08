import Link from 'next/link'
import { PlaygroundCta } from '@/components/PlaygroundCta'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'

const e = findExport('/binding/glued-book-binding/')!

const CODE = `import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Book, BookInteraction, GluedBookBinding, Cover, Page } from '@objectifthunes/react-three-book'
import type { ThreeBook } from '@objectifthunes/react-three-book'

function Scene() {
  const bookRef = useRef<ThreeBook | null>(null)
  const binding = useMemo(() => {
    const b = new GluedBookBinding()
    b.setup.spineColor = new THREE.Color('#7a1f1f')
    // b.setup.spineTexture = titleCanvasTexture  // art down the spine
    return b
  }, [])

  return (
    <Book
      ref={bookRef}
      binding={binding}
      castShadows
      // Rigid, thicker boards make it read as a hardcover; pages stay floppy.
      coverPaperSetup={{ width: 2.15, height: 3.15, thickness: 0.06, stiffness: 0.5, rigid: true, color: new THREE.Color(1, 1, 1), material: null }}
      pagePaperSetup={{ width: 2, height: 3, thickness: 0.03, stiffness: 0.2, color: new THREE.Color(1, 1, 1), material: null }}
    >
      <BookInteraction />
      {/* covers[0..3] → front / inner front / inner back / back */}
      <Cover color="#7a1f1f" /><Cover color="#e8e0d0" />
      <Cover color="#e8e0d0" /><Cover color="#7a1f1f" />
      <Page color="#f7f1e3" /><Page color="#f7f1e3" />
    </Book>
  )
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <PlaygroundCta />
      <Source code={CODE} lang="tsx" />
      <PropTable
        label="GLUEDSETUP (binding.setup)"
        cols={['Prop', 'Type', 'Default', 'Role']}
        rows={[
          { name: 'hingeGap', type: 'number', def: '0.03', desc: 'Cloth-joint groove between each board and the spine, in world units.' },
          { name: 'glueFlexWidth', type: 'number', def: '0.12', desc: 'Page gutter flex zone — glued pages curve out of the spine rather than opening flat.' },
          { name: 'spineColor', type: 'THREE.Color', def: '#8c2626', desc: 'Cloth colour for the spine, hinges, edges and caps when no texture/material is set.' },
          { name: 'spineTexture', type: 'THREE.Texture | null', def: 'null', desc: 'Artwork/text for the spine zone — render a title into a canvas texture the classic way.' },
          { name: 'spineMaterial', type: 'THREE.Material | null', def: 'null', desc: 'Custom cloth material (fabric, leather…) for the non-printed zones. Overrides spineColor.' },
          { name: 'quality', type: 'number', def: '3', desc: 'Spine curve subdivision, clamped 0…5.' },
        ]}
      />
      <Notes>
        <p>
          <code>GluedBookBinding</code> is a drop-in alternative to{' '}
          <Link href="/components/book/">StapleBookBinding</Link> — pass it as the{' '}
          <code>&lt;Book&gt;</code> <code>binding</code> prop. The whole cover (front board, spine,
          back board) is <strong>one constant-thickness mesh</strong> wrapped around the block like a
          manga cover, and the pages are glued to that spine surface.
        </p>
        <p>
          The four <code>&lt;Cover&gt;</code> surfaces map to the case unchanged — front, inner
          front, inner back, back — and <code>setup.spineTexture</code> prints the spine. Set{' '}
          <code>rigid: true</code> on the cover paper (see the <code>&lt;Book&gt;</code> page) so the
          boards turn as stiff plates while the pages stay floppy. Use the <strong>spine toggle</strong>{' '}
          on the canvas above to compare it against the staple binding.
        </p>
      </Notes>
    </ExportPage>
  )
}
