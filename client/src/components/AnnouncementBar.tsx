export function AnnouncementBar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 text-white text-center font-sans"
      style={{
        backgroundColor: "#1a3a2a",
        padding: "10px",
        fontSize: "13px",
        lineHeight: 1.3,
      }}
      data-testid="banner-announcement"
    >
      ⏰ Introductory Price: $10.95 — Price increases to $27 on Sunday.
    </div>
  );
}
