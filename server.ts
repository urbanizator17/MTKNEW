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
    console.log("Received contact request:", req.body);
    try {
      const { message, name, phone, method, source } = req.body;
      
      if (!message && !name && !phone) {
        return res.status(400).json({ error: 'Data is required' });
      }

      // Generate HTML Email
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background-color: #dc2626; padding: 30px 20px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px; }
            .content { padding: 40px 30px; }
            .row { margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px; }
            .row:last-child { border-bottom: none; }
            .label { font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; font-weight: 600; }
            .value { font-size: 16px; color: #111; font-weight: 500; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #999; font-size: 12px; }
            .tag { display: inline-block; padding: 4px 12px; background: #fee2e2; color: #dc2626; border-radius: 20px; font-size: 12px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>МТК | НОВАЯ ЗАЯВКА</h1>
            </div>
            <div class="content">
              <div class="row">
                <div class="label">Источник</div>
                <div class="value"><span class="tag">${source || 'Сайт'}</span></div>
              </div>
              <div class="row">
                <div class="label">Имя клиента</div>
                <div class="value">${name || 'Не указано'}</div>
              </div>
              <div class="row">
                <div class="label">Телефон</div>
                <div class="value">
                  <a href="tel:${phone}" style="color: #dc2626; text-decoration: none; font-weight: 600;">${phone || 'Не указано'}</a>
                </div>
              </div>
              <div class="row">
                <div class="label">Предпочитаемый способ связи</div>
                <div class="value" style="text-transform: capitalize;">${method || 'Не указан'}</div>
              </div>
              ${message ? `
              <div class="row">
                <div class="label">Детали заявки / Сообщение</div>
                <div class="value" style="white-space: pre-wrap;">${message}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              &copy; ${new Date().getFullYear()} МТК. Все права защищены.<br>
              Системное уведомление сайта mtk-fuel.ru
            </div>
          </div>
        </body>
        </html>
      `;

      const host = (process.env.SMTP_HOST || '').trim();
      const portInput = (process.env.SMTP_PORT || '465').trim();
      const port = parseInt(portInput);
      const user = (process.env.SMTP_USER || '').trim();
      const pass = (process.env.SMTP_PASS || '').trim();
      const recipient = (process.env.RECIPIENT_EMAIL || '').trim();

      if (!host || !user || !pass || !recipient) {
        console.error("Missing SMTP configuration:", { host: !!host, user: !!user, pass: !!pass, recipient: !!recipient });
        return res.status(500).json({ 
          error: "Email server not configured", 
          details: `Missing: ${[!host && 'HOST', !user && 'USER', !pass && 'PASS', !recipient && 'RECIPIENT'].filter(Boolean).join(', ')}` 
        });
      }

      try {
        let transportConfig: any = {
          auth: { user, pass },
          connectionTimeout: 15000,
          greetingTimeout: 15000,
          socketTimeout: 15000,
        };

        const lowerHost = host.toLowerCase();
        
        // Smarter service detection and configuration
        if (lowerHost.includes('mail.ru')) {
          transportConfig = {
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: { user, pass }
          };
        } else if (lowerHost.includes('yandex')) {
          transportConfig = {
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: { user, pass }
          };
        } else if (lowerHost.includes('gmail')) {
          transportConfig = {
            service: 'gmail',
            auth: { user, pass }
          };
        } else {
          transportConfig.host = host;
          transportConfig.port = port;
          transportConfig.secure = port === 465;
          transportConfig.tls = {
            rejectUnauthorized: false,
            minVersion: 'TLSv1.2'
          };
        }

        console.log("Creating transporter with config:", { ...transportConfig, auth: { user, pass: '***' } });
        const transporter = nodemailer.createTransport(transportConfig);

        const info = await transporter.sendMail({
          from: `"Заявка МТК" <${user}>`, 
          to: recipient,
          replyTo: user,
          subject: 'Новая заявка: Сайт МТК',
          text: message || `Заявка от ${name}. Телефон: ${phone}. Источник: ${source}`,
          html: htmlContent
        });
        
        console.log("Email sent successfully. ID:", info.messageId);
        return res.json({ 
          success: true, 
          message: "Message sent successfully",
          id: info.messageId // Return ID for tracking
        });
      } catch (mailErr) {
        console.error("Failed to send Email:", mailErr);
        let errorMsg = mailErr instanceof Error ? mailErr.message : String(mailErr);
        if (errorMsg.includes('Invalid login') && lowerHost.includes('yandex')) {
          errorMsg = "Ошибка авторизации Yandex: убедитесь, что вы используете «Пароль приложения», а не обычный пароль от почты.";
        }
        return res.status(500).json({ 
          error: "Failed to send email", 
          details: errorMsg 
        });
      }
    } catch (error) {
      console.error("Critical error in /api/contact:", error);
      return res.status(500).json({ error: "Internal server error" });
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
