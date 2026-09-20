<?php
/**
 * The header for Soft Emboss Studio theme
 *
 * @package Soft_Emboss
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Custom Fluid Cursor Elements -->
<div id="se-cursor-dot" aria-hidden="true"></div>
<div id="se-cursor-ring" aria-hidden="true"></div>

<!-- Definitive Luxury Monogram S Preloader -->
<div id="se-site-preloader" class="se-preloader-wrap" style="position:fixed;inset:0;z-index:999999;pointer-events:auto;user-select:none;">
    <!-- Top Curtain -->
    <div id="se-curtain-top" style="position:absolute;left:0;right:0;top:0;height:50%;background:#090b10;border-bottom:1px solid rgba(255,255,255,0.05);transition:transform 850ms cubic-bezier(0.77,0,0.175,1);will-change:transform;"></div>
    <!-- Bottom Curtain -->
    <div id="se-curtain-bottom" style="position:absolute;left:0;right:0;bottom:0;height:50%;background:#090b10;border-top:1px solid rgba(255,255,255,0.05);transition:transform 850ms cubic-bezier(0.77,0,0.175,1);will-change:transform;"></div>

    <!-- Center Content -->
    <div id="se-preloader-center" style="position:relative;z-index:10;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:all 700ms cubic-bezier(0.77,0,0.175,1);">
        
        <!-- Soft Emboss Medallion with Monogram S -->
        <div style="position:relative;margin-bottom:28px;display:flex;align-items:center;justify-content:center;">
            <div style="width:120px;height:120px;border-radius:26px;padding:6px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#161b24 0%,#0d1017 100%);box-shadow:12px 12px 28px rgba(0,0,0,0.7),-8px -8px 24px rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.08);">
                <div style="width:100%;height:100%;border-radius:20px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 35% 30%,#151a23 0%,#0a0d13 100%);box-shadow:inset 6px 6px 14px rgba(0,0,0,0.8),inset -5px -5px 12px rgba(255,255,255,0.04);">
                    <svg style="width:58px;height:58px;" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M68 28C68 28 62 21 49 21C35 21 27 29 27 38C27 54 73 44 73 66C73 78 61 83 48 83C33 83 26 73 26 73" stroke="var(--brand, #00FD90)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M68 28C68 28 62 21 49 21C35 21 27 29 27 38C27 54 73 44 73 66C73 78 61 83 48 83C33 83 26 73 26 73" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-opacity="0.6" />
                    </svg>
                </div>
            </div>
        </div>

        <!-- Typography -->
        <h2 style="font-family:'Funnel Display',sans-serif;font-size:24px;font-weight:800;letter-spacing:0.35em;text-transform:uppercase;color:#FFFFFF;margin:0 0 8px 0;padding-left:0.35em;">SUJON</h2>
        <div style="font-family:'Poppins',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;color:#94A3B8;margin-bottom:24px;">CREATIVE TECHNOLOGIST</div>

        <!-- Progress Bar -->
        <div style="width:230px;height:4px;background:#141822;border-radius:9999px;border:1px solid rgba(255,255,255,0.06);overflow:hidden;position:relative;">
            <div id="se-preloader-fill" style="width:0%;height:100%;background:linear-gradient(90deg,rgba(var(--brand-rgb),0.3),var(--brand));box-shadow:0 0 12px var(--brand);transition:width 150ms ease-out;"></div>
        </div>

        <div style="width:230px;display:flex;align-items:center;justify-content:space-between;margin-top:10px;font-family:monospace;font-size:10px;">
            <span id="se-preloader-phase" style="color:#64748B;letter-spacing:0.12em;">INITIALIZING</span>
            <span id="se-preloader-percent" style="color:var(--brand);font-weight:bold;">00%</span>
        </div>
    </div>
</div>

<header id="site-header" class="site-header">
    <nav class="se-nav-container" style="display:flex;align-items:center;justify-content:space-between;padding:18px 32px;max-width:1280px;margin:0 auto;">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="se-logo" style="font-family:'Funnel Display',sans-serif;font-size:20px;font-weight:800;letter-spacing:0.18em;color:#FFFFFF;display:flex;align-items:center;gap:8px;">
            <span style="color:var(--brand);">S</span>UJON
        </a>
        <div class="se-header-actions">
            <a href="#contact" class="se-btn se-btn-primary" style="padding:9px 20px;font-size:13px;">Let's Talk</a>
        </div>
    </nav>
</header>
