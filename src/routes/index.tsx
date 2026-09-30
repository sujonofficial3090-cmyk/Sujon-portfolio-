import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/site/About";
import { AiWorkflow } from "@/components/site/AiWorkflow";
import { Blog } from "@/components/site/Blog";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { HowIBuild } from "@/components/site/HowIBuild";
import { Portfolio } from "@/components/site/Portfolio";
import { Services } from "@/components/site/Services";
import { Stats } from "@/components/site/Stats";
import { Technologies } from "@/components/site/Technologies";
import { Testimonials } from "@/components/site/Testimonials";
import { MobileAiAssistant } from "@/components/site/MobileAiAssistant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sujon — Full-Stack Web Developer & WordPress Expert" },
      {
        name: "description",
        content:
          "Full-Stack Web Developer and WordPress Expert specializing in modern web development, AI-assisted coding, vibe coding, WordPress, Elementor, WooCommerce, and custom web solutions.",
      },
      { property: "og:title", content: "Sujon — Full-Stack Web Developer & WordPress Expert" },
      {
        property: "og:description",
        content:
          "Building modern, scalable, and high-performing web experiences with AI-assisted development, advanced vibe coding workflows, and WordPress expertise.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

import { useSiteVersion } from "@/lib/versionContext";

function Index() {
  const { isV2, toggleVersion } = useSiteVersion();

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1500px] px-3 pb-10 pt-3 sm:px-5">
      {/* Prominent Top Version Announcement Banner */}
      {!isV2 ? (
        <div className="mb-4 rounded-[14px] bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border border-amber-500/40 p-3 sm:p-3.5 text-center flex flex-col sm:flex-row items-center justify-between gap-2.5 nm-raised-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-2.5 text-[12.5px] sm:text-[13.5px] font-extrabold text-amber-800 dark:text-amber-300">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
            </span>
            <span>⚡ CLASSIC MODE (v1.0) ACTIVE — Viewing original WordPress developer showcase</span>
          </div>
          <button
            type="button"
            onClick={toggleVersion}
            className="nm-raised-sm hover:nm-interactive active:nm-inset px-4 py-2 rounded-[10px] text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-brand-deep cursor-pointer whitespace-nowrap"
            style={{ fontFamily: '"Funnel Display", sans-serif' }}
          >
            Switch to Modern Version (v2.0) ✨
          </button>
        </div>
      ) : (
        <div className="mb-4 rounded-[14px] bg-gradient-to-r from-brand/20 via-brand/10 to-brand/20 border border-brand/35 p-3 sm:p-3.5 text-center flex flex-col sm:flex-row items-center justify-between gap-2.5 nm-raised-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-2.5 text-[12.5px] sm:text-[13.5px] font-extrabold text-brand-deep">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </span>
            <span>✨ MODERN VERSION (v2.0) ACTIVE — AI & Next-Gen Web Architecture</span>
          </div>
          <button
            type="button"
            onClick={toggleVersion}
            className="nm-raised-sm hover:nm-interactive active:nm-inset px-4 py-2 rounded-[10px] text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-foreground/80 hover:text-brand-deep cursor-pointer whitespace-nowrap"
            style={{ fontFamily: '"Funnel Display", sans-serif' }}
          >
            Switch to Classic (v1.0) ⚡
          </button>
        </div>
      )}

      <Header />
      <main className="mt-6 flex flex-col gap-6 sm:mt-8 sm:gap-8">
        <Hero />
        <Stats />
        <About />
        {isV2 && <AiWorkflow />}
        {isV2 && <HowIBuild />}
        <Services />
        <Technologies />
        <Portfolio />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <MobileAiAssistant />
    </div>
  );
}
