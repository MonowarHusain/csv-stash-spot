import { useCallback, useRef, useState } from "react";
import { Upload, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  onFile: (file: File, text: string) => void;
  compact?: boolean;
};

export function CsvDropzone({ onFile, compact }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      const file = files?.[0];
      if (!file) return;
      const text = await file.text();
      onFile(file, text);
    },
    [onFile],
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        "group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-card transition-all",
        compact ? "p-6" : "p-12",
        dragOver
          ? "border-primary bg-accent/40 scale-[1.01]"
          : "border-border hover:border-primary/60",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div
        className={cn(
          "grid place-items-center rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-elegant)]",
          compact ? "h-10 w-10" : "h-14 w-14",
        )}
      >
        {dragOver ? (
          <FileSpreadsheet className={compact ? "h-5 w-5" : "h-6 w-6"} />
        ) : (
          <Upload className={compact ? "h-5 w-5" : "h-6 w-6"} />
        )}
      </div>
      <h3 className={cn("mt-4 font-semibold tracking-tight", compact ? "text-base" : "text-lg")}>
        {dragOver ? "Drop to open" : "Drop a CSV file"}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        or click to browse — parsed instantly in your browser
      </p>
      <Button
        className="mt-4"
        variant="hero"
        size={compact ? "sm" : "default"}
        onClick={() => inputRef.current?.click()}
      >
        Choose file
      </Button>
    </div>
  );
}