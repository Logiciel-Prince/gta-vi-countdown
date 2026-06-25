import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FaShuffle } from 'react-icons/fa6'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { PlaceholderArt } from '../ui/PlaceholderArt'
import { randomIndex } from '../../utils/format'
import wallpapers from '../../data/wallpapers.json'
import type { Wallpaper } from '../../types'

const list = wallpapers as Wallpaper[]

export function WallpaperShuffle() {
  const [index, setIndex] = useState(() => randomIndex(list.length))
  const shuffle = () => setIndex((prev) => randomIndex(list.length, prev))
  const wp = list[index]

  return (
    <section id="wallpaper" className="section !pt-0">
      <SectionHeading
        eyebrow="Random Wallpaper"
        title="Set the mood"
        subtitle="Shuffle through neon Vice City vibes. A fresh palette every tap."
      />
      <Reveal>
        <div className="mx-auto max-w-4xl">
          <div className="glass-strong overflow-hidden p-3">
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={wp.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <PlaceholderArt gradient={wp.gradient} label="4K Wallpaper" />
                  <div className="absolute inset-0 flex items-end justify-between p-5">
                    <span className="font-display text-3xl tracking-wide text-white drop-shadow-lg">
                      {wp.name}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <button onClick={shuffle} className="btn-primary">
              <FaShuffle /> Shuffle Wallpaper
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
