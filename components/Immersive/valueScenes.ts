import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import type { SceneApi, SceneEnv } from "../three/useLazyScene"

/*
 * Scene 3D della proposta di valore (landing immersiva).
 * - createWindowScene: finestra del browser lucida in gradient brand, da cui
 *   esce una sfera 3D (il sito che "buca" lo schermo) cliccata da un cursore.
 * - createBagScene: shopping bag lucida in gradient brand che ruota.
 * Stesso materiale e stessa luce: le due card sembrano una collezione.
 * Entrambe seguono il mouse sulla card intera (.vs-portal) e si aprono
 * quando ci si passa sopra. Con "riduci movimento" restano ferme.
 */

const PINK = new THREE.Color("#fc03b0")
const VIOLET = new THREE.Color("#7c3aed")
const BLUE = new THREE.Color("#047cf9")

const brandColor = (t: number, out: THREE.Color) =>
  t < 0.5 ? out.copy(PINK).lerp(VIOLET, t * 2) : out.copy(VIOLET).lerp(BLUE, (t - 0.5) * 2)

const damp = (a: number, b: number, k: number) => a + (b - a) * k

type Frame = (t: number, s: { px: number; py: number; hover: number }) => void

/** renderer, camera, resize, puntatore e loop comuni */
function base(el: HTMLElement, env: SceneEnv, fov = 30) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, env.lite ? 1.5 : 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.domElement.className = "vs-canvas"
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 50)
  camera.position.set(0, 0, 6)

  const resize = () => {
    const w = el.clientWidth
    const h = el.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(el)

  // puntatore relativo alla card intera, non solo alla scena
  const card = (el.closest(".vs-portal") as HTMLElement | null) ?? el
  const target = { px: 0, py: 0, hover: 0 }
  const state = { px: 0, py: 0, hover: 0 }
  const move = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return
    const r = card.getBoundingClientRect()
    target.px = ((e.clientX - r.left) / r.width - 0.5) * 2
    target.py = ((e.clientY - r.top) / r.height - 0.5) * 2
    target.hover = 1
  }
  const leave = () => {
    target.px = 0
    target.py = 0
    target.hover = 0
  }
  card.addEventListener("pointermove", move)
  card.addEventListener("pointerleave", leave)

  let raf = 0
  let running = false
  let frame: Frame = () => {}
  const clock = new THREE.Clock()

  const tick = () => {
    raf = requestAnimationFrame(tick)
    const k = env.reducedMotion ? 1 : 0.06
    state.px = damp(state.px, target.px, k)
    state.py = damp(state.py, target.py, k)
    state.hover = damp(state.hover, target.hover, env.reducedMotion ? 1 : 0.05)
    frame(env.reducedMotion ? 0 : clock.getElapsedTime(), state)
    renderer.render(scene, camera)
  }

  const api = (onDispose: () => void): SceneApi => ({
    setRunning(on) {
      if (on === running) return
      running = on
      if (on) {
        clock.start()
        tick()
      } else cancelAnimationFrame(raf)
    },
    dispose() {
      cancelAnimationFrame(raf)
      ro.disconnect()
      card.removeEventListener("pointermove", move)
      card.removeEventListener("pointerleave", leave)
      onDispose()
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          const mats = Array.isArray(o.material) ? o.material : [o.material]
          mats.forEach((m) => {
            Object.values(m).forEach((v) => v instanceof THREE.Texture && v.dispose())
            m.dispose()
          })
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    },
  })

  return { renderer, scene, camera, setFrame: (f: Frame) => (frame = f), api }
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.decoding = "async"
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/** alone morbido (radial gradient) da usare come glow o ombra */
function glowTexture(inner: string, outer: string) {
  const c = document.createElement("canvas")
  c.width = c.height = 256
  const g = c.getContext("2d")!
  const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128)
  grd.addColorStop(0, inner)
  grd.addColorStop(1, outer)
  g.fillStyle = grd
  g.fillRect(0, 0, 256, 256)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}


/** gradient brand per vertice: diagonale da rosa (alto sx) a blu (basso dx) */
function paintBrand(geo: THREE.BufferGeometry, w: number, h: number) {
  const pos = geo.attributes.position
  const colors = new Float32Array(pos.count * 3)
  const col = new THREE.Color()
  for (let i = 0; i < pos.count; i++) {
    const t = THREE.MathUtils.clamp((pos.getX(i) / w + 0.5) * 0.6 + (0.5 - pos.getY(i) / h) * 0.4, 0, 1)
    brandColor(t, col)
    colors.set([col.r, col.g, col.b], i * 3)
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
  geo.computeVertexNormals()
}

/** materiale lucido comune (borsa, finestra, sfera) */
const glossy = () =>
  new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    roughness: 0.4,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    iridescence: 0.25,
    iridescenceIOR: 1.3,
  })

