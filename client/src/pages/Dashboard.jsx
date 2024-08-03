import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const Dashboard = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    selectedFile: ''
  });
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData(prevData => ({
        ...prevData,
        selectedFile: reader.result
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    // Ensure user data is sent correctly
    const creatorName = user ? `${user.firstName || 'Anonymous'} ${user.lastName || ''}` : 'Anonymous';

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, {
      title: formData.title,
      message: formData.message,
      creator: creatorName,
      selectedFile: formData.selectedFile
    })
    .then(response => {
      console.log('Post created:', response.data);
      setPosts(prevPosts => [response.data, ...prevPosts]);
      setFormData({
        title: '',
        message: '',
        selectedFile: ''
      });
    })
    .catch(error => {
      console.error('Error creating post:', error.response?.data || error.message);
      setError('Error creating post. Please try again.');
    });
  };

  const fetchPosts = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error.response?.data || error.message);
        setError('Error fetching posts. Please try again.');
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handlePostSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      {error && <p>{error}</p>}
      <div>
        <h2>Posts</h2>
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.message}</p>
              {post.selectedFile && <img src={post.selectedFile} alt="Post" style={{ maxWidth: '200px' }} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
