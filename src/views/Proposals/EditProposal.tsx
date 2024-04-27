"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import { getSupabaseClient } from "@/modules/supabase";

interface EditProposalViewProps {
  proposal: TFullProposal;
  proposalId: string;
  setIsEditing: Function;
  reloadData: Function;
}

export const EditProposalView: React.FC<EditProposalViewProps> = ({
  reloadData,
  setIsEditing,
  proposal,
  proposalId,
  // ...props
}) => {
  const t = useTranslations("Create Proposal");
  const methods = useForm<TCreateProposal>({
    mode: "onBlur",
    defaultValues: {
      name: proposal.name,
      location: proposal.location,
      problem: proposal.problem,
      solution: proposal.solution,
      budget: proposal.budget,
      start_date: proposal.start_date,
      end_date: proposal.end_date,
      community: proposal.community,
      banner_image: proposal.banner_image,
      milestones: proposal.milestones,
    },
  });

  const {
    register,
    // formState,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = methods;

  const onSubmit: SubmitHandler<TCreateProposal> = async (formData) => {
    try {
      const supabase = await getSupabaseClient();

      const { error } = await supabase
        .from("proposals")
        .update({
          name: formData.name,
          location: formData.location,
          problem: formData.problem,
          solution: formData.solution,
          budget: formData.budget,
          start_date: formData.start_date.toISOString(),
          end_date: formData.end_date.toISOString(),
          community: formData.community,
          banner_image: formData.banner_image,
          milestones: formData.milestones,
        })
        .eq("id", proposalId);
      setIsEditing(false);
      reloadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font-bold mb-4">
          <span className="text-sky-600" onClick={() => setIsEditing(false)}>
            Cancel Edit
          </span>
          <input
            {...register("name", { required: t("titleValidationMessage") })}
            className="w-full border border-slate-300 rounded h-10 pl-2 mt-4"
            placeholder={t("title")}
          />
          <span className="text-red-600 text-xs">
            {errors.name && errors.name.message}
          </span>
        </div>

        <label className="text-xs">{t("location")}</label>
        <input
          {...register("location", {
            required: t("locationValidationMessage"),
          })}
          className="w-full border border-slate-300 rounded h-10 pl-2 mb-2"
          placeholder={t("location")}
        />
        <span className="text-red-600 text-xs">
          {errors.location && errors.location.message}
        </span>

        <label className="text-xs">{t("banner_imagePlaceholder")}</label>
        <textarea
          className="w-full border border-slate-300 rounded h-20 pl-2 mb-2"
          placeholder={t("banner_imagePlaceholder")}
          {...register("banner_image", {
            required: t("banner_imageValidationMessage"),
          })}
        />
        <span className="text-red-600 text-xs">
          {errors.banner_image && errors.banner_image.message}
        </span>

        <label className="text-xs">{t("locationsAffectedPlaceholder")}</label>
        <input
          className="w-full border border-slate-300 rounded h-10 pl-2 mb-2"
          placeholder={t("locationsAffectedPlaceholder")}
          {...register("start_date", {
            required: t("locationsAffectedValidationMessage"),
          })}
        />
        <span className="text-red-600 text-xs">
          {errors.start_date && errors.start_date.message}
        </span>

        <label className="text-xs">{t("communityProblemPlaceholder")}</label>
        <textarea
          className="w-full border border-slate-300 rounded h-20 pl-2 mb-2"
          placeholder={t("communityProblemPlaceholder")}
          {...register("problem", {
            required: t("communityProblemValidationMessage"),
          })}
        />
        <span className="text-red-600 text-xs">
          {errors.problem && errors.problem.message}
        </span>

        <label className="text-xs">{t("proposedSolutionPlaceholder")}</label>
        <textarea
          className="w-full border border-slate-300 rounded h-20 pl-2 mb-2"
          placeholder={t("proposedSolutionPlaceholder")}
          {...register("solution", {
            required: t("proposedSolutionValidationMessage"),
          })}
        />
        <span className="text-red-600 text-xs">
          {errors.solution && errors.solution.message}
        </span>

        <label className="text-xs">{t("minimumBudgetPlaceholder")}</label>
        <input
          className="w-full border border-slate-300 rounded h-10 pl-2 mb-2"
          placeholder={t("minimumBudgetPlaceholder")}
          {...register("budget", {
            required: t("minimumBudgetValidationMessage"),
          })}
        />
        <span className="text-red-600 text-xs">
          {errors.budget && errors.budget.message}
        </span>

        <label className="text-xs">{t("keyPlayersPlaceholder")}</label>
        <input
          className="w-full border border-slate-300 rounded h-10 pl-2 mb-2"
          placeholder={t("keyPlayersPlaceholder")}
          {...register("community", {
            required: t("keyPlayersValidationMessage"),
          })}
        />
        <span className="text-red-600 text-xs">
          {errors.community && errors.community.message}
        </span>
        <label className="text-xs mt-4 block">{t("heading6")}</label>
        {/* <MilestoneForm milestones={proposal.milestones} /> */}
        <span className="text-red-600 text-xs">
          {errors.milestones && errors.milestones.message}
        </span>

        <button
          className="w-full border border-slate-400 rounded leading-10 font-bold mt-4"
          type="submit"
        >
          {t("updateButton")}
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
};
