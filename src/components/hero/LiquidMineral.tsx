import { useEffect, useRef } from 'react'
import { lerp } from '@/lib/utils'

interface Point {
  x: number
  y: number
}

function mineralPoints(
  cx: number,
  cy: number,
  radius: number,
  time: number,
  mouseX: number,
  mouseY: number,
  segments = 12,
): Point[] {
  const mx = (mouseX - 0.5) * 0.4
  const my = (mouseY - 0.5) * 0.35

  return Array.from({ length: segments }, (_, i) => {
    const angle = (i / segments) * Math.PI * 2 - Math.PI / 2
    const wobble =
      Math.sin(time * 0.65 + i * 1.3) * 0.11 + Math.cos(time * 0.42 + i * 0.85) * 0.07
    const facet = i % 3 === 0 ? 1.06 : i % 2 === 0 ? 0.94 : 1
    const r = radius * facet * (0.9 + wobble)
    return {
      x: cx + Math.cos(angle + mx * 0.45) * r,
      y: cy + Math.sin(angle + my * 0.45) * r * 1.15,
    }
  })
}

function drawPath(ctx: CanvasRenderingContext2D, points: Point[]) {
  if (points.length < 3) return
  ctx.beginPath()
  ctx.moveTo(points[0]!.x, points[0]!.y)
  for (let i = 1; i < points.length; i++) {
    const p = points[i]!
    const prev = points[i - 1]!
    const cpx = (prev.x + p.x) / 2
    const cpy = (prev.y + p.y) / 2
    ctx.quadraticCurveTo(prev.x, prev.y, cpx, cpy)
  }
  ctx.closePath()
}

export function LiquidMineral() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouse = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    let frame = 0
    const draw = (now: number) => {
      const time = now * 0.001
      const { width, height } = canvas.getBoundingClientRect()

      smoothMouse.current.x = lerp(smoothMouse.current.x, mouseRef.current.x, 0.06)
      smoothMouse.current.y = lerp(smoothMouse.current.y, mouseRef.current.y, 0.06)

      const cx = width * (0.62 + (smoothMouse.current.x - 0.5) * 0.09)
      const cy = height * (0.4 + (smoothMouse.current.y - 0.5) * 0.07)
      const radius = Math.min(width, height) * 0.26

      ctx.clearRect(0, 0, width, height)

      const outer = mineralPoints(cx, cy, radius, time, smoothMouse.current.x, smoothMouse.current.y)
      const inner = mineralPoints(
        cx - radius * 0.06,
        cy + radius * 0.04,
        radius * 0.52,
        time * 1.25,
        smoothMouse.current.x,
        smoothMouse.current.y,
        8,
      )

      const glow = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.5)
      glow.addColorStop(0, 'rgba(255, 120, 180, 0.16)')
      glow.addColorStop(1, 'rgba(255, 196, 221, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      drawPath(ctx, outer.map((p) => ({ x: p.x + 10, y: p.y + 16 })))
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fill()

      const bodyGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius)
      bodyGrad.addColorStop(0, '#ffe0f0')
      bodyGrad.addColorStop(0.35, '#ff6eb0')
      bodyGrad.addColorStop(0.7, '#e84d8a')
      bodyGrad.addColorStop(1, '#c93d72')

      drawPath(ctx, outer)
      ctx.fillStyle = bodyGrad
      ctx.fill()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      const facetGrad = ctx.createLinearGradient(cx, cy - radius * 0.5, cx, cy + radius * 0.5)
      facetGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)')
      facetGrad.addColorStop(1, 'rgba(255, 45, 107, 0.3)')

      drawPath(ctx, inner)
      ctx.fillStyle = facetGrad
      ctx.fill()

      for (const p of outer) {
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(p.x, p.y)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)'
        ctx.lineWidth = 0.7
        ctx.stroke()
      }

      ctx.beginPath()
      ctx.ellipse(cx - radius * 0.22, cy - radius * 0.28, radius * 0.16, radius * 0.09, -0.4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.fill()

      frame = requestAnimationFrame(draw)
    }

    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}
