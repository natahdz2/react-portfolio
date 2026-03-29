export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        padding: "3.5rem clamp(1.5rem,5vw,4rem) 3rem",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <div className="max-w-screen-2xl mx-auto">
        {/* ── Main footer row ── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Branding */}
          <p
            className="text-xl text-white tracking-tight"
            style={{ fontFamily: "var(--serif)", fontWeight: 700 }}
          >
            Natanael Isaac
          </p>

          {/* Social links */}
          <div className="flex gap-10">
            {[
              { label: "GitHub", href: "https://github.com/natahdz2" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/natanael-isaac-hernandez-rosario-81882335a/" },
              { label: "Instagram", href: "https://www.instagram.com/natahdez23/" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label-meta text-white/30 hover:text-white/75 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="label-meta text-white/25">
            © {year} Natanael Isaac. Built with Precision.
          </p>
        </div>

        {/* ── Thin divider ── */}

      </div>
    </footer>
  );
}
