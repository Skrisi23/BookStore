import React from 'react';

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="mb-4">
      <h5 className="mb-3" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Kategóriák</h5>
      <div className="btn-group-vertical w-100" role="group">
        {categories.map(category => (
          <button
            key={category}
            type="button"
            className={`btn text-start ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onCategoryChange(category)}
            style={{ fontSize: '0.9rem' }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
