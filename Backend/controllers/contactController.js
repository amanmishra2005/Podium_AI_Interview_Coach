const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, type, message } = req.body;

    // Validation
    if (!name || !email || !type || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    const validTypes = ['query', 'suggestion', 'bug', 'other'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid submission type" });
    }

    // Save to DB
    const contact = await Contact.create({ name, email, type, message });

    // Send email notification if SMTP host & credentials are set
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || "support@podiumaiinterviewer.in";
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Podium App" <${process.env.SMTP_USER}>`,
          to: recipientEmail,
          replyTo: email,
          subject: `[Podium Contact Form] New ${type.toUpperCase()}: ${name}`,
          text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nType: ${type.toUpperCase()}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
              <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">New Podium Contact Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Type:</strong> <span style="background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; font-size: 12px; font-weight: bold;">${type}</span></p>
              <p><strong>Message:</strong></p>
              <div style="background: #f9fafb; border-left: 4px solid #4f46e5; padding: 12px 16px; border-radius: 4px; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${message}</div>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #6b7280;">Sent automatically from your Podium Interview Coach backend.</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Contact notification email failed to send:", emailErr.message);
      }
    }

    res.status(201).json({
      message: "Inquiry submitted successfully.",
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        type: contact.type,
        message: contact.message,
        createdAt: contact.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
