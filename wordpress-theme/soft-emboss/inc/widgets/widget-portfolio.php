<?php
/**
 * Elementor Widget: Soft Emboss Portfolio Grid
 *
 * @package Soft_Emboss
 */

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Repeater;

class Soft_Emboss_Portfolio_Widget extends Widget_Base {

    public function get_name() {
        return 'soft_emboss_portfolio';
    }

    public function get_title() {
        return esc_html__('Soft Emboss: Project Showcase', 'soft-emboss');
    }

    public function get_icon() {
        return 'eicon-gallery-grid';
    }

    public function get_categories() {
        return array('soft-emboss-elements');
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_header',
            array(
                'label' => esc_html__('Section Header', 'soft-emboss'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            )
        );

        $this->add_control(
            'section_badge',
            array(
                'label'   => esc_html__('Badge', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('SELECTED WORKS', 'soft-emboss'),
            )
        );

        $this->add_control(
            'section_title',
            array(
                'label'   => esc_html__('Title', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('Featured Production Projects', 'soft-emboss'),
            )
        );

        $this->add_control(
            'section_desc',
            array(
                'label'   => esc_html__('Description', 'soft-emboss'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('Explore high-impact web products, platforms, and interactive digital experiences.', 'soft-emboss'),
            )
        );

        $this->end_controls_section();

        // Projects Repeater
        $this->start_controls_section(
            'section_projects',
            array(
                'label' => esc_html__('Projects List', 'soft-emboss'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            )
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'title',
            array(
                'label'   => esc_html__('Project Title', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('Salvaje Group Luxury Agency', 'soft-emboss'),
            )
        );

        $repeater->add_control(
            'category',
            array(
                'label'   => esc_html__('Category', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('Web App / Branding', 'soft-emboss'),
            )
        );

        $repeater->add_control(
            'image',
            array(
                'label'   => esc_html__('Thumbnail Image', 'soft-emboss'),
                'type'    => Controls_Manager::MEDIA,
                'default' => array(
                    'url' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
                ),
            )
        );

        $repeater->add_control(
            'link',
            array(
                'label'   => esc_html__('Project Link', 'soft-emboss'),
                'type'    => Controls_Manager::URL,
                'default' => array(
                    'url' => '#',
                ),
            )
        );

        $this->add_control(
            'projects_list',
            array(
                'label'       => esc_html__('Projects', 'soft-emboss'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => array(
                    array(
                        'title'    => 'Salvaje Group Luxury Portal',
                        'category' => 'Web App / 3D Experiences',
                        'image'    => array('url' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'),
                    ),
                    array(
                        'title'    => 'Global Med Enterprise System',
                        'category' => 'Healthcare / Dashboard',
                        'image'    => array('url' => 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80'),
                    ),
                    array(
                        'title'    => 'Diesel Repair Mobile Platform',
                        'category' => 'Fleet Management / PWA',
                        'image'    => array('url' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80'),
                    ),
                ),
                'title_field' => '{{{ title }}}',
            )
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <section id="projects" class="se-portfolio-section" style="padding:80px 24px;max-width:1280px;margin:0 auto;">
            <div class="se-section-header">
                <?php if (!empty($settings['section_badge'])) : ?>
                    <div class="se-badge" style="margin-bottom:14px;">
                        <?php echo esc_html($settings['section_badge']); ?>
                    </div>
                <?php endif; ?>

                <?php if (!empty($settings['section_title'])) : ?>
                    <h2 class="se-section-title"><?php echo esc_html($settings['section_title']); ?></h2>
                <?php endif; ?>

                <?php if (!empty($settings['section_desc'])) : ?>
                    <p class="se-section-desc"><?php echo esc_html($settings['section_desc']); ?></p>
                <?php endif; ?>
            </div>

            <div class="se-portfolio-grid">
                <?php if (!empty($settings['projects_list'])) : ?>
                    <?php foreach ($settings['projects_list'] as $project) : ?>
                        <div class="se-card se-portfolio-card">
                            <?php if (!empty($project['image']['url'])) : ?>
                                <img src="<?php echo esc_url($project['image']['url']); ?>" alt="<?php echo esc_attr($project['title']); ?>" class="se-portfolio-thumb" loading="lazy" />
                            <?php endif; ?>
                            <div class="se-portfolio-info">
                                <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:var(--brand);font-weight:600;display:block;margin-bottom:6px;">
                                    <?php echo esc_html($project['category']); ?>
                                </span>
                                <h3 style="font-size:1.25rem;margin:0 0 16px 0;"><?php echo esc_html($project['title']); ?></h3>
                                <a href="<?php echo esc_url($project['link']['url']); ?>" class="se-btn se-btn-outline" style="padding:8px 18px;font-size:12px;">
                                    View Project &rarr;
                                </a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </section>
        <?php
    }
}
