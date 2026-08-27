import { NeumorphicCard } from "@/components/nm";

const TECHS = [
  { name: "WordPress", slug: "wordpress" },
  { name: "WooCommerce", slug: "woocommerce" },
  { name: "Elementor", slug: "elementor" },
  { name: "Wix", slug: "wix" },
  { name: "Webflow", slug: "webflow" },
  { name: "Laravel", slug: "laravel" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "Figma", slug: "figma" },
  { name: "Photoshop", slug: "adobephotoshop" },
  { name: "Illustrator", slug: "adobeillustrator" },
  { name: "Meta Ads", slug: "meta" },
  { name: "Google Ads", slug: "googleads" },
  { name: "Tag Manager", slug: "googletagmanager" },
  { name: "Analytics", slug: "googleanalytics" },
];

export function Technologies() {
  return (
    <section aria-label="Technologies I work with">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-7">
        <div className="mb-6 text-center">
          <h2 className="text-brand-gradient text-[clamp(1.5rem,4vw,2.2rem)] font-extrabold tracking-tight">
            Technologies I Work With
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 sm:gap-5 lg:grid-cols-8">
          {TECHS.map((t, i) => (
            <NeumorphicCard
              key={`${t.slug}-${i}`}
              depth="sm"
              radius="md"
              interactive
              className="flex flex-col items-center gap-3 px-2 py-5"
            >
              {/* Larger icon container */}
              <span className="nm-inset flex h-14 w-14 items-center justify-center rounded-[12px] sm:h-16 sm:w-16">
                <img
                  src={`https://cdn.simpleicons.org/${t.slug}`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain sm:h-10 sm:w-10"
                />
              </span>
              <span className="text-center text-[10px] font-semibold leading-tight tracking-tight text-muted-foreground">
                {t.name}
              </span>
            </NeumorphicCard>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}
