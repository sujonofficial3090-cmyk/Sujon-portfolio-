import { NeumorphicCard } from "@/components/nm";

// 100% Reliable Standalone Vector SVGs for every technology with crisp clean rendering
const ICONS: Record<string, (props: { className?: string }) => JSX.Element> = {
  WordPress: ({ className = "h-[60px] w-[60px]" }) => (
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

  WooCommerce: ({ className = "h-[60px] w-[60px]" }) => (
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

  Elementor: ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#92003B" />
      <path d="M40 38H52V90H40V38Z" fill="white" />
      <path d="M60 38H88V49H60V38Z" fill="white" />
      <path d="M60 58.5H88V69.5H60V58.5Z" fill="white" />
      <path d="M60 79H88V90H60V79Z" fill="white" />
    </svg>
  ),

  Photoshop: ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#001E36" />
      <path
        d="M34 34H61C71.5 34 79 39.5 79 49.5C79 59.5 71.5 65 61 65H47V94H34V34ZM47 54.5H59.5C64.5 54.5 67.5 52.5 67.5 49.5C67.5 46.5 64.5 44.5 59.5 44.5H47V54.5ZM81.5 82C84.8 84.2 89.5 85.5 94.5 85.5C100.5 85.5 103 83 103 79.5C103 71.5 83.5 73.5 83.5 59.5C83.5 52 89.5 47 100.5 47C105 47 109 48.2 111 49.5L108 58C106 57 103 56 100 56C95.5 56 93.5 58 93.5 60.5C93.5 68 113.5 66 113.5 80C113.5 88 107 94 94.5 94C89 94 84.5 92.5 81.5 90L81.5 82Z"
        fill="#31A8FF"
      />
    </svg>
  ),

  Illustrator: ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#330000" />
      <path
        d="M28 94L52 34H65L89 94H75.5L70 79H47L41.5 94H28ZM50.8 69H66.2L58.5 47.5L50.8 69ZM96 43H108V54H96V43ZM96 61H108V94H96V61Z"
        fill="#FF9A00"
      />
    </svg>
  ),

  PHP: ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#777BB4" />
      <ellipse cx="64" cy="64" rx="52" ry="34" fill="#4F5B93" />
      <text
        x="64"
        y="75"
        fontFamily="'Funnel Display', sans-serif"
        fontSize="34"
        fontWeight="900"
        textAnchor="middle"
        fill="white"
      >
        php
      </text>
    </svg>
  ),

  JavaScript: ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#F7DF1E" />
      <path
        d="M38 92L47 86.5C49 90.5 52.5 93 57 93C62 93 65.5 90 65.5 85V48H77V85C77 96 70 102 57 102C48 102 41 98 38 92ZM84 92L93 86.5C96 91 100 93.5 106 93.5C112 93.5 116 90.5 116 86C116 81.5 113 79.5 104 75.5C92 70.5 85 65.5 85 55C85 45 93 37.5 104 37.5C112 37.5 118 40.5 122 47L113 52.5C111 48.5 108 46.5 104 46.5C99.5 46.5 96.5 49 96.5 53C96.5 57 99 58.5 107 62C120 67 127 72 127 84C127 94.5 119 102 106 102C97 102 89 98 84 92Z"
        fill="#000000"
      />
    </svg>
  ),

  HTML5: ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#E34F26" />
      <path d="M28 24L36 104L64 112L92 104L100 24H28ZM82.5 42H45.5L47 56H81L79 78L64 82L49 78L48 68H38L40 86L64 92.5L88 86L91.5 42H82.5Z" fill="white" />
    </svg>
  ),

  CSS3: ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#1572B6" />
      <path d="M28 24L36 104L64 112L92 104L100 24H28ZM82.5 42H45.5L47 56H81L79 78L64 82L49 78L48 68H38L40 86L64 92.5L88 86L91.5 42H82.5Z" fill="white" />
    </svg>
  ),

  MySQL: ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#00758F" />
      <path
        d="M64 30C46 30 32 40 32 54C32 68 46 78 64 78C82 78 96 68 96 54C96 40 82 30 64 30ZM44 86C48 94 55 98 64 98C73 98 80 94 84 86L94 92C88 102 77 108 64 108C51 108 40 102 34 92L44 86Z"
        fill="#F29111"
      />
      <text
        x="64"
        y="60"
        fontFamily="'Funnel Display', sans-serif"
        fontSize="18"
        fontWeight="800"
        textAnchor="middle"
        fill="white"
      >
        SQL
      </text>
    </svg>
  ),

  Git: ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#F05032" />
      <path
        d="M93.8 58.2L69.8 34.2C68.6 33 67 32.4 65.4 32.4C63.8 32.4 62.2 33 61 34.2L52.8 42.4L63.2 52.8C65.2 52.2 67.4 52.6 69 54.2C70.6 55.8 71 58 70.4 60L80.6 70.2C82.6 69.6 84.8 70 86.4 71.6C88.8 74 88.8 77.8 86.4 80.2C84 82.6 80.2 82.6 77.8 80.2C76 78.4 75.6 75.8 76.6 73.6L67 64V80.4C67.6 81 68 81.8 68 82.8C68 85.2 66 87.2 63.6 87.2C61.2 87.2 59.2 85.2 59.2 82.8C59.2 81 60.2 79.4 61.6 78.6V62.4C60.2 61.6 59.2 60 59.2 58.2C59.2 56.4 60.2 54.8 61.6 54L51.4 43.8L34.2 61C33 62.2 32.4 63.8 32.4 65.4C32.4 67 33 68.6 34.2 69.8L58.2 93.8C59.4 95 61 95.6 62.6 95.6C64.2 95.6 65.8 95 67 93.8L93.8 67C95 65.8 95.6 64.2 95.6 62.6C95.6 61 95 59.4 93.8 58.2Z"
        fill="white"
      />
    </svg>
  ),

  Figma: ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#1E1E1E" />
      <path d="M44 34H64V54H44C38.48 54 34 49.52 34 44C34 38.48 38.48 34 44 34Z" fill="#F24E1E" />
      <path d="M64 34H84C89.52 34 94 38.48 94 44C94 49.52 89.52 54 84 54H64V34Z" fill="#FF7262" />
      <path d="M44 54H64V74H44C38.48 74 34 69.52 34 64C34 58.48 38.48 54 44 54Z" fill="#A259FF" />
      <circle cx="84" cy="64" r="10" fill="#1ABCFE" />
      <path d="M44 74H64V94C64 99.52 59.52 104 54 104C48.48 104 44 99.52 44 94V74Z" fill="#0ACF83" />
    </svg>
  ),

  Wix: ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#0C6EFC" />
      <text
        x="64"
        y="78"
        fontFamily="'Funnel Display', sans-serif"
        fontSize="40"
        fontWeight="900"
        textAnchor="middle"
        fill="white"
        letterSpacing="-1"
      >
        WiX
      </text>
    </svg>
  ),

  Webflow: ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#146EF5" />
      <path
        d="M98 48C98 56 92 62 84 62C78 62 73 59 70 54L62 78H50L40 48H52L58 70L66 48H78L84 66C86 64 88 62 88 58C88 54 85 52 82 52V42C92 42 98 44 98 48Z"
        fill="white"
      />
    </svg>
  ),

  Laravel: ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#FF2D20" />
      <path
        d="M32 44L64 26L96 44L64 62L32 44ZM32 54L64 72V102L32 84V54ZM96 54L64 72V102L96 84V54Z"
        fill="white"
      />
    </svg>
  ),

  React: ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#20232A" />
      <ellipse cx="64" cy="64" rx="44" ry="16" fill="none" stroke="#61DAFB" strokeWidth="4" />
      <ellipse cx="64" cy="64" rx="44" ry="16" fill="none" stroke="#61DAFB" strokeWidth="4" transform="rotate(60 64 64)" />
      <ellipse cx="64" cy="64" rx="44" ry="16" fill="none" stroke="#61DAFB" strokeWidth="4" transform="rotate(120 64 64)" />
      <circle cx="64" cy="64" r="8" fill="#61DAFB" />
    </svg>
  ),

  "Node.js": ({ className = "h-[60px] w-[60px]" }) => (
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

  "Next.js": ({ className = "h-[60px] w-[60px]" }) => (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#000000" />
      <circle cx="64" cy="64" r="42" fill="black" stroke="white" strokeWidth="4" />
      <path d="M48 44V84H56V58L84 94H92V44H84V70L56 44H48Z" fill="white" />
    </svg>
  ),
};

