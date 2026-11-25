"use client";

import { X } from "lucide-react";
import { Product, frames, backgrounds, hookFinishes, calculatePrice } from "@/lib/products";

interface ProductPreviewModalProps {
  product: Product;
  onClose: () => void;
  onBuy: () => void;
  loading: boolean;
}

function fmt(n: number) {
  return n.toFixed(2).replace(".", ",");
}

export default function ProductPreviewModal({ product, onClose, onBuy, loading }: ProductPreviewModalProps) {
  const frame = frames.find((f) => f.id === product.frame)!;
  const bg = backgrounds.find((b) => b.id === product.background)!;
  const hook = hookFinishes.find((h) => h.id === product.hookFinish)!;
  const { framePrice, backgroundPrice, hooksPrice, total } = calculatePrice(
    product.frame,
    product.background,
    product.hookCount,
    product.hookFinish
  );

  const hookPositions = () => {
    const positions: number[] = [];
    const totalWidth = 200;
    const spacing = totalWidth / (product.hookCount + 1);
    for (let i = 1; i <= product.hookCount; i++) {
      positions.push(spacing * i);
    }
    return positions;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-cream rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <h2 className="text-xl font-bold text-brown">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-brown-light hover:text-brown transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Preview */}
        <div className="flex justify-center py-6 bg-cream-dark mx-6 rounded-xl">
          <div className="flex flex-col items-center">
            <div
              className="w-48 h-48 rounded-sm relative overflow-hidden shadow-md"
              style={{ border: `10px solid ${frame.color}` }}
            >
              {product.background === "rayas-rojas" ? (
                <div
                  className="w-full h-full"
                  style={{
                    background: `repeating-linear-gradient(90deg, ${bg.colors[0]} 0px, ${bg.colors[0]} 12px, ${bg.colors[1] || "#F5F0E8"} 12px, ${bg.colors[1] || "#F5F0E8"} 24px)`,
                  }}
                />
              ) : (
                <div className="w-full h-full" style={{ backgroundColor: bg.colors[0] }} />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm bg-white/70 px-3 py-1 rounded text-brown/50">
                  Tu foto
                </span>
              </div>
            </div>
            {/* Hooks */}
            <div className="relative w-[200px] h-6 mt-1">
              {hookPositions().map((pos, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ left: `${pos}px`, transform: "translateX(-50%)" }}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2"
                    style={{ borderColor: hook.color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="px-6 py-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-brown">Marco {frame.name}</span>
            <span className="text-brown font-medium">{fmt(framePrice)} €</span>
          </div>
          {backgroundPrice > 0 && (
            <div className="flex justify-between">
              <span className="text-brown">Fondo {bg.name}</span>
              <span className="text-brown font-medium">{fmt(backgroundPrice)} €</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-brown">
              {product.hookCount} {product.hookCount === 1 ? "gancho" : "ganchos"} de {hook.name.toLowerCase()}
            </span>
            <span className="text-brown font-medium">{fmt(hooksPrice)} €</span>
          </div>
          <div className="border-t border-brown/10 pt-3 flex justify-between items-center">
            <span className="text-brown-light">Total (IVA incluido)</span>
            <span className="text-2xl font-bold text-brown">{fmt(total)} €</span>
          </div>
        </div>

        {/* Buy button */}
        <div className="px-6 pb-6">
          <button
            onClick={onBuy}
            disabled={loading}
            className="w-full bg-pink text-white font-semibold py-3 rounded-full hover:bg-pink-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Procesando..." : "Comprar"}
          </button>
        </div>
      </div>
    </div>
  );
}
