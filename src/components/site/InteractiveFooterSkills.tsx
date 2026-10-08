import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Sparkles } from "lucide-react";

// ── 12 MOTHER SKILLS with Crisp White Branding (Matching asctro.com exact design) ──
interface MotherSkill {
  id: string;
  name: string;
  category: string;
  radius: number;
  renderLogo: () => React.ReactNode;
}

const MOTHER_SKILLS: MotherSkill[] = [
  {
    id: "wordpress",
    name: "WordPress",
    category: "CMS Core Architecture",
    radius: 52,
    renderLogo: () => (
      <div className="flex items-center gap-2 select-none text-white pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
          <path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.05-.181 2.986-.51-.024-.037-.046-.078-.065-.123l-2.763-7.572zm-8.235 6.786c-.57-1.12-.907-2.385-.907-3.729 0-3.69 2.457-6.812 5.86-7.854L5.05 17.585c-.41-.606-.757-1.277-1.127-2.013zm15.656-7.572c0-1.396-.502-2.365-.93-3.118-.57-.93-1.107-1.728-1.107-2.658 0-1.036.784-2.005 1.884-2.005.048 0 .093.006.14.009C17.753 2.502 15.02 1.5 12 1.5 6.554 1.5 2.043 5.378 1.09 10.457c.237-.013.486-.02.748-.02 1.226 0 3.125.15 3.125.15.633.037.708.966.077 1.004 0 0-.638.075-1.348.112l4.28 12.732 2.57-7.712-1.83-5.02c-.636-.037-1.238-.112-1.238-.112-.633-.038-.556-.967.076-1.004 0 0 1.936-.15 3.126-.15 1.227 0 3.126.15 3.126.15.633.037.708.966.076 1.004 0 0-.638.075-1.348.112l4.24 12.615 1.17-3.916c.49-1.58.857-2.72.857-3.698zm-7.579 10.5c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12z" />
        </svg>
        <span className="font-extrabold text-[13px] tracking-tight">WordPress</span>
      </div>
    ),
  },
  {
    id: "elementor",
    name: "Elementor Pro",
    category: "Site Builder & Layouts",
    radius: 52,
    renderLogo: () => (
      <div className="flex items-center gap-2 select-none text-white pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
          <path d="M12 0C5.372 0 0 5.372 0 12c0 6.626 5.372 12 12 12s12-5.374 12-12c0-6.628-5.372-12-12-12zm-3.107 16.736H6.786V7.264h2.107v9.472zm8.321 0h-6.214v-2.107h6.214v2.107zm0-3.682h-6.214v-2.107h6.214v2.107zm0-3.683h-6.214V7.264h6.214v2.107z" />
        </svg>
        <span className="font-extrabold text-[13px] tracking-tight">Elementor</span>
      </div>
    ),
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    category: "E-Commerce Engines",
    radius: 52,
    renderLogo: () => (
      <div className="flex items-center gap-2 select-none text-white pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
          <path d="M2.223 3.333C1.004 3.333 0 4.337 0 5.556v8.889c0 1.218 1.004 2.222 2.222 2.222h2.223v4c0 .416.48.657.8.389l4.533-4.389h11.999c1.219 0 2.223-1.004 2.223-2.222V5.556c0-1.219-1.004-2.223-2.223-2.223H2.223zm3.722 3.89c.89 0 1.565.65 1.565 1.597 0 .947-.674 1.597-1.565 1.597-.89 0-1.564-.65-1.564-1.597 0-.948.674-1.598 1.564-1.598zm4.445 0c.89 0 1.565.65 1.565 1.597 0 .947-.675 1.597-1.565 1.597-.89 0-1.565-.65-1.565-1.597 0-.948.674-1.598 1.565-1.598zm4.444 0c.89 0 1.565.65 1.565 1.597 0 .947-.675 1.597-1.565 1.597-.89 0-1.565-.65-1.565-1.597 0-.948.674-1.598 1.565-1.598z" />
        </svg>
        <span className="font-extrabold text-[12.5px] tracking-tight">Woo</span>
      </div>
    ),
  },
  {
    id: "jetengine",
    name: "JetEngine",
    category: "Dynamic Relations & CPT",
    radius: 50,
    renderLogo: () => (
      <div className="flex items-center gap-2 select-none text-white pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
          <path d="M12 2L3 7.2v9.6l9 5.2 9-5.2V7.2L12 2zm0 2.3l6.7 3.9-3 1.7-6.7-3.9 3-1.7zm-7.2 4.6l6.2 3.6v7.3l-6.2-3.6V8.9zm8.2 10.9v-7.3l6.2-3.6v7.3l-6.2 3.6z" />
        </svg>
        <span className="font-extrabold text-[13px] tracking-tight">JetEngine</span>
      </div>
    ),
  },
  {
    id: "acf",
    name: "ACF Pro",
    category: "Advanced Custom Fields",
    radius: 50,
    renderLogo: () => (
      <div className="flex items-center gap-2 select-none text-white pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
          <rect x="2" y="3" width="20" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <path d="M7 16l3.5-8 3.5 8m-5.8-2.6h4.6M17 8v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-black text-[13px] tracking-tight">ACF PRO</span>
      </div>
    ),
  },
  {
    id: "figma",
    name: "Figma",
    category: "UI/UX & Design Systems",
    radius: 50,
    renderLogo: () => (
      <div className="flex items-center gap-2 select-none text-white pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
          <path d="M12 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm-8 4a4 4 0 0 1 4-4h4v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4zm0-8a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4zm8-4h4a4 4 0 1 1 0 8h-4V4zm-8 16a4 4 0 0 1 4-4h4v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
        </svg>
        <span className="font-extrabold text-[13px] tracking-tight">Figma</span>
      </div>
    ),
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Modern Utility UI",
    radius: 52,
    renderLogo: () => (
      <div className="flex items-center gap-2 select-none text-white pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
        <span className="font-extrabold text-[13px] tracking-tight">Tailwind</span>
      </div>
    ),
  },
  {
    id: "php",
    name: "PHP 8+",
    category: "Backend Logic & APIs",
    radius: 50,
    renderLogo: () => (
      <div className="flex items-center gap-2 select-none text-white pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
          <path d="M12.186 9.6c-.45 0-.75.3-.85.8l-.5 2.5c-.1.5.2.8.7.8.4 0 .75-.3.85-.8l.5-2.5c.1-.5-.25-.8-.7-.8zm-7.6 0c-.45 0-.75.3-.85.8l-.5 2.5c-.1.5.2.8.7.8.4 0 .75-.3.85-.8l.5-2.5c.1-.5-.25-.8-.7-.8zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-5.7 15.2H4.8l.5-2.6h1.2c1.2 0 2-.6 2.2-1.8.2-1.1-.4-1.8-1.6-1.8H4.6L5 6.7h2.8c2.4 0 3.8 1.3 3.3 3.5-.4 2.1-2.2 5-4.8 5zm6.8 0h-1.5l.5-2.6h1.2c1.2 0 2-.6 2.2-1.8.2-1.1-.4-1.8-1.6-1.8h-2.5L12 6.7h2.8c2.4 0 3.8 1.3 3.3 3.5-.4 2.1-2.2 5-4.8 5zm5.7-4.1h-.9l-.3 1.8h-.8l.3-1.8h-1l.2-.9h1l.3-1.7h.8l-.3 1.7h.9l-.2.9z" />
        </svg>
        <span className="font-black text-[13.5px] tracking-tight">PHP 8+</span>
      </div>
    ),
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Interactive Logic & DOM",
    radius: 52,
    renderLogo: () => (
      <div className="flex items-center gap-2 select-none text-white pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.017-.888-1.798-2.876-2.607-1.196-.525-1.637-.852-1.637-1.428 0-.5.35-.863 1.037-.863.738 0 1.2.338 1.513.888l1.7-.988c-.625-1.175-1.65-1.725-3.213-1.725-1.925 0-3.325 1.138-3.325 2.763 0 1.6 1.05 2.375 2.713 3.012 1.25.5 1.525.863 1.525 1.488 0 .613-.538.988-1.325.988-.938 0-1.513-.488-1.913-1.288l-1.675 1.013c.663 1.363 1.8 2.05 3.588 2.05 2.15 0 3.525-1.15 3.525-2.925l-.113-.388zm-8.872-4.838h-2.125v5.475c0 1.138-.613 1.6-1.525 1.6-.713 0-1.163-.375-1.425-.863l-1.6.975c.575 1.188 1.675 1.763 3.025 1.763 2.15 0 3.65-1.138 3.65-3.475V13.438z" />
        </svg>
        <span className="font-extrabold text-[13px] tracking-tight">JavaScript</span>
      </div>
    ),
  },
  {
    id: "css3",
    name: "CSS3",
    category: "Fluid Animations & FX",
    radius: 50,
    renderLogo: () => (
      <div className="flex items-center gap-2 select-none text-white pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.234-2.625h11.438l.235-2.625H5.406l.703 7.875h9.047l-.375 3.938-2.828.75-2.813-.75-.187-2.062H6.328l.375 4.125L11.977 20l5.25-1.453.703-7.875L8.53 9.75z" />
        </svg>
        <span className="font-black text-[13px] tracking-tight">CSS3</span>
      </div>
    ),
  },
  {
    id: "html5",
    name: "HTML5",
    category: "Semantic Web & SEO",
    radius: 50,
    renderLogo: () => (
      <div className="flex items-center gap-2 select-none text-white pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 6.5h10.063l-.703 7.875-5.914 1.64-5.914-1.64-.375-4.125h2.64l.188 2.062 3.461.938 3.461-.938.375-4.125H5.406l-.234-2.625h10.438l.234-2.625H5.172L4.938 3.875h14.124l-.234 2.625H8.531z" />
        </svg>
        <span className="font-black text-[13px] tracking-tight">HTML5</span>
      </div>
    ),
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Database Architecture",
    radius: 50,
    renderLogo: () => (
      <div className="flex items-center gap-2 select-none text-white pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
          <path d="M16.545 15.65c-.172-.057-.457-.142-.8-.256-.4-.114-.77-.143-1.114-.143-.886 0-1.6.286-2.143.857-.543.571-.828 1.343-.828 2.314 0 .972.285 1.743.828 2.315.543.571 1.257.857 2.143.857.343 0 .714-.029 1.114-.143.343-.114.629-.2.8-.257v-5.543zm-7.086.257c-.4.114-.77.143-1.114.143-.886 0-1.6-.286-2.143-.857-.543-.572-.828-1.343-.828-2.315 0-.971.285-1.743.828-2.314.543-.571 1.257-.857 2.143-.857.343 0 .714.028 1.114.143.343.114.629.2.8.257v5.543c-.172.057-.457.143-.8.257zm14.343-2.657c-.229-1.257-.743-2.371-1.543-3.343-1.086-1.314-2.486-2.228-4.2-2.743-1.486-.457-3.057-.514-4.714-.2-1.372.257-2.657.771-3.857 1.543-1.257.8-2.286 1.857-3.086 3.171-.629 1.029-.971 2.143-1.028 3.343-.057 1.2.143 2.371.6 3.514.457 1.143 1.143 2.143 2.057 3 1.029.972 2.257 1.686 3.686 2.143 1.486.486 3.086.6 4.8.314 1.657-.285 3.143-.914 4.457-1.885 1.371-1.029 2.371-2.315 3-3.858.457-1.142.686-2.342.686-3.6 0-.457-.057-.914-.172-1.371l-.686.285z" />
        </svg>
        <span className="font-extrabold text-[13px] tracking-tight">MySQL</span>
      </div>
    ),
  },
];

