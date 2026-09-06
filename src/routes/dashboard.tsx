import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CreditCard,
  Building2,
  Users,
  Globe,
  Search,
  Bell,
  Droplets,
  Wifi,
  Zap,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  LogOut,
  Calendar,
  Utensils,
  Receipt,
  Calculator,
  User,
  Shield,
  Check,
  X,
  Pencil,
  Lock,
  MessageSquare,
  Sparkles,
  ChevronRight,
  TrendingUp,
  RefreshCw,
  Sliders,
  DollarSign,
  Menu,
} from "lucide-react";
import { useState, useEffect, useId, type FormEvent } from "react";
import { toast } from "sonner";

import { NeumorphicCard, NeumorphicButton } from "@/components/nm";
import { useAuth } from "@/lib/auth";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Client Dashboard & Financial Hub — SUJON" },
      { name: "description", content: "Interactive soft neumorphic client dashboard and financial control center." },
    ],
  }),
  component: DashboardPage,
});

const fieldClass =
  "nm-inset w-full rounded-[10px] px-4 py-3 text-[11.5px] text-foreground placeholder:text-muted-foreground/70 outline-none focus:shadow-[var(--shadow-nm-inset-deep)] transition-shadow bg-surface";

interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: "income" | "outcome";
  category?: string;
}

interface BillItem {
  id: string;
  title: string;
  amount: number;
  due: string;
  iconType: "water" | "broadband" | "electricity";
  paid: boolean;
}

interface PaymentCard {
  id: string;
  holder: string;
  number: string;
  expiry: string;
  balance: number;
  color: string;
}

