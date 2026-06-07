import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { CsvDropzone } from "@/components/CsvDropzone";
import { CsvViewer } from "@/components/CsvViewer";
import { parseCsv, type CsvData } from "@/lib/csv";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Sparkles, Database, Share2, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CSV Studio — view, edit and share CSV files" },
      { name: "description", content: "Open any CSV in your browser. Sort, filter, edit, chart and share — with optional cloud sync for your files." },
      { property: "og:title", content: "CSV Studio — view, edit and share CSV files" },
      { property: "og:description", content: "Open any CSV in your browser. Sort, filter, edit, chart and share — with optional cloud sync." },
    ],
  }),
  component: Index,
});

function Index() {
  const [data, setData] = useState<CsvData | null>(null);
  const [name, setName] = useState("untitled.csv");
  const [saving, setSaving] = useState(false);

  async function handleSave(d: CsvData, fileName: string) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      toast.error("Sign in to save files");
      return;
    }
    setSaving(true);
    try {
      const csv = (await import("@/lib/csv")).toCsvString(d);
      const blob = new Blob([csv], { type: "text/csv" });
      const path = `${userData.user.id}/${crypto.randomUUID()}.csv`;
      const up = await supabase.storage.from("csv-files").upload(path, blob, {
        contentType: "text/csv",
        upsert: false,
      });
      if (up.error) throw up.error;
      const { error } = await supabase.from("csv_files").insert({
        user_id: userData.user.id,
        name: fileName,
        storage_path: path,
        columns: d.columns,
        row_count: d.rows.length,
        size_bytes: blob.size,
      });
      if (error) throw error;
      toast.success("Saved to your library");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[image:var(--gradient-subtle)]">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        {data ? (
          <div className="space-y-4">
            <button
              onClick={() => setData(null)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              ← Open a different file
            </button>
            <CsvViewer
              initial={data}
              fileName={name}
              onSave={handleSave}
              saving={saving}
              saveLabel="Save to library"
            />
          </div>
        ) : (
          <div className="grid gap-10 py-6 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> Fast, private, cloud-synced
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                The cleanest way to <span className="bg-[image:var(--gradient-hero)] bg-clip-text text-transparent">read your CSVs</span>
              </h1>
              <p className="mt-4 max-w-lg text-muted-foreground">
                Drop a CSV to instantly browse, sort, filter and chart it.
                Sign in to keep your files in the cloud and share them with a link.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Feature icon={<Database className="h-4 w-4" />} title="Cloud library" desc="Saved files synced to your account." />
                <Feature icon={<Share2 className="h-4 w-4" />} title="Share via link" desc="Read-only links for collaborators." />
                <Feature icon={<Sparkles className="h-4 w-4" />} title="Charts & stats" desc="Auto insights on numeric columns." />
                <Feature icon={<Shield className="h-4 w-4" />} title="Private by default" desc="Files locked to your account." />
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Don't have an account? <Link to="/auth" className="text-primary hover:underline">Create one in seconds</Link>.
              </p>
            </div>
            <CsvDropzone
              onFile={(file, text) => {
                try {
                  const parsed = parseCsv(text);
                  if (parsed.columns.length === 0) {
                    toast.error("Couldn't detect any columns in that file");
                    return;
                  }
                  setData(parsed);
                  setName(file.name);
                } catch (e) {
                  toast.error(e instanceof Error ? e.message : "Failed to parse CSV");
                }
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Card className="p-3">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary">{icon}</span>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
    </Card>
  );
}
