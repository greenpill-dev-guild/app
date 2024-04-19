drop function if exists get_proposal(uuid);

create or replace function get_proposal(proposal_id uuid)
 returns table (
  id uuid,
  author_id text,
  name text,
  location text,
  problem text,
  solution text,
  budget integer,
  start_date date,
  end_date date,
  collaborators json[],
  community text,
  banner_image text,
  milestones json[],
  votes json[],
  created_at timestamp with time zone
)
 language plpgsql
as $$
begin
  return query
  select
    p.id,
    p.author_id,
    p.name,
    p.location,
    p.problem,
    p.solution,
    p.budget,
    p.start_date,
    p.end_date,
    array_agg(
      json_build_object('id', pc.id, 'user_id', pc.user_id)
    ) filter (
      where
        pc.id is not null
    ) as collaborators,
    p.community,
    p.banner_image,
    array_agg(
      json_build_object(
        'id',
        m.id,
        'proposal_id',
        m.proposal_id,
        'name',
        m.name,
        'description',
        m.description,
        'budget',
        m.budget
      )
    ) filter (
      where
        m.id is not null
    ) as milestones,
    array_agg(
      json_build_object(
        'id',
        pv.id,
        'user_id',
        pv.user_id,
        'proposal_id',
        pv.proposal_id,
        'vote_type',
        pv.vote_type,
        'created_at',
        pv.created_at
      )
    ) filter (
      where
        pv.vote_type = true
    ) as votes,
    p.created_at
  from
    proposals p
    left join milestones m on p.id = m.proposal_id
    left join proposal_votes pv on p.id = pv.proposal_id
    left join proposal_collaborators pc on p.id = pc.proposal_id
  where
    p.id = $1
  group by
    p.id;
end;
$$;
