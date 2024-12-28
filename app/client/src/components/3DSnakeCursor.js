import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../assets/styles/3DSnakeCursor.css';

const SnakeCursor = () => {
  const segmentsRef = useRef([]);
  const segmentCount = 20; // عدد الأجزاء في الذيل

  useEffect(() => {
    const positions = Array.from({ length: segmentCount }, () => ({ x: 0, y: 0 }));

    const handleMouseMove = (e) => {
      const { clientX: mouseX, clientY: mouseY } = e;
      positions[0] = { x: mouseX, y: mouseY };

      // تحريك الأجزاء الأخرى لتتبع الجزء السابق بشكل سلس
      for (let i = 1; i < segmentCount; i++) {
        const dx = positions[i - 1].x - positions[i].x;
        const dy = positions[i - 1].y - positions[i].y;
        positions[i].x += dx * 0.3;
        positions[i].y += dy * 0.3;
      }

      // تحديث المواقع باستخدام GSAP
      segmentsRef.current.forEach((segment, index) => {
        if (segment) {
          gsap.to(segment, {
            x: positions[index].x,
            y: positions[index].y,
            z: index * -5, // تأثير ثلاثي الأبعاد
            duration: 0.1,
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="snake-cursor-container">
      {Array.from({ length: segmentCount }).map((_, index) => (
        <div
          key={index}
          className="snake-segment"
          ref={(el) => (segmentsRef.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default SnakeCursor;
