"use client";

import { FrameType, BackgroundType, HookFinish, frames, backgrounds, hookFinishes, calculatePrice } from "@/lib/products";

interface PriceSummaryProps {
  frame: FrameType;
  background: BackgroundType;
  hookCount: number;
  hookFinish: HookFinish;
  onCheckout: () => void;
  loading: boolean;
}

function fmt(n: number) {
  return n.toFixed(2).replace(".", ",");
}

export default function PriceSummary({
  frame,
  background,
  hookCount,
  hookFinish,
  onCheckout,
  loading,
}: PriceSummaryProps) {
  const frameOption = frames.find((f) => f.id === frame)!;
  const bgOption = backgrounds.find((b) => b.id === background)!;
  const hookOption = hookFinishes.find((h) => h.id === hookFinish)!;
  const { framePrice, backgroundPrice, hooksPrice, total } = calculatePrice(
    frame,
    background,
    hookCount,
    hookFinish
  );

  return (
    <div className="bg-cream-dark rounded-lg p-4 mt-4">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-brown">Marco {frameOption.name}</span>
          <span className="text-brown font-medium">{fmt(framePrice)} €</span>
        </div>
        {backgroundPrice > 0 && (
          <div className="flex justify-between">
            <span className="text-brown">Fondo {bgOption.name}</span>
            <span className="text-brown font-medium">{fmt(backgroundPrice)} €</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-brown">
            {hookCount} {hookCount === 1 ? "gancho" : "ganchos"} de {hookOption.name.toLowerCase()}
          </span>
          <span className="text-brown font-medium">{fmt(hooksPrice)} €</span>
        </div>
      </div>

      <div className="border-t border-brown/10 mt-3 pt-3 flex justify-between items-center">
        <span className="text-sm text-brown-light">Total (IVA incluido)</span>
        <span className="text-2xl font-bold text-brown">{fmt(total)} €</span>
      </div>

      <button
        onClick={onCheckout}
        disabled={loading}
        className="mt-4 w-full bg-pink text-white font-semibold py-3 rounded-full hover:bg-pink-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Procesando..." : "Comprar"}
      </button>
    </div>
  );
}
