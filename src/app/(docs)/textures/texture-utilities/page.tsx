import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'

const e = findExport('/textures/texture-utilities/')!

const CODE = `import {
  loadImage,
  createPageTexture,
  computeDefaultImageRect,
} from '@objectifthunes/react-three-book'

// 1 — decode a File picked from an <input type="file">
const loaded = await loadImage(file)        // → LoadedImage | null
if (!loaded) return

// 2 — build a CanvasTexture for a single page (page is 2×3 world units)
const texture = createPageTexture(
  '#fdfcf8',          // background colour
  '',                 // fallback label (drawn only when image is null)
  loaded.image,       // HTMLImageElement
  'cover',            // ImageFitMode: 'contain' | 'cover' | 'fill'
  true,               // fullBleed — no inner margin
  2,                  // pageW (world units) → canvas is pageW * PX_PER_UNIT
  3,                  // pageH (world units)
)

// 3 — optionally precompute the rect for a custom-positioned image
const rect = computeDefaultImageRect(loaded.image, 512, 768, 'cover', true)

// hand \`texture\` to a <Page texture={texture}> or your own BookContent…
// and when you no longer need it:
URL.revokeObjectURL(loaded.objectUrl)
texture.dispose()`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <Source code={CODE} lang="ts" />
      <PropTable
        label="FUNCTIONS"
        cols={['Function', 'Signature', '', 'What it returns']}
        rows={[
          { name: 'loadImage', type: '(file) => Promise<LoadedImage | null>', desc: 'Decodes a File into an HTMLImageElement plus the object URL it came from. Resolves null when file is nullish or decoding fails. You own URL.revokeObjectURL(result.objectUrl).' },
          { name: 'createPageTexture', type: '(color, label, image, fitMode, fullBleed, pageW?, pageH?, imageRect?) => THREE.Texture', desc: 'Wraps createPageCanvas in a sRGB THREE.CanvasTexture, ready to use as a page material. Call .dispose() when done.' },
          { name: 'createPageCanvas', type: '(color, label, image, fitMode, fullBleed, pageW?, pageH?, imageRect?) => HTMLCanvasElement', desc: 'Same drawing as above but returns the bare canvas — use when you only need a source (e.g. for TextOverlayContent) and want to skip the texture allocation.' },
          { name: 'drawImageWithFit', type: '(ctx, image, x, y, w, h, fit) => void', desc: 'Draws image into a 2D context within (x, y, w, h) using contain / cover / fill.' },
          { name: 'computeDefaultImageRect', type: '(image, canvasW, canvasH, fitMode, fullBleed) => ImageRect', desc: 'Returns the {x, y, width, height} drawImageWithFit would use — handy to seed an ImageRect before the user nudges it.' },
        ]}
      />
      <PropTable
        label="TYPES & CONSTANTS"
        cols={['Name', 'Kind', '', 'Meaning']}
        rows={[
          { name: 'PX_PER_UNIT', type: 'const number', desc: 'Pixels per world unit (256). Canvas size = pageW/pageH × PX_PER_UNIT when those args are given; otherwise the canvas is 512 × 512.' },
          { name: 'ImageFitMode', type: "'contain' | 'cover' | 'fill'", desc: 'How the image is scaled into its area — letterboxed, cropped-to-fill, or stretched.' },
          { name: 'ImageRect', type: '{ x; y; width; height }', desc: 'Explicit image position and size in canvas pixels. Pass as imageRect to override fitMode placement.' },
          { name: 'LoadedImage', type: '{ image; objectUrl }', desc: 'The resolved value from loadImage — an HTMLImageElement and the object URL to revoke later.' },
        ]}
      />
      <Notes>
        <p>
          These helpers are re-exported verbatim from{' '}
          <code>@objectifthunes/three-book</code> — a single source of truth shared with the core
          library. They are browser-only (they touch <code>document</code> and <code>URL</code>), so
          call them in the client, not during server rendering.
        </p>
        <p>
          Reach for them when you build content <em>imperatively</em> with{' '}
          <Link href="/hooks/use-content/">useBookContent &amp; useTextOverlay</Link>. If you prefer
          declaring pages as JSX, the{' '}
          <Link href="/declarative/cover-page-spread/">Cover, Page &amp; Spread</Link> components do
          this drawing for you.
        </p>
        <p>
          Ownership is manual: a texture you create with <code>createPageTexture</code> must be{' '}
          <code>dispose()</code>d, and the <code>objectUrl</code> from <code>loadImage</code> must be{' '}
          revoked, or you leak GPU and blob memory.
        </p>
      </Notes>
    </ExportPage>
  )
}
