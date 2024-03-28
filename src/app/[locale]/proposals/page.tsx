import { unstable_setRequestLocale } from "next-intl/server";

import Proposal from "./components/Proposal";

interface ProposalParams {
  locale: string;
}

export default function ProposalPage(props: { params: ProposalParams }) {
  unstable_setRequestLocale(props.params.locale);

  return <Proposal showAction={true} />;
}
