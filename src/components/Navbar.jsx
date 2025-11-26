import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const hasHistory = localStorage.getItem('quizHistory');

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid rgba(0,0,0,0.05)'
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    textDecoration: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px'
  };

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#1a1a1a' : '#666',
    fontWeight: location.pathname === path ? '600' : '400',
    marginLeft: '2rem',
    transition: 'color 0.3s ease',
    fontSize: '1rem'
  });

  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <Link to="/" style={logoStyle}>
          Personality.AI
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={linkStyle('/')}>Home</Link>
          <Link to="/about" style={linkStyle('/about')}>About</Link>
          {hasHistory && (
            <Link to="/history" style={linkStyle('/history')}>My History</Link>
          )}
          <Link to="/instructions" className="btn btn-primary" style={{ marginLeft: '2rem', padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
            Start Quiz
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
