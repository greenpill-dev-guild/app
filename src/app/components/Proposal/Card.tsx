"use client";

import {
  CheckBadgeIcon,
  EyeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

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
  const [isValidAllocator, setIsValidAllocator] = useState(false);
  const [votesCastedToRecipient, setVotesCastedToRecipient] =
    useState<number>(0);

  // useEffect(() => {
  //   const load = async () => {
  //     setVotesCastedToRecipient(
  //       await getVoiceCreditsCastByAllocatorToRecipient(
  //         user?.wallet?.address!,
  //         proposal.allo_recipient_id!
  //       )
  //     );
  //   };

  //   load();
  // }, [proposal.allo_recipient_id, user?.wallet?.address]);

  // useEffect(() => {
  //   const getAllocator = async () => {
  //     const isValid: any = await strategyContract.read.isValidAllocator([
  //       user?.wallet?.address!,
  //     ]);

  //     console.log("isValid2", isValid);

  //     if (isValid as boolean === true) {
  //       setIsValidAllocator(true);
  //     }
  //   };

  //   getAllocator();
  // }), [user?.wallet?.address];

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
                <CheckBadgeIcon width={18} color="green" />
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

// export const ProposalCard = ({
//   title,
//   voices,
//   location,
//   description,
//   owner,
// }) => {
//   return (
//     <div className="w-full flex flex-col p-4 rounded-2xl bg-white gap-2">
//       <div className="flex flex-row items-center justify-between">
//         <h1 className="font-semibold">{title}</h1>
//         <div>
//           <span>{voices}</span>
//           <Image src="/thumbprint.svg" width={20} height={20} alt="vote" />
//         </div>
//       </div>
//       <div className="flex flex-row gap-1 items-center">
//         <Image src="/location.svg" width={20} height={20} alt="location" />
//         <span className="text-xs font-light">{location}</span>
//       </div>
//       <p className="text-xs text-[#555]">{description}</p>
//       <p className="text-xs text-blue-500 underline underline-offset-2">
//         {owner}
//       </p>
//     </div>
//   );
// };

export default ProposalCard;
