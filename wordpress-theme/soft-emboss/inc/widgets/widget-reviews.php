<?php
/**
 * Elementor Widget: Testimonials & Reviews
 *
 * @package Soft_Emboss
 */

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Repeater;

class Soft_Emboss_Reviews_Widget extends Widget_Base {

    public function get_name() {
        return 'soft_emboss_reviews';
    }

    public function get_title() {
        return esc_html__('Soft Emboss: Client Reviews', 'soft-emboss');
    }

    public function get_icon() {
        return 'eicon-testimonial';
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
                'default' => esc_html__('TESTIMONIALS', 'soft-emboss'),
            )
        );

        $this->add_control(
            'section_title',
            array(
                'label'   => esc_html__('Title', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('What Founders & Teams Say', 'soft-emboss'),
            )
        );

        $this->end_controls_section();

        // Reviews Repeater
        $this->start_controls_section(
            'section_reviews',
            array(
                'label' => esc_html__('Client Reviews', 'soft-emboss'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            )
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'client_name',
            array(
                'label'   => esc_html__('Client Name', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'Sarah Jenkins',
            )
        );

        $repeater->add_control(
            'client_role',
            array(
                'label'   => esc_html__('Role & Company', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'CEO at Nexa Dynamics',
            )
        );

        $repeater->add_control(
            'quote',
            array(
                'label'   => esc_html__('Feedback Quote', 'soft-emboss'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => 'Sujon delivered our web app with unmatched attention to detail. The tactile soft-emboss aesthetics and fluid micro-interactions gave our brand an instant enterprise polish.',
            )
        );

        $this->add_control(
            'reviews_list',
            array(
                'label'       => esc_html__('Reviews', 'soft-emboss'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => array(
                    array(
                        'client_name' => 'Alexander Wright',
                        'client_role' => 'Founder, Salvaje Capital',
                        'quote'       => 'The 3D interactive particle effects and neumorphic cards completely blew away our stakeholders. A truly elite level of engineering and aesthetic mastery.',
                    ),
                    array(
                        'client_name' => 'Elena Rostova',
                        'client_role' => 'VP of Design, TechSprint',
                        'quote'       => 'Working with Sujon was effortless. Fast turnaround, pristine code quality, and a design sensibility that puts standard templates to shame.',
                    ),
                ),
                'title_field' => '{{{ client_name }}}',
            )
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <section class="se-reviews-section" style="padding:80px 24px;max-width:1280px;margin:0 auto;">
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

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:28px;">
                <?php if (!empty($settings['reviews_list'])) : ?>
                    <?php foreach ($settings['reviews_list'] as $review) : ?>
                        <div class="se-card" style="padding:32px;display:flex;flex-direction:column;justify-content:space-between;">
                            <div>
                                <div style="color:var(--brand);font-size:18px;margin-bottom:16px;">
                                    &#9733;&#9733;&#9733;&#9733;&#9733;
                                </div>
                                <p style="color:#E2E8F0;font-size:15px;line-height:1.75;font-style:italic;margin-bottom:24px;">
                                    "<?php echo esc_html($review['quote']); ?>"
                                </p>
                            </div>
                            <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:18px;">
                                <h4 style="font-size:1.1rem;margin:0 0 2px 0;"><?php echo esc_html($review['client_name']); ?></h4>
                                <span style="font-size:12px;color:var(--brand);font-weight:500;">
                                    <?php echo esc_html($review['client_role']); ?>
                                </span>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </section>
        <?php
    }
}
