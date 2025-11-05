
import React, { useState, useEffect } from 'react';
import { mockBooks } from '../../data/mockData';

function BookManagement() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const savedBooks = localStorage.getItem('adminBooks');
    setBooks(savedBooks ? JSON.parse(savedBooks) : mockBooks);
  }, []);

  const handleDelete = (bookId) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt a könyvet?')) {
      const updatedBooks = books.filter(book => book.id !== bookId);
      setBooks(updatedBooks);
      localStorage.setItem('adminBooks', JSON.stringify(updatedBooks));
    }
  };

  const handleToggleAvailability = (bookId) => {
    const updatedBooks = books.map(book =>
      book.id === bookId
        ? { ...book, available: !book.available }
        : book
    );
    setBooks(updatedBooks);
    localStorage.setItem('adminBooks', JSON.stringify(updatedBooks));
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="card-title mb-0">
            <i className="bi bi-book me-2"></i>
            Könyvek kezelése
          </h4>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Új könyv
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cím</th>
                <th>Szerző</th>
                <th>Kategória</th>
                <th>Ár</th>
                <th>Elérhető</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>#{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <span className="badge bg-secondary">{book.category}</span>
                  </td>
                  <td>{book.price.toLocaleString()} Ft</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={book.available}
                        onChange={() => handleToggleAvailability(book.id)}
                      />
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(book.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookManagement;
