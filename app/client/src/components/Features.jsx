import React from 'react'
import '../assets/styles/Features.css';
import Card from '../components/Cards';

function Features() {
  return (
    <div className="features-list">
  <h1>Key Features</h1>
  <p className="features-description">
        Our PERT app provides you with a comprehensive set of tools designed to simplify project management. 
        From visualizing timelines and dependencies to optimizing resource allocation, our app ensures you stay on top of your projects, making smarter decisions and boosting productivity.
      </p>
   <Card/>
</div>

  )
}

export default Features;
