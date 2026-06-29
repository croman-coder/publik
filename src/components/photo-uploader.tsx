"use client";
import { useState } from "react";

export function PhotoUploader({
  onFiles,
}: {
  onFiles: (files: File[]) => void;
}) {
  const [names, setNames] = useState<string[]>([]);
  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          setNames(files.map((f) => f.name));
          onFiles(files);
        }}
      />
      <ul className="text-sm text-gray-600">
        {names.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
