<?php
/**
 * Elementor Widget: Soft Emboss Services
 *
 * @package Soft_Emboss
 */

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Repeater;

class Soft_Emboss_Services_Widget extends Widget_Base {

    public function get_name() {
        return 'soft_emboss_services';
    }

    public function get_title() {
        return esc_html__('Soft Emboss: Services Grid', 'soft-emboss');
    }

    public function get_icon() {
        return 'eicon-apps';
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
                'default' => esc_html__('WHAT I DELIVER', 'soft-emboss'),
            )
        );

        $this->add_control(
            'section_title',
            array(
                'label'   => esc_html__('Section Title', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('Specialized Engineering & Design', 'soft-emboss'),
            )
        );

        $this->add_control(
            'section_desc',
            array(
                'label'   => esc_html__('Description', 'soft-emboss'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('High-performance digital products engineered with tactile neumorphism and modern web precision.', 'soft-emboss'),
            )
        );

        $this->end_controls_section();

        // Repeater for services
        $this->start_controls_section(
            'section_items',
            array(
                'label' => esc_html__('Service Cards', 'soft-emboss'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            )
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'title',
            array(
                'label'   => esc_html__('Service Title', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('UI/UX & Product Design', 'soft-emboss'),
            )
        );

        $repeater->add_control(
            'description',
            array(
                'label'   => esc_html__('Description', 'soft-emboss'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('Designing tactile, intuitive interfaces with custom design systems and micro-interactions.', 'soft-emboss'),
            )
        );

        $repeater->add_control(
            'tags',
            array(
                'label'   => esc_html__('Tags (comma separated)', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'Figma, Design Systems, Prototypes',
            )
        );

        $this->add_control(
            'services_list',
            array(
                'label'       => esc_html__('Services List', 'soft-emboss'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => array(
                    array(
                        'title'       => 'UI/UX & Product Systems',
                        'description' => 'Architecting intuitive, tactile user journeys with custom neumorphic component libraries and seamless responsiveness.',
                        'tags'        => 'Design Systems, Figma, Wireframing',
                    ),
                    array(
                        'title'       => 'Full-Stack Modern Web Apps',
                        'description' => 'Building lightning-fast, production-ready web apps with React, Next.js, TanStack, and Tailwind CSS.',
                        'tags'        => 'React 19, TypeScript, Tailwind, REST/GraphQL',
                    ),
                    array(
                        'title'       => 'Creative 3D & Micro-Interactions',
                        'description' => 'Implementing fluid WebGL/Three.js 3D particles, custom cursor physics, and cinematic preloader animations.',
                        'tags'        => 'WebGL, Three.js, Canvas, Shaders',
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
        <section class="se-services-section" style="padding:80px 24px;max-width:1280px;margin:0 auto;">
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

            <div class="se-services-grid">
                <?php if (!empty($settings['services_list'])) : ?>
                    <?php foreach ($settings['services_list'] as $service) : ?>
                        <div class="se-card se-service-card">
                            <div class="se-service-icon-box">
                                &#10022;
                            </div>
                            <h3 style="font-size:1.3rem;margin:0 0 12px 0;"><?php echo esc_html($service['title']); ?></h3>
                            <p style="color:#94A3B8;font-size:14px;line-height:1.7;margin-bottom:20px;">
                                <?php echo esc_html($service['description']); ?>
                            </p>
                            <?php if (!empty($service['tags'])) : ?>
                                <div style="display:flex;flex-wrap:wrap;gap:8px;">
                                    <?php
                                    $tags = explode(',', $service['tags']);
                                    foreach ($tags as $tag) :
                                        ?>
                                        <span style="font-size:11px;padding:3px 10px;border-radius:6px;background:rgba(255,255,255,0.05);color:#CBD5E1;border:1px solid rgba(255,255,255,0.06);">
                                            <?php echo esc_html(trim($tag)); ?>
                                        </span>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </section>
        <?php
    }
}
