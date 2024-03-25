"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

import { IProposalProps } from "@/app/types";
import { ProposalContext } from "@/app/context/ProposalContext";

import { logoutSupabase } from "../../../../../lib/supabase";
import useCheckTokens from "../../../hooks/useCheckTokens";
import ProposalList from "./ProposalList";

export default function Proposal(props: IProposalProps) {
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
}
