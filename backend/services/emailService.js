const nodemailer = require('nodemailer');

// Transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, 
  auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
});

const sendEmail = async (to, subject, text, html = null) => {
  // Agar SMTP credentials nahi hain, toh console pe print karo (Fallback)
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('\n=============================================');
    console.log(`📧 [EMAIL FALLBACK - NOT SENT VIA SMTP]`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${text}`);
    console.log('=============================================\n');
    return;
  }

  try {
    await transporter.sendMail({
      from: `"EventSphere" <${process.env.FROM_EMAIL || 'noreply@eventsphere.pk'}>`,
      to, subject, text, html: html || `<p>${text}</p>`,
    });
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`❌ Email failed to ${to}:`, error.message);
    // Fallback agar email fail ho jaye
    console.log('\n--- 📧 EMAIL FAILED, HERE IS THE CONTENT ---');
    console.log(`To: ${to}\nSubject: ${subject}\nMessage: ${text}`);
    console.log('--------------------------------------------\n');
  }
};

module.exports = { sendEmail };