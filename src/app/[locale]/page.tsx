import { unstable_setRequestLocale } from "next-intl/server";

import { Wallet } from "../views/Login";

interface HomeParams {
  locale: string;
}

export default function HomePage({
  params: { locale },
}: {
  params: HomeParams;
}) {
  unstable_setRequestLocale(locale);

  return <Wallet />;
}
