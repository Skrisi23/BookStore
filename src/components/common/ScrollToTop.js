import React, { useState, useEffect } from 'react';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-btn${visible ? ' scroll-to-top-visible' : ''}`}
      aria-label="Vissza a tetejére"
      title="Vissza a tetejére"
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
}

export default ScrollToTop;
