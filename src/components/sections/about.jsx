"use client";

import { useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { useInView } from "../../hooks/use-in-view";

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const base = import.meta.env.BASE_URL;

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            About <span className="text-primary">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={cn(
                "transition-all duration-1000 delay-300 transform",
                isInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              )}
            >
              <div className="relative rounded-lg overflow-hidden aspect-square bg-muted">
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent transition-opacity duration-500",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                />
                <img
                  src={`${base}me.jpg`}
                  alt="Your Name"
                  className={cn(
                    "w-full h-full object-cover transition-opacity duration-500",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setImageLoaded(true)}
                />

                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground">Loading...</span>
                  </div>
                )}
              </div>
            </div>

            <div
              className={cn(
                "transition-all duration-1000 delay-500 transform",
                isInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              )}
            >
              <h3 className="text-2xl font-bold mb-4">
                Software Developer & UI/UX Enthusiast
              </h3>
              <p className="text-muted-foreground mb-6">
                Hello! I'm Natanael Isaac, a passionate web developer based in
                Dominican Republic. I enjoy creating things that live on the
                internet, whether that be websites, applications, or anything in
                between.
              </p>
              <p className="text-muted-foreground mb-6">
                My goal is to always build products that provide pixel-perfect,
                performant experiences. I'm quietly confident, naturally
                curious, and perpetually working on improving my skills.
              </p>
              <p className="text-muted-foreground mb-8">
                Here are a few technologies I've been working with recently:
              </p>
              <ul className="grid grid-cols-2 gap-2 mb-8">
                {[
                  "JavaScript (ES6+)",
                  "React",
                  "TypeScript",
                  "C#",
                  "Node.js",
                  "HTML & CSS",
                  "Tailwind CSS",
                ].map((skill) => (
                  <li key={skill} className="flex items-center">
                    <span className="text-primary mr-2">›</span>
                    {skill}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  Get In Touch
                </a>
                <a
                  href={`${import.meta.env.BASE_URL}curriculum.pdf`}
                  download="Curriculum_Natanael_Isaac.pdf"
                  className="inline-flex items-center justify-center border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
