import { useState } from "react";
import type * as React from "react";
import { NeumorphicCard } from "@/components/nm";
import { useTranslation } from "@/lib/i18n";
// Standalone Vector SVG / Official Brand Logos with Authentic Colors
const ICONS: Record<string, (props: { className?: string }) => React.ReactNode> = {
  // --- WORDPRESS & ECOSYSTEM ---
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

  "ACF Pro": ({ className = "h-10 w-10" }) => (
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

  PHP: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#777BB4" />
      <ellipse cx="64" cy="64" rx="48" ry="28" fill="#4F5B93" stroke="white" strokeWidth="2.5" />
      <text
        x="64"
        y="73"
        fontFamily="'Funnel Display', sans-serif, system-ui"
        fontSize="28"
        fontWeight="900"
        textAnchor="middle"
        fill="white"
        fontStyle="italic"
      >
        php
      </text>
    </svg>
  ),

  MySQL: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#00618A" />
      <path
        d="M32 78C32 78 44 42 66 42C80 42 88 52 88 64C88 80 62 88 62 88L96 88"
        stroke="#E48E00"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="64"
        y="78"
        fontFamily="'Funnel Display', sans-serif, system-ui"
        fontSize="22"
        fontWeight="900"
        textAnchor="middle"
        fill="white"
      >
        SQL
      </text>
    </svg>
  ),

  // --- FRONTEND ---
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

  TypeScript: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#3178C6" />
      <text
        x="64"
        y="82"
        fontFamily="'Funnel Display', sans-serif, system-ui"
        fontSize="54"
        fontWeight="800"
        textAnchor="middle"
        fill="white"
        letterSpacing="-1"
      >
        TS
      </text>
    </svg>
  ),

  React: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#20232A" />
      <ellipse cx="64" cy="64" rx="44" ry="16" fill="none" stroke="#61DAFB" strokeWidth="4" />
      <ellipse cx="64" cy="64" rx="44" ry="16" fill="none" stroke="#61DAFB" strokeWidth="4" transform="rotate(60 64 64)" />
      <ellipse cx="64" cy="64" rx="44" ry="16" fill="none" stroke="#61DAFB" strokeWidth="4" transform="rotate(120 64 64)" />
      <circle cx="64" cy="64" r="8" fill="#61DAFB" />
    </svg>
  ),

  "Next.js": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#000000" />
      <circle cx="64" cy="64" r="42" fill="black" stroke="white" strokeWidth="4" />
      <path d="M48 44V84H56V58L84 94H92V44H84V70L56 44H48Z" fill="white" />
    </svg>
  ),

  "Tailwind CSS": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#0F172A" />
      <path
        d="M64 45c-8.8 0-14.3 4.4-16.5 13.2 3.3-4.4 7.2-6 11.6-4.9 2.5.6 4.3 2.5 6.3 4.5 3.3 3.3 7.1 7.2 15.1 7.2 8.8 0 14.3-4.4 16.5-13.2-3.3 4.4-7.2 6-11.6 4.9-2.5-.6-4.3-2.5-6.3-4.5-3.3-3.3-7.1-7.2-15.1-7.2zm-16.5 19.5c-8.8 0-14.3 4.4-16.5 13.2 3.3-4.4 7.2-6 11.6-4.9 2.5.6 4.3 2.5 6.3 4.5 3.3 3.3 7.1 7.2 15.1 7.2 8.8 0 14.3-4.4 16.5-13.2-3.3 4.4-7.2 6-11.6 4.9-2.5-.6-4.3-2.5-6.3-4.5-3.3-3.3-7.1-7.2-15.1-7.2z"
        fill="#38BDF8"
      />
    </svg>
  ),

  Vite: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#1B1B1F" />
      <path
        d="M93.3 24.5L66.7 101.5C65.5 104.8 60.9 104.8 59.7 101.5L34.7 24.5C33.4 20.6 37.1 16.9 40.8 18.2L64 26.5L87.2 18.2C90.9 16.9 94.6 20.6 93.3 24.5Z"
        fill="url(#vite-grad)"
      />
      <path d="M72 18L46 64H62L56 102L86 52H70L72 18Z" fill="#FFD62E" />
      <defs>
        <linearGradient id="vite-grad" x1="34" y1="18" x2="94" y2="104" gradientUnits="userSpaceOnUse">
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
      </defs>
    </svg>
  ),

  // --- BACKEND ---
  "Node.js": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#333333" />
      <path d="M64 26L98 46V84L64 104L30 84V46L64 26Z" fill="#5FA04E" />
      <text
        x="64"
        y="72"
        fontFamily="'Funnel Display', sans-serif, system-ui"
        fontSize="22"
        fontWeight="900"
        textAnchor="middle"
        fill="white"
      >
        NODE
      </text>
    </svg>
  ),

  "Express.js": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#000000" />
      <text
        x="64"
        y="76"
        fontFamily="'Funnel Display', sans-serif, system-ui"
        fontSize="46"
        fontWeight="800"
        textAnchor="middle"
        fill="white"
      >
        ex
      </text>
    </svg>
  ),

  PostgreSQL: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#336791" />
      <path
        d="M64 28C48 28 36 40 36 56C36 68 44 76 44 86C44 94 48 100 56 100H72C80 100 84 94 84 86C84 76 92 68 92 56C92 40 80 28 64 28Z"
        fill="white"
      />
      <circle cx="52" cy="50" r="4" fill="#336791" />
      <circle cx="76" cy="50" r="4" fill="#336791" />
      <path d="M60 62C60 68 68 68 68 62" stroke="#336791" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  MongoDB: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#001E2B" />
      <path
        d="M64 20C64 20 40 48 40 74C40 92 52 104 62 108C62.8 108.3 64 107.5 64 106.6V20Z"
        fill="#00ED64"
      />
      <path
        d="M64 20C64 20 88 48 88 74C88 92 76 104 66 108C65.2 108.3 64 107.5 64 106.6V20Z"
        fill="#00684A"
      />
      <path d="M64 104V112" stroke="#13AA52" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),

  "REST APIs": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#FF6C37" />
      <circle cx="64" cy="64" r="38" stroke="white" strokeWidth="5" />
      <path d="M46 64H82M64 46V82" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <text
        x="64"
        y="110"
        fontFamily="'Funnel Display', sans-serif, system-ui"
        fontSize="14"
        fontWeight="900"
        textAnchor="middle"
        fill="white"
      >
        REST API
      </text>
    </svg>
  ),

  Git: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#F05032" />
      <g transform="rotate(45 64 64)">
        <rect x="44" y="44" width="40" height="40" rx="8" fill="white" />
        <circle cx="56" cy="56" r="6" fill="#F05032" />
        <circle cx="72" cy="72" r="6" fill="#F05032" />
        <circle cx="72" cy="56" r="6" fill="#F05032" />
        <path d="M56 56H72V72" stroke="#F05032" strokeWidth="4" />
      </g>
    </svg>
  ),

  GitHub: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#181717" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 24C41.9 24 24 41.9 24 64C24 81.7 35.5 96.7 51.4 102C53.4 102.4 54.1 101.1 54.1 100.1C54.1 99.2 54.1 96.7 54.1 93.6C43 96 40.6 88.3 40.6 88.3C38.8 83.7 36.2 82.5 36.2 82.5C32.6 80 36.5 80.1 36.5 80.1C40.5 80.4 42.6 84.2 42.6 84.2C46.1 90.3 51.9 88.5 54.2 87.5C54.6 85 55.6 83.2 56.7 82.2C47.8 81.2 38.5 77.8 38.5 62.4C38.5 58 40.1 54.4 42.7 51.6C42.3 50.6 40.9 46.5 43.1 41C43.1 41 46.5 39.9 54.2 45.1C57.4 44.2 60.8 43.8 64.2 43.8C67.6 43.8 71 44.2 74.2 45.1C81.9 39.9 85.3 41 85.3 41C87.5 46.5 86.1 50.6 85.7 51.6C88.3 54.4 89.9 58 89.9 62.4C89.9 77.9 80.5 81.2 71.6 82.2C73.1 83.5 74.4 86 74.4 89.8C74.4 95.3 74.3 99.7 74.3 100.1C74.3 101.1 75 102.4 77 102C92.9 96.7 104.4 81.7 104.4 64C104.4 41.9 86.5 24 64 24Z"
        fill="white"
      />
    </svg>
  ),

  Firebase: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#1A1D20" />
      <path d="M36 88L49 26L63 52L36 88Z" fill="#FFA000" />
      <path d="M92 88L79 46L63 52L92 88Z" fill="#F57C00" />
      <path d="M36 88L64 104L92 88L63 52L36 88Z" fill="#FFCA28" />
    </svg>
  ),

  // --- AI & MODERN WORKFLOW ---
  "Cursor AI": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#000000" />
      {/* 3D Isometric Cube of Cursor */}
      <path d="M64 28L98 47V85L64 104L30 85V47L64 28Z" stroke="#00E5FF" strokeWidth="4" fill="none" />
      <path d="M64 28V66L98 85M64 66L30 85" stroke="#00E5FF" strokeWidth="4" />
      <circle cx="64" cy="66" r="6" fill="#00E5FF" />
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

  "Claude AI": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#D97757" />
      {/* Anthropic Claude Starburst */}
      <path
        d="M64 24L70 48L94 42L78 60L96 74L72 76L76 100L64 82L52 100L56 76L32 74L50 60L34 42L58 48L64 24Z"
        fill="white"
      />
    </svg>
  ),

  "GitHub Copilot": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#6E40C9" />
      <path
        d="M44 48C44 41.37 49.37 36 56 36H72C78.63 36 84 41.37 84 48V72C84 78.63 78.63 84 72 84H56C49.37 84 44 78.63 44 72V48Z"
        fill="white"
      />
      <circle cx="56" cy="58" r="5" fill="#6E40C9" />
      <circle cx="72" cy="58" r="5" fill="#6E40C9" />
      <path d="M54 70C57 73 71 73 74 70" stroke="#6E40C9" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  "v0 (Vercel)": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#000000" />
      <text
        x="64"
        y="78"
        fontFamily="'Funnel Display', sans-serif, system-ui"
        fontSize="44"
        fontWeight="900"
        textAnchor="middle"
        fill="white"
        letterSpacing="-2"
      >
        v0
      </text>
    </svg>
  ),

  "Vibe Coding": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#10B981" />
      <path d="M70 28L40 70H62L58 100L88 58H66L70 28Z" fill="white" />
    </svg>
  ),
};

