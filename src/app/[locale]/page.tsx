import { Wallet } from "../components/Wallet";
import { unstable_setRequestLocale } from "next-intl/server";

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
