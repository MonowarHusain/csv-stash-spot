import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/share/$token")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const token = params.token;
        if (!token || !/^[a-zA-Z0-9_-]{8,128}$/.test(token)) {
          return new Response("Invalid token", { status: 400 });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: share, error } = await supabaseAdmin
          .from("csv_shares")
          .select("file_id")
          .eq("share_token", token)
          .maybeSingle();
        if (error || !share) return new Response("Not found", { status: 404 });
        const { data: file } = await supabaseAdmin
          .from("csv_files")
          .select("storage_path,name")
          .eq("id", share.file_id)
          .maybeSingle();
        if (!file) return new Response("Not found", { status: 404 });
        const dl = await supabaseAdmin.storage.from("csv-files").download(file.storage_path);
        if (dl.error || !dl.data) return new Response("Not found", { status: 404 });
        const text = await dl.data.text();
        return new Response(text, {
          status: 200,
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});