/** ambiente + luci: riflessi morbidi e controluce rosa/blu */
function studio(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
  const pmrem = new THREE.PMREMGenerator(renderer)
  const room = new RoomEnvironment()
  scene.environment = pmrem.fromScene(room, 0.04).texture
  scene.environmentIntensity = 0.45
  const key = new THREE.DirectionalLight("#ffffff", 0.9)
  key.position.set(2.5, 3, 4)
  scene.add(key)
  const rimPink = new THREE.PointLight(PINK, 18, 10)
  rimPink.position.set(-2.4, 1.2, -1.2)
  scene.add(rimPink)
  const rimBlue = new THREE.PointLight(BLUE, 18, 10)
  rimBlue.position.set(2.4, -0.6, -1.4)
  scene.add(rimBlue)
  return () => {
    scene.environment?.dispose()
    room.dispose()
    pmrem.dispose()
  }
}

/** scintille che orbitano attorno all'oggetto */
function addSparks(scene: THREE.Scene) {
  const mat = new THREE.MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.1, clearcoat: 1, iridescence: 1 })
  return Array.from({ length: 4 }, (_, i) => {
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.07 + (i % 2) * 0.03, 0), mat)
    scene.add(m)
    return m
  })
}
function moveSparks(sparks: THREE.Mesh[], t: number, hover: number, y = 0.15) {
  sparks.forEach((m, i) => {
    const a = t * (0.5 + i * 0.08) + (i * Math.PI) / 2
    const rad = 1.25 + (i % 2) * 0.25 + hover * 0.2
    m.position.set(Math.cos(a) * rad, y + Math.sin(t * 0.9 + i) * 0.45, Math.sin(a) * rad * 0.6)
    m.rotation.set(t + i, t * 1.3, 0)
  })
}

/** ombra morbida a terra */
function addShadow(scene: THREE.Scene, y: number, size = 2.6) {
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({ map: glowTexture("rgba(168,60,214,0.65)", "rgba(0,0,0,0)"), transparent: true, depthWrite: false })
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = y
  scene.add(shadow)
  return shadow
}

function roundedRectShape(w: number, h: number, r: number, path: THREE.Path = new THREE.Shape()) {
  path.moveTo(-w / 2 + r, -h / 2)
  path.lineTo(w / 2 - r, -h / 2)
  path.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
  path.lineTo(w / 2, h / 2 - r)
  path.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
  path.lineTo(-w / 2 + r, h / 2)
  path.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
  path.lineTo(-w / 2, -h / 2 + r)
  path.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)
  return path
}

/* ------------------------------------------------------- finestra del browser */

