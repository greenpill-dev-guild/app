"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePrivy } from "@privy-io/react-auth";

import { getSupabaseClient, logoutSupabase } from "@/modules/supabase";

import { useApp } from "@/providers/AppProvider";

import useCheckTokens from "@/hooks/useCheckTokens";

import { ProposalList } from "@/components/Proposal/List";

interface ProposalViewProps {}

export const ProposalsView: React.FC<ProposalViewProps> = () => {
  const router = useRouter();
  const t = useTranslations("Proposals");
  const { ready, authenticated, logout } = usePrivy();

  const { user, proposals } = useApp();
  const { isRefreshTokenValid } = useCheckTokens();

  function handleProposalClick(id: string) {
    router.push(`/proposals/${id}`);
  }

  async function handleProposalVote(proposalId: string, vote: boolean | null) {
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

  if (!ready) return null;

  if (ready && !authenticated) {
    router.push("/");
  }

  if (!isRefreshTokenValid) {
    logoutSupabase();
    logout();
    router.push("/");
  }

  return (
    <div className="h-full w-full py-6 px-4 flex flex-col">
      <h2 className="font-bold text-3xl">{t("heading")}</h2>
      <ProposalList
        user={user}
        proposals={proposals}
        onProposalClick={handleProposalClick}
        onProposalVote={handleProposalVote}
        noProposalsMessage={t("nullMessage")}
      />
    </div>
  );
};
