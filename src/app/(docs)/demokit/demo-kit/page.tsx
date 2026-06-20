import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { FullScreenPreview } from '@/components/Preview'
import { findExport } from '@/components/exports'

const e = findExport('/demokit/demo-kit/')!

const CODE = `import { Slider, ColorPicker } from '@objectifthunes/react-three-book/demo-kit'
import { useState } from 'react'

function ControlPanel() {
  const [thickness, setThickness] = useState(0.02)
  const [color, setColor] = useState('#fdfcf8')

  return (
    <div className="demo-panel">
      <Slider
        label="Paper thickness"
        min={0.005}
        max={0.05}
        step={0.001}
        value={thickness}
        onChange={setThickness}
      />
      <ColorPicker label="Page colour" value={color} onChange={setColor} />
    </div>
  )
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <Source code={CODE} lang="tsx" />
      <PropTable
        label="COMPONENTS"
        cols={['Component', 'Props', '', 'What it is']}
        rows={[
          { name: 'Slider', type: 'SliderProps', desc: 'A labelled range input with a live numeric read-out. { label, min, max, step, value, onChange }.' },
          { name: 'ColorPicker', type: 'ColorPickerProps', desc: 'A native colour swatch with the hex shown beside the label. { label, value, onChange }.' },
          { name: 'Checkbox', type: 'CheckboxProps', desc: 'A labelled boolean toggle. { label, value, onChange }.' },
          { name: 'Select', type: 'SelectProps', desc: 'A labelled dropdown over SelectOption[]. { label, value, options, onChange }.' },
          { name: 'SectionTitle', type: '{ text }', desc: 'A small heading used to group controls in a panel.' },
          { name: 'PageNavigation', type: 'PageNavigationProps', desc: 'Page picker with a spread toggle for eligible pairs (uses getSpreadPairs). Default export.' },
          { name: 'ImageSlotCard', type: 'ImageSlotCardProps', desc: 'A full image control: thumbnail, file input, fit-mode + full-bleed controls, and clear.' },
          { name: 'SimpleImageCard', type: 'SimpleImageCardProps', desc: 'A lighter image card — thumbnail, file change and clear, no fit controls.' },
          { name: 'PlacementToggle', type: 'PlacementToggleProps', desc: "A two-button ground / sky placement switch. { value, onChange }." },
        ]}
      />
      <PropTable
        label="HELPERS & CONSTANTS"
        cols={['Export', 'Kind', '', 'Purpose']}
        rows={[
          { name: 'FONT_OPTIONS', type: 'string[]', desc: 'The font-family list demos offer (Georgia, Arial, Courier New…).' },
          { name: 'createDefaultTextBlock', type: '(canvasW, canvasH) => PageTextBlock', desc: 'A sensibly-positioned starter text block for a given canvas size.' },
          { name: 'toBookDirection', type: '(DirectionOption) => BookDirection', desc: "Maps 'left-to-right' / 'right-to-left' / 'up-to-down' / 'down-to-up' to the core enum." },
          { name: 'createImageSlot', type: '() => ImageSlot', desc: 'A fresh, empty ImageSlot (cover, fullBleed, no image).' },
          { name: 'clearImageSlot', type: '(slot) => void', desc: 'Revokes the slot objectUrl and resets its image fields in place.' },
          { name: 'EMPTY_SLOT', type: 'ImageSlot', desc: 'A shared empty-slot constant for initial state.' },
          { name: 'resolvePageIndex', type: '(currentPage, spreadPages, pageCount) => ResolvedPage', desc: 'Resolves the effective page index and whether it is part of a spread.' },
        ]}
      />
      <FullScreenPreview href="/full/editor/" illustration={null} />
      <Notes>
        <p>
          Import the demo kit from the dedicated subpath{' '}
          <code>@objectifthunes/react-three-book/demo-kit</code> — not from the package root. These
          are the prebuilt React form controls this site&apos;s own live editor is built from.
        </p>
        <p>
          The kit also re-exports the types <code>ImageSlot</code>, <code>PageTextBlock</code> and{' '}
          <code>DirectionOption</code> (plus <code>ImageFitMode</code> / <code>ImageRect</code>), and
          the styling constants <code>DEMO_SHADOW_COLOR</code>, <code>DEMO_SHADOW_BLUR</code>,{' '}
          <code>DEFAULT_LINE_HEIGHT</code>, <code>DEFAULT_FONT_SIZE</code> and{' '}
          <code>DEFAULT_TEXT_COLOR</code>.
        </p>
        <p>
          They are styled with plain <code>demo-*</code> class names, so bring your own CSS. The
          image cards lean on the{' '}
          <Link href="/textures/texture-utilities/">texture utilities</Link> to turn picked files
          into page textures, and <code>toBookDirection</code> feeds the{' '}
          <Link href="/reference/enums/">BookDirection enum</Link>.
        </p>
      </Notes>
    </ExportPage>
  )
}
