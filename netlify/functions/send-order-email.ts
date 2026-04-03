import { Handler } from "@netlify/functions";

interface OrderItem {
  name: string;
  price: string;
  quantity: number;
}

interface OrderData {
  items: OrderItem[];
  totalPrice: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const orderData: OrderData = JSON.parse(event.body || "{}");

    // Validate required fields
    if (!orderData.email || !orderData.items || orderData.items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const adminEmail = "goldenstateflies@gmail.com";

    // Create HTML email for admin
    const itemsHtml = orderData.items
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
            ${item.name}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
            ${item.price}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
            $${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
          </td>
        </tr>
      `
      )
      .join("");

    const tax = (orderData.totalPrice * 0.08).toFixed(2);
    const total = (orderData.totalPrice * 1.08).toFixed(2);

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #1a1a1a; padding: 20px; border-radius: 8px; text-align: center; }
            .section { margin: 20px 0; padding: 15px; background: #f9fafb; border-radius: 8px; }
            .section-title { font-weight: bold; font-size: 16px; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th { background: #f3f4f6; padding: 12px; text-align: left; font-weight: bold; border-bottom: 2px solid #e5e7eb; }
            .total-row { font-weight: bold; background: #f3f4f6; }
            .footer { color: #666; font-size: 12px; text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎣 New Order Received!</h1>
              <p>Golden State Fly Co.</p>
            </div>

            <div class="section">
              <div class="section-title">Customer Information</div>
              <p><strong>Name:</strong> ${orderData.firstName} ${orderData.lastName}</p>
              <p><strong>Email:</strong> ${orderData.email}</p>
              <p><strong>Phone:</strong> ${orderData.phone || "Not provided"}</p>
            </div>

            <div class="section">
              <div class="section-title">Shipping Address</div>
              <p>
                ${orderData.address}<br>
                ${orderData.city}, ${orderData.state} ${orderData.zip}
              </p>
            </div>

            <div class="section">
              <div class="section-title">Order Items</div>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr class="total-row">
                    <td colspan="3" style="padding: 12px; text-align: right;">Subtotal</td>
                    <td style="padding: 12px; text-align: right;">$${orderData.totalPrice.toFixed(2)}</td>
                  </tr>
                  <tr class="total-row">
                    <td colspan="3" style="padding: 12px; text-align: right;">Shipping</td>
                    <td style="padding: 12px; text-align: right;">Free</td>
                  </tr>
                  <tr class="total-row">
                    <td colspan="3" style="padding: 12px; text-align: right;">Tax (8%)</td>
                    <td style="padding: 12px; text-align: right;">$${tax}</td>
                  </tr>
                  <tr class="total-row">
                    <td colspan="3" style="padding: 12px; text-align: right; font-size: 18px; color: #fbbf24;">Total</td>
                    <td style="padding: 12px; text-align: right; font-size: 18px; color: #fbbf24;">$${total}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="footer">
              <p>Order placed at ${new Date().toLocaleString()}</p>
              <p>Golden State Fly Co. © 2024</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Create confirmation email for customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #1a1a1a; padding: 20px; border-radius: 8px; text-align: center; }
            .section { margin: 20px 0; padding: 15px; background: #f9fafb; border-radius: 8px; }
            .section-title { font-weight: bold; font-size: 16px; margin-bottom: 10px; }
            .footer { color: #666; font-size: 12px; text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Order Confirmed!</h1>
              <p>Thank you for your order</p>
            </div>

            <div class="section">
              <div class="section-title">Hi ${orderData.firstName},</div>
              <p>Your order has been successfully placed! We're preparing your premium flies for shipment.</p>
              <p><strong>Order Total:</strong> $${total}</p>
              <p><strong>Shipping Address:</strong><br>
                ${orderData.address}<br>
                ${orderData.city}, ${orderData.state} ${orderData.zip}
              </p>
            </div>

            <div class="section">
              <div class="section-title">What's Next?</div>
              <p>Your order will ship within 1-2 business days. You'll receive a tracking email as soon as your package ships.</p>
              <p>Questions? Contact us at goldenstateflies@gmail.com</p>
            </div>

            <div class="footer">
              <p>Golden State Fly Co. © 2024</p>
              <p>Premium hand-tied fishing flies</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send emails using Resend API (free tier available)
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY not set. Skipping email sending for demo.");
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message:
            "Order processed (email service not configured for demo)",
        }),
      };
    }

    // Send admin notification
    const adminResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "orders@goldenstateflyco.com",
        to: adminEmail,
        subject: `New Order: ${orderData.firstName} ${orderData.lastName}`,
        html: adminEmailHtml,
      }),
    });

    // Send customer confirmation
    const customerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "orders@goldenstateflyco.com",
        to: orderData.email,
        subject: "Your Order Confirmation - Golden State Fly Co.",
        html: customerEmailHtml,
      }),
    });

    if (!adminResponse.ok || !customerResponse.ok) {
      throw new Error("Failed to send emails");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Order emails sent successfully",
      }),
    };
  } catch (error) {
    console.error("Email error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to process order",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};

export { handler };
