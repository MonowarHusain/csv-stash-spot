import { P as Papa } from "../_libs/papaparse.mjs";
import "../_libs/react.mjs";
import "stream";
function parseCsv(text) {
  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false
  });
  const columns = result.meta.fields ?? [];
  return { columns, rows: result.data ?? [] };
}
function toCsvString(data) {
  return Papa.unparse(data.rows, { columns: data.columns });
}
function isNumericColumn(rows, col) {
  if (rows.length === 0) return false;
  let n = 0;
  let total = 0;
  for (const r of rows.slice(0, 200)) {
    const v = r[col];
    if (v === void 0 || v === null || v === "") continue;
    total++;
    if (!Number.isNaN(Number(v))) n++;
  }
  return total > 0 && n / total > 0.8;
}
function columnStats(rows, col) {
  const nums = [];
  let nonEmpty = 0;
  const seen = /* @__PURE__ */ new Set();
  for (const r of rows) {
    const v = r[col];
    if (v === void 0 || v === null || v === "") continue;
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
      numeric: true,
      count: nonEmpty,
      unique: seen.size,
      min: Math.min(...nums),
      max: Math.max(...nums),
      mean,
      median,
      sum
    };
  }
  return { numeric: false, count: nonEmpty, unique: seen.size };
}
export {
  columnStats,
  isNumericColumn,
  parseCsv,
  toCsvString
};
