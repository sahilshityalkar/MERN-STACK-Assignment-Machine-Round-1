const User = require('../models/userModel');

exports.handleWebhook = async (req, res) => {
  const event = req.body;

  if (event.type === 'user.updated') {
    const { email, username } = event.data;

    try {
      // Update user data in the database
      await User.findOneAndUpdate(
        { email },
        { username },
        { new: true }
      );
      res.status(200).send('User data updated');
    } catch (error) {
      res.status(500).send('Error updating user data');
    }
  } else {
    res.status(400).send('Unknown event type');
  }
};