import type { Meta, StoryObj } from "@storybook/react";

import { FormInput } from "./Input";

export default {
  title: "Components/Form/Input",
  component: FormInput,
  argTypes: {},
} as Meta<typeof FormInput>;

type Story = StoryObj<typeof FormInput>;

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
