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
      <NeumorphicCard depth="md" radius="lg" className="p-4 sm:p-5">
        <h2 className="text-brand-gradient mb-6 text-center text-[clamp(1.4rem,4vw,2rem)] font-extrabold tracking-tight">
          What Our Clients Say
        </h2>
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <NeumorphicCard
              key={r.name + r.site}
              depth="sm"
              radius="md"
              interactive
              className="flex flex-col items-center px-5 py-7 text-center"
            >
              <span className="nm-inset text-brand-deep grid h-11 w-11 place-items-center rounded-full text-[11px] font-extrabold tracking-[0.08em]">
                {r.initials}
              </span>

              {/* 5-Star Rating */}
              <div className="mt-4 flex items-center gap-0.5 text-amber-500 dark:text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>

              <p className="mt-4 grow text-[11.5px] leading-[1.85] text-muted-foreground">
                "{r.body}"
              </p>
              <p className="text-brand-deep mt-4 text-[12px] font-bold">{r.name}</p>
              <p className="mt-0.5 text-[9.5px] font-medium text-foreground/75">{r.company}</p>
              <p className="mt-0.5 text-[9.5px] text-muted-foreground/80 hover:text-brand transition-colors">
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
