import express from 'express';
import multer from 'multer';
import Post from '../models/Post.js';
import gfs from '../config/gridfs.js';

const router = express.Router();

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a post with an image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { userId, content } = req.body;
    let imageUrl = '';

    if (req.file) {
      // Store image in GridFS
      const writestream = gfs.createWriteStream({
        filename: req.file.originalname,
        content_type: req.file.mimetype
      });

      writestream.write(req.file.buffer);
      writestream.end();

      writestream.on('finish', () => {
        imageUrl = `http://localhost:5000/api/posts/image/${writestream.id}`;
      });
    }

    // Create a new post
    const post = new Post({
      userId,
      content,
      image: imageUrl
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get image by filename
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'No file exists' });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read the file from GridFS
      const readstream = gfs.createReadStream({ filename: file.filename });
      readstream.pipe(res);
    } else {
      res.status(404).json({ err: 'Not an image' });
    }
  });
});

export default router;