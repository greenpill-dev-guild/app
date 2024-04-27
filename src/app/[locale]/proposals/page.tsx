import { unstable_setRequestLocale } from "next-intl/server";

import { ProposalsView } from "@/views/Proposals";

interface ProposalParams {
  locale: string;
}

export default function ProposalsPage(props: { params: ProposalParams }) {
  unstable_setRequestLocale(props.params.locale);

  return <ProposalsView />;
}
