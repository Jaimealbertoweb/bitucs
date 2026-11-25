"use client";

import { Plus, X } from "lucide-react";
import { useRef } from "react";

interface PhotoUploaderProps {
  photos: string[];
  maxPhotos: number;
  onChange: (photos: string[]) => void;
}

export default function PhotoUploader({ photos, maxPhotos, onChange }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (photos.length >= maxPhotos) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        onChange([...photos, result]);
      };
      reader.readAsDataURL(file);
    });

    if (inputRef.current) inputRef.current.value = "";
  };

  const removePhoto = (index: number) => {
    onChange(photos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-brown mb-1">
        Tus fotos · {photos.length} de {maxPhotos}
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
        {Array.from({ length: maxPhotos - photos.length }).map((_, i) => (
          <button
            key={`empty-${i}`}
            onClick={() => inputRef.current?.click()}
            className="w-14 h-14 rounded-lg border-2 border-dashed border-cream-dark flex items-center justify-center text-brown-light hover:border-pink hover:text-pink transition-colors"
          >
            <Plus size={20} />
          </button>
        ))}
      </div>
      <p className="text-xs text-brown-light mt-1">
        JPG o PNG. Puedes añadir hasta {maxPhotos} fotos y recortarlas antes de comprar.
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
