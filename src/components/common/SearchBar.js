import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="mb-4">
      <div className="input-group input-group-lg">
        <span className="input-group-text" style={{ backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #1a1a1a', borderRadius: 0 }}>
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Keresés könyvek között..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ borderRadius: 0, borderColor: '#d0d0d0' }}
        />
      </div>
    </div>
  );
}

export default SearchBar;
