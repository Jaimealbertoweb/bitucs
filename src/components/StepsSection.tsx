import { Paintbrush, ImageUp, PackageCheck } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Diseña tu marco",
    description: "Elige madera, fondo y número de ganchos, y míralo al instante.",
    icon: Paintbrush,
  },
  {
    number: 2,
    title: "Sube tu foto",
    description: "Recórtala a tu gusto y comprueba cómo queda antes de comprar.",
    icon: ImageUp,
  },
  {
    number: 3,
    title: "Recíbelo en casa",
    description: "Lo fabricamos y te lo enviamos listo para colgar.",
    icon: PackageCheck,
  },
];

export default function StepsSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-brown mb-12">Así de fácil</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center md:text-left">
              <span className="text-5xl font-bold text-pink">{step.number}</span>
              <div className="mt-2 flex items-center gap-2 justify-center md:justify-start">
                <step.icon className="text-pink" size={20} />
                <h3 className="text-lg font-semibold text-brown">{step.title}</h3>
              </div>
              <p className="mt-2 text-sm text-brown-light">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
