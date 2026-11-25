"use client";

import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { X } from "lucide-react";

interface PhotoCropperProps {
  image: string;
  onCropDone: (croppedImage: string) => void;
  onCancel: () => void;
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL("image/jpeg", 0.9);
}

export default function PhotoCropper({ image, onCropDone, onCancel }: PhotoCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = async () => {
    if (!croppedAreaPixels) return;
    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    onCropDone(croppedImage);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-cream rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <h2 className="text-lg font-bold text-brown">Recorta tu foto</h2>
          <button onClick={onCancel} className="text-brown-light hover:text-brown transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="relative h-72 mx-6 rounded-xl overflow-hidden bg-black">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="px-6 py-3">
          <label className="text-xs text-brown-light">Zoom</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-pink"
          />
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-cream-dark text-brown font-medium py-2.5 rounded-full hover:bg-cream-dark transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleDone}
            className="flex-1 bg-pink text-white font-semibold py-2.5 rounded-full hover:bg-pink-dark transition-colors"
          >
            Aplicar recorte
          </button>
        </div>
      </div>
    </div>
  );
}
