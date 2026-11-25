"use client";

import { FrameType, frames } from "@/lib/products";

interface FrameSelectorProps {
  selected: FrameType;
  onChange: (frame: FrameType) => void;
}

export default function FrameSelector({ selected, onChange }: FrameSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-brown mb-2">Marco</h3>
      <div className="flex gap-3">
        {frames.map((frame) => (
          <button
            key={frame.id}
            onClick={() => onChange(frame.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-all ${
              selected === frame.id
                ? "border-pink bg-pink/10 text-pink font-medium"
                : "border-cream-dark text-brown hover:border-pink/50"
            }`}
          >
            <span
              className="w-4 h-4 rounded-full border border-brown/20"
              style={{ backgroundColor: frame.color }}
            />
            {frame.name}
          </button>
        ))}
      </div>
    </div>
  );
}
