import type { Meta, StoryObj } from "@storybook/react";

import { Wallet } from ".";

export default {
  title: "Views/Login",
  component: Wallet,
  argTypes: {},
} as Meta<typeof Wallet>;

type Story = StoryObj<typeof Wallet>;

export const Primary: Story = {
  args: {},
};

// export const Secondary: Story = {
//   args: {
//     label: "Wallet",
//   },

// export const Large: Story = {
//   args: {
//     size: "large",
//   },
// };
