<?php
/**
 * Template Name: Soft Emboss Elementor Full Width
 *
 * @package Soft_Emboss
 */
get_header(); ?>

<div id="elementor-content-wrap" class="se-elementor-container" style="width:100%;min-height:100vh;overflow-x:hidden;">
    <?php
    while (have_posts()) :
        the_post();
        the_content();
    endwhile;
    ?>
</div>

<?php get_footer(); ?>
