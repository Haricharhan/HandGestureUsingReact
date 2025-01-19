// ExitButton.js
import React from "react";

const ExitButton = ({ onClick }) => {
  return <button onClick={onClick} style={buttonStyle}>Exit</button>;
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ExitButton;
