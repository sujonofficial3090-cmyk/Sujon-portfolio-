import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Package,
  UploadCloud,
  Users,
  LayoutDashboard,
  Search,
  Download,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  X,
  Sliders,
  Sparkles,
  Shield,
  Layers,
  FileCode,
  Calendar,
  Mail,
  User,
  Pencil,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  RefreshCw,
  Clock,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Menu,
  MessageCircle,
  Crown,
  DollarSign,
  Zap,
  AlertCircle,
  ShoppingCart,
  Star,
  FolderDown,
  CheckCheck,
  CreditCard,
  PhoneCall,
  Receipt,
  Copy,
  SlidersHorizontal,
  UserPlus,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import { toast } from "sonner";

import { NeumorphicCard, NeumorphicButton } from "@/components/nm";
import { useAuth, type CustomerRecord } from "@/lib/auth";
import {
  getCatalogItems,
  addCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
  incrementItemDownloads,
  type CatalogItem,
} from "@/lib/catalog";
import { downloadCatalogAssetZip } from "@/lib/zipHelper";
import {
  getPayments,
  createPaymentRecord,
  updatePaymentStatus,
  deletePaymentRecord,
  type PaymentRecord,
} from "@/lib/payments";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "WordPress Hub & Dashboard — SUJON" },
      {
        name: "description",
        content:
          "Download custom WordPress themes and plugins crafted by Sujon Mia, manage your downloads, or oversee developer operations.",
      },
    ],
  }),
  component: DashboardPage,
});

const fieldClass =
  "nm-inset w-full rounded-[10px] px-4 py-3 text-[12px] text-foreground placeholder:text-muted-foreground/70 outline-none focus:shadow-[var(--shadow-nm-inset-deep)] transition-shadow bg-surface";

