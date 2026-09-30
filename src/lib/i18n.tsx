import React, { createContext, useContext, useEffect, useState } from "react";

export type SupportedLanguage =
  | "en"
  | "bn"
  | "ar"
  | "es"
  | "fr"
  | "de"
  | "hi"
  | "zh-CN"
  | "ja"
  | "ru"
  | "pt"
  | "it"
  | "tr"
  | "ur";

export interface Translations {
  // Navigation
  nav_home: string;
  nav_about: string;
  nav_services: string;
  nav_projects: string;
  nav_reviews: string;
  nav_contact: string;
  nav_quote: string;
  nav_language: string;
  nav_search_lang: string;
  nav_popular: string;
  nav_all_languages: string;
  nav_color_mood: string;
  nav_surface_mode: string;
  nav_light: string;
  nav_dark: string;
  nav_magic_cursor: string;

  // Hero
  hero_badge: string;
  hero_heading_1: string;
  hero_heading_gradient: string;
  hero_heading_2: string;
  hero_subheading?: string;
  hero_bio: string;
  hero_download_cv: string;
  hero_view_projects: string;

  // Stats
  stat_exp_val: string;
  stat_exp_lbl: string;
  stat_proj_val: string;
  stat_proj_lbl: string;
  stat_clients_val: string;
  stat_clients_lbl: string;
  stat_satisfaction_val: string;
  stat_satisfaction_lbl: string;

  // About
  about_heading: string;
  about_p1: string;
  about_p2: string;
  about_p3?: string;
  about_p4?: string;
  about_p5?: string;
  about_skills_title: string;

  // Services
  services_heading: string;
  services_subtitle: string;
  svc_1_title: string;
  svc_1_desc: string;
  svc_2_title: string;
  svc_2_desc: string;
  svc_3_title: string;
  svc_3_desc: string;
  svc_4_title: string;
  svc_4_desc: string;
  svc_5_title: string;
  svc_5_desc: string;
  svc_6_title: string;
  svc_6_desc: string;
  svc_7_title: string;
  svc_7_desc: string;
  svc_8_title: string;
  svc_8_desc: string;

  // Technologies
  tech_heading: string;

  // Portfolio
  portfolio_heading: string;
  portfolio_subtitle: string;
  portfolio_view_project: string;
  portfolio_show_more?: string;
  portfolio_show_less?: string;

  // Testimonials
  reviews_heading: string;
  reviews_subtitle: string;

  // Contact
  contact_heading: string;
  contact_subtitle: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_email: string;
  contact_phone: string;
  contact_project_type: string;
  contact_budget: string;
  contact_message: string;
  contact_send: string;
  contact_sending: string;
  contact_success_title: string;
  contact_success_desc: string;
  contact_send_another: string;
  contact_info_title: string;
  contact_location: string;
  contact_available: string;

  // Footer
  footer_tagline: string;
  footer_quick_links: string;
  footer_rights: string;

  // Extended sections
  workflow_badge?: string;
  workflow_heading?: string;
  workflow_subtitle?: string;
  how_heading?: string;
  how_subtitle?: string;
  how_s1_name?: string;
  how_s1_desc?: string;
  how_s2_name?: string;
  how_s2_desc?: string;
  how_s3_name?: string;
  how_s3_desc?: string;
  how_s4_name?: string;
  how_s4_desc?: string;
  how_s5_name?: string;
  how_s5_desc?: string;
  tech_subtitle?: string;
  tab_all_tech?: string;
  tab_wp?: string;
  tab_frontend?: string;
  tab_backend?: string;
  tab_ai?: string;
  cat_all?: string;
  cat_wp?: string;
  cat_woo?: string;
  cat_business?: string;
  cat_custom?: string;
  cat_ai?: string;
  blog_heading?: string;
  blog_subtitle?: string;
  exp_back_home?: string;
  exp_career_journey?: string;
  exp_verified_history?: string;
  exp_page_heading?: string;
  exp_intro?: string;
  exp_stat_dev?: string;
  exp_stat_sites?: string;
  exp_stat_rating?: string;
  exp_stat_onsite?: string;
  exp_responsibilities?: string;
  exp_tech_stack?: string;

  // Header Extra
  nav_experience?: string;
  nav_work_exp?: string;
  nav_client_reviews?: string;
  nav_reviews_short?: string;
  nav_work_exp_short?: string;

  // Workflow details
  wf_phase_1_tag?: string;
  wf_phase_1_title?: string;
  wf_phase_1_desc?: string;
  wf_phase_1_benefit?: string;
  wf_phase_2_tag?: string;
  wf_phase_2_title?: string;
  wf_phase_2_desc?: string;
  wf_phase_2_benefit?: string;
  wf_phase_3_tag?: string;
  wf_phase_3_title?: string;
  wf_phase_3_desc?: string;
  wf_phase_3_benefit?: string;
  wf_phase_4_tag?: string;
  wf_phase_4_title?: string;
  wf_phase_4_desc?: string;
  wf_phase_4_benefit?: string;
  wf_badge_1?: string;
  wf_badge_2?: string;
  wf_badge_3?: string;
  wf_badge_4?: string;

  // Testimonials
  review_1_body?: string;
  review_1_company?: string;
  review_2_body?: string;
  review_2_company?: string;
  review_3_body?: string;
  review_3_company?: string;
  review_4_body?: string;
  review_4_company?: string;
  review_5_body?: string;
  review_5_company?: string;
  review_6_body?: string;
  review_6_company?: string;

  // Blog
  blog_read_more?: string;
  blog_show_more?: string;
  blog_show_less?: string;
  blog_1_title?: string;
  blog_2_title?: string;
  blog_3_title?: string;
  blog_4_title?: string;
  blog_5_title?: string;
  blog_6_title?: string;
  blog_7_title?: string;
  blog_8_title?: string;

  // Portfolio items
  proj_appliance_desc?: string;
  proj_appliance_role?: string;
  proj_tommys_desc?: string;
  proj_tommys_role?: string;
  proj_montgomery_desc?: string;
  proj_montgomery_role?: string;
  proj_cater_desc?: string;
  proj_cater_role?: string;
  proj_diesel_desc?: string;
  proj_diesel_role?: string;
  proj_salvaje_desc?: string;
  proj_salvaje_role?: string;
  proj_moritz_desc?: string;
  proj_moritz_role?: string;
  proj_globalmed_desc?: string;
  proj_globalmed_role?: string;
  proj_emodula_desc?: string;
  proj_emodula_role?: string;
  proj_junca_desc?: string;
  proj_junca_role?: string;
  proj_silvia_desc?: string;
  proj_silvia_role?: string;
  proj_gmx_desc?: string;
  proj_gmx_role?: string;
  version_current_v2?: string;
  version_current_v1?: string;
  version_switch_to_v1?: string;
  version_switch_to_v2?: string;
  version_toast_v2?: string;
  version_toast_v1?: string;

  // Experience page detailed jobs
  exp_sparktech_role?: string;
  exp_sparktech_period?: string;
  exp_sparktech_location?: string;
  exp_sparktech_type?: string;
  exp_sparktech_badge?: string;
  exp_sparktech_summary?: string;
  exp_sparktech_h1?: string;
  exp_sparktech_h2?: string;
  exp_sparktech_h3?: string;
  exp_sparktech_h4?: string;
  exp_sparktech_h5?: string;
  exp_sparktech_h6?: string;
  exp_sparktech_h7?: string;
  exp_sparktech_h8?: string;

  exp_designsilc_role?: string;
  exp_designsilc_period?: string;
  exp_designsilc_location?: string;
  exp_designsilc_type?: string;
  exp_designsilc_badge?: string;
  exp_designsilc_summary?: string;
  exp_designsilc_h1?: string;
  exp_designsilc_h2?: string;
  exp_designsilc_h3?: string;
  exp_designsilc_h4?: string;
  exp_designsilc_h5?: string;
  exp_designsilc_h6?: string;

  exp_frontier_role?: string;
  exp_frontier_period?: string;
  exp_frontier_location?: string;
  exp_frontier_type?: string;
  exp_frontier_badge?: string;
  exp_frontier_summary?: string;
  exp_frontier_h1?: string;
  exp_frontier_h2?: string;
  exp_frontier_h3?: string;
  exp_frontier_h4?: string;
  exp_frontier_h5?: string;
  exp_frontier_h6?: string;

  exp_cta_tag?: string;
  exp_cta_heading?: string;
  exp_cta_desc?: string;
  exp_cta_button?: string;
  exp_cta_whatsapp?: string;

  footer_location?: string;
  footer_chat_whatsapp?: string;

  [key: string]: string | undefined;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_projects: "Projects",
    nav_reviews: "Reviews",
    nav_contact: "Contact",
    nav_quote: "Get a Quote",
    nav_language: "Language",
    nav_search_lang: "Search language...",
    nav_popular: "Popular",
    nav_all_languages: "All Languages (100+)",
    nav_color_mood: "Color Mood",
    nav_surface_mode: "Surface Mode",
    nav_light: "Light",
    nav_dark: "Dark",
    nav_magic_cursor: "Magic Cursor",

    hero_badge: "Full-Stack Web Developer & WordPress Expert",
    hero_heading_1: "Full-Stack Web Developer &",
    hero_heading_gradient: "WordPress Expert",
    hero_heading_2: "AI-Assisted Development • Vibe Coding • Modern Web",
    hero_subheading: "Building modern, scalable, and high-performing web experiences with AI-assisted development, advanced vibe coding workflows, and WordPress expertise.",
    hero_bio: "I build modern websites, web applications, eCommerce platforms, and custom digital experiences by combining full-stack development, WordPress expertise, AI-assisted coding, and rapid vibe coding workflows.",
    hero_download_cv: "DOWNLOAD CV",
    hero_view_projects: "VIEW PROJECTS",

    stat_exp_val: "5+",
    stat_exp_lbl: "Years Experience",
    stat_proj_val: "200+",
    stat_proj_lbl: "Completed Projects",
    stat_clients_val: "150+",
    stat_clients_lbl: "Happy Clients",
    stat_satisfaction_val: "99%",
    stat_satisfaction_lbl: "Client Satisfaction",

    about_heading: "Full-Stack Development Meets AI-Powered Coding",
    about_p1: "I’m a Full-Stack Web Developer and WordPress Expert with hands-on experience building business websites, eCommerce platforms, dynamic websites, landing pages, and custom web experiences for international clients.",
    about_p2: "My core expertise includes WordPress, Elementor Pro, WooCommerce, JetEngine, custom content systems, responsive UI development, website optimization, troubleshooting, and website deployment.",
    about_p3: "Alongside WordPress, I work with modern web development technologies and AI-assisted coding workflows. I use AI as a development partner for planning, coding, debugging, optimization, rapid prototyping, and implementation.",
    about_p4: "I’m also highly experienced in vibe coding — using AI-powered development workflows to transform ideas, requirements, and designs into functional and polished web experiences efficiently.",
    about_p5: "My approach combines human development expertise, AI assistance, modern technologies, and practical problem-solving to build high-quality websites and web applications efficiently.",
    about_skills_title: "Core Expertise & Capabilities",

    services_heading: "Services & Capabilities",
    services_subtitle: "From high-performance full-stack web applications and AI-driven vibe coding to enterprise WordPress and WooCommerce platforms.",
    svc_1_title: "Full-Stack Web Development",
    svc_1_desc: "Building modern, responsive, functional web applications using current frontend and backend technologies.",
    svc_2_title: "WordPress Development",
    svc_2_desc: "Professional WordPress websites, Elementor Pro builds, WooCommerce stores, dynamic websites, custom functionality, and business websites.",
    svc_3_title: "AI-Assisted Web Development",
    svc_3_desc: "Using AI-powered development workflows to accelerate planning, coding, debugging, prototyping, testing, and iteration.",
    svc_4_title: "Vibe Coding",
    svc_4_desc: "Transforming ideas, requirements, and designs into functional web experiences through AI-assisted rapid development workflows.",
    svc_5_title: "Custom Web Solutions",
    svc_5_desc: "Building custom features, dashboards, forms, dynamic systems, integrations, and tailored digital experiences.",
    svc_6_title: "Website Optimization",
    svc_6_desc: "Improving website performance, responsiveness, usability, technical structure, and overall user experience.",
    svc_7_title: "WooCommerce Stores",
    svc_7_desc: "Feature-rich eCommerce storefronts optimized for high conversions, smooth checkout, and seamless UX.",
    svc_8_title: "Landing Page Development",
    svc_8_desc: "High-converting, responsive landing pages built specifically for leads, sales, and speed.",

    tech_heading: "Technologies I Work With",

    portfolio_heading: "Recent Projects",
    portfolio_subtitle: "A curated showcase of recent high-converting WordPress & modern web client projects. Hover over cards to preview full pages.",
    portfolio_view_project: "View Project",
    portfolio_show_more: "View All Projects",
    portfolio_show_less: "Show Less",

    reviews_heading: "What Our Clients Say",
    reviews_subtitle: "Trusted feedback from businesses and partners worldwide.",

    contact_heading: "Have an idea? Let's build it.",
    contact_subtitle: "Whether you need a WordPress website, eCommerce store, custom web application, or a modern AI-assisted web solution, let's turn your idea into a working digital experience.",
    contact_first_name: "First Name",
    contact_last_name: "Last Name",
    contact_email: "Email Address",
    contact_phone: "Phone Number (Optional)",
    contact_project_type: "Project Type",
    contact_budget: "Estimated Budget",
    contact_message: "Your Message",
    contact_send: "Send Message",
    contact_sending: "Sending...",
    contact_success_title: "Message Sent Successfully!",
    contact_success_desc: "Thank you for reaching out. I'll get back to you within 24 hours.",
    contact_send_another: "Send Another Message",
    contact_info_title: "Direct Contact Information",
    contact_location: "Dhaka, Bangladesh (Serving Worldwide)",
    contact_available: "Available for new projects",

    footer_tagline: "Full-Stack Web Developer & WordPress Expert specializing in modern web applications, AI-assisted coding, and high-converting WordPress solutions.",
    footer_quick_links: "Quick Navigation",
    footer_rights: "All rights reserved.",

    // Extended sections
    workflow_badge: "Modern Engineering Workflow",
    workflow_heading: "AI-Powered Development & Vibe Coding",
    workflow_subtitle: "I don’t blindly generate code — I engineer solutions. By pairing full-stack & WordPress expertise with intelligent AI coding workflows, I turn ideas into production-ready web experiences 3x faster without compromising quality.",
    how_heading: "How I Build",
    how_subtitle: "A structured, quality-driven approach from initial discovery to high-performance launch.",
    how_s1_name: "Understand",
    how_s1_desc: "Understand the business, user requirements, goals, and technical requirements.",
    how_s2_name: "Plan",
    how_s2_desc: "Define the structure, functionality, technology, and development approach.",
    how_s3_name: "Build",
    how_s3_desc: "Use modern development techniques, WordPress, and AI-assisted coding workflows to implement the solution.",
    how_s4_name: "Test",
    how_s4_desc: "Test responsiveness, functionality, usability, performance, and edge cases.",
    how_s5_name: "Optimize",
    how_s5_desc: "Refine the experience, fix issues, optimize performance, and prepare the final product.",
    tech_subtitle: "Grouped into core frontend, backend, WordPress architecture, and modern AI development workflows with official brand identities.",
    tab_all_tech: "All Technologies",
    tab_wp: "WordPress",
    tab_frontend: "Frontend",
    tab_backend: "Backend",
    tab_ai: "AI & Workflow",
    cat_all: "All Projects",
    cat_wp: "WordPress",
    cat_woo: "WooCommerce",
    cat_business: "Business Website",
    cat_custom: "Custom Development",
    cat_ai: "AI & Web Apps",
    blog_heading: "Latest from the Blog",
    blog_subtitle: "Insights, tutorials, and best practices on WordPress development, full-stack architecture, and AI-powered workflows.",
    exp_back_home: "Back to Home",
    exp_career_journey: "Career Journey",
    exp_verified_history: "Verified Work History",
    exp_page_heading: "Professional Experience",
    exp_intro: "Over 5+ years of delivering high-performing WordPress solutions, custom dynamic web architectures, eCommerce platforms, and AI-accelerated workflows for agencies and international clients.",
    exp_stat_dev: "Professional Dev",
    exp_stat_sites: "Client Websites",
    exp_stat_rating: "Client Rating",
    exp_stat_onsite: "Physical & Global",
    exp_responsibilities: "Key Responsibilities & Contributions",
    exp_tech_stack: "Tech Stack:",

    // Header Extra
    nav_experience: "Experience",
    nav_work_exp: "Work Experience",
    nav_client_reviews: "Client Reviews",
    nav_reviews_short: "Reviews",
    nav_work_exp_short: "Work Exp",

