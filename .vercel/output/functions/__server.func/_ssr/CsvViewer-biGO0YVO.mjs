import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button, c as cn } from "./AppHeader-C3JBXMyi.mjs";
import { C as Card } from "./card-C6fibyyW.mjs";
import { I as Input } from "./input-DlM87v_X.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { S as Select$1, a as SelectValue$1, b as SelectTrigger$1, c as SelectIcon, d as SelectPortal, e as SelectContent$1, f as SelectViewport, g as SelectItem$1, h as SelectItemIndicator, i as SelectItemText, j as SelectScrollUpButton$1, k as SelectScrollDownButton$1, l as SelectLabel$1, m as SelectSeparator$1 } from "../_libs/radix-ui__react-select.mjs";
import { toCsvString, isNumericColumn, columnStats } from "./csv-DQ2obxKo.mjs";
import { c as Search, d as Download, a as Share2, e as Save, A as ArrowUp, f as ArrowDown, g as ArrowUpDown, T as Trash2, C as ChevronDown, h as Check, i as ChevronUp } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, L as LineChart, b as Line } from "../_libs/recharts.mjs";
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Select = Select$1;
const SelectValue = SelectValue$1;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectTrigger$1,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectIcon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectTrigger$1.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollUpButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollDownButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPortal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectContent$1,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectViewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectContent$1.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectLabel$1,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectLabel$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectItem$1,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectItem$1.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectSeparator$1,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectSeparator$1.displayName;
function CsvCharts({ data }) {
  const numericCols = reactExports.useMemo(
    () => data.columns.filter((c) => isNumericColumn(data.rows, c)),
    [data]
  );
  const categoricalCols = reactExports.useMemo(
    () => data.columns.filter((c) => !numericCols.includes(c)),
    [data, numericCols]
  );
  const [xCol, setXCol] = reactExports.useState(categoricalCols[0] ?? data.columns[0] ?? "");
  const [yCol, setYCol] = reactExports.useState(numericCols[0] ?? "");
  const [chartType, setChartType] = reactExports.useState("bar");
  const chartData = reactExports.useMemo(() => {
    if (!xCol || !yCol) return [];
    return data.rows.slice(0, 50).map((r) => ({ x: String(r[xCol] ?? ""), y: Number(r[yCol] ?? 0) })).filter((d) => !Number.isNaN(d.y));
  }, [data, xCol, yCol]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
      numericCols.slice(0, 4).map((col) => {
        const s = columnStats(data.rows, col);
        if (!s.numeric) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: col }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid grid-cols-2 gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "min", value: fmt(s.min) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "max", value: fmt(s.max) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "mean", value: fmt(s.mean) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "sum", value: fmt(s.sum) })
          ] })
        ] }, col);
      }),
      numericCols.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 md:col-span-4 text-sm text-muted-foreground", children: "No numeric columns detected for quick stats." })
    ] }),
    numericCols.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Chart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: chartType, onValueChange: (v) => setChartType(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bar", children: "Bar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "line", children: "Line" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "X" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: xCol, onValueChange: setXCol, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: data.columns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Y" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: yCol, onValueChange: setYCol, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: numericCols.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto text-xs text-muted-foreground", children: "first 50 rows" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-64 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: chartType === "bar" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: chartData, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "x", stroke: "var(--muted-foreground)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: { background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "y", fill: "var(--primary)", radius: [4, 4, 0, 0] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: chartData, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "x", stroke: "var(--muted-foreground)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: { background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "y", stroke: "var(--primary)", strokeWidth: 2, dot: false })
      ] }) }) })
    ] })
  ] });
}
function Stat({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm", children: value })
  ] });
}
function fmt(n) {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1e3) return n.toLocaleString(void 0, { maximumFractionDigits: 2 });
  return n.toLocaleString(void 0, { maximumFractionDigits: 4 });
}
const PAGE_SIZE = 100;
function CsvViewer({
  initial,
  fileName,
  readOnly,
  onSave,
  onShare,
  saving,
  saveLabel = "Save"
}) {
  const [data, setData] = reactExports.useState(initial);
  const [name, setName] = reactExports.useState(fileName);
  const [search, setSearch] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState(null);
  const [page, setPage] = reactExports.useState(0);
  const [filters, setFilters] = reactExports.useState({});
  reactExports.useEffect(() => {
    setData(initial);
    setName(fileName);
    setPage(0);
    setSearch("");
    setSort(null);
    setFilters({});
  }, [initial, fileName]);
  const filtered = reactExports.useMemo(() => {
    let rows = data.rows;
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) => data.columns.some((c) => String(r[c] ?? "").toLowerCase().includes(q))
      );
    }
    for (const [col, val] of Object.entries(filters)) {
      if (!val) continue;
      const q = val.toLowerCase();
      rows = rows.filter((r) => String(r[col] ?? "").toLowerCase().includes(q));
    }
    if (sort) {
      const { col, dir } = sort;
      rows = [...rows].sort((a, b) => {
        const av = a[col] ?? "";
        const bv = b[col] ?? "";
        const an = Number(av);
        const bn = Number(bv);
        const numeric = !Number.isNaN(an) && !Number.isNaN(bn) && av !== "" && bv !== "";
        const cmp = numeric ? an - bn : String(av).localeCompare(String(bv));
        return dir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [data, search, sort, filters]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  function toggleSort(col) {
    setSort((s) => {
      if (!s || s.col !== col) return { col, dir: "asc" };
      if (s.dir === "asc") return { col, dir: "desc" };
      return null;
    });
  }
  function updateCell(rowIndex, col, value) {
    if (readOnly) return;
    const absoluteRow = data.rows.indexOf(pageRows[rowIndex]);
    if (absoluteRow < 0) return;
    setData((d) => {
      const rows = [...d.rows];
      rows[absoluteRow] = { ...rows[absoluteRow], [col]: value };
      return { ...d, rows };
    });
  }
  function addRow() {
    if (readOnly) return;
    const blank = {};
    for (const c of data.columns) blank[c] = "";
    setData((d) => ({ ...d, rows: [...d.rows, blank] }));
    setPage(Math.max(0, Math.ceil((data.rows.length + 1) / PAGE_SIZE) - 1));
  }
  function deleteRow(rowIndex) {
    if (readOnly) return;
    const absoluteRow = data.rows.indexOf(pageRows[rowIndex]);
    if (absoluteRow < 0) return;
    setData((d) => {
      const rows = [...d.rows];
      rows.splice(absoluteRow, 1);
      return { ...d, rows };
    });
  }
  function download() {
    const csv = toCsvString(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name.endsWith(".csv") ? name : `${name}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded CSV");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: name,
          onChange: (e) => setName(e.target.value),
          className: "max-w-xs font-medium",
          readOnly
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "font-mono", children: [
        data.rows.length,
        " rows × ",
        data.columns.length,
        " cols"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search all cells…",
              value: search,
              onChange: (e) => {
                setSearch(e.target.value);
                setPage(0);
              },
              className: "h-9 w-56 pl-8"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: download, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-1 h-4 w-4" }),
          " Export"
        ] }),
        onShare && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => onShare?.(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "mr-1 h-4 w-4" }),
          " Share"
        ] }),
        onSave && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "hero", size: "sm", disabled: saving, onClick: () => onSave(data, name), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-1 h-4 w-4" }),
          saving ? "Saving…" : saveLabel
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "table", children: "Table" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "insights", children: "Insights" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "table", className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[65vh] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("thead", { className: "sticky top-0 z-10 bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-10 border-r border-border bg-muted/40 px-2 py-2 text-xs font-medium text-muted-foreground", children: "#" }),
              data.columns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "border-r border-border bg-muted/40 px-3 py-2 text-left text-xs font-semibold",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      className: "inline-flex items-center gap-1 hover:text-primary",
                      onClick: () => toggleSort(c),
                      children: [
                        c,
                        sort?.col === c ? sort.dir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-3 w-3 opacity-40" })
                      ]
                    }
                  )
                },
                c
              )),
              !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-10 bg-muted/40" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-r border-border bg-muted/20 px-1 py-1" }),
              data.columns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-r border-border bg-muted/20 px-1 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Filter…",
                  value: filters[c] ?? "",
                  onChange: (e) => {
                    setFilters((f) => ({ ...f, [c]: e.target.value }));
                    setPage(0);
                  },
                  className: "h-7 border-0 bg-transparent px-1 text-xs shadow-none focus-visible:ring-0"
                }
              ) }, c)),
              !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "bg-muted/20" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            pageRows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60 hover:bg-accent/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border-r border-border bg-muted/20 px-2 py-1 text-right font-mono text-[11px] text-muted-foreground", children: page * PAGE_SIZE + i + 1 }),
              data.columns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border-r border-border/40 px-2 py-1 align-top", children: readOnly ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[1.5rem] whitespace-pre-wrap", children: row[c] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: row[c] ?? "",
                  onChange: (e) => updateCell(i, c, e.target.value),
                  className: "w-full bg-transparent outline-none focus:bg-accent/40 focus:ring-1 focus:ring-primary/40 rounded-sm px-1 py-0.5"
                }
              ) }, c)),
              !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => deleteRow(i),
                  className: "rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
                  title: "Delete row",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                }
              ) })
            ] }, i)),
            pageRows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: data.columns.length + 2, className: "p-8 text-center text-sm text-muted-foreground", children: "No matching rows." }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 border-t border-border bg-card px-3 py-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
            "Showing ",
            filtered.length === 0 ? 0 : page * PAGE_SIZE + 1,
            "–",
            Math.min(filtered.length, (page + 1) * PAGE_SIZE),
            " of ",
            filtered.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: addRow, children: "+ Add row" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: page === 0,
                onClick: () => setPage((p) => Math.max(0, p - 1)),
                children: "Prev"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
              page + 1,
              " / ",
              totalPages
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: page >= totalPages - 1,
                onClick: () => setPage((p) => Math.min(totalPages - 1, p + 1)),
                children: "Next"
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "insights", className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CsvCharts, { data }) })
    ] })
  ] });
}
export {
  CsvViewer as C
};
