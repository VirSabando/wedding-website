import { useEffect, useRef } from 'react'

const FOLIAGE_ASSETS = [
  { src: '/background-assets/foliage/hoja_1.svg', kind: 'leaf', baseSize: 26 },
  { src: '/background-assets/foliage/hoja_2.svg', kind: 'leaf', baseSize: 24 },
  { src: '/background-assets/foliage/hoja_3.svg', kind: 'leaf', baseSize: 22 },
  { src: '/background-assets/foliage/hoja_4.svg', kind: 'leaf', baseSize: 23 },
  { src: '/background-assets/foliage/hoja_5.svg', kind: 'leaf', baseSize: 20 },
  { src: '/background-assets/foliage/hoja_6.svg', kind: 'leaf', baseSize: 19 },
  { src: '/background-assets/foliage/hoja_7.svg', kind: 'leaf', baseSize: 17 },
  { src: '/background-assets/foliage/flor_1.svg', kind: 'flower', baseSize: 28 },
  { src: '/background-assets/foliage/flor_2.svg', kind: 'flower', baseSize: 27 },
  { src: '/background-assets/foliage/flor_3.svg', kind: 'flower', baseSize: 29 },
]

const MAX_ELEMENTS = 6
const EVASION_RADIUS = 90

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function pickAsset() {
  return Math.random() < 0.84
    ? FOLIAGE_ASSETS[Math.floor(Math.random() * 7)]
    : FOLIAGE_ASSETS[7 + Math.floor(Math.random() * 3)]
}

function spawnParticle(isInitial) {
  const width = window.innerWidth
  const height = window.innerHeight
  const edge = Math.floor(Math.random() * 4)

  let x
  let y
  let vx
  let vy
  const baseSpeed = Math.random() * 0.55 + 0.18

  if (edge === 0) {
    x = Math.random() * width
    y = -50
    vx = (Math.random() - 0.5) * 0.9
    vy = baseSpeed
  } else if (edge === 1) {
    x = width + 50
    y = Math.random() * height
    vx = -baseSpeed
    vy = (Math.random() - 0.5) * 0.9
  } else if (edge === 2) {
    x = Math.random() * width
    y = height + 50
    vx = (Math.random() - 0.5) * 0.9
    vy = -baseSpeed
  } else {
    x = -50
    y = Math.random() * height
    vx = baseSpeed
    vy = (Math.random() - 0.5) * 0.9
  }

  if (isInitial) {
    x = Math.random() * width
    y = Math.random() * height
  }

  const asset = pickAsset()

  return {
    x,
    y,
    vx,
    vy,
    baseSpeed,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 0.55,
    swayPhase: Math.random() * Math.PI * 2,
    swaySpeed: Math.random() * 0.012 + 0.004,
    swayAmount: Math.random() * 24 + 12,
    driftPhase: Math.random() * Math.PI * 2,
    driftSpeed: Math.random() * 0.008 + 0.002,
    driftAmount: Math.random() * 0.055 + 0.02,
    driftBias: Math.random() * Math.PI * 2,
    size: asset.baseSize * (Math.random() * 0.22 + 0.9),
    kind: asset.kind,
    src: asset.src,
  }
}

export default function FoliageAmbient() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const container = containerRef.current
    if (!container) return undefined

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')

    if (reduceMotionQuery.matches || !finePointerQuery.matches) {
      return undefined
    }

    const mouse = { x: -1000, y: -1000 }
    const particles = []
    const domElements = []

    function updateMouse(event) {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    window.addEventListener('mousemove', updateMouse, { passive: true })

    for (let index = 0; index < MAX_ELEMENTS; index += 1) {
      const particle = spawnParticle(true)
      particles.push(particle)

      const element = document.createElement('div')
      element.className = 'celebrate-particle'
      element.style.width = `${particle.size}px`
      element.style.height = `${particle.size}px`

      const image = document.createElement('img')
      image.src = particle.src
      image.alt = ''
      image.loading = 'eager'
      image.decoding = 'async'
      image.draggable = false
      image.className = particle.kind === 'flower'
        ? 'celebrate-particle-image celebrate-particle-flower'
        : 'celebrate-particle-image'

      element.appendChild(image)
      container.appendChild(element)
      domElements.push(element)
    }

    let rafId = 0

    function renderLoop() {
      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.rotation += particle.rotationSpeed
        particle.swayPhase += particle.swaySpeed
        particle.driftPhase += particle.driftSpeed

        const swayBase = Math.abs(particle.vx) + Math.abs(particle.vy) || 1
        const swayOffsetX = Math.cos(particle.swayPhase) * particle.swayAmount * (particle.vy / swayBase)
        const swayOffsetY = Math.sin(particle.swayPhase) * particle.swayAmount * (particle.vx / swayBase)

        const driftX = Math.cos(particle.driftPhase + particle.driftBias) * particle.driftAmount
        const driftY = Math.sin(particle.driftPhase + particle.driftBias) * particle.driftAmount
        particle.vx += driftX
        particle.vy += driftY

        const dx = particle.x + swayOffsetX - mouse.x
        const dy = particle.y + swayOffsetY - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < EVASION_RADIUS) {
          const force = (EVASION_RADIUS - distance) / EVASION_RADIUS
          const safeDistance = distance || 0.0001
          particle.vx += (dx / safeDistance) * force * 0.2
          particle.vy += (dy / safeDistance) * force * 0.2
        }

        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        if (speed > particle.baseSpeed * 2.2) {
          particle.vx *= 0.925
          particle.vy *= 0.925
        } else {
          particle.vx *= 0.985
          particle.vy *= 0.985
        }

        const padding = 100
        if (
          particle.x < -padding || particle.x > window.innerWidth + padding ||
          particle.y < -padding || particle.y > window.innerHeight + padding
        ) {
          const nextParticle = spawnParticle(false)
          Object.assign(particle, nextParticle)

          domElements[index].style.width = `${particle.size}px`
          domElements[index].style.height = `${particle.size}px`
          const image = domElements[index].querySelector('img')
          if (image) {
            image.src = particle.src
            image.className = particle.kind === 'flower'
              ? 'celebrate-particle-image celebrate-particle-flower'
              : 'celebrate-particle-image'
          }
        }

        domElements[index].style.transform = `translate(${particle.x + swayOffsetX}px, ${particle.y + swayOffsetY}px) rotate(${particle.rotation}deg)`
      })

      rafId = window.requestAnimationFrame(renderLoop)
    }

    rafId = window.requestAnimationFrame(renderLoop)

    return () => {
      window.removeEventListener('mousemove', updateMouse)
      if (rafId) window.cancelAnimationFrame(rafId)
      particles.length = 0
      domElements.forEach((element) => element.remove())
      domElements.length = 0
    }
  }, [])

  return <div ref={containerRef} id="celebrate" className="celebrate-root" aria-hidden="true" />
}