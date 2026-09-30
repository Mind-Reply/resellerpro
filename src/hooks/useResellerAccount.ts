"use client";

import { useCallback, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name: string | null;
  profileComplete?: boolean;
  workspaceId: string;
  workspaceName: string;
};

type Plan = {
  id: string;
  name: string;
  monthlyPrice: number | null;
  currency: string;
  headline: string;
  checkoutAvailable: boolean;
};

async function request<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.error || "Request failed.");
  return data as T;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const result = await request<{ authenticated: boolean; user: User | null }>("/api/account/me");
      setUser(result.user);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const result = await request<{ user: User }>("/api/account/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setUser(result.user);
    return result.user;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, workspaceName?: string) => {
    const result = await request<{ user: User }>("/api/account/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, workspaceName }),
    });
    setUser(result.user);
    return result.user;
  }, []);

  const logout = useCallback(async () => {
    await request("/api/account/logout", { method: "POST" });
    setUser(null);
  }, []);

  return { token: null, user, login, register, logout, refresh, loading, isLoading: loading, isAuthenticated: Boolean(user) };
}

export function useSubscription() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const planResult = await request<{ plans: Plan[] }>("/api/billing/plans");
      setPlans(planResult.plans);
    } catch {
      setPlans([]);
    }

    try {
      const subscriptionResult = await request<{ subscription: any }>("/api/billing/subscription");
      setSubscription(subscriptionResult.subscription);
    } catch {
      setSubscription(null);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const createCheckout = useCallback(async (input: {
    planId: "starter" | "growth" | "enterprise";
    returnUrl?: string;
  }) => {
    setIsCheckingOut(true);
    try {
      const result = await request<{ url: string | null }>("/api/billing/checkout", {
        method: "POST",
        body: JSON.stringify({
          planId: input.planId,
          returnUrl: input.returnUrl || window.location.href,
        }),
      });
      if (result.url) window.location.assign(result.url);
      return result;
    } finally {
      setIsCheckingOut(false);
    }
  }, []);

  return { plans, subscription, refetchSubscription: refresh, createCheckout, isCheckingOut };
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);

  const refetchTransactions = useCallback(async () => {
    try {
      const result = await request<{ transactions: any[] }>("/api/transactions?offset=" + offset + "&limit=50");
      setTransactions(result.transactions);
    } catch {
      setTransactions([]);
    }
  }, [offset]);

  useEffect(() => { void refetchTransactions(); }, [refetchTransactions]);

  const getTransaction = useCallback(async (id: string) => {
    return request<any>("/api/transactions/" + encodeURIComponent(id));
  }, []);

  return { transactions, refetchTransactions, getTransaction, offset, setOffset };
}

export function useAnalytics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setData(await request<any>("/api/analytics/summary"));
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  return { data, loading, refresh };
}
