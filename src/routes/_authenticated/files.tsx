import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { CsvDropzone } from "@/components/CsvDropzone";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { parseCsv, toCsvString } from "@/lib/csv";
import { FileSpreadsheet, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type FileRow = {
  id: string;
  name: string;
  storage_path: string;
  row_count: number;
  size_bytes: number;
  created_at: string;
};

export const Route = createFileRoute("/_authenticated/files")({
  head: () => ({ meta: [{ title: "My files — CSV Studio" }] }),
  component: FilesPage,
});

function FilesPage() {
  const [files, setFiles] = useState<FileRow[] | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  async function load() {
    const { data, error } = await supabase
      .from("csv_files")
      .select("id,name,storage_path,row_count,size_bytes,created_at")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error(error.message);
      return;
    }
    setFiles(data as FileRow[]);
  }

  useEffect(() => { load(); }, []);

  async function handleUpload(file: File, text: string) {
    setUploading(true);
    try {
      const parsed = parseCsv(text);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not signed in");
      const csv = toCsvString(parsed);
      const blob = new Blob([csv], { type: "text/csv" });
      const path = `${userData.user.id}/${crypto.randomUUID()}.csv`;
      const up = await supabase.storage.from("csv-files").upload(path, blob, {
        contentType: "text/csv",
      });
      if (up.error) throw up.error;
      const ins = await supabase
        .from("csv_files")
        .insert({
          user_id: userData.user.id,
          name: file.name,
          storage_path: path,
          columns: parsed.columns,
          row_count: parsed.rows.length,
          size_bytes: blob.size,
        })
        .select("id")
        .single();
      if (ins.error) throw ins.error;
      toast.success("Uploaded");
      navigate({ to: "/view/$id", params: { id: ins.data.id } });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function remove(f: FileRow) {
    if (!confirm(`Delete "${f.name}"?`)) return;
    await supabase.storage.from("csv-files").remove([f.storage_path]);
    const { error } = await supabase.from("csv_files").delete().eq("id", f.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      load();
    }
  }

  return (
    <div className="min-h-screen bg-[image:var(--gradient-subtle)]">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My files</h1>
            <p className="text-sm text-muted-foreground">All your saved CSVs in one place.</p>
          </div>
        </div>

        <div className="mt-6">
          <CsvDropzone compact onFile={handleUpload} />
          {uploading && <p className="mt-2 text-xs text-muted-foreground">Uploading…</p>}
        </div>

        <div className="mt-8">
          {files === null ? (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full" />
              ))}
            </div>
          ) : files.length === 0 ? (
            <Card className="p-10 text-center text-sm text-muted-foreground">
              No files yet. Upload one above to get started.
            </Card>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {files.map((f) => (
                <Card key={f.id} className="group p-4 transition-shadow hover:shadow-[var(--shadow-card)]">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                      <FileSpreadsheet className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <Link
                        to="/view/$id"
                        params={{ id: f.id }}
                        className="block truncate font-medium hover:text-primary"
                      >
                        {f.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {f.row_count.toLocaleString()} rows · {formatBytes(f.size_bytes)} ·{" "}
                        {new Date(f.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => remove(f)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}