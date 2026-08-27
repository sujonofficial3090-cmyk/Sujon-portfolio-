import { Facebook, Github, Instagram, Linkedin, MessageCircle, Mail, Phone } from "lucide-react";
import { NeumorphicCard } from "@/components/nm";

const QUICK = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#portfolio" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

const SERVICES = [
  "WordPress Development",
  "Elementor Development",
  "WooCommerce Development",
  "Speed Optimization",
  "WordPress Maintenance",
  "Landing Page Development",
];

const SOCIALS = [
  { Icon: Linkedin, href: "https://linkedin.com/in/sujonmia", label: "LinkedIn" },
  { Icon: Github, href: "https://github.com/sujonmia", label: "GitHub" },
  { Icon: Facebook, href: "https://facebook.com/sujonmia", label: "Facebook" },
  { Icon: Instagram, href: "https://instagram.com/sujonmia", label: "Instagram" },
  { Icon: MessageCircle, href: "https://wa.me/8801936711699", label: "WhatsApp" },
];

export function Footer() {
  return (
    <footer className="w-full">
      <NeumorphicCard depth="md" radius="lg" className="px-6 py-10 sm:px-10 sm:py-12 reveal-on-scroll">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1.2fr]">
          <div className="flex flex-col gap-4">
            {/* Pure SUJON typographic wordmark */}
            <div>
              <a href="/#home">
                <span className="text-brand-gradient text-[28px] font-extrabold tracking-[0.14em] uppercase pb-1 leading-normal inline-block">
                  SUJON
                </span>
              </a>
            </div>
            <p className="text-[14px] sm:text-[15px] font-normal leading-[1.7] text-muted-foreground max-w-sm">
              Professional WordPress Developer creating modern, responsive and high-quality WordPress websites for businesses and brands.
            </p>
          </div>

          <nav aria-label="Quick links">
            <h2 className="text-brand-deep text-[15px] font-extrabold uppercase tracking-wider">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5">
              {QUICK.map((q) => (
                <li key={q.label}>
                  <a
                    href={q.href}
                    className="hover:text-brand-deep text-[14px] font-medium text-muted-foreground transition-colors"
                  >
                    {q.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-brand-deep text-[15px] font-extrabold uppercase tracking-wider">
              Our Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-[14px] font-medium text-muted-foreground">
              {SERVICES.map((s) => (
                <li key={s} className="hover:text-brand-deep transition-colors">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-brand-deep text-[15px] font-extrabold uppercase tracking-wider">
              Get In Touch
            </h2>
            <ul className="mt-4 space-y-3.5 text-[14px] font-medium text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Phone className="text-brand-deep mt-0.5 h-4 w-4 shrink-0" />
                <a href="tel:01936711699" className="hover:text-brand-deep transition-colors font-bold">
                  01936711699
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="text-brand-deep mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href="mailto:sujonmia3090@gmail.com"
                  className="hover:text-brand-deep transition-colors font-bold break-all"
                >
                  sujonmia3090@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="text-brand-deep mt-0.5 h-4 w-4 shrink-0" />
                <span className="font-bold text-foreground/85">@sujonmia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-4 border-t border-border pt-6 sm:grid-cols-2">
          <p className="text-[13px] font-medium text-muted-foreground text-center sm:text-left">
            © 2026 <span className="text-brand-deep font-bold">Sujon</span>. All Rights Reserved.
          </p>
          <ul className="flex justify-center shrink-0 items-center gap-3.5 sm:justify-end">
            {SOCIALS.map((soc, i) => (
              <li key={i}>
                <a
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  className="nm-raised-sm nm-interactive text-brand-deep grid h-9 w-9 place-items-center rounded-[10px]"
                >
                  <soc.Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </NeumorphicCard>
    </footer>
  );
}
