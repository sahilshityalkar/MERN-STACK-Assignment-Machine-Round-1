// src/components/UserPosts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserPosts.css'; // You can add specific styles for this component here

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-posts">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="post-item">
            {post.image && <img src={post.image} alt={post.description} />}
          </div>
        ))
      )}
    </div>
  );
};

export default UserPosts;