interface TechItem {
  name: string;
  category: "frontend" | "backend" | "wordpress" | "ai";
}

const ALL_TECH: TechItem[] = [
  // WordPress (8 items)
  { name: "WordPress", category: "wordpress" },
  { name: "Elementor Pro", category: "wordpress" },
  { name: "WooCommerce", category: "wordpress" },
  { name: "JetEngine", category: "wordpress" },
  { name: "JetFormBuilder", category: "wordpress" },
  { name: "ACF Pro", category: "wordpress" },
  { name: "PHP", category: "wordpress" },
  { name: "MySQL", category: "wordpress" },

  // Frontend (8 items)
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Vite", category: "frontend" },

  // Backend (7 items)
  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "Git", category: "backend" },
  { name: "GitHub", category: "backend" },
  { name: "Firebase", category: "backend" },

  // AI & Workflow (6 items)
  { name: "Cursor AI", category: "ai" },
  { name: "ChatGPT", category: "ai" },
  { name: "Claude AI", category: "ai" },
  { name: "GitHub Copilot", category: "ai" },
  { name: "v0 (Vercel)", category: "ai" },
  { name: "Vibe Coding", category: "ai" },
];

export function Technologies() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"all" | "wordpress" | "frontend" | "backend" | "ai">("all");

  const filtered = activeTab === "all" ? ALL_TECH : ALL_TECH.filter((item) => item.category === activeTab);

  const availableTabs = [
    { id: "all", label: t("tab_all_tech", "All Technologies") },
    { id: "wordpress", label: t("tab_wp", "WordPress") },
    { id: "frontend", label: t("tab_frontend", "Frontend") },
    { id: "backend", label: t("tab_backend", "Backend") },
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
            {t("tech_subtitle", "Grouped into core frontend, backend, WordPress architecture, and modern AI development workflows with official brand identities.")}
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
                  {item.category === "ai" ? "AI & Workflow" : item.category}
                </span>
              </NeumorphicCard>
            );
          })}
        </div>
      </NeumorphicCard>
    </section>
  );
}
