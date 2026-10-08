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
import viknordisk from "@/assets/viknordisk.webp";
import pesaCarRental from "@/assets/pesa-car-rental.webp";

// 21 New Projects Assets
import elixirmark from "@/assets/elixirmark.webp";
import bridgewayDigital from "@/assets/bridgeway-digital.webp";
import versatileGroup from "@/assets/versatile-group.webp";
import truOutreach from "@/assets/tru-outreach.webp";
import crmspire from "@/assets/crmspire.webp";
import samasimGroup from "@/assets/samasim-group.webp";
import carryLogistics from "@/assets/carry-logistics.webp";
import processPk from "@/assets/process-pk.webp";
import ormSystems from "@/assets/orm-systems.webp";
import swarnDhaaga from "@/assets/swarn-dhaaga.webp";
import mamlakat from "@/assets/mamlakat.webp";
import dubaiCork from "@/assets/dubai-cork.webp";
import noorulainStudio from "@/assets/noorulain-studio.webp";
import fastlearnerAi from "@/assets/fastlearner-ai.webp";
import contractorsLiability from "@/assets/contractors-liability.webp";
import bexagro from "@/assets/bexagro.webp";
import guiderightCare from "@/assets/guideright-care.webp";
import anbgh from "@/assets/anbgh.webp";
import olaliSuites from "@/assets/olali-suites.webp";
import teutschTech from "@/assets/teutsch-tech.webp";
import skjoldService from "@/assets/skjold-service.webp";

