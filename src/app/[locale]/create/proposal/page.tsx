"use client";
import "react-tailwindcss-select/dist/index.css";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Select from "react-tailwindcss-select";
import { usePrivy } from "@privy-io/react-auth";
import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";

import { getSupabaseClient, logoutSupabase } from "../../../../../lib/supabase";

import { TCreateProposal } from "@/app/types";
import useCheckTokens from "@/app/hooks/useCheckTokens";
import { MilestoneForm } from "@/app/components/Milestone/Form";

interface CreateProposalParams {
  locale: string;
}

interface UserOption {
  id: string;
  name: string | null;
  family_name: string | null;
}

interface SelectOption {
  value: string;
  label: string;
}

export default function CreateProposal(props: {
  params: CreateProposalParams;
}) {
  const { user, authenticated, ready, logout } = usePrivy();
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();
  const [userOptions, setUserOptions] = useState<SelectOption[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const router = useRouter();
  const methods = useForm<TCreateProposal>({
    mode: "all",
    defaultValues: {
      title: "",
      location: "",
      summary: "",
      affected_locations: "",
      minimum_budget: null,
      key_players: "",
      timeline: "",
      proposed_solution: "",
      sustainability: "",
      community_problem: "",
    },
  });
  const {
    register,
    formState,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = methods;
  const { isValid } = formState;
  const [currentStep, setCurrentStep] = useState(1);
  const t = useTranslations("Create Proposal");

  useEffect(() => {
    async function getUsers() {
      const supabase = await getSupabaseClient();
      const { data } = await supabase
        .from("users")
        .select(`id, name, family_name`);
      if (data) setUsers(data);
    }

    if (isAccessTokenValid) getUsers();
  }, [isAccessTokenValid]);

  useEffect(() => {
    let options: SelectOption[] = [];
    users.forEach((u) => {
      if (u.id !== user?.id) {
        let userOption = {
          value: u.id,
          label: u.name + " " + u.family_name,
        };
        options.push(userOption);
      }
    });

    setUserOptions([...userOptions, ...options]);
  }, [user?.id, users]);

  if (!ready) return null;
  if (ready && !authenticated) {
    router.push("/");
  }
  if (!isRefreshTokenValid) {
    logoutSupabase();
    logout();
    router.push("/");
  }

  const selectUser = (user: SelectValue) => {
    if (user)
      setUserOptions((current) =>
        // @ts-ignore
        current.filter((option) => option.value !== user.value)
      );
    setSelectedUsers([...selectedUsers, user]);
  };

  const removeCollaborator = (user: SelectValue) => {
    setSelectedUsers((current) =>
      // @ts-ignore
      current.filter((option) => option.value !== user.value)
    );
    // @ts-ignore
    setUserOptions([...userOptions, user]);
  };

  const onSubmit: SubmitHandler<TCreateProposal> = async (formData) => {
    try {
      const supabase = await getSupabaseClient();
      const { data: proposalData, error: proposalError } = await supabase
        .from("proposals")
        .insert({
          author_id: user?.id,
          title: formData.title,
          summary: formData.summary,
          timeline: formData.timeline,
          location: formData.location,
          affected_locations: formData.affected_locations,
          community_problem: formData.community_problem,
          proposed_solution: formData.proposed_solution,
          sustainability: formData.sustainability,
          minimum_budget: formData.minimum_budget,
          key_players: formData.key_players,
          project_milestones: formData.milestones,
        })
        .select()
        .single();
      if (proposalError) {
        throw proposalError;
      }
      let inserts: any = [];
      selectedUsers.map(async (selectedUser) => {
        inserts.push({
          id: {
            user_id: selectedUser?.value as string,
            proposal_id: proposalData.id,
          },
          proposal_id: proposalData.id,
          user_id: selectedUser?.value,
        });
      });

      const { error } = await supabase
        .from("proposal_collaborators")
        .insert(inserts);
      if (error) {
        throw error;
      }

      router.push(`/proposals`);
    } catch (error) {
      console.error(error);
    }
  };
  const inputClasses = "w-full border border-slate-300 rounded h-10 pl-2 mb-6";
  const textareaClasses =
    "w-full border border-slate-300 rounded h-20 pl-2 mb-6";

  function setStep(direction: string) {
    if (direction === "next") {
      setCurrentStep(currentStep + 1);
    }
    if (direction === "previous") {
      setCurrentStep(currentStep - 1);
    }
  }

  const StepControls = () => {
    return (
      <div className="flex mb-10 mt-10">
        {currentStep !== 1 && (
          <button
            className="border border-slate-400 rounded leading-10 font-bold px-10"
            onClick={() => setStep("previous")}
          >
            {t("previousButton")}
          </button>
        )}

        {currentStep !== 7 && (
          <button
            className="border border-slate-400 rounded leading-10 font-bold px-10 ml-auto disabled:opacity-50"
            onClick={() => {
              setStep("next");
            }}
            disabled={isValid ? false : true}
          >
            {t("nextButton")}
          </button>
        )}
      </div>
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 1 && (
          <>
            <h3 className="font-bold mb-6">{t("heading1")}</h3>
            <span className="text-red-600 text-xs">
              {" "}
              {errors.title && errors.title.message}
            </span>
            <label className="text-sm">{t("title")}</label>
            <input
              className={inputClasses}
              placeholder={t("title")}
              {...register("title", { required: t("titleValidationMessage") })}
            />
            <span className="text-red-600 text-xs">
              {" "}
              {errors.location && errors.location.message}
            </span>
            <label className="text-sm">{t("location")}</label>
            <input
              className={inputClasses}
              placeholder={t("location")}
              {...register("location", {
                required: t("locationValidationMessage"),
              })}
            />
            <h3 className="font-bold mb-6">{t("collaborators")}</h3>
            {selectedUsers.length > 0 &&
              selectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="border border-slate-400 rounded leading-8 text-xs px-2 font-bold inline-block mb-3"
                >
                  <input type="hidden" value={selectedUsers} />
                  <div className="flex">
                    {user?.label}
                    <XMarkIcon
                      onClick={() => removeCollaborator(user)}
                      className="h-3 ml-2 mt-2.5 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            {userOptions.length > 0 && (
              <>
                <Select
                  primaryColor={"blue"}
                  onChange={selectUser}
                  value={null}
                  isSearchable={true}
                  placeholder={t("collaboratorsPlaceholder")}
                  options={userOptions}
                />
                <p className="text-sm center italic mt-6">
                  {t("collaboratorsContext")}
                </p>
              </>
            )}
            <StepControls />
          </>
        )}
        {currentStep === 2 && (
          <>
            <h3 className="font-bold mb-6">{t("heading2")}</h3>
            <span className="text-red-600 text-xs">
              {" "}
              {errors.summary && errors.summary.message}
            </span>
            <label className="text-sm">{t("summaryPlaceholder")}</label>
            <textarea
              className={textareaClasses}
              placeholder={t("summaryPlaceholder")}
              maxLength={200}
              {...register("summary", {
                required: t("summaryValidationMessage"),
              })}
            />
            <span className="text-red-600 text-xs">
              {" "}
              {errors.affected_locations && errors.affected_locations.message}
            </span>
            <label className="text-sm">
              {t("locationsAffectedPlaceholder")}
            </label>
            <input
              className={inputClasses}
              placeholder={t("locationsAffectedPlaceholder")}
              {...register("affected_locations", {
                required: t("locationsAffectedValidationMessage"),
              })}
            />
            <p className="text-sm center italic mt-6">
              {t("grantInformationContext")}
            </p>
            <StepControls />
          </>
        )}
        {currentStep === 3 && (
          <>
            <h3 className="font-bold mb-6">{t("heading3")}</h3>
            <span className="text-red-600 text-xs">
              {" "}
              {errors.community_problem && errors.community_problem.message}
            </span>
            <label className="text-sm">
              {t("communityProblemPlaceholder")}
            </label>
            <textarea
              className={textareaClasses}
              placeholder={t("communityProblemPlaceholder")}
              {...register("community_problem", {
                required: t("communityProblemValidationMessage"),
              })}
            />
            <p className="text-sm center italic">
              {t("communityProblemContext")}
            </p>
            <StepControls />
          </>
        )}
        {currentStep === 4 && (
          <>
            <h3 className="font-bold mb-6">{t("heading4")}</h3>
            <span className="text-red-600 text-xs">
              {" "}
              {errors.proposed_solution && errors.proposed_solution.message}
            </span>
            <label className="text-sm">
              {t("proposedSolutionPlaceholder")}
            </label>
            <textarea
              className={textareaClasses}
              placeholder={t("proposedSolutionPlaceholder")}
              {...register("proposed_solution", {
                required: t("proposedSolutionValidationMessage"),
              })}
            />
            <p className="text-sm center italic">
              {t("proposedSolutionContext")}
            </p>
            <StepControls />
          </>
        )}
        {currentStep === 5 && (
          <>
            <h3 className="font-bold mb-6">{t("heading5")}</h3>
            <span className="text-red-600 text-xs">
              {" "}
              {errors.sustainability && errors.sustainability.message}
            </span>
            <label className="text-sm">{t("sustainabilityPlaceholder")}</label>
            <textarea
              className={textareaClasses}
              placeholder={t("sustainabilityPlaceholder")}
              {...register("sustainability", {
                required: t("sustainabilityValidationMessage"),
              })}
            />
            <p className="text-sm center italic">
              {t("sustainabilityContext")}
            </p>
            <StepControls />
          </>
        )}
        {currentStep === 6 && (
          <>
            <h3 className="font-bold mb-6">{t("heading6")}</h3>
            <span className="text-red-600 text-xs">
              {" "}
              {errors.minimum_budget && errors.minimum_budget.message}
            </span>
            <label className="text-sm">{t("minimumBudgetPlaceholder")}</label>
            <input
              type="number"
              className="w-full border border-slate-300 rounded h-10 pl-2"
              placeholder={t("minimumBudgetPlaceholder")}
              {...register("minimum_budget", {
                required: t("minimumBudgetValidationMessage"),
                min: { value: 1, message: t("minimumBudgetMin") },
                max: { value: 12000000, message: t("minimumBudgetMax") },
              })}
            />
            <div className="mb-6">
              <span className="italic text-xs">
                {t("minimumBudgetContext")}
              </span>
              <span className="text-red-600 text-xs">
                {" "}
                {errors.key_players && errors.key_players.message}
              </span>
            </div>

            <label className="text-sm">{t("keyPlayersPlaceholder")}</label>
            <input
              className={inputClasses}
              placeholder={t("keyPlayersPlaceholder")}
              {...register("key_players", {
                required: t("keyPlayersValidationMessage"),
              })}
            />
            <span className="text-red-600 text-xs">
              {" "}
              {errors.timeline && errors.timeline.message}
            </span>
            <label className="text-sm">{t("timelinePlaceholder")}</label>
            <input
              className={inputClasses}
              placeholder={t("timelinePlaceholder")}
              {...register("timeline", {
                required: t("timelineValidationMessage"),
              })}
            />
            <StepControls />
          </>
        )}
        {currentStep === 7 && (
          <>
            <MilestoneForm />
            <p
              className="underline mb-8 text-sky-600 cursor-pointer"
              onClick={() => setStep("previous")}
            >
              {t("previousButton")}
            </p>
            <button
              className="w-full border border-slate-400 rounded leading-10 font-bold relative disabled:opacity-50"
              type="submit"
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
          </>
        )}
      </form>
    </FormProvider>
  );
}
