import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { NeumorphicCard, NeumorphicLinkButton } from "@/components/nm";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/projects/$projectId")({
  head: ({ params }) => {
    const project = PROJECTS.find((p) => p.id === params.projectId);
    return {
      meta: [
        { title: project ? `${project.title} — SUJON Portfolio` : "Project Not Found" },
        {
          name: "description",
          content: project ? project.description : "Project details page.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.id === params.projectId);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();

  if (!project) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-2xl font-bold">Project Not Found</h1>
        <Link to="/" className="text-brand-deep underline">Back to Home</Link>
      </div>
    );
  }

  const technologies = project.techStack || project.tags || [];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col gap-6 px-3 pb-10 pt-3 sm:px-5 sm:gap-8">
      <Header />

      <main className="flex flex-col gap-6 sm:gap-8">
        {/* Back navigation & Basic details */}
        <section aria-label="Project intro">
          <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-8">
            <Link
              to="/"
              className="nm-raised-sm hover:nm-inset inline-flex items-center gap-1.5 rounded-[8px] px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-muted-foreground transition-all duration-300 hover:text-brand-deep"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back To Projects
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="nm-inset text-brand-deep rounded-[8px] px-3.5 py-1 text-[11px] font-extrabold tracking-[0.1em] uppercase">
                {project.category}
              </span>
            </div>

            <h1 className="text-brand-gradient mt-4 text-[clamp(2rem,5vw,3.4rem)] font-extrabold tracking-tight leading-[1.12] pb-1 inline-block">
              {project.title}
            </h1>

            <p className="mt-4 max-w-4xl text-[15px] sm:text-[16px] font-medium leading-[1.75] text-foreground/85 dark:text-foreground/85">
              {project.description}
            </p>
          </NeumorphicCard>
        </section>

        {/* Large Mockup Image inside 1500px container */}
        <section aria-label="Project mockup">
          <NeumorphicCard depth="md" radius="lg" className="overflow-hidden p-3 sm:p-4">
            <div className="nm-inset overflow-hidden rounded-[14px]">
              <img
                src={project.img}
                alt={`${project.title} Featured Mockup`}
                width={1600}
                height={900}
                className="w-full object-cover object-top max-h-[520px] sm:max-h-[640px]"
              />
            </div>
          </NeumorphicCard>
        </section>

        {/* Grid Content: Overview/Challenge/Solution vs Project Details */}
        <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-6">
            {/* Overview & Core Story */}
            <NeumorphicCard depth="md" radius="lg" className="px-5 py-6 sm:p-8">
              <h2 className="text-brand-gradient text-[18px] sm:text-[20px] font-extrabold uppercase tracking-wider mb-4 pb-1 inline-block">
                Project Overview
              </h2>
              <p className="text-[15px] sm:text-[16px] font-normal leading-[1.75] text-muted-foreground">
                {project.overview}
              </p>

              <h2 className="text-brand-gradient text-[18px] sm:text-[20px] font-extrabold uppercase tracking-wider mt-8 mb-4 pb-1 inline-block">
                The Challenge
              </h2>
              <p className="text-[15px] sm:text-[16px] font-normal leading-[1.75] text-muted-foreground">
                {project.challenge}
              </p>

              <h2 className="text-brand-gradient text-[18px] sm:text-[20px] font-extrabold uppercase tracking-wider mt-8 mb-4 pb-1 inline-block">
                The Solution
              </h2>
              <p className="text-[15px] sm:text-[16px] font-normal leading-[1.75] text-muted-foreground">
                {project.solution}
              </p>
            </NeumorphicCard>

            {/* Key Features */}
            <NeumorphicCard depth="md" radius="lg" className="px-5 py-6 sm:p-8">
              <h2 className="text-brand-gradient text-[18px] sm:text-[20px] font-extrabold uppercase tracking-wider mb-5 pb-1 inline-block">
                Key Features
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {(project.features || []).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14px] sm:text-[15px] font-medium text-foreground/85">
                    <span className="nm-raised-sm flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-brand-deep">
                      <Check className="h-3.5 w-3.5 stroke-[3px]" />
                    </span>
                    <span className="leading-snug mt-0.5">{feat}</span>
                  </li>
                ))}
              </ul>
            </NeumorphicCard>
          </div>

          <div className="flex flex-col gap-6">
            {/* Tech Stack & Live Links */}
            <NeumorphicCard depth="md" radius="lg" className="px-5 py-6 sm:p-8">
              <h2 className="text-brand-gradient text-[18px] sm:text-[20px] font-extrabold uppercase tracking-wider mb-5 pb-1 inline-block">
                Project Info
              </h2>
              <div className="space-y-4 text-[14px] font-medium">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-foreground/90 font-bold">Category</span>
                  <span className="text-muted-foreground">{project.category}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-foreground/90 font-bold">Developer</span>
                  <span className="text-muted-foreground">Sujon</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-foreground/90 font-bold">Timeline</span>
                  <span className="text-muted-foreground">2 Weeks</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-foreground/90 font-bold">Client Rating</span>
                  <span className="text-brand-deep font-extrabold">5.0 / 5.0 ★★★★★</span>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-5">
                <span className="text-[12px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  Technologies Used
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {technologies.map((tag) => (
                    <span
                      key={tag}
                      className="nm-inset text-brand-deep rounded-[8px] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nm-raised-sm nm-interactive flex items-center justify-center gap-2 rounded-[10px] w-full py-3.5 text-[12px] font-extrabold tracking-[0.1em] uppercase text-brand-deep"
                >
                  Visit Live Website <ExternalLink className="h-4 w-4" />
                </a>

                <NeumorphicLinkButton href="/#contact" tone="brand" size="md" className="w-full font-extrabold text-[12px]">
                  Order Similar Website
                </NeumorphicLinkButton>
              </div>
            </NeumorphicCard>

            {/* WordPress Developer Guarantee */}
            <NeumorphicCard depth="sm" radius="md" className="p-5 text-center">
              <span className="nm-inset text-brand-deep mx-auto grid h-12 w-12 place-items-center rounded-full text-[16px] font-extrabold">
                ✓
              </span>
              <h3 className="mt-3 text-[15px] font-extrabold text-foreground">100% Quality Guaranteed</h3>
              <p className="mt-1 text-[13px] font-normal leading-[1.6] text-muted-foreground">
                Speed-optimized, cross-device tested and fully editable in Elementor / WordPress block editor.
              </p>
            </NeumorphicCard>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
