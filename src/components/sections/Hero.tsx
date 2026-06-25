import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FaPlay, FaCompass, FaCircleInfo, FaAnglesDown } from 'react-icons/fa6'
import { CitySkyline } from '../background/CitySkyline'
import { ParticleField } from '../background/ParticleField'
import { Palms } from '../background/Palms'
import { CountdownUnits } from '../countdown/CountdownUnits'
import { ReleasedBanner } from '../countdown/ReleasedBanner'
import { formatReleaseDateLabel } from '../../utils/time'
import release from '../../data/release.json'
import type { TimeLeft } from '../../types'

interface HeroProps {
  timeLeft: TimeLeft
}

export function Hero({ timeLeft }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="scanlines relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-28 sm:px-6"
    >
      {/* atmosphere */}
      <CitySkyline />
      <ParticleField />
      <Palms />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="chip mb-6 shadow-glow"
        >
          ● Coming {formatReleaseDateLabel(release.releaseDateISO)}
        </motion.span>

        {timeLeft.isReleased ? (
          <ReleasedBanner />
        ) : (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-5xl uppercase leading-[0.95] tracking-wide sm:text-7xl md:text-8xl"
            >
              <span className="text-text">GTA VI is</span>{' '}
              <span className="text-gradient text-glow">almost here.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-5 max-w-xl text-base text-muted sm:text-xl"
            >
              Every second brings us closer to Vice City.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-10 w-full"
            >
              <CountdownUnits timeLeft={timeLeft} size="lg" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <a href="#trailer" className="btn-primary">
                <FaPlay /> Watch Trailer
              </a>
              <a href="#info" className="btn-ghost">
                <FaCompass /> Explore GTA VI
              </a>
              <a href="#countdown" className="btn-ghost">
                <FaCircleInfo /> Release Details
              </a>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* scroll hint */}
      {!reduce && (
        <motion.a
          href="#countdown"
          aria-label="Scroll down"
          className="absolute bottom-6 z-10 text-2xl text-muted"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaAnglesDown />
        </motion.a>
      )}
    </section>
  )
}
