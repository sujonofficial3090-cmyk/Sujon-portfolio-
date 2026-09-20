<?php
/**
 * Elementor Widgets Registry
 *
 * @package Soft_Emboss
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

function soft_emboss_register_elementor_widgets($widgets_manager) {
    // Check if Elementor is loaded
    if (!did_action('elementor/loaded')) {
        return;
    }

    $widgets = array(
        'hero'      => 'widget-hero.php',
        'services'  => 'widget-services.php',
        'portfolio' => 'widget-portfolio.php',
        'skills'    => 'widget-skills.php',
        'timeline'  => 'widget-timeline.php',
        'reviews'   => 'widget-reviews.php',
        'contact'   => 'widget-contact.php',
    );

    foreach ($widgets as $slug => $file) {
        $path = SOFT_EMBOSS_DIR . '/inc/widgets/' . $file;
        if (file_exists($path)) {
            require_once $path;
        }
    }

    // Register each widget class if exists
    if (class_exists('Soft_Emboss_Hero_Widget')) {
        $widgets_manager->register(new \Soft_Emboss_Hero_Widget());
    }
    if (class_exists('Soft_Emboss_Services_Widget')) {
        $widgets_manager->register(new \Soft_Emboss_Services_Widget());
    }
    if (class_exists('Soft_Emboss_Portfolio_Widget')) {
        $widgets_manager->register(new \Soft_Emboss_Portfolio_Widget());
    }
    if (class_exists('Soft_Emboss_Skills_Widget')) {
        $widgets_manager->register(new \Soft_Emboss_Skills_Widget());
    }
    if (class_exists('Soft_Emboss_Timeline_Widget')) {
        $widgets_manager->register(new \Soft_Emboss_Timeline_Widget());
    }
    if (class_exists('Soft_Emboss_Reviews_Widget')) {
        $widgets_manager->register(new \Soft_Emboss_Reviews_Widget());
    }
    if (class_exists('Soft_Emboss_Contact_Widget')) {
        $widgets_manager->register(new \Soft_Emboss_Contact_Widget());
    }
}
add_action('elementor/widgets/register', 'soft_emboss_register_elementor_widgets');
