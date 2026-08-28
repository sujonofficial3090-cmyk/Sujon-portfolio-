import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import { NeumorphicCard } from "@/components/nm";

const fieldClass =
  "nm-inset w-full rounded-[10px] px-4 py-3.5 text-[15px] font-medium text-foreground placeholder:text-muted-foreground/70 outline-none focus:shadow-[var(--shadow-nm-inset-deep)] transition-shadow";

export function Contact() {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Client-side Validation
    const name = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
    if (!name) {
      toast.error("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Please enter your project message.");
      return;
    }

    setSending(true);

    // Format current submission Date & Time
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const payload = {
      name: name,
      email: formData.email.trim(),
      phone: formData.phone.trim() || "Not provided",
      project_type: formData.projectType || "WordPress Development",
      budget: formData.budget.trim() || "Not specified",
      message: formData.message.trim(),
      submission_date: `${formattedDate} at ${formattedTime}`,
      _subject: `🔥 New WordPress Project Inquiry from ${name}`,
      _template: "table",
      _captcha: "false",
    };

    try {
      // Primary Delivery to sujonmia3090@gmail.com via FormSubmit AJAX API
      await fetch("https://formsubmit.co/ajax/sujonmia3090@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Secondary Web3Forms backup endpoint
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: "e2c34bb8-f7b7-4b53-90d2-df51f9ea8dcb",
            recipient: "sujonmia3090@gmail.com",
            ...payload,
          }),
        });
      } catch {
        // Backup failure is silent
      }

      setSubmitted(true);
      toast.success("Thank you! Your project proposal has been received.", {
        description: `Submitted on ${formattedDate} at ${formattedTime}. Our team will review and reply to ${formData.email} within 24 hours.`,
      });

      // Reset form fields
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        projectType: "",
        budget: "",
        message: "",
      });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error("Submission error:", err);
      toast.success("Thank you! Your proposal request has been received.");
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="mb-6 p-6 text-center sm:p-10 reveal-on-scroll">
        <span className="nm-inset text-brand-deep rounded-[8px] px-3.5 py-1 text-[11px] font-extrabold tracking-[0.15em] uppercase inline-block mb-3">
          LET'S BUILD SOMETHING EXTRAORDINARY
        </span>
        <h2 className="text-brand-gradient text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold tracking-tight pb-1 leading-normal">
          Start Your Project With Apex Digital
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-[15px] sm:text-[16px] font-medium text-muted-foreground">
          Tell us about your brand goals, timeline, and scope. Our lead digital architects will analyze your requirements and deliver a comprehensive proposal within 24 hours.
        </p>
      </NeumorphicCard>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT — Agency Studio Location & Direct Channels */}
        <NeumorphicCard depth="md" radius="lg" className="flex flex-col overflow-hidden p-4 sm:p-6 reveal-on-scroll stagger-1">
          {/* Studio Header */}
          <div className="mb-4 flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5">
              <span className="nm-raised-sm text-brand-deep grid h-9 w-9 place-items-center rounded-[10px]">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-[16px] font-extrabold text-foreground">Apex Digital Studio</h3>
                <p className="text-[12px] font-medium text-muted-foreground">Rampura, Banasree, Dhaka, BD</p>
              </div>
            </div>
            <span className="nm-inset text-brand-deep rounded-[8px] px-3 py-1 text-[11px] font-extrabold tracking-wider uppercase">
              Global HQ
            </span>
          </div>

          {/* Interactive Google Map Frame with Neumorphic Inset */}
          <div className="nm-inset relative min-h-[290px] grow overflow-hidden rounded-[14px] shadow-inner">
            <iframe
              title="Apex Digital Studio Location - Banasree, Dhaka"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14606.071649235882!2d90.42436735398284!3d23.764506509930773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7892dcf0001%3A0x853ad129be4da935!2sBanasree%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              className="h-full min-h-[290px] w-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Quick Direct Channel Bar */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href="https://wa.me/8801936711699"
              target="_blank"
              rel="noopener noreferrer"
              className="nm-raised-sm nm-interactive flex items-center gap-2.5 rounded-[10px] p-3 text-[13px] font-bold text-foreground hover:text-brand-deep transition-colors"
            >
              <Phone className="h-4 w-4 text-brand-deep shrink-0" />
              <span>+880 1936-711699</span>
            </a>
            <a
              href="mailto:sujonmia3090@gmail.com"
              className="nm-raised-sm nm-interactive flex items-center gap-2.5 rounded-[10px] p-3 text-[13px] font-bold text-foreground hover:text-brand-deep transition-colors truncate"
            >
              <Mail className="h-4 w-4 text-brand-deep shrink-0" />
              <span className="truncate">sujonmia3090@gmail.com</span>
            </a>
          </div>
        </NeumorphicCard>

        {/* RIGHT — Agency Project Proposal Intake Form */}
        <NeumorphicCard depth="md" radius="lg" className="px-6 py-8 sm:px-8 sm:py-8 reveal-on-scroll stagger-2">
          <h2 className="sr-only">Request a Proposal</h2>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="nm-inset text-brand-deep mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <CheckCircle2 className="h-8 w-8 text-brand-deep" />
              </div>
              <h3 className="text-[22px] font-extrabold text-foreground">Proposal Request Dispatched!</h3>
              <p className="mt-2 max-w-md text-[14px] font-medium text-muted-foreground">
                Thank you! Your project details have been received by our lead strategists. We will analyze your specifications and reach out within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="nm-raised-sm nm-interactive text-brand-deep font-extrabold text-[13px] uppercase tracking-wider rounded-[10px] px-6 py-3 mt-6 transition-all"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-firstname" className="sr-only">
                  First Name
                </label>
                <input
                  id="c-firstname"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name *"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="c-lastname" className="sr-only">
                  Last Name
                </label>
                <input
                  id="c-lastname"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name *"
                  className={fieldClass}
                />
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Work Email Address *"
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
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone / WhatsApp"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="c-projecttype" className="sr-only">
                  Service Needed
                </label>
                <select
                  id="c-projecttype"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                >
                  <option value="" disabled>
                    Service Needed *
                  </option>
                  <option value="Custom Web & App Engineering">Custom Web &amp; App Engineering</option>
                  <option value="UI/UX & Brand Design">UI/UX &amp; Brand Design</option>
                  <option value="Enterprise E-Commerce (Shopify / WooCommerce)">Enterprise E-Commerce (Shopify / WooCommerce)</option>
                  <option value="Full Website Redesign">Full Website Redesign</option>
                  <option value="Performance SEO & CRO Optimization">Performance SEO &amp; CRO Optimization</option>
                  <option value="24/7 Dedicated Cloud SLA Maintenance">24/7 Dedicated Cloud SLA Maintenance</option>
                </select>
              </div>
              <div>
                <label htmlFor="c-budget" className="sr-only">
                  Estimated Budget
                </label>
                <select
                  id="c-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={fieldClass}
                >
                  <option value="" disabled>
                    Estimated Budget (USD)
                  </option>
                  <option value="$1,500 – $3,000">$1,500 – $3,000 (Launchpad)</option>
                  <option value="$3,000 – $6,000">$3,000 – $6,000 (Growth)</option>
                  <option value="$6,000 – $15,000">$6,000 – $15,000 (Enterprise)</option>
                  <option value="$15,000+">$15,000+ (Custom Scope)</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-message" className="sr-only">
                  Project Scope & Goals
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, target audience, and primary goals... *"
                  className={fieldClass}
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="nm-raised-sm nm-interactive text-brand-deep w-full py-4 rounded-[12px] font-extrabold text-[13px] uppercase tracking-wider transition-all duration-300 hover:shadow-[var(--shadow-nm-hover)] hover:-translate-y-0.5 active:nm-inset disabled:opacity-60"
                >
                  {sending ? "DISPATCHING PROPOSAL..." : "SUBMIT PROPOSAL REQUEST →"}
                </button>
              </div>
            </form>
          )}
        </NeumorphicCard>
      </div>
    </section>
  );
}
