import { unstable_setRequestLocale } from "next-intl/server";

import Onboarding from "./components/Onboarding";

interface OnboardingParams {
  locale: string;
}

export default function OnboardingPage(props: { params: OnboardingParams }) {
  unstable_setRequestLocale(props.params.locale);

  return <Onboarding />;
}
