import React, { useRef, useEffect } from "react";

const VideoBox = ({ isVideoActive }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startVideo = async () => {
      if (isVideoActive) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        } catch (error) {
          alert("Permission to access camera denied.");
        }
      } else {
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach((track) => track.stop());
          videoRef.current.srcObject = null;
        }
      }
    };

    startVideo();
  }, [isVideoActive]);

  return (
    <div style={videoContainerStyle}>
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "300px",
          backgroundColor: "black",
          display: isVideoActive ? "block" : "none",
        }}
      ></video>
    </div>
  );
};

const videoContainerStyle = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  border: "2px solid white",
  borderRadius: "10px",
  overflow: "hidden",
  backgroundColor: "black",
};

export default VideoBox;
