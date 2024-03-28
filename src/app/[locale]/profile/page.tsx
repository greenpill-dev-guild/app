"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import React, { useState, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { getSupabaseClient, logoutSupabase } from "../../../../lib/supabase";
import { TUser } from "@/app/types";
import useCheckTokens from "../../hooks/useCheckTokens";

export default function Settings() {
  const { logout, user, ready, authenticated } = usePrivy();
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();
  const router = useRouter();
  const methods = useForm<TUser>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      family_name: "",
      village_neighborhood: "",
      email: "",
    },
  });

  const t = useTranslations("Settings");
  const handleDisconnect = () => {
    logout();
    logoutSupabase();
    router.push("/");
  };
  const [currentUser, setCurrentUser] = useState<TUser>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = methods;

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
            email: data.email,
          })
          .eq("id", user?.id);
        router.push(`/proposals/me`);
        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {currentUser && (
        <>
          <h3 className="font-bold mb-6">{t("heading")}</h3>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
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

              <div className="sm:col-span-4 mt-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      id="name"
                      required
                      {...register("name", { value: currentUser.name! })}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4 mt-2">
                <label
                  htmlFor="family_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Family Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      {...register("family_name", {
                        value: currentUser.family_name!,
                      })}
                      id="family_name"
                      required
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4 mt-2">
                <label
                  htmlFor="village_neighborhood"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Village Neighborhood
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      {...register("village_neighborhood", {
                        value: currentUser.village_neighborhood!,
                      })}
                      id="village_neighborhood"
                      required
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4 mt-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      {...register("email", { value: currentUser.email! })}
                      id="email"
                      required
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <button className="w-full border border-slate-400 rounded leading-10 font-bold mt-5">
                Update Profile
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

          <button
            className="w-full border border-slate-400 rounded leading-10 font-bold mt-2 mb-6"
            onClick={handleDisconnect}
          >
            {t("logoutButton")}
          </button>
        </>
      )}
    </>
  );
}
