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
    id: "business-website",
    title: "Business Website",
    category: "Corporate Website",
    description: "A professional corporate website built using WordPress and Elementor for a consulting firm to capture leads and showcase services.",
    img: pf1,
    overview: "This project involved creating a high-performance corporate presence for a financial consulting firm. The main objective was to establish trust, clearly present their advisory services, and drive inbound consulting leads.",
    challenge: "The client's previous website was slow, failed to rank on search engines, and had a complex contact flow that resulted in high bounce rates and zero conversions.",
    solution: "I designed and developed a modern, custom WordPress theme using Elementor. I optimized the layout for speed and search engine visibility while streamlining the call-to-action paths into an intuitive intake form.",
    features: [
      "Custom responsive layout",
      "Interactive consultation scheduler",
      "Dynamic team member showcase",
      "SEO optimized layout & schema markup",
      "Fully integrated contact forms"
    ],
    techStack: ["WordPress", "Elementor Pro", "Yoast SEO", "CSS3"],
    screenshots: [pf1, office, blog1],
    liveUrl: "https://sujonmia.github.io/business-website"
  },
  {
    id: "car-rental",
    title: "Car Rental Website",
    category: "Booking System",
    description: "A fully functional car rental platform featuring real-time vehicle booking, dynamic pricing, and driver verification.",
    img: blog1,
    overview: "A regional vehicle rental company required an online system to replace manual bookings. Customers needed to check car availability, calculate rental costs, and upload documents.",
    challenge: "Creating a reliable booking calendar logic that prevents double bookings and applies dynamic pricing based on peak seasons and weekend rates.",
    solution: "Implemented WooCommerce Bookings with custom fields. Designed a clean, neumorphic scheduling dashboard for effortless booking management.",
    features: [
      "Dynamic pricing calculator",
      "Real-time booking calendar",
      "Driving license document uploader",
      "Automatic customer reminder emails",
      "Vehicle maintenance scheduling"
    ],
    techStack: ["WordPress", "WooCommerce Bookings", "Elementor Pro", "Mailchimp", "Bootstrap Grid"],
    screenshots: [blog1, pf1, pf2],
    liveUrl: "https://sujonmia.github.io/car-rental"
  },
  {
    id: "corporate-website",
    title: "Corporate Website",
    category: "Business Presence",
    description: "A secure, fast, and multi-language corporate site tailored for a global logistics and supply chain business.",
    img: blog2,
    overview: "This project delivered an online workspace for a global logistics provider, highlighting global shipping routes, tracking systems, and port details.",
    challenge: "Managing complex translations across 5 languages while maintaining identical performance standards and design aesthetics.",
    solution: "Built using WordPress Multisite and WPML, complete with optimized server-side translation caches and minimal plugin dependencies.",
    features: [
      "Multi-language switcher (WPML)",
      "Interactive global shipping map",
      "Real-time package tracker mockup",
      "Compliance document library",
      "Secure client portal portal login"
    ],
    techStack: ["WordPress", "WPML", "Elementor Pro", "Cloudflare Enterprise", "HTML5 & CSS3"],
    screenshots: [blog2, office, pf3],
    liveUrl: "https://sujonmia.github.io/corporate-website"
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    category: "Personal Brand",
    description: "A premium interactive portfolio website showcasing creative works with subtle neumorphic cards and smooth transitions.",
    img: blog3,
    overview: "A visual artist requested a gallery-first online archive to exhibit high-resolution digital illustrations and manage gallery inquiries.",
    challenge: "Serving large media formats without sacrificing mobile page speeds, ensuring images remain crisp on Retina displays.",
    solution: "Configured modern WebP image conversion and lazy loading protocols. Built custom lightboxes with zero layout shift.",
    features: [
      "High-resolution media galleries",
      "Fully responsive lightboxes",
      "Interactive project timelines",
      "Direct commission inquiry form",
      "Smooth micro-interactions on hover"
    ],
    techStack: ["WordPress", "Elementor Pro", "WebP Converter", "ACF Pro", "JavaScript"],
    screenshots: [blog3, pf2, blog1],
    liveUrl: "https://sujonmia.github.io/portfolio-website"
  },
  {
    id: "landing-page",
    title: "Landing Page",
    category: "Marketing Campaign",
    description: "A conversion-optimized SaaS product landing page focusing on customer lead capture, reviews, and dynamic pricing tables.",
    img: blog4,
    overview: "A product landing page designed to support a paid advertising campaign for a mobile productivity app, engineered to maximize conversion rates.",
    challenge: "Optimizing code to ensure the landing page loaded in under 1 second to minimize ad click bounce rates.",
    solution: "Developed with clean Tailwind classes and lightweight elements. Minified all stylesheets and eliminated heavy JS scripts.",
    features: [
      "Sub-second load times",
      "A/B tested CTA button placements",
      "Interactive toggle pricing table",
      "Embedded client video testimonials",
      "Direct CRM automation pipeline"
    ],
    techStack: ["WordPress", "Elementor", "Tailwind CSS", "HubSpot CRM Integration", "Autoptimize"],
    screenshots: [blog4, pf1, pf3],
    liveUrl: "https://sujonmia.github.io/landing-page"
  },
  {
    id: "service-company",
    title: "Service Company Website",
    category: "Service Industry",
    description: "A local services platform featuring local SEO optimization, service request quoting, and active review aggregation.",
    img: office,
    overview: "Created a local SEO-dominant website for a residential plumbing and HVAC company to rank in regional search queries.",
    challenge: "Targeting specific regional keywords and service structures across multiple service locations without duplicate page penalties.",
    solution: "Set up dynamic, geo-targeted landing templates utilizing ACF. Integrated active Google Reviews carousel to build local credibility.",
    features: [
      "Geo-targeted local service pages",
      "Dynamic service request quote builder",
      "Google Reviews real-time aggregator",
      "Emergency call-to-actions",
      "Service area coverage maps"
    ],
    techStack: ["WordPress", "Elementor", "Schema Pro", "Google My Business API", "RankMath Pro"],
    screenshots: [office, pf2, blog2],
    liveUrl: "https://sujonmia.github.io/service-company"
  }
];
