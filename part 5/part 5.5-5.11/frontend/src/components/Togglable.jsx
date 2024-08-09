// src/components/Togglable.jsx
import React, { useState } from 'react';

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {visible ? 'Cancel' : buttonLabel}
      </button>
      {visible && children}
    </div>
  );
};

export default Togglable;
