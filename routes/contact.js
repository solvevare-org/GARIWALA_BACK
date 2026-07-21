const router = require('express').Router()
const nodemailer = require('nodemailer')

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please provide name, email, subject, and message.' })
    }

    const transporter = createTransporter()
    const receivedAt = new Date().toLocaleString('en-PK', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'full',
      timeStyle: 'short',
    })

    /* ── 1. Admin notification email ── */
    await transporter.sendMail({
      from: `"Gariwala " <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Inquiry: ${subject} — ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <div style="background: #F4B400; padding: 28px 32px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #111111; letter-spacing: -0.5px;">
              Gariwala Automobiles
            </h1>
            <p style="margin: 4px 0 0; font-size: 13px; color: #111111; opacity: 0.7;">New Customer Inquiry</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">
            <h2 style="margin: 0 0 20px; font-size: 18px; color: #111111;">You have a new inquiry</h2>

            <!-- Info table -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-size: 13px; color: #6b7280; width: 120px;">Full Name</td>
                <td style="padding: 10px 0; font-size: 14px; color: #111111; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-size: 13px; color: #6b7280;">Email</td>
                <td style="padding: 10px 0; font-size: 14px; color: #111111; font-weight: 600;">
                  <a href="mailto:${email}" style="color: #F4B400; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-size: 13px; color: #6b7280;">Phone</td>
                <td style="padding: 10px 0; font-size: 14px; color: #111111; font-weight: 600;">${phone || 'Not provided'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-size: 13px; color: #6b7280;">Subject</td>
                <td style="padding: 10px 0; font-size: 14px; color: #111111; font-weight: 600;">${subject}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-size: 13px; color: #6b7280;">Received</td>
                <td style="padding: 10px 0; font-size: 14px; color: #111111;">${receivedAt}</td>
              </tr>
            </table>

            <!-- Message -->
            <div style="background: #f9fafb; border-left: 4px solid #F4B400; border-radius: 4px; padding: 16px 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 6px; font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.08em;">Message</p>
              <p style="margin: 0; font-size: 14px; color: #111111; line-height: 1.7; white-space: pre-line;">${message}</p>
            </div>

            <!-- Reply CTA -->
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
               style="display: inline-block; background: #F4B400; color: #111111; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 6px; text-decoration: none;">
              Reply to ${name}
            </a>
          </div>

          <!-- Footer -->
          <div style="background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
              This message was submitted via the contact form on gariwala.com &nbsp;·&nbsp; New M. A. Jinnah Rd, Karachi, 74400
            </p>
          </div>
        </div>
      `,
    })

    /* ── 2. User confirmation email ── */
    await transporter.sendMail({
      from: `"Gariwala Automobiles" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `We've received your inquiry — Gariwala Automobiles`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <div style="background: #F4B400; padding: 28px 32px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #111111; letter-spacing: -0.5px;">
              Gariwala Automobiles
            </h1>
            <p style="margin: 4px 0 0; font-size: 13px; color: #111111; opacity: 0.7;">New M. A. Jinnah Rd, Karachi, 74400</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">
            <h2 style="margin: 0 0 12px; font-size: 20px; color: #111111;">Thank you, ${name}!</h2>
            <p style="margin: 0 0 20px; font-size: 15px; color: #374151; line-height: 1.7;">
              We have successfully received your inquiry and our team will get back to you within <strong>24 hours</strong> during business hours.
            </p>

            <!-- Summary box -->
            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 12px; font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.08em;">Your Inquiry Summary</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 8px 0; font-size: 13px; color: #6b7280; width: 100px;">Subject</td>
                  <td style="padding: 8px 0; font-size: 13px; color: #111111; font-weight: 600;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 13px; color: #6b7280;">Message</td>
                  <td style="padding: 8px 0; font-size: 13px; color: #111111; line-height: 1.6; white-space: pre-line;">${message}</td>
                </tr>
              </table>
            </div>

            <p style="margin: 0 0 8px; font-size: 14px; color: #374151;">In the meantime, feel free to reach us directly:</p>
            <p style="margin: 0 0 4px; font-size: 14px; color: #111111;">
              📞 <a href="tel:03132553864" style="color: #F4B400; text-decoration: none; font-weight: 600;">0313-2553864</a>
            </p>
            <p style="margin: 0 0 24px; font-size: 14px; color: #111111;">
              📍 New M. A. Jinnah Rd, Shikarpur Colony Muslimabad, Karachi, 74400
            </p>

            <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.7;">
              Warm regards,<br/>
              <strong style="color: #111111;">The Gariwala Team</strong>
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #111111; padding: 16px 32px;">
            <p style="margin: 0; font-size: 12px; color: #6b7280; text-align: center;">
              © ${new Date().getFullYear()} Gariwala Automobiles · Karachi, Pakistan
              &nbsp;·&nbsp;
              <a href="mailto:info@gariwala.com" style="color: #F4B400; text-decoration: none;">info@gariwala.com</a>
            </p>
          </div>
        </div>
      `,
    })

    res.json({ message: 'Contact message sent successfully.' })
  } catch (err) {
    console.error('Contact send failed:', err)
    res.status(500).json({ message: 'Failed to send contact message. Please try again later.' })
  }
})

module.exports = router
