import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderEmailData {
  to: string;
  customerName: string;
  frame: string;
  background: string;
  hookCount: number;
  hookFinish: string;
  total: number;
}

export async function sendOrderConfirmation(data: OrderEmailData) {
  try {
    await resend.emails.send({
      from: "BITUCS <pedidos@bitucs.com>",
      to: data.to,
      subject: "¡Gracias por tu pedido! - BITUCS",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FDF8F4; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #E96AAD; font-size: 32px; margin: 0;">BITUCS</h1>
            <p style="color: #6B3A42; font-size: 14px; margin: 5px 0 0;">Lo bonito de volver a casa.</p>
          </div>

          <div style="background: white; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
            <h2 style="color: #4A2028; margin-top: 0;">¡Hola ${data.customerName}!</h2>
            <p style="color: #6B3A42; line-height: 1.6;">
              Hemos recibido tu pedido correctamente. Tu portallaves será fabricado a mano con todo el cariño.
            </p>

            <div style="background: #F0E6DC; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #4A2028; margin-top: 0; font-size: 16px;">Detalles del pedido</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #6B3A42;">Marco</td>
                  <td style="padding: 6px 0; color: #4A2028; text-align: right; font-weight: 600;">${data.frame}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6B3A42;">Fondo</td>
                  <td style="padding: 6px 0; color: #4A2028; text-align: right; font-weight: 600;">${data.background}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6B3A42;">Ganchos</td>
                  <td style="padding: 6px 0; color: #4A2028; text-align: right; font-weight: 600;">${data.hookCount} x ${data.hookFinish}</td>
                </tr>
                <tr style="border-top: 1px solid #D4C5A9;">
                  <td style="padding: 12px 0 0; color: #4A2028; font-weight: 700; font-size: 16px;">Total</td>
                  <td style="padding: 12px 0 0; color: #E96AAD; text-align: right; font-weight: 700; font-size: 18px;">${data.total.toFixed(2).replace(".", ",")} €</td>
                </tr>
              </table>
            </div>

            <p style="color: #6B3A42; line-height: 1.6; font-size: 14px;">
              Te avisaremos cuando tu portallaves esté en camino. Si tienes alguna pregunta, no dudes en escribirnos a
              <a href="mailto:hola@bitucs.com" style="color: #E96AAD;">hola@bitucs.com</a>.
            </p>
          </div>

          <div style="text-align: center; color: #6B3A42; font-size: 12px;">
            <p>&copy; 2026 BITUCS - Todos los derechos reservados</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}
