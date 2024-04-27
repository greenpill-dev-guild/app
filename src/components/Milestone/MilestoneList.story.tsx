import type { Meta, StoryObj } from "@storybook/react";

import { MilestoneList } from "./List";

export default {
  title: "Components/Milestone/List",
  component: MilestoneList,
  argTypes: {},
} as Meta<typeof MilestoneList>;

type Story = StoryObj<typeof MilestoneList>;

export const Primary: Story = {
  args: {},
};

// export const Secondary: Story = {
//   args: {
//     label: "MilestoneList",
//   },

// export const Large: Story = {
//   args: {
//     size: "large",
//   },
// };
