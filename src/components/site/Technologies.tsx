import { useState } from "react";
import type * as React from "react";
import { NeumorphicCard } from "@/components/nm";
import { useTranslation } from "@/lib/i18n";

// Standalone Vector SVG / Official Brand Logos with Authentic Colors
const ICONS: Record<string, (props: { className?: string }) => React.ReactNode> = {
  // --- WORDPRESS ECOSYSTEM ---
  WordPress: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="60" fill="#21759B" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 10C34.177 10 10 34.177 10 64C10 93.823 34.177 118 64 118C93.823 118 118 93.823 118 64C118 34.177 93.823 10 64 10ZM16.48 64C16.48 53.64 19.86 44.07 25.59 36.31L53.79 113.68C32.17 107.5 16.48 87.58 16.48 64ZM64 112.55C60.29 112.55 56.69 112.02 53.28 111.02L70.47 61.16L87.75 111.05C80.44 112.04 72.88 112.55 64 112.55ZM74.45 39.81C78.43 39.59 82.68 39.22 82.68 39.22C84.97 38.99 84.6 35.34 82.32 35.56C82.32 35.56 75.39 36.12 68.3 36.12C61.42 36.12 54.49 35.56 54.49 35.56C52.2 35.34 51.84 38.99 54.13 39.22C54.13 39.22 58.17 39.59 62.15 39.81L72.23 69.11L60.03 106.18L38.41 43.1C41.7 42.92 45.19 42.66 45.19 42.66C47.48 42.44 47.11 38.79 44.83 39C44.83 39 37.9 39.56 30.81 39.56C29.6 39.56 28.32 39.54 27.02 39.51C36.14 24.36 52.37 15.45 70.82 15.45C83.39 15.45 94.75 20.25 103.26 28.16L74.45 39.81ZM102.41 64C102.41 73.19 99.45 81.69 94.46 88.66L77.06 38.16C82.88 37.84 88.58 37.36 88.58 37.36C90.87 37.14 90.5 33.49 88.22 33.71C88.22 33.71 81.29 34.27 74.2 34.27C72.85 34.27 71.43 34.24 70.01 34.2L85.2 78.29L101.48 44.02C102.08 50.32 102.41 57.06 102.41 64Z"
        fill="white"
      />
    </svg>
  ),

  "Elementor Pro": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#92003B" />
      <path d="M40 38H52V90H40V38Z" fill="white" />
      <path d="M60 38H88V49H60V38Z" fill="white" />
      <path d="M60 58.5H88V69.5H60V58.5Z" fill="white" />
      <path d="M60 79H88V90H60V79Z" fill="white" />
    </svg>
  ),

  WooCommerce: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#96588A" />
      <path
        d="M26 44C26 39.58 29.58 36 34 36H94C98.42 36 102 39.58 102 44V76C102 80.42 98.42 84 94 84H74L60 96V84H34C29.58 84 26 80.42 26 76V44Z"
        fill="white"
      />
      <text
        x="64"
        y="68"
        fontFamily="'Funnel Display', sans-serif, system-ui"
        fontSize="26"
        fontWeight="900"
        textAnchor="middle"
        fill="#96588A"
        letterSpacing="-1"
      >
        WOO
      </text>
    </svg>
  ),

  JetEngine: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#18233C" />
      <path d="M64 24L98 44V84L64 104L30 84V44L64 24Z" fill="#F45A25" />
      <path d="M64 24L98 44L64 64L30 44L64 24Z" fill="#FF7847" />
      <path d="M64 64L98 44V84L64 104V64Z" fill="#D84414" />
      <text
        x="64"
        y="73"
        fontFamily="'Funnel Display', sans-serif, system-ui"
        fontSize="28"
        fontWeight="900"
        textAnchor="middle"
        fill="white"
      >
        JE
      </text>
    </svg>
  ),

  JetFormBuilder: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#005BFF" />
      <rect x="34" y="32" width="60" height="64" rx="8" fill="white" />
      <rect x="44" y="44" width="40" height="8" rx="4" fill="#005BFF" />
      <rect x="44" y="58" width="28" height="6" rx="3" fill="#93C5FD" />
      <rect x="44" y="70" width="36" height="6" rx="3" fill="#93C5FD" />
      <circle cx="76" cy="73" r="14" fill="#00D284" />
      <path d="M71 73L74.5 76.5L81 70" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  "Advanced Custom Fields (ACF)": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#0E1E25" />
      <rect x="18" y="18" width="92" height="92" rx="18" fill="#00EA90" />
      <text
        x="64"
        y="75"
        fontFamily="'Funnel Display', sans-serif, system-ui"
        fontSize="34"
        fontWeight="900"
        textAnchor="middle"
        fill="#0E1E25"
        letterSpacing="0.5"
      >
        ACF
      </text>
    </svg>
  ),

  "Custom Post Types (CPT)": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#1E293B" />
      <rect x="28" y="30" width="32" height="30" rx="6" fill="#38BDF8" />
      <rect x="68" y="30" width="32" height="30" rx="6" fill="#818CF8" />
      <rect x="28" y="68" width="32" height="30" rx="6" fill="#34D399" />
      <rect x="68" y="68" width="32" height="30" rx="6" fill="#FBBF24" />
      <path d="M38 45H50M78 45H90M38 83H50M78 83H90" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  "Dynamic Content": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#0F172A" />
      <ellipse cx="64" cy="38" rx="36" ry="14" fill="#38BDF8" />
      <path d="M28 38V64C28 71.7 44.1 78 64 78C83.9 78 100 71.7 100 64V38" stroke="#38BDF8" strokeWidth="6" fill="none" />
      <path d="M28 64V90C28 97.7 44.1 104 64 104C83.9 104 100 97.7 100 90V64" stroke="#0EA5E9" strokeWidth="6" fill="none" />
      <path d="M72 52L52 74H64L60 92L80 70H68L72 52Z" fill="#FACC15" />
    </svg>
  ),

  "Custom WordPress Functionality": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#0073AA" />
      <circle cx="64" cy="64" r="32" stroke="white" strokeWidth="6" strokeDasharray="10 6" />
      <circle cx="64" cy="64" r="16" fill="white" />
      <path d="M32 64L44 54M96 64L84 74M64 32L74 44M64 96L54 84" stroke="white" strokeWidth="6" strokeLinecap="round" />
    </svg>
  ),

  // --- FRONTEND & DESIGN ---
  HTML5: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#E34F26" />
      <path d="M28 24L36 104L64 112L92 104L100 24H28ZM82.5 42H45.5L47 56H81L79 78L64 82L49 78L48 68H38L40 86L64 92.5L88 86L91.5 42H82.5Z" fill="white" />
    </svg>
  ),

  CSS3: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#1572B6" />
      <path d="M28 24L36 104L64 112L92 104L100 24H28ZM82.5 42H45.5L47 56H81L79 78L64 82L49 78L48 68H38L40 86L64 92.5L88 86L91.5 42H82.5Z" fill="white" />
    </svg>
  ),

  JavaScript: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#F7DF1E" />
      <path
        d="M38 92L47 86.5C49 90.5 52.5 93 57 93C62 93 65.5 90 65.5 85V48H77V85C77 96 70 102 57 102C48 102 41 98 38 92ZM84 92L93 86.5C96 91 100 93.5 106 93.5C112 93.5 116 90.5 116 86C116 81.5 113 79.5 104 75.5C92 70.5 85 65.5 85 55C85 45 93 37.5 104 37.5C112 37.5 118 40.5 122 47L113 52.5C111 48.5 108 46.5 104 46.5C99.5 46.5 96.5 49 96.5 53C96.5 57 99 58.5 107 62C120 67 127 72 127 84C127 94.5 119 102 106 102C97 102 89 98 84 92Z"
        fill="#000000"
      />
    </svg>
  ),

  "Responsive Design": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#2563EB" />
      {/* Desktop monitor */}
      <rect x="22" y="28" width="60" height="42" rx="4" stroke="white" strokeWidth="4" fill="none" />
      <path d="M52 70V82H40M52 82H64" stroke="white" strokeWidth="4" strokeLinecap="round" />
      {/* Mobile phone overlapping */}
      <rect x="66" y="50" width="38" height="54" rx="6" fill="#1E40AF" stroke="white" strokeWidth="4" />
      <circle cx="85" cy="94" r="3" fill="white" />
      <line x1="78" y1="58" x2="92" y2="58" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  Figma: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#1E1E1E" />
      <path d="M42 42C42 33.16 49.16 26 58 26H70V58H58C49.16 58 42 50.84 42 42Z" fill="#F24E1E" />
      <path d="M70 26H82C90.84 26 98 33.16 98 42C98 50.84 90.84 58 82 58H70V26Z" fill="#FF7262" />
      <path d="M42 74C42 65.16 49.16 58 58 58H70V90H58C49.16 90 42 82.84 42 74Z" fill="#0ACF83" />
      <circle cx="82" cy="74" r="16" fill="#1ABCFE" />
      <path d="M42 106C42 97.16 49.16 90 58 90H70V106C70 114.84 62.84 122 54 122C45.16 122 42 114.84 42 106Z" fill="#A259FF" />
    </svg>
  ),

  Photoshop: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#001E36" />
      <rect x="14" y="14" width="100" height="100" rx="20" stroke="#31A8FF" strokeWidth="4" fill="none" />
      <text
        x="64"
        y="78"
        fontFamily="'Funnel Display', sans-serif, system-ui"
        fontSize="44"
        fontWeight="900"
        textAnchor="middle"
        fill="#31A8FF"
        letterSpacing="-1"
      >
        Ps
      </text>
    </svg>
  ),

  // --- HOSTING, CMS & INFRASTRUCTURE ---
  cPanel: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#FF6C2C" />
      <text
        x="64"
        y="76"
        fontFamily="'Funnel Display', sans-serif, system-ui"
        fontSize="40"
        fontWeight="900"
        textAnchor="middle"
        fill="white"
        letterSpacing="-2"
      >
        cP
      </text>
    </svg>
  ),

  DNS: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#059669" />
      <circle cx="64" cy="64" r="36" stroke="white" strokeWidth="5" fill="none" />
      <ellipse cx="64" cy="64" rx="16" ry="36" stroke="white" strokeWidth="5" fill="none" />
      <line x1="28" y1="64" x2="100" y2="64" stroke="white" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),

  SSL: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#10B981" />
      <rect x="36" y="54" width="56" height="44" rx="8" fill="white" />
      <path d="M48 54V42C48 33.16 55.16 26 64 26C72.84 26 80 33.16 80 42V54" stroke="white" strokeWidth="8" strokeLinecap="round" fill="none" />
      <circle cx="64" cy="74" r="5" fill="#10B981" />
      <path d="M64 78V84" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  SMTP: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#6366F1" />
      <rect x="28" y="38" width="72" height="52" rx="8" stroke="white" strokeWidth="6" fill="none" />
      <path d="M30 42L64 68L98 42" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  "Booking & Payment Systems": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#8B5CF6" />
      <rect x="28" y="34" width="72" height="48" rx="8" stroke="white" strokeWidth="5" fill="none" />
      <line x1="28" y1="48" x2="100" y2="48" stroke="white" strokeWidth="5" />
      <rect x="38" y="62" width="20" height="10" rx="3" fill="white" />
      <path d="M78 84L86 92L102 76" stroke="#4ADE80" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  "Third-Party Integrations": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#EC4899" />
      <circle cx="44" cy="44" r="14" fill="white" />
      <circle cx="84" cy="44" r="14" fill="white" />
      <circle cx="64" cy="84" r="14" fill="white" />
      <path d="M44 44L64 84L84 44" stroke="white" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),

  "Website Performance Optimization": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#0D9488" />
      <circle cx="64" cy="64" r="40" stroke="white" strokeWidth="6" strokeDasharray="180 60" transform="rotate(135 64 64)" fill="none" />
      <path d="M64 64L82 46" stroke="#FDE047" strokeWidth="6" strokeLinecap="round" />
      <circle cx="64" cy="64" r="6" fill="#FDE047" />
      <text x="64" y="96" fontFamily="'Funnel Display', sans-serif" fontSize="18" fontWeight="900" textAnchor="middle" fill="white">
        100
      </text>
    </svg>
  ),

  "On-Page SEO": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#1D4ED8" />
      <circle cx="56" cy="56" r="24" stroke="white" strokeWidth="6" fill="none" />
      <line x1="74" y1="74" x2="98" y2="98" stroke="white" strokeWidth="8" strokeLinecap="round" />
      <path d="M46 56L54 64L68 50" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // --- AI ASSISTED DEVELOPMENT ---
  "AI-Assisted Development": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#0891B2" />
      <path d="M64 26L72 50L96 58L72 66L64 90L56 66L32 58L56 50L64 26Z" fill="white" />
      <path d="M88 80L92 90L102 94L92 98L88 108L84 98L74 94L84 90L88 80Z" fill="#FDE047" />
    </svg>
  ),

  ChatGPT: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#10A37F" />
      <path
        d="M96 60.5C95.2 46.8 84.2 36 70.5 36C67.5 36 64.6 36.6 62 37.8V35C62 25.6 54.4 18 45 18C37.5 18 31.2 22.9 29 29.8C20.5 33.6 15 42.1 15 52C15 62.8 21.6 72.1 31 75.8V79C31 88.4 38.6 96 48 96C51.5 96 54.8 94.9 57.5 93.1C61.4 100.1 68.9 105 77.5 105C88.8 105 98 95.8 98 84.5C98 80.8 97 77.3 95.2 74.3C100.6 70.8 104 64.8 104 58C104 54.2 102.8 50.6 100.8 47.6C97.8 55.4 96 60.5 96 60.5Z"
        stroke="white"
        strokeWidth="6"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),

  Claude: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#D97757" />
      <path
        d="M64 24L70 48L94 42L78 60L96 74L72 76L76 100L64 82L52 100L56 76L32 74L50 60L34 42L58 48L64 24Z"
        fill="white"
      />
    </svg>
  ),

  "Google Gemini": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#1B1F23" />
      <defs>
        <linearGradient id="gemini-grad" x1="28" y1="28" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4E82EE" />
          <stop offset="0.5" stopColor="#9B72CB" />
          <stop offset="1" stopColor="#D96570" />
        </linearGradient>
      </defs>
      <path
        d="M64 24C64 46.09 46.09 64 24 64C46.09 64 64 81.91 64 104C64 81.91 81.91 64 104 64C81.91 64 64 46.09 64 24Z"
        fill="url(#gemini-grad)"
      />
    </svg>
  ),

  "Google Antigravity": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#18181B" />
      <circle cx="64" cy="64" r="38" stroke="#38BDF8" strokeWidth="4" strokeDasharray="6 4" fill="none" />
      <circle cx="64" cy="64" r="22" fill="#0284C7" />
      <path d="M64 36L72 54H56L64 36Z" fill="#F59E0B" />
      <path d="M64 92L56 74H72L64 92Z" fill="#38BDF8" />
    </svg>
  ),
};

