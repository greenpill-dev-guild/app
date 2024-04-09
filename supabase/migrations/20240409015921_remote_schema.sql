drop policy "gallery_authentication_policy_delete" on "public"."gallery_images";

drop policy "gallery_authentication_policy_insert" on "public"."gallery_images";

drop policy "gallery_authentication_policy_select" on "public"."gallery_images";

drop policy "gallery_authentication_policy_update" on "public"."gallery_images";

drop policy "collaborator_authentication_policy_delete" on "public"."proposal_draft_collaborators";

drop policy "collaborator_authentication_policy_update" on "public"."proposal_draft_collaborators";

drop policy "collaborator_draft_authentication_policy_insert" on "public"."proposal_draft_collaborators";

drop policy "collaborator_draft_authentication_policy_select" on "public"."proposal_draft_collaborators";

drop policy "proposal_draft_authentication_policy_delete" on "public"."proposal_drafts";

drop policy "proposal_draft_authentication_policy_insert" on "public"."proposal_drafts";

drop policy "proposal_draft_authentication_policy_select" on "public"."proposal_drafts";

drop policy "proposal_draft_authentication_policy_update" on "public"."proposal_drafts";

revoke delete on table "public"."gallery_images" from "anon";

revoke insert on table "public"."gallery_images" from "anon";

revoke references on table "public"."gallery_images" from "anon";

revoke select on table "public"."gallery_images" from "anon";

revoke trigger on table "public"."gallery_images" from "anon";

revoke truncate on table "public"."gallery_images" from "anon";

revoke update on table "public"."gallery_images" from "anon";

revoke delete on table "public"."gallery_images" from "authenticated";

revoke insert on table "public"."gallery_images" from "authenticated";

revoke references on table "public"."gallery_images" from "authenticated";

revoke select on table "public"."gallery_images" from "authenticated";

revoke trigger on table "public"."gallery_images" from "authenticated";

revoke truncate on table "public"."gallery_images" from "authenticated";

revoke update on table "public"."gallery_images" from "authenticated";

revoke delete on table "public"."gallery_images" from "service_role";

revoke insert on table "public"."gallery_images" from "service_role";

revoke references on table "public"."gallery_images" from "service_role";

revoke select on table "public"."gallery_images" from "service_role";

revoke trigger on table "public"."gallery_images" from "service_role";

revoke truncate on table "public"."gallery_images" from "service_role";

revoke update on table "public"."gallery_images" from "service_role";

revoke delete on table "public"."proposal_draft_collaborators" from "anon";

revoke insert on table "public"."proposal_draft_collaborators" from "anon";

revoke references on table "public"."proposal_draft_collaborators" from "anon";

revoke select on table "public"."proposal_draft_collaborators" from "anon";

revoke trigger on table "public"."proposal_draft_collaborators" from "anon";

revoke truncate on table "public"."proposal_draft_collaborators" from "anon";

revoke update on table "public"."proposal_draft_collaborators" from "anon";

revoke delete on table "public"."proposal_draft_collaborators" from "authenticated";

revoke insert on table "public"."proposal_draft_collaborators" from "authenticated";

revoke references on table "public"."proposal_draft_collaborators" from "authenticated";

revoke select on table "public"."proposal_draft_collaborators" from "authenticated";

revoke trigger on table "public"."proposal_draft_collaborators" from "authenticated";

revoke truncate on table "public"."proposal_draft_collaborators" from "authenticated";

revoke update on table "public"."proposal_draft_collaborators" from "authenticated";

revoke delete on table "public"."proposal_draft_collaborators" from "service_role";

revoke insert on table "public"."proposal_draft_collaborators" from "service_role";

revoke references on table "public"."proposal_draft_collaborators" from "service_role";

revoke select on table "public"."proposal_draft_collaborators" from "service_role";

revoke trigger on table "public"."proposal_draft_collaborators" from "service_role";

revoke truncate on table "public"."proposal_draft_collaborators" from "service_role";

revoke update on table "public"."proposal_draft_collaborators" from "service_role";

revoke delete on table "public"."proposal_draft_milestones" from "anon";

revoke insert on table "public"."proposal_draft_milestones" from "anon";

