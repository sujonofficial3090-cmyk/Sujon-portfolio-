import pf1 from "@/assets/pf-1.jpg";
import pf2 from "@/assets/pf-2.jpg";
import pf3 from "@/assets/pf-3.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
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
    id: "montgomery-inn",
    title: "Montgomery Inn at Ingleside — Boutique Luxury Inn & Suites",
    category: "Hotel & Hospitality Website",
    description: "A picturesque boutique inn and cottage destination website located in Prince Edward Island, Canada, featuring Anne of Green Gables heritage, guest room & suite showcases, local tourism guides, and online booking workflows.",
    img: montgomeryInn,
    overview: "Montgomery Inn at Ingleside is a historic boutique inn and luxury cottage experience nestled in Prince Edward Island (Anne's Land). The website offers travelers and vacationers an immersive glimpse into boutique guest rooms, tranquil coastal landscapes, heritage dining, and streamlined reservation scheduling.",
    challenge: "Creating an elegant, story-driven hospitality website that honors the historic Anne of Green Gables legacy while providing clear room rate comparisons, amenities highlights, and smooth direct reservation booking.",
    solution: "Developed an aesthetically rich, responsive boutique hotel website with high-resolution visual storytelling, interactive suite & cottage galleries, area attraction guides, and direct reservation funnels.",
    features: [
      "Historic boutique inn & coastal cottage experience showcase",
      "Interactive guest suites, room amenities & rates breakdown",
      "Anne of Green Gables heritage storytelling & local PEI attractions guide",
      "Direct online booking & reservation inquiry workflow",
      "Guest reviews, verified testimonials & high-res visual photography galleries",
      "100% mobile-responsive layout optimized for travelers booking on mobile & desktop"
    ],
    techStack: ["WordPress", "Elementor Pro", "Hotel Booking System", "PHP", "CSS3 Animations", "Responsive Design"],
    screenshots: [montgomeryInn, pf1, office],
    liveUrl: "https://montgomeryinnatingleside.com/"
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
    id: "salvaje-group",
    title: "AMOR — Downtown Dubai Speakeasy & Nightclub",
    category: "Hospitality & Entertainment Website",
    description: "Exclusive luxury speakeasy nightclub website in Downtown Dubai, featuring world-class mixology, international DJ headliners, weekly night events, and online reservation workflows.",
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
  },
  {
    id: "global-med",
    title: "Global Med — US Healthcare & Medical Services Website",
    category: "Healthcare & Medical Services",
    description: "A professional healthcare and medical services website for Global Med (USA), featuring comprehensive medical service listings, patient resources, provider portals, telehealth integrations, and streamlined appointment booking.",
    img: globalMed,
    overview: "Global Med is a professional USA-based healthcare and medical services platform designed to connect patients with comprehensive medical care. The website features detailed service pages for Primary Care, Specialist Consultations, Telehealth, Lab Testing, Pharmacy, and Insurance guidance — all within a clean, trust-building, HIPAA-aligned design system.",
    challenge: "Presenting a wide range of medical services, patient resources, and insurance information in an approachable, professional layout that builds patient trust, ensures accessibility compliance, and drives appointment bookings across desktop and mobile devices.",
    solution: "Built a high-performance WordPress healthcare website with structured service pages, a patient-first navigation architecture, telehealth integration sections, transparent service listings, and clear call-to-action flows designed to maximize appointment conversion.",
    features: [
      "Comprehensive medical services showcase (Primary Care, Specialist, Telehealth, Lab Testing)",
      "Patient resources portal with insurance guidance and coverage information",
      "Provider directory with doctor profiles and specialty listings",
      "Telehealth virtual appointment booking integration",
      "HIPAA-aligned design with trust signals and patient testimonials",
      "100% responsive, accessible healthcare design optimized for mobile & desktop"
    ],
    techStack: ["WordPress", "Elementor Pro", "PHP", "CSS3", "JavaScript", "Responsive Design"],
    screenshots: [globalMed, pf1, office],
    liveUrl: "https://globalmedus.com"
  },
  {
    id: "emodula",
    title: "Emodula — Permanent Modular Buildings & Construction",
    category: "Construction & Real Estate",
    description: "A high-impact corporate website for Emodula, a UK-based permanent modular buildings company delivering compliance-led construction with ISO 9001, 14001 & 45001 certifications, covering healthcare, data centres, M&E systems and EV charging sectors.",
    img: emodula,
    overview: "Emodula is a leading UK permanent modular construction company delivering high-quality, compliance-led modular buildings across healthcare, data centres, hub systems, and EV charging infrastructure. The website is engineered to communicate Emodula's unique volumetric modular delivery approach, structured governance model, and BOPAS accreditation — building buyer confidence through transparency, certifications, and clear project pathways.",
    challenge: "Communicating complex construction compliance frameworks (BOPAS accreditation, PAS 2080, ISO 9001/14001/45001), multi-sector project capabilities, and a 5-step delivery methodology in a clean, authoritative web presence that builds buyer trust and drives project enquiries.",
    solution: "Designed and developed a bold, dark-themed corporate website with structured sector pages (Healthcare, Data Centres, Hub Systems, EV Charging), compliance & certification showcases, a clear 'How Emodula Works' 5-step process section, and high-converting contact and project enquiry forms.",
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
