import type * as THREE_NS from "three"

/*
 * Renderer WebGL delle anteprime delle demo: ogni immagine è un piano
 * suddiviso in tanti segmenti, deformato da uno shader.
 * - ai bordi della finestra il piano si curva all'indietro (rullo)
 * - la velocità dello scroll lo fa ondeggiare come un telo
 * - scorrendo veloce i colori si separano leggermente (RGB shift)
 * - al passaggio del mouse l'immagine "respira" con un'onda leggera
 * Le coordinate sono in pixel: 1 unità = 1px della finestra.
 */

const vertex = /* glsl */ `
  uniform float uVel;
  uniform float uHalfH;
  uniform float uCenterY;
  uniform float uHover;
  uniform float uTime;
  uniform float uPhase;
  varying vec2 vUv;
  varying float vBend;

  void main() {
    vUv = uv;
    vec4 w = modelMatrix * vec4(position, 1.0);

    // -1 in basso, 1 in alto rispetto al centro della zona visibile.
    // Si curva solo in alto, quando esce sotto il titolo: dal basso entra piatta.
    float ny = clamp((w.y - uCenterY) / uHalfH, -1.6, 1.6);
    float e = smoothstep(0.3, 1.15, ny);
    float bend = e * e;
    w.z -= bend * uHalfH * 0.95;
    w.y -= bend * uHalfH * 0.22;

    // onda continua, come un telo mosso dall'aria (ogni card con il suo ritmo)
    float t = uTime * 1.1 + uPhase;
    w.z += sin(uv.x * 3.3 + t) * sin(uv.y * 3.14159) * 16.0;
    w.z += sin(uv.y * 4.0 - t * 0.8) * 7.0;
    w.y += sin(uv.x * 2.6 + t * 0.9) * 3.0;

    // onda dalla velocità: il centro del telo resta indietro rispetto ai bordi
    float arc = sin(uv.x * 3.14159);
    w.z += arc * uVel * 7.0;
    w.y += arc * uVel * 1.6;

    // al passaggio del mouse: increspatura lenta
    w.z += sin(uv.x * 6.2831 + uTime * 2.2) * sin(uv.y * 3.14159) * uHover * 18.0;

    vBend = bend;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`

const fragment = /* glsl */ `
  uniform sampler2D uTex;
  uniform vec2 uPlane;
  uniform vec2 uImg;
  uniform float uVel;
  uniform float uHover;
  uniform float uRadius;
  uniform float uAlpha;
  varying vec2 vUv;
  varying float vBend;

  // object-fit: cover, allineata in alto
  vec2 coverUv(vec2 uv) {
    float rp = uPlane.x / uPlane.y;
    float ri = uImg.x / uImg.y;
    vec2 s = rp > ri ? vec2(1.0, ri / rp) : vec2(rp / ri, 1.0);
    return vec2((1.0 - s.x) * 0.5 + uv.x * s.x, (1.0 - s.y) + uv.y * s.y);
  }

  void main() {
    vec2 uv = (vUv - 0.5) * (1.0 - 0.05 * uHover) + 0.5;
    vec2 cuv = coverUv(uv);
    vec2 shift = vec2(0.0, clamp(uVel, -40.0, 40.0) * 0.0009);
    vec3 col = vec3(
      texture2D(uTex, cuv + shift).r,
      texture2D(uTex, cuv).g,
      texture2D(uTex, cuv - shift).b
    );
    col *= 1.0 - vBend * 0.55;

    // angoli arrotondati
    vec2 p = (vUv - 0.5) * uPlane;
    vec2 q = abs(p) - uPlane * 0.5 + uRadius;
    float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRadius;
    float a = 1.0 - smoothstep(-1.0, 1.0, d);

    gl_FragColor = vec4(col, a * uAlpha);
  }
`

export type WaveItem = { url: string; el: HTMLElement; hoverEl: HTMLElement }
export type WaveRect = { x: number; y: number; w: number; h: number }

export async function createWaveRenderer(canvas: HTMLCanvasElement, items: WaveItem[]) {
  const THREE: typeof THREE_NS = await import("three")

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" })
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 1, 6000)
  const geometry = new THREE.PlaneGeometry(1, 1, 40, 40)
  const loader = new THREE.TextureLoader()

  const meshes = items.map((item) => {
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      uniforms: {
        uTex: { value: null },
        uPlane: { value: new THREE.Vector2(1, 1) },
        uImg: { value: new THREE.Vector2(16, 10) },
        uVel: { value: 0 },
        uHalfH: { value: 400 },
        uCenterY: { value: 0 },
        uHover: { value: 0 },
        uTime: { value: 0 },
        uPhase: { value: Math.random() * Math.PI * 2 },
        uRadius: { value: 14 },
        uAlpha: { value: 0 },
      },
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.visible = false
    scene.add(mesh)

    loader.load(item.url, (tex) => {
      tex.colorSpace = THREE.NoColorSpace // colori così come sono nel file
      tex.minFilter = THREE.LinearFilter
      tex.generateMipmaps = false
      material.uniforms.uTex.value = tex
      material.uniforms.uImg.value.set(tex.image.width, tex.image.height)
      mesh.visible = true
      // da qui l'immagine la disegna il WebGL: quella HTML resta solo per layout e accessibilità
      item.el.style.opacity = "0"
    })

    return { mesh, material, item, hover: 0 }
  })

  let width = 1
  let height = 1

  return {
    setSize(w: number, h: number) {
      width = w
      height = h
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      // distanza tale che a z=0 un'unità corrisponda a un pixel
      const dist = 1000
      camera.position.set(0, 0, dist)
      camera.fov = (2 * Math.atan(h / 2 / dist) * 180) / Math.PI
      camera.updateProjectionMatrix()
    },

    /** rects in px relativi alla finestra, center = y della zona dove le card sono piatte */
    render(rects: WaveRect[], vel: number, center: number, half: number, time: number, alpha: number[]) {
      meshes.forEach((m, i) => {
        const r = rects[i]
        if (!r) return
        const hovering = m.item.hoverEl.matches(":hover")
        m.hover += ((hovering ? 1 : 0) - m.hover) * 0.08
        m.mesh.scale.set(r.w, r.h, 1)
        m.mesh.position.set(r.x + r.w / 2 - width / 2, height / 2 - (r.y + r.h / 2), 0)
        const u = m.material.uniforms
        u.uPlane.value.set(r.w, r.h)
        u.uVel.value = vel
        u.uHalfH.value = half
        u.uCenterY.value = height / 2 - center
        u.uHover.value = m.hover
        u.uTime.value = time
        u.uAlpha.value = alpha[i] ?? 1
      })
      renderer.render(scene, camera)
    },

    dispose() {
      meshes.forEach((m) => {
        m.material.uniforms.uTex.value?.dispose()
        m.material.dispose()
        m.item.el.style.opacity = ""
      })
      geometry.dispose()
      renderer.dispose()
    },
  }
}