export async function createWindowScene(el: HTMLElement, env: SceneEnv): Promise<SceneApi> {
  const { renderer, scene, camera, setFrame, api } = base(el, env, 30)
  camera.position.set(0, 0.35, 6.4)
  camera.lookAt(0, 0.05, 0)
  const disposeStudio = studio(renderer, scene)

  const W = 2.3
  const H = 1.6
  const bar = 0.24
  const pad = 0.09
  const depth = 0.14
  const win = new THREE.Group()

  // cornice: finestra arrotondata con il foro dello schermo, estrusa con bevel
  const outer = roundedRectShape(W, H, 0.16) as THREE.Shape
  const sw = W - pad * 2
  const sh = H - bar - pad
  const sy = -H / 2 + pad + sh / 2 // centro dello schermo
  const hole = new THREE.Path()
  roundedRectShape(sw, sh, 0.08, hole)
  const holePts = hole.getPoints(8).map((v) => new THREE.Vector2(v.x, v.y + sy))
  outer.holes.push(new THREE.Path(holePts))
  const frameGeo = new THREE.ExtrudeGeometry(outer, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 5,
    curveSegments: 14,
  })
  frameGeo.translate(0, 0, -depth / 2)
  paintBrand(frameGeo, W, H)
  win.add(new THREE.Mesh(frameGeo, glossy()))

  // schermo: un "portale" scuro con una luce al centro
  const screen = new THREE.Mesh(
    new THREE.ShapeGeometry(roundedRectShape(sw, sh, 0.08) as THREE.Shape, 10),
    new THREE.MeshStandardMaterial({ color: "#12081f", roughness: 0.6, metalness: 0.2 })
  )
  screen.position.set(0, sy, -depth / 2 + 0.01)
  win.add(screen)
  const portalGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(sw * 0.95, sh * 1.1),
    new THREE.MeshBasicMaterial({
      map: glowTexture("rgba(252,3,176,0.55)", "rgba(0,0,0,0)"),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  )
  portalGlow.position.set(0, sy, -depth / 2 + 0.02)
  win.add(portalGlow)

  // barra: tre pallini e la barra dell'indirizzo, in bianco perlato
  const pearl = new THREE.MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.25, clearcoat: 1 })
  const barY = H / 2 - bar / 2 - 0.02
  for (let i = 0; i < 3; i++) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 12), pearl)
    dot.position.set(-W / 2 + 0.2 + i * 0.11, barY, depth / 2 + 0.05)
    win.add(dot)
  }
  const address = new THREE.Mesh(
    new THREE.ShapeGeometry(roundedRectShape(0.9, 0.075, 0.0375) as THREE.Shape, 8),
    new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.55, toneMapped: false })
  )
  address.position.set(0.15, barY, depth / 2 + 0.045)
  win.add(address)

  // la sfera che esce dallo schermo, con un anello che le gira attorno
  const orbGeo = new THREE.SphereGeometry(0.42, 64, 48)
  paintBrand(orbGeo, 0.84, 0.84)
  const orb = new THREE.Mesh(orbGeo, glossy())
  win.add(orb)
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.62, 0.018, 12, 96),
    new THREE.MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.2, clearcoat: 1, iridescence: 1 })
  )
  win.add(ring)

  // cursore 3D bianco che clicca la sfera, con un'onda a ogni click
  const arrow = new THREE.Shape()
  arrow.moveTo(0, 0)
  arrow.lineTo(0, -0.42)
  arrow.lineTo(0.1, -0.33)
  arrow.lineTo(0.17, -0.48)
  arrow.lineTo(0.235, -0.45)
  arrow.lineTo(0.165, -0.3)
  arrow.lineTo(0.3, -0.3)
  arrow.closePath()
  const cursorGeo = new THREE.ExtrudeGeometry(arrow, {
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 3,
  })
  const cursor = new THREE.Mesh(cursorGeo, new THREE.MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.2, clearcoat: 1 }))
  win.add(cursor)
  const ripple = new THREE.Mesh(
    new THREE.RingGeometry(0.06, 0.085, 48),
    new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0, depthWrite: false, toneMapped: false })
  )
  win.add(ripple)

  scene.add(win)
  const sparks = addSparks(scene)
  const shadow = addShadow(scene, -1.25, 3.2)

  setFrame((t, s) => {
    const lift = s.hover * 0.1
    win.position.y = Math.sin(t * 1.0) * 0.05 + lift
    win.rotation.y = -0.42 + Math.sin(t * 0.4) * 0.12 + s.px * 0.4
    win.rotation.x = 0.05 + s.py * 0.15
    win.rotation.z = Math.sin(t * 0.6) * 0.02

    // la sfera "respira" fuori dallo schermo; col mouse sopra esce di più
    const out = 0.38 + Math.sin(t * 0.9) * 0.08 + s.hover * 0.22
    orb.position.set(0, sy + 0.02, out)
    orb.rotation.y = t * 0.5
    ring.position.copy(orb.position)
    ring.rotation.set(1.15 + Math.sin(t * 0.5) * 0.1, t * 0.35, 0.3)

    // click ogni 2,4 s: il cursore si avvicina e preme, l'onda si allarga
    const c = (t % 2.4) / 2.4
    const press = c < 0.12 ? Math.sin((c / 0.12) * Math.PI) : 0
    cursor.position.set(0.3 - press * 0.03, sy - 0.12 + press * 0.03, out + 0.45 - press * 0.08)
    cursor.rotation.set(0, 0, 0.18)
    const rp = c < 0.6 ? c / 0.6 : 1
    ripple.position.set(0.28, sy - 0.1, out + 0.42)
    ripple.scale.setScalar(1 + rp * 4)
    ;(ripple.material as THREE.MeshBasicMaterial).opacity = c < 0.6 ? 0.7 * (1 - rp) : 0

    shadow.scale.setScalar(1 - win.position.y * 0.6)
    moveSparks(sparks, t, s.hover, 0.1)
  })

  return api(disposeStudio)
}

/* ------------------------------------------------------------ shopping bag */

