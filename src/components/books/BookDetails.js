import React, { useEffect, useState } from 'react';
import { getBookById } from '../../api';
import LoadingSpinner from '../common/LoadingSpinner';
import './BookDetails.css';

function BookDetails({ bookId, onClose, book: initialBook }) {
  const [book, setBook] = useState(initialBook || null);
  const [loading, setLoading] = useState(!initialBook);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialBook) {
      setBook(initialBook);
      return;
    }

    if (!bookId) return;

    const controller = new AbortController();

    async function fetchBookDetails() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getBookById(bookId, controller.signal);
        
        // A backend BookDto-t térít vissza
        const bookData = {
          id: data.id,
          title: data.cim || 'Név nélküli könyv',
          coverImage: data.boritokep || 'https://via.placeholder.com/300x400?text=Book',
          author: data.authorNev || 'Ismeretlen szerző',
          category: data.kategoria || 'Egyéb',
          price: data.ar || 0,
          publishedDate: data.kiadasiDatum,
          description: data.tartalom || 'Nincs elérhető leírás ehhez a könyvhöz.'
        };
        
        setBook(bookData);
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Könyv részletek betöltése sikertelen:', err);
        setError('A könyv részleteinek betöltése sikertelen volt. Kérjük, próbáld meg később.');
      } finally {
        setLoading(false);
      }
    }

    fetchBookDetails();

    return () => controller.abort();
  }, [bookId, initialBook]);

  // Háttérre kattintás bezárja a modalt
  const handleBackdropClick = (e) => {
    if (e.target.className === 'book-details-backdrop') {
      onClose();
    }
  };

  // ESC gomb bezárja a modalt
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (loading) {
    return (
      <div className="book-details-backdrop" onClick={handleBackdropClick}>
        <div className="book-details-modal">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-details-backdrop" onClick={handleBackdropClick}>
        <div className="book-details-modal">
          <button className="close-button" onClick={onClose}>✕</button>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="book-details-backdrop" onClick={handleBackdropClick}>
      <div className="book-details-modal">
        <button className="close-button" onClick={onClose} title="Bezárás (ESC)">✕</button>
        
        <div className="book-details-content">
          <div className="book-details-image-section">
            <img 
              src={book.coverImage} 
              alt={book.title}
              className="book-details-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x400?text=Book';
              }}
            />
          </div>

          <div className="book-details-info-section">
            <h2 className="book-details-title">{book.title}</h2>
            
            <div className="book-details-meta">
              <div className="meta-item">
                <span className="meta-label">Szerző:</span>
                <span className="meta-value">{book.author}</span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Kategória:</span>
                <span className="meta-value">{book.category}</span>
              </div>
              
              {book.publishedDate && (
                <div className="meta-item">
                  <span className="meta-label">Kiadás dátuma:</span>
                  <span className="meta-value">
                    {new Date(book.publishedDate).toLocaleDateString('hu-HU')}
                  </span>
                </div>
              )}
              
              <div className="meta-item">
                <span className="meta-label">Ár:</span>
                <span className="meta-value price">{book.price} Ft</span>
              </div>
            </div>

            <div className="book-details-description">
              <h3>Leírás</h3>
              <p>{book.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
