import { useRef } from "react";
import { cn } from "../../lib/utils";
import { useInView } from "../../hooks/use-in-view";

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });

  const skills = [
    // Frontend
    { name: "HTML & CSS", level: 90, category: "frontend" },
    { name: "JavaScript", level: 85, category: "frontend" },
    { name: "React", level: 80, category: "frontend" },
    { name: "TypeScript", level: 75, category: "frontend" },
    { name: "Tailwind CSS", level: 85, category: "frontend" },

    // Backend
    { name: "Node.js", level: 70, category: "backend" },
    { name: "C#", level: 40, category: "backend" },
    { name: "Express", level: 65, category: "backend" },
    { name: "MySql and Sql", level: 90, category: "backend" },
    { name: "REST API", level: 75, category: "backend" },

    // Tools
    { name: "Git & GitHub", level: 80, category: "tools" },
    { name: "Webpack", level: 65, category: "tools" },
    { name: "Figma", level: 70, category: "tools" },
    { name: "VS Code", level: 90, category: "tools" },
  ];

  const categories = [
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "tools", name: "Tools & Others" },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-32 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary">Skills</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          I've worked with a variety of technologies in the web development
          world. Here's an overview of my technical skills and proficiency
          levels.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <div
              key={category.id}
              className={cn(
                "bg-background rounded-lg p-6 shadow-sm border border-border/50 transition-all duration-1000 transform",
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <h3 className="text-xl font-bold mb-6 text-center">
                {category.name}
              </h3>
              <div className="space-y-6">
                {skills
                  .filter((skill) => skill.category === category.id)
                  .map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className="transition-all duration-700"
                      style={{
                        transitionDelay: `${
                          categoryIndex * 200 + skillIndex * 100
                        }ms`,
                      }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: isInView ? `${skill.level}%` : "0%",
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
