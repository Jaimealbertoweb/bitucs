"use client";

import { FrameType, BackgroundType, HookFinish, frames, backgrounds, hookFinishes } from "@/lib/products";

interface PreviewProps {
  frame: FrameType;
  background: BackgroundType;
  paspartou: BackgroundType;
  hookCount: number;
  hookFinish: HookFinish;
  photos: string[];
  photoCount: number;
}

function renderBgStyle(bgId: BackgroundType) {
  const bgOption = backgrounds.find((b) => b.id === bgId)!;
  if (bgId === "rayas-rojas") {
    return {
      background: `repeating-linear-gradient(90deg, ${bgOption.colors[0]} 0px, ${bgOption.colors[0]} 12px, ${bgOption.colors[1] || "#F5F0E8"} 12px, ${bgOption.colors[1] || "#F5F0E8"} 24px)`,
    };
  }
  return { backgroundColor: bgOption.colors[0] };
}

export default function Preview({ frame, background, paspartou, hookCount, hookFinish, photos, photoCount }: PreviewProps) {
  const frameOption = frames.find((f) => f.id === frame)!;
  const hookOption = hookFinishes.find((h) => h.id === hookFinish)!;

  const renderPhotos = () => {
    if (photoCount === 2) {
      return (
        <div className="absolute inset-0 flex gap-2 p-2">
          {[0, 1].map((i) => (
            <div key={i} className="flex-1 relative overflow-hidden rounded-sm border-[3px]" style={renderBgStyle(background)}>
              <div className="absolute inset-[6px] overflow-hidden rounded-sm">
                {photos[i] ? (
                  <img src={photos[i]} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/40">
                    <span className="text-xs text-brown/40">Foto {i + 1}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // 3 photos: one big left, two stacked right
    return (
      <div className="absolute inset-0 flex gap-2 p-2">
        <div className="flex-1 relative overflow-hidden rounded-sm border-[3px]" style={renderBgStyle(background)}>
          <div className="absolute inset-[6px] overflow-hidden rounded-sm">
            {photos[0] ? (
              <img src={photos[0]} alt="Foto 1" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/40">
                <span className="text-xs text-brown/40">Foto 1</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {[1, 2].map((i) => (
            <div key={i} className="flex-1 relative overflow-hidden rounded-sm border-[3px]" style={renderBgStyle(background)}>
              <div className="absolute inset-[6px] overflow-hidden rounded-sm">
                {photos[i] ? (
                  <img src={photos[i]} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/40">
                    <span className="text-xs text-brown/40">Foto {i + 1}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const hookPositions = () => {
    const positions: number[] = [];
    const totalWidth = 240;
    const spacing = totalWidth / (hookCount + 1);
    for (let i = 1; i <= hookCount; i++) {
      positions.push(spacing * i);
    }
    return positions;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Frame */}
        <div
          className="w-64 h-64 md:w-72 md:h-72 rounded-sm relative overflow-hidden shadow-lg"
          style={{ border: `12px solid ${frameOption.color}` }}
        >
          {/* Background (controlled by Paspartú selector) */}
          <div className="absolute inset-0" style={renderBgStyle(paspartou)} />
          {/* Photos with paspartú borders (controlled by Fondo selector) */}
          {renderPhotos()}
        </div>

        {/* Hooks */}
        <div className="relative w-64 md:w-72 h-8 mt-1">
          {hookPositions().map((pos, i) => (
            <div
              key={i}
              className="absolute -top-1"
              style={{ left: `${pos}px`, transform: "translateX(-50%)" }}
            >
              <div
                className="w-5 h-5 rounded-full border-2"
                style={{ borderColor: hookOption.color }}
              />
              <div
                className="w-0.5 h-2 mx-auto -mt-0.5"
                style={{ backgroundColor: hookOption.color }}
              />
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-brown-light mt-2">Vista previa en tiempo real</p>
    </div>
  );
}