revoke references on table "public"."proposal_draft_milestones" from "anon";

revoke select on table "public"."proposal_draft_milestones" from "anon";

revoke trigger on table "public"."proposal_draft_milestones" from "anon";

revoke truncate on table "public"."proposal_draft_milestones" from "anon";

revoke update on table "public"."proposal_draft_milestones" from "anon";

revoke delete on table "public"."proposal_draft_milestones" from "authenticated";

revoke insert on table "public"."proposal_draft_milestones" from "authenticated";

revoke references on table "public"."proposal_draft_milestones" from "authenticated";

revoke select on table "public"."proposal_draft_milestones" from "authenticated";

revoke trigger on table "public"."proposal_draft_milestones" from "authenticated";

revoke truncate on table "public"."proposal_draft_milestones" from "authenticated";

revoke update on table "public"."proposal_draft_milestones" from "authenticated";

revoke delete on table "public"."proposal_draft_milestones" from "service_role";

revoke insert on table "public"."proposal_draft_milestones" from "service_role";

revoke references on table "public"."proposal_draft_milestones" from "service_role";

revoke select on table "public"."proposal_draft_milestones" from "service_role";

revoke trigger on table "public"."proposal_draft_milestones" from "service_role";

revoke truncate on table "public"."proposal_draft_milestones" from "service_role";

revoke update on table "public"."proposal_draft_milestones" from "service_role";

revoke delete on table "public"."proposal_drafts" from "anon";

revoke insert on table "public"."proposal_drafts" from "anon";

revoke references on table "public"."proposal_drafts" from "anon";

revoke select on table "public"."proposal_drafts" from "anon";

revoke trigger on table "public"."proposal_drafts" from "anon";

revoke truncate on table "public"."proposal_drafts" from "anon";

revoke update on table "public"."proposal_drafts" from "anon";

revoke delete on table "public"."proposal_drafts" from "authenticated";

revoke insert on table "public"."proposal_drafts" from "authenticated";

revoke references on table "public"."proposal_drafts" from "authenticated";

revoke select on table "public"."proposal_drafts" from "authenticated";

revoke trigger on table "public"."proposal_drafts" from "authenticated";

revoke truncate on table "public"."proposal_drafts" from "authenticated";

revoke update on table "public"."proposal_drafts" from "authenticated";

revoke delete on table "public"."proposal_drafts" from "service_role";

revoke insert on table "public"."proposal_drafts" from "service_role";

revoke references on table "public"."proposal_drafts" from "service_role";

revoke select on table "public"."proposal_drafts" from "service_role";

revoke trigger on table "public"."proposal_drafts" from "service_role";

revoke truncate on table "public"."proposal_drafts" from "service_role";

revoke update on table "public"."proposal_drafts" from "service_role";

revoke delete on table "public"."proposal_milestones" from "anon";

revoke insert on table "public"."proposal_milestones" from "anon";

revoke references on table "public"."proposal_milestones" from "anon";

revoke select on table "public"."proposal_milestones" from "anon";

revoke trigger on table "public"."proposal_milestones" from "anon";

revoke truncate on table "public"."proposal_milestones" from "anon";

revoke update on table "public"."proposal_milestones" from "anon";

revoke delete on table "public"."proposal_milestones" from "authenticated";

revoke insert on table "public"."proposal_milestones" from "authenticated";

revoke references on table "public"."proposal_milestones" from "authenticated";

revoke select on table "public"."proposal_milestones" from "authenticated";

revoke trigger on table "public"."proposal_milestones" from "authenticated";

revoke truncate on table "public"."proposal_milestones" from "authenticated";

revoke update on table "public"."proposal_milestones" from "authenticated";

revoke delete on table "public"."proposal_milestones" from "service_role";

revoke insert on table "public"."proposal_milestones" from "service_role";

revoke references on table "public"."proposal_milestones" from "service_role";

revoke select on table "public"."proposal_milestones" from "service_role";

revoke trigger on table "public"."proposal_milestones" from "service_role";

revoke truncate on table "public"."proposal_milestones" from "service_role";

revoke update on table "public"."proposal_milestones" from "service_role";

alter table "public"."gallery_images" drop constraint "fkey_user_id";

