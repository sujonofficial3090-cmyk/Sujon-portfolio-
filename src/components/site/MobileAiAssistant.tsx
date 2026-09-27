import { useState, useRef, useEffect } from "react";
import {
  Bot,
  X,
  Send,
  Sparkles,
  ArrowRight,
  RefreshCw,
  MessageCircle,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  options?: { label: string; action: string }[];
  highlightAction?: {
    type: "whatsapp" | "contact" | "portfolio";
    label: string;
    url?: string;
  };
}

interface KnowledgeTopic {
  id: string;
  keywords: string[];
  patterns?: RegExp[];
  reply: string;
  options?: { label: string; action: string }[];
  highlightAction?: {
    type: "whatsapp" | "contact" | "portfolio";
    label: string;
    url?: string;
  };
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    sender: "bot",
    text: "👋 Assalamu Alaikum & Hello! I'm Sujon's AI Assistant.\n\nI can answer any questions about Sujon's WordPress development, pricing, 90+ speed guarantee, custom stores, and timelines. How can I assist you today?",
    time: "Just now",
    options: [
      { label: "💼 Services & Skills", action: "services" },
      { label: "💰 Pricing & Packages", action: "pricing" },
      { label: "⚡ 90+ Speed Guarantee", action: "speed" },
      { label: "🛍️ WooCommerce Stores", action: "ecommerce" },
      { label: "⏱️ Delivery Timeline", action: "timeline" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// PURE GREETING TOPICS (Triggered ONLY when user greets alone)
// ─────────────────────────────────────────────────────────────
const GREETING_TOPICS: KnowledgeTopic[] = [
  {
    id: "greeting_hi",
    keywords: ["hi", "hello", "hey", "hiya", "hlo", "helo", "halo", "hi there", "hello there", "good morning", "good evening", "good afternoon"],
    patterns: [/^(hi|hello|hey|hiya|helo|hlo|halo|hi there|hello there|good morning|good evening|good afternoon)[\s!?,.-]*$/i],
    reply:
      "Hello! 👋 Welcome to Sujon's portfolio!\n\nHow can I help you today? Are you looking to build a new website, optimize your site speed, or have a question about pricing? Feel free to tell me what you need! 😊",
    options: [
      { label: "💼 Build a New Website", action: "services" },
      { label: "⚡ Speed Up My Site (90+)", action: "speed" },
      { label: "💰 View Pricing Packages", action: "pricing" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
    highlightAction: {
      type: "whatsapp",
      label: "Chat with Sujon on WhatsApp",
      url: "https://wa.me/8801936711699",
    },
  },
  {
    id: "greeting_salam",
    keywords: ["salam", "assalam", "assalamu alaikum", "assalamualaikum", "slm", "সালাম", "আসসালামু আলাইকুম"],
    patterns: [/^(salam|assalam|assalamu alaikum|assalamualaikum|slm|সালাম|আসসালামু আলাইকুম)[\s!?,.-]*$/i],
    reply:
      "Walaikum Assalam Warahmatullah! 🌸 স্বাগতম!\n\nকেমন আছেন? আমি সুজনের পক্ষ থেকে আপনাকে সাহায্য করতে এখানে আছি। নতুন ওয়েবসাইট তৈরি, স্পিড অপটিমাইজেশন, নাকি অন্য কোনো বিষয়ে জানতে চাচ্ছেন?",
    options: [
      { label: "💰 খরচের বিবরণ (Pricing)", action: "pricing" },
      { label: "⚡ স্পিড অপটিমাইজেশন (90+)", action: "speed" },
      { label: "💼 সেবাসমূহ", action: "services" },
      { label: "💬 সরাসরি WhatsApp এ কথা বলুন", action: "whatsapp" },
    ],
    highlightAction: {
      type: "whatsapp",
      label: "WhatsApp-এ সরাসরি কথা বলুন",
      url: "https://wa.me/8801936711699",
    },
  },
  {
    id: "greeting_how_are_you",
    keywords: ["how are you", "kemon achen", "kemon acho", "how r u", "how are u", "valoo achen", "bhalo achen", "kemon"],
    patterns: [/^(kemon achen|kemon acho|how are you|how are u|how r u|valoo achen|bhalo achen)[\s!?,.-]*$/i, /\b(kemon achen|how are you|bhalo achen)\b/i],
    reply:
      "Alhamdulillah, I'm doing great! Thank you so much for asking. 😊\n\nHow are you doing today? What kind of website or project do you have in mind? I'm here to give you all the details!",
    options: [
      { label: "💼 Explore Services", action: "services" },
      { label: "💰 View Pricing Packages", action: "pricing" },
      { label: "⚡ Speed Guarantee (90+)", action: "speed" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "greeting_available",
    keywords: ["kew ki ache", "kew achen", "is anyone there", "anyone here", "live agent", "active naki", "kew asen", "available", "active"],
    patterns: [/\b(kew ki ache|kew achen|is anyone there|anyone here|live agent|active naki|kew asen)\b/i],
    reply:
      "Yes, I'm right here! 🟢 We are active and ready to assist you right now.\n\nSujon is currently taking new client projects. Tell me, how can I help you today?",
    options: [
      { label: "💼 I Need a New Website", action: "services" },
      { label: "⚡ I Need Speed Optimization", action: "speed" },
      { label: "🛠️ I Have a Broken Website", action: "bug_fixing" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
    highlightAction: {
      type: "whatsapp",
      label: "Chat with Sujon on WhatsApp",
      url: "https://wa.me/8801936711699",
    },
  },
  {
    id: "greeting_bhai",
    keywords: ["bhai", "bro", "brother", "vai", "vaia", "sir", "boss"],
    patterns: [/^(bhai|bro|brother|vai|vaia|sir|boss)[\s!?,.-]*$/i],
    reply:
      "Ji bolun! 😊 How can I help you?\n\nAre you looking to build a new website, fix bugs, or optimize your site speed? Tell me what you need, or we can chat directly on WhatsApp!",
    options: [
      { label: "💼 Services & Rates", action: "services" },
      { label: "💰 Pricing Packages", action: "pricing" },
      { label: "⚡ Speed Optimization", action: "speed" },
      { label: "💬 Message on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "greeting_thanks",
    keywords: ["thanks", "thank you", "dhonnobad", "thx", "shukriya", "onek dhonnobad"],
    patterns: [/\b(thanks|thank you|dhonnobad|thx|shukriya|onek dhonnobad)\b/i],
    reply:
      "You're very welcome! 😊 Always happy to assist you.\n\nFeel free to ask anytime, or if you'd like to discuss a project directly with Sujon, his WhatsApp is always open: +8801936711699!",
    options: [
      { label: "💼 Explore Other Services", action: "services" },
      { label: "💰 View Pricing", action: "pricing" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// SUBSTANTIVE SPECIFIC TOPICS (Evaluated FIRST with High Priority)
// ─────────────────────────────────────────────────────────────
const SPECIFIC_TOPICS: KnowledgeTopic[] = [
  {
    id: "ecommerce_pricing",
    keywords: ["ecommerce price", "woocommerce price", "shop cost", "store price", "online store cost", "ecommerce koto taka"],
    patterns: [/\b(ecommerce|woocommerce|online store|online shop)\b.*\b(price|pricing|cost|rate|how much|koto taka|khoroch|budget)\b/i, /\b(price|pricing|cost|how much|koto taka|khoroch)\b.*\b(ecommerce|woocommerce|online store|online shop)\b/i],
    reply:
      "🛍️ **WooCommerce Online Store Pricing**:\n\nA complete, conversion-focused online shop by Sujon typically ranges from **$400 to $1,200 (৳40,000 to ৳120,000)**:\n• **Starter Store (~$400–$600)**: Up to 25 products, mobile-first design, payment gateways (Stripe, PayPal, bKash, etc.), coupons, invoices.\n• **Full Advanced Store (~$700–$1,200)**: Unlimited products, multi-currency, variable attributes, stock alerts, speed-tuned, 30 days support.\n\n*All store builds include a video tutorial on how to add and manage products yourself!*",
    options: [
      { label: "📋 Start an eCommerce Project", action: "quote" },
      { label: "💬 Discuss on WhatsApp", action: "whatsapp" },
      { label: "⏱️ Delivery Timeline", action: "timeline" },
    ],
    highlightAction: {
      type: "whatsapp",
      label: "Discuss eCommerce on WhatsApp",
      url: "https://wa.me/8801936711699",
    },
  },
  {
    id: "speed_pricing",
    keywords: ["speed price", "speed cost", "optimize cost", "speed optimization price", "speed koto taka"],
    patterns: [/\b(speed|slow|pagespeed|gtmetrix|optimize)\b.*\b(price|pricing|cost|rate|how much|koto taka|khoroch)\b/i, /\b(price|pricing|cost|how much|koto taka|khoroch)\b.*\b(speed|slow|pagespeed|gtmetrix|optimize)\b/i],
    reply:
      "⚡ **WordPress Speed Optimization Pricing (90+ Score Guaranteed)**:\n\nSujon's speed optimization fee is **$50 to $150 (৳5,000 to ৳15,000)** based on site size:\n• **Standard Business / Blog Site**: **$50 – $80**\n• **WooCommerce / Dynamic Portal**: **$90 – $150**\n\n**Includes:**\n✔ Guaranteed 90+ PageSpeed on Mobile & Desktop\n✔ GTmetrix Grade A with < 1.5s load time\n✔ Core Web Vitals (LCP, FID, CLS) Pass\n✔ Delivered in **24 to 48 hours** with 100% money-back guarantee!",
    options: [
      { label: "🚀 Speed Up My Site Now", action: "quote" },
      { label: "💬 Message on WhatsApp", action: "whatsapp" },
    ],
    highlightAction: {
      type: "whatsapp",
      label: "Get Free Speed Audit on WhatsApp",
      url: "https://wa.me/8801936711699",
    },
  },
  {
    id: "pricing",
    keywords: [
      "price",
      "pricing",
      "cost",
      "rate",
      "budget",
      "how much",
      "fee",
      "charge",
      "koto taka",
      "khoroch",
      "rate koto",
      "dam",
      "budget koto",
      "pricing koto",
      "rates",
    ],
    patterns: [/\b(price|pricing|cost|how much|rate|koto taka|budget|charge|khoroch|package)\b/i],
    reply:
      "💰 **Transparent Pricing & Packages**:\n\n1. **High-Converting Landing Page**: ~$80 – $200 (৳8,000 – ৳20,000)\n   • 1–3 days delivery, responsive, speed-optimized.\n\n2. **Business / Corporate Website**: ~$250 – $600 (৳25,000 – ৳65,000)\n   • 5–10 pages, modern UI, SEO ready, blog, contact forms.\n\n3. **Full WooCommerce eCommerce Store**: ~$400 – $1,200 (৳40,000 – ৳120,000)\n   • Product variations, payment gateways (Stripe, PayPal, bKash, etc.), coupons, invoices.\n\n4. **WordPress Speed Optimization**: ~$50 – $150 (৳5,000 – ৳15,000)\n   • Guaranteed 90+ score on Mobile & Desktop, GTmetrix Grade A.\n\n5. **Bug Fixing & Malware Cleanup**: ~$30 – $80 (৳3,000 – ৳8,000)\n   • Same-day fix for critical errors or hacked sites.\n\n✨ *Every project includes 30 days of free post-launch support!*",
    options: [
      { label: "📋 Get a Custom Quote", action: "quote" },
      { label: "💬 Discuss Budget on WhatsApp", action: "whatsapp" },
      { label: "⚡ Learn About Speed Guarantee", action: "speed" },
    ],
    highlightAction: {
      type: "whatsapp",
      label: "Discuss Your Budget on WhatsApp",
      url: "https://wa.me/8801936711699",
    },
  },
  {
    id: "speed",
    keywords: [
      "speed",
      "slow",
      "pagespeed",
      "gtmetrix",
      "lighthouse",
      "core web vitals",
      "loading",
      "fast",
      "boost",
      "cache",
      "wp rocket",
      "litespeed",
      "optimize",
      "site slow",
      "druto",
      "speed barano",
    ],
    patterns: [/\b(speed|slow|gtmetrix|pagespeed|core web vitals|load time|speed barano)\b/i],
    reply:
      "⚡ **WordPress Speed Optimization (90+ Guaranteed)**:\n\nIs your website slow or losing Google rankings? Sujon guarantees:\n• **90+ PageSpeed Score** on Google Lighthouse & Mobile/Desktop\n• **GTmetrix Grade A** with load time under 1.5–2 seconds\n• **Core Web Vitals Pass** (LCP, FID, CLS)\n\n**What Sujon Does:**\n✔ Advanced Caching (WP Rocket, LiteSpeed, Redis)\n✔ Database deep cleanup and query optimization\n✔ Next-Gen WebP image compression and lazy loading\n✔ CSS/JS minification, delay and critical CSS generation\n✔ CDN configuration (Cloudflare with full edge caching)\n\n*Zero broken layouts, 100% safe process!*",
    options: [
      { label: "🚀 Speed Up My Site ($50–$150)", action: "quote" },
      { label: "💬 WhatsApp Sujon for Free Speed Audit", action: "whatsapp" },
      { label: "💼 View Other Services", action: "services" },
    ],
    highlightAction: {
      type: "whatsapp",
      label: "Get Free Speed Audit on WhatsApp",
      url: "https://wa.me/8801936711699",
    },
  },
  {
    id: "services",
    keywords: [
      "services",
      "service",
      "what do you do",
      "offer",
      "skills",
      "speciality",
      "what can you build",
      "kaj ki",
      "seba",
      "ki ki koren",
    ],
    patterns: [/\b(service|services|what can you do|skills|specialties|seba)\b/i],
    reply:
      "🛠️ **Core Services Offered by Sujon**:\n\n1. **Custom WordPress Development**: Fast, secure and custom-coded themes & plugins.\n2. **Elementor & Elementor Pro**: Pixel-perfect responsive designs from Figma / PSD / XD.\n3. **WooCommerce eCommerce**: Full online store setup with payments, tax & shipping.\n4. **Speed Optimization**: 90+ PageSpeed guarantee on Mobile & Desktop.\n5. **Website Redesign**: Modernizing outdated websites into sleek modern experiences.\n6. **Landing Page Design**: High-converting lead generation & sales funnels.\n7. **Bug Fixing & Security**: Emergency fixes, 500 errors, malware removal.\n8. **Website Migration**: Zero-downtime server and domain transfers.",
    options: [
      { label: "💰 What are your prices?", action: "pricing" },
      { label: "🛍️ WooCommerce Stores", action: "ecommerce" },
      { label: "🎨 Elementor & Figma", action: "elementor" },
      { label: "💬 Contact Sujon Directly", action: "whatsapp" },
    ],
  },
  {
    id: "ecommerce",
    keywords: [
      "woocommerce",
      "ecommerce",
      "e-commerce",
      "shop",
      "store",
      "sell online",
      "products",
      "cart",
      "checkout",
      "payment gateway",
      "bkash",
      "nagad",
      "stripe",
      "paypal",
      "dokani",
      "online store",
    ],
    patterns: [/\b(woocommerce|ecommerce|online shop|store|sell products)\b/i],
    reply:
      "🛍️ **WooCommerce & eCommerce Stores**:\n\nSujon builds full-featured online shops engineered for high sales conversions:\n\n• **Product Management**: Simple, variable, downloadable, or affiliate products.\n• **Payment Gateways**: Stripe, PayPal, Square, Authorize.net, plus local gateways (bKash, Nagad, Rocket, SSLCommerz, Cash on Delivery).\n• **Cart & Checkout**: Multi-step or 1-click seamless checkout to prevent cart abandonment.\n• **Automations**: Automated order emails, PDF invoices, discount coupon rules, and inventory tracking.\n• **Mobile-First**: 100% thumb-friendly shopping experience for smartphone buyers.",
    options: [
      { label: "💰 eCommerce Pricing (~$400–$1200)", action: "ecommerce_pricing" },
      { label: "💬 Start an eCommerce Project", action: "whatsapp" },
      { label: "⏱️ How Long Does It Take?", action: "timeline" },
    ],
  },
  {
    id: "elementor",
    keywords: [
      "elementor",
      "elementor pro",
      "figma",
      "psd",
      "xd",
      "canva",
      "figma to wordpress",
      "design",
      "pixel perfect",
      "drag and drop",
    ],
    patterns: [/\b(elementor|figma|psd to wordpress|figma to elementor|pixel perfect)\b/i],
    reply:
      "🎨 **Elementor & Figma to WordPress Expert**:\n\nSujon has built 100+ websites using Elementor and Elementor Pro:\n• **Pixel-Perfect Conversion**: 100% identical translation from Figma, PSD, Adobe XD, or Canva designs.\n• **Clean & Lightweight**: No unnecessary bloated addons; custom CSS is used to keep pages lightning fast.\n• **Full Responsive Control**: Specially styled for Desktop, Tablet, and Mobile displays.\n• **Dynamic Content**: Custom post types, ACF (Advanced Custom Fields), and custom loops.",
    options: [
      { label: "💼 View Portfolio Samples", action: "portfolio_action" },
      { label: "💰 Request Design Quote", action: "quote" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "bug_fixing",
    keywords: [
      "bug",
      "fix",
      "broken",
      "error",
      "500",
      "404",
      "white screen",
      "wsod",
      "critical error",
      "hacked",
      "malware",
      "virus",
      "not working",
      "problem",
      "issue",
      "khisti",
      "thik kora",
    ],
    patterns: [/\b(bug|error|broken|hacked|malware|critical error|500 error|white screen|not working|thik kora)\b/i],
    reply:
      "🛠️ **Emergency WordPress Bug Fixing & Security**:\n\nGot an urgent problem? Sujon can fix it in a few hours:\n• **Critical Error / White Screen of Death (WSOD)**\n• **500 Internal Server Error & Database Connection Failures**\n• **Plugin & Theme Conflicts after updates**\n• **Malware Removal & Hacked Site Clean Up** (blacklist removal, security hardening)\n• **Broken CSS, mobile layout glitches & SSL HTTPS errors**\n\n⚡ Most bugs are solved within **2 to 6 hours**!",
    options: [
      { label: "🚨 Get Emergency Help on WhatsApp", action: "whatsapp" },
      { label: "💰 Bug Fixing Pricing (~$30–$80)", action: "pricing" },
    ],
    highlightAction: {
      type: "whatsapp",
      label: "Request Emergency Fix on WhatsApp",
      url: "https://wa.me/8801936711699",
    },
  },
  {
    id: "timeline",
    keywords: [
      "timeline",
      "time",
      "how long",
      "delivery",
      "days",
      "fast",
      "koto din",
      "somoy",
      "turnaround",
      "deadline",
      "duration",
    ],
    patterns: [/\b(how long|timeline|delivery time|koto din lagbe|turnaround|how many days)\b/i],
    reply:
      "⏱️ **Standard Project Delivery Timelines**:\n\n• **Landing Page / One-Pager**: 1 to 3 business days\n• **Standard Business Website**: 3 to 7 business days\n• **Full WooCommerce eCommerce Store**: 5 to 10 business days\n• **Speed Optimization (90+ score)**: 24 to 48 hours\n• **Urgent Bug Fixes**: Same day (2 to 6 hours)\n\n*Rush delivery is also available if you have an urgent deadline!*",
    options: [
      { label: "📋 Start a Project", action: "quote" },
      { label: "💬 Message on WhatsApp", action: "whatsapp" },
      { label: "💰 View Pricing", action: "pricing" },
    ],
  },
  {
    id: "call_meeting",
    keywords: ["call", "zoom", "google meet", "phone call", "talk on phone", "meeting", "kotha bola jabe", "voice call", "can we speak", "speak on phone", "call deya"],
    patterns: [/\b(call|zoom|google meet|phone call|meeting|voice call|can we speak|kotha bolte|call deya)\b/i],
    reply:
      "📞 **Voice Calls & Zoom / Google Meet Meetings**:\n\n**Yes, absolutely!** Sujon is very happy to speak directly with you:\n• **WhatsApp Voice & Video Call**: [+8801936711699](https://wa.me/8801936711699)\n• **Google Meet / Zoom**: Screen-sharing walkthroughs and live discussion available upon request.\n\n*Just send a quick message on WhatsApp to schedule a call at your preferred time!*",
    options: [
      { label: "💬 Open WhatsApp to Schedule Call", action: "open_wa_link" },
      { label: "💰 View Pricing", action: "pricing" },
    ],
    highlightAction: {
      type: "whatsapp",
      label: "Schedule a Call on WhatsApp",
      url: "https://wa.me/8801936711699",
    },
  },
  {
    id: "contact",
    keywords: [
      "contact",
      "whatsapp",
      "phone",
      "number",
      "email",
      "message",
      "address",
      "jogajog",
      "kothay pabo",
      "phone number",
      "location",
      "where are you from",
      "bangladesh",
      "dhaka",
    ],
    patterns: [/\b(contact|whatsapp|phone number|call|email|location|where are you|jogajog)\b/i],
    reply:
      "📞 **Get in Touch With Sujon Directly**:\n\n• **WhatsApp**: [+8801936711699](https://wa.me/8801936711699) *(Instant response, typically within 15 minutes)*\n• **Email**: sujonmia3090@gmail.com\n• **Location**: Dhaka, Bangladesh *(Working globally across USA, UK, Europe, Australia, etc.)*\n• **Availability**: Currently **Available** for new projects & retainers!",
    options: [
      { label: "💬 Open WhatsApp Chat", action: "open_wa_link" },
      { label: "📝 Fill Out Contact Form", action: "scroll_contact" },
      { label: "💰 View Rates", action: "pricing" },
    ],
    highlightAction: {
      type: "whatsapp",
      label: "Open WhatsApp Chat Now",
      url: "https://wa.me/8801936711699",
    },
  },
  {
    id: "about_sujon",
    keywords: [
      "who is sujon",
      "about sujon",
      "experience",
      "years",
      "background",
      "developer",
      "qualification",
      "who are you",
      "sujon ke",
      "porichiti",
      "experience koto",
    ],
    patterns: [/\b(who is sujon|about sujon|years of experience|who are you|sujon ke)\b/i],
    reply:
      "🌟 **About Md. Sujon Mia**:\n\n• **5+ Years** of hands-on professional WordPress & Front-end expertise\n• **200+ Projects Completed** successfully for businesses and agencies globally\n• **150+ Happy Clients** across USA, UK, Canada, Australia, Europe & Asia\n• **99% Client Satisfaction** rating with repeat clients\n• Specializes in custom WordPress, Elementor Pro, WooCommerce, speed optimization (90+ score), and Full-stack PHP/React integrations.\n\nSujon is based in Dhaka, Bangladesh, and works seamlessly with clients in any international time zone (EST, PST, GMT, BST, AEST).",
    options: [
      { label: "💼 View Core Services", action: "services" },
      { label: "📁 See Portfolio Work", action: "portfolio_action" },
      { label: "💬 Talk to Sujon Directly", action: "whatsapp" },
    ],
  },
  {
    id: "portfolio_work",
    keywords: [
      "portfolio",
      "samples",
      "previous work",
      "demo",
      "live projects",
      "examples",
      "dekhao",
      "kaj dekhte chai",
    ],
    patterns: [/\b(portfolio|sample|previous work|examples|live demo|kaj dekhan)\b/i],
    reply:
      "📁 **Recent Projects & Portfolio**:\n\nSujon has developed over 200+ projects ranging from eCommerce stores, corporate agency websites, restaurant portals, real estate directories, to custom landing pages.\n\nYou can explore live client projects right here on the portfolio section of this website!",
    options: [
      { label: "👀 View Recent Projects Section", action: "scroll_portfolio" },
      { label: "💬 Request Live Demo Links on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "requirements_needed",
    keywords: ["what do you need", "requirements", "getting started", "how to start", "ki ki lagbe", "suru korte ki lagbe", "materials", "prerequisite"],
    patterns: [/\b(what do you need|requirements|how to start|getting started|ki ki lagbe|suru korte ki lagbe)\b/i],
    reply:
      "📋 **What Is Needed to Start Your Project**:\n\nTo get started quickly, here is what helps:\n\n1. **Project Brief**: A short summary of your business, goals, and needed pages.\n2. **Reference Websites**: 1–2 website links that you like for design or layout inspiration.\n3. **Content / Branding**: Your logo, text, and images *(if not ready yet, Sujon can use professional placeholders!)*.\n4. **Hosting Access**: cPanel or WordPress login *(or Sujon can build it first on a private staging link)*.\n\n*You can also just send Sujon a message on WhatsApp and he will guide you through everything!*",
    options: [
      { label: "💬 Message on WhatsApp", action: "whatsapp" },
      { label: "💰 View Pricing Packages", action: "pricing" },
      { label: "⏱️ Delivery Timeline", action: "timeline" },
    ],
  },
  {
    id: "no_content_logo",
    keywords: ["no content", "don't have logo", "no logo", "no images", "content nai", "logo nai", "chobi nai", "can i start without content", "without logo"],
    patterns: [/\b(no content|no logo|content nai|logo nai|without content|without logo)\b/i],
    reply:
      "🎨 **No Logo or Written Content Yet? No Problem!**\n\nSujon can start your website right away:\n• Sujon uses high-quality licensed stock photography and illustrations\n• Formats modern dummy text & placeholder copy\n• Designs a clean temporary brand icon / logo\n\nOnce your final content and official logo are ready, Sujon will replace them effortlessly!",
    options: [
      { label: "📋 Start a Project", action: "quote" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "clone_reference",
    keywords: ["clone", "copy website", "like this website", "reference website", "same to same", "example site", "omon website", "same design", "similar site"],
    patterns: [/\b(clone|copy website|like this website|reference site|same to same|similar site)\b/i],
    reply:
      "🎯 **Can You Build a Website Like My Reference?**\n\n**Yes, absolutely!** Sujon can replicate or improve upon any reference website you provide:\n• Matches the layout, animations, typography, and color aesthetics\n• Builds it with clean Elementor or custom WordPress code (no bloat)\n• Ensures it is 100% mobile-friendly and tailored to your brand identity.\n\n*Just send the link of the website you like to Sujon on WhatsApp!*",
    options: [
      { label: "💬 Send Website Link on WhatsApp", action: "whatsapp" },
      { label: "💰 How Much Will It Cost?", action: "pricing" },
    ],
  },
  {
    id: "convert_platforms",
    keywords: ["wix to wordpress", "shopify to wordpress", "squarespace to wordpress", "webflow to wordpress", "convert", "migrate from shopify", "migrate from wix"],
    patterns: [/\b(wix to wordpress|shopify to wordpress|squarespace to wordpress|webflow to wordpress|convert to wordpress)\b/i],
    reply:
      "🔄 **Platform Migration to WordPress**:\n\nSujon can seamlessly migrate your website to WordPress:\n• **Shopify to WooCommerce**: Keep your products, orders, and customers without paying expensive recurring Shopify app fees.\n• **Wix / Squarespace to WordPress**: Gain total design freedom, lower hosting costs, and unlimited customization.\n• **SEO Preservation**: All URL structures, redirects, and Google rankings are 100% preserved.",
    options: [
      { label: "💬 Discuss Migration on WhatsApp", action: "whatsapp" },
      { label: "💰 View Migration Rates", action: "pricing" },
    ],
  },
  {
    id: "hosting_recommendation",
    keywords: ["best hosting", "recommend hosting", "which hosting", "hostinger", "siteground", "namecheap", "hosting kon ta bhalo", "hosting kinbo", "good hosting"],
    patterns: [/\b(best hosting|recommend hosting|which hosting|hosting recommendation|hostinger|siteground)\b/i],
    reply:
      "🌐 **Hosting Recommendations by Sujon**:\n\n1. **Hostinger (Business WordPress Plan)**: Highly recommended for budget & speed! Comes with LiteSpeed web server, free SSL, and free domain (~$3/month).\n2. **SiteGround**: Superb choice for corporate sites with top-tier security and fast servers.\n3. **Cloudways**: Best for high-traffic WooCommerce stores requiring dedicated cloud resources.\n\n*Need assistance purchasing hosting? Sujon can guide you or set it up for free!*",
    options: [
      { label: "💬 Ask Sujon for Hosting Help", action: "whatsapp" },
      { label: "⚡ Check Speed Guarantee", action: "speed" },
    ],
  },
  {
    id: "discounts_budget",
    keywords: ["discount", "cheap", "low budget", "kom budget", "kom taka", "discount pawa jabe", "negotiate", "less price", "offer", "kom hobe na", "best price"],
    patterns: [/\b(discount|cheap|low budget|kom budget|kom taka|discount pawa jabe|negotiate|less price)\b/i],
    reply:
      "🤝 **Friendly Budget Negotiation & Discounts**:\n\nSujon is very approachable and always happy to work with your budget:\n• For tight budgets, Sujon can prioritize essential pages first so you can launch quickly and affordably.\n• Special bundle discounts are offered for multiple websites, agencies, and long-term partnerships.\n\n*Feel free to message Sujon directly on WhatsApp (+8801936711699) with your exact budget—let's make it happen!*",
    options: [
      { label: "💬 Discuss Budget on WhatsApp", action: "whatsapp" },
      { label: "💰 View Standard Pricing", action: "pricing" },
    ],
  },
  {
    id: "hidden_costs",
    keywords: ["hidden cost", "extra charge", "extra fees", "hidden charges", "aro taka lagbe", "extra khoroch", "additional cost", "hidden"],
    patterns: [/\b(hidden cost|extra charge|extra fees|hidden charges|aro taka lagbe|extra khoroch)\b/i],
    reply:
      "🛡️ **Zero Hidden Charges — 100% Transparency**:\n\nWhat is agreed in the initial proposal is the exact final price you pay—guaranteed!\n• All agreed features, responsiveness, basic SEO, and speed optimization are included.\n• 30 days of post-delivery free warranty & support is included with every project.\n• No unexpected add-ons or surprise invoices ever.",
    options: [
      { label: "💰 View Pricing Packages", action: "pricing" },
      { label: "💬 Message on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "refund_guarantee",
    keywords: ["money back", "refund", "guarantee", "risk free", "taka ফেরত", "money back guarantee", "satisfaction guarantee", "satisfied na hole"],
    patterns: [/\b(money back|refund|money back guarantee|satisfaction guarantee|satisfied na hole)\b/i],
    reply:
      "✅ **100% Satisfaction & Money-Back Policy**:\n\n• **Milestone Payments**: 50% advance to start, and the remaining 50% only after you thoroughly test and approve the live website.\n• **Unlimited Minor Revisions**: Sujon makes tweaks and modifications until you are 100% satisfied.\n• **Money-Back Guarantee**: If Sujon fails to deliver the promised scope of work, you receive a full refund.",
    options: [
      { label: "📋 Start a Project", action: "quote" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "seo_mobile",
    keywords: ["seo", "mobile friendly", "responsive", "google ranking", "schema", "yoast", "rankmath", "mobile a kemon dekhabe", "phone responsive", "tablet"],
    patterns: [/\b(seo|mobile friendly|responsive|google ranking|rankmath|yoast|phone responsive)\b/i],
    reply:
      "📱 **100% Mobile-Friendly & Built for Google SEO**:\n\nEvery site Sujon delivers comes with:\n• **Pixel-Perfect Responsiveness**: Tested on iPhones, Android smartphones, tablets, laptops, and ultra-wide screens.\n• **Built-In SEO Foundations**: Semantic HTML5 tags, fast loading speeds, OpenGraph social preview tags, and XML sitemaps.\n• **SEO Plugin Setup**: Installation and configuration of RankMath or Yoast SEO for higher search engine rankings.",
    options: [
      { label: "⚡ Speed & Core Web Vitals", action: "speed" },
      { label: "💼 View Portfolio Samples", action: "portfolio_action" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "multilingual",
    keywords: ["multilingual", "multi language", "dual language", "two languages", "bangla english", "arabic", "wpml", "polylang", "translatepress", "onno bhasha", "languages"],
    patterns: [/\b(multilingual|multi language|dual language|wpml|polylang|translatepress|bilingual)\b/i],
    reply:
      "🌍 **Multilingual Websites (Bengali, English, Arabic, etc.)**:\n\nSujon builds smooth multi-language WordPress sites:\n• Clean language selector (country flags or modern dropdown)\n• Full RTL (Right-to-Left) layout support for Arabic and Hebrew\n• Compatible with WPML, Polylang, or TranslatePress\n• Individual SEO meta tags for each language version.",
    options: [
      { label: "💰 Request Multilingual Quote", action: "quote" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "working_hours_timezone",
    keywords: ["timezone", "working hours", "available time", "when are you free", "weekend", "us time", "uk time", "australia time", "somoy", "office time"],
    patterns: [/\b(timezone|working hours|available time|when are you free|us time|uk time|work hours)\b/i],
    reply:
      "🕒 **Working Hours & Time Zone Availability**:\n\n• Sujon is based in Dhaka, Bangladesh (GMT+6), but works with extensive overlap for clients in **US (EST/PST), UK (GMT/BST), Europe, and Australia (AEST)**.\n• Available 6 days a week, with emergency weekend response.\n• Average response time on WhatsApp is **under 15–30 minutes**!",
    options: [
      { label: "💬 Message Sujon on WhatsApp", action: "whatsapp" },
      { label: "📋 Start a Project", action: "quote" },
    ],
  },
  {
    id: "why_hire_sujon",
    keywords: ["why choose you", "why hire sujon", "why should i work with you", "keno apnake nibo", "advantages", "benefits", "why sujon"],
    patterns: [/\b(why choose you|why hire sujon|why should i work with you|keno apnake nibo|why choose sujon)\b/i],
    reply:
      "⭐ **Top 5 Reasons to Work With Sujon**:\n\n1. **5+ Years Experience & 200+ Projects**: Proven track record with a 99% 5-star client satisfaction rate.\n2. **90+ PageSpeed Guarantee**: Lightning-fast websites that rank higher on Google.\n3. **Modern, Thumb-Friendly Design**: Sleek neumorphic / modern UI tailored for mobile visitors.\n4. **Flawless Communication**: Fast response times and transparent live staging updates.\n5. **30 Days Free Warranty**: Sujon stays by your side even after delivery!",
    options: [
      { label: "📁 View Portfolio", action: "portfolio_action" },
      { label: "💰 View Pricing Packages", action: "pricing" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "ownership_admin",
    keywords: ["ownership", "admin access", "full control", "source code", "login details", "amr ki full ownership thakbe", "admin"],
    patterns: [/\b(ownership|admin access|full control|login details|full ownership)\b/i],
    reply:
      "🔑 **100% Full Ownership & Admin Rights**:\n\n• You will have 100% full Administrator ownership of your website, domain, files, and database.\n• Once the website is completed and approved, all admin credentials and backups are securely handed over to you.\n• Zero proprietary lock-in—you own everything completely!",
    options: [
      { label: "💼 Explore Services", action: "services" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "monthly_maintenance",
    keywords: ["maintenance", "monthly support", "retainer", "care plan", "regular update", "masik", "monthly package", "support plan"],
    patterns: [/\b(maintenance|monthly support|retainer|care plan|monthly package)\b/i],
    reply:
      "🛡️ **Monthly Website Maintenance & Care Plans**:\n\nKeep your site running fast, safe, and bug-free 24/7:\n• Weekly WordPress core, plugin, and theme updates\n• Automated daily cloud backups\n• 24/7 uptime monitoring & malware scanning\n• Monthly content updates, text tweaks, and banner changes\n\n*Plans start from just $40 – $100/month.*",
    options: [
      { label: "💬 Inquire About Maintenance Plan", action: "whatsapp" },
      { label: "🛠️ Urgent Bug Fixing Help", action: "bug_fixing" },
    ],
  },
  {
    id: "restaurant_booking",
    keywords: ["restaurant", "food", "menu", "table reservation", "online order", "cafe", "takeaway", "khabar", "restaurant website"],
    patterns: [/\b(restaurant|food menu|table reservation|online food ordering|cafe website)\b/i],
    reply:
      "🍽️ **Restaurant & Food Ordering Websites**:\n\nYes! Sujon specializes in modern, mouth-watering restaurant websites:\n• **Digital Food Menus**: Categorized with high-resolution imagery, pricing, and dietary badges (Vegan, Halal, Gluten-free).\n• **Online Table Reservation**: Instant table booking system with automated confirmation emails/SMS.\n• **Food Ordering & Delivery**: Commission-free online ordering system with delivery radius & pickup options.\n• **Google Maps & Hours**: Direct navigation and open/closed live status.",
    options: [
      { label: "💰 Request Restaurant Quote", action: "quote" },
      { label: "💬 Discuss on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "real_estate",
    keywords: ["real estate", "property", "realtor", "apartments", "idx", "mls", "property listing", "rent", "bari", "flat"],
    patterns: [/\b(real estate|property listing|realtor|idx|mls|property website)\b/i],
    reply:
      "🏡 **Real Estate & Property Listing Websites**:\n\nSujon builds high-converting real estate portals for agencies and agents:\n• **Property Search & Filter**: Filter by location, price range, bedrooms, property type, and amenities.\n• **Interactive Map View**: Google Maps integration pinpointing all available properties.\n• **Lead Generation Forms**: 'Schedule a Tour' and 'Inquire Now' forms routed directly to your WhatsApp or CRM.\n• **MLS / IDX Integration**: Automatic property syndication where needed.",
    options: [
      { label: "💰 Real Estate Project Quote", action: "quote" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "lms_course",
    keywords: ["lms", "course", "learndash", "tutor lms", "online learning", "education", "student", "quiz", "certificate", "academy", "coaching"],
    patterns: [/\b(lms|course website|learndash|tutor lms|online courses|education portal)\b/i],
    reply:
      "🎓 **Online Course & LMS Websites**:\n\nSujon builds comprehensive e-learning platforms using LearnDash, Tutor LMS, or LifterLMS:\n• **Video Lessons & Quizzes**: Drip-content schedules, progress tracking, and downloadable materials.\n• **Student Dashboard**: Individual profile to track courses, assignments, and grades.\n• **Automated Certificates**: Branded completion certificates with verification QR codes.\n• **Payment & Subscriptions**: One-time purchase or recurring monthly/yearly memberships.",
    options: [
      { label: "💰 LMS Website Pricing", action: "pricing" },
      { label: "💬 Talk to Sujon on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "booking_appointments",
    keywords: ["booking", "appointment", "schedule", "amelia", "bookly", "doctor", "salon", "dentist", "consultant", "time slot"],
    patterns: [/\b(booking|appointment|amelia|bookly|doctor website|salon booking|calendar booking)\b/i],
    reply:
      "📅 **Booking & Appointment Websites**:\n\nIdeal for doctors, beauty salons, therapists, consultants, and fitness coaches:\n• **Interactive Time Slots**: Clients pick available dates, service types, and staff members seamlessly.\n• **Google Calendar Sync**: Automatically blocks busy slots and syncs directly with your phone calendar.\n• **Automated Reminders**: Email/SMS notifications sent to clients to prevent no-shows.\n• **Online Deposit Payments**: Accept full or partial advance payments via Stripe, PayPal, or bKash.",
    options: [
      { label: "📋 Start a Booking Website", action: "quote" },
      { label: "💬 Message on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "multivendor_marketplace",
    keywords: ["multivendor", "marketplace", "dokan", "wcfm", "like amazon", "like etsy", "vendor", "seller commission"],
    patterns: [/\b(multivendor|marketplace|dokan|wcfm|like amazon|like etsy)\b/i],
    reply:
      "🏪 **Multi-Vendor Marketplaces (Like Amazon or Etsy)**:\n\nSujon develops multi-seller platforms using WooCommerce with Dokan Pro or WCFM:\n• **Vendor Storefronts**: Individual seller profiles, product upload forms, and sales analytics.\n• **Commission System**: Automated admin commission deduction per sale.\n• **Withdrawals & Payouts**: Secure vendor payout requests via Bank Transfer, PayPal, or local gateways.\n• **Customer Reviews**: Individual product and seller review ratings.",
    options: [
      { label: "💰 Marketplace Quote", action: "pricing" },
      { label: "💬 Discuss on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "membership_subscription",
    keywords: ["membership", "subscription", "recurring", "restricted content", "paywall", "memberpress", "vip members"],
    patterns: [/\b(membership|subscription|restricted content|paywall|memberpress)\b/i],
    reply:
      "🔒 **Membership & Subscription Websites**:\n\nMonetize your content with recurring revenue using MemberPress or Paid Memberships Pro:\n• **Tiered Membership Plans**: Bronze, Silver, Gold with customizable access levels.\n• **Restricted Content / Paywall**: Lock exclusive videos, articles, and downloads behind member login.\n• **Automated Billing**: Recurring payments via Stripe, PayPal, or credit cards.\n• **Member Community**: Member directories and private discussion forums.",
    options: [
      { label: "📋 Start a Membership Site", action: "quote" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "news_magazine_adsense",
    keywords: ["news", "magazine", "blog", "newspaper", "adsense", "ad banner", "editorial", "portal", "patrika"],
    patterns: [/\b(news website|magazine|newspaper|adsense|blog portal|patrika)\b/i],
    reply:
      "📰 **News, Magazine & High-Traffic Portals**:\n\nEngineered for fast loading under heavy traffic spikes:\n• **Editorial Layouts**: Breaking news tickers, category grids, trending widgets, and video embeds.\n• **Google AdSense Ready**: Optimized ad placement slots for maximum click-through rates and revenue.\n• **AMP / Mobile Speed**: Instant loading on mobile networks with advanced caching.\n• **Social Sharing**: One-click sharing to Facebook, WhatsApp, Twitter, and LinkedIn.",
    options: [
      { label: "💰 News Portal Pricing", action: "pricing" },
      { label: "💬 Message on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "nonprofit_donation",
    keywords: ["ngo", "charity", "donation", "nonprofit", "fundraising", "givewp", "foundation", "dan kora"],
    patterns: [/\b(ngo|charity|donation|fundraising|nonprofit|givewp)\b/i],
    reply:
      "🤝 **Charity, NGO & Donation Websites**:\n\nSujon builds inspiring, trustworthy non-profit websites:\n• **Online Donation Forms**: One-time or recurring monthly donations via Stripe, PayPal, or bKash.\n• **Campaign Progress Bars**: Live goal trackers showcasing funds raised vs. target.\n• **Tax Receipts & Invoices**: Automated PDF donation acknowledgment sent to donors.\n• **Impact Galleries**: Photo/video stories highlighting community projects and missions.",
    options: [
      { label: "📋 Start an NGO Website", action: "quote" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "crm_marketing_integrations",
    keywords: ["crm", "mailchimp", "klaviyo", "hubspot", "brevo", "sendinblue", "zapier", "email marketing", "lead capture", "newsletter"],
    patterns: [/\b(crm|mailchimp|klaviyo|hubspot|brevo|zapier|email marketing)\b/i],
    reply:
      "📈 **CRM & Marketing Automation Integrations**:\n\nSujon connects your website to your entire sales & marketing stack:\n• **Email Marketing**: Mailchimp, Klaviyo, Brevo (Sendinblue), ActiveCampaign.\n• **CRM Integration**: HubSpot, Zoho CRM, Salesforce, or Google Sheets.\n• **Automation**: Zapier or Make.com webhooks triggering instant notifications upon form submission.\n• **Lead Generation Popups**: Exit-intent discounts, slide-in offers, and newsletter signups.",
    options: [
      { label: "💼 Explore Other Services", action: "services" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "tracking_analytics_pixel",
    keywords: ["google analytics", "ga4", "facebook pixel", "meta pixel", "tag manager", "tiktok pixel", "tracking", "conversion tracking"],
    patterns: [/\b(google analytics|ga4|facebook pixel|meta pixel|tag manager|conversion tracking)\b/i],
    reply:
      "📊 **Analytics, GA4 & Pixel Tracking Setup**:\n\nNever lose track of your marketing ROI! Sujon sets up:\n• **Google Analytics 4 (GA4)**: Traffic, user demographics, and acquisition channels.\n• **Google Tag Manager (GTM)**: Event tracking for button clicks, phone calls, and form submissions.\n• **Meta (Facebook) Pixel**: Standard events (PageView, ViewContent, AddToCart, Purchase) with Conversions API (CAPI).\n• **Google Search Console**: Verified sitemap indexing and search ranking monitoring.",
    options: [
      { label: "⚡ Check Speed Optimization", action: "speed" },
      { label: "💬 Message on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "email_smtp_forms",
    keywords: ["form not sending", "smtp", "emails not receiving", "email problem", "wp mail smtp", "contact form 7", "wpforms", "form issue"],
    patterns: [/\b(smtp|form not sending|emails not receiving|wp mail smtp|contact form error)\b/i],
    reply:
      "✉️ **Contact Form & SMTP Email Delivery Fixes**:\n\nAre contact form messages ending up in spam or not arriving at all?\n• Sujon sets up authenticated **WP Mail SMTP** using SendGrid, Amazon SES, Google Workspace, or your cPanel webmail.\n• Configures SPF, DKIM, and DMARC records on your domain so emails land 100% in the Inbox—never Spam!\n• Resolves Contact Form 7, WPForms, Gravity Forms, and Fluent Forms bugs within 2 hours.",
    options: [
      { label: "🛠️ Fix My Form on WhatsApp", action: "whatsapp" },
      { label: "💰 Bug Fixing Pricing", action: "pricing" },
    ],
  },
  {
    id: "ssl_security_spam",
    keywords: ["ssl", "https", "security", "spam", "recaptcha", "wordfence", "firewall", "turnstile", "not secure"],
    patterns: [/\b(ssl|https|security|recaptcha|wordfence|firewall|not secure)\b/i],
    reply:
      "🔒 **Free SSL (HTTPS) & Anti-Spam Security**:\n\nIncluded with every project:\n• **Free SSL Setup**: Converts your site from 'Not Secure' (HTTP) to green padlock HTTPS with automatic renewal.\n• **Cloudflare Turnstile / Google reCAPTCHA v3**: Stops spam bots on contact and comment forms with zero annoying puzzles for real visitors.\n• **Firewall & Login Hardening**: Wordfence firewall, hidden admin login URL, and protection against brute-force password attacks.",
    options: [
      { label: "🛡️ Check Security Packages", action: "services" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "gdpr_legal",
    keywords: ["gdpr", "ccpa", "cookie banner", "privacy policy", "terms and conditions", "cookie consent", "compliance"],
    patterns: [/\b(gdpr|cookie banner|privacy policy|terms and conditions|cookie consent|compliance)\b/i],
    reply:
      "⚖️ **GDPR Cookie Consent & Legal Pages**:\n\nProtect your business legally:\n• **GDPR & CCPA Compliant Cookie Banner**: Elegant, non-intrusive cookie consent banner with accept/reject settings.\n• **Standard Legal Page Setup**: Formatted templates for Privacy Policy, Terms of Service, Refund Policy, and Disclaimer.\n• Fully compliant for European, US, and worldwide visitor privacy requirements.",
    options: [
      { label: "💼 View Services", action: "services" },
      { label: "💬 Message on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "nda_confidentiality",
    keywords: ["nda", "non-disclosure", "confidentiality", "privacy", "agreement", "secret", "private project"],
    patterns: [/\b(nda|non disclosure|confidentiality agreement|confidential)\b/i],
    reply:
      "📝 **NDA & Strict Client Confidentiality**:\n\n**Yes, absolutely!** Sujon regularly signs NDAs for agencies, startups, and private entrepreneurs:\n• Your business concept, code, client lists, and credentials remain 100% confidential.\n• If requested, your project will not be featured in any public portfolio.\n• Professional integrity and client privacy are always respected.",
    options: [
      { label: "💬 Discuss NDA on WhatsApp", action: "whatsapp" },
      { label: "📋 Start a Project", action: "quote" },
    ],
  },
  {
    id: "live_chat_integration",
    keywords: ["live chat", "whatsapp button", "chat widget", "tidio", "crisp", "chat box", "messenger widget"],
    patterns: [/\b(live chat|chat widget|tidio|crisp|chat box|whatsapp widget)\b/i],
    reply:
      "💬 **WhatsApp Floating Button & Live Chat Integration**:\n\nConvert visitors into leads before they leave your website!\n• **WhatsApp Floating Trigger**: Visitors tap once to chat directly with your phone number.\n• **Live Chat Platforms**: Integration with Tidio, Crisp, or Facebook Messenger.\n• **AI Chatbot Setup**: Modern AI assistant (just like this one!) integrated into your site.",
    options: [
      { label: "💼 View Services", action: "services" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "other_cms_react",
    keywords: ["react", "nextjs", "php", "full stack", "custom code", "javascript", "tailwind", "custom website"],
    patterns: [/\b(react|nextjs|php developer|full stack|custom code|custom php)\b/i],
    reply:
      "⚛️ **Full-Stack React & Custom PHP Expertise**:\n\nIn addition to WordPress, Sujon is a skilled Full-Stack Front-End & PHP developer:\n• **Custom PHP & MySQL**: Building bespoke WordPress plugins, custom post loops, and database queries.\n• **React.js & Next.js**: Modern interactive web apps, headless CMS integrations, and fast frontend experiences.\n• **Tailwind CSS & Modern JavaScript**: Pixel-perfect responsive styling with buttery-smooth animations.",
    options: [
      { label: "💼 View Core Services", action: "services" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "divi_bricks_builders",
    keywords: ["divi", "bricks", "gutenberg", "oxygen", "avada", "wpbakery", "page builders"],
    patterns: [/\b(divi|bricks builder|gutenberg|oxygen builder|avada|wpbakery)\b/i],
    reply:
      "🧱 **Experience Across All Major Page Builders**:\n\nWhile Elementor Pro is Sujon's main specialty, he is proficient in:\n• **Gutenberg / Block Editor**: Lightweight native blocks for maximum PageSpeed.\n• **Bricks Builder & Oxygen**: Clean semantic HTML and ultra-fast loading for power users.\n• **Divi & Avada / WPBakery**: Customizing, redesigning, or migrating old sites to modern builders.",
    options: [
      { label: "🎨 Elementor Design", action: "elementor" },
      { label: "💬 Message on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "training_video_staff",
    keywords: ["training", "video guide", "teach me", "loom", "how to use", "staff training", "tutorial"],
    patterns: [/\b(training|video guide|teach me|loom video|video tutorial|how to use the website)\b/i],
    reply:
      "🎥 **Personalized Video Walkthrough & Training Included**:\n\nSujon makes sure you never feel lost with your new website:\n• Upon project completion, Sujon records a personalized **Loom / screen-recording video tutorial** specifically for your website.\n• Shows you step-by-step how to change text, swap images, add new products, and view contact submissions.\n• 100% beginner-friendly—no technical background needed!",
    options: [
      { label: "💼 Services Overview", action: "services" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "urgent_down_emergency",
    keywords: ["site down", "emergency", "urgent", "immediate help", "website crash", "cannot access", "not loading", "taratari lagbe"],
    patterns: [/\b(site down|website down|emergency|urgent help|immediate help|website crash)\b/i],
    reply:
      "🚨 **Urgent Website Down / Emergency Response**:\n\nIs your website down or displaying a critical error right now?\n• **Immediate Priority Action**: Sujon responds within 10–15 minutes on WhatsApp.\n• **Emergency Diagnostic**: Checks server logs, error logs, and restores site functionality.\n• **Same-Day Resolution**: 95% of critical server & WordPress crash bugs are fixed within **1 to 3 hours**!\n\n👉 **Message Sujon immediately on WhatsApp**: [+8801936711699](https://wa.me/8801936711699)",
    options: [
      { label: "🚨 Message Sujon on WhatsApp Immediately", action: "open_wa_link" },
      { label: "💰 Bug Fixing Rates", action: "pricing" },
    ],
    highlightAction: {
      type: "whatsapp",
      label: "Open WhatsApp for Emergency Help",
      url: "https://wa.me/8801936711699",
    },
  },
  {
    id: "location_office",
    keywords: ["office", "location", "meet in person", "dhaka office", "physical meeting", "apnar office kothay"],
    patterns: [/\b(office|meet in person|physical meeting|office kothay|location)\b/i],
    reply:
      "📍 **Location & Remote Collaboration**:\n\n• Sujon is based in **Dhaka, Bangladesh**, and primarily works remotely with clients worldwide via WhatsApp, Zoom, Google Meet, and email.\n• Remote collaboration is fast, transparent, and tracked with daily staging links.\n• In-person meetings in Dhaka can be scheduled for large enterprise or contract projects upon request.",
    options: [
      { label: "📞 Schedule a Call", action: "call_meeting" },
      { label: "💬 Message on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "process",
    keywords: [
      "process",
      "how it works",
      "workflow",
      "steps",
      "revisions",
      "staging",
      "rules",
      "process ki",
      "kivabe kaj koren",
    ],
    patterns: [/\b(process|how do you work|workflow|revisions|steps)\b/i],
    reply:
      "🤝 **How Sujon Works With You (Step-by-Step)**:\n\n1. **Discussion & Plan**: We discuss your business goals, design preferences, and required features.\n2. **Staging Development**: Sujon develops the website on a live private staging link so you can see progress in real-time.\n3. **Review & Revisions**: You review the site and request any adjustments (unlimited minor revisions until you are 100% happy).\n4. **Testing & Speed Optimization**: Complete QA testing on desktop, tablet, and mobile, plus speed tuning for 90+ PageSpeed.\n5. **Launch & Training**: Migration to your live domain, plus a personalized video walkthrough showing you how to manage your website easily!",
    options: [
      { label: "💬 Chat With Sujon", action: "whatsapp" },
      { label: "💰 View Rates", action: "pricing" },
    ],
  },
  {
    id: "easy_edit",
    keywords: [
      "can i edit",
      "manage myself",
      "without coding",
      "easy to edit",
      "admin panel",
      "dashboard",
      "amra ki edit korte parbo",
      "video guide",
    ],
    patterns: [/\b(can i edit|manage myself|without coding|change text)\b/i],
    reply:
      "✨ **Yes! 100% Easy to Manage**:\n\nYou will NOT need any coding skills! Sujon builds websites with intuitive visual page builders (like Elementor) where you can easily:\n• Edit text and swap images with a few clicks\n• Add new blog posts, products, and prices\n• Receive incoming orders and contact submissions\n\n*Sujon also provides a custom video tutorial demonstrating how to update your site!*",
    options: [
      { label: "💼 Explore Services", action: "services" },
      { label: "💬 Ask a Question on WhatsApp", action: "whatsapp" },
    ],
  },
  {
    id: "hosting_domain",
    keywords: [
      "hosting",
      "domain",
      "server",
      "cpanel",
      "buy domain",
      "hosting lagbe",
    ],
    patterns: [/\b(domain|hosting|cpanel|server)\b/i],
    reply:
      "🌐 **Domain & Web Hosting**:\n\n• **Do you already have hosting?** Sujon can work directly on your existing cPanel, Hostinger, SiteGround, Namecheap, or VPS.\n• **Don't have hosting yet?** Sujon will guide you to choose the best and most affordable hosting for your needs, or handle the entire setup for you.\n• **Need migration?** Sujon provides 100% safe, zero-downtime website and domain transfers.",
    options: [
      { label: "💬 Ask Sujon About Hosting", action: "whatsapp" },
      { label: "💰 Pricing Packages", action: "pricing" },
    ],
  },
  {
    id: "payment_terms",
    keywords: [
      "payment method",
      "pay",
      "advance",
      "bkash",
      "nagad",
      "bank",
      "wise",
      "payoneer",
      "paypal",
      "terms",
      "taka kivabe dibo",
    ],
    patterns: [/\b(payment method|how to pay|advance|payoneer|wise|bkash)\b/i],
    reply:
      "💳 **Payment Terms & Accepted Methods**:\n\n• **Standard Terms**: 50% advance to start, and the remaining 50% only after you review and are 100% satisfied with the finished site.\n• **International Clients**: Wise, Payoneer, Bank Wire (SWIFT), Remitly, PayPal.\n• **Local (Bangladesh)**: bKash, Nagad, Rocket, or Direct Bank Transfer.\n• **Guarantee**: 100% satisfaction guarantee or money back!",
    options: [
      { label: "💬 Discuss on WhatsApp", action: "whatsapp" },
      { label: "📋 Start a Project", action: "quote" },
    ],
  },
];

const FALLBACK_TOPIC: KnowledgeTopic = {
  id: "fallback",
  keywords: [],
  reply: `Thanks for asking! 😊 Sujon specializes in custom WordPress websites, guaranteed 90+ speed optimization, and high-converting WooCommerce stores.\n\nCould you share a bit more detail about what you need? Or, if you'd like an instant direct answer, feel free to chat with Sujon on WhatsApp at +8801936711699!`,
  options: [
    { label: "💰 Pricing Packages", action: "pricing" },
    { label: "⚡ Speed Optimization Help", action: "speed" },
    { label: "💼 View Services", action: "services" },
    { label: "💬 Chat on WhatsApp", action: "whatsapp" },
  ],
  highlightAction: {
    type: "whatsapp",
    label: "Chat with Sujon on WhatsApp",
    url: "https://wa.me/8801936711699",
  },
};

const ALL_TOPICS = [...GREETING_TOPICS, ...SPECIFIC_TOPICS];

export function MobileAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 250);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // ─────────────────────────────────────────────────────────────
  // INTELLIGENT MATCHING ENGINE:
  // 1. Checks compound intents (e.g. ecommerce + pricing)
  // 2. Checks substantive specific topics FIRST
  // 3. ONLY falls back to greetings if no specific topic matched!
  // ─────────────────────────────────────────────────────────────
  const matchQueryToKnowledge = (rawQuery: string): KnowledgeTopic => {
    const q = rawQuery.toLowerCase().trim();

    // 1. Compound intent checks
    const isAskingPrice = /\b(price|pricing|cost|rate|rates|how much|budget|charge|fee|koto taka|khoroch|dam)\b/i.test(q);
    const isAskingEcommerce = /\b(ecommerce|woocommerce|shop|store|sell products)\b/i.test(q);
    const isAskingSpeed = /\b(speed|slow|pagespeed|gtmetrix|core web vitals|load time)\b/i.test(q);

    if (isAskingPrice && isAskingEcommerce) {
      const ecomPrice = SPECIFIC_TOPICS.find((t) => t.id === "ecommerce_pricing");
      if (ecomPrice) return ecomPrice;
    }

    if (isAskingPrice && isAskingSpeed) {
      const speedPrice = SPECIFIC_TOPICS.find((t) => t.id === "speed_pricing");
      if (speedPrice) return speedPrice;
    }

    // 2. Score-based matching on SPECIFIC TOPICS (High priority!)
    let bestScore = 0;
    let bestMatch: KnowledgeTopic | null = null;

    for (const item of SPECIFIC_TOPICS) {
      let score = 0;
      if (item.patterns) {
        for (const pattern of item.patterns) {
          if (pattern.test(q)) {
            score += 10;
          }
        }
      }
      for (const kw of item.keywords) {
        if (q.includes(kw)) {
          score += kw.length > 5 ? 4 : 2;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }

    if (bestScore >= 2 && bestMatch) {
      return bestMatch;
    }

    // 3. Greeting check (Triggered ONLY when user greets without another specific topic)
    for (const item of GREETING_TOPICS) {
      if (item.patterns) {
        for (const pattern of item.patterns) {
          if (pattern.test(q)) {
            return item;
          }
        }
      }
      for (const kw of item.keywords) {
        if (
          q === kw ||
          q.startsWith(kw + " ") ||
          q.endsWith(" " + kw) ||
          q.startsWith(kw + "?") ||
          q.startsWith(kw + "!") ||
          q.startsWith(kw + ",")
        ) {
          return item;
        }
      }
    }

    // 4. Friendly fallback response
    return FALLBACK_TOPIC;
  };

  const handleAction = (action: string) => {
    if (action === "open_wa_link" || action === "whatsapp") {
      window.open("https://wa.me/8801936711699", "_blank");
      return;
    }
    if (action === "scroll_contact" || action === "quote") {
      setIsOpen(false);
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    if (action === "scroll_portfolio" || action === "portfolio_action") {
      setIsOpen(false);
      const portfolioEl = document.getElementById("portfolio");
      if (portfolioEl) {
        portfolioEl.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (isTyping) return;

    const topic = ALL_TOPICS.find((k) => k.id === action);
    if (!topic) return;

    const userLabelMap: Record<string, string> = {
      services: "What services does Sujon provide?",
      pricing: "What are your pricing packages?",
      ecommerce_pricing: "How much does a WooCommerce store cost?",
      speed_pricing: "How much for 90+ Speed Optimization?",
      speed: "Tell me about 90+ Speed Optimization",
      ecommerce: "Tell me about WooCommerce and online shops",
      elementor: "Do you design with Elementor and Figma?",
      timeline: "How long does a website take to build?",
      process: "How does the work process work?",
      about_sujon: "Tell me about Sujon's experience",
      contact: "How can I contact Sujon?",
      hosting_domain: "Do I need domain & hosting?",
      bug_fixing: "Can you fix my broken or hacked website?",
      requirements_needed: "What is needed to start my project?",
      no_content_logo: "Can we start without logo or content?",
      clone_reference: "Can you build a site like my reference?",
      convert_platforms: "Can you convert Wix or Shopify to WordPress?",
      hosting_recommendation: "Which hosting do you recommend?",
      discounts_budget: "Can I get a discount or budget package?",
      hidden_costs: "Are there any hidden costs?",
      refund_guarantee: "Is there a money-back guarantee?",
      seo_mobile: "Will the website be mobile-friendly & SEO-ready?",
      multilingual: "Can you build a multilingual website?",
      call_meeting: "Can we have a voice call or Zoom meeting?",
      working_hours_timezone: "What are your working hours & time zone?",
      why_hire_sujon: "Why should I choose Sujon?",
      ownership_admin: "Will I get 100% full admin ownership?",
      monthly_maintenance: "Do you provide monthly maintenance?",
      restaurant_booking: "Can you build a Restaurant & food ordering website?",
      real_estate: "Can you build a Real Estate & property listing website?",
      lms_course: "Can you build an Online Course / LMS website?",
      booking_appointments: "Can you build an Appointment booking website?",
      multivendor_marketplace: "Can you build a Multi-Vendor marketplace?",
      membership_subscription: "Can you build a Membership & subscription site?",
      news_magazine_adsense: "Can you build a News or Magazine portal?",
      nonprofit_donation: "Can you build a Charity or Donation website?",
      crm_marketing_integrations: "Can you integrate CRM & Mailchimp?",
      tracking_analytics_pixel: "Can you set up Google Analytics & Meta Pixel?",
      email_smtp_forms: "Can you fix contact form email delivery?",
      ssl_security_spam: "Do you provide free SSL & anti-spam security?",
      gdpr_legal: "Do you set up GDPR cookie consent & legal pages?",
      nda_confidentiality: "Can we sign an NDA agreement?",
      live_chat_integration: "Can you add a WhatsApp button or live chat?",
      other_cms_react: "Do you work with React, Next.js, and custom PHP?",
      divi_bricks_builders: "Do you work with Divi, Bricks, or Gutenberg?",
      training_video_staff: "Do you provide training on how to edit the site?",
      urgent_down_emergency: "My website is down right now, can you help urgently?",
      location_office: "Where is your office & can we meet in person?",
    };

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: userLabelMap[action] || topic.keywords[0] || "Tell me more",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: topic.reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: topic.options,
        highlightAction: topic.highlightAction,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputValue.trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    const matchedTopic = matchQueryToKnowledge(query);

    // Fast, natural delay (400 - 750ms)
    const delay = Math.min(750, Math.max(400, query.length * 12));

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: matchedTopic.reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: matchedTopic.options,
        highlightAction: matchedTopic.highlightAction,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, delay);
  };

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {/* Floating App AI Assistant Trigger Button (Hidden when modal is open to avoid overlapping) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
          className="fixed bottom-6 left-[72px] sm:left-22 z-40 nm-raised nm-interactive flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-brand-deep hover:text-brand transition-all active:scale-95 shadow-lg group"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <Sparkles className="h-4 w-4 text-brand-deep animate-pulse" />
          <span className="text-[12px] font-extrabold uppercase tracking-wider text-foreground group-hover:text-brand-deep">
            Ask AI
          </span>
        </button>
      )}

      {/* Modern Responsive Assistant Dialog (Mobile Bottom Sheet / Desktop Modal) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col justify-end sm:items-center sm:justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Sujon AI Assistant"
        >
          {/* Backdrop click on desktop */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />

          <div
            className="w-full sm:max-w-[480px] h-[90dvh] sm:h-[640px] max-h-[100dvh] flex flex-col bg-surface rounded-t-[28px] sm:rounded-[28px] shadow-2xl border border-white/40 dark:border-white/10 overflow-hidden animate-in slide-in-from-bottom-6 duration-250 z-[10000]"
          >
            {/* Top Native App Header */}
            <div className="nm-raised-sm flex items-center justify-between px-4 py-3.5 border-b border-border/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="nm-inset flex h-10 w-10 items-center justify-center rounded-full text-brand-deep">
                    <Bot className="h-5 w-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-[14.5px] font-black text-foreground leading-tight">
                      Sujon's AI Consultant
                    </h2>
                    <span className="nm-inset text-brand-deep rounded-[6px] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider">
                      LIVE
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Always Online • WordPress & Speed Expert
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={resetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="nm-raised-sm nm-interactive flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground active:scale-95"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="nm-raised-sm nm-interactive flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground active:scale-95"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick Filter Pill Ribbon */}
            <div className="flex items-center gap-1.5 overflow-x-auto px-3 py-2 border-b border-border/30 bg-surface/50 no-scrollbar shrink-0 text-[11px]">
              <button
                type="button"
                onClick={() => handleAction("pricing")}
                className="nm-raised-sm whitespace-nowrap rounded-full px-3 py-1 font-bold text-foreground/80 hover:text-brand-deep transition-colors shrink-0"
              >
                💰 Pricing
              </button>
              <button
                type="button"
                onClick={() => handleAction("speed")}
                className="nm-raised-sm whitespace-nowrap rounded-full px-3 py-1 font-bold text-foreground/80 hover:text-brand-deep transition-colors shrink-0"
              >
                ⚡ 90+ Speed
              </button>
              <button
                type="button"
                onClick={() => handleAction("ecommerce")}
                className="nm-raised-sm whitespace-nowrap rounded-full px-3 py-1 font-bold text-foreground/80 hover:text-brand-deep transition-colors shrink-0"
              >
                🛍️ WooCommerce
              </button>
              <button
                type="button"
                onClick={() => handleAction("timeline")}
                className="nm-raised-sm whitespace-nowrap rounded-full px-3 py-1 font-bold text-foreground/80 hover:text-brand-deep transition-colors shrink-0"
              >
                ⏱️ Timeline
              </button>
              <button
                type="button"
                onClick={() => handleAction("bug_fixing")}
                className="nm-raised-sm whitespace-nowrap rounded-full px-3 py-1 font-bold text-foreground/80 hover:text-brand-deep transition-colors shrink-0"
              >
                🛠️ Bug Fixing
              </button>
            </div>

            {/* Scrollable Conversation Bubbles */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain">
              {messages.map((m) => {
                const isBot = m.sender === "bot";
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isBot ? "items-start" : "items-end"} gap-1.5 animate-in fade-in duration-200`}
                  >
                    <div
                      className={`max-w-[88%] rounded-[20px] px-4 py-3 text-[13.5px] leading-relaxed font-medium ${
                        isBot
                          ? "nm-raised-sm bg-surface/90 text-foreground rounded-tl-[4px]"
                          : "bg-brand text-white rounded-tr-[4px] shadow-sm font-semibold"
                      }`}
                    >
                      <p className="whitespace-pre-line">{m.text}</p>

                      {/* Highlighted Direct Action Banner if present */}
                      {isBot && m.highlightAction && (
                        <div className="mt-3 pt-2.5 border-t border-border/40">
                          {m.highlightAction.type === "whatsapp" && (
                            <a
                              href={m.highlightAction.url || "https://wa.me/8801936711699"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] text-white px-3.5 py-2 text-[12px] font-extrabold shadow-md hover:bg-[#20b858] active:scale-95 transition-all w-full justify-center"
                            >
                              <MessageCircle className="h-4 w-4" />
                              <span>{m.highlightAction.label}</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quick suggestion pills if present */}
                    {isBot && m.options && m.options.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1 max-w-[95%]">
                        {m.options.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleAction(opt.action)}
                            className="nm-raised-sm nm-interactive flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold text-foreground hover:text-brand-deep active:scale-95 transition-all text-left"
                          >
                            <span>{opt.label}</span>
                            <ArrowRight className="h-2.5 w-2.5 opacity-60" />
                          </button>
                        ))}
                      </div>
                    )}

                    <span className="text-[10px] text-muted-foreground/70 px-1">{m.time}</span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-muted-foreground text-[12px] py-1 pl-1">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-brand-deep/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-brand-deep/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-brand-deep/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="font-semibold text-[11px]">Sujon's AI is writing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Keyboard-Safe Input Area */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-surface/95 border-t border-border/50 flex items-center gap-2 shrink-0 pb-[calc(12px+env(safe-area-inset-bottom,0px))]"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about rates, speed, WordPress, timeline..."
                className="nm-inset flex-1 rounded-full px-4 py-2.5 text-[16px] sm:text-[14px] text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-1 focus:ring-brand-deep/30 transition-shadow bg-surface"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
                className={`nm-raised-sm nm-interactive flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all ${
                  inputValue.trim() && !isTyping
                    ? "text-brand-deep hover:text-brand active:scale-95"
                    : "text-muted-foreground/40 cursor-not-allowed"
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
