import { motion, useReducedMotion } from 'framer-motion'

/**
 * A layered, parallaxing neon city skyline rendered as SVG. Two building
 * layers drift gently in opposite directions; lit windows twinkle.
 */
export function CitySkyline() {
  const reduce = useReducedMotion()

  const Buildings = ({
    fill,
    opacity,
    bars,
    baseY,
  }: {
    fill: string
    opacity: number
    bars: [number, number, number][]
    baseY: number
  }) => (
    <g fill={fill} opacity={opacity}>
      {bars.map(([x, w, h], i) => (
        <g key={i}>
          <rect x={x} y={baseY - h} width={w} height={h} rx={2} />
          {/* lit windows */}
          {Array.from({ length: Math.floor(h / 14) }).map((_, r) =>
            Array.from({ length: Math.max(1, Math.floor(w / 12)) }).map((_, c) => (
              <rect
                key={`${r}-${c}`}
                x={x + 4 + c * 12}
                y={baseY - h + 8 + r * 14}
                width={4}
                height={6}
                fill="rgb(var(--neon-blue) / 0.9)"
                opacity={(i + r + c) % 3 === 0 ? 0.9 : 0.25}
              />
            )),
          )}
        </g>
      ))}
    </g>
  )

  const farBars: [number, number, number][] = [
    [0, 60, 160], [70, 50, 110], [130, 70, 200], [210, 45, 130], [265, 60, 175],
    [335, 55, 100], [400, 75, 220], [485, 50, 140], [545, 65, 185], [620, 55, 120],
    [685, 70, 210], [765, 50, 150], [825, 60, 190], [895, 55, 110], [960, 70, 230],
    [1040, 50, 140], [1100, 65, 180], [1175, 55, 120], [1240, 70, 200],
  ]
  const nearBars: [number, number, number][] = [
    [20, 90, 240], [130, 80, 320], [230, 100, 200], [350, 85, 380], [460, 95, 260],
    [580, 90, 340], [700, 100, 220], [820, 85, 360], [940, 95, 280], [1070, 90, 330],
    [1190, 100, 240],
  ]

  return (
    <div className="absolute inset-x-0 bottom-0 h-[55vh] overflow-hidden" aria-hidden>
      {/* neon sun */}
      <motion.div
        className="absolute left-1/2 bottom-[28%] h-72 w-72 -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgb(var(--neon-orange)) 0%, rgb(var(--neon-pink)) 55%, transparent 72%)',
          filter: 'blur(2px)',
        }}
        animate={reduce ? undefined : { opacity: [0.8, 1, 0.8], scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* sun scanline mask bands */}
      <div className="absolute left-1/2 bottom-[28%] h-72 w-72 -translate-x-1/2 [background:repeating-linear-gradient(transparent_0_14px,rgb(var(--bg))_14px_18px)]" />

      <motion.svg
        viewBox="0 0 1280 400"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { x: [0, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Buildings fill="rgb(var(--neon-purple) / 0.9)" opacity={0.35} bars={farBars} baseY={400} />
      </motion.svg>

      <motion.svg
        viewBox="0 0 1280 400"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { x: [0, 22, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Buildings fill="rgb(var(--bg-soft))" opacity={0.96} bars={nearBars} baseY={400} />
      </motion.svg>

      {/* animated synthwave grid floor */}
      <div className="neon-grid animate-gridmove absolute inset-x-0 bottom-0 h-40" />
      {/* fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
    </div>
  )
}
