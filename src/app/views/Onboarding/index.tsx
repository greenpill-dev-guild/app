"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import { getSupabaseClient, logoutSupabase } from "../../../../lib/supabase";
import useCheckTokens from "../../hooks/useCheckTokens";
import { TUser } from "@/app/types";

interface OnboardingUser extends TUser {
  avatar: string;
}

const Onboarding = () => {
  const { user, ready, authenticated, logout } = usePrivy();
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();
  const router = useRouter();
  const methods = useForm<OnboardingUser>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      family_name: "",
      village_neighborhood: "",
      email: "",
      avatar: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = methods;

  const t = useTranslations("Onboarding");
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
            name: data.name,
            family_name: data.family_name,
            village_neighborhood: data.village_neighborhood,
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

  const inputClasses = "w-full border border-slate-300 rounded h-10 pl-2 mb-2";

  return (
    <div className="border p-2 rounded-md shadow-sm">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-bold mb-6 text-center">{t("heading")}</h2>

          <FormInput
            inputClasses={inputClasses}
            register={register("name", {
              required: "Given Name required",
            })}
            errors={errors}
            t={t("firstName")}
          />
          <FormInput
            inputClasses={inputClasses}
            register={register("family_name", {
              required: "Last Name required",
            })}
            errors={errors}
            t={t("lastName")}
          />
          <FormInput
            inputClasses={inputClasses}
            register={register("village_neighborhood", {
              required: "Village or Neighborhood is required",
            })}
            errors={errors}
            t={t("location")}
          />
          <FormInput
            inputClasses={inputClasses}
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            errors={errors}
            t={t("email")}
          />
          <p className="text-center text-xs italic mb-6">{t("disclaimer")}</p>
          <button
            className="w-full border border-slate-400 rounded leading-10 font-bold disabled:opacity-50 hover:bg-sky-600 hover:text-white"
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
    </div>
  );
};

const FormInput = (props: {
  inputClasses: any;
  register: any;
  errors: any;
  t: any;
}) => {
  return (
    <div>
      <span className="text-red-600 text-xs">
        {" "}
        {props.errors[props.register.name] &&
          props.errors[props.register.name].message}
      </span>
      <input
        className={props.inputClasses}
        placeholder={props.t}
        {...props.register}
      />
    </div>
  );
};

export default Onboarding;
