"use client";

interface HooksSelectorProps {
  count: number;
  onCountChange: (count: number) => void;
}

export default function HooksSelector({ count, onCountChange }: HooksSelectorProps) {
  return (
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
  );
}
