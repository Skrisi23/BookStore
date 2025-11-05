import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="mb-4">
      <div className="input-group input-group-lg">
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Keresés könyvek között..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
