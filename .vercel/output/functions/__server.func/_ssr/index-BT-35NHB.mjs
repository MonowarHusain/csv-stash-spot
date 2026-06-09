import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppHeader } from "./AppHeader-C3JBXMyi.mjs";
import { C as CsvDropzone } from "./CsvDropzone-BusOz_D8.mjs";
import { C as CsvViewer } from "./CsvViewer-biGO0YVO.mjs";
import { parseCsv } from "./csv-DQ2obxKo.mjs";
import { s as supabase } from "./client-DZ2pG0kF.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { C as Card } from "./card-C6fibyyW.mjs";
import "../_libs/papaparse.mjs";
import { S as Sparkles, D as Database, a as Share2, b as Shield } from "../_libs/lucide-react.mjs";
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
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "./input-DlM87v_X.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/recharts.mjs";
import "../_libs/es-toolkit.mjs";
import "../_libs/reselect.mjs";
import "../_libs/react-is.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/reduxjs__toolkit.mjs";
import "../_libs/redux.mjs";
import "../_libs/immer.mjs";
import "../_libs/redux-thunk.mjs";
import "../_libs/react-redux.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
function Index() {
  const [data, setData] = reactExports.useState(null);
  const [name, setName] = reactExports.useState("untitled.csv");
  const [saving, setSaving] = reactExports.useState(false);
  async function handleSave(d, fileName) {
    const {
      data: userData
    } = await supabase.auth.getUser();
    if (!userData.user) {
      toast.error("Sign in to save files");
      return;
    }
    setSaving(true);
    try {
      const csv = (await import("./csv-DQ2obxKo.mjs")).toCsvString(d);
      const blob = new Blob([csv], {
        type: "text/csv"
      });
      const path = `${userData.user.id}/${crypto.randomUUID()}.csv`;
      const up = await supabase.storage.from("csv-files").upload(path, blob, {
        contentType: "text/csv",
        upsert: false
      });
      if (up.error) throw up.error;
      const {
        error
      } = await supabase.from("csv_files").insert({
        user_id: userData.user.id,
        name: fileName,
        storage_path: path,
        columns: d.columns,
        row_count: d.rows.length,
        size_bytes: blob.size
      });
      if (error) throw error;
      toast.success("Saved to your library");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[image:var(--gradient-subtle)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-7xl px-4 py-8", children: data ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setData(null), className: "text-xs text-muted-foreground hover:text-foreground", children: "← Open a different file" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CsvViewer, { initial: data, fileName: name, onSave: handleSave, saving, saveLabel: "Save to library" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 py-6 md:grid-cols-[1.1fr_1fr] md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-primary" }),
          " Fast, private, cloud-synced"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 text-4xl font-bold tracking-tight md:text-5xl", children: [
          "The cleanest way to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-[image:var(--gradient-hero)] bg-clip-text text-transparent", children: "read your CSVs" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-lg text-muted-foreground", children: "Drop a CSV to instantly browse, sort, filter and chart it. Sign in to keep your files in the cloud and share them with a link." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-4 w-4" }), title: "Cloud library", desc: "Saved files synced to your account." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }), title: "Share via link", desc: "Read-only links for collaborators." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }), title: "Charts & stats", desc: "Auto insights on numeric columns." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }), title: "Private by default", desc: "Files locked to your account." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-xs text-muted-foreground", children: [
          "Don't have an account? ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "text-primary hover:underline", children: "Create one in seconds" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CsvDropzone, { onFile: (file, text) => {
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
      } })
    ] }) })
  ] });
}
function Feature({
  icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: desc })
  ] });
}
export {
  Index as component
};
