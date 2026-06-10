import React from 'react';
interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
}
export function Button({ children, className = '', style, href }: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    bg-emerald-900 text-ivory hover:bg-emerald-900/90
    px-8 py-4 rounded-sm
    font-serif text-lg tracking-wide
    transition-all duration-300 ease-in-out
    shadow-lg hover:shadow-xl hover:-translate-y-0.5
    border border-emerald-900/20
    cursor-pointer
    ${className}
  `;
  // If an explicit href is provided, redirect there directly (no smooth scroll).
  if (href) {
    return (
      <a href={href} style={style} className={baseClasses}>
        {children}
      </a>);

  }
  // Default: smooth-scroll to the offer section.
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('offer')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  return (
    <a
      href="#offer"
      onClick={handleClick}
      style={style}
      className={baseClasses}>
      
      {children}
    </a>);

}