export interface Project {
  id: string;
  title: string;
  category: "Service Website" | "WooCommerce" | "Landing Page" | "Plumbing Website" | "Business Website" | "Dynamic Content" | "WordPress" | string;
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
  // --- Service Websites ---
  {
    id: "elixirmark",
    title: "Elixirmark",
    category: "Service Website",
    role: "Senior WordPress Developer",
    whatIBuilt: "Full-scale corporate agency platform showcasing strategic digital marketing, brand acceleration, and creative advisory services.",
    description: "Built and optimized a modern agency service platform with conversion-driven layouts and responsive WordPress architecture.",
    img: elixirmark,
    overview: "Elixirmark is a cutting-edge digital agency dedicated to brand positioning, performance marketing, and digital growth strategies for international companies.",
    challenge: "Creating a bold visual identity that loads in under 1.5 seconds while delivering high conversion triggers and interactive case study showcases.",
    solution: "Engineered a fast Elementor Pro & custom CSS WordPress solution with fluid typography, responsive layout containers, and optimized image delivery.",
    features: [
      "Custom service catalog with high-conversion inquiry funnels",
      "Interactive consultation scheduling and lead capture",
      "Ultra-fast core web vitals and speed optimization",
      "Dynamic client testimonials and brand proof sections",
      "100% mobile-responsive layout across all devices"
    ],
    techStack: ["WordPress", "Elementor Pro", "Custom CSS", "PHP", "Performance & SEO"],
    screenshots: [elixirmark, pf1, office],
    liveUrl: "https://elixirmark.com/"
  },
  {
    id: "bridgeway-digital",
    title: "Bridgeway Digital",
    category: "Service Website",
    role: "WordPress Developer",
    whatIBuilt: "360° digital agency website highlighting performance marketing, Amazon growth management, and enterprise branding.",
    description: "Developed a comprehensive digital agency website featuring structured service breakdowns and ROI-focused client funnels.",
    img: bridgewayDigital,
    overview: "Bridgeway Digital is a 360-degree digital marketing and Amazon service agency delivering multi-channel growth campaigns and enterprise eCommerce solutions.",
    challenge: "Structuring intricate multi-tier agency services (SEO, PPC, Amazon, Creative) into an intuitive, easily scannable user experience.",
    solution: "Implemented structured service cards, clean interactive tabbed navigation, and frictionless contact touchpoints with custom WordPress templates.",
    features: [
      "360° service directory for Amazon, performance ads, and web design",
      "Free proposal intake and audit questionnaire",
      "Proven case study metrics and verified client ROI counters",
      "Interactive animated service cards with smooth transitions",
      "Cross-browser and cross-device verified responsiveness"
    ],
    techStack: ["WordPress", "Elementor Pro", "Responsive Design", "PHP", "CSS3"],
    screenshots: [bridgewayDigital, pf2, office],
    liveUrl: "https://bridgewaydigital.com/"
  },
  {
    id: "versatile-group",
    title: "Versatile Group UAE",
    category: "Service Website",
    role: "WordPress & Frontend Developer",
    whatIBuilt: "Corporate website for a leading Dubai sustainable building, timber engineering, and architectural pool construction firm.",
    description: "Engineered a sustainable construction corporate portal with project showcases, architectural solutions, and Dubai-standard compliance.",
    img: versatileGroup,
    overview: "Versatile Group provides eco-friendly building materials, advanced mass timber engineering, luxury pool construction, and BIM services across Dubai and the MENA region.",
    challenge: "Reflecting high-end Dubai luxury and architectural credibility while organizing complex technical engineering specifications.",
    solution: "Built a visually stunning, image-rich WordPress corporate platform with modern layouts, sleek micro-interactions, and fast media loading.",
    features: [
      "Sustainable architecture and timber engineering showcases",
      "Luxury pool design and BIM modeling project galleries",
      "Bilingual-ready corporate layout tailored for UAE enterprise clients",
      "Interactive quote and tender inquiry submission workflows",
      "Clean mobile-first design with fluid responsive breakpoints"
    ],
    techStack: ["WordPress", "Elementor Pro", "Custom CSS", "Responsive Design", "PHP"],
    screenshots: [versatileGroup, pf1, office],
    liveUrl: "https://versatilegroup.ae/"
  },
  {
    id: "tru-outreach",
    title: "Tru Outreach Inc.®",
    category: "Service Website",
    role: "WordPress Developer",
    whatIBuilt: "Compassionate mental health and wellness center portal featuring care programs, specialist consultations, and patient intake.",
    description: "Built an accessible mental health & wellness platform focused on clinical authority, easy navigation, and secure inquiries.",
    img: truOutreach,
    overview: "Tru Outreach Inc.® provides holistic mental health therapy, counseling, and community wellness programs designed to empower individuals and families.",
    challenge: "Designing a soothing, reassuring healthcare web presence that strictly adheres to accessibility principles and enables confidential inquiries.",
    solution: "Crafted a tranquil color palette, readable typography hierarchy, clear program guides, and an intuitive confidential intake booking form.",
    features: [
      "Specialized clinical therapy and counseling service catalog",
      "Patient care guides, intake resources, and wellness blog",
      "Confidential consultation scheduling and direct contact hotline",
      "Accessible typography and ADA-compliant contrast ratios",
      "Responsive layout optimized for mobile and desktop healthcare seekers"
    ],
    techStack: ["WordPress", "Elementor Pro", "Accessibility", "PHP", "CSS3"],
    screenshots: [truOutreach, pf2, office],
    liveUrl: "https://truoutreach.org/"
  },
  {
    id: "crmspire",
    title: "CRMSpire",
    category: "Service Website",
    role: "WordPress Developer",
    whatIBuilt: "Enterprise CRM consulting portal detailing Zoho integration, automated business workflows, and customized ERP solutions.",
    description: "Built an enterprise IT service website showcasing Zoho implementation, business automation, and custom software integrations.",
    img: crmspire,
    overview: "CRMSpire empowers growing enterprises by streamlining customer relationships, sales pipelines, and financial operations through certified Zoho consulting.",
    challenge: "Presenting complex SaaS architectures and CRM pipelines in a digestible, benefit-driven format that drives business consultation bookings.",
    solution: "Constructed structured service modules, comparison charts, client success testimonials, and an interactive discovery call scheduler.",
    features: [
      "Comprehensive Zoho CRM, Creator, Books, and Analytics service matrix",
      "Custom workflow automation case studies and process diagrams",
      "Interactive enterprise audit and discovery session scheduler",
      "Lead scoring and integrated CRM contact webhook forms",
      "High-speed performance optimized for global corporate clients"
    ],
    techStack: ["WordPress", "Elementor Pro", "Zoho Integrations", "PHP", "Responsive Design"],
    screenshots: [crmspire, pf1, office],
    liveUrl: "https://crmspire.com/"
  },
  {
    id: "samasim-group",
    title: "Samasim Group",
    category: "Service Website",
    role: "Senior WordPress Developer",
    whatIBuilt: "International agricultural commodity supply chain portal managing sourcing, logistics, and global export operations.",
    description: "Built a 25-year legacy agricultural commodity trading website showcasing farm sourcing, logistics, and international export operations.",
    img: samasimGroup,
    overview: "With over 25 years of market leadership, Samasim Group manages entire agricultural commodity supply chains, exporting Sesame, Chickpeas, Hibiscus, and Peanuts worldwide.",
    challenge: "Conveying international corporate authority and multi-national trade logistics across complex commodity product specifications.",
    solution: "Designed an authoritative corporate layout featuring high-impact commodity galleries, global shipping maps, and direct tender request workflows.",
    features: [
      "Agricultural commodity catalog (Sesame, Chickpeas, Gum Arabic, Peanuts)",
      "Farm-to-port supply chain transparency breakdown",
      "International buyer tender and bulk quote inquiry forms",
      "Company timeline and 25-year milestone showcase",
      "Fully responsive multi-device design with fast global CDN caching"
    ],
    techStack: ["WordPress", "Elementor Pro", "PHP", "Custom Typography", "SEO"],
    screenshots: [samasimGroup, pf3, office],
    liveUrl: "https://samasimgroup.com/"
  },
  {
    id: "carry-logistics",
    title: "Carry Logistics UAE",
    category: "Service Website",
    role: "WordPress Developer",
    whatIBuilt: "UAE freight forwarding and supply chain platform with multi-modal cargo tracking, air/sea freight options, and instant quote forms.",
    description: "Developed a modern logistics and freight forwarding website for the UAE market with service calculators and shipment request tools.",
    img: carryLogistics,
    overview: "Carry Logistics UAE provides reliable air, ocean, and overland freight, bonded warehousing, and customs brokerage for seamless international trade.",
    challenge: "Allowing shippers to quickly evaluate freight capabilities, request shipping quotes, and access logistics support with zero friction.",
    solution: "Built a dynamic freight portal with clear transportation mode cards, prominent WhatsApp and call triggers, and quick shipment inquiry forms.",
    features: [
      "Air, Sea, and Overland freight forwarding service showcases",
      "Warehousing, customs clearance, and cold-chain logistics breakdowns",
      "Instant freight rate inquiry and cargo specification intake",
      "Prominent emergency logistics dispatch triggers",
      "100% mobile-friendly responsive layout"
    ],
    techStack: ["WordPress", "Elementor Pro", "Responsive Design", "PHP", "CSS3"],
    screenshots: [carryLogistics, pf1, office],
    liveUrl: "https://carrylogistics-uae.com/"
  },
  {
    id: "process-pk",
    title: "Process Software Company",
    category: "Service Website",
    role: "WordPress Developer",
    whatIBuilt: "Software solutions and IT engineering portal showcasing bespoke web applications, mobile apps, and enterprise digital solutions.",
    description: "Built a modern tech agency platform for custom software development, mobile apps, and scalable digital solutions.",
    img: processPk,
    overview: "Process Software Company delivers custom enterprise software engineering, web application development, and strategic digital transformation.",
    challenge: "Demonstrating deep technical capabilities and modern software engineering expertise through clean, pixel-perfect web aesthetics.",
    solution: "Created a sleek dark-modern interface with tech stack pills, interactive agile methodology timelines, and client project consultation funnels.",
    features: [
      "Custom software engineering and agile development methodology breakdown",
      "Technology stack showcase (React, Node, Cloud, Mobile)",
      "Project estimator and technical discovery request form",
      "Client success stories and verified delivery milestones",
      "Modern animations and cross-device responsiveness"
    ],
    techStack: ["WordPress", "Elementor Pro", "Custom CSS", "PHP", "JavaScript"],
    screenshots: [processPk, pf2, office],
    liveUrl: "https://process.com.pk"
  },

