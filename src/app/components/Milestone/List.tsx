"use client";

import { nanoid } from "nanoid";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { IMilestoneProps, TMilestone } from "@/app/types";

import { Button } from "../Button";
import { MilestoneForm } from "./Form";

interface MilestoneListProps extends IMilestoneProps {}

export const MilestoneList: React.FC<MilestoneListProps> = ({}) => {
  const t = useTranslations("Create Proposal");

  const [milestones, setMilestones] = useState<Map<string, TMilestone>>(
    new Map([[nanoid(), { name: "", budget: 0, description: "" }]])
  );

  function handleAddMilestone() {
    const id = nanoid();

    setMilestones(
      (prev) => new Map(prev.set(id, { name: "", budget: 0, description: "" }))
    );
  }

  function handleRemoveMilestone(id: string) {
    setMilestones((prev) => {
      const newMap = new Map(prev);

      newMap.delete(id);

      return newMap;
    });
  }

  function handleNameChange(id: string, name: string) {
    setMilestones((prev) => {
      const newMap = new Map(prev);

      const milestone = newMap.get(id);

      if (milestone) {
        milestone.name = name;
      }

      return newMap;
    });
  }

  function handleBudgetChange(id: string, budget: number) {
    setMilestones((prev) => {
      const newMap = new Map(prev);

      const milestone = newMap.get(id);

      if (milestone) {
        milestone.budget = budget;
      }

      return newMap;
    });
  }

  function handleDescriptionChange(id: string, description: string) {
    setMilestones((prev) => {
      const newMap = new Map(prev);

      const milestone = newMap.get(id);

      if (milestone) {
        milestone.description = description;
      }

      return newMap;
    });
  }

  return (
    <div className="border">
      <ul>
        {milestones.size > 0 &&
          [...milestones.entries()].map(([id, milestone]) => (
            <MilestoneForm
              {...milestone}
              id={id}
              onRemove={handleRemoveMilestone}
              onNameChange={(name) => handleNameChange(id, name)}
              onBudgetChange={(budget) => handleBudgetChange(id, budget)}
              onDescriptionChange={(description) =>
                handleDescriptionChange(id, description)
              }
            />
          ))}
      </ul>
      <Button
        onClick={handleAddMilestone}
        label="Add Milestone"
        Icon={PlusIcon}
      />
    </div>
  );
};
