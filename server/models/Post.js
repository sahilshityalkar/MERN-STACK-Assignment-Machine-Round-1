import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  imageId: { type: String }, // Store the ID of the image in GridFS
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

export default Post;
