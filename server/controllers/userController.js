import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { userId, email } = req.body;

  const userExists = await User.findOne({ userId });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    userId,
    email,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userId: user.userId,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      userId: updatedUser.userId,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { registerUser, updateUserProfile };
