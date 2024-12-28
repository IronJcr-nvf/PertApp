import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
      <h1>PERTApp</h1>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '15px' }}>
        <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