// ─── Profile & Credentials View ───────────────────────────────────────────────
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
      toast.success("Profile name updated successfully!");
      setEditingName(false);
    } else {
      toast.error(result.error);
    }
  }

  async function handlePwdChange(e: FormEvent) {
    e.preventDefault();
    if (!newPwd) {
      setPwdError("Enter a new password.");
      return;
    }
    if (newPwd.length < 6) {
      setPwdError("Password must be at least 6 characters.");
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdError("Passwords do not match.");
      return;
    }
    setPwdError("");
    setPwdLoading(true);
    const result = await changePassword(oldPwd, newPwd);
    setPwdLoading(false);
    if (!result.ok) {
      setPwdError(result.error ?? "Something went wrong.");
    } else {
      toast.success("Password changed successfully!");
      setOldPwd("");
      setNewPwd("");
      setConfirmPwd("");
    }
  }

  const isAdmin = user?.role === "admin";
  const userPlan = user?.plan || (isAdmin ? "agency" : "free");

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <NeumorphicCard depth="md" radius="lg" className="p-6">
          <h3 className="mb-4 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground flex items-center gap-2">
            <User className="h-4 w-4 text-brand-deep" /> Display Name & Account
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
              <button
                onClick={saveName}
                className="nm-raised-sm nm-interactive grid h-10 w-10 place-items-center rounded-[10px] text-green-500"
                aria-label="Save name"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setEditingName(false);
                  setNewName(user?.name ?? "");
                }}
                className="nm-raised-sm nm-interactive grid h-10 w-10 place-items-center rounded-[10px] text-destructive"
                aria-label="Cancel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[15px] font-bold text-foreground">
                  {user?.name}
                </span>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={() => setEditingName(true)}
                className="nm-raised-sm nm-interactive grid h-9 w-9 place-items-center rounded-[10px] text-muted-foreground hover:text-brand-deep transition-colors"
                aria-label="Edit name"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>
          )}
        </NeumorphicCard>

        <NeumorphicCard depth="md" radius="lg" className="p-6">
          <h3 className="mb-4 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground flex items-center gap-2">
            <Shield className="h-4 w-4 text-brand-deep" /> Account Type & Access Level
          </h3>
          <div className="space-y-2.5">
            <div className="flex justify-between text-[12px]">
              <span className="text-muted-foreground">Role</span>
              <span
                className={`font-bold uppercase ${
                  isAdmin ? "text-amber-500 font-extrabold" : "text-brand-deep"
                }`}
              >
                {isAdmin ? "🛡️ Super Admin (Sujon)" : "👤 Customer Account"}
              </span>
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-muted-foreground">Access Plan</span>
              <span className="font-extrabold uppercase px-2 py-0.5 rounded-full text-[10px] bg-brand-deep/15 text-brand-deep">
                {userPlan === "free"
                  ? "Free Plan"
                  : userPlan === "pro"
                  ? "⭐ Pro Developer Pass"
                  : "👑 Agency Lifetime"}
              </span>
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-muted-foreground">Downloaded Items</span>
              <span className="font-bold text-foreground">
                {user?.downloadsCount ?? 0} Assets
              </span>
            </div>
          </div>
        </NeumorphicCard>
      </div>

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
            <button
              type="button"
              onClick={() => setShowOld((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-brand-deep"
              aria-label="Toggle password"
            >
              {showOld ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
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
            <button
              type="button"
              onClick={() => setShowNew((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-brand-deep"
              aria-label="Toggle password"
            >
              {showNew ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            className={`${fieldClass}`}
          />
          {pwdError && (
            <p className="text-[11px] font-semibold text-destructive">{pwdError}</p>
          )}
          <NeumorphicButton
            type="submit"
            tone="brand"
            size="sm"
            disabled={pwdLoading}
            className="self-start mt-2"
          >
            {pwdLoading ? "Updating…" : "Save New Password"}
          </NeumorphicButton>
        </form>
      </NeumorphicCard>
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
function DashboardPage() {
  const {
    user,
    isLoading,
    login,
    logout,
    getAllCustomers,
    recordDownload,
    upgradePlan,
    adminSetCustomerPlan,
    deleteCustomer,
    addCustomerByAdmin,
    quickLoginAs,
    resetCustomerPlanToFree,
  } = useAuth();
  const navigate = useNavigate();

  // Admin Unlock Modal State
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [adminAuthPassword, setAdminAuthPassword] = useState("");
  const [adminAuthError, setAdminAuthError] = useState("");
  const [adminAuthLoading, setAdminAuthLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    | "catalog"
    | "my-downloads"
    | "plans"
    | "upload"
    | "customers"
    | "orders"
    | "analytics"
    | "settings"
  >("catalog");

  // Catalog State
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "theme" | "plugin">("all");
  const [planFilter, setPlanFilter] = useState<"all" | "free" | "paid">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Customers state (for Admin)
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [customerSearch, setCustomerSearch] = useState("");

  // Orders / Payments state
  const [payments, setPayments] = useState<PaymentRecord[]>([]);

  // Mobile sidebar
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Upload Form State (for Admin)
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadType, setUploadType] = useState<"theme" | "plugin">("theme");
  const [uploadCategory, setUploadCategory] =
    useState<CatalogItem["category"]>("Agency & Portfolio");
  const [uploadPlanReq, setUploadPlanReq] = useState<"free" | "paid">("free");
  const [uploadPrice, setUploadPrice] = useState("29");
  const [uploadVersion, setUploadVersion] = useState("1.0.0");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadFeatures, setUploadFeatures] = useState("");
  const [uploadDemoUrl, setUploadDemoUrl] = useState("/#portfolio");
  const [uploadFileSize, setUploadFileSize] = useState("4.5 MB");
  const [uploadBadge, setUploadBadge] = useState<CatalogItem["badge"]>("New");
  const [uploadFileName, setUploadFileName] = useState("");
  const [uploadExternalUrl, setUploadExternalUrl] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  // Edit Item Modal State (for Admin)
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);

  // Add Customer Modal State (for Admin)
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [newCustName, setNewCustName] = useState("");
  const [newCustEmail, setNewCustEmail] = useState("");
  const [newCustPlan, setNewCustPlan] = useState<"free" | "pro" | "agency">("free");

  // Admin Verification Login Modal
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [adminLoginPassword, setAdminLoginPassword] = useState("");
  const [adminLoginError, setAdminLoginError] = useState("");
  const [adminLoginLoading, setAdminLoginLoading] = useState(false);

  // Payment Gateway Modal State (When buying Pro or Paid items)
  const [paymentModalData, setPaymentModalData] = useState<{
    isOpen: boolean;
    plan: "pro" | "agency" | "single_asset";
    item?: CatalogItem;
    amount: number;
  }>({
    isOpen: false,
    plan: "pro",
    amount: 49,
  });

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "card" | "whatsapp">("bkash");
  const [bkashPhone, setBkashPhone] = useState("");
  const [bkashTrxId, setBkashTrxId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [paymentSubmitting, setPaymentSubmitting] = useState(false);
  const [paymentSuccessReceipt, setPaymentSuccessReceipt] = useState<PaymentRecord | null>(null);

  // Load catalog, customers, and payments
  useEffect(() => {
    setItems(getCatalogItems());
    setCustomers(getAllCustomers());
    setPayments(getPayments());
  }, [getAllCustomers]);

  // Auth guard
  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="nm-raised-sm flex h-14 w-14 animate-spin items-center justify-center rounded-full">
          <Package className="h-6 w-6 text-brand-deep" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const isAdmin = user.role === "admin";
  const userPlan = user.plan || (isAdmin ? "agency" : "free");
  const hasProAccess = isAdmin || userPlan === "pro" || userPlan === "agency";

  // Categories list
  const categories = [
    "all",
    "Agency & Portfolio",
    "E-Commerce",
    "Speed & Performance",
    "Elementor Addon",
    "SEO & Utilities",
  ];

  // Filtered Catalog Items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesPlan =
      planFilter === "all" ||
      (planFilter === "free" && item.planRequirement === "free") ||
      (planFilter === "paid" && item.planRequirement === "paid");
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    return matchesSearch && matchesType && matchesPlan && matchesCategory;
  });

  // Filtered Customers (Admin)
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.plan.toLowerCase().includes(customerSearch.toLowerCase()),
  );

  // Total stats
  const totalDownloads = items.reduce((acc, curr) => acc + curr.downloadsCount, 0);
  const totalThemes = items.filter((i) => i.type === "theme").length;
  const totalPlugins = items.filter((i) => i.type === "plugin").length;
  const freeItemsCount = items.filter((i) => i.planRequirement === "free").length;
  const paidItemsCount = items.filter((i) => i.planRequirement === "paid").length;
  const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

  // Personal downloaded items
  const userDownloadedTitles = user.downloadedItems ?? [];
  const myDownloadedAssets = items.filter((i) =>
    userDownloadedTitles.includes(i.title),
  );

  // Trigger real, 100% valid ZIP download
  async function triggerZipDownload(item: CatalogItem) {
    const updatedCount = incrementItemDownloads(item.id);
    recordDownload(item.title);

    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, downloadsCount: updatedCount } : i)),
    );
    setCustomers(getAllCustomers());

    try {
      toast.loading(`Preparing ${item.title} archive…`, { id: `dl-${item.id}` });
      await downloadCatalogAssetZip(item);
      toast.success(`Downloaded ${item.title}! 🎉`, {
        id: `dl-${item.id}`,
        description: "Valid WordPress zip file created. You can now upload it directly into WordPress!",
      });
    } catch (err) {
      toast.error("Failed to generate zip file.", { id: `dl-${item.id}` });
    }
  }

  // Handle Download Click
  function handleDownloadClick(item: CatalogItem) {
    const isPaidItem =
      item.planRequirement === "paid" ||
      (typeof item.price === "number" && item.price > 0);

    // STRICT PAYWALL: If user is on Free Plan, NEVER allow downloading paid items!
    if (isPaidItem && !hasProAccess) {
      toast.error(
        `🔒 "${item.title}" is a PRO asset ($${item.price || 49}). Please purchase a Pro Pass to download!`,
        { duration: 4000 },
      );
      setPaymentModalData({
        isOpen: true,
        plan: "pro",
        item: item,
        amount: item.price || 49,
      });
      setPaymentSuccessReceipt(null);
      return; // STOP! Absolutely do NOT download!
    }

    // Allowed -> trigger download directly
    triggerZipDownload(item);
  }

  // Open Payment Modal for specific plan (from Plans tab)
  function openPlanPayment(targetPlan: "pro" | "agency", price: number) {
    setPaymentModalData({
      isOpen: true,
      plan: targetPlan,
      amount: price,
    });
    setPaymentSuccessReceipt(null);
  }

  // Submit Payment Gateway Form with Strict Anti-Fraud Validation
  function handleProcessPayment(e: FormEvent) {
    e.preventDefault();

    if (paymentMethod === "bkash") {
      const cleanPhone = bkashPhone.replace(/[\s-]/g, "").trim();
      const cleanTrx = bkashTrxId.trim().toUpperCase();

      // 1. Bangladeshi Mobile Number Validation
      const bdPhoneRegex = /^01[3-9]\d{8}$/;
      if (!cleanPhone) {
        toast.error("Please enter your bKash / Nagad phone number.");
        return;
      }
      if (!bdPhoneRegex.test(cleanPhone)) {
        toast.error("Invalid mobile number. Must be a valid 11-digit Bangladeshi number (e.g. 01712345678).");
        return;
      }
      // Anti-dummy check: all digits same or trivial sequence
      const phoneDigits = cleanPhone.slice(3);
      if (/^(\d)\1+$/.test(phoneDigits) || cleanPhone === "01234567890") {
        toast.error("Invalid mobile number. Test or repeating numbers are not accepted.");
        return;
      }

      // 2. Transaction ID (TrxID) Validation
      if (!cleanTrx) {
        toast.error("Please enter the Transaction ID (TrxID) from your bKash/Nagad SMS.");
        return;
      }
      if (cleanTrx.length < 8 || cleanTrx.length > 12) {
        toast.error("Transaction ID must be 8 to 12 alphanumeric characters (e.g. BK8899XX).");
        return;
      }
      if (!/^[A-Z0-9]+$/.test(cleanTrx)) {
        toast.error("Transaction ID can only contain letters and numbers (no special characters).");
        return;
      }
      // Reject repeating characters (e.g. AAAAAAAA, 11111111)
      if (/^([A-Z0-9])\1+$/.test(cleanTrx)) {
        toast.error("Invalid TrxID. Repeating characters are not allowed.");
        return;
      }
      // Reject obvious fake/dummy strings
      const fakeSequences = [
        "12345678",
        "123456789",
        "1234567890",
        "ABCDEFGH",
        "ASDFGHJK",
        "QWERTYUI",
        "TEST1234",
        "FAKETRX",
        "BKASHTRX",
      ];
      if (fakeSequences.some((f) => cleanTrx.includes(f))) {
        toast.error("Invalid or fake Transaction ID. Please enter the genuine TrxID from your SMS.");
        return;
      }
    } else if (paymentMethod === "card") {
      const cleanCard = cardNumber.replace(/[\s-]/g, "").trim();
      if (!/^\d{16}$/.test(cleanCard)) {
        toast.error("Invalid card number. Must be exactly 16 digits.");
        return;
      }
      if (/^(\d)\1+$/.test(cleanCard) || cleanCard === "1234567812345678") {
        toast.error("Invalid card number. Test or dummy card numbers are rejected.");
        return;
      }
      const cleanExp = cardExpiry.trim();
      const matchExp = cleanExp.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
      if (!matchExp) {
        toast.error("Card expiration date must be in MM/YY format (e.g. 08/28).");
        return;
      }
      const expYear = parseInt(matchExp[2], 10);
      if (expYear < 26) {
        toast.error("Card has already expired. Please check expiration year.");
        return;
      }
      const cleanCvc = cardCvc.trim();
      if (!/^\d{3,4}$/.test(cleanCvc)) {
        toast.error("Security code (CVC) must be 3 or 4 digits.");
        return;
      }
    }

    setPaymentSubmitting(true);

    setTimeout(() => {
      let createdRec: PaymentRecord;
      const cleanPhone = bkashPhone.replace(/[\s-]/g, "").trim();
      const cleanTrx = bkashTrxId.trim().toUpperCase();

      if (paymentMethod === "bkash") {
        createdRec = createPaymentRecord({
          customerName: user.name,
          customerEmail: user.email,
          plan: paymentModalData.plan,
          itemTitle: paymentModalData.item?.title,
          amount: paymentModalData.amount,
          currency: "USD",
          method: "bkash",
          senderPhone: cleanPhone,
          trxId: cleanTrx,
          status: "approved",
        });
      } else if (paymentMethod === "card") {
        createdRec = createPaymentRecord({
          customerName: user.name,
          customerEmail: user.email,
          plan: paymentModalData.plan,
          itemTitle: paymentModalData.item?.title,
          amount: paymentModalData.amount,
          currency: "USD",
          method: "card",
          cardLast4: cardNumber.replace(/\s/g, "").slice(-4) || "4242",
          status: "approved",
        });
      } else {
        createdRec = createPaymentRecord({
          customerName: user.name,
          customerEmail: user.email,
          plan: paymentModalData.plan,
          itemTitle: paymentModalData.item?.title,
          amount: paymentModalData.amount,
          currency: "USD",
          method: "whatsapp",
          status: "approved",
        });
      }

      // Upgrade customer's membership plan in auth layer
      const activatedPlan = paymentModalData.plan === "agency" ? "agency" : "pro";
      upgradePlan(activatedPlan);

      setPayments(getPayments());
      setPaymentSubmitting(false);
      setPaymentSuccessReceipt(createdRec);

      toast.success(
        `Payment verified! Your ${activatedPlan.toUpperCase()} plan is now active! 🎉`,
      );

      // If they bought a specific asset, trigger its download immediately
      if (paymentModalData.item) {
        triggerZipDownload(paymentModalData.item);
      }
    }, 1100);
  }

  // Handle Admin Uploading New Theme / Plugin
  function handleUploadItem(e: FormEvent) {
    e.preventDefault();
    if (!uploadTitle.trim()) {
      toast.error("Please enter a theme or plugin title.");
      return;
    }

    setUploadLoading(true);
    const featuresList = uploadFeatures
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const priceNum = uploadPlanReq === "paid" ? Number(uploadPrice) || 29 : 0;

    const created = addCatalogItem({
      title: uploadTitle.trim(),
      type: uploadType,
      category: uploadCategory,
      version: uploadVersion.trim() || "1.0.0",
      description:
        uploadDescription.trim() ||
        "Custom handcrafted WordPress asset with high-performance standards.",
      features:
        featuresList.length > 0
          ? featuresList
          : [
              "Instant 1-Click Installation",
              "Mobile & SEO Optimized",
              "Fast & Lightweight",
            ],
      demoUrl: uploadDemoUrl.trim() || "/#portfolio",
      downloadUrl: uploadExternalUrl.trim()
        ? uploadExternalUrl.trim()
        : uploadFileName
        ? uploadFileName
        : `${uploadTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}-v${uploadVersion}.zip`,
      fileSize: uploadFileSize.trim() || "4.5 MB",
      badge: uploadBadge,
      planRequirement: uploadPlanReq,
      price: priceNum,
      author: user.name || "Sujon Mia",
    });

    setUploadLoading(false);
    setItems((prev) => [created, ...prev]);
    toast.success(
      `Published ${uploadType === "theme" ? "Theme" : "Plugin"}: ${uploadTitle}! 🎉`,
    );

    // Reset upload form
    setUploadTitle("");
    setUploadDescription("");
    setUploadFeatures("");
    setUploadFileName("");
    setUploadExternalUrl("");
    setActiveTab("catalog");
  }

  // Handle Admin Quick Editing an Item
  function handleSaveEditItem(e: FormEvent) {
    e.preventDefault();
    if (!editingItem) return;
    const updated = updateCatalogItem(editingItem.id, {
      title: editingItem.title,
      price: Number(editingItem.price) || 0,
      planRequirement: editingItem.planRequirement,
      version: editingItem.version,
      category: editingItem.category,
      badge: editingItem.badge,
    });
    if (updated) {
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      toast.success(`Updated "${updated.title}" successfully!`);
      setEditingItem(null);
    }
  }

  // Handle Admin Deleting an Item
  function handleDeleteItem(id: string, title: string) {
    if (confirm(`Are you sure you want to delete "${title}" from the store?`)) {
      deleteCatalogItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.info(`Removed "${title}" from catalog.`);
    }
  }

  // Handle Admin Changing a Customer's Plan
  function handleAdminChangeCustomerPlan(
    email: string,
    newPlan: "free" | "pro" | "agency",
  ) {
    adminSetCustomerPlan(email, newPlan);
    setCustomers(getAllCustomers());
    toast.success(`Updated ${email} membership plan to ${newPlan.toUpperCase()}!`);
  }

  // Handle Admin Deleting Customer
  function handleAdminDeleteCustomer(id: string, name: string) {
    if (confirm(`Are you sure you want to delete customer account "${name}"?`)) {
      deleteCustomer(id);
      setCustomers(getAllCustomers());
      toast.info(`Deleted customer ${name}.`);
    }
  }

  // Handle Admin Adding Customer Manually
  async function handleAdminAddCustomer(e: FormEvent) {
    e.preventDefault();
    if (!newCustName || !newCustEmail) {
      toast.error("Enter customer name and email.");
      return;
    }
    const res = await addCustomerByAdmin(newCustName, newCustEmail, newCustPlan);
    if (res.ok) {
      toast.success(`Customer ${newCustName} created successfully!`);
      setCustomers(getAllCustomers());
      setIsAddCustomerOpen(false);
      setNewCustName("");
      setNewCustEmail("");
    } else {
      toast.error(res.error);
    }
  }

  // Handle Admin Toggle Payment Status & Grant Plan
  function handleTogglePaymentStatus(
    payment: PaymentRecord,
    currentStatus: "approved" | "pending",
  ) {
    const nextStatus = currentStatus === "approved" ? "pending" : "approved";
    updatePaymentStatus(payment.id, nextStatus);
    if (nextStatus === "approved") {
      const planToGive = payment.plan === "agency" ? "agency" : "pro";
      adminSetCustomerPlan(payment.customerEmail, planToGive);
      toast.success(`Payment Approved! Customer upgraded to ${planToGive.toUpperCase()}! 🎉`);
    } else {
      toast.info(`Order marked as PENDING.`);
    }
    setPayments(getPayments());
    setCustomers(getAllCustomers());
  }

  // Handle Admin Delete Payment
  function handleDeletePayment(id: string) {
    deletePaymentRecord(id);
    setPayments(getPayments());
    toast.info("Payment record removed.");
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col gap-6 px-3 pb-10 pt-3 sm:px-5 sm:gap-8">
      <Header />

      <main className="w-full">
        {/* ════════════════════ 1. REFINED NEUMORPHIC TOP ROLE BANNER ════════════════════ */}
        <div
          className={`mb-4 rounded-[22px] p-4 sm:p-5 nm-raised-lg border transition-all ${
            isAdmin
              ? "bg-surface border-amber-500/30 text-foreground"
              : "bg-surface border-border/60 text-foreground"
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Left: Role identity and capabilities */}
            <div className="flex items-center gap-3.5">
              <div
                className={`h-12 w-12 rounded-[14px] flex items-center justify-center shrink-0 nm-raised ${
                  isAdmin ? "text-amber-500" : "text-brand-deep"
                }`}
              >
                {isAdmin ? <ShieldCheck className="h-6 w-6" /> : <User className="h-6 w-6" />}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-[16px] font-extrabold uppercase tracking-wider font-display text-foreground">
                    {isAdmin
                      ? "🛡️ Super Admin Control (Sujon Mia)"
                      : "👤 Customer Access (WordPress Hub)"}
                  </h2>
                  <span
                    className={`text-[10.5px] font-extrabold uppercase px-2.5 py-0.5 rounded-full nm-inset ${
                      isAdmin
                        ? "text-amber-500 font-bold"
                        : userPlan === "free"
                        ? "text-muted-foreground"
                        : "text-green-500 font-bold"
                    }`}
                  >
                    {isAdmin
                      ? "Full Control Active"
                      : userPlan === "free"
                      ? "Free Plan"
                      : "✓ Pro Pass Active"}
                  </span>
                </div>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  {isAdmin ? (
                    <span className="text-foreground/85 font-medium">
                      Admin Control: Upload handcrafted themes & plugins, manage customer accounts, approve bKash payments, and edit live items.
                    </span>
                  ) : (
                    <span>
                      Customer Portal: Browse and download 100% free themes and plugins. To download Pro items, purchase a Pro pass via bKash / Nagad or Card.
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Right: Only Admin has preview button, customer NEVER sees any switch-to-admin button! */}
            <div className="flex items-center gap-2 self-stretch md:self-auto justify-end shrink-0">
              {isAdmin ? (
                <button
                  type="button"
                  onClick={async () => {
                    sessionStorage.setItem("admin_preview_active", "true");
                    await quickLoginAs("customer");
                    toast.info("Now previewing as standard customer.");
                    setActiveTab("catalog");
                    setCustomers(getAllCustomers());
                  }}
                  className="nm-raised-sm nm-interactive px-3.5 py-2 rounded-[10px] text-[11px] font-extrabold uppercase tracking-wider text-brand-deep flex items-center gap-1.5"
                  title="Temporarily preview how customers see this portal"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview Customer View</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminAuthModalOpen(true);
                      setAdminAuthPassword("");
                      setAdminAuthError("");
                    }}
                    className="nm-raised-sm nm-interactive px-3 py-1.5 rounded-[9px] text-[11px] font-bold text-muted-foreground hover:text-amber-500 border border-border/60 flex items-center gap-1.5 hover:scale-[1.02] transition-all"
                    title="Sujon: Enter Super Admin Control"
                  >
                    <KeyRound className="h-3.5 w-3.5 text-amber-500" />
                    <span>🛡️ Admin Login</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ════════════════════ 2. PRO ACTIVE BANNER (FOR PAID CUSTOMERS) ════════════════════ */}
        {!isAdmin && hasProAccess && (
          <div className="mb-4 rounded-[16px] p-4 bg-gradient-to-r from-green-500/15 via-emerald-500/10 to-transparent border border-green-500/30 flex items-center justify-between gap-3 text-foreground nm-raised-sm">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                <CheckCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-[13px] font-extrabold uppercase tracking-wider text-green-600 dark:text-green-400">
                  ✓ Pro Membership Active on your Account!
                </h4>
                <p className="text-[11.5px] text-muted-foreground">
                  All paid themes and plugins are now 100% unlocked for you. Click "Download" on any item below!
                </p>
              </div>
            </div>
            <span className="text-[11px] font-extrabold uppercase px-3 py-1 rounded-full nm-inset text-green-500">
              Unlimited Downloads
            </span>
          </div>
        )}

        {/* ════════════════════ 3. MAIN DASHBOARD SHELL ════════════════════ */}
        <div className="relative rounded-[24px] bg-surface p-3 sm:p-6 nm-raised-lg border border-white/40 dark:border-white/5 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-start">
            {/* ════════════════════ LEFT SIDEBAR ════════════════════ */}
            <aside className="flex flex-col justify-between rounded-[18px] bg-surface p-4 nm-inset">
              {/* Brand Header */}
              <div className="mb-6 pb-4 border-b border-border/70 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-[12px] nm-raised flex items-center justify-center text-brand-deep font-display font-extrabold text-[16px]">
                    {isAdmin ? "AD" : "WP"}
                  </div>
                  <div>
                    <div className="text-[14px] font-extrabold uppercase tracking-wider text-foreground font-display">
                      SUJON <span className="text-brand-deep">HUB</span>
                    </div>
                    <div className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-muted-foreground flex items-center gap-1">
                      <span>{isAdmin ? "Admin Console" : "Customer Portal"}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileSidebarOpen((v) => !v)}
                  className="lg:hidden nm-raised-sm p-1.5 rounded-[8px] text-foreground"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation Menu */}
              <div className={`${isMobileSidebarOpen ? "block" : "hidden"} lg:block space-y-6`}>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted-foreground/80 px-2 block mb-2.5">
                    {isAdmin ? "Admin Control Tools" : "Customer Portal"}
                  </span>
                  <nav className="space-y-1.5">
                    {/* Catalog: Available to both */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("catalog");
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[12px] text-[12px] font-semibold transition-all duration-200 ${
                        activeTab === "catalog"
                          ? "nm-raised-sm text-brand-deep font-bold border-l-2 border-brand-deep"
                          : "text-foreground/75 hover:text-foreground hover:nm-raised-sm"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Package className="h-4 w-4 text-brand-deep" />
                        <span>{isAdmin ? "Store Catalog & Manage" : "Themes & Plugins"}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full nm-inset font-bold text-brand-deep">
                        {items.length}
                      </span>
                    </button>

                    {/* ────── CUSTOMER SPECIFIC TABS (NEVER VISIBLE TO ADMIN) ────── */}
                    {!isAdmin && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("my-downloads");
                            setIsMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[12px] text-[12px] font-semibold transition-all duration-200 ${
                            activeTab === "my-downloads"
                              ? "nm-raised-sm text-brand-deep font-bold border-l-2 border-brand-deep"
                              : "text-foreground/75 hover:text-foreground hover:nm-raised-sm"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <FolderDown className="h-4 w-4 text-brand-deep" />
                            <span>My Downloads</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full nm-inset font-bold text-muted-foreground">
                            {myDownloadedAssets.length}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("plans");
                            setIsMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[12px] text-[12px] font-semibold transition-all duration-200 ${
                            activeTab === "plans"
                              ? "nm-raised-sm text-brand-deep font-bold border-l-2 border-brand-deep"
                              : "text-foreground/75 hover:text-foreground hover:nm-raised-sm"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Crown className="h-4 w-4 text-brand-deep" />
                            <span>Buy Pro Pass (bKash/Card)</span>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold uppercase">
                            Pro
                          </span>
                        </button>
                      </>
                    )}

                    {/* ────── ADMIN SPECIFIC TABS (NEVER VISIBLE TO CUSTOMER) ────── */}
                    {isAdmin && (
                      <>
                        {/* Upload Tab */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("upload");
                            setIsMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[12px] text-[12px] font-semibold transition-all duration-200 ${
                            activeTab === "upload"
                              ? "nm-raised-sm text-brand-deep font-bold border-l-2 border-brand-deep"
                              : "text-foreground/75 hover:text-foreground hover:nm-raised-sm"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <UploadCloud className="h-4 w-4 text-brand-deep" />
                            <span>Upload Theme/Plugin</span>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold uppercase">
                            Upload
                          </span>
                        </button>

                        {/* Customer Database Tab */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("customers");
                            setIsMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[12px] text-[12px] font-semibold transition-all duration-200 ${
                            activeTab === "customers"
                              ? "nm-raised-sm text-brand-deep font-bold border-l-2 border-brand-deep"
                              : "text-foreground/75 hover:text-foreground hover:nm-raised-sm"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Users className="h-4 w-4 text-brand-deep" />
                            <span>Customer Database</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full nm-inset font-bold text-muted-foreground">
                            {customers.length}
                          </span>
                        </button>

                        {/* Orders & Payments Tab */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("orders");
                            setIsMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[12px] text-[12px] font-semibold transition-all duration-200 ${
                            activeTab === "orders"
                              ? "nm-raised-sm text-brand-deep font-bold border-l-2 border-brand-deep"
                              : "text-foreground/75 hover:text-foreground hover:nm-raised-sm"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Receipt className="h-4 w-4 text-brand-deep" />
                            <span>bKash Orders & Payments</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full nm-inset font-bold text-green-500">
                            {payments.length}
                          </span>
                        </button>

                        {/* Analytics Tab */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("analytics");
                            setIsMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-[12px] text-[12px] font-semibold transition-all duration-200 ${
                            activeTab === "analytics"
                              ? "nm-raised-sm text-brand-deep font-bold border-l-2 border-brand-deep"
                              : "text-foreground/75 hover:text-foreground hover:nm-raised-sm"
                          }`}
                        >
                          <LayoutDashboard className="h-4 w-4 text-brand-deep" />
                          <span>Hub Analytics</span>
                        </button>
                      </>
                    )}

                    {/* Account Settings: Available to both */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("settings");
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-[12px] text-[12px] font-semibold transition-all duration-200 ${
                        activeTab === "settings"
                          ? "nm-raised-sm text-brand-deep font-bold border-l-2 border-brand-deep"
                          : "text-foreground/75 hover:text-foreground hover:nm-raised-sm"
                      }`}
                    >
                      <Sliders className="h-4 w-4 text-brand-deep" />
                      <span>Account Settings</span>
                    </button>
                  </nav>
                </div>

                {/* Developer Direct WhatsApp */}
                <div className="pt-3 border-t border-border/60">
                  <a
                    href="https://wa.me/8801936711699?text=Hello%20Sujon,%20I%20have%20a%20question%20about%20your%20WordPress%20themes%20and%20plugins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-[10px] nm-raised-sm text-[11px] font-bold text-green-500 hover:scale-[1.02] transition-all"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Sujon</span>
                  </a>
                </div>

                {/* Logout Button */}
                <div className="pt-2">
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

            {/* ════════════════════ RIGHT MAIN CONTENT VIEWPORT ════════════════════ */}
            <div className="space-y-6">
              {/* ════════════════════ TAB: THEMES & PLUGINS CATALOG ════════════════════ */}
              {activeTab === "catalog" && (
                <div className="space-y-6">
                  {/* Search and Filters Bar */}
                  <NeumorphicCard depth="md" radius="lg" className="p-4 sm:p-5 space-y-4">
                    <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                      {/* Search box */}
                      <div className="relative w-full md:w-80">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                        <input
                          type="text"
                          placeholder="Search themes, plugins, features..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={fieldClass + " pl-9"}
                        />
                      </div>

                      {/* Filters: Type + Free/Paid */}
                      <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                        {(["all", "theme", "plugin"] as const).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTypeFilter(t)}
                            className={`px-3 py-1.5 rounded-[9px] text-[11px] font-bold uppercase tracking-wider transition-all ${
                              typeFilter === t
                                ? "nm-inset text-brand-deep font-extrabold"
                                : "nm-raised-sm text-foreground/75 hover:text-brand-deep"
                            }`}
                          >
                            {t === "all" ? "All Types" : t === "theme" ? "Themes" : "Plugins"}
                          </button>
                        ))}

                        <div className="flex items-center gap-1 border-l border-border/70 pl-2">
                          <button
                            type="button"
                            onClick={() => setPlanFilter("all")}
                            className={`px-2.5 py-1.5 rounded-[8px] text-[10.5px] font-bold uppercase ${
                              planFilter === "all"
                                ? "nm-inset text-brand-deep"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            All ({items.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setPlanFilter("free")}
                            className={`px-2.5 py-1.5 rounded-[8px] text-[10.5px] font-bold uppercase ${
                              planFilter === "free"
                                ? "nm-inset text-green-500"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            Free ({freeItemsCount})
                          </button>
                          <button
                            type="button"
                            onClick={() => setPlanFilter("paid")}
                            className={`px-2.5 py-1.5 rounded-[8px] text-[10.5px] font-bold uppercase ${
                              planFilter === "paid"
                                ? "nm-inset text-amber-500"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            Paid/Pro ({paidItemsCount})
                          </button>
                        </div>

                        {/* Admin ONLY: Upload button on catalog bar */}
                        {isAdmin && (
                          <NeumorphicButton
                            tone="brand"
                            size="sm"
                            onClick={() => setActiveTab("upload")}
                            className="ml-2"
                          >
                            <Plus className="h-3.5 w-3.5" /> Upload New
                          </NeumorphicButton>
                        )}
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px]">
                      <span className="text-muted-foreground font-bold shrink-0 flex items-center gap-1 mr-1">
                        <Filter className="h-3.5 w-3.5 text-brand-deep" /> Category:
                      </span>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategoryFilter(cat)}
                          className={`px-2.5 py-1 rounded-[7px] shrink-0 font-semibold transition-all ${
                            categoryFilter === cat
                              ? "nm-inset text-brand-deep font-bold"
                              : "nm-raised-sm text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {cat === "all" ? "All Categories" : cat}
                        </button>
                      ))}
                    </div>
                  </NeumorphicCard>

                  {/* Themes and Plugins Cards Grid */}
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredItems.length === 0 ? (
                      <div className="col-span-full py-16 text-center">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                        <h3 className="text-[16px] font-bold text-foreground">
                          No themes or plugins match your filters
                        </h3>
                        <p className="text-[12px] text-muted-foreground mt-1">
                          Try searching with different keywords or clearing your category filter.
                        </p>
                      </div>
                    ) : (
                      filteredItems.map((item) => {
                        const isTheme = item.type === "theme";
                        const isPaid =
                          item.planRequirement === "paid" ||
                          (typeof item.price === "number" && item.price > 0);
                        const isLockedForCustomer = isPaid && !hasProAccess;

                        return (
                          <NeumorphicCard
                            key={item.id}
                            depth="md"
                            radius="lg"
                            className={`p-5 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 relative ${
                              isLockedForCustomer ? "border border-amber-500/25" : ""
                            }`}
                          >
                            <div>
                              {/* Top Meta Bar */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`inline-flex items-center gap-1 rounded-[6px] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                                      isTheme
                                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                                        : "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                                    }`}
                                  >
                                    {isTheme ? (
                                      <Layers className="h-3 w-3" />
                                    ) : (
                                      <FileCode className="h-3 w-3" />
                                    )}
                                    {item.type}
                                  </span>

                                  {/* Free vs Paid Badge */}
                                  <span
                                    className={`inline-flex items-center gap-1 rounded-[6px] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                                      isLockedForCustomer
                                        ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40"
                                        : isPaid
                                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                                        : "bg-green-500/15 text-green-600 dark:text-green-400"
                                    }`}
                                  >
                                    {isLockedForCustomer ? (
                                      <>
                                        <Lock className="h-3 w-3 text-amber-500" /> LOCKED (PRO: ${item.price || 49})
                                      </>
                                    ) : isPaid ? (
                                      <>
                                        <Crown className="h-3 w-3" /> Paid (${item.price})
                                      </>
                                    ) : (
                                      <>
                                        <Check className="h-3 w-3" /> 100% Free
                                      </>
                                    )}
                                  </span>
                                </div>

                                {item.badge && (
                                  <span className="inline-flex items-center gap-1 rounded-[6px] bg-brand-deep/15 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-deep">
                                    <Sparkles className="h-2.5 w-2.5" />
                                    {item.badge}
                                  </span>
                                )}
                              </div>

                              {/* Title & Category */}
                              <h3 className="text-[15px] font-bold text-foreground group-hover:text-brand-deep transition-colors leading-snug">
                                {item.title}
                              </h3>
                              <p className="text-[11px] font-semibold text-brand-deep mt-0.5">
                                {item.category} • v{item.version}
                              </p>

                              {/* Description */}
                              <p className="mt-2.5 text-[12px] text-muted-foreground line-clamp-2 leading-relaxed font-normal">
                                {item.description}
                              </p>

                              {/* Features checklist */}
                              <div className="mt-3.5 space-y-1.5 pt-3 border-t border-border/60">
                                {item.features.slice(0, 3).map((feature, fIdx) => (
                                  <div
                                    key={fIdx}
                                    className="flex items-center gap-2 text-[11px] text-foreground/80 font-medium"
                                  >
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                                    <span className="truncate">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Card Footer: Download stats and actions */}
                            <div className="mt-5 pt-3 border-t border-border/60">
                              <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-3">
                                <span>
                                  Size:{" "}
                                  <strong className="text-foreground">{item.fileSize}</strong>
                                </span>
                                <span>
                                  <strong className="text-brand-deep">
                                    {item.downloadsCount}
                                  </strong>{" "}
                                  downloads
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                {/* CUSTOMER VIEW: Download or Buy Pro button */}
                                {isLockedForCustomer ? (
                                  <button
                                    type="button"
                                    onClick={() => handleDownloadClick(item)}
                                    className="flex-1 nm-raised-sm nm-interactive py-2.5 px-3 rounded-[10px] flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 hover:text-amber-500 border border-amber-500/40 bg-amber-500/10 shadow-sm transition-all"
                                  >
                                    <Lock className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                                    <span>🔒 Buy Pro to Download (${item.price || 49})</span>
                                  </button>
                                ) : (
                                  <NeumorphicButton
                                    tone="brand"
                                    size="sm"
                                    onClick={() => handleDownloadClick(item)}
                                    className="flex-1 justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider"
                                  >
                                    <Download className="h-3.5 w-3.5" />
                                    <span>
                                      {isPaid ? "Download (Pro Unlocked)" : "Free Download"}
                                    </span>
                                  </NeumorphicButton>
                                )}

                                <a
                                  href={item.demoUrl}
                                  target={item.demoUrl.startsWith("http") ? "_blank" : undefined}
                                  rel="noopener noreferrer"
                                  className="nm-raised-sm nm-interactive grid h-8 w-8 place-items-center rounded-[9px] text-muted-foreground hover:text-brand-deep"
                                  title="Live Demo Preview"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>

                                {/* ADMIN ONLY: Edit & Delete buttons (CUSTOMER CAN NEVER SEE THESE) */}
                                {isAdmin && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => setEditingItem(item)}
                                      className="nm-raised-sm nm-interactive grid h-8 w-8 place-items-center rounded-[9px] text-muted-foreground hover:text-brand-deep transition-colors"
                                      title="Edit price & details"
                                    >
                                      <Pencil className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteItem(item.id, item.title)}
                                      className="nm-raised-sm nm-interactive grid h-8 w-8 place-items-center rounded-[9px] text-muted-foreground hover:text-destructive transition-colors"
                                      title="Delete this asset from store"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </NeumorphicCard>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* ════════════════════ TAB: CUSTOMER MY DOWNLOADS ════════════════════ */}
              {activeTab === "my-downloads" && !isAdmin && (
                <div className="space-y-6">
                  <NeumorphicCard depth="md" radius="lg" className="p-6">
                    <div className="flex items-center justify-between pb-4 border-b border-border/70 mb-5">
                      <div>
                        <h2 className="text-[17px] font-extrabold uppercase tracking-wider text-foreground font-display">
                          My Downloaded WordPress Assets
                        </h2>
                        <p className="text-[12px] text-muted-foreground mt-0.5">
                          Assets you have downloaded. You can re-download any of them anytime.
                        </p>
                      </div>
                      <span className="nm-inset px-3 py-1 rounded-full text-[11px] font-bold text-brand-deep">
                        {myDownloadedAssets.length} Assets
                      </span>
                    </div>

                    {myDownloadedAssets.length === 0 ? (
                      <div className="py-12 text-center">
                        <FolderDown className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                        <h3 className="text-[15px] font-bold text-foreground">No downloads yet</h3>
                        <p className="text-[12px] text-muted-foreground mt-1 max-w-sm mx-auto">
                          You haven't downloaded any theme or plugin yet. Browse the store and click Free Download on any asset.
                        </p>
                        <NeumorphicButton
                          tone="brand"
                          size="sm"
                          onClick={() => setActiveTab("catalog")}
                          className="mt-4"
                        >
                          Browse Themes & Plugins
                        </NeumorphicButton>
                      </div>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2">
                        {myDownloadedAssets.map((item) => (
                          <div
                            key={item.id}
                            className="nm-raised-sm p-4 rounded-[14px] flex items-center justify-between gap-3"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-brand-deep/20 text-brand-deep">
                                  {item.type}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                  v{item.version}
                                </span>
                              </div>
                              <h4 className="text-[13px] font-bold text-foreground">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-muted-foreground">
                                Size: {item.fileSize} • {item.category}
                              </p>
                            </div>

                            <NeumorphicButton
                              tone="brand"
                              size="sm"
                              onClick={() => handleDownloadClick(item)}
                              className="shrink-0 text-[11px]"
                            >
                              <Download className="h-3 w-3" /> Re-Download
                            </NeumorphicButton>
                          </div>
                        ))}
                      </div>
                    )}
                  </NeumorphicCard>
                </div>
              )}

              {/* ════════════════════ TAB: CUSTOMER UPGRADE MEMBERSHIP PLANS ════════════════════ */}
              {activeTab === "plans" && !isAdmin && (
                <div className="space-y-6">
                  <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-deep/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-deep">
                      <Crown className="h-3.5 w-3.5" /> Flexible Developer Memberships
                    </span>
                    <h2 className="text-[24px] font-extrabold tracking-tight text-foreground font-display">
                      Unlock All Paid Themes & Plugins
                    </h2>
                    <p className="text-[12px] text-muted-foreground">
                      Upgrade to unlock our high-speed cache engines, WooCommerce checkouts, and premium addons. Instant activation via bKash / Card.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {/* Free Plan */}
                    <NeumorphicCard
                      depth="md"
                      radius="lg"
                      className={`p-6 flex flex-col justify-between ${
                        userPlan === "free" ? "border-2 border-brand-deep" : ""
                      }`}
                    >
                      <div>
                        {userPlan === "free" && (
                          <span className="inline-block mb-3 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-brand-deep/20 text-brand-deep">
                            Current Active Plan
                          </span>
                        )}
                        <h3 className="text-[18px] font-extrabold text-foreground font-display">
                          Free Community
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          For personal websites and community projects.
                        </p>
                        <div className="mt-4 flex items-baseline gap-1">
                          <span className="text-[32px] font-extrabold text-foreground font-display">
                            $0
                          </span>
                          <span className="text-[12px] text-muted-foreground">/ forever</span>
                        </div>

                        <ul className="mt-5 space-y-2.5 text-[12px] text-foreground/80">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                            <span>Access to all Free Themes & Plugins</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                            <span>Unlimited Free Downloads</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                            <span>Lifetime Demo Previews</span>
                          </li>
                          <li className="flex items-center gap-2 text-muted-foreground/60 line-through">
                            <X className="h-4 w-4 text-destructive shrink-0" />
                            <span>SpeedBooster Cache Engine</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/60">
                        <button
                          disabled
                          className="w-full py-2.5 rounded-[10px] nm-inset text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
                        >
                          {userPlan === "free" ? "Active Plan" : "Included"}
                        </button>
                      </div>
                    </NeumorphicCard>

                    {/* Pro Developer Pass */}
                    <NeumorphicCard
                      depth="lg"
                      radius="lg"
                      className={`p-6 flex flex-col justify-between relative overflow-hidden ${
                        userPlan === "pro" ? "border-2 border-brand-deep" : ""
                      }`}
                    >
                      <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-[#FF6000] to-[#F5B700] text-black font-extrabold text-[9px] uppercase tracking-wider py-1 px-12 shadow-sm">
                        Popular
                      </div>

                      <div>
                        {userPlan === "pro" && (
                          <span className="inline-block mb-3 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-brand-deep/20 text-brand-deep">
                            Current Active Plan
                          </span>
                        )}
                        <h3 className="text-[18px] font-extrabold text-foreground font-display">
                          Pro Developer Pass
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          Full access for freelance developers and online store creators.
                        </p>
                        <div className="mt-4 flex items-baseline gap-1">
                          <span className="text-[32px] font-extrabold text-brand-deep font-display">
                            $49
                          </span>
                          <span className="text-[12px] text-muted-foreground">
                            / one-time payment
                          </span>
                        </div>

                        <ul className="mt-5 space-y-2.5 text-[12px] text-foreground/80">
                          <li className="flex items-center gap-2 font-semibold">
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                            <span>Unlock ALL Paid Themes & Plugins</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                            <span>SpeedBooster Cache Engine ($29 value)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                            <span>CartPulse WooCommerce Storefront ($49 value)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                            <span>Elementor Neumorph Addons ($39 value)</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/60">
                        {userPlan === "pro" ? (
                          <div className="w-full py-2.5 rounded-[10px] nm-inset text-[11px] font-bold uppercase tracking-wider text-brand-deep text-center">
                            ✓ Currently Active
                          </div>
                        ) : (
                          <NeumorphicButton
                            tone="brand"
                            size="md"
                            onClick={() => openPlanPayment("pro", 49)}
                            className="w-full justify-center text-[11px] font-extrabold uppercase tracking-wider gap-2"
                          >
                            <CreditCard className="h-4 w-4" />
                            <span>Pay $49 (bKash / Card)</span>
                          </NeumorphicButton>
                        )}
                      </div>
                    </NeumorphicCard>

                    {/* Agency Lifetime */}
                    <NeumorphicCard
                      depth="md"
                      radius="lg"
                      className={`p-6 flex flex-col justify-between ${
                        userPlan === "agency" ? "border-2 border-brand-deep" : ""
                      }`}
                    >
                      <div>
                        {userPlan === "agency" && (
                          <span className="inline-block mb-3 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-brand-deep/20 text-brand-deep">
                            Current Active Plan
                          </span>
                        )}
                        <h3 className="text-[18px] font-extrabold text-foreground font-display">
                          Agency Lifetime
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          Full commercial rights for agency client websites + direct support.
                        </p>
                        <div className="mt-4 flex items-baseline gap-1">
                          <span className="text-[32px] font-extrabold text-foreground font-display">
                            $99
                          </span>
                          <span className="text-[12px] text-muted-foreground">/ lifetime</span>
                        </div>

                        <ul className="mt-5 space-y-2.5 text-[12px] text-foreground/80">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                            <span>Everything in Pro Developer Pass</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                            <span>Unlimited Client Projects License</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                            <span>VIP Direct WhatsApp Support with Sujon</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/60">
                        {userPlan === "agency" ? (
                          <div className="w-full py-2.5 rounded-[10px] nm-inset text-[11px] font-bold uppercase tracking-wider text-brand-deep text-center">
                            ✓ Currently Active
                          </div>
                        ) : (
                          <NeumorphicButton
                            tone="default"
                            size="md"
                            onClick={() => openPlanPayment("agency", 99)}
                            className="w-full justify-center text-[11px] font-extrabold uppercase tracking-wider gap-2"
                          >
                            <Crown className="h-4 w-4 text-brand-deep" />
                            <span>Pay $99 (bKash / Card)</span>
                          </NeumorphicButton>
                        )}
                      </div>
                    </NeumorphicCard>
                  </div>
                </div>
              )}

              {/* ════════════════════ TAB: ADMIN UPLOAD THEME / PLUGIN (ADMIN ONLY) ════════════════════ */}
              {activeTab === "upload" && isAdmin && (
                <div className="space-y-6 max-w-3xl">
                  <NeumorphicCard depth="md" radius="lg" className="p-6 sm:p-8">
                    <div className="pb-4 border-b border-border/70 mb-6">
                      <div className="inline-flex items-center gap-1.5 rounded-[6px] bg-brand-deep/15 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-deep mb-2">
                        <UploadCloud className="h-3.5 w-3.5" /> Sujon Admin Publishing Form
                      </div>
                      <h2 className="text-[20px] font-extrabold tracking-tight text-foreground font-display">
                        Upload & Publish WordPress Themes & Plugins
                      </h2>
                      <p className="text-[12px] text-muted-foreground mt-1">
                        Upload your custom themes or plugins. You can designate assets as 100% Free or Paid with a custom price.
                      </p>
                    </div>

                    <form onSubmit={handleUploadItem} className="space-y-4">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                          Theme / Plugin Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={uploadTitle}
                          onChange={(e) => setUploadTitle(e.target.value)}
                          placeholder="e.g. Apex Ultra WooCommerce Theme"
                          className={fieldClass}
                        />
                      </div>

                      {/* File Upload Simulation / Attachment */}
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                          Package ZIP File (.zip archive) *
                        </label>
                        <div className="nm-inset p-4 rounded-[12px] flex items-center justify-between gap-3">
                          <input
                            type="file"
                            accept=".zip,.tar.gz,.rar"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setUploadFileName(file.name);
                                setUploadFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
                                toast.success(`Attached file: ${file.name}`);
                              }
                            }}
                            className="text-[11.5px] file:mr-3 file:py-1.5 file:px-3 file:rounded-[8px] file:border-0 file:text-[11px] file:font-extrabold file:uppercase file:bg-brand-deep file:text-white cursor-pointer"
                          />
                          {uploadFileName && (
                            <span className="text-[11px] text-green-500 font-bold">
                              ✓ {uploadFileName} ({uploadFileSize})
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Cloud Storage / Direct Link (Solves unlimited storage) */}
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                          Or Direct Cloud Download Link (Google Drive / Cloudflare R2 / Dropbox / S3)
                        </label>
                        <input
                          type="url"
                          value={uploadExternalUrl}
                          onChange={(e) => setUploadExternalUrl(e.target.value)}
                          placeholder="https://drive.google.com/uc?export=download&id=... or https://pub-xxx.r2.dev/..."
                          className={fieldClass}
                        />
                        <p className="text-[10.5px] text-muted-foreground mt-1">
                          💡 <strong>Unlimited Space Tip:</strong> For large theme/plugin zip files (20MB–500MB), host them on your Google Drive, Dropbox, or Cloudflare R2 and paste the link here. Sujon Hub serves them without using website hosting space!
                        </p>
                      </div>

                      {/* Free vs Paid Tier Selection */}
                      <div className="p-4 rounded-[14px] nm-inset space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-brand-deep block">
                          Access Requirement & Pricing *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setUploadPlanReq("free")}
                            className={`py-2.5 px-3 rounded-[10px] text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                              uploadPlanReq === "free"
                                ? "nm-inset text-green-500 font-extrabold"
                                : "nm-raised-sm text-foreground/80"
                            }`}
                          >
                            <Check className="h-3.5 w-3.5" /> 100% Free Asset
                          </button>
                          <button
                            type="button"
                            onClick={() => setUploadPlanReq("paid")}
                            className={`py-2.5 px-3 rounded-[10px] text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                              uploadPlanReq === "paid"
                                ? "nm-inset text-amber-500 font-extrabold"
                                : "nm-raised-sm text-foreground/80"
                            }`}
                          >
                            <Crown className="h-3.5 w-3.5" /> Paid / Pro Tier
                          </button>
                        </div>

                        {uploadPlanReq === "paid" && (
                          <div className="pt-2 flex items-center gap-3">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground shrink-0">
                              Standalone Price ($ USD):
                            </label>
                            <input
                              type="number"
                              min="5"
                              max="499"
                              value={uploadPrice}
                              onChange={(e) => setUploadPrice(e.target.value)}
                              className={fieldClass + " w-32 py-1.5"}
                            />
                            <span className="text-[11px] text-muted-foreground">
                              (Included free for Pro & Agency subscribers)
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Type and Category */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                            Asset Type *
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setUploadType("theme")}
                              className={`py-2 rounded-[10px] text-[11px] font-bold uppercase tracking-wider transition-all ${
                                uploadType === "theme"
                                  ? "nm-inset text-brand-deep"
                                  : "nm-raised-sm text-foreground/80"
                              }`}
                            >
                              WordPress Theme
                            </button>
                            <button
                              type="button"
                              onClick={() => setUploadType("plugin")}
                              className={`py-2 rounded-[10px] text-[11px] font-bold uppercase tracking-wider transition-all ${
                                uploadType === "plugin"
                                  ? "nm-inset text-brand-deep"
                                  : "nm-raised-sm text-foreground/80"
                              }`}
                            >
                              WordPress Plugin
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                            Category *
                          </label>
                          <select
                            value={uploadCategory}
                            onChange={(e) =>
                              setUploadCategory(e.target.value as typeof uploadCategory)
                            }
                            className={fieldClass + " bg-surface cursor-pointer"}
                          >
                            <option value="Agency & Portfolio">Agency & Portfolio</option>
                            <option value="E-Commerce">E-Commerce</option>
                            <option value="Speed & Performance">Speed & Performance</option>
                            <option value="Elementor Addon">Elementor Addon</option>
                            <option value="SEO & Utilities">SEO & Utilities</option>
                          </select>
                        </div>
                      </div>

                      {/* Version, File Size, Badge */}
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                            Version Number
                          </label>
                          <input
                            type="text"
                            value={uploadVersion}
                            onChange={(e) => setUploadVersion(e.target.value)}
                            placeholder="e.g. 1.0.0"
                            className={fieldClass}
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                            Package File Size
                          </label>
                          <input
                            type="text"
                            value={uploadFileSize}
                            onChange={(e) => setUploadFileSize(e.target.value)}
                            placeholder="e.g. 5.2 MB"
                            className={fieldClass}
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                            Highlight Badge
                          </label>
                          <select
                            value={uploadBadge}
                            onChange={(e) =>
                              setUploadBadge(e.target.value as typeof uploadBadge)
                            }
                            className={fieldClass + " bg-surface cursor-pointer"}
                          >
                            <option value="New">New</option>
                            <option value="Featured">Featured</option>
                            <option value="Popular">Popular</option>
                            <option value="Pro Free">Pro Free</option>
                            <option value="Premium">Premium</option>
                          </select>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          value={uploadDescription}
                          onChange={(e) => setUploadDescription(e.target.value)}
                          placeholder="Brief description of the theme or plugin benefits..."
                          className={fieldClass + " resize-none"}
                        />
                      </div>

                      {/* Features List */}
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                          Key Features (One feature per line)
                        </label>
                        <textarea
                          rows={3}
                          value={uploadFeatures}
                          onChange={(e) => setUploadFeatures(e.target.value)}
                          placeholder="Core Web Vitals 95+ Score&#10;1-Click Demo Importer&#10;Responsive Gutenberg & Elementor ready"
                          className={fieldClass + " resize-none font-mono text-[11px]"}
                        />
                      </div>

                      {/* Live Demo Link */}
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                          Live Demo Preview Link (Optional)
                        </label>
                        <input
                          type="text"
                          value={uploadDemoUrl}
                          onChange={(e) => setUploadDemoUrl(e.target.value)}
                          placeholder="https://example.com/demo or /#home"
                          className={fieldClass}
                        />
                      </div>

                      <div className="pt-4 flex gap-3">
                        <NeumorphicButton
                          type="submit"
                          tone="brand"
                          size="md"
                          disabled={uploadLoading}
                          className="flex-1 justify-center"
                        >
                          <UploadCloud className="h-4 w-4" />
                          {uploadLoading ? "Publishing…" : "Publish Asset to Store"}
                        </NeumorphicButton>
                        <NeumorphicButton
                          type="button"
                          tone="default"
                          size="md"
                          onClick={() => setActiveTab("catalog")}
                        >
                          Cancel
                        </NeumorphicButton>
                      </div>
                    </form>
                  </NeumorphicCard>
                </div>
              )}

              {/* ════════════════════ TAB: ADMIN CUSTOMER DATABASE (ADMIN ONLY) ════════════════════ */}
              {activeTab === "customers" && isAdmin && (
                <div className="space-y-6">
                  {/* Customer Records Table */}
                  <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
                      <div>
                        <h2 className="text-[15px] font-extrabold uppercase tracking-wider text-foreground">
                          All Registered Customer Records ({customers.length})
                        </h2>
                        <p className="text-[11px] text-muted-foreground">
                          As Admin, you can grant Pro/Agency access to any customer directly using the dropdown.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <NeumorphicButton
                          tone="brand"
                          size="sm"
                          onClick={() => setIsAddCustomerOpen(true)}
                          className="shrink-0"
                        >
                          <UserPlus className="h-3.5 w-3.5" /> Add Customer
                        </NeumorphicButton>

                        <div className="relative w-full sm:w-56">
                          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/70" />
                          <input
                            type="text"
                            placeholder="Search customer..."
                            value={customerSearch}
                            onChange={(e) => setCustomerSearch(e.target.value)}
                            className={fieldClass + " pl-8 py-1.5 text-[11px]"}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                            <th className="py-3 px-3">Customer</th>
                            <th className="py-3 px-3">Email Address</th>
                            <th className="py-3 px-3">Grant Access (Plan)</th>
                            <th className="py-3 px-3 text-center">Downloads</th>
                            <th className="py-3 px-3">Downloaded Items</th>
                            <th className="py-3 px-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60 text-[12px]">
                          {filteredCustomers.length === 0 ? (
                            <tr>
                              <td
                                colSpan={6}
                                className="py-8 text-center text-muted-foreground text-[12px]"
                              >
                                No customer records found.
                              </td>
                            </tr>
                          ) : (
                            filteredCustomers.map((cust) => (
                              <tr key={cust.id} className="hover:bg-surface/50 transition-colors">
                                <td className="py-3.5 px-3">
                                  <div className="flex items-center gap-2.5">
                                    <div className="h-8 w-8 rounded-full nm-raised-sm flex items-center justify-center font-bold text-[11px] text-brand-deep shrink-0">
                                      {cust.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                      <p className="font-bold text-foreground leading-snug">
                                        {cust.name}
                                      </p>
                                      {cust.role === "admin" ? (
                                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold uppercase">
                                          Admin
                                        </span>
                                      ) : (
                                        <span className="text-[9px] text-muted-foreground">
                                          Joined{" "}
                                          {new Date(cust.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                          })}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </td>

                                <td className="py-3.5 px-3 font-mono text-[11.5px] text-foreground/90">
                                  <a
                                    href={`mailto:${cust.email}`}
                                    className="hover:text-brand-deep hover:underline"
                                  >
                                    {cust.email}
                                  </a>
                                </td>

                                {/* Plan Selector for Admin */}
                                <td className="py-3.5 px-3">
                                  {cust.role === "admin" ? (
                                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                                      Super Admin
                                    </span>
                                  ) : (
                                    <select
                                      value={cust.plan}
                                      onChange={(e) =>
                                        handleAdminChangeCustomerPlan(
                                          cust.email,
                                          e.target.value as "free" | "pro" | "agency",
                                        )
                                      }
                                      className="text-[11px] font-bold rounded-[8px] nm-inset px-2.5 py-1 text-foreground bg-surface cursor-pointer outline-none"
                                    >
                                      <option value="free">Free Plan</option>
                                      <option value="pro">Pro Pass ($49)</option>
                                      <option value="agency">Agency ($99)</option>
                                    </select>
                                  )}
                                </td>

                                <td className="py-3.5 px-3 text-center">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full nm-inset font-bold text-brand-deep text-[11px]">
                                    {cust.downloadsCount}
                                  </span>
                                </td>

                                <td className="py-3.5 px-3">
                                  {cust.downloadedItems && cust.downloadedItems.length > 0 ? (
                                    <div className="flex flex-wrap gap-1 max-w-xs">
                                      {cust.downloadedItems.map((itemName, idx) => (
                                        <span
                                          key={idx}
                                          className="text-[9.5px] px-1.5 py-0.5 rounded-[4px] nm-raised-sm text-foreground/80 truncate"
                                        >
                                          {itemName}
                                        </span>
                                      ))}
                                    </div>
                                  ) : (
                                    <span className="text-muted-foreground/60 text-[11px]">
                                      No downloads yet
                                    </span>
                                  )}
                                </td>

                                <td className="py-3.5 px-3 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <a
                                      href={`mailto:${cust.email}?subject=WordPress%20Themes%20from%20Sujon`}
                                      className="nm-raised-sm nm-interactive inline-flex items-center gap-1 px-2 py-1 rounded-[7px] text-[10px] font-bold text-brand-deep"
                                      title="Send Email"
                                    >
                                      <Mail className="h-3 w-3" />
                                    </a>
                                    {cust.role !== "admin" && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleAdminDeleteCustomer(cust.id, cust.name)
                                        }
                                        className="nm-raised-sm nm-interactive inline-flex items-center gap-1 px-2 py-1 rounded-[7px] text-[10px] font-bold text-destructive hover:bg-destructive/10"
                                        title="Delete Customer Account"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </NeumorphicCard>
                </div>
              )}

              {/* ════════════════════ TAB: ADMIN ORDERS & BKASH PAYMENTS (ADMIN ONLY) ════════════════════ */}
              {activeTab === "orders" && isAdmin && (
                <div className="space-y-6">
                  <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
                      <div>
                        <h2 className="text-[15px] font-extrabold uppercase tracking-wider text-foreground">
                          Customer Payment Orders & Verification ({payments.length})
                        </h2>
                        <p className="text-[11px] text-muted-foreground">
                          When a customer pays via bKash/Card, it appears here. Click "Approved" to automatically give them Pro access.
                        </p>
                      </div>

                      <span className="nm-inset px-3 py-1.5 rounded-[10px] text-[11px] font-extrabold text-green-500">
                        Total Revenue: ${totalRevenue} USD
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                            <th className="py-3 px-3">Customer</th>
                            <th className="py-3 px-3">Plan / Asset</th>
                            <th className="py-3 px-3">Amount</th>
                            <th className="py-3 px-3">Method</th>
                            <th className="py-3 px-3">Sender & TrxID</th>
                            <th className="py-3 px-3">Date</th>
                            <th className="py-3 px-3 text-center">Status (Click to Approve)</th>
                            <th className="py-3 px-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60 text-[12px]">
                          {payments.length === 0 ? (
                            <tr>
                              <td
                                colSpan={8}
                                className="py-8 text-center text-muted-foreground text-[12px]"
                              >
                                No payment orders recorded yet.
                              </td>
                            </tr>
                          ) : (
                            payments.map((p) => (
                              <tr key={p.id} className="hover:bg-surface/50 transition-colors">
                                <td className="py-3.5 px-3">
                                  <p className="font-bold text-foreground">{p.customerName}</p>
                                  <p className="text-[10px] text-muted-foreground font-mono">
                                    {p.customerEmail}
                                  </p>
                                </td>

                                <td className="py-3.5 px-3">
                                  <span className="text-[11px] font-bold uppercase text-brand-deep">
                                    {p.plan === "pro"
                                      ? "Pro Pass ($49)"
                                      : p.plan === "agency"
                                      ? "Agency Pass ($99)"
                                      : p.itemTitle || "Single Asset"}
                                  </span>
                                </td>

                                <td className="py-3.5 px-3 font-extrabold text-foreground font-display text-[13px]">
                                  ${p.amount} {p.currency}
                                </td>

                                <td className="py-3.5 px-3">
                                  <span
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                                      p.method === "bkash"
                                        ? "bg-pink-500/15 text-pink-600 dark:text-pink-400"
                                        : p.method === "nagad"
                                        ? "bg-orange-500/15 text-orange-600 dark:text-orange-400"
                                        : p.method === "card"
                                        ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                                        : "bg-green-500/15 text-green-600 dark:text-green-400"
                                    }`}
                                  >
                                    {p.method}
                                  </span>
                                </td>

                                <td className="py-3.5 px-3 font-mono text-[11px]">
                                  {p.trxId ? (
                                    <div>
                                      <p className="font-bold text-foreground">{p.trxId}</p>
                                      {p.senderPhone && (
                                        <p className="text-muted-foreground">{p.senderPhone}</p>
                                      )}
                                    </div>
                                  ) : p.cardLast4 ? (
                                    <p className="text-muted-foreground">•••• {p.cardLast4}</p>
                                  ) : (
                                    <p className="text-muted-foreground">WhatsApp Direct</p>
                                  )}
                                </td>

                                <td className="py-3.5 px-3 text-muted-foreground text-[11px] whitespace-nowrap">
                                  {new Date(p.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </td>

                                <td className="py-3.5 px-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() => handleTogglePaymentStatus(p, p.status)}
                                    className={`px-3 py-1 rounded-full text-[10.5px] font-extrabold uppercase transition-all shadow-sm ${
                                      p.status === "approved"
                                        ? "bg-green-500/20 text-green-500 border border-green-500/40"
                                        : "bg-amber-500/20 text-amber-500 border border-amber-500/40 animate-pulse"
                                    }`}
                                    title="Click to toggle status & grant Pro access"
                                  >
                                    {p.status === "approved" ? "✓ Approved (Active)" : "⏳ Pending (Click to Approve)"}
                                  </button>
                                </td>

                                <td className="py-3.5 px-3 text-right">
                                  <button
                                    type="button"
                                    onClick={() => handleDeletePayment(p.id)}
                                    className="nm-raised-sm p-1.5 rounded-[7px] text-muted-foreground hover:text-destructive"
                                    title="Delete payment record"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </NeumorphicCard>
                </div>
              )}

              {/* ════════════════════ TAB: ADMIN ANALYTICS (ADMIN ONLY) ════════════════════ */}
              {activeTab === "analytics" && isAdmin && (
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-4">
                    <NeumorphicCard depth="md" radius="lg" className="p-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                        Total Themes
                      </span>
                      <div className="text-[28px] font-extrabold text-foreground font-display mt-1">
                        <span className="text-brand-gradient">{totalThemes}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">Agency & Stores</p>
                    </NeumorphicCard>

                    <NeumorphicCard depth="md" radius="lg" className="p-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                        Total Plugins
                      </span>
                      <div className="text-[28px] font-extrabold text-foreground font-display mt-1">
                        <span className="text-brand-gradient">{totalPlugins}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">WooCommerce & Speed</p>
                    </NeumorphicCard>

                    <NeumorphicCard depth="md" radius="lg" className="p-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                        Total Downloads
                      </span>
                      <div className="text-[28px] font-extrabold text-foreground font-display mt-1">
                        <span className="text-brand-gradient">{totalDownloads}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">Customer downloads</p>
                    </NeumorphicCard>

                    <NeumorphicCard depth="md" radius="lg" className="p-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                        Total Revenue
                      </span>
                      <div className="text-[28px] font-extrabold text-foreground font-display mt-1">
                        <span className="text-brand-gradient">${totalRevenue}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">bKash & Card sales</p>
                    </NeumorphicCard>
                  </div>
                </div>
              )}

              {/* ════════════════════ TAB: SETTINGS & CREDENTIALS ════════════════════ */}
              {activeTab === "settings" && <ProfileSettings />}
            </div>
          </div>
        </div>
      </main>

      {/* ════════════════════ MODAL 1: EDIT ITEM MODAL (ADMIN ONLY) ════════════════════ */}
      {editingItem && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-[24px] bg-surface p-6 nm-raised-lg border border-white/40 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/70">
              <h3 className="text-[16px] font-extrabold text-foreground font-display">
                Edit Asset: {editingItem.title}
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="nm-raised-sm p-1.5 rounded-[8px] text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditItem} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                    Plan Tier
                  </label>
                  <select
                    value={editingItem.planRequirement}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        planRequirement: e.target.value as "free" | "paid",
                      })
                    }
                    className={fieldClass + " bg-surface"}
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                    Price ($ USD)
                  </label>
                  <input
                    type="number"
                    value={editingItem.price ?? 0}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, price: Number(e.target.value) })
                    }
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                    Version
                  </label>
                  <input
                    type="text"
                    value={editingItem.version}
                    onChange={(e) => setEditingItem({ ...editingItem, version: e.target.value })}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                    Badge
                  </label>
                  <input
                    type="text"
                    value={editingItem.badge ?? ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        badge: e.target.value as CatalogItem["badge"],
                      })
                    }
                    placeholder="e.g. Popular"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <NeumorphicButton type="submit" tone="brand" size="sm" className="flex-1 justify-center">
                  Save Changes
                </NeumorphicButton>
                <NeumorphicButton
                  type="button"
                  tone="default"
                  size="sm"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </NeumorphicButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════════════ MODAL 2: ADD CUSTOMER MANUALLY (ADMIN ONLY) ════════════════════ */}
      {isAddCustomerOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-[24px] bg-surface p-6 nm-raised-lg border border-white/40 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/70">
              <h3 className="text-[16px] font-extrabold text-foreground font-display">
                Create Customer Account
              </h3>
              <button
                type="button"
                onClick={() => setIsAddCustomerOpen(false)}
                className="nm-raised-sm p-1.5 rounded-[8px] text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAdminAddCustomer} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                  Customer Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  placeholder="e.g. Shakil Ahmed"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={newCustEmail}
                  onChange={(e) => setNewCustEmail(e.target.value)}
                  placeholder="shakil@example.com"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-muted-foreground block mb-1">
                  Membership Plan
                </label>
                <select
                  value={newCustPlan}
                  onChange={(e) =>
                    setNewCustPlan(e.target.value as "free" | "pro" | "agency")
                  }
                  className={fieldClass + " bg-surface"}
                >
                  <option value="free">Free Community</option>
                  <option value="pro">Pro Developer Pass ($49)</option>
                  <option value="agency">Agency Lifetime ($99)</option>
                </select>
              </div>

              <p className="text-[10.5px] text-muted-foreground">
                Default password for new customer: <code className="text-brand-deep font-bold">Password123!</code>
              </p>

              <div className="pt-2 flex gap-2">
                <NeumorphicButton type="submit" tone="brand" size="sm" className="flex-1 justify-center">
                  Create Customer
                </NeumorphicButton>
                <NeumorphicButton
                  type="button"
                  tone="default"
                  size="sm"
                  onClick={() => setIsAddCustomerOpen(false)}
                >
                  Cancel
                </NeumorphicButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════════════ MODAL 3: PAYMENT GATEWAY (BKASH / CARD / WHATSAPP) ════════════════════ */}
      {paymentModalData.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-[24px] bg-surface p-6 sm:p-7 nm-raised-lg border border-white/40 dark:border-white/10 space-y-5 my-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-border/70">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-[14px] nm-raised flex items-center justify-center text-amber-500">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500 block">
                    SECURE PAYMENT & INSTANT ACCESS
                  </span>
                  <h3 className="text-[18px] font-extrabold text-foreground font-display">
                    {paymentModalData.item
                      ? `Unlock ${paymentModalData.item.type === "theme" ? "Theme" : "Plugin"}`
                      : paymentModalData.plan === "pro"
                      ? "Unlock Pro Pass"
                      : "Unlock Agency License"}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  setPaymentModalData({ ...paymentModalData, isOpen: false })
                }
                className="nm-raised-sm p-1.5 rounded-[8px] text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* If payment just succeeded, show receipt and instant download */}
            {paymentSuccessReceipt ? (
              <div className="space-y-4 py-2 text-center">
                <div className="h-16 w-16 mx-auto rounded-full bg-green-500/20 text-green-500 nm-raised flex items-center justify-center">
                  <CheckCheck className="h-8 w-8" />
                </div>
                <h4 className="text-[18px] font-extrabold text-foreground font-display">
                  Payment Verified & Pro Plan Active! 🎉
                </h4>
                <p className="text-[12px] text-muted-foreground">
                  Your payment has been recorded. All paid themes & plugins are now completely unlocked on your account!
                </p>

                <div className="nm-inset p-4 rounded-[14px] text-left space-y-2 text-[12px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order ID:</span>
                    <span className="font-mono font-bold text-foreground">
                      {paymentSuccessReceipt.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-extrabold text-amber-500">
                      ${paymentSuccessReceipt.amount} {paymentSuccessReceipt.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span className="font-bold uppercase text-foreground">
                      {paymentSuccessReceipt.method}
                    </span>
                  </div>
                  {paymentSuccessReceipt.trxId && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transaction ID (TrxID):</span>
                      <span className="font-mono font-bold text-foreground">
                        {paymentSuccessReceipt.trxId}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <NeumorphicButton
                    tone="brand"
                    size="md"
                    onClick={() => {
                      setPaymentModalData({ ...paymentModalData, isOpen: false });
                      setActiveTab("catalog");
                    }}
                    className="w-full justify-center text-[12px] font-extrabold uppercase tracking-wider"
                  >
                    Start Downloading Pro Assets Now
                  </NeumorphicButton>
                </div>
              </div>
            ) : (
              /* Payment Checkout Form */
              <form onSubmit={handleProcessPayment} className="space-y-4">
                {/* Price summary */}
                <div className="nm-inset p-3.5 rounded-[14px] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-muted-foreground block">
                      Payable Amount:
                    </span>
                    <span className="text-[24px] font-extrabold text-amber-500 font-display">
                      ${paymentModalData.amount} USD
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full bg-green-500/15 text-green-500">
                    INSTANT DOWNLOAD ACCESS
                  </span>
                </div>

                {/* Payment Method Selector Tabs */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                    Select Payment Method *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("bkash")}
                      className={`py-2.5 px-2 rounded-[10px] text-[11px] font-bold uppercase transition-all flex flex-col items-center justify-center gap-1 ${
                        paymentMethod === "bkash"
                          ? "nm-inset text-rose-500 font-extrabold border border-rose-500/30"
                          : "nm-raised-sm text-foreground/80 hover:text-foreground"
                      }`}
                    >
                      <span className="text-[10px] font-extrabold text-rose-500">BD</span>
                      <span>bKash / Nagad</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`py-2.5 px-2 rounded-[10px] text-[11px] font-bold uppercase transition-all flex flex-col items-center justify-center gap-1 ${
                        paymentMethod === "card"
                          ? "nm-inset text-amber-500 font-extrabold border border-amber-500/30"
                          : "nm-raised-sm text-foreground/80 hover:text-foreground"
                      }`}
                    >
                      <CreditCard className="h-4 w-4 text-amber-500" />
                      <span>Card (Stripe)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("whatsapp")}
                      className={`py-2.5 px-2 rounded-[10px] text-[11px] font-bold uppercase transition-all flex flex-col items-center justify-center gap-1 ${
                        paymentMethod === "whatsapp"
                          ? "nm-inset text-green-500 font-extrabold border border-green-500/30"
                          : "nm-raised-sm text-foreground/80 hover:text-foreground"
                      }`}
                    >
                      <MessageCircle className="h-4 w-4 text-green-500" />
                      <span>WhatsApp Pay</span>
                    </button>
                  </div>
                </div>

                {/* Method 1: bKash / Nagad Details */}
                {paymentMethod === "bkash" && (
                  <div className="nm-inset p-4 rounded-[14px] space-y-3 text-[12px]">
                    <div className="flex items-center justify-between pb-2 border-b border-border/70">
                      <div>
                        <p className="font-bold text-foreground">
                          Sujon's bKash / Nagad Number (Personal):
                        </p>
                        <p className="font-mono text-[16px] font-extrabold text-amber-500">
                          01936711699
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText("01936711699");
                          toast.success("Copied 01936711699 to clipboard!");
                        }}
                        className="nm-raised-sm p-2 rounded-[8px] text-muted-foreground hover:text-foreground text-[10px] font-bold flex items-center gap-1"
                      >
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </button>
                    </div>

                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Please send money (Send Money) to <strong>01936711699</strong> via bKash or Nagad. Then enter your sender number and Transaction ID (TrxID) below:
                    </p>

                    <div className="space-y-2">
                      <input
                        type="text"
                        required
                        value={bkashPhone}
                        onChange={(e) => setBkashPhone(e.target.value)}
                        placeholder="Your bKash / Nagad Number (e.g. 01712345678)"
                        className={fieldClass}
                      />
                      <input
                        type="text"
                        required
                        value={bkashTrxId}
                        onChange={(e) => setBkashTrxId(e.target.value)}
                        placeholder="Transaction ID (TrxID e.g. BK8899XX)"
                        className={fieldClass}
                      />
                    </div>
                  </div>
                )}

                {/* Method 2: Credit / Debit Card Details */}
                {paymentMethod === "card" && (
                  <div className="nm-inset p-4 rounded-[14px] space-y-3">
                    <p className="text-[11px] text-muted-foreground">
                      Enter card details to complete payment:
                    </p>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number (4242 •••• •••• 4242)"
                      className={fieldClass}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / YY"
                        className={fieldClass}
                      />
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC / CVV"
                        className={fieldClass}
                      />
                    </div>
                  </div>
                )}

                {/* Method 3: WhatsApp Pay Details */}
                {paymentMethod === "whatsapp" && (
                  <div className="nm-inset p-4 rounded-[14px] space-y-3 text-center">
                    <p className="text-[12px] text-muted-foreground">
                      Prefer direct manual payment or live consultation? Chat with Sujon Mia on WhatsApp:
                    </p>
                    <a
                      href={`https://wa.me/8801936711699?text=Hello%20Sujon,%20I%20want%20to%20pay%20$${
                        paymentModalData.amount
                      }%20for%20${encodeURIComponent(
                        paymentModalData.item?.title || paymentModalData.plan,
                      )}%20(Account:%20${encodeURIComponent(user.email)})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[12px] bg-green-500 text-white text-[12px] font-extrabold uppercase hover:scale-[1.02] transition-all shadow-md"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Chat on WhatsApp (+8801936711699)</span>
                    </a>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={paymentSubmitting}
                    className="w-full py-3.5 rounded-[12px] nm-raised nm-interactive font-extrabold text-[12px] uppercase tracking-wider text-amber-500 flex items-center justify-center gap-2 border border-amber-500/30 hover:scale-[1.01] transition-all bg-surface"
                  >
                    {paymentSubmitting ? (
                      "Verifying Payment…"
                    ) : (
                      <>
                        <Zap className="h-4 w-4 text-amber-500" />
                        <span>CONFIRM PAYMENT & ACTIVATE INSTANT ACCESS</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════ ADMIN LOGIN / UNLOCK MODAL ════════════════════ */}
      {isAdminAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-[24px] bg-surface p-6 shadow-2xl border border-border/80 nm-raised relative">
            <button
              onClick={() => setIsAdminAuthModalOpen(false)}
              className="nm-raised-sm nm-interactive absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 flex items-center gap-3">
              <div className="h-12 w-12 rounded-[14px] nm-raised text-amber-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-[17px] font-extrabold uppercase tracking-tight text-foreground font-display">
                  Super Admin Access
                </h3>
                <p className="text-[11.5px] text-muted-foreground">
                  Authenticate as Sujon Mia (Site Owner & Developer)
                </p>
              </div>
            </div>

            <div className="mb-4 nm-inset rounded-[14px] p-3.5 space-y-1 text-[11.5px]">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-bold">Admin Email:</span>
                <span className="font-mono font-extrabold text-foreground">sujonofficial3090@gmail.com</span>
              </div>
            </div>

            {adminAuthError && (
              <div className="mb-4 nm-inset rounded-[10px] px-3.5 py-2.5 text-[11px] font-semibold text-destructive">
                {adminAuthError}
              </div>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!adminAuthPassword.trim()) {
                  setAdminAuthError("Please enter the admin password.");
                  return;
                }
                setAdminAuthLoading(true);
                setAdminAuthError("");
                const result = await login("sujonofficial3090@gmail.com", adminAuthPassword.trim(), true);
                setAdminAuthLoading(false);
                if (result.ok) {
                  toast.success("Welcome back, Super Admin Sujon!");
                  setIsAdminAuthModalOpen(false);
                  setAdminAuthPassword("");
                  setActiveTab("catalog");
                  setCustomers(getAllCustomers());
                } else {
                  setAdminAuthError("Incorrect admin password. Only Sujon Mia (sujonofficial3090@gmail.com) has admin rights.");
                }
              }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  Enter Admin Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={adminAuthPassword}
                  onChange={(e) => setAdminAuthPassword(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <NeumorphicButton
                  type="submit"
                  tone="brand"
                  size="md"
                  disabled={adminAuthLoading}
                  className="w-full justify-center text-[12px] font-extrabold uppercase tracking-wider py-2.5"
                >
                  {adminAuthLoading ? "Verifying…" : "Unlock Super Admin Access"}
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
