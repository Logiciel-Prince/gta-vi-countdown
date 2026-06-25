import type { IconType } from 'react-icons'
import {
  FaEarthAmericas,
  FaWandMagicSparkles,
  FaCar,
  FaMap,
  FaCloudBolt,
  FaDove,
  FaBrain,
  FaBookOpen,
  FaWifi,
  FaPlaystation,
  FaXbox,
  FaSteam,
  FaUsers,
  FaGamepad,
  FaCalendarDay,
  FaLocationDot,
  FaBuilding,
  FaCode,
  FaFilm,
  FaShieldHalved,
  FaTag,
  FaBullhorn,
  FaRocket,
  FaForward,
  FaCirclePlay,
  FaImage,
  FaPalette,
  FaMountainSun,
  FaCartShopping,
  FaDownload,
} from 'react-icons/fa6'

const REGISTRY: Record<string, IconType> = {
  // features
  world: FaEarthAmericas,
  graphics: FaWandMagicSparkles,
  vehicles: FaCar,
  map: FaMap,
  weather: FaCloudBolt,
  wildlife: FaDove,
  npc: FaBrain,
  story: FaBookOpen,
  online: FaWifi,
  // info / platforms
  playstation: FaPlaystation,
  xbox: FaXbox,
  steam: FaSteam,
  characters: FaUsers,
  modes: FaGamepad,
  date: FaCalendarDay,
  setting: FaLocationDot,
  publisher: FaBuilding,
  developer: FaCode,
  trailer: FaFilm,
  rating: FaShieldHalved,
  genre: FaTag,
  engine: FaGamepad,
  // timeline
  announce: FaBullhorn,
  gameplay: FaGamepad,
  preorder: FaCartShopping,
  preload: FaDownload,
  rocket: FaRocket,
  future: FaForward,
  // gallery
  play: FaCirclePlay,
  screenshot: FaImage,
  artwork: FaPalette,
  wallpaper: FaMountainSun,
  video: FaCirclePlay,
}

interface IconProps {
  name: string
  className?: string
}

export function Icon({ name, className }: IconProps) {
  const Cmp = REGISTRY[name] ?? FaGamepad
  return <Cmp className={className} aria-hidden />
}
