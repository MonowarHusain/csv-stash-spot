import Papa from "papaparse";

export type CsvData = {
  columns: string[];
  rows: Record<string, string>[];
};

export function parseCsv(text: string): CsvData {
  const result = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });
  const columns = result.meta.fields ?? [];
  return { columns, rows: (result.data as Record<string, string>[]) ?? [] };
}

export function toCsvString(data: CsvData): string {
  return Papa.unparse(data.rows, { columns: data.columns });
}

export function isNumericColumn(rows: Record<string, string>[], col: string): boolean {
  if (rows.length === 0) return false;
  let n = 0;
  let total = 0;
  for (const r of rows.slice(0, 200)) {
    const v = r[col];
    if (v === undefined || v === null || v === "") continue;
    total++;
    if (!Number.isNaN(Number(v))) n++;
  }
  return total > 0 && n / total > 0.8;
}

export function columnStats(rows: Record<string, string>[], col: string) {
  const nums: number[] = [];
  let nonEmpty = 0;
  const seen = new Set<string>();
  for (const r of rows) {
    const v = r[col];
    if (v === undefined || v === null || v === "") continue;
    nonEmpty++;
    seen.add(v);
    const n = Number(v);
    if (!Number.isNaN(n)) nums.push(n);
  }
  const numeric = nums.length > nonEmpty * 0.8 && nums.length > 0;
  if (numeric) {
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    const sorted = [...nums].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    return {
      numeric: true as const,
      count: nonEmpty,
      unique: seen.size,
      min: Math.min(...nums),
      max: Math.max(...nums),
      mean,
      median,
      sum,
    };
  }
  return { numeric: false as const, count: nonEmpty, unique: seen.size };
}