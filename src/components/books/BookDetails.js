import React, { useEffect, useState } from 'react';
import { getBookById, getCopiesByBook } from '../../api';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import LoadingSpinner from '../common/LoadingSpinner';
import './BookDetails.css';

function BookDetails({ bookId, onClose, book: initialBook }) {
  const [book, setBook] = useState(initialBook || null);
  const [loading, setLoading] = useState(!initialBook);
  const [error, setError] = useState(null);
  const [copiesInfo, setCopiesInfo] = useState({ total: 0, available: 0 });
  const [copiesLoading, setCopiesLoading] = useState(true);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { success, warning } = useToast();

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
        
        const bookData = {
          id: data.id,
          title: data.cim || 'Név nélküli könyv',
          coverImage: data.boritokep || 'https://via.placeholder.com/300x400?text=Book',
          author: data.authorNev || 'Ismeretlen szerző',
          category: data.kategoria || 'Egyéb',
          price: data.ar || 0,
          rentalPrice: data.kolcsonzesi_ar || Math.round((data.ar || 0) * 0.05),
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

  // Példányok lekérdezése
  useEffect(() => {
    const id = book?.id || bookId;
    if (!id) return;

    const controller = new AbortController();

    async function fetchCopies() {
      try {
        setCopiesLoading(true);
        const data = await getCopiesByBook(id, controller.signal);
        const copies = data.copies || [];
        const available = copies.filter(c => c.elerheto || c.available).length;
        setCopiesInfo({ total: copies.length, available });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Példányok lekérdezése sikertelen:', err);
          setCopiesInfo({ total: 0, available: 0 });
        }
      } finally {
        setCopiesLoading(false);
      }
    }

    fetchCopies();
    return () => controller.abort();
  }, [book?.id, bookId]);

  const handleAddToCart = async (type) => {
    if (!isAuthenticated) {
      warning('Kérjük jelentkezz be a művelethez!');
      return;
    }
    if (!book) return;

    const orderType = type === 'purchase' ? 'purchase' : 'rental';
    const result = await addToCart(book.id, orderType, 1);
    if (result.success) {
      const label = orderType === 'purchase' ? 'megvásárolásra' : 'kölcsönzésre';
      success(`${book.title} hozzáadva a kosárhoz (${label})`);
    } else {
      warning(result.message || 'Hiba történt a kosárba helyezésnél');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.className === 'book-details-backdrop') {
      onClose();
    }
  };

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

  const rentalPrice = book.rentalPrice || Math.round((book.price || 0) * 0.05);
  const isAvailable = copiesInfo.available > 0;

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
                <span className="meta-value price">{Number(book.price).toLocaleString()} Ft</span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Kölcsönzési díj:</span>
                <span className="meta-value">{Number(rentalPrice).toLocaleString()} Ft/hó</span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Elérhetőség:</span>
                <span className="meta-value">
                  {copiesLoading ? (
                    <span style={{ color: '#999' }}>Betöltés...</span>
                  ) : (
                    <span style={{ 
                      color: isAvailable ? '#1a1a1a' : '#999',
                      fontWeight: 600
                    }}>
                      {copiesInfo.available} / {copiesInfo.total} db elérhető
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="book-details-actions" style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              <button
                className="btn btn-dark"
                style={{ 
                  flex: 1, 
                  borderRadius: 0, 
                  letterSpacing: '0.5px', 
                  fontWeight: 600,
                  padding: '12px 20px',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem'
                }}
                onClick={() => handleAddToCart('purchase')}
                disabled={!isAvailable || copiesLoading}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Vásárlás — {Number(book.price).toLocaleString()} Ft
              </button>
              <button
                className="btn btn-outline-dark"
                style={{ 
                  flex: 1, 
                  borderRadius: 0, 
                  letterSpacing: '0.5px',
                  padding: '12px 20px',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem'
                }}
                onClick={() => handleAddToCart('rental')}
                disabled={!isAvailable || copiesLoading}
              >
                <i className="bi bi-bookmark me-2"></i>
                Kölcsönzés — {Number(rentalPrice).toLocaleString()} Ft
              </button>
            </div>

            {!isAvailable && !copiesLoading && (
              <div style={{ 
                padding: '10px 16px', 
                backgroundColor: '#f5f5f5', 
                border: '1px solid #e8e8e8',
                fontSize: '0.85rem',
                color: '#888'
              }}>
                <i className="bi bi-info-circle me-2"></i>
                Jelenleg nincs elérhető példány ebből a könyvből.
              </div>
            )}

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
