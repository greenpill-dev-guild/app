import type { Meta, StoryObj } from "@storybook/react";

import { ProposalList } from "./List";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Proposal/List",
  component: ProposalList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onProposalClick: () => {},
    onProposalVote: () => {},
    noProposalsMessage: "No proposals available",
    user: {
      id: "1",
      username: "John Doe",
      email: "",
      address: "",
      location: "",
      profile_image: "",
      onboarded: false,
      phone_number: "",
      created_at: new Date(),
    },
  },
} satisfies Meta<typeof ProposalList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    proposals: [
      {
        id: "1",
        name: "Proposal Title",
        problem: "Proposal Description",
        location: "Proposal Location",
        banner_image: "https://via.placeholder.com/150",
        start_date: new Date(),
        end_date: new Date(),
        votes: [],
      },
      {
        id: "2",
        name: "Proposal Title",
        problem: "Proposal Description",
        location: "Proposal Location",
        banner_image: "https://via.placeholder.com/150",
        start_date: new Date(),
        end_date: new Date(),
        votes: [],
      },
      {
        id: "3",
        name: "Proposal Title",
        problem: "Proposal Description",
        location: "Proposal Location",
        banner_image: "https://via.placeholder.com/150",
        start_date: new Date(),
        end_date: new Date(),
        votes: [],
      },
    ],
  },
};

// export const Secondary: Story = {
//   args: {
//     label: "ProposalList",
//   },
// };

// export const Large: Story = {
//   args: {
//     size: "large",
//     label: "ProposalList",
//   },
// };

// export const Small: Story = {
//   args: {
//     size: "small",
//     label: "ProposalList",
//   },
// };
