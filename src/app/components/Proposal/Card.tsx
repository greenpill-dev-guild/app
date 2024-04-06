"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { BadgeCheckIcon, EyeIcon, MapPinIcon } from "lucide-react";

import { IProposalCardProps } from "@/app/types";

import { truncateDescription } from "../../utils/text";

const ProposalCard = ({
  proposal,
  showStatus,
  // showAction = false,
  // showAllocation,
}: IProposalCardProps) => {
  const router = useRouter();
  const { user } = usePrivy();
  const [votesCastedToRecipient, setVotesCastedToRecipient] =
    useState<number>(0);

  function handleUpVote() {
    setVotesCastedToRecipient((prev) => prev + 1);
  }

  if (!user) return null;

  return (
    <div className="flex flex-col gap-x-4 p-2 mt-2">
      <div className="justify-between cursor-pointer mb-2">
        <div className="flex">
          <h3
            className="text-lg font-semibold leading-6 text-gray-900"
            onClick={() => {
              router.push(`/proposals/${proposal.id}`);
            }}
          >
            {proposal.title}
          </h3>

          {showStatus && (
            <div className="ml-2 text-xs font-normal flex">
              {proposal.approved ? (
                <BadgeCheckIcon width={18} color="green" />
              ) : (
                <>
                  <EyeIcon width={18} color="orange" />
                  <span className="ml-1 mt-1">(in review)</span>
                </>
              )}
            </div>
          )}

          {/* {isValidAllocator && (
            <div className="ml-auto">
              {showAction && <AddRemoveCartButton grantId={proposal.id} />}
            </div>
          )} */}
        </div>

        <span className="text-sm">
          <MapPinIcon className="h-5 inline-block" /> {proposal.location}
        </span>
      </div>
      <div className="mt-1 text-sm">
        {proposal.summary
          ? truncateDescription(proposal.summary)
          : "No summary provided."}
      </div>
      <div>
        <span className="text-xs mt-2">
          Allocations: {votesCastedToRecipient ?? 0}
        </span>
      </div>
      <div className="mt-1">
        <span className="text-xs font-semibold">
          {proposal.author.name} {proposal.author.family_name}
        </span>
        {proposal.collaborators &&
          proposal.collaborators?.map((user) => (
            <span
              key={proposal.id + "-" + user.family_name}
              className="text-xs font-semibold"
            >
              , {user.name} {user.family_name}
            </span>
          ))}
      </div>
    </div>
  );
};

export default ProposalCard;
