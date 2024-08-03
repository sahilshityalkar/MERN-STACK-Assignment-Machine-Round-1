import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

dotenv.config();

const app = express();

console.log('MongoDB URI:', process.env.MONGO_URI);

connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
