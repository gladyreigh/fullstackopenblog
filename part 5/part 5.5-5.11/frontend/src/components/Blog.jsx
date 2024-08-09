import React, { useState } from 'react';

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} likes</p>
          <button 
            onClick={() => {
              console.log("Liking blog with ID:", blog.id);
              handleLike(blog.id);
            }}
          >
            Like
          </button>
          <p>Added by {blog.user?.name}</p>
          {user && blog.user && user.username === blog.user.username && (
            <button 
              onClick={() => {
                console.log("Deleting blog with ID:", blog.id);
                handleDelete(blog.id);
              }}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
