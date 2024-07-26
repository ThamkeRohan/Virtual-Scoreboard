import React from "react";
import ReactDOM from "react-dom";

export default function ErrorModal({ error, closeErrorModal }) {
  console.log(error)
  if (!error) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="error-modal">
      <div>
        <div>
          <img
            src={`${window.location.origin}/assets/icons/error.png`}
            alt="error"
          />
        </div>
        <p>{error}</p>
      </div>
      <button onClick={closeErrorModal}>close</button>
    </div>,
    document.getElementById("portal")
  );
}
