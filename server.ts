import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const host = (process.env.SMTP_HOST || '').trim();
      const port = parseInt((process.env.SMTP_PORT || '465').trim());
      const user = (process.env.SMTP_USER || '').trim();
      const pass = (process.env.SMTP_PASS || '').trim();
      const recipient = (process.env.RECIPIENT_EMAIL || '').trim();

      if (!host || !user || !pass || !recipient) {
        console.error("Missing SMTP configuration");
        return res.status(500).json({ error: "Email server not configured" });
      }

      // Create transport configuration
      let transportConfig: any = {
        auth: {
          user,
          pass,
        },
        connectionTimeout: 20000,
        greetingTimeout: 20000,
        socketTimeout: 20000,
        debug: true,
        logger: true
      };

      // Use service presets or explicit config for better compatibility
      const lowerHost = host.toLowerCase();
      if (lowerHost.includes('mail.ru')) {
        transportConfig.service = 'mail.ru';
        transportConfig.host = 'smtp.mail.ru';
        transportConfig.port = 465;
        transportConfig.secure = true;
      } else if (lowerHost.includes('yandex')) {
        // Use the official built-in Yandex service preset
        transportConfig = {
          service: 'Yandex',
          auth: {
            user,
            pass,
          },
          debug: true,
          logger: true,
          connectionTimeout: 20000,
          greetingTimeout: 20000,
          socketTimeout: 20000,
        };
      } else if (lowerHost.includes('gmail')) {
        transportConfig.service = 'gmail';
      } else {
        transportConfig.host = host;
        transportConfig.port = port;
        transportConfig.secure = port === 465;
      }

      // Common TLS settings (if not already set by service preset)
      if (!transportConfig.tls) {
        transportConfig.tls = {
          rejectUnauthorized: false,
          minVersion: 'TLSv1.2',
          servername: transportConfig.host || host
        };
      }

      const transporter = nodemailer.createTransport(transportConfig);

      const mailOptions = {
        from: user, // Use plain email address as from
        to: recipient,
        subject: 'Новая заявка с сайта МТК',
        text: message,
      };

      console.log(`Attempting to send email via ${host}:${port} (Service: ${transportConfig.service || 'None'})...`);
      
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      return res.json({ success: true, message: "Message sent successfully via Email" });
    } catch (error) {
      console.error("Error in /api/contact (Email):", error);
      return res.status(500).json({ 
        error: "Failed to send email",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
