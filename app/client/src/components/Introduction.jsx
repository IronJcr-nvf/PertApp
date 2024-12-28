import React from 'react';
import '../assets/styles/introduction.css';
import welcomeImage from '../assets/images/welcome.png'; 

const Introduction = () => {
  return (
    <section className="welcome-section">
      <div className="welcome-text">
        <h1 className="main-title">Welcome to Our PERT App!</h1>
        <p className="intro-text">
          We're not just another project management tool. Our PERT (Program Evaluation Review Technique) app
          empowers you to take control of your projects like never before. Whether you're managing a team or working solo,
          we’ve got you covered.
        </p>
        <p className="cta-text">
          Start using our app today and watch your productivity soar! 
          The best project management tool is just one click away.
        </p>
        <button className="get-started-btn">Get Started</button>
      </div>
      <div className="welcome-image">
        <img src={welcomeImage} alt="Welcome" />
      </div>
    </section>
  );
};

export default Introduction;