interface TechItem {
  name: string;
  category: "frontend" | "backend" | "wordpress" | "ai";
}

const ALL_TECH: TechItem[] = [
  // WordPress (9 items)
  { name: "WordPress", category: "wordpress" },
  { name: "Elementor Pro", category: "wordpress" },
  { name: "WooCommerce", category: "wordpress" },
  { name: "JetEngine", category: "wordpress" },
  { name: "JetFormBuilder", category: "wordpress" },
  { name: "Advanced Custom Fields (ACF)", category: "wordpress" },
  { name: "Custom Post Types (CPT)", category: "wordpress" },
  { name: "Dynamic Content", category: "wordpress" },
  { name: "Custom WordPress Functionality", category: "wordpress" },

  // Frontend & Design (6 items)
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "Responsive Design", category: "frontend" },
  { name: "Figma", category: "frontend" },
  { name: "Photoshop", category: "frontend" },

  // Hosting, Infrastructure & Optimization (8 items)
  { name: "cPanel", category: "backend" },
  { name: "DNS", category: "backend" },
  { name: "SSL", category: "backend" },
  { name: "SMTP", category: "backend" },
  { name: "Booking & Payment Systems", category: "backend" },
  { name: "Third-Party Integrations", category: "backend" },
  { name: "Website Performance Optimization", category: "backend" },
  { name: "On-Page SEO", category: "backend" },

  // AI & Workflow (5 items)
  { name: "AI-Assisted Development", category: "ai" },
  { name: "ChatGPT", category: "ai" },
  { name: "Claude", category: "ai" },
  { name: "Google Gemini", category: "ai" },
  { name: "Google Antigravity", category: "ai" },
];

