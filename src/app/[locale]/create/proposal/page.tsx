"use client";

import { CreateProposalView } from "@/app/views/Proposals/CreateProposal";

interface CreateProposalParams {
  locale: string;
}

export default function CreateProposalPage(props: {
  params: CreateProposalParams;
}) {
  return <CreateProposalView />;
}
