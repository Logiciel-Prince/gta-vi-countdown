import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FaShuffle, FaDownload } from 'react-icons/fa6'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { PlaceholderArt } from '../ui/PlaceholderArt'
import { useToast } from '../../context/ToastContext'
import { randomIndex } from '../../utils/format'
import wallpapers from '../../data/wallpapers.json'
import type { Wallpaper } from '../../types'

const list = wallpapers as Wallpaper[]

export function WallpaperShuffle() {
  const notify = useToast()
  const [index, setIndex] = useState(() => randomIndex(list.length))
  const shuffle = () => setIndex((prev) => randomIndex(list.length, prev))
  const wp = list[index]

  const fileName = `gta6-vice-city-${wp.name.toLowerCase().replace(/\s+/g, '-')}.jpg`

  /**
   * Download the current wallpaper. The image is same-origin (served from
   * /gallery), so a download link triggers a real file save. We fetch it to
   * a blob first so the saved file gets our nice name reliably across browsers.
   */
  const download = async () => {
    if (!wp.image) return
    try {
      const res = await fetch(wp.image)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      notify('Wallpaper downloaded 🖼️')
    } catch {
      // Fallback: open the image so the user can save it manually.
      window.open(wp.image, '_blank', 'noopener')
    }
  }

  return (
    <section id="wallpaper" className="section !pt-0">
      <SectionHeading
        eyebrow="Random Wallpaper"
        title="Set the mood"
        subtitle="Shuffle through neon Vice City vibes, then download your favorite."
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
                  <PlaceholderArt
                    gradient={wp.gradient}
                    image={wp.image}
                    alt={wp.name}
                    label="4K Wallpaper"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-5">
                    <span className="font-display text-3xl tracking-wide text-white drop-shadow-lg">
                      {wp.name}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button onClick={shuffle} className="btn-ghost">
              <FaShuffle /> Shuffle
            </button>
            <button onClick={download} className="btn-primary">
              <FaDownload /> Download Wallpaper
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
