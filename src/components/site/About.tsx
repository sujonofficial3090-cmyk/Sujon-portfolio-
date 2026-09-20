import React, { useState } from "react";
import {
  Code2,
  Palette,
  ShoppingBag,
  Zap,
  Smartphone,
  Layers,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Globe2,
  Terminal,
  Activity,
  CheckCircle2,
  Check,
  Copy,
  Cpu,
  Server,
  Gauge,
  Lock,
  Workflow,
  ChevronRight,
  Clock,
  Award,
  Compass,
  Rocket,
  FileCode2,
  Shield,
  ExternalLink,
} from "lucide-react";
import { NeumorphicCard } from "@/components/nm";
import { WorldGlobeS } from "@/components/site/WorldGlobeS";

const SKILLS = [
  {
    name: "WordPress Development",
    tag: "Custom Themes & Core PHP",
    icon: Code2,
  },
  {
    name: "Elementor & Elementor Pro",
    tag: "Pixel-Perfect Layouts",
    icon: Palette,
  },
  {
    name: "WooCommerce Solutions",
    tag: "High-Converting Stores",
    icon: ShoppingBag,
  },
  {
    name: "WordPress Speed Tuning",
    tag: "95+ Google PageSpeed",
    icon: Zap,
  },
  {
    name: "Responsive Web Design",
    tag: "Fluid Mobile & Desktop",
    icon: Smartphone,
  },
  {
    name: "Custom WP Architecture",
    tag: "ACF Pro, CPT & Clean APIs",
    icon: Layers,
  },
  {
    name: "Website Redesign",
    tag: "Modern & Luxury Rebuilds",
    icon: Sparkles,
  },
  {
    name: "WP Maintenance & Security",
    tag: "Bulletproof & 24/7 Uptime",
    icon: ShieldCheck,
  },
];

// Senior WordPress Engineering Code Snippets for Tab 2
interface WPCodeSnippet {
  id: "speed" | "architecture" | "security";
  label: string;
  filename: string;
  lang: string;
  badge: string;
  code: string[];
}

const WP_SNIPPETS: WPCodeSnippet[] = [
  {
    id: "speed",
    label: "WP Speed",
    filename: "wp-performance-engine.php",
    lang: "PHP 8.2",
    badge: "99/100 Core Vitals",
    code: [
      "<?php",
      "/**",
      " * Sujon Studio — WordPress Core Web Vitals & Speed Engine",
      " * PageSpeed 95+ with Sub-Second (< 0.8s) TTFB",
      " */",
      "declare(strict_types=1);",
      "",
      "namespace Sujon\\WordPress\\Performance;",
      "",
      "final class WPOptimizer {",
      "    public const BENCHMARK = [",
      "        'target_pagespeed' => '98 - 100',",
      "        'largest_contentful_paint' => '< 0.8s',",
      "        'first_input_delay' => '< 12ms',",
      "        'cumulative_layout_shift' => '0.000',",
      "    ];",
      "",
      "    public static function boot(): void {",
      "        \\add_action('wp_enqueue_scripts', [__CLASS__, 'deferScripts'], 999);",
      "        \\add_filter('wp_lazy_loading_enabled', '__return_true');",
      "        \\add_filter('style_loader_tag', [__CLASS__, 'inlineCriticalCSS'], 10, 2);",
      "    }",
      "}",
    ],
  },
  {
    id: "architecture",
    label: "WP Architecture",
    filename: "wp-theme-architecture.php",
    lang: "PHP 8.2",
    badge: "Zero-Bloat Core",
    code: [
      "<?php",
      "/**",
      " * Sujon Studio — Bespoke WordPress Theme Architecture",
      " * Zero-bloat custom theme core with Elementor Pro & ACF Pro",
      " */",
      "declare(strict_types=1);",
      "",
      "namespace Sujon\\WordPress\\Core;",
      "",
      "final class ThemeEngine {",
      "    private const CORE_FEATURES = [",
      "        'custom_post_types' => ['portfolio', 'services', 'reviews'],",
      "        'acf_pro_fields'    => 'Strictly typed, cached & schema-ready',",
      "        'elementor_widgets' => 'Custom handcrafted PHP widgets',",
      "        'zero_plugin_bloat' => true,",
      "    ];",
      "",
      "    public static function setup(): void {",
      "        \\add_theme_support('title-tag');",
      "        \\add_theme_support('post-thumbnails');",
      "        \\add_theme_support('woocommerce');",
      "        \\add_theme_support('html5', ['search-form', 'comment-form', 'gallery']);",
      "    }",
      "}",
    ],
  },
  {
    id: "security",
    label: "WP Security",
    filename: "wp-security-hardening.php",
    lang: "PHP 8.2",
    badge: "Hardened Perimeter",
    code: [
      "<?php",
      "/**",
      " * Sujon Studio — Hardened WordPress Security Protocol",
      " * Enterprise-grade security defense & zero-day protection",
      " */",
      "declare(strict_types=1);",
      "",
      "namespace Sujon\\WordPress\\Security;",
      "",
      "final class SecurityShield {",
      "    public const PROTOCOLS = [",
      "        'firewall'          => 'Cloudflare Enterprise WAF',",
      "        'xmlrpc_protection' => 'Disabled XML-RPC & Pingbacks',",
      "        'rest_api_guard'    => 'Rate-limited endpoints & blocked user enumeration',",
      "        'database_prefix'   => 'Hardened custom tables & SQL anti-injection',",
      "        'cloud_backups'     => 'Automated daily encrypted offsite cloud backups',",
      "    ];",
      "",
      "    public static function enforce(): void {",
      "        \\add_filter('xmlrpc_enabled', '__return_false');",
      "        \\remove_action('wp_head', 'wp_generator');",
      "    }",
      "}",
    ],
  },
];

