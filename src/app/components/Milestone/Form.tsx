"use client";

import { useTranslations } from "next-intl";

import { TMilestone } from "@/app/types";

import { FormInput } from "../Form/Input";
import { FormText } from "../Form/Text";

interface MilestoneFormProps extends TMilestone {
  id: string;
  onNameChange: (name: string) => void;
  onBudgetChange: (budget: number) => void;
  onDescriptionChange: (description: string) => void;
  onRemove: (id: string) => void;
}

export const MilestoneForm: React.FC<MilestoneFormProps> = ({
  name,
  budget,
  description,
  onNameChange,
  onBudgetChange,
  onDescriptionChange,
}) => {
  const t = useTranslations("Create Proposal");

  return (
    <div className="border">
      <p className="pb-6">Name This Milestone</p>
      <div className="flex w-full">
        <FormInput
          label="Name"
          className="basis-2/3"
          placeholder="Ex. ..."
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
        <FormInput
          label="Budget"
          className="basis-1/3"
          placeholder="Ex. 1200"
          type="number"
          value={budget}
          onChange={(e) => onBudgetChange(Number(e.target.value))}
        />
      </div>
      <FormText
        rows={2}
        label="Description"
        placeholder="Provide a short description of this milestone."
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </div>
  );
};
