"use client";

import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useInView } from "../../hooks/use-in-view";
import Carousel from "../carousel";

/* ─── Iframe with shimmer ─── */
function IframeMedia({ project }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {!loaded && (
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 2,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px",
            background: "rgba(10,10,14,0.85)",
          }}
        >
          <div
            style={{
              width: "28px", height: "28px",
              border: "2px solid rgba(255,255,255,0.1)",
              borderTopColor: "var(--accent, #4F75FF)",
              borderRadius: "50%",
              animation: "proj-spin 1s linear infinite",
            }}
          />
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: ".08em", textTransform: "uppercase" }}>
            Cargando…
          </p>
          <a
            href={project.demo} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "11px", color: "#4F75FF" }}
          >
            Abrir en nueva pestaña ↗
          </a>
        </div>
      )}
      <iframe
        src={project.demo}
        title={project.title}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", zIndex: 1 }}
        loading="lazy"
        allow="geolocation"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, index, isInView }) {
  const [hovered, setHovered] = useState(false);
  const imgRight = project.imageRight;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(48px)",
        transition: `opacity .9s ease ${index * 200}ms, transform .9s ease ${index * 200}ms, border-color .3s ease`,
        borderRadius: "18px",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.07)"}`,
        background: "rgba(255,255,255,0.025)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        height: "440px",
      }}
    >
      {/* ── Media side (55%) ── */}
      <div
        style={{
          order: imgRight ? 2 : 1,
          flexShrink: 0,
          width: "55%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {project.embedded ? (
          <IframeMedia project={project} />
        ) : project.carousel ? (
          <Carousel images={project.carouselImages} title={project.title} />
        ) : (
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform .6s ease",
            }}
          />
        )}

        {/* Side gradient fade toward info panel */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: imgRight
              ? "linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 55%)"
              : "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 55%)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        {/* Icon badge */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: imgRight ? "auto" : "16px",
            right: imgRight ? "16px" : "auto",
            zIndex: 10,
            width: "44px", height: "44px",
            borderRadius: "12px",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "20px",
          }}
        >
          {project.icon}
        </div>

        {/* Large watermark number */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: imgRight ? "auto" : "16px",
            right: imgRight ? "16px" : "auto",
            zIndex: 10,
            fontFamily: "var(--serif, Georgia, serif)",
            fontSize: "80px",
            fontWeight: 700,
            lineHeight: 1,
            color: "rgba(255,255,255,0.06)",
            letterSpacing: "-.04em",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          0{index + 1}
        </div>
      </div>

      {/* ── Vertical divider ── */}
      <div
        style={{
          order: 2,
          flexShrink: 0,
          width: "1px",
          alignSelf: "stretch",
          background: "rgba(255,255,255,0.07)",
        }}
      />

      {/* ── Info side (45%) ── */}
      <div
        style={{
          order: imgRight ? 1 : 3,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "36px 32px",
          minWidth: 0,
        }}
      >
        <div>
          {/* Category + number */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <span style={{ fontSize: "10px", letterSpacing: ".12em", textTransform: "uppercase", color: project.accent, fontWeight: 600 }}>
              {project.category}
            </span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.12)", fontFamily: "var(--serif, Georgia, serif)" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "var(--serif, Georgia, serif)",
              fontWeight: 700,
              fontSize: "clamp(1.35rem, 2vw, 1.85rem)",
              letterSpacing: "-.035em",
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "rgba(255,255,255,0.42)", marginBottom: "24px" }}>
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "10px",
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  padding: "5px 11px",
                  borderRadius: "7px",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "rgba(255,255,255,0.38)",
                  background: "rgba(255,255,255,0.035)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "28px" }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", letterSpacing: ".04em", color: "rgba(255,255,255,0.38)", textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.38)"}
            >
              <span style={{ width: "32px", height: "32px", borderRadius: "9px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Github size={13} />
              </span>
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", letterSpacing: ".04em", color: "rgba(255,255,255,0.38)", textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.38)"}
            >
              <span style={{ width: "32px", height: "32px", borderRadius: "9px", border: `1px solid ${project.accent}50`, background: `${project.accent}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ExternalLink size={13} style={{ color: project.accent }} />
              </span>
              Live Demo
            </a>
          )}

          <span style={{ marginLeft: "auto", fontSize: "22px", color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)", transition: "color .3s ease" }}>
            ↗
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.04 });
  const base = import.meta.env.BASE_URL;

  const chefPointImages = [1, 2, 3, 4, 5, 6].map((n) => `${base}${n}.jfif`);
  const facturacionImages = [1, 2].map((n) => `${base}f${n}.jfif`);

  const projects = [
    {
      id: 1,
      title: "ChefPoint Locate",
      category: "Real-Time GPS Tracking",
      description: "Aplicación de rastreo GPS en tiempo real con mapas interactivos, historial de ubicación y diseño responsivo. Abre el sidebar para ver el menú completo.",
      tags: ["Firebase", "JavaScript", "Leaflet API", "Real-time"],
      github: "https://github.com/natahdz2",
      image: `${base}g1.png`,
      accent: "#FF4D4D",
      icon: "📡",
      imageRight: false,
    },
    {
      id: 2,
      title: "ChefPoint",
      category: "Restaurant Management System",
      description: "Sistema integral para restaurantes: gestión de pedidos, inventario, staff y analíticas de ventas. Interfaz intuitiva con notificaciones en tiempo real para cocina.",
      tags: ["React", "NodeJS", "MySQL", "NextUI", "TailWind"],
      github: "https://github.com/natahdz2",
      carousel: true,
      carouselImages: chefPointImages,
      accent: "#FF4D4D",
      icon: "🍽️",
      imageRight: true,
    },
    {
      id: 3,
      title: "Sistema de Facturación",
      category: "Invoice Management",
      description: "Sistema de facturación con generación e impresión de facturas PDF. Gestión de clientes, productos, inventario y historial completo de transacciones.",
      tags: ["JavaScript", "Bootstrap", "HTML/CSS", "JsPDF"],
      github: "https://github.com/natahdz2",
      carousel: true,
      carouselImages: facturacionImages,
      accent: "#4F75FF",
      icon: "🧾",
      imageRight: false,
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ position: "relative", overflow: "hidden", padding: "clamp(5rem,12vw,9rem) clamp(1.5rem,5vw,4rem)" }}
    >
      {/* Glows */}
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "400px", height: "400px", background: "radial-gradient(circle, rgba(79,117,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "300px", height: "300px", background: "radial-gradient(circle, rgba(255,77,77,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "72px", gap: "24px" }}>
          <div>
            <p className="label-meta" style={{ color: "rgba(255,255,255,0.22)", marginBottom: "20px" }}>
              <span style={{ marginRight: "16px" }}>02 /</span>Selected Works
            </p>
            <h2 style={{ fontFamily: "var(--serif, Georgia, serif)", fontWeight: 700, letterSpacing: "-.04em", color: "#fff" }}>
              My{" "}
              <span style={{ color: "var(--accent, #4F75FF)", fontStyle: "italic", fontWeight: 400 }}>
                Projects
              </span>
            </h2>
          </div>
          <p style={{ color: "rgba(255,255,255,0.32)", fontSize: "13.5px", maxWidth: "280px", lineHeight: 1.7, marginBottom: "6px" }}>
            Cada proyecto es una pieza única de desarrollo construida para resolver un problema específico.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>

      <style>{`@keyframes proj-spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}