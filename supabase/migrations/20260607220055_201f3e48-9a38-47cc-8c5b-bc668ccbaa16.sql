
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Storage RLS for csv-files bucket: users manage files under their own user_id prefix
CREATE POLICY "Users can read own csv files" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'csv-files' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can upload own csv files" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'csv-files' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update own csv files" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'csv-files' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own csv files" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'csv-files' AND auth.uid()::text = (storage.foldername(name))[1]);
