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
    const { email } = req.body;
    const email_list = await Email.find({ from: email }).sort({ sentAt: -1 });
    res.status(200).json(email_list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getInbox = async (req, res) => {
  try {
    const { email } = req.body;
    const email_list = await Email.find({ to: email }).sort({ sentAt: -1 });
    res.status(200).json(email_list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.body;
    await Email.findByIdAndUpdate(id, { status: true });
    res.status(200).json({ success: true, message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  sendEmail,
  getOutbox,
  getInbox,
  markAsRead
};
