<?php
/**
 * Elementor Widget: Hero Section with 3D Particle Canvas
 *
 * @package Soft_Emboss
 */

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Soft_Emboss_Hero_Widget extends Widget_Base {

    public function get_name() {
        return 'soft_emboss_hero';
    }

    public function get_title() {
        return esc_html__('Soft Emboss: Hero Section', 'soft-emboss');
    }

    public function get_icon() {
        return 'eicon-banner';
    }

    public function get_categories() {
        return array('soft-emboss-elements');
    }

    protected function register_controls() {
        // Content Tab
        $this->start_controls_section(
            'section_content',
            array(
                'label' => esc_html__('Hero Content', 'soft-emboss'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            )
        );

        $this->add_control(
            'badge_text',
            array(
                'label'   => esc_html__('Badge Text', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('AVAILABLE FOR FREELANCE & PROJECTS', 'soft-emboss'),
            )
        );

        $this->add_control(
            'name_text',
            array(
                'label'   => esc_html__('Main Name / Heading', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('SUJON', 'soft-emboss'),
            )
        );

        $this->add_control(
            'role_text',
            array(
                'label'   => esc_html__('Role Subtitle', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('Creative Technologist & UI/UX Specialist', 'soft-emboss'),
            )
        );

        $this->add_control(
            'bio_text',
            array(
                'label'   => esc_html__('Bio Description', 'soft-emboss'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('Crafting tactile digital experiences, 3D interactive interfaces, and soft-embossed modern web applications that elevate brand authority.', 'soft-emboss'),
            )
        );

        $this->add_control(
            'btn1_text',
            array(
                'label'   => esc_html__('Primary Button Text', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('Explore Projects', 'soft-emboss'),
            )
        );

        $this->add_control(
            'btn1_url',
            array(
                'label'   => esc_html__('Primary Button URL', 'soft-emboss'),
                'type'    => Controls_Manager::URL,
                'default' => array(
                    'url' => '#projects',
                ),
            )
        );

        $this->add_control(
            'btn2_text',
            array(
                'label'   => esc_html__('Secondary Button Text', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('Get in Touch', 'soft-emboss'),
            )
        );

        $this->add_control(
            'btn2_url',
            array(
                'label'   => esc_html__('Secondary Button URL', 'soft-emboss'),
                'type'    => Controls_Manager::URL,
                'default' => array(
                    'url' => '#contact',
                ),
            )
        );

        $this->add_control(
            'particle_letter',
            array(
                'label'   => esc_html__('3D Particle Letter', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'S',
                'description' => esc_html__('Target letter rendered in the interactive 3D particle canvas (default: S).', 'soft-emboss'),
            )
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $unique_id = 'se-canvas-' . $this->get_id();
        $letter = !empty($settings['particle_letter']) ? esc_attr($settings['particle_letter']) : 'S';
        ?>
        <section class="se-hero-section" style="position:relative;padding:90px 24px 70px 24px;max-width:1280px;margin:0 auto;overflow:hidden;">
            <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:40px;">
                
                <!-- Left Text Column -->
                <div style="flex:1 1 520px;max-width:640px;z-index:2;">
                    <?php if (!empty($settings['badge_text'])) : ?>
                        <div class="se-badge" style="margin-bottom:24px;">
                            <span style="width:6px;height:6px;border-radius:50%;background:var(--brand);box-shadow:0 0 6px var(--brand);"></span>
                            <?php echo esc_html($settings['badge_text']); ?>
                        </div>
                    <?php endif; ?>

                    <h1 style="font-size:clamp(2.8rem, 6vw, 4.8rem);line-height:1.05;margin:0 0 16px 0;letter-spacing:-0.03em;">
                        <?php echo esc_html($settings['name_text']); ?>
                    </h1>

                    <div style="font-family:'Funnel Display',sans-serif;font-size:clamp(1.2rem, 2.5vw, 1.7rem);color:var(--brand);margin-bottom:20px;font-weight:600;">
                        <?php echo esc_html($settings['role_text']); ?>
                    </div>

                    <p style="font-size:16px;color:#94A3B8;line-height:1.75;margin-bottom:34px;max-width:540px;">
                        <?php echo esc_html($settings['bio_text']); ?>
                    </p>

                    <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;">
                        <?php if (!empty($settings['btn1_text'])) : ?>
                            <a href="<?php echo esc_url($settings['btn1_url']['url']); ?>" class="se-btn se-btn-primary">
                                <?php echo esc_html($settings['btn1_text']); ?>
                                <span>&rarr;</span>
                            </a>
                        <?php endif; ?>

                        <?php if (!empty($settings['btn2_text'])) : ?>
                            <a href="<?php echo esc_url($settings['btn2_url']['url']); ?>" class="se-btn se-btn-outline">
                                <?php echo esc_html($settings['btn2_text']); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>

                <!-- Right 3D Interactive Canvas Column -->
                <div style="flex:1 1 420px;height:480px;min-width:320px;position:relative;display:flex;align-items:center;justify-content:center;">
                    <!-- Soft Emboss Backdrop Glow -->
                    <div style="position:absolute;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle, rgba(var(--brand-rgb),0.18) 0%, transparent 70%);filter:blur(40px);pointer-events:none;"></div>
                    
                    <!-- 3D Interactive Particle Letter Canvas -->
                    <canvas id="<?php echo esc_attr($unique_id); ?>" class="se-particle-canvas" data-letter="<?php echo $letter; ?>" style="width:100%;height:100%;max-width:500px;max-height:500px;display:block;cursor:crosshair;"></canvas>
                </div>
            </div>
        </section>

        <script>
        if (typeof window.initParticleLetterCanvas === 'function') {
            window.initParticleLetterCanvas('<?php echo esc_js($unique_id); ?>', '<?php echo esc_js($letter); ?>');
        }
        </script>
        <?php
    }
}
