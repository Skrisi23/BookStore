import React, { useEffect, useState, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import LoadingSpinner from '../common/LoadingSpinner';
import BookDetails from './BookDetails';


function mapApiBookToUi(apiBook = {}, authorName = null) {
  return {
    id: apiBook.id,
    title: apiBook.cim || apiBook.title || 'Név nélküli könyv',
    coverImage: apiBook.boritokep || apiBook.coverImage || 'https://via.placeholder.com/300x300?text=Book',
    author: authorName || apiBook.authorNev || apiBook.szerzo || apiBook.author || 'Ismeretlen szerző',
    category: apiBook.kategoria || apiBook.category || '',
    
    price: typeof apiBook.ar !== 'undefined' ? Number(apiBook.ar) : (apiBook.price ? Number(apiBook.price) : 0),
    
    rentalPrice: typeof apiBook.kolcsonzesi_ar !== 'undefined'
      ? Number(apiBook.kolcsonzesi_ar)
      : (apiBook.rentalPrice ? Number(apiBook.rentalPrice) : Math.round((Number(apiBook.ar || apiBook.price || 0)) * 0.05)),
  
    available: typeof apiBook.elerheto !== 'undefined' ? !!apiBook.elerheto : true,
    availableForRent: typeof apiBook.elerheto !== 'undefined' ? !!apiBook.elerheto : true,
    description: apiBook.tartalom || apiBook.description || '',
    publishedDate: apiBook.kiadasi_datum || apiBook.publishedDate || null,
  };
}


function BookCard({ book: initialBook, bookId, apiBaseUrl, animationDelay = 0 }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { warning, success } = useToast();

  const cardRef = useRef(null);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [book, setBook] = useState(() => {
    
    if (!initialBook) return null;
    
    const looksLikeApi = !!(initialBook.cim || initialBook.boritokep || initialBook.tartalom);
    return looksLikeApi ? mapApiBookToUi(initialBook) : initialBook;
  });
  const [loading, setLoading] = useState(!initialBook && !!bookId);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (initialBook) return; 
    if (!bookId) return; 

    const ac = new AbortController();
    const base = apiBaseUrl || process.env.REACT_APP_API_URL || '';

    async function load() {
      try {
        setLoading(true);
        setError(null);

        
        const res = await fetch(`${base}/api/Books/${bookId}`, { signal: ac.signal });
        if (!res.ok) {
          
         
          if (res.status === 404) {
            
            const allRes = await fetch(`${base}/api/Books`, { signal: ac.signal });
            if (!allRes.ok) throw new Error(`Sikertelen könyvlekérés (${allRes.status})`);
            const allBooks = await allRes.json();
            const apiBook = (Array.isArray(allBooks) ? allBooks.find(b => b.id === Number(bookId)) : null);
            if (!apiBook) throw new Error('A könyv nem található');
           
            let authorName = null;
            if (apiBook.author_id) {
              const aRes = await fetch(`${base}/api/Author/${apiBook.author_id}`, { signal: ac.signal });
              if (aRes.ok) {
                const aJson = await aRes.json();
                authorName = Array.isArray(aJson) ? (aJson[0]?.nev || null) : (aJson?.nev || null);
              }
            }
            setBook(mapApiBookToUi(apiBook, authorName));
            return;
          }
          throw new Error(`Sikertelen könyvlekérés (${res.status})`);
        }

        const data = await res.json();
        const apiBook = Array.isArray(data) ? data[0] || data.find(b => b.id === Number(bookId)) : data;

        if (!apiBook) throw new Error('A háttérrendszer nem adott vissza érvényes könyv adatot');

        
        let authorName = null;
        if (apiBook.author_id) {
          const aRes = await fetch(`${base}/api/Author/${apiBook.author_id}`, { signal: ac.signal });
          if (aRes.ok) {
            const aJson = await aRes.json();
            authorName = Array.isArray(aJson) ? (aJson[0]?.nev || null) : (aJson?.nev || null);
          } else {
            
            const allARes = await fetch(`${base}/api/Author`, { signal: ac.signal });
            if (allARes.ok) {
              const allAuthors = await allARes.json();
              const found = Array.isArray(allAuthors) ? allAuthors.find(x => x.id === apiBook.author_id) : null;
              if (found) authorName = found.nev || null;
            }
          }
        }

        setBook(mapApiBookToUi(apiBook, authorName));
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Ismeretlen hiba történt');
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ac.abort();
  }, [bookId, initialBook, apiBaseUrl]);
  const handleAddToCart = async (type) => {
    if (!isAuthenticated) {
      warning('Kérjük jelentkezz be a művelethez!');
      return;
    }
    if (!book) {
      warning('A könyv adatai még töltődnek.');
      return;
    }
    
    const orderType = type === 'purchase' ? 'purchase' : 'rental';
    const result = await addToCart(book.id, orderType, 1);
    if (result.success) {
      const label = orderType === 'purchase' ? 'megvásárolásra' : 'kölcsönzésre';
      success(`${book.title} hozzáadva a kosárhoz (${label})`);
    } else {
      warning(result.message || 'Hiba történt a kosárba helyezésnél');
    }
  };

  
  if (loading) {
    return (
      <div className="col-md-3 mb-4">
        <div className="card h-100 shadow-sm">
          <div style={{ height: 300, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Betöltés...</span>
            </div>
          </div>
          <div className="card-body d-flex flex-column">
            <h6 className="card-title placeholder-glow"><span className="placeholder col-6"></span></h6>
            <p className="card-text text-muted small mb-2 placeholder-glow"><span className="placeholder col-4"></span></p>
            <div className="mt-auto">
              <button className="btn btn-secondary btn-sm w-100 mb-2" disabled>
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                Betöltés...
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-md-3 mb-4">
        <div className="card h-100 shadow-sm">
          <div style={{ height: 300, background: '#fff6f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="text-danger">Hiba</span>
          </div>
          <div className="card-body d-flex flex-column">
            <h6 className="card-title">Hiba a könyv betöltésénél</h6>
            <p className="card-text text-muted small mb-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div
      ref={cardRef}
      className={`col-md-3 mb-4 book-card-wrapper${cardVisible ? ' card-visible' : ''}`}
      style={{ transitionDelay: `${animationDelay}s` }}
    >
      <div className="card h-100" style={{ cursor: 'pointer', border: '1px solid #e8e8e8' }}>
        <div 
          style={{ 
            height: '300px', 
            overflow: 'hidden', 
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid #e8e8e8'
          }}
          onClick={() => setShowDetails(true)}
        >
          <img
            src={book.coverImage || 'https://via.placeholder.com/300x300?text=Book'}
            className="card-img-top"
            alt={book.title}
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '10px',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div className="card-body d-flex flex-column">
          {/* Cím - fix magasság, max 2 sor */}
          <h6 
            className="card-title" 
            onClick={() => setShowDetails(true)} 
            style={{ 
              cursor: 'pointer', 
              fontWeight: 600, 
              minHeight: '2.6em', 
              overflow: 'hidden', 
              display: '-webkit-box', 
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical' 
            }}
          >
            {book.title}
          </h6>
          {/* Szerző */}
          <p className="card-text small mb-1" style={{ color: '#888', minHeight: '1.3em', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {book.author}
          </p>
          {/* Kategória */}
          <p className="card-text small mb-2" style={{ color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.7rem', minHeight: '1.2em', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {book.category}
          </p>
          {/* Ár */}
          <p className="card-text mb-2">
            <strong style={{ color: '#1a1a1a', fontSize: '1.05rem' }}>{Number(book.price).toLocaleString()} Ft</strong>
            <br />
            <small style={{ color: '#999' }}>Kölcsönzés: {Number(book.rentalPrice).toLocaleString()} Ft/14 nap</small>
          </p>

          {/* Elérhetőség badge - fix helyet foglal, akkor is ha elérhető */}
          <div style={{ minHeight: '1.8em', marginBottom: '0.5rem' }}>
            {!book.available && (
              <span className="badge bg-danger">Jelenleg nem elérhető</span>
            )}
          </div>

          <div className="mt-auto">
            <button
              className="btn btn-dark btn-sm w-100 mb-2"
              style={{ borderRadius: 0, letterSpacing: '0.5px', fontWeight: 500 }}
              onClick={() => handleAddToCart('purchase')}
              disabled={!book.available}
            >
              <i className="bi bi-cart-plus me-1"></i>
              Vásárlás
            </button>
            <button
              className="btn btn-outline-dark btn-sm w-100"
              style={{ borderRadius: 0, letterSpacing: '0.5px' }}
              onClick={() => handleAddToCart('rental')}
              disabled={!book.availableForRent}
            >
              <i className="bi bi-bookmark me-1"></i>
              Kölcsönzés
            </button>
          </div>
        </div>
      </div>

      {showDetails && (
        <BookDetails
          bookId={book.id}
          book={book}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}

export default BookCard;