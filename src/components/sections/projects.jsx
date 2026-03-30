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
            Loading…
          </p>
          <a
            href={project.demo} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "11px", color: "#4F75FF" }}
          >
            Open in new tab ↗
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
      className="project-card"
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
      {/* ── Media side (AHORA 65% de ancho) ── */}
      <div
        className="project-media"
        style={{
          order: imgRight ? 2 : 1,
          flexShrink: 0,
          width: "65%", // <-- AUMENTADO DEL 55% al 65%
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background: "rgba(10,10,14,0.5)", // Fondo sutil por si hay huecos
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
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: imgRight ? "right center" : "left center", // <-- ANCLAJE: Evita que recorte el menú izquierdo
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform .6s ease",
            }}
          />
        )}

        {/* Side gradient fade toward info panel */}
        <div
          className="project-gradient"
          style={{
            position: "absolute", inset: 0,
            background: imgRight
              ? "linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 40%)" // Ajustado el gradiente al nuevo ancho
              : "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 40%)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        {/* Icon badge */}
        <div
          className="project-icon-badge"
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
          className="project-watermark"
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
        className="project-divider"
        style={{
          order: 2,
          flexShrink: 0,
          width: "1px",
          alignSelf: "stretch",
          background: "rgba(255,255,255,0.07)",
        }}
      />

      {/* ── Info side (AHORA 35% de ancho) ── */}
      <div
        className="project-info"
        style={{
          order: imgRight ? 1 : 3,
          flex: 1, // Esto tomará el 35% restante
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "36px 24px", // Reduje un poco el padding lateral (de 32 a 24) para que el texto respire mejor en un espacio más angosto
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
              fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)", // Ligeramente más pequeño por el nuevo ancho
              letterSpacing: "-.035em",
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "rgba(255,255,255,0.42)", marginBottom: "24px" }}>
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "9.5px",
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  padding: "4px 9px",
                  borderRadius: "6px",
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
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "24px" }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", letterSpacing: ".04em", color: "rgba(255,255,255,0.38)", textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.38)"}
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Github size={12} />
              </span>
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", letterSpacing: ".04em", color: "rgba(255,255,255,0.38)", textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.38)"}
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "8px", border: `1px solid ${project.accent}50`, background: `${project.accent}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ExternalLink size={12} style={{ color: project.accent }} />
              </span>
              Live Demo
            </a>
          )}

          <span style={{ marginLeft: "auto", fontSize: "20px", color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)", transition: "color .3s ease" }}>
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

  const aiImages = ["A1.png", "A2.png"].map((img) => `${base}${img}`);
  const chefPointImages = [1, 2, 3, 4, 5, 6].map((n) => `${base}${n}.jfif`);
  const facturacionImages = [1, 2].map((n) => `${base}f${n}.jfif`);

  const projects = [
    {
      id: 1,
      title: "VectorRAG",
      category: "Private AI Document Assistant",
      description: "Full-stack RAG application allowing users to query private documents with zero cloud data leakage. Features high-speed semantic searches using pgvector and runs local LLMs like Llama 3 via Ollama.",
      tags: ["Next.js", "Node.js", "PostgreSQL", "pgvector", "Ollama", "Docker"],
      github: "https://github.com/natahdz2/AI-Project",
      carousel: true,
      carouselImages: aiImages,
      accent: "#8B5CF6",
      icon: "🤖",
      imageRight: false,
    },
    {
      id: 2,
      title: "ChefPoint",
      category: "Restaurant Management System",
      description: "Comprehensive restaurant system: order management, inventory, staff and sales analytics. Intuitive interface with real-time kitchen notifications.",
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
      title: "Billing System",
      category: "Invoice Management",
      description: "Billing system with PDF invoice generation and printing. Customer and product management, inventory and complete transaction history.",
      tags: ["JavaScript", "Bootstrap", "HTML/CSS", "JsPDF"],
      github: "https://github.com/natahdz2",
      carousel: true,
      carouselImages: facturacionImages,
      accent: "#4F75FF",
      icon: "🧾",
      imageRight: false,
    },
    {
      id: 4,
      title: "ChefPoint Locate",
      category: "Real-Time GPS Tracking",
      description: "Real-time GPS tracking application with interactive maps, location history and responsive design. Open the sidebar to see the full menu.",
      tags: ["Firebase", "JavaScript", "Leaflet API", "Real-time"],
      github: "https://github.com/natahdz2",
      image: `${base}g1.png`,
      accent: "#FF4D4D",
      icon: "📡",
      imageRight: true,
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
        <div className="projects-header-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "72px", gap: "24px" }}>
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
            Each project is a unique piece of development built to solve a specific problem.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes proj-spin { to { transform: rotate(360deg); } }

        /* --- Estilos Responsivos para Móviles --- */
        @media (max-width: 860px) {
          .project-card {
            flex-direction: column !important;
            height: auto !important;
          }
          .project-media {
            width: 100% !important;
            height: 260px !important;
            order: 1 !important; /* Forza la imagen arriba */
          }
          .project-divider {
            width: 100% !important;
            height: 1px !important;
            order: 2 !important;
          }
          .project-info {
            order: 3 !important;
            padding: 24px 20px !important;
          }
          .project-gradient {
             background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%) !important;
          }
          .project-icon-badge {
            left: 16px !important;
            right: auto !important;
          }
          .project-watermark {
            left: auto !important;
            right: 16px !important;
            font-size: 60px !important;
          }
          .projects-header-container {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}