import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { getBooks, getAuthors } from '../../api';


export default function BooksList({ searchTerm = '', selectedCategory = 'Minden' }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      try {
        setLoading(true);
        // Lekérjük a könyveket és a szerzőket párhuzamosan
        const [booksData, authorsData] = await Promise.all([
          getBooks(ac.signal),
          getAuthors(ac.signal).catch(() => [])
        ]);

        const authors = Array.isArray(authorsData) ? authorsData : [];
        const booksList = Array.isArray(booksData) ? booksData : [];

        // Könyveket normalizáljuk
        const normalized = booksList.map(book => {
          return {
            ...book,
            // ID explicit beállítása
            id: book.id,
            // Normalizált mezők a szűréshez és megjelenítéshez
            title: book.cim || book.title || '',
            author: book.authorNev || book.szerzo || book.author || 'Ismeretlen',
            category: book.kategoria || book.category || '',
            price: book.ar || book.price || 0,
            rentalPrice: book.kolcsonzesi_ar || book.rentalPrice || Math.round((book.ar || book.price || 0) * 0.05)
          };
        });

        // Rendezés ID alapján (növekvő sorrend)
        normalized.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

        setBooks(normalized);
        setFilteredBooks(normalized); // Azonnal beállítjuk a teljes listát
      } catch (err) {
        if (err.name !== 'AbortError') {
          const base = process.env.REACT_APP_API_URL || '';
          setError(`Hálózati hiba: ${err.message || String(err)} (próbált URL: ${base}/api/Books)`);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => ac.abort();
  }, []);

  // Szűrés searchTerm és selectedCategory alapján
  useEffect(() => {
    let filtered = books;

    // Kategória szűrés
    if (selectedCategory && selectedCategory !== 'Minden') {
      filtered = filtered.filter(book => 
        book.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Keresés cím vagy szerző szerint
    if (searchTerm && searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
      );
    }

    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedCategory]);

  if (loading) return <LoadingSpinner fullPage text="Könyvek betöltése..." />;
  if (error) return (
    <div className="text-center py-5">
      <i className="bi bi-exclamation-triangle" style={{ fontSize: '2.5rem', color: '#ccc', display: 'block', marginBottom: '1rem' }}></i>
      <p style={{ color: '#888' }}>{error}</p>
    </div>
  );
  
  // Ha még nincs adat betöltve, mutassuk a spinnert
  if (!books.length && !error) {
    return <LoadingSpinner fullPage text="Könyvek betöltése..." />;
  }
  
  if (!filteredBooks.length) return (
    <div className="text-center py-5">
      <i className="bi bi-search" style={{ fontSize: '2.5rem', color: '#ccc', display: 'block', marginBottom: '1rem' }}></i>
      <h5 style={{ fontWeight: 600, color: '#555' }}>Nincs találat</h5>
      <p style={{ color: '#888', fontSize: '0.9rem' }}>Próbálj más keresőkifejezést vagy kategóriát.</p>
    </div>
  );

  return (
    <div>
      <p style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
        {filteredBooks.length} könyv{filteredBooks.length !== books.length ? ` (összesen: ${books.length})` : ''}
      </p>
      <div className="row">
        {filteredBooks.map((b) => (
          
          <BookCard key={b.id} book={b} />
          
        ))}
      </div>
    </div>
  );
}