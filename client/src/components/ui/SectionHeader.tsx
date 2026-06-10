import { FadeIn } from "./FadeIn";

interface SectionHeaderProps {
  eyebrow: string;
  title?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  centered = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <FadeIn delay={0.1}>
        <div
          className={`flex items-center gap-4 mb-4 ${centered ? "justify-center" : ""}`}
        >
          {!centered && <div className="h-px w-8 bg-gold" />}
          <span
            className="text-gold font-sans text-xs font-bold tracking-[0.2em] uppercase"
            data-testid={`eyebrow-${eyebrow.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {eyebrow}
          </span>
          {centered && <div className="h-px w-8 bg-gold" />}
        </div>
      </FadeIn>

      {title && (
        <FadeIn delay={0.2}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-emerald-900 leading-tight">
            {title}
          </h2>
        </FadeIn>
      )}
    </div>
  );
}