    // Workflow details
    wf_phase_1_tag: "Phase 01 • Strategy",
    wf_phase_1_title: "Vision & Architecture",
    wf_phase_1_desc: "Every project starts with human engineering. I analyze requirements, design database models, map user journeys, and establish scalable foundations.",
    wf_phase_1_benefit: "Flawless technical roadmap",
    wf_phase_2_tag: "Phase 02 • Acceleration",
    wf_phase_2_title: "Vibe Coding & Rapid Prototyping",
    wf_phase_2_desc: "Harnessing advanced AI workflows to rapidly translate ideas into pixel-perfect, responsive components, reducing prototyping time drastically.",
    wf_phase_2_benefit: "3x faster feature velocity",
    wf_phase_3_tag: "Phase 03 • Precision",
    wf_phase_3_title: "Refinement & Code Control",
    wf_phase_3_desc: "AI never works unsupervised. I review every line, audit architecture, eliminate bottlenecks, and ensure strict security and maintainability.",
    wf_phase_3_benefit: "Zero blind AI generation",
    wf_phase_4_tag: "Phase 04 • Perfection",
    wf_phase_4_title: "Performance & Launch",
    wf_phase_4_desc: "Rigorous cross-device testing, 90+ Core Web Vitals optimization, accessibility audits, and smooth deployment to live production environments.",
    wf_phase_4_benefit: "Production-ready scale",
    wf_badge_1: "⚡ Rapid Concept to Execution",
    wf_badge_2: "🛡️ 100% Human-Supervised Architecture",
    wf_badge_3: "💎 Clean, Maintainable Codebase",
    wf_badge_4: "🚀 Cross-Device & Speed Optimized",

    // Testimonials
    review_1_body: "Sujon built our WooCommerce fashion store and the results exceeded our expectations. The custom filtering and smooth checkout flow have significantly boosted our sales. His speed optimization is wizardry!",
    review_1_company: "CEO, Glamour Boutique",
    review_2_body: "Our consulting website is incredibly fast and looks stunning. Sujon made the Elementor integration easy to manage ourselves, and our search engine rankings rose immediately after launch.",
    review_2_company: "Founder, Apex Consulting",
    review_3_body: "Sujon delivered a robust real estate booking platform that runs flawlessly. He integrated dynamic mapping and WhatsApp support seamlessly. Highly professional and responsive developer.",
    review_3_company: "Operations Director, PropLink",
    review_4_body: "We needed a high-performance landing page in under a week. Sujon delivered a page that loads in sub-seconds and has a conversion rate of over 12%. Exceptional work!",
    review_4_company: "Campaign Manager, CloudSaaS",
    review_5_body: "The car booking calendar Sujon integrated into our website is brilliant. It handles variable seasonal pricing perfectly and our booking management is completely automated now.",
    review_5_company: "Owner, Elite Ride",
    review_6_body: "Sujon is our go-to guy for all WordPress maintenance. He keeps our multisite secure, updated, and lightning-fast. The post-launch support is worth every dollar.",
    review_6_company: "Marketing Director, TechCorp",

    // Blog
    blog_read_more: "Read More",
    blog_show_more: "View All Articles",
    blog_show_less: "Show Less",
    blog_1_title: "How to Build a Professional WordPress Website",
    blog_2_title: "Best Elementor Tips for Business Websites",
    blog_3_title: "WooCommerce Speed Optimization Guide",
    blog_4_title: "Why Headless WordPress is the Future",
    blog_5_title: "Vibe Coding: The Future of Web Development",
    blog_6_title: "Dynamic Websites with JetEngine & CPT",
    blog_7_title: "AI-Assisted Web Debugging Best Practices",
    blog_8_title: "From Freelance to Enterprise: WordPress Developer Journey",

    // Portfolio items
    proj_appliance_desc: "An eCommerce WooCommerce website built for Appliance World, featuring a structured product catalog, product categories, pricing, shopping functionality, and a streamlined online shopping experience for home appliances and electronics.",
    proj_appliance_role: "Lead WordPress & WooCommerce Developer",
    proj_tommys_desc: "A modern real estate listing website for Wellington's market leader featuring property search filters, featured property showcases, agent directories, and client inquiry forms.",
    proj_tommys_role: "WordPress & Frontend Developer",
    proj_montgomery_desc: "A picturesque boutique inn and cottage destination website located in Prince Edward Island, Canada, featuring Anne of Green Gables heritage, guest room & suite showcases, local tourism guides, and online booking workflows.",
    proj_montgomery_role: "Lead WordPress & UI Developer",
    proj_cater_desc: "Modern psychiatry & tele-health practice website featuring online booking funnels, patient intake forms, HIPAA-compliant patient communication, and comprehensive psychiatric services directory.",
    proj_cater_role: "Full-Stack WordPress Developer",
    proj_diesel_desc: "Heavy-duty truck & commercial fleet repair website engineered for maximum conversion, 24/7 roadside assistance dispatch, service catalog, and instant estimate requests.",
    proj_diesel_role: "Lead Web & Conversion Developer",
    proj_salvaje_desc: "High-end corporate website for an international investment and luxury hospitality conglomerate featuring multilingual architecture, portfolio showcase, and executive presentations.",
    proj_salvaje_role: "Senior WordPress Architect",
    proj_moritz_desc: "Ultra-minimalist modern personal brand and strategic advisory portfolio for German consultant Moritz Dunkel, showcasing executive advisory, publications, and keynote booking.",
    proj_moritz_role: "UI/UX & WordPress Developer",
    proj_globalmed_desc: "International medical tourism and specialist healthcare portal connecting global patients with certified hospital networks, specialist doctor consultations, and medical travel coordination.",
    proj_globalmed_role: "Full-Stack WordPress Developer",
    proj_emodula_desc: "Next-generation modular prefab architectural housing platform with interactive 3D model configurators, floor plan downloads, cost calculators, and custom quote builders.",
    proj_emodula_role: "Lead Frontend & WordPress Developer",
    proj_junca_desc: "A premium futuristic web application built for ambitious tech companies, featuring immersive 3D robotics, interactive audio design, modern dark aesthetics, and ultra-smooth performance.",
    proj_junca_role: "Lead Web Architect & 3D Interactive Developer",
    proj_silvia_desc: "An avant-garde cyberpunk creative frontend portfolio engineered with Three.js, GSAP motion design, interactive WebGL skull visualization, audio synthesis, and brutalist high-contrast typography.",
    proj_silvia_role: "Creative Frontend & WebGL Interaction Developer",
    proj_gmx_desc: "A luxury digital reality and high-end real estate web platform featuring cinematic 3D visual engineering, immersive animations, bespoke lighting effects, and flawless responsive performance.",
    proj_gmx_role: "Lead Full-Stack Web Architect & 3D Interactive Developer",
    version_current_v2: "v2.0 (New Edition)",
    version_current_v1: "v1.0 (Classic Mode)",
    version_switch_to_v1: "Switch to Classic",
    version_switch_to_v2: "Switch to New v2.0",
    version_toast_v2: "Switched to New Version (v2.0) with latest features ✨",
    version_toast_v1: "Switched to Classic Version (v1.0)",

    // Experience page detailed jobs
    exp_sparktech_role: "Executive WordPress Developer",
    exp_sparktech_period: "Jan 2025 – Oct 2026",
    exp_sparktech_location: "On-Site (Physical)",
    exp_sparktech_type: "Full-Time (On-Site)",
    exp_sparktech_badge: "Latest Role",
    exp_sparktech_summary: "Worked on-site on international client projects, developing and maintaining professional WordPress websites, custom dynamic web solutions, and modern AI-accelerated vibe coding workflows.",
    exp_sparktech_h1: "Developed responsive business websites and high-converting landing pages using WordPress and Elementor Pro.",
    exp_sparktech_h2: "Engineered advanced dynamic websites using JetEngine, Custom Post Types (CPT), relational meta fields, and dynamic listing grids.",
    exp_sparktech_h3: "Built and customized WooCommerce stores with custom product flows, payment gateways, and booking workflows.",
    exp_sparktech_h4: "Converted complex Figma and PSD design systems into pixel-perfect, responsive WordPress websites.",
    exp_sparktech_h5: "Customized WordPress themes, plugins, templates, and core website functionality to match client specifications.",
    exp_sparktech_h6: "Configured automated forms, booking systems, email workflows, SMTP configurations, and third-party API integrations.",
    exp_sparktech_h7: "Handled domain, hosting, SSL certificates, DNS configurations, database migrations, and proactive maintenance.",
    exp_sparktech_h8: "Applied AI-assisted coding and vibe coding workflows to dramatically accelerate prototyping, debugging, and feature delivery.",

    exp_designsilc_role: "WordPress Developer",
    exp_designsilc_period: "2024 – 2024",
    exp_designsilc_location: "Agency Client Projects",
    exp_designsilc_type: "Contract",
    exp_designsilc_badge: "Agency Role",
    exp_designsilc_summary: "Specialized in responsive WordPress website customization, user-friendly frontend layouts, and conversion-focused business web experiences.",
    exp_designsilc_h1: "Developed and customized WordPress websites based on diverse project requirements.",
    exp_designsilc_h2: "Built responsive pages and targeted landing pages using Elementor with seamless cross-browser consistency.",
    exp_designsilc_h3: "Converted design concepts and wireframes into clean, functional WordPress websites.",
    exp_designsilc_h4: "Customized theme layouts, styling components, and navigation structures.",
    exp_designsilc_h5: "Diagnosed and resolved responsive layout bottlenecks across desktop, mobile, and tablet viewports.",
    exp_designsilc_h6: "Conducted site maintenance, security updates, and performance tuning for live client websites.",

    exp_frontier_role: "Senior WordPress Developer",
    exp_frontier_period: "2021 – 2023",
    exp_frontier_location: "Client Solutions",
    exp_frontier_type: "Senior Role",
    exp_frontier_badge: "Senior Technical Role",
    exp_frontier_summary: "Spearheaded client website development, custom layout architecture, WooCommerce implementations, and search-engine-friendly performance optimization.",
    exp_frontier_h1: "Delivered professional WordPress websites for corporate and business clients using Elementor Pro.",
    exp_frontier_h2: "Transformed Figma and PSD assets into high-performance, mobile-first WordPress websites.",
    exp_frontier_h3: "Developed and tailored custom WooCommerce functionality, product catalogs, and checkout experiences.",
    exp_frontier_h4: "Implemented dynamic content architectures and custom WordPress features tailored to client business models.",
    exp_frontier_h5: "Optimized websites for speed, Core Web Vitals, and search-engine-friendly technical SEO structure.",
    exp_frontier_h6: "Managed website migrations, deployment pipelines, and provided post-launch technical support.",

    exp_cta_tag: "Direct Collaboration",
    exp_cta_heading: "Need an Experienced Senior Developer?",
    exp_cta_desc: "Available for high-stakes WordPress development, custom web solutions, and AI-accelerated projects with guaranteed delivery.",
    exp_cta_button: "Get in Touch",
    exp_cta_whatsapp: "Chat on WhatsApp",

