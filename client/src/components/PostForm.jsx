import React, { useState, useRef } from 'react';
import { useClerk } from '@clerk/clerk-react';
import axios from 'axios';
import '../App.css'; // Ensure the correct path to App.css

const PostForm = () => {
  const { user } = useClerk();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!content && !image) {
      setError('Please provide content or select an image.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('userId', user.id);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess('Post created successfully!');
      } else {
        setError('');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    } finally {
      setTimeout(() => {
        setLoading(false);
        setContent(''); // Clear the content
        setImage(null); // Clear the image state

        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the file input field
        }

        setError(''); // Clear the error message
      }, 1000); // Wait for 1 second before clearing the form
    }
  };

  return (
    <div className="post-form">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here"
          rows="4"
          required
          className="post-form-input"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="post-form-input"
          ref={fileInputRef} // Attach the ref to the file input
        />
        <button type="submit" className="post-form-button" disabled={loading}>
          {loading ? 'Please wait...' : 'Create New Post'}
        </button>
      </form>
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PostForm;
