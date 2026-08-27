import { NeumorphicCard } from "@/components/nm";

// 100% Reliable, Standalone Vector SVGs for all 16 Technologies matching the screenshot exactly
const ICONS: Record<string, (props: { className?: string }) => JSX.Element> = {
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
        fontFamily="'Funnel Display', sans-serif"
        fontSize="28"
        fontWeight="900"
        textAnchor="middle"
        fill="#96588A"
        letterSpacing="-1"
      >
        WOO
      </text>
    </svg>
  ),

  Elementor: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#92003B" />
      <path d="M40 38H52V90H40V38Z" fill="white" />
      <path d="M60 38H88V49H60V38Z" fill="white" />
      <path d="M60 58.5H88V69.5H60V58.5Z" fill="white" />
      <path d="M60 79H88V90H60V79Z" fill="white" />
    </svg>
  ),

  Wix: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#0C6EFC" />
      <text
        x="64"
        y="78"
        fontFamily="'Funnel Display', sans-serif"
        fontSize="38"
        fontWeight="900"
        textAnchor="middle"
        fill="white"
        letterSpacing="-1"
      >
        WiX
      </text>
    </svg>
  ),

  Webflow: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#146EF5" />
      <path
        d="M98 48C98 56 92 62 84 62C78 62 73 59 70 54L62 78H50L40 48H52L58 70L66 48H78L84 66C86 64 88 62 88 58C88 54 85 52 82 52V42C92 42 98 44 98 48Z"
        fill="white"
      />
    </svg>
  ),

  Laravel: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#FF2D20" />
      <path
        d="M32 44L64 26L96 44L64 62L32 44ZM32 54L64 72V102L32 84V54ZM96 54L64 72V102L96 84V54Z"
        fill="white"
      />
    </svg>
  ),

  "Node.js": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#333333" />
      <path d="M64 26L98 46V84L64 104L30 84V46L64 26Z" fill="#5FA04E" />
      <text
        x="64"
        y="72"
        fontFamily="'Funnel Display', sans-serif"
        fontSize="22"
        fontWeight="900"
        textAnchor="middle"
        fill="white"
      >
        NODE
      </text>
    </svg>
  ),

  "Next.js": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#000000" />
      <circle cx="64" cy="64" r="42" fill="black" stroke="white" strokeWidth="4" />
      <path d="M48 44V84H56V58L84 94H92V44H84V70L56 44H48Z" fill="white" />
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

  Figma: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#1E1E1E" />
      <path d="M44 34H64V54H44C38.48 54 34 49.52 34 44C34 38.48 38.48 34 44 34Z" fill="#F24E1E" />
      <path d="M64 34H84C89.52 34 94 38.48 94 44C94 49.52 89.52 54 84 54H64V34Z" fill="#FF7262" />
      <path d="M44 54H64V74H44C38.48 74 34 69.52 34 64C34 58.48 38.48 54 44 54Z" fill="#A259FF" />
      <circle cx="84" cy="64" r="10" fill="#1ABCFE" />
      <path d="M44 74H64V94C64 99.52 59.52 104 54 104C48.48 104 44 99.52 44 94V74Z" fill="#0ACF83" />
    </svg>
  ),

  Photoshop: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#001E36" />
      <path
        d="M34 34H61C71.5 34 79 39.5 79 49.5C79 59.5 71.5 65 61 65H47V94H34V34ZM47 54.5H59.5C64.5 54.5 67.5 52.5 67.5 49.5C67.5 46.5 64.5 44.5 59.5 44.5H47V54.5ZM81.5 82C84.8 84.2 89.5 85.5 94.5 85.5C100.5 85.5 103 83 103 79.5C103 71.5 83.5 73.5 83.5 59.5C83.5 52 89.5 47 100.5 47C105 47 109 48.2 111 49.5L108 58C106 57 103 56 100 56C95.5 56 93.5 58 93.5 60.5C93.5 68 113.5 66 113.5 80C113.5 88 107 94 94.5 94C89 94 84.5 92.5 81.5 90L81.5 82Z"
        fill="#31A8FF"
      />
    </svg>
  ),

  Illustrator: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#330000" />
      <path
        d="M28 94L52 34H65L89 94H75.5L70 79H47L41.5 94H28ZM50.8 69H66.2L58.5 47.5L50.8 69ZM96 43H108V54H96V43ZM96 61H108V94H96V61Z"
        fill="#FF9A00"
      />
    </svg>
  ),

  "Meta Ads": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#0081FB" />
      <path
        d="M64 64C56 50 48 42 38 42C27 42 20 51 20 64C20 77 27 86 38 86C48 86 56 78 64 64ZM64 64C72 50 80 42 90 42C101 42 108 51 108 64C108 77 101 86 90 86C80 86 72 78 64 64Z"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),

  "Google Ads": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#F8F9FA" />
      <path d="M42 28L24 64L38 92L56 56L42 28Z" fill="#FBBC04" />
      <path d="M86 28L68 64L82 92L100 56L86 28Z" fill="#4285F4" />
      <circle cx="48" cy="80" r="14" fill="#34A853" />
    </svg>
  ),

  "Tag Manager": ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#246FDB" />
      <path d="M64 24L98 58L64 92L30 58L64 24Z" fill="white" />
      <circle cx="64" cy="58" r="14" fill="#246FDB" />
      <circle cx="64" cy="94" r="8" fill="#8AB4F8" />
    </svg>
  ),

  Analytics: ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#F9AB00" />
      <rect x="76" y="32" width="18" height="64" rx="9" fill="white" />
      <rect x="52" y="52" width="18" height="44" rx="9" fill="white" fillOpacity="0.85" />
      <circle cx="37" cy="87" r="9" fill="white" fillOpacity="0.7" />
    </svg>
  ),
};

