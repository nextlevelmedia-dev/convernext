import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"

export type ConversionKind = "sale" | "order" | "lead"

type SceneOptions = {
  lite: boolean
  reducedMotion: boolean
  onConvert: (kind: ConversionKind) => void
  onHover: (hovering: boolean) => void
}

const PINK = new THREE.Color("#fc03b0")
const VIOLET = new THREE.Color("#7c3aed")
const BLUE = new THREE.Color("#047cf9")
const VISITOR = new THREE.Color("#94a3b8")

// lunghezza del flusso (coordinate locali del rig) e raggio dell'anello
const L = 3.6
const R = 1.15
const KINDS: ConversionKind[] = ["sale", "order", "lead"]

const brandColor = (t: number, out: THREE.Color) =>
  t < 0.5
    ? out.copy(PINK).lerp(VIOLET, t * 2)
    : out.copy(VIOLET).lerp(BLUE, (t - 0.5) * 2)

const easeInOut = (k: number) => k * k * (3 - 2 * k)

/**
 * Visitatori (sfere grigie) entrano da sinistra, passano a spirale nell'anello
 * e una parte esce convertita in monete, pacchi e card. Il mouse inclina la
 * scena, attira i visitatori e aumenta il tasso di conversione; il click
 * genera una raffica di conversioni.
 */
