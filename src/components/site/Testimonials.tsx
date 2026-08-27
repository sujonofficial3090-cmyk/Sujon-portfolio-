import { Star } from "lucide-react";
import { NeumorphicCard } from "@/components/nm";

const REVIEWS = [
  {
    initials: "SJ",
    body: "Sujon built our WooCommerce fashion store and the results exceeded our expectations. The custom filtering and smooth checkout flow have significantly boosted our sales. His speed optimization is wizardry!",
    name: "Sarah Jenkins",
    company: "CEO, Glamour Boutique",
    site: "www.glamourboutique.com",
  },
  {
    initials: "DM",
    body: "Our consulting website is incredibly fast and looks stunning. Sujon made the Elementor integration easy to manage ourselves, and our search engine rankings rose immediately after launch.",
    name: "David Miller",
    company: "Founder, Apex Consulting",
    site: "www.apexconsulting.com",
  },
  {
    initials: "MF",
    body: "Sujon delivered a robust real estate booking platform that runs flawlessly. He integrated dynamic mapping and WhatsApp support seamlessly. Highly professional and responsive developer.",
    name: "Michael Foster",
    company: "Operations Director, PropLink",
    site: "www.proplink.net",
  },
  {
    initials: "EW",
    body: "We needed a high-performance landing page in under a week. Sujon delivered a page that loads in sub-seconds and has a conversion rate of over 12%. Exceptional work!",
    name: "Emma Watson",
    company: "Campaign Manager, CloudSaaS",
    site: "www.cloudsaas.io",
  },
  {
    initials: "RC",
    body: "The car booking calendar Sujon integrated into our website is brilliant. It handles variable seasonal pricing perfectly and our booking management is completely automated now.",
    name: "Robert Chen",
    company: "Owner, Elite Ride",
    site: "www.eliteride.com",
  },
  {
    initials: "JV",
    body: "Sujon is our go-to guy for all WordPress maintenance. He keeps our multisite secure, updated, and lightning-fast. The post-launch support is worth every dollar.",
    name: "James Vance",
    company: "Marketing Director, TechCorp",
    site: "www.techcorp.com",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-8">
        <div className="mb-8 text-center reveal-on-scroll">
          <h2 className="text-brand-gradient text-[clamp(1.6rem,4.2vw,2.5rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] sm:text-[16px] font-medium text-muted-foreground">
            Trusted feedback from businesses and partners worldwide.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, idx) => (
            <NeumorphicCard
              key={r.name + r.site}
              depth="sm"
              radius="md"
              interactive
              className={`flex flex-col items-center px-6 py-7 text-center reveal-on-scroll stagger-${(idx % 3) + 1}`}
            >
              <span className="nm-inset text-brand-deep grid h-12 w-12 place-items-center rounded-full text-[13px] font-extrabold tracking-[0.08em]">
                {r.initials}
              </span>

              {/* 5-Star Rating */}
              <div className="mt-4 flex items-center gap-1 text-amber-500 dark:text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <p className="mt-4 grow text-[14px] sm:text-[15px] font-normal leading-[1.75] text-muted-foreground">
                "{r.body}"
              </p>
              <p className="text-brand-deep mt-5 text-[15px] font-extrabold">{r.name}</p>
              <p className="mt-0.5 text-[12px] font-bold text-foreground/75">{r.company}</p>
              <p className="mt-1 text-[11px] font-semibold text-muted-foreground/80 hover:text-brand transition-colors">
                <a href={`https://${r.site}`} target="_blank" rel="noopener noreferrer">
                  {r.site}
                </a>
              </p>
            </NeumorphicCard>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}
