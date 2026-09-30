import svc1 from "@/assets/svc-1.png";
import svc2 from "@/assets/svc-2.png";
import svc3 from "@/assets/svc-3.png";
import svc4 from "@/assets/svc-4.png";
import svc5 from "@/assets/svc-5.png";
import svc6 from "@/assets/svc-6.png";
import svc8 from "@/assets/svc-8.png";
import { NeumorphicCard } from "@/components/nm";
import { useTranslation } from "@/lib/i18n";

export function Services() {
  const { t } = useTranslation();

  const services = [
    { title: t("svc_1_title"), desc: t("svc_1_desc"), img: svc4 },
    { title: t("svc_2_title"), desc: t("svc_2_desc"), img: svc1 },
    { title: t("svc_3_title"), desc: t("svc_3_desc"), img: svc8 },
    { title: t("svc_4_title"), desc: t("svc_4_desc"), img: svc2 },
    { title: t("svc_5_title"), desc: t("svc_5_desc"), img: svc3 },
    { title: t("svc_6_title"), desc: t("svc_6_desc"), img: svc6 },
  ];

  return (
    <section id="services" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-8">
        {/* Section Header */}
        <div className="mb-8 text-center reveal-on-scroll">
          <h2 className="text-brand-gradient text-[clamp(1.6rem,4.2vw,2.5rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            {t("services_heading")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[14.5px] sm:text-[16px] font-medium text-muted-foreground">
            {t("services_subtitle")}
          </p>
        </div>

        {/* 3 Columns x 2 Rows Grid with Clean Neumorphic Cards and Large Eye-catching Images */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <NeumorphicCard
              key={s.title}
              depth="sm"
              radius="lg"
              interactive
              className={`flex flex-col items-center justify-between text-center px-6 py-8 sm:px-7 sm:py-9 group transition-transform duration-300 hover:-translate-y-1 reveal-on-scroll stagger-${(idx % 3) + 1}`}
            >
              {/* Prominent Large 3D Service Image Container */}
              <div className="flex h-[175px] sm:h-[195px] md:h-[210px] items-center justify-center w-full mb-4">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  decoding="async"
                  width={300}
                  height={300}
                  className="max-h-full max-w-full w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_14px_28px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Title & Description */}
              <div className="flex flex-col items-center w-full mt-auto">
                <h3 className="text-[18px] sm:text-[19px] font-extrabold text-foreground leading-[1.3] mb-2 tracking-tight group-hover:text-brand-deep transition-colors">
                  {s.title}
                </h3>
                <p className="text-[13.5px] sm:text-[14px] leading-[1.65] text-muted-foreground font-medium">
                  {s.desc}
                </p>
              </div>
            </NeumorphicCard>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}
