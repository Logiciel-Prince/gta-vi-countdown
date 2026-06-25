import { motion } from 'framer-motion'
import { useCallback, useMemo } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollProgressBar } from './components/layout/ScrollProgressBar'
import { ShortcutHint } from './components/layout/ShortcutHint'
import { Hero } from './components/sections/Hero'
import { CountdownSection } from './components/sections/CountdownSection'
import { LatestInfo } from './components/sections/LatestInfo'
import { Features } from './components/sections/Features'
import { TrailerSection } from './components/sections/TrailerSection'
import { Gallery } from './components/sections/Gallery'
import { Timeline } from './components/sections/Timeline'
import { FunFacts } from './components/sections/FunFacts'
import { Quotes } from './components/sections/Quotes'
import { WallpaperShuffle } from './components/sections/WallpaperShuffle'
import { Faq } from './components/sections/Faq'
import { AdSenseLoader } from './components/ads/AdSense'
import { AdCard } from './components/ads/AdCard'
import { useCountdown } from './hooks/useCountdown'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { useTheme } from './context/ThemeContext'
import { useToast } from './context/ToastContext'
import release from './data/release.json'

export function App() {
  const { toggleVice } = useTheme()
  const notify = useToast()
  const timeLeft = useCountdown(release.releaseDateISO, release.announcementDateISO)

  const shortcuts = useMemo(
    () => ({
      v: () => {
        toggleVice()
        notify('Toggled Vice Mode 🌴')
      },
      r: () => {
        window.dispatchEvent(new CustomEvent('gta6:random-fact'))
        const facts = document.getElementById('facts')
        if (facts) facts.scrollIntoView({ behavior: 'smooth', block: 'center' })
      },
    }),
    [toggleVice, notify],
  )
  useKeyboardShortcuts(shortcuts)

  // Reusable page-load transition wrapper.
  const fadeIn = useCallback(
    (node: React.ReactNode, delay = 0) => (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay }}
      >
        {node}
      </motion.div>
    ),
    [],
  )

  return (
    <>
      <ScrollProgressBar />
      <AdSenseLoader />
      <Navbar />
      <ShortcutHint />

      <main>
        <Hero timeLeft={timeLeft} />
        {fadeIn(<CountdownSection timeLeft={timeLeft} />)}
        <LatestInfo />
        <Features />
        {/* Manual ad slot — replace "1111111111" with a real slot ID, or rely on Auto Ads */}
        <AdCard slot="1111111111" className="py-6" />
        <TrailerSection />
        <Gallery />
        {/* Manual ad slot — replace "2222222222" with a real slot ID, or rely on Auto Ads */}
        <AdCard slot="2222222222" className="py-6" />
        <Timeline />
        <FunFacts />
        <WallpaperShuffle />
        <Quotes />
        <Faq />
      </main>

      <Footer />
    </>
  )
}
