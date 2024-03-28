import { unstable_setRequestLocale } from "next-intl/server";

import Proposal from "../components/Proposal";

interface MyProposalsParams {
  locale: string;
}

// TODO: sort by user owned proposals
export default function MyProposalsPage(props: { params: MyProposalsParams }) {
  unstable_setRequestLocale(props.params.locale);

  return <Proposal showAction={false} showStatus={true} />;
}
