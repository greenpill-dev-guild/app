import type { Meta, StoryObj } from "@storybook/react";

import { FormSelect } from "./Select";

export default {
  title: "Components/Form/Select",
  component: FormSelect,
  argTypes: {},
} as Meta<typeof FormSelect>;

type Story = StoryObj<typeof FormSelect>;

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