export function createConversionScene(container: HTMLElement, opts: SceneOptions) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.domElement.style.display = "block"
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envScene = new RoomEnvironment()
  scene.environment = pmrem.fromScene(envScene, 0.04).texture

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60)

  scene.add(new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 0.6))
  const pinkLight = new THREE.PointLight(PINK, 18, 12)
  pinkLight.position.set(-3, 2, 3)
  const blueLight = new THREE.PointLight(BLUE, 18, 12)
  blueLight.position.set(3, -1.5, 3)
  scene.add(pinkLight, blueLight)

  const rig = new THREE.Group()
  rig.rotation.set(0.12, -0.55, 0)
  scene.add(rig)

  // ── anello ────────────────────────────────────────────────────────────────
  const gate = new THREE.Group()
  gate.rotation.y = Math.PI / 2 // normale dell'anello lungo l'asse del flusso
  rig.add(gate)

  const paintRing = (geo: THREE.BufferGeometry) => {
    const pos = geo.attributes.position
    const colors = new Float32Array(pos.count * 3)
    const c = new THREE.Color()
    for (let i = 0; i < pos.count; i++) {
      const a = Math.atan2(pos.getY(i), pos.getX(i))
      brandColor((Math.sin(a) + 1) / 2, c)
      c.toArray(colors, i * 3)
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return geo
  }

  const ringGeo = paintRing(new THREE.TorusGeometry(R, 0.065, 48, 220))
  const ring = new THREE.Mesh(
    ringGeo,
    new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false })
  )
  const haloGeo = paintRing(new THREE.TorusGeometry(R, 0.26, 32, 160))
  const haloMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
    toneMapped: false,
  })
  const halo = new THREE.Mesh(haloGeo, haloMat)
  const orbitGeo = new THREE.TorusGeometry(R * 1.32, 0.008, 8, 220)
  const orbitMat = new THREE.MeshBasicMaterial({
    color: VIOLET,
    transparent: true,
    opacity: 0.35,
    toneMapped: false,
  })
  const orbit = new THREE.Mesh(orbitGeo, orbitMat)
  gate.add(halo, ring, orbit)

  // ── visitatori ────────────────────────────────────────────────────────────
  const N = opts.lite ? 320 : 640
  const visitorGeo = new THREE.SphereGeometry(0.04, 12, 12)
  const visitorMat = new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.1 })
  const visitors = new THREE.InstancedMesh(visitorGeo, visitorMat, N)
  visitors.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  rig.add(visitors)

  const vu = new Float32Array(N)
  const vSpeed = new Float32Array(N)
  const vR0 = new Float32Array(N)
  const vTheta = new Float32Array(N)
  const vState = new Int8Array(N) // -1 in arrivo, 0 perso, 1 convertito
  const vDisp = new Float32Array(N * 3)

  const resetVisitor = (i: number, u = 0) => {
    vu[i] = u
    vSpeed[i] = 0.075 + Math.random() * 0.06
    vR0[i] = 0.5 + Math.random() * 1.7
    vTheta[i] = Math.random() * Math.PI * 2
    vState[i] = u < 0.5 ? -1 : 0
  }
  for (let i = 0; i < N; i++) resetVisitor(i, Math.random())

  // ── conversioni (monete, pacchi, card) ───────────────────────────────────
  const M = opts.lite ? 70 : 120
  const convMat = new THREE.MeshPhysicalMaterial({
    metalness: 0.6,
    roughness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  })
  const coinGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.04, 48)
  coinGeo.rotateX(Math.PI / 2)
  const shapes: Record<ConversionKind, THREE.InstancedMesh> = {
    sale: new THREE.InstancedMesh(coinGeo, convMat, M),
    order: new THREE.InstancedMesh(new RoundedBoxGeometry(0.24, 0.24, 0.24, 3, 0.05), convMat, M),
    lead: new THREE.InstancedMesh(new RoundedBoxGeometry(0.34, 0.22, 0.04, 3, 0.03), convMat, M),
  }

  type Conv = {
    alive: boolean
    age: number
    life: number
    pos: THREE.Vector3
    vel: THREE.Vector3
    rot: THREE.Euler
    spin: THREE.Vector3
  }
  const pools = {} as Record<ConversionKind, Conv[]>
  const tmpColor = new THREE.Color()
  for (const kind of KINDS) {
    const mesh = shapes[kind]
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    pools[kind] = Array.from({ length: M }, (_, i) => {
      mesh.setColorAt(i, brandColor(Math.random(), tmpColor))
      return {
        alive: false,
        age: 0,
        life: 1,
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        rot: new THREE.Euler(),
        spin: new THREE.Vector3(),
      }
    })
    rig.add(mesh)
  }

  const spawn = (from: THREE.Vector3, burst = false) => {
    const kind = KINDS[(Math.random() * KINDS.length) | 0]
    const c = pools[kind].find((p) => !p.alive)
    if (!c) return kind
    c.alive = true
    c.age = 0
    c.life = 3 + Math.random() * 1.4
    c.pos.copy(from)
    if (burst) {
      c.vel.set(0.6 + Math.random() * 1.4, (Math.random() - 0.5) * 2.2, (Math.random() - 0.5) * 2.2)
    } else {
      c.vel.set(0.75 + Math.random() * 0.45, (Math.random() - 0.35) * 0.55, (Math.random() - 0.5) * 0.55)
    }
    c.rot.set(Math.random() * 6, Math.random() * 6, 0)
    c.spin.set((Math.random() - 0.5) * 3, 1 + Math.random() * 2, (Math.random() - 0.5) * 2)
    return kind
  }

  // ── interazione ───────────────────────────────────────────────────────────
  const pointer = new THREE.Vector2()
  const target = new THREE.Vector2()
  const raycaster = new THREE.Raycaster()
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  const hitWorld = new THREE.Vector3()
  const hitLocal = new THREE.Vector3()
  let hovering = false
  let boost = 0
  let pulse = 0
  let hasHit = false

  const toPointer = (e: PointerEvent) => {
    const r = container.getBoundingClientRect()
    target.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
  }
  const onMove = (e: PointerEvent) => {
    toPointer(e)
    if (!hovering) {
      hovering = true
      opts.onHover(true)
    }
  }
  const onLeave = () => {
    hovering = false
    target.set(0, 0)
    opts.onHover(false)
  }
  const onDown = (e: PointerEvent) => {
    toPointer(e)
    pulse = 1
    const center = new THREE.Vector3(0, 0, 0)
    let kind: ConversionKind = "lead"
    for (let i = 0; i < 16; i++) kind = spawn(center, true)
    opts.onConvert(kind)
  }
  container.addEventListener("pointermove", onMove)
  container.addEventListener("pointerleave", onLeave)
  container.addEventListener("pointerdown", onDown)

  // ── loop ──────────────────────────────────────────────────────────────────
  const m4 = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const p = new THREE.Vector3()
  const s = new THREE.Vector3()
  const zero = new THREE.Vector3(0, 0, 0)
  const hidden = new THREE.Matrix4().makeScale(0, 0, 0)
  const highlight = new THREE.Color()
  let elapsed = 0
  let lastNotify = 0

  const update = (dt: number) => {
    elapsed += dt
    boost += ((hovering ? 1 : 0) - boost) * Math.min(1, dt * 3)
    pulse *= Math.exp(-dt * 3)

    pointer.lerp(target, Math.min(1, dt * 4))
    rig.rotation.y = -0.55 + Math.sin(elapsed * 0.25) * 0.05 + pointer.x * 0.32
    rig.rotation.x = 0.12 - pointer.y * 0.22
    rig.updateMatrixWorld()

    raycaster.setFromCamera(target, camera)
    hasHit = hovering && raycaster.ray.intersectPlane(plane, hitWorld) !== null
    if (hasHit) hitLocal.copy(rig.worldToLocal(hitLocal.copy(hitWorld)))

    gate.rotation.x += dt * (0.35 + boost * 1.4)
    const gs = 1 + pulse * 0.12 + boost * 0.04
    gate.scale.setScalar(gs)
    haloMat.opacity = 0.1 + boost * 0.14 + pulse * 0.2
    orbit.rotation.z -= dt * 0.6
    orbitMat.opacity = 0.25 + boost * 0.35

    const rate = 0.2 + boost * 0.4
    const speedMul = 1 + boost * 0.45
    const follow = Math.min(1, dt * 6)
    const release = Math.min(1, dt * 2.5)

    for (let i = 0; i < N; i++) {
      vu[i] += vSpeed[i] * dt * speedMul
      if (vu[i] >= 1) resetVisitor(i)

      const u = vu[i]
      let scale = 1
      if (u < 0.5) {
        const k = u / 0.5
        const r = vR0[i] * (1 - easeInOut(k) * 0.72)
        const th = vTheta[i] + k * 2.4
        p.set(-L + k * L, Math.cos(th) * r, Math.sin(th) * r)
        scale = Math.min(1, u * 12)
      } else {
        if (vState[i] === -1) {
          const r = vR0[i] * 0.28
          const th = vTheta[i] + 2.4
          p.set(0, Math.cos(th) * r, Math.sin(th) * r)
          if (Math.random() < rate) {
            vState[i] = 1
            const kind = spawn(p)
            const gap = hovering ? 0.7 : 1.5
            if (elapsed - lastNotify > gap) {
              lastNotify = elapsed
              pulse = Math.max(pulse, 0.35)
              opts.onConvert(kind)
            }
          } else {
            vState[i] = 0
          }
        }
        if (vState[i] === 1) {
          visitors.setMatrixAt(i, hidden)
          continue
        }
        const k = (u - 0.5) / 0.5
        const r = vR0[i] * 0.28 * (1 + k * 1.5)
        const th = vTheta[i] + 2.4 + k * 0.8
        p.set(k * L * 0.75, Math.cos(th) * r - k * k * 1.8, Math.sin(th) * r)
        scale = 1 - k
      }

      // magnete: i visitatori vicini al cursore vengono attirati e si colorano
      const ix = i * 3
      let pull = 0
      if (hasHit) {
        const dx = hitLocal.x - p.x
        const dy = hitLocal.y - p.y
        const dz = hitLocal.z - p.z
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (d < 1.4) {
          pull = 1 - d / 1.4
          const f = pull * 0.55
          vDisp[ix] += (dx * f - vDisp[ix]) * follow
          vDisp[ix + 1] += (dy * f - vDisp[ix + 1]) * follow
          vDisp[ix + 2] += (dz * f - vDisp[ix + 2]) * follow
        }
      }
      if (pull === 0) {
        vDisp[ix] -= vDisp[ix] * release
        vDisp[ix + 1] -= vDisp[ix + 1] * release
        vDisp[ix + 2] -= vDisp[ix + 2] * release
      }
      p.x += vDisp[ix]
      p.y += vDisp[ix + 1]
      p.z += vDisp[ix + 2]

      s.setScalar(scale * (1 + pull * 0.6))
      m4.compose(p, q.identity(), s)
      visitors.setMatrixAt(i, m4)
      visitors.setColorAt(i, highlight.copy(VISITOR).lerp(brandColor(i / N, tmpColor), pull))
    }
    visitors.instanceMatrix.needsUpdate = true
    if (visitors.instanceColor) visitors.instanceColor.needsUpdate = true

    for (const kind of KINDS) {
      const mesh = shapes[kind]
      const pool = pools[kind]
      for (let i = 0; i < M; i++) {
        const c = pool[i]
        if (!c.alive) {
          mesh.setMatrixAt(i, hidden)
          continue
        }
        c.age += dt
        if (c.age >= c.life) {
          c.alive = false
          mesh.setMatrixAt(i, hidden)
          continue
        }
        c.vel.multiplyScalar(1 - Math.min(1, dt * 0.6))
        c.vel.y += dt * 0.12
        c.vel.x = Math.max(c.vel.x, 0.35)
        c.pos.addScaledVector(c.vel, dt)
        c.rot.x += c.spin.x * dt
        c.rot.y += c.spin.y * dt
        c.rot.z += c.spin.z * dt
        const grow = Math.min(1, c.age / 0.3)
        const fade = Math.min(1, (c.life - c.age) / 0.7)
        s.setScalar(easeInOut(grow) * fade)
        m4.compose(c.pos, q.setFromEuler(c.rot), s)
        mesh.setMatrixAt(i, m4)
      }
      mesh.instanceMatrix.needsUpdate = true
    }
  }

  const resize = () => {
    const w = container.clientWidth
    const h = container.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    camera.aspect = w / h
    // inquadra tutto il flusso anche su contenitori stretti
    const fitW = 6.8 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect)
    const fitH = 4.6 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)))
    camera.position.set(0, 0.25, Math.max(fitW, fitH))
    camera.lookAt(zero)
    camera.updateProjectionMatrix()
    if (opts.reducedMotion) renderer.render(scene, camera)
  }
  const ro = new ResizeObserver(resize)
  ro.observe(container)
  resize()

  const clock = new THREE.Clock()
  let running = false

  const frame = () => {
    update(Math.min(clock.getDelta(), 1 / 20))
    renderer.render(scene, camera)
  }

  if (opts.reducedMotion) {
    update(0)
    renderer.render(scene, camera)
  }

  return {
    setRunning(on: boolean) {
      if (opts.reducedMotion || on === running) return
      running = on
      if (on) {
        clock.getDelta()
        renderer.setAnimationLoop(frame)
      } else {
        renderer.setAnimationLoop(null)
      }
    },
    dispose() {
      renderer.setAnimationLoop(null)
      ro.disconnect()
      container.removeEventListener("pointermove", onMove)
      container.removeEventListener("pointerleave", onLeave)
      container.removeEventListener("pointerdown", onDown)
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          ;(Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose())
        }
      })
      scene.environment?.dispose()
      envScene.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
