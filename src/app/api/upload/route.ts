import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process with Sharp: resize, optimize, convert to JPEG
    const processed = await sharp(buffer)
      .resize(800, 800, { fit: "cover", withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();

    const base64 = `data:image/jpeg;base64,${processed.toString("base64")}`;

    return NextResponse.json({ image: base64 });
  } catch (error) {
    console.error("Image processing error:", error);
    return NextResponse.json(
      { error: "Error al procesar la imagen" },
      { status: 500 }
    );
  }
}
