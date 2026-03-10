import React, { useRef, useState, useEffect } from 'react';

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [categories]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };

  const arrowStyle = (visible) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '54px',
    flexShrink: 0,
    border: 'none',
    background: 'none',
    cursor: visible ? 'pointer' : 'default',
    color: visible ? '#555' : 'transparent',
    fontSize: '0.85rem',
    padding: 0,
    transition: 'color 0.15s',
  });

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', width: '100%', overflow: 'hidden' }}>
      {/* Left arrow */}
      <button
        style={arrowStyle(canScrollLeft)}
        onClick={() => scroll(-1)}
        tabIndex={canScrollLeft ? 0 : -1}
        aria-hidden={!canScrollLeft}
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      {/* Scrollable tabs */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          flex: 1,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {categories.map(category => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              style={{
                padding: '0 1.1rem',
                height: '54px',
                fontSize: '0.72rem',
                fontWeight: isActive ? 700 : 400,
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                border: 'none',
                borderBottom: isActive ? '2px solid #1a1a1a' : '2px solid transparent',
                borderRadius: 0,
                backgroundColor: 'transparent',
                color: isActive ? '#1a1a1a' : '#999',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.color = '#333';
                  e.currentTarget.style.borderBottomColor = '#ccc';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.color = '#999';
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Right arrow */}
      <button
        style={arrowStyle(canScrollRight)}
        onClick={() => scroll(1)}
        tabIndex={canScrollRight ? 0 : -1}
        aria-hidden={!canScrollRight}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
}

export default CategoryFilter;
