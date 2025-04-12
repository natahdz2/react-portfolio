import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "../../lib/utils";
import { useInView } from "../../hooks/use-in-view";

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const projects = [
    {
      id: 1,
      title: "Project One",
      description:
        "A responsive web application built with React and Node.js. Features include user authentication, data visualization, and real-time updates.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 2,
      title: "Project Two",
      description:
        "An e-commerce platform with product management, shopping cart functionality, and payment processing integration.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "Redux", "Firebase", "Stripe"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 3,
      title: "Project Three",
      description:
        "A social media dashboard that aggregates content from multiple platforms and provides analytics and scheduling tools.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
      github: "https://github.com",
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Here are some of my recent projects. Each project is a unique piece of
          development that I've created to solve a specific problem.
        </p>

        <div className="grid gap-16 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "grid md:grid-cols-12 gap-8 items-center transition-all duration-1000 transform",
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20",
                { "md:rtl": index % 2 !== 0 }
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div
                className={cn(
                  "md:col-span-7 rounded-lg overflow-hidden group relative aspect-video bg-muted",
                  { "md:order-2": index % 2 !== 0 }
                )}
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div
                className={cn("md:col-span-5", {
                  "md:order-1 text-right": index % 2 !== 0,
                })}
              >
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <div className="bg-muted/50 p-6 rounded-lg mb-4 shadow-sm">
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                <div
                  className={cn("flex flex-wrap gap-2 mb-4", {
                    "justify-end": index % 2 !== 0,
                  })}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className={cn("flex gap-4", {
                    "justify-end": index % 2 !== 0,
                  })}
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
