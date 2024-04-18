drop function if exists get_proposals();
drop function if exists get_proposal(uuid);

create or replace function get_proposals()
returns table (
  id uuid,
  author_id text,
  name text,
  location text,
  problem text,
  start_date date,
  end_date date,
  banner_image text,
  votes json[]
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
    p.start_date,
    p.end_date,
    p.banner_image,
    json_agg(pv.*) filter (
      where
        pv.vote_type = true
    ) as votes
  from
    proposals p
    left join proposal_votes pv on p.id = pv.proposal_id
  group by
    p.id;
end;
$$;

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
  votes json[]
)
 language plpgsql
as $$
begin
  return query
  select
    p.*,
    json_agg(pc.*) as collaborators,
    json_agg(m.*) as milestones,
    json_agg(v.*) filter (
      where
        v.vote_type = true
    ) as votes
  from
    proposals p
    left join milestones m on p.id = m.proposal_id
    left join proposal_votes v on p.id = v.proposal_id
    left join proposal_collaborators pc on p.id = pc.proposal_id
  where
    p.id = $1
  group by
    p.id;
end;
$$;
