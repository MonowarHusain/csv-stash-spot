import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppHeader } from "./AppHeader-C3JBXMyi.mjs";
function ErrorBox({
  msg
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-2xl p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Couldn't open this share" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: msg })
    ] })
  ] });
}
export {
  ErrorBox as E
};