  // --- WooCommerce Stores ---
  {
    id: "orm-systems",
    title: "ORM Systems",
    category: "WooCommerce",
    role: "WordPress & WooCommerce Developer",
    whatIBuilt: "Global IT hardware and enterprise networking eCommerce platform with extensive server catalogs and quote request systems.",
    description: "Built an enterprise IT hardware and networking eCommerce storefront with server component catalogs and quote calculation.",
    img: ormSystems,
    overview: "ORM Systems is an international enterprise IT hardware supplier offering Cisco networking gear, HP & Dell servers, storage solutions, and data center components.",
    challenge: "Handling complex enterprise hardware configurations with thousands of part numbers and variable multi-currency pricing.",
    solution: "Engineered a robust WooCommerce catalog with advanced attribute filtering, rapid SKU lookup, and direct corporate quote generation.",
    features: [
      "Extensive enterprise hardware catalog (Routers, Switches, Servers, Storage)",
      "Rapid part-number (SKU) search and compatibility filtering",
      "Corporate Request-For-Quote (RFQ) and bulk purchasing system",
      "Global warranty and certified hardware trust verification badges",
      "Responsive eCommerce catalog optimized for procurement teams"
    ],
    techStack: ["WordPress", "WooCommerce", "B2B Features", "PHP", "Custom Taxonomies"],
    screenshots: [ormSystems, pf1, office],
    liveUrl: "https://ormsystems.com/"
  },
  {
    id: "swarn-dhaaga",
    title: "Swarn Dhaaga",
    category: "WooCommerce",
    role: "WordPress & WooCommerce Developer",
    whatIBuilt: "Luxury handcrafted ethnic fashion storefront with rich fabric catalogs, size variants, and seamless online checkout.",
    description: "Developed a luxury ethnic fashion WooCommerce store featuring handcrafted apparel, elegant galleries, and streamlined checkout.",
    img: swarnDhaaga,
    overview: "Swarn Dhaaga is an exclusive ethnic wear and designer handcrafted fashion label delivering premium unstitched suits and festive apparel.",
    challenge: "Showcasing high-resolution fabric textures, intricate artisan embroidery, and variable sizing without sacrificing mobile page speeds.",
    solution: "Built a visual-first luxury eCommerce store with quick-view modals, color/size swatch selectors, and an optimized mobile cart drawer.",
    features: [
      "Designer ethnic wear catalog with fabric zoom and color swatches",
      "Dynamic size guides and variable pricing configuration",
      "Slide-out mini cart drawer with free shipping progress bar",
      "Secure payment gateway integration and automated order tracking",
      "Mobile-optimized luxury fashion boutique user experience"
    ],
    techStack: ["WordPress", "WooCommerce", "Elementor Pro", "Payment Gateways", "PHP"],
    screenshots: [swarnDhaaga, pf2, office],
    liveUrl: "https://swarndhaaga.com/"
  },
  {
    id: "mamlakat",
    title: "Mamlakat Perfumes",
    category: "WooCommerce",
    role: "WooCommerce & Frontend Developer",
    whatIBuilt: "Luxury Middle Eastern fragrance kingdom featuring amber, oud, and gourmand perfume collections with express UAE delivery.",
    description: "Crafted an opulent fragrance eCommerce storefront with olfactory note breakdowns, gift sets, and fast UAE checkout.",
    img: mamlakat,
    overview: "Mamlakat is a modern luxury fragrance brand based in Dubai, creating artisanal amber, floral, gourmand, and oud perfumes.",
    challenge: "Creating an evocative, sensory-driven shopping experience that communicates fragrance notes and luxury heritage effectively online.",
    solution: "Constructed an opulent, dark-gold aesthetic featuring olfactory pyramid breakdowns (top, heart, base notes) and free UAE shipping triggers.",
    features: [
      "Artisanal perfume showcase with detailed fragrance note pyramids",
      "Luxury gift wrapping and bundled discovery set options",
      "Real-time currency converter and express UAE shipping thresholds",
      "Streamlined one-page checkout reducing cart abandonment",
      "100% responsive design crafted for luxury smartphone shoppers"
    ],
    techStack: ["WordPress", "WooCommerce", "Custom Design", "PHP", "CSS3"],
    screenshots: [mamlakat, pf1, office],
    liveUrl: "https://www.mamlakat.com/"
  },
  {
    id: "dubai-cork",
    title: "Cork Padel Dubai",
    category: "WooCommerce",
    role: "WordPress & WooCommerce Developer",
    whatIBuilt: "Exclusive sports equipment eCommerce platform showcasing handcrafted cork padel rackets, racket bags, and specialized accessories.",
    description: "Built a premium sports eCommerce website for Cork Padel in Dubai with custom product specs and instant order workflows.",
    img: dubaiCork,
    overview: "Cork Padel Dubai is the official distributor of world-renowned patented cork padel rackets, engineered for anti-vibration performance and power.",
    challenge: "Educating players on unique cork acoustic and anti-vibration technology while enabling rapid direct online purchasing in the UAE.",
    solution: "Developed an energetic sports eCommerce experience with racket weight/balance specs, player reviews, and frictionless local delivery.",
    features: [
      "Premium cork padel racket catalog with weight & balance selectors",
      "Patented anti-vibration technology comparison breakdown",
      "Integrated product reviews from professional padel athletes",
      "Secure payment processing supporting UAE credit cards and Apple Pay",
      "Fast, responsive layout engineered for high mobile conversion"
    ],
    techStack: ["WordPress", "WooCommerce", "Payment Gateways", "PHP", "Responsive Design"],
    screenshots: [dubaiCork, pf3, office],
    liveUrl: "https://dubaicork.ae/"
  },

