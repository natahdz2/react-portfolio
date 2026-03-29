"use client";

import { useRef, useState } from "react";
import { useInView } from "../../hooks/use-in-view";

// Content preserved exactly
const TECH_LIST = [
  "JavaScript (ES6+)",
  "React",
  "TypeScript",
  "C#",
  "Node.js",
  "HTML & CSS",
  "Tailwind CSS",
  "Cloud",
  "Azure",
  "IA Automation",
  "Docker",
  "Kubernetes",
  "Flutter",
];

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const base = import.meta.env.BASE_URL;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        padding: "clamp(5rem,12vw,9rem) clamp(1.5rem,5vw,4rem)",
        background: "rgba(255,255,255,.012)",
        borderTop: "1px solid rgba(255,255,255,.05)",
        borderBottom: "1px solid rgba(255,255,255,.05)",
      }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#4F75FF]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-screen-2xl mx-auto">

        {/* ── Section label ── */}
        <p className="label-meta text-white/25 mb-8">
          <span className="mr-4">01 /</span>About Me
        </p>

        {/* ── 12-col grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">

          {/* ── LEFT: Photo (4/12) ── */}
          <div
            className="md:col-span-4 reveal"
            style={{
              transitionDelay: "100ms",
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity .9s var(--ease-out) 100ms, transform .9s var(--ease-out) 100ms",
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "4/5",
                borderRadius: "var(--radius-sm)",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <img
                src={`${base}me.jpg`}
                alt="Natanael Isaac"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{
                  filter: "grayscale(20%) brightness(0.9)",
                  opacity: imgLoaded ? 1 : 0,
                  transition: "opacity .5s",
                }}
                onLoad={() => setImgLoaded(true)}
              />
              {!imgLoaded && (
                <div className="absolute inset-0 shimmer flex items-center justify-center">
                  <span className="label-meta text-white/25">Loading…</span>
                </div>
              )}
              {/* Subtle blue overlay on hover */}
              <div className="absolute inset-0 bg-[#4F75FF]/10 opacity-0 hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
            </div>

            {/* Editorial caption below photo */}
            <div className="mt-4 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/08" />
              <span className="label-meta text-white/25">Santo Domingo, DR</span>
            </div>
          </div>

          {/* ── RIGHT: Text (8/12) ── */}
          <div
            className="md:col-span-8 space-y-8"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity .9s var(--ease-out) 250ms, transform .9s var(--ease-out) 250ms",
            }}
          >
            <h2
              className="tracking-tight leading-[.9] text-white"
              style={{ fontFamily: "var(--serif)", fontWeight: 700 }}
            >
              Software Developer{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400 }}>
                &amp; UI/UX Enthusiast
              </span>
            </h2>

            <div className="space-y-5 text-white/55 leading-relaxed text-lg">
              <p>
                Hello! I'm Natanael Isaac, a passionate web developer based in
                Dominican Republic. I enjoy creating things that live on the
                internet, whether that be websites, applications, or anything in
                between.
              </p>
              <p>
                My goal is to always build products that provide pixel-perfect,
                performant experiences. I'm quietly confident, naturally curious,
                and perpetually working on improving my skills.
              </p>
            </div>

            {/* Divider */}
            <div className="divider" />

            {/* ── Tech list — Curator numbered style ── */}
            <div>
              <p className="label-meta text-white/25 mb-6">
                Technologies I've been working with recently:
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                {TECH_LIST.map((skill, i) => (
                  <li key={skill} className="flex items-start gap-3">
                    <span className="label-meta text-[#4F75FF] flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")} /
                    </span>
                    <span className="text-sm text-white/65 font-medium">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="divider" />

            {/* ── CTAs ── */}
            <div className="flex flex-col sm:flex-row gap-5 pt-2">
              <a
                href="#contact"
                id="about-cta-contact"
                className="btn-magnetic btn-primary inline-flex items-center justify-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase text-white px-8 py-4"
                style={{ borderRadius: "var(--radius-sm)", minHeight: "48px" }}
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                Get In Touch
              </a>
              <a
                href={`${import.meta.env.BASE_URL}curriculum.pdf`}
                download="Curriculum_Natanael_Isaac.pdf"
                id="about-cta-cv"
                className="btn-magnetic btn-ghost inline-flex items-center justify-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase px-8 py-4"
                style={{ borderRadius: "var(--radius-sm)", minHeight: "48px" }}
              >
                Download CV ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
