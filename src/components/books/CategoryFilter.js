import React from 'react';

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {categories.map(category => (
        <button
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
          style={{
            padding: '0.4rem 1.2rem',
            fontSize: '0.78rem',
            fontWeight: selectedCategory === category ? 600 : 400,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            border: selectedCategory === category ? '1px solid #1a1a1a' : '1px solid #ccc',
            borderRadius: 0,
            backgroundColor: selectedCategory === category ? '#1a1a1a' : 'transparent',
            color: selectedCategory === category ? '#fff' : '#555',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
