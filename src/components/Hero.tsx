import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-brown leading-tight">
            Tu foto favorita y un sitio para las llaves
          </h1>
          <p className="mt-4 text-lg text-brown-light">
            Diseña un marco de pared con ganchos a tu gusto.
            <br />
            Nunca más buscarás las llaves por la mañana.
          </p>
          <p className="mt-4 text-brown font-semibold">
            Desde <span className="text-pink text-xl">48,50 €</span>
          </p>
          <Link
            href="/configurador"
            className="mt-6 inline-block bg-pink text-white font-semibold px-8 py-3 rounded-full hover:bg-pink-dark transition-colors"
          >
            Diseña el tuyo
          </Link>
        </div>

        {/* Image placeholder */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-72 h-72 md:w-80 md:h-80">
            <div className="w-full h-full bg-cream-dark rounded-lg border-8 border-brown shadow-lg flex items-center justify-center overflow-hidden">
              {/* Striped background */}
              <div className="absolute inset-3 overflow-hidden rounded">
                <div className="w-full h-full" style={{
                  background: "repeating-linear-gradient(90deg, #C0392B 0px, #C0392B 15px, #F5F0E8 15px, #F5F0E8 30px)"
                }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-brown/50 text-sm bg-cream-dark/80 px-3 py-1 rounded">Tu foto</span>
                </div>
              </div>
            </div>
            {/* Hook illustrations */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-6">
              <div className="w-5 h-5 rounded-full border-2 border-[#C9A84C]" />
              <div className="w-5 h-5 rounded-full border-2 border-[#C9A84C]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
