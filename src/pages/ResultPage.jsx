import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { personalities } from '../utils/personalities';
import PageTransition from '../components/PageTransition';

const ResultPage = () => {
  const location = useLocation();
  const result = location.state?.result || "ESTJ"; // Default fallback
  const personalityData = personalities[result] || personalities['ESTJ'];
  const type = result;

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B6B', '#4facfe', '#f093fb']
    });
  }, []);

  return (
    <PageTransition>
      <div style={{ width: '100%', minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#fdfbf7', paddingTop: '120px', paddingBottom: '4rem' }}>
        
        {/* Background Blobs */}
        <div className="blob blob-1" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
        <div className="blob blob-2" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
        <div className="blob blob-3" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1000px' }}>
          <div className="animate-fade-in" style={{ 
            background: 'rgba(255, 255, 255, 0.4)', 
            backdropFilter: 'blur(12px)', 
            borderRadius: '24px', 
            padding: '4rem', 
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.05)',
            textAlign: 'center'
          }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', fontWeight: '600', color: '#666', marginBottom: '1rem', display: 'block' }}>
              Your Personality Type Is
            </span>
            <h1 className="text-gradient" style={{ fontSize: '6rem', marginBottom: '0.5rem', lineHeight: 1 }}>{type}</h1>
            <h2 style={{ fontSize: '2rem', color: '#444', marginBottom: '2rem' }}>{personalityData.name}</h2>
            
            <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
              {personalityData.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', textAlign: 'left', marginBottom: '4rem' }}>
              <div>
                <h3 style={{ color: '#4facfe', marginBottom: '1rem', borderBottom: '2px solid #4facfe', paddingBottom: '0.5rem', display: 'inline-block' }}>Strengths</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {personalityData.strengths.map((strength, index) => (
                    <li key={index} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'flex-start' }}>
                      <span style={{ color: '#4facfe', marginRight: '0.8rem', fontWeight: 'bold' }}>+</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 style={{ color: '#f093fb', marginBottom: '1rem', borderBottom: '2px solid #f093fb', paddingBottom: '0.5rem', display: 'inline-block' }}>Weaknesses</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {personalityData.weaknesses.map((weakness, index) => (
                    <li key={index} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'flex-start' }}>
                      <span style={{ color: '#f093fb', marginRight: '0.8rem', fontWeight: 'bold' }}>-</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.5)', padding: '2rem', borderRadius: '16px', marginBottom: '3rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Dimensions Breakdown</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {type.split('').map((char, index) => {
                  const descriptions = {
                    'E': 'Extraversion: You prefer to focus on the outer world of people and things.',
                    'I': 'Introversion: You prefer to focus on the inner world of ideas and impressions.',
                    'S': 'Sensing: You tend to focus on the present and on concrete information gained from your senses.',
                    'N': 'Intuition: You tend to focus on the future, with a view toward patterns and possibilities.',
                    'T': 'Thinking: You tend to base your decisions on logic and objective analysis of cause and effect.',
                    'F': 'Feeling: You tend to base your decisions primarily on values and on subjective evaluation of person-centered concerns.',
                    'J': 'Judging: You tend to like a planned and organized approach to life and prefer to have things settled.',
                    'P': 'Perceiving: You tend to like a flexible and spontaneous approach to life and prefer to keep your options open.'
                  };
                  
                  return (
                    <div key={index} style={{ 
                      background: 'white', 
                      borderRadius: '12px', 
                      padding: '1.5rem',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                      textAlign: 'left'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '0.5rem' 
                      }}>
                        <div style={{
                          width: '40px', 
                          height: '40px', 
                          background: 'var(--primary-gradient)', 
                          borderRadius: '8px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          color: 'white',
                          marginRight: '1rem',
                          flexShrink: 0
                        }}>
                          {char}
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{descriptions[char].split(':')[0]}</h4>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.5', margin: 0 }}>
                        {descriptions[char].split(':')[1]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => window.location.href = '/'} className="btn btn-secondary">Back to Home</button>
              <button onClick={() => window.location.href = '/quiz'} className="btn btn-primary">Retake Quiz</button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ResultPage;
