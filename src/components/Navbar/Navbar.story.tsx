import type { Meta, StoryObj } from "@storybook/react";

import { Navbar } from ".";

export default {
  title: "Components/Navbar",
  component: Navbar,
  argTypes: {},
} as Meta<typeof Navbar>;

type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
  args: {},
};

// export const Secondary: Story = {
//   args: {
//     label: "Navbar",
//   },
// };

// export const Large: Story = {
//   args: {
//     size: "large",
//   },
// };
