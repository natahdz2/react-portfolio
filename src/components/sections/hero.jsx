"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const codeSnippet = `function createWebsite() {
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

  useEffect(() => {
    setIsVisible(true);

    // Typing animation
    if (currentIndex < codeSnippet.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + codeSnippet[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, codeSnippet]);

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
      <div className="container mx-auto px-4 sm:px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div
            className={cn(
              "max-w-3xl transition-all duration-1000 transform",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <p className="text-primary font-medium mb-4">Hello, my name is</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
              <span className="block">Natanael Isaac</span>
              <span className="text-primary/80">Web Developer</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl">
              I build exceptional and accessible digital experiences for the
              web.
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

          {/* Code Terminal Animation */}
          <div
            className={cn(
              "hidden md:block transition-all duration-1000 transform",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="bg-zinc-900 rounded-lg shadow-xl overflow-hidden border border-zinc-700 max-w-md mx-auto">
              <div className="flex items-center px-4 py-2 bg-zinc-800 border-b border-zinc-700">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="mx-auto text-sm text-zinc-400 font-mono">
                  developer.js
                </div>
              </div>
              <div className="p-4 font-mono text-sm text-green-400 h-[300px] overflow-hidden">
                <pre className="whitespace-pre-wrap">
                  <code>{text}</code>
                  <span className="inline-block w-2 h-5 bg-green-400 animate-pulse ml-0.5"></span>
                </pre>
              </div>
            </div>

            {/* Floating tech badges */}
            <div className="relative mt-8 max-w-md mx-auto h-16">
              <div className="absolute -top-4 -left-2 bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium animate-bounce-slow">
                React
              </div>
              <div className="absolute top-2 right-0 bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium animate-pulse">
                Next.js
              </div>
              <div className="absolute top-12 left-1/4 bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium animate-float">
                TypeScript
              </div>
              <div className="absolute top-8 right-1/4 bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium animate-bounce-slow">
                Tailwind
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 mx-auto w-10 flex justify-center animate-bounce">
        <button
          onClick={scrollToAbout}
          aria-label="Scroll down"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:border-primary transition-colors"
        >
          <ArrowDown className="h-5 w-5 text-primary" />
        </button>
      </div>

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl" />
    </section>
  );
}
