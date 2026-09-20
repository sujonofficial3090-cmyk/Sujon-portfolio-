<?php
/**
 * Elementor Widget: Contact & Connect
 *
 * @package Soft_Emboss
 */

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Soft_Emboss_Contact_Widget extends Widget_Base {

    public function get_name() {
        return 'soft_emboss_contact';
    }

    public function get_title() {
        return esc_html__('Soft Emboss: Contact Section', 'soft-emboss');
    }

    public function get_icon() {
        return 'eicon-envelope';
    }

    public function get_categories() {
        return array('soft-emboss-elements');
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            array(
                'label' => esc_html__('Contact Information', 'soft-emboss'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            )
        );

        $this->add_control(
            'section_badge',
            array(
                'label'   => esc_html__('Badge', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('START A CONVERSATION', 'soft-emboss'),
            )
        );

        $this->add_control(
            'section_title',
            array(
                'label'   => esc_html__('Title', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__("Let's Build Something Extraordinary", 'soft-emboss'),
            )
        );

        $this->add_control(
            'email',
            array(
                'label'   => esc_html__('Email Address', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'contact@sujon.dev',
            )
        );

        $this->add_control(
            'location',
            array(
                'label'   => esc_html__('Location', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'Dhaka, Bangladesh (Available Worldwide)',
            )
        );

        $this->add_control(
            'form_shortcode',
            array(
                'label'       => esc_html__('Contact Form Shortcode', 'soft-emboss'),
                'type'        => Controls_Manager::TEXT,
                'default'     => '',
                'description' => esc_html__('Paste any Contact Form 7 or WPForms shortcode here.', 'soft-emboss'),
            )
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <section id="contact" class="se-contact-section" style="padding:80px 24px 100px 24px;max-width:1280px;margin:0 auto;">
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

            <div style="display:flex;flex-wrap:wrap;gap:32px;justify-content:center;max-width:960px;margin:0 auto;">
                <!-- Contact Info Card -->
                <div class="se-card" style="flex:1 1 340px;padding:36px;">
                    <h3 style="font-size:1.4rem;margin:0 0 20px 0;">Direct Channels</h3>
                    
                    <div style="margin-bottom:24px;">
                        <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#64748B;display:block;margin-bottom:4px;">EMAIL</span>
                        <a href="mailto:<?php echo esc_attr($settings['email']); ?>" style="color:var(--brand);font-weight:600;font-size:16px;">
                            <?php echo esc_html($settings['email']); ?>
                        </a>
                    </div>

                    <div style="margin-bottom:24px;">
                        <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#64748B;display:block;margin-bottom:4px;">LOCATION</span>
                        <span style="color:#CBD5E1;font-size:15px;">
                            <?php echo esc_html($settings['location']); ?>
                        </span>
                    </div>

                    <div>
                        <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#64748B;display:block;margin-bottom:8px;">AVAILABILITY</span>
                        <div class="se-badge">
                            <span style="width:6px;height:6px;border-radius:50%;background:#00FD90;box-shadow:0 0 6px #00FD90;"></span>
                            OPEN FOR CONTRACTS
                        </div>
                    </div>
                </div>

                <!-- Form / Interactive Action Box -->
                <div class="se-card" style="flex:1 1 420px;padding:36px;">
                    <h3 style="font-size:1.4rem;margin:0 0 16px 0;">Send a Direct Message</h3>
                    
                    <?php if (!empty($settings['form_shortcode'])) : ?>
                        <?php echo do_shortcode($settings['form_shortcode']); ?>
                    <?php else : ?>
                        <p style="color:#94A3B8;font-size:14px;line-height:1.7;margin-bottom:24px;">
                            Have an idea, inquiry, or partnership opportunity? Reach out directly via email or schedule an initial design consultation.
                        </p>
                        <a href="mailto:<?php echo esc_attr($settings['email']); ?>?subject=Project%20Inquiry" class="se-btn se-btn-primary" style="width:100%;">
                            Compose Email &rarr;
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        </section>
        <?php
    }
}
