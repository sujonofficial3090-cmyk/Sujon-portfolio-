/**
 * payments.ts — Payment & Orders Management for Themes, Plugins & Membership Plans.
 *
 * Persisted in localStorage so Sujon (Admin) can oversee and verify payments,
 * and customers can submit real payment details (bKash, Nagad, Card, WhatsApp).
 */

export interface PaymentRecord {
  id: string;
  customerName: string;
  customerEmail: string;
  plan: "pro" | "agency" | "single_asset";
  itemTitle?: string;
  amount: number;
  currency: "USD" | "BDT";
  method: "bkash" | "nagad" | "card" | "whatsapp";
  senderPhone?: string;
  trxId?: string;
  cardLast4?: string;
  status: "approved" | "pending";
  createdAt: string;
}

const PAYMENTS_KEY = "sujon_payments_records";

const DEFAULT_PAYMENTS: PaymentRecord[] = [
  {
    id: "pay-101",
    customerName: "Furqan Ashiq (Pro Dev)",
    customerEmail: "furqan.agency@yahoo.com",
    plan: "pro",
    amount: 49,
    currency: "USD",
    method: "bkash",
    senderPhone: "01711234567",
    trxId: "BK89X77Q2",
    status: "approved",
    createdAt: "2026-02-28T10:15:00.000Z",
  },
  {
    id: "pay-102",
    customerName: "Tariq Al-Mansoor",
    customerEmail: "tariq.dev@gmail.com",
    plan: "agency",
    amount: 99,
    currency: "USD",
    method: "card",
    cardLast4: "4242",
    status: "approved",
    createdAt: "2026-03-03T19:00:00.000Z",
  },
  {
    id: "pay-103",
    customerName: "Ahsan Jilani",
    customerEmail: "ahsan.jilani@gmail.com",
    plan: "single_asset",
    itemTitle: "SpeedBooster Cache & Critical CSS Engine",
    amount: 29,
    currency: "USD",
    method: "nagad",
    senderPhone: "01822334455",
    trxId: "NG54H09L",
    status: "approved",
    createdAt: "2026-03-04T11:20:00.000Z",
  },
];

export function getPayments(): PaymentRecord[] {
  if (typeof window === "undefined") return DEFAULT_PAYMENTS;
  try {
    const raw = localStorage.getItem(PAYMENTS_KEY);
    if (!raw) {
      localStorage.setItem(PAYMENTS_KEY, JSON.stringify(DEFAULT_PAYMENTS));
      return DEFAULT_PAYMENTS;
    }
    return JSON.parse(raw) as PaymentRecord[];
  } catch {
    return DEFAULT_PAYMENTS;
  }
}

export function savePayments(records: PaymentRecord[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify(records));
}

export function createPaymentRecord(
  data: Omit<PaymentRecord, "id" | "createdAt">
): PaymentRecord {
  const all = getPayments();
  const newRecord: PaymentRecord = {
    ...data,
    id: `pay-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newRecord, ...all];
  savePayments(updated);
  return newRecord;
}

export function updatePaymentStatus(
  id: string,
  newStatus: "approved" | "pending"
): void {
  const all = getPayments();
  const updated = all.map((p) => (p.id === id ? { ...p, status: newStatus } : p));
  savePayments(updated);
}

export function deletePaymentRecord(id: string): void {
  const all = getPayments();
  savePayments(all.filter((p) => p.id !== id));
}
