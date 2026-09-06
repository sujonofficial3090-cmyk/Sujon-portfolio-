/**
 * catalog.ts — WordPress Themes & Plugins Store & Repository.
 *
 * Persisted in localStorage so Sujon (Admin) can upload unlimited themes & plugins,
 * and authenticated customers can download them freely.
 */

export interface CatalogItem {
  id: string;
  title: string;
  type: "theme" | "plugin";
  category: "E-Commerce" | "Agency & Portfolio" | "Speed & Performance" | "Elementor Addon" | "SEO & Utilities";
  version: string;
  description: string;
  features: string[];
  demoUrl: string;
  downloadUrl: string;
  fileSize: string;
  downloadsCount: number;
  badge?: "Featured" | "Popular" | "New" | "Pro Free" | "Premium";
  planRequirement: "free" | "paid";
  price?: number;
  createdAt: string;
  author: string;
}

const CATALOG_KEY = "sujon_catalog_themes_plugins";

const DEFAULT_ITEMS: CatalogItem[] = [
  {
    id: "item-theme-1",
    title: "Apex Agency Pro — Modern WordPress Theme",
    type: "theme",
    category: "Agency & Portfolio",
    version: "2.4.0",
    description: "High-performance WordPress agency and portfolio theme with interactive bento grid, neumorphic styling, and instant page transitions.",
    features: ["99+ Google PageSpeed Score", "Full Elementor & Gutenberg Support", "Dark / Light Mode Switcher", "1-Click Demo Import"],
    demoUrl: "/#home",
    downloadUrl: "apex-agency-pro-v2.4.0.zip",
    fileSize: "6.2 MB",
    downloadsCount: 142,
    badge: "Featured",
    planRequirement: "free",
    price: 0,
    createdAt: "2026-01-15T12:00:00.000Z",
    author: "Sujon Mia",
  },
  {
    id: "item-plugin-1",
    title: "FastCheckout — WooCommerce 1-Click Popup",
    type: "plugin",
    category: "E-Commerce",
    version: "1.8.2",
    description: "Replaces tedious multi-step WooCommerce checkouts with a slick, mobile-friendly 1-click popup modal that dramatically increases conversion rates.",
    features: ["Direct WhatsApp Order Button", "Custom Billing Fields Manager", "Zero Ajax Latency", "Stripe & bKash / Nagad Ready"],
    demoUrl: "/#services",
    downloadUrl: "fastcheckout-woocommerce-v1.8.2.zip",
    fileSize: "1.9 MB",
    downloadsCount: 238,
    badge: "Popular",
    planRequirement: "free",
    price: 0,
    createdAt: "2026-01-20T10:30:00.000Z",
    author: "Sujon Mia",
  },
  {
    id: "item-theme-2",
    title: "SoftEmboss — Minimalist Creative Developer Theme",
    type: "theme",
    category: "Agency & Portfolio",
    version: "3.1.0",
    description: "The flagship neumorphic developer portfolio theme crafted with Funnel Display typography, smooth Lenis scrolling, and 5-color accent mood selector.",
    features: ["Neumorphic Soft Embossed UI", "Built-in Contact Lead Capture", "SEO & OpenGraph Pre-Configured", "Zero Bloatware"],
    demoUrl: "/#about",
    downloadUrl: "softemboss-portfolio-v3.1.0.zip",
    fileSize: "5.4 MB",
    downloadsCount: 189,
    badge: "New",
    planRequirement: "free",
    price: 0,
    createdAt: "2026-02-01T08:15:00.000Z",
    author: "Sujon Mia",
  },
  {
    id: "item-plugin-2",
    title: "SpeedBooster Cache & Critical CSS Engine",
    type: "plugin",
    category: "Speed & Performance",
    version: "2.0.4",
    description: "Automatic Core Web Vitals optimization plugin. Inlines critical viewport CSS, defers non-essential JavaScript, and converts images to WebP.",
    features: ["Instant LCP & FID Boost", "Automatic WebP Conversion", "Database Bloat Cleaner", "Google Fonts Local Preload"],
    demoUrl: "/#services",
    downloadUrl: "speedbooster-cache-v2.0.4.zip",
    fileSize: "2.3 MB",
    downloadsCount: 310,
    badge: "Premium",
    planRequirement: "paid",
    price: 29,
    createdAt: "2026-02-10T14:40:00.000Z",
    author: "Sujon Mia",
  },
  {
    id: "item-theme-3",
    title: "CartPulse — WooCommerce Ultra Storefront Theme",
    type: "theme",
    category: "E-Commerce",
    version: "1.5.0",
    description: "A conversion-optimized online store theme tailored for fashion, electronics, and digital products with sticky add-to-cart bars and live search.",
    features: ["Ajax Live Predictive Search", "Sticky Add to Cart Bar", "Cart Slide-out Drawer", "Multi-Currency Ready"],
    demoUrl: "/#portfolio",
    downloadUrl: "cartpulse-woocommerce-v1.5.0.zip",
    fileSize: "7.1 MB",
    downloadsCount: 164,
    badge: "Popular",
    planRequirement: "paid",
    price: 49,
    createdAt: "2026-02-18T16:20:00.000Z",
    author: "Sujon Mia",
  },
  {
    id: "item-plugin-3",
    title: "Elementor Neumorph & 3D Interactive Addons",
    type: "plugin",
    category: "Elementor Addon",
    version: "1.2.0",
    description: "25+ Custom Elementor widgets with true neumorphic inset/embossed shadows, tilt effects, and smooth reveal animations.",
    features: ["25+ Pre-Built Widgets", "No Coding Required", "Super Lightweight (<30KB CSS)", "Compatible with Elementor Free & Pro"],
    demoUrl: "/#services",
    downloadUrl: "elementor-neumorph-addons-v1.2.0.zip",
    fileSize: "3.2 MB",
    downloadsCount: 205,
    badge: "Premium",
    planRequirement: "paid",
    price: 39,
    createdAt: "2026-02-25T11:00:00.000Z",
    author: "Sujon Mia",
  },
];

