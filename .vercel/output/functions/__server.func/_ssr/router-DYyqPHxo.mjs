import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { Q as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-DZ2pG0kF.mjs";
import { o as objectType, e as enumType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-DfEiJgMd.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Your CSV Vault is a web application for viewing, storing, and managing CSV files with user accounts." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Your CSV Vault is a web application for viewing, storing, and managing CSV files with user accounts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "twitter:description", content: "Your CSV Vault is a web application for viewing, storing, and managing CSV files with user accounts." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2c45b5a4-b4c6-49c4-bbe2-03acef546b8d/id-preview-8af7bf5b--d5d544b6-7568-44cd-ad73-e47491a434f3.lovable.app-1780913694727.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2c45b5a4-b4c6-49c4-bbe2-03acef546b8d/id-preview-8af7bf5b--d5d544b6-7568-44cd-ad73-e47491a434f3.lovable.app-1780913694727.png" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router2.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router2, queryClient]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] });
}
const $$splitComponentImporter$5 = () => import("./auth-DhFytmk8.mjs");
const searchSchema = objectType({
  mode: enumType(["signin", "signup"]).optional()
});
const Route$6 = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{
      title: "Sign in — CSV Studio"
    }, {
      name: "description",
      content: "Sign in or create your CSV Studio account to save and share your CSV files."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./route-BFsOu0JM.mjs");
const Route$5 = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-BT-35NHB.mjs");
const Route$4 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "CSV Studio — view, edit and share CSV files"
    }, {
      name: "description",
      content: "Open any CSV in your browser. Sort, filter, edit, chart and share — with optional cloud sync for your files."
    }, {
      property: "og:title",
      content: "CSV Studio — view, edit and share CSV files"
    }, {
      property: "og:description",
      content: "Open any CSV in your browser. Sort, filter, edit, chart and share — with optional cloud sync."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitNotFoundComponentImporter$1 = () => import("./view._id-DWoWFxSC.mjs");
const $$splitErrorComponentImporter$1 = () => import("./view._id-B7-vbGoT.mjs");
const $$splitComponentImporter$2 = () => import("./view._id-Cc3UiU7P.mjs");
const Route$3 = createFileRoute("/view/$id")({
  head: () => ({
    meta: [{
      title: "View file — CSV Studio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent")
});
const $$splitNotFoundComponentImporter = () => import("./share._token-Bj7DtH25.mjs");
const $$splitErrorComponentImporter = () => import("./share._token-BK8G5WBL.mjs");
const $$splitComponentImporter$1 = () => import("./share._token-4t1CJfvG.mjs");
const Route$2 = createFileRoute("/share/$token")({
  head: () => ({
    meta: [{
      title: "Shared CSV — CSV Studio"
    }, {
      name: "description",
      content: "A CSV file shared with you via CSV Studio."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const $$splitComponentImporter = () => import("./files-BOWhWpNe.mjs");
const Route$1 = createFileRoute("/_authenticated/files")({
  head: () => ({
    meta: [{
      title: "My files — CSV Studio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const Route = createFileRoute("/api/public/share/$token")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const token = params.token;
        if (!token || !/^[a-zA-Z0-9_-]{8,128}$/.test(token)) {
          return new Response("Invalid token", { status: 400 });
        }
        const { supabaseAdmin } = await import("./client.server-D5ro3rAQ.mjs");
        const { data: share, error } = await supabaseAdmin.from("csv_shares").select("file_id").eq("share_token", token).maybeSingle();
        if (error || !share) return new Response("Not found", { status: 404 });
        const { data: file } = await supabaseAdmin.from("csv_files").select("storage_path,name").eq("id", share.file_id).maybeSingle();
        if (!file) return new Response("Not found", { status: 404 });
        const dl = await supabaseAdmin.storage.from("csv-files").download(file.storage_path);
        if (dl.error || !dl.data) return new Response("Not found", { status: 404 });
        const text = await dl.data.text();
        return new Response(text, {
          status: 200,
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Cache-Control": "no-store"
          }
        });
      }
    }
  }
});
const AuthRoute = Route$6.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$7
});
const AuthenticatedRouteRoute = Route$5.update({
  id: "/_authenticated",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const ViewIdRoute = Route$3.update({
  id: "/view/$id",
  path: "/view/$id",
  getParentRoute: () => Route$7
});
const ShareTokenRoute = Route$2.update({
  id: "/share/$token",
  path: "/share/$token",
  getParentRoute: () => Route$7
});
const AuthenticatedFilesRoute = Route$1.update({
  id: "/files",
  path: "/files",
  getParentRoute: () => AuthenticatedRouteRoute
});
const ApiPublicShareTokenRoute = Route.update({
  id: "/api/public/share/$token",
  path: "/api/public/share/$token",
  getParentRoute: () => Route$7
});
const AuthenticatedRouteRouteChildren = {
  AuthenticatedFilesRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute,
  ShareTokenRoute,
  ViewIdRoute,
  ApiPublicShareTokenRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$3 as R,
  Route$2 as a,
  router as r
};
