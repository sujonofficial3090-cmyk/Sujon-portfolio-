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
    desc: "Custom-built, high-performing WordPress websites tailored to your business needs.",
    img: svc1,
  },
  {
    title: "Elementor Development",
    desc: "Pixel-perfect, drag-and-drop page builder designs for flexible & beautiful layouts.",
    img: svc2,
  },
  {
    title: "WooCommerce Development",
    desc: "Feature-rich eCommerce storefronts optimized for high conversions and user experience.",
    img: svc3,
  },
  {
    title: "Custom WordPress Website",
    desc: "Unique custom WordPress themes developed from scratch — no page-builder bloat.",
    img: svc4,
  },
  {
    title: "WordPress Website Redesign",
    desc: "Transform your outdated website into a modern, sleek, and highly engaging platform.",
    img: svc5,
  },
  {
    title: "WordPress Speed Optimization",
    desc: "Boost page load times, GTmetrix scores, and Core Web Vitals for better SEO rankings.",
    img: svc6,
  },
  {
    title: "WordPress Maintenance",
    desc: "Regular security checks, plugin updates, and backups to keep your site safe 24/7.",
    img: svc7,
  },
  {
    title: "Landing Page Development",
    desc: "High-converting, responsive landing pages built specifically for leads and sales.",
    img: svc8,
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-8">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="text-brand-gradient text-[clamp(1.6rem,4.2vw,2.5rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            Explore Our Services
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-[15px] sm:text-[16px] font-medium text-muted-foreground leading-[1.65]">
            Professional WordPress solutions designed to help businesses build a stronger online presence.
          </p>
        </div>

        {/* 4x2 Grid with Large, Box-Sized Service Images */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <NeumorphicCard
              key={s.title}
              depth="sm"
              radius="lg"
              interactive
              className="flex flex-col items-center justify-between text-center px-5 py-7 sm:px-6 sm:py-8 group transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Large, Box-Proportioned 3D Service Image */}
              <div className="flex h-[130px] sm:h-[145px] md:h-[150px] items-center justify-center w-full mb-4">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={220}
                  height={220}
                  className="h-[120px] sm:h-[135px] md:h-[140px] w-auto max-w-[92%] object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div>
                {/* Service Title */}
                <h3 className="text-[15px] sm:text-[16px] font-extrabold leading-snug tracking-tight text-foreground">
                  {s.title}
                </h3>

                {/* Service Description */}
                <p className="mt-2.5 text-[13px] sm:text-[13.5px] font-normal leading-[1.65] text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            </NeumorphicCard>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}
