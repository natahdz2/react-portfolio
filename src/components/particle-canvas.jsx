"use client";

import { useEffect, useRef } from "react";

/**
 * Carbon Particle System
 * ─────────────────────────────────
 * Desktop: mouse-repulsion/attraction (Hooke spring return)  @ ~60fps
 * Mobile : ambient drift — constant slow random motion, no mouse needed
 */

const PARTICLE_COUNT = 130;
const MAX_RADIUS = 100;   // repulsion radius (desktop)
const REPEL_FORCE = 0.35;
const DAMPING     = 0.88;
const SPRING      = 0.04; // return spring strength

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // DPR scaling for sharp rendering on retina
    const dpr = window.devicePixelRatio || 1;

    // Detect pointer type for mobile ambient mode
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    let W = 0, H = 0;
    let animId;
    let mouse = { x: -9999, y: -9999 };

    /* ── Particle factory ── */
    function makeParticle() {
      const size = Math.random() * 1.8 + 0.8; // 0.8–2.6px
      const isDiamond = Math.random() > 0.6;
      const speed = Math.random() * 0.4 + 0.15;
      const angle = Math.random() * Math.PI * 2;
      return {
        x:   Math.random() * W,
        y:   Math.random() * H,
        ox:  0,   // will be set after init
        oy:  0,
        vx:  Math.cos(angle) * speed * (isMobile ? 0.6 : 0),
        vy:  Math.sin(angle) * speed * (isMobile ? 0.6 : 0),
        size,
        isDiamond,
        // ambient drift for mobile
        driftSpeed: speed,
        driftAngle: angle,
        driftChange: (Math.random() - 0.5) * 0.005,
        // brightness: some particles slightly lighter
        alpha: Math.random() * 0.35 + 0.15,
      };
    }

    let particles = [];

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);

      // Re-seed particles keeping approximate proportions
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const p = makeParticle();
        p.ox = p.x;
        p.oy = p.y;
        return p;
      });
    }

    function drawParticle(p) {
      const { x, y, size, isDiamond, alpha } = p;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#c8cdd4"; // light carbon tone

      if (isDiamond) {
        // Small diamond shape
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-size / 2, -size / 2, size, size);
      } else {
        // Sharp square dot
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }
      ctx.restore();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        if (isMobile) {
          // ── Mobile: ambient drift ──
          p.driftAngle += p.driftChange;
          p.vx += Math.cos(p.driftAngle) * p.driftSpeed * 0.02;
          p.vy += Math.sin(p.driftAngle) * p.driftSpeed * 0.02;
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.x += p.vx;
          p.y += p.vy;
          // Wrap around screen edges
          if (p.x < 0) p.x = W;
          if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H;
          if (p.y > H) p.y = 0;
        } else {
          // ── Desktop: mouse repulsion + spring return ──
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_RADIUS && dist > 0) {
            const force = ((MAX_RADIUS - dist) / MAX_RADIUS) * REPEL_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }

          // Spring back to origin
          p.vx += (p.ox - p.x) * SPRING;
          p.vy += (p.oy - p.y) * SPRING;

          // Damping
          p.vx *= DAMPING;
          p.vy *= DAMPING;

          p.x += p.vx;
          p.y += p.vy;
        }

        drawParticle(p);
      });

      animId = requestAnimationFrame(tick);
    }

    // Mouse tracking
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    tick();

    window.addEventListener("resize", resize);
    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      aria-hidden="true"
    />
  );
}
