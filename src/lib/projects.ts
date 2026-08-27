import pf1 from "@/assets/pf-1.jpg";
import pf2 from "@/assets/pf-2.jpg";
import pf3 from "@/assets/pf-3.jpg";
import tommysListing from "@/assets/tommys-listing.png";

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
