import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      <div className="container mx-auto px-4 z-10">
        <div
          className={cn(
            "max-w-3xl transition-all duration-1000 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <p className="text-primary font-medium mb-4">Hello, my name is</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="block">Natanael Isaac</span>
            <span className="text-primary/80">Web Developer</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl">
            I build exceptional and accessible digital experiences for the web.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                });
              }}
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-md font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                });
              }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToAbout}
          aria-label="Scroll down"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:border-primary transition-colors"
        >
          <ArrowDown className="h-5 w-5 text-primary" />
        </button>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl" />
    </section>
  );
}
