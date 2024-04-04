import { unstable_setRequestLocale } from "next-intl/server";

import { Login } from "../views/Login";

interface IndexParams {
  locale: string;
}

export default function IndexPage({
  params: { locale },
}: {
  params: IndexParams;
}) {
  unstable_setRequestLocale(locale);

  return <Login />;
}
