const Contact = require("../models/Contact");

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
