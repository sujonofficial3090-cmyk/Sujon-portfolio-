import JSZip from "jszip";
import type { CatalogItem } from "./catalog";

/**
 * Generate a genuine, 100% valid WordPress theme or plugin ZIP archive
 * that opens smoothly on Windows Explorer, WinRAR, 7-Zip, and macOS.
 */
export async function downloadCatalogAssetZip(item: CatalogItem): Promise<void> {
  // If downloadUrl is an external link (Google Drive, Dropbox, Cloudflare R2, S3, etc.)
  if (item.downloadUrl && (item.downloadUrl.startsWith("http://") || item.downloadUrl.startsWith("https://"))) {
    const link = document.createElement("a");
    link.href = item.downloadUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = `${item.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  const zip = new JSZip();
  const slug = item.title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
  const folder = zip.folder(slug) || zip;

  if (item.type === "theme") {
    // 1. Valid style.css with official WordPress theme headers
    const styleCss = `/*
Theme Name: ${item.title}
Theme URI: https://sujon.dev
Author: Sujon Mia — WordPress Specialist
Author URI: https://sujon.dev
Description: ${item.description}
Version: ${item.version}
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: ${slug}
Tags: portfolio, agency, e-commerce, clean, responsive, custom-colors
*/

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #111827;
  background-color: #f9fafb;
  margin: 0;
  padding: 0;
}
`;
    folder.file("style.css", styleCss);

    // 2. Valid functions.php
    const functionsPhp = `<?php
/**
 * ${item.title} functions and definitions
 *
 * @package ${slug}
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function ${slug.replace(/-/g, "_")}_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');

    register_nav_menus(array(
        'primary' => __('Primary Menu', '${slug}'),
        'footer'  => __('Footer Menu', '${slug}'),
    ));
}
add_action('after_setup_theme', '${slug.replace(/-/g, "_")}_setup');

function ${slug.replace(/-/g, "_")}_scripts() {
    wp_enqueue_style('${slug}-style', get_stylesheet_uri(), array(), '${item.version}');
}
add_action('wp_enqueue_scripts', '${slug.replace(/-/g, "_")}_scripts');
`;
    folder.file("functions.php", functionsPhp);

    // 3. Valid index.php
    const indexPhp = `<?php
/**
 * Main template file
 *
 * @package ${slug}
 */

get_header();
?>

<main id="primary" class="site-main" style="max-width: 1200px; margin: 40px auto; padding: 0 20px;">
    <header class="page-header" style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 2.5rem; font-weight: 800; color: #ff6000;">${item.title}</h1>
        <p style="font-size: 1.1rem; color: #6b7280;">${item.description}</p>
    </header>

    <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        <?php foreach ([${item.features.map((f) => `"${f.replace(/"/g, '\\"')}"`).join(", ")}] as $feature): ?>
            <div style="background: #ffffff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
                <h3 style="margin: 0; font-size: 1rem; color: #1f2937;">✓ <?php echo esc_html($feature); ?></h3>
            </div>
        <?php endforeach; ?>
    </div>
</main>

<?php
get_footer();
`;
    folder.file("index.php", indexPhp);

    // 4. Header & Footer
    folder.file("header.php", `<!DOCTYPE html>\n<html <?php language_attributes(); ?>>\n<head>\n<meta charset="<?php bloginfo('charset'); ?>">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<?php wp_head(); ?>\n</head>\n<body <?php body_class(); ?>>\n`);
    folder.file("footer.php", `<footer style="text-align: center; padding: 40px 20px; color: #9ca3af; font-size: 13px;">\n<p>Crafted by Sujon Mia — <a href="https://sujon.dev" style="color: #ff6000;">sujon.dev</a></p>\n</footer>\n<?php wp_footer(); ?>\n</body>\n</html>\n`);

  } else {
    // PLUGIN FORMAT
    // 1. Main Plugin PHP File with valid WordPress Plugin Header
    const pluginPhp = `<?php
/**
 * Plugin Name: ${item.title}
 * Plugin URI: https://sujon.dev
 * Description: ${item.description}
 * Version: ${item.version}
 * Author: Sujon Mia
 * Author URI: https://sujon.dev
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: ${slug}
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class ${slug.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase()}_Plugin {
    public function __construct() {
        add_action('init', array($this, 'init'));
    }

    public function init() {
        // Plugin initialized successfully
    }
}

new ${slug.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase()}_Plugin();
`;
    folder.file(`${slug}.php`, pluginPhp);
  }

  // 5. Official README.txt
  const readmeTxt = `=== ${item.title} ===
Contributors: Sujon Mia
Requires at least: 6.0
Tested up to: 6.7
Stable tag: ${item.version}
License: GPLv2 or later

== Description ==
${item.description}

== Key Features ==
${item.features.map((f) => `* ${f}`).join("\n")}

== Installation ==
1. Go to your WordPress Dashboard.
2. Navigate to ${item.type === "theme" ? "Appearance > Themes > Add New" : "Plugins > Add New"}.
3. Click "Upload ${item.type === "theme" ? "Theme" : "Plugin"}".
4. Choose this zip file: ${slug}.zip.
5. Click "Install Now", then click "Activate".

== Official Support ==
Developer: Sujon Mia
WhatsApp VIP Support: +8801936711699
Official Portfolio: https://sujon.dev
`;
  folder.file("readme.txt", readmeTxt);

  // Generate real binary zip buffer
  const content = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });

  const blobUrl = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = `${slug}-v${item.version}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}
