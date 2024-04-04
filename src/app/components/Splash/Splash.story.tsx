import type { Meta, StoryObj } from "@storybook/react";

import Splash from ".";

export default {
  title: "Components/Splash",
  component: Splash,
  argTypes: {},
} as Meta<typeof Splash>;

type Story = StoryObj<typeof Splash>;

export const Primary: Story = {
  args: {},
};

// export const Secondary: Story = {
//   args: {
//     label: "Splash",
//   },
// };

// export const Large: Story = {
//   args: {
//     size: "large",
//   },
// };
