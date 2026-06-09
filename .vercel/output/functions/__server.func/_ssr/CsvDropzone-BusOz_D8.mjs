import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn, B as Button } from "./AppHeader-C3JBXMyi.mjs";
import { F as FileSpreadsheet, U as Upload } from "../_libs/lucide-react.mjs";
function CsvDropzone({ onFile, compact }) {
  const [dragOver, setDragOver] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const handleFiles = reactExports.useCallback(
    async (files) => {
      const file = files?.[0];
      if (!file) return;
      const text = await file.text();
      onFile(file, text);
    },
    [onFile]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onDragOver: (e) => {
        e.preventDefault();
        setDragOver(true);
      },
      onDragLeave: () => setDragOver(false),
      onDrop: (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      },
      className: cn(
        "group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-card transition-all",
        compact ? "p-6" : "p-12",
        dragOver ? "border-primary bg-accent/40 scale-[1.01]" : "border-border hover:border-primary/60"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            type: "file",
            accept: ".csv,text/csv",
            className: "hidden",
            onChange: (e) => handleFiles(e.target.files)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "grid place-items-center rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-elegant)]",
              compact ? "h-10 w-10" : "h-14 w-14"
            ),
            children: dragOver ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: compact ? "h-5 w-5" : "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: compact ? "h-5 w-5" : "h-6 w-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: cn("mt-4 font-semibold tracking-tight", compact ? "text-base" : "text-lg"), children: dragOver ? "Drop to open" : "Drop a CSV file" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "or click to browse — parsed instantly in your browser" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "mt-4",
            variant: "hero",
            size: compact ? "sm" : "default",
            onClick: () => inputRef.current?.click(),
            children: "Choose file"
          }
        )
      ]
    }
  );
}
export {
  CsvDropzone as C
};
