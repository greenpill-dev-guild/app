"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { getSupabaseClient } from "../../../lib/supabase";
import useCheckTokens from "../[locale]/hooks/useCheckTokens";
import { TSummaryProposal } from "../types";

export const ProposalContext = createContext({
  proposals: [] as TSummaryProposal[],
  setProposals: (proposals: TSummaryProposal[]) => {},
  fetchProposals: () => {},
  getProposalById: (proposalId: string) => new Promise<any>(() => {}),
});

export const ProposalsProvider = ({ children }: { children: any[] }) => {
  const { isAccessTokenValid } = useCheckTokens();
  const [proposals, setProposals] = useState<TSummaryProposal[]>([]);

  async function fetchProposals() {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.rpc(
      "get_proposals_with_collaborators"
    );

    if (data) setProposals(data);
    if (error) console.error(error);

    console.log("proposals", data);
  }

  async function getProposalById(proposalId: string): Promise<any> {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.rpc(
      "get_proposal_with_collaborators",
      { proposal_id: proposalId }
    );

    if (data) console.log("proposal", data[0]);
    if (error) console.error(error);

    return data[0];
  }

  useEffect(() => {
    if (isAccessTokenValid) fetchProposals();
  }, [isAccessTokenValid]);

  return (
    <ProposalContext.Provider
      value={{
        proposals,
        setProposals,
        fetchProposals,
        getProposalById,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposalContext = () => {
  const context = useContext(ProposalContext);
  if (context === undefined)
    throw new Error(
      `useProposalContext must be used within a ProposalContextProvider`
    );

  return context;
};
