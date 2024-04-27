"use client";

import { usePrivy } from "@privy-io/react-auth";
import React, { createContext, useContext, useEffect, useState } from "react";

import { getSupabaseClient } from "@/modules/supabase";

import useCheckTokens from "@/app/hooks/useCheckTokens";

export const AppContext = createContext({
  user: null as TUser | null,
  users: [] as TUser[],
  userMap: new Map<string, TUser>(),
  proposals: [] as TSummaryProposal[],
  setProposals: (proposals: TSummaryProposal[]) => {},
  fetchUsers: () => {},
  fetchProposals: () => {},
  getProposalById: (proposalId: string) => new Promise<any>(() => {}),
});

export const AppProvider = ({ children }: { children: any }) => {
  const { user: privyuser } = usePrivy();
  const { isAccessTokenValid } = useCheckTokens();
  const [users, setUsers] = useState<TUser[]>([]);
  const [userMap, setUserMap] = useState<Map<string, TUser>>(new Map());
  const [proposals, setProposals] = useState<TSummaryProposal[]>([]);

  const user = userMap.get(privyuser?.id!) ?? null;

  async function fetchUsers() {
    try {
      const supabase = await getSupabaseClient();

      const { data, error } = await supabase.from("users").select();

      if (data)
        setUsers(
          data.map((user) => {
            const clientUser: TUser = {
              ...user,
              username: user.username!,
              created_at: new Date(user.created_at!),
            };

            setUserMap((prev) => prev.set(clientUser.id, clientUser));

            return clientUser;
          })
        );

      if (error) throw error;
    } catch (error) {
      console.error("Error Fetching Users", error);
    }
  }

  async function fetchProposals() {
    try {
      const supabase = await getSupabaseClient();

      const { data, error } = await supabase.rpc("get_proposals");

      if (error) throw error;
      if (data) console.log("proposals", data);

      if (data)
        setProposals(
          data.map((proposal) => ({
            ...proposal,
            start_date: new Date(proposal.start_date),
            end_date: new Date(proposal.end_date),
            votes: proposal.votes as TVote[],
          }))
        );
    } catch (error) {
      console.error("Error Fetching Proposals", error);
    }
  }

  async function getProposalById(
    proposalId: string
  ): Promise<TFullProposal | void> {
    try {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase.rpc("get_proposal", {
        proposal_id: proposalId,
      });

      if (error) throw error;
      if (!data) throw new Error("Proposal not found");
      if (data) console.log("proposal", data[0]);

      return {
        ...data[0],
        start_date: new Date(data[0].start_date),
        end_date: new Date(data[0].end_date),
        votes: data[0].votes as TVote[],
        milestones: data[0].milestones as TMilestone[],
        collaborators: data[0].collaborators as [] | null,
      };
    } catch (error) {
      console.error("Error Fetching A Proposal", error);
    }
  }

  useEffect(() => {
    if (isAccessTokenValid) fetchUsers();
    if (isAccessTokenValid) fetchProposals();
  }, [isAccessTokenValid]);

  console.log("user", user);
  console.log("users", users);
  console.log("proposals", proposals);

  return (
    <AppContext.Provider
      value={{
        user,
        users,
        userMap,
        proposals,
        setProposals,
        fetchUsers,
        fetchProposals,
        getProposalById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error(`useAppContext must be used within a AppContextProvider`);

  return context;
};
