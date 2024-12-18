import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostSection = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts?userId=user_2k8a9igINHz6yKUls0VEDmPEMzm');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-section">
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post-item">
            <p>{post.content}</p>
            {post.image && <img src={`http://localhost:5000${post.image}`} alt="Post" />}
          </div>
        ))
      )}
    </div>
  );
};

export default PostSection;
