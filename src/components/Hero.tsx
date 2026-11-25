"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { frames, backgrounds } from "@/lib/products";

const heroSlides = [
  { frame: "nogal", background: "rayas-rojas", label: "Nogal con rayas" },
  { frame: "roble", background: "liso-beige", label: "Roble natural" },
  { frame: "blanco", background: "liso-verde", label: "Blanco verde" },
  { frame: "nogal", background: "liso-azul", label: "Nogal azul" },
  { frame: "roble", background: "rayas-rojas", label: "Roble con rayas" },
  { frame: "blanco", background: "liso-beige", label: "Blanco natural" },
];

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-brown leading-tight">
            Portallaves personalizodos con tus fotos
          </h1>
          <p className="mt-4 text-lg text-brown-light">
            Hechos a mano para llenar de recuerdos ese rinconcito al que siempre vuelves.
          
          </p>
         
          <Link
            href="/configurador"
            className="mt-6 inline-block bg-pink text-white font-semibold px-8 py-3 rounded-full hover:bg-pink-dark transition-colors"
          >
            Diseña el tuyo
          </Link>
        </div>

        {/* Carousel of designs */}
        <div className="flex-1 w-full max-w-sm">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
            className="hero-carousel rounded-2xl overflow-hidden shadow-lg"
          >
            {heroSlides.map((slide, i) => {
              const frameOption = frames.find((f) => f.id === slide.frame)!;
              const bgOption = backgrounds.find((b) => b.id === slide.background)!;

              return (
                <SwiperSlide key={i}>
                  <div className="aspect-square bg-cream-dark flex items-center justify-center p-8">
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                      {/* Frame */}
                      <div
                        className="w-52 h-52 md:w-60 md:h-60 rounded-sm relative overflow-hidden"
                        style={{ border: `10px solid ${frameOption.color}` }}
                      >
                        {slide.background === "rayas-rojas" ? (
                          <div
                            className="w-full h-full"
                            style={{
                              background: `repeating-linear-gradient(90deg, ${bgOption.colors[0]} 0px, ${bgOption.colors[0]} 12px, ${bgOption.colors[1] || "#F5F0E8"} 12px, ${bgOption.colors[1] || "#F5F0E8"} 24px)`,
                            }}
                          />
                        ) : (
                          <div className="w-full h-full" style={{ backgroundColor: bgOption.colors[0] }} />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm bg-white/70 px-3 py-1 rounded text-brown/50">
                            Tu foto
                          </span>
                        </div>
                      </div>
                      {/* Hooks */}
                      <div className="flex gap-5 mt-2">
                        <div className="w-4 h-4 rounded-full border-2 border-[#C9A84C]" />
                        <div className="w-4 h-4 rounded-full border-2 border-[#C9A84C]" />
                      </div>
                      {/* Label */}
                      <p className="mt-3 text-sm font-medium text-brown">{slide.label}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
