"use client";

import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";

import { getSupabaseClient } from "@/modules/supabase";

import { useApp } from "@/app/providers/AppProvider";

import { ProposalViewer } from "@/app/components/Proposal/Viewer";

interface ProposalViewProps {
  id: string;
}

export const ProposalView: React.FC<ProposalViewProps> = ({ id }) => {
  const t = useTranslations("Proposal");

  const { user, userMap, getProposalById } = useApp();

  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState<TFullProposal>();

  const author = userMap.get(proposal?.author_id!);

  async function handleProposalUpVote(
    proposalId: string,
    vote: boolean | null
  ) {
    try {
      const supabase = await getSupabaseClient();

      const { data: existingVote, error: existingVoteError } = await supabase
        .from("proposal_votes")
        .select()
        .eq("proposal_id", proposalId)
        .eq("user_id", user?.id!);

      if (existingVoteError) {
        throw existingVoteError;
      }

      if (existingVote.length > 0 && existingVote[0].vote_type === vote) {
        console.log("User has already voted on this proposal");
        return;
      }

      if (existingVote.length > 0) {
        const { error } = await supabase
          .from("proposal_votes")
          .update({
            vote_type: vote,
          })
          .eq("proposal_id", proposalId)
          .eq("user_id", user?.id!);

        if (error) {
          throw error;
        }
      } else {
        const { data, error } = await supabase.from("proposal_votes").insert({
          proposal_id: proposalId,
          user_id: user?.id!,
          vote_type: vote,
        });

        if (error) {
          throw error;
        }
      }

      toast.success("Vote submitted");
    } catch (error) {
      console.log("Error up voting", error);
    }
  }

  useEffect(() => {
    async function loadProposal() {
      setLoading(true);

      const prop = await getProposalById(id);
      if (prop) setProposal(prop);

      setLoading(false);
    }

    loadProposal();
  }, [id]);

  if (loading) return null;

  if (!proposal)
    return (
      <div className="grid w-full h-full place-items-center">
        <p className="text-center">{t("noProposal")}</p>
      </div>
    );

  return (
    <ProposalViewer
      view="info"
      translations={t}
      author={author}
      userVote={
        proposal.votes?.find((v) => v.user_id === user?.id)?.vote_type ?? null
      }
      onUpVote={handleProposalUpVote}
      {...proposal}
    />
  );
};
