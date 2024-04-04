import type { Meta, StoryObj } from "@storybook/react";

import { FormProgress } from "./Progress";

export default {
  title: "Components/Form/Progress",
  component: FormProgress,
  argTypes: {},
} as Meta<typeof FormProgress>;

type Story = StoryObj<typeof FormProgress>;

export const Primary: Story = {
  args: {},
};

// export const Secondary: Story = {
//   args: {
//     label: "MilestoneForm",
//   },

// export const Large: Story = {
//   args: {
//     size: "large",
//   },
// };
