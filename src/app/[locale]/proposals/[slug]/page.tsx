"use client";

import React from "react";

import ProposalView from "@/app/views/Proposals/Proposal";

export default function ProposalPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  return <ProposalView params={params} />;
}