export function getCatalogItems(): CatalogItem[] {
  if (typeof window === "undefined") return DEFAULT_ITEMS;
  try {
    const raw = localStorage.getItem(CATALOG_KEY);
    if (!raw) {
      localStorage.setItem(CATALOG_KEY, JSON.stringify(DEFAULT_ITEMS));
      return DEFAULT_ITEMS;
    }
    const parsed = JSON.parse(raw) as CatalogItem[];
    const defaultMap = new Map(DEFAULT_ITEMS.map((d) => [d.id, d]));

    const merged = parsed.map((item) => {
      const def = defaultMap.get(item.id);
      let planRequirement: "free" | "paid" = item.planRequirement;
      let price = item.price;

      if (def) {
        // Built-in item: enforce the official planRequirement (e.g. SpeedBooster, CartPulse, Elementor Addons)
        if (def.planRequirement === "paid") {
          planRequirement = "paid";
          price = def.price ?? 29;
        } else if (!planRequirement) {
          planRequirement = def.planRequirement;
          price = def.price ?? 0;
        }
      } else {
        // Custom uploaded item: if price is greater than 0, it is STRICTLY paid!
        if (price && price > 0) {
          planRequirement = "paid";
        } else if (planRequirement === "paid" && (!price || price === 0)) {
          price = 29;
        } else if (!planRequirement) {
          planRequirement = "free";
          price = 0;
        }
      }

      return {
        ...item,
        planRequirement: planRequirement || "free",
        price: price ?? (planRequirement === "paid" ? 29 : 0),
      };
    });

    localStorage.setItem(CATALOG_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return DEFAULT_ITEMS;
  }
}

export function saveCatalogItems(items: CatalogItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CATALOG_KEY, JSON.stringify(items));
}

export function addCatalogItem(
  newItem: Omit<CatalogItem, "id" | "downloadsCount" | "createdAt">
): CatalogItem {
  const items = getCatalogItems();
  const created: CatalogItem = {
    ...newItem,
    id: `item-${Date.now()}`,
    downloadsCount: 0,
    createdAt: new Date().toISOString(),
  };
  const updated = [created, ...items];
  saveCatalogItems(updated);
  return created;
}

export function deleteCatalogItem(id: string): void {
  const items = getCatalogItems();
  saveCatalogItems(items.filter((i) => i.id !== id));
}

export function updateCatalogItem(id: string, updates: Partial<CatalogItem>): CatalogItem | null {
  const items = getCatalogItems();
  let updatedItem: CatalogItem | null = null;
  const updated = items.map((item) => {
    if (item.id === id) {
      updatedItem = { ...item, ...updates };
      return updatedItem;
    }
    return item;
  });
  if (updatedItem) {
    saveCatalogItems(updated);
  }
  return updatedItem;
}

export function incrementItemDownloads(id: string): number {
  const items = getCatalogItems();
  let count = 0;
  const updated = items.map((item) => {
    if (item.id === id) {
      count = item.downloadsCount + 1;
      return { ...item, downloadsCount: count };
    }
    return item;
  });
  saveCatalogItems(updated);
  return count;
}
