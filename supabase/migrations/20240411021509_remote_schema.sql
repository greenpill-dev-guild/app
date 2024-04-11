alter table "public"."milestones" drop column "title";

alter table "public"."milestones" add column "name" text not null;

alter table "public"."proposals" alter column "end_date" set data type date using "end_date"::date;

alter table "public"."proposals" alter column "start_date" set data type date using "start_date"::date;


