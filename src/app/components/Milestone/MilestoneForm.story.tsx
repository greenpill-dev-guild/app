import type { Meta, StoryObj } from "@storybook/react";

import { MilestoneForm } from "./Form";

export default {
  title: "Components/Milestone",
  component: MilestoneForm,
  argTypes: {},
} as Meta<typeof MilestoneForm>;

type Story = StoryObj<typeof MilestoneForm>;

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
