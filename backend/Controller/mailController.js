const Email = require('../Models/Email');

const sendEmail = async (req, res) => {
  try {
    const { from, to, subject, message } = req.body;
    const newEmail = new Email({ from, to, subject, message });
    await newEmail.save();
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getOutbox = async (req, res) => {
  try {
    const { id } = req.params;
    const emails = await Email.find({ from: id }).sort({ sentAt: -1 });
    res.status(200).json(emails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getInbox = async (req, res) => {
  try {
    const { id } = req.params;
    const emails = await Email.find({ to: id }).sort({ sentAt: -1 });
    res.status(200).json(emails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  sendEmail,
  getOutbox,
  getInbox,
};
