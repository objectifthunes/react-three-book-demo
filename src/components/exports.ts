export type Badge = 'FULL-SCREEN' | 'COMPONENT' | 'HOOK' | 'UTIL' | 'TYPE'

export const LIB_NAME = '@objectifthunes/react-three-book'
export const LIB_VERSION = '0.6.7'
export const NPM_URL = 'https://www.npmjs.com/package/@objectifthunes/react-three-book'
export const REPO_URL = 'https://github.com/objectifthunes/react-three-book'

export interface ExportEntry {
  slug: string
  name: string
  group: GroupId
  href: string
  badge?: Badge
  lede: string
}

export type GroupId =
  | 'start'
  | 'components'
  | 'declarative'
  | 'hooks'
  | 'textures'
  | 'demokit'
  | 'reference'
  | 'live'

export const GROUPS: { id: GroupId; label: string }[] = [
  { id: 'start',       label: 'Getting started' },
  { id: 'components',  label: 'Components'      },
  { id: 'declarative', label: 'Declarative content' },
  { id: 'hooks',       label: 'Hooks'          },
  { id: 'textures',    label: 'Textures'       },
  { id: 'demokit',     label: 'Demo kit'       },
  { id: 'reference',   label: 'Reference'      },
  { id: 'live',        label: 'Live demos'     },
]

export const EXPORTS: ExportEntry[] = [
  // Getting started
  { slug: 'quick-start', name: 'Quick start', group: 'start', href: '/start/quick-start/', lede: 'Render a 3D page-turning book inside a React Three Fiber <Canvas> in a single component.' },
  { slug: 'concepts',    name: 'Core concepts', group: 'start', href: '/start/concepts/', lede: 'How the React wrapper maps onto the underlying three-book: the component, declarative content, and hooks.' },

  // Components
  { slug: 'book',        name: 'Book', group: 'components', href: '/components/book/', lede: 'The R3F component. Drop it in a <Canvas>; configure paper, binding and shadows via props.', badge: 'COMPONENT' },
  { slug: 'interaction', name: 'BookInteraction', group: 'components', href: '/components/interaction/', lede: 'Pointer-drag page turning as a child of <Book>, with optional OrbitControls hand-off.', badge: 'COMPONENT' },

  // Declarative content
  { slug: 'cover-page-spread', name: 'Cover, Page & Spread', group: 'declarative', href: '/declarative/cover-page-spread/', lede: 'Declare covers, pages and double-page spreads as JSX children instead of building BookContent by hand.', badge: 'COMPONENT' },
  { slug: 'text',              name: 'Text', group: 'declarative', href: '/declarative/text/', lede: 'A styled text block placed on a cover, page or spread — font, alignment, shadow, rotation.', badge: 'COMPONENT' },

  // Hooks
  { slug: 'use-book',          name: 'useBook & BookContext', group: 'hooks', href: '/hooks/use-book/', lede: 'Reach the underlying ThreeBook instance from any descendant of <Book>.', badge: 'HOOK' },
  { slug: 'use-book-ref',      name: 'useBookRef & usePageTurning', group: 'hooks', href: '/hooks/use-book-ref/', lede: 'Create and manage a book without JSX, and wire pointer turning by hand.', badge: 'HOOK' },
  { slug: 'use-book-controls', name: 'useBookControls', group: 'hooks', href: '/hooks/use-book-controls/', lede: 'Stable imperative controls: jump to an open state, or cancel an in-flight drag.', badge: 'HOOK' },
  { slug: 'use-auto-turn',     name: 'useAutoTurn', group: 'hooks', href: '/hooks/use-auto-turn/', lede: 'Animate page turns — next, previous, all, or a custom queue with timing.', badge: 'HOOK' },
  { slug: 'use-book-state',    name: 'useBookState', group: 'hooks', href: '/hooks/use-book-state/', lede: 'A reactive, per-frame snapshot of the book: turning, falling, idle, paper counts.', badge: 'HOOK' },
  { slug: 'use-content',       name: 'useBookContent & useTextOverlay', group: 'hooks', href: '/hooks/use-content/', lede: 'Build BookContent imperatively with automatic texture disposal, and composite live text.', badge: 'HOOK' },

  // Textures
  { slug: 'texture-utilities', name: 'Texture utilities', group: 'textures', href: '/textures/texture-utilities/', lede: 'loadImage, createPageTexture, drawImageWithFit and friends — re-exported from three-book.', badge: 'UTIL' },

  // Demo kit
  { slug: 'demo-kit', name: 'Demo kit', group: 'demokit', href: '/demokit/demo-kit/', lede: 'React form controls (Slider, ColorPicker, Select, ImageSlotCard…) for building book editors fast.' },

  // Reference
  { slug: 'types', name: 'Types index', group: 'reference', href: '/reference/types/', lede: 'BookProps, the Cover/Page/Spread/Text prop shapes, and the hook return types at a glance.', badge: 'TYPE' },
  { slug: 'enums', name: 'Enums', group: 'reference', href: '/reference/enums/', lede: 'BookDirection and AutoTurnDirection, re-exported from the core library.', badge: 'TYPE' },

  // Live demos
  { slug: 'editor',  name: 'Interactive editor', group: 'live', href: '/live/editor/', lede: 'The full React studio: tune geometry, drop in textures, and edit pages declaratively.', badge: 'FULL-SCREEN' },
  { slug: 'minimal', name: 'Minimal book', group: 'live', href: '/live/minimal/', lede: 'The smallest React setup — a <Book> with a few <Page>s you can drag to turn.', badge: 'FULL-SCREEN' },
]

export function groupOf(id: GroupId) {
  return GROUPS.find(g => g.id === id)!
}

export function exportsByGroup(id: GroupId) {
  return EXPORTS.filter(e => e.group === id)
}

export function findExport(href: string): ExportEntry | undefined {
  return EXPORTS.find(e => e.href === href)
}

export const TOTAL_EXPORTS = EXPORTS.length
