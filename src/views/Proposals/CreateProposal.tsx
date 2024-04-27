"use client";

import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect, useRef } from "react";

import { getSupabaseClient, logoutSupabase } from "@/modules/supabase";

import { useApp } from "@/providers/AppProvider";
import useCheckTokens from "@/hooks/useCheckTokens";

import { Loader } from "@/components/Loader";
import { Button } from "@/components/Button";
import { FormInfo } from "@/components/Form/Info";
import { FormText } from "@/components/Form/Text";
import { FormInput } from "@/components/Form/Input";
import { FormSelect } from "@/components/Form/Select";
import { FormProgress } from "@/components/Form/Progress";
import { MilestoneList } from "@/components/Milestone/List";

type Step = 1 | 2 | 3 | 4;

const schema = yup.object<TCreateProposal>().shape({
  name: yup.string().required("Please create a name.").min(5).max(50),
  location: yup.string().required("Please provide a location.").max(50),
  problem: yup.string().required("Please propose a problem.").min(100).max(500),
  solution: yup
    .string()
    .required("Please provide a solution")
    .min(200)
    .max(1000),
  budget: yup.number().required("Please provide a budget").max(100000),
  start_date: yup.date().required("Please provide start date."),
  end_date: yup.date().required("Please provide desired end date."),
  collaborators: yup
    .array()
    .of(yup.string().required("Please provide a collaborator")),
  community: yup.string().nullable(),
  banner_image: yup
    .string()
    .required("Please provide an image of your project."),
  milestones: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Please provide a name"),
        budget: yup.number().required("Please provide a budget"),
        description: yup.string().required("Please provide a description"),
      })
    )
    .required("Please provide at least one milestone"),
});

const stepContent: Record<
  Step,
  {
    previous: string | null;
    next: string | null;
  }
> = {
  1: {
    previous: null,
    next: "Add Details",
  },
  2: {
    previous: "Back to Proposal",
    next: "Add Milestones",
  },
  3: {
    previous: "Back to Details",
    next: "Review Proposal",
  },
  4: {
    previous: "Back to Milestones",
    next: "Create Proposal",
  },
};

