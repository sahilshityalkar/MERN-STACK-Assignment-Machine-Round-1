import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

export default User;
