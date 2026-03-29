import { useRef, useEffect } from "react";
import { useInView } from "../../hooks/use-in-view";

const SKILL_CATEGORIES = [
  {
    id: "frontend",
    label: "01",
    name: "Frontend Development",
    accentStart: "var(--accent)",
    accentEnd: "#818cf8",
    skills: [
      { name: "HTML & CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "React", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    id: "backend",
    label: "02",
    name: "Backend & Database",
    accentStart: "#818cf8",
    accentEnd: "#a78bfa",
    skills: [
      { name: "Node.js", level: 70 },
      { name: "C#", level: 40 },
      { name: "Express", level: 65 },
      { name: "MySql and Sql", level: 90 },
      { name: "REST API", level: 75 },
    ],
  },
  {
    id: "tools",
    label: "03",
    name: "Tools & Others",
    accentStart: "#a78bfa",
    accentEnd: "#f472b6",
    skills: [
      { name: "Git & GitHub", level: 80 },
      { name: "Webpack", level: 65 },
      { name: "Figma", level: 70 },
      { name: "VS Code", level: 90 },
      { name: "Cloud", level: 80 },
      { name: "Azure", level: 80 },
      { name: "Docker", level: 80 },
      { name: "Kubernetes", level: 80 },
      { name: "Terraform", level: 80 },
      { name: "Flutter", level: 80 },
      { name: "Oracle Apex", level: 80 },
      { name: "PlSQL", level: 80 },
      { name: "AI", level: 80 },
      { name: "Automation", level: 80 },
      { name: "PostgreSQL", level: 80 },
    ],
  },
];

function SkillBar({ name, level, accentStart, accentEnd, isInView, delay }) {
  const barRef = useRef(null);

  // 1. Validar que la habilidad exista. Si está vacía, no renderiza la línea.
  if (!name || name.trim() === "") return null;

  useEffect(() => {
    if (!isInView || !barRef.current) return;
    const id = setTimeout(() => {
      if (barRef.current) barRef.current.style.width = `${level}%`;
    }, delay);
    return () => clearTimeout(id);
  }, [isInView, level, delay]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-baseline">
        <span className="text-xs font-medium text-white/55 tracking-wide">{name}</span>
        <span
          className="text-xs font-bold"
          style={{ color: accentStart || "var(--accent)" }}
        >
          {level}%
        </span>
      </div>

      {/* 2. Barra reconstruida 100% con Tailwind. 
          Al no usar clases CSS externas, matamos el bug del parpadeo (flicker) al hacer hover */}
      <div className="w-full bg-white/10 overflow-hidden rounded-full" style={{ height: "2px" }}>
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            width: "0%",
            background: `linear-gradient(90deg, ${accentStart} 0%, ${accentEnd} 100%)`,
            // Se usa cubic-bezier en lugar de la variable CSS por si esa también estaba rota
            transition: `width 1.3s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.12 });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ padding: "clamp(5rem,12vw,9rem) clamp(1.5rem,5vw,4rem)" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-[#4F75FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">

          {/* ── LEFT: Sticky title (4/12) ── */}
          <div className="md:col-span-4 md:sticky md:top-32 pointer-events-none">
            <p className="text-white/25 mb-8 text-sm font-medium tracking-wider uppercase">
              <span className="mr-4">03 /</span>Competencies
            </p>
            <h2
              className="tracking-tight text-white leading-[.9] text-5xl md:text-7xl"
              style={{ fontFamily: "var(--serif)", fontWeight: 700 }}
            >
              My{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400 }}>
                Skills
              </span>
            </h2>
            <p className="mt-6 text-white/40 text-sm leading-relaxed">
              I've worked with a variety of technologies in the web development world.
              Here's an overview of my technical skills and proficiency levels.
            </p>
          </div>

          {/* ── RIGHT: Skill categories (8/12) ── */}
          <div className="md:col-span-8 space-y-0">
            {SKILL_CATEGORIES.map((cat, catIdx) => {
              // Filtrado estricto adicional: elimina skills vacíos antes de mapearlos
              const validSkills = cat.skills.filter(s => s && s.name && s.name.trim() !== "");

              // Si la categoría entera queda vacía (0 skills válidos), no renderiza la caja
              if (validSkills.length === 0) return null;

              return (
                <div
                  key={cat.id}
                  // 3. Reemplazamos la clase externa "skill-card" por estilos Tailwind ("py-10 flex flex-col")
                  className="py-10 flex flex-col"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity .8s cubic-bezier(0.16, 1, 0.3, 1) ${catIdx * 180}ms, transform .8s cubic-bezier(0.16, 1, 0.3, 1) ${catIdx * 180}ms`,
                  }}
                >
                  {/* Category header */}
                  <div className="flex items-baseline gap-4 mb-8">
                    <span
                      className="text-[#4F75FF] font-bold tracking-widest"
                      style={{ fontSize: ".6rem" }}
                    >
                      {cat.label} /
                    </span>
                    <h3
                      className="text-lg text-white"
                      style={{ fontFamily: "var(--serif)", fontWeight: 700 }}
                    >
                      {cat.name}
                    </h3>
                  </div>

                  {/* Skill bars */}
                  <div className="flex flex-col space-y-6">
                    {validSkills.map((skill, skillIdx) => (
                      <SkillBar
                        key={skill.name}
                        {...skill}
                        accentStart={cat.accentStart}
                        accentEnd={cat.accentEnd}
                        isInView={isInView}
                        delay={catIdx * 150 + skillIdx * 90}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}