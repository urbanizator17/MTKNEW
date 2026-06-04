import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '465');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const recipient = process.env.RECIPIENT_EMAIL;

    if (!host || !user || !pass || !recipient) {
      console.error("Missing SMTP configuration");
      return res.status(500).json({ error: "Email server not configured" });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"МТК Сайт" <${user}>`,
      to: recipient,
      subject: 'Новая заявка с сайта МТК',
      text: message,
      // You can also add html: message.replace(/\n/g, '<br>') if you want
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Message sent successfully via Email" });
  } catch (error) {
    console.error("Error in /api/contact (Email):", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
