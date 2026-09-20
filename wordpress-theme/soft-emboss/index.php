<?php
/**
 * The main template file
 *
 * @package Soft_Emboss
 */
get_header(); ?>

<main id="primary" class="site-main" style="max-width:1200px;margin:40px auto;padding:0 24px;min-height:70vh;">
    <?php
    if (have_posts()) :
        while (have_posts()) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('se-card'); ?> style="padding:32px;margin-bottom:28px;">
                <h2 style="margin-top:0;"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <div class="entry-content" style="color:#94A3B8;">
                    <?php the_excerpt(); ?>
                </div>
            </article>
            <?php
        endwhile;
    else :
        ?>
        <div class="se-card" style="padding:40px;text-align:center;">
            <h2>No content found</h2>
            <p>Please build your pages with Elementor.</p>
        </div>
        <?php
    endif;
    ?>
</main>

<?php get_footer(); ?>
