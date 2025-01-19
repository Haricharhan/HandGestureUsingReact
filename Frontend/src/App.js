import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [gestureStarted, setGestureStarted] = useState(false);

  const handleStartGesture = async () => {
    console.log("Start Button Clicked");
    try {
      const response = await axios.get("http://127.0.0.1:5000/start");
      alert(response.data.status);
      setGestureStarted(true);
    } catch (error) {
      console.error("Error starting gesture detection:", error);
    }
  };

  const handleStopGesture = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/stop");
      alert(response.data.status);
      setGestureStarted(false);
    } catch (error) {
      console.error("Error stopping gesture detection:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative",
        margin: 0, // Prevent any margin that could push the content out of view
        overflow: "hidden", // To make sure no scrollbars appear
      }}
    >
      <div id="background" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div style={{
        backgroundColor:"#FFB200",
        borderRadius:"15px",
        padding:"15px",
        opacity:".85",
        
      }}>

           <div style={{ textAlign: "center", zIndex: 1 }}>
              <h1>Gesture Media Control</h1>
                <div>
                  <button
            onClick={handleStartGesture}
            style={{
              padding: "10px 20px",
              margin: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Start Gesture Detection
          </button>
          <button
            onClick={handleStopGesture}
            style={{
              padding: "10px 20px",
              margin: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Stop Gesture Detection
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
