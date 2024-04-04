// import "../src/app/[locale]/globals.css"; // replace with the name of your tailwind css file

import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { withNextRouter } from "storybook-addon-next-router";

import { WagmiProvider } from "../src/app/providers/WagmiProvider";
import { DraftProvider } from "../src/app/providers/DraftProvider";
import { ProposalsProvider } from "../src/app/providers/ProposalProvider";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // decorators: [withNextRouter()],
};

export default preview;
