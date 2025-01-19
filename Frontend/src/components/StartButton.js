import React from "react";

const StartButton = ({ onClick }) => {
  return <button onClick={onClick} style={buttonStyle}>Start</button>;
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
};

export default StartButton;
