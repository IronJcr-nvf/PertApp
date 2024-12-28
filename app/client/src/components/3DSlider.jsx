import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/3DSlider.css";
import ImageTrain from '../assets/images/welcome-image.png';
import RomaImage from '../assets/images/roma.png';

const Slider = () => {
  const dragContainerRef = useRef(null);
  const spinContainerRef = useRef(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isPaused, setIsPaused] = useState(false); // حالة للتحكم في الأنيميشن

  const images = [
    { src: RomaImage, content: "Roumaissa GHRIBALLAH" },
    { src: ImageTrain, content: "FATIMA ZOHRA" },
    { src: ImageTrain, content: "AYOUB HADJ HENNI" },
    { src: ImageTrain, content: "MALEK " },
    { src: ImageTrain, content: "SIRIN SEHABI" },
    { src: ImageTrain, content: "PROF BLA BLA" },
  ];

  useEffect(() => {
    const spinContainer = spinContainerRef.current;
    const elements = [...spinContainer.querySelectorAll("img")];

    const init = () => {
      const totalElements = elements.length;
      elements.forEach((el, i) => {
        const angle = (i * 360) / totalElements;
        el.style.transform = `rotateY(${angle}deg) translateZ(240px)`;
        el.style.transition = "transform 1s";
      });
    };

    init();

    if (isPaused) {
      spinContainer.style.animationPlayState = "paused";
    } else {
      spinContainer.style.animationPlayState = "running";
    }
  }, [isPaused]);

  const handleMouseEnter = (content) => {
    setSelectedContent(content);
    setIsPaused(true); 
   };

  const handleMouseLeave = () => {
    setIsPaused(false);  };

  return (
    <>
    <div className="sliderTitle">
      <h1>Team Members</h1>
      <h4>Let's Talk About Us Somthing emm who are we?</h4>
    </div>
    <div className="sliderbody">
      <div id="drag-container" ref={dragContainerRef}>
        <div id="spin-container" ref={spinContainerRef}>
          {images.map((img, index) => (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              key={index}
              src={img.src}
              alt={`Image ${index}`}
              onMouseEnter={() => handleMouseEnter(img.content)} // توقف الدوران عند الفأرة
              onMouseLeave={handleMouseLeave} // تشغيل الدوران عند رفع الفأرة
            />
          ))}
        </div>
        <div id="ground"></div>
      </div>
      <div className="content-display">
        {selectedContent ? (
          <div className="content-box">
            <h3>Content Details</h3>
            <p>{selectedContent}</p>
          </div>
        ) : (
          <p>Hover over an image to see its content</p>
        )}
      </div>
      
    </div>
</>
  );
};

export default Slider;
