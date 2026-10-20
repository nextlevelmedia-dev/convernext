import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import type { SceneApi, SceneEnv } from "../three/useLazyScene"

const PINK = new THREE.Color("#fc03b0")
const VIOLET = new THREE.Color("#7c3aed")
const BLUE = new THREE.Color("#047cf9")
const DUST = new THREE.Color("#94a3b8")

const brandColor = (t: number, out: THREE.Color) =>
  t < 0.5
    ? out.copy(PINK).lerp(VIOLET, t * 2)
    : out.copy(VIOLET).lerp(BLUE, (t - 0.5) * 2)

// gradiente del brand sui vertici, in diagonale
const paint = (geo: THREE.BufferGeometry, axis = new THREE.Vector3(1, 1, 0.4).normalize()) => {
  geo.computeBoundingSphere()
  const r = geo.boundingSphere?.radius || 1
  const pos = geo.attributes.position
  const colors = new Float32Array(pos.count * 3)
  const v = new THREE.Vector3()
  const c = new THREE.Color()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i)
    brandColor(THREE.MathUtils.clamp(0.5 - v.dot(axis) / (2 * r), 0, 1), c)
    c.toArray(colors, i * 3)
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
  return geo
}

const glowTexture = () => {
  const size = 256
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = size
  const ctx = canvas.getContext("2d")!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, "rgba(124,58,237,0.55)")
  g.addColorStop(0.45, "rgba(252,3,176,0.18)")
  g.addColorStop(1, "rgba(4,124,249,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/**
 * Sfera Convernext: nucleo lucido col gradiente del brand, due orbite con
 * satelliti e una nube di particelle. Il mouse inclina la scena e accelera
 * le orbite; il click fa pulsare il nucleo.
 */
export function createContactOrb(container: HTMLElement, env: SceneEnv): SceneApi {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.domElement.style.display = "block"
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envScene = new RoomEnvironment()
  scene.environment = pmrem.fromScene(envScene, 0.04).texture

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50)
  scene.add(new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 0.5))
  const pinkLight = new THREE.PointLight(PINK, 22, 10)
  pinkLight.position.set(-2.5, 2, 2.5)
  const blueLight = new THREE.PointLight(BLUE, 22, 10)
  blueLight.position.set(2.5, -1.5, 2.5)
  scene.add(pinkLight, blueLight)

  const rig = new THREE.Group()
  scene.add(rig)

  // alone dietro al nucleo
  const glowMap = glowTexture()
  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: glowMap, transparent: true, depthWrite: false })
  )
  glow.scale.setScalar(4.6)
  rig.add(glow)

  // nucleo
  const core = new THREE.Mesh(
    paint(new THREE.SphereGeometry(0.85, 96, 96)),
    new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      roughness: 0.16,
      metalness: 0.15,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      iridescence: 0.5,
      iridescenceIOR: 1.4,
    })
  )
  rig.add(core)

  // orbite con satelliti
  const satGeo = new THREE.SphereGeometry(0.06, 20, 20)
  const satMat = new THREE.MeshPhysicalMaterial({
    vertexColors: false,
    roughness: 0.2,
    metalness: 0.4,
    clearcoat: 1,
  })
  const orbits = [
    { radius: 1.55, tilt: new THREE.Euler(1.25, 0.2, 0.35), speed: 0.55, sats: 3, color: PINK },
    { radius: 1.25, tilt: new THREE.Euler(-0.95, 0.65, -0.2), speed: -0.8, sats: 2, color: BLUE },
  ].map((o) => {
    const group = new THREE.Group()
    group.rotation.copy(o.tilt)
    const ring = new THREE.Mesh(
      paint(new THREE.TorusGeometry(o.radius, 0.008, 8, 240)),
      new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.75, toneMapped: false })
    )
    group.add(ring)
    const sats = Array.from({ length: o.sats }, (_, i) => {
      const mat = satMat.clone()
      mat.color.copy(o.color)
      const sat = new THREE.Mesh(satGeo, mat)
      sat.userData.phase = (i / o.sats) * Math.PI * 2
      group.add(sat)
      return sat
    })
    rig.add(group)
    return { ...o, group, ring, sats }
  })

  // nube di particelle
  const D = env.lite ? 220 : 420
  const dustPos = new Float32Array(D * 3)
  const dustCol = new Float32Array(D * 3)
  const c = new THREE.Color()
  for (let i = 0; i < D; i++) {
    const r = 1.5 + Math.random() * 1.6
    const th = Math.random() * Math.PI * 2
    const ph = Math.acos(2 * Math.random() - 1)
    dustPos[i * 3] = r * Math.sin(ph) * Math.cos(th)
    dustPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.8
    dustPos[i * 3 + 2] = r * Math.cos(ph)
    ;(Math.random() < 0.55 ? c.copy(DUST) : brandColor(Math.random(), c)).toArray(dustCol, i * 3)
  }
  const dustGeo = new THREE.BufferGeometry()
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3))
  dustGeo.setAttribute("color", new THREE.BufferAttribute(dustCol, 3))
  const dustMat = new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  })
  const dust = new THREE.Points(dustGeo, dustMat)
  rig.add(dust)

  // ── interazione ───────────────────────────────────────────────────────────
  const pointer = new THREE.Vector2()
  const target = new THREE.Vector2()
  let hovering = false
  let boost = 0
  let pulse = 0

  const onMove = (e: PointerEvent) => {
    const r = container.getBoundingClientRect()
    target.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    hovering = true
  }
  const onLeave = () => {
    hovering = false
    target.set(0, 0)
  }
  const onDown = () => {
    pulse = 1
  }
  container.addEventListener("pointermove", onMove)
  container.addEventListener("pointerleave", onLeave)
  container.addEventListener("pointerdown", onDown)

  let elapsed = 0
  const update = (dt: number) => {
    elapsed += dt
    boost += ((hovering ? 1 : 0) - boost) * Math.min(1, dt * 3)
    pulse *= Math.exp(-dt * 2.5)
    pointer.lerp(target, Math.min(1, dt * 4))

    rig.rotation.y = pointer.x * 0.45 + Math.sin(elapsed * 0.3) * 0.08
    rig.rotation.x = -pointer.y * 0.35

    core.rotation.y += dt * (0.25 + boost * 0.9)
    core.position.y = Math.sin(elapsed * 1.1) * 0.05
    core.scale.setScalar(1 + boost * 0.04 + Math.sin(pulse * Math.PI) * 0.12)
    glow.material.opacity = 0.8 + boost * 0.2 + pulse * 0.4
    glow.scale.setScalar(4.6 + pulse * 1.2)

    for (const o of orbits) {
      const speed = o.speed * (1 + boost * 1.6 + pulse * 2)
      o.group.rotation.z += dt * speed * 0.15
      for (const sat of o.sats) {
        const a = sat.userData.phase + elapsed * speed
        sat.position.set(Math.cos(a) * o.radius, Math.sin(a) * o.radius, 0)
      }
    }

    dust.rotation.y += dt * (0.04 + boost * 0.2)
    dust.rotation.x = Math.sin(elapsed * 0.2) * 0.1
    dust.scale.setScalar(1 + pulse * 0.25)
  }

  const resize = () => {
    const w = container.clientWidth
    const h = container.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    camera.aspect = w / h
    const half = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    camera.position.set(0, 0, Math.max(2.6 / half, 2.6 / (half * camera.aspect)))
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
    if (env.reducedMotion) renderer.render(scene, camera)
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

  if (env.reducedMotion) {
    update(0)
    renderer.render(scene, camera)
  }

  return {
    setRunning(on) {
      if (env.reducedMotion || on === running) return
      running = on
      if (on) clock.getDelta()
      renderer.setAnimationLoop(on ? frame : null)
    },
    dispose() {
      renderer.setAnimationLoop(null)
      ro.disconnect()
      container.removeEventListener("pointermove", onMove)
      container.removeEventListener("pointerleave", onLeave)
      container.removeEventListener("pointerdown", onDown)
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points || o instanceof THREE.Sprite) {
          o.geometry.dispose()
          ;(Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose())
        }
      })
      glowMap.dispose()
      scene.environment?.dispose()
      envScene.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
