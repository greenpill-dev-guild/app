drop function if exists "public"."get_proposal_with_collaborators"(proposal_id uuid);

drop function if exists "public"."get_proposals_with_collaborators"();

alter table "public"."milestones" alter column "proposal_id" set not null;

alter table "public"."milestones" disable row level security;

alter table "public"."proposal_votes" alter column "vote_type" drop not null;

alter table "public"."proposal_votes" disable row level security;

alter table "public"."proposals" drop column "milestones";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_proposal(proposal_id uuid)
 RETURNS TABLE(title text, author json, location text, summary text, affected_locations text, community_problem text, proposed_solution text, minimum_budget integer, key_players text, timeline text, collaborators json[], approved boolean, allo_recipient_id text, allo_anchor_address text)
 LANGUAGE plpgsql
AS $function$begin
  return query

  select
    p.*,
    json_agg(m.*) as milestones,
    json_agg(v.*) filter (
      where
        v.vote_type = true
    ) as votes,
    json_agg(pc.*) as collaborators

  from
    proposals p
    left join milestones m on p.id = m.proposal_id
    left join proposal_votes v on p.id = v.proposal_id
    left join proposal_collaborators pc on p.id = pc.proposal_id

  where
    p.id = $1
    
  group by
    p.id;
end;$function$
;

CREATE OR REPLACE FUNCTION public.get_proposals()
 RETURNS TABLE(id uuid, title text, author json, location text, summary text, collaborators json[], approved boolean, allo_recipient_id text, allo_anchor_address text)
 LANGUAGE plpgsql
AS $function$begin
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
end;$function$
;


