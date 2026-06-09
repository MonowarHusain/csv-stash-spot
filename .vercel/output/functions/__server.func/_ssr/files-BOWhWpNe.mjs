import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-DZ2pG0kF.mjs";
import { A as AppHeader, B as Button } from "./AppHeader-C3JBXMyi.mjs";
import { C as CsvDropzone } from "./CsvDropzone-BusOz_D8.mjs";
import { C as Card } from "./card-C6fibyyW.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { parseCsv, toCsvString } from "./csv-DQ2obxKo.mjs";
import { S as Skeleton } from "./skeleton-DvVf561-.mjs";
import "../_libs/papaparse.mjs";
import { F as FileSpreadsheet, T as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
function FilesPage() {
  const [files, setFiles] = reactExports.useState(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const navigate = useNavigate();
  async function load() {
    const {
      data,
      error
    } = await supabase.from("csv_files").select("id,name,storage_path,row_count,size_bytes,created_at").order("created_at", {
      ascending: false
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    setFiles(data);
  }
  reactExports.useEffect(() => {
    load();
  }, []);
  async function handleUpload(file, text) {
    setUploading(true);
    try {
      const parsed = parseCsv(text);
      const {
        data: userData
      } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not signed in");
      const csv = toCsvString(parsed);
      const blob = new Blob([csv], {
        type: "text/csv"
      });
      const path = `${userData.user.id}/${crypto.randomUUID()}.csv`;
      const up = await supabase.storage.from("csv-files").upload(path, blob, {
        contentType: "text/csv"
      });
      if (up.error) throw up.error;
      const ins = await supabase.from("csv_files").insert({
        user_id: userData.user.id,
        name: file.name,
        storage_path: path,
        columns: parsed.columns,
        row_count: parsed.rows.length,
        size_bytes: blob.size
      }).select("id").single();
      if (ins.error) throw ins.error;
      toast.success("Uploaded");
      navigate({
        to: "/view/$id",
        params: {
          id: ins.data.id
        }
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }
  async function remove(f) {
    if (!confirm(`Delete "${f.name}"?`)) return;
    await supabase.storage.from("csv-files").remove([f.storage_path]);
    const {
      error
    } = await supabase.from("csv_files").delete().eq("id", f.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      load();
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[image:var(--gradient-subtle)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-baseline justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "My files" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "All your saved CSVs in one place." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CsvDropzone, { compact: true, onFile: handleUpload }),
        uploading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Uploading…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: files === null ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2 lg:grid-cols-3", children: Array.from({
        length: 3
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full" }, i)) }) : files.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-10 text-center text-sm text-muted-foreground", children: "No files yet. Upload one above to get started." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2 lg:grid-cols-3", children: files.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "group p-4 transition-shadow hover:shadow-[var(--shadow-card)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/view/$id", params: {
            id: f.id
          }, className: "block truncate font-medium hover:text-primary", children: f.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            f.row_count.toLocaleString(),
            " rows · ",
            formatBytes(f.size_bytes),
            " ·",
            " ",
            new Date(f.created_at).toLocaleDateString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "opacity-0 transition-opacity group-hover:opacity-100", onClick: () => remove(f), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-muted-foreground" }) })
      ] }) }, f.id)) }) })
    ] })
  ] });
}
function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
export {
  FilesPage as component
};
