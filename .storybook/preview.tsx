import "../src/app/globals.css"; // replace with the name of your tailwind css file

import React from "react";
import { NextIntlClientProvider } from "next-intl";

import { Web3Provider } from "../src/app/providers/Web3Provider";
import { ProposalsProvider } from "../src/app/providers/ProposalProvider";

import { PrelineScript } from "../src/app/utils/preline-script";

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
  decorators: [
    (story) => (
      <>
        <NextIntlClientProvider>
          <Web3Provider>
            <ProposalsProvider>{story}</ProposalsProvider>
          </Web3Provider>
        </NextIntlClientProvider>
        <PrelineScript />
      </>
    ),
  ],
};

export default preview;
