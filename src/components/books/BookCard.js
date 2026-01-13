import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';


function mapApiBookToUi(apiBook = {}, authorName = null) {
  return {
    id: apiBook.id,
    title: apiBook.cim || apiBook.title || 'Név nélküli könyv',
    coverImage: apiBook.boritokep || apiBook.coverImage || 'https://via.placeholder.com/300x300?text=Book',
    author: authorName || apiBook.szerzo || apiBook.author || `#${apiBook.author_id || ''}`,
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


function BookCard({ book: initialBook, bookId, apiBaseUrl }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { warning, success } = useToast();

  const [book, setBook] = useState(() => {
    
    if (!initialBook) return null;
    
    const looksLikeApi = !!(initialBook.cim || initialBook.boritokep || initialBook.tartalom);
    return looksLikeApi ? mapApiBookToUi(initialBook) : initialBook;
  });
  const [loading, setLoading] = useState(!initialBook && !!bookId);
  const [error, setError] = useState(null);

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
            if (!allRes.ok) throw new Error(`Könyvek lekérése sikertelen (${allRes.status})`);
            const allBooks = await allRes.json();
            const apiBook = (Array.isArray(allBooks) ? allBooks.find(b => b.id === Number(bookId)) : null);
            if (!apiBook) throw new Error('Könyv nem található');
           
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
          throw new Error(`Könyv lekérése sikertelen (${res.status})`);
        }

        const data = await res.json();
        const apiBook = Array.isArray(data) ? data[0] || data.find(b => b.id === Number(bookId)) : data;

        if (!apiBook) throw new Error('A backend nem adott vissza megfelelő könyv adatot');

        
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
        if (err.name !== 'AbortError') setError(err.message || 'Ismeretlen hiba');
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ac.abort();
  }, [bookId, initialBook, apiBaseUrl]);

  const handleAddToCart = (type) => {
    if (!isAuthenticated) {
      warning('Kérjük jelentkezz be a művelethez!');
      return;
    }
    if (!book) {
      warning('A könyv adatai még töltődnek.');
      return;
    }
    addToCart(book, type);
    success(`${book.title} hozzáadva a kosárhoz (${type === 'purchase' ? 'vásárlás' : 'kölcsönzés'})`);
  };

  
  if (loading) {
    return (
      <div className="col-md-3 mb-4">
        <div className="card h-100 shadow-sm">
          <div style={{ height: 300, background: '#f0f0f0' }} />
          <div className="card-body d-flex flex-column">
            <h6 className="card-title placeholder-glow"><span className="placeholder col-6"></span></h6>
            <p className="card-text text-muted small mb-2 placeholder-glow"><span className="placeholder col-4"></span></p>
            <div className="mt-auto">
              <button className="btn btn-secondary btn-sm w-100 mb-2" disabled>Betöltés...</button>
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
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
        <div style={{ 
          height: '300px', 
          overflow: 'hidden', 
          backgroundColor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={book.coverImage || 'https://via.placeholder.com/300x300?text=Book'}
            className="card-img-top"
            alt={book.title}
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '10px'
            }}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h6 className="card-title">{book.title}</h6>
          <p className="card-text text-muted small mb-2">
            <i className="bi bi-person me-1"></i>
            {book.author}
          </p>
          <p className="card-text text-muted small mb-2">
            <i className="bi bi-tag me-1"></i>
            {book.category}
          </p>
          <p className="card-text">
            <strong className="text-primary">{Number(book.price).toLocaleString()} Ft</strong>
            <br />
            <small className="text-muted">Kölcsönzés: {Number(book.rentalPrice).toLocaleString()} Ft/hó</small>
          </p>

          {!book.available && (
            <span className="badge bg-danger mb-2">Jelenleg nem elérhető</span>
          )}

          <div className="mt-auto">
            <button
              className="btn btn-primary btn-sm w-100 mb-2"
              onClick={() => handleAddToCart('purchase')}
              disabled={!book.available}
            >
              <i className="bi bi-cart-plus me-1"></i>
              Vásárlás
            </button>
            <button
              className="btn btn-outline-secondary btn-sm w-100"
              onClick={() => handleAddToCart('rental')}
              disabled={!book.availableForRent}
            >
              <i className="bi bi-bookmark me-1"></i>
              Kölcsönzés
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;