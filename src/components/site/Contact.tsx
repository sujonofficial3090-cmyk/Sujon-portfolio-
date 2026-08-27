import { type FormEvent, useState } from "react";
import { toast } from "sonner";

import logoMark from "@/assets/logo-mark.png";
import office from "@/assets/office.jpg";
import { NeumorphicButton, NeumorphicCard } from "@/components/nm";

const fieldClass =
  "nm-inset w-full rounded-[10px] px-4 py-3 text-[11.5px] text-foreground placeholder:text-muted-foreground/70 outline-none focus:shadow-[var(--shadow-nm-inset-deep)] transition-shadow";

export function Contact() {
  const [sending, setSending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      toast.success("Request sent", {
        description: "Our team will get back to you within one business day.",
      });
      (e.target as HTMLFormElement).reset();
    }, 700);
  }

  return (
    <section id="contact" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="mb-5 p-5 text-center sm:p-7">
        <h2 className="text-brand-gradient text-[clamp(1.4rem,4vw,2rem)] font-extrabold tracking-tight">
          Let's Build Your WordPress Website
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-[12px] leading-[1.65] text-muted-foreground">
          Have a WordPress project in mind? Contact me today and let's build a modern, responsive and high-performing website for your business.
        </p>
      </NeumorphicCard>

      <div className="grid gap-5 lg:grid-cols-2">
        <NeumorphicCard depth="md" radius="lg" className="relative overflow-hidden p-3">
          <img
            src={office}
            alt="Sujon's WordPress development workspace"
            loading="lazy"
            width={1200}
            height={800}
            className="h-full min-h-[300px] w-full rounded-[12px] object-cover"
          />
          <div className="absolute inset-3 flex flex-col justify-between rounded-[12px] bg-background/50 p-5 backdrop-blur-xs sm:p-6">
            <div className="flex items-center gap-2">
              <img
                src={logoMark}
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={64}
                height={64}
                className="h-10 w-10 object-contain drop-shadow"
              />
              <span className="text-[14px] font-extrabold tracking-wider uppercase text-foreground">
                SUJON
              </span>
            </div>

            <div className="nm-raised-sm rounded-[10px] p-4 text-left">
              <h3 className="text-[11px] font-bold text-foreground mb-1.5 uppercase tracking-wide">
                Direct Contact
              </h3>
              <p className="text-[10.5px] text-muted-foreground leading-normal">
                Reach out directly via phone, WhatsApp or email:
              </p>
              <div className="mt-3 space-y-1.5 text-[11px] font-semibold text-brand-deep">
                <p className="flex items-center gap-1.5">
                  Phone / WA: <a href="https://wa.me/8801936711699" className="hover:underline">01936711699</a>
                </p>
                <p className="flex items-center gap-1.5">
                  Email: <a href="mailto:sujonmia3090@gmail.com" className="hover:underline">sujonmia3090@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard depth="md" radius="lg" className="px-5 py-7 sm:px-7">
          <h2 className="sr-only">Request a quote</h2>
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label htmlFor="c-firstname" className="sr-only">
                First Name
              </label>
              <input id="c-firstname" name="firstName" required placeholder="First Name" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="c-lastname" className="sr-only">
                Last Name
              </label>
              <input id="c-lastname" name="lastName" required placeholder="Last Name" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="c-email" className="sr-only">
                Email
              </label>
              <input
                id="c-email"
                name="email"
                type="email"
                required
                placeholder="Email Address"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="c-phone" className="sr-only">
                Phone
              </label>
              <input
                id="c-phone"
                name="phone"
                type="tel"
                required
                placeholder="Phone Number"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="c-projecttype" className="sr-only">
                Project Type
              </label>
              <select id="c-projecttype" name="projectType" defaultValue="" className={fieldClass} required>
                <option value="" disabled>
                  Project Type
                </option>
                <option value="WordPress Development">WordPress Development</option>
                <option value="Elementor Development">Elementor Development</option>
                <option value="WooCommerce Development">WooCommerce Development</option>
                <option value="Custom WordPress Website">Custom WordPress Website</option>
                <option value="WordPress Speed Optimization">WordPress Speed Optimization</option>
                <option value="WordPress Maintenance">WordPress Maintenance</option>
                <option value="Landing Page Development">Landing Page Development</option>
              </select>
            </div>
            <div>
              <label htmlFor="c-budget" className="sr-only">
                Project Budget
              </label>
              <input id="c-budget" name="budget" placeholder="Project Budget" className={fieldClass} required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="c-message" className="sr-only">
                Message
              </label>
              <textarea
                id="c-message"
                name="message"
                rows={4}
                required
                placeholder="Tell me about your project..."
                className={fieldClass}
              />
            </div>
            <div className="sm:col-span-2">
              <NeumorphicButton type="submit" tone="brand" size="md" className="w-full font-bold">
                {sending ? "SENDING..." : "SUBMIT REQUEST"}
              </NeumorphicButton>
            </div>
          </form>
        </NeumorphicCard>
      </div>
    </section>
  );
}
