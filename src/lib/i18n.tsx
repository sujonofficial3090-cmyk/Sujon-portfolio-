import React, { createContext, useContext, useEffect, useState } from "react";

export type SupportedLanguage = "en" | "bn" | "ar" | "es" | "fr" | "de" | "hi";

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

    hero_badge: "WordPress Developer",
    hero_heading_1: "I Build",
    hero_heading_gradient: "Modern & High-Performance",
    hero_heading_2: "WordPress Websites",
    hero_bio: "I'm Sujon, a professional WordPress Developer specializing in responsive, fast, modern and conversion-focused WordPress websites for businesses, startups and personal brands worldwide.",
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

    about_heading: "Who am I?",
    about_p1: "I'm Sujon, a passionate WordPress Developer focused on building beautiful, responsive and high-performing websites. I work with WordPress, Elementor, WooCommerce and custom website development to create professional digital experiences for businesses and clients worldwide.",
    about_p2: "Over the years, I've helped numerous clients establish a stronger digital presence through robust, scalable, and conversion-focused digital experiences that accelerate business growth and create lasting online impact.",
    about_skills_title: "Skills Highlight",

    services_heading: "Explore Our Services",
    services_subtitle: "Specialized WordPress, WooCommerce, and front-end development solutions crafted to scale your business.",
    svc_1_title: "WordPress Development",
    svc_1_desc: "Custom-built, high-performing WordPress websites tailored to your business needs.",
    svc_2_title: "Elementor Development",
    svc_2_desc: "Pixel-perfect, drag-and-drop page builder designs for flexible & beautiful layouts.",
    svc_3_title: "WooCommerce Development",
    svc_3_desc: "Feature-rich eCommerce storefronts optimized for high conversions and user experience.",
    svc_4_title: "Custom WordPress Website",
    svc_4_desc: "Unique custom WordPress themes developed from scratch — no page-builder bloat.",
    svc_5_title: "WordPress Website Redesign",
    svc_5_desc: "Transform your outdated website into a modern, sleek, and highly engaging platform.",
    svc_6_title: "WordPress Speed Optimization",
    svc_6_desc: "Boost page load times, GTmetrix scores, and Core Web Vitals for better SEO rankings.",
    svc_7_title: "WordPress Maintenance",
    svc_7_desc: "Regular security checks, plugin updates, and backups to keep your site safe 24/7.",
    svc_8_title: "Landing Page Development",
    svc_8_desc: "High-converting, responsive landing pages built specifically for leads and sales.",

    tech_heading: "Technologies I Work With",

    portfolio_heading: "Recent Projects",
    portfolio_subtitle: "A curated showcase of recent high-converting WordPress & Web client projects. Hover over cards to preview full pages.",
    portfolio_view_project: "View Project",

    reviews_heading: "What Our Clients Say",
    reviews_subtitle: "Trusted feedback from businesses and partners worldwide.",

    contact_heading: "Let's Build Something Great",
    contact_subtitle: "Have a project in mind? Reach out today for a free consultation and project quote.",
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

    footer_tagline: "Professional WordPress Developer specializing in custom, responsive & high-converting websites.",
    footer_quick_links: "Quick Navigation",
    footer_rights: "All rights reserved.",
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

    hero_badge: "ওয়ার্ডপ্রেস ডেভেলপার",
    hero_heading_1: "আমি তৈরি করি",
    hero_heading_gradient: "আধুনিক ও হাই-পারফরম্যান্স",
    hero_heading_2: "ওয়ার্ডপ্রেস ওয়েবসাইট",
    hero_bio: "আমি সুজন, একজন প্রফেশনাল ওয়ার্ডপ্রেস ডেভেলপার। ব্যবসা, স্টার্টআপ এবং পার্সোনাল ব্র্যান্ডের জন্য রেসপনসিভ, দ্রুত ও কনভার্সন-কেন্দ্রিক ওয়েবসাইট তৈরিতে দক্ষ ও অভিজ্ঞ।",
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

    about_heading: "আমার সম্পর্কে",
    about_p1: "আমি সুজন, একজন নিবেদিতপ্রাণ ওয়ার্ডপ্রেস ডেভেলপার। আমি সুন্দর, রেসপনসিভ ও দ্রুতগতির ওয়েবসাইট তৈরিতে বিশ্বাসী। ওয়ার্ডপ্রেস, এলিমেন্টর, উকমার্স এবং কাস্টম কোডিংয়ের মাধ্যমে বিশ্বমানের ডিজিটাল সমাধান প্রদান করে থাকি।",
    about_p2: "গত কয়েক বছরে অসংখ্য ক্লায়েন্টকে সফল ডিজিটাল প্ল্যাটফর্ম তৈরিতে সহায়তা করেছি, যা তাদের ব্যবসায়ের প্রচার ও বিক্রয় উল্লেখযোগ্যভাবে বৃদ্ধি করেছে।",
    about_skills_title: "বিশেষ দক্ষতাসমূহ",

    services_heading: "আমাদের সেবাসমূহ",
    services_subtitle: "আপনার ব্যবসায়ের সফলতার জন্য বিশেষায়িত ওয়ার্ডপ্রেস, উকমার্স ও ফ্রন্ট-এন্ড ওয়েব সলিউশন।",
    svc_1_title: "ওয়ার্ডপ্রেস ডেভেলপমেন্ট",
    svc_1_desc: "আপনার ব্যবসায়ের চাহিদামতো কাস্টম-বিল্ট, দ্রুত ও আধুনিক ওয়ার্ডপ্রেস ওয়েবসাইট।",
    svc_2_title: "এলিমেন্টর ডেভেলপমেন্ট",
    svc_2_desc: "পিক্সেল-পারফেক্ট ড্র্যাগ-অ্যান্ড-ড্রপ এলিমেন্টর ডিজাইন যা সহজে পরিচালনা করা যায়।",
    svc_3_title: "উকমার্স শপ ডেভেলপমেন্ট",
    svc_3_desc: "উচ্চ কনভার্সন রেট ও সহজ পেমেন্ট গেটওয়ে সহ পূর্ণাঙ্গ অনলাইন শপ।",
    svc_4_title: "কাস্টম ওয়ার্ডপ্রেস থিম",
    svc_4_desc: "কোনো অতিরিক্ত কোড বা ব্লট ছাড়া স্ক্র্যাচ থেকে তৈরি কাস্টম থিম।",
    svc_5_title: "ওয়েবসাইট রিডিজাইন",
    svc_5_desc: "পুরনো ও ধীরগতির ওয়েবসাইটকে আধুনিক, আকর্ষণীয় ও দ্রুততর প্ল্যাটফর্মে রূপান্তর।",
    svc_6_title: "স্পিড অপটিমাইজেশন",
    svc_6_desc: "সাইটের লোডিং স্পিড, GTmetrix স্কোর এবং Core Web Vitals উন্নত করা।",
    svc_7_title: "ওয়ার্ডপ্রেস মেইনটেন্যান্স",
    svc_7_desc: "নিয়মিত সিকিউরিটি চেক, প্লাগইন আপডেট ও ব্যাকআপের মাধ্যমে সার্বক্ষণিক সুরক্ষা।",
    svc_8_title: "ল্যান্ডিং পেজ ডেভেলপমেন্ট",
    svc_8_desc: "লিড সংগ্রহ ও বিক্রয়ের জন্য বিশেষায়িত হাই-কনভার্টিং ল্যান্ডিং পেজ।",

    tech_heading: "যেসব প্রযুক্তিতে কাজ করি",

    portfolio_heading: "সাম্প্রতিক প্রজেক্টসমূহ",
    portfolio_subtitle: "সদ্য সম্পন্নকৃত কিছু সফল ওয়ার্ডপ্রেস ও ওয়েব প্রজেক্টের গ্যালারি। সম্পূর্ণ পেজ দেখতে কার্ডে হোভার করুন।",
    portfolio_view_project: "প্রজেক্ট দেখুন",

    reviews_heading: "ক্লায়েন্টদের প্রতিক্রিয়া",
    reviews_subtitle: "বিশ্বজুড়ে আমাদের সম্মানিত ক্লায়েন্ট ও পার্টনারদের বিশ্বস্ত মতামত।",

    contact_heading: "যোগাযোগ করুন",
    contact_subtitle: "আপনার কোনো নতুন প্রজেক্ট বা আইডিয়া থাকলে নির্দ্বিধায় মেসেজ দিন, আমি দ্রুত উত্তর দেব।",
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

    footer_tagline: "প্রফেশনাল ওয়ার্ডপ্রেস ডেভেলপার — রেসপনসিভ, দ্রুত ও আধুনিক ওয়েবসাইট বিশেষজ্ঞ।",
    footer_quick_links: "প্রয়োজনীয় লিঙ্ক",
    footer_rights: "সর্বস্বত্ব সংরক্ষিত।",
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
  t: (key, fallback) => (fallback || key),
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<string>("en");

  useEffect(() => {
    try {
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
