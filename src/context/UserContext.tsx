// src/context/UserContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

type UserData = {
  firstName: string;
  email: string;
};

type UserContextValue = {
  userData: UserData;
  setUserData: (d: Partial<UserData> | ((prev: UserData) => UserData)) => void;
  reset: () => void;
};

const defaultUser: UserData = { firstName: "", email: "" };

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserDataRaw] = useState<UserData>(() => {
    // hydrate from localStorage if available
    try {
      const raw = localStorage.getItem("JB_USER");
      return raw ? JSON.parse(raw) : defaultUser;
    } catch {
      return defaultUser;
    }
  });

  const setUserData = (v: Partial<UserData> | ((p: UserData) => UserData)) => {
    setUserDataRaw((prev) => {
      const next = typeof v === "function" ? v(prev) : { ...prev, ...v };
      try {
        localStorage.setItem("JB_USER", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const reset = () => {
    setUserDataRaw(defaultUser);
    try {
      localStorage.removeItem("JB_USER");
    } catch {}
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, reset }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextValue => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
