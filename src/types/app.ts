export type TCreateProposal = {
  name: string;
  location: string;
  problem: string;
  solution: string;
  budget: number;
  start_date: Date;
  end_date: Date;
  collaborators?: string[];
  community?: string | null;
  banner_image: string;
  milestones: TMilestone[];
};

export type TSummaryProposal = {
  id: string;
  name: string;
  location: string;
  problem: string;
  start_date: Date;
  end_date: Date;
  banner_image: string;
  votes: TVote[];
};

export type TFullProposal = TSummaryProposal & {
  author_id: string | null;
  solution: string;
  budget: number;
  community?: string | null;
  collaboraxtors: TCollaborator[] | null;
  milestones: TMilestone[];
};

type TCollaborator = {
  id: string | null;
  username: string | null;
  // profile_image: string | null;
  created_at: Date;
};

export type TMilestone = {
  // id: string;
  name: string;
  budget: number;
  description: string;
  // created_at: Date;
};

export type TUser = {
  id: string;
  username: string;
  address: string | null;
  phone_number: string | null;
  email: string | null;
  location: string | null;
  profile_image: string | null;
  onboarded: boolean | null;
  created_at?: Date;
};

export type TVote = {
  id: string;
  proposal_id: string;
  user_id: string;
  vote_type: boolean | null;
  created_at: string;
};
