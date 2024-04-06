"use client";

import {
  MapPinIcon,
  UserCircleIcon,
  UsersIcon,
  PencilLineIcon,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePrivy } from "@privy-io/react-auth";
import React, { useState, useEffect, useContext } from "react";

import { TFullProposal, TMilestone } from "@/app/types";
import { ProposalContext } from "@/app/providers/ProposalProvider";

import { EditProposalView } from "./EditProposal";

export default function ProposalView({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  // unstable_setRequestLocale(params.locale);

  const { user } = usePrivy();
  const [proposal, setProposal] = useState<TFullProposal>();
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [totalBudget, setTotalBudget] = useState<number>();
  const t = useTranslations("Proposal Details");
  const { getProposalById, fetchProposals } = useContext(ProposalContext);

  useEffect(() => {
    loadProposal();
  }, [params.slug]);

  const loadProposal = async () => {
    const prop = await getProposalById(params.slug);
    if (prop) setProposal(prop);
  };

  useEffect(() => {
    if (user?.id === proposal?.author?.id) {
      setIsAuthor(true);
    }
  }, [user, proposal?.author?.id]);

  useEffect(() => {
    if (proposal && proposal.project_milestones) {
      let calculatedTotalBudget = 0;
      Object.values(proposal.project_milestones).forEach(
        (milestone: TMilestone) => {
          calculatedTotalBudget += Number(milestone.budget);
        }
      );
      setTotalBudget(calculatedTotalBudget);
    }
  }, [proposal]);

  return (
    <>
      {isEditing && proposal && (
        <EditProposalView
          reloadData={() => {
            fetchProposals();
            loadProposal();
          }}
          setIsEditing={setIsEditing}
          proposalId={params.slug}
          proposal={proposal}
        />
      )}
      {!isEditing && (
        <div className="pr-4 pl-4 pb-4">
          <div className="font-bold mb-6">
            <Link className="text-sky-600" href="/proposals">
              {t("heading")}
            </Link>{" "}
            / {proposal?.title}{" "}
            {isAuthor && (
              <>
                <PencilLineIcon
                  onClick={() => setIsEditing(true)}
                  className="h-5 inline-block ml-2"
                />
              </>
            )}
          </div>
          <div className="text-sm align-middle mb-4">
            <MapPinIcon className="h-4 inline-block" /> {proposal?.location}
          </div>
          <div className="text-sm mb-4">
            <UserCircleIcon className="h-4 inline-block" />{" "}
            {proposal?.author?.name + " " + proposal?.author?.family_name}
          </div>
          <div>
            <span className="text-sm">
              {proposal?.collaborators &&
                proposal?.collaborators.length !== 0 && (
                  <UsersIcon className="h-4 inline-block" />
                )}{" "}
              {proposal?.collaborators &&
                proposal?.collaborators
                  .map((user) => user.name + " " + user.family_name)
                  .join(", ")}
            </span>
            <h3 className="font-bold mt-6 text-sm">{t("summary")}</h3>
            <p className="text-sm leading-1 mt-4">{proposal?.summary}</p>

            <h3 className="font-bold mt-6 text-sm">{t("locationsAffected")}</h3>
            <p className="text-sm leading-1 mt-2">
              {proposal?.affected_locations}
            </p>

            <h3 className="font-bold mt-6 text-sm">{t("communityProblem")}</h3>
            <p className="text-sm leading-1 mt-2">
              {proposal?.community_problem}
            </p>

            <h3 className="font-bold mt-6 text-sm">{t("proposedSolution")}</h3>
            <p className="text-sm leading-1 mt-2">
              {proposal?.proposed_solution}
            </p>

            <h3 className="font-bold mt-6 text-sm">{t("sustainability")}</h3>
            <p className="text-sm leading-1 mt-2">{proposal?.sustainability}</p>

            <h3 className="font-bold mt-6 text-sm">{t("keyPlayers")}</h3>
            <p className="text-sm leading-1 mt-2">{proposal?.key_players}</p>
          </div>
          {proposal?.project_milestones && (
            <h3 className="font-bold mt-6 mb-5">{t("milestones")}</h3>
          )}
          {proposal?.project_milestones &&
            Object.values(proposal.project_milestones).map(
              (milestone: TMilestone) => (
                <div key={milestone.name} className="mt-3 mb-3">
                  {milestone.name}: ${milestone.budget}
                </div>
              )
            )}
          <div className="italic mt-6">
            {t("minimumBudget") + ": $" + proposal?.minimum_budget}
          </div>
          {proposal?.project_milestones && (
            <div className="italic mt-6">
              {t("totalBudget") + ": $" + totalBudget}
            </div>
          )}
        </div>
      )}
    </>
  );
}
