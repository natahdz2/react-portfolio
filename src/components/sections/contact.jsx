import { useRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { cn } from "../../lib/utils";
import { useInView } from "../../hooks/use-in-view";

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "natanaelhdezrosario@gmail.com",
      href: "natanaelhdezrosario@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+1 (809) 543-9504",
      href: "tel:+18095439504",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Santo Domingo, Dominican Republic",
      href: null,
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          I'm currently available for freelance work or full-time positions. If
          you have a project that needs some creative work, feel free to contact
          me using the information below.
        </p>

        <div className="max-w-3xl mx-auto">
          <div
            className={cn(
              "transition-all duration-1000 transform bg-background border border-border/50 rounded-lg p-8 shadow-sm",
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.label}
                    className="flex items-start"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{info.label}</h4>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6">Follow Me</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "GitHub", href: "https://github.com/natahdz2" },
                    {
                      name: "LinkedIn",
                      href: "https://www.linkedin.com/in/natanael-isaac-hernandez-rosario-81882335a/",
                    },
                    {
                      name: "Instagram",
                      href: "https://www.instagram.com/natahdez23/",
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-muted hover:bg-primary/10 text-foreground hover:text-primary px-4 py-3 rounded-md transition-colors flex items-center justify-center"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