export function InteractiveFooterSkills() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [activeSkill, setActiveSkill] = useState<MotherSkill | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // Skip heavy physics engine on mobile/touch — use simple static grid instead
    const isMobile =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;
    if (isMobile) return;

    const {
      Engine,
      Runner,
      Bodies,
      Composite,
      MouseConstraint,
      Mouse,
      Events,
    } = Matter;

    const container = containerRef.current;
    const width = container.clientWidth || 900;
    const height = container.clientHeight || 205;

    // Fast, lightweight Matter.js physics engine matching asctro.com
    const engine = Engine.create({ enableSleeping: false });
    engine.gravity.y = 0.8;
    engine.gravity.x = 0;
    engineRef.current = engine;

    // Boundary walls keeping spheres neatly inside the track
    const wallThickness = 80;
    const wallOptions: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      render: { visible: false },
      friction: 0.1,
      restitution: 0.5, // Matches asctro.com restitution
    };

    let walls = [
      // Floor
      Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width + wallThickness * 4,
        wallThickness,
        wallOptions
      ),
      // Ceiling
      Bodies.rectangle(
        width / 2,
        -wallThickness / 2,
        width + wallThickness * 4,
        wallThickness,
        wallOptions
      ),
      // Left Wall
      Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        height + wallThickness * 4,
        wallOptions
      ),
      // Right Wall
      Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height + wallThickness * 4,
        wallOptions
      ),
    ];

    Composite.add(engine.world, walls);

    // Initial positioning: evenly distributed across the track
    const padding = 65;
    const availableW = Math.max(300, width - padding * 2);
    const step = availableW / (MOTHER_SKILLS.length - 1 || 1);

    const bodies: Matter.Body[] = MOTHER_SKILLS.map((skill, index) => {
      const startX = padding + step * index + (Math.random() * 6 - 3);
      const startY = (index % 2 === 0 ? 55 : 115) + (Math.random() * 10 - 5);

      // Density, friction & restitution exactly matching asctro.com
      const body = Bodies.circle(startX, startY, skill.radius, {
        density: 0.01,
        friction: 0.1,
        restitution: 0.5,
        angle: (Math.random() - 0.5) * 0.25, // Slight natural initial angle
      });

      return body;
    });

    Composite.add(engine.world, bodies);

    // Mouse Constraint matching asctro.com: stiffness 0.2
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);

    // Detach wheel listener so page scrolling is never intercepted
    if (mouse.element) {
      mouse.element.removeEventListener(
        "mousewheel",
        (mouse as any).mousewheel
      );
      mouse.element.removeEventListener(
        "DOMMouseScroll",
        (mouse as any).mousewheel
      );

      // Touch handlers matching asctro.com exactly
      mouse.element.addEventListener(
        "touchstart",
        (e: TouchEvent) => {
          mouse.mousedown(e);
        },
        { passive: true }
      );

      mouse.element.addEventListener("touchmove", (e) => {
        if (mouseConstraint.body) {
          mouse.mousemove(e);
        }
      });

      mouse.element.addEventListener("touchend", (e) => {
        if (mouseConstraint.body) {
          mouse.mouseup(e);
        }
      });
    }

    const runner = Runner.create();
    Runner.run(runner, engine);

    // 60fps render synchronization: position follows physics, tilt stays gracefully readable
    Events.on(engine, "afterUpdate", () => {
      bodies.forEach((body, idx) => {
        const domEl = elementsRef.current[idx];
        if (!domEl) return;

        const { x, y } = body.position;
        const radius = MOTHER_SKILLS[idx].radius;

        // Dynamic tilt: organic wobble up to ±28 degrees, never flips upside-down
        const naturalTilt = Math.sin(body.angle) * 0.48;

        domEl.style.transform = `translate3d(${(x - radius).toFixed(2)}px, ${(
          y - radius
        ).toFixed(2)}px, 0) rotate(${naturalTilt.toFixed(4)}rad)`;
      });
    });

    // Resize handling
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight || 205;

      Composite.remove(engine.world, walls);
      walls = [
        Bodies.rectangle(
          newWidth / 2,
          newHeight + wallThickness / 2,
          newWidth + wallThickness * 4,
          wallThickness,
          wallOptions
        ),
        Bodies.rectangle(
          newWidth / 2,
          -wallThickness / 2,
          newWidth + wallThickness * 4,
          wallThickness,
          wallOptions
        ),
        Bodies.rectangle(
          -wallThickness / 2,
          newHeight / 2,
          wallThickness,
          newHeight + wallThickness * 4,
          wallOptions
        ),
        Bodies.rectangle(
          newWidth + wallThickness / 2,
          newHeight / 2,
          wallThickness,
          newHeight + wallThickness * 4,
          wallOptions
        ),
      ];
      Composite.add(engine.world, walls);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  // Mobile: simple flat badges instead of heavy physics engine
  if (
    typeof window !== "undefined" &&
    ("ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) ||
      window.innerWidth < 768)
  ) {
    return (
      <div className="w-full mt-6 pt-5 border-t border-border/40">
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-brand/10 border border-brand/20 text-brand-deep text-[11px] font-black uppercase tracking-[0.14em] font-mono">
            <Sparkles className="h-3 w-3 text-brand animate-pulse" />
            <span>Core Skills</span>
          </span>
        </div>
        <div className="flex flex-wrap gap-2 px-1 pb-2">
          {MOTHER_SKILLS.map((skill) => (
            <span
              key={skill.id}
              className="nm-raised-sm inline-flex items-center rounded-full px-3 py-1.5 text-[11.5px] font-bold text-foreground/80"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-6 pt-5 border-t border-border/40">
      {/* ── Modern Header ── */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-brand/10 border border-brand/20 text-brand-deep text-[11px] font-black uppercase tracking-[0.14em] font-mono shadow-xs">
            <Sparkles className="h-3 w-3 text-brand animate-pulse" />
            <span>Core Capabilities & Mother Skills</span>
          </span>
          <span className="text-[11px] font-medium text-muted-foreground hidden sm:inline font-sans">
            Asctro Interactive Optical Glass Spheres
          </span>
        </div>
        <span className="text-[10.5px] font-bold text-muted-foreground/75 uppercase tracking-wider font-mono select-none">
          Grab, Roll & Fling
        </span>
      </div>

      {/* ── Soft Neumorphic Inset Well (Matching Website Theme & Brand Mood) ── */}
      <div
        ref={containerRef}
        className="relative h-[190px] sm:h-[215px] w-full overflow-hidden rounded-[24px] sm:rounded-[28px] border border-border/80 cursor-grab active:cursor-grabbing select-none [contain:layout_paint]"
        style={{
          background: `
            radial-gradient(circle at 18% 70%, rgba(249, 115, 22, 0.22) 0%, transparent 60%),
            radial-gradient(circle at 82% 25%, rgba(245, 158, 11, 0.16) 0%, transparent 55%),
            radial-gradient(circle at 50% 95%, rgba(234, 88, 12, 0.14) 0%, transparent 65%),
            var(--surface)
          `,
          boxShadow: "var(--shadow-nm-inset-deep)",
        }}
        title="Interactive transparent optical glass lenses: grab, roll or fling"
      >
        {/* Subtle Soft Embossed Inset Glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.03] via-transparent to-black/[0.04] dark:from-black/20 dark:to-transparent" />

        {/* 12 asctro.com Interactive Glass Balls */}
        {MOTHER_SKILLS.map((skill, index) => {
          const diameter = skill.radius * 2;
          return (
            <div
              key={skill.id}
              ref={(el) => {
                elementsRef.current[index] = el;
              }}
              onMouseEnter={() => setActiveSkill(skill)}
              onMouseLeave={() => setActiveSkill(null)}
              className="absolute left-0 top-0 will-change-transform z-10 flex items-center justify-center rounded-full cursor-grab active:cursor-grabbing select-none group"
              style={{
                width: `${diameter}px`,
                height: `${diameter}px`,
              }}
              title={skill.name}
            >
              {/* ── Asctro Optical Glass Sphere (Responsive Light/Dark Neumorphic Specular) ── */}
              <div
                className="asctro-glass-ball relative flex h-full w-full items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105 pointer-events-none"
                style={{
                  width: `${diameter}px`,
                  height: `${diameter}px`,
                }}
              >
                {/* Crisp Contrast Branding (Adaptive to Light/Dark Mode + Brand Hover) */}
                <div className="relative z-10 flex items-center justify-center px-2">
                  {skill.renderLogo()}
                </div>
              </div>
            </div>
          );
        })}

        {/* ── Minimal Neumorphic Hover Card with Orange Accent ── */}
        {activeSkill && (
          <div className="pointer-events-none absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 rounded-full px-4 py-1.5 bg-surface/95 backdrop-blur-xl border border-border text-foreground shadow-lg nm-raised-sm animate-in fade-in zoom-in-95 duration-150">
            <span className="w-2 h-2 rounded-full inline-block bg-brand shadow-xs ring-2 ring-brand/40" />
            <span className="text-[12px] font-black uppercase tracking-wider font-mono text-brand-deep">
              {activeSkill.name}
            </span>
            <span className="text-[11px] text-muted-foreground font-medium border-l border-border pl-2.5 font-sans">
              {activeSkill.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
