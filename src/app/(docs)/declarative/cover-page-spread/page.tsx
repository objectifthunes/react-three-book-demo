import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'

const e = findExport('/declarative/cover-page-spread/')!

const CODE = `import { Book, Cover, Page, Spread, Text } from '@objectifthunes/react-three-book'

// frontImg / spreadImg are HTMLImageElement loaded via loadImage()
function MyBook({ frontImg, backImg, spreadImg }) {
  return (
    <Book binding={binding}>
      {/* Four covers, in surface order */}
      <Cover image={frontImg} fitMode="cover" fullBleed />
      <Cover color="#3a2a18" />            {/* front inner */}
      <Cover color="#3a2a18" />            {/* back inner  */}
      <Cover image={backImg} fitMode="cover" fullBleed />

      {/* Single page sides */}
      <Page color="#f5efe0">
        <Text x={70} y={120} fontSize={28} fontWeight="bold">Chapter One</Text>
      </Page>
      <Page color="#f5efe0" />

      {/* One image spanning two facing pages — adds TWO page entries */}
      <Spread image={spreadImg} fitMode="cover" fullBleed>
        <Text x={50} y={400} width={924} fontSize={18} textAlign="center">
          A panorama across the fold
        </Text>
      </Spread>

      <Page color="#f5efe0" />
    </Book>
  )
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <Source code={CODE} lang="tsx" />
      <PropTable
        label="SHARED PROPS"
        rows={[
          { name: 'image', type: 'HTMLImageElement | null', desc: 'Image to draw onto the surface. Load it with loadImage().' },
          { name: 'color', type: 'string', desc: 'Background fill (CSS color). Shows when no image, or behind a non-full-bleed image.' },
          { name: 'fitMode', type: "'contain' | 'cover' | 'fill'", def: 'cover', desc: 'How the image fits the surface (ImageFitMode).' },
          { name: 'fullBleed', type: 'boolean', def: 'false', desc: 'Extend the image edge-to-edge with no margin.' },
          { name: 'imageRect', type: 'ImageRect | null', desc: 'Custom image position/size in canvas pixels. Overrides fitMode when set.' },
          { name: 'children', type: '<Text> elements', desc: 'Text blocks composited onto this surface.' },
        ]}
      />
      <PropTable
        label="SURFACES CONTRIBUTED"
        cols={['Component', 'Contributes', '', 'Notes']}
        rows={[
          { name: '<Cover>', type: '1 cover surface', desc: 'Declare up to 4, in order: front-outer, front-inner, back-inner, back-outer.' },
          { name: '<Page>', type: '1 page side', desc: 'A single physical page side.' },
          { name: '<Spread>', type: '2 page sides', desc: 'One image spanning two facing pages; text coordinates span the full double width.' },
        ]}
      />
      <Notes>
        <p>
          <code>&lt;Cover&gt;</code>, <code>&lt;Page&gt;</code> and <code>&lt;Spread&gt;</code> render nothing —
          they are data-only markers. <code>&lt;Book&gt;</code> reads their props during reconciliation and
          builds the underlying <code>BookContent</code> (cover surfaces and page sides). Change a prop and the
          content rebuilds automatically.
        </p>
        <p>
          A book has four cover surfaces; declare them as four <code>&lt;Cover&gt;</code> elements in surface
          order. A <code>&lt;Spread&gt;</code> is a convenience for a single image across the fold: it adds two
          page entries (left + right), and any <code>&lt;Text&gt;</code> inside it is positioned against the full
          double-width canvas — so a centered title uses roughly twice the page width.
        </p>
        <p>
          For styling text on any of these surfaces, see <Link href="/declarative/text/">&lt;Text&gt;</Link>;
          for paper dimensions and the rest of the props, see{' '}
          <Link href="/components/book/">&lt;Book&gt;</Link>.
        </p>
      </Notes>
    </ExportPage>
  )
}