export function Technologies() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"all" | "wordpress" | "frontend" | "backend" | "ai">("all");

  const filtered = activeTab === "all" ? ALL_TECH : ALL_TECH.filter((item) => item.category === activeTab);

  const availableTabs = [
    { id: "all", label: t("tab_all_tech", "All Technologies") },
    { id: "wordpress", label: t("tab_wp", "WordPress") },
    { id: "frontend", label: t("tab_frontend", "Frontend & Design") },
    { id: "backend", label: t("tab_backend", "Hosting & Optimization") },
    { id: "ai", label: t("tab_ai", "AI & Workflow") },
  ];

  return (
    <section id="technologies" aria-label="Technologies and Tech Stack" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-8">
        {/* Section Header */}
        <div className="mb-6 text-center reveal-on-scroll">
          <h2 className="text-brand-gradient text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            {t("tech_heading")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[14px] sm:text-[15.5px] font-medium text-muted-foreground">
            {t("tech_subtitle", "Grouped into WordPress architecture, frontend design, hosting infrastructure, and modern AI development workflows with authentic brand identities.")}
          </p>
        </div>

        {/* Category Tabs — Smooth Horizontal Swipeable on Mobile, Centered with zero clipping on Desktop */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-8 overflow-x-auto sm:overflow-visible no-scrollbar py-3.5 px-3 sm:px-0 sm:py-2.5 sm:flex-wrap sm:justify-center touch-pan-x">
          {availableTabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`shrink-0 whitespace-nowrap rounded-[10px] px-4 py-2 sm:py-2.5 text-[11.5px] sm:text-[12.5px] font-extrabold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none my-1 ${
                  isSelected
                    ? "nm-inset text-brand-deep shadow-inner"
                    : "nm-raised-sm hover:nm-interactive text-foreground/80 hover:text-brand-deep active:scale-95"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-4">
          {filtered.map((item, idx) => {
            const CustomSvg = ICONS[item.name];

            return (
              <NeumorphicCard
                key={item.name}
                depth="sm"
                radius="lg"
                interactive
                className={`flex flex-col items-center justify-center p-3.5 sm:p-4 text-center group transition-transform duration-300 hover:-translate-y-1 reveal-on-scroll stagger-${(idx % 6) + 1}`}
              >
                {/* Neumorphic Inset Square Container for Official Logo */}
                <div className="nm-inset flex h-[62px] w-[62px] sm:h-[68px] sm:w-[68px] shrink-0 items-center justify-center rounded-[14px] sm:rounded-[16px] p-2 mb-2.5 transition-transform duration-300 group-hover:scale-105">
                  {CustomSvg ? (
                    <CustomSvg className="h-[40px] w-[40px] sm:h-[44px] sm:w-[44px] object-contain drop-shadow-xs" />
                  ) : (
                    <div className="h-10 w-10 rounded-xl bg-brand-deep/10 flex items-center justify-center font-bold text-brand-deep text-xs">
                      {item.name.slice(0, 3)}
                    </div>
                  )}
                </div>

                {/* Technology Name */}
                <span
                  translate="no"
                  className="notranslate text-center text-[12px] sm:text-[13px] font-semibold leading-tight tracking-tight text-foreground/90 line-clamp-2"
                >
                  {item.name}
                </span>

                {/* Subtle category tag */}
                <span className="mt-1 text-[9.5px] font-bold text-muted-foreground uppercase tracking-widest">
                  {item.category === "ai"
                    ? "AI & Workflow"
                    : item.category === "wordpress"
                    ? "WordPress"
                    : item.category === "frontend"
                    ? "Frontend & Design"
                    : "Hosting & Opt"}
                </span>
              </NeumorphicCard>
            );
          })}
        </div>
      </NeumorphicCard>
    </section>
  );
}
