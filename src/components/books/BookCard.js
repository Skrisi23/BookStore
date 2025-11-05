import React from 'react';

function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">
            <strong>Szerző:</strong> {book.author_name}<br />
            <strong>Kiadás éve:</strong> {book.publication_year}<br />
            <strong>ISBN:</strong> {book.isbn}
          </p>
        </div>
        <div className="card-footer bg-transparent">
          <button 
            className="btn btn-sm btn-primary me-2"
            onClick={() => onEdit(book)}
          >
            Szerkesztés
          </button>
          <button 
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(book.id)}
          >
            Törlés
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
