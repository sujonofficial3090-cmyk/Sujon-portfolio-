<?php
/**
 * Elementor Widget: Skills & Tech Stack
 *
 * @package Soft_Emboss
 */

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Repeater;

class Soft_Emboss_Skills_Widget extends Widget_Base {

    public function get_name() {
        return 'soft_emboss_skills';
    }

    public function get_title() {
        return esc_html__('Soft Emboss: Skills & Stack', 'soft-emboss');
    }

    public function get_icon() {
        return 'eicon-code';
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
                'default' => esc_html__('TECHNICAL ARSENAL', 'soft-emboss'),
            )
        );

        $this->add_control(
            'section_title',
            array(
                'label'   => esc_html__('Title', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('Core Technologies & Frameworks', 'soft-emboss'),
            )
        );

        $this->end_controls_section();

        // Skills Repeater
        $this->start_controls_section(
            'section_skills',
            array(
                'label' => esc_html__('Skill Groups', 'soft-emboss'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            )
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'group_name',
            array(
                'label'   => esc_html__('Group Name', 'soft-emboss'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('Frontend & 3D Web', 'soft-emboss'),
            )
        );

        $repeater->add_control(
            'items',
            array(
                'label'   => esc_html__('Skills (comma separated)', 'soft-emboss'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => 'React 19, TypeScript, Next.js, Tailwind CSS, Three.js, Canvas 2D, Vite',
            )
        );

        $this->add_control(
            'skills_list',
            array(
                'label'       => esc_html__('Skill Groups', 'soft-emboss'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => array(
                    array(
                        'group_name' => 'Frontend & Interaction',
                        'items'      => 'React 19, Next.js, TypeScript, Tailwind CSS, TanStack Router, Canvas WebGL',
                    ),
                    array(
                        'group_name' => 'UI/UX & Product Design',
                        'items'      => 'Figma, Neumorphism, Design Systems, Wireframing, Micro-Animations, Prototyping',
                    ),
                    array(
                        'group_name' => 'Backend & Cloud Services',
                        'items'      => 'Node.js, PostgreSQL, Supabase, Cloudflare Workers, REST APIs, GraphQL',
                    ),
                ),
                'title_field' => '{{{ group_name }}}',
            )
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <section class="se-skills-section" style="padding:70px 24px;max-width:1280px;margin:0 auto;">
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
                <?php if (!empty($settings['skills_list'])) : ?>
                    <?php foreach ($settings['skills_list'] as $group) : ?>
                        <div class="se-card" style="padding:32px;">
                            <h3 style="font-size:1.25rem;margin:0 0 20px 0;color:#FFFFFF;"><?php echo esc_html($group['group_name']); ?></h3>
                            <div style="display:flex;flex-wrap:wrap;gap:10px;">
                                <?php
                                $skills = explode(',', $group['items']);
                                foreach ($skills as $skill) :
                                    ?>
                                    <span class="se-card-inset" style="padding:7px 14px;font-size:12px;font-weight:500;color:#CBD5E1;">
                                        <?php echo esc_html(trim($skill)); ?>
                                    </span>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </section>
        <?php
    }
}
