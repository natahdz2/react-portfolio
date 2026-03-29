"use client";

import { useEffect, useState, useRef } from "react";

const CODE_SNIPPET = `function createWebsite() {
  const skills = [
    "React", 
    "Next.js",
    "TypeScript",
    "Tailwind CSS"
  ];
  
  return {
    developer: "Natanael Isaac",
    passion: "Building exceptional UIs",
    available: true
  };
}`;

const TECH_PILLS = ["React", "Next.js", "TypeScript", "Tailwind"];

/**
 * Magnetic button helper — attaches to a ref.
 * Applies a subtle translate based on cursor position within the element.
 */
function useMagnetic(strength = 0.35) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const zone = Math.max(rect.width, rect.height) * 2;
      if (dist < zone) {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      }
    };
    const onLeave = () => {
      el.style.transform = "";
      el.style.transition = "transform .4s cubic-bezier(0.34,1.56,0.64,1)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const viewBtn = useMagnetic(0.28);
  const contactBtn = useMagnetic(0.28);

  // Fade-in on mount
  useEffect(() => { setTimeout(() => setIsVisible(true), 120); }, []);

  // Terminal typing effect
  useEffect(() => {
    if (charIndex < CODE_SNIPPET.length) {
      const id = setTimeout(() => {
        setTypedText((p) => p + CODE_SNIPPET[charIndex]);
        setCharIndex((i) => i + 1);
      }, 26);
      return () => clearTimeout(id);
    }
  }, [charIndex]);

  // 3D card mouse-tracking
  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / rect.height) * -14; // rotateX
      const ry = ((e.clientX - cx) / rect.width) * 12; // rotateY
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
    };
    const onLeave = () => {
      card.style.transition = "transform .6s cubic-bezier(0.16,1,0.3,1)";
      card.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
      setTimeout(() => { if (card) card.style.transition = ""; }, 600);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 pb-24"
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#4F75FF]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4  w-64 h-64 bg-[#818cf8]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full">

        {/* ── Curator label ── */}
        <div
          className="label-meta mb-12 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-8px)",
          }}
        >
          <span className="text-white/25 mr-4">01 /</span>
          Hello, my name is
        </div>

        {/* ── 12-col editorial grid ── */}
        {/* FIX: Cambiado de items-end a items-center para arreglar el espacio "despegado" */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-8 items-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s var(--ease-out) .1s, transform 1s var(--ease-out) .1s",
          }}
        >
          {/* ── LEFT: Headline ── */}
          {/* FIX: Ajustado los col-span para dar más espacio en pantallas medianas/grandes */}
          <div className="col-span-1 lg:col-span-7 xl:col-span-8">
            <h1
              className="tracking-tight leading-[0.88] text-white"
              style={{ fontFamily: "var(--serif)", fontSize: "clamp(3.5rem, 8vw, 9rem)", fontWeight: 700 }}
            >
              Building<br />
              Digital<br />
              <span style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400 }}>
                Experiences.
              </span>
            </h1>

            {/* Sub-title */}
            <h2
              className="mt-8 text-2xl md:text-3xl font-semibold text-white/70 flex flex-wrap items-center gap-4"
              style={{ letterSpacing: "-.01em" }}
            >
              Natanael Isaac
              <span className="text-base font-normal text-white/30">— Web Developer</span>
            </h2>

            <p className="mt-5 text-white/45 text-lg leading-relaxed max-w-lg">
              I build exceptional and accessible digital experiences for the web.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-5 mt-10">
              <a
                ref={viewBtn}
                href="#projects"
                id="hero-cta-work"
                className="btn-magnetic btn-primary inline-flex items-center gap-3 px-8 py-4 text-[11px] font-medium tracking-[0.22em] uppercase text-white"
                style={{ borderRadius: "var(--radius-sm)" }}
                onClick={(e) => { e.preventDefault(); scrollTo("projects"); }}
              >
                View My Work
                <span style={{ fontSize: "1rem" }}>↗</span>
              </a>
              <a
                ref={contactBtn}
                href="#contact"
                id="hero-cta-contact"
                className="btn-magnetic btn-ghost inline-flex items-center gap-3 px-8 py-4 text-[11px] font-medium tracking-[0.22em] uppercase text-white/70"
                style={{ borderRadius: "var(--radius-sm)" }}
                onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* ── RIGHT: 3D Terminal ── */}
          {/* FIX: Oculto en móviles y tablets pequeñas, visible y bien posicionado a partir de 'lg' */}
          <div className="col-span-1 lg:col-span-5 xl:col-span-4 hidden lg:block relative">
            <div className="hero-3d-wrap">
              <div ref={cardRef} className="hero-3d-card w-full">
                {/* Terminal window */}
                <div className="glass-card overflow-hidden shadow-2xl bg-black/40 backdrop-blur-md"
                  style={{ borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {/* Title bar */}
                  <div className="terminal-bar bg-white/5 px-4 py-3 flex items-center border-b border-white/10">
                    <span className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                    <span className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                    <span className="ml-4 text-[10px] tracking-widest uppercase text-white/30 font-medium">developer.js</span>
                  </div>
                  {/* Code body */}
                  <div className="p-6 font-mono text-sm sm:text-base leading-relaxed text-green-400/90 min-h-[260px]"
                    style={{ fontFamily: "var(--mono)" }}
                  >
                    <pre className="whitespace-pre-wrap break-words">
                      <code>{typedText}</code>
                      <span className="inline-block w-2 h-4 bg-green-400/80 ml-1 animate-pulse" />
                    </pre>
                  </div>
                </div>

                {/* Floating tech pills */}
                <div className="absolute -bottom-6 -right-4 flex flex-col gap-3 z-20">
                  {TECH_PILLS.map((pill, i) => (
                    <div
                      key={pill}
                      className={`glass-card px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-white bg-white/10 backdrop-blur-md border border-white/10 shadow-lg float-${i + 1}`}
                      style={{ borderRadius: "var(--radius-sm)" }}
                    >
                      {pill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Wide editorial image strip ── */}
        {/* FIX: Eliminado aspectRatio para evitar que se estire feo en pantallas estrechas */}
        <div
          className="mt-24 lg:mt-32 w-full overflow-hidden relative h-24 md:h-32"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1.2s var(--ease-out) .5s",
          }}
        >
          <div className="absolute inset-0 shimmer" style={{ borderRadius: "var(--radius-sm)" }} />
          <div
            className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm px-4 text-center"
            style={{ borderRadius: "var(--radius-sm)", border: "1px solid rgba(255,255,255,.06)" }}
          >
            <p className="text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-white/40">
              Full-Stack Developer <span className="mx-2 hidden sm:inline-block">·</span><br className="sm:hidden" /> Santo Domingo, Dominican Republic <span className="mx-2 hidden sm:inline-block">·</span><br className="sm:hidden" /> Available for Work
            </p>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ opacity: isVisible ? 0.4 : 0, transition: "opacity .8s .8s" }}
      >
        <span className="text-[10px] tracking-widest uppercase font-medium text-white/40">Scroll</span>
        <div className="w-px h-8 bg-white/20 animate-pulse" />
      </div>
    </section>
  );
}