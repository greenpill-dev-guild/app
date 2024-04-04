import type { Meta, StoryObj } from "@storybook/react";

import { Login } from ".";

export default {
  title: "Views/Login",
  component: Login,
  argTypes: {},
} as Meta<typeof Login>;

type Story = StoryObj<typeof Login>;

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
