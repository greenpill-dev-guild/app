import type { Meta, StoryObj } from "@storybook/react";

import { FormText } from "./Text";

export default {
  title: "Components/Form/Text",
  component: FormText,
  argTypes: {},
} as Meta<typeof FormText>;

type Story = StoryObj<typeof FormText>;

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
