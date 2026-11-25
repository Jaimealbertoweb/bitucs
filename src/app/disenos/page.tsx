"use client";

import { useState } from "react";
import { products, Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductPreviewModal from "@/components/ProductPreviewModal";

export default function DisenosPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (!selectedProduct) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          frame: selectedProduct.frame,
          background: selectedProduct.background,
          hookCount: selectedProduct.hookCount,
          hookFinish: selectedProduct.hookFinish,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Error al procesar el pago. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-brown mb-4">Nuestros diseños</h1>
      <p className="text-brown-light mb-10 max-w-2xl">
        Cada portallaves está hecho a mano con materiales de calidad. Elige el
        que más te guste o{" "}
        <a href="/configurador" className="text-pink font-medium hover:underline">
          diseña el tuyo propio
        </a>
        .
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPreview={setSelectedProduct}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductPreviewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onBuy={handleBuy}
          loading={loading}
        />
      )}
    </section>
  );
}
