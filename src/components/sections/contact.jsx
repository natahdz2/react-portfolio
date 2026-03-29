import { useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useInView } from "../../hooks/use-in-view";

// ── Content preserved exactly ──
const CONTACT_INFO = [
  {
    icon:  <Mail  className="h-4 w-4" />,
    label: "Email",
    value: "natanaelhdezrosario@gmail.com",
    href:  "mailto:natanaelhdezrosario@gmail.com",
  },
  {
    icon:  <Phone className="h-4 w-4" />,
    label: "Phone",
    value: "+1 (809) 543-9504",
    href:  "tel:+18095439504",
  },
  {
    icon:  <MapPin className="h-4 w-4" />,
    label: "Location",
    value: "Santo Domingo, Dominican Republic",
    href:  null,
  },
];

const SOCIALS = [
  { name: "GitHub",    href: "https://github.com/natahdz2",                                                        label: "GH" },
  { name: "LinkedIn",  href: "https://www.linkedin.com/in/natanael-isaac-hernandez-rosario-81882335a/",             label: "in" },
  { name: "Instagram", href: "https://www.instagram.com/natahdez23/",                                              label: "IG" },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, threshold: 0.18 });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        padding: "clamp(5rem,12vw,9rem) clamp(1.5rem,5vw,4rem)",
        background: "rgba(255,255,255,.012)",
        borderTop:  "1px solid rgba(255,255,255,.05)",
      }}
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#4F75FF]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-screen-2xl mx-auto">

        {/* ── Section label ── */}
        <p className="label-meta text-white/25 mb-8">
          <span className="mr-4">04 /</span>Contact
        </p>

        {/* ── 12-col editorial grid ── */}
        <div className="grid grid-cols-12 gap-y-16">

          {/* ── LEFT: Big serif CTA headline (7/12) ── */}
          <div
            className="col-span-12 md:col-span-7"
            style={{
              opacity:   isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity .9s var(--ease-out), transform .9s var(--ease-out)",
            }}
          >
            <h2
              className="tracking-tight text-white mb-12 leading-[.88]"
              style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: "clamp(2.5rem,6vw,6rem)" }}
            >
              Let's build<br />
              something{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400 }}>
                exceptional.
              </span>
            </h2>

            <div className="space-y-6 mb-12">
              <p className="text-white/50 text-lg leading-relaxed max-w-md">
                I'm currently available for freelance work or full-time positions. If you have
                a project that needs some creative work, feel free to reach out.
              </p>

              {/* Email link — big editorial underline style */}
              <a
                href="mailto:natanaelhdezrosario@gmail.com"
                className="inline-block text-xl md:text-2xl text-white border-b border-white/25 pb-1 hover:border-[#4F75FF] hover:text-[#4F75FF] transition-all duration-300"
                style={{ fontFamily: "var(--serif)" }}
              >
                natanaelhdezrosario@gmail.com
              </a>
            </div>

            {/* Contact info rows */}
            <div className="space-y-0">
              {CONTACT_INFO.map((info, idx) => (
                <div
                  key={info.label}
                  className="contact-info-row"
                  style={{
                    opacity:   isInView ? 1 : 0,
                    transform: isInView ? "translateX(0)" : "translateX(-16px)",
                    transition: `opacity .7s ease ${300 + idx * 120}ms, transform .7s ease ${300 + idx * 120}ms`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-[#4F75FF]"
                    style={{ border: "1px solid rgba(79,117,255,.25)", borderRadius: "var(--radius-sm)" }}
                  >
                    {info.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="label-meta text-white/25 mb-0.5">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm font-medium text-white/65 hover:text-white transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-white/65">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Socials + CTA (5/12) ── */}
          <div
            className="col-span-12 md:col-span-5 md:pl-16 flex flex-col justify-between"
            style={{
              opacity:   isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity .9s var(--ease-out) 200ms, transform .9s var(--ease-out) 200ms",
            }}
          >
            <div className="space-y-8">
              <div>
                <h3
                  className="text-xl text-white mb-6"
                  style={{ fontFamily: "var(--serif)", fontWeight: 700 }}
                >
                  Follow Me
                </h3>

                {/* Social links — editorial list */}
                <div className="space-y-0">
                  {SOCIALS.map((social, idx) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-4 border-b border-white/06 group"
                      style={{
                        opacity:   isInView ? 1 : 0,
                        transition: `opacity .6s ease ${400 + idx * 100}ms`,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="w-8 h-8 flex items-center justify-center text-[11px] font-bold text-white"
                          style={{
                            background: "linear-gradient(135deg, var(--accent), #6d8fff)",
                            borderRadius: "var(--radius-sm)",
                          }}
                        >
                          {social.label}
                        </span>
                        <span className="text-sm font-medium text-white/55 group-hover:text-white transition-colors">
                          {social.name}
                        </span>
                      </div>
                      <span className="text-white/20 group-hover:text-white/60 transition-colors">↗</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* ── Primary CTA button ── */}
              <a
                href="mailto:natanaelhdezrosario@gmail.com"
                id="contact-cta"
                className="btn-magnetic btn-primary flex items-center justify-center gap-3 w-full py-5 text-[11px] font-medium tracking-[0.22em] uppercase text-white mt-8"
                style={{ borderRadius: "var(--radius-sm)" }}
              >
                Initialize Project
                <span style={{ fontSize: "1.1rem" }}>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
