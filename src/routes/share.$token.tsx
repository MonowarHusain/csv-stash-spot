import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { CsvViewer } from "@/components/CsvViewer";
import { parseCsv, type CsvData } from "@/lib/csv";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export const Route = createFileRoute("/share/$token")({
  head: () => ({
    meta: [
      { title: "Shared CSV — CSV Studio" },
      { name: "description", content: "A CSV file shared with you via CSV Studio." },
    ],
  }),
  component: SharePage,
  errorComponent: ({ error }) => <ErrorBox msg={error.message} />,
  notFoundComponent: () => <ErrorBox msg="Share link not found" />,
});

function SharePage() {
  const { token } = Route.useParams();
  const [data, setData] = useState<CsvData | null>(null);
  const [name, setName] = useState("Shared file");

  useEffect(() => {
    (async () => {
      const { data: share } = await supabase
        .from("csv_shares")
        .select("file_id")
        .eq("share_token", token)
        .maybeSingle();
      if (!share) {
        toast.error("Share link not found");
        return;
      }
      const { data: file } = await supabase
        .from("csv_files")
        .select("name,storage_path")
        .eq("id", share.file_id)
        .maybeSingle();
      if (!file) return;
      setName(file.name);
      // public bucket files would use getPublicUrl; ours is private, so use signed URL via service through download (anon SELECT on bucket disallowed).
      // Use a short-lived signed URL via the storage REST — for private bucket, fall back to download which needs read policy.
      // Since bucket is private and policy requires owner: we use admin via signed URL function — but client can't sign. So serve csv content via a signed URL fetched from edge function would be ideal.
      // Simpler: for shared files we mark as public and store content alongside or use a server fn. For now expose via signed URL using service role through an api route.
      const res = await fetch(`/api/public/share/${token}`);
      if (!res.ok) {
        toast.error("Could not load shared file");
        return;
      }
      const text = await res.text();
      setData(parseCsv(text));
    })();
  }, [token]);

  return (
    <div className="min-h-screen bg-[image:var(--gradient-subtle)]">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-6">
        {data ? (
          <CsvViewer initial={data} fileName={name} readOnly />
        ) : (
          <div className="space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-[60vh] w-full" />
          </div>
        )}
      </main>
    </div>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-2xl p-8 text-center">
        <h1 className="text-xl font-semibold">Couldn't open this share</h1>
        <p className="mt-2 text-sm text-muted-foreground">{msg}</p>
      </main>
    </div>
  );
}