alter table "public"."proposal_draft_collaborators" drop constraint "proposal_draft_collaborators_collaborator_id_fkey";

alter table "public"."proposal_draft_collaborators" drop constraint "proposal_draft_collaborators_proposal_draft_id_fkey";

alter table "public"."proposal_draft_milestones" drop constraint "proposal_draft_milestones_proposal_drafts_id_fkey";

alter table "public"."proposal_drafts" drop constraint "proposal_drafts_user_id_fkey";

alter table "public"."proposal_milestones" drop constraint "proposal_milestones_proposal_id_fkey";

drop function if exists "public"."get_proposal_draft_with_collaborators"(proposal_draft_id uuid);

alter table "public"."gallery_images" drop constraint "gallery_images_pkey";

alter table "public"."proposal_collaborators" drop constraint "proposal_collaborators_pkey";

alter table "public"."proposal_draft_collaborators" drop constraint "proposal_draft_collaborators_pkey";

alter table "public"."proposal_draft_milestones" drop constraint "proposal_draft_milestones_pkey";

alter table "public"."proposal_drafts" drop constraint "proposal_drafts_pkey";

alter table "public"."proposal_milestones" drop constraint "proposal_milestones_pkey";

drop index if exists "public"."proposal_collaborators_pkey";

drop index if exists "public"."proposal_draft_collaborators_pkey";

drop index if exists "public"."proposal_draft_milestones_pkey";

drop index if exists "public"."proposal_drafts_pkey";

drop index if exists "public"."gallery_images_pkey";

drop index if exists "public"."proposal_milestones_pkey";

drop table "public"."gallery_images";

drop table "public"."proposal_draft_collaborators";

drop table "public"."proposal_draft_milestones";

drop table "public"."proposal_drafts";

drop table "public"."proposal_milestones";

create table "public"."images" (
    "id" uuid not null default uuid_generate_v4(),
    "image_url" text not null,
    "user_id" text not null
);


alter table "public"."images" enable row level security;

create table "public"."milestones" (
    "id" uuid not null default gen_random_uuid(),
    "proposal_id" uuid,
    "title" text not null,
    "budget" integer not null,
    "description" text not null
);


alter table "public"."milestones" enable row level security;

create table "public"."proposal_votes" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" text not null,
    "proposal_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "vote_type" boolean not null
);


alter table "public"."proposal_votes" enable row level security;

alter table "public"."proposal_collaborators" drop column "id";

alter table "public"."proposal_collaborators" alter column "proposal_id" set not null;

alter table "public"."proposals" drop column "affected_locations";

alter table "public"."proposals" drop column "allo_recipient_id";

alter table "public"."proposals" drop column "approved";

alter table "public"."proposals" drop column "community_problem";

alter table "public"."proposals" drop column "funded";

alter table "public"."proposals" drop column "key_players";

alter table "public"."proposals" drop column "minimum_budget";

alter table "public"."proposals" drop column "project_milestones";

alter table "public"."proposals" drop column "proposed_solution";

alter table "public"."proposals" drop column "registered";

alter table "public"."proposals" drop column "summary";

alter table "public"."proposals" drop column "sustainability";

alter table "public"."proposals" drop column "timeline";

alter table "public"."proposals" drop column "title";

alter table "public"."proposals" add column "banner_image" text not null;

alter table "public"."proposals" add column "budget" integer not null;

alter table "public"."proposals" add column "community" text;

alter table "public"."proposals" add column "end_date" timestamp with time zone not null;

alter table "public"."proposals" add column "milestones" jsonb;

alter table "public"."proposals" add column "name" text not null;

alter table "public"."proposals" add column "problem" text not null;

alter table "public"."proposals" add column "solution" text not null;

alter table "public"."proposals" add column "start_date" timestamp with time zone not null;

alter table "public"."proposals" alter column "author_id" set not null;

alter table "public"."proposals" alter column "created_at" set not null;

alter table "public"."proposals" alter column "location" set not null;

alter table "public"."users" drop column "allo_anchor_address";

alter table "public"."users" drop column "allo_profile_id";

alter table "public"."users" drop column "family_name";

alter table "public"."users" drop column "name";

alter table "public"."users" drop column "profile_image_url";

