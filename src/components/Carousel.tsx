"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { id: 1, title: "Nogal con rayas", bg: "#5C3A21", accent: "#C0392B" },
  { id: 2, title: "Roble natural", bg: "#C49A6C", accent: "#D4B896" },
  { id: 3, title: "Blanco minimalista", bg: "#F5F0EB", accent: "#7D8B69" },
  { id: 4, title: "Nogal azul", bg: "#5C3A21", accent: "#2C3E6B" },
];

export default function Carousel() {
  return (
    <section className="py-16 bg-cream-dark">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-brown mb-8">Nuestros diseños</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="h-64 flex items-center justify-center relative"
                  style={{ backgroundColor: "#F0E6DC" }}
                >
                  {/* Frame illustration */}
                  <div
                    className="w-40 h-40 rounded border-[6px] flex items-center justify-center"
                    style={{ borderColor: slide.bg }}
                  >
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: slide.accent, opacity: 0.3 }}
                    />
                  </div>
                </div>
                <div className="p-4 text-center">
                  <p className="font-semibold text-brown">{slide.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
