import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

interface CreateOrderData {
  stripeSessionId: string;
  customerEmail: string;
  frame: string;
  background: string;
  paspartou: string | null;
  hookCount: number;
  hookFinish: string;
  photoCount: number;
  totalPrice: number;
}

interface UpdateOrderData {
  status: string;
  customerEmail: string;
  customerName: string | null;
}

export async function createOrder(data: CreateOrderData) {
  try {
    await pool.query(
      `INSERT INTO "Order" ("stripeSessionId", "status", "customerEmail", "frame", "background", "paspartou", "hookCount", "hookFinish", "photoCount", "totalPrice", "createdAt", "updatedAt")
       VALUES ($1, 'pending', $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())`,
      [
        data.stripeSessionId,
        data.customerEmail,
        data.frame,
        data.background,
        data.paspartou,
        data.hookCount,
        data.hookFinish,
        data.photoCount,
        data.totalPrice,
      ]
    );
  } catch (error) {
    console.warn("Could not save order to database:", error);
  }
}

export async function updateOrderBySessionId(stripeSessionId: string, data: UpdateOrderData) {
  try {
    await pool.query(
      `UPDATE "Order" SET "status" = $1, "customerEmail" = $2, "customerName" = $3, "updatedAt" = NOW()
       WHERE "stripeSessionId" = $4`,
      [data.status, data.customerEmail, data.customerName, stripeSessionId]
    );
  } catch (error) {
    console.warn("Could not update order in database:", error);
  }
}
