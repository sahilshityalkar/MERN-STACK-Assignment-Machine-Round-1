import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

// Initialize the GridFS stream
let gfs;

// Create a connection to MongoDB
const conn = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

conn.once('open', () => {
  // Initialize GridFS with the MongoDB connection
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Set the collection name
  console.log('GridFS initialized');
});

// Handle connection errors
conn.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

export default gfs;