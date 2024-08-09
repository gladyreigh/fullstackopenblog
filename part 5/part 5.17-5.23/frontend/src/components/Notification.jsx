// src/components/Notification.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = {
    color: message.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  return (
    <div style={notificationStyle}>
      {message.text}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'success']).isRequired,
  }),
};

export default Notification;
