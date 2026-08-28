import pf1 from "@/assets/pf-1.jpg";
import pf2 from "@/assets/pf-2.jpg";
import pf3 from "@/assets/pf-3.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import office from "@/assets/office.jpg";
import tommysListing from "@/assets/tommys-listing.png";
import applianceWorld from "@/assets/appliance-world.png";
import digitalDropify from "@/assets/digital-dropify.png";
import caterPsychiatry from "@/assets/cater-psychiatry.png";
import dieselRepair from "@/assets/diesel-repair.png";
import finseo from "@/assets/finseo.png";
import moritzDunkel from "@/assets/moritz-dunkel.png";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  img: string;
  overview: string;
  challenge: string;
  solution: string;
  features: string[];
  techStack: string[];
  screenshots: string[];
  liveUrl: string;
}

export const PROJECTS: Project[] = [
  {
    id: "appliance-world",
    title: "Appliance World — WooCommerce E-Commerce Store",
    category: "WooCommerce & E-Commerce",
    description: "An eCommerce WooCommerce website built for Appliance World, featuring a structured product catalog, product categories, pricing, shopping functionality, and a streamlined online shopping experience for home appliances and electronics.",
    img: applianceWorld,
    overview: "Appliance World LTD is a leading online store for electronics and home appliances based in Uganda. The platform provides a modern online shopping experience featuring real-time product search, categorized browsing (ACs, TVs, Washers & Dryers, Refrigerators, Microwaves, Audio), regional currency pricing (UGX), product quick-views, and streamlined shopping cart management.",
    challenge: "Showcasing a large inventory of electronics and home appliances with detailed technical specifications, variable pricing, high-resolution imagery, and quick-view popups while maintaining fast loading speeds and effortless mobile purchasing flows.",
    solution: "Developed a high-performance WordPress & WooCommerce storefront with customized product templates, categorized brand showcases (LG, Panasonic, etc.), interactive category navigation cards, instant search indexing, and a frictionless cart and checkout flow.",
    features: [
      "Structured product catalog & categorized browsing (ACs, TVs, Refrigerators, Audio)",
      "Real-time product pricing (UGX) & instant stock status indicators",
      "WooCommerce Quick View & detailed product specifications",
      "Interactive shopping cart, mini-cart drawer & secure checkout",
      "Multi-branch store location directory & customer service contact integration",
      "100% responsive eCommerce design optimized for mobile & desktop shoppers"
    ],
    techStack: ["WordPress", "WooCommerce", "Woo QuickView", "PHP", "CSS3", "JavaScript"],
    screenshots: [applianceWorld, pf2, office],
    liveUrl: "https://applianceworld.co.ug/"
  },
  {
    id: "tommys-real-estate",
    title: "Tommy's Real Estate",
    category: "Real Estate & Property Listing",
    description: "A modern real estate listing website for Wellington's market leader featuring property search filters, featured property showcases, agent directories, and client inquiry forms.",
    img: tommysListing,
    overview: "Tommy's Real Estate is a leading property agency website based in Wellington. The platform is designed to showcase residential and commercial property listings with multi-parameter search, featured property showcases, agent profile directories, and instant lead inquiry forms.",
    challenge: "Presenting high-resolution property photography, diverse property categories (For Sale, Featured Properties, Property Management), and multi-criteria search filters (Location, Price, Bedrooms) while ensuring fast load times and clean responsiveness on all devices.",
    solution: "Developed a structured WordPress real estate solution with custom post types for property listings, dynamic filter queries, responsive layout grids, and direct call-to-actions for property inquiries and agent contact.",
    features: [
      "Multi-parameter property search (Location, Price Range, Bedrooms)",
      "Featured property showcase with dynamic listing status badges",
      "Agent directory with direct contact and consultation booking",
      "Interactive property galleries and full-width media presentation",
      "Newsletter subscription for new listing alerts",
      "100% responsive design optimized for mobile, tablet, and desktop"
    ],
    techStack: ["WordPress", "Elementor", "Custom Post Types", "PHP", "CSS3", "JavaScript"],
    screenshots: [tommysListing, pf3, office],
    liveUrl: "https://www.tommys.co.nz/"
  },
  {
    id: "digital-dropify",
    title: "Digital Dropify — High-Converting Landing Page",
    category: "Landing Page & Funnel Design",
    description: "A conversion-optimized digital products landing page built for Digital Dropify, featuring 1,000+ digital products catalog showcase, profit breakdowns, faceless video vaults, and seamless checkout funnels.",
    img: digitalDropify,
    overview: "Digital Dropify is a high-converting digital eCommerce landing page engineered to sell turn-key digital products, PLR/MRR eBooks, Notion templates, and 10,000+ viral faceless video reels. The landing page is crafted with modern dark-mode glassmorphic aesthetics, psychological conversion triggers, interactive product vaults, and seamless checkout funnel integration to maximize digital sales.",
    challenge: "Structuring an extensive collection of 1,000+ digital products, video vaults, and PLR resources into an engaging, single-page sales funnel that educates visitors, establishes authority, overcomes objections, and converts cold ad traffic with zero friction and rapid loading speeds.",
    solution: "Designed and developed a conversion-focused landing page with modern dark UI styling, interactive product preview cards, video mockup showcases, multi-tier pricing/bundle comparisons, live social proof badges, and instant CTA buttons linked to high-converting checkout flows.",
    features: [
      "High-converting dark aesthetic landing page with animated visual badges",
      "1,000+ digital product library catalog & category breakdown showcase",
      "10,000+ Faceless viral video vault showcase & mockup preview cards",
      "PLR & MRR rebrandable license explanation & profit breakdown section",
      "Dynamic conversion triggers: social proof logos, earnings proof & FAQ accordion",
      "100% responsive, mobile-first design optimized for ad campaign traffic"
    ],
    techStack: ["WordPress", "Elementor Pro", "Landing Page Funnel", "Stripe Checkout", "CSS3 Animations", "Responsive Design"],
    screenshots: [digitalDropify, pf1, office],
    liveUrl: "https://digitaldropify.com/"
  },
  {
    id: "cater-psychiatry",
    title: "Cater Psychiatry — Healthcare & Telepsychiatry Services",
    category: "Healthcare & Medical Services",
    description: "A premium medical practice website built for Cater Psychiatry (Dr. Sammy Khader, MD) in St. Charles, IL, featuring adult psychiatric care, telepsychiatry scheduling, insurance/pricing transparency, and HIPAA-compliant patient intake.",
    img: caterPsychiatry,
    overview: "Cater Psychiatry provides personalized adult psychiatric care in Illinois, founded by Dr. Sammy Khader, MD. The platform is designed to provide thoughtful, personalized psychiatric treatment for ADHD, anxiety, depression, bipolar disorder, OCD, and insomnia, offering both in-person appointments in St. Charles and telepsychiatry across Illinois.",
    challenge: "Designing a warm, high-trust healthcare portal that balances clinical authority with patient comfort, providing transparent self-pay and insurance pricing ($279 initial evaluation / $175 follow-up), interactive FAQ accordions, and frictionless consultation booking.",
    solution: "Developed a high-performance WordPress & Elementor medical platform featuring doctor credentials, interactive symptom guides, patient testimonials, transparent pricing calculators, interactive clinic location mapping, and HIPAA-compliant appointment booking workflows.",
    features: [
      "Personalized psychiatric care & telepsychiatry booking throughout Illinois",
      "Transparent pricing display ($279 Initial Evaluation / $175 Follow-up)",
      "Comprehensive condition treatment guides (ADHD, Anxiety, Depression, OCD, Insomnia)",
      "Verified patient experience reviews & FAQ accordion answering key concerns",
      "Interactive St. Charles clinic location map & direct appointment scheduling",
      "100% responsive, accessible healthcare design optimized for mobile & desktop"
    ],
    techStack: ["WordPress", "Elementor Pro", "Telehealth Booking", "PHP", "CSS3", "JavaScript", "Responsive Design"],
    screenshots: [caterPsychiatry, pf2, office],
    liveUrl: "https://caterpsychiatry.com/"
  },
  {
    id: "diesel-repair",
    title: "205 Diesel Repair — Automotive & Truck Repair Services",
    category: "Automotive & Fleet Services",
    description: "A heavy-duty automotive and diesel truck repair service website built for 205 Diesel Repair in Rockwall, TX, featuring semi-truck repairs, A/C & brake diagnostics, mobile roadside service booking, and Google review highlights.",
    img: dieselRepair,
    overview: "205 Diesel Repair is a premier automotive and commercial truck repair facility located in Rockwall, Texas. The website is engineered to attract fleet managers, semi-truck drivers, and local vehicle owners with detailed service catalogs (Truck A/C, Brakes, Heavy Equipment, Diesel Pickup & Semi-Truck Repair), customer review showcases, and streamlined appointment scheduling.",
    challenge: "Organizing diverse mechanical services (heavy machinery, semi-trucks, pickup diesels, paint & bodywork) into an intuitive, conversion-focused mobile interface with emergency dispatch call buttons and interactive shop location mapping.",
    solution: "Developed a high-performance WordPress & Elementor service storefront with prominent emergency call triggers, structured repair service cards, embedded Google Maps, 5-star customer testimonial carousels, and an instant quote request intake form.",
    features: [
      "Comprehensive automotive & diesel truck repair showcase (Semi-Truck, Brakes, A/C, Paint & Body)",
      "Instant emergency call-to-action & roadside service request triggers",
      "Customer trust badges & 5-star verified Google Reviews integration",
      "Interactive Google Maps location embed for easy garage navigation in Rockwall, TX",
      "Custom service intake & quote estimation booking form",
      "100% mobile-responsive layout optimized for truck drivers on the go"
    ],
    techStack: ["WordPress", "Elementor Pro", "Google Maps API", "PHP", "CSS3", "JavaScript", "Responsive Design"],
    screenshots: [dieselRepair, pf1, office],
    liveUrl: "https://205diesel.com/"
  },
  {
    id: "finseo",
    title: "Finseo — AI Search Visibility & SaaS Platform",
    category: "AI SaaS / Business Website",
    description: "Modern AI visibility SaaS platform website designed to help brands track, understand and improve how they appear across AI search and answer engines.",
    img: finseo,
    overview: "Finseo is a next-generation AI search optimization and visibility SaaS platform engineered to help brands and enterprises monitor, analyze, and optimize how their products and brand citations appear across generative AI engines such as ChatGPT, Claude, Perplexity, and Gemini.",
    challenge: "Presenting sophisticated AI visibility analytics, prompt research tools, competitor benchmarking, and citation attribution pipelines within a sleek, high-trust SaaS interface designed for enterprise lead capture.",
    solution: "Designed and built a modern, high-performance SaaS marketing website with interactive prompt demonstrations, multi-platform integration directories, clear product architecture, enterprise pricing tiers, and seamless live demo booking workflows.",
    features: [
      "AI visibility & brand citation tracking across ChatGPT, Claude & Perplexity",
      "Interactive prompt research simulator & brand mention intelligence cards",
      "Comprehensive AI platforms integration directory (Shopify, WordPress, Webflow, HubSpot)",
      "Instant enterprise demo booking & lead qualification funnel",
      "Dark glassmorphic SaaS interface with high-contrast typography & subtle animations",
      "100% responsive, high-performance layout optimized for enterprise desktop and mobile"
    ],
    techStack: ["WordPress", "Next.js / Headless", "Tailwind CSS", "Elementor Pro", "SaaS Analytics", "Responsive Design"],
    screenshots: [finseo, pf1, office],
    liveUrl: "https://www.finseo.ai/"
  },
  {
    id: "moritz-dunkel",
    title: "Moritz Dunkel — Agency & Design Portfolio Website",
    category: "Portfolio Website",
    description: "A high-end creative agency portfolio and brand identity website for Moritz Dunkel (Dunkel Design / DNKLDSN) in Cologne, Germany, featuring interactive case studies, design client testimonials, and strategy consultation bookings.",
    img: moritzDunkel,
    overview: "Moritz Dunkel (Dunkel Design / DNKLDSN) is a premier branding and web design agency based in Cologne, Germany. The website is engineered to showcase high-impact visual identities, psychology-driven web design, marketing strategies, and client success stories for entrepreneurs, service providers, and brands.",
    challenge: "Structuring an extensive portfolio of design case studies, client reviews, FAQ accordions, and design packages into a bold, high-contrast visual layout that communicates creative excellence and drives high-value client project inquiries.",
    solution: "Developed a modern, performance-optimized WordPress agency platform with dynamic typography, dark/light contrast aesthetics, interactive project galleries, verified client video/text testimonials, and seamless consultation intake flows.",
    features: [
      "Bold, modern agency branding with dark & vibrant accent aesthetics",
      "Interactive case study portfolio & client project breakdown",
      "Client testimonials and 5-star Trustpilot review highlights",
      "Interactive design & branding FAQ accordion",
      "Direct strategy consultation intake & appointment calendar booking",
      "100% responsive, high-performance design optimized across desktop and mobile"
    ],
    techStack: ["WordPress", "Elementor Pro", "ACF Pro", "PHP", "CSS3 Animations", "JavaScript", "Responsive Design"],
    screenshots: [moritzDunkel, pf2, office],
    liveUrl: "https://www.moritzdunkel.de/"
  }
];
