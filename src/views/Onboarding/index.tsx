"use client";

import * as yup from "yup";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import { publicClient } from "@/modules/viem";
import { getSupabaseClient, logoutSupabase } from "@/modules/supabase";

import { useApp } from "@/app/providers/AppProvider";
import useCheckTokens from "@/app/hooks/useCheckTokens";

import { Button } from "@/app/components/Button";
import { FormInput } from "@/app/components/Form/Input";

interface OnboardingFormValues {
  username: string;
  location?: string;
  email?: string;
  profile_image?: string;
}

const schema = yup.object<OnboardingFormValues>().shape({
  username: yup.string().required("Username is required").min(2).max(27),
  location: yup.string().max(50),
  email: yup.string().email("Please provide a recognized email"),
});

export const OnboardingView = () => {
  const router = useRouter();
  const { wallets } = useWallets();
  const t = useTranslations("Onboarding");
  const methods = useForm<OnboardingFormValues>({
    defaultValues: {
      username: "",
      location: "",
      email: "",
      profile_image: "",
    },
    resolver: yupResolver(schema),
  });
  const { user: privyUser, ready, authenticated, logout } = usePrivy();

  const { user } = useApp();
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const onSubmit: SubmitHandler<OnboardingFormValues> = async (data) => {
    try {
      if (isAccessTokenValid) {
        const supabase = await getSupabaseClient();
        const { error } = await supabase
          .from("users")
          .update({
            username: data.username,
            location: data.location,
            phone_number: privyUser?.phone?.number,
            email: data.email,
            onboarded: true,
          })
          .eq("id", user?.id!);

        router.push(`/proposals/`);

        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (user) {
          setValue("username", user.username!);
          setValue("location", user.location!);
          setValue("email", user.email!);
          setValue("profile_image", user.profile_image!);
        }

        if (wallets.length && wallets[0].address) {
          const ensName = await publicClient.getEnsName({
            address: wallets[0].address as `0x${string}`,
          });

          if (ensName) {
            setValue("username", user?.username ?? ensName);

            const ensAvatar = await publicClient.getEnsAvatar({
              name: ensName,
            });

            setValue("profile_image", user?.profile_image ?? ensAvatar!);
          }
        }
      } catch (error) {
        console.error("Error fetching ENS", error);
      }
    }

    fetchProfile();
  }, [user, wallets, setValue]);

  if (!ready) return null;

  if (ready && !authenticated) {
    router.push("/");
  }

  if (!isRefreshTokenValid) {
    logoutSupabase();
    logout();
    router.push("/");
  }

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-2 pt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <h2 className="font-bold text-3xl">{t("heading")}</h2>
          <p>Get started with a few basic details.</p>
        </div>
        <FormInput
          {...register("username")}
          label="Username"
          error={errors.username && errors.username.message}
          placeholder={t("username")}
        />
        <FormInput
          {...register("location")}
          label="Location"
          error={errors.location && errors.location.message}
          placeholder={t("location")}
        />
        <FormInput
          {...register("email")}
          label="Email"
          error={errors.email && errors.email.message}
          placeholder={t("email")}
        />
        <FormInput
          {...register("profile_image")}
          label="Profile Image"
          placeholder={t("profileImage")}
          error={errors.profile_image && errors.profile_image.message}
        />
        <p className="text-center text-xs italic mt-2 mb-6">
          {t("disclaimer")}
        </p>
        <Button
          type="submit"
          label={t("submitButton")}
          fullWidth
          disabled={!isValid || isSubmitting}
        />
      </form>
    </FormProvider>
  );
};
