import { useState, useEffect } from "react";
import ParticleCanvas from "./components/particle-canvas";
import Header   from "./components/header";
import Hero     from "./components/sections/hero";
import About    from "./components/sections/about";
import Projects from "./components/sections/projects";
import Skills   from "./components/sections/skills";
import Contact  from "./components/sections/contact";
import Footer   from "./components/footer";
import "./index.css";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Force dark mode at the html element level
    document.documentElement.classList.add("dark");

    const sections = ["home", "about", "projects", "skills", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      {/* ── Carbon Particle System — fixed, z-0, full-screen ── */}
      <ParticleCanvas />

      {/* ── Navigation ── */}
      <Header activeSection={activeSection} />

      {/* ── Page Content — z-10 sets it above canvas ── */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
