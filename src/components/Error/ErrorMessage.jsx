import React from 'react'

export default function ErrorMessage({message}) {
  return (
    <div className="error-message">
      <div>
        <img
          src={`${window.location.origin}/assets/icons/error.png`}
          alt="error"
        />
      </div>
      <p className="message">{message}</p>
    </div>
  );
}