  // --- Landing Pages ---
  {
    id: "noorulain-studio",
    title: "xRD Studio (Noorulain)",
    category: "Landing Page",
    role: "WordPress & UI/UX Developer",
    whatIBuilt: "High-converting design agency landing page built for venture-backed startups and founders to launch apps and MVPs.",
    description: "Built a conversion-focused UI/UX design studio landing page for startups with case studies and interactive booking.",
    img: noorulainStudio,
    overview: "xRD Studio is a premier design agency crafting world-class digital product design, mobile app UI/UX, and scalable MVPs for global startups.",
    challenge: "Building a high-aesthetic, award-winning portfolio landing page that instantly communicates design caliber to venture founders.",
    solution: "Crafted interactive case study previews, fluid typography, social proof badges, and an integrated Calendly discovery booking flow.",
    features: [
      "High-impact startup portfolio showcases with interactive hover previews",
      "MVP sprint packages with transparent pricing deliverables",
      "Client testimonial wall featuring venture founders and tech executives",
      "Seamless discovery call scheduling integration",
      "Ultra-slick responsive performance with zero layout shift"
    ],
    techStack: ["WordPress", "Elementor Pro", "Figma to WordPress", "Custom Animations", "CSS3"],
    screenshots: [noorulainStudio, pf1, office],
    liveUrl: "https://www.noorulain.studio"
  },
  {
    id: "fastlearner-ai",
    title: "Fast Learner AI",
    category: "Landing Page",
    role: "WordPress & Frontend Developer",
    whatIBuilt: "Futuristic SaaS landing page showcasing an AI-enabled adaptive learning platform for students and corporate teams.",
    description: "Developed a futuristic AI education landing page with interactive feature breakdowns, product demos, and waitlist funnels.",
    img: fastlearnerAi,
    overview: "Fast Learner AI is an innovative educational platform combining expert human mentorship with adaptive artificial intelligence.",
    challenge: "Explaining complex AI cognitive algorithms through an engaging, approachable landing page that drives newsletter and trial signups.",
    solution: "Implemented modern dark-mode glassmorphism, dynamic AI workflow cards, interactive FAQ accordions, and quick onboarding forms.",
    features: [
      "AI-driven personalized curriculum interactive walkthrough",
      "Student and corporate enterprise feature comparison tabs",
      "Waitlist and beta tester registration funnel",
      "Live interactive platform demo preview modals",
      "Smooth micro-interactions and mobile-first responsive layout"
    ],
    techStack: ["WordPress", "Elementor Pro", "Glassmorphism UI", "PHP", "CSS3 Animations"],
    screenshots: [fastlearnerAi, pf2, office],
    liveUrl: "https://fastlearner.ai/"
  },

