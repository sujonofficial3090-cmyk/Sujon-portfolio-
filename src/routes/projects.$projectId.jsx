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
          content: project ? project.description : "Project details page."
        }
      ]
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

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-3 pb-10 sm:px-5 sm:gap-8">
      <Header />

      <main className="flex flex-col gap-6 sm:gap-8">
        {/* Back navigation & Basic details */}
        <section aria-label="Project intro">
          <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-8">
            <Link
              to="/"
              className="nm-raised-sm hover:nm-inset inline-flex items-center gap-1.5 rounded-[8px] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground transition-all duration-300 hover:text-brand-deep"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back To Projects
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="nm-inset text-brand-deep rounded-[8px] px-3 py-1 text-[9px] font-bold tracking-[0.1em] uppercase">
                {project.category}
              </span>
            </div>

            <h1 className="text-brand-gradient mt-4 text-[clamp(1.8rem,5vw,3rem)] font-extrabold tracking-tight">
              {project.title}
            </h1>

            <p className="mt-3 max-w-3xl text-[12.5px] leading-[1.8] text-muted-foreground">
              {project.description}
            </p>
          </NeumorphicCard>
        </section>

        {/* Large Mockup Image */}
        <section aria-label="Project mockup">
          <NeumorphicCard depth="md" radius="lg" className="overflow-hidden p-3">
            <div className="nm-inset overflow-hidden rounded-[12px]">
              <img
                src={project.img}
                alt={`${project.title} Featured Mockup`}
                width={1600}
                height={900}
                className="w-full object-cover object-top max-h-[460px] sm:max-h-[560px]"
              />
            </div>
          </NeumorphicCard>
        </section>

        {/* Grid Content: Overview/Challenge/Solution vs Project Details */}
        <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-6">
            {/* Overview & Core Story */}
            <NeumorphicCard depth="md" radius="lg" className="px-5 py-6 sm:p-8">
              <h2 className="text-brand-gradient text-[16px] font-extrabold uppercase tracking-wider mb-4">
                Project Overview
              </h2>
              <p className="text-[12.5px] leading-[1.85] text-muted-foreground">
                {project.overview}
              </p>

              <h2 className="text-brand-gradient text-[16px] font-extrabold uppercase tracking-wider mt-8 mb-4">
                The Challenge
              </h2>
              <p className="text-[12.5px] leading-[1.85] text-muted-foreground">
                {project.challenge}
              </p>

              <h2 className="text-brand-gradient text-[16px] font-extrabold uppercase tracking-wider mt-8 mb-4">
                The Solution
              </h2>
              <p className="text-[12.5px] leading-[1.85] text-muted-foreground">
                {project.solution}
              </p>
            </NeumorphicCard>

            {/* Key Features */}
            <NeumorphicCard depth="md" radius="lg" className="px-5 py-6 sm:p-8">
              <h2 className="text-brand-gradient text-[16px] font-extrabold uppercase tracking-wider mb-5">
                Key Features
              </h2>
              <ul className="grid gap-3.5 sm:grid-cols-2">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[12px] text-muted-foreground">
                    <span className="nm-raised-sm flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-brand-deep">
                      <Check className="h-3 w-3 stroke-[3px]" />
                    </span>
                    <span className="leading-tight mt-0.5">{feat}</span>
                  </li>
                ))}
              </ul>
            </NeumorphicCard>
          </div>

          <div className="flex flex-col gap-6">
            {/* Tech Stack & Live Links */}
            <NeumorphicCard depth="md" radius="lg" className="px-5 py-6 sm:p-8">
              <h2 className="text-brand-gradient text-[16px] font-extrabold uppercase tracking-wider mb-5">
                Project Info
              </h2>
              <div className="space-y-4 text-[12px]">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="font-semibold text-foreground/80">Category</span>
                  <span className="text-muted-foreground">{project.category}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="font-semibold text-foreground/80">Developer</span>
                  <span className="text-muted-foreground">Sujon</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="font-semibold text-foreground/80">Framework</span>
                  <span className="text-muted-foreground">WordPress CMS</span>
                </div>
              </div>

              <h3 className="text-[12px] font-bold text-foreground mt-7 mb-3 uppercase tracking-wider">
                Technology Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="nm-raised-sm rounded-[6px] px-2.5 py-1.5 text-[9.5px] font-semibold text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <NeumorphicLinkButton
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tone="brand"
                  size="md"
                  className="w-full gap-2.5"
                >
                  Visit Live Website <ExternalLink className="h-3.5 w-3.5" />
                </NeumorphicLinkButton>
              </div>
            </NeumorphicCard>

            {/* Screenshots Gallery */}
            <NeumorphicCard depth="md" radius="lg" className="px-5 py-6 sm:p-8">
              <h2 className="text-brand-gradient text-[16px] font-extrabold uppercase tracking-wider mb-4">
                Gallery
              </h2>
              <div className="grid gap-3.5 grid-cols-2">
                {project.screenshots.map((shot, idx) => (
                  <div
                    key={idx}
                    className="nm-raised-sm overflow-hidden rounded-[8px] p-1.5 hover:-translate-y-0.5 transition-transform duration-300"
                  >
                    <img
                      src={shot}
                      alt="Project Screenshot"
                      width={400}
                      height={300}
                      className="aspect-[4/3] w-full rounded-[6px] object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            </NeumorphicCard>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
