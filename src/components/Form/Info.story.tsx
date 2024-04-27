import type { Meta, StoryObj } from "@storybook/react";

import { FormInfo } from "./Info";

export default {
  title: "Components/Form/Info",
  component: FormInfo,
  argTypes: {},
} as Meta<typeof FormInfo>;

type Story = StoryObj<typeof FormInfo>;

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