  // --- Plumbing & Specialty Business Websites ---
  {
    id: "contractors-liability",
    title: "Contractors Liability",
    category: "Service Website",
    role: "Senior WordPress Developer",
    whatIBuilt: "High-volume insurance quote engine for commercial contractors and plumbing professionals across all 50 US states.",
    description: "Developed a high-converting insurance quote platform comparing 18 carriers in under 3 minutes for commercial trade contractors.",
    img: contractorsLiability,
    overview: "Contractors Liability is a nationwide insurance agency licensed in all 50 states, having placed over 17,500 policies for plumbing and construction trades.",
    challenge: "Handling complex multi-step insurance quote intake forms while maintaining high completion rates and immediate policy bind options.",
    solution: "Engineered a rapid 3-minute comparison funnel across 18 insurance carriers with instant rate estimations and verified trust signals.",
    features: [
      "Multi-carrier insurance quote calculation engine across 18 carriers",
      "Trade-specific coverage options (Plumbing, General Contractors, Electrical)",
      "Instant certificate of insurance (COI) request workflows",
      "State-by-state license compliance guides and rate estimators",
      "100% secure, accessible, mobile-responsive layout"
    ],
    techStack: ["WordPress", "Custom Multi-Step Forms", "Elementor Pro", "PHP", "Speed Optimization"],
    screenshots: [contractorsLiability, pf1, office],
    liveUrl: "https://contractorsliability.com/"
  },
  {
    id: "bexagro",
    title: "BEX AGRO LTD",
    category: "Service Website",
    role: "WordPress Developer",
    whatIBuilt: "Agricultural technology and irrigation piping website featuring sustainable farming equipment and commercial supplies.",
    description: "Built an agro-technology corporate web platform showcasing commercial irrigation, plumbing systems, and modern farming solutions.",
    img: bexagro,
    overview: "BEX AGRO LTD specializes in modern agricultural supplies, commercial water irrigation piping, greenhouse plumbing, and agro-inputs.",
    challenge: "Structuring industrial irrigation products, pipe fittings, and agricultural services into a clear, catalog-style mobile experience.",
    solution: "Engineered clean product categorization, technical specification sheets, and a streamlined commercial inquiry quote form.",
    features: [
      "Commercial irrigation, pipe fittings, and agricultural supply directory",
      "Water management system design consultation inquiry form",
      "Product specification sheets and technical installation guides",
      "Corporate trust credentials and international supplier partnerships",
      "Mobile-optimized responsive design across all smartphones"
    ],
    techStack: ["WordPress", "Elementor Pro", "Responsive Design", "PHP", "CSS3"],
    screenshots: [bexagro, pf2, office],
    liveUrl: "https://bexagroltd.com/"
  },
  {
    id: "guideright-care",
    title: "Guide Right Care",
    category: "Service Website",
    role: "WordPress Developer",
    whatIBuilt: "Community healthcare and residential assistance portal providing compassionate care navigation and family support services.",
    description: "Built a warm, accessible healthcare and residential care website with intake scheduling and family support guides.",
    img: guiderightCare,
    overview: "Guide Right Care provides dedicated assisted living navigation, home healthcare resources, and community guidance for vulnerable families.",
    challenge: "Creating an accessible, heartwarming digital environment where family members can easily navigate care programs and get support.",
    solution: "Designed a clean, compassionate layout with large readable typography, clear program breakdowns, and direct contact options.",
    features: [
      "Residential care program overview and family consultation booking",
      "Caregiver resources, insurance guidelines, and admission criteria",
      "Direct phone and emergency care contact triggers",
      "Verified patient family testimonials and care standards",
      "Accessible, mobile-friendly design meeting healthcare standards"
    ],
    techStack: ["WordPress", "Elementor Pro", "Healthcare Accessibility", "PHP", "CSS3"],
    screenshots: [guiderightCare, pf1, office],
    liveUrl: "https://www.guideright.care/"
  },
  {
    id: "anbgh",
    title: "A New Beginning (ANBGH)",
    category: "Service Website",
    role: "WordPress Developer",
    whatIBuilt: "Specialized residential group home and healthcare portal featuring modern living accommodations and 24/7 resident support.",
    description: "Developed a residential group home website with facility showcases, resident support guides, and intake forms.",
    img: anbgh,
    overview: "A New Beginning Group Homes (ANBGH) offers structured, supportive residential environments, fostering independence and compassionate care.",
    challenge: "Demonstrating facility safety, cleanliness, and clinical support standards to caseworkers and family guardians.",
    solution: "Crafted interactive accommodation galleries, staff credential showcases, and a secure resident placement intake system.",
    features: [
      "Residential facility showcases with room amenities and safety standards",
      "Structured behavioral and daily living support program details",
      "Online referral submission form for caseworkers and guardians",
      "Licensing, compliance, and quality care assurance highlights",
      "100% responsive design tested across all screen resolutions"
    ],
    techStack: ["WordPress", "Elementor Pro", "Responsive Design", "PHP", "CSS3"],
    screenshots: [anbgh, pf3, office],
    liveUrl: "https://anbgh.org/"
  },
  {
    id: "olali-suites",
    title: "Olali Suites Migori",
    category: "Service Website",
    role: "WordPress Developer",
    whatIBuilt: "Hospitality and luxury suite website with room galleries, event hosting spaces, amenities guides, and reservation inquiries.",
    description: "Built a luxury hotel & executive suites destination website with room amenities, dining guides, and reservation booking.",
    img: olaliSuites,
    overview: "Olali Suites Migori is a premier executive hotel destination offering luxurious accommodations, conference facilities, and fine hospitality in Kenya.",
    challenge: "Providing prospective travelers and conference organizers with instant room rate clarity, virtual suite tours, and reservation requests.",
    solution: "Developed an elegant hospitality layout with high-resolution photography, detailed room amenities, and direct reservation funnels.",
    features: [
      "Executive suite showcases with room layout and luxury amenities guides",
      "Conference and banquet hall booking inquiry workflows",
      "Fine dining menu and local attraction guides",
      "Direct WhatsApp and phone booking triggers for travelers",
      "Mobile-first responsive architecture ensuring effortless booking"
    ],
    techStack: ["WordPress", "Elementor Pro", "Hotel Booking System", "PHP", "CSS3"],
    screenshots: [olaliSuites, pf1, office],
    liveUrl: "https://olalisuitesmigori.org/"
  },
  {
    id: "teutsch-tech",
    title: "Teutschtech EV Solutions",
    category: "Service Website",
    role: "WordPress Developer",
    whatIBuilt: "German smart electric vehicle charging and high-performance charging cable portal with interactive vehicle compatibility finder.",
    description: "Developed an EV charging technology portal featuring vehicle compatibility selector and high-performance cable catalog.",
    img: teutschTech,
    overview: "Teutschtech is a cutting-edge European EV infrastructure specialist providing premium type-2 charging cables and smart wallbox chargers.",
    challenge: "Helping EV drivers identify the exact charging cable specification required for their specific car make and model.",
    solution: "Built an intuitive vehicle finder selector, technical power specification cards (11kW / 22kW), and high-conversion order links.",
    features: [
      "Smart vehicle compatibility cable selector tool (Audi, Tesla, BMW, etc.)",
      "High-power 11kW & 22kW EV charging cable product directory",
      "IP55 waterproof and safety certificate badges",
      "Fast European ordering and express delivery tracking",
      "High-performance responsive design optimized for desktop and mobile"
    ],
    techStack: ["WordPress", "Elementor Pro", "Custom Selector Tool", "PHP", "CSS3"],
    screenshots: [teutschTech, pf2, office],
    liveUrl: "https://teutschtech.com/"
  },
  {
    id: "skjold-service",
    title: "Skjold Services",
    category: "Plumbing Website",
    role: "WordPress Developer",
    whatIBuilt: "Danish full-service renovation, property maintenance, and artisan trade platform covering plumbing, painting, and construction.",
    description: "Built a reliable Danish artisan and renovation website showcasing craftsmanship, plumbing, property repair, and quote requests.",
    img: skjoldService,
    overview: "Skjold Services provides reliable renovation, plumbing repairs, carpentry, and complete property upgrades for homeowners and businesses across Denmark.",
    challenge: "Highlighting reliable Nordic craftsmanship, transparent pricing, and rapid emergency repair dispatch across multiple trade disciplines.",
    solution: "Constructed an authentic Scandinavian design with structured renovation service packages, trust testimonials, and instant quote forms.",
    features: [
      "Full property renovation and plumbing repair service showcase",
      "Before-and-after project gallery showcasing Danish craftsmanship",
      "Online quote calculation and consultation intake form",
      "Emergency service hotline and rapid dispatch triggers",
      "100% mobile-responsive layout tailored for Danish property owners"
    ],
    techStack: ["WordPress", "Elementor Pro", "Responsive Design", "PHP", "CSS3"],
    screenshots: [skjoldService, pf1, office],
    liveUrl: "https://skjoldservice.nu"
  },
  {
    id: "viknordisk",
    title: "Viknordisk",
    category: "Service Website",
    role: "WordPress & Elementor Developer",
    whatIBuilt: "Full-scale corporate website for a Danish commercial cleaning, post-construction cleanup, and staffing recruitment company.",
    description: "Built a responsive WordPress website for a Danish cleaning and workforce recruitment firm with service catalogs and inquiry workflows.",
    img: viknordisk,
    overview: "Viknordisk is a premier commercial cleaning, post-construction cleanup, and staffing recruitment agency headquartered in Birkerød, Denmark. The platform delivers an intuitive overview of commercial facility cleaning, environmental compliance standards, and qualified personnel staffing across construction and logistics sectors nationwide.",
    challenge: "Combining dual service sectors (professional commercial cleaning alongside industrial staffing and recruitment) into a single, cohesive brand presentation with accessible service booking funnels for corporate clients across Denmark.",
    solution: "Engineered a high-performance WordPress website utilizing Elementor Pro and custom structured containers, showcasing transparent service breakdowns, trust signals, bilingual typography, and instant online quote request integration.",
    features: [
      "Commercial office and post-construction cleaning service showcase",
      "Staffing recruitment and workforce placement portal for Danish businesses",
      "Online quote calculation and consultation intake form",
      "Trust metrics and verified client satisfaction counters (250+ clients)",
      "Fully responsive, accessible design optimized for mobile and desktop"
    ],
    techStack: ["WordPress", "Elementor Pro", "ElementsKit", "Responsive Design", "PHP", "CSS3"],
    screenshots: [viknordisk, pf1, office],
    liveUrl: "https://viknordisk.nu"
  },

