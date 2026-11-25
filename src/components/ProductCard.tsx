import Link from "next/link";
import { Product, frames, backgrounds } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const frame = frames.find((f) => f.id === product.frame)!;
  const bg = backgrounds.find((b) => b.id === product.background)!;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Product illustration */}
      <div className="h-64 flex items-center justify-center bg-cream-dark">
        <div
          className="w-40 h-40 rounded border-[6px] relative overflow-hidden"
          style={{ borderColor: frame.color }}
        >
          {product.background === "rayas-rojas" ? (
            <div
              className="w-full h-full"
              style={{
                background: `repeating-linear-gradient(90deg, ${bg.colors[0]} 0px, ${bg.colors[0]} 8px, ${bg.colors[1] || "#F5F0E8"} 8px, ${bg.colors[1] || "#F5F0E8"} 16px)`,
              }}
            />
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: bg.colors[0] }} />
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-brown text-lg">{product.name}</h3>
        <p className="mt-1 text-sm text-brown-light">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-pink">
            {product.price.toFixed(2).replace(".", ",")} €
          </span>
          <Link
            href="/configurador"
            className="bg-pink text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-pink-dark transition-colors"
          >
            Comprar
          </Link>
        </div>
      </div>
    </div>
  );
}
