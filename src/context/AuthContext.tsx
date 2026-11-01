"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  auth,
  clearStoredToken,
  setStoredToken,
} from "@/lib/api";
import type {
  AuthRegisterRequestDTO,
  UserProfileResponseDTO,
} from "@/types/api";

interface AuthContextValue {
  user: UserProfileResponseDTO | null;
  isLoading: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: AuthRegisterRequestDTO) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfileResponseDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("rainbow-academy-token")) {
      const timeoutId = window.setTimeout(() => setIsLoading(false), 0);
      return () => window.clearTimeout(timeoutId);
    }

    auth
      .getMe()
      .then(setUser)
      .catch(() => {
        clearStoredToken();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const response = await auth.login({ username, password });
    setStoredToken(response.jwt);
    setUser(await auth.getMe());
  }, []);

  const register = useCallback(async (data: AuthRegisterRequestDTO) => {
    const response = await auth.register(data);
    setStoredToken(response.jwt);
    setUser(await auth.getMe());
  }, []);

  const logout = useCallback(() => {
    clearStoredToken();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isTeacher: Boolean(
        user?.roles.some((role) => role === "ROLE_TEACHER" || role === "TEACHER"),
      ),
      isStudent: Boolean(
        user?.roles.some((role) => role === "ROLE_STUDENT" || role === "STUDENT"),
      ),
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider.");
  return context;
}
