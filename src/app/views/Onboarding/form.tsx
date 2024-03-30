import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import { TUser } from "@/app/types";

import { getSupabaseClient } from "../../../../lib/supabase";

import useCheckTokens from "../../hooks/useCheckTokens";
import { ImageUploader } from "../../components/Image/Uploader";

type UserFormType = {
  id: string;
  givenName: string | null;
  familyName: string | null;
  villageNeighborhood: string | null;
  email?: string | null;
  avatar?: string;
};

export default function OnboardingForm({
  currentUser,
}: {
  currentUser: TUser;
}) {
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();
  const router = useRouter();
  const queryString = new URLSearchParams(window.location.search);
  const t = useTranslations("Onboarding");
  console.log("user", currentUser);
  const isUpdateForm = () => {
    let result = false;
    if (queryString.has("update")) {
      if (queryString.get("update") === "true") {
        result = true;
      }
    }
    return result;
  };

  const methods = useForm<UserFormType>({
    mode: "onBlur",
    defaultValues: {
      givenName: isUpdateForm() ? currentUser?.name : "",
      familyName: isUpdateForm() ? currentUser?.family_name : "",
      villageNeighborhood: isUpdateForm()
        ? currentUser?.village_neighborhood
        : "",
      email: isUpdateForm() ? currentUser?.email : "",
      avatar: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = methods;

  const onSubmit: SubmitHandler<UserFormType> = async (data) => {
    try {
      if (isAccessTokenValid) {
        const supabase = await getSupabaseClient();
        const { error } = await supabase
          .from("users")
          .update({
            name: data.givenName,
            family_name: data.familyName,
            village_neighborhood: data.villageNeighborhood,
            phone_number: currentUser?.phone_number,
            email: data.email,
            onboarded: true,
          })
          .eq("id", currentUser?.id);
        if (isUpdateForm()) {
          router.push(`/settings`);
        } else {
          router.push(`/proposals/`);
        }
        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const inputClasses = "w-full border border-slate-300 rounded h-10 pl-2 mb-6";
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold mb-6">{t("heading")}</h3>
        <h3 className="font-bold text-sm mb-2">{t("profileImage")}</h3>
        <ImageUploader />
        <span className="text-red-600 text-xs">
          {" "}
          {errors.givenName && errors.givenName.message}
        </span>
        <label className="text-sm">{t("firstName")}</label>
        <input
          className={inputClasses}
          placeholder={t("firstName")}
          {...register("givenName", { required: "Given Name required" })}
        />
        <span className="text-red-600 text-xs">
          {" "}
          {errors.familyName && errors.familyName.message}
        </span>
        <label className="text-sm">{t("lastName")}</label>
        <input
          className={inputClasses}
          placeholder={t("lastName")}
          {...register("familyName", { required: "Last Name required" })}
        />
        <span className="text-red-600 text-xs">
          {" "}
          {errors.villageNeighborhood && errors.villageNeighborhood.message}
        </span>
        <label className="text-sm">{t("location")}</label>
        <input
          className={inputClasses}
          placeholder={t("location")}
          {...register("villageNeighborhood", {
            required: "Village or Neighborhood is required",
          })}
        />
        <span className="text-red-600 text-xs">
          {" "}
          {errors.email && errors.email.message}
        </span>
        <label className="text-sm">{t("email")}</label>
        <input
          type="email"
          className={inputClasses}
          placeholder={t("email")}
          {...register("email")}
        />
        <p className="text-center text-xs italic mb-6">{t("disclaimer")}</p>
        <button
          className="w-full border border-slate-400 rounded leading-10 font-bold disabled:opacity-50"
          type="submit"
          disabled={!isValid}
        >
          {t("submitButton")}
          {isSubmitting ||
            (isSubmitted && (
              <svg
                aria-hidden="true"
                className="absolute right-0 top-1 w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ))}
        </button>
      </form>
    </FormProvider>
  );
}
