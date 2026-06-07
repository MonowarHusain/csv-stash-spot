import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { columnStats, isNumericColumn, type CsvData } from "@/lib/csv";

export function CsvCharts({ data }: { data: CsvData }) {
  const numericCols = useMemo(
    () => data.columns.filter((c) => isNumericColumn(data.rows, c)),
    [data],
  );
  const categoricalCols = useMemo(
    () => data.columns.filter((c) => !numericCols.includes(c)),
    [data, numericCols],
  );
  const [xCol, setXCol] = useState<string>(categoricalCols[0] ?? data.columns[0] ?? "");
  const [yCol, setYCol] = useState<string>(numericCols[0] ?? "");
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  const chartData = useMemo(() => {
    if (!xCol || !yCol) return [];
    return data.rows
      .slice(0, 50)
      .map((r) => ({ x: String(r[xCol] ?? ""), y: Number(r[yCol] ?? 0) }))
      .filter((d) => !Number.isNaN(d.y));
  }, [data, xCol, yCol]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        {numericCols.slice(0, 4).map((col) => {
          const s = columnStats(data.rows, col);
          if (!s.numeric) return null;
          return (
            <Card key={col} className="p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{col}</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <Stat label="min" value={fmt(s.min)} />
                <Stat label="max" value={fmt(s.max)} />
                <Stat label="mean" value={fmt(s.mean)} />
                <Stat label="sum" value={fmt(s.sum)} />
              </div>
            </Card>
          );
        })}
        {numericCols.length === 0 && (
          <Card className="p-4 md:col-span-4 text-sm text-muted-foreground">
            No numeric columns detected for quick stats.
          </Card>
        )}
      </div>

      {numericCols.length > 0 && (
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-sm font-medium">Chart</div>
            <Select value={chartType} onValueChange={(v) => setChartType(v as "bar" | "line")}>
              <SelectTrigger className="h-8 w-28"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="line">Line</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-xs text-muted-foreground">X</div>
            <Select value={xCol} onValueChange={setXCol}>
              <SelectTrigger className="h-8 w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                {data.columns.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-xs text-muted-foreground">Y</div>
            <Select value={yCol} onValueChange={setYCol}>
              <SelectTrigger className="h-8 w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                {numericCols.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="ml-auto text-xs text-muted-foreground">first 50 rows</div>
          </div>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "bar" ? (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="x" stroke="var(--muted-foreground)" fontSize={11} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Bar dataKey="y" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="x" stroke="var(--muted-foreground)" fontSize={11} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="y" stroke="var(--primary)" strokeWidth={2} dot={false} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="font-mono text-sm">{value}</div>
    </div>
  );
}

function fmt(n: number) {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
}