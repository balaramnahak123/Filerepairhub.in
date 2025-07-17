"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

interface SubscriptionStatus {
  hasSubscription: boolean
  planName: string | null
  endDate: string | null
  daysRemaining: number
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  userRole: "admin" | "user" | null
  isAdmin: boolean
  subscriptionStatus: SubscriptionStatus | null
  hasActiveSubscription: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
  updateUserRole: (userId: string, role: "admin" | "user") => Promise<{ error: any }>
  getUserRole: (userId: string) => Promise<{ role: "admin" | "user" | null; error: any }>
  purchaseSubscription: (planId: string) => Promise<{ error: any }>
  cancelSubscription: () => Promise<{ error: any }>
  refreshSubscriptionStatus: () => Promise<void>
  isConfigured: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const configured = isSupabaseConfigured()
  const [userRole, setUserRole] = useState<"admin" | "user" | null>(null)
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null)
  const isAdmin = userRole === "admin"
  const hasActiveSubscription = subscriptionStatus?.hasSubscription || false

  useEffect(() => {
    if (!configured || !supabase) {
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [configured])

  useEffect(() => {
    if (user && configured && supabase) {
      getUserRole(user.id).then(({ role }) => {
        setUserRole(role)
      })
      refreshSubscriptionStatus()
    } else {
      setUserRole(null)
      setSubscriptionStatus(null)
    }
  }, [user, configured])

  const refreshSubscriptionStatus = async () => {
    if (!user || !configured || !supabase) return

    try {
      const { data, error } = await supabase.rpc("get_user_subscription_status", {
        user_uuid: user.id,
      })

      if (!error && data && data.length > 0) {
        const status = data[0]
        setSubscriptionStatus({
          hasSubscription: status.has_subscription,
          planName: status.plan_name,
          endDate: status.end_date,
          daysRemaining: status.days_remaining,
        })
      } else {
        setSubscriptionStatus({
          hasSubscription: false,
          planName: null,
          endDate: null,
          daysRemaining: 0,
        })
      }
    } catch (error) {
      console.error("Error fetching subscription status:", error)
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!configured || !supabase) {
      return { error: { message: "Authentication not configured" } }
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!configured || !supabase) {
      return { error: { message: "Authentication not configured" } }
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    return { error }
  }

  const signOut = async () => {
    if (!configured || !supabase) return
    await supabase.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    if (!configured || !supabase) {
      return { error: { message: "Authentication not configured" } }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error }
  }

  const updateUserRole = async (userId: string, role: "admin" | "user") => {
    if (!configured || !supabase) {
      return { error: { message: "Authentication not configured" } }
    }

    const { error } = await supabase.from("user_roles").upsert({ user_id: userId, role: role })
    return { error }
  }

  const getUserRole = async (userId: string) => {
    if (!configured || !supabase) {
      return { role: null, error: { message: "Authentication not configured" } }
    }

    const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId).single()
    return { role: data?.role || "user", error }
  }

  const purchaseSubscription = async (planId: string) => {
    if (!configured || !supabase || !user) {
      return { error: { message: "Authentication not configured" } }
    }

    // In a real app, this would integrate with payment processor
    // For demo, we'll simulate successful purchase
    const { error } = await supabase.from("user_subscriptions").insert({
      user_id: user.id,
      plan_id: planId,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      is_active: true,
      payment_status: "completed",
    })

    if (!error) {
      await refreshSubscriptionStatus()
    }

    return { error }
  }

  const cancelSubscription = async () => {
    if (!configured || !supabase || !user) {
      return { error: { message: "Authentication not configured" } }
    }

    const { error } = await supabase
      .from("user_subscriptions")
      .update({ is_active: false })
      .eq("user_id", user.id)
      .eq("is_active", true)

    if (!error) {
      await refreshSubscriptionStatus()
    }

    return { error }
  }

  const value = {
    user,
    session,
    loading,
    userRole,
    isAdmin,
    subscriptionStatus,
    hasActiveSubscription,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateUserRole,
    getUserRole,
    purchaseSubscription,
    cancelSubscription,
    refreshSubscriptionStatus,
    isConfigured: configured,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
