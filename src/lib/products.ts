export type FrameType = "nogal" | "roble" | "blanco";
export type BackgroundType = "rayas-rojas" | "liso-beige" | "liso-verde" | "liso-azul";
export type HookFinish = "laton" | "negro-mate" | "niquel";

export interface FrameOption {
  id: FrameType;
  name: string;
  color: string;
  price: number;
  description: string;
}

export interface BackgroundOption {
  id: BackgroundType;
  name: string;
  colors: string[];
  price: number;
}

export interface HookFinishOption {
  id: HookFinish;
  name: string;
  color: string;
  price: number;
  priceLabel?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  frame: FrameType;
  background: BackgroundType;
  hookCount: number;
  hookFinish: HookFinish;
}

export const frames: FrameOption[] = [
  { id: "nogal", name: "Nogal", color: "#5C3A21", price: 49, description: "Madera oscura y cálida, como la del marco de la foto." },
  { id: "roble", name: "Roble", color: "#C49A6C", price: 62.5, description: "Tono claro y natural que combina con cualquier pared." },
  { id: "blanco", name: "Blanco", color: "#F5F0EB", price: 48.5, description: "Lacado en blanco, limpio y luminoso." },
];

export const backgrounds: BackgroundOption[] = [
  { id: "rayas-rojas", name: "Rayas rojas", colors: ["#C0392B", "#F5F0E8"], price: 3 },
  { id: "liso-beige", name: "Liso beige", colors: ["#D4B896"], price: 0 },
  { id: "liso-verde", name: "Liso verde", colors: ["#7D8B69"], price: 3 },
  { id: "liso-azul", name: "Liso azul", colors: ["#2C3E6B"], price: 3 },
];

export const hookFinishes: HookFinishOption[] = [
  { id: "laton", name: "Latón", color: "#C9A84C", price: 3.5 },
  { id: "negro-mate", name: "Negro mate", color: "#2C2C2C", price: 3.5 },
  { id: "niquel", name: "Níquel", color: "#C0C0C0", price: 5, priceLabel: "+1,50 €/gancho" },
];

export const products: Product[] = [
  {
    id: "nogal-rayas",
    name: "Marco Nogal Rayas",
    description: "Marco de nogal con fondo de rayas rojas. Clásico y elegante.",
    price: 59,
    image: "/images/placeholder-product.svg",
    frame: "nogal",
    background: "rayas-rojas",
    hookCount: 2,
    hookFinish: "laton",
  },
  {
    id: "roble-beige",
    name: "Marco Roble Natural",
    description: "Marco de roble con fondo beige. Minimalista y natural.",
    price: 69.5,
    image: "/images/placeholder-product.svg",
    frame: "roble",
    background: "liso-beige",
    hookCount: 2,
    hookFinish: "laton",
  },
  {
    id: "blanco-verde",
    name: "Marco Blanco Verde",
    description: "Marco blanco con fondo verde. Fresco y moderno.",
    price: 58.5,
    image: "/images/placeholder-product.svg",
    frame: "blanco",
    background: "liso-verde",
    hookCount: 3,
    hookFinish: "negro-mate",
  },
  {
    id: "nogal-azul",
    name: "Marco Nogal Azul",
    description: "Marco de nogal con fondo azul. Sofisticado y único.",
    price: 59,
    image: "/images/placeholder-product.svg",
    frame: "nogal",
    background: "liso-azul",
    hookCount: 2,
    hookFinish: "negro-mate",
  },
  {
    id: "roble-rayas",
    name: "Marco Roble Rayas",
    description: "Marco de roble con fondo de rayas rojas. Cálido y acogedor.",
    price: 72.5,
    image: "/images/placeholder-product.svg",
    frame: "roble",
    background: "rayas-rojas",
    hookCount: 3,
    hookFinish: "laton",
  },
  {
    id: "blanco-beige",
    name: "Marco Blanco Natural",
    description: "Marco blanco con fondo beige. Luminoso y sencillo.",
    price: 55.5,
    image: "/images/placeholder-product.svg",
    frame: "blanco",
    background: "liso-beige",
    hookCount: 2,
    hookFinish: "laton",
  },
];

export function calculatePrice(
  frame: FrameType,
  background: BackgroundType,
  hookCount: number,
  hookFinish: HookFinish
): { framePrice: number; backgroundPrice: number; hooksPrice: number; total: number } {
  const frameOption = frames.find((f) => f.id === frame)!;
  const backgroundOption = backgrounds.find((b) => b.id === background)!;
  const hookFinishOption = hookFinishes.find((h) => h.id === hookFinish)!;

  const framePrice = frameOption.price;
  const backgroundPrice = backgroundOption.price;
  const hooksPrice = hookFinishOption.price * hookCount;
  const total = framePrice + backgroundPrice + hooksPrice;

  return { framePrice, backgroundPrice, hooksPrice, total };
}
