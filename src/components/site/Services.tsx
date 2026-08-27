import svc1 from "@/assets/svc-1.png";
import svc2 from "@/assets/svc-2.png";
import svc3 from "@/assets/svc-3.png";
import svc4 from "@/assets/svc-4.png";
import svc5 from "@/assets/svc-5.png";
import svc6 from "@/assets/svc-6.png";
import svc7 from "@/assets/svc-7.png";
import svc8 from "@/assets/svc-8.png";
import { NeumorphicCard } from "@/components/nm";

const SERVICES = [
  {
    title: "WordPress Development",
    img: svc1,
    description: "Custom-built, high-performing WordPress websites tailored to your business needs.",
  },
  {
    title: "Elementor Development",
    img: svc2,
    description: "Pixel-perfect, drag-and-drop page builder designs for flexible & beautiful layouts.",
  },
  {
    title: "WooCommerce Development",
    img: svc3,
    description: "Feature-rich eCommerce storefronts optimized for high conversions and user experience.",
  },
  {
    title: "Custom WordPress Website",
    img: svc4,
    description: "Unique custom WordPress themes developed from scratch — no page-builder bloat.",
  },
  {
    title: "WordPress Website Redesign",
    img: svc5,
    description: "Transform your outdated website into a modern, sleek, and highly engaging platform.",
  },
  {
    title: "WordPress Speed Optimization",
    img: svc6,
    description: "Boost page load times, GTmetrix scores, and Core Web Vitals for better SEO rankings.",
  },
  {
    title: "WordPress Maintenance",
    img: svc7,
    description: "Regular security checks, plugin updates, and backups to keep your site safe 24/7.",
  },
  {
    title: "Landing Page Development",
    img: svc8,
    description: "High-converting, responsive landing pages built specifically for leads and sales.",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-7">
        {/* Section Header */}
        <div className="mb-7 text-center">
          <h2 className="text-brand-gradient text-[clamp(1.5rem,4vw,2.2rem)] font-extrabold tracking-tight">
            Explore Our Services
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[14px] text-muted-foreground leading-[1.65]">
            Professional WordPress solutions designed to help businesses build a stronger online presence.
          </p>
        </div>

        {/* 4×2 Grid — equal heights via grid-rows */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <NeumorphicCard
              key={s.title}
              depth="sm"
              radius="md"
              interactive
              className="flex h-full flex-col items-center px-4 pb-6 pt-7 text-center"
            >
              {/* Icon area — fixed height container so all cards are consistent */}
              <div className="flex h-[110px] w-full flex-shrink-0 items-center justify-center sm:h-[130px]">
                <img
                  src={s.img}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={512}
                  height={512}
                  className="h-[100px] w-auto max-w-[90%] object-contain sm:h-[120px]"
                />
              </div>

              {/* Title */}
              <h3 className="mt-4 text-[13px] font-bold leading-snug tracking-tight text-foreground">
                {s.title}
              </h3>

              {/* Description — flex-grow so all cards end at same bottom */}
              <p className="mt-2.5 grow text-[12px] leading-[1.65] text-muted-foreground">
                {s.description}
              </p>
            </NeumorphicCard>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}
