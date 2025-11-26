import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const NotFoundPage = () => {
  return (
    <PageTransition>
      <div className="container">
        <section className="page-section">
          <h1 style={{ fontSize: '8rem', color: '#eee', marginBottom: '0' }}>404</h1>
          <h2 style={{ marginTop: '-2rem' }}>Page Not Found</h2>
          <p>The page you are looking for doesn't exist or has been moved.</p>
          <Link to="/" className="btn btn-primary">Return Home</Link>
        </section>
      </div>
    </PageTransition>
  );
};

export default NotFoundPage;