const TECHNOLOGIES_LIST = [
  // Row 1
  "WordPress",
  "WooCommerce",
  "Elementor",
  "Wix",
  "Webflow",
  "Laravel",
  "Node.js",
  "Next.js",
  // Row 2
  "React",
  "Figma",
  "Photoshop",
  "Illustrator",
  "Meta Ads",
  "Google Ads",
  "Tag Manager",
  "Analytics",
];

export function Technologies() {
  return (
    <section aria-label="Technologies I work with" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-8">
        {/* Clean Header matching screenshot */}
        <div className="mb-8 text-center">
          <h2 className="text-brand-gradient text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            Technologies I Work With
          </h2>
        </div>

        {/* 8 Columns x 2 Rows Grid matching screenshot exactly */}
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 md:grid-cols-8 sm:gap-4">
          {TECHNOLOGIES_LIST.map((name) => {
            const IconComponent = ICONS[name];
            return (
              <NeumorphicCard
                key={name}
                depth="sm"
                radius="lg"
                interactive
                className="flex flex-col items-center justify-center p-3.5 sm:p-4 text-center group transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Soft Neumorphic Inset Square Pill Container matching Screenshot */}
                <div className="nm-inset flex h-[62px] w-[62px] sm:h-[68px] sm:w-[68px] shrink-0 items-center justify-center rounded-[14px] sm:rounded-[16px] p-2.5 mb-2.5 transition-transform duration-300 group-hover:scale-105">
                  {IconComponent && (
                    <IconComponent className="h-[40px] w-[40px] sm:h-[44px] sm:w-[44px] object-contain drop-shadow-xs" />
                  )}
                </div>

                {/* Technology Name */}
                <span className="text-center text-[12px] sm:text-[13px] font-semibold leading-tight tracking-tight text-foreground/90 line-clamp-1">
                  {name}
                </span>
              </NeumorphicCard>
            );
          })}
        </div>
      </NeumorphicCard>
    </section>
  );
}
