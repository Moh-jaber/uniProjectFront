import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const InstructionPage = () => {
  return (
    <PageTransition>
      <div style={{ width: '100%', minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#fdfbf7', paddingTop: '120px', paddingBottom: '4rem' }}>
        
        {/* Background Blobs */}
        <div className="blob blob-1" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
        <div className="blob blob-2" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
        <div className="blob blob-3" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>How It Works</h1>
            <p style={{ fontSize: '1.2rem', color: '#555' }}>Follow these simple steps to discover your personality type.</p>
          </div>

          <div className="animate-fade-in" style={{ 
            background: 'rgba(255, 255, 255, 0.4)', 
            backdropFilter: 'blur(12px)', 
            borderRadius: '24px', 
            padding: '3rem', 
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.05)',
            animationDelay: '0.2s'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--primary-gradient)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, marginRight: '1.5rem' }}>1</div>
                <div>
                  <h3 style={{ marginBottom: '0.5rem' }}>Answer Honestly</h3>
                  <p style={{ color: '#555' }}>There are no right or wrong answers. Choose the option that best describes you, not what you think you "should" be.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--primary-gradient)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, marginRight: '1.5rem' }}>2</div>
                <div>
                  <h3 style={{ marginBottom: '0.5rem' }}>Don't Overthink</h3>
                  <p style={{ color: '#555' }}>Your first instinct is usually the most accurate. Try not to spend too much time on any single question.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--primary-gradient)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, marginRight: '1.5rem' }}>3</div>
                <div>
                  <h3 style={{ marginBottom: '0.5rem' }}>Complete All Questions</h3>
                  <p style={{ color: '#555' }}>The test consists of 12 questions. You must answer all of them to get your result.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <Link to="/quiz" className="btn btn-primary" style={{ padding: '1rem 4rem', fontSize: '1.2rem' }}>Start Quiz</Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default InstructionPage;
