import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`mb-12 flex flex-col gap-3 ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      {eyebrow && <span className="chip">{eyebrow}</span>}
      <h2 className="section-title">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-muted sm:text-lg">{subtitle}</p>
      )}
    </Reveal>
  )
}