  // --- Previously Added Core Projects ---
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
    id: "pesa-car-rental",
    title: "Pesa Car Rental",
    category: "WooCommerce",
    role: "WordPress & WooCommerce Developer",
    whatIBuilt: "Car rental and fleet booking website with vehicle catalog, unit rate pricing, and online reservation inquiry forms.",
    description: "Developed a modern car rental platform featuring vehicle inventory showcases, unit pricing, and streamlined reservation workflows.",
    img: pesaCarRental,
    overview: "Pesa Car Rental is an independent car rental service based in California providing affordable and convenient vehicle rentals. The web application allows travelers, rideshare drivers, and business clients to explore available vehicle fleets, compare fuel economy and rental rates, and book reservations seamlessly.",
    challenge: "Presenting a diverse fleet of rental vehicles (sedans, SUVs, family vans) with transparent unit pricing, vehicle specifications, and prominent call-to-actions while maintaining high conversion rates across mobile devices.",
    solution: "Created an eye-catching, responsive WordPress car rental portal featuring interactive vehicle fleet cards, rate indicators, trust highlights, client testimonials, and a simplified reservation inquiry funnel.",
    features: [
      "Categorized vehicle fleet showcase with specifications (MPG, Transmission)",
      "Transparent unit pricing breakdown and instant reservation triggers",
      "Customer trust signals, service guarantees, and video showcase section",
      "Verified client testimonials and travel review highlights",
      "Mobile-optimized responsive booking flow for travelers on the go"
    ],
    techStack: ["WordPress", "WooCommerce", "Car Rental Booking", "Responsive Design", "PHP", "CSS3"],
    screenshots: [pesaCarRental, pf2, office],
    liveUrl: "https://www.pesacarrental.com/"
  },
  {
    id: "tommys-real-estate",
    title: "Tommy's Real Estate Listing",
    category: "Business Website",
    role: "WordPress Developer",
    whatIBuilt: "Premier real estate listing platform featuring advanced property search filters, interactive virtual tours, and agent inquiry automation.",
    description: "Built and customized a responsive WordPress website focused on usability, performance and business requirements.",
    img: tommysListing,
    overview: "Tommy's Real Estate is a leading property listing platform designed to showcase residential and commercial properties with rich multimedia, advanced parameter-based filtering, and instant inquiry workflows.",
    challenge: "Handling large catalogs of property listings with high-resolution photography, instant filter queries (by location, price range, bedrooms), and ensuring seamless mobile responsiveness.",
    solution: "Engineered a custom WordPress listing architecture utilizing Custom Post Types and ACF Pro, paired with AJAX facet filtering and optimized WebP media delivery for lightning-fast speeds.",
    features: [
      "Advanced property search with multi-parameter filter",
      "High-resolution interactive property gallery and virtual tour",
      "Agent profile directory and direct contact triggers",
      "Dynamic listing status badges (For Sale, Under Offer, Sold)",
      "Fully responsive layout optimized for mobile property seekers"
    ],
    techStack: ["WordPress", "Elementor Pro", "Custom Post Types", "ACF Pro", "AJAX Filtering", "PHP", "CSS3"],
    screenshots: [tommysListing, pf1, office],
    liveUrl: "https://www.tommys.co.nz/"
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
    id: "salvaje-group",
    title: "AMOR — Downtown Dubai Speakeasy",
    category: "Business Website",
    role: "WordPress & Frontend Developer",
    whatIBuilt: "Exclusive luxury speakeasy nightclub website in Downtown Dubai, featuring world-class mixology, international DJ headliners, and online reservation workflows.",
    description: "Designed and engineered a high-impact luxury nightlife web application with event showcases, cocktail mixology highlights, and VIP booking funnels.",
    img: salvajeGroup,
    overview: "AMOR is a premier speakeasy nightclub situated in the heart of Downtown Dubai right next to Dubai Opera & Burj Khalifa. Developed for Salvaje Group Dubai, the platform showcases bespoke nightlife events, curated mixology, house-driven DJ vibes, interactive event galleries, and instant table booking integrations.",
    challenge: "Capturing the dark, sensual luxury atmosphere of Downtown Dubai's elite nightlife while building a fast, responsive event management and reservation intake portal for high-profile international guests.",
    solution: "Designed and engineered a high-impact, dark-themed luxury web application with immersive event showcases, cocktail mixology highlights, interactive Google Maps location widgets, and instant WhatsApp / online table booking funnels.",
    features: [
      "Dark luxury speakeasy branding with high-contrast typography & vibrant red accent aesthetics",
      "Interactive weekly event showcase ('Prohibido', 'Midnight by Amor', 'Favela Disco')",
      "Instant table booking & VIP reservation intake via direct WhatsApp and booking forms",
      "Integrated location map & operating schedule widget for Downtown Dubai Opera location",
      "Dynamic photo gallery showcasing venue ambiance, DJ performances, and mixology",
      "100% mobile-responsive, fast-loading design optimized across all mobile devices"
    ],
    techStack: ["WordPress", "Elementor Pro", "JavaScript", "PHP", "CSS3 Animations", "Google Maps API", "Responsive Design"],
    screenshots: [salvajeGroup, pf1, office],
    liveUrl: "https://salvajegroupdubai.com/"
  },
  {
    id: "moritz-dunkel",
    title: "Moritz Dunkel Portfolio",
    category: "Dynamic Content",
    role: "WordPress & Elementor Developer",
    whatIBuilt: "High-end creative agency portfolio and brand identity website for Moritz Dunkel in Cologne, Germany, featuring interactive case studies, design client testimonials, and strategy consultation bookings.",
    description: "Developed a modern, performance-optimized WordPress agency platform with dynamic typography, dark/light contrast aesthetics, interactive project galleries, and verified client testimonials.",
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
    id: "emodula",
    title: "Emodula — Modular Buildings",
    category: "WordPress",
    role: "WordPress & Elementor Developer",
    whatIBuilt: "Corporate modular construction and sustainable architecture portal showcasing modern healthcare, data center, and educational building systems.",
    description: "Built a responsive, compliance-led corporate WordPress website showcasing permanent modular buildings, certifications, and technical delivery.",
    img: emodula,
    overview: "Emodula is a modern modular construction specialist delivering high-performance permanent modular buildings across healthcare, data centers, and commercial hubs. The platform highlights sustainable building standards, ISO certifications, and end-to-end turnkey project delivery.",
    challenge: "Communicating heavy-duty industrial compliance, ISO quality certifications, and multi-sector building solutions within an authoritative, easily digestible corporate layout.",
    solution: "Engineered a sleek, responsive WordPress website with structured sector cards, delivery timeline walkthroughs, technical case studies, and enterprise inquiry funnels.",
    features: [
      "Permanent modular buildings showcase with compliance-led approach hero section",
      "ISO 9001:2015, ISO 14001, ISO 45001 & BOPAS certification display",
      "Multi-sector project browser: Healthcare, Data Centres, Hub Systems, EV Charging",
      "'How Emodula Works' 5-step delivery process walkthrough",
      "Governance, assurance and buyer confidence section with project imagery",
      "100% responsive dark-themed corporate design with high-impact CTAs"
    ],
    techStack: ["WordPress", "Elementor Pro", "PHP", "CSS3", "JavaScript", "Responsive Design"],
    screenshots: [emodula, pf2, office],
    liveUrl: "https://emodula.org"
  }
];

export const PROJECTS_CLASSIC: Project[] = PROJECTS;
