import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Diseños | BITUCS",
  description: "Descubre nuestros diseños de portallaves hechos a mano.",
};

export default function DisenosPage() {
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
