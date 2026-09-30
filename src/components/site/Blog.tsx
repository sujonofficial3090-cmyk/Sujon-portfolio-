import { useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { NeumorphicCard } from "@/components/nm";
import { BLOG_POSTS } from "@/data/blog";
import { useTranslation } from "@/lib/i18n";
import { useSiteVersion } from "@/lib/versionContext";

export function Blog() {
  const { t } = useTranslation();
  const { isV2 } = useSiteVersion();
  const [showAll, setShowAll] = useState(false);

  const activePosts = isV2 ? BLOG_POSTS : BLOG_POSTS.slice(0, 4);
  const visiblePosts = isV2 ? (showAll ? activePosts : activePosts.slice(0, 4)) : activePosts;

  return (
    <section id="blog" aria-label="Latest articles" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-8">
        <div className="mb-8 text-center reveal-on-scroll">
          <h2 className="text-brand-gradient text-[clamp(1.6rem,4.2vw,2.5rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            {t("blog_heading", "Latest from the Blog")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] sm:text-[16px] font-medium text-muted-foreground">
            {isV2
              ? t("blog_subtitle", "Insights, tutorials, and best practices on WordPress development, full-stack architecture, and AI-powered workflows.")
              : "Insights, tutorials, and best practices on WordPress development, Elementor Pro, and WooCommerce optimization."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visiblePosts.map((p, idx) => {
            const blogUrl = `/blog/${p.slug}`;
            const blogTitle = t(`blog_${p.id}_title` as any, p.title);
            return (
              <figure
                key={p.id}
                className={`group nm-raised-sm flex flex-col justify-between overflow-hidden rounded-[16px] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-nm-hover)] reveal-on-scroll stagger-${(idx % 4) + 1}`}
              >
                <div className="flex flex-col grow">
                  <a
                    href={blogUrl}
                    className="block overflow-hidden rounded-[10px]"
                    title={blogTitle}
                  >
                    <img
                      src={p.img}
                      alt={blogTitle}
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
                      {blogTitle}
                    </a>
                  </h3>
                </div>

                <div className="mt-6 px-1 pb-1">
                  <a
                    href={blogUrl}
                    className="nm-raised-sm nm-interactive text-brand-deep inline-flex items-center justify-center gap-2 rounded-[10px] w-full py-3.5 text-[12px] font-extrabold tracking-[0.1em] uppercase transition-all duration-300 active:nm-inset"
                  >
                    {t("blog_read_more", "Read More")} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </figure>
            );
          })}
        </div>

        {isV2 && BLOG_POSTS.length > 4 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="nm-raised-sm hover:nm-interactive text-brand-deep inline-flex items-center justify-center gap-2 rounded-[12px] px-6 sm:px-8 py-3.5 text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider transition-all duration-300 active:nm-inset select-none cursor-pointer"
              style={{ fontFamily: '"Funnel Display", sans-serif' }}
            >
              {showAll ? (
                <>
                  {t("blog_show_less", "Show Less")} <ChevronUp className="h-4 w-4 text-brand-deep" />
                </>
              ) : (
                <>
                  {t("blog_show_more", "View All Articles")} ({BLOG_POSTS.length}){" "}
                  <ChevronDown className="h-4 w-4 text-brand-deep" />
                </>
              )}
            </button>
          </div>
        )}
      </NeumorphicCard>
    </section>
  );
}
