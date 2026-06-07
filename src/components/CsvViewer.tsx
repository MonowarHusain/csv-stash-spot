import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Download,
  Save,
  Search,
  Share2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CsvCharts } from "./CsvCharts";
import { toCsvString, type CsvData } from "@/lib/csv";

type Props = {
  initial: CsvData;
  fileName: string;
  readOnly?: boolean;
  onSave?: (data: CsvData, fileName: string) => Promise<void> | void;
  onShare?: () => Promise<void> | void;
  saving?: boolean;
  saveLabel?: string;
};

type SortState = { col: string; dir: "asc" | "desc" } | null;

const PAGE_SIZE = 100;

export function CsvViewer({
  initial,
  fileName,
  readOnly,
  onSave,
  onShare,
  saving,
  saveLabel = "Save",
}: Props) {
  const [data, setData] = useState<CsvData>(initial);
  const [name, setName] = useState(fileName);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortState>(null);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    setData(initial);
    setName(fileName);
    setPage(0);
    setSearch("");
    setSort(null);
    setFilters({});
  }, [initial, fileName]);

  const filtered = useMemo(() => {
    let rows = data.rows;
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter((r) =>
        data.columns.some((c) => String(r[c] ?? "").toLowerCase().includes(q)),
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

  function toggleSort(col: string) {
    setSort((s) => {
      if (!s || s.col !== col) return { col, dir: "asc" };
      if (s.dir === "asc") return { col, dir: "desc" };
      return null;
    });
  }

  function updateCell(rowIndex: number, col: string, value: string) {
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
    const blank: Record<string, string> = {};
    for (const c of data.columns) blank[c] = "";
    setData((d) => ({ ...d, rows: [...d.rows, blank] }));
    setPage(Math.max(0, Math.ceil((data.rows.length + 1) / PAGE_SIZE) - 1));
  }

  function deleteRow(rowIndex: number) {
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

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-xs font-medium"
            readOnly={readOnly}
          />
          <Badge variant="secondary" className="font-mono">
            {data.rows.length} rows × {data.columns.length} cols
          </Badge>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search all cells…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                className="h-9 w-56 pl-8"
              />
            </div>
            <Button variant="outline" size="sm" onClick={download}>
              <Download className="mr-1 h-4 w-4" /> Export
            </Button>
            {onShare && (
              <Button variant="outline" size="sm" onClick={() => onShare?.()}>
                <Share2 className="mr-1 h-4 w-4" /> Share
              </Button>
            )}
            {onSave && (
              <Button variant="hero" size="sm" disabled={saving} onClick={() => onSave(data, name)}>
                <Save className="mr-1 h-4 w-4" />
                {saving ? "Saving…" : saveLabel}
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Tabs defaultValue="table">
        <TabsList>
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="table" className="mt-3">
          <Card className="overflow-hidden">
            <div className="max-h-[65vh] overflow-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="sticky top-0 z-10 bg-card">
                  <tr className="border-b border-border">
                    <th className="w-10 border-r border-border bg-muted/40 px-2 py-2 text-xs font-medium text-muted-foreground">
                      #
                    </th>
                    {data.columns.map((c) => (
                      <th
                        key={c}
                        className="border-r border-border bg-muted/40 px-3 py-2 text-left text-xs font-semibold"
                      >
                        <button
                          className="inline-flex items-center gap-1 hover:text-primary"
                          onClick={() => toggleSort(c)}
                        >
                          {c}
                          {sort?.col === c ? (
                            sort.dir === "asc" ? (
                              <ArrowUp className="h-3 w-3" />
                            ) : (
                              <ArrowDown className="h-3 w-3" />
                            )
                          ) : (
                            <ArrowUpDown className="h-3 w-3 opacity-40" />
                          )}
                        </button>
                      </th>
                    ))}
                    {!readOnly && <th className="w-10 bg-muted/40" />}
                  </tr>
                  <tr className="border-b border-border bg-card">
                    <th className="border-r border-border bg-muted/20 px-1 py-1" />
                    {data.columns.map((c) => (
                      <th key={c} className="border-r border-border bg-muted/20 px-1 py-1">
                        <Input
                          placeholder="Filter…"
                          value={filters[c] ?? ""}
                          onChange={(e) => {
                            setFilters((f) => ({ ...f, [c]: e.target.value }));
                            setPage(0);
                          }}
                          className="h-7 border-0 bg-transparent px-1 text-xs shadow-none focus-visible:ring-0"
                        />
                      </th>
                    ))}
                    {!readOnly && <th className="bg-muted/20" />}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((row, i) => (
                    <tr key={i} className="border-b border-border/60 hover:bg-accent/30">
                      <td className="border-r border-border bg-muted/20 px-2 py-1 text-right font-mono text-[11px] text-muted-foreground">
                        {page * PAGE_SIZE + i + 1}
                      </td>
                      {data.columns.map((c) => (
                        <td key={c} className="border-r border-border/40 px-2 py-1 align-top">
                          {readOnly ? (
                            <div className="min-h-[1.5rem] whitespace-pre-wrap">{row[c]}</div>
                          ) : (
                            <input
                              value={row[c] ?? ""}
                              onChange={(e) => updateCell(i, c, e.target.value)}
                              className="w-full bg-transparent outline-none focus:bg-accent/40 focus:ring-1 focus:ring-primary/40 rounded-sm px-1 py-0.5"
                            />
                          )}
                        </td>
                      ))}
                      {!readOnly && (
                        <td className="px-1">
                          <button
                            onClick={() => deleteRow(i)}
                            className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            title="Delete row"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                  {pageRows.length === 0 && (
                    <tr>
                      <td colSpan={data.columns.length + 2} className="p-8 text-center text-sm text-muted-foreground">
                        No matching rows.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-border bg-card px-3 py-2 text-xs">
              <div className="text-muted-foreground">
                Showing {filtered.length === 0 ? 0 : page * PAGE_SIZE + 1}–
                {Math.min(filtered.length, (page + 1) * PAGE_SIZE)} of {filtered.length}
              </div>
              <div className="flex items-center gap-2">
                {!readOnly && (
                  <Button variant="ghost" size="sm" onClick={addRow}>
                    + Add row
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  Prev
                </Button>
                <span className="font-mono">{page + 1} / {totalPages}</span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="insights" className="mt-3">
          <CsvCharts data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}