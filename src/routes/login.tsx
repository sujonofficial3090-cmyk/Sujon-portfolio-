import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail, LogIn, ArrowLeft } from "lucide-react";
import { type FormEvent, useState, useEffect } from "react";
import { toast } from "sonner";

import { NeumorphicCard, NeumorphicButton } from "@/components/nm";
import { useAuth } from "@/lib/auth";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — SUJON" },
      { name: "description", content: "Sign in to your SUJON account." },
    ],
  }),
  beforeLoad: ({ context }) => {
    // If already logged in, redirect away from login page
    // We check via session storage in the loader to avoid flash
  },
  component: LoginPage,
});

// ─── field class mirrors Contact.tsx ────────────────────────────────────────
const fieldClass =
  "nm-inset w-full rounded-[10px] px-4 py-3 text-[11.5px] text-foreground placeholder:text-muted-foreground/70 outline-none focus:shadow-[var(--shadow-nm-inset-deep)] transition-shadow bg-surface";

// ─── Validation ─────────────────────────────────────────────────────────────
function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

// ─── Login Page ──────────────────────────────────────────────────────────────
function LoginPage() {
  const { login, logout, user, quickLoginAs } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  // If user is already logged in, we let them switch or proceed
  // No forced automatic redirect so they can log in as Admin!

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    const result = await login(email, password, rememberMe);
    setLoading(false);

    if (!result.ok) {
      setErrors({ form: result.error });
    } else {
      toast.success("Logged in successfully!");
      navigate({ to: "/dashboard" });
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col gap-6 px-3 pb-10 pt-3 sm:px-5 sm:gap-8">
      <Header />

      <main className="flex flex-1 items-center justify-center py-8">
        <div className="w-full max-w-md">
          <NeumorphicCard depth="lg" radius="lg" className="px-7 py-10 sm:px-10 sm:py-12">
            {/* Heading */}
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full nm-raised">
                <LogIn className="h-6 w-6 text-brand-deep" />
              </div>
              <h1 className="text-[clamp(1.4rem,4vw,1.8rem)] font-extrabold tracking-tight text-foreground">
                Welcome Back
              </h1>
              <p className="mt-1.5 text-[11.5px] text-muted-foreground">
                Sign in to your SUJON account
              </p>
            </div>

            {/* Active session reminder */}
            {user && (
              <div className="mb-5 nm-inset rounded-[12px] p-3.5 flex items-center justify-between gap-2 text-[11px]">
                <div>
                  <span className="text-muted-foreground block text-[10px] font-bold uppercase">
                    Currently Signed In:
                  </span>
                  <span className="font-bold text-foreground">
                    {user.name} ({user.role === "admin" ? "🛡️ Super Admin" : "👤 Customer"})
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => navigate({ to: "/dashboard" })}
                    className="nm-raised-sm px-2.5 py-1 rounded-[7px] font-extrabold text-brand-deep text-[10.5px]"
                  >
                    Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      toast.info("Signed out.");
                    }}
                    className="nm-raised-sm px-2.5 py-1 rounded-[7px] font-bold text-destructive text-[10.5px]"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Global form error */}
            {errors.form && (
              <div className="mb-5 nm-inset rounded-[10px] px-4 py-3">
                <p className="text-[11.5px] font-semibold text-destructive">{errors.form}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="login-email" className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className={`${fieldClass} pl-9`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10.5px] font-medium text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="login-password" className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    className={`${fieldClass} pl-9 pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-brand-deep transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10.5px] font-medium text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Remember me + Forgot password row */}
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer select-none items-center gap-2 text-[10.5px] text-muted-foreground">
                  <span
                    role="checkbox"
                    aria-checked={rememberMe}
                    tabIndex={0}
                    onClick={() => setRememberMe((v) => !v)}
                    onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") setRememberMe((v) => !v); }}
                    className={`relative flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-[4px] transition-all ${
                      rememberMe
                        ? "nm-inset text-brand-deep"
                        : "nm-raised-sm"
                    }`}
                  >
                    {rememberMe && (
                      <svg className="h-2.5 w-2.5" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  Remember me
                </label>
                <a
                  href="/login#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    const emailToReset = email.trim();
                    if (!emailToReset || !validateEmail(emailToReset)) {
                      toast.info("Enter your email address above first, then click Forgot Password.");
                    } else {
                      toast.success(`Password reset link sent to ${emailToReset}`, {
                        description: "Check your inbox. (Demo mode: no actual email sent.)",
                      });
                    }
                  }}
                  className="text-[10.5px] font-semibold text-brand-deep hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit */}
              <NeumorphicButton
                type="submit"
                tone="brand"
                size="lg"
                className="mt-2 w-full justify-center"
                disabled={loading}
                id="login-submit-btn"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Signing in…
                  </span>
                ) : (
                  "Login"
                )}
              </NeumorphicButton>
            </form>

            {/* Footer link */}
            <p className="mt-6 text-center text-[11px] text-muted-foreground">
              Don't have an account?{" "}
              <a href="/register" className="font-semibold text-brand-deep hover:underline">
                Create an account
              </a>
            </p>
          </NeumorphicCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
