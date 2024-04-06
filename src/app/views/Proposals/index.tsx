"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

import { logoutSupabase } from "../../../../lib/supabase";

import { IProposalProps } from "@/app/types";
import useCheckTokens from "@/app/hooks/useCheckTokens";
import { ProposalContext } from "@/app/providers/ProposalProvider";

import ProposalList from "@/app/components/Proposal/List";

export const ProposalsView = (props: IProposalProps) => {
  const { ready, authenticated, logout } = usePrivy();
  const { isRefreshTokenValid } = useCheckTokens();
  const router = useRouter();
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

  return (
    <div>
      <ProposalList
        proposals={proposals}
        showAction={props.showAction!}
        showStatus={props.showStatus ?? false}
      />
    </div>
  );
};
