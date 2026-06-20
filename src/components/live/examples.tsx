'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import {
  Book,
  BookInteraction,
  StapleBookBinding,
  Cover,
  Page,
  Spread,
  Text,
  AutoTurnSettings,
  AutoTurnDirection,
  type ThreeBook,
} from '@objectifthunes/react-three-book'
import { LiveR3FStage } from './LiveR3FStage'
import { LiveRow, LiveButton, LiveSlider, LiveToggle, LiveReadout } from './controls'

const PAGE_COLOR = '#f5efe0'
const COVER_COLOR = '#7b3f00'

function pagePaperSetup() {
  return { width: 2, height: 3, thickness: 0.02, stiffness: 0.2, color: new THREE.Color(1, 1, 1), material: null as THREE.Material | null }
}
function coverPaperSetup() {
  return { width: 2.1, height: 3.1, thickness: 0.04, stiffness: 0.5, color: new THREE.Color(1, 1, 1), material: null as THREE.Material | null }
}

/** Lights, ground (from the stage) + OrbitControls + <Book> opened to its first page. */
function BookFrame({ bookRef, onReady, openToPage = 1, children }: {
  bookRef: React.RefObject<ThreeBook | null>
  onReady?: (book: ThreeBook) => void
  openToPage?: number
  children: ReactNode
}) {
  const orbit = useRef<{ enabled: boolean } | null>(null)
  const binding = useMemo(() => new StapleBookBinding(), [])
  const handleBuilt = useCallback((book: ThreeBook) => {
    try { book.setOpenProgressByIndex(book.coverPaperCount + openToPage) } catch { /* noop */ }
    onReady?.(book)
  }, [onReady, openToPage])
  return (
    <>
      <OrbitControls ref={orbit as never} makeDefault enableDamping dampingFactor={0.05} enablePan={false} minDistance={2.5} maxDistance={12} target={[0, 0, 0]} />
      <Book
        ref={bookRef}
        binding={binding}
        initialOpenProgress={0}
        castShadows
        pagePaperSetup={pagePaperSetup()}
        coverPaperSetup={coverPaperSetup()}
        onBuilt={handleBuilt}
      >
        <BookInteraction orbitControlsRef={orbit} />
        {children}
      </Book>
    </>
  )
}

// Return arrays of Cover/Page elements — React flattens arrays into direct
// children of <Book>, which is how the declarative content collector finds them.
function coverEls() {
  return [0, 1, 2, 3].map((i) => <Cover key={`c${i}`} color={COVER_COLOR} />)
}

function pageEls(count = 8, from = 1) {
  return Array.from({ length: count }).map((_, i) => (
    <Page key={`p${from + i}`} color={PAGE_COLOR} />
  ))
}

/** A draggable book, opened to page 1. */
export function LiveBook({ pageCount = 8, hint = 'Drag a page to turn it · drag the background to orbit' }: { pageCount?: number; hint?: string }) {
  const bookRef = useRef<ThreeBook | null>(null)
  return (
    <LiveR3FStage hint={hint}>
      <BookFrame bookRef={bookRef}>{coverEls()}{pageEls(pageCount)}</BookFrame>
    </LiveR3FStage>
  )
}

/** Programmatic page turns via book.startAutoTurning(). */
export function LiveAutoTurn() {
  const bookRef = useRef<ThreeBook | null>(null)
  const settings = useMemo(() => new AutoTurnSettings(), [])
  const turn = (dir: AutoTurnDirection, count = 1) => bookRef.current?.startAutoTurning(dir, settings, count)
  return (
    <LiveR3FStage
      hint="Each button drives the book — turnNext / turnPrev / turnAll under the hood"
      controls={
        <LiveRow>
          <LiveButton onClick={() => turn(AutoTurnDirection.Next, 1)}>Next ▸</LiveButton>
          <LiveButton onClick={() => turn(AutoTurnDirection.Back, 1)}>◂ Prev</LiveButton>
          <LiveButton onClick={() => turn(AutoTurnDirection.Next, 99)}>Flip to end</LiveButton>
          <LiveButton onClick={() => turn(AutoTurnDirection.Back, 99)}>Back to start</LiveButton>
        </LiveRow>
      }
    >
      <BookFrame bookRef={bookRef}>{coverEls()}{pageEls(10)}</BookFrame>
    </LiveR3FStage>
  )
}

