import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import missionImg from '../assets/mission.png';

const AboutPage = () => {
  return (
    <PageTransition>
      <div style={{ width: '100%', minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#fdfbf7', paddingTop: '120px', paddingBottom: '4rem' }}>
        
        {/* Background Blobs */}
        <div className="blob blob-1" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
        <div className="blob blob-2" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
        <div className="blob blob-3" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px' }}>
          {/* Hero Content */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
            
            {/* Text Content */}
            <div className="animate-fade-in">
              <span style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', fontWeight: '600', color: '#666', marginBottom: '1rem', display: 'block' }}>
                Our Mission
              </span>
              <h1 style={{ marginBottom: '1.5rem', fontSize: '3.5rem', lineHeight: 1.1 }}>
                Empowering <span className="text-gradient">Self-Discovery</span>
              </h1>
              <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem', lineHeight: '1.6' }}>
                We believe that understanding yourself is the key to unlocking your full potential. Our mission is to provide accessible, scientifically-grounded personality insights that help you navigate your career, relationships, and personal growth with confidence.
              </p>
            </div>

            {/* Image */}
            <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', animationDelay: '0.2s' }}>
              <img src={missionImg} alt="Our Mission" style={{ width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
            </div>
          </div>

          {/* Glassy Content Section */}
          <div className="animate-fade-in" style={{ 
            background: 'rgba(255, 255, 255, 0.4)', 
            backdropFilter: 'blur(12px)', 
            borderRadius: '24px', 
            padding: '3rem', 
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.05)'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Understanding the Dimensions</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
              <div>
                <h3 style={{ color: '#4facfe', marginBottom: '0.5rem', fontSize: '1.5rem' }}>E vs I</h3>
                <p style={{ fontSize: '1.1rem', color: '#555' }}><strong>Extraversion vs. Introversion:</strong> How you direct your energy—outward toward people and things, or inward toward ideas and information.</p>
              </div>
              <div>
                <h3 style={{ color: '#f093fb', marginBottom: '0.5rem', fontSize: '1.5rem' }}>S vs N</h3>
                <p style={{ fontSize: '1.1rem', color: '#555' }}><strong>Sensing vs. Intuition:</strong> How you prefer to take in information—focusing on facts and reality, or on patterns and possibilities.</p>
              </div>
              <div>
                <h3 style={{ color: '#66bb6a', marginBottom: '0.5rem', fontSize: '1.5rem' }}>T vs F</h3>
                <p style={{ fontSize: '1.1rem', color: '#555' }}><strong>Thinking vs. Feeling:</strong> How you make decisions—based on logic and consistency, or on people and special circumstances.</p>
              </div>
              <div>
                <h3 style={{ color: '#ffb74d', marginBottom: '0.5rem', fontSize: '1.5rem' }}>J vs P</h3>
                <p style={{ fontSize: '1.1rem', color: '#555' }}><strong>Judging vs. Perceiving:</strong> How you deal with the outside world—preferring structure and decisions, or staying open to new information.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
