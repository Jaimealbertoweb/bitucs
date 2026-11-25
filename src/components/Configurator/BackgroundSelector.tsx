"use client";

import { BackgroundType, backgrounds } from "@/lib/products";

interface BackgroundSelectorProps {
  selected: BackgroundType;
  onChange: (bg: BackgroundType) => void;
}

export default function BackgroundSelector({ selected, onChange }: BackgroundSelectorProps) {
  const renderSwatch = (bg: typeof backgrounds[0]) => {
    if (bg.id === "rayas-rojas") {
      return (
        <div
          className="w-full h-full rounded"
          style={{
            background: `repeating-linear-gradient(90deg, ${bg.colors[0]} 0px, ${bg.colors[0]} 4px, ${bg.colors[1] || "#F5F0E8"} 4px, ${bg.colors[1] || "#F5F0E8"} 8px)`,
          }}
        />
      );
    }
    return (
      <div className="w-full h-full rounded" style={{ backgroundColor: bg.colors[0] }} />
    );
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-brown mb-2">Fondo</h3>
      <div className="flex gap-3">
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={() => onChange(bg.id)}
            className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
              selected === bg.id
                ? "border-pink ring-2 ring-pink/30"
                : "border-cream-dark hover:border-pink/50"
            }`}
            title={bg.name}
          >
            {renderSwatch(bg)}
          </button>
        ))}
      </div>
    </div>
  );
}
