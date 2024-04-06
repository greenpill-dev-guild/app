import { unstable_setRequestLocale } from "next-intl/server";

import { OnboardingView } from "../../views/Onboarding";

interface OnboardingParams {
  locale: string;
}

export default function OnboardingPage(props: { params: OnboardingParams }) {
  unstable_setRequestLocale(props.params.locale);

  return <OnboardingView />;
}
