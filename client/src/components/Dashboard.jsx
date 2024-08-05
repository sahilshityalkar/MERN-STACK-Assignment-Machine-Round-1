import React, { useState } from 'react';
import PostForm from './PostForm'; // Import the PostForm component

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="dashboard">
      <button className="my-posts-btn" onClick={handleShowForm}>
        My Posts
      </button>
      {showForm && <PostForm />}
      {/* Your other dashboard content here */}
    </div>
  );
};

export default Dashboard;