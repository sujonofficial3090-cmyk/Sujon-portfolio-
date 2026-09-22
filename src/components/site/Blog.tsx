import { ArrowUpRight } from "lucide-react";
import { NeumorphicCard } from "@/components/nm";
import { BLOG_POSTS } from "@/data/blog";

export function Blog() {
  return (
    <section id="blog" aria-label="Latest articles" className="scroll-mt-28">
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
              <figure
                key={p.id}
                className={`group nm-raised-sm flex flex-col justify-between overflow-hidden rounded-[16px] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-nm-hover)] reveal-on-scroll stagger-${(idx % 4) + 1}`}
              >
                <div className="flex flex-col grow">
                  <a
                    href={blogUrl}
                    className="block overflow-hidden rounded-[10px]"
                    title={p.title}
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={600}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </a>

                  <div className="mt-3.5 px-1">
                    <span className="nm-inset text-brand-deep inline-block rounded-[6px] px-3 py-1 text-[10px] font-extrabold tracking-[0.1em] uppercase">
                      {p.category}
                    </span>
                  </div>

                  <h3 className="text-brand-deep mt-3 grow px-1 text-[15px] sm:text-[16px] font-extrabold leading-[1.5]">
                    <a
                      href={blogUrl}
                      className="hover:text-brand transition-colors"
                    >
                      {p.title}
                    </a>
                  </h3>
                </div>

                <div className="mt-6 px-1 pb-1">
                  <a
                    href={blogUrl}
                    className="nm-raised-sm nm-interactive text-brand-deep inline-flex items-center justify-center gap-2 rounded-[10px] w-full py-3.5 text-[12px] font-extrabold tracking-[0.1em] uppercase transition-all duration-300 active:nm-inset"
                  >
                    Read More <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </figure>
            );
          })}
        </div>
      </NeumorphicCard>
    </section>
  );
}
