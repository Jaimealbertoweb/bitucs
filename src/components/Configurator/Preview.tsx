"use client";

import { FrameType, BackgroundType, HookFinish, frames, backgrounds, hookFinishes } from "@/lib/products";

interface PreviewProps {
  frame: FrameType;
  background: BackgroundType;
  hookCount: number;
  hookFinish: HookFinish;
  photos: string[];
}

export default function Preview({ frame, background, hookCount, hookFinish, photos }: PreviewProps) {
  const frameOption = frames.find((f) => f.id === frame)!;
  const bgOption = backgrounds.find((b) => b.id === background)!;
  const hookOption = hookFinishes.find((h) => h.id === hookFinish)!;

  const renderBackground = () => {
    if (background === "rayas-rojas") {
      return (
        <div
          className="w-full h-full"
          style={{
            background: `repeating-linear-gradient(90deg, ${bgOption.colors[0]} 0px, ${bgOption.colors[0]} 12px, ${bgOption.colors[1] || "#F5F0E8"} 12px, ${bgOption.colors[1] || "#F5F0E8"} 24px)`,
          }}
        />
      );
    }
    return <div className="w-full h-full" style={{ backgroundColor: bgOption.colors[0] }} />;
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
          {/* Background pattern */}
          {renderBackground()}

          {/* Photo overlay */}
          {photos.length > 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={photos[0]}
                alt="Tu foto"
                className="max-w-full max-h-full object-cover"
              />
            </div>
          )}

          {/* Placeholder text if no photo */}
          {photos.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm bg-white/80 px-3 py-1 rounded text-brown/60">
                Tu foto
              </span>
            </div>
          )}
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