    footer_location: "Rampura, Banasree, Dhaka",
    footer_chat_whatsapp: "WhatsApp Chat",
  },

  bn: {
    nav_home: "হোম",
    nav_about: "পরিচিতি",
    nav_services: "সেবাসমূহ",
    nav_projects: "প্রজেক্ট",
    nav_reviews: "মতামত",
    nav_contact: "যোগাযোগ",
    nav_quote: "কোটেশন নিন",
    nav_language: "ভাষা",
    nav_search_lang: "ভাষা খুঁজুন...",
    nav_popular: "জনপ্রিয় ভাষা",
    nav_all_languages: "সকল ভাষা (১০০+)",
    nav_color_mood: "কালার মুড",
    nav_surface_mode: "সারফেস মোড",
    nav_light: "লাইট",
    nav_dark: "ডার্ক",
    nav_magic_cursor: "ম্যাজিক কার্সর",

    hero_badge: "ফুল-স্ট্যাক ডেভেলপার ও ওয়ার্ডপ্রেস বিশেষজ্ঞ",
    hero_heading_1: "ফুল-স্ট্যাক ওয়েব ডেভেলপার ও",
    hero_heading_gradient: "ওয়ার্ডপ্রেস বিশেষজ্ঞ",
    hero_heading_2: "আধুনিক ওয়েব • এআই কোডিং • ভাইব কোডিং",
    hero_subheading: "এআই-অ্যাসিস্টেড ডেভেলপমেন্ট, অ্যাডভান্সড ভাইব কোডিং ওয়ার্কফ্লো এবং ওয়ার্ডপ্রেস দক্ষতার মাধ্যমে আধুনিক, স্কেলেবল ও দ্রুতগতির ওয়েব অভিজ্ঞতা তৈরি করছি।",
    hero_bio: "আমি ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট, ওয়ার্ডপ্রেস এক্সপার্টাইজ এবং আধুনিক এআই-অ্যাসিস্টেড কোডিং ও ভাইব কোডিং ওয়ার্কফ্লোর সমন্বয়ে আধুনিক ওয়েবসাইট ও ওয়েব অ্যাপ্লিকেশন তৈরি করি।",
    hero_download_cv: "সিভি ডাউনলোড",
    hero_view_projects: "প্রজেক্ট দেখুন",

    stat_exp_val: "৫+",
    stat_exp_lbl: "বছরের অভিজ্ঞতা",
    stat_proj_val: "২০০+",
    stat_proj_lbl: "সম্পন্ন প্রজেক্ট",
    stat_clients_val: "১৫০+",
    stat_clients_lbl: "সন্তুষ্ট ক্লায়েন্ট",
    stat_satisfaction_val: "৯৯%",
    stat_satisfaction_lbl: "ক্লায়েন্ট সন্তুষ্টি",

    about_heading: "ফুল-স্ট্যাক ডেভেলপমেন্ট ও এআই-পাওয়ার্ড কোডিং",
    about_p1: "আমি একজন ফুল-স্ট্যাক ওয়েব ডেভেলপার এবং ওয়ার্ডপ্রেস বিশেষজ্ঞ। আন্তর্জাতিক ক্লায়েন্টদের জন্য ব্যবসায়িক ওয়েবসাইট, ই-কমার্স এবং আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি করে থাকি।",
    about_p2: "আমার প্রধান দক্ষতার মধ্যে রয়েছে WordPress, Elementor Pro, WooCommerce, JetEngine, কাস্টম কন্টেন্ট সিস্টেম, রেসপনসিভ UI ডিজাইন, ওয়েবসাইট অপটিমাইজেশন, ট্রাবলশুটিং এবং ওয়েবসাইট ডেপ্লয়মেন্ট।",
    about_p3: "ওয়ার্ডপ্রেসের পাশাপাশি আমি আধুনিক ওয়েব প্রযুক্তি এবং এআই-অ্যাসিস্টেড কোডিং ওয়ার্কফ্লোতে কাজ করি। প্ল্যানিং, কোডিং, ডিবাগিং, পারফরম্যান্স টিউনিং এবং দ্রুত প্রোটোটাইপ তৈরিতে এআই-কে পার্টনার হিসেবে ব্যবহার করি।",
    about_p4: "ভাইব কোডিংয়ে আমার গভীর অভিজ্ঞতা রয়েছে—এআই-পাওয়ার্ড ডেভেলপমেন্ট প্রক্রিয়ার মাধ্যমে আইডিয়া ও রিকোয়ারমেন্টকে খুব দ্রুত চমৎকার এবং কার্যকরী ওয়েবসাইটে রূপান্তর করতে পারি।",
    about_p5: "আমার লক্ষ্য হলো মানুষের প্রকৌশল দক্ষতা, এআই অ্যাসিস্ট্যান্স এবং আধুনিক প্রযুক্তির সমন্বয়ে সর্বোচ্চ মানের ওয়েবসাইট ও ওয়েব অ্যাপ্লিকেশন অত্যন্ত দ্রুত ও সফলভাবে নির্মাণ করা।",
    about_skills_title: "বিশেষ দক্ষতাসমূহ",

    services_heading: "আমাদের সেবাসমূহ",
    services_subtitle: "আপনার ব্যবসায়ের সফলতার জন্য ফুল-স্ট্যাক, ওয়ার্ডপ্রেস এবং এআই-পাওয়ার্ড ওয়েব সলিউশন।",
    svc_1_title: "ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট",
    svc_1_desc: "আধুনিক ফ্রন্টএন্ড ও ব্যাকএন্ড প্রযুক্তির সমন্বয়ে রেসপনসিভ ও শক্তিশালী ওয়েব অ্যাপ্লিকেশন নির্মাণ।",
    svc_2_title: "ওয়ার্ডপ্রেস ডেভেলপমেন্ট",
    svc_2_desc: "প্রফেশনাল ওয়ার্ডপ্রেস ওয়েবসাইট, এলিমেন্টর প্রো বিল্ড, উকমার্স শপ ও কাস্টম ফাংশনালিটি।",
    svc_3_title: "এআই-অ্যাসিস্টেড ডেভেলপমেন্ট",
    svc_3_desc: "উন্নত এআই ওয়ার্কফ্লো ব্যবহারের মাধ্যমে দ্রুত প্ল্যানিং, কোডিং, ডিবাগিং ও টেস্টিং সমাধান।",
    svc_4_title: "ভাইব কোডিং",
    svc_4_desc: "আইডিয়া ও রিকোয়ারমেন্টকে দ্রুত কার্যকরী ও চমৎকার ওয়েব ইন্টারফেসে রূপান্তর।",
    svc_5_title: "কাস্টম ওয়েব সলিউশন",
    svc_5_desc: "কাস্টম ফিচার, ড্যাশবোর্ড, ডায়নামিক সিস্টেম ও ইন্টিগ্রেশন সমাধান।",
    svc_6_title: "ওয়েবসাইট অপটিমাইজেশন",
    svc_6_desc: "ওয়েবসাইটের পারফরম্যান্স, গতি, রেসপনসিভনেস ও ব্যবহারযোগ্যতা বৃদ্ধি।",
    svc_7_title: "উকমার্স শপ ডেভেলপমেন্ট",
    svc_7_desc: "উচ্চ কনভার্সন রেট ও সহজ পেমেন্ট গেটওয়ে সহ পূর্ণাঙ্গ অনলাইন শপ।",
    svc_8_title: "ল্যান্ডিং পেজ ডেভেলপমেন্ট",
    svc_8_desc: "লিড সংগ্রহ ও বিক্রয়ের জন্য বিশেষায়িত হাই-কনভার্টিং ল্যান্ডিং পেজ।",

    tech_heading: "যেসব প্রযুক্তিতে কাজ করি",

    portfolio_heading: "সাম্প্রতিক প্রজেক্টসমূহ",
    portfolio_subtitle: "সদ্য সম্পন্নকৃত কিছু সফল ওয়ার্ডপ্রেস ও আধুনিক ওয়েব প্রজেক্টের গ্যালারি। সম্পূর্ণ পেজ দেখতে কার্ডে হোভার করুন।",
    portfolio_view_project: "প্রজেক্ট দেখুন",
    portfolio_show_more: "সবগুলো প্রজেক্ট দেখুন",
    portfolio_show_less: "কম প্রজেক্ট দেখুন",

    reviews_heading: "ক্লায়েন্টদের প্রতিক্রিয়া",
    reviews_subtitle: "বিশ্বজুড়ে আমাদের সম্মানিত ক্লায়েন্ট ও পার্টনারদের বিশ্বস্ত মতামত।",

    contact_heading: "আপনার কি কোনো আইডিয়া আছে? চলুন তৈরি করি।",
    contact_subtitle: "ওয়ার্ডপ্রেস ওয়েবসাইট, ই-কমার্স স্টোর কিংবা আধুনিক এআই-পাওয়ার্ড ওয়েব সমাধান—আপনার স্বপ্নকে বাস্তবে রূপ দিতে যোগাযোগ করুন।",
    contact_first_name: "প্রথম নাম",
    contact_last_name: "শেষ নাম",
    contact_email: "ইমেইল অ্যাড্রেস",
    contact_phone: "ফোন নম্বর (ঐচ্ছিক)",
    contact_project_type: "প্রজেক্টের ধরন",
    contact_budget: "আনুমানিক বাজেট",
    contact_message: "আপনার বিস্তারিত বার্তা",
    contact_send: "বার্তা পাঠান",
    contact_sending: "পাঠানো হচ্ছে...",
    contact_success_title: "বার্তা সফলভাবে পাঠানো হয়েছে!",
    contact_success_desc: "ধন্যবাদ! আমি আগামী ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করব।",
    contact_send_another: "আরেকটি বার্তা পাঠান",
    contact_info_title: "সরাসরি যোগাযোগের ঠিকানা",
    contact_location: "ঢাকা, বাংলাদেশ (বিশ্বব্যাপী সেবা)",
    contact_available: "নতুন প্রজেক্টের জন্য প্রস্তুত",

    footer_tagline: "ফুল-স্ট্যাক ওয়েব ডেভেলপার ও ওয়ার্ডপ্রেস বিশেষজ্ঞ — আধুনিক অ্যাপ্লিকেশন ও কনভার্সন-কেন্দ্রিক সমাধান।",
    footer_quick_links: "প্রয়োজনীয় লিঙ্ক",
    footer_rights: "সর্বস্বত্ব সংরক্ষিত।",

    // Extended sections
    workflow_badge: "আধুনিক ইঞ্জিনিয়ারিং ওয়ার্কফ্লো",
    workflow_heading: "এআই-পাওয়ার্ড ডেভেলপমেন্ট ও ভাইব কোডিং",
    workflow_subtitle: "আমি অন্ধভাবে কোড জেনারেট করি না—প্রকৃত সমাধান তৈরি করি। ফুল-স্ট্যাক ও ওয়ার্ডপ্রেস দক্ষতার সাথে এআই কোডিং ওয়ার্কফ্লো যুক্ত করে ৩ গুণ দ্রুত প্রডাকশন-রেডি ওয়েব তৈরি করি।",
    how_heading: "যেভাবে কাজ করি",
    how_subtitle: "প্রথম আবিষ্কার থেকে হাই-পারফরম্যান্স লঞ্চ পর্যন্ত একটি সুবিন্যস্ত ও কোয়ালিটি-নির্ভর পদ্ধতি।",
    how_s1_name: "অনুধাবন",
    how_s1_desc: "ব্যবসা, ব্যবহারকারীর চাহিদা, লক্ষ্য ও প্রযুক্তিগত রিকোয়ারমেন্ট নিখুঁতভাবে বোঝা।",
    how_s2_name: "পরিকল্পনা",
    how_s2_desc: "ওয়েবসাইটের কাঠামো, কার্যকারিতা, প্রযুক্তি এবং বাস্তবায়নের রোডম্যাপ তৈরি করা।",
    how_s3_name: "নির্মাণ",
    how_s3_desc: "আধুনিক প্রযুক্তি, ওয়ার্ডপ্রেস এবং এআই কোডিং ওয়ার্কফ্লো দিয়ে সমাধান তৈরি।",
    how_s4_name: "টেস্টিং",
    how_s4_desc: "রেসপনসিভনেস, কার্যকারিতা, ব্যবহারযোগ্যতা, গতি ও সব ধরনের ত্রুটি যাচাই।",
    how_s5_name: "অপটিমাইজ",
    how_s5_desc: "চূড়ান্ত পারফরম্যান্স বৃদ্ধি, বাগ ফিক্স এবং লাইভ প্রডাকশনের জন্য প্রস্তুত করা।",
    tech_subtitle: "ফ্রন্টএন্ড, ব্যাকএন্ড, ওয়ার্ডপ্রেস আর্কিটেকচার এবং আধুনিক এআই ডেভেলপমেন্টের অফিসিয়াল প্রযুক্তি ও ব্র্যান্ড টুলস।",
    tab_all_tech: "সব প্রযুক্তি",
    tab_wp: "WordPress",
    tab_frontend: "ফ্রন্টএন্ড",
    tab_backend: "ব্যাকএন্ড",
    tab_ai: "AI ও ওয়ার্কফ্লো",
    cat_all: "সকল প্রজেক্ট",
    cat_wp: "WordPress",
    cat_woo: "WooCommerce",
    cat_business: "বিজনেস ওয়েবসাইট",
    cat_custom: "কাস্টম ডেভেলপমেন্ট",
    cat_ai: "AI ও ওয়েব অ্যাপস",
    blog_heading: "ব্লগের সর্বশেষ লেখা",
    blog_subtitle: "ওয়ার্ডপ্রেস ডেভেলপমেন্ট, ফুল-স্ট্যাক আর্কিটেকচার এবং এআই ওয়ার্কফ্লো নিয়ে গভীর অন্তর্দৃষ্টি ও টিউটোরিয়াল।",
    exp_back_home: "হোমে ফিরে যান",
    exp_career_journey: "ক্যারিয়ার জার্নি",
    exp_verified_history: "যাচাইকৃত কাজের ইতিহাস",
    exp_page_heading: "প্রফেশনাল অভিজ্ঞতা",
    exp_intro: "এজেন্সি ও আন্তর্জাতিক ক্লায়েন্টদের জন্য হাই-পারফর্মিং ওয়ার্ডপ্রেস সলিউশন, কাস্টম ডায়নামিক আর্কিটেকচার, ই-কমার্স ও এআই ওয়ার্কফ্লোতে ৫+ বছরের বাস্তব কাজের অভিজ্ঞতা।",
    exp_stat_dev: "প্রফেশনাল ডেভেলপার",
    exp_stat_sites: "ক্লায়েন্ট ওয়েবসাইট",
    exp_stat_rating: "ক্লায়েন্ট রেটিং",
    exp_stat_onsite: "অন-সাইট ও গ্লোবাল",
    exp_responsibilities: "মূল দায়িত্ব ও অবদানসমূহ",
    exp_tech_stack: "ব্যবহৃত প্রযুক্তি:",

    // Header Extra
    nav_experience: "অভিজ্ঞতা",
    nav_work_exp: "কাজের অভিজ্ঞতা",
    nav_client_reviews: "ক্লায়েন্ট রিভিউ",
    nav_reviews_short: "রিভিউ",
    nav_work_exp_short: "অভিজ্ঞতা",

    // Workflow details
    wf_phase_1_tag: "ধাপ ০১ • কৌশল",
    wf_phase_1_title: "পরিকল্পনা ও স্থাপত্য",
    wf_phase_1_desc: "প্রতিটি প্রজেক্ট মানবীয় প্রকৌশল দিয়ে শুরু হয়। আমি রিকোয়ারমেন্ট বিশ্লেষণ, ডেটাবেস মডেলিং, ইউজার জার্নি ম্যাপিং এবং স্কেলযোগ্য ভিত্তি তৈরি করি।",
    wf_phase_1_benefit: "নিখুঁত প্রযুক্তিগত রোডম্যাপ",
    wf_phase_2_tag: "ধাপ ০২ • দ্রুতায়ন",
    wf_phase_2_title: "ভাইব কোডিং ও দ্রুত প্রোটোটাইপিং",
    wf_phase_2_desc: "উন্নত এআই ওয়ার্কফ্লো কাজে লাগিয়ে দ্রুত ধারণাকে পিক্সেল-পারফেক্ট ও রেসপনসিভ কম্পোনেন্টে রূপান্তর করি, যা প্রোটোটাইপিং সময় বহুলাংশে কমিয়ে আনে।",
    wf_phase_2_benefit: "৩ গুণ দ্রুত ফিচার ডেলিভারি",
    wf_phase_3_tag: "ধাপ ০৩ • নিখুঁত নিয়ন্ত্রণ",
    wf_phase_3_title: "কোড রিফাইনমেন্ট ও নিয়ন্ত্রণ",
    wf_phase_3_desc: "এআই কখনো একা কাজ করে না। আমি প্রতি লাইন কোড নিরীক্ষা করি, আর্কিটেকচার অডিট করি, পারফরম্যান্স বাধা দূর করি এবং শতভাগ নিরাপত্তা নিশ্চিত করি।",
    wf_phase_3_benefit: "শতভাগ নির্ভরযোগ্য কোড",
    wf_phase_4_tag: "ধাপ ০৪ • পূর্ণতা",
    wf_phase_4_title: "পারফরম্যান্স ও লাইভ লঞ্চ",
    wf_phase_4_desc: "সব ডিভাইসে টেস্টিং, ৯০+ Core Web Vitals অপটিমাইজেশন, অ্যাক্সেসিবিলিটি অডিট এবং লাইভ প্রডাকশনে সফল ডেপ্লয়মেন্ট।",
    wf_phase_4_benefit: "প্রডাকশন-রেডি স্কেল",
    wf_badge_1: "⚡ দ্রুত ধারণা থেকে বাস্তবায়ন",
    wf_badge_2: "🛡️ ১০০% তদারকি করা আর্কিটেকচার",
    wf_badge_3: "💎 পরিচ্ছন্ন ও টেকসই কোডবেস",
    wf_badge_4: "🚀 সব ডিভাইসে সেরা গতি ও অপটিমাইজড",

    // Testimonials
    review_1_body: "সুজন আমাদের ফ্যাশন স্টোরের জন্য WooCommerce ওয়েবসাইট তৈরি করেছিলেন এবং ফলাফল আমাদের প্রত্যাশার চেয়েও বেশি ছিল। কাস্টম ফিল্টারিং ও মসৃণ চেকআউট ফ্লো আমাদের বিক্রয় উল্লেখযোগ্যভাবে বৃদ্ধি করেছে। তার স্পিড অপটিমাইজেশন দুর্দান্ত!",
    review_1_company: "সিইও, Glamour Boutique",
    review_2_body: "আমাদের কনসাল্টিং ওয়েবসাইটটি অসাধারণ দ্রুত এবং দেখতে অত্যন্ত প্রিমিয়াম। সুজন Elementor সেটাপ এমন সহজে ম্যানেজ করার উপযোগী করে দিয়েছেন যে আমরা নিজেরাই আপডেট করতে পারছি এবং চালুর পরপরই র‍্যাংকিং বেড়েছে।",
    review_2_company: "প্রতিষ্ঠাতা, Apex Consulting",
    review_3_body: "সুজন আমাদের রিয়েল এস্টেট প্ল্যাটফর্মের জন্য একটি শক্তিশালী সমাধান তৈরি করেছেন যা অত্যন্ত নিখুঁতভাবে চলছে। তিনি ডাইনামিক ম্যাপিং ও হোয়াটসঅ্যাপ সাপোর্ট দারুণভাবে যুক্ত করেছেন। অত্যন্ত দক্ষ ও দায়িত্বশীল ডেভেলপার।",
    review_3_company: "অপারেশনস ডিরেক্টর, PropLink",
    review_4_body: "এক সপ্তাহেরও কম সময়ে আমাদের একটি হাই-পারফরম্যান্স ল্যান্ডিং পেজ দরকার ছিল। সুজন এমন একটি সাইট ডেলিভারি দিয়েছেন যা সেকেন্ডের মধ্যে লোড হয় এবং কনভার্সন রেট ১২% এরও বেশি! প্রশংসনীয় কাজ!",
    review_4_company: "ক্যাম্পেইন ম্যানেজার, CloudSaaS",
    review_5_body: "সুজন আমাদের ওয়েবসাইটে যে গাড়ি বুকিং ক্যালেন্ডার সিস্টেম ইন্টিগ্রেট করেছেন তা চমৎকার। সিজনাল প্রাইসিং খুব সুন্দরভাবে হ্যান্ডেল হচ্ছে এবং আমাদের বুকিং ম্যানেজমেন্ট এখন সম্পূর্ণ অটোমেটেড।",
    review_5_company: "স্বত্বাধিকারী, Elite Ride",
    review_6_body: "ওয়ার্ডপ্রেসের যেকোনো কাজ ও সার্বিক রক্ষণাবেক্ষণের জন্য সুজন আমাদের প্রধান ভরসা। তিনি আমাদের মাল্টিসাইট সবসময় সুরক্ষিত, আপডেটেড এবং বিদ্যুতগতির রাখেন।",
    review_6_company: "মার্কেটিং ডিরেক্টর, TechCorp",

    // Blog
    blog_read_more: "আরও পড়ুন",
    blog_show_more: "সব ব্লগ দেখুন",
    blog_show_less: "কম দেখুন",
    blog_1_title: "কীভাবে একটি প্রফেশনাল ওয়ার্ডপ্রেস ওয়েবসাইট তৈরি করবেন",
    blog_2_title: "বিজনেস ওয়েবসাইটের জন্য সেরা Elementor টিপস",
    blog_3_title: "WooCommerce ওয়েবসাইটের গতি বৃদ্ধির সম্পূর্ণ গাইড",
    blog_4_title: "কেন Headless WordPress এন্টারপ্রাইজ ওয়েবের ভবিষ্যৎ",
    blog_5_title: "ভাইব কোডিং: ওয়েব ডেভেলপমেন্টের আধুনিক ভবিষ্যৎ",
    blog_6_title: "JetEngine ও CPT দিয়ে ডায়নামিক ওয়েবসাইট তৈরি",
    blog_7_title: "এআই সহযোগিতায় নিখুঁতভাবে ওয়েব বাগ সমাধানের কৌশল",
    blog_8_title: "ফ্রিল্যান্স থেকে এন্টারপ্রাইজ: একজন ওয়ার্ডপ্রেস ডেভেলপারের গল্প",

    // Portfolio items
    proj_appliance_desc: "Appliance World-এর জন্য তৈরি একটি পূর্ণাঙ্গ WooCommerce ই-কমার্স ওয়েবসাইট, যাতে রয়েছে সাজানো প্রোডাক্ট ক্যাটালগ, ক্যাটাগরি, লোকাল কারেন্সি এবং মসৃণ অনলাইন শপিং সুবিধা।",
    proj_appliance_role: "লিড ওয়ার্ডপ্রেস ও WooCommerce ডেভেলপার",
    proj_tommys_desc: "ওয়েলিংটনের শীর্ষ রিয়েল এস্টেট এজেন্সির জন্য তৈরি আধুনিক লিস্টিং ওয়েবসাইট, যাতে রয়েছে প্রোপার্টি সার্চ ফিল্টার, ফিচারড প্রোপার্টি ও এজেন্ট ডিরেক্টরি।",
    proj_tommys_role: "ওয়ার্ডপ্রেস ও ফ্রন্টএন্ড ডেভেলপার",
    proj_montgomery_desc: "কানাডার প্রিন্স এডওয়ার্ড আইল্যান্ডের ঐতিহাসিক বুটিক ইন ও কটেজের ওয়েবসাইট, যাতে রয়েছে রুম ও স্যুট শোকেস, দর্শনীয় স্থান নির্দেশিকা এবং অনলাইন রিজার্ভেশন।",
    proj_montgomery_role: "লিড ওয়ার্ডপ্রেস ও UI ডেভেলপার",
    proj_cater_desc: "আধুনিক সাইকিয়াট্রি ও টেলি-হেলথ ক্লিনিকের ওয়েবসাইট, যাতে রয়েছে সরাসরি অনলাইন অ্যাপয়েন্টমেন্ট বুকিং, পেশেন্ট ইনটেক ফর্ম এবং স্বাস্থ্যসেবার বিবরণ।",
    proj_cater_role: "ফুল-স্ট্যাক ওয়ার্ডপ্রেস ডেভেলপার",
    proj_diesel_desc: "ভারী ট্রাক ও কমার্শিয়াল ফ্লিট মেরামতের ওয়েবসাইট, যাতে রয়েছে ২৪/৭ জরুরি রোডসাইড অ্যাসিস্ট্যান্স ডিসপ্যাচ ও দ্রুত সার্ভিস এস্টিমেট রিকোয়েস্ট।",
    proj_diesel_role: "লিড ওয়েব ও কনভার্সন ডেভেলপার",
    proj_salvaje_desc: "আন্তর্জাতিক ইনভেস্টমেন্ট ও লাক্সারি হসপিটালিটি গ্রুপের জন্য কর্পোরেট পোর্টফোলিও ওয়েবসাইট, যাতে রয়েছে মাল্টি-ল্যাঙ্গুয়েজ আর্কিটেকচার।",
    proj_salvaje_role: "সিনিয়র ওয়ার্ডপ্রেস আর্কিটেক্ট",
    proj_moritz_desc: "জার্মান স্ট্র্যাটেজিক অ্যাডভাইজার মরিৎজ ডাঙ্কেলের জন্য মিনিমালিস্ট পার্সোনাল ব্র্যান্ড পোর্টফোলিও ও বুকিং সিস্টেম।",
    proj_moritz_role: "UI/UX ও ওয়ার্ডপ্রেস ডেভেলপার",
    proj_globalmed_desc: "আন্তর্জাতিক রোগীদের জন্য বিশ্বমানের হাসপাতাল ও বিশেষজ্ঞ ডাক্তারদের সাথে যুক্ত হওয়ার আন্তর্জাতিক মেডিকেল ট্যুরিজম পোর্টাল।",
    proj_globalmed_role: "ফুল-স্ট্যাক ওয়ার্ডপ্রেস ডেভেলপার",
    proj_emodula_desc: "ইন্টারেক্টিভ ৩ডি মডেল ও ফ্লোর প্ল্যান সহ মডার্ন প্রিফ্যাব আর্কিটেকচারাল হাউজিং ও কস্ট ক্যালকুলেটর প্ল্যাটফর্ম।",
    proj_emodula_role: "লিড ফ্রন্টএন্ড ও ওয়ার্ডপ্রেস ডেভেলপার",
    proj_junca_desc: "উচ্চমানের উদ্ভাবনী টেক কোম্পানিগুলোর জন্য তৈরি প্রিমিয়াম ফিউচারিস্টিক ওয়েব অ্যাপ্লিকেশন, যাতে রয়েছে আকর্ষণীয় 3D রোবোটিক্স, ইন্টারেক্টিভ অডিও ডিজাইন ও মসৃণ ডার্ক ইন্টারফেস।",
    proj_junca_role: "লিড ওয়েব আর্কিটেক্ট ও 3D ইন্টারঅ্যাক্টিভ ডেভেলপার",
    proj_silvia_desc: "Three.js এবং GSAP মোশন দিয়ে তৈরি সাইবারপাংক ক্রিয়েটিভ ফ্রন্টএন্ড পোর্টফোলিও, যাতে রয়েছে ইন্টারঅ্যাক্টিভ 3D ওয়্যারফ্রেম ভিজ্যুয়ালাইজেশন ও সাউন্ড সিন্থেসিস।",
    proj_silvia_role: "ক্রিয়েটিভ ফ্রন্টএন্ড ও WebGL ইন্টারঅ্যাকশন ডেভেলপার",
    proj_gmx_desc: "লাক্সারি রিয়েল এস্টেট ও ডিজিটাল রিয়েলিটি প্ল্যাটফর্ম, যাতে রয়েছে সিনেমাটিক 3D ভিজ্যুয়াল ইঞ্জিনিয়ারিং, দৃষ্টিনন্দন অ্যানিমেশন এবং নিরবচ্ছিন্ন পারফরম্যান্স।",
    proj_gmx_role: "লিড ফুল-স্ট্যাক ওয়েব আর্কিটেক্ট ও 3D ডেভেলপার",
    version_current_v2: "v2.0 (নতুন সংস্করণ)",
    version_current_v1: "v1.0 (ক্লাসিক মোড)",
    version_switch_to_v1: "ক্লাসিক মোডে যান",
    version_switch_to_v2: "নতুন ভার্সনে যান ✨",
    version_toast_v2: "নতুন ভার্সন (v2.0) লোড হয়েছে ✨",
    version_toast_v1: "ক্লাসিক ভার্সন (v1.0) লোড হয়েছে",

    // Experience page detailed jobs
    exp_sparktech_role: "এক্সিকিউটিভ ওয়ার্ডপ্রেস ডেভেলপার",
    exp_sparktech_period: "জানুয়ারি ২০২৫ – অক্টোবর ২০২৬",
    exp_sparktech_location: "অন-সাইট (অফিস)",
    exp_sparktech_type: "ফুল-টাইম (অন-সাইট)",
    exp_sparktech_badge: "সর্বশেষ পদ",
    exp_sparktech_summary: "আন্তর্জাতিক ক্লায়েন্ট প্রজেক্টে অন-সাইট অফিসে কাজ করেছি। প্রফেশনাল ওয়ার্ডপ্রেস ওয়েবসাইট, কাস্টম ডায়নামিক সমাধান এবং আধুনিক এআই-ত্বরান্বিত ভাইব কোডিং ওয়ার্কফ্লো বাস্তবায়ন করেছি।",
    exp_sparktech_h1: "WordPress এবং Elementor Pro ব্যবহার করে উচ্চ কনভার্সনযুক্ত ব্যবসায়িক ওয়েবসাইট ও ল্যান্ডিং পেজ নির্মাণ করেছি।",
    exp_sparktech_h2: "JetEngine, Custom Post Types (CPT), রিলেশনাল মেটা ফিল্ড এবং ডায়নামিক লিস্টিং গ্রিড ব্যবহার করে জটিল ডায়নামিক ওয়েবসাইট তৈরি করেছি।",
    exp_sparktech_h3: "কাস্টম প্রোডাক্ট ফ্লো, পেমেন্ট গেটওয়ে এবং বুকিং সিস্টেম সহ শক্তিশালী WooCommerce ই-কমার্স শপ তৈরি ও কাস্টমাইজ করেছি।",
    exp_sparktech_h4: "জটিল Figma ও PSD ডিজাইনকে পিক্সেল-পারফেক্ট ও শতভাগ রেসপনসিভ ওয়ার্ডপ্রেস ওয়েবসাইটে রূপান্তর করেছি।",
    exp_sparktech_h5: "ক্লায়েন্টের চাহিদা অনুযায়ী ওয়ার্ডপ্রেস থিম, প্লাগইন, টেমপ্লেট এবং কোর ফাংশনালিটি কাস্টমাইজ করেছি।",
    exp_sparktech_h6: "অটোমেটেড ফর্ম, বুকিং সিস্টেম, ইমেইল ওয়ার্কফ্লো, SMTP কনফিগারেশন এবং থার্ড-পার্টি API ইন্টিগ্রেশন সম্পন্ন করেছি।",
    exp_sparktech_h7: "ডোমেন, হোস্টিং, SSL সার্টিফিকেট, DNS কনফিগারেশন, ডেটাবেস মাইগ্রেশন এবং সার্বিক রক্ষণাবেক্ষণ পরিচালনা করেছি।",
    exp_sparktech_h8: "এআই-অ্যাসিস্টেড কোডিং ও ভাইব কোডিং ওয়ার্কফ্লো প্রয়োগ করে প্রোটোটাইপিং, ডিবাগিং এবং নতুন ফিচার ডেলিভারি অত্যন্ত দ্রুত করেছি।",

    exp_designsilc_role: "ওয়ার্ডপ্রেস ডেভেলপার",
    exp_designsilc_period: "২০২৪ – ২০২৪",
    exp_designsilc_location: "এজেন্সি ক্লায়েন্ট প্রজেক্ট",
    exp_designsilc_type: "চুক্তিভিত্তিক",
    exp_designsilc_badge: "এজেন্সি পদ",
    exp_designsilc_summary: "রেসপনসিভ ওয়ার্ডপ্রেস ওয়েবসাইট কাস্টমাইজেশন, ইউজার-ফ্রেন্ডলি ফ্রন্টএন্ড লেআউট এবং ব্যবসায়িক ওয়েব অভিজ্ঞতায় বিশেষ দক্ষতা প্রদান করেছি।",
    exp_designsilc_h1: "বিভিন্ন প্রজেক্টের প্রয়োজনীয়তা অনুসারে ওয়ার্ডপ্রেস ওয়েবসাইট তৈরি ও কাস্টমাইজ করেছি।",
    exp_designsilc_h2: "Elementor ব্যবহার করে সব ব্রাউজারে নিখুঁতভাবে প্রদর্শিত রেসপনসিভ পেজ ও ল্যান্ডিং পেজ তৈরি করেছি।",
    exp_designsilc_h3: "ডিজাইন কনসেপ্ট এবং ওয়্যারফ্রেমকে পরিচ্ছন্ন ও কার্যকরী ওয়ার্ডপ্রেস ওয়েবসাইটে রূপান্তর করেছি।",
    exp_designsilc_h4: "থিম লেআউট, স্টাইলিং কম্পোনেন্ট এবং নেভিগেশন স্ট্রাকচার ক্লায়েন্টের ব্র্যান্ড অনুযায়ী সাজিয়েছি।",
    exp_designsilc_h5: "ডেস্কটপ, মোবাইল ও ট্যাবলেট ভিউপোর্টে রেসপনসিভ লেআউটের যেকোনো সমস্যা চিহ্নিত ও সমাধান করেছি।",
    exp_designsilc_h6: "লাইভ ক্লায়েন্ট ওয়েবসাইটের সিকিউরিটি আপডেট, রক্ষণাবেক্ষণ ও গতি বৃদ্ধি নিশ্চিত করেছি।",

    exp_frontier_role: "সিনিয়র ওয়ার্ডপ্রেস ডেভেলপার",
    exp_frontier_period: "২০২১ – ২০২৩",
    exp_frontier_location: "ক্লায়েন্ট সলিউশনস",
    exp_frontier_type: "সিনিয়র পদ",
    exp_frontier_badge: "সিনিয়র টেকনিক্যাল পদ",
    exp_frontier_summary: "ক্লায়েন্ট ওয়েবসাইটের পূর্ণাঙ্গ ডেভেলপমেন্ট, কাস্টম লেআউট আর্কিটেকচার, WooCommerce বাস্তবায়ন এবং এসইও-বান্ধব পারফরম্যান্স অপটিমাইজেশনের নেতৃত্ব দিয়েছি।",
    exp_frontier_h1: "Elementor Pro ব্যবহার করে কর্পোরেট ও ব্যবসায়িক ক্লায়েন্টদের জন্য প্রফেশনাল ওয়ার্ডপ্রেস ওয়েবসাইট ডেলিভার করেছি।",
    exp_frontier_h2: "Figma এবং PSD ফাইল থেকে উচ্চ পারফরম্যান্স ও মোবাইল-ফার্স্ট ওয়ার্ডপ্রেস সাইট তৈরি করেছি।",
    exp_frontier_h3: "কাস্টম WooCommerce কার্যকারিতা, প্রোডাক্ট ক্যাটালগ ও চেকআউট অভিজ্ঞতা তৈরি করেছি।",
    exp_frontier_h4: "ক্লায়েন্টের ব্যবসায়িক মডেলের সাথে মানানসই ডায়নামিক কন্টেন্ট আর্কিটেকচার ও ফিচার বাস্তবায়ন করেছি।",
    exp_frontier_h5: "ওয়েবসাইটের গতি বৃদ্ধি, Core Web Vitals অপটিমাইজেশন এবং টেকনিক্যাল এসইও কাঠামো নিশ্চিত করেছি।",
    exp_frontier_h6: "ওয়েবসাইট মাইগ্রেশন, সার্ভার ডেপ্লয়মেন্ট এবং লঞ্চ পরবর্তী টেকনিক্যাল সহায়তা প্রদান করেছি।",

    exp_cta_tag: "সরাসরি সহযোগিতা",
    exp_cta_heading: "অভিজ্ঞ সিনিয়র ডেভেলপার খুঁজছেন?",
    exp_cta_desc: "উচ্চমানের ওয়ার্ডপ্রেস ডেভেলপমেন্ট, কাস্টম ওয়েব সমাধান এবং এআই-ত্বরান্বিত প্রজেক্টের জন্য প্রস্তুত।",
    exp_cta_button: "যোগাযোগ করুন",
    exp_cta_whatsapp: "হোয়াটসঅ্যাপে মেসেজ দিন",

    footer_location: "রামপুরা, বনশ্রী, ঢাকা",
    footer_chat_whatsapp: "হোয়াটসঅ্যাপে চ্যাট",
  },

  ar: {
    nav_home: "الرئيسية",
    nav_about: "من أنا",
    nav_services: "خدماتنا",
    nav_projects: "الأعمال",
    nav_reviews: "التقييمات",
    nav_contact: "اتصل بنا",
    nav_quote: "طلب عرض سعر",
    nav_language: "اللغة",
    nav_search_lang: "ابحث عن لغة...",
    nav_popular: "اللغات الشائعة",
    nav_all_languages: "جميع اللغات",
    nav_color_mood: "نمط الألوان",
    nav_surface_mode: "الوضع الليلي",
    nav_light: "نهاري",
    nav_dark: "ليلي",
    nav_magic_cursor: "المؤشر السحري",

    hero_badge: "مطور ووردبريس محترف",
    hero_heading_1: "أقوم ببناء",
    hero_heading_gradient: "مواقع ووردبريس حديثة",
    hero_heading_2: "وعالية الأداء",
    hero_bio: "أنا سوجون، مطور ووردبريس محترف متخصص في إنشاء مواقع سريعة ومتجاوبة ومحسّنة للمبيعات للشركات والعلامات التجارية حول العالم.",
    hero_download_cv: "تحميل السيرة الذاتية",
    hero_view_projects: "مشاهدة الأعمال",

    stat_exp_val: "+5",
    stat_exp_lbl: "سنوات خبرة",
    stat_proj_val: "+200",
    stat_proj_lbl: "مشروع منجز",
    stat_clients_val: "+150",
    stat_clients_lbl: "عميل سعيد",
    stat_satisfaction_val: "99%",
    stat_satisfaction_lbl: "رضا العملاء",

    about_heading: "من أنا؟",
    about_p1: "أنا سوجون، مطور ووردبريس شغوف بإنشاء مواقع ويب جميلة وسريعة وعالية الأداء تلبي احتياجات الشركات الرقمية.",
    about_p2: "على مدار السنوات، ساعدت العديد من العملاء في تعزيز وجودهم الرقمي وزيادة مبيعاتهم من خلال تصاميم مبتكرة وحلول برمجية قوية.",
    about_skills_title: "أبرز المهارات",

    services_heading: "استكشف خدماتنا",
    services_subtitle: "حلول ووردبريس وتجارة إلكترونية احترافية مخصصة لتنمية أعمالك.",
    svc_1_title: "تطوير ووردبريس",
    svc_1_desc: "مواقع ووردبريس مخصصة وعالية الأداء تناسب احتياجات عملك بدقة.",
    svc_2_title: "تطوير إليمينتور",
    svc_2_desc: "تصاميم بصرية رائعة وسهلة التعديل باستخدام Elementor Pro.",
    svc_3_title: "متاجر ووكومرس",
    svc_3_desc: "متاجر إلكترونية متكاملة مع بوابات دفع آمنة وسريعة.",
    svc_4_title: "قوالب ووردبريس مخصصة",
    svc_4_desc: "قوالب نظيفة وخالية من الإضافات الزائدة مصممة من الصفر.",
    svc_5_title: "إعادة تصميم المواقع",
    svc_5_desc: "تحديث موقعك القديم ليصبح عصرياً وجذاباً وسريع التحميل.",
    svc_6_title: "تسريع المواقع",
    svc_6_desc: "تحسين سرعة التحميل ونتائج Core Web Vitals لمحركات البحث.",
    svc_7_title: "صيانة ووردبريس",
    svc_7_desc: "فحص أمني دوري وتحديثات مستمرة ونسخ احتياطي لحماية موقعك.",
    svc_8_title: "صفحات الهبوط",
    svc_8_desc: "صفحات هبوط ذات تحويل عالي مخصصة لحملات الإعلانات والمبيعات.",

    tech_heading: "التقنيات التي أعمل بها",

    portfolio_heading: "أحدث المشاريع",
    portfolio_subtitle: "مجموعة مختارة من أفضل مشاريع ووردبريس للعملاء حول العالم.",
    portfolio_view_project: "عرض المشروع",

    reviews_heading: "آراء العملاء",
    reviews_subtitle: "شهادات حقيقية من شركاء وعملاء موثوقين.",

    contact_heading: "تواصل معي اليوم",
    contact_subtitle: "هل لديك فكرة مشروع؟ تواصل معي للحصول على استشارة وعرض سعر مجاني.",
    contact_first_name: "الاسم الأول",
    contact_last_name: "الاسم الأخير",
    contact_email: "البريد الإلكتروني",
    contact_phone: "رقم الهاتف",
    contact_project_type: "نوع المشروع",
    contact_budget: "الميزانية المتوقعة",
    contact_message: "تفاصيل رسالتك",
    contact_send: "إرسال الرسالة",
    contact_sending: "جاري الإرسال...",
    contact_success_title: "تم الإرسال بنجاح!",
    contact_success_desc: "شكراً لتواصلك، سأقوم بالرد عليك خلال 24 ساعة.",
    contact_send_another: "إرسال رسالة أخرى",
    contact_info_title: "معلومات الاتصال المباشرة",
    contact_location: "دكا، بنغلاديش (خدمة عالمية)",
    contact_available: "متاح للمشاريع الجديدة",

    footer_tagline: "مطور ووردبريس محترف متخصص في بناء مواقع سريعة ومتجاوبة.",
    footer_quick_links: "روابط سريعة",
    footer_rights: "جميع الحقوق محفوظة.",
  },

  es: {
    nav_home: "Inicio",
    nav_about: "Sobre Mí",
    nav_services: "Servicios",
    nav_projects: "Proyectos",
    nav_reviews: "Opiniones",
    nav_contact: "Contacto",
    nav_quote: "Cotizar Proyecto",
    nav_language: "Idioma",
    nav_search_lang: "Buscar idioma...",
    nav_popular: "Idiomas Populares",
    nav_all_languages: "Todos los Idiomas (100+)",
    nav_color_mood: "Color de Tema",
    nav_surface_mode: "Modo de Superficie",
    nav_light: "Claro",
    nav_dark: "Oscuro",
    nav_magic_cursor: "Cursor Mágico",

    hero_badge: "Desarrollador WordPress",
    hero_heading_1: "Construyo Sitios",
    hero_heading_gradient: "Modernos y de Alto Rendimiento",
    hero_heading_2: "en WordPress",
    hero_bio: "Soy Sujon, desarrollador profesional de WordPress especializado en sitios web rápidos, adaptables y enfocados en conversiones para empresas y marcas en todo el mundo.",
    hero_download_cv: "DESCARGAR CV",
    hero_view_projects: "VER PROYECTOS",

    stat_exp_val: "5+",
    stat_exp_lbl: "Años de Experiencia",
    stat_proj_val: "200+",
    stat_proj_lbl: "Proyectos Realizados",
    stat_clients_val: "150+",
    stat_clients_lbl: "Clientes Satisfechos",
    stat_satisfaction_val: "99%",
    stat_satisfaction_lbl: "Satisfacción Total",

    about_heading: "¿Quién soy?",
    about_p1: "Soy Sujon, desarrollador apasionado por crear experiencias digitales profesionales en WordPress, Elementor y WooCommerce para clientes de todo el mundo.",
    about_p2: "A lo largo de los años he ayudado a múltiples empresas a fortalecer su presencia en línea con soluciones web sólidas y escalables.",
    about_skills_title: "Habilidades Clave",

    services_heading: "Explora Mis Servicios",
    services_subtitle: "Soluciones web especializadas para hacer crecer tu negocio.",
    svc_1_title: "Desarrollo WordPress",
    svc_1_desc: "Sitios web rápidos y personalizados según las necesidades de tu negocio.",
    svc_2_title: "Desarrollo Elementor",
    svc_2_desc: "Diseños visuales atractivos y fáciles de gestionar con Elementor Pro.",
    svc_3_title: "Tiendas WooCommerce",
    svc_3_desc: "Tiendas online completas optimizadas para altas ventas y gran experiencia de usuario.",
    svc_4_title: "Temas a Medida",
    svc_4_desc: "Temas ligeros desarrollados desde cero sin código innecesario.",
    svc_5_title: "Rediseño Web",
    svc_5_desc: "Renueva tu sitio web antiguo en una plataforma moderna y atractiva.",
    svc_6_title: "Optimización de Velocidad",
    svc_6_desc: "Mejora los tiempos de carga y las puntuaciones de Core Web Vitals.",
    svc_7_title: "Mantenimiento WordPress",
    svc_7_desc: "Seguridad constante, actualizaciones y copias de seguridad continuas.",
    svc_8_title: "Páginas de Aterrizaje",
    svc_8_desc: "Landing pages de alta conversión diseñadas para generar clientes potenciales.",

    tech_heading: "Tecnologías que Utilizo",

    portfolio_heading: "Proyectos Recientes",
    portfolio_subtitle: "Una selección de trabajos recientes para clientes globales.",
    portfolio_view_project: "Ver Proyecto",

    reviews_heading: "Opiniones de Clientes",
    reviews_subtitle: "Comentarios reales de empresas y socios internacionales.",

    contact_heading: "Hablemos de tu Proyecto",
    contact_subtitle: "¿Tienes una idea en mente? Escríbeme para una consulta y presupuesto gratuito.",
    contact_first_name: "Nombre",
    contact_last_name: "Apellido",
    contact_email: "Correo Electrónico",
    contact_phone: "Teléfono (Opcional)",
    contact_project_type: "Tipo de Proyecto",
    contact_budget: "Presupuesto Estimado",
    contact_message: "Tu Mensaje",
    contact_send: "Enviar Mensaje",
    contact_sending: "Enviando...",
    contact_success_title: "¡Mensaje Enviado con Éxito!",
    contact_success_desc: "Gracias por contactarme. Responderé dentro de las próximas 24 horas.",
    contact_send_another: "Enviar otro mensaje",
    contact_info_title: "Contacto Directo",
    contact_location: "Dhaka, Bangladesh (Servicio Global)",
    contact_available: "Disponible para nuevos proyectos",

    footer_tagline: "Desarrollador profesional de WordPress especializado en sitios modernos y de alto rendimiento.",
    footer_quick_links: "Navegación Rápida",
    footer_rights: "Todos los derechos reservados.",
  },

  fr: {
    nav_home: "Accueil",
    nav_about: "À Propos",
    nav_services: "Services",
    nav_projects: "Projets",
    nav_reviews: "Avis",
    nav_contact: "Contact",
    nav_quote: "Devis Gratuit",
    nav_language: "Langue",
    nav_search_lang: "Rechercher une langue...",
    nav_popular: "Langues Populaires",
    nav_all_languages: "Toutes les Langues (100+)",
    nav_color_mood: "Nuance de Couleur",
    nav_surface_mode: "Mode Surface",
    nav_light: "Clair",
    nav_dark: "Sombre",
    nav_magic_cursor: "Curseur Magique",

    hero_badge: "Développeur WordPress",
    hero_heading_1: "Je Conçois des Sites",
    hero_heading_gradient: "Modernes & Ultra-Performants",
    hero_heading_2: "sur WordPress",
    hero_bio: "Je suis Sujon, développeur WordPress professionnel spécialisé dans les sites rapides, responsives et orientés conversion pour les entreprises du monde entier.",
    hero_download_cv: "TÉLÉCHARGER CV",
    hero_view_projects: "VOIR PROJETS",

    stat_exp_val: "5+",
    stat_exp_lbl: "Années d'Expérience",
    stat_proj_val: "200+",
    stat_proj_lbl: "Projets Réalisés",
    stat_clients_val: "150+",
    stat_clients_lbl: "Clients Satisfaits",
    stat_satisfaction_val: "99%",
    stat_satisfaction_lbl: "Taux de Satisfaction",

    about_heading: "Qui suis-je ?",
    about_p1: "Je suis Sujon, développeur web passionné par la création de sites web rapides, élégants et optimisés sous WordPress, Elementor et WooCommerce.",
    about_p2: "J'accompagne les entreprises dans le développement de leur image en ligne avec des solutions digitales sur-mesure et pérennes.",
    about_skills_title: "Compétences Clés",

    services_heading: "Mes Services",
    services_subtitle: "Des solutions de développement web adaptées pour propulser votre entreprise.",
    svc_1_title: "Développement WordPress",
    svc_1_desc: "Sites personnalisés et performants conçus sur-mesure pour votre activité.",
    svc_2_title: "Développement Elementor",
    svc_2_desc: "Création de maquettes au pixel près, flexibles et faciles à gérer.",
    svc_3_title: "Boutiques WooCommerce",
    svc_3_desc: "Boutiques e-commerce complètes et optimisées pour maximiser les conversions.",
    svc_4_title: "Thèmes WordPress Sur-Mesure",
    svc_4_desc: "Développement de thèmes légers sans dépendances superflues.",
    svc_5_title: "Refonte de Site Web",
    svc_5_desc: "Modernisez votre ancien site pour une interface moderne et captivante.",
    svc_6_title: "Optimisation de Vitesse",
    svc_6_desc: "Accélérez le temps de chargement et optimisez vos scores Core Web Vitals.",
    svc_7_title: "Maintenance WordPress",
    svc_7_desc: "Mises à jour régulières, sauvegardes et sécurité 24/7.",
    svc_8_title: "Pages d'Atterrissage",
    svc_8_desc: "Landing pages à haute conversion conçues pour capter des prospects qualifiés.",

    tech_heading: "Technologies Utilisées",

    portfolio_heading: "Projets Récents",
    portfolio_subtitle: "Découvrez une sélection de projets WordPress récents.",
    portfolio_view_project: "Voir le Projet",

    reviews_heading: "Témoignages Clients",
    reviews_subtitle: "Les retours d'expérience de nos clients à travers le monde.",

    contact_heading: "Donnons Vie à Votre Projet",
    contact_subtitle: "Vous avez un projet en tête ? Contactez-moi pour un devis et des conseils personnalisés.",
    contact_first_name: "Prénom",
    contact_last_name: "Nom",
    contact_email: "Adresse Email",
    contact_phone: "Numéro de Téléphone",
    contact_project_type: "Type de Projet",
    contact_budget: "Budget Estimé",
    contact_message: "Votre Message",
    contact_send: "Envoyer le Message",
    contact_sending: "Envoi en cours...",
    contact_success_title: "Message Envoyé avec Succès !",
    contact_success_desc: "Merci pour votre message. Je vous répondrai sous 24 heures.",
    contact_send_another: "Envoyer un autre message",
    contact_info_title: "Coordonnées Directes",
    contact_location: "Dhaka, Bangladesh (Clients Internationaux)",
    contact_available: "Disponible pour nouveaux projets",

    footer_tagline: "Développeur WordPress professionnel dédié aux sites web rapides et à forte conversion.",
    footer_quick_links: "Navigation Rapide",
    footer_rights: "Tous droits réservés.",
  },

  de: {
    nav_home: "Startseite",
    nav_about: "Über Mich",
    nav_services: "Dienstleistungen",
    nav_projects: "Projekte",
    nav_reviews: "Bewertungen",
    nav_contact: "Kontakt",
    nav_quote: "Angebot Einholen",
    nav_language: "Sprache",
    nav_search_lang: "Sprache suchen...",
    nav_popular: "Beliebte Sprachen",
    nav_all_languages: "Alle Sprachen (100+)",
    nav_color_mood: "Farbmodus",
    nav_surface_mode: "Oberflächenmodus",
    nav_light: "Hell",
    nav_dark: "Dunkel",
    nav_magic_cursor: "Magischer Mauszeiger",

    hero_badge: "WordPress Entwickler",
    hero_heading_1: "Ich erstelle",
    hero_heading_gradient: "Moderne & Schnelle",
    hero_heading_2: "WordPress Webseiten",
    hero_bio: "Ich bin Sujon, professioneller WordPress-Entwickler mit Spezialisierung auf schnelle, moderne und conversion-optimierte Webseiten für Unternehmen weltweit.",
    hero_download_cv: "LEBENSLAUF LADEN",
    hero_view_projects: "PROJEKTE ANSEHEN",

    stat_exp_val: "5+",
    stat_exp_lbl: "Jahre Erfahrung",
    stat_proj_val: "200+",
    stat_proj_lbl: "Abgeschlossene Projekte",
    stat_clients_val: "150+",
    stat_clients_lbl: "Zufriedene Kunden",
    stat_satisfaction_val: "99%",
    stat_satisfaction_lbl: "Kundenzufriedenheit",

    about_heading: "Über mich",
    about_p1: "Ich bin Sujon, ein leidenschaftlicher Entwickler, der sich auf hochwertige WordPress-, Elementor- und WooCommerce-Lösungen konzentriert.",
    about_p2: "In den vergangenen Jahren habe ich zahlreichen Unternehmen geholfen, ihre digitale Präsenz erfolgreich auszubauen.",
    about_skills_title: "Kernkompetenzen",

    services_heading: "Dienstleistungen",
    services_subtitle: "Maßgeschneiderte Webentwicklung für maximalen Geschäftserfolg.",
    svc_1_title: "WordPress Entwicklung",
    svc_1_desc: "Individuelle, leistungsstarke Webseiten für Ihre Geschäftsanforderungen.",
    svc_2_title: "Elementor Entwicklung",
    svc_2_desc: "Pixelgenaue Layouts, die flexibel und einfach zu bedienen sind.",
    svc_3_title: "WooCommerce Shops",
    svc_3_desc: "E-Commerce-Shops mit hoher Conversion-Rate und intuitiver Benutzerführung.",
    svc_4_title: "Individuelle Themes",
    svc_4_desc: "Schlanke, saubere WordPress-Themes von Grund auf programmiert.",
    svc_5_title: "Webseiten Redesign",
    svc_5_desc: "Verwandeln Sie Ihre alte Webseite in eine moderne Erfolgsplattform.",
    svc_6_title: "Geschwindigkeitsoptimierung",
    svc_6_desc: "Bessere Ladezeiten und optimale Core Web Vitals Werte.",
    svc_7_title: "WordPress Wartung",
    svc_7_desc: "Sicherheitsprüfungen, Updates und Backups für maximale Zuverlässigkeit.",
    svc_8_title: "Landing Pages",
    svc_8_desc: "Fokussierte Landing Pages für messbare Leads und Verkäufe.",

    tech_heading: "Technologien",

    portfolio_heading: "Aktuelle Projekte",
    portfolio_subtitle: "Eine Auswahl erfolgreicher Kundenprojekte weltweit.",
    portfolio_view_project: "Projekt Ansehen",

    reviews_heading: "Kundenstimmen",
    reviews_subtitle: "Echte Rückmeldungen zufriedener Geschäftspartner.",

    contact_heading: "Lassen Sie uns starten",
    contact_subtitle: "Haben Sie ein Projekt vor Augen? Kontaktieren Sie mich für ein unverbindliches Angebot.",
    contact_first_name: "Vorname",
    contact_last_name: "Nachname",
    contact_email: "E-Mail-Adresse",
    contact_phone: "Telefonnummer",
    contact_project_type: "Projektart",
    contact_budget: "Geschätztes Budget",
    contact_message: "Ihre Nachricht",
    contact_send: "Nachricht Senden",
    contact_sending: "Wird gesendet...",
    contact_success_title: "Nachricht erfolgreich gesendet!",
    contact_success_desc: "Vielen Dank! Ich melde mich innerhalb von 24 Stunden bei Ihnen.",
    contact_send_another: "Weitere Nachricht senden",
    contact_info_title: "Direkter Kontakt",
    contact_location: "Dhaka, Bangladesch (Weltweiter Service)",
    contact_available: "Verfügbar für neue Projekte",

    footer_tagline: "Professioneller WordPress-Entwickler für moderne und erfolgreiche Webauftritte.",
    footer_quick_links: "Schnellzugriff",
    footer_rights: "Alle Rechte vorbehalten.",
  },

  hi: {
    nav_home: "होम",
    nav_about: "परिचय",
    nav_services: "सेवाएं",
    nav_projects: "प्रोजेक्ट्स",
    nav_reviews: "समीक्षाएं",
    nav_contact: "संपर्क करें",
    nav_quote: "कोटेशन लें",
    nav_language: "भाषा",
    nav_search_lang: "भाषा खोजें...",
    nav_popular: "लोकप्रिय भाषाएं",
    nav_all_languages: "सभी भाषाएं (100+)",
    nav_color_mood: "कलर मूड",
    nav_surface_mode: "सरफेस मोड",
    nav_light: "लाइट",
    nav_dark: "डार्क",
    nav_magic_cursor: "मैजिक कर्सर",

    hero_badge: "वर्डप्रेस डेवलपर",
    hero_heading_1: "मैं बनाता हूं",
    hero_heading_gradient: "आधुनिक और हाई-परफॉर्मेंस",
    hero_heading_2: "वर्डप्रेस वेबसाइट्स",
    hero_bio: "मैं सुजोन हूं, एक पेशेवर वर्डप्रेस डेवलपर जो व्यवसायों और ब्रांड्स के लिए रेस्पॉन्सिव, तेज़ और कन्वर्जन-केंद्रित वेबसाइट बनाने में विशेषज्ञ है।",
    hero_download_cv: "सीवी डाउनलोड करें",
    hero_view_projects: "प्रोजेक्ट्स देखें",

    stat_exp_val: "5+",
    stat_exp_lbl: "वर्षों का अनुभव",
    stat_proj_val: "200+",
    stat_proj_lbl: "सफल प्रोजेक्ट्स",
    stat_clients_val: "150+",
    stat_clients_lbl: "संतुष्ट ग्राहक",
    stat_satisfaction_val: "99%",
    stat_satisfaction_lbl: "क्लाइंट संतुष्टि",

    about_heading: "मेरे बारे में",
    about_p1: "मैं सुजोन हूं, वर्डप्रेस, एलिमेंटर और वू-कॉमर्स के जरिए सुंदर और शक्तिशाली वेबसाइट बनाने वाला वेब डेवलपर।",
    about_p2: "मैंने पिछले कुछ वर्षों में कई वैश्विक व्यवसायों को अपनी मजबूत डिजिटल पहचान बनाने में मदद की है।",
    about_skills_title: "प्रमुख कौशल",

    services_heading: "मेरी सेवाएं",
    services_subtitle: "आपके व्यापार को आगे बढ़ाने के लिए विशेष वर्डप्रेस और ई-कॉमर्स समाधान।",
    svc_1_title: "वर्डप्रेस डेवलपमेंट",
    svc_1_desc: "आपकी व्यावसायिक जरूरतों के अनुसार तैयार की गई तेज़ और सुरक्षित वेबसाइट्स।",
    svc_2_title: "एलिमेंटर डेवलपमेंट",
    svc_2_desc: "आसान और सुंदर ड्रैग-एंड-ड्रॉप पेज बिल्डर डिज़ाइन्स।",
    svc_3_title: "वू-कॉमर्स स्टोर",
    svc_3_desc: "ज्यादा बिक्री और बेहतर अनुभव के लिए अनुकूलित ऑनलाइन दुकानें।",
    svc_4_title: "कस्टम वर्डप्रेस थीम्स",
    svc_4_desc: "बिना किसी फालतू कोड के स्क्रैच से बनाई गई हल्की थीम्स।",
    svc_5_title: "वेबसाइट रीडिज़ाइन",
    svc_5_desc: "अपनी पुरानी वेबसाइट को आधुनिक और आकर्षक रूप दें।",
    svc_6_title: "स्पीड ऑप्टिमाइज़ेशन",
    svc_6_desc: "पेज लोड टाइम और Core Web Vitals स्कोर में सुधार।",
    svc_7_title: "वर्डप्रेस मेंटेनेंस",
    svc_7_desc: "नियमित सुरक्षा जांच, अपडेट और बैकअप सुविधा।",
    svc_8_title: "लैंडिंग पेज डेवलपमेंट",
    svc_8_desc: "लीड्स और बिक्री बढ़ाने के लिए हाई-कन्वर्शन लैंडिंग पेजेस।",

    tech_heading: "प्रमुख टेक्नोलॉजीज",

    portfolio_heading: "हालिया प्रोजेक्ट्स",
    portfolio_subtitle: "हाल ही में पूरे किए गए कुछ बेहतरीन वर्डप्रेस प्रोजेक्ट्स।",
    portfolio_view_project: "प्रोजेक्ट देखें",

    reviews_heading: "ग्राहकों की राय",
    reviews_subtitle: "दुनिया भर के ग्राहकों की वास्तविक और भरोसेमंद समीक्षाएं।",

    contact_heading: "संपर्क करें",
    contact_subtitle: "क्या आपके पास कोई नया प्रोजेक्ट है? मुफ्त परामर्श और कोटेशन के लिए आज ही संपर्क करें।",
    contact_first_name: "पहला नाम",
    contact_last_name: "अंतिम नाम",
    contact_email: "ईमेल पता",
    contact_phone: "फोन नंबर",
    contact_project_type: "प्रोजेक्ट का प्रकार",
    contact_budget: "अनुमानित बजट",
    contact_message: "आपका संदेश",
    contact_send: "संदेश भेजें",
    contact_sending: "भेजा जा रहा है...",
    contact_success_title: "संदेश सफलतापूर्वक भेजा गया!",
    contact_success_desc: "धन्यवाद! मैं अगले 24 घंटों में आपसे संपर्क करूंगा।",
    contact_send_another: "एक और संदेश भेजें",
    contact_info_title: "सीधा संपर्क",
    contact_location: "ढाका, बांग्लादेश (वैश्विक सेवा)",
    contact_available: "नए प्रोजेक्ट्स के लिए उपलब्ध",

    footer_tagline: "पेशेवर वर्डप्रेस डेवलपर — आधुनिक और उच्च गुणवत्ता वाली वेबसाइट्स।",
    footer_quick_links: "त्वरित लिंक्स",
    footer_rights: "सर्वाधिकार सुरक्षित।",
  },
  "zh-CN": {
    nav_home: "首页",
    nav_about: "关于",
    nav_services: "服务",
    nav_projects: "项目",
    nav_reviews: "评价",
    nav_contact: "联系",
    nav_quote: "获取报价",
    nav_language: "语言",
    nav_search_lang: "搜索语言...",
    nav_popular: "热门语言",
    nav_all_languages: "所有语言 (100+)",
    nav_color_mood: "色彩氛围",
    nav_surface_mode: "界面模式",
    nav_light: "浅色",
    nav_dark: "深色",
    nav_magic_cursor: "魔法光标",

    hero_badge: "全栈 Web 开发者 & WordPress 专家",
    hero_heading_1: "全栈 Web 开发者 &",
    hero_heading_gradient: "WordPress 专家",
    hero_heading_2: "AI 辅助开发 • Vibe Coding • 现代 Web",
    hero_subheading: "结合 AI 辅助开发、高级 Vibe Coding 工作流程与 WordPress 专业技术，打造现代化、可扩展且高性能的网页体验。",
    hero_bio: "我通过融合全栈开发、WordPress 专业知识、AI 辅助编程和敏捷 Vibe Coding 工作流，为全球客户构建现代化网站、Web 应用程序、eCommerce 平台和定制数字化体验。",
    hero_download_cv: "下载简历",
    hero_view_projects: "查看项目",

    stat_exp_val: "5+",
    stat_exp_lbl: "年开发经验",
    stat_proj_val: "200+",
    stat_proj_lbl: "已完成项目",
    stat_clients_val: "150+",
    stat_clients_lbl: "满意客户",
    stat_satisfaction_val: "99%",
    stat_satisfaction_lbl: "客户满意度",

    about_heading: "全栈开发与 AI 赋能编程的完美结合",
    about_p1: "我是一名全栈 Web 开发者兼 WordPress 专家，拥有为国际客户构建商业网站、eCommerce 平台、动态网站、着陆页及定制 Web 体验的丰富实战经验。",
    about_p2: "我的核心专业领域包括 WordPress、Elementor Pro、WooCommerce、JetEngine、自定义内容系统、响应式 UI 开发、网站优化、故障排查与部署交付。",
    about_p3: "在深耕 WordPress 的同时，我广泛应用现代 Web 技术与 AI 辅助编码工作流程，利用 AI 作为开发伙伴进行规划、编码、调试、性能优化与快速原型落地。",
    about_p4: "我在 Vibe Coding 方面亦有深厚积累——运用 AI 驱动的高效开发流程，将创意理念、业务需求与设计稿迅速转化为功能完善、视觉优雅的 Web 体验。",
    about_p5: "我的开发理念将人类专业经验、AI 赋能、现代前沿技术与务实解决问题融为一体，高效打造高质量的网站与 Web 应用程序。",
    about_skills_title: "核心专长与技术能力",

    services_heading: "服务与技术能力",
    services_subtitle: "从高性能全栈 Web 应用、AI 驱动的 Vibe Coding 到企业级 WordPress 与 WooCommerce 平台。",
    svc_1_title: "全栈 Web 开发",
    svc_1_desc: "利用主流前后端技术栈构建现代化、响应迅速且功能完备的 Web 应用程序。",
    svc_2_title: "WordPress 开发",
    svc_2_desc: "专业级 WordPress 网站构建、Elementor Pro 制作、WooCommerce 商店、动态网站及定制业务系统。",
    svc_3_title: "AI 辅助 Web 开发",
    svc_3_desc: "采用 AI 驱动的开发流程加速架构规划、代码编写、Bug 调试、原型制作与持续迭代。",
    svc_4_title: "Vibe Coding",
    svc_4_desc: "借助 AI 辅助敏捷工作流，将理念构想与设计稿迅速转化为高质感落地产品。",
    svc_5_title: "定制 Web 解决方案",
    svc_5_desc: "构建定制功能模块、管理仪表板、高级表单、动态数据系统及第三方系统整合。",
    svc_6_title: "网站性能优化",
    svc_6_desc: "全面优化页面加载速度、响应性能、Core Web Vitals 指标与搜索引擎友好架构。",
    svc_7_title: "WooCommerce 商店",
    svc_7_desc: "专为高转化率、顺畅结账流程与极致购物体验打造的功能丰富在线商城。",
    svc_8_title: "高转化着陆页开发",
    svc_8_desc: "针对获客引流、销售转化与极致加载速度精心定制的响应式 Landing Page。",

    tech_heading: "技术栈与工具",

    portfolio_heading: "近期精选项目",
    portfolio_subtitle: "近期交付的高转化 WordPress 与现代 Web 客户案例精选。悬停卡片即可预览完整长图页面。",
    portfolio_view_project: "查看项目",

    reviews_heading: "来自全球客户的评价",
    reviews_subtitle: "来自世界各地企业客户与合作伙伴的真实评价与信赖背书。",

    contact_heading: "有了新想法？让我们携手实现。",
    contact_subtitle: "无论您需要全新 WordPress 网站、WooCommerce 商城、定制 Web 应用，还是现代 AI 赋能数字化解决方案，我都将全力助您落地。",
    contact_first_name: "名字",
    contact_last_name: "姓氏",
    contact_email: "电子邮件",
    contact_phone: "联系电话 (选填)",
    contact_project_type: "项目类型",
    contact_budget: "预算范围",
    contact_message: "您的需求或留言",
    contact_send: "发送消息",
    contact_sending: "正在发送...",
    contact_success_title: "消息发送成功！",
    contact_success_desc: "感谢您的来信，我会在 24 小时内尽快与您取得联系。",
    contact_send_another: "再发一条消息",
    contact_info_title: "直接联系方式",
    contact_location: "达卡，孟加拉国 (面向全球客户)",
    contact_available: "随时可承接新项目",

    footer_tagline: "全栈 Web 开发者 & WordPress 专家 — 构建现代高质感数字化体验。",
    footer_quick_links: "快捷导航",
    footer_rights: "保留所有权利。",
  },
  ja: {
    nav_home: "ホーム",
    nav_about: "概要",
    nav_services: "サービス",
    nav_projects: "制作実績",
    nav_reviews: "お客様の声",
    nav_contact: "お問い合わせ",
    nav_quote: "お見積り",
    nav_language: "言語",
    nav_search_lang: "言語を検索...",
    nav_popular: "人気の言語",
    nav_all_languages: "すべての言語 (100+)",
    nav_color_mood: "カラーテーマ",
    nav_surface_mode: "サーフェスモード",
    nav_light: "ライト",
    nav_dark: "ダーク",
    nav_magic_cursor: "マジックカーソル",

    hero_badge: "フルスタック Web 開発者 & WordPress エキスパート",
    hero_heading_1: "フルスタック Web 開発者 &",
    hero_heading_gradient: "WordPress エキスパート",
    hero_heading_2: "AI アシスト開発 • Vibe Coding • モダン Web",
    hero_subheading: "AI アシスト開発、高度な Vibe Coding ワークフロー、豊富な WordPress 専門知識を融合し、高性能で拡張性の高いモダンな Web 体験を構築します。",
    hero_bio: "フルスタック開発、WordPress、AI 支援コーディング、Vibe Coding ワークフローを駆使し、世界中のクライアント向けにモダンな Web アプリケーション、eCommerce、カスタムサイトを制作しています。",
    hero_download_cv: "履歴書をダウンロード",
    hero_view_projects: "実績を見る",

    stat_exp_val: "5+",
    stat_exp_lbl: "年の開発実績",
    stat_proj_val: "200+",
    stat_proj_lbl: "完了プロジェクト",
    stat_clients_val: "150+",
    stat_clients_lbl: "満足クライアント",
    stat_satisfaction_val: "99%",
    stat_satisfaction_lbl: "顧客満足度",

    about_heading: "フルスタック技術と AI 支援コーディングの融合",
    about_p1: "私は国際的なクライアント向けにビジネスサイト、eCommerce、動的 Web サイト、LP、カスタムソリューションを手がけるフルスタック開発者 & WordPress エキスパートです。",
    about_p2: "主な強みは WordPress、Elementor Pro、WooCommerce、JetEngine、カスタム投稿タイプ、レスポンシブ UI 設計、高速化、トラブルシューティング、デプロイ全般です。",
    about_p3: "WordPress に加えて、モダンな Web 開発技術と AI 支援ワークフローを導入。企画、実装、デバッグ、プロトタイピングの全工程で AI を最適な開発パートナーとして活用しています。",
    about_p4: "また、AI を活用してアイデアやデザインを短時間で洗練された Web 体験へと具現化する Vibe Coding にも精通しています。",
    about_p5: "人の確かな開発技術、AI アシスト、最新テクノロジーを融合し、高品質な成果物を迅速に提供します。",
    about_skills_title: "コアスキルと専門分野",

    services_heading: "提供サービス",
    services_subtitle: "高性能フルスタック Web アプリケーションから AI 駆動 Vibe Coding、WordPress、WooCommerce まで。",
    svc_1_title: "フルスタック Web 開発",
    svc_1_desc: "最新のフロントエンド・バックエンド技術を用いたモダンで機能的な Web アプリケーション構築。",
    svc_2_title: "WordPress 開発",
    svc_2_desc: "プロフェッショナルな WordPress 構築、Elementor Pro、WooCommerce、カスタム動的サイト制作。",
    svc_3_title: "AI アシスト Web 開発",
    svc_3_desc: "AI ツールを連携した高効率な設計、コーディング、デバッグ、プロトタイプ作成。",
    svc_4_title: "Vibe Coding",
    svc_4_desc: "AI アシストによる迅速な開発ワークフローで、アイデアやデザインをスピーディーに形にします。",
    svc_5_title: "カスタム Web ソリューション",
    svc_5_desc: "独自機能、ダッシュボード、高度なフォーム、API 連携、ビジネス要件に合わせた個別開発。",
    svc_6_title: "Web サイト高速化・最適化",
    svc_6_desc: "表示速度、Core Web Vitals、レスポンシブ挙動、検索エンジン構造の最適化。",
    svc_7_title: "WooCommerce オンラインショップ",
    svc_7_desc: "購入率と使いやすさを重視した高機能 eCommerce プラットフォームの構築。",
    svc_8_title: "ランディングページ制作",
    svc_8_desc: "リード獲得と売上向上に直結する、高速表示かつレスポンシブな LP 制作。",

    tech_heading: "使用技術・ツール",

    portfolio_heading: "最新の制作実績",
    portfolio_subtitle: "高い成果を誇る WordPress およびモダン Web プロジェクトの厳選事例。カードにカーソルを合わせると全画面プレビューが表示されます。",
    portfolio_view_project: "プロジェクトを見る",

    reviews_heading: "クライアントからの推薦の声",
    reviews_subtitle: "世界中の企業やパートナーから寄せられた信頼と評価。",

    contact_heading: "アイデアをお持ちですか？ぜひカタチにしましょう。",
    contact_subtitle: "WordPress サイト、eCommerce、カスタム Web アプリ、最新の AI 支援ソリューションなど、お気軽にご相談ください。",
    contact_first_name: "お名前（名）",
    contact_last_name: "お名前（姓）",
    contact_email: "メールアドレス",
    contact_phone: "お電話番号（任意）",
    contact_project_type: "ご相談の種類",
    contact_budget: "ご予算感",
    contact_message: "メッセージ内容",
    contact_send: "送信する",
    contact_sending: "送信中...",
    contact_success_title: "送信が完了しました！",
    contact_success_desc: "お問い合わせありがとうございます。24時間以内に折り返しご連絡いたします。",
    contact_send_another: "別のメッセージを送信",
    contact_info_title: "ダイレクト連絡先",
    contact_location: "バングラデシュ・ダッカ（世界各国対応）",
    contact_available: "新規プロジェクト受付中",

    footer_tagline: "フルスタック Web 開発者 & WordPress エキスパート — 洗練されたデジタル体験を。",
    footer_quick_links: "クイックリンク",
    footer_rights: "無断転載を禁じます。",
  },
  ru: {
    nav_home: "Главная",
    nav_about: "Обо мне",
    nav_services: "Услуги",
    nav_projects: "Проекты",
    nav_reviews: "Отзывы",
    nav_contact: "Контакты",
    nav_quote: "Запросить оценку",
    nav_language: "Язык",
    nav_search_lang: "Поиск языка...",
    nav_popular: "Популярные",
    nav_all_languages: "Все языки (100+)",
    nav_color_mood: "Цветовая гамма",
    nav_surface_mode: "Тема оформления",
    nav_light: "Светлая",
    nav_dark: "Тёмная",
    nav_magic_cursor: "Магический курсор",

    hero_badge: "Full-Stack Web Разработчик & WordPress Эксперт",
    hero_heading_1: "Full-Stack Web Разработчик &",
    hero_heading_gradient: "WordPress Эксперт",
    hero_heading_2: "Разработка с AI • Vibe Coding • Современный Web",
    hero_subheading: "Создание современных, масштабируемых и производительных веб-проектов с использованием AI-разработки, передовых процессов Vibe Coding и глубокой экспертизы в WordPress.",
    hero_bio: "Создаю современные сайты, веб-приложения, платформы eCommerce и индивидуальные цифровые решения, сочетая Full-Stack разработку, WordPress, AI-ассистирование и быстрые процессы Vibe Coding.",
    hero_download_cv: "СКАЧАТЬ РЕЗЮМЕ",
    hero_view_projects: "СМОТРЕТЬ ПРОЕКТЫ",

    stat_exp_val: "5+",
    stat_exp_lbl: "Лет опыта",
    stat_proj_val: "200+",
    stat_proj_lbl: "Успешных проектов",
    stat_clients_val: "150+",
    stat_clients_lbl: "Довольных клиентов",
    stat_satisfaction_val: "99%",
    stat_satisfaction_lbl: "Удовлетворённость",

    about_heading: "Слияние Full-Stack разработки и технологий AI",
    about_p1: "Я — Full-Stack разработчик и эксперт по WordPress с богатым практическим опытом создания корпоративных сайтов, платформ eCommerce, динамических порталов и лендингов для клиентов по всему миру.",
    about_p2: "Мои ключевые навыки включают WordPress, Elementor Pro, WooCommerce, JetEngine, кастомные типы записей, адаптивную вёрстку, оптимизацию скорости, устранение неполадок и деплой.",
    about_p3: "Параллельно с WordPress я активно применяю современные стеки веб-разработки и рабочие процессы с использованием AI для планирования, написания кода, отладки и быстрого прототипирования.",
    about_p4: "У меня обширный опыт в Vibe Coding — воплощении идей, требований и дизайн-макетов в безупречные цифровые решения в кратчайшие сроки с помощью AI.",
    about_p5: "Мой подход объединяет инженерный опыт, поддержку AI, передовые технологии и практическое решение бизнес-задач.",
    about_skills_title: "Ключевые навыки и компетенции",

    services_heading: "Услуги и возможности",
    services_subtitle: "От производительных Full-Stack веб-приложений и AI Vibe Coding до платформ на базе WordPress и WooCommerce.",
    svc_1_title: "Full-Stack Веб-разработка",
    svc_1_desc: "Разработка современных, адаптивных и надёжных веб-приложений с использованием актуального стека.",
    svc_2_title: "Разработка на WordPress",
    svc_2_desc: "Профессиональные сайты на WordPress, сборка на Elementor Pro, магазины WooCommerce и кастомный функционал.",
    svc_3_title: "Веб-разработка с AI",
    svc_3_desc: "Использование AI для ускорения архитектурного планирования, написания кода, тестирования и итераций.",
    svc_4_title: "Vibe Coding",
    svc_4_desc: "Мгновенное превращение идей и прототипов в готовые интерактивные веб-продукты при поддержке AI.",
    svc_5_title: "Индивидуальные веб-решения",
    svc_5_desc: "Разработка нестандартных модулей, дашбордов, сложных форм, интеграций и кастомных систем.",
    svc_6_title: "Оптимизация сайтов",
    svc_6_desc: "Улучшение показателей скорости, Core Web Vitals, юзабилити и технической структуры сайта.",
    svc_7_title: "Интернет-магазины WooCommerce",
    svc_7_desc: "Функциональные онлайн-магазины с высокой конверсией, удобным оформлением заказа и плавной работой.",
    svc_8_title: "Разработка Landing Page",
    svc_8_desc: "Конверсионные, адаптивные посадочные страницы, ориентированные на лидогенерацию и продажи.",

    tech_heading: "Стек технологий",

    portfolio_heading: "Недавние проекты",
    portfolio_subtitle: "Избранные проекты на WordPress и современном вебе. Наведите курсор на карточку для просмотра страницы.",
    portfolio_view_project: "Открыть проект",

    reviews_heading: "Отзывы клиентов",
    reviews_subtitle: "Мнения компаний и партнеров со всего мира о совместной работе.",

    contact_heading: "Есть идея? Давайте реализуем её.",
    contact_subtitle: "Нужен ли вам сайт на WordPress, интернет-магазин, веб-сервис или решение с AI — давайте воплотим вашу задумку в жизнь.",
    contact_first_name: "Имя",
    contact_last_name: "Фамилия",
    contact_email: "Email адрес",
    contact_phone: "Телефон (необязательно)",
    contact_project_type: "Тип проекта",
    contact_budget: "Ориентировочный бюджет",
    contact_message: "Ваше сообщение",
    contact_send: "Отправить сообщение",
    contact_sending: "Отправка...",
    contact_success_title: "Сообщение успешно отправлено!",
    contact_success_desc: "Спасибо за обращение. Я свяжусь с вами в течение 24 часов.",
    contact_send_another: "Отправить еще одно сообщение",
    contact_info_title: "Прямые контакты",
    contact_location: "Дакка, Бангладеш (Работа по всему миру)",
    contact_available: "Открыт для новых проектов",

    footer_tagline: "Full-Stack Веб-разработчик & Эксперт по WordPress — современные премиальные решения.",
    footer_quick_links: "Быстрые ссылки",
    footer_rights: "Все права защищены.",
  },
  pt: {
    nav_home: "Início",
    nav_about: "Sobre",
    nav_services: "Serviços",
    nav_projects: "Projetos",
    nav_reviews: "Avaliações",
    nav_contact: "Contato",
    nav_quote: "Orçamento",
    nav_language: "Idioma",
    nav_search_lang: "Buscar idioma...",
    nav_popular: "Populares",
    nav_all_languages: "Todos os Idiomas (100+)",
    nav_color_mood: "Tom de Cor",
    nav_surface_mode: "Modo de Superfície",
    nav_light: "Claro",
    nav_dark: "Escuro",
    nav_magic_cursor: "Cursor Mágico",

    hero_badge: "Desenvolvedor Full-Stack & Especialista WordPress",
    hero_heading_1: "Desenvolvedor Full-Stack &",
    hero_heading_gradient: "Especialista WordPress",
    hero_heading_2: "Desenvolvimento com IA • Vibe Coding • Web Moderna",
    hero_subheading: "Criando experiências web modernas, escaláveis e de alto desempenho com desenvolvimento assistido por IA, fluxos avançados de Vibe Coding e expertise em WordPress.",
    hero_bio: "Desenvolvo websites modernos, aplicações web, plataformas de eCommerce e experiências digitais combinando desenvolvimento full-stack, WordPress, codificação com IA e fluxos de Vibe Coding.",
    hero_download_cv: "BAIXAR CURRÍCULO",
    hero_view_projects: "VER PROJETOS",

    stat_exp_val: "5+",
    stat_exp_lbl: "Anos de Experiência",
    stat_proj_val: "200+",
    stat_proj_lbl: "Projetos Concluídos",
    stat_clients_val: "150+",
    stat_clients_lbl: "Clientes Satisfeitos",
    stat_satisfaction_val: "99%",
    stat_satisfaction_lbl: "Taxa de Satisfação",

    about_heading: "Desenvolvimento Full-Stack encontra a Codificação com IA",
    about_p1: "Sou desenvolvedor Web Full-Stack e especialista em WordPress, com sólida experiência prática na criação de websites corporativos, lojas de eCommerce, páginas dinâmicas e landing pages para clientes internacionais.",
    about_p2: "Minha expertise engloba WordPress, Elementor Pro, WooCommerce, JetEngine, sistemas de conteúdo personalizados, interfaces responsivas, otimização de performance e deploy seguro.",
    about_p3: "Além do WordPress, domino tecnologias modernas de desenvolvimento web e processos guiados por IA, usando a inteligência artificial para planejamento, codificação, depuração e prototipagem rápida.",
    about_p4: "Tenho ampla vivência em Vibe Coding — transformando ideias, demandas de negócio e layouts em experiências digitais completas de forma ágil com IA.",
    about_p5: "Minha abordagem integra conhecimento humano, auxílio de IA, ferramentas modernas e foco na resolução eficaz de problemas.",
    about_skills_title: "Competências e Habilidades",

    services_heading: "Serviços & Soluções",
    services_subtitle: "De aplicações web full-stack de alto desempenho e Vibe Coding com IA até plataformas robustas em WordPress e WooCommerce.",
    svc_1_title: "Desenvolvimento Web Full-Stack",
    svc_1_desc: "Criação de aplicações web modernas, responsivas e funcionais utilizando as melhores tecnologias atuais.",
    svc_2_title: "Desenvolvimento WordPress",
    svc_2_desc: "Websites profissionais em WordPress, Elementor Pro, lojas WooCommerce e portais dinâmicos sob medida.",
    svc_3_title: "Desenvolvimento com IA",
    svc_3_desc: "Aceleração do ciclo de desenvolvimento com ferramentas de IA para arquitetura, código e iteração.",
    svc_4_title: "Vibe Coding",
    svc_4_desc: "Transformando conceitos e requisitos em produtos digitais de alta fidelidade com agilidade orientada por IA.",
    svc_5_title: "Soluções Web Sob Medida",
    svc_5_desc: "Desenvolvimento de funcionalidades personalizadas, painéis, formulários avançados e integrações.",
    svc_6_title: "Otimização de Performance",
    svc_6_desc: "Aprimoramento do tempo de carregamento, métricas de Core Web Vitals e estrutura técnica amigável para SEO.",
    svc_7_title: "Lojas Virtuais WooCommerce",
    svc_7_desc: "Lojas virtuais com checkout fluido, alta taxa de conversão e ótima experiência de navegação.",
    svc_8_title: "Landing Pages de Alta Conversão",
    svc_8_desc: "Páginas de captura e vendas ultrarrápidas, focadas em engajamento, geração de leads e resultados.",

    tech_heading: "Tecnologias e Ferramentas",

    portfolio_heading: "Projetos Recentes",
    portfolio_subtitle: "Uma seleção de projetos de alta conversão em WordPress e web moderna. Passe o cursor sobre os cards para pré-visualizar.",
    portfolio_view_project: "Ver Projeto",

    reviews_heading: "O que dizem os clientes",
    reviews_subtitle: "Depoimentos reais de empresas e parceiros do mundo todo.",

    contact_heading: "Tem uma ideia? Vamos construir juntos.",
    contact_subtitle: "Seja um site WordPress, loja virtual, aplicação web customizada ou solução com IA, vamos transformá-la em realidade.",
    contact_first_name: "Primeiro Nome",
    contact_last_name: "Sobrenome",
    contact_email: "Endereço de E-mail",
    contact_phone: "Telefone (Opcional)",
    contact_project_type: "Tipo de Projeto",
    contact_budget: "Orçamento Estimado",
    contact_message: "Sua Mensagem",
    contact_send: "Enviar Mensagem",
    contact_sending: "Enviando...",
    contact_success_title: "Mensagem enviada com sucesso!",
    contact_success_desc: "Obrigado pelo contato! Retornarei dentro de 24 horas.",
    contact_send_another: "Enviar outra mensagem",
    contact_info_title: "Contato Direto",
    contact_location: "Daca, Bangladesh (Atendimento Global)",
    contact_available: "Disponível para novos projetos",

    footer_tagline: "Desenvolvedor Web Full-Stack & Especialista WordPress — Soluções digitais de alta qualidade.",
    footer_quick_links: "Links Rápidos",
    footer_rights: "Todos os direitos reservados.",
  },
  it: {
    nav_home: "Home",
    nav_about: "Chi Sono",
    nav_services: "Servizi",
    nav_projects: "Progetti",
    nav_reviews: "Recensioni",
    nav_contact: "Contatti",
    nav_quote: "Preventivo",
    nav_language: "Lingua",
    nav_search_lang: "Cerca lingua...",
    nav_popular: "Popolari",
    nav_all_languages: "Tutte le Lingue (100+)",
    nav_color_mood: "Tonalità Colore",
    nav_surface_mode: "Modalità Superficie",
    nav_light: "Chiaro",
    nav_dark: "Scuro",
    nav_magic_cursor: "Cursore Magico",

    hero_badge: "Sviluppatore Web Full-Stack & Esperto WordPress",
    hero_heading_1: "Sviluppatore Web Full-Stack &",
    hero_heading_gradient: "Esperto WordPress",
    hero_heading_2: "Sviluppo con IA • Vibe Coding • Web Moderno",
    hero_subheading: "Creo esperienze web moderne, scalabili e performanti combinando sviluppo assistito da IA, workflow avanzati di Vibe Coding e comprovata esperienza su WordPress.",
    hero_bio: "Realizzo siti web all'avanguardia, applicazioni web, piattaforme eCommerce e soluzioni digitali personalizzate per clienti internazionali.",
    hero_download_cv: "SCARICA CV",
    hero_view_projects: "VEDI PROGETTI",

    stat_exp_val: "5+",
    stat_exp_lbl: "Anni di Esperienza",
    stat_proj_val: "200+",
    stat_proj_lbl: "Progetti Completati",
    stat_clients_val: "150+",
    stat_clients_lbl: "Clienti Soddisfatti",
    stat_satisfaction_val: "99%",
    stat_satisfaction_lbl: "Soddisfazione Clienti",

    about_heading: "Lo sviluppo Full-Stack incontra la programmazione potenziata da IA",
    about_p1: "Sono uno sviluppatore web Full-Stack ed esperto WordPress con ampia esperienza nella realizzazione di siti aziendali, store eCommerce, portali dinamici e landing page.",
    about_p2: "Le mie competenze principali includono WordPress, Elementor Pro, WooCommerce, JetEngine, campi e post type personalizzati, interfacce responsive e ottimizzazione.",
    about_p3: "Insieme a WordPress, utilizzo le tecnologie web moderne e workflow assistiti dall'intelligenza artificiale per pianificazione, codice pulito, test e prototipi rapidi.",
    about_p4: "Ho grande esperienza nel Vibe Coding: trasformo idee, specifiche e design in prodotti web funzionali ed eleganti in tempi record grazie all'IA.",
    about_p5: "Il mio approccio unisce competenza umana, innovazione IA e problem-solving pratico.",
    about_skills_title: "Competenze Chiave",

    services_heading: "Servizi e Competenze",
    services_subtitle: "Dalle applicazioni web full-stack ad alte prestazioni e Vibe Coding fino a piattaforme enterprise WordPress e WooCommerce.",
    svc_1_title: "Sviluppo Web Full-Stack",
    svc_1_desc: "Creazione di applicazioni web moderne, reattive e complete con le migliori tecnologie.",
    svc_2_title: "Sviluppo WordPress",
    svc_2_desc: "Siti professionali, configurazione Elementor Pro, negozi WooCommerce e piattaforme dinamiche.",
    svc_3_title: "Sviluppo Web con IA",
    svc_3_desc: "Integrazione di flussi guidati da IA per velocizzare programmazione, debugging e rilascio.",
    svc_4_title: "Vibe Coding",
    svc_4_desc: "Trasformazione rapida di idee e design in esperienze web reali e interattive.",
    svc_5_title: "Soluzioni Web su Misura",
    svc_5_desc: "Dashboard dedicate, form complessi, integrazioni API e logiche su misura del cliente.",
    svc_6_title: "Ottimizzazione Web",
    svc_6_desc: "Miglioramento della velocità di caricamento, Core Web Vitals e architettura tecnica SEO.",
    svc_7_title: "Store WooCommerce",
    svc_7_desc: "Piattaforme eCommerce ottimizzate per massimizzare le conversioni e l'esperienza utente.",
    svc_8_title: "Landing Page ad Alta Conversione",
    svc_8_desc: "Pagine promozionali ad impatto visivo focalizzate su vendite veloci e generazione di contatti.",

    tech_heading: "Tecnologie Utilizzate",

    portfolio_heading: "Progetti Recenti",
    portfolio_subtitle: "Una selezione di progetti WordPress e web moderno ad alta resa. Passa il cursore per visualizzare l'anteprima.",
    portfolio_view_project: "Visualizza Progetto",

    reviews_heading: "Cosa dicono i clienti",
    reviews_subtitle: "Testimonianze reali da partner e aziende in tutto il mondo.",

    contact_heading: "Hai un'idea? Costruiamola insieme.",
    contact_subtitle: "Che tu abbia bisogno di un sito WordPress, un negozio online o un'applicazione web con IA, trasformiamo la tua visione in realtà.",
    contact_first_name: "Nome",
    contact_last_name: "Cognome",
    contact_email: "Indirizzo Email",
    contact_phone: "Telefono (Facoltativo)",
    contact_project_type: "Tipo di Progetto",
    contact_budget: "Budget Stimato",
    contact_message: "Il Tuo Messaggio",
    contact_send: "Invia Messaggio",
    contact_sending: "Invio in corso...",
    contact_success_title: "Messaggio inviato con successo!",
    contact_success_desc: "Grazie per avermi contattato. Risponderò entro 24 ore.",
    contact_send_another: "Invia un altro messaggio",
    contact_info_title: "Contatti Diretti",
    contact_location: "Dacca, Bangladesh (Clienti in tutto il mondo)",
    contact_available: "Disponibile per nuovi progetti",

    footer_tagline: "Sviluppatore Web Full-Stack & Esperto WordPress — Esperienze digitali di massimo livello.",
    footer_quick_links: "Link Rapidi",
    footer_rights: "Tutti i diritti riservati.",
  },
  tr: {
    nav_home: "Ana Sayfa",
    nav_about: "Hakkımda",
    nav_services: "Hizmetler",
    nav_projects: "Projeler",
    nav_reviews: "Yorumlar",
    nav_contact: "İletişim",
    nav_quote: "Teklif Al",
    nav_language: "Dil",
    nav_search_lang: "Dil ara...",
    nav_popular: "Popüler Diller",
    nav_all_languages: "Tüm Diller (100+)",
    nav_color_mood: "Renk Teması",
    nav_surface_mode: "Yüzey Modu",
    nav_light: "Açık",
    nav_dark: "Koyu",
    nav_magic_cursor: "Sihirli İmleç",

    hero_badge: "Full-Stack Web Geliştirici & WordPress Uzmanı",
    hero_heading_1: "Full-Stack Web Geliştirici &",
    hero_heading_gradient: "WordPress Uzmanı",
    hero_heading_2: "Yapay Zeka Destekli Geliştirme • Vibe Coding • Modern Web",
    hero_subheading: "Yapay zeka destekli geliştirme, gelişmiş Vibe Coding iş akışları ve WordPress uzmanlığı ile modern, ölçeklenebilir ve yüksek performanslı web deneyimleri inşa ediyorum.",
    hero_bio: "Full-stack geliştirme, WordPress uzmanlığı, yapay zeka destekli kodlama ve hızlı Vibe Coding iş akışlarını birleştirerek uluslararası müşteriler için modern web siteleri ve dijital deneyimler üretiyorum.",
    hero_download_cv: "ÖZGEÇMİŞİ İNDİR",
    hero_view_projects: "PROJELERİ GÖR",

    stat_exp_val: "5+",
    stat_exp_lbl: "Yıl Deneyim",
    stat_proj_val: "200+",
    stat_proj_lbl: "Tamamlanan Proje",
    stat_clients_val: "150+",
    stat_clients_lbl: "Mutlu Müşteri",
    stat_satisfaction_val: "99%",
    stat_satisfaction_lbl: "Müşteri Memnuniyeti",

    about_heading: "Full-Stack Geliştirme ile Yapay Zeka Kodlamasının Buluşması",
    about_p1: "Uluslararası müşteriler için kurumsal web siteleri, eCommerce platformları, dinamik portallar ve özel açılış sayfaları oluşturan deneyimli bir Full-Stack Geliştirici ve WordPress Uzmanıyım.",
    about_p2: "Temel uzmanlık alanlarım arasında WordPress, Elementor Pro, WooCommerce, JetEngine, dinamik içerik sistemleri, responsive arayüzler ve hız optimizasyonu yer almaktadır.",
    about_p3: "WordPress ile birlikte modern web teknolojileri ve yapay zeka destekli geliştirme süreçlerini aktif olarak kullanarak planlama, kodlama ve hata ayıklama süreçlerini hızlandırıyorum.",
    about_p4: "Ayrıca Vibe Coding konusunda kapsamlı tecrübeye sahibim; yapay zeka araçları sayesinde fikirleri ve tasarımları hızla çalışan dijital ürünlere dönüştürüyorum.",
    about_p5: "Geliştirme yaklaşımım insan mühendisliği, yapay zeka desteği ve modern teknolojileri bir araya getirerek yüksek kaliteli sonuçlar üretir.",
    about_skills_title: "Temel Yetkinlikler",

    services_heading: "Hizmetler ve Çözümler",
    services_subtitle: "Yüksek performanslı Full-Stack web uygulamalarından yapay zeka destekli Vibe Coding, kurumsal WordPress ve WooCommerce platformlarına kadar.",
    svc_1_title: "Full-Stack Web Geliştirme",
    svc_1_desc: "Güncel ön yüz ve arka yüz teknolojileriyle modern, duyarlı ve işlevsel web uygulamaları geliştirme.",
    svc_2_title: "WordPress Geliştirme",
    svc_2_desc: "Profesyonel WordPress siteleri, Elementor Pro yapıları, WooCommerce mağazaları ve dinamik sistemler.",
    svc_3_title: "Yapay Zeka Destekli Web Geliştirme",
    svc_3_desc: "Yapay zeka destekli iş akışlarıyla mimari planlama, kodlama ve test süreçlerini hızlandırma.",
    svc_4_title: "Vibe Coding",
    svc_4_desc: "Fikirleri ve tasarımları yapay zeka destekli çevik iş akışlarıyla hızlıca işlevsel web deneyimlerine dönüştürme.",
    svc_5_title: "Özel Web Çözümleri",
    svc_5_desc: "Özel paneller, dinamik formlar, üçüncü parti entegrasyonlar ve ihtiyaca özel yazılımlar.",
    svc_6_title: "Web Sitesi Optimizasyonu",
    svc_6_desc: "Yükleme hızını, Core Web Vitals metriklerini ve teknik SEO altyapısını en üst seviyeye çıkarma.",
    svc_7_title: "WooCommerce Mağazaları",
    svc_7_desc: "Yüksek dönüşüm oranlarına ve kusursuz ödeme deneyimine sahip e-ticaret siteleri.",
    svc_8_title: "Açılış Sayfası (Landing Page) Geliştirme",
    svc_8_desc: "Hızlı yüklenen, dönüşüm ve satış odaklı duyarlı açılış sayfaları.",

    tech_heading: "Kullandığım Teknolojiler",

    portfolio_heading: "Son Projeler",
    portfolio_subtitle: "Yakın zamanda teslim edilen başarılı WordPress ve modern web projeleri. Kartların üzerine gelerek tam sayfa önizlemeyi görebilirsiniz.",
    portfolio_view_project: "Projeyi Gör",

    reviews_heading: "Müşteriler Ne Diyor?",
    reviews_subtitle: "Dünyanın dört bir yanındaki iş ortaklarımız ve müşterilerimizden güvenilir geri bildirimler.",

    contact_heading: "Bir fikriniz mi var? Birlikte hayata geçirelim.",
    contact_subtitle: "İster bir WordPress sitesi, ister e-ticaret mağazası veya yapay zeka destekli bir web uygulaması olsun, fikrinizi gerçeğe dönüştürelim.",
    contact_first_name: "Adınız",
    contact_last_name: "Soyadınız",
    contact_email: "E-posta Adresi",
    contact_phone: "Telefon Numarası (İsteğe bağlı)",
    contact_project_type: "Proje Türü",
    contact_budget: "Tahmini Bütçe",
    contact_message: "Mesajınız",
    contact_send: "Mesaj Gönder",
    contact_sending: "Gönderiliyor...",
    contact_success_title: "Mesaj Başarıyla Gönderildi!",
    contact_success_desc: "İletişime geçtiğiniz için teşekkürler. 24 saat içinde size dönüş yapacağım.",
    contact_send_another: "Başka Bir Mesaj Gönder",
    contact_info_title: "Doğrudan İletişim",
    contact_location: "Dakka, Bangladeş (Dünya Çapında Hizmet)",
    contact_available: "Yeni projeler için uygun",

    footer_tagline: "Full-Stack Web Geliştirici & WordPress Uzmanı — Modern ve yüksek kaliteli dijital çözümler.",
    footer_quick_links: "Hızlı Bağlantılar",
    footer_rights: "Tüm hakları saklıdır.",
  },
  ur: {
    nav_home: "ہوم",
    nav_about: "تعارف",
    nav_services: "خدمات",
    nav_projects: "منصوبے",
    nav_reviews: "آراء",
    nav_contact: "رابطہ",
    nav_quote: "قیمت معلوم کریں",
    nav_language: "زبان",
    nav_search_lang: "زبان تلاش کریں...",
    nav_popular: "مقبول زبانیں",
    nav_all_languages: "تمام زبانیں (100+)",
    nav_color_mood: "رنگین موڈ",
    nav_surface_mode: "سطحی موڈ",
    nav_light: "لائٹ",
    nav_dark: "ڈارک",
    nav_magic_cursor: "جادوئی کرسر",

    hero_badge: "فل اسٹیک ویب ڈویلپر اور WordPress ماہر",
    hero_heading_1: "فل اسٹیک ویب ڈویلپر اور",
    hero_heading_gradient: "WordPress ماہر",
    hero_heading_2: "AI معاونت یافتہ ترقی • Vibe Coding • جدید ویب",
    hero_subheading: "AI سے معاونت یافتہ ڈویلپمنٹ، جدید Vibe Coding اور WordPress کی مہارت کے ساتھ جدید اور تیز رفتار ویب تجربات کی تعمیر۔",
    hero_bio: "میں فل اسٹیک ڈویلپمنٹ، WordPress کی مہارت، اور AI معاونت کو یکجا کر کے بین الاقوامی کلائنٹس کے لیے جدید ویب سائٹس اور eCommerce پلیٹ فارمز بناتا ہوں۔",
    hero_download_cv: "سی وی ڈاؤن لوڈ کریں",
    hero_view_projects: "منصوبے دیکھیں",

    stat_exp_val: "5+",
    stat_exp_lbl: "سال کا تجربہ",
    stat_proj_val: "200+",
    stat_proj_lbl: "مکمل منصوبے",
    stat_clients_val: "150+",
    stat_clients_lbl: "مطمئن کلائنٹس",
    stat_satisfaction_val: "99%",
    stat_satisfaction_lbl: "اطمینان کی شرح",

    about_heading: "فل اسٹیک ڈویلپمنٹ اور AI پر مبنی کوڈنگ کا امتزاج",
    about_p1: "میں ایک فل اسٹیک ویب ڈویلپر اور WordPress ماہر ہوں جس کے پاس کاروباری ویب سائٹس، eCommerce، ڈائنامک سائٹس اور لینڈنگ پیجز بنانے کا وسیع تجربہ ہے۔",
    about_p2: "میری بنیادی مہارتوں میں WordPress، Elementor Pro، WooCommerce، JetEngine، کسٹم پوسٹ ٹائپس، ریسپانسیو ڈیزائن اور سپیڈ آپٹیمائزیشن شامل ہیں۔",
    about_p3: "WordPress کے ساتھ ساتھ میں جدید ویب ٹیکنالوجیز اور AI پر مبنی ورک فلو استعمال کرتا ہوں تاکہ منصوبہ بندی اور کوڈنگ کے عمل کو تیز بنایا جا سکے۔",
    about_p4: "مجھے Vibe Coding میں بھی مہارت حاصل ہے — خیالات اور ڈیزائنز کو AI کی مدد سے تیزی سے فعال ویب پروڈکٹس میں بدلنا۔",
    about_p5: "میرا طریقہ کار انسانی صلاحیت اور جدید ٹیکنالوجی کو یکجا کر کے اعلیٰ معیار کے حل فراہم کرتا ہے۔",
    about_skills_title: "بنیادی مہارتیں",

    services_heading: "خدمات اور صلاحیتیں",
    services_subtitle: "اعلیٰ کارکردگی والی ویب ایپس اور AI ورک فلو سے لے کر WordPress اور WooCommerce تک۔",
    svc_1_title: "فل اسٹیک ویب ڈویلپمنٹ",
    svc_1_desc: "جدید ٹیکنالوجیز کے ساتھ ریسپانسیو اور فعال ویب ایپلیکیشنز کی تیاری۔",
    svc_2_title: "WordPress ڈویلپمنٹ",
    svc_2_desc: "پیشہ ورانہ WordPress ویب سائٹس، Elementor Pro، اور WooCommerce اسٹورز کی تعمیر۔",
    svc_3_title: "AI معاونت یافتہ ویب ڈویلپمنٹ",
    svc_3_desc: "کوڈنگ، پلاننگ اور ڈیبگنگ کے عمل کو تیز کرنے کے لیے AI ٹولز کا موثر استعمال۔",
    svc_4_title: "Vibe Coding",
    svc_4_desc: "خیالات اور ضروریات کو AI کی مدد سے فوری طور پر ڈیجیٹل حل میں تبدیل کرنا۔",
    svc_5_title: "کسٹم ویب حل",
    svc_5_desc: "کسٹم فیچرز، ڈیش بورڈز، ڈائنامک سسٹمز اور تیسرے فریق کے انٹیگریشنز کی تیاری۔",
    svc_6_title: "ویب سائٹ آپٹیمائزیشن",
    svc_6_desc: "ویب سائٹ کی رفتار، Core Web Vitals اور سرچ انجن ساخت کی بہتری۔",
    svc_7_title: "WooCommerce اسٹورز",
    svc_7_desc: "بہترین کسٹمر تجربے اور سیلز بڑھانے کے لیے موزوں آن لائن شاپس۔",
    svc_8_title: "لینڈنگ پیج ڈویلپمنٹ",
    svc_8_desc: "لیڈز اور سیلز میں اضافے کے لیے تیز رفتار اور پرکشش لینڈنگ پیجز۔",

    tech_heading: "ٹیکنالوجیز اور ٹولز",

    portfolio_heading: "حالیہ منصوبے",
    portfolio_subtitle: "WordPress اور جدید ویب کے منتخب کلائنٹ پروجیکٹس۔ مکمل پیش نظارہ کے لیے کارڈز پر ماؤس لائیں۔",
    portfolio_view_project: "منصوبہ دیکھیں",

    reviews_heading: "کلائنٹس کی آراء",
    reviews_subtitle: "دنیا بھر کے کلائنٹس کا اعتماد اور تجاویز۔",

    contact_heading: "کوئی نیا خیال ہے؟ آئیے مل کر بنائیں۔",
    contact_subtitle: "چاہے آپ کو WordPress سائٹ چاہیے، آن لائن اسٹور یا جدید AI حل، آئیے اسے حقیقت کا روپ دیں۔",
    contact_first_name: "پہلا نام",
    contact_last_name: "آخری نام",
    contact_email: "ای میل پتہ",
    contact_phone: "فون نمبر (اختیاری)",
    contact_project_type: "منصوبے کی قسم",
    contact_budget: "متوقع بجٹ",
    contact_message: "آپ کا پیغام",
    contact_send: "پیغام بھیجیں",
    contact_sending: "ارسال ہو رہا ہے...",
    contact_success_title: "پیغام کامیابی سے بھیج دیا گیا!",
    contact_success_desc: "رابطہ کرنے کا شکریہ! میں 24 گھنٹوں کے اندر جواب دوں گا۔",
    contact_send_another: "ایک اور پیغام بھیجیں",
    contact_info_title: "براہ راست رابطہ",
    contact_location: "ڈھاکہ، بنگلہ دیش (عالمی سطح پر خدمات)",
    contact_available: "نئے منصوبوں کے لیے دستیاب",

    footer_tagline: "فل اسٹیک ویب ڈویلپر اور WordPress ماہر — جدید اور معیاری ڈیجیٹل تجربات۔",
    footer_quick_links: "فوری لنکس",
    footer_rights: "تمام حقوق محفوظ ہیں۔",
  },
};

