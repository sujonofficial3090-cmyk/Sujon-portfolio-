import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  img: string;
  excerpt: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "how-to-build-a-professional-wordpress-website",
    title: "How to Build a Professional WordPress Website",
    category: "WordPress",
    date: "August 15, 2026",
    author: "Sujon",
    img: blog1,
    excerpt: "Learn step-by-step how to build a professional, high-converting WordPress website from scratch including theme setup, plugins, and SEO.",
    content: `Building a professional WordPress website requires careful planning, the right tools, and expert execution. Whether you're launching a business site, portfolio, or blog, this guide walks you through every essential step.

## Step 1: Choose Reliable Hosting

Your hosting provider is the foundation of your WordPress site. Look for hosting that offers:
- SSD storage for fast load times
- Free SSL certificate
- One-click WordPress installation
- 99.9% uptime guarantee

Recommended providers: SiteGround, Kinsta, WPEngine, or Cloudways.

## Step 2: Install WordPress

Most quality hosting providers offer a one-click WordPress installation. After installation, log in to your WordPress dashboard at yourdomain.com/wp-admin.

## Step 3: Choose and Install a Theme

Select a professional theme that matches your brand. Popular options include Astra, GeneratePress, and OceanWP. These lightweight themes are highly customizable and work seamlessly with Elementor.

## Step 4: Install Essential Plugins

Every professional WordPress site needs these core plugins:
- **Yoast SEO** or **Rank Math** for SEO optimization
- **WP Rocket** for caching and speed
- **Wordfence** for security
- **Elementor** for page building
- **Contact Form 7** or **WPForms** for contact forms

## Step 5: Design Your Pages

Using Elementor, design your key pages:
- Home page with clear value proposition
- About page with your story and credentials
- Services page with detailed offerings
- Portfolio or Projects page
- Contact page with a functional form

## Step 6: Optimize for SEO

Set up proper SEO foundations:
- Install and configure Yoast SEO or Rank Math
- Set up XML sitemap
- Configure meta titles and descriptions
- Use proper heading structure (H1, H2, H3)
- Add alt text to all images
- Connect to Google Search Console and Analytics

## Step 7: Test and Launch

Before launching:
- Test on multiple devices and browsers
- Check all forms work correctly
- Verify all links are working
- Run a speed test using GTmetrix
- Ensure SSL is active and HTTPS is forced

## Conclusion

Building a professional WordPress website is achievable with the right approach. Focus on speed, user experience, and clear messaging to create a site that converts visitors into customers.`
  },
  {
    id: "2",
    slug: "best-elementor-tips-for-business-websites",
    title: "Best Elementor Tips for Business Websites",
    category: "Elementor",
    date: "August 10, 2026",
    author: "Sujon",
    img: blog2,
    excerpt: "Master Elementor with these professional tips that will help you build stunning, conversion-focused business websites faster.",
    content: `Elementor is the world's most popular WordPress page builder with over 12 million websites using it. These tips will help you build more professional, faster, and better-converting business websites.

## Tip 1: Use Global Colors and Fonts

Set up your brand's color palette and typography in Elementor's Global Settings before building any pages. This ensures consistency and makes it easy to update your brand across the entire site.

**How to set it up:**
1. Go to Elementor → Site Settings → Global Colors
2. Define your primary, secondary, and accent colors
3. Set up Global Typography for headings and body text

## Tip 2: Create Reusable Templates

Save time by creating global templates for:
- **Headers** – Your navigation bar
- **Footers** – Your footer section
- **Sections** – CTAs, testimonials, feature sections

Use Elementor's Theme Builder to assign these templates globally.

## Tip 3: Optimize Images Before Upload

Large images are one of the biggest causes of slow WordPress sites. Always:
- Resize images to the actual display size before uploading
- Use WebP format instead of JPEG/PNG
- Use a lazy loading plugin for images below the fold
- Use Smush or ShortPixel for automatic compression

## Tip 4: Use Flexbox Containers

Elementor's Flexbox Container (Flexbox layout) is far more efficient than the legacy Section/Column system. Enable it in Elementor Experiments and rebuild layouts for better performance and flexibility.

## Tip 5: Limit Installed Widgets

Every Elementor widget adds some CSS and JavaScript to your pages. Disable widgets you don't use via Elementor → Elements Manager to improve site speed.

## Tip 6: Use Dynamic Content

Elementor Pro supports dynamic content that pulls data from custom fields (ACF), WooCommerce, posts, etc. This is incredibly powerful for building portfolio sites, directory sites, or eCommerce pages.

## Tip 7: A/B Test Your CTAs

Use Elementor's built-in A/B testing functionality (or third-party tools like Thrive Optimize) to test different CTA button text, colors, and placements to maximize conversions.

## Conclusion

Elementor is powerful enough to build enterprise-level websites when used correctly. Master these tips to deliver premium quality websites faster and more efficiently.`
  },
  {
    id: "3",
    slug: "how-to-speed-up-a-wordpress-website",
    title: "How to Speed Up a WordPress Website",
    category: "WordPress Speed",
    date: "August 5, 2026",
    author: "Sujon",
    img: blog3,
    excerpt: "Discover proven techniques to dramatically improve your WordPress website speed and achieve a perfect Core Web Vitals score.",
    content: `A slow WordPress website kills conversions and hurts SEO rankings. Google's Core Web Vitals directly impact your search rankings, making speed optimization critical for every business website.

## Why WordPress Speed Matters

- **53%** of mobile visitors leave if a page takes more than 3 seconds to load
- A 1-second delay in page response can result in a **7% reduction** in conversions
- Google uses Core Web Vitals as a ranking factor

## Step 1: Choose Quality Hosting

The biggest performance improvement often comes from simply upgrading your hosting. Move from shared hosting to:
- **Managed WordPress Hosting**: Kinsta, WPEngine, Cloudways
- **VPS Hosting**: DigitalOcean, Linode
- **CDN**: Cloudflare (free tier works great)

## Step 2: Install a Caching Plugin

Caching creates static HTML versions of your pages, dramatically reducing server load:
- **WP Rocket** (premium, most feature-rich)
- **LiteSpeed Cache** (free, excellent for LiteSpeed servers)
- **W3 Total Cache** (free, more complex setup)

## Step 3: Optimize Images

Images typically account for 60-80% of page weight:
- Use WebP format
- Enable lazy loading for below-fold images
- Use Cloudflare Image Resizing or ShortPixel
- Set correct dimensions in HTML (avoids layout shift)

## Step 4: Minimize CSS and JavaScript

- Use WP Rocket's asset optimization to minify and combine files
- Use "Delay JavaScript Execution" to prevent render-blocking scripts
- Remove unused CSS with tools like PurgeCSS (carefully!)

## Step 5: Use a Content Delivery Network (CDN)

A CDN serves your static assets from servers closest to your visitors:
- **Cloudflare** (free tier is excellent)
- **BunnyCDN** (affordable and fast)
- **KeyCDN** (pay-per-use)

## Step 6: Optimize Your Database

A bloated database slows down queries:
- Delete post revisions (limit to 3-5 max)
- Remove spam comments
- Clean up transients
- Use WP-Optimize or Advanced Database Cleaner

## Step 7: Use a Lightweight Theme

Heavy themes like Avada or Divi load lots of unnecessary CSS/JS. Switch to:
- **Astra** (fastest theme, 50KB)
- **GeneratePress** (lightweight, high performance)
- **Blocksy** (modern, performance-focused)

## Expected Results

After implementing these optimizations, most WordPress sites see:
- GTmetrix scores improve from D/F to A/B
- LCP (Largest Contentful Paint) reduced below 2.5s
- Overall page size reduced by 60-80%

## Conclusion

Speed optimization is an ongoing process, not a one-time task. Regular audits and maintenance keep your WordPress site running at peak performance.`
  },
  {
    id: "4",
    slug: "woocommerce-website-development-guide",
    title: "WooCommerce Website Development Guide",
    category: "WooCommerce",
    date: "July 28, 2026",
    author: "Sujon",
    img: blog4,
    excerpt: "A complete guide to building a successful WooCommerce store, from setup to optimization for maximum sales and conversions.",
    content: `WooCommerce powers over 28% of all online stores worldwide. This comprehensive guide will walk you through building a professional eCommerce store that converts visitors into buyers.

## Why Choose WooCommerce?

- **Free and open source** – No monthly fees for the core platform
- **Unlimited products** – No restrictions on catalog size
- **Fully customizable** – Complete control over design and functionality
- **Massive ecosystem** – Thousands of plugins and themes available
- **WordPress powered** – Leverage the world's most popular CMS

## Phase 1: Planning Your Store

Before writing a single line of code:

### Define Your Product Catalog
- Simple products (single items)
- Variable products (sizes, colors, etc.)
- Grouped products (bundles)
- Digital/downloadable products
- Subscription products (with WooCommerce Subscriptions)

### Choose Your Payment Gateways
Popular options:
- **Stripe** – Best overall, supports cards, Apple Pay, Google Pay
- **PayPal** – Trusted by customers worldwide
- **bKash/Nagad** – For Bangladesh market
- **Razorpay** – Popular in South Asia

## Phase 2: Technical Setup

### Hosting Requirements
WooCommerce needs more resources than a basic blog:
- **Memory**: Minimum 256MB, 512MB recommended
- **PHP**: Version 8.0 or higher
- **MySQL**: Version 5.6 or higher
- **HTTPS**: Mandatory for payment processing

### Essential WooCommerce Plugins
1. **WooCommerce** (free core plugin)
2. **WooCommerce Stripe Payment Gateway**
3. **WooCommerce PDF Invoices**
4. **WooCommerce Social Login**
5. **YITH WooCommerce Wishlist**
6. **WooCommerce Cart Abandonment Recovery**

## Phase 3: Design and UX

### Product Page Optimization
Your product page is where purchase decisions are made:
- Large, high-quality product images (multiple angles)
- Clear, benefit-focused product description
- Prominent "Add to Cart" button
- Social proof (reviews, ratings, purchased count)
- Clear shipping information
- Return/refund policy summary

### Checkout Optimization
Reduce cart abandonment with:
- Guest checkout option
- Minimal form fields (only what's essential)
- Multiple payment methods
- Trust signals (SSL badge, payment logos)
- Progress indicator for multi-step checkout
- Order summary visible throughout

## Phase 4: Performance for eCommerce

WooCommerce stores need special performance considerations:
- Bypass caching for cart, checkout, and account pages
- Use a dedicated hosting plan (managed WooCommerce hosting)
- Implement Redis object caching for database queries
- Use a CDN for product images
- Monitor performance with New Relic or Query Monitor

## Phase 5: SEO for eCommerce

- Optimize product titles for search intent
- Write unique meta descriptions for every product
- Use structured data (Product schema) for rich snippets
- Create category pages with unique, helpful content
- Implement breadcrumb navigation

## Conclusion

A successful WooCommerce store requires careful planning, quality development, and ongoing optimization. The investment pays off with a powerful, scalable platform that you fully own and control.`
  },
];
