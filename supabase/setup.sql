-- Run once in Supabase: SQL Editor → New query → paste → Run.

-- Public bucket so the site and widget can show the photo.
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

-- Let the site upload/replace the photo with the anon key (upsert needs all three).
create policy "polaroid select" on storage.objects for select to anon using (bucket_id = 'photos');
create policy "polaroid insert" on storage.objects for insert to anon with check (bucket_id = 'photos');
create policy "polaroid update" on storage.objects for update to anon using (bucket_id = 'photos');