alter table "public"."users" drop column "safe_address";

alter table "public"."users" drop column "village_neighborhood";

alter table "public"."users" add column "location" text;

alter table "public"."users" add column "profile_image" text;

alter table "public"."users" add column "username" text;

alter table "public"."users" alter column "address" set not null;

alter table "public"."users" alter column "onboarded" set not null;

CREATE UNIQUE INDEX proposal_votes_pkey ON public.proposal_votes USING btree (id);

CREATE UNIQUE INDEX users_name_key ON public.users USING btree (username);

CREATE UNIQUE INDEX gallery_images_pkey ON public.images USING btree (id);

CREATE UNIQUE INDEX proposal_milestones_pkey ON public.milestones USING btree (id);

alter table "public"."images" add constraint "gallery_images_pkey" PRIMARY KEY using index "gallery_images_pkey";

alter table "public"."milestones" add constraint "proposal_milestones_pkey" PRIMARY KEY using index "proposal_milestones_pkey";

alter table "public"."proposal_votes" add constraint "proposal_votes_pkey" PRIMARY KEY using index "proposal_votes_pkey";

alter table "public"."images" add constraint "fkey_user_id" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."images" validate constraint "fkey_user_id";

alter table "public"."milestones" add constraint "proposal_milestones_proposal_id_fkey" FOREIGN KEY (proposal_id) REFERENCES proposals(id) not valid;

alter table "public"."milestones" validate constraint "proposal_milestones_proposal_id_fkey";

alter table "public"."proposal_votes" add constraint "public_proposal_votes_proposal_id_fkey" FOREIGN KEY (proposal_id) REFERENCES proposals(id) not valid;

alter table "public"."proposal_votes" validate constraint "public_proposal_votes_proposal_id_fkey";

alter table "public"."proposal_votes" add constraint "public_proposal_votes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."proposal_votes" validate constraint "public_proposal_votes_user_id_fkey";

alter table "public"."users" add constraint "users_name_key" UNIQUE using index "users_name_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_proposal_with_collaborators(proposal_id uuid)
 RETURNS TABLE(title text, author json, location text, summary text, affected_locations text, community_problem text, proposed_solution text, minimum_budget integer, key_players text, timeline text, collaborators json[], approved boolean, allo_recipient_id text, allo_anchor_address text)
 LANGUAGE plpgsql
AS $function$begin
  return query
  select 
	 p.name, 
   json_build_object('id', a.id, 'username', a.username, 'profile_image', a.profile_image) as author, 
	 p.location,
   p.problem, 
   p.solution, 
   p.budget, 
   p.community, 
   p.start_date,
   p.end_date,
   p.banner_image,
   case 
		when count(pc.user_id) > 0 then array_agg(json_build_object('name', u.username, 'profile_image', u.profile_image)) 
		else array[]::json[] 
	 end as collaborators,
   array_agg(json_build_object('title', m.title, 'description', m.description, 'budget', m.budget)) AS milestones

  from 
	 proposals p
   left join proposal_collaborators pc on p.id = pc.proposal_id
   left join users u on u.id = pc.user_id
   inner join users a on p.author_id = a.id
   left join milestones m ON p.id = m.proposal_id
  where p.id = $1
  group by 
	 p.name,
   p.location, 
   p.problem, 
   p.solution, 
   p.budget, 
   p.start_date,
   p.end_date,
   p.community, 
   p.banner_image,
	 a.id,
   a.name, 
   a.profile_image;
end;$function$
;

CREATE OR REPLACE FUNCTION public.get_proposals_with_collaborators()
 RETURNS TABLE(id uuid, title text, author json, location text, summary text, collaborators json[], approved boolean, allo_recipient_id text, allo_anchor_address text)
 LANGUAGE plpgsql
AS $function$begin
  return query
  select
   p.id,
   p.name,
   json_build_object('id', a.id, 'username', a.username, 'profile_image', a.profile_image) as author,
   p.location,
   p.problem,
   CASE 
      WHEN count(pc.user_id) > 0 THEN array_agg(json_build_object('username', u.username, 'profile_image', u.profile_image)) 
      ELSE '{}'::json[] -- Return an empty JSON array if no collaborators
    END AS collaborators
  from
   proposals p
   left join proposal_collaborators pc on p.id = pc.proposal_id
   left join users u on u.id = pc.user_id
   inner join users a on p.author_id = a.id
  group by
   p.id,
   p.name,
   a.id,
   a.username,
	 a.profile_image,
   p.problem;