const WP_ARCHITECTURE_PILLARS = [
  {
    icon: Cpu,
    title: "Zero-Bloat WP Theme",
    desc: "Clean PHP & modern CSS architecture. Never weighed down by 50+ plugins.",
    tag: "Custom WP Core",
    glow: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    status: "Clean PHP",
  },
  {
    icon: Zap,
    title: "Sub-Second WP Speed",
    desc: "Critical CSS, WebP pipelines & Redis caching for 95+ Google PageSpeed.",
    tag: "< 0.8s Vitals",
    glow: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    status: "99 Vitals",
  },
  {
    icon: Shield,
    title: "Hardened WP Security",
    desc: "Cloudflare WAF, disabled XML-RPC, rate-limiting & automated cloud backups.",
    tag: "Enterprise Safe",
    glow: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    status: "WAF Shield",
  },
  {
    icon: Award,
    title: "Intuitive WP Admin",
    desc: "Custom ACF Pro fields so you can update products & content without coding.",
    tag: "No-Code Edit",
    glow: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    status: "ACF Pro",
  },
];

// Rich Tokyo Night / Dracula Developer Syntax Highlighter
function renderSyntaxTokens(line: string) {
  const trimmed = line.trim();
  if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*") || trimmed.startsWith("*/")) {
    return <span className="text-[#6EE7B7]/85 italic font-medium">{line}</span>;
  }
  if (trimmed === "<?php") {
    return <span className="text-[#F472B6] font-extrabold">&lt;?php</span>;
  }

  // Tokenizer pattern
  const tokenRegex = /('(?:\\'|[^'])*'|"(?:\\"|[^"])*"|=>|::|->|[{}()[\]]|\\add_action|\\add_filter|\\add_theme_support|\\remove_action|\b(?:declare|strict_types|namespace|final|class|public|private|const|static|function|return|void|true|false)\b|\b(?:WPOptimizer|ThemeEngine|SecurityShield|BENCHMARK|CORE_FEATURES|PROTOCOLS|MODULES)\b|\b\d+\b|[^\s'":=>{}()[\]]+|\s+)/g;

  const parts = line.match(tokenRegex) || [line];

  return (
    <>
      {parts.map((token, i) => {
        // String literal in luminous mint
        if (token.startsWith("'") || token.startsWith('"')) {
          return (
            <span key={i} className="text-[#86EFAC] font-medium">
              {token}
            </span>
          );
        }
        // WordPress Core API functions in electric sky blue
        if (
          token.includes("add_action") ||
          token.includes("add_filter") ||
          token.includes("add_theme_support") ||
          token.includes("remove_action")
        ) {
          return (
            <span key={i} className="text-[#38BDF8] font-bold">
              {token}
            </span>
          );
        }
        // PHP keywords in radiant neon violet
        if (/^(declare|strict_types|namespace|final|class|public|private|const|static|function|return)$/.test(token)) {
          return (
            <span key={i} className="text-[#C084FC] font-bold">
              {token}
            </span>
          );
        }
        // Types in electric cyan
        if (token === "void") {
          return (
            <span key={i} className="text-[#22D3EE] font-semibold">
              {token}
            </span>
          );
        }
        // Booleans & Numbers in glowing amber/coral
        if (/^(true|false|\d+)$/.test(token)) {
          return (
            <span key={i} className="text-[#FB923C] font-bold">
              {token}
            </span>
          );
        }
        // Class names & Constants in bright solar gold
        if (/^(WPOptimizer|ThemeEngine|SecurityShield|BENCHMARK|CORE_FEATURES|PROTOCOLS|MODULES)$/.test(token)) {
          return (
            <span key={i} className="text-[#FDE047] font-extrabold">
              {token}
            </span>
          );
        }
        // Operators & arrows in cyan
        if (token === "=>" || token === "::" || token === "->") {
          return (
            <span key={i} className="text-[#22D3EE] font-bold">
              {token}
            </span>
          );
        }
        // Brackets & delimiters
        if (/^[{}()[\]]$/.test(token)) {
          return (
            <span key={i} className="text-slate-400 font-bold">
              {token}
            </span>
          );
        }
        // Default identifiers / whitespace
        return (
          <span key={i} className="text-[#E2E8F0]">
            {token}
          </span>
        );
      })}
    </>
  );
}

// Refined, perfectly balanced 4-phase WordPress client journey
const WP_ROADMAP_PHASES = [
  {
    step: "01",
    phase: "Phase 1: Blueprint",
    title: "WordPress Strategy & Scope",
    timeframe: "Days 1–2",
    icon: Compass,
    desc: "Auditing conversion goals, WooCommerce user journey, and mapping custom WordPress architecture wireframes.",
    deliverables: ["Brand Audit", "WP Wireframes", "Technical Scope"],
  },
  {
    step: "02",
    phase: "Phase 2: Execution",
    title: "Bespoke WordPress Development",
    timeframe: "Days 3–7",
    icon: Code2,
    desc: "Handcrafting Elementor Pro layouts, custom theme PHP coding, ACF fields, and fluid responsive design.",
    deliverables: ["Custom WP Theme", "Elementor Pro", "WooCommerce Engine"],
  },
  {
    step: "03",
    phase: "Phase 3: Tuning",
    title: "PageSpeed & Security Hardening",
    timeframe: "Days 8–10",
    icon: Gauge,
    desc: "95+ Google PageSpeed optimization, Redis object caching, and Cloudflare WAF security lockdown.",
    deliverables: ["95+ PageSpeed", "Redis Cache", "WAF Security"],
  },
  {
    step: "04",
    phase: "Phase 4: Launch",
    title: "QA & Live WordPress Deployment",
    timeframe: "Days 11–12",
    icon: Rocket,
    desc: "Multi-device audits, seamless zero-downtime DNS migration, and full client WP admin training video.",
    deliverables: ["Multi-Device QA", "DNS Live Launch", "Admin Video Guide"],
  },
];

export function About() {
  const [activeTab, setActiveTab] = useState<"globe" | "code" | "roadmap">("globe");
  const [selectedSnippet, setSelectedSnippet] = useState<"speed" | "architecture" | "security">("speed");
  const [copied, setCopied] = useState(false);

  const activeSnippetData = WP_SNIPPETS.find((s) => s.id === selectedSnippet) || WP_SNIPPETS[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSnippetData.code.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="scroll-mt-24 sm:scroll-mt-28">
      {/* Responsive Grid Gap & Column Layout */}
      <div className="grid gap-5 sm:gap-6 lg:gap-8 lg:grid-cols-[1.18fr_1fr] items-stretch">
        {/* LEFT CARD: Story, Editorial Narrative & Skills Grid */}
        <NeumorphicCard
          depth="md"
          radius="lg"
          className="flex flex-col justify-between p-5 sm:p-7 md:p-8 lg:p-10 reveal-on-scroll stagger-1 relative overflow-hidden"
        >
          {/* Subtle decorative background ambient glow */}
          <div className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full bg-brand-light/15 dark:bg-brand-light/10 blur-3xl" />

          <div className="space-y-5 sm:space-y-6">
            {/* Standard Website Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-3 sm:px-3.5 py-1 sm:py-1.5 nm-inset text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-wider text-brand-deep">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              WHO AM I?
            </div>

            {/* Standard Website Heading Font & Scale */}
            <div>
              <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight text-foreground leading-[1.15]">
                Who am <span className="text-brand-gradient inline-block pb-1">I?</span>
              </h2>
              <p className="mt-2 sm:mt-2.5 text-[14px] sm:text-[16px] font-semibold text-brand-deep leading-relaxed">
                Bridging bespoke luxury design with high-performance WordPress engineering.
              </p>
            </div>

            {/* Standard Website Body Text (16px Poppins, 1.8 line-height) */}
            <div className="space-y-3.5 sm:space-y-4 text-[14.5px] sm:text-[16px] font-medium leading-[1.75] sm:leading-[1.8] text-foreground/85">
              <p>
                I'm <strong className="text-brand-deep font-extrabold">Sujon</strong>, a passionate{" "}
                <strong className="text-foreground font-extrabold">WordPress Developer</strong> focused on building
                beautiful, responsive, and high-performing websites. I work with WordPress, Elementor, WooCommerce, and
                custom website development to create professional digital experiences for businesses and clients
                worldwide.
              </p>
              <p>
                Over the years, I've helped numerous clients establish a stronger digital presence through robust,
                scalable, and conversion-focused digital experiences that accelerate business growth and create lasting
                online impact.
              </p>
            </div>

            {/* Inset 3-Pillar Commitment Strip (Responsive 1-col on mobile, 3-col on sm+) */}
            <div className="nm-inset rounded-[14px] sm:rounded-[16px] p-3.5 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 text-left">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="nm-raised-sm flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-[9px] sm:rounded-[10px] text-brand-deep">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] sm:text-[14px] font-extrabold text-foreground truncate">
                      &lt; 0.8s Speed
                    </div>
                    <div className="text-[11px] sm:text-[11.5px] font-medium text-foreground/70 truncate">
                      Core Web Vitals 95+
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="nm-raised-sm flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-[9px] sm:rounded-[10px] text-brand-deep">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] sm:text-[14px] font-extrabold text-foreground truncate">
                      Hardened Security
                    </div>
                    <div className="text-[11px] sm:text-[11.5px] font-medium text-foreground/70 truncate">
                      Zero-bloat &amp; safe
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="nm-raised-sm flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-[9px] sm:rounded-[10px] text-brand-deep">
                    <Globe2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] sm:text-[14px] font-extrabold text-foreground truncate">
                      Global Standard
                    </div>
                    <div className="text-[11px] sm:text-[11.5px] font-medium text-foreground/70 truncate">
                      Worldwide delivery
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upgraded Skills Highlight Grid */}
          <div className="mt-6 sm:mt-8 border-t border-border/80 pt-5 sm:pt-6">
            <div className="flex items-center justify-between mb-3.5 sm:mb-4">
              <h3 className="text-[13px] sm:text-[15px] font-extrabold text-foreground uppercase tracking-wider">
                WordPress Skills Highlight
              </h3>
              <span className="text-[11.5px] sm:text-[12px] font-bold text-brand-deep">8 Core Proficiencies</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:gap-3 sm:grid-cols-2">
              {SKILLS.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="nm-raised-sm group flex items-center justify-between rounded-[12px] p-3 sm:p-3.5 transition-all duration-300 hover:scale-[1.015] border border-transparent hover:border-brand/20"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="nm-inset flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-[8px] text-brand-deep transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] sm:text-[14px] font-bold text-foreground truncate">
                          {skill.name}
                        </div>
                        <div className="text-[11px] sm:text-[12px] font-medium text-foreground/70 truncate">
                          {skill.tag}
                        </div>
                      </div>
                    </div>
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-brand-deep opacity-70 group-hover:opacity-100 transition-opacity ml-1.5" />
                  </div>
                );
              })}
            </div>
          </div>
        </NeumorphicCard>

        {/* RIGHT CARD: Executive Studio Console with 3 Pristine High-End Tabs */}
        <NeumorphicCard
          depth="md"
          radius="lg"
          className="flex flex-col justify-between p-5 sm:p-7 md:p-8 lg:p-10 reveal-on-scroll stagger-2 relative overflow-hidden"
        >
          {/* Ambient radial glow */}
          <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-88 h-72 sm:h-88 rounded-full bg-brand-light/20 dark:bg-brand-light/12 blur-3xl" />

          {/* Top Bar: macOS Soft Dots & Live Global Status */}
          <div className="space-y-3.5 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-border/80">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-400/80 shadow-sm inline-block" />
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber-400/80 shadow-sm inline-block" />
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-400/80 shadow-sm inline-block" />
                <span className="ml-1.5 sm:ml-2 text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-foreground/75">
                  WORDPRESS ENGINE OS
                </span>
              </div>

              <div className="nm-inset inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 py-1 text-[10.5px] sm:text-[11.5px] font-bold text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500" />
                </span>
                <span>Available for WP</span>
              </div>
            </div>

            {/* The 3 Interactive Executive Tabs (Responsive Labels) */}
            <div className="flex rounded-[12px] sm:rounded-[14px] p-1 sm:p-1.5 nm-inset gap-1 sm:gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab("globe")}
                className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-[9px] sm:rounded-[10px] text-[11.5px] sm:text-[13px] font-extrabold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                  activeTab === "globe"
                    ? "nm-raised text-brand-deep bg-surface shadow-sm"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <Globe2 className="h-3.5 w-3.5 shrink-0" />
                <span>3D World</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-[9px] sm:rounded-[10px] text-[11.5px] sm:text-[13px] font-extrabold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                  activeTab === "code"
                    ? "nm-raised text-brand-deep bg-surface shadow-sm"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <Code2 className="h-3.5 w-3.5 shrink-0" />
                <span>WP Code</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("roadmap")}
                className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-[9px] sm:rounded-[10px] text-[11.5px] sm:text-[13px] font-extrabold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                  activeTab === "roadmap"
                    ? "nm-raised text-brand-deep bg-surface shadow-sm"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <Workflow className="h-3.5 w-3.5 shrink-0" />
                <span>Roadmap</span>
              </button>
            </div>
          </div>

          {/* TAB 1: 360° ROTATING NATURAL 3D EARTH GLOBE & LIVE TELEMETRY */}
          {activeTab === "globe" && (
            <div className="my-3 sm:my-4 flex flex-col items-center justify-center animate-fadeIn space-y-3.5 sm:space-y-4">
              {/* Natural 3D Earth Globe (Fluid Responsive Canvas Height) */}
              <div className="relative w-full flex items-center justify-center py-1 overflow-visible">
                <WorldGlobeS className="h-[280px] xs:h-[320px] sm:h-[360px] lg:h-[390px] w-full" />
              </div>

              {/* Executive WordPress Telemetry Strip */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                <div className="nm-inset rounded-[11px] sm:rounded-[12px] p-2.5 sm:p-3 text-center transition-transform hover:scale-[1.02]">
                  <div className="text-brand-gradient text-[18px] sm:text-[22px] font-extrabold leading-none font-display">
                    99/100
                  </div>
                  <div className="text-[11px] sm:text-[12px] font-bold text-foreground/75 mt-1">WP Speed</div>
                </div>

                <div className="nm-inset rounded-[11px] sm:rounded-[12px] p-2.5 sm:p-3 text-center transition-transform hover:scale-[1.02]">
                  <div className="text-brand-gradient text-[18px] sm:text-[22px] font-extrabold leading-none font-display">
                    &lt; 0.8s
                  </div>
                  <div className="text-[11px] sm:text-[12px] font-bold text-foreground/75 mt-1">Load Time</div>
                </div>

                <div className="nm-inset rounded-[11px] sm:rounded-[12px] p-2.5 sm:p-3 text-center transition-transform hover:scale-[1.02]">
                  <div className="text-brand-gradient text-[18px] sm:text-[22px] font-extrabold leading-none font-display">
                    100%
                  </div>
                  <div className="text-[11px] sm:text-[12px] font-bold text-foreground/75 mt-1">Custom WP</div>
                </div>

                <div className="nm-inset rounded-[11px] sm:rounded-[12px] p-2.5 sm:p-3 text-center transition-transform hover:scale-[1.02]">
                  <div className="text-brand-gradient text-[18px] sm:text-[22px] font-extrabold leading-none font-display">
                    5.0 ★
                  </div>
                  <div className="text-[11px] sm:text-[12px] font-bold text-foreground/75 mt-1">Client Rating</div>
                </div>
              </div>

              {/* Global WordPress Deployment Assurance Banner */}
              <div className="w-full nm-raised-sm rounded-[12px] sm:rounded-[14px] p-3.5 sm:p-4 flex flex-col gap-2 text-left border border-border/40">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Server className="h-4 w-4 text-brand-deep shrink-0" />
                    <span className="text-[12.5px] sm:text-[14px] font-extrabold text-foreground">
                      Worldwide WordPress Deployment
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-brand-deep nm-inset px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-[6px]">
                    Multi-Region Edge
                  </span>
                </div>
                <p className="text-[11.5px] sm:text-[13px] font-medium text-foreground/80 leading-relaxed">
                  Delivering high-converting, lightning-fast WordPress &amp; WooCommerce platforms with edge caching to
                  clients worldwide.
                </p>
                {/* Live Active Tech Hubs */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 text-[11px] sm:text-[12px] font-mono text-foreground/85">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Dhaka
                  </span>
                  <span className="text-foreground/35">•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    London
                  </span>
                  <span className="text-foreground/35">•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    New York
                  </span>
                  <span className="text-foreground/35">•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Tokyo
                  </span>
                  <span className="text-foreground/35">•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Frankfurt
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SENIOR WORDPRESS CODE STUDIO & ARCHITECTURE SUITE */}
          {activeTab === "code" && (
            <div className="my-3 sm:my-4 w-full space-y-3 sm:space-y-3.5 animate-fadeIn">
              {/* File Selector & Copy Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-border/70">
                {/* File Switcher Tabs */}
                <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full">
                  {WP_SNIPPETS.map((snippet) => {
                    const isSelected = selectedSnippet === snippet.id;
                    return (
                      <button
                        key={snippet.id}
                        type="button"
                        onClick={() => setSelectedSnippet(snippet.id)}
                        className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[7px] sm:rounded-[8px] text-[11px] sm:text-[12px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? "nm-raised text-brand-deep bg-surface shadow-sm"
                            : "nm-inset text-foreground/70 hover:text-foreground"
                        }`}
                      >
                        <FileCode2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                        <span>{snippet.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 1-Click Copy Code Button */}
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="nm-raised-sm inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[7px] sm:rounded-[8px] text-[11px] sm:text-[12px] font-extrabold text-brand-deep hover:text-foreground transition-all cursor-pointer whitespace-nowrap"
                  title="Copy snippet to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Luxury Tokyo Night Obsidian IDE Dark Code Console */}
              <div className="relative rounded-[14px] bg-[#0B0F19] border border-slate-700/70 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.65),0_0_20px_rgba(56,189,248,0.08)] overflow-hidden flex flex-col">
                {/* Window Title Bar */}
                <div className="bg-[#0e1424] px-3.5 py-2.5 border-b border-slate-800/80 flex items-center justify-between">
                  {/* macOS Glowing Traffic Lights */}
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#FF5F56] shadow-[0_0_8px_rgba(255,95,86,0.6)] inline-block" />
                    <span className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_rgba(255,189,46,0.6)] inline-block" />
                    <span className="h-3 w-3 rounded-full bg-[#27C93F] shadow-[0_0_8px_rgba(39,201,63,0.6)] inline-block" />
                  </div>

                  {/* Active File Tab */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#162033] border border-slate-700/60 text-sky-300 font-mono text-[11px] font-bold shadow-inner">
                    <Terminal className="h-3 w-3 text-brand-deep" />
                    <span>{activeSnippetData.filename}</span>
                  </div>

                  {/* Vitals Badge */}
                  <span className="px-2 py-0.5 rounded-[5px] text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30">
                    {activeSnippetData.badge}
                  </span>
                </div>

                {/* Syntax Highlighted Code Display with Line Numbers */}
                <div className="h-[210px] sm:h-[235px] overflow-y-auto overflow-x-auto p-3 font-mono text-[11.5px] sm:text-[12px] leading-[1.7] select-text">
                  {activeSnippetData.code.map((line, idx) => {
                    const lineNum = String(idx + 1).padStart(2, "0");

                    return (
                      <div
                        key={idx}
                        className="flex items-start hover:bg-white/[0.06] px-1 py-0.5 rounded-[4px] transition-colors"
                      >
                        <span className="w-7 shrink-0 text-slate-500 font-mono text-[10.5px] select-none text-right pr-2.5">
                          {lineNum}
                        </span>
                        <span className="font-mono whitespace-pre">{renderSyntaxTokens(line)}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Real Developer IDE Status Bar */}
                <div className="bg-[#080C14] px-3.5 py-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10.5px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      main*
                    </span>
                    <span className="text-slate-600">•</span>
                    <span>0 errors</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-sky-300">WordPress 6.x Core</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>PHP 8.2</span>
                    <span className="text-slate-600">•</span>
                    <span>UTF-8</span>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <span className="text-brand-deep font-bold hidden sm:inline">&lt;0.8s TTFB</span>
                  </div>
                </div>
              </div>

              {/* 4 WordPress Architectural Guarantees Grid (Vibrant Glowing Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-0.5">
                {WP_ARCHITECTURE_PILLARS.map((pillar) => {
                  const PillarIcon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="nm-raised-sm rounded-[12px] p-3 sm:p-3.5 transition-all duration-300 hover:scale-[1.015] flex flex-col justify-between gap-1.5 border border-border/50 hover:border-brand/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border ${pillar.glow}`}>
                            <PillarIcon className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-[12.5px] sm:text-[13.5px] font-extrabold text-foreground truncate">
                            {pillar.title}
                          </span>
                        </div>
                        <span className="nm-inset px-2 py-0.5 rounded-[5px] text-[9.5px] font-bold text-brand-deep shrink-0">
                          {pillar.status}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-[12px] font-medium text-foreground/70 leading-relaxed line-clamp-2">
                        {pillar.desc}
                      </p>
                      <span className="text-[10px] font-bold text-brand-deep uppercase tracking-wider">
                        ● {pillar.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: WORDPRESS CLIENT ROADMAP (The Favored Balanced Design) */}
          {activeTab === "roadmap" && (
            <div className="my-3 sm:my-4 w-full space-y-2.5 sm:space-y-3 animate-fadeIn">
              {WP_ROADMAP_PHASES.map((wf) => {
                const PhaseIcon = wf.icon;
                return (
                  <div
                    key={wf.step}
                    className="nm-raised-sm rounded-[12px] sm:rounded-[14px] p-3 sm:p-4 transition-all duration-300 hover:scale-[1.01] border border-transparent hover:border-brand/20 flex flex-col gap-2 sm:gap-2.5"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                        <span className="nm-inset flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-[7px] sm:rounded-[8px] text-[11px] sm:text-[12px] font-extrabold text-brand-deep font-mono">
                          {wf.step}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-wider text-brand-deep truncate">
                            {wf.phase}
                          </div>
                          <h4 className="text-[13.5px] sm:text-[15px] font-extrabold text-foreground leading-tight truncate">
                            {wf.title}
                          </h4>
                        </div>
                      </div>
                      <span className="nm-inset rounded-[6px] px-2 sm:px-2.5 py-0.5 text-[10.5px] sm:text-[11px] font-bold text-foreground/80 shrink-0">
                        {wf.timeframe}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[11.5px] sm:text-[13px] font-medium text-foreground/80 leading-relaxed pl-0.5">
                      {wf.desc}
                    </p>

                    {/* Deliverables Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5 pl-0.5">
                      {wf.deliverables.map((item) => (
                        <span
                          key={item}
                          className="nm-inset rounded-[6px] px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10.5px] sm:text-[11px] font-semibold text-foreground/85 flex items-center gap-1"
                        >
                          <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-deep" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Delivery Assurance Strip */}
              <div className="nm-inset rounded-[12px] sm:rounded-[14px] p-3 sm:p-3.5 text-[11.5px] sm:text-[12.5px] font-semibold text-foreground/85 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mt-1">
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-deep shrink-0" />
                  <span>Turnaround: 7–14 Business Days</span>
                </span>
                <span className="text-brand-deep font-extrabold">100% On-Time Delivery</span>
              </div>
            </div>
          )}

          {/* Action CTA Button at bottom */}
          <div className="mt-4 pt-3.5 sm:pt-4 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[12px] sm:text-[13px] font-medium text-foreground/75 text-center sm:text-left">
              Have a WordPress project in mind?
            </div>
            <a
              href="#contact"
              className="w-full sm:w-auto nm-raised nm-interactive group inline-flex items-center justify-center gap-2 rounded-[10px] px-4 sm:px-5 py-2.5 text-[12px] sm:text-[12.5px] font-extrabold uppercase tracking-wider text-brand-deep hover:text-foreground transition-all duration-300"
            >
              <span>Let's Discuss WP Project</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </NeumorphicCard>
      </div>
    </section>
  );
}
