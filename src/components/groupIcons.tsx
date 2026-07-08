import {
  Boxes,
  BookMarked,
  PlayCircle,
  Image,
  ListTree,
  Rocket,
  SlidersHorizontal,
  SquareCode,
  Type,
  Webhook,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type { GroupId } from './exports'

export const GROUP_ICONS: Record<GroupId, LucideIcon> = {
  play:        PlayCircle,
  start:       Rocket,
  components:  Boxes,
  binding:     BookMarked,
  declarative: SquareCode,
  hooks:       Webhook,
  textures:    Image,
  demokit:     SlidersHorizontal,
  reference:   Wrench,
}

/** Use this for sidebar nav items + group eyebrows. */
export function GroupIcon({ group, size = 12 }: { group: GroupId; size?: number }) {
  const Icon = GROUP_ICONS[group] ?? ListTree
  return <Icon size={size} strokeWidth={1.75} />
}
