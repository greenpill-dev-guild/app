"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

import { logoutSupabase } from "../../../../lib/supabase";

import { ProposalContext } from "@/app/providers/ProposalProvider";

import useCheckTokens from "@/app/hooks/useCheckTokens";

import { ProposalList } from "@/app/components/Proposal/List";

interface ProposalViewProps {}

export const ProposalsView: React.FC<ProposalViewProps> = () => {
  const router = useRouter();
  const { ready, authenticated, logout } = usePrivy();

  const { isRefreshTokenValid } = useCheckTokens();
  const { proposals } = useContext(ProposalContext);

  if (!ready) return null;

  if (ready && !authenticated) {
    router.push("/");
  }

  if (!isRefreshTokenValid) {
    logoutSupabase();
    logout();
    router.push("/");
  }

  return <ProposalList proposals={proposals} />;
};
