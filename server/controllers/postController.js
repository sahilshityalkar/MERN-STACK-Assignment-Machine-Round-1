import Post from '../models/Post.js';
import gfs from '../config/gridfs.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new post with an image
export const createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const image = req.file; // Assume image is uploaded as a file

    let imageId;

    if (image) {
      const uploadStream = gfs.createWriteStream({
        filename: `${uuidv4()}-${image.originalname}`,
        bucketName: 'uploads',
      });

      uploadStream.end(image.buffer);

      uploadStream.on('finish', () => {
        imageId = uploadStream.id;
      });
    }

    const post = new Post({
      userId,
      content,
      imageId: imageId || null,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