/** Imperative open-progress via book.setOpenProgress(t). */
export function LiveControls() {
  const bookRef = useRef<ThreeBook | null>(null)
  const [v, setV] = useState(0)
  const onChange = (val: number) => { setV(val); bookRef.current?.setOpenProgress(val) }
  return (
    <LiveR3FStage
      hint="The slider calls book.setOpenProgress(t) — 0 closed, 1 fully open"
      controls={<LiveSlider label="openProgress" min={0} max={1} step={0.01} value={v} onChange={onChange} format={(x) => x.toFixed(2)} />}
    >
      <BookFrame bookRef={bookRef} openToPage={-1}>{coverEls()}{pageEls(8)}</BookFrame>
    </LiveR3FStage>
  )
}

/** Reactive state read off the live book each frame. */
export function LiveState() {
  const bookRef = useRef<ThreeBook | null>(null)
  const [s, setS] = useState({ turning: false, falling: false, idle: true, progress: 0, papers: 0 })
  useEffect(() => {
    const id = setInterval(() => {
      const b = bookRef.current
      if (b) setS({ turning: b.isTurning, falling: b.isFalling, idle: b.isIdle, progress: b.openProgress, papers: b.paperCount })
    }, 100)
    return () => clearInterval(id)
  }, [])
  return (
    <LiveR3FStage
      hint="Drag a page — these read off the book every frame (useBookState in the source)"
      controls={
        <LiveRow>
          <LiveReadout label="isTurning" value={String(s.turning)} />
          <LiveReadout label="isFalling" value={String(s.falling)} />
          <LiveReadout label="isIdle" value={String(s.idle)} />
          <LiveReadout label="openProgress" value={s.progress.toFixed(2)} />
          <LiveReadout label="paperCount" value={s.papers} />
        </LiveRow>
      }
    >
      <BookFrame bookRef={bookRef}>{coverEls()}{pageEls(8)}</BookFrame>
    </LiveR3FStage>
  )
}

/** Declarative content: the whole book is Cover / Page JSX. */
export function LiveDeclarative() {
  const bookRef = useRef<ThreeBook | null>(null)
  return (
    <LiveR3FStage hint="Every surface is JSX — <Cover>, <Page>, <Spread> and <Text> children of <Book>">
      <BookFrame bookRef={bookRef}>
        <Cover color="#1f3a5f" />
        <Cover color="#1f3a5f" />
        <Cover color="#1f3a5f" />
        <Cover color="#1f3a5f" />
        {pageEls(8)}
      </BookFrame>
    </LiveR3FStage>
  )
}

/** Pages carry styled text (the page labels are <Text> rendered by the library). */
export function LiveText() {
  const bookRef = useRef<ThreeBook | null>(null)
  return (
    <LiveR3FStage hint="Each page here carries a <Text> block — drag to leaf through them">
      <BookFrame bookRef={bookRef}>{coverEls()}{pageEls(8)}</BookFrame>
    </LiveR3FStage>
  )
}

function usePatternImage() {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  useEffect(() => {
    const c = document.createElement('canvas')
    c.width = 700; c.height = 500
    const ctx = c.getContext('2d')!
    const g = ctx.createLinearGradient(0, 0, 700, 500)
    g.addColorStop(0, '#1e3a8a'); g.addColorStop(0.5, '#9333ea'); g.addColorStop(1, '#db2777')
    ctx.fillStyle = g; ctx.fillRect(0, 0, 700, 500)
    ctx.fillStyle = '#fff'; ctx.font = 'bold 90px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('PHOTO', 350, 250)
    const image = new Image()
    image.onload = () => setImg(image)
    image.src = c.toDataURL('image/png')
  }, [])
  return img
}

/** An image on a page with the three fit modes. */
export function LiveTextures() {
  const bookRef = useRef<ThreeBook | null>(null)
  const img = usePatternImage()
  const [fit, setFit] = useState<'contain' | 'cover' | 'fill'>('cover')
  const [fullBleed, setFullBleed] = useState(true)
  return (
    <LiveR3FStage
      hint="<Page image={img} fitMode=… fullBleed> draws an image with the chosen fit"
      controls={
        <LiveRow>
          {(['contain', 'cover', 'fill'] as const).map((f) => (
            <LiveButton key={f} active={fit === f} onClick={() => setFit(f)}>{f}</LiveButton>
          ))}
          <LiveToggle label="fullBleed" checked={fullBleed} onChange={setFullBleed} />
        </LiveRow>
      }
    >
      <BookFrame bookRef={bookRef} key={`${fit}-${fullBleed}-${img ? 1 : 0}`}>
        {coverEls()}
        <Page color={PAGE_COLOR} />
        <Page color={PAGE_COLOR} image={img ?? undefined} fitMode={fit} fullBleed={fullBleed} />
        {pageEls(6)}
      </BookFrame>
    </LiveR3FStage>
  )
}
