<?php
/**
 * One Click Demo Import (OCDI) Integration
 *
 * @package Soft_Emboss
 */

if (!defined('ABSPATH')) {
    exit;
}

function soft_emboss_import_files() {
    return array(
        array(
            'import_file_name'           => 'Soft Emboss Studio Full Demo',
            'categories'                 => array('Portfolio', 'Creative'),
            'local_import_file'          => SOFT_EMBOSS_DIR . '/demo-content/content.xml',
            'import_preview_image_url'   => SOFT_EMBOSS_URI . '/screenshot.png',
            'import_notice'              => esc_html__('After importing, navigate to Settings > Reading and set the imported "Home" page as your Static Front Page.', 'soft-emboss'),
        ),
    );
}
add_filter('ocdi/import_files', 'soft_emboss_import_files');

/**
 * Assign Front Page automatically after demo import
 */
function soft_emboss_after_import_setup() {
    $front_page_id = get_page_by_title('Home');

    if ($front_page_id) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', $front_page_id->ID);
    }
}
add_action('ocdi/after_import', 'soft_emboss_after_import_setup');
