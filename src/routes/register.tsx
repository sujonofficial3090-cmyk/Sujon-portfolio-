import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail, User, UserPlus, ArrowLeft, Sun, Moon } from "lucide-react";
import { type FormEvent, useState, useEffect } from "react";
import { toast } from "sonner";

import logoMark from "@/assets/logo-mark.png";
import { NeumorphicCard, NeumorphicButton } from "@/components/nm";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — SUJON" },
      { name: "description", content: "Create your SUJON account." },
    ],
  }),
  component: RegisterPage,
});

// ─── field class — identical to Contact.tsx / login.tsx ─────────────────────
const fieldClass =
  "nm-inset w-full rounded-[10px] px-4 py-3 text-[11.5px] text-foreground placeholder:text-muted-foreground/70 outline-none focus:shadow-[var(--shadow-nm-inset-deep)] transition-shadow bg-surface";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function passwordStrength(pwd: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const map = [
    { label: "Too weak", color: "bg-destructive" },
    { label: "Weak", color: "bg-orange-400" },
    { label: "Fair", color: "bg-yellow-400" },
    { label: "Good", color: "bg-green-400" },
    { label: "Strong", color: "bg-green-500" },
  ] as const;
  return { score, ...map[score] };
}

// ─── Mini auth header (same as login.tsx) ────────────────────────────────────
function AuthHeader() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  return (
    <header className="sticky top-3 z-50">
      <NeumorphicCard depth="md" radius="lg" className="px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2">
            <img src={logoMark} alt="SUJON logo" width={40} height={40} className="h-9 w-9 shrink-0 object-contain" />
            <span className="truncate text-[15px] font-extrabold tracking-wider uppercase text-foreground">SUJON</span>
          </a>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 nm-raised-sm nm-interactive rounded-[10px] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground hover:text-brand-deep transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Website
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="nm-raised-sm nm-interactive grid h-10 w-10 shrink-0 place-items-center rounded-[10px] text-foreground/75"
            >
              {dark ? <Sun className="h-4 w-4 text-brand-deep" /> : <Moon className="h-4 w-4 text-brand-deep" />}
            </button>
          </div>
        </div>
      </NeumorphicCard>
    </header>
  );
}

// ─── Register Page ────────────────────────────────────────────────────────────
function RegisterPage() {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    form?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  // Already logged in → redirect
  useEffect(() => {
    if (user) navigate({ to: "/dashboard" });
  }, [user, navigate]);

  const strength = passwordStrength(password);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);

    if (!result.ok) {
      setErrors({ form: result.error });
    } else {
      toast.success("Account created! Welcome aboard 🎉");
      navigate({ to: "/dashboard" });
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col gap-6 px-3 pb-10 pt-3 sm:px-5 sm:gap-8">
      <AuthHeader />

      <main className="flex flex-1 items-center justify-center py-8">
        <div className="w-full max-w-md">
          <NeumorphicCard depth="lg" radius="lg" className="px-7 py-10 sm:px-10 sm:py-12">
            {/* Heading */}
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full nm-raised">
                <UserPlus className="h-6 w-6 text-brand-deep" />
              </div>
              <h1 className="text-[clamp(1.4rem,4vw,1.8rem)] font-extrabold tracking-tight text-foreground">
                Create Account
              </h1>
              <p className="mt-1.5 text-[11.5px] text-muted-foreground">
                Join SUJON today — it's free
              </p>
            </div>

            {/* Global form error */}
            {errors.form && (
              <div className="mb-5 nm-inset rounded-[10px] px-4 py-3">
                <p className="text-[11.5px] font-semibold text-destructive">{errors.form}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reg-name" className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Full Name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    id="reg-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
                    className={`${fieldClass} pl-9`}
                  />
                </div>
                {errors.name && <p className="text-[10.5px] font-medium text-destructive">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reg-email" className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                    className={`${fieldClass} pl-9`}
                  />
                </div>
                {errors.email && <p className="text-[10.5px] font-medium text-destructive">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reg-password" className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
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

                {/* Strength bar */}
                {password && (
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i < strength.score ? strength.color : "nm-inset"
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-[10px] font-semibold ${strength.score <= 1 ? "text-destructive" : strength.score <= 2 ? "text-yellow-500" : "text-green-500"}`}>
                      {strength.label}
                    </p>
                  </div>
                )}
                {errors.password && <p className="text-[10.5px] font-medium text-destructive">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reg-confirm" className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    id="reg-confirm"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); if (errors.confirmPassword) setErrors((p) => ({ ...p, confirmPassword: undefined })); }}
                    className={`${fieldClass} pl-9 pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-brand-deep transition-colors"
                    aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirm ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-[10.5px] font-medium text-destructive">{errors.confirmPassword}</p>}
              </div>

              {/* Submit */}
              <NeumorphicButton
                type="submit"
                tone="brand"
                size="lg"
                className="mt-2 w-full justify-center"
                disabled={loading}
                id="register-submit-btn"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Creating account…
                  </span>
                ) : (
                  "Create Account"
                )}
              </NeumorphicButton>
            </form>

            <p className="mt-6 text-center text-[11px] text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="font-semibold text-brand-deep hover:underline">
                Login
              </a>
            </p>
          </NeumorphicCard>
        </div>
      </main>
    </div>
  );
}
