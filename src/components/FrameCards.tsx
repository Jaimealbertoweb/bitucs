import Link from "next/link";
import { frames } from "@/lib/products";

export default function FrameCards() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-brown mb-8">Elige tu marco</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frames.map((frame) => (
            <Link
              key={frame.id}
              href="/configurador"
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div
                className="h-32 rounded mb-4"
                style={{ backgroundColor: frame.color }}
              />
              <h3 className="text-xl font-semibold text-brown group-hover:text-pink transition-colors">
                {frame.name}
              </h3>
              <p className="mt-1 text-sm text-brown-light">{frame.description}</p>
              <p className="mt-3 text-sm text-brown">
                Desde{" "}
                <span className="font-bold text-pink">
                  {frame.price.toFixed(2).replace(".", ",")} €
                </span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
