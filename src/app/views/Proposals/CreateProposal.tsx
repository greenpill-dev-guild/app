"use client";

import { PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePrivy } from "@privy-io/react-auth";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";

import { getSupabaseClient, logoutSupabase } from "../../../../lib/supabase";

import { TCreateProposal } from "@/app/types";

import useCheckTokens from "@/app/hooks/useCheckTokens";

import { Button } from "@/app/components/Button";
import { FormInfo } from "@/app/components/Form/Info";
import { FormText } from "@/app/components/Form/Text";
import { FormInput } from "@/app/components/Form/Input";
import { FormSelect } from "@/app/components/Form/Select";
import { FormProgress } from "@/app/components/Form/Progress";
import { MilestoneList } from "@/app/components/Milestone/List";

interface UserOption {
  id: string;
  name: string | null;
  family_name: string | null;
}

interface SelectOption {
  value: string;
  label: string;
}

export const CreateProposalView: React.FC = () => {
  const methods = useForm<TCreateProposal>({
    mode: "all",
    defaultValues: {
      name: "",
      location: "",
      problem: "",
      solution: "",
      budget: null,
      start_date: null,
      end_date: null,
      community: "",
      banner_image: "",
    },
  });
  const router = useRouter();
  const t = useTranslations("Create Proposal");
  const { user, authenticated, ready, logout } = usePrivy();
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();

  const [error, setError] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(1);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [userOptions, setUserOptions] = useState<SelectOption[]>([]);
  const [proposalID, setProposalID] = useState<string>("");

  const {
    register,
    formState,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = methods;

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
          name: formData.name,
          location: formData.location,
          problem: formData.problem,
          solution: formData.solution,
          budget: formData.budget,
          community: formData.community,
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

      setProposalID(proposalData.id);
    } catch (error: any) {
      console.error(error);

      if (error.message) setError(error.message);
      else setError("An error occurred");
    }
  };

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
      <div className="flex flex-col w-full gap-2">
        {currentStep !== 7 && (
          <Button
            type={currentStep === 4 ? "submit" : "button"}
            label={t("nextButton")}
            onClick={() => {
              setStep("next");
            }}
            fullWidth
            disabled={!formState.isValid || isSubmitting}
          />
        )}
        {currentStep !== 1 && (
          <Button
            label={t("previousButton")}
            onClick={() => setStep("previous")}
            fullWidth
          />
        )}
      </div>
    );
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 h-full"
      >
        <FormProgress
          currentStep={currentStep}
          steps={["Proposal", "Details", "Milestones"]}
        />
        {isSubmitted ? (
          <div className="grid place-items-center w-full h-full">
            <div className="flex flex-col items-center gap-4">
              <p className="">Proposal Created</p>
              <Button
                label="View Proposal"
                onClick={() => router.push(`/proposals/${proposalID}`)}
              />
              <Button
                label="Create Another Proposal"
                onClick={() => {
                  setCurrentStep(1);
                  methods.reset();
                  router.push("/proposals/create");
                }}
              />
            </div>
          </div>
        ) : isSubmitting ? (
          <div className="grid place-items-center w-full h-full">
            <div className="flex flex-col items-center gap-4">
              <PulseLoader size={20} />
              <h4 className="text-xl">Creating Proposal</h4>
              <p className="text-red-500">{error}</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 h-full">
            {currentStep === 1 && (
              <>
                <FormInfo
                  title="Starting a new Proposal?"
                  info="Idenitfy a community problem and provide a solution."
                />
                <FormInput
                  label="Name"
                  placeholder={t("name")}
                  error={errors.name && errors.name.message}
                  {...register("name", {
                    required: t("titleValidationMessage"),
                  })}
                />
                <FormInput
                  label="Location"
                  placeholder={t("location")}
                  error={errors.location && errors.location.message}
                  {...register("location", {
                    required: t("locationValidationMessage"),
                  })}
                />
                <FormText
                  label="Problem"
                  rows={4}
                  error={errors.problem && errors.problem.message}
                  placeholder={t("communityProblemPlaceholder")}
                  {...register("problem", {
                    required: t("communityProblemValidationMessage"),
                  })}
                />
                <FormText
                  label="Solution"
                  rows={4}
                  placeholder={t("proposedSolutionPlaceholder")}
                  {...register("solution", {
                    required: t("proposedSolutionValidationMessage"),
                  })}
                />
              </>
            )}
            {currentStep === 2 && (
              <>
                <FormInfo
                  title="Add Details"
                  info="Provide additional information about the proposal and team."
                />
                <FormInput
                  type="number"
                  label="Budget"
                  error={errors.budget && errors.budget.message}
                  placeholder={t("minimumBudgetPlaceholder")}
                  {...register("budget", {
                    required: t("minimumBudgetValidationMessage"),
                    min: { value: 1, message: t("minimumBudgetMin") },
                    max: { value: 12000000, message: t("minimumBudgetMax") },
                  })}
                />
                <div className="flex w-full gap-4">
                  <FormInput
                    type="date"
                    label="Start Date"
                    className="flex-1"
                    placeholder={new Date().toISOString().split("T")[0]}
                    error={errors.start_date && errors.start_date.message}
                    {...register("start_date", {
                      required: t("timelineValidationMessage"),
                    })}
                  />
                  <FormInput
                    type="date"
                    label="End Date"
                    className="flex-1"
                    placeholder={new Date().toISOString().split("T")[0]}
                    error={errors.end_date && errors.end_date.message}
                    {...register("end_date", {
                      required: t("timelineValidationMessage"),
                    })}
                  />
                </div>
                <FormSelect
                  value={null}
                  label="Contributors"
                  placeholder="Select your collaborators"
                  options={userOptions}
                  selected={selectedUsers}
                  primaryColor="green"
                  onChange={selectUser}
                  onRemove={(user) =>
                    removeCollaborator({
                      label: user,
                      value: user,
                    })
                  }
                />
                <FormInput
                  label="Community Members & Groups"
                  error={errors.community && errors.community.message}
                  placeholder={t("keyPlayersPlaceholder")}
                  {...register("community", {
                    required: t("keyPlayersValidationMessage"),
                  })}
                />
              </>
            )}
            {currentStep === 3 && (
              <>
                <FormInfo
                  title="Add Milestones"
                  info="Break your plan into steps. Provide a short description and budget for each."
                />
                <MilestoneList />
              </>
            )}
            {currentStep === 4 && (
              <>
                <FormInfo
                  title="Review Proposal"
                  info="Make sure all the information is correct before creating."
                />
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
            <StepControls />
          </div>
        )}
      </form>
    </FormProvider>
  );
};
