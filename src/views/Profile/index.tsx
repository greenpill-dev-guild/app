"use client";

import React from "react";
import * as yup from "yup";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { PhoneIcon, WalletIcon } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { getSupabaseClient, logoutSupabase } from "@/modules/supabase";

import { useApp } from "@/providers/AppProvider";
import useCheckTokens from "@/hooks/useCheckTokens";

import { Button } from "@/components/Button";
import { FormInput } from "@/components/Form/Input";
import { shortenAddress } from "@/utils/text";

interface ProfileFormValues {
  location?: string;
  email?: string;
  profile_image?: string;
}

const schema = yup.object<ProfileFormValues>().shape({
  location: yup.string().max(50),
  email: yup.string().email("Please provide a recognized email"),
  profile_image: yup.string().url("Please provide a valid URL"),
});

export const ProfileView = () => {
  const methods = useForm<ProfileFormValues>({
    defaultValues: {
      location: "",
      email: "",
      profile_image: "",
    },
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const t = useTranslations("Profile");
  const { logout, user, ready, authenticated } = usePrivy();

  const { userMap } = useApp();
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();

  const currentUser = userMap.get(user?.id!);

  const avatar = currentUser?.profile_image || "/icons/avatar.png";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    try {
      if (isAccessTokenValid) {
        const supabase = await getSupabaseClient();
        const { error } = await supabase
          .from("users")
          .update({
            location: data.location,
            email: data.email,
          })
          .eq("id", currentUser?.id!);

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
      <form
        className="w-full pt-6 px-4 flex flex-col items-center gap-2 h-full overflow-y-scroll"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <Image
            className="w-32 h-32 rounded-full"
            src={avatar}
            alt="avatar"
            width={120}
            height={120}
          />
          <p>{currentUser.username!}</p>
        </div>
        <div className="flex gap-2">
          <WalletIcon />
          <p className="text-sm">{shortenAddress(currentUser.address!)}</p>
        </div>
        <div className="flex gap-2">
          <PhoneIcon />
          <p>{currentUser.phone_number ?? "+1 xxx-xxx-xxxx"}</p>
        </div>
        <FormInput
          {...register("location", {
            value: currentUser.location!,
          })}
          label="Location"
          className="w-full"
          error={errors.location && errors.location.message}
        />
        <FormInput
          {...register("email", { value: currentUser.email! })}
          label="Email"
          className="w-full"
          error={errors.email && errors.email.message}
        />
        <FormInput
          {...register("profile_image", { value: currentUser.profile_image! })}
          label="Profile Image"
          className="w-full"
          error={errors.profile_image && errors.profile_image.message}
        />
        <div className="w-full flex flex-col gap-4">
          <Button
            type="submit"
            label={t("submitButton")}
            disabled={!isValid || isSubmitting}
            fullWidth
          />
          <Button
            label={t("logoutButton")}
            onClick={handleLogout}
            disabled={isSubmitting}
            style="outline"
            fullWidth
          />
        </div>
      </form>
    </FormProvider>
  );
};
