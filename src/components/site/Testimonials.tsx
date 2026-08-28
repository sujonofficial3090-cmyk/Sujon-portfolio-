import { Star, Quote, CheckCircle } from "lucide-react";
import { NeumorphicCard } from "@/components/nm";

const REVIEWS = [
  {
    initials: "SJ",
    body: "Apex Digital completely overhauled our WooCommerce platform. Our conversion rate jumped by 38% in the first 30 days, and the page load time dropped to 0.4 seconds. Outstanding ROI!",
    name: "Sarah Jenkins",
    company: "CEO, Glamour Boutique",
    site: "glamourboutique.com",
    metric: "+38% Conversions",
  },
  {
    initials: "DM",
    body: "The team delivered our bespoke enterprise SaaS portal ahead of schedule. Their attention to UX, micro-interactions, and robust Next.js engineering is world-class.",
    name: "David Miller",
    company: "Founder, Apex Consulting Group",
    site: "apexconsulting.com",
    metric: "2.4M Active Users",
  },
  {
    initials: "MF",
    body: "Working with Apex Digital was the best investment we made this year. They built our dynamic property listing marketplace with seamless search filters and lightning speed.",
    name: "Michael Foster",
    company: "Operations Director, PropLink",
    site: "proplink.net",
    metric: "99.9% Uptime",
  },
  {
    initials: "EW",
    body: "We needed a high-performance sales funnel for a multi-million dollar ad campaign. Apex Digital engineered a landing page that achieved a 14.2% conversion rate. Unmatched excellence!",
    name: "Emma Watson",
    company: "Growth Lead, CloudSaaS",
    site: "cloudsaas.io",
    metric: "14.2% Funnel CVR",
  },
  {
    initials: "RC",
    body: "Their team built an automated fleet booking platform that handles complex seasonal pricing effortlessly. Our booking volume doubled within three months of launch.",
    name: "Robert Chen",
    company: "Founder, Elite Mobility",
    site: "eliteride.com",
    metric: "+120% Bookings",
  },
  {
    initials: "JV",
    body: "Apex Digital manages our enterprise multisite infrastructure 24/7. Their proactive security, instant SLA support, and continuous speed optimization give us complete peace of mind.",
    name: "James Vance",
    company: "CTO, TechCorp Global",
    site: "techcorp.com",
    metric: "24/7 Dedicated SLA",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-6 sm:p-10">
        <div className="mb-10 text-center reveal-on-scroll">
          <span className="nm-inset text-brand-deep rounded-[8px] px-3.5 py-1 text-[11px] font-extrabold tracking-[0.15em] uppercase inline-block mb-3">
            VERIFIED CLIENT REVIEWS
          </span>
          <h2 className="text-brand-gradient text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold tracking-tight pb-1 leading-normal">
            Trusted by Industry Leaders Worldwide
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] sm:text-[16px] font-medium text-muted-foreground">
            Read how we've helped fast-scaling startups and enterprises achieve extraordinary digital results.
          </p>

          {/* Trustpilot & Rating Header */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[13px] font-bold text-foreground/85">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-500" />
              ))}
            </div>
            <span><strong>5.0 / 5.0</strong> Based on 150+ Verified Client Reviews</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, idx) => (
            <div
              key={r.name + r.site}
              className={`nm-raised-sm relative flex flex-col justify-between rounded-[18px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-nm-hover)] reveal-on-scroll stagger-${(idx % 3) + 1}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="nm-inset text-brand-deep grid h-10 w-10 place-items-center rounded-full text-[12px] font-extrabold tracking-wide">
                      {r.initials}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-extrabold text-foreground">{r.name}</h3>
                      <p className="text-[12px] font-medium text-muted-foreground">{r.company}</p>
                    </div>
                  </div>
                  <Quote className="h-6 w-6 text-brand-deep/30" />
                </div>

                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-[14px] leading-[1.7] text-foreground/80 font-medium">
                  "{r.body}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                <span className="nm-inset text-brand-deep rounded-[6px] px-2.5 py-1 text-[11px] font-extrabold flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> {r.metric}
                </span>
                <span className="text-[11px] font-bold text-muted-foreground">
                  {r.site}
                </span>
              </div>
            </div>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}

