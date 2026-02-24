import React, { useState, useEffect } from 'react';
import { getBooks, getAuthors, deleteBook, updateBook, createBook, toggleBookAvailability } from '../../api';
import LoadingSpinner from '../common/LoadingSpinner';
import { useToast } from '../../context/ToastContext';


function BookManagement() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBook, setNewBook] = useState({
    cim: '',
    boritokep: '',
    kiadasi_datum: '',
    tartalom: '',
    ar: '',
    kategoria: '',
    author_id: ''
  });
  const { success, error } = useToast();

  const loadBooks = async (signal) => {
    try {
      setLoading(true);
      const [booksData, authorsData] = await Promise.all([
        getBooks(signal),
        getAuthors(signal).catch(() => [])
      ]);

      const authorsArray = Array.isArray(authorsData) ? authorsData : [];
      setAuthors(authorsArray);

      const normalized = Array.isArray(booksData) ? booksData.map(book => {
        return {
          id: book.id,
          title: book.cim || book.title || 'Név nélküli',
          author: book.authorNev || book.szerzo || book.author || 'Ismeretlen',
          category: book.kategoria || book.category || '',
          price: book.ar || book.price || 0,
          available: typeof book.elerheto !== 'undefined' ? book.elerheto : (book.available ?? true)
        };
      }) : [];

      // Rendezés ID alapján (növekvő sorrend)
      normalized.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
      
      setBooks(normalized);
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error('Könyvek betöltése sikertelen:', e);
        setBooks([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    loadBooks(ac.signal);
    return () => ac.abort();
  }, []);

  const handleDelete = async (bookId) => {
    if (!window.confirm('Biztosan törölni szeretnéd ezt a könyvet?')) {
      return;
    }

    const result = await deleteBook(bookId);
    if (result.success) {
      success('Könyv sikeresen törölve');
      const ac = new AbortController();
      await loadBooks(ac.signal);
    } else {
      error(result.message || 'Törlés sikertelen');
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingBook) return;

    const updateData = {
      cim: editingBook.title,
      ar: parseFloat(editingBook.price),
      kategoria: editingBook.category
    };

    const result = await updateBook(editingBook.id, updateData);
    if (result.success) {
      success('Könyv sikeresen módosítva');
      setShowEditModal(false);
      setEditingBook(null);
      const ac = new AbortController();
      await loadBooks(ac.signal);
    } else {
      error(result.message || 'Módosítás sikertelen');
    }
  };

  const handleToggleAvailability = async (bookId) => {
    const result = await toggleBookAvailability(bookId);
    if (result.success) {
      success(result.message);
      const ac = new AbortController();
      await loadBooks(ac.signal);
    } else {
      error(result.message || 'Elérhetőség váltása sikertelen');
    }
  };

  const handleAddBook = () => {
    setNewBook({
      cim: '',
      boritokep: '',
      kiadasi_datum: new Date().toISOString().split('T')[0],
      tartalom: '',
      ar: '',
      kategoria: '',
      author_id: authors.length > 0 ? authors[0].id : ''
    });
    setShowAddModal(true);
  };

  const handleSaveNewBook = async (e) => {
    e.preventDefault();
    
    const bookData = {
      cim: newBook.cim,
      boritokep: newBook.boritokep,
      kiadasi_datum: newBook.kiadasi_datum,
      tartalom: newBook.tartalom,
      ar: parseFloat(newBook.ar),
      kategoria: newBook.kategoria,
      author_id: parseInt(newBook.author_id)
    };

    const result = await createBook(bookData);
    if (result.success) {
      success('Könyv sikeresen hozzáadva');
      setShowAddModal(false);
      setNewBook({
        cim: '',
        boritokep: '',
        kiadasi_datum: '',
        tartalom: '',
        ar: '',
        kategoria: '',
        author_id: ''
      });
      const ac = new AbortController();
      await loadBooks(ac.signal);
    } else {
      error(result.message || 'Hozzáadás sikertelen');
    }
  };

  if (loading || books.length === 0) {
    return <LoadingSpinner fullPage text="Könyvek betöltése..." />;
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="card-title mb-0">
            <i className="bi bi-book me-2"></i>
            Könyvek kezelése
          </h4>
          <button className="btn btn-primary" onClick={handleAddBook}>
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
              {books.map((book, index) => (
                <tr key={book.id}>
                  <td>#{index + 1}</td>
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
                    <button 
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(book)}
                    >
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

      {/* Új könyv Modal */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Új könyv hozzáadása</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSaveNewBook}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Cím *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newBook.cim}
                      onChange={(e) => setNewBook({...newBook, cim: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Szerző *</label>
                    <select
                      className="form-select"
                      value={newBook.author_id}
                      onChange={(e) => setNewBook({...newBook, author_id: e.target.value})}
                      required
                    >
                      <option value="">Válassz szerzőt...</option>
                      {authors.map(author => (
                        <option key={author.id} value={author.id}>
                          {author.nev || author.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Kategória *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newBook.kategoria}
                      onChange={(e) => setNewBook({...newBook, kategoria: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ár (Ft) *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newBook.ar}
                      onChange={(e) => setNewBook({...newBook, ar: e.target.value})}
                      required
                      min="0"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Borítókép URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newBook.boritokep}
                      onChange={(e) => setNewBook({...newBook, boritokep: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Kiadási dátum *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={newBook.kiadasi_datum}
                      onChange={(e) => setNewBook({...newBook, kiadasi_datum: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tartalom</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={newBook.tartalom}
                      onChange={(e) => setNewBook({...newBook, tartalom: e.target.value})}
                      placeholder="Rövid leírás..."
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowAddModal(false)}
                  >
                    Mégse
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Hozzáadás
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Szerkesztés Modal */}
      {showEditModal && editingBook && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Könyv szerkesztése</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSaveEdit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Cím</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingBook.title}
                      onChange={(e) => setEditingBook({...editingBook, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Kategória</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingBook.category}
                      onChange={(e) => setEditingBook({...editingBook, category: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ár (Ft)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editingBook.price}
                      onChange={(e) => setEditingBook({...editingBook, price: e.target.value})}
                      required
                      min="0"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowEditModal(false)}
                  >
                    Mégse
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Mentés
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookManagement;