const TECH_NAMES = [
  "WordPress",
  "WooCommerce",
  "Elementor",
  "Photoshop",
  "Illustrator",
  "PHP",
  "JavaScript",
  "HTML5",
  "CSS3",
  "MySQL",
  "Git",
  "Figma",
  "Wix",
  "Webflow",
  "Laravel",
  "React",
  "Node.js",
  "Next.js",
];

export function Technologies() {
  return (
    <section aria-label="Technologies I work with" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-8">
        <div className="mb-8 text-center">
          <h2 className="text-brand-gradient text-[clamp(1.6rem,4.2vw,2.5rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            Technologies I Work With
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] sm:text-[16px] font-medium text-muted-foreground">
            Tools, frameworks, and CMS platforms I use to build world-class digital products.
          </p>
        </div>

        {/* Responsive Grid: EXACTLY 3 items per row on mobile, 4 on sm, 6 on md/lg */}
        <div className="grid grid-cols-3 gap-3.5 sm:gap-4 md:grid-cols-6 lg:grid-cols-6">
          {TECH_NAMES.map((name) => {
            const IconComponent = ICONS[name];
            return (
              <NeumorphicCard
                key={name}
                depth="sm"
                radius="md"
                interactive
                className="flex flex-col items-center justify-center gap-3.5 px-2 py-5 text-center group transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Clean, Large Icon without Heavy Murky Dark Shadow Container */}
                <div className="flex h-[64px] w-[64px] items-center justify-center shrink-0">
                  {IconComponent && (
                    <IconComponent className="h-[58px] w-[58px] sm:h-[62px] sm:w-[62px] object-contain transition-transform duration-300 group-hover:scale-108" />
                  )}
                </div>
                <span className="text-center text-[12px] sm:text-[13px] font-bold leading-tight tracking-tight text-foreground/90 line-clamp-1">
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
