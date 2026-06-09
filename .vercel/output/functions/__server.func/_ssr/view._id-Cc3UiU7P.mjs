import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-DZ2pG0kF.mjs";
import { A as AppHeader } from "./AppHeader-C3JBXMyi.mjs";
import { C as CsvViewer } from "./CsvViewer-biGO0YVO.mjs";
import { parseCsv, toCsvString } from "./csv-DQ2obxKo.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as Skeleton } from "./skeleton-DvVf561-.mjs";
import { R as Route$3 } from "./router-DYyqPHxo.mjs";
import "../_libs/papaparse.mjs";
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
import "../_libs/lucide-react.mjs";
import "./card-C6fibyyW.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
function ViewPage() {
  const {
    id
  } = Route$3.useParams();
  const navigate = useNavigate();
  const [data, setData] = reactExports.useState(null);
  const [name, setName] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const [storagePath, setStoragePath] = reactExports.useState(null);
  const [isOwner, setIsOwner] = reactExports.useState(false);
  reactExports.useEffect(() => {
    (async () => {
      const {
        data: userData
      } = await supabase.auth.getUser();
      if (!userData.user) {
        navigate({
          to: "/auth"
        });
        return;
      }
      const {
        data: file,
        error
      } = await supabase.from("csv_files").select("id,name,storage_path,user_id").eq("id", id).maybeSingle();
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
  async function handleSave(d, newName) {
    if (!storagePath) return;
    setSaving(true);
    try {
      const csv = toCsvString(d);
      const blob = new Blob([csv], {
        type: "text/csv"
      });
      const up = await supabase.storage.from("csv-files").update(storagePath, blob, {
        contentType: "text/csv",
        upsert: true
      });
      if (up.error) throw up.error;
      const {
        error
      } = await supabase.from("csv_files").update({
        name: newName,
        columns: d.columns,
        row_count: d.rows.length,
        size_bytes: blob.size
      }).eq("id", id);
      if (error) throw error;
      toast.success("Saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }
  async function handleShare() {
    const {
      data: userData
    } = await supabase.auth.getUser();
    if (!userData.user) return;
    const existing = await supabase.from("csv_shares").select("share_token").eq("file_id", id).maybeSingle();
    let token = existing.data?.share_token;
    if (!token) {
      token = crypto.randomUUID().replace(/-/g, "");
      const ins = await supabase.from("csv_shares").insert({
        file_id: id,
        user_id: userData.user.id,
        share_token: token
      });
      if (ins.error) {
        toast.error(ins.error.message);
        return;
      }
      await supabase.from("csv_files").update({
        is_public: true
      }).eq("id", id);
    }
    const url = `${window.location.origin}/share/${token}`;
    await navigator.clipboard.writeText(url);
    toast.success("Share link copied", {
      description: url
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[image:var(--gradient-subtle)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-7xl px-4 py-6", children: data ? /* @__PURE__ */ jsxRuntimeExports.jsx(CsvViewer, { initial: data, fileName: name, onSave: isOwner ? handleSave : void 0, onShare: isOwner ? handleShare : void 0, saving }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[60vh] w-full" })
    ] }) })
  ] });
}
export {
  ViewPage as component
};
