"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { loginWithGoogle } from "@/lib/firebase";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  authProvider: "local" | "google";
  avatar?: string;
  createdAt?: string;
}

export type AuthModalView = "login" | "signup" | "forgot";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalView: AuthModalView;
  openLoginModal: () => void;
  openSignupModal: () => void;
  openForgotModal: () => void;
  closeAuthModal: () => void;
  setAuthModalView: (view: AuthModalView) => void;
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  signup: (payload: { name: string; email: string; password: string }) => Promise<{ success: boolean; error?: string; rawToken?: string }>;
  logout: () => Promise<void>;
  loginWithGooglePopup: () => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<AuthModalView>("login");

  // Fetch current user from /api/auth/me (validates session cookie)
  const refreshUser = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", {
        headers: { "Cache-Control": "no-cache" },
      });
      const data = await response.json();
      if (response.ok && data.success && data.data?.user) {
        setUser(data.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const openLoginModal = useCallback(() => {
    setAuthModalView("login");
    setIsAuthModalOpen(true);
  }, []);

  const openSignupModal = useCallback(() => {
    setAuthModalView("signup");
    setIsAuthModalOpen(true);
  }, []);

  const openForgotModal = useCallback(() => {
    setAuthModalView("forgot");
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  // Standard email/password login
  const login = async (credentials: { email: string; password: string }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Login failed" };
      }

      setUser(data.data.user);
      closeAuthModal();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error. Please try again." };
    }
  };

  // Standard registration
  const signup = async (payload: { name: string; email: string; password: string }) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Signup failed" };
      }

      return {
        success: true,
        rawToken: data.data?.preview?.rawToken,
      };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error. Please try again." };
    }
  };

  // Firebase Google OAuth popup
  const loginWithGooglePopup = async () => {
    try {
      const { session } = await loginWithGoogle();
      if (session.success && session.data?.user) {
        setUser(session.data.user);
        closeAuthModal();
        return { success: true };
      }
      return { success: false, error: session.error || "Google authentication failed" };
    } catch (err: any) {
      // Gracefully handle user cancelling or closing the popup
      if (err.code === "auth/popup-closed-by-user" || err.code === "auth/cancelled-popup-request") {
        return { success: false, error: "Google sign-in popup was cancelled." };
      }
      return { success: false, error: err.message || "Google sign-in failed." };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Continue even if network error
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthModalOpen,
        authModalView,
        openLoginModal,
        openSignupModal,
        openForgotModal,
        closeAuthModal,
        setAuthModalView,
        login,
        signup,
        logout,
        loginWithGooglePopup,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
