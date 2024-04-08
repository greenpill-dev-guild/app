"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import { getSupabaseClient, logoutSupabase } from "../../../../lib/supabase";

import { TUser } from "@/app/types";

import useCheckTokens from "@/app/hooks/useCheckTokens";

import { Button } from "@/app/components/Button";
import { FormInput } from "@/app/components/Form/Input";

interface OnboardingUser extends TUser {}

export const OnboardingView = () => {
  const router = useRouter();
  const t = useTranslations("Onboarding");
  const methods = useForm<OnboardingUser>({
    mode: "onBlur",
    defaultValues: {
      username: "",
      location: "",
      email: "",
    },
  });
  const { user, ready, authenticated, logout } = usePrivy();
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = methods;

  if (!ready) return null;

  if (ready && !authenticated) {
    router.push("/");
  }

  if (!isRefreshTokenValid) {
    logoutSupabase();
    logout();
    router.push("/");
  }

  const onSubmit: SubmitHandler<TUser> = async (data) => {
    try {
      if (isAccessTokenValid) {
        const supabase = await getSupabaseClient();
        const { error } = await supabase
          .from("users")
          .update({
            username: data.username,
            location: data.location,
            phone_number: user?.phone?.number,
            email: data.email,
            onboarded: true,
          })
          .eq("id", user?.id);
        router.push(`/proposals/`);
        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-bold mb-6 text-center">{t("heading")}</h2>
        <FormInput
          {...register("username", {
            required: "Given Name required",
          })}
          label="Username"
          error={errors.username && errors.username.message}
          placeholder={t("username")}
        />
        <FormInput
          {...register("location", {
            required: "Village or Neighborhood is required",
          })}
          label="Location"
          error={errors.location && errors.location.message}
          placeholder={t("location")}
        />
        <FormInput
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          label="Email"
          error={errors.email && errors.email.message}
          placeholder={t("email")}
        />
        <p className="text-center text-xs italic mb-6">{t("disclaimer")}</p>
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
