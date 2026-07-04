import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  testId?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Button({
  children,
  className = "",
  style,
  href,
  testId = "button-cta",
  onClick,
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    bg-emerald-900 text-ivory hover:bg-emerald-900/90
    px-8 py-6 md:py-4 rounded-sm
    font-serif text-2xl md:text-lg tracking-wide
    transition-all duration-300 ease-in-out
    shadow-lg hover:shadow-xl hover:-translate-y-0.5
    border border-emerald-900/20
    cursor-pointer
    ${className}
  `;

  if (href) {
    return (
      <a
        href={href}
        target="_top"
        rel="noopener noreferrer"
        onClick={onClick}
        style={style}
        className={baseClasses}
        data-testid={testId}
      >
        {children}
      </a>
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("offer")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <a
      href="#offer"
      onClick={handleClick}
      style={style}
      className={baseClasses}
      data-testid={testId}
    >
      {children}
    </a>
  );
}
