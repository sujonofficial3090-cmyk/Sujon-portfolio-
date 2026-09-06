import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  LogOut,
  User,
  Mail,
  Shield,
  Calendar,
  Eye,
  EyeOff,
  Lock,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { type FormEvent, useState, useEffect } from "react";
import { toast } from "sonner";

import { NeumorphicCard, NeumorphicButton } from "@/components/nm";
import { useAuth } from "@/lib/auth";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SUJON" },
      { name: "description", content: "Your SUJON account dashboard." },
    ],
  }),
  component: DashboardPage,
});

// ─── field class mirrors login.tsx ──────────────────────────────────────────
const fieldClass =
  "nm-inset w-full rounded-[10px] px-4 py-3 text-[11.5px] text-foreground placeholder:text-muted-foreground/70 outline-none focus:shadow-[var(--shadow-nm-inset-deep)] transition-shadow bg-surface";

// ─── Profile Settings Panel ───────────────────────────────────────────────────
function ProfileSettings() {
  const { user, updateProfile, changePassword } = useAuth();

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name ?? "");

  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwdError, setPwdError] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);

  function saveName() {
    if (!newName.trim()) return;
    const result = updateProfile({ name: newName });
    if (result.ok) {
      toast.success("Name updated!");
      setEditingName(false);
    } else {
      toast.error(result.error);
    }
  }

  async function handlePwdChange(e: FormEvent) {
    e.preventDefault();
    if (!newPwd) { setPwdError("Enter a new password."); return; }
    if (newPwd.length < 6) { setPwdError("Password must be at least 6 characters."); return; }
    if (newPwd !== confirmPwd) { setPwdError("Passwords do not match."); return; }
    setPwdError("");
    setPwdLoading(true);
    const result = await changePassword(oldPwd, newPwd);
    setPwdLoading(false);
    if (!result.ok) {
      setPwdError(result.error ?? "Something went wrong.");
    } else {
      toast.success("Password changed successfully!");
      setOldPwd(""); setNewPwd(""); setConfirmPwd("");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Name edit */}
      <NeumorphicCard depth="md" radius="lg" className="p-6">
        <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
          Display Name
        </h3>
        {editingName ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className={`${fieldClass} flex-1`}
              autoFocus
            />
            <button onClick={saveName} className="nm-raised-sm nm-interactive grid h-10 w-10 place-items-center rounded-[10px] text-green-500" aria-label="Save name">
              <Check className="h-4 w-4" />
            </button>
            <button onClick={() => { setEditingName(false); setNewName(user?.name ?? ""); }} className="nm-raised-sm nm-interactive grid h-10 w-10 place-items-center rounded-[10px] text-destructive" aria-label="Cancel">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-foreground">{user?.name}</span>
            <button onClick={() => setEditingName(true)} className="nm-raised-sm nm-interactive grid h-8 w-8 place-items-center rounded-[8px] text-muted-foreground hover:text-brand-deep transition-colors" aria-label="Edit name">
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </NeumorphicCard>

      {/* Change password */}
      <NeumorphicCard depth="md" radius="lg" className="p-6">
        <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
          Change Password
        </h3>
        <form onSubmit={handlePwdChange} className="flex flex-col gap-3">
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type={showOld ? "text" : "password"}
              placeholder="Current password"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              className={`${fieldClass} pl-9 pr-10`}
            />
            <button type="button" onClick={() => setShowOld(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-brand-deep transition-colors" aria-label="Toggle current password visibility">
              {showOld ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type={showNew ? "text" : "password"}
              placeholder="New password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              className={`${fieldClass} pl-9 pr-10`}
            />
            <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-brand-deep transition-colors" aria-label="Toggle new password visibility">
              {showNew ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            className={`${fieldClass}`}
          />
          {pwdError && <p className="text-[10.5px] font-medium text-destructive">{pwdError}</p>}
          <NeumorphicButton type="submit" tone="default" size="sm" disabled={pwdLoading} className="self-start">
            {pwdLoading ? "Saving…" : "Change Password"}
          </NeumorphicButton>
        </form>
      </NeumorphicCard>
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────
function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "profile">("overview");

  // Route guard — redirect unauthenticated users to /login
  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [isLoading, user, navigate]);

  function handleLogout() {
    logout();
    toast.success("You have been logged out.");
    navigate({ to: "/login" });
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="nm-raised-sm flex h-14 w-14 animate-spin items-center justify-center rounded-full">
          <LayoutDashboard className="h-6 w-6 text-brand-deep" />
        </div>
      </div>
    );
  }

  // Guard — show nothing while redirect fires
  if (!user) return null;

  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col gap-6 px-3 pb-10 pt-3 sm:px-5 sm:gap-8">
      <Header />

      <main className="flex flex-col gap-6 sm:gap-8">
        {/* Welcome Banner */}
        <NeumorphicCard depth="md" radius="lg" className="px-6 py-7 sm:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Dashboard
              </p>
              <h1 className="mt-1 text-[clamp(1.4rem,4vw,2rem)] font-extrabold tracking-tight text-foreground">
                Welcome back,{" "}
                <span className="text-brand-gradient">{user.name.split(" ")[0]}</span> 👋
              </h1>
              <p className="mt-1 text-[11.5px] text-muted-foreground">
                Manage your account and settings here.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <NeumorphicButton
                type="button"
                tone="default"
                size="sm"
                onClick={() => setActiveTab("profile")}
                className={activeTab === "profile" ? "nm-inset text-brand-deep" : ""}
                id="dashboard-profile-btn"
              >
                <User className="h-3.5 w-3.5" />
                Profile
              </NeumorphicButton>
              <NeumorphicButton
                type="button"
                tone="default"
                size="sm"
                onClick={handleLogout}
                id="dashboard-logout-btn"
                className="hover:text-destructive"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </NeumorphicButton>
            </div>
          </div>
        </NeumorphicCard>

        {/* Tabs */}
        <div className="flex gap-2">
          {(["overview", "profile"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`nm-raised-sm nm-interactive rounded-[10px] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-200 ${
                activeTab === tab ? "nm-inset text-brand-deep" : "text-muted-foreground hover:text-brand-deep"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab: Overview */}
        {activeTab === "overview" && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Account status */}
            <NeumorphicCard depth="md" radius="lg" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="nm-raised flex h-10 w-10 items-center justify-center rounded-full">
                  <Shield className="h-4.5 w-4.5 text-brand-deep" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  Account Status
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <span className="text-[13px] font-semibold text-foreground">Logged In</span>
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">Session active and secure.</p>
            </NeumorphicCard>

            {/* Email */}
            <NeumorphicCard depth="md" radius="lg" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="nm-raised flex h-10 w-10 items-center justify-center rounded-full">
                  <Mail className="h-4.5 w-4.5 text-brand-deep" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  Email
                </span>
              </div>
              <p className="text-[13px] font-semibold text-foreground break-all">{user.email}</p>
              <p className="mt-1.5 text-[11px] text-muted-foreground">Registered email address.</p>
            </NeumorphicCard>

            {/* Member since */}
            <NeumorphicCard depth="md" radius="lg" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="nm-raised flex h-10 w-10 items-center justify-center rounded-full">
                  <Calendar className="h-4.5 w-4.5 text-brand-deep" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  Member Since
                </span>
              </div>
              <p className="text-[13px] font-semibold text-foreground">{joinDate}</p>
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                Role:{" "}
                <span className="capitalize font-semibold text-brand-deep">{user.role}</span>
              </p>
            </NeumorphicCard>

            {/* Quick actions */}
            <NeumorphicCard depth="md" radius="lg" className="col-span-full p-6">
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <NeumorphicButton
                  type="button"
                  tone="brand"
                  size="sm"
                  onClick={() => setActiveTab("profile")}
                  id="dashboard-goto-profile-btn"
                >
                  <User className="h-3.5 w-3.5" />
                  Edit Profile
                </NeumorphicButton>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 nm-raised-sm nm-interactive rounded-[10px] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground hover:text-brand-deep transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Website
                </a>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); window.location.href = "/#contact"; }}
                  className="inline-flex items-center gap-2 nm-raised-sm nm-interactive rounded-[10px] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground hover:text-brand-deep transition-colors"
                >
                  Get a Quote
                </a>
                <NeumorphicButton
                  type="button"
                  tone="default"
                  size="sm"
                  onClick={handleLogout}
                  className="hover:text-destructive"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </NeumorphicButton>
              </div>
            </NeumorphicCard>
          </div>
        )}

        {/* Tab: Profile */}
        {activeTab === "profile" && <ProfileSettings />}
      </main>

      <Footer />
    </div>
  );
}
