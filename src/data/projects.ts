import pf1 from "@/assets/pf-1.jpg";
import pf2 from "@/assets/pf-2.jpg";
import pf3 from "@/assets/pf-3.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import office from "@/assets/office.jpg";
import tommysListing from "@/assets/tommys-listing.png";

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
    id: "tommys-real-estate",
    title: "Tommy's Real Estate Listing",
    category: "Property Listing & Real Estate",
    description: "A premium real estate listing portal featuring advanced property search filters, agent directory, interactive galleries, and lead inquiry automation.",
    img: tommysListing,
    overview: "Tommy's Real Estate is a leading property listing platform designed to showcase residential and commercial properties with rich multimedia, advanced parameter-based filtering, and instant inquiry workflows.",
    challenge: "Handling large catalogs of property listings with high-resolution photography, instant filter queries (by location, price range, bedrooms), and ensuring seamless mobile responsiveness.",
    solution: "Engineered a custom WordPress listing architecture utilizing Custom Post Types and ACF Pro, paired with AJAX facet filtering and optimized WebP media delivery for lightning-fast speeds.",
    features: [
      "Advanced property search with multi-parameter filter",
      "High-resolution interactive property gallery and virtual tour",
      "Agent profile directory and direct contact triggers",
      "Dynamic listing status badges (For Sale, Under Offer, Sold)",
      "Fully responsive layout optimized for mobile property seekers",
      "SEO schema markup tailored for real estate listings"
    ],
    techStack: ["WordPress", "Elementor Pro", "Custom Post Types", "ACF Pro", "AJAX Filtering", "PHP", "CSS3"],
    screenshots: [tommysListing, pf3, office],
    liveUrl: "https://tommys.co."
  },
  {
    id: "woocommerce-store",
    title: "WooCommerce Store",
    category: "eCommerce Store",
    description: "An elegant, high-conversion online store developed on WooCommerce with custom checkout flows and advanced product filtering.",
    img: pf2,
    overview: "An online fashion brand required a scalable eCommerce store capable of showcasing thousands of clothing items while keeping the checkout process quick and frictionless.",
    challenge: "Existing storefronts often struggle with load times when handling large catalogs, leading to cart abandonment. The brand also needed custom product filtering based on size, color, and fit.",
    solution: "Leveraged WooCommerce with Elementor Pro, setting up a fast AJAX-based product search and custom filter system. Configured high-performance hosting integration and page caching.",
    features: [
      "AJAX search and live filters",
      "One-page optimized checkout",
      "Multi-currency & localization support",
      "Automated inventory alert system",
      "Sales dashboard analytics integration"
    ],
    techStack: ["WordPress", "WooCommerce", "Elementor Pro", "Stripe Payment Gateway", "WP Rocket"],
    screenshots: [pf2, blog2, blog3],
    liveUrl: "https://sujonmia.github.io/woocommerce-store"
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
