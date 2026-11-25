"use client";

import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import PhotoCropper from "./PhotoCropper";

interface PhotoUploaderProps {
  photos: string[];
  photoCount: number;
  onPhotoCountChange: (count: number) => void;
  onChange: (photos: string[]) => void;
}

export default function PhotoUploader({ photos, photoCount, onPhotoCountChange, onChange }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [rawImage, setRawImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setRawImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);

    if (inputRef.current) inputRef.current.value = "";
  };

  const handleCropDone = (croppedImage: string) => {
    onChange([...photos, croppedImage]);
    setRawImage(null);
  };

  const removePhoto = (index: number) => {
    onChange(photos.filter((_, i) => i !== index));
  };

  const handlePhotoCountChange = (count: number) => {
    onPhotoCountChange(count);
    if (photos.length > count) {
      onChange(photos.slice(0, count));
    }
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-brown mb-2">Número de fotos</h3>
      <div className="flex gap-2 mb-4">
        {[2, 3].map((n) => (
          <button
            key={n}
            onClick={() => handlePhotoCountChange(n)}
            className={`w-10 h-10 rounded-lg border text-sm font-medium transition-all ${
              photoCount === n
                ? "border-pink bg-pink text-white"
                : "border-cream-dark text-brown hover:border-pink/50"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <h3 className="text-sm font-semibold text-brown mb-1">
        Tus fotos · {photos.length} de {photoCount}
      </h3>
      <div className="flex gap-2 mt-2">
        {photos.map((photo, i) => (
          <div key={i} className="relative w-14 h-14 rounded-lg overflow-hidden border border-cream-dark">
            <img src={photo} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
            <button
              onClick={() => removePhoto(i)}
              className="absolute top-0 right-0 bg-pink text-white rounded-bl p-0.5"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {photos.length < photoCount && (
          <button
            onClick={() => inputRef.current?.click()}
            className="w-14 h-14 rounded-lg border-2 border-dashed border-cream-dark flex items-center justify-center text-brown-light hover:border-pink hover:text-pink transition-colors"
          >
            <Plus size={20} />
          </button>
        )}
      </div>
      <p className="text-xs text-brown-light mt-1">
        JPG o PNG. Sube {photoCount} fotos — podrás recortarlas antes de confirmar.
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
      />

      {rawImage && (
        <PhotoCropper
          image={rawImage}
          onCropDone={handleCropDone}
          onCancel={() => setRawImage(null)}
        />
      )}
    </div>
  );
}
