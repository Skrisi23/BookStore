import React, { useState } from 'react';
import BookList from '../components/books/BookList';
import AddBookForm from '../components/AddBookForm';
import EditBookModal from '../components/EditBookModal';

function BooksPage({ books, authors, onAddBook, onUpdateBook, onDeleteBook, onRefresh }) {
  const [editingBook, setEditingBook] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt a könyvet?')) {
      await onDeleteBook(id);
      onRefresh();
    }
  };

  const handleUpdate = async (id, data) => {
    await onUpdateBook(id, data);
    onRefresh();
    setEditingBook(null);
  };

  const handleAdd = async (data) => {
    await onAddBook(data);
    onRefresh();
  };

  return (
    <div>
      <h2 className="mb-4">Könyvek kezelése</h2>
      <AddBookForm authors={authors} onAdd={handleAdd} />
      <BookList 
        books={books}
        onEdit={setEditingBook}
        onDelete={handleDelete}
      />
      {editingBook && (
        <EditBookModal
          book={editingBook}
          authors={authors}
          onUpdate={handleUpdate}
          onClose={() => setEditingBook(null)}
        />
      )}
    </div>
  );
}

export default BooksPage;
