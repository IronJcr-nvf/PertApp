import React from 'react';
import '../assets/styles/About.css';
import aboutImage from '../assets/images/welcome-image.png'; 
import { FaArrowRight } from 'react-icons/fa'; 

const About = () => {
  return (
    <section className="about-section" id='about'>
      
      <div className="about-image">
        <img src={aboutImage} alt="About Us" />
      </div>
      <div className="about-text">
        <h2>About Us</h2>
        <p>
          We are a team of passionate individuals dedicated to helping you manage your projects more effectively. 
          Our mission is to provide the best tools to improve productivity and make your tasks easier to handle.
        </p>
        <button className="read-more-btn">
          Read More <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default About;
