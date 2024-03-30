import type { Meta, StoryObj } from "@storybook/react";

import ProposaCard from "./Card";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Proposal/Card",
  component: ProposaCard,
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
} satisfies Meta<typeof ProposaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    proposal: {
      id: "1",
      title: "Proposal Title",
      summary: "Proposal Description",
      approved: true,
      location: "Proposal Location",
      author: {
        name: "Author Name",
        family_name: "Family Name",
        profile_image_url: "https://via.placeholder.com/150",
        id: "1",
      },
      allo_recipient_id: "1",
      allo_anchor_address: "0x1234567890",
      collaborators: [
        {
          name: "Collaborator 1",
          family_name: "Family Name",
          profile_image_url: "https://via.placeholder.com/150",
        },
        {
          name: "Collaborator 2",
          family_name: "Family Name",
          profile_image_url: "https://via.placeholder.com/150",
        },
        {
          name: "Collaborator 3",
          family_name: "Family Name",
          profile_image_url: "https://via.placeholder.com/150",
        },
        {
          name: "Collaborator 4",
          family_name: "Family Name",
          profile_image_url: "https://via.placeholder.com/150",
        },
      ],
    },
    showStatus: true,
    showAction: true,
    showAllocation: true,
  },
};

// export const Secondary: Story = {
//   args: {
//     label: "ProposaCard",
//   },
// };

// export const Large: Story = {
//   args: {
//     size: "large",
//     label: "ProposaCard",
//   },
// };

// export const Small: Story = {
//   args: {
//     size: "small",
//     label: "ProposaCard",
//   },
// };
