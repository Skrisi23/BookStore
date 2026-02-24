import React, { useState, useEffect } from 'react';
import { getBooks, getAuthors, deleteBook, updateBook, createBook, toggleBookAvailability, createAuthor, createCopy, getCopiesByBook } from '../../api';
import LoadingSpinner from '../common/LoadingSpinner';
import { useToast } from '../../context/ToastContext';


function BookManagement() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);  const [newBook, setNewBook] = useState({
    cim: '',
    boritokep: '',
    kiadasi_datum: '',
    tartalom: '',
    ar: '',
    kategoria: '',
    author_id: '',
    copies_count: 1,
    new_author_name: ''
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
      setAuthors(authorsArray);      const normalized = Array.isArray(booksData) ? booksData.map(book => {
        return {
          id: book.id,
          title: book.cim || book.title || 'Név nélküli',
          author: book.authorNev || book.szerzo || book.author || 'Ismeretlen',
          author_id: book.author_id || null,
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
  const handleEdit = async (book) => {
    // Betöltjük a könyv példányszámát
    let currentCopiesCount = 0;
    try {
      const copiesData = await getCopiesByBook(book.id);
      currentCopiesCount = copiesData.count || 0;
    } catch (e) {
      console.error('Példányszám lekérdezési hiba:', e);
    }

    setEditingBook({
      ...book,
      author_id: book.author_id || '',
      copies_count: currentCopiesCount,
      original_copies_count: currentCopiesCount
    });
    setShowEditModal(true);
  };
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingBook) return;

    const updateData = {
      cim: editingBook.title,
      ar: parseFloat(editingBook.price),
      kategoria: editingBook.category,
      author_id: editingBook.author_id ? parseInt(editingBook.author_id) : undefined
    };

    const result = await updateBook(editingBook.id, updateData);
    if (result.success) {
      // Példányszám kezelése
      const newCount = parseInt(editingBook.copies_count) || 0;
      const originalCount = editingBook.original_copies_count || 0;

      if (newCount > originalCount) {
        // Új példányok hozzáadása
        const toAdd = newCount - originalCount;
        let addedCount = 0;
        for (let i = 0; i < toAdd; i++) {
          const padded = String(originalCount + i + 1).padStart(4, '0');
          const copyData = {
            book_id: editingBook.id,
            leltari_szam: `BK${editingBook.id}-${Date.now()}-${padded}`,
            elerheto: true
          };
          const copyResult = await createCopy(copyData);
          if (copyResult.success) {
            addedCount++;
          }
        }
        if (addedCount > 0) {
          success(`Könyv módosítva, ${addedCount} új példány hozzáadva`);
        } else {
          success('Könyv módosítva');
        }
      } else {
        success('Könyv sikeresen módosítva');
      }

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
      author_id: authors.length > 0 ? authors[0].id : '',
      copies_count: 1,
      new_author_name: ''
    });
    setShowAddModal(true);
  };
  const handleSaveNewBook = async (e) => {
    e.preventDefault();
    
    let authorId = newBook.author_id;

    // Ha új szerzőt kell létrehozni
    if (newBook.new_author_name && newBook.new_author_name.trim() !== '') {
      const authorResult = await createAuthor({ 
        nev: newBook.new_author_name.trim() 
      });
      
      if (authorResult.success) {
        authorId = authorResult.author.id;
        success('Új szerző létrehozva: ' + newBook.new_author_name);
        // Frissítjük a szerzők listáját
        const ac = new AbortController();
        const authorsData = await getAuthors(ac.signal).catch(() => []);
        setAuthors(Array.isArray(authorsData) ? authorsData : []);
      } else {
        error(authorResult.message || 'Szerző létrehozása sikertelen');
        return;
      }
    }

    if (!authorId) {
      error('Válassz szerzőt vagy adj meg új szerző nevet!');
      return;
    }

    const bookData = {
      cim: newBook.cim,
      boritokep: newBook.boritokep,
      kiadasi_datum: newBook.kiadasi_datum,
      tartalom: newBook.tartalom,
      ar: parseFloat(newBook.ar),
      kategoria: newBook.kategoria,
      author_id: parseInt(authorId)
    };    const result = await createBook(bookData);
    if (result.success) {
      const createdBookId = result.book.id;
      
      // Példányok létrehozása - egyenként (sorosan), hogy ne legyen ütközés
      const copiesCount = parseInt(newBook.copies_count) || 1;
      let createdCopies = 0;
      
      for (let i = 0; i < copiesCount; i++) {
        const padded = String(i + 1).padStart(4, '0');
        const copyData = {
          book_id: createdBookId,
          leltari_szam: `BK${createdBookId}-${padded}`,
          elerheto: true
        };
        const copyResult = await createCopy(copyData);
        if (copyResult.success) {
          createdCopies++;
        } else {
          console.error(`Példány ${i + 1} létrehozása sikertelen:`, copyResult.message);
        }
      }
      
      if (createdCopies > 0) {
        success(`Könyv sikeresen hozzáadva ${createdCopies} példánnyal`);
      } else {
        error('Könyv létrehozva, de a példányok létrehozása sikertelen');
      }
      
      setShowAddModal(false);
      setNewBook({
        cim: '',
        boritokep: '',
        kiadasi_datum: '',
        tartalom: '',
        ar: '',
        kategoria: '',
        author_id: '',
        copies_count: 1,
        new_author_name: ''
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
                  </div>                  <div className="mb-3">
                    <label className="form-label">Szerző *</label>
                    <select
                      className="form-select"
                      value={newBook.author_id}
                      onChange={(e) => setNewBook({...newBook, author_id: e.target.value, new_author_name: ''})}
                      disabled={newBook.new_author_name !== ''}
                    >
                      <option value="">Válassz szerzőt...</option>
                      {authors.map(author => (
                        <option key={author.id} value={author.id}>
                          {author.nev || author.name}
                        </option>
                      ))}
                    </select>
                    <div className="text-center my-2">
                      <small className="text-muted">- VAGY -</small>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={newBook.new_author_name}
                      onChange={(e) => setNewBook({...newBook, new_author_name: e.target.value, author_id: ''})}
                      placeholder="Új szerző neve..."
                      disabled={newBook.author_id !== ''}
                    />
                    <small className="form-text text-muted">
                      Válassz egy meglévő szerzőt vagy írj be egy újat
                    </small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Példányok száma *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newBook.copies_count}
                      onChange={(e) => setNewBook({...newBook, copies_count: e.target.value})}
                      required
                      min="1"
                      max="100"
                    />
                    <small className="form-text text-muted">
                      Hány példány legyen ebből a könyvből (1-100)
                    </small>
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
              </div>              <form onSubmit={handleSaveEdit}>
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
                    <label className="form-label">Szerző</label>
                    <select
                      className="form-select"
                      value={editingBook.author_id || ''}
                      onChange={(e) => setEditingBook({...editingBook, author_id: e.target.value})}
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
                    <label className="form-label">Kategória</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingBook.category}
                      onChange={(e) => setEditingBook({...editingBook, category: e.target.value})}
                      required
                    />
                  </div>                  <div className="mb-3">
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
                  <div className="mb-3">
                    <label className="form-label">
                      Példányok száma
                      <span className="text-muted ms-2">(jelenlegi: {editingBook.original_copies_count || 0})</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={editingBook.copies_count}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        if (val >= (editingBook.original_copies_count || 0)) {
                          setEditingBook({...editingBook, copies_count: val});
                        }
                      }}
                      min={editingBook.original_copies_count || 0}
                      max="100"
                    />
                    <small className="form-text text-muted">
                      {parseInt(editingBook.copies_count) > (editingBook.original_copies_count || 0)
                        ? `${parseInt(editingBook.copies_count) - (editingBook.original_copies_count || 0)} új példány lesz hozzáadva`
                        : 'Növeld a számot új példányok hozzáadásához'}
                    </small>
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