// ─── Profile Settings Sub-view ───────────────────────────────────────────────
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
      toast.success("Display name updated successfully!");
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
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Name edit */}
        <NeumorphicCard depth="md" radius="lg" className="p-6">
          <h3 className="mb-4 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground flex items-center gap-2">
            <User className="h-4 w-4 text-brand-deep" /> Display Name
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
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[15px] font-bold text-foreground">{user?.name}</span>
                <p className="text-[11px] text-muted-foreground mt-0.5">{user?.email}</p>
              </div>
              <button onClick={() => setEditingName(true)} className="nm-raised-sm nm-interactive grid h-9 w-9 place-items-center rounded-[10px] text-muted-foreground hover:text-brand-deep transition-colors" aria-label="Edit name">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
          )}
        </NeumorphicCard>

        {/* Account Details */}
        <NeumorphicCard depth="md" radius="lg" className="p-6">
          <h3 className="mb-4 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground flex items-center gap-2">
            <Shield className="h-4 w-4 text-brand-deep" /> Security & Role
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-[12px]">
              <span className="text-muted-foreground">Account Role</span>
              <span className="font-bold uppercase text-brand-deep">{user?.role ?? "Client"}</span>
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-muted-foreground">Account Status</span>
              <span className="text-green-500 font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" /> Active Verified
              </span>
            </div>
          </div>
        </NeumorphicCard>
      </div>

      {/* Password change */}
      <NeumorphicCard depth="md" radius="lg" className="p-6">
        <h3 className="mb-4 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground flex items-center gap-2">
          <Lock className="h-4 w-4 text-brand-deep" /> Change Password
        </h3>
        <form onSubmit={handlePwdChange} className="grid gap-3 max-w-md">
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type={showOld ? "text" : "password"}
              placeholder="Current password"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              className={`${fieldClass} pl-9 pr-10`}
            />
            <button type="button" onClick={() => setShowOld(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-brand-deep" aria-label="Toggle password">
              {showOld ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type={showNew ? "text" : "password"}
              placeholder="New password (min. 6 characters)"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              className={`${fieldClass} pl-9 pr-10`}
            />
            <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-brand-deep" aria-label="Toggle password">
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
          {pwdError && <p className="text-[11px] font-semibold text-destructive">{pwdError}</p>}
          <NeumorphicButton type="submit" tone="brand" size="sm" disabled={pwdLoading} className="self-start mt-2">
            {pwdLoading ? "Updating…" : "Save New Password"}
          </NeumorphicButton>
        </form>
      </NeumorphicCard>
    </div>
  );
}

// ─── Interactive Web/Loan Calculator Sub-view ────────────────────────────────
function ProjectCalculator() {
  const [pages, setPages] = useState(5);
  const [type, setType] = useState<"wordpress" | "ecommerce" | "custom">("wordpress");
  const [speedOptimization, setSpeedOptimization] = useState(true);
  const [seoReady, setSeoReady] = useState(true);
  const [maintenanceMonths, setMaintenanceMonths] = useState(6);

  const basePrice = type === "ecommerce" ? 450 : type === "custom" ? 600 : 300;
  const pageCost = pages * 35;
  const addonsCost = (speedOptimization ? 80 : 0) + (seoReady ? 60 : 0) + (maintenanceMonths * 40);
  const total = basePrice + pageCost + addonsCost;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <NeumorphicCard depth="md" radius="lg" className="p-6 space-y-5">
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-brand-deep flex items-center gap-2">
          <Calculator className="h-4 w-4" /> Project Investment Estimator
        </h3>
        <div>
          <label className="text-[11px] font-semibold uppercase text-muted-foreground block mb-2">Project Type</label>
          <div className="grid grid-cols-3 gap-2">
            {(["wordpress", "ecommerce", "custom"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`py-2 rounded-[10px] text-[11px] font-bold uppercase tracking-wider transition-all ${
                  type === t ? "nm-inset text-brand-deep" : "nm-raised-sm text-foreground/80 hover:text-brand-deep"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] font-semibold uppercase text-muted-foreground mb-1.5">
            <span>Number of Pages</span>
            <span className="text-brand-deep font-bold">{pages} Pages</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className="w-full accent-[#FF6000] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] font-semibold uppercase text-muted-foreground mb-1.5">
            <span>Maintenance & Support Period</span>
            <span className="text-brand-deep font-bold">{maintenanceMonths} Months</span>
          </div>
          <input
            type="range"
            min="0"
            max="12"
            step="1"
            value={maintenanceMonths}
            onChange={(e) => setMaintenanceMonths(Number(e.target.value))}
            className="w-full accent-[#FF6000] cursor-pointer"
          />
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <label className="flex items-center gap-3 text-[12px] font-medium text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={speedOptimization}
              onChange={(e) => setSpeedOptimization(e.target.checked)}
              className="accent-[#FF6000] h-4 w-4 rounded"
            />
            Include 95+ Mobile Speed & Core Web Vitals (+$80)
          </label>
          <label className="flex items-center gap-3 text-[12px] font-medium text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={seoReady}
              onChange={(e) => setSeoReady(e.target.checked)}
              className="accent-[#FF6000] h-4 w-4 rounded"
            />
            On-Page Semantic Technical SEO & OpenGraph (+$60)
          </label>
        </div>
      </NeumorphicCard>

      <NeumorphicCard depth="lg" radius="lg" className="p-8 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Estimated Investment</span>
          <div className="mt-3 text-[42px] font-extrabold tracking-tight text-foreground font-display">
            <span className="text-brand-gradient">${total.toLocaleString()}</span>
            <span className="text-[14px] font-semibold text-muted-foreground ml-2">USD</span>
          </div>
          <div className="mt-6 space-y-2 text-[12px] border-t border-border pt-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Base Architecture & Theme</span>
              <span>${basePrice}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Custom Page Builds ({pages}x)</span>
              <span>${pageCost}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Performance, SEO & Retainer</span>
              <span>${addonsCost}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4">
          <a
            href="/#contact"
            className="nm-raised-sm nm-interactive w-full py-3 rounded-[12px] flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-wider text-brand-deep hover:-translate-y-0.5 transition-all"
          >
            <Sparkles className="h-4 w-4" /> Start This Project with Sujon
          </a>
        </div>
      </NeumorphicCard>
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  // State matching screenshot items & dynamic interactions
  const [activeMenu, setActiveMenu] = useState<
    "dashboard" | "accounts" | "cards" | "contacts" | "calculator" | "settings"
  >("dashboard");

  const [timeframe, setTimeframe] = useState<"Week" | "Month" | "Year">("Week");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);

  // Financial & Stats state
  const [totalBalance, setTotalBalance] = useState(68657.0);
  const availableLimit = 270;
  const totalLimit = 760;

  // Active Cards
  const [cards, setCards] = useState<PaymentCard[]>([
    {
      id: "card-1",
      holder: user?.name || "Ahsan Jilani",
      number: "1124 5666 6599 1788",
      expiry: "11/25",
      balance: 68657.0,
      color: "from-[#FF6000] via-[#F5B700] to-[#E55500]",
    },
  ]);

  // Recent Transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "tx-1",
      name: user?.name || "Ahsan Jilani",
      date: "24-Dec-2022 12:33:23 PM",
      amount: 190,
      type: "outcome",
      category: "Wire Transfer",
    },
    {
      id: "tx-2",
      name: "Furqan Ashiq",
      date: "24-Dec-2022 09:54:23 AM",
      amount: 270,
      type: "income",
      category: "Milestone Paid",
    },
    {
      id: "tx-3",
      name: "Ahtishami",
      date: "02-Dec-2022 05:15:00 PM",
      amount: 150,
      type: "outcome",
      category: "Hosting & Server",
    },
    {
      id: "tx-4",
      name: "Sujon WordPress Studio",
      date: "28-Nov-2022 11:20:00 AM",
      amount: 850,
      type: "income",
      category: "E-Commerce Build",
    },
  ]);

  // Bills
  const [bills, setBills] = useState<BillItem[]>([
    { id: "b-1", title: "Water Bill", amount: 45, due: "Due in 3 days", iconType: "water", paid: false },
    { id: "b-2", title: "Broadband", amount: 65, due: "Due in 10 days", iconType: "broadband", paid: false },
    { id: "b-3", title: "Electricity", amount: 92, due: "Due in 14 days", iconType: "electricity", paid: false },
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: "n-1", text: "New milestone release received for WooCommerce store.", time: "10m ago" },
    { id: "n-2", text: "Monthly WordPress security check completed.", time: "1h ago" },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Modals
  const [transferModalType, setTransferModalType] = useState<string | null>(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferRecipient, setTransferRecipient] = useState("");
  const [transferNote, setTransferNote] = useState("");

  const [addCardModalOpen, setAddCardModalOpen] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");

  // Chart hover point
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Authentication guard
  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="nm-raised-sm flex h-14 w-14 animate-spin items-center justify-center rounded-full">
          <LayoutDashboard className="h-6 w-6 text-brand-deep" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Dynamic greeting based on user local time
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";

  // Chart datasets depending on timeframe
  const chartDatasets = {
    Week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      income: [35, 62, 45, 58, 48, 55, 65],
      outcome: [20, 42, 32, 53.54, 40, 36, 58],
      tooltipData: [
        { income: 35.0, outcome: -20.0 },
        { income: 62.5, outcome: -42.0 },
        { income: 45.0, outcome: -32.0 },
        { income: 57.99, outcome: -53.54 },
        { income: 48.0, outcome: -40.0 },
        { income: 55.0, outcome: -36.0 },
        { income: 65.0, outcome: -58.0 },
      ],
    },
    Month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      income: [42, 55, 68, 59],
      outcome: [30, 48, 45, 52],
      tooltipData: [
        { income: 242.0, outcome: -180.0 },
        { income: 310.0, outcome: -245.0 },
        { income: 450.0, outcome: -320.0 },
        { income: 380.0, outcome: -290.0 },
      ],
    },
    Year: {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      income: [50, 65, 58, 70],
      outcome: [38, 45, 42, 54],
      tooltipData: [
        { income: 1450.0, outcome: -980.0 },
        { income: 1820.0, outcome: -1200.0 },
        { income: 1690.0, outcome: -1150.0 },
        { income: 2100.0, outcome: -1450.0 },
      ],
    },
  };

  const activeChart = chartDatasets[timeframe];

  // Helper to convert dataset points into SVG cubic bezier path
  function generateSvgPath(points: number[], width: number, height: number) {
    if (!points.length) return "";
    const minVal = 0;
    const maxVal = 75;
    const stepX = width / (points.length - 1);

    const coords = points.map((val, idx) => {
      const x = idx * stepX;
      const y = height - (val / maxVal) * height;
      return { x, y };
    });

    let path = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i];
      const p1 = coords[i + 1];
      const cx = (p0.x + p1.x) / 2;
      path += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return path;
  }

  // Handle bill payment
  function payBill(id: string) {
    setBills((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          if (!b.paid) {
            setTotalBalance((bal) => Math.max(0, bal - b.amount));
            setTransactions((t) => [
              {
                id: `tx-${Date.now()}`,
                name: b.title,
                date: "Just now",
                amount: b.amount,
                type: "outcome",
                category: "Utility Bill",
              },
              ...t,
            ]);
            toast.success(`Paid $${b.amount} for ${b.title}!`);
            return { ...b, paid: true, due: "Paid" };
          }
        }
        return b;
      })
    );
  }

  // Handle quick fund transfer
  function handleSendTransfer(e: FormEvent) {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    if (amt > totalBalance) {
      toast.error("Insufficient account balance.");
      return;
    }
    if (!transferRecipient.trim()) {
      toast.error("Please enter recipient name or account.");
      return;
    }

    setTotalBalance((prev) => prev - amt);
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      name: transferRecipient.trim(),
      date: "Today, Just now",
      amount: amt,
      type: "outcome",
      category: transferModalType || "Transfer",
    };
    setTransactions((prev) => [newTx, ...prev]);
    toast.success(`Transferred $${amt.toLocaleString()} to ${transferRecipient}!`);
    setTransferModalType(null);
    setTransferAmount("");
    setTransferRecipient("");
    setTransferNote("");
  }

  // Handle adding card
  function handleAddCard(e: FormEvent) {
    e.preventDefault();
    if (!newCardNumber || newCardNumber.length < 12) {
      toast.error("Please enter a valid 16-digit card number.");
      return;
    }
    const newCard: PaymentCard = {
      id: `card-${Date.now()}`,
      holder: user.name,
      number: newCardNumber,
      expiry: newCardExpiry || "12/28",
      balance: 5000.0,
      color: "from-[#FF6000] via-[#F5B700] to-[#E55500]",
    };
    setCards((prev) => [...prev, newCard]);
    toast.success("New Card added successfully!");
    setAddCardModalOpen(false);
    setNewCardNumber("");
    setNewCardExpiry("");
  }

  // Filtered transactions for live search
  const filteredTransactions = transactions.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.category && t.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col gap-6 px-3 pb-10 pt-3 sm:px-5 sm:gap-8">
      <Header />

      <main className="w-full">
        {/* Main Dashboard App Container - Neumorphic Outer Shell */}
        <div className="relative rounded-[24px] bg-surface p-3 sm:p-6 nm-raised-lg border border-white/40 dark:border-white/5 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 items-start">
            {/* ════════════════════ LEFT SIDEBAR ════════════════════ */}
            <aside className="flex flex-col justify-between rounded-[18px] bg-surface p-4 nm-inset">
              {/* Brand Logo & Name */}
              <div className="mb-6 flex items-center justify-between pb-4 border-b border-border/70">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-[10px] nm-raised flex items-center justify-center text-brand-deep">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-[2] fill-none stroke-current">
                      <polygon points="12 2 2 22 22 22" />
                      <line x1="12" y1="2" x2="12" y2="22" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[14px] font-extrabold uppercase tracking-wider text-foreground font-display">
                      Dacati <span className="text-brand-deep">PORTAL</span>
                    </div>
                    <div className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      SUJON STUDIO
                    </div>
                  </div>
                </div>

                {/* Mobile sidebar toggle */}
                <button
                  type="button"
                  onClick={() => setIsMobileSidebarOpen((v) => !v)}
                  className="lg:hidden nm-raised-sm p-1.5 rounded-[8px] text-foreground"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation Items (Responsive collapsible on mobile) */}
              <div className={`${isMobileSidebarOpen ? "block" : "hidden"} lg:block space-y-6`}>
                {/* Main Menu */}
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted-foreground/80 px-2 block mb-2.5">
                    Main Menu
                  </span>
                  <nav className="space-y-1.5">
                    {[
                      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                      { id: "accounts", label: "Accounts", icon: Building2 },
                      { id: "cards", label: "Cards", icon: CreditCard },
                      { id: "contacts", label: "Contacts", icon: Users },
                      { id: "calculator", label: "Loan Calculator", icon: Calculator },
                      { id: "settings", label: "Settings", icon: Sliders },
                    ].map((item) => {
                      const isActive = activeMenu === item.id;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setActiveMenu(item.id as typeof activeMenu);
                            setIsMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-[12px] font-semibold transition-all duration-200 ${
                            isActive
                              ? "nm-raised-sm text-brand-deep font-bold border-l-2 border-brand-deep"
                              : "text-foreground/75 hover:text-foreground hover:nm-raised-sm"
                          }`}
                        >
                          <Icon className={`h-4 w-4 ${isActive ? "text-brand-deep" : "text-muted-foreground"}`} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Schedule Payments */}
                <div className="pt-3 border-t border-border/60">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted-foreground/80 px-2 block mb-2.5">
                    Schedule Payments
                  </span>
                  <ul className="space-y-1 text-[11.5px] font-medium text-muted-foreground">
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setTransferModalType("Monthly Rent / Retainer");
                          setTransferAmount("199");
                          setTransferRecipient("Sujon Infrastructure Host");
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] hover:nm-raised-sm hover:text-brand-deep transition-all text-left"
                      >
                        <Calendar className="h-3.5 w-3.5 text-brand-deep shrink-0" />
                        <span>Monthly Rent</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setTransferModalType("Food & Team Payment");
                          setTransferAmount("75");
                          setTransferRecipient("Team Dining & Staging");
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] hover:nm-raised-sm hover:text-brand-deep transition-all text-left"
                      >
                        <Utensils className="h-3.5 w-3.5 text-brand-deep shrink-0" />
                        <span>Food Payment</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setTransferModalType("Utility & API Bills");
                          setTransferAmount("110");
                          setTransferRecipient("Global Cloud CDN");
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] hover:nm-raised-sm hover:text-brand-deep transition-all text-left"
                      >
                        <Receipt className="h-3.5 w-3.5 text-brand-deep shrink-0" />
                        <span>Utility Bills</span>
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Logout Button */}
                <div className="pt-4 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      toast.success("Successfully logged out.");
                      navigate({ to: "/login" });
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[12px] font-bold text-muted-foreground hover:text-destructive hover:nm-raised-sm transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </aside>

            {/* ════════════════════ MAIN CONTENT VIEWPORT ════════════════════ */}
            <div className="space-y-6">
              {/* ── Top Bar: Greeting, Search, Notification, User Avatar ── */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-[20px] sm:text-[24px] font-extrabold tracking-tight text-foreground font-display">
                    {greeting}{" "}
                    <span className="text-brand-gradient">{user.name}</span>
                  </h1>
                  <p className="text-[12px] font-medium text-muted-foreground">
                    Welcome to the dashboard
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Search bar */}
                  <div className="relative flex-1 sm:w-64">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                    <input
                      type="text"
                      placeholder="Search here..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="nm-inset w-full rounded-[12px] bg-surface pl-9 pr-4 py-2 text-[12px] text-foreground outline-none focus:shadow-[var(--shadow-nm-inset-deep)] transition-all"
                    />
                  </div>

                  {/* Notification Bell with Badge */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowNotifications((v) => !v)}
                      className="nm-raised-sm nm-interactive relative grid h-10 w-10 place-items-center rounded-[12px] text-foreground/80 hover:text-brand-deep"
                      aria-label="View notifications"
                    >
                      <Bell className="h-4 w-4" />
                      {notifications.length > 0 && (
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand-deep animate-ping" />
                      )}
                      {notifications.length > 0 && (
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#FF6000]" />
                      )}
                    </button>

                    {/* Notifications popover */}
                    {showNotifications && (
                      <div className="absolute right-0 top-12 z-40 w-72 rounded-[16px] bg-surface p-3 nm-raised-lg border border-white/40 dark:border-white/10 animate-in fade-in zoom-in-95 shadow-xl">
                        <div className="flex items-center justify-between pb-2 border-b border-border">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-foreground">
                            Notifications
                          </span>
                          <button
                            type="button"
                            onClick={() => setNotifications([])}
                            className="text-[10px] text-brand-deep hover:underline"
                          >
                            Clear All
                          </button>
                        </div>
                        <ul className="mt-2 space-y-2">
                          {notifications.length === 0 ? (
                            <li className="text-[11px] text-muted-foreground py-2 text-center">No new notifications</li>
                          ) : (
                            notifications.map((n) => (
                              <li key={n.id} className="text-[11px] nm-inset p-2 rounded-[8px]">
                                <p className="text-foreground font-medium">{n.text}</p>
                                <span className="text-[9px] text-muted-foreground">{n.time}</span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* User Avatar */}
                  <div className="nm-raised-sm h-10 w-10 shrink-0 overflow-hidden rounded-[12px] p-0.5 border border-brand-deep/30">
                    <div className="h-full w-full rounded-[10px] bg-brand-deep/20 flex items-center justify-center font-bold text-[13px] text-brand-deep uppercase">
                      {user.name.slice(0, 2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Sub-view conditional switches ── */}
              {activeMenu === "settings" && <ProfileSettings />}
              {activeMenu === "calculator" && <ProjectCalculator />}

              {activeMenu === "accounts" && (
                <div className="space-y-4">
                  <NeumorphicCard depth="md" radius="lg" className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[14px] font-extrabold uppercase tracking-wider text-foreground">
                        Active Client Accounts & Workspaces
                      </h2>
                      <NeumorphicButton
                        tone="brand"
                        size="sm"
                        onClick={() => {
                          setTransferModalType("New Workspace Fund");
                          setTransferAmount("500");
                        }}
                      >
                        <Plus className="h-3.5 w-3.5" /> New Account
                      </NeumorphicButton>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="nm-inset p-4 rounded-[12px]">
                        <span className="text-[11px] font-bold text-brand-deep uppercase">Production Account</span>
                        <p className="text-[16px] font-extrabold text-foreground mt-1">$ 68,657.00 USD</p>
                        <p className="text-[10.5px] text-muted-foreground mt-1">Status: Active & Synchronized</p>
                      </div>
                      <div className="nm-inset p-4 rounded-[12px]">
                        <span className="text-[11px] font-bold text-brand-deep uppercase">Staging & Reserve</span>
                        <p className="text-[16px] font-extrabold text-foreground mt-1">$ 12,480.00 USD</p>
                        <p className="text-[10.5px] text-muted-foreground mt-1">Cloud Escrow Vault</p>
                      </div>
                    </div>
                  </NeumorphicCard>
                </div>
              )}

              {activeMenu === "cards" && (
                <div className="space-y-4">
                  <NeumorphicCard depth="md" radius="lg" className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[14px] font-extrabold uppercase tracking-wider text-foreground">
                        Payment Cards Management
                      </h2>
                      <NeumorphicButton tone="brand" size="sm" onClick={() => setAddCardModalOpen(true)}>
                        <Plus className="h-3.5 w-3.5" /> Add New Card
                      </NeumorphicButton>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {cards.map((c) => (
                        <div
                          key={c.id}
                          className="rounded-[16px] bg-gradient-to-tr from-[#FF6000] via-[#F5B700] to-[#FF7700] p-5 text-white shadow-lg space-y-4"
                        >
                          <div className="flex justify-between items-center text-[13px] font-bold tracking-wider">
                            <span>{c.holder}</span>
                            <div className="flex -space-x-2">
                              <span className="h-5 w-5 rounded-full bg-red-600/90" />
                              <span className="h-5 w-5 rounded-full bg-amber-400/90" />
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase opacity-80 block">Balance</span>
                            <span className="text-[20px] font-extrabold tracking-tight">${c.balance.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-end text-[11px] font-mono tracking-widest pt-2">
                            <span>{showCardNumber ? c.number : `•••• •••• •••• ${c.number.slice(-4)}`}</span>
                            <span className="text-[10px]">Valid {c.expiry}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </NeumorphicCard>
                </div>
              )}

              {activeMenu === "contacts" && (
                <div className="space-y-4">
                  <NeumorphicCard depth="md" radius="lg" className="p-6">
                    <h2 className="text-[14px] font-extrabold uppercase tracking-wider text-foreground mb-4">
                      Direct Developer Contacts & Support
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="nm-inset p-4 rounded-[12px] flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full nm-raised flex items-center justify-center text-brand-deep font-bold">
                          SM
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-foreground">Sujon Mia</p>
                          <p className="text-[11px] text-muted-foreground">Lead WordPress Architect</p>
                          <a href="https://wa.me/8801936711699" target="_blank" rel="noopener noreferrer" className="text-[11px] text-brand-deep font-bold hover:underline">
                            Chat on WhatsApp
                          </a>
                        </div>
                      </div>
                      <div className="nm-inset p-4 rounded-[12px] flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full nm-raised flex items-center justify-center text-brand-deep font-bold">
                          24/7
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-foreground">Client Priority Care</p>
                          <p className="text-[11px] text-muted-foreground">Response time: &lt; 15 mins</p>
                          <a href="mailto:sujonmia3090@gmail.com" className="text-[11px] text-brand-deep font-bold hover:underline">
                            sujonmia3090@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </NeumorphicCard>
                </div>
              )}

              {/* ════════════════════ DEFAULT DASHBOARD VIEW (MATCHING SCREENSHOT) ════════════════════ */}
              {activeMenu === "dashboard" && (
                <div className="space-y-6">
                  {/* ── Top Row: 4 Transfer Quick Cards ── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        type: "Transfer Via Card Number",
                        title: "Transfer Via\nCard Number",
                        icon: CreditCard,
                      },
                      {
                        type: "Transfer to Another Bank",
                        title: "Transfer to\nAnother Bank",
                        icon: Building2,
                      },
                      {
                        type: "Transfer to Same Bank",
                        title: "Transfer to\nSame Bank",
                        icon: Users,
                      },
                      {
                        type: "Transfer to International Bank",
                        title: "Transfer to\nInternational Bank",
                        icon: Globe,
                      },
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setTransferModalType(item.type);
                            setTransferRecipient(
                              idx === 0
                                ? "Card 4242 •••• 9918"
                                : idx === 1
                                ? "Standard Chartered Bank"
                                : idx === 2
                                ? "Dacati Bank Internal"
                                : "International Wire SWIFT"
                            );
                            setTransferAmount("100");
                          }}
                          className="nm-raised-sm nm-interactive p-4 rounded-[16px] flex items-center justify-between text-left group transition-all hover:-translate-y-0.5"
                        >
                          <span className="text-[12px] font-bold leading-snug text-foreground whitespace-pre-line group-hover:text-brand-deep transition-colors">
                            {item.title}
                          </span>
                          <div className="h-11 w-11 rounded-full border border-brand-deep/60 flex items-center justify-center text-brand-deep shrink-0 nm-raised-sm">
                            <Icon className="h-5 w-5" />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* ── Middle Row: Main Chart Card + Bills Card ── */}
                  <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-6">
                    {/* Main Chart Card */}
                    <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-6 flex flex-col justify-between">
                      {/* Chart Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                            Total Balance
                          </span>
                          <div className="text-[28px] sm:text-[34px] font-extrabold text-foreground tracking-tight font-display">
                            ${" "}
                            <span className="text-brand-gradient">
                              {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                            </span>
                          </div>
                        </div>

                        {/* Legends & Timeframe selector */}
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
                            <span className="h-3 w-3 rounded-full bg-[#F5B700] shrink-0" />
                            <span>Income</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
                            <span className="h-3 w-3 rounded-full bg-[#FF6000] shrink-0" />
                            <span>Outcome</span>
                          </div>

                          {/* Timeframe Dropdown */}
                          <div className="flex nm-inset rounded-[10px] p-1 gap-1">
                            {(["Week", "Month", "Year"] as const).map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setTimeframe(t)}
                                className={`px-2.5 py-1 rounded-[7px] text-[10.5px] font-bold uppercase tracking-wider transition-all ${
                                  timeframe === t ? "nm-raised-sm text-brand-deep" : "text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* SVG Canvas Interactive Chart */}
                      <div className="relative w-full h-[220px] sm:h-[260px] select-none pt-4">
                        {/* Grid lines & Y-axis labels */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] font-semibold text-muted-foreground/60 pr-2">
                          {[70, 60, 50, 40, 30, 20, 10].map((v) => (
                            <div key={v} className="flex items-center gap-2 w-full">
                              <span className="w-6 text-right">${v}</span>
                              <div className="flex-1 border-b border-border/40 border-dashed" />
                            </div>
                          ))}
                        </div>

                        {/* SVG Curves */}
                        <div className="absolute left-8 right-2 top-2 bottom-6">
                          <svg
                            viewBox="0 0 600 200"
                            preserveAspectRatio="none"
                            className="w-full h-full overflow-visible"
                          >
                            <defs>
                              {/* Glowing Gradient fill under Outcome line */}
                              <linearGradient id="outcomeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FF6000" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="#FF6000" stopOpacity="0.0" />
                              </linearGradient>

                              {/* Glowing Gradient fill under Income line */}
                              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#F5B700" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#F5B700" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>

                            {/* Dotted Gold Line for Income */}
                            <path
                              d={generateSvgPath(activeChart.income, 600, 200)}
                              fill="none"
                              stroke="#F5B700"
                              strokeWidth="2.5"
                              strokeDasharray="4 4"
                              className="transition-all duration-500 ease-in-out"
                            />

                            {/* Solid Brand Orange with Area Fill for Outcome */}
                            <path
                              d={`${generateSvgPath(activeChart.outcome, 600, 200)} L 600 200 L 0 200 Z`}
                              fill="url(#outcomeGradient)"
                              className="transition-all duration-500 ease-in-out"
                            />
                            <path
                              d={generateSvgPath(activeChart.outcome, 600, 200)}
                              fill="none"
                              stroke="#FF6000"
                              strokeWidth="3.5"
                              className="transition-all duration-500 ease-in-out drop-shadow-[0_2px_8px_rgba(255,96,0,0.4)]"
                            />

                            {/* Interactive Data Points & Tooltip */}
                            {activeChart.outcome.map((val, idx) => {
                              const stepX = 600 / (activeChart.outcome.length - 1);
                              const x = idx * stepX;
                              const y = 200 - (val / 75) * 200;
                              const isHovered = hoveredIndex === idx;
                              return (
                                <g
                                  key={idx}
                                  className="cursor-pointer"
                                  onMouseEnter={() => setHoveredIndex(idx)}
                                  onMouseLeave={() => setHoveredIndex(null)}
                                >
                                  {/* Vertical tracker indicator line when hovered */}
                                  {isHovered && (
                                    <line
                                      x1={x}
                                      y1={0}
                                      x2={x}
                                      y2={200}
                                      stroke="#FF6000"
                                      strokeWidth="1.5"
                                      strokeDasharray="3 3"
                                    />
                                  )}

                                  {/* Point Dot */}
                                  <circle
                                    cx={x}
                                    cy={y}
                                    r={isHovered ? 6 : 4}
                                    className="fill-surface stroke-[#FF6000] stroke-[3] transition-transform duration-200"
                                  />
                                </g>
                              );
                            })}
                          </svg>

                          {/* Floating Tooltip matching screenshot style */}
                          {hoveredIndex !== null && (
                            <div
                              className="absolute z-30 -translate-x-1/2 -top-4 pointer-events-none rounded-[10px] bg-[#141416] p-2 text-center text-[10px] shadow-2xl border border-border"
                              style={{
                                left: `${(hoveredIndex / (activeChart.outcome.length - 1)) * 100}%`,
                              }}
                            >
                              <div className="flex items-center gap-1 font-bold text-green-400">
                                <span>$</span>
                                <span>{activeChart.tooltipData[hoveredIndex].income.toFixed(2)}</span>
                              </div>
                              <div className="flex items-center gap-1 font-bold text-[#FF6000]">
                                <span>- $</span>
                                <span>{Math.abs(activeChart.tooltipData[hoveredIndex].outcome).toFixed(2)}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* X-axis labels */}
                        <div className="absolute left-8 right-2 bottom-0 flex justify-between text-[11px] font-semibold text-muted-foreground">
                          {activeChart.labels.map((lbl, idx) => (
                            <span key={idx} className="text-center w-8">
                              {lbl}
                            </span>
                          ))}
                        </div>
                      </div>
                    </NeumorphicCard>

                    {/* Bills Card */}
                    <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-border/70 mb-4">
                          <h2 className="text-[14px] font-extrabold uppercase tracking-wider text-foreground">
                            Bills
                          </h2>
                          <span className="text-[11px] font-bold text-brand-deep">
                            {bills.filter((b) => !b.paid).length} Due
                          </span>
                        </div>

                        {/* List of Bills */}
                        <div className="space-y-3">
                          {bills.map((bill) => {
                            const IconComponent =
                              bill.iconType === "water"
                                ? Droplets
                                : bill.iconType === "broadband"
                                ? Wifi
                                : Zap;
                            return (
                              <div
                                key={bill.id}
                                className="nm-inset p-3 rounded-[14px] flex items-center justify-between group transition-all"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="h-9 w-9 rounded-[10px] nm-raised-sm flex items-center justify-center text-brand-deep shrink-0">
                                    <IconComponent className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <h3 className="text-[12px] font-bold text-foreground">
                                      {bill.title}
                                    </h3>
                                    <p className="text-[10px] text-muted-foreground font-medium">
                                      ${bill.amount} • {bill.due}
                                    </p>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  disabled={bill.paid}
                                  onClick={() => payBill(bill.id)}
                                  className={`px-3 py-1.5 rounded-[8px] text-[10.5px] font-bold uppercase tracking-wider transition-all ${
                                    bill.paid
                                      ? "text-green-500 font-bold bg-green-500/10 cursor-default"
                                      : "nm-raised-sm nm-interactive text-brand-deep hover:scale-105"
                                  }`}
                                >
                                  {bill.paid ? "Paid" : "Pay"}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-border/60 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setBills((prev) =>
                              prev.map((b) => ({ ...b, paid: false, due: "Due next month" }))
                            );
                            toast.info("Refreshed upcoming monthly bills.");
                          }}
                          className="text-[11px] font-semibold text-brand-deep hover:underline inline-flex items-center gap-1"
                        >
                          <RefreshCw className="h-3 w-3" /> Refresh Upcoming
                        </button>
                      </div>
                    </NeumorphicCard>
                  </div>

                  {/* ── Bottom Row: Recent Transactions + Cards Section ── */}
                  <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1.7fr] gap-6">
                    {/* Recent Transactions Card */}
                    <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-border/70 mb-4">
                          <h2 className="text-[14px] font-extrabold uppercase tracking-wider text-foreground">
                            Recent Transactions
                          </h2>
                          <span className="text-[11px] font-bold text-muted-foreground">
                            {filteredTransactions.length} Items
                          </span>
                        </div>

                        {/* List */}
                        <div className="space-y-3">
                          {filteredTransactions.length === 0 ? (
                            <div className="text-center py-6 text-[12px] text-muted-foreground">
                              No transactions matching "{searchQuery}"
                            </div>
                          ) : (
                            filteredTransactions.map((tx) => (
                              <div
                                key={tx.id}
                                className="nm-inset p-3 rounded-[14px] flex items-center justify-between"
                              >
                                <div className="flex items-center gap-3">
                                  {/* Dot matching screenshot */}
                                  <span
                                    className={`h-3 w-3 rounded-full shrink-0 ${
                                      tx.type === "income" ? "bg-[#F5B700]" : "bg-[#FF6000]"
                                    }`}
                                  />
                                  <div>
                                    <h3 className="text-[12px] font-bold text-foreground">{tx.name}</h3>
                                    <p className="text-[9.5px] text-muted-foreground font-medium">{tx.date}</p>
                                  </div>
                                </div>

                                <div
                                  className={`text-[12px] font-extrabold font-display ${
                                    tx.type === "income" ? "text-green-500" : "text-[#FF6000]"
                                  }`}
                                >
                                  {tx.type === "income" ? `+ $ ${tx.amount}` : `- $ ${tx.amount}`}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-border/60">
                        <NeumorphicButton
                          tone="default"
                          size="sm"
                          className="w-full text-center justify-center text-[11px]"
                          onClick={() => {
                            setTransferModalType("Manual Entry");
                            setTransferRecipient("Client Retainer");
                            setTransferAmount("250");
                          }}
                        >
                          <Plus className="h-3.5 w-3.5" /> Quick Add Transaction
                        </NeumorphicButton>
                      </div>
                    </NeumorphicCard>

                    {/* Cards & Donut Progress Gauge Section */}
                    <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-border/70 mb-4">
                          <h2 className="text-[14px] font-extrabold uppercase tracking-wider text-foreground">
                            Cards
                          </h2>
                          <button
                            type="button"
                            onClick={() => setShowCardNumber((v) => !v)}
                            className="text-[11px] font-semibold text-brand-deep hover:underline flex items-center gap-1"
                          >
                            {showCardNumber ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                            <span>{showCardNumber ? "Hide Digits" : "Reveal Digits"}</span>
                          </button>
                        </div>

                        {/* Grid: Physical Card + Donut Gauge */}
                        <div className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr] gap-4 items-center">
                          {/* Physical Styled Bank Card */}
                          <div className="relative overflow-hidden rounded-[18px] bg-gradient-to-tr from-[#FF6000] via-[#F5B700] to-[#E55500] p-5 text-white shadow-xl flex flex-col justify-between min-h-[175px]">
                            {/* Texture overlay */}
                            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_right,white,transparent)] pointer-events-none" />

                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-[14px] tracking-wider uppercase font-display drop-shadow-sm">
                                {cards[0]?.holder || user.name}
                              </span>
                              {/* Chip graphic */}
                              <div className="h-6 w-8 rounded-[4px] bg-amber-200/80 border border-amber-400 flex items-center justify-center">
                                <div className="h-3 w-4 border border-amber-600/60 rounded-[2px]" />
                              </div>
                            </div>

                            <div className="my-2">
                              <span className="text-[9.5px] uppercase font-bold tracking-wider opacity-85 block">
                                Balance
                              </span>
                              <div className="text-[22px] font-extrabold tracking-tight font-display drop-shadow-md">
                                $ {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-1 border-t border-white/20">
                              <span className="font-mono text-[12px] tracking-widest font-bold">
                                {showCardNumber ? cards[0]?.number : `•••• •••• •••• ${cards[0]?.number.slice(-4)}`}
                              </span>
                              {/* Mastercard double overlapping circles */}
                              <div className="flex -space-x-2 shrink-0">
                                <span className="h-5 w-5 rounded-full bg-red-600 shadow-xs" />
                                <span className="h-5 w-5 rounded-full bg-amber-400 shadow-xs" />
                              </div>
                            </div>
                          </div>

                          {/* Donut Gauge + Limits */}
                          <div className="flex flex-col items-center justify-center p-2">
                            {/* Circular Gauge */}
                            <div className="relative h-28 w-28 flex items-center justify-center">
                              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                                {/* Background Ring */}
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3.5"
                                  className="text-border/60"
                                />
                                {/* Progress Ring 65% */}
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#FF6000"
                                  strokeWidth="3.5"
                                  strokeDasharray="65, 100"
                                  strokeLinecap="round"
                                  className="transition-all duration-1000"
                                />
                              </svg>
                              <div className="absolute flex flex-col items-center">
                                <span className="text-[18px] font-extrabold text-foreground font-display">
                                  65%
                                </span>
                              </div>
                            </div>

                            {/* Limits Info */}
                            <div className="mt-3 text-center space-y-1">
                              <div>
                                <span className="text-[14px] font-extrabold text-[#FF6000] font-display">
                                  $ {availableLimit}
                                </span>
                                <span className="text-[9.5px] font-bold uppercase text-muted-foreground block">
                                  Available Limit
                                </span>
                              </div>
                              <div>
                                <span className="text-[13px] font-extrabold text-green-500 font-display">
                                  $ {totalLimit}
                                </span>
                                <span className="text-[9.5px] font-bold uppercase text-muted-foreground block">
                                  Total Limit
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-border/60">
                        <NeumorphicButton
                          tone="default"
                          size="sm"
                          className="w-full text-center justify-center"
                          onClick={() => setAddCardModalOpen(true)}
                        >
                          <Plus className="h-3.5 w-3.5" /> Add New Card
                        </NeumorphicButton>
                      </div>
                    </NeumorphicCard>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ════════════════════ TRANSFER MODAL ════════════════════ */}
      {transferModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-[20px] bg-surface p-6 nm-raised-lg border border-white/30 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-[15px] font-extrabold uppercase tracking-wider text-foreground">
                {transferModalType}
              </h2>
              <button
                type="button"
                onClick={() => setTransferModalType(null)}
                className="nm-raised-sm grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSendTransfer} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                  Recipient Name / Card / Account
                </label>
                <input
                  type="text"
                  required
                  value={transferRecipient}
                  onChange={(e) => setTransferRecipient(e.target.value)}
                  placeholder="Enter recipient or IBAN"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                  Amount ($ USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="0.00"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                  Note / Reference
                </label>
                <input
                  type="text"
                  value={transferNote}
                  onChange={(e) => setTransferNote(e.target.value)}
                  placeholder="Optional note"
                  className={fieldClass}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <NeumorphicButton type="submit" tone="brand" size="md" className="flex-1">
                  Confirm Transfer
                </NeumorphicButton>
                <NeumorphicButton
                  type="button"
                  tone="default"
                  size="md"
                  onClick={() => setTransferModalType(null)}
                >
                  Cancel
                </NeumorphicButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════════════ ADD CARD MODAL ════════════════════ */}
      {addCardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-[20px] bg-surface p-6 nm-raised-lg border border-white/30 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-[15px] font-extrabold uppercase tracking-wider text-foreground">
                Add New Card
              </h2>
              <button
                type="button"
                onClick={() => setAddCardModalOpen(false)}
                className="nm-raised-sm grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                  Cardholder Name
                </label>
                <input type="text" readOnly value={user.name} className={`${fieldClass} opacity-80`} />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                  16-Digit Card Number
                </label>
                <input
                  type="text"
                  required
                  maxLength={19}
                  value={newCardNumber}
                  onChange={(e) => setNewCardNumber(e.target.value)}
                  placeholder="4532 •••• •••• 8921"
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={newCardExpiry}
                    onChange={(e) => setNewCardExpiry(e.target.value)}
                    placeholder="08/29"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                    CVV
                  </label>
                  <input type="password" maxLength={4} placeholder="•••" className={fieldClass} />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <NeumorphicButton type="submit" tone="brand" size="md" className="flex-1">
                  Save Card
                </NeumorphicButton>
                <NeumorphicButton
                  type="button"
                  tone="default"
                  size="md"
                  onClick={() => setAddCardModalOpen(false)}
                >
                  Cancel
                </NeumorphicButton>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
