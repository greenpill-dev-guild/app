"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import React, { useState, useEffect } from "react";

import { getSupabaseClient } from "@/modules/supabase";

import { Splash } from "@/app/components/Splash";

const supabaseAuth = async (address: string, userId: string) => {
  await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address,
      userId,
    }),
  });
};

export const Login = () => {
  const router = useRouter();
  const t = useTranslations("Login");
  const { login, logout, authenticated, user, ready } = usePrivy();

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const startLogin = () => {
    setIsLoggingIn(true);
    login();
  };

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (ready && authenticated && user && user.wallet?.address) {
        await supabaseAuth(user.wallet.address, user.id);

        const supabase = await getSupabaseClient();
        const { data, error } = await supabase
          .from("users")
          .select("onboarded")
          .eq("id", user.id)
          .single();
        if (error) {
          logout();

          throw error;
        }
        if (data.onboarded) {
          router.push(`/proposals`);
        } else {
          router.push(`/onboarding`);
        }
      }
    };

    checkOnboardingStatus();
  }, [ready, authenticated, user, router, logout]);

  return (
    <Splash
      login={startLogin}
      isLoggingIn={isLoggingIn}
      buttonLabel={t("loginButton")}
    />
  );
};
