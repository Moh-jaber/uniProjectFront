import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import heroImg from '../assets/hero.png';
import sarahImg from '../assets/sarah.png';
import michaelImg from '../assets/michael.png';
import elenaImg from '../assets/elena.png';
import growthImg from '../assets/growth.png';

const LandingPage = () => {
  return (
    <PageTransition>
      <div style={{ width: '100%' }}>
        {/* Hero Section with Stats */}
        <section className="page-section" style={{ position: 'relative', overflow: 'hidden', minHeight: 'auto', background: '#fdfbf7', paddingTop: '120px', paddingBottom: '4rem' }}>
          
          {/* Background Blobs */}
          <div className="blob blob-1" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
          <div className="blob blob-2" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
          <div className="blob blob-3" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>

          <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', width: '100%' }}>
            {/* Hero Content */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
              
              {/* Text Content */}
              <div className="animate-fade-in" style={{ textAlign: 'left' }}>
                <span style={{ 
                  textTransform: 'uppercase', 
                  letterSpacing: '3px', 
                  fontSize: '0.9rem', 
                  fontWeight: '600', 
                  color: '#666',
                  marginBottom: '1rem',
                  display: 'block'
                }}>
                  Discover Yourself
                </span>
                <h1 style={{ marginBottom: '1.5rem', fontSize: '4rem', lineHeight: 1.1 }}>
                  Unlock Your True Potential with <span className="text-gradient">Personality Insights</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#555', marginBottom: '2.5rem', maxWidth: '540px', lineHeight: '1.6' }}>
                  Uncover your unique personality type, strengths, and growth areas in just 5 minutes with our scientifically designed assessment.
                </p>
                
                {/* Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/instructions" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Start Assessment</Link>
                  <Link to="/about" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Learn More</Link>
                </div>
              </div>

              {/* Animated Image */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: '100%', maxWidth: '500px' }}
                >
                  <img src={heroImg} alt="Abstract Personality Illustration" style={{ width: '100%', height: 'auto', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                </motion.div>
              </div>
            </div>

            {/* Glassy Stats Section */}
            <div className="animate-fade-in" style={{ 
              background: 'rgba(255, 255, 255, 0.4)', 
              backdropFilter: 'blur(12px)', 
              borderRadius: '24px', 
              padding: '3rem', 
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.05)',
              marginTop: '2rem'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                <div>
                  <h3 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>10k+</h3>
                  <p style={{ marginBottom: 0, fontWeight: '500', color: '#444' }}>Assessments Taken</p>
                </div>
                <div>
                  <h3 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>16</h3>
                  <p style={{ marginBottom: 0, fontWeight: '500', color: '#444' }}>Personality Types</p>
                </div>
                <div>
                  <h3 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>98%</h3>
                  <p style={{ marginBottom: 0, fontWeight: '500', color: '#444' }}>Accuracy Rate</p>
                </div>
                <div>
                  <h3 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>4.9/5</h3>
                  <p style={{ marginBottom: 0, fontWeight: '500', color: '#444' }}>User Rating</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Brief About Section */}
        <section className="page-section" style={{ minHeight: 'auto', padding: '6rem 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div className="animate-fade-in">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why Take This Test?</h2>
                <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '1.5rem' }}>
                  Understanding your personality type is the first step towards personal growth. Our assessment is based on the renowned MBTI framework, helping you navigate:
                </p>
                <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                  <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}>
                    <div style={{ width: '32px', height: '32px', background: '#e3f2fd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem', color: '#4facfe' }}>✓</div>
                    Career choices that fit your style
                  </li>
                  <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}>
                    <div style={{ width: '32px', height: '32px', background: '#f3e5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem', color: '#f093fb' }}>✓</div>
                    Communication in relationships
                  </li>
                  <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}>
                    <div style={{ width: '32px', height: '32px', background: '#e8f5e9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem', color: '#66bb6a' }}>✓</div>
                    Personal strengths and blind spots
                  </li>
                </ul>
                <Link to="/about" className="btn btn-secondary">Read Our Mission</Link>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <img src={growthImg} alt="Personal Growth" style={{ width: '100%', height: 'auto', borderRadius: '24px', boxShadow: '0 15px 30px rgba(0,0,0,0.05)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ padding: '6rem 0', background: '#f9f9f9' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>What Our Users Say</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div className="card" style={{ padding: '2rem' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>"I was skeptical at first, but the result was scarily accurate! It explained so much about how I work and interact with others."</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={sarahImg} alt="Sarah" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '1rem', objectFit: 'cover' }} />
                  <div>
                    <strong>Sarah J.</strong>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>INFJ</div>
                  </div>
                </div>
              </div>
              <div className="card" style={{ padding: '2rem' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>"The insights helped me understand why I was feeling drained at my sales job. I've since moved to a role that fits my introversion better."</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={michaelImg} alt="Michael" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '1rem', objectFit: 'cover' }} />
                  <div>
                    <strong>Michael T.</strong>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>ISTP</div>
                  </div>
                </div>
              </div>
              <div className="card" style={{ padding: '2rem' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>"Fun, fast, and incredibly detailed. I shared it with my whole team and we learned a lot about each other."</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={elenaImg} alt="Elena" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '1rem', objectFit: 'cover' }} />
                  <div>
                    <strong>Elena R.</strong>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>ENFP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ padding: '6rem 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Frequently Asked Questions</h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>How long does the test take?</h3>
              <p>The assessment consists of 12 carefully selected questions and typically takes about 2-3 minutes to complete.</p>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Is this test free?</h3>
              <p>Yes! Our personality assessment is 100% free. You can take it as many times as you like.</p>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Do I need to register?</h3>
              <p>No registration is required. Your results are saved locally on your device so you can view them later.</p>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Is it scientifically accurate?</h3>
              <p>Our test is based on the Myers-Briggs Type Indicator (MBTI) theory, one of the most widely respected frameworks in personality psychology.</p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          {/* Background Blobs */}
          <div className="blob blob-1" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', opacity: 0.5 }}></div>
          <div className="blob blob-2" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', opacity: 0.5 }}></div>
          <div className="blob blob-3" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', opacity: 0.5 }}></div>

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ color: '#1a1a1a', marginBottom: '1.5rem', fontSize: '3rem' }}>Ready to Meet the Real You?</h2>
            <p style={{ color: '#555', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', fontWeight: '500' }}>
              Join thousands of others who have discovered their personality type and unlocked their potential.
            </p>
            <Link to="/instructions" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
              Take the Quiz Now
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default LandingPage;