export const CreateProposalView: React.FC = () => {
  const methods = useForm<TCreateProposal>({
    defaultValues: {
      name: "",
      location: "",
      problem: "",
      solution: "",
      budget: 0,
      start_date: new Date(),
      end_date: new Date(),
      collaborators: [],
      community: "",
      banner_image: "",
      milestones: [
        {
          name: "",
          budget: 0,
          description: "",
        },
      ],
    },
    resolver: yupResolver(schema),
  });
  const {
    fields: milestones,
    append,
    remove,
  } = useFieldArray({
    control: methods.control,
    name: "milestones",
  });
  const router = useRouter();
  const t = useTranslations("Create Proposal");
  const { user, authenticated, ready, logout } = usePrivy();

  const { users, fetchUsers } = useApp();
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();

  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [proposalID, setProposalID] = useState<string>("");

  const {
    register,
    formState,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = methods;

  function setStep(direction: string) {
    if (direction === "next") {
      setCurrentStep((current) => {
        if (current === 1) return 2;
        if (current === 2) return 3;
        if (current === 3) return 4;
        return current;
      });
    }

    if (direction === "previous") {
      setCurrentStep((current) => {
        if (current === 2) return 1;
        if (current === 3) return 2;
        if (current === 4) return 3;
        return current;
      });
    }

    ref.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function selectCollaborator(id: string) {
    const collaborators = methods.getValues("collaborators");

    if (collaborators && !collaborators.includes(id)) {
      methods.setValue("collaborators", [...collaborators, id]);
    }
  }

  function removeCollaborator(id: string) {
    const collaborators = methods.getValues("collaborators");

    if (collaborators) {
      methods.setValue(
        "collaborators",
        collaborators.filter((c) => c !== id)
      );
    }
  }

  const onSubmit: SubmitHandler<TCreateProposal> = async (formData) => {
    try {
      setError("");
      setProposalID("");

      if (!user?.id) throw new Error("User not found");

      const supabase = await getSupabaseClient();

      const { data: proposalData, error: proposalError } = await supabase
        .from("proposals")
        .insert({
          author_id: user.id,
          name: formData.name,
          location: formData.location,
          problem: formData.problem,
          solution: formData.solution,
          budget: formData.budget,
          start_date: formData.start_date.toISOString(),
          end_date: formData.end_date.toISOString(),
          community: formData.community,
          banner_image: formData.banner_image,
        })
        .select()
        .single();

      if (proposalError) {
        throw proposalError;
      }

      let collaboratorsInsert: {
        id: {
          user_id: string;
          proposal_id: string;
        };
        user_id: string;
        proposal_id: string;
      }[] = [];

      let milestonesInsert: (TMilestone & { proposal_id: string })[] = [];

      formData.collaborators?.forEach(async (user_id) => {
        collaboratorsInsert.push({
          id: {
            user_id,
            proposal_id: proposalData.id,
          },
          user_id,
          proposal_id: proposalData.id,
        });
      });

      formData.milestones.forEach((milestone) => {
        milestonesInsert.push({
          ...milestone,
          proposal_id: proposalData.id,
        });
      });

      const { error: collaboratorsError } = await supabase
        .from("proposal_collaborators")
        .insert(collaboratorsInsert);

      if (collaboratorsError) {
        throw collaboratorsError;
      }

      const { error: milestonesError } = await supabase
        .from("milestones")
        .insert(milestonesInsert);

      if (milestonesError) {
        throw milestonesError;
      }

      setProposalID(proposalData.id);
    } catch (error: any) {
      console.error("Error creating proposal", error);

      if (error.message) setError(error.message);
      else setError("An error occurred");
    }
  };

  useEffect(() => {
    if (isAccessTokenValid) fetchUsers();
  }, [isAccessTokenValid]);

  if (!ready) return null;

  if (ready && !authenticated) {
    router.push("/");
  }

  if (!isRefreshTokenValid) {
    logoutSupabase();
    logout();

    router.push("/");
  }

  const StepControls = () => {
    const nextLabel = stepContent[currentStep].next;
    const previousLabel = stepContent[currentStep].previous;

    return (
      <div className="flex flex-col w-full gap-4 mt-6">
        {nextLabel && (
          <Button
            type={currentStep === 4 ? "submit" : "button"}
            label={nextLabel}
            onClick={() => {
              setStep("next");
            }}
            fullWidth
            disabled={(currentStep === 4 && !formState.isValid) || isSubmitting}
          />
        )}
        {previousLabel && (
          <Button
            label={previousLabel}
            onClick={() => setStep("previous")}
            style="soft"
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
        className="flex flex-col h-full py-4 px-4"
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
                onClick={() => {
                  router.push(`/proposals/${proposalID}`);
                  methods.reset();
                  setCurrentStep(1);
                }}
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
              <Loader size="md" type="dots" />
              <h4 className="text-xl">Creating Proposal</h4>
            </div>
          </div>
        ) : (
          <div
            ref={ref}
            className="flex-1 flex flex-col gap-2 h-full overflow-y-scroll w-full mb-4"
          >
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
                  // placeholder={t("minimumBudgetPlaceholder")}
                  {...register("budget")}
                />
                <div className="flex w-full gap-4">
                  <FormInput
                    type="date"
                    label="Start Date"
                    className="flex-1"
                    placeholder={new Date().toISOString().split("T")[0]}
                    error={errors.start_date && errors.start_date.message}
                    {...register("start_date")}
                  />
                  <FormInput
                    type="date"
                    label="End Date"
                    className="flex-1"
                    placeholder={new Date().toISOString().split("T")[0]}
                    error={errors.end_date && errors.end_date.message}
                    {...register("end_date")}
                  />
                </div>
                <FormSelect
                  value={null}
                  control={methods.control}
                  label="Contributors"
                  placeholder="Select your collaborators"
                  primaryColor="green"
                  options={users.map((user) => ({
                    label: user.username,
                    value: user.id,
                  }))}
                  selected={methods.getValues("collaborators") || []}
                  onChange={(option) =>
                    option &&
                    !Array.isArray(option) &&
                    selectCollaborator(option.value)
                  }
                  onRemove={removeCollaborator}
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
                <MilestoneList
                  register={methods.register}
                  milestones={milestones}
                  addMilestone={append}
                  removeMilestone={remove}
                />
              </>
            )}
            {currentStep === 4 && (
              <>
                <FormInfo
                  title="Review Proposal"
                  info="Make sure all the information is correct before creating."
                />
                <p className="text-red-500">{error}</p>
              </>
            )}
            <StepControls />
          </div>
        )}
      </form>
    </FormProvider>
  );
};
