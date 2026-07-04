export function SocialProofBar() {
  return (
    <section
      className="bg-ivory py-5 md:py-6 px-4"
      data-testid="section-social-proof-bar"
    >
      <div className="max-w-4xl mx-auto">
        <div className="border-t border-emerald-900/15" />
        <p
          className="text-center text-base md:text-base italic font-serif py-4 md:py-5 px-2"
          style={{ color: "#1a3a2a" }}
          data-testid="text-social-proof"
        >
          📊 Over 300 travelers accessed this protocol in the last 30 days — from New York, Miami, London, and Sydney.
        </p>
        <div className="border-t border-emerald-900/15" />
      </div>
    </section>
  );
}
