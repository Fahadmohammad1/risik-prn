"use client"

// ── Auth client ────────────────────────────────────────────────
// Backed by the Express API (risik-prn-server) instead of better-auth.
// Keeps the same call shapes the pages already use:
//   signIn.email({ email, password }) -> { data, error }
//   signOut()
//   useSession() -> { data, isPending }

import { useEffect, useState } from "react"
import {
  apiFetch,
  clearSession,
  getStoredUser,
  getToken,
  setSession,
  type AuthUser,
} from "./api"

interface AuthResult {
  data: { token: string; user: AuthUser } | null
  error: { message: string } | null
}

// ── signIn ─────────────────────────────────────────────────────

export const signIn = {
  async email({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<AuthResult> {
    try {
      const data = await apiFetch<{ token: string; user: AuthUser }>(
        "/auth/login",
        { method: "POST", body: JSON.stringify({ email, password }) },
      )
      setSession(data.token, data.user)
      return { data, error: null }
    } catch (err) {
      const message =
        (err as { message?: string })?.message ?? "Sign in failed. Please try again."
      return { data: null, error: { message } }
    }
  },
}

// ── signUp (accounts are provisioned by an administrator) ───────

export const signUp = {
  async email(_input: {
    email: string
    password: string
    name: string
  }): Promise<AuthResult> {
    return {
      data: null,
      error: {
        message:
          "Accounts are created by an administrator. Please contact your administrator for access.",
      },
    }
  },
}

// ── signOut ────────────────────────────────────────────────────

export async function signOut(): Promise<void> {
  try {
    if (getToken()) await apiFetch("/auth/logout", { method: "POST" })
  } catch {
    /* best-effort — clear locally regardless */
  }
  clearSession()
}

// ── useSession ─────────────────────────────────────────────────

export interface Session {
  user: AuthUser
}

export function useSession(): { data: Session | null; isPending: boolean } {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    function sync() {
      setUser(getStoredUser())
      setIsPending(false)
    }
    sync()
    window.addEventListener("risik-auth-change", sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener("risik-auth-change", sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  return { data: user ? { user } : null, isPending }
}

export const authClient = { signIn, signUp, signOut, useSession }
