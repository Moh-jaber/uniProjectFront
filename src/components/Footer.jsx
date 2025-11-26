import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ padding: '3rem 0', background: '#f9f9f9', borderTop: '1px solid #eee', marginTop: 'auto' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '700', textDecoration: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Personality.AI
          </Link>
          <p style={{ color: '#999', fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: 0 }}>
            &copy; 2025 Personality.AI. All rights reserved.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link>
          <Link to="/about" style={{ color: '#666', textDecoration: 'none' }}>About</Link>
          <Link to="/instructions" style={{ color: '#666', textDecoration: 'none' }}>Take Test</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
