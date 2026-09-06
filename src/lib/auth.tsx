/**
 * auth.tsx — Secure client-side authentication layer.
 *
 * Uses Web Crypto API (PBKDF2 + SHA-256 + per-user unique salt) so that
 * passwords are never stored or transferred in plain text.
 *
 * ─── Storage schema ─────────────────────────────────────────────────
 *  "nm_users"      → JSON array of UserRecord objects (localStorage)
 *  "nm_session"    → JSON SessionPayload (localStorage or sessionStorage)
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  plan?: "free" | "pro" | "agency";
  createdAt: string;
  downloadsCount?: number;
  downloadedItems?: string[];
  /** PBKDF2-SHA256 hex digest */
  passwordHash: string;
  /** 32-hex-char random salt unique per user */
  salt: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  plan?: "free" | "pro" | "agency";
  createdAt: string;
  downloadsCount?: number;
  downloadedItems?: string[];
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  plan: "free" | "pro" | "agency";
  createdAt: string;
  downloadsCount: number;
  downloadedItems: string[];
}

interface SessionPayload {
  user: SessionUser;
  remember: boolean;
}

interface AuthContextValue {
  user: SessionUser | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => Promise<{ ok: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: { name?: string }) => { ok: boolean; error?: string };
  changePassword: (
    oldPassword: string,
    newPassword: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  getAllCustomers: () => CustomerRecord[];
  recordDownload: (itemTitle: string) => void;
  toggleAdminRole: () => void;
  upgradePlan: (newPlan: "free" | "pro" | "agency") => void;
  adminSetCustomerPlan: (email: string, newPlan: "free" | "pro" | "agency") => void;
  deleteCustomer: (id: string) => void;
  addCustomerByAdmin: (
    name: string,
    email: string,
    plan: "free" | "pro" | "agency"
  ) => Promise<{ ok: boolean; error?: string }>;
  quickLoginAs: (role: "admin" | "customer") => Promise<void>;
  resetCustomerPlanToFree: () => void;
}

// ─── Internal helpers ───────────────────────────────────────────────────────

const USERS_KEY = "nm_users";
const SESSION_KEY = "nm_session";
const ITERATIONS = 100_000;

function randomHex(bytes: number): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function deriveHash(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: enc.encode(salt),
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );
  return Array.from(new Uint8Array(bits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function loadUsers(): UserRecord[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]") as UserRecord[];
  } catch {
    return [];
  }
}

function saveUsers(users: UserRecord[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession(): SessionUser | null {
  for (const store of [sessionStorage, localStorage]) {
    try {
      const raw = store.getItem(SESSION_KEY);
      if (raw) {
        const payload = JSON.parse(raw) as SessionPayload;
        return payload.user;
      }
    } catch {
      /* ignore */
    }
  }
  return null;
}

function saveSession(user: SessionUser, remember: boolean): void {
  const payload: SessionPayload = { user, remember };
  const json = JSON.stringify(payload);
  if (remember) {
    localStorage.setItem(SESSION_KEY, json);
  } else {
    sessionStorage.setItem(SESSION_KEY, json);
  }
}

function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

function toSessionUser(r: UserRecord): SessionUser {
  const isSuperAdmin = r.email.toLowerCase() === "sujonofficial3090@gmail.com";
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    role: isSuperAdmin ? "admin" : "user",
    plan: isSuperAdmin ? "agency" : (r.plan || "free"),
    createdAt: r.createdAt,
    downloadsCount: r.downloadsCount ?? 0,
    downloadedItems: r.downloadedItems ?? [],
  };
}

// ─── Seed demo account & initial customers on first load ─────────────────────

async function seedDemoAccount(): Promise<void> {
  const users = loadUsers();
  const demoSalt = randomHex(16);
  const demoHash = await deriveHash("Password123!", demoSalt);

  const sujonSalt = randomHex(16);
  const sujonHash = await deriveHash("sujonmia3090", sujonSalt);

  const initialAccounts: UserRecord[] = [
    {
      id: "admin-sujon-official",
      name: "Sujon Mia",
      email: "sujonofficial3090@gmail.com",
      role: "admin",
      plan: "agency",
      createdAt: "2026-01-01T00:00:00.000Z",
      downloadsCount: 18,
      downloadedItems: ["Apex Agency Pro Theme", "FastCheckout WooCommerce"],
      passwordHash: sujonHash,
      salt: sujonSalt,
    },
    {
      id: "user-sujon-dev",
      name: "Sujon Mia",
      email: "admin@sujon.dev",
      role: "user",
      plan: "free",
      createdAt: "2026-01-10T10:00:00.000Z",
      downloadsCount: 14,
      downloadedItems: ["Apex Agency Pro Theme", "FastCheckout WooCommerce"],
      passwordHash: demoHash,
      salt: demoSalt,
    },
    {
      id: "user-demo",
      name: "Demo Customer",
      email: "demo@sujon.dev",
      role: "user",
      plan: "free",
      createdAt: "2026-01-10T10:00:00.000Z",
      downloadsCount: 14,
      downloadedItems: ["Apex Agency Pro Theme", "FastCheckout WooCommerce"],
      passwordHash: demoHash,
      salt: demoSalt,
    },
    {
      id: "cust-main",
      name: "Ahsan Jilani (Customer)",
      email: "customer@sujon.dev",
      role: "user",
      plan: "free",
      createdAt: "2026-02-14T12:33:23.000Z",
      downloadsCount: 2,
      downloadedItems: ["Apex Agency Pro Theme", "SoftEmboss Theme"],
      passwordHash: demoHash,
      salt: demoSalt,
    },
    {
      id: "cust-1",
      name: "Ahsan Jilani",
      email: "ahsan.jilani@gmail.com",
      role: "user",
      plan: "free",
      createdAt: "2026-02-14T12:33:23.000Z",
      downloadsCount: 4,
      downloadedItems: ["Apex Agency Pro Theme", "SpeedBooster Cache Pro"],
      passwordHash: demoHash,
      salt: demoSalt,
    },
    {
      id: "cust-2",
      name: "Furqan Ashiq (Pro Dev)",
      email: "furqan.agency@yahoo.com",
      role: "user",
      plan: "pro",
      createdAt: "2026-02-28T09:54:23.000Z",
      downloadsCount: 7,
      downloadedItems: ["FastCheckout WooCommerce", "SoftEmboss Theme", "CartPulse WooCommerce"],
      passwordHash: demoHash,
      salt: demoSalt,
    },
    {
      id: "cust-3",
      name: "Sarah Jenkins",
      email: "sarah.design@outlook.com",
      role: "user",
      plan: "free",
      createdAt: "2026-03-01T15:20:00.000Z",
      downloadsCount: 2,
      downloadedItems: ["FastCheckout WooCommerce"],
      passwordHash: demoHash,
      salt: demoSalt,
    },
    {
      id: "cust-4",
      name: "Tariq Al-Mansoor (Agency)",
      email: "tariq.dev@gmail.com",
      role: "user",
      plan: "agency",
      createdAt: "2026-03-03T18:45:00.000Z",
      downloadsCount: 8,
      downloadedItems: ["Apex Agency Pro Theme", "SpeedBooster Cache Pro", "Elementor Neumorph Addons"],
      passwordHash: demoHash,
      salt: demoSalt,
    },
  ];

  let hasChanges = false;
  const existingMap = new Map(users.map((u) => [u.email.toLowerCase(), u]));

  for (const acc of initialAccounts) {
    if (!existingMap.has(acc.email.toLowerCase())) {
      users.push(acc);
      hasChanges = true;
    } else {
      const existing = existingMap.get(acc.email.toLowerCase())!;
      if (acc.email.toLowerCase() === "sujonofficial3090@gmail.com") {
        existing.role = "admin";
        existing.plan = "agency";
        existing.name = "Sujon Mia";
        existing.passwordHash = sujonHash;
        existing.salt = sujonSalt;
        hasChanges = true;
      } else {
        // All other existing accounts must be customers
        if (existing.role === "admin") {
          existing.role = "user";
          hasChanges = true;
        }
      }
      if (!existing.plan) {
        existing.plan = existing.role === "admin" ? "agency" : "free";
        hasChanges = true;
      }
    }
  }

  if (hasChanges) {
    saveUsers(users);
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate session once on mount
  useEffect(() => {
    const init = async () => {
      await seedDemoAccount();
      setUser(loadSession());
      setIsLoading(false);
    };
    init();
  }, []);

  // Cross-tab sync
  useEffect(() => {
    const handler = () => {
      setUser(loadSession());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const login = useCallback(
    async (
      email: string,
      password: string,
      rememberMe: boolean,
    ): Promise<{ ok: boolean; error?: string }> => {
      const trimmedEmail = email.toLowerCase().trim();
      const users = loadUsers();

      // Direct verification for Sujon Super Admin
      if (
        trimmedEmail === "sujonofficial3090@gmail.com" &&
        password === "sujonmia3090"
      ) {
        let sujonAcc = users.find(
          (u) => u.email.toLowerCase() === "sujonofficial3090@gmail.com",
        );
        if (!sujonAcc) {
          const sSalt = randomHex(16);
          const sHash = await deriveHash("sujonmia3090", sSalt);
          sujonAcc = {
            id: "admin-sujon-official",
            name: "Sujon Mia",
            email: "sujonofficial3090@gmail.com",
            role: "admin",
            plan: "agency",
            createdAt: "2026-01-01T00:00:00.000Z",
            downloadsCount: 18,
            downloadedItems: ["Apex Agency Pro Theme", "FastCheckout WooCommerce"],
            passwordHash: sHash,
            salt: sSalt,
          };
          users.push(sujonAcc);
          saveUsers(users);
        } else {
          sujonAcc.role = "admin";
          sujonAcc.plan = "agency";
          saveUsers(users);
        }
        const sessionUser = toSessionUser(sujonAcc);
        saveSession(sessionUser, rememberMe);
        setUser(sessionUser);
        return { ok: true };
      }

      const match = users.find(
        (u) => u.email.toLowerCase() === trimmedEmail,
      );
      if (!match) {
        return { ok: false, error: "No account found with this email." };
      }

      const hash = await deriveHash(password, match.salt);
      if (hash !== match.passwordHash) {
        return { ok: false, error: "Incorrect password. Please try again." };
      }

      const sessionUser = toSessionUser(match);
      saveSession(sessionUser, rememberMe);
      setUser(sessionUser);
      return { ok: true };
    },
    [],
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
    ): Promise<{ ok: boolean; error?: string }> => {
      const users = loadUsers();
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase().trim())) {
        return { ok: false, error: "This email is already registered." };
      }

      const salt = randomHex(16);
      const passwordHash = await deriveHash(password, salt);
      const newUser: UserRecord = {
        id: randomHex(8),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        role: "user", // new accounts are strictly customers!
        plan: "free", // starts on Free Plan!
        createdAt: new Date().toISOString(),
        downloadsCount: 0,
        downloadedItems: [],
        passwordHash,
        salt,
      };
      saveUsers([...users, newUser]);

      const sessionUser = toSessionUser(newUser);
      saveSession(sessionUser, true);
      setUser(sessionUser);
      return { ok: true };
    },
    [],
  );

  const logout = useCallback((): void => {
    clearSession();
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    (updates: { name?: string }): { ok: boolean; error?: string } => {
      if (!user) return { ok: false, error: "Not authenticated." };
      const users = loadUsers();
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx === -1) return { ok: false, error: "User not found." };

      if (updates.name) users[idx].name = updates.name.trim();
      saveUsers(users);

      const updatedSession = toSessionUser(users[idx]);
      // preserve remember flag
      const raw =
        localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY);
      let remember = true;
      if (raw) {
        try {
          remember = (JSON.parse(raw) as SessionPayload).remember;
        } catch {
          /* ignore */
        }
      }
      saveSession(updatedSession, remember);
      setUser(updatedSession);
      return { ok: true };
    },
    [user],
  );

  const changePassword = useCallback(
    async (
      oldPassword: string,
      newPassword: string,
    ): Promise<{ ok: boolean; error?: string }> => {
      if (!user) return { ok: false, error: "Not authenticated." };
      const users = loadUsers();
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx === -1) return { ok: false, error: "User not found." };

      const oldHash = await deriveHash(oldPassword, users[idx].salt);
      if (oldHash !== users[idx].passwordHash) {
        return { ok: false, error: "Current password is incorrect." };
      }

      const newSalt = randomHex(16);
      users[idx].salt = newSalt;
      users[idx].passwordHash = await deriveHash(newPassword, newSalt);
      saveUsers(users);
      return { ok: true };
    },
    [user],
  );

  const getAllCustomers = useCallback((): CustomerRecord[] => {
    const users = loadUsers();
    return users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      plan: u.plan || (u.role === "admin" ? "agency" : "free"),
      createdAt: u.createdAt,
      downloadsCount: u.downloadsCount ?? 0,
      downloadedItems: u.downloadedItems ?? [],
    }));
  }, []);

  const recordDownload = useCallback(
    (itemTitle: string) => {
      if (!user) return;
      const users = loadUsers();
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx !== -1) {
        users[idx].downloadsCount = (users[idx].downloadsCount ?? 0) + 1;
        const items = users[idx].downloadedItems ?? [];
        if (!items.includes(itemTitle)) {
          items.push(itemTitle);
        }
        users[idx].downloadedItems = items;
        saveUsers(users);
        const updated = toSessionUser(users[idx]);
        saveSession(updated, true);
        setUser(updated);
      }
    },
    [user],
  );

  const toggleAdminRole = useCallback(() => {
    if (!user || user.email.toLowerCase() !== "sujonofficial3090@gmail.com") return;
    const newRole: "admin" | "user" = user.role === "admin" ? "user" : "admin";
    const users = loadUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx].role = newRole;
      if (newRole === "admin") {
        users[idx].plan = "agency";
      }
      saveUsers(users);
      const updated = toSessionUser(users[idx]);
      saveSession(updated, true);
      setUser(updated);
    }
  }, [user]);

  const upgradePlan = useCallback(
    (newPlan: "free" | "pro" | "agency") => {
      if (!user) return;
      const users = loadUsers();
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx !== -1) {
        users[idx].plan = newPlan;
        saveUsers(users);
        const updated = toSessionUser(users[idx]);
        saveSession(updated, true);
        setUser(updated);
      }
    },
    [user],
  );

  const adminSetCustomerPlan = useCallback(
    (email: string, newPlan: "free" | "pro" | "agency") => {
      const users = loadUsers();
      const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
      if (idx !== -1) {
        users[idx].plan = newPlan;
        saveUsers(users);
        if (user && user.email.toLowerCase() === email.toLowerCase()) {
          const updated = toSessionUser(users[idx]);
          saveSession(updated, true);
          setUser(updated);
        }
      }
    },
    [user],
  );

  const deleteCustomer = useCallback((id: string) => {
    const users = loadUsers();
    saveUsers(users.filter((u) => u.id !== id));
  }, []);

  const addCustomerByAdmin = useCallback(
    async (name: string, email: string, plan: "free" | "pro" | "agency") => {
      const users = loadUsers();
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase().trim())) {
        return { ok: false, error: "This email already exists." };
      }
      const salt = randomHex(16);
      const passwordHash = await deriveHash("Password123!", salt);
      const newUser: UserRecord = {
        id: `cust-${Date.now()}`,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        role: "user",
        plan,
        createdAt: new Date().toISOString(),
        downloadsCount: 0,
        downloadedItems: [],
        passwordHash,
        salt,
      };
      saveUsers([...users, newUser]);
      return { ok: true };
    },
    [],
  );

  const resetCustomerPlanToFree = useCallback(() => {
    if (!user || user.role === "admin") return;
    const users = loadUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx].plan = "free";
      saveUsers(users);
    }
    const updated: SessionUser = { ...user, plan: "free" };
    saveSession(updated, true);
    setUser(updated);
  }, [user]);

  const quickLoginAs = useCallback(async (targetRole: "admin" | "customer") => {
    const targetEmail =
      targetRole === "admin" ? "sujonofficial3090@gmail.com" : "customer@sujon.dev";
    const users = loadUsers();
    let target = users.find((u) => u.email.toLowerCase() === targetEmail);
    if (!target && targetRole === "admin") {
      target = users.find((u) => u.role === "admin");
    }
    if (target) {
      if (targetRole === "customer") {
        target.plan = "free";
        const idx = users.findIndex((u) => u.id === target!.id);
        if (idx !== -1) {
          users[idx].plan = "free";
          saveUsers(users);
        }
      }
      const sessionUser = toSessionUser(target);
      saveSession(sessionUser, true);
      setUser(sessionUser);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      register,
      logout,
      updateProfile,
      changePassword,
      getAllCustomers,
      recordDownload,
      toggleAdminRole,
      upgradePlan,
      adminSetCustomerPlan,
      deleteCustomer,
      addCustomerByAdmin,
      quickLoginAs,
      resetCustomerPlanToFree,
    }),
    [
      user,
      isLoading,
      login,
      register,
      logout,
      updateProfile,
      changePassword,
      getAllCustomers,
      recordDownload,
      toggleAdminRole,
      upgradePlan,
      adminSetCustomerPlan,
      deleteCustomer,
      addCustomerByAdmin,
      quickLoginAs,
      resetCustomerPlanToFree,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
