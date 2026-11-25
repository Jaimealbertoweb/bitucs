"use client";

import { HookFinish, hookFinishes } from "@/lib/products";

interface HooksSelectorProps {
  count: number;
  finish: HookFinish;
  onCountChange: (count: number) => void;
  onFinishChange: (finish: HookFinish) => void;
}

export default function HooksSelector({
  count,
  finish,
  onCountChange,
  onFinishChange,
}: HooksSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Hook count */}
      <div>
        <h3 className="text-sm font-semibold text-brown mb-2">Número de ganchos</h3>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => onCountChange(n)}
              className={`w-10 h-10 rounded-lg border text-sm font-medium transition-all ${
                count === n
                  ? "border-pink bg-pink text-white"
                  : "border-cream-dark text-brown hover:border-pink/50"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Hook finish */}
      <div>
        <h3 className="text-sm font-semibold text-brown mb-2">Acabado de los ganchos</h3>
        <div className="flex flex-wrap gap-3">
          {hookFinishes.map((hf) => (
            <button
              key={hf.id}
              onClick={() => onFinishChange(hf.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-all ${
                finish === hf.id
                  ? "border-pink bg-pink/10 text-pink font-medium"
                  : "border-cream-dark text-brown hover:border-pink/50"
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-brown/20"
                style={{ backgroundColor: hf.color }}
              />
              {hf.name}
              {hf.priceLabel && (
                <span className="text-xs text-brown-light">{hf.priceLabel}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
