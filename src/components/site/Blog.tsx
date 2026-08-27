import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { NeumorphicCard } from "@/components/nm";
import { BLOG_POSTS } from "@/data/blog";

export function Blog() {
  return (
    <section aria-label="Latest articles">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-7">
        <div className="mb-6 text-center">
          <h2 className="text-brand-gradient text-[clamp(1.5rem,4vw,2.2rem)] font-extrabold tracking-tight">
            Latest from the Blog
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BLOG_POSTS.map((p) => (
            <Link
              key={p.id}
              to="/blog/$postSlug"
              params={{ postSlug: p.slug }}
              className="block"
            >
              <NeumorphicCard
                depth="sm"
                radius="md"
                interactive
                className="flex h-full flex-col p-3"
              >
                <div className="overflow-hidden rounded-[9px]">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                  />
                </div>

                <div className="mt-3 px-1">
                  <span className="nm-inset text-brand-deep inline-block rounded-[5px] px-2 py-0.5 text-[9px] font-bold tracking-[0.1em] uppercase">
                    {p.category}
                  </span>
                </div>

                <h3 className="text-brand-deep mt-2.5 grow px-1 text-[12.5px] font-bold leading-[1.55]">
                  {p.title}
                </h3>

                <div className="mt-4 flex items-center justify-between px-1">
                  <span className="nm-inset rounded-[8px] px-3 py-1.5 text-[9px] font-bold tracking-[0.12em] uppercase text-muted-foreground">
                    Read More
                  </span>
                  <span className="nm-raised-sm text-brand-deep grid h-7 w-7 place-items-center rounded-full">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </NeumorphicCard>
            </Link>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}
