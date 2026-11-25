import Link from "next/link";
import { CircleCheck } from "lucide-react";

export const metadata = {
  title: "Pedido completado | BITUCS",
};

export default function ExitoPage() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-24 text-center">
      <CircleCheck size={64} className="text-pink mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-brown mb-4">
        ¡Gracias por tu pedido!
      </h1>
      <p className="text-brown-light text-lg mb-8">
        Hemos recibido tu pedido correctamente. Pronto recibirás un email con
        los detalles. Tu portallaves será fabricado a mano con todo el cariño.
      </p>
      <Link
        href="/"
        className="inline-block bg-pink text-white font-semibold px-8 py-3 rounded-full hover:bg-pink-dark transition-colors"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