export async function createBagScene(el: HTMLElement, env: SceneEnv): Promise<SceneApi> {
  const { renderer, scene, camera, setFrame, api } = base(el, env, 30)
  // un po' dall'alto, così si vede l'apertura della borsa
  camera.position.set(0, 1.35, 6.1)
  camera.lookAt(0, 0.05, 0)
  const disposeStudio = studio(renderer, scene)

  // corpo alla Shopify: più stretto in alto, più largo e tondo in basso, estruso con bevel
  const W1 = 1.1 // alto
  const W0 = 1.38 // basso
  const H = 1.4
  const rb = 0.24 // angoli in basso, morbidi
  const rt = 0.05 // angoli in alto, quasi vivi
  const shape = new THREE.Shape()
  shape.moveTo(-W0 / 2 + rb, -H / 2)
  shape.lineTo(W0 / 2 - rb, -H / 2)
  shape.quadraticCurveTo(W0 / 2, -H / 2, W0 / 2 - 0.015, -H / 2 + rb)
  shape.lineTo(W1 / 2, H / 2 - rt)
  shape.quadraticCurveTo(W1 / 2 - 0.004, H / 2, W1 / 2 - rt, H / 2)
  shape.lineTo(-W1 / 2 + rt, H / 2)
  shape.quadraticCurveTo(-W1 / 2 + 0.004, H / 2, -W1 / 2, H / 2 - rt)
  shape.lineTo(-W0 / 2 + 0.015, -H / 2 + rb)
  shape.quadraticCurveTo(-W0 / 2, -H / 2, -W0 / 2 + rb, -H / 2)

  const depth = 0.6
  const bodyGeo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 6,
    curveSegments: 16,
  })
  bodyGeo.translate(0, 0, -depth / 2)
  paintBrand(bodyGeo, W0, H)

  const bag = new THREE.Group()
  bag.add(new THREE.Mesh(bodyGeo, glossy()))

  // apertura in alto: interno scuro + bordo a cornice, così si legge come una borsa
  const top = H / 2 + 0.05 // il bevel sporge di 0.05 oltre la sagoma
  const ow = W1 + 0.1
  const od = depth + 0.1
  const iw = W1 - 0.04
  const id = depth - 0.06
  const opening = new THREE.Mesh(
    new THREE.PlaneGeometry(iw, id),
    new THREE.MeshStandardMaterial({ color: "#1a0a2e", roughness: 0.9 })
  )
  opening.rotation.x = -Math.PI / 2
  opening.position.y = top + 0.003
  bag.add(opening)

  const frame = new THREE.Shape()
  frame.moveTo(-ow / 2, -od / 2)
  frame.lineTo(ow / 2, -od / 2)
  frame.lineTo(ow / 2, od / 2)
  frame.lineTo(-ow / 2, od / 2)
  frame.closePath()
  const hole = new THREE.Path()
  hole.moveTo(-iw / 2, -id / 2)
  hole.lineTo(-iw / 2, id / 2)
  hole.lineTo(iw / 2, id / 2)
  hole.lineTo(iw / 2, -id / 2)
  hole.closePath()
  frame.holes.push(hole)
  const rim = new THREE.Mesh(
    new THREE.ExtrudeGeometry(frame, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3 }),
    new THREE.MeshPhysicalMaterial({ color: "#d946ef", roughness: 0.3, clearcoat: 1 })
  )
  rim.rotation.x = -Math.PI / 2
  rim.position.y = top - 0.01
  bag.add(rim)

  // manico alla Shopify: un'unica ansa ad arco, sottile, che esce dal centro dell'apertura
  const handleMat = new THREE.MeshPhysicalMaterial({ color: "#f5f3ff", roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.2 })
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.27, H / 2 - 0.04, 0),
    new THREE.Vector3(-0.27, H / 2 + 0.24, 0),
    new THREE.Vector3(-0.17, H / 2 + 0.42, 0),
    new THREE.Vector3(0, H / 2 + 0.47, 0),
    new THREE.Vector3(0.17, H / 2 + 0.42, 0),
    new THREE.Vector3(0.27, H / 2 + 0.24, 0),
    new THREE.Vector3(0.27, H / 2 - 0.04, 0),
  ])
  bag.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.034, 14, false), handleMat))

  // logo Convernext in bianco sul fronte
  const logo = await loadImage("/logo-convernext.svg").catch(() => null)
  if (logo) {
    const c = document.createElement("canvas")
    c.width = 1010
    c.height = 106
    const g = c.getContext("2d")!
    g.drawImage(logo, 0, 0, c.width, c.height)
    g.globalCompositeOperation = "source-in"
    g.fillStyle = "#ffffff"
    g.fillRect(0, 0, c.width, c.height)
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
    const lw = 0.86
    const mark = new THREE.Mesh(
      new THREE.PlaneGeometry(lw, (lw * c.height) / c.width),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false })
    )
    mark.position.set(0, 0.02, depth / 2 + 0.052)
    bag.add(mark)
  }

  bag.position.y = -0.15
  scene.add(bag)
  const sparks = addSparks(scene)
  const shadow = addShadow(scene, -1.15)

  setFrame((t, s) => {
    const lift = s.hover * 0.12
    bag.position.y = -0.15 + Math.sin(t * 1.1) * 0.06 + lift
    bag.rotation.y = Math.sin(t * 0.45) * 0.55 + s.px * 0.5
    bag.rotation.x = 0.06 + s.py * 0.18
    bag.rotation.z = Math.sin(t * 0.7) * 0.03
    shadow.scale.setScalar(1 - (bag.position.y + 0.15) * 0.8)
    moveSparks(sparks, t, s.hover)
  })

  return api(disposeStudio)
}
