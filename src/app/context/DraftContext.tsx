"use client";
import { createContext, useEffect, useState } from "react";

import { getSupabaseClient } from "../../../lib/supabase";
import useCheckTokens from "../hooks/useCheckTokens";
import { TDraftProposal } from "../types";

export const DraftContext = createContext({
  draft: {} as TDraftProposal | undefined,
  setDraft: (draft: TDraftProposal) => {},
});

export const DraftProvider = ({ children }: { children: any }) => {
  const { isAccessTokenValid } = useCheckTokens();
  const [draft, setDraft] = useState<TDraftProposal>();

  async function getDraft() {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.rpc(
      "get_proposal_draft_with_collaborators"
    );
    if (data) setDraft(data);
    if (error) console.error(error);

    console.log("draft", draft);
  }

  useEffect(() => {
    if (isAccessTokenValid) getDraft();
  }, [isAccessTokenValid]);

  return (
    <DraftContext.Provider
      value={{
        draft,
        setDraft,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};
