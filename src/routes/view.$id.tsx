import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { CsvViewer } from "@/components/CsvViewer";
import { parseCsv, toCsvString, type CsvData } from "@/lib/csv";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/view/$id")({
  head: () => ({ meta: [{ title: "View file — CSV Studio" }] }),
  component: ViewPage,
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-2xl p-8 text-center">
        <h1 className="text-xl font-semibold">Couldn't open this file</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </main>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-2xl p-8 text-center">
        <h1 className="text-xl font-semibold">File not found</h1>
      </main>
    </div>
  ),
});

function ViewPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<CsvData | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [storagePath, setStoragePath] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        navigate({ to: "/auth" });
        return;
      }
      const { data: file, error } = await supabase
        .from("csv_files")
        .select("id,name,storage_path,user_id")
        .eq("id", id)
        .maybeSingle();
      if (error || !file) {
        toast.error("File not found");
        return;
      }
      setName(file.name);
      setStoragePath(file.storage_path);
      setIsOwner(file.user_id === userData.user.id);
      const dl = await supabase.storage.from("csv-files").download(file.storage_path);
      if (dl.error) {
        toast.error(dl.error.message);
        return;
      }
      const text = await dl.data.text();
      setData(parseCsv(text));
    })();
  }, [id, navigate]);

  async function handleSave(d: CsvData, newName: string) {
    if (!storagePath) return;
    setSaving(true);
    try {
      const csv = toCsvString(d);
      const blob = new Blob([csv], { type: "text/csv" });
      const up = await supabase.storage
        .from("csv-files")
        .update(storagePath, blob, { contentType: "text/csv", upsert: true });
      if (up.error) throw up.error;
      const { error } = await supabase
        .from("csv_files")
        .update({
          name: newName,
          columns: d.columns,
          row_count: d.rows.length,
          size_bytes: blob.size,
        })
        .eq("id", id);
      if (error) throw error;
      toast.success("Saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleShare() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const existing = await supabase
      .from("csv_shares")
      .select("share_token")
      .eq("file_id", id)
      .maybeSingle();
    let token = existing.data?.share_token;
    if (!token) {
      token = crypto.randomUUID().replace(/-/g, "");
      const ins = await supabase.from("csv_shares").insert({
        file_id: id,
        user_id: userData.user.id,
        share_token: token,
      });
      if (ins.error) {
        toast.error(ins.error.message);
        return;
      }
      await supabase.from("csv_files").update({ is_public: true }).eq("id", id);
    }
    const url = `${window.location.origin}/share/${token}`;
    await navigator.clipboard.writeText(url);
    toast.success("Share link copied", { description: url });
  }

  return (
    <div className="min-h-screen bg-[image:var(--gradient-subtle)]">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-6">
        {data ? (
          <CsvViewer
            initial={data}
            fileName={name}
            onSave={isOwner ? handleSave : undefined}
            onShare={isOwner ? handleShare : undefined}
            saving={saving}
          />
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