"use client";

import { useState } from "react";
import { FrameType, BackgroundType, HookFinish } from "@/lib/products";
import Preview from "@/components/Configurator/Preview";
import FrameSelector from "@/components/Configurator/FrameSelector";
import BackgroundSelector from "@/components/Configurator/BackgroundSelector";
import HooksSelector from "@/components/Configurator/HooksSelector";
import PhotoUploader from "@/components/Configurator/PhotoUploader";
import PriceSummary from "@/components/Configurator/PriceSummary";

export default function ConfiguradorPage() {
  const [frame, setFrame] = useState<FrameType>("nogal");
  const [background, setBackground] = useState<BackgroundType>("rayas-rojas");
  const [paspartou, setPaspartou] = useState<BackgroundType>("liso-beige");
  const [hookCount, setHookCount] = useState(2);
  const [hookFinish, setHookFinish] = useState<HookFinish>("laton");
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoCount, setPhotoCount] = useState(2);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frame, background, paspartou, hookCount, hookFinish }),
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
      <h1 className="text-4xl font-bold text-brown mb-10">Diseña tu marco</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Preview - left */}
        <div className="flex-1 flex justify-center lg:sticky lg:top-24 lg:self-start">
          <Preview
            frame={frame}
            background={background}
            paspartou={paspartou}
            hookCount={hookCount}
            hookFinish={hookFinish}
            photos={photos}
            photoCount={photoCount}
          />
        </div>

        {/* Options - right */}
        <div className="flex-1 space-y-6">
          <FrameSelector selected={frame} onChange={setFrame} />
          <BackgroundSelector
            selected={background}
            paspartouSelected={paspartou}
            onChange={setBackground}
            onPaspartouChange={setPaspartou}
          />
          <HooksSelector
            count={hookCount}
            onCountChange={setHookCount}
          />
          <PhotoUploader
            photos={photos}
            photoCount={photoCount}
            onPhotoCountChange={setPhotoCount}
            onChange={setPhotos}
          />
          <PriceSummary
            frame={frame}
            background={background}
            hookCount={hookCount}
            hookFinish={hookFinish}
            onCheckout={handleCheckout}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
}