end;$function$
;

grant delete on table "public"."images" to "anon";

grant insert on table "public"."images" to "anon";

grant references on table "public"."images" to "anon";

grant select on table "public"."images" to "anon";

grant trigger on table "public"."images" to "anon";

grant truncate on table "public"."images" to "anon";

grant update on table "public"."images" to "anon";

grant delete on table "public"."images" to "authenticated";

grant insert on table "public"."images" to "authenticated";

grant references on table "public"."images" to "authenticated";

grant select on table "public"."images" to "authenticated";

grant trigger on table "public"."images" to "authenticated";

grant truncate on table "public"."images" to "authenticated";

grant update on table "public"."images" to "authenticated";

grant delete on table "public"."images" to "service_role";

grant insert on table "public"."images" to "service_role";

grant references on table "public"."images" to "service_role";

grant select on table "public"."images" to "service_role";

grant trigger on table "public"."images" to "service_role";

grant truncate on table "public"."images" to "service_role";

grant update on table "public"."images" to "service_role";

grant delete on table "public"."milestones" to "anon";

grant insert on table "public"."milestones" to "anon";

grant references on table "public"."milestones" to "anon";

grant select on table "public"."milestones" to "anon";

grant trigger on table "public"."milestones" to "anon";

grant truncate on table "public"."milestones" to "anon";

grant update on table "public"."milestones" to "anon";

grant delete on table "public"."milestones" to "authenticated";

grant insert on table "public"."milestones" to "authenticated";

grant references on table "public"."milestones" to "authenticated";

grant select on table "public"."milestones" to "authenticated";

grant trigger on table "public"."milestones" to "authenticated";

grant truncate on table "public"."milestones" to "authenticated";

grant update on table "public"."milestones" to "authenticated";

grant delete on table "public"."milestones" to "service_role";

grant insert on table "public"."milestones" to "service_role";

grant references on table "public"."milestones" to "service_role";

grant select on table "public"."milestones" to "service_role";

grant trigger on table "public"."milestones" to "service_role";

grant truncate on table "public"."milestones" to "service_role";

grant update on table "public"."milestones" to "service_role";

grant delete on table "public"."proposal_votes" to "anon";

grant insert on table "public"."proposal_votes" to "anon";

grant references on table "public"."proposal_votes" to "anon";

grant select on table "public"."proposal_votes" to "anon";

grant trigger on table "public"."proposal_votes" to "anon";

grant truncate on table "public"."proposal_votes" to "anon";

grant update on table "public"."proposal_votes" to "anon";

grant delete on table "public"."proposal_votes" to "authenticated";

grant insert on table "public"."proposal_votes" to "authenticated";

grant references on table "public"."proposal_votes" to "authenticated";

grant select on table "public"."proposal_votes" to "authenticated";

grant trigger on table "public"."proposal_votes" to "authenticated";

grant truncate on table "public"."proposal_votes" to "authenticated";

grant update on table "public"."proposal_votes" to "authenticated";

grant delete on table "public"."proposal_votes" to "service_role";

grant insert on table "public"."proposal_votes" to "service_role";

grant references on table "public"."proposal_votes" to "service_role";

grant select on table "public"."proposal_votes" to "service_role";

grant trigger on table "public"."proposal_votes" to "service_role";

grant truncate on table "public"."proposal_votes" to "service_role";

grant update on table "public"."proposal_votes" to "service_role";

create policy "gallery_authentication_policy_delete"
on "public"."images"
as permissive
for delete
to public
using ((((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = user_id));


create policy "gallery_authentication_policy_insert"
on "public"."images"
as permissive
for insert
to public
with check ((((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = user_id));


create policy "gallery_authentication_policy_select"
on "public"."images"
as permissive
for select
to public
using (true);


create policy "gallery_authentication_policy_update"
on "public"."images"
as permissive
for update
to public
using ((((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = user_id))
with check ((((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = user_id));



