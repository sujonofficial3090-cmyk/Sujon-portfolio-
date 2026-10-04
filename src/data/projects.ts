import pf1 from "@/assets/pf-1.jpg";
import pf2 from "@/assets/pf-2.jpg";
import pf3 from "@/assets/pf-3.jpg";
import office from "@/assets/office.jpg";
import tommysListing from "@/assets/tommys-listing.webp";
import applianceWorld from "@/assets/appliance-world.webp";
import montgomeryInn from "@/assets/montgomery-inn.webp";
import caterPsychiatry from "@/assets/cater-psychiatry.webp";
import dieselRepair from "@/assets/diesel-repair.webp";
import salvajeGroup from "@/assets/salvaje-group.webp";
import moritzDunkel from "@/assets/moritz-dunkel.webp";
import globalMed from "@/assets/global-med.webp";
import emodula from "@/assets/emodula.webp";

export interface Project {
  id: string;
  title: string;
  category: "WordPress" | "WooCommerce" | "Business Website" | "Dynamic Content" | string;
  description: string;
  role: string;
  whatIBuilt: string;
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
    title: "Appliance World",
    category: "WooCommerce",
    role: "WordPress & WooCommerce Developer",
    whatIBuilt: "Full-scale WooCommerce online store with structured product catalog, responsive layouts, and streamlined shopping cart experience.",
    description: "Developed a WooCommerce website with product-focused layouts, responsive design and customized WordPress functionality.",
    img: applianceWorld,
    overview: "Appliance World is an online store for electronics and home appliances. The website provides a modern online shopping experience featuring product categories, real-time stock indicators, and streamlined shopping cart management.",
    challenge: "Showcasing a large inventory of electronics and home appliances with detailed specifications, variable pricing, and high-resolution imagery while maintaining fast mobile loading speeds.",
    solution: "Developed a responsive WooCommerce store with organized product categories, quick-view modals, and a frictionless checkout flow.",
    features: [
      "Structured product catalog and categorized browsing",
      "Product specifications and stock availability indicators",
      "Interactive shopping cart and secure checkout flow",
      "Category navigation cards for electronics and home appliances",
      "Responsive layout optimized for mobile and desktop shoppers"
    ],
    techStack: ["WordPress", "WooCommerce", "PHP", "CSS3", "JavaScript"],
    screenshots: [applianceWorld, pf2, office],
    liveUrl: "https://applianceworld.co.ug/"
  },
  {
    id: "clean-corp",
    title: "Clean Corp Canada",
    category: "Business Website",
    role: "WordPress Developer",
    whatIBuilt: "Corporate cleaning services website with structured service packages, client quote inquiry forms, and mobile-first responsiveness.",
    description: "Built and customized a responsive WordPress website focused on usability, performance and business requirements.",
    img: tommysListing,
    overview: "Clean Corp Canada is a commercial and residential cleaning services company. The website was developed to provide prospective clients with an easy-to-navigate overview of cleaning packages, service coverage, and direct quote requests.",
    challenge: "Designing a clear, trustworthy layout that highlights different commercial and residential cleaning packages with quick inquiry access for busy business clients.",
    solution: "Built and customized a responsive WordPress website with structured service cards, clear call-to-actions, and an interactive quote estimation form.",
    features: [
      "Commercial and residential cleaning service showcases",
      "Transparent service breakdown and package comparisons",
      "Online quote estimation and consultation intake form",
      "Customer testimonials and trust signals",
      "Fully responsive design optimized for mobile and desktop"
    ],
    techStack: ["WordPress", "Elementor Pro", "Responsive Design", "PHP", "CSS3"],
    screenshots: [tommysListing, pf1, office],
    liveUrl: "https://sujon-portfolio.vercel.app/"
  },
  {
    id: "montgomery-inn",
    title: "Montgomery Inn at Ingleside",
    category: "Business Website",
    role: "WordPress Developer",
    whatIBuilt: "Story-driven boutique inn and cottage website with room and suite displays, amenities highlights, and online booking inquiries.",
    description: "Built and customized a responsive WordPress website focused on usability, performance and business requirements.",
    img: montgomeryInn,
    overview: "Montgomery Inn at Ingleside is a boutique luxury inn and cottage destination located in Prince Edward Island, Canada. The website gives travelers an immersive overview of guest accommodations, local attractions, and direct reservation inquiries.",
    challenge: "Balancing heritage storytelling with modern hospitality booking requirements, ensuring guests can easily view room amenities, seasonal rates, and submit booking requests.",
    solution: "Developed a responsive boutique hotel website with high-resolution visual layouts, detailed suite amenities guides, and direct reservation workflows.",
    features: [
      "Boutique guest room and cottage accommodation showcases",
      "Detailed room amenities, layout specifications, and rate information",
      "Online booking inquiry and reservation scheduling workflows",
      "Local attraction guides and heritage storytelling presentation",
      "Mobile-first responsive architecture ensuring smooth mobile booking"
    ],
    techStack: ["WordPress", "Elementor Pro", "Booking System", "Responsive Design", "PHP"],
    screenshots: [montgomeryInn, pf1, office],
    liveUrl: "https://montgomeryinnatingleside.com/"
  },
  {
    id: "cater-psychiatry",
    title: "Cater Psychiatry",
    category: "Business Website",
    role: "WordPress Developer",
    whatIBuilt: "Professional healthcare and psychiatric services portal featuring doctor credentials, service guides, and appointment booking.",
    description: "Built and customized a responsive WordPress website focused on usability, performance and business requirements.",
    img: caterPsychiatry,
    overview: "Cater Psychiatry provides specialized psychiatric and telepsychiatry care. The platform is designed to provide clear treatment guides, transparent pricing information, and convenient appointment scheduling for patients.",
    challenge: "Creating a professional, accessible healthcare web presence that conveys clinical authority while allowing patients to navigate treatment options and book consultations easily.",
    solution: "Built and customized a responsive WordPress healthcare website with structured condition treatment pages, patient FAQ accordions, and online booking integration.",
    features: [
      "Detailed psychiatric condition and treatment guides",
      "Telepsychiatry and in-person consultation booking workflows",
      "Transparent pricing breakdown and patient resources",
      "Patient FAQ accordion answering common clinical questions",
      "Accessible, mobile-responsive layout meeting healthcare usability standards"
    ],
    techStack: ["WordPress", "Elementor Pro", "Responsive Design", "PHP", "CSS3"],
    screenshots: [caterPsychiatry, pf2, office],
    liveUrl: "https://caterpsychiatry.com/"
  },
  {
    id: "diesel-repair",
    title: "205 Diesel",
    category: "Business Website",
    role: "WordPress Developer",
    whatIBuilt: "Automotive and heavy-duty truck repair service website with service catalog, emergency call triggers, and quote request forms.",
    description: "Built and customized a responsive WordPress website focused on usability, performance and business requirements.",
    img: dieselRepair,
    overview: "205 Diesel is an automotive and commercial diesel truck repair facility. The website is engineered to help fleet managers and truck drivers find repair services, get emergency assistance, and schedule diagnostic appointments.",
    challenge: "Organizing a wide range of heavy-duty mechanical services into an intuitive mobile layout with prominent emergency contact triggers for drivers on the road.",
    solution: "Developed a high-performance WordPress website featuring structured repair service cards, emergency call buttons, shop location directions, and quick quote requests.",
    features: [
      "Complete diesel repair and automotive service directory",
      "Prominent emergency call and roadside assistance triggers",
      "Embedded map location and shop hours for easy garage navigation",
      "Service estimate intake form for quick customer inquiries",
      "Mobile-optimized layout designed for on-the-go commercial drivers"
    ],
    techStack: ["WordPress", "Elementor Pro", "Responsive Design", "PHP", "CSS3"],
    screenshots: [dieselRepair, pf1, office],
    liveUrl: "https://205diesel.com/"
  },
  {
    id: "digital-dropify",
    title: "Digital Dropify",
    category: "WooCommerce",
    role: "WordPress & WooCommerce Developer",
    whatIBuilt: "Digital product and eCommerce platform with seamless checkout, payment integration, and responsive catalog browsing.",
    description: "Developed a WooCommerce website with product-focused layouts, responsive design and customized WordPress functionality.",
    img: salvajeGroup,
    overview: "Digital Dropify is an eCommerce platform built for digital products and online services. The website provides streamlined product discovery, instant digital downloads, and secure checkout processing.",
    challenge: "Building an automated digital delivery storefront with frictionless payment workflows, clean product cards, and instant post-purchase access.",
    solution: "Developed a custom WooCommerce setup with product-focused layouts, automated payment gateway integration, and responsive design across all devices.",
    features: [
      "Categorized digital product listings with clear feature highlights",
      "Frictionless WooCommerce cart drawer and secure checkout",
      "Automated digital product delivery and account management",
      "Payment gateway integration supporting multiple payment methods",
      "Fully responsive design optimized for high conversion"
    ],
    techStack: ["WordPress", "WooCommerce", "Elementor Pro", "Payment Systems", "PHP"],
    screenshots: [salvajeGroup, pf1, office],
    liveUrl: "https://sujon-portfolio.vercel.app/"
  },
  {
    id: "tima",
    title: "Tima",
    category: "Dynamic Content",
    role: "WordPress Developer",
    whatIBuilt: "Dynamic WordPress website with custom field architectures, relational data, and responsive layout presentation.",
    description: "Built dynamic WordPress functionality using Custom Post Types, dynamic content and custom fields.",
    img: moritzDunkel,
    overview: "Tima is a dynamic corporate web platform requiring tailored content architectures. The site leverages custom post types and relational meta fields to organize business information dynamically.",
    challenge: "Handling complex content structures and custom post relationships without sacrificing site speed or administrative ease-of-use.",
    solution: "Engineered dynamic WordPress functionality using Custom Post Types (CPT), JetEngine, and Advanced Custom Fields (ACF) to allow easy content management and modular display.",
    features: [
      "Custom Post Types (CPT) tailored to business data models",
      "Dynamic content templates and relational meta fields",
      "JetEngine listing grids with custom filter queries",
      "User-friendly WordPress backend for streamlined client editing",
      "Fast-loading, responsive frontend presentation"
    ],
    techStack: ["WordPress", "Elementor Pro", "JetEngine", "Custom Post Types", "ACF"],
    screenshots: [moritzDunkel, pf2, office],
    liveUrl: "https://sujon-portfolio.vercel.app/"
  },
  {
    id: "global-med",
    title: "Global Medus",
    category: "Business Website",
    role: "WordPress Developer",
    whatIBuilt: "Comprehensive medical and healthcare services platform with structured service pages, provider directory, and appointment inquiry.",
    description: "Built and customized a responsive WordPress website focused on usability, performance and business requirements.",
    img: globalMed,
    overview: "Global Medus is a healthcare and medical services platform designed to connect patients with comprehensive care options, specialist consultations, and healthcare resources.",
    challenge: "Presenting a broad spectrum of medical services and patient resources in an organized, trust-building design that is easy to navigate on mobile devices.",
    solution: "Built and customized a responsive WordPress healthcare website with structured service listings, doctor profile directories, and clear appointment booking inquiry forms.",
    features: [
      "Comprehensive medical service directory and clinical descriptions",
      "Specialist doctor profiles and practice area listings",
      "Patient resources portal with insurance and intake guidelines",
      "Direct appointment booking and telehealth consultation inquiry",
      "Responsive, accessible design optimized for patients and healthcare seekers"
    ],
    techStack: ["WordPress", "Elementor Pro", "Responsive Design", "PHP", "CSS3"],
    screenshots: [globalMed, pf1, office],
    liveUrl: "https://globalmedus.com"
  },
  {
    id: "finseo",
    title: "Finseo",
    category: "WordPress",
    role: "WordPress Developer",
    whatIBuilt: "Financial and SEO consulting website featuring clean layouts, conversion-focused sections, and fast performance optimization.",
    description: "Converted the provided Figma/PSD design into a responsive WordPress implementation using Elementor Pro.",
    img: emodula,
    overview: "Finseo is a professional financial and search engine optimization consulting agency. The website showcases advisory services, audit checklists, case results, and direct consultation scheduling.",
    challenge: "Accurately converting detailed Figma design mockups into a responsive, pixel-perfect WordPress website with high performance and on-page SEO foundations.",
    solution: "Converted approved Figma/PSD designs into a clean Elementor Pro implementation with optimized assets, clean semantic markup, and responsive breakpoints.",
    features: [
      "Pixel-perfect Figma to WordPress conversion with Elementor Pro",
      "Structured consulting service showcases and strategy breakdowns",
      "On-page SEO optimization with semantic HTML hierarchy",
      "Interactive consultation booking and project inquiry forms",
      "Cross-device responsiveness and fast load time performance"
    ],
    techStack: ["WordPress", "Elementor Pro", "Figma to WordPress", "SEO Optimization", "PHP"],
    screenshots: [emodula, pf2, office],
    liveUrl: "https://sujon-portfolio.vercel.app/"
  }
];

export const PROJECTS_CLASSIC: Project[] = PROJECTS;
