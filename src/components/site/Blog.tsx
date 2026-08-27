import { ArrowUpRight } from "lucide-react";
import { NeumorphicCard } from "@/components/nm";
import { BLOG_POSTS } from "@/data/blog";

export function Blog() {
  return (
    <section aria-label="Latest articles" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-8">
        <div className="mb-8 text-center reveal-on-scroll">
          <h2 className="text-brand-gradient text-[clamp(1.6rem,4.2vw,2.5rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            Latest from the Blog
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] sm:text-[16px] font-medium text-muted-foreground">
            Insights, tutorials, and best practices on WordPress development and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BLOG_POSTS.map((p, idx) => {
            const blogUrl = `/blog/${p.slug}`;
            return (
              <a
                key={p.id}
                href={blogUrl}
                className={`block group reveal-on-scroll stagger-${(idx % 4) + 1}`}
              >
                <NeumorphicCard
                  depth="sm"
                  radius="md"
                  interactive
                  className="flex h-full flex-col p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-nm-hover)]"
                >
                  <div className="overflow-hidden rounded-[10px]">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="mt-3.5 px-1">
                    <span className="nm-inset text-brand-deep inline-block rounded-[6px] px-2.5 py-0.5 text-[10px] font-extrabold tracking-[0.1em] uppercase">
                      {p.category}
                    </span>
                  </div>

                  <h3 className="text-brand-deep mt-3 grow px-1 text-[15px] sm:text-[16px] font-extrabold leading-[1.5]">
                    {p.title}
                  </h3>

                  <div className="mt-5 flex items-center justify-between px-1">
                    <span className="nm-inset rounded-[8px] px-3.5 py-1.5 text-[10px] font-extrabold tracking-[0.12em] uppercase text-muted-foreground">
                      Read More
                    </span>
                    <span className="nm-raised-sm text-brand-deep grid h-8 w-8 place-items-center rounded-full transition-transform group-hover:scale-110">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </NeumorphicCard>
              </a>
            );
          })}
        </div>
      </NeumorphicCard>
    </section>
  );
}
