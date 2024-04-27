import type { Meta, StoryObj } from "@storybook/react";

import { ProposalCard } from "./Card";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Proposal/Card",
  component: ProposalCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof ProposalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    id: "1",
    onCardClick: () => console.log("Card Clicked"),
    name: "Proposal Title",
    problem: "Proposal Description",
    location: "Proposal Location",
    onUpVote: () => console.log("Up Vote Clicked"),
    banner_image: "https://via.placeholder.com/150",
    start_date: new Date(),
    end_date: new Date(),
    votes: [],
  },
};

// export const Secondary: Story = {
//   args: {
//     label: "ProposalCard",
//   },
// };

// export const Large: Story = {
//   args: {
//     size: "large",
//     label: "ProposalCard",
//   },
// };

// export const Small: Story = {
//   args: {
//     size: "small",
//     label: "ProposalCard",
//   },
// };
