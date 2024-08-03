import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts, addPost, modifyPost, removePost } from '../features/posts/postsSlice';
import './Dashboard.css'; // For styling

const Dashboard = () => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector(state => state.posts);

  React.useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const handleLike = (id) => {
    // Dispatch action to like a post
  };

  const handleDislike = (id) => {
    // Dispatch action to dislike a post
  };

  return (
    <div className="dashboard">
      <aside className="dashboard__sidebar">
        {/* Sidebar content for My Posts */}
      </aside>
      <main className="dashboard__main">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && posts.map(post => (
          <div key={post.id} className="post">
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => handleLike(post.id)}>Like</button>
            <button onClick={() => handleDislike(post.id)}>Dislike</button>
          </div>
        ))}
      </main>
      <aside className="dashboard__sidebar">
        {/* Post creation form */}
      </aside>
    </div>
  );
};

export default Dashboard;
