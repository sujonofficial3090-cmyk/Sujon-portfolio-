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

function Index() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[1500px] px-3 pb-10 pt-3 sm:px-5">
      <Header />
      <main className="mt-6 flex flex-col gap-6 sm:mt-8 sm:gap-8">
        <Hero />
        <Stats />
        <About />
        <AiWorkflow />
        <HowIBuild />
        <Services />
        <Technologies />
        <Portfolio />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
