"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import React, { useState, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { getSupabaseClient, logoutSupabase } from "../../../../lib/supabase";

import { TUser } from "@/app/types";

import useCheckTokens from "@/app/hooks/useCheckTokens";

import { Button } from "@/app/components/Button";
import { FormInput } from "@/app/components/Form/Input";

export const ProfileView = () => {
  const methods = useForm<TUser>({
    mode: "onBlur",
    defaultValues: {
      username: "",
      location: "",
      email: "",
    },
  });
  const router = useRouter();
  const t = useTranslations("Profile");
  const { logout, user, ready, authenticated } = usePrivy();
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();

  const [currentUser, setCurrentUser] = useState<TUser>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const onSubmit: SubmitHandler<TUser> = async (data) => {
    try {
      if (isAccessTokenValid) {
        const supabase = await getSupabaseClient();
        const { error } = await supabase
          .from("users")
          .update({
            username: data.username,
            location: data.location,
            email: data.email,
          })
          .eq("id", user?.id);

        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleLogout() {
    logout();
    logoutSupabase();
    router.push("/");
  }

  useEffect(() => {
    async function getUser() {
      if (!user) return;
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", user.id);
      if (data) setCurrentUser(data[0]);
    }
    if (isAccessTokenValid) getUser();
  }, [user, isAccessTokenValid]);

  if (!ready) return null;

  if (ready && !authenticated) {
    router.push("/");
  }

  if (!isRefreshTokenValid) {
    logoutSupabase();
    logout();
    router.push("/");
  }

  if (!currentUser) return null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold mb-6">{t("heading")}</h3>
        <div className="sm:col-span-4 mt-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address
          </label>
          <p className="text-sm">{currentUser.address!}</p>
        </div>
        <div className="sm:col-span-4 mt-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Phone
          </label>
          <p>{currentUser.phone_number!}</p>
        </div>
        <FormInput
          {...register("username", {
            value: currentUser.username!,
          })}
          label="Name"
          required
          error={errors.username && errors.username.message}
        />
        <FormInput
          {...register("location", {
            value: currentUser.location!,
          })}
          label="Location"
          required
          error={errors.location && errors.location.message}
        />
        <FormInput
          {...register("email", { value: currentUser.email! })}
          label="Email"
          required
          error={errors.email && errors.email.message}
        />
        <Button
          type="submit"
          label={t("submitButton")}
          disabled={!isValid || isSubmitting}
        />
        <Button
          label={t("logoutButton")}
          onClick={handleLogout}
          disabled={isSubmitting}
        />
      </form>
    </FormProvider>
  );
};
