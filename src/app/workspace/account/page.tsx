"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useResellerAccount";

export default function AccountPage() {
  const { user, login, register, logout, loading, isAuthenticated } = useAuth();
  const [registerMode, setRegisterMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    try {
      if (registerMode) await register(name, email, password, workspaceName);
      else await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    }
  };

  return (
    <main className="ws-detail">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-slate-500">RESELLERPRO / ACCOUNT</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{isAuthenticated ? "Account." : "Your workspace."}</h1>
          <p className="mt-2 text-slate-500">Secure HTTP-only customer session with workspace-scoped data.</p>
        </div>
        <Link href="/workspace" className="rounded-lg border px-4 py-2 text-sm">Workspace</Link>
      </header>

      {isAuthenticated && user ? (
        <section className="mt-8 max-w-2xl rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Signed in</p>
          <h2 className="mt-2 text-xl font-semibold">{user.name || user.email}</h2>
          <p className="mt-1 text-sm text-slate-500">{user.email}</p>
          <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">{user.workspaceName}</p>
          <div className="mt-5 flex gap-2">
            <Link href="/workspace/analytics" className="rounded-lg bg-slate-950 px-4 py-2 text-sm text-white">Open BI</Link>
            <button onClick={() => void logout()} className="rounded-lg border px-4 py-2 text-sm">Sign out</button>
          </div>
        </section>
      ) : (
        <section className="mt-8 max-w-lg rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex gap-2">
            <button className={`rounded-full px-3 py-1 text-sm ${!registerMode ? "bg-slate-950 text-white" : "border"}`} onClick={() => setRegisterMode(false)}>Sign in</button>
            <button className={`rounded-full px-3 py-1 text-sm ${registerMode ? "bg-slate-950 text-white" : "border"}`} onClick={() => setRegisterMode(true)}>Create account</button>
          </div>

          <div className="mt-6 space-y-3">
            {registerMode && <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full rounded-lg border px-3 py-2" />}
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full rounded-lg border px-3 py-2" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (10+ characters)" type="password" className="w-full rounded-lg border px-3 py-2" />
            {registerMode && <input value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} placeholder="Workspace name (optional)" className="w-full rounded-lg border px-3 py-2" />}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button disabled={loading} onClick={() => void submit()} className="w-full rounded-lg bg-slate-950 px-4 py-3 text-sm font-medium text-white disabled:opacity-50">
              {registerMode ? "Create workspace" : "Sign in"}
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
