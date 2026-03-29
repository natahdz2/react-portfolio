"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

const NAV_ITEMS = [
  { id: "home",     label: "Home"     },
  { id: "about",    label: "About"    },
  { id: "projects", label: "Projects" },
  { id: "skills",   label: "Skills"   },
  { id: "contact",  label: "Contact"  },
];

export default function Header({ activeSection }) {
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [isScrolled, setIsScrolled]   = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "nav-shell py-5 transition-all duration-500",
        isScrolled && "scrolled"
      )}
    >
      <div className="max-w-screen-2xl mx-auto px-8 flex justify-between items-center">

        {/* ── Logo: N I editorial logotype ── */}
        <a
          href="#home"
          className="flex items-center gap-3 group"
          onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
          aria-label="Natanael Isaac — Home"
        >
          <span
            className="text-2xl tracking-tight text-white"
            style={{ fontFamily: "var(--serif)", fontWeight: 700 }}
          >
            N I
          </span>
          <span className="w-px h-5 bg-white/20 hidden sm:block" />
          <span className="label-meta hidden sm:block text-white/40 group-hover:text-white/60 transition-colors">
            Portfolio
          </span>
        </a>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "relative pb-1 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-300",
                activeSection === item.id
                  ? "text-white"
                  : "text-white/40 hover:text-white/75"
              )}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/70" />
              )}
            </a>
          ))}
        </nav>

        {/* ── CTA: Get in Touch ── */}
        <a
          href="#contact"
          id="nav-cta"
          className="hidden md:inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase text-white border border-white/25 px-5 py-2.5 hover:border-white/60 hover:bg-white/[0.04] transition-all duration-300"
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
        >
          Get in Touch
        </a>

        {/* ── Mobile burger ── */}
        <button
          className="md:hidden text-white/60 hover:text-white p-2 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {isMenuOpen && (
        <nav
          className="md:hidden mobile-menu absolute top-full left-0 right-0 py-8 animate-in slide-in-from-top duration-300"
          aria-label="Mobile navigation"
        >
          <div className="max-w-screen-2xl mx-auto px-8 flex flex-col gap-0">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "text-[11px] font-medium tracking-[0.18em] uppercase py-4 border-b border-white/06 transition-colors",
                  activeSection === item.id
                    ? "text-white"
                    : "text-white/40 hover:text-white/75"
                )}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-8 text-center text-[11px] font-medium tracking-[0.22em] uppercase text-white border border-white/25 px-5 py-3 hover:border-white/50 transition-all"
              style={{ borderRadius: "var(--radius-sm)" }}
              onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
            >
              Get in Touch
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
