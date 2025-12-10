import React, { useState, useEffect } from 'react';
import { getBooks } from '../../api';


function BookManagement() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      try {
        const data = await getBooks(ac.signal);
        // API mezőnevek normalizálása UI-hoz
        const normalized = Array.isArray(data) ? data.map(book => ({
          id: book.id,
          title: book.cim || book.title || 'Név nélküli',
          author: book.szerzo || book.author || 'Ismeretlen',
          category: book.kategoria || book.category || '',
          price: book.ar || book.price || 0,
          available: typeof book.elerheto !== 'undefined' ? book.elerheto : (book.available ?? true)
        })) : [];
        setBooks(normalized);
      } catch (e) {
        console.error('Könyvek betöltése sikertelen:', e);
        setBooks([]);
      }
    }
    load();
    return () => ac.abort();
  }, []);

  const handleDelete = (bookId) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt a könyvet?')) {
      const updatedBooks = books.filter(book => book.id !== bookId);
      setBooks(updatedBooks);
      // TODO: Itt backend DELETE hívás kellene; jelenleg csak UI frissítés
    }
  };

  const handleToggleAvailability = (bookId) => {
    const updatedBooks = books.map(book =>
      book.id === bookId
        ? { ...book, available: !book.available }
        : book
    );
    setBooks(updatedBooks);
    // TODO: Itt backend PATCH/PUT hívás kellene; jelenleg csak UI frissítés
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
