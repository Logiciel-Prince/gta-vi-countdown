import { useState } from 'react'
import { FaPlay } from 'react-icons/fa6'

interface YouTubeEmbedProps {
  id: string
  title: string
  /** Autoplay immediately (used inside the modal). */
  autoPlay?: boolean
}

/**
 * Lazy YouTube facade: shows the thumbnail until clicked, then swaps in
 * the iframe. Keeps the page light and avoids loading YouTube on idle.
 */
export function YouTubeEmbed({ id, title, autoPlay = false }: YouTubeEmbedProps) {
  const [active, setActive] = useState(autoPlay)

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setActive(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
            }}
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-neon-pink to-neon-purple text-2xl text-white shadow-glow-lg transition-transform duration-300 group-hover:scale-110">
            <FaPlay className="ml-1" />
          </span>
        </button>
      )}
    </div>
  )
}
