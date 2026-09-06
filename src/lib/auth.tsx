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
  createdAt: string;
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
  createdAt: string;
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
  return { id: r.id, name: r.name, email: r.email, role: r.role, createdAt: r.createdAt };
}

// ─── Seed demo account on first load ────────────────────────────────────────

async function seedDemoAccount(): Promise<void> {
  const users = loadUsers();
  if (users.some((u) => u.email === "demo@sujon.dev")) return;

  const salt = randomHex(16);
  const passwordHash = await deriveHash("Password123!", salt);
  const demo: UserRecord = {
    id: randomHex(8),
    name: "Demo User",
    email: "demo@sujon.dev",
    role: "user",
    createdAt: new Date().toISOString(),
    passwordHash,
    salt,
  };
  saveUsers([...users, demo]);
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
      const users = loadUsers();
      const record = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
      if (!record) return { ok: false, error: "Invalid email or password." };

      const hash = await deriveHash(password, record.salt);
      if (hash !== record.passwordHash) return { ok: false, error: "Invalid email or password." };

      const sessionUser = toSessionUser(record);
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
        role: "user",
        createdAt: new Date().toISOString(),
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

  const value = useMemo(
    () => ({ user, isLoading, login, register, logout, updateProfile, changePassword }),
    [user, isLoading, login, register, logout, updateProfile, changePassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
