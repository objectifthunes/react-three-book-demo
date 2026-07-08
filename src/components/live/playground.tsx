'use client'

/**
 * The two flagship canvases of the docs: one playground per binding, with the
 * full option surface live — content, paper, spine setup, turning, and a
 * WYSIWYG layer (headline + spine title typed straight onto the book).
 * Every other page links here instead of mounting its own canvas.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import {
  Book,
  BookInteraction,
  StapleBookBinding,
  GluedBookBinding,
  Cover,
  Page,
  Text,
  AutoTurnSettings,
  AutoTurnDirection,
  type ThreeBook,
} from '@objectifthunes/react-three-book'
import { LiveR3FStage } from './LiveR3FStage'
import { LiveRow, LiveButton, LiveSlider, LiveToggle, LiveSwatch, LiveTextInput } from './controls'
import { illustratedPageDataUrl, coverArtDataUrl, parchmentDataUrl, loadImage } from './storybook'

export type PlaygroundKind = 'staple' | 'glued'

const PAGE_COLOR = '#f5efe0'

// ── Fantasy art, module-cached ───────────────────────────────────────────────
type Art = { cover: HTMLImageElement; parch: HTMLImageElement; plates: HTMLImageElement[] }
const PLATE_TITLES = ['The Quiet Valley', 'Over the Hills', 'The Long Road', 'Evening Falls', 'Homeward', 'A New Morning']
let _art: Art | null = null
let _artPromise: Promise<Art> | null = null
function loadArt(): Promise<Art> {
  if (_art) return Promise.resolve(_art)
  if (!_artPromise) {
    _artPromise = Promise.all([
      loadImage(coverArtDataUrl('A Storybook', '#5a3b8c')),
      loadImage(parchmentDataUrl()),
      ...PLATE_TITLES.map((t, i) => loadImage(illustratedPageDataUrl(i + 1, t))),
    ]).then(([cover, parch, ...plates]) => (_art = { cover, parch, plates }))
  }
  return _artPromise
}

/** Title art rendered down the spine, the classic rotated way. */
function makeSpineTexture(title: string, color: string): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 768
  const ctx = c.getContext('2d')!
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 128, 768)
  ctx.fillStyle = '#f0d9a8'
  ctx.font = 'bold 44px Georgia'
  ctx.textAlign = 'center'
  ctx.save()
  ctx.translate(64, 384)
  ctx.rotate(Math.PI / 2)
  ctx.fillText(title, 0, 14)
  ctx.restore()
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export function Playground({ kind }: { kind: PlaygroundKind }) {
  const glued = kind === 'glued'
  const bookRef = useRef<ThreeBook | null>(null)
  const orbit = useRef<{ enabled: boolean } | null>(null)
  const settings = useMemo(() => new AutoTurnSettings(), [])

  const [art, setArt] = useState<Art | null>(_art)
  useEffect(() => {
    let alive = true
    loadArt().then((a) => { if (alive) setArt(a) })
    return () => { alive = false }
  }, [])

  // Content
  const [fantasy, setFantasy] = useState(true)
  const [pageCount, setPageCount] = useState(8)
  const [pageColor, setPageColor] = useState(PAGE_COLOR)
  const [coverColor, setCoverColor] = useState(glued ? '#7a1f1f' : '#7b3f00')
  // Paper
  const [pageThickness, setPageThickness] = useState(0.02)
  const [stiffness, setStiffness] = useState(0.2)
  const [coverThickness, setCoverThickness] = useState(glued ? 0.06 : 0.04)
  const [rigid, setRigid] = useState(glued)
  // Book
  const [alignToGround, setAlignToGround] = useState(true)
  const [hideBinder, setHideBinder] = useState(false)
  // Glued spine
  const [hingeGap, setHingeGap] = useState(0.03)
  const [glueFlex, setGlueFlex] = useState(0.12)
  const [spineColor, setSpineColor] = useState('#7a1f1f')
  const [spineTitle, setSpineTitle] = useState('A STORYBOOK')
  // Staple spine
  const [stapleCount, setStapleCount] = useState(4)
  const [stapleCrown, setStapleCrown] = useState(0.2)
  // WYSIWYG
  const [headline, setHeadline] = useState('Once upon a time…')
  // Open progress
  const [openV, setOpenV] = useState(0)

  const binding = useMemo(() => {
    if (!glued) {
      const b = new StapleBookBinding()
      b.stapleSetup.count = stapleCount
      b.stapleSetup.crown = stapleCrown
      return b
    }
    const b = new GluedBookBinding()
    b.setup.hingeGap = hingeGap
    b.setup.glueFlexWidth = glueFlex
    b.setup.spineColor = new THREE.Color(spineColor)
    // Canvas texture needs the DOM — skip during static prerender.
    if (spineTitle.trim() && typeof document !== 'undefined') {
      b.setup.spineTexture = makeSpineTexture(spineTitle, spineColor)
    }
    return b
  }, [glued, stapleCount, stapleCrown, hingeGap, glueFlex, spineColor, spineTitle])

  const turn = (dir: AutoTurnDirection, count = 1) => bookRef.current?.startAutoTurning(dir, settings, count)

  const covers = fantasy && art
    ? [art.cover, art.parch, art.parch, art.cover].map((image, i) => (
        <Cover key={`c${i}`} color={coverColor} image={image} fitMode="cover" fullBleed />
      ))
    : [0, 1, 2, 3].map((i) => <Cover key={`c${i}`} color={coverColor} />)

  const pages = Array.from({ length: pageCount }).map((_, i) => {
    const image = fantasy && art ? art.plates[i % art.plates.length] : undefined
    return (
      <Page key={`p${i}`} color={pageColor} image={image} fitMode="cover" fullBleed={!!image}>
        {i === 0 && headline.trim() ? (
          <Text
            x={48} y={120} width={416} fontSize={42}
            fontFamily="Georgia" fontStyle="italic" color="#241a10" textAlign="center"
            shadowColor="rgba(255,246,220,0.85)" shadowBlur={10}
          >
            {headline}
          </Text>
        ) : null}
      </Page>
    )
  })

  return (
    <LiveR3FStage
      tall
      cameraPosition={[0, 3.4, 4.6]}
      hint="Drag a page to turn it · drag the background to orbit · right-drag to pan · every control below is live"
      controls={
        <>
          <LiveRow>
            <LiveButton onClick={() => turn(AutoTurnDirection.Next, 1)}>Next ▸</LiveButton>
            <LiveButton onClick={() => turn(AutoTurnDirection.Back, 1)}>◂ Prev</LiveButton>
            <LiveButton onClick={() => turn(AutoTurnDirection.Next, 99)}>Flip to end</LiveButton>
            <LiveButton onClick={() => turn(AutoTurnDirection.Back, 99)}>Back to start</LiveButton>
            <LiveSlider
              label="openProgress" min={0} max={1} step={0.01} value={openV}
              onChange={(x) => { setOpenV(x); bookRef.current?.setOpenProgress(x) }}
              format={(x) => x.toFixed(2)}
            />
          </LiveRow>
          <LiveRow>
            <LiveSlider label="pages" min={2} max={20} step={2} value={pageCount} onChange={setPageCount} />
            <LiveSlider label="page thickness" min={0.008} max={0.05} step={0.002} value={pageThickness} onChange={setPageThickness} format={(x) => x.toFixed(3)} />
            <LiveSlider label="stiffness" min={0.05} max={0.9} step={0.05} value={stiffness} onChange={setStiffness} format={(x) => x.toFixed(2)} />
            <LiveSlider label="cover thickness" min={0.02} max={0.1} step={0.005} value={coverThickness} onChange={setCoverThickness} format={(x) => x.toFixed(3)} />
            {glued
              ? <LiveToggle label="rigid boards" checked={rigid} onChange={setRigid} />
              : <LiveToggle label="hideBinder" checked={hideBinder} onChange={setHideBinder} />}
            <LiveToggle label="alignToGround" checked={alignToGround} onChange={setAlignToGround} />
          </LiveRow>
          <LiveRow>
            {glued ? (
              <>
                <LiveSlider label="hingeGap" min={0.005} max={0.1} step={0.005} value={hingeGap} onChange={setHingeGap} format={(x) => x.toFixed(3)} />
                <LiveSlider label="glueFlex" min={0.04} max={0.3} step={0.01} value={glueFlex} onChange={setGlueFlex} format={(x) => x.toFixed(2)} />
                <LiveSwatch label="spine" value={spineColor} onChange={setSpineColor} />
              </>
            ) : (
              <>
                <LiveSlider label="staples" min={2} max={10} step={1} value={stapleCount} onChange={setStapleCount} />
                <LiveSlider label="crown" min={0.05} max={0.4} step={0.01} value={stapleCrown} onChange={setStapleCrown} format={(x) => x.toFixed(2)} />
              </>
            )}
            <LiveToggle label="storybook art" checked={fantasy} onChange={setFantasy} />
            {!fantasy && (
              <>
                <LiveSwatch label="page" value={pageColor} onChange={setPageColor} />
                <LiveSwatch label="cover" value={coverColor} onChange={setCoverColor} />
              </>
            )}
          </LiveRow>
          <LiveRow>
            <LiveTextInput label="page 1 headline" value={headline} onChange={setHeadline} placeholder="Type onto the page…" />
            {glued && <LiveTextInput label="spine title" value={spineTitle} onChange={setSpineTitle} placeholder="Down the spine…" />}
          </LiveRow>
        </>
      }
    >
      <OrbitControls ref={orbit as never} makeDefault enableDamping dampingFactor={0.05} enablePan screenSpacePanning minDistance={2} maxDistance={16} target={[0, 0, 1.4]} />
      <Book
        ref={bookRef}
        binding={binding}
        initialOpenProgress={0}
        castShadows
        alignToGround={alignToGround}
        hideBinder={hideBinder}
        pagePaperSetup={{ width: 2, height: 3, thickness: pageThickness, stiffness, color: new THREE.Color(1, 1, 1), material: null }}
        coverPaperSetup={{ width: 2.1, height: 3.1, thickness: coverThickness, stiffness: 0.5, rigid, color: new THREE.Color(1, 1, 1), material: null }}
        onBuilt={(book) => {
          try { book.setOpenProgressByIndex(book.coverPaperCount) } catch { /* noop */ }
        }}
      >
        <BookInteraction orbitControlsRef={orbit} />
        {covers}
        {pages}
      </Book>
    </LiveR3FStage>
  )
}
