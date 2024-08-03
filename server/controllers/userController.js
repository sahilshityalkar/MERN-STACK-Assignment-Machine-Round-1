import User from '../models/User.js'; // Correct ES module import

export const saveUserData = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Validate input data
    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }

    // Find and update or create a new user document
    const user = await User.findOneAndUpdate(
      { email: email },
      { username: username, email: email },
      { new: true, upsert: true } // Create a new document if it doesn't exist
    );

    res.status(200).json({ message: 'User data saved/updated successfully', user });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