interface LanguageContextType {
  lang: string;
  setLanguage: (code: string) => void;
  t: (key: keyof Translations, fallback?: string) => string;
  isRTL: boolean;
}

const RTL_LANGUAGES = ["ar", "he", "fa", "ur"];

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLanguage: () => {},
  t: (key, fallback) => (fallback || String(key)),
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<string>("en");

  useEffect(() => {
    try {
      // Clear legacy Google translation cookies if any
      const domain = window.location.hostname;
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;

      const saved = localStorage.getItem("userLanguage") || "en";
      setLangState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = RTL_LANGUAGES.includes(saved) ? "rtl" : "ltr";
    } catch {
      // fallback
    }

    const handleLanguageChange = (e?: Event) => {
      const detail = (e as CustomEvent)?.detail;
      const current = typeof detail === "string" ? detail : (localStorage.getItem("userLanguage") || "en");
      setLangState(current);
      document.documentElement.lang = current;
      document.documentElement.dir = RTL_LANGUAGES.includes(current) ? "rtl" : "ltr";
    };

    window.addEventListener("userLanguageChange", handleLanguageChange);
    window.addEventListener("storage", handleLanguageChange);

    return () => {
      window.removeEventListener("userLanguageChange", handleLanguageChange);
      window.removeEventListener("storage", handleLanguageChange);
    };
  }, []);

  const setLanguage = (code: string) => {
    setLangState(code);
    try {
      localStorage.setItem("userLanguage", code);
    } catch {
      // ignore
    }
    document.documentElement.lang = code;
    document.documentElement.dir = RTL_LANGUAGES.includes(code) ? "rtl" : "ltr";
    window.dispatchEvent(new CustomEvent("userLanguageChange", { detail: code }));
  };

  const t = (key: keyof Translations, fallback?: string): string => {
    const activeDict = TRANSLATIONS[lang as SupportedLanguage];
    if (activeDict && activeDict[key]) {
      return activeDict[key];
    }
    const defaultDict = TRANSLATIONS.en;
    if (defaultDict && defaultDict[key]) {
      return defaultDict[key];
    }
    return fallback || (key as string);
  };

  const isRTL = RTL_LANGUAGES.includes(lang);

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
