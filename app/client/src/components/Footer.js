import React from 'react';
import '../assets/styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footerBody">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-left">
            <p>© 2024 PERTApp. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-right">
            <p>
              Follow us:
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a> | 
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a> | 
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
