export type TCreateProposal = {
  id: string;
  title: string | null;
  location: string | null;
  community_problem: string | null;
  proposed_solution: string | null;
  minimum_budget: number | null;
  timeline: string | null;
  start_date?: Date | null;
  end_date?: Date | null;
  key_players: string | null;
  banner_image: string | null;
  milestones: TMilestone[] | null;
};

export type TSummaryProposal = {
  id: string;
  approved: boolean;
  title: string | null;
  author: {
    id: string;
    name: string | null;
    family_name: string | null;
    profile_image_url: string | null;
  };
  location: string | null;
  summary: string | null;
  collaborators: TCollaborator[] | null;
};

export type TFullProposal = TSummaryProposal & {
  timeline: string | null;
  affected_locations: string | null;
  community_problem: string | null;
  proposed_solution: string | null;
  sustainability: string | null;
  minimum_budget: number | null;
  key_players: string | null;
  start_date?: Date | null;
  end_date?: Date | null;
  banner_image: string | null;
  project_milestones: TMilestone[] | null;
};

type TCollaborator = {
  name: string | null;
  family_name: string | null;
  profile_image_url: string | null;
};

export type TMilestone = {
  name: string;
  budget: number;
  description: string;
};

// todo => note: why are we using this User and not the Collaborator type?
export type TUser = {
  id: string;
  name: string | null;
  family_name: string | null;
  address: string | null;
  created_at: string | null;
  onboarded: boolean | null;
  phone_number: string | null;
  village_neighborhood: string | null;
  email: string | null;
};

export interface IProposalProps {
  showStatus?: boolean;
  showAction?: boolean;
  showAllocation?: boolean;
}

export interface IProposalListProps {
  proposals: TSummaryProposal[];
  showStatus?: boolean;
  showAction?: boolean;
}

export interface IProposalCardProps {
  proposal: TSummaryProposal;
  showStatus: boolean;
  showAction?: boolean;
  showAllocation?: boolean;
}

export interface IEditProposalProps {
  proposal: TFullProposal;
  proposalId: string;
  setIsEditing: Function;
  reloadData: Function;
}

export interface IMilestoneProps {
  milestones?: TMilestone[] | null;
}
