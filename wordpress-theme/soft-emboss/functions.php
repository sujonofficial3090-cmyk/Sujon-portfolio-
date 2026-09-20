<?php
/**
 * Soft Emboss Studio Theme Functions and Definitions
 *
 * @package Soft_Emboss
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

define('SOFT_EMBOSS_VERSION', '1.0.0');
define('SOFT_EMBOSS_DIR', get_template_directory());
define('SOFT_EMBOSS_URI', get_template_directory_uri());

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function soft_emboss_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('align-wide');
    add_theme_support('elementor');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'));

    register_nav_menus(array(
        'primary' => esc_html__('Primary Menu', 'soft-emboss'),
    ));
}
add_action('after_setup_theme', 'soft_emboss_setup');

/**
 * Enqueue scripts and styles.
 */
function soft_emboss_scripts() {
    // Google Fonts: Poppins and Funnel Display
    wp_enqueue_style('soft-emboss-fonts', 'https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap', array(), null);

    // Main Style & Soft Emboss CSS
    wp_enqueue_style('soft-emboss-style', get_stylesheet_uri(), array(), SOFT_EMBOSS_VERSION);
    wp_enqueue_style('soft-emboss-custom', SOFT_EMBOSS_URI . '/assets/css/soft-emboss.css', array(), SOFT_EMBOSS_VERSION);

    // Interactive JS Engines
    wp_enqueue_script('soft-emboss-preloader', SOFT_EMBOSS_URI . '/assets/js/preloader.js', array(), SOFT_EMBOSS_VERSION, true);
    wp_enqueue_script('soft-emboss-particle-canvas', SOFT_EMBOSS_URI . '/assets/js/particle-canvas.js', array(), SOFT_EMBOSS_VERSION, true);
    wp_enqueue_script('soft-emboss-magic-cursor', SOFT_EMBOSS_URI . '/assets/js/magic-cursor.js', array(), SOFT_EMBOSS_VERSION, true);
}
add_action('wp_enqueue_scripts', 'soft_emboss_scripts');

/**
 * Register Elementor Custom Category
 */
function soft_emboss_add_elementor_widget_categories($elements_manager) {
    $elements_manager->add_category(
        'soft-emboss-elements',
        array(
            'title' => esc_html__('Soft Emboss Elements', 'soft-emboss'),
            'icon'  => 'fa fa-cube',
        )
    );
}
add_action('elementor/elements/categories_registered', 'soft_emboss_add_elementor_widget_categories');

/**
 * Load Elementor Widgets
 */
require_once SOFT_EMBOSS_DIR . '/inc/elementor-widgets.php';

/**
 * Load One-Click Demo Importer Hook
 */
if (file_exists(SOFT_EMBOSS_DIR . '/inc/demo-importer.php')) {
    require_once SOFT_EMBOSS_DIR . '/inc/demo-importer.php';
}
