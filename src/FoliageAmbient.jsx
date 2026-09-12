import { useEffect, useRef } from 'react'

const LEAF_ASSETS = [
  { src: '/background-assets/foliage/hoja_1.svg', kind: 'leaf', baseSize: 26 },
  { src: '/background-assets/foliage/hoja_2.svg', kind: 'leaf', baseSize: 24 },
  { src: '/background-assets/foliage/hoja_3.svg', kind: 'leaf', baseSize: 22 },
  { src: '/background-assets/foliage/hoja_4.svg', kind: 'leaf', baseSize: 23 },
  { src: '/background-assets/foliage/hoja_5.svg', kind: 'leaf', baseSize: 20 },
  { src: '/background-assets/foliage/hoja_6.svg', kind: 'leaf', baseSize: 19 },
  { src: '/background-assets/foliage/hoja_7.svg', kind: 'leaf', baseSize: 17 },
]

const FLOWER_ASSETS = [
  { src: '/background-assets/foliage/flor_1.svg', kind: 'flower', baseSize: 28 },
  { src: '/background-assets/foliage/flor_2.svg', kind: 'flower', baseSize: 27 },
  { src: '/background-assets/foliage/flor_3.svg', kind: 'flower', baseSize: 29 },
]

const MAX_ACTIVE_FOLIAGE = 12
const SPAWN_COOLDOWN_MS = 70
const EXIT_MARGIN_PX = 72

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function pickRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function pickAsset() {
  if (Math.random() < 0.9) {
    return pickRandomItem(LEAF_ASSETS)
  }

  return pickRandomItem(FLOWER_ASSETS)
}

function pickExitTarget(viewportWidth, viewportHeight) {
  const edge = pickRandomItem(['left', 'right', 'top', 'bottom'])

  switch (edge) {
    case 'left':
      return { x: -EXIT_MARGIN_PX, y: randomBetween(0, viewportHeight) }
    case 'right':
      return { x: viewportWidth + EXIT_MARGIN_PX, y: randomBetween(0, viewportHeight) }
    case 'top':
      return { x: randomBetween(0, viewportWidth), y: -EXIT_MARGIN_PX }
    default:
      return { x: randomBetween(0, viewportWidth), y: viewportHeight + EXIT_MARGIN_PX }
  }
}

export default function FoliageAmbient() {
  const layerRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const layer = layerRef.current
    if (!layer) return undefined

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')

    if (reduceMotionQuery.matches || !finePointerQuery.matches) {
      return undefined
    }

    const activeItems = new Set()
    let lastSpawnAt = 0

    function removeItem(node) {
      if (node?.parentNode === layer) {
        layer.removeChild(node)
      }
      activeItems.delete(node)
    }

    function spawnFoliage(pointerX, pointerY, movementX, movementY) {
      const movementMagnitude = Math.hypot(movementX, movementY)
      if (movementMagnitude < 1) return

      const now = performance.now()
      if (now - lastSpawnAt < SPAWN_COOLDOWN_MS) return
      lastSpawnAt = now

      const spawnCount = movementMagnitude > 18 ? 2 : 1
      const movementInfluence = Math.min(1.4, movementMagnitude / 16)


      for (let spawnIndex = 0; spawnIndex < spawnCount; spawnIndex += 1) {
        if (activeItems.size >= MAX_ACTIVE_FOLIAGE) {
          const oldest = activeItems.values().next().value
          if (oldest) removeItem(oldest)
        }

        const asset = pickAsset()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const spawnRadius = randomBetween(12, 30 + movementMagnitude * 0.14)
        const spawnAngle = Math.random() * Math.PI * 2
        const startX = pointerX + Math.cos(spawnAngle) * spawnRadius
        const startY = pointerY + Math.sin(spawnAngle) * spawnRadius
        const exitTarget = pickExitTarget(viewportWidth, viewportHeight)
        const travelX = exitTarget.x - startX
        const travelY = exitTarget.y - startY
        const midX = startX + travelX * 0.18 + randomBetween(-10, 10) + movementX * 0.025 * movementInfluence
        const midY = startY + travelY * 0.18 + randomBetween(-10, 10) + movementY * 0.025 * movementInfluence
        const size = Math.round(asset.baseSize * randomBetween(0.82, 1.12))
        const spinDirection = Math.random() < 0.5 ? -1 : 1
        const startRotation = randomBetween(-20, 20)
        const midRotation = startRotation + spinDirection * randomBetween(28, 76)
        const endRotation = midRotation + spinDirection * randomBetween(18, 54)
        const startScale = randomBetween(0.8, 0.92)
        const midScale = randomBetween(0.88, 0.98)
        const endScale = randomBetween(0.76, 0.88)
        const duration = randomBetween(5200, 7600) - movementMagnitude * 10

        const node = document.createElement('div')
        node.className = 'celebrate-particle'
        node.style.width = `${size}px`

        const image = document.createElement('img')
        image.src = asset.src
        image.alt = ''
        image.draggable = false
        image.decoding = 'async'
        image.loading = 'eager'
        image.className = asset.kind === 'flower' ? 'celebrate-particle-image celebrate-particle-flower' : 'celebrate-particle-image'

        node.appendChild(image)
        layer.appendChild(node)
        activeItems.add(node)

        const animation = node.animate(
          [
            {
              left: `${startX}px`,
              top: `${startY}px`,
              opacity: 0,
              transform: `translate(-50%, -50%) rotate(${startRotation}deg) scale(${startScale})`,
            },
            {
              left: `${midX}px`,
              top: `${midY}px`,
              opacity: 0.7,
              offset: 0.45,
              transform: `translate(-50%, -50%) rotate(${midRotation}deg) scale(${midScale})`,
            },
            {
              left: `${exitTarget.x}px`,
              top: `${exitTarget.y}px`,
              opacity: 0,
              transform: `translate(-50%, -50%) rotate(${endRotation}deg) scale(${endScale})`,
            },
          ],
          {
            duration,
            easing: 'cubic-bezier(0.12, 0.82, 0.18, 1)',
            fill: 'forwards',
          }
        )

        animation.onfinish = () => removeItem(node)
        animation.oncancel = () => removeItem(node)
      }
    }

    function onPointerMove(event) {
      spawnFoliage(event.clientX, event.clientY, event.movementX, event.movementY)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      activeItems.forEach((node) => {
        if (node?.parentNode === layer) {
          layer.removeChild(node)
        }
      })
      activeItems.clear()
    }
  }, [])

  return (
    <div id="celebrate" className="celebrate-root" aria-hidden="true">
      <div ref={layerRef} className="celebrate-layer" />
    </div>
  )
}