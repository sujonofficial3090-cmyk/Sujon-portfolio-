import pf1 from "@/assets/pf-1.jpg";
import pf2 from "@/assets/pf-2.jpg";
import pf3 from "@/assets/pf-3.jpg";
import tommysListing from "@/assets/tommys-listing.png";
import applianceWorld from "@/assets/appliance-world.png";
import digitalDropify from "@/assets/digital-dropify.png";
import caterPsychiatry from "@/assets/cater-psychiatry.png";
import dieselRepair from "@/assets/diesel-repair.png";
import finseo from "@/assets/finseo.png";
import moritzDunkel from "@/assets/moritz-dunkel.png";

export type Project = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  liveUrl: string;
  overview: string;
  challenge: string;
  solution: string;
  features: string[];
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "appliance-world",
    title: "Appliance World — WooCommerce E-Commerce Store",
    category: "WooCommerce & E-Commerce",
    excerpt:
      "An eCommerce WooCommerce website built for Appliance World, featuring a structured product catalog, product categories, pricing, shopping functionality, and a streamlined online shopping experience for home appliances and electronics.",
    image: applianceWorld,
    liveUrl: "https://applianceworld.co.ug/",
    overview:
      "Appliance World LTD is a leading online store for electronics and home appliances based in Uganda. The platform provides a modern online shopping experience featuring real-time product search, categorized browsing (ACs, TVs, Washers & Dryers, Refrigerators, Microwaves, Audio), regional currency pricing (UGX), product quick-views, and streamlined shopping cart management.",
    challenge:
      "Showcasing a large inventory of electronics and home appliances with detailed technical specifications, variable pricing, high-resolution imagery, and quick-view popups while maintaining fast loading speeds and effortless mobile purchasing flows.",
    solution:
      "Developed a high-performance WordPress & WooCommerce storefront with customized product templates, categorized brand showcases (LG, Panasonic, etc.), interactive category navigation cards, instant search indexing, and a frictionless cart and checkout flow.",
    features: [
      "Structured product catalog & categorized browsing (ACs, TVs, Refrigerators, Audio)",
      "Real-time product pricing (UGX) & instant stock status indicators",
      "WooCommerce Quick View & detailed product specifications",
      "Interactive shopping cart, mini-cart drawer & secure checkout",
      "Multi-branch store location directory & customer service contact integration",
      "100% responsive eCommerce design optimized for mobile & desktop shoppers",
    ],
    stack: ["WordPress", "WooCommerce", "Woo QuickView", "PHP", "CSS3", "JavaScript"],
  },
  {
    slug: "tommys-real-estate",
    title: "Tommy's Real Estate Listing",
    category: "Property Listing & Real Estate",
    excerpt:
      "A premium real estate listing portal featuring advanced property search filters, agent directory, interactive galleries, and lead inquiry automation.",
    image: tommysListing,
    liveUrl: "https://www.tommys.co.nz/",
    overview:
      "Tommy's Real Estate is a leading property listing platform designed to showcase residential and commercial properties with rich multimedia, advanced parameter-based filtering, and instant inquiry workflows.",
    challenge:
      "Handling large catalogs of property listings with high-resolution photography, instant filter queries (by location, price range, bedrooms), and ensuring seamless mobile responsiveness.",
    solution:
      "Engineered a custom WordPress listing architecture utilizing Custom Post Types and ACF Pro, paired with AJAX facet filtering and optimized WebP media delivery for lightning-fast speeds.",
    features: [
      "Advanced property search with multi-parameter filter",
      "High-resolution interactive property gallery and virtual tour",
      "Agent profile directory and direct contact triggers",
      "Dynamic listing status badges (For Sale, Under Offer, Sold)",
      "Fully responsive layout optimized for mobile property seekers",
      "SEO schema markup tailored for real estate listings",
    ],
    stack: ["WordPress", "Elementor Pro", "Custom Post Types", "ACF Pro", "AJAX Filtering", "PHP", "CSS3"],
  },
  {
    slug: "digital-dropify",
    title: "Digital Dropify — High-Converting Landing Page",
    category: "Landing Page & Funnel Design",
    excerpt:
      "A high-converting digital products landing page built for Digital Dropify, featuring 1,000+ digital products catalog showcase, profit breakdowns, faceless video vaults, and seamless checkout funnels.",
    image: digitalDropify,
    liveUrl: "https://digitaldropify.com/",
    overview:
      "Digital Dropify is a high-converting digital eCommerce landing page engineered to sell turn-key digital products, PLR/MRR eBooks, Notion templates, and 10,000+ viral faceless video reels. The landing page is crafted with modern dark-mode glassmorphic aesthetics, psychological conversion triggers, interactive product vaults, and seamless checkout funnel integration to maximize digital sales.",
    challenge:
      "Structuring an extensive collection of 1,000+ digital products, video vaults, and PLR resources into an engaging, single-page sales funnel that educates visitors, establishes authority, overcomes objections, and converts cold ad traffic with zero friction and rapid loading speeds.",
    solution:
      "Designed and developed a conversion-focused landing page with modern dark UI styling, interactive product preview cards, video mockup showcases, multi-tier pricing/bundle comparisons, live social proof badges, and instant CTA buttons linked to high-converting checkout flows.",
    features: [
      "High-converting dark aesthetic landing page with animated visual badges",
      "1,000+ digital product library catalog & category breakdown showcase",
      "10,000+ Faceless viral video vault showcase & mockup preview cards",
      "PLR & MRR rebrandable license explanation & profit breakdown section",
      "Dynamic conversion triggers: social proof logos, earnings proof & FAQ accordion",
      "100% responsive, mobile-first design optimized for ad campaign traffic",
    ],
    stack: ["WordPress", "Elementor Pro", "Landing Page Funnel", "Stripe Checkout", "CSS3 Animations", "Responsive Design"],
  },
  {
    slug: "cater-psychiatry",
    title: "Cater Psychiatry — Healthcare & Telepsychiatry Services",
    category: "Healthcare & Medical Services",
    excerpt:
      "A premium medical practice website built for Cater Psychiatry (Dr. Sammy Khader, MD) in St. Charles, IL, featuring adult psychiatric care, telepsychiatry scheduling, insurance/pricing transparency, and HIPAA-compliant patient intake.",
    image: caterPsychiatry,
    liveUrl: "https://caterpsychiatry.com/",
    overview:
      "Cater Psychiatry provides personalized adult psychiatric care in Illinois, founded by Dr. Sammy Khader, MD. The platform is designed to provide thoughtful, personalized psychiatric treatment for ADHD, anxiety, depression, bipolar disorder, OCD, and insomnia, offering both in-person appointments in St. Charles and telepsychiatry across Illinois.",
    challenge:
      "Designing a warm, high-trust healthcare portal that balances clinical authority with patient comfort, providing transparent self-pay and insurance pricing ($279 initial evaluation / $175 follow-up), interactive FAQ accordions, and frictionless consultation booking.",
    solution:
      "Developed a high-performance WordPress & Elementor medical platform featuring doctor credentials, interactive symptom guides, patient testimonials, transparent pricing calculators, interactive clinic location mapping, and HIPAA-compliant appointment booking workflows.",
    features: [
      "Personalized psychiatric care & telepsychiatry booking throughout Illinois",
      "Transparent pricing display ($279 Initial Evaluation / $175 Follow-up)",
      "Comprehensive condition treatment guides (ADHD, Anxiety, Depression, OCD, Insomnia)",
      "Verified patient experience reviews & FAQ accordion answering key concerns",
      "Interactive St. Charles clinic location map & direct appointment scheduling",
      "100% responsive, accessible healthcare design optimized for mobile & desktop",
    ],
    stack: ["WordPress", "Elementor Pro", "Telehealth Booking", "PHP", "CSS3", "JavaScript", "Responsive Design"],
  },
  {
    slug: "diesel-repair",
    title: "205 Diesel Repair — Automotive & Truck Repair Services",
    category: "Automotive & Fleet Services",
    excerpt:
      "A heavy-duty automotive and diesel truck repair service website built for 205 Diesel Repair in Rockwall, TX, featuring semi-truck repairs, A/C & brake diagnostics, mobile roadside service booking, and Google review highlights.",
    image: dieselRepair,
    liveUrl: "https://205diesel.com/",
    overview:
      "205 Diesel Repair is a premier automotive and commercial truck repair facility located in Rockwall, Texas. The website is engineered to attract fleet managers, semi-truck drivers, and local vehicle owners with detailed service catalogs (Truck A/C, Brakes, Heavy Equipment, Diesel Pickup & Semi-Truck Repair), customer review showcases, and streamlined appointment scheduling.",
    challenge:
      "Organizing diverse mechanical services (heavy machinery, semi-trucks, pickup diesels, paint & bodywork) into an intuitive, conversion-focused mobile interface with emergency dispatch call buttons and interactive shop location mapping.",
    solution:
      "Developed a high-performance WordPress & Elementor service storefront with prominent emergency call triggers, structured repair service cards, embedded Google Maps, 5-star customer testimonial carousels, and an instant quote request intake form.",
    features: [
      "Comprehensive automotive & diesel truck repair showcase (Semi-Truck, Brakes, A/C, Paint & Body)",
      "Instant emergency call-to-action & roadside service request triggers",
      "Customer trust badges & 5-star verified Google Reviews integration",
      "Interactive Google Maps location embed for easy garage navigation in Rockwall, TX",
      "Custom service intake & quote estimation booking form",
      "100% mobile-responsive layout optimized for truck drivers on the go",
    ],
    stack: ["WordPress", "Elementor Pro", "Google Maps API", "PHP", "CSS3", "JavaScript", "Responsive Design"],
  },
  {
    slug: "finseo",
    title: "Finseo — AI Search Visibility & SaaS Platform",
    category: "AI SaaS / Business Website",
    excerpt:
      "Modern AI visibility SaaS platform website designed to help brands track, understand and improve how they appear across AI search and answer engines.",
    image: finseo,
    liveUrl: "https://www.finseo.ai/",
    overview:
      "Finseo is a next-generation AI search optimization and visibility SaaS platform engineered to help brands and enterprises monitor, analyze, and optimize how their products and brand citations appear across generative AI engines including ChatGPT, Claude, Perplexity, and Gemini.",
    challenge:
      "Presenting sophisticated AI visibility tracking analytics, prompt research tools, competitor benchmarking, and citation attribution pipelines within a sleek, high-trust SaaS interface designed for enterprise lead capture.",
    solution:
      "Designed and built a modern, high-performance SaaS marketing website with interactive prompt demonstrations, multi-platform integration directories, clear product architecture, enterprise pricing tiers, and seamless live demo booking workflows.",
    features: [
      "AI visibility & brand citation tracking across ChatGPT, Claude & Perplexity",
      "Interactive prompt research simulator & brand mention intelligence cards",
      "Comprehensive AI platforms integration directory (Shopify, WordPress, Webflow, HubSpot)",
      "Instant enterprise demo booking & lead qualification funnel",
      "Dark glassmorphic SaaS interface with high-contrast typography & subtle animations",
      "100% responsive, high-performance layout optimized for enterprise desktop and mobile",
    ],
    stack: ["WordPress", "Next.js / Headless", "Tailwind CSS", "Elementor Pro", "SaaS Analytics", "Responsive Design"],
  },
  {
    slug: "moritz-dunkel",
    title: "Moritz Dunkel — Agency & Design Portfolio Website",
    category: "Portfolio Website",
    excerpt:
      "A high-end creative agency portfolio and brand identity website for Moritz Dunkel (Dunkel Design / DNKLDSN) in Cologne, Germany, featuring interactive case studies, design client testimonials, and strategy consultation bookings.",
    image: moritzDunkel,
    liveUrl: "https://www.moritzdunkel.de/",
    overview:
      "Moritz Dunkel (Dunkel Design / DNKLDSN) is a premier branding and web design agency based in Cologne, Germany. The website is engineered to showcase high-impact visual identities, psychology-driven web design, marketing strategies, and client success stories for entrepreneurs, service providers, and brands.",
    challenge:
      "Structuring an extensive portfolio of design case studies, client reviews, FAQ accordions, and design packages into a bold, high-contrast visual layout that communicates creative excellence and drives high-value client project inquiries.",
    solution:
      "Developed a modern, performance-optimized WordPress agency platform with dynamic typography, dark/light contrast aesthetics, interactive project galleries, verified client video/text testimonials, and seamless consultation intake flows.",
    features: [
      "Bold, modern agency branding with dark & vibrant accent aesthetics",
      "Interactive case study portfolio & client project breakdown",
      "Client testimonials and 5-star Trustpilot review highlights",
      "Interactive design & branding FAQ accordion",
      "Direct strategy consultation intake & appointment calendar booking",
      "100% responsive, high-performance design optimized across desktop and mobile",
    ],
    stack: ["WordPress", "Elementor Pro", "ACF Pro", "PHP", "CSS3 Animations", "JavaScript", "Responsive Design"],
  },
  {
    slug: "aurora-fashion-store",
    title: "Aurora Fashion Store",
    category: "WooCommerce Development",
    excerpt:
      "A 1,200-product fashion store rebuilt on WooCommerce with a custom Elementor Pro theme and a two-step checkout.",
    image: pf1,
    liveUrl: "https://example.com/aurora",
    overview:
      "Aurora sells apparel across Bangladesh and the Middle East. The brand needed a WooCommerce store that could carry a large catalogue, run frequent campaigns and stay fast on mobile data.",
    challenge:
      "The legacy store ran on a bloated multipurpose theme with 46 plugins. Product pages took over 8 seconds to load and abandoned carts sat above 80 percent.",
    solution:
      "I rebuilt the storefront on a lightweight custom WordPress theme with Elementor Pro for campaign pages, trimmed the plugin stack to 11, moved product filtering to a server-rendered query and rewrote the checkout as a two-step flow.",
    features: [
      "Custom WooCommerce product filtering with AJAX pagination",
      "Two-step checkout with saved addresses",
      "Elementor Pro campaign page templates for the marketing team",
      "Automated size-guide and stock-alert emails",
      "Fully responsive from 320px upward",
    ],
    stack: ["WordPress", "WooCommerce", "Elementor Pro", "PHP", "MySQL", "Cloudflare"],
  },
  {
    slug: "northbridge-consulting",
    title: "Northbridge Consulting",
    category: "Custom WordPress",
    excerpt:
      "A corporate website with a custom block library so the in-house team can build new pages without a developer.",
    image: pf2,
    liveUrl: "https://example.com/northbridge",
    overview:
      "Northbridge is a management consultancy that publishes case studies and insight articles every week. They wanted full editorial independence from their agency.",
    challenge:
      "Every content change required a developer ticket. Page layouts drifted apart because there was no shared component system.",
    solution:
      "I built a custom WordPress theme with a locked-down block library, custom post types for case studies and insights, and taxonomy-driven listing pages. Editors now assemble pages from approved blocks only.",
    features: [
      "12 custom Gutenberg blocks with brand-locked styling",
      "Case study and insight custom post types",
      "Team directory with filterable expertise tags",
      "Schema markup on every article",
      "Editorial preview workflow",
    ],
    stack: ["WordPress", "ACF Pro", "Custom Blocks", "PHP", "SCSS"],
  },
  {
    slug: "voltra-electronics",
    title: "Voltra Electronics",
    category: "Speed Optimization & Redesign",
    excerpt:
      "A marketplace redesign plus a deep performance pass that took Core Web Vitals from failing to green.",
    image: pf3,
    liveUrl: "https://example.com/voltra",
    overview:
      "Voltra runs an electronics marketplace with thousands of daily visitors. Rankings were slipping and the design felt dated next to competitors.",
    challenge:
      "Largest Contentful Paint sat at 6.4 seconds on mobile, the site failed Core Web Vitals, and the category pages were hard to scan.",
    solution:
      "I redesigned the category and product templates, replaced the slider-heavy homepage, converted all imagery to WebP with responsive sources, deferred non-critical scripts and added object caching.",
    features: [
      "LCP reduced from 6.4s to 1.6s on mobile",
      "Redesigned category and product templates",
      "WebP conversion with responsive srcsets",
      "Object caching and critical CSS inlining",
      "Sticky comparison bar across product listings",
    ],
    stack: ["WordPress", "WooCommerce", "Redis", "WebP", "Elementor"],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
