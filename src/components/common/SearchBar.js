import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="input-group">
      <span className="input-group-text" style={{ backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #1a1a1a', borderRadius: 0 }}>
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Keresés cím vagy szerző szerint..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ borderRadius: 0, borderColor: '#ccc', padding: '0.6rem 1rem' }}
      />
      {searchTerm && (
        <button
          className="btn"
          style={{ borderRadius: 0, border: '1px solid #ccc', borderLeft: 'none', backgroundColor: '#fff' }}
          onClick={() => onSearchChange('')}
          title="Törlés"
        >
          <i className="bi bi-x-lg" style={{ color: '#888' }}></i>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
