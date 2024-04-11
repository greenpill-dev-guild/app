alter table proposal_collaborators add column id combined_id;

alter table proposal_collaborators add constraint proposal_collaborators_pkey primary key (id);