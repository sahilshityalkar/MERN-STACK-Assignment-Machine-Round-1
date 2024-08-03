export const saveUserData = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Validate data
    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }

    // Save or update user data in MongoDB
    // Assuming you have a User model and it's imported correctly

    const user = await User.findOneAndUpdate(
      { email: email }, // Update by email or use another unique identifier
      { username: username, email: email },
      { new: true, upsert: true } // Create a new document if it doesn't exist
    );

    res.status(200).json({ message: 'User data saved/updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
