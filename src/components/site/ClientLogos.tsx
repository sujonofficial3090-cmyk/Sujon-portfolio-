import { NeumorphicCard } from "@/components/nm";

const PARTNERS = [
  { name: "Shopify Plus", label: "Shopify Plus Partner" },
  { name: "WordPress VIP", label: "Enterprise WordPress" },
  { name: "Stripe", label: "Verified Stripe Partner" },
  { name: "Webflow", label: "Certified Expert" },
  { name: "Next.js", label: "Vercel / Next.js Stack" },
  { name: "AWS Cloud", label: "Cloud Infrastructure" },
  { name: "Tailwind CSS", label: "Design Systems" },
  { name: "WooCommerce", label: "Enterprise E-Commerce" },
];

export function ClientLogos() {
  return (
    <section aria-label="Trusted technology partners" className="w-full">
      <NeumorphicCard depth="sm" radius="lg" className="overflow-hidden py-6 px-4">
        <div className="text-center mb-4">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by fast-growing startups &amp; global enterprises powered by modern tech
          </p>
        </div>

        {/* Dynamic Logo Strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="nm-raised-sm flex items-center gap-2 rounded-[10px] px-4 py-2.5 transition-all duration-300 hover:text-brand-deep hover:-translate-y-0.5 group"
            >
              <span className="h-2 w-2 rounded-full bg-brand-deep animate-pulse" />
              <span className="text-[13px] sm:text-[14px] font-extrabold text-foreground group-hover:text-brand-deep transition-colors tracking-tight">
                {partner.name}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground/70 hidden md:inline">
                • {partner.label}
              </span>
            </div>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}
