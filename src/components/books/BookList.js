import React from 'react';
import BookCard from './BookCard';

function BookList({ books, loading }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Betöltés...</span>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="alert alert-info text-center">
        <i className="bi bi-info-circle me-2"></i>
        Nincs megjeleníthető könyv a kiválasztott kategóriában.
      </div>
    );
  }

  return (
    <div className="row">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookList;
