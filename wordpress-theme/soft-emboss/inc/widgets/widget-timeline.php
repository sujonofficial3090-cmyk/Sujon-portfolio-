<?php
/**
 * Elementor Widget: Experience & Timeline
 *
 * @package Soft_Emboss
 */

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Repeater;

class Soft_Emboss_Timeline_Widget extends Widget_Base {

    public function get_name() {
        return 'soft_emboss_timeline';
    }

    public function get_title() {
        return esc_html__('Soft Emboss: Experience Timeline', 'soft-emboss');
    }

    public function get_icon() {
        return 'eicon-time-line';
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
                'default' => esc_html__('CAREER & MILESTONES', 'soft-emboss'),
            )
        );

        $this->add_control(
            'section_title',
            array(
                'label'   => esc_html__('Title', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('Professional Experience & Education', 'soft-emboss'),
            )
        );

        $this->end_controls_section();

        // Timeline Repeater
        $this->start_controls_section(
            'section_timeline',
            array(
                'label' => esc_html__('Milestones', 'soft-emboss'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            )
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'period',
            array(
                'label'   => esc_html__('Period / Year', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => '2023 — Present',
            )
        );

        $repeater->add_control(
            'role',
            array(
                'label'   => esc_html__('Role / Title', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'Lead UI/UX Engineer',
            )
        );

        $repeater->add_control(
            'company',
            array(
                'label'   => esc_html__('Company / Organization', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'Soft Emboss Digital Studio',
            )
        );

        $repeater->add_control(
            'description',
            array(
                'label'   => esc_html__('Description', 'soft-emboss'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => 'Directing UI engineering, tactile neumorphic design systems, and WebGL client experiences.',
            )
        );

        $this->add_control(
            'timeline_list',
            array(
                'label'       => esc_html__('Milestones', 'soft-emboss'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => array(
                    array(
                        'period'      => '2024 — Present',
                        'role'        => 'Lead Creative Technologist',
                        'company'     => 'Soft Emboss Studio',
                        'description' => 'Architecting bespoke interactive web systems, 3D WebGL particle canvases, and luxury tactile interfaces.',
                    ),
                    array(
                        'period'      => '2022 — 2024',
                        'role'        => 'Senior Frontend Developer',
                        'company'     => 'Apex Digital Innovations',
                        'description' => 'Developed enterprise dashboards, multi-tenant React applications, and design systems for high-growth tech startups.',
                    ),
                    array(
                        'period'      => '2020 — 2022',
                        'role'        => 'UI/UX Designer & Web Engineer',
                        'company'     => 'Creative Agency Global',
                        'description' => 'Produced high-converting agency landing pages, client branding, and interactive micro-animations.',
                    ),
                ),
                'title_field' => '{{{ role }}} ({{{ period }}})',
            )
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <section class="se-timeline-section" style="padding:80px 24px;max-width:1280px;margin:0 auto;">
            <div class="se-section-header">
                <?php if (!empty($settings['section_badge'])) : ?>
                    <div class="se-badge" style="margin-bottom:14px;">
                        <?php echo esc_html($settings['section_badge']); ?>
                    </div>
                <?php endif; ?>

                <?php if (!empty($settings['section_title'])) : ?>
                    <h2 class="se-section-title"><?php echo esc_html($settings['section_title']); ?></h2>
                <?php endif; ?>
            </div>

            <div class="se-timeline">
                <?php if (!empty($settings['timeline_list'])) : ?>
                    <?php foreach ($settings['timeline_list'] as $item) : ?>
                        <div class="se-timeline-item">
                            <div class="se-timeline-bead"></div>
                            <div class="se-card" style="padding:26px 30px;">
                                <span style="font-size:12px;font-weight:700;letter-spacing:0.12em;color:var(--brand);display:block;margin-bottom:6px;">
                                    <?php echo esc_html($item['period']); ?>
                                </span>
                                <h3 style="font-size:1.3rem;margin:0 0 4px 0;"><?php echo esc_html($item['role']); ?></h3>
                                <div style="color:#94A3B8;font-size:14px;font-weight:500;margin-bottom:12px;">
                                    <?php echo esc_html($item['company']); ?>
                                </div>
                                <p style="color:#CBD5E1;font-size:14px;line-height:1.7;margin:0;">
                                    <?php echo esc_html($item['description']); ?>
                                </p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </section>
        <?php
    }
}
