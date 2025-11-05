import React from 'react';

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="mb-4">
      <h5 className="mb-3">Kategóriák</h5>
      <div className="btn-group-vertical w-100" role="group">
        {categories.map(category => (
          <button
            key={category}
            type="button"
            className={`btn btn-outline-primary text-start ${
              selectedCategory === category ? 'active' : ''
            }`}
            onClick={() => onCategoryChange(category)}
          >
            <i className="bi bi-bookmark me-2"></i>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
