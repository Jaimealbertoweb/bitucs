import { Mail, AtSign, MapPin } from "lucide-react";

export const metadata = {
  title: "Contacto | BITUCS",
  description: "Conoce a la persona detrás de BITUCS. Portallaves hechos a mano con cariño.",
};

export default function ContactoPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-brown mb-10">Contacto</h1>

      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="w-64 h-64 rounded-2xl bg-cream-dark flex items-center justify-center overflow-hidden shadow-md">
            <div className="text-center text-brown-light">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-pink/20 flex items-center justify-center">
                <span className="text-3xl">👩‍🎨</span>
              </div>
              <p className="text-sm">Tu foto aquí</p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-brown mb-4">
            Hola, soy la creadora de BITUCS
          </h2>
          <p className="text-brown-light leading-relaxed mb-6">
            Cada uno de los portallaves que sale de mi taller está hecho con cariño y
            dedicación. Creo que las cosas bonitas hacen que volver a casa sea
            un poco más especial. Por eso nació BITUCS: para que tus llaves
            tengan un sitio bonito donde descansar y tus recuerdos favoritos
            estén siempre a la vista.
          </p>
          <p className="text-brown-light leading-relaxed mb-8">
            Si tienes alguna pregunta, quieres un diseño especial o simplemente
            quieres saludar, no dudes en escribirme. Estaré encantada de
            ayudarte.
          </p>

          <div className="space-y-4">
            <a
              href="mailto:hola@bitucs.com"
              className="flex items-center gap-3 text-brown hover:text-pink transition-colors"
            >
              <Mail size={20} className="text-pink" />
              hola@bitucs.com
            </a>
            <a
              href="https://instagram.com/bitucs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-brown hover:text-pink transition-colors"
            >
              <AtSign size={20} className="text-pink" />
              @bitucs
            </a>
            <div className="flex items-center gap-3 text-brown">
              <MapPin size={20} className="text-pink" />
              España
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
