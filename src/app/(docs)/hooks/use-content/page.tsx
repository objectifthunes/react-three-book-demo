import Link from 'next/link'
import { ExportPage } from '@/components/ExportPage'
import { Source } from '@/components/Source'
import { Notes } from '@/components/Notes'
import { PropTable } from '@/components/PropTable'
import { findExport } from '@/components/exports'

const e = findExport('/hooks/use-content/')!

const CODE = `import { Canvas } from '@react-three/fiber'
import {
  Book,
  useBookContent,
  BookContent,
  BookDirection,
  createPageTexture,
} from '@objectifthunes/react-three-book'

function ImperativeContentBook({ images }: { images: string[] }) {
  // Build BookContent in a factory; textures in covers/pages are disposed
  // automatically when the content rebuilds or the component unmounts.
  const content = useBookContent(() => {
    const c = new BookContent()
    c.direction = BookDirection.LeftToRight
    c.covers.push(createPageTexture(images[0]))
    c.pages.push(createPageTexture(images[1]), createPageTexture(images[2]))
    return c
  }, [images]) // rebuilds (and disposes old textures) when images change

  return <Book content={content} />
}

export default function Scene({ images }: { images: string[] }) {
  return (
    <Canvas>
      <ImperativeContentBook images={images} />
    </Canvas>
  )
}`

const OVERLAY_CODE = `import {
  useTextOverlay,
  TextBlock,
} from '@objectifthunes/react-three-book'

// Inside <Book>: composites source + text blocks every frame and auto-syncs
// the resulting canvas onto book materials.
function LiveLabel() {
  const overlay = useTextOverlay({ width: 512, height: 512 })

  // overlay.blocks.push(new TextBlock({ text: 'Chapter 1' }))
  // The returned instance is stable; it re-composites per frame.
  return null
}`

export default async function Page() {
  return (
    <ExportPage group={e.group} title={e.name} lede={e.lede}>
      <Source code={CODE} lang="tsx" />
      <PropTable
        label="useBookContent(factory, deps)"
        cols={['Parameter', 'Type', '', 'Description']}
        rows={[
          {
            name: 'factory',
            type: '() => BookContent',
            desc: 'Pure function that builds the BookContent. Only re-run when deps change (useMemo semantics).',
          },
          {
            name: 'deps',
            type: 'React.DependencyList',
            desc: 'Dependency array controlling when the content is rebuilt.',
          },
          {
            name: '→ returns',
            type: 'BookContent',
            desc: 'The built content. THREE.Texture objects in covers/pages are disposed on rebuild and unmount.',
          },
        ]}
      />
      <PropTable
        label="useTextOverlay(options?)"
        cols={['Parameter', 'Type', '', 'Description']}
        rows={[
          {
            name: 'options',
            type: 'TextOverlayContentOptions',
            desc: 'Optional width / height / source. Defaults to 512×512. Changing width or height recreates the canvas.',
          },
          {
            name: '→ returns',
            type: 'TextOverlayContent',
            desc: 'A stable instance, re-composited every frame; materials auto-sync when inside a <Book> tree. Disposed on unmount.',
          },
        ]}
      />
      <Notes>
        <p>
          Both hooks run inside the R3F <code>&lt;Canvas&gt;</code>. Use them
          when you want to build content <em>imperatively</em> rather than with
          the declarative JSX children — see{' '}
          <Link href="/declarative/cover-page-spread/">Cover, Page &amp; Spread</Link>{' '}
          for the declarative path.
        </p>
        <p>
          <code>useBookContent</code> hands the result to{' '}
          <code>&lt;Book content=&#123;...&#125;&gt;</code>. Its automatic
          texture disposal means you can rebuild freely without leaking GPU
          memory — see the{' '}
          <Link href="/textures/texture-utilities/">texture utilities</Link>{' '}
          (<code>createPageTexture</code>, <code>loadImage</code>, …) for
          building those textures.
        </p>
        <p>
          <code>useTextOverlay</code> composites a source image plus text blocks
          on a per-frame basis; when called inside a{' '}
          <Link href="/components/book/">&lt;Book&gt;</Link> it auto-syncs the
          composited canvas onto the book&apos;s materials.
        </p>
      </Notes>
    </ExportPage>
  )
}
