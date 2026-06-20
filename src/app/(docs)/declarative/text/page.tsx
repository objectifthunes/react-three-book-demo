import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'

const e = findExport('/declarative/text/')!

const CODE = `import { Cover, Text } from '@objectifthunes/react-three-book'

// A styled title centered on the front cover.
function TitleCover({ coverImg }) {
  return (
    <Cover image={coverImg} fitMode="cover" fullBleed>
      <Text
        x={60} y={140} width={400}
        fontSize={44}
        fontFamily="Georgia, serif"
        fontWeight="bold"
        color="#f8f4e8"
        textAlign="center"
        lineHeight={1.1}
        textTransform="uppercase"
        shadowColor="rgba(0,0,0,0.6)"
        shadowBlur={6}
        shadowOffsetY={2}
      >
        The Lantern Road
      </Text>
      <Text x={60} y={260} width={400} fontSize={18} color="#e8e0cc" textAlign="center" fontStyle="italic">
        a traveller's tale
      </Text>
    </Cover>
  )
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <Source code={CODE} lang="tsx" />
      <PropTable
        rows={[
          { name: 'children', type: 'string', desc: 'The text content (the single child).' },
          { name: 'x', type: 'number', desc: 'Left position of the text block, in canvas pixels.' },
          { name: 'y', type: 'number', desc: 'Top position of the text block, in canvas pixels.' },
          { name: 'width', type: 'number', desc: 'Wrapping width in pixels. Text wraps to fit.' },
          { name: 'fontSize', type: 'number', desc: 'Font size in pixels.' },
          { name: 'fontFamily', type: 'string', desc: 'CSS font family, e.g. "Georgia, serif".' },
          { name: 'fontWeight', type: "'normal' | 'bold'", def: 'normal', desc: 'Font weight.' },
          { name: 'fontStyle', type: "'normal' | 'italic'", def: 'normal', desc: 'Font style.' },
          { name: 'color', type: 'string', desc: 'Text fill color (CSS color).' },
          { name: 'textAlign', type: "'left' | 'center' | 'right'", def: 'left', desc: 'Horizontal alignment within width.' },
          { name: 'lineHeight', type: 'number', desc: 'Line height multiplier.' },
          { name: 'opacity', type: 'number', desc: 'Text opacity, 0 to 1.' },
          { name: 'shadowColor', type: 'string', desc: 'Drop-shadow color.' },
          { name: 'shadowBlur', type: 'number', desc: 'Shadow blur radius in pixels.' },
          { name: 'shadowOffsetX', type: 'number', def: '0', desc: 'Horizontal shadow offset in pixels.' },
          { name: 'shadowOffsetY', type: 'number', def: '0', desc: 'Vertical shadow offset in pixels.' },
          { name: 'textTransform', type: "'none' | 'uppercase' | 'lowercase' | 'capitalize'", def: 'none', desc: 'Case transformation.' },
          { name: 'textDecoration', type: "'none' | 'underline' | 'strikethrough'", def: 'none', desc: 'Text decoration.' },
          { name: 'background', type: 'string', def: "''", desc: 'Background fill color behind the text (empty = none).' },
          { name: 'backgroundPadding', type: 'number', def: '0', desc: 'Padding around the text for the background box, in pixels.' },
          { name: 'maxLines', type: 'number', def: '0', desc: 'Maximum visible lines (0 = unlimited). Truncated with an ellipsis.' },
          { name: 'height', type: 'number', def: '0', desc: 'Container height for vertical alignment (0 = auto).' },
          { name: 'verticalAlign', type: "'top' | 'middle' | 'bottom'", def: 'top', desc: 'Vertical alignment within height.' },
          { name: 'rotation', type: 'number', def: '0', desc: 'Rotation in radians around the block center.' },
        ]}
      />
      <Notes>
        <p>
          <code>&lt;Text&gt;</code> is a data-only child of a{' '}
          <Link href="/declarative/cover-page-spread/">&lt;Cover&gt;, &lt;Page&gt; or &lt;Spread&gt;</Link>. It
          renders nothing on its own; the parent surface composites it onto its texture as a managed text
          overlay. The string content is the single child.
        </p>
        <p>
          Coordinates are in canvas pixels relative to the surface. On a <code>&lt;Spread&gt;</code> the canvas
          is double-width, so center text against roughly twice the page width. Updating any prop re-composites
          the overlay on the next frame — no manual texture work required.
        </p>
      </Notes>
    </ExportPage>
  )
}
