import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog";
import { NeumorphicCard, NeumorphicLinkButton } from "@/components/nm";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/blog/$postSlug")({
  head: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.postSlug);
    return {
      meta: [
        { title: post ? `${post.title} — Sujon's Blog` : "Blog Post Not Found" },
        {
          name: "description",
          content: post ? post.excerpt : "Blog post page."
        }
      ]
    };
  },
  loader: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.postSlug);
    if (!post) throw notFound();
    const related = BLOG_POSTS.filter((p) => p.slug !== params.postSlug).slice(0, 3);
    return { post, related };
  },
  component: BlogDetail,
});

function renderContent(content) {
  const lines = content.split("\n");
  const elements = [];
  let listItems = [];

  const flushList = (key) => {
    if (listItems.length) {
      elements.push(
        <ul key={key} className="mb-4 ml-5 list-disc space-y-1.5 text-muted-foreground">
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground font-semibold'>$1</strong>") }} />
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, idx) => {
    const key = `line-${idx}`;
    if (line.startsWith("## ")) {
      flushList(key + "-list");
      elements.push(<h2 key={key} className="text-brand-gradient mt-8 mb-3 text-[18px] font-extrabold tracking-tight">{line.replace("## ", "")}</h2>);
    } else if (line.startsWith("### ")) {
      flushList(key + "-list");
      elements.push(<h3 key={key} className="text-brand-deep mt-6 mb-2 text-[15px] font-bold">{line.replace("### ", "")}</h3>);
    } else if (line.startsWith("- ")) {
      listItems.push(line.replace("- ", ""));
    } else if (line.startsWith("**") && line.endsWith("**")) {
      flushList(key + "-list");
      elements.push(<p key={key} className="mb-3 font-bold text-foreground" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "$1") }} />);
    } else if (line.trim()) {
      flushList(key + "-list");
      elements.push(<p key={key} className="mb-4 text-muted-foreground leading-[1.8]" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground font-semibold'>$1</strong>") }} />);
    } else {
      flushList(key + "-list");
    }
  });
  flushList("final");

  return elements;
}

function BlogDetail() {
  const { post, related } = Route.useLoaderData();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col gap-6 px-3 pb-10 pt-3 sm:px-5 sm:gap-8">
      <Header />

      <main className="flex flex-col gap-6 sm:gap-8">
        {/* Navigation */}
        <div>
          <Link
            to="/"
            className="nm-raised-sm hover:nm-inset inline-flex items-center gap-1.5 rounded-[8px] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground transition-all duration-300 hover:text-brand-deep"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back To Blog
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main Article */}
          <div className="flex flex-col gap-6">
            {/* Hero Image */}
            <NeumorphicCard depth="md" radius="lg" className="overflow-hidden p-3">
              <div className="nm-inset overflow-hidden rounded-[12px]">
                <img
                  src={post.img}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="aspect-[2/1] w-full object-cover"
                />
              </div>
            </NeumorphicCard>

            {/* Article Content */}
            <NeumorphicCard depth="md" radius="lg" className="px-6 py-8 sm:px-10 sm:py-10">
              {/* Meta */}
              <div className="mb-5 flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
                <span className="nm-inset text-brand-deep rounded-[6px] px-2.5 py-1 text-[10px] font-bold tracking-[0.1em] uppercase">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-brand-deep" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-brand-deep" />
                  {post.author}
                </span>
              </div>

              <h1 className="text-brand-gradient text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight">
                {post.title}
              </h1>

              <p className="mt-4 text-[15px] font-medium leading-[1.75] text-muted-foreground border-l-2 border-brand-deep pl-4 italic">
                {post.excerpt}
              </p>

              <div className="mt-8 text-[15px]">
                {renderContent(post.content)}
              </div>
            </NeumorphicCard>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Author card */}
            <NeumorphicCard depth="md" radius="lg" className="p-6 text-center">
              <div className="nm-inset mx-auto flex h-16 w-16 items-center justify-center rounded-full text-[18px] font-extrabold text-brand-deep">
                S
              </div>
              <h3 className="mt-4 text-[15px] font-bold text-foreground">Sujon</h3>
              <p className="mt-1 text-[12px] text-muted-foreground">Professional WordPress Developer</p>
              <p className="mt-3 text-[13px] leading-[1.65] text-muted-foreground">
                5+ years building modern, fast and high-converting WordPress websites for businesses worldwide.
              </p>
              <div className="mt-5">
                <NeumorphicLinkButton href="/#contact" tone="brand" size="sm" className="w-full">
                  Hire Me
                </NeumorphicLinkButton>
              </div>
            </NeumorphicCard>

            {/* Related Posts */}
            <NeumorphicCard depth="md" radius="lg" className="p-5">
              <h3 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-brand-deep mb-4">
                <Tag className="h-3.5 w-3.5" /> Related Posts
              </h3>
              <div className="flex flex-col gap-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to="/blog/$postSlug"
                    params={{ postSlug: r.slug }}
                    className="nm-raised-sm flex gap-3 rounded-[10px] p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-nm-hover)]"
                  >
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[8px]">
                      <img
                        src={r.img}
                        alt={r.title}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold leading-snug text-foreground line-clamp-2">
                        {r.title}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground">{r.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </NeumorphicCard>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}