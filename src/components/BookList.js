import React from 'react';
import BookCard from './BookCard';

function BookList({ books, onEdit, onDelete }) {
  return (
    <div className="row">
      {books.map(book => (
        <BookCard 
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default BookList;
