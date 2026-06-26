import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { SectionHeading } from '../ui/SectionHeading'
import { PlaceholderArt } from '../ui/PlaceholderArt'
import { Modal } from '../ui/Modal'
import { YouTubeEmbed } from '../ui/YouTubeEmbed'
import { Icon } from '../ui/Icon'
import galleryData from '../../data/gallery.json'
import type { GalleryItem } from '../../types'

const items = galleryData as GalleryItem[]

const FILTERS: { id: GalleryItem['type'] | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'screenshot', label: 'Screenshots' },
  { id: 'artwork', label: 'Artwork' },
  { id: 'wallpaper', label: 'Wallpapers' },
  { id: 'video', label: 'Videos' },
]

export function Gallery() {
  const [filter, setFilter] = useState<GalleryItem['type'] | 'all'>('all')
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter((i) => i.type === filter)),
    [filter],
  )

  return (
    <section id="gallery" className="section">
      <SectionHeading
        eyebrow="Media Gallery"
        title="Postcards from Vice City"
        subtitle="Stylized previews and trailers. Tap any tile to open it — videos play right here in a modal."
      />

      {/* filter tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              filter === f.id ? 'text-white' : 'text-muted hover:text-text'
            }`}
          >
            {filter === f.id && (
              <motion.span
                layoutId="gallery-pill"
                className="absolute inset-0 -z-10 rounded-full"
                style={{ backgroundImage: 'linear-gradient(120deg, rgb(var(--neon-pink)), rgb(var(--neon-purple)))' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelected(item)}
              className={`group glass relative overflow-hidden text-left ${
                item.type === 'wallpaper' ? 'col-span-2 aspect-[16/9]' : 'aspect-square'
              }`}
            >
              {(() => {
                const tileImage =
                  item.image ??
                  (item.type === 'video' && item.youtubeId
                    ? `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`
                    : undefined)
                return (
                  <PlaceholderArt
                    gradient={item.gradient}
                    image={tileImage}
                    alt={item.title}
                    iconName={tileImage ? undefined : item.type === 'video' ? 'play' : item.type}
                  />
                )
              })()}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent p-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neon-blue">
                  {item.type}
                </span>
                <span className="text-sm font-semibold text-white drop-shadow">
                  {item.title}
                </span>
              </div>
              {item.type === 'video' && (
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                  <Icon name="play" />
                </span>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <Modal open={!!selected} onClose={() => setSelected(null)} label={selected?.title}>
        {selected &&
          (selected.type === 'video' && selected.youtubeId ? (
            <YouTubeEmbed id={selected.youtubeId} title={selected.title} autoPlay />
          ) : (
            <div className="glass-strong overflow-hidden">
              <div className="aspect-video w-full">
                <PlaceholderArt
                  gradient={selected.gradient}
                  image={selected.image}
                  alt={selected.title}
                  iconName={selected.image ? undefined : selected.type}
                  label={selected.type}
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl tracking-wide">{selected.title}</h3>
                <p className="mt-1 text-sm text-muted">{selected.caption}</p>
              </div>
            </div>
          ))}
      </Modal>
    </section>
  )
}
