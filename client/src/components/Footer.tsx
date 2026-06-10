export function Footer() {
  return (
    <footer
      className="bg-emerald-950 text-ivory/50 py-12 text-center font-sans text-sm font-light border-t border-gold/10"
      data-testid="section-footer"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-6">
          <span className="font-serif text-xl text-gold/80 italic">
            The Italy Insider Protocol
          </span>
        </div>
        <p className="mb-4">
          © {new Date().getFullYear()} Heritage Intelligence. All rights
          reserved.
        </p>
        <div className="flex justify-center gap-6 text-xs">
          <a
            href="#"
            className="hover:text-gold transition-colors"
            data-testid="link-terms"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-gold transition-colors"
            data-testid="link-privacy"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-gold transition-colors"
            data-testid="link-contact"
          >
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  );
}
