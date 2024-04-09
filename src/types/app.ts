export type TCreateProposal = {
  id: string;
  name: string | null;
  location: string | null;
  problem: string | null;
  solution: string | null;
  budget: number | null;
  start_date: Date | null;
  end_date: Date | null;
  community: string | null;
  banner_image: string | null;
  milestones: TMilestone[] | null;
};

export type TSummaryProposal = {
  id: string;
  name: string | null;
  location: string | null;
  problem: string | null;
  start_date: Date | null;
  end_date: Date | null;
  banner_image: string | null;
  up_votes?: number | null;
  down_votes?: number | null;
};

export type TFullProposal = TSummaryProposal & {
  author: {
    id: string | null;
    username: string | null;
    profile_image: string | null;
  };
  solution: string | null;
  budget: number | null;
  community: string | null;
  collaborators: TCollaborator[] | null;
  milestones: TMilestone[] | null;
};

type TCollaborator = {
  id: string | null;
  username: string | null;
  profile_image: string | null;
};

export type TMilestone = {
  // id: string;
  name: string;
  budget: number;
  description: string;
};

export type TUser = {
  id: string;
  username: string | null;
  address: string | null;
  phone_number: string | null;
  email: string | null;
  location: string | null;
  profile_image: string | null;
  onboarded: boolean | null;
  created_at: string | null;
};
