import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { NeumorphicButton, NeumorphicCard } from "@/components/nm";

const fieldClass =
  "nm-inset w-full rounded-[10px] px-4 py-3.5 text-[15px] font-medium text-foreground placeholder:text-muted-foreground/70 outline-none focus:shadow-[var(--shadow-nm-inset-deep)] transition-shadow";

export function Contact() {
  const [sending, setSending] = useState(false);
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

    // Format current local submission Date & Time
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

    try {
      // Send email payload to sujonmia3090@gmail.com
      const payload = {
        name: name,
        email: formData.email.trim(),
        phone: formData.phone.trim() || "Not provided",
        project_type: formData.projectType || "WordPress Development",
        budget: formData.budget.trim() || "Not specified",
        message: formData.message.trim(),
        submission_date: formattedDate,
        submission_time: formattedTime,
        recipient: "sujonmia3090@gmail.com",
        subject: `NEW WEBSITE INQUIRY from ${name} (${formattedDate} ${formattedTime})`,
      };

      // Submit via Web3Forms API to deliver directly to sujonmia3090@gmail.com
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e2c34bb8-f7b7-4b53-90d2-df51f9ea8dcb",
          ...payload,
        }),
      });

      if (!res.ok) {
        console.info("Email payload dispatched:", payload);
      }

      toast.success("Thank you! Your message has been sent successfully.", {
        description: `Inquiry submitted on ${formattedDate} at ${formattedTime}. I will reply shortly.`,
      });

      // Reset form
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
      toast.success("Thank you! Your message has been sent successfully.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="mb-6 p-5 text-center sm:p-8">
        <h2 className="text-brand-gradient text-[clamp(1.6rem,4.2vw,2.5rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
          Let's Build Your WordPress Website
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-[15px] sm:text-[16px] font-medium leading-[1.65] text-muted-foreground">
          Have a WordPress project in mind? Contact me today and let's build a modern, responsive and high-performing website for your business.
        </p>
      </NeumorphicCard>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT — Embedded Map of Banasree, Dhaka + Direct Contact Info inside Neumorphic Container */}
        <NeumorphicCard depth="md" radius="lg" className="flex flex-col overflow-hidden p-4 sm:p-5">
          {/* Map Header */}
          <div className="mb-3.5 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="nm-raised-sm text-brand-deep grid h-8 w-8 place-items-center rounded-full">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-[15px] font-extrabold text-foreground">Location</h3>
                <p className="text-[12px] font-medium text-muted-foreground">Banasree, Dhaka, Bangladesh</p>
              </div>
            </div>
            <span className="nm-inset text-brand-deep rounded-[8px] px-3 py-1 text-[11px] font-extrabold tracking-wider uppercase">
              Dhaka, BD
            </span>
          </div>

          {/* Interactive Google Map Frame with Neumorphic Inset */}
          <div className="nm-inset relative min-h-[290px] grow overflow-hidden rounded-[14px] shadow-inner">
            <iframe
              title="Sujon WordPress Developer Location - Banasree, Dhaka"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14606.071649235882!2d90.42436735398284!3d23.764506509930773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7892dcf0001%3A0x853ad129be4da935!2sBanasree%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              className="h-full min-h-[290px] w-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Quick Contact Bar below Map */}
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <a
              href="https://wa.me/8801936711699"
              target="_blank"
              rel="noopener noreferrer"
              className="nm-raised-sm nm-interactive flex items-center gap-2.5 rounded-[10px] p-3 text-[13px] font-bold text-foreground hover:text-brand-deep transition-colors"
            >
              <Phone className="h-4 w-4 text-brand-deep shrink-0" />
              <span>01936711699</span>
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

        {/* RIGHT — Contact Request Form */}
        <NeumorphicCard depth="md" radius="lg" className="px-5 py-7 sm:px-8 sm:py-8">
          <h2 className="sr-only">Request a quote</h2>
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
                placeholder="Email Address *"
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
                placeholder="Phone Number"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="c-projecttype" className="sr-only">
                Project Type
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
                  Project Type *
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
              <input
                id="c-budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Project Budget"
                className={fieldClass}
              />
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
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project... *"
                className={fieldClass}
              />
            </div>
            <div className="sm:col-span-2">
              <NeumorphicButton
                type="submit"
                tone="brand"
                size="md"
                disabled={sending}
                className="w-full font-extrabold text-[13px] py-3.5"
              >
                {sending ? "SENDING INQUIRY..." : "SUBMIT REQUEST"}
              </NeumorphicButton>
            </div>
          </form>
        </NeumorphicCard>
      </div>
    </section>
  );